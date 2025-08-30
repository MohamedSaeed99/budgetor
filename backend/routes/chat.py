import json
import uuid
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
            print(f'Chat message received: {msg}')
            model_response = invoke_model(msg)
            await websocket.send_text(json.dumps(model_response))
                
    except (WebSocketDisconnect, ConnectionClosed):
        print("Chat client disconnected")
 