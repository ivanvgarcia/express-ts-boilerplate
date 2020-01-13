"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
exports.controller = function (routerPrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        console.log(target, target.prototype);
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata('path', target.prototype, key);
            var method = Reflect.getMetadata('method', target.prototype, key);
            if (path) {
                router[method]("" + routerPrefix + path, routeHandler);
            }
        }
    };
};
