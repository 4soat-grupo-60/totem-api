import * as express from "express";

import IAppRoute from "./IAppRoute";
import { mapOrderToResponse } from "../dto/order";
import { DbConnection } from "../../interfaces/dbconnection";
import { OrderQueueController } from "../../controllers/queue";
import { handleAPIError } from "../error/APIErrorHandler";

export default class OrderQueueRoute implements IAppRoute {
  private dbConnection: DbConnection;

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
  }

  private ROUTE_BASE_PATH = "/api/order/queue";

  setup(app: express.Application): void {
    app.route(`${this.ROUTE_BASE_PATH}/pending`).get(async (req, res) => {
      try {
        const orders = await OrderQueueController.getOrdersWithStatusPending(
          this.dbConnection
        );

        res.status(200).send(orders.map(mapOrderToResponse));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(`${this.ROUTE_BASE_PATH}/preparing`).get(async (req, res) => {
      try {
        const orders = await OrderQueueController.getOrdersWithStatusPreparing(
          this.dbConnection
        );

        res.status(200).send(orders.map(mapOrderToResponse));
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(`${this.ROUTE_BASE_PATH}/prepared`).get(async (req, res) => {
      try {
        const orders = await OrderQueueController.getOrdersWithStatusPrepared(
          this.dbConnection
        );

        res.status(200).send(orders.map(mapOrderToResponse));
      } catch (e) {
        handleAPIError(res, e);
      }
    });
  }
}
