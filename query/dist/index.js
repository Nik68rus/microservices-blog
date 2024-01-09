"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 4002;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const posts = {};
app.get('/posts', (req, res) => {
    res.send(posts);
});
app.post('/events', (req, res) => {
    const { type, data } = req.body;
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    if (type === 'CommentCreated') {
        const { id, content, postId } = data;
        posts[postId].comments.push({ id, content });
    }
    console.log(posts);
    res.send({});
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
