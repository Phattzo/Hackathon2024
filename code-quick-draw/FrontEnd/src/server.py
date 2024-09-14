# server.py
import asyncio
import websockets

connected_clients = set()

async def handle_client(websocket, path):
    # Register the client
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            # Broadcast received message to all connected clients
            if connected_clients:  # Check if there are any connected clients
                await asyncio.wait([client.send(message) for client in connected_clients])
    finally:
        # Unregister the client
        connected_clients.remove(websocket)

async def main():
    async with websockets.serve(handle_client, "localhost", 8765):
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
