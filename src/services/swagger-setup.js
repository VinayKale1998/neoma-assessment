import swaggerJsdoc from "swagger-jsdoc";
import { openApiSpec } from "./openApiSpec.js";

//config to wire up the openApiSpecs defined for the routes
export const swaggerOptions = {
  definition: openApiSpec,
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
