"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 4003;
app.use(body_parser_1.default.json());
app.post('/events', (req, res) => {
    console.log(req.body);
    res.send({});
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
