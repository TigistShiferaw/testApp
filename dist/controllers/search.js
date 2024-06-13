"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuzzySearchRestaurants = void 0;
const Restaurant_1 = require("../models/Restaurant");
async function fuzzySearchRestaurants(query) {
    try {
        return await Restaurant_1.Restaurant.find({
            $or: [
                { name: { $regex: new RegExp(query, 'i') } },
                { cuisine: { $regex: new RegExp(query, 'i') } },
                { 'address.street': { $regex: new RegExp(query, 'i') } },
            ]
        }).lean().exec();
    }
    catch (error) {
        throw new Error('Error fetching restaurants');
    }
}
exports.fuzzySearchRestaurants = fuzzySearchRestaurants;
