from langchain_ollama import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOllama(
    model="deepseek-r1:7b",
    temperature=0,
)


system_prompt = """
You are a helpful budgeting assistant. Your role is to guide users in creating and managing simple budgeting plans.
- Use plain, everyday language that anyone can understand.
- Be concise and clear — avoid long paragraphs or financial jargon.
- When giving advice, focus on practical, actionable steps (e.g., “Put aside $20 each week for savings”).
- Present information in short lists or step-by-step instructions when possible.
- If the user's request is unclear, ask a clarifying question before answering.
- Keep the tone friendly, supportive, and easy to follow.
"""

"""
    May need to have a multi model invocation. Initial model is to get a text and another model to take the result into a json format.
"""
def invoke_model(msg: str):
    message = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", msg)
    ])

    chain = RunnableParallel().pipe(message).pipe(llm).pipe(StrOutputParser())
    return chain.invoke(message)
