import * as WebSocket from "ws";
import dronesStore from '../store/drones.live.store';

class DroneWSServer {
  constructor(server) {
    this.connectionHandler = this.connectionHandler.bind(this);

    return this.initWS(server);
  }

  initWS(server) {
    this._ws = new WebSocket.Server({server});

    this._ws.on('connection', this.connectionHandler);

    return this._ws;
  }

  connectionHandler(ws) {
    setInterval(() => {
      let drones = dronesStore.get();

      if (ws.readyState !== ws.CLOSED) {
        ws.send(JSON.stringify(drones));
      }
    }, 3000);
  }
}

export default DroneWSServer;