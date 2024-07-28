"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = CarController;
const express_1 = require("express");
function CarController(service) {
    const car_router = (0, express_1.Router)();
    car_router.get('/', async (req, res) => {
        let filter = req.query;
        filter.pageSize = Number(req.query.pageSize) || 20;
        filter.pageNumber = Number(req.query.pageNumber) || 1;
        let cars;
        try {
            cars = await service.findAll(filter);
            if (!cars) {
                res.status(404).send('Car not found');
            }
            else {
                res.status(200).send(cars);
            }
        }
        catch (error) {
            res.status(500).send('Internal server error:' + error);
        }
    });
    car_router.get('/marks', async (req, res) => {
        try {
            res.status(200).send(await service.countByMark());
        }
        catch (error) {
            res.status(500).send('Internal server error:' + error);
        }
    });
    car_router.get('/models', async (req, res) => {
        const mark = req.query.mark;
        try {
            const test = await service.getModels(mark);
            res.status(200).send(test);
        }
        catch (error) {
            res.status(500).send('Internal server error:' + error);
        }
    });
    return car_router;
}
