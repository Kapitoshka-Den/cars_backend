"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
class CarService {
    database;
    constructor(database) {
        this.database = database;
    }
    PageSize = 20;
    async findAll(filter) {
        filter.models =
            typeof filter.models === 'string' ? [filter.models] : filter.models;
        const pipeline = [
            {
                $match: {
                    mark: filter.mark ?? /\A/,
                    model: { $in: filter.models ?? [/\A/, null] },
                },
            },
            {
                $facet: {
                    count: [{ $count: 'count' }],
                    result: [
                        { $skip: (filter.pageNumber - 1) * filter.pageSize },
                        { $limit: filter.pageSize },
                    ],
                },
            },
        ];
        const result = await this.database
            .collection('stock')
            .aggregate(pipeline)
            .toArray();
        console.log();
        return {
            cars: result[0].result,
            count: result[0].count[0].count,
        };
    }
    async countByMark() {
        return await this.database
            .collection('stock')
            .aggregate([
            { $group: { _id: '$mark', count: { $sum: 1 } } },
            { $addFields: { mark: '$_id' } },
            { $project: { _id: 0 } },
        ])
            .toArray();
    }
    async getModels(mark) {
        console.log(mark);
        return await this.database
            .collection('stock')
            .aggregate([
            {
                $match: { $and: [{ mark: mark ?? /\A/ }, { model: { $ne: null } }] },
            },
            {
                $group: {
                    _id: '$model',
                    model: { $first: '$model' },
                    mark: { $first: '$mark' },
                },
            },
            { $project: { _id: 0 } },
        ])
            .toArray();
    }
}
exports.CarService = CarService;
