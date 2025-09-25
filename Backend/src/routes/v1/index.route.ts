import express, { Router } from 'express';
import authRoutes from './auth.route.js';
import config from '../../config/config.js';

const router = express.Router();

interface Route {
  path: string;
  route: Router;
}

const defaultRoutes: Route[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  // {
  //   path: '/users',
  //   route: userRoute
  // },
];

// const devRoutes: Route[] = [
//   // Routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute
//   }
// ];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
