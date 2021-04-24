const UserModel = use('App/Models/User');
const Logger = use('Logger');
class UserBusiness {
  constructor() {
    this.userModel = new UserModel();
  }
  async index() {
    try {
      const dataFromDB = await UserModel.all();
      return dataFromDB;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }

  async login(request, response, auth) {
    try {
      const {email, password} = request.all();
      const responseData = await auth.attempt(email, password);
      return responseData;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async store(request, response, auth, idToUpdate) {
    try {
      const bodyRequest = request.all();
      let responseData = {};
      if (idToUpdate) {
        this.userModel = await UserModel.findOrFail(idToUpdate);
        responseData = this.userModel;
      }
      this.userModel.merge(bodyRequest);
      await this.userModel.save();
      return responseData;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  update(request) {
    return this.store(request, null, null, request.params.id);
  }

  async show(request) {
    try {
      const {id} = request.params;
      const user = await UserModel.find(id);
      return user;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async destroy(request) {
    try {
      const {id} = request.params;
      const user = await UserModel.find(id);
      await user.delete();
      return user;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }
}

module.exports = UserBusiness;