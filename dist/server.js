"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = Server;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const car_controller_1 = require("./controllers/car.controller");
const car_service_1 = require("./services/car.service");
async function Server() {
    const server = (0, express_1.default)();
    const port = process.env.PORT;
    const database_url = process.env.MONGODB_CONNECT_URL;
    const dbClient = new mongodb_1.MongoClient(database_url);
    let connect = await dbClient.connect();
    const database = connect.db('hrTest');
    const carService = new car_service_1.CarService(database);
    server.use(express_1.default.json());
    server.use((0, cors_1.default)());
    server.use('/cars', (0, car_controller_1.CarController)(carService));
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
