import request from 'supertest';
import {server, wss} from '../app.js';
import store from '../store/drones.live.store';

describe('testing drones API', function () {
  let s;
  let ws;
  beforeEach(function () {
    s = server();
    ws = wss(s);
  });
  afterEach(function () {
    ws.close();
    s.close();
  });
  it('responds to /', function testSlash(done) {
    request(s)
      .get('/')
      .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(s)
      .get('/foo/bar')
      .expect(404, done);
  });
  it('is empty list of drones', function testEmptyDronesList(done) {
    request(s)
      .get('/api/drones')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        if (res.body.length) {
          done(Error('drones list is not empty'));
        } else {
          done();
        }
      });
  });
  it('create drone', function createDrone(done) {
    let drone = {
      x: 1,
      y: 1,
      quadrant: 1
    };

    request(s)
      .post('/api/drones')
      .set('Content-Type', 'application/json')
      .send(drone)
      .expect(200)
      .end((err, res) => {
        if (res.body.x === drone.x && res.body.y === drone.y && res.body.quadrant === drone.quadrant) {
          done();
        } else {
          done(Error('Failed to create drone.'));
        }
      });
  });
  it('remove drone', function removeDrone(done) {
    let drone = {
      x: 1,
      y: 1,
      quadrant: 1
    };

    request(s)
      .post('/api/drones')
      .set('Content-Type', 'application/json')
      .send(drone)
      .expect(200)
      .end((err, res) => {
        let {id} = res.body;

        request(s)
          .delete(`/api/drones/${id}`)
          .send()
          .expect(200)
          .end(() => {
            request(s)
              .get('/api/drones')
              .end((err, res) => {
                if (!res.body.find(drone => drone.id === id)) {
                  done();
                } else {
                  done(Error('Drone remove failed.'))
                }
              })
          })
      })
  });
});