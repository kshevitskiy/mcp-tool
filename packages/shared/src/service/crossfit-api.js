"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
exports.getWod = getWod;
const axios_1 = __importDefault(require("axios"));
exports.client = axios_1.default.create({
    baseURL: 'https://www.crossfit.com',
    headers: {
        Accept: 'application/json',
    },
});
function getWod({ year, month, day, }) {
    return exports.client.get(`/workout/${year}/${month}/${day}`);
}
