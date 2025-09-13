from langchain_ollama import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph import StateGraph, START, END
from langgraph.graph.graph import add_messages
from langchain_core.messages import BaseMessage
from langchain_openai import ChatOpenAI

class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]

resolver_model = ChatOllama(
    model="gemma3n:latest",
    temperature=0,
)

format_model = ChatOllama(
    model="gemma3n:latest",
    temperature=0,
)

def resolve_user_message(state):
    system_prompt = """
    You are a helpful budgeting assistant. Your role is to guide users in creating and managing simple budgeting plans.
    - Use plain, everyday language that anyone can understand.
    - Be concise and clear — avoid long paragraphs or financial jargon.
    - When giving advice, focus on practical, actionable steps (e.g., “Put aside $20 each week for savings”).
    - Present information in short lists or step-by-step instructions when possible.
    - If the user's request is unclear, ask a clarifying question before answering.
    - Keep the tone friendly, supportive, and easy to follow.

    Your goal is to identify what the users budgeted amount, the budget period, and categories with their corresponding budgeted amount.
    """

    input_message = state['messages'][-1].content
    response = resolver_model.invoke()
    return {'messages': [response]}

def format_response(state):
    format_prompt = """
    Given an input I want you to parse the input into a json, the json should be the same structure as:
    {
        "input": [Contains the input that will be parsed],
        "budget_amount": [This is the amount that we will budget],
        "categories": [List of category name with the amount allocated to that category]
    }

    Do not steer away from the goal. I only want the parsed json as mentioned above.
    """

    input_message = state['messages'][-1].content
    response = format_model.invoke()
    return {'messages': [response]}

"""
    May need to have a multi model invocation. Initial model is to get a text and another model to take the result into a json format.
"""
def invoke_model(msg: str):
    graph_builder = StateGraph(AgentState)

    graph_builder.add_node("resolver", resolve_user_message)
    graph_builder.add_node("formatter", format_response)
    graph_builder.add_edge("resolver", "formatter")
    graph_builder.add_edge("formatter", END)

    graph_builder.set_entry_point("resolver")

    flow = graph_builder.compile()

    message = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", msg)
    ])

    chain = RunnableParallel().pipe(message).pipe(llm).pipe(StrOutputParser())
    return chain.invoke(message)
