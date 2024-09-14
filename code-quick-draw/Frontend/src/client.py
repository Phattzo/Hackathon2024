# client.py
import asyncio
import websockets

async def send_message(uri):
    async with websockets.connect(uri) as websocket:
        # Send a message
        await websocket.send("Hello, WebSocket!")
        print("Message sent")

        # Receive a message
        response = await websocket.recv()
        print(f"Message received: {response}")

if __name__ == "__main__":
    uri = "ws://localhost:8765"
    asyncio.run(send_message(uri))
