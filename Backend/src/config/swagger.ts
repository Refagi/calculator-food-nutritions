import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Claculator Food Nutrition",
      version: "1.0.0",
      description: "API Documentation for Auth and User Management",
    },
    servers: [
      {
        url: "http://localhost:3000/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        refreshCookie: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
        },
        accessCookie: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },
  },
  apis: ["./src/routes/v1/*.ts", "./src/controllers/*.ts"],
  security: [
    { bearerAuth: [] },
    { refreshCookie: [] },
    { accessCookie: [] }
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express, port: number) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`📚 Swagger Docs available at http://localhost:${port}/docs`);
};
