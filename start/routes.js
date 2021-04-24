'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
use('Config/redis').createConnection();
const pkgjson = require('../package.json');
const GraphQlController = use('App/Controllers/Http/GraphqlController');

Route.group(() => {
  Route.post('/graphql',GraphQlController.graphql());
  Route.get('/api-graphql-docs', GraphQlController.graphiQl(`${pkgjson.prefix}/v1/graphql`));
  Route.post('/signup', 'UserController.store');
  Route.post('/login', 'UserController.login');
}).prefix(`${pkgjson.prefix}/v1`)

Route.any('*', ({response}) => response.status(404).send('Não encontrado.') )
