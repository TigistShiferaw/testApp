"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const mongoose_1 = require("mongoose");
const gradeSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    grade: { type: String, required: true },
    score: { type: Number, required: true }
});
const addressSchema = new mongoose_1.Schema({
    building: { type: String, required: true },
    street: { type: String, required: true }
});
const restaurantSchema = new mongoose_1.Schema({
    address: addressSchema,
    cuisine: { type: String, required: true },
    grades: [gradeSchema],
    name: { type: String, required: true },
    restaurant_id: { type: String, required: true }
});
exports.Restaurant = (0, mongoose_1.model)('Restaurant', restaurantSchema);
