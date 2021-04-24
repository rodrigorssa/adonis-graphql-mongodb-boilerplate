const pkgjson = require('../package.json');
module.exports = {
  enable: true,
  specUrl: `/swagger.json`,

  options: {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: pkgjson.description,
        version: pkgjson.version,
      },

      servers: [
        {
          url:`${pkgjson.prefix}/v1`
        }
      ],

      components:{
        securitySchemes: {
          BearerAuth: {
            type:"http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      },
      security: [
        {
          BasicAuth: []
        }
      ],
      consumes: ['application/json'],
    },
    apis: [
      'docs/*.yml',
      'start/routes.js'
    ],
  },
};