import React, {Component} from 'react';
import './css/App.css';
import {API_WS_URL} from "./config";
import WebSocket from 'react-websocket';
import {Container, Row, Col} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drones: []
    };

    this.wsMessageHandler = this.wsMessageHandler.bind(this);
  }

  wsMessageHandler(message) {
    try {
      let drones = JSON.parse(message);

      this.setState({
        drones: drones
      });
    } catch(e) {
      console.error('Invalid drones data.');
    }
  }

  render() {
    return (
      <div className="App">
        <main className="App-main">
          <Container>
            <Row>
              <Col xs={3}>Quadrants</Col>
              <Col>Drones</Col>
            </Row>
          </Container>
        </main>
        <WebSocket url={API_WS_URL}
                   onMessage={this.wsMessageHandler}
                   reconnect={true}
                   reconnectIntervalInMilliSeconds={3000}
        />
      </div>
    );
  }
}

export default App;
