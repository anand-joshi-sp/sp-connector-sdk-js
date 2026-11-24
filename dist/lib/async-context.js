"use strict";
/* Copyright (c) 2021. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextState = void 0;
const async_hooks_1 = require("async_hooks");
exports.contextState = new async_hooks_1.AsyncLocalStorage();
//# sourceMappingURL=async-context.js.map