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
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const crypto_1 = require("crypto");
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
const eventsRouter = (0, express_1.Router)();
const PORT = 4001;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/', eventsRouter);
app.use('/posts', router);
const commentsByPostId = {};
router.get('/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});
router.get('/comments', (req, res) => {
    res.send(commentsByPostId);
});
router.post('/:id/comments', (req, res) => {
    const commentId = (0, crypto_1.randomBytes)(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: 'pending' });
    commentsByPostId[req.params.id] = comments;
    axios_1.default.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            status: 'pending',
            postId: req.params.id,
        },
    });
    res.status(201).send(comments);
});
eventsRouter.post('/events', (req, res) => {
    console.log('Received Event', req.body);
    res.status(200).send({ status: 'OK' });
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
