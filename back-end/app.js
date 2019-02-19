import path from 'path';
import app from './config/express';
import routes from './routes/index.route';
import * as errorHandler from './middlewares/errorHandler';
import joiErrorHandler from './middlewares/joiErrorHandler';
import DroneWSServer from './ws/drone.ws.server';

// Router
app.use('/api', routes);

// Landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Joi Error Handler
app.use(joiErrorHandler);

// Error Handler
app.use(errorHandler.notFoundErrorHandler);
app.use(errorHandler.errorHandler);

let makeServer = () => {
  return app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
  });
};

let makeWss = (server) => {
  return new DroneWSServer(server);
};

export let server = makeServer;
export let wss = makeWss;

if (!module.parent) {
  makeServer();
}

export default app;
