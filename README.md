# Drones G-system
### A couple of moments you need to know about:
* System contains 2 parts API (Nodejs) and UI (React)
* For running tests (for API) you'll need to do next:
```
$ cd back-end
$ npm install
$ npm run test
```
* For running the whole system do next:
```
$ docker-compose up
```
(Wait a little bit while webpack will create a bundle, it could take up to 10 sec)
UI will be available on http://localhost:3000
* *+* button in header is for adding new drones
* Drones out of quadrant are shown as red lines in the table
* Drones inside quadrant are shown as green lines
* Every drone in the system will be shown in table
* There could be small delay after adding new drone. List update is done by websocket and updates every 3 seconds.
