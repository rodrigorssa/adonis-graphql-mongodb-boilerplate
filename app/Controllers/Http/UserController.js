'use strict';
const {controller} = use('App/Factories/Controller');
const UserBusiness = use('App/Business/User');

class UserController {
  index(ctx) {
    return controller(UserBusiness, 'index', ctx);
  }

  login(ctx) {
    return controller(UserBusiness, 'login', ctx);
  }

  show(ctx) {
    return controller(UserBusiness, 'show', ctx);
  }

  store(ctx) {
    return controller(UserBusiness, 'store', ctx);
  }

  update(ctx) {
    return controller(UserBusiness, 'update', ctx);
  }

  destroy(ctx) {
    return controller(UserBusiness, 'destroy', ctx);
  }
}

module.exports = UserController;