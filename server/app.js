/**
 * @description HTTP server module
 * @param http
 */
import http from 'http';

/**
 * @description Express Framework module
 * @param express
 */
import express from 'express';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @description Configure env variables
 * @param config
 */
import dotenv from 'dotenv-safe'
dotenv.config({
  path: `${__dirname}/config/.env`,
  sample: `${__dirname}/.env.example`,
  allowEmptyValues: false
});

/**
 * @description Database config class
 * @param DBConfig
 */
import DBConfig from './config/db.conf.js';

/**
 * @description Routes config class
 * @param Routes
 */
import { initRoutes } from './config/routes.conf.js';

/**
 * @description IApplication config class
 * @param Routes
 */
import ApplicationConfig from './config/app.conf.js';

/**
 * @description Create application with Express Framework
 * @param app
 */
const app = express();

/**
 * @description Create application server
 * @param server
 */
const server = http.createServer(app);

/**
 * @description Configure Database
 */
DBConfig.init();

/**
 * @description Configure Application
 */
ApplicationConfig.init(app);

/**
 * @description Configure Routes
 */
initRoutes(app);

/**
 * @function startServer
 * @description Start API Server
 */
const startServer = () => {
  server.listen(process.env.PORT, process.env.IP, () => {
    console.log('Express server listening on %s:%s in %s mode', process.env.IP, process.env.PORT, process.env.NODE_ENV);
  });
};

/**
 * @description Starting API Server after everythin is set up
 */
setImmediate(startServer);

/**
 * @description Application object
 * @module app
 */
export default app;
