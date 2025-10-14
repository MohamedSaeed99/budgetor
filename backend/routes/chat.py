import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from websockets.exceptions import ConnectionClosed

from utils.ai import invoke_model

router = APIRouter()

@router.websocket("/chat")
async def chat_websocket(websocket: WebSocket):
    await websocket.accept()

    try:        
        while True:
            msg = await websocket.receive_text()
            parsed_message = json.loads(msg)
            model_response = invoke_model(parsed_message['message'], parsed_message['budget_amount'], parsed_message['categories'], parsed_message['budget_period'])
            await websocket.send_text(json.dumps(model_response))
                
    except (WebSocketDisconnect, ConnectionClosed):
        print("Chat client disconnected")
 