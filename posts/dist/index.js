"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const crypto_1 = require("crypto");
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
const eventsRouter = (0, express_1.Router)();
const PORT = 4000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/', eventsRouter);
app.use('/posts', router);
const posts = {};
router.get('/', (req, res) => {
    res.send(posts);
});
router.post('/', async (req, res) => {
    const id = (0, crypto_1.randomBytes)(4).toString('hex');
    const { title } = req.body;
    posts[id] = { id, title };
    await axios_1.default.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: { id, title },
    });
    res.status(201).send(posts[id]);
});
router.delete('/:postId', (req, res) => {
    const { postId } = req.params;
    if (posts[postId]) {
        delete posts[postId];
        res.status(200).send('deleted');
    }
    else {
        res.status(404).send('not found');
    }
});
eventsRouter.post('/events', (req, res) => {
    console.log('Received Event', req.body);
    res.status(200).send({ status: 'OK' });
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
