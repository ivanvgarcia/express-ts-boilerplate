"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.isLoggedIn) {
        next();
        return;
    }
    res.status(403).json({ error: 'not permitted' });
}
var router = express_1.Router();
router.get('/login', function (req, res) {
    var Boat = /** @class */ (function () {
        function Boat() {
            this.color = 'red';
        }
        Object.defineProperty(Boat.prototype, "formattedColor", {
            get: function () {
                return "This boats color is " + this.color;
            },
            enumerable: true,
            configurable: true
        });
        Boat.prototype.pilot = function () {
            console.log('swish');
        };
        return Boat;
    }());
    res.send({ message: 'GET' });
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    console.log(email, password);
    if (email &&
        password &&
        email === 'ivanvlora@gmail.com' &&
        password === 'password') {
        req.session = { isLoggedIn: true };
        return res.json({ success: true, data: { email: email, password: password } });
    }
    res.json({ success: false, data: null });
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.json({ message: 'youre logged out!' });
});
router.get('/protected', requireAuth, function (req, res) {
    res.json({ message: 'protected route homes!' });
});
exports.default = router;
