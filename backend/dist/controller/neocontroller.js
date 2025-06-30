"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseNeo = exports.lookupNeo = exports.neoFeed = void 0;
const async_handler_express_1 = require("async-handler-express");
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../shared/utils");
const neo_apis_1 = require("../nasa-apis/neo-apis");
dotenv_1.default.config();
// For feeds with start and end dates
exports.neoFeed = (0, async_handler_express_1.catchAsync)(async (req, res) => {
    const { start_date, end_date } = req.query;
    if ((0, utils_1.getDateDifferenceInDays)(start_date, end_date) > 7) {
        return res
            .status(403)
            .json({ message: "The date range cannot exceed 7 days." });
    }
    const feedUrl = `${neo_apis_1.neoFeedURL}?start_date=${start_date}&end_date=${end_date}&api_key=${process.env.NASA_API_KEY}`;
    const response = await fetch(feedUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status == 404)
        return res.status(404).json({ message: "NEO not found." });
    if (response.status == 500)
        return res.status(500).json({ message: "Internal server error." });
    const responseData = await response.json();
    return res.status(200).json(responseData);
});
// For lookup one particular NEO by ID
exports.lookupNeo = (0, async_handler_express_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ message: "ID parameter is required." });
    const lookupUrl = `${neo_apis_1.neoLookupURL}/${id}?api_key=${process.env.NASA_API_KEY}`;
    const response = await fetch(lookupUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status == 404)
        return res.status(404).json({ message: "NEO not found." });
    if (response.status == 500)
        return res.status(500).json({ message: "Internal server error." });
    if (response.status == 200) {
        const responseData = await response.json();
        return res.status(200).json(responseData);
    }
});
// For brwsing the entire dataset
exports.browseNeo = (0, async_handler_express_1.catchAsync)(async (req, res) => {
    let browseURL = `${neo_apis_1.neoBrowseURL}?api_key=${process.env.NASA_API_KEY}`;
    if (req.query.page) {
        browseURL += `&page=${req.query.page}`;
    }
    console.log(browseURL);
    const response = await fetch(browseURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let data;
    if (response.status == 404)
        return res.status(404).json({ message: "NEO not found." });
    if (response.status == 500)
        return res.status(500).json({ message: "Internal server error." });
    if (response.status == 200) {
        const responseData = await response.json();
        data = responseData;
        if (req.query.name) {
            data = responseData.near_earth_objects.filter((neo) => {
                return neo.name.toLowerCase().includes((req.query.name.toString()).toLowerCase());
            });
        }
        if (req.query.id) {
            data = responseData.near_earth_objects.filter((neo) => {
                return neo.neo_reference_id === (req.query.id);
            });
        }
        return res.status(200).json(data);
    }
});
