"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controllers/AuthController");
var AppRouter_1 = require("./AppRouter");
var app = express_1.default();
app.use(express_1.default.json());
app.use(cookie_session_1.default({ keys: ['hey'] }));
app.use(AppRouter_1.AppRouter.getInstance());
app.get('/', function (req, res) {
    if (req.session && req.session.isLoggedIn) {
        res.json({ message: 'Logged in!' });
    }
    return res.json({ error: 'Please signin' });
});
app.listen(3000, function () {
    console.log('Listening on Port 3000');
});
