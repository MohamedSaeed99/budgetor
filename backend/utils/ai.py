import pprint
from models.category import Category
from langchain_ollama import ChatOllama
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_core.messages import BaseMessage, SystemMessage, HumanMessage
from typing_extensions import Annotated, TypedDict

class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    additional_data: dict

resolver_model = ChatOllama(
    model="gemma3n:latest",
    temperature=0,
)

format_model = ChatOllama(
    model="gemma3n:latest",
    temperature=0,
)

def resolve_user_message(state: AgentState):
    system_prompt = """
        You are a helpful and friendly budgeting assistant. Your goal is to guide the user in creating a simple and realistic budget based on their needs and goals.

        ### Communication Style:
        - Use clear, simple language that anyone can understand.
        - Be supportive, encouraging, and never judgmental.
        - Avoid financial jargon and long paragraphs.
        - Prefer short steps, bullet points, or direct questions.

        ### Main Objectives:
        1. Help the user define their **total budget amount**.
        2. Identify the **budgeting period** (e.g., weekly, monthly).
        3. Work with the user to list **categories** (e.g., rent, groceries, entertainment).
        4. Allocate specific amounts to each category.
        5. Ensure the total of all categories does not exceed the overall budget.
        6. Suggest adjustments if the budget is unbalanced or missing key expenses.

        ### Guidance Rules:
        - If any key information is missing (e.g., total amount, timeframe, or category breakdown), ask for it gently.
        - Always explain **why** a step is important in one simple sentence.
        - Make sure the budget feels flexible and achievable.
        - If the user seems unsure, suggest common starting points (e.g., “Many people start by setting aside 50% for needs, 30% for wants, and 20% for savings.”)

        ### Tone & Behavior:
        - Stay warm, friendly, and non-judgmental.
        - Act like a helpful coach or partner.
        - Never overwhelm — break the process down into manageable steps.

        Focus on making budgeting feel easy, useful, and doable — no matter the user's background.
    """
    input_message = state['messages'][-1].content
    budget_amount = state['additional_data']['budget_amount']
    budget_period = state['additional_data']['budget_period']
    categories = state['additional_data']['categories']

    user_prompt = f"""
        {input_message}

        budget_amount: {budget_amount}
        budget_period: {budget_period}
        categories: {categories}
    """
    
    system_message = SystemMessage(content=system_prompt)
    human_message = HumanMessage(content=user_prompt)
    
    response = resolver_model.invoke([system_message, human_message])
    return {'messages': [response]}

def format_response(state: AgentState):
    system_prompt = """
        Your task is to extract important information such as the input, budget amount, budget period, and categories.

        I want the extracted information in plain text JSON format strictly following this structure:
        {
            "input": "<The original input text>",
            "budget_amount": <The total budget amount as a number, without currency symbols>,
            "budget_period": <The time period of the budget>
            "categories": <List of Category object, which includes only name and the amount budgeted towards the category>,
        }

        Guidelines:
        - Only return a valid JSON object with no extra text or explanation.
        - Use numerical values only (no symbols like "$", commas, or text like 'dollars').
        - If a value is missing or unclear, set it to `null` or an empty list as appropriate.
        - Preserve the exact input text in the "input" field.
        - Do not assume or infer categories or amounts not explicitly stated.
        - Do not return anything other than the JSON object.

        Stay strictly aligned with the goal: structured parsing into the specified JSON format.
    """
    input_message = state['messages'][-1].content
    system_message = SystemMessage(content=system_prompt)
    human_message = HumanMessage(content=input_message)
    
    response = format_model.invoke([system_message, human_message])
    return {'messages': [response]}

"""
    May need to have a multi model invocation. Initial model is to get a text and another model to take the result into a json format.
"""
def invoke_model(msg: str, budget_amount: float, categories: list[Category], budget_period: str):
    graph_builder = StateGraph(AgentState)

    graph_builder.add_node("resolver", resolve_user_message)
    graph_builder.add_node("formatter", format_response)
    
    graph_builder.add_edge(START, "resolver")
    graph_builder.add_edge("resolver", "formatter")
    graph_builder.add_edge("formatter", END)

    graph_builder.set_entry_point("resolver")

    flow = graph_builder.compile()

    output = flow.invoke({'messages': [msg], 'additional_data': {'budget_amount': budget_amount, 'categories': categories, 'budget_period': budget_period}})
    return output["messages"][-1].content.replace("json", "").replace("```", "")
