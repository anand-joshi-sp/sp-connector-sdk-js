"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StdSpecReadDefaultHandler = void 0;
const util_1 = require("util");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const specFilePath = "connector-spec.json";
const StdSpecReadDefaultHandler = async (_context, _input, res) => {
    // Read from CWD if exists, otherwise check if it is in the same directory as this file
    if ((0, fs_1.existsSync)(specFilePath)) {
        const data = await (0, util_1.promisify)(fs_1.readFile)(specFilePath);
        res.send({
            specification: JSON.parse(data.toString())
        });
    }
    else {
        const data = await (0, util_1.promisify)(fs_1.readFile)(path_1.default.join(__dirname, specFilePath));
        res.send({
            specification: JSON.parse(data.toString())
        });
    }
};
exports.StdSpecReadDefaultHandler = StdSpecReadDefaultHandler;
//# sourceMappingURL=connector-spec.js.map