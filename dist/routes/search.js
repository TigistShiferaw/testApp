"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_1 = require("../controllers/search");
const router = express_1.default.Router();
router.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
        const results = await (0, search_1.fuzzySearchRestaurants)(query);
        res.json(results);
    }
    catch (error) {
        res.status(500).json('Internal Error');
    }
});
exports.default = router;
