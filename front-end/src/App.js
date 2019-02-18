import React, {Component} from 'react';
import './css/App.css';
import {API_WS_URL} from "./config";
import WebSocket from 'react-websocket';
import {Button, Col, ListGroup, Modal, Navbar, Row, Tab, Table} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drones: [],
      modal: false
    };

    this.wsMessageHandler = this.wsMessageHandler.bind(this);
    this.getQuadrants = this.getQuadrants.bind(this);
    this.getDronesByQuadrant = this.getDronesByQuadrant.bind(this);
    this.renderQuadrantsList = this.renderQuadrantsList.bind(this);
    this.toggleCreateModal = this.toggleCreateModal.bind(this);
    this.renderCreateModal = this.renderCreateModal.bind(this);
  }

  wsMessageHandler(message) {
    try {
      let drones = JSON.parse(message);

      this.setState({
        drones: drones
      });
    } catch (e) {
      console.error('Invalid drones data.');
    }
  }

  getQuadrants() {
    return [...new Set(this.state.drones.map(drone => drone.quadrant))];
  }

  getDronesByQuadrant(id) {
    return this.state.drones.filter(drone => drone.quadrant === id);
  }

  renderQuadrantsList() {
    const quadrants = this.getQuadrants();

    if (quadrants.length) {
      return (
        <ListGroup>
          {quadrants.map(quadrant =>
            <ListGroup.Item key={`quadrant_${quadrant}`} action href={`#q_${quadrant}`}>
              {quadrant}
            </ListGroup.Item>
          )}
        </ListGroup>
      );
    } else {
      return '';
    }
  }

  renderDronesList() {
    const quadrants = this.getQuadrants();

    return (
      <Tab.Content>
        {quadrants.map(quadrant =>
          <Tab.Pane key={`q_${quadrant}`} eventKey={`#q_${quadrant}`}>
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>ID</th>
                <th>X</th>
                <th>Y</th>
              </tr>
              </thead>
              <tbody>
              {this.getDronesByQuadrant(quadrant).map(drone =>
                <tr key={`d_${drone.id}`}>
                  <td>{drone.id}</td>
                  <td>{drone.x}</td>
                  <td>{drone.y}</td>
                </tr>
              )}
              </tbody>
            </Table>
          </Tab.Pane>
        )}
      </Tab.Content>
    );
  }

  toggleCreateModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  renderCreateModal() {
    return (
      <Modal show={this.state.modal} onHide={this.toggleCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleCreateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.toggleCreateModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Drones G-System</Navbar.Brand>
          <Button variant="outline-info" onClick={this.toggleCreateModal}>+</Button>
        </Navbar>

        <main>
          {!!this.state.drones.length && (
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
              <Row className="justify-content-md-center">
                <Col sm={2}>Quadrants</Col>
                <Col sm={10}>Drones</Col>
              </Row>
              <br/>
              <Row className="justify-content-md-center">
                <Col sm={2}>
                  {this.renderQuadrantsList()}
                </Col>
                <Col sm={10}>
                  {this.renderDronesList()}
                </Col>
              </Row>
            </Tab.Container>
          )}
        </main>

        {this.renderCreateModal()}

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
