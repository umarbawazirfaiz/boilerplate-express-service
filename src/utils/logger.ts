import pinoHttp from "pino-http";
import pino from "pino";
import { getConfig } from "../config";

const config = getConfig();

export const logger = pino({
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
  level: config.LOG_LEVEL,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  ...(config.NODE_ENV === "development" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  }),
});

export const loggerHttp = pinoHttp({
  logger: logger,
  // customReceivedObject: (req, res, val) => {
  //   return {
  //     category: 'ApplicationEvent',
  //     eventCode: 'REQUEST_RECEIVED'
  //   };
  // },
  
  customSuccessMessage: function (req, res) {
    if (res.statusCode === 404) {
      return "resource not found";
    }
    return `${req.method} completed`;
  },

  // Define a custom error message
  customErrorMessage: function (req, res, err) {
    return "request errored with status code: " + res.statusCode;
  },

  // Override attribute keys for the log object
  customAttributeKeys: {
    req: "request",
    res: "response",
    err: "error",
  },
});
