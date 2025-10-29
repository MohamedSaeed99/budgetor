import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from websockets.exceptions import ConnectionClosed
from utils.ai import invoke_model
from database.redis_connection import get_messages, add_message

router = APIRouter()

@router.websocket("/chat")
async def chat_websocket(websocket: WebSocket):
    await websocket.accept()

    try:        
        while True:
            msg = await websocket.receive_text()
            parsed_message = json.loads(msg)
            add_message(parsed_message['section_id'], {"msg": parsed_message['message'], "isUser": True})
            
            response = invoke_model(parsed_message)
            json_resp = json.dumps(response)
            
            add_message(parsed_message['section_id'],{'msg': json_resp['input'], 'isUser': False})
            await websocket.send_text(response)
                
    except (WebSocketDisconnect, ConnectionClosed):
        print("Chat client disconnected")
 