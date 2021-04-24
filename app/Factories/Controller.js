'use strict';
const Logger = use('Logger');
exports.controller = (
    BusinessRulesInstance,
    method,
    {request, auth, response},
) =>
  new BusinessRulesInstance()[method](request, response, auth)
      .then((result) => {
        if (result) {
          response.status(200).json(result);
        } else {
          response.noContent();
        }
      })
      .catch((err) => {
        if (err.statusCode) {
          response
              .status(err.statusCode)
              .send(err);
        } else {
          Logger.error(JSON.stringify(err));
          response.internalServerError()
        }
      });