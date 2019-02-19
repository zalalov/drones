import React, {Component} from 'react';
import {Alert, Col, Modal, Button, Form} from 'react-bootstrap';
import {API_URL} from "./config";

class CreateDroneModal extends Component {
  constructor(props) {
    super(props);

    this.resetParams = this.resetParams.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.resetParams();
  }

  resetParams() {
    this.setState({
      error: '',
      X: null,
      Y: null,
      quadrant: null
    });
  }

  submit() {
    const {X, Y, quadrant} = this.state;

    fetch(
      `${API_URL}/drones`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({x: X, y: Y, quadrant: quadrant})
      })
      .then(response => this.handleResponse(response))
  }

  handleResponse(response) {
    const res = response.json();

    if (response.status >= 400) {
      this.setState({
        error: 'Unable to create drone.'
      });
    } else {
      this.props.toggle();
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.toggle}>
        <Form onSubmit={this.submit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Drone</Modal.Title>
          </Modal.Header>
          {this.state.error && (
            <Alert variant="danger">
              {this.state.error}
            </Alert>
          )}
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="x">
                <Form.Label>X</Form.Label>
                <Form.Control required onChange={(e) => this.setState({X: e.target.value})}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid float value.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="y">
                <Form.Label>Y</Form.Label>
                <Form.Control required onChange={(e) => this.setState({Y: e.target.value})} />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid float value.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="quadrant">
                <Form.Label>Quadrant</Form.Label>
                <Form.Control required onChange={(e) => this.setState({quadrant: e.target.value})}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid integer value.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.toggle}>
              Close
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default CreateDroneModal;