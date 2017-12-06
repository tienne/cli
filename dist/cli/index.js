#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const path = require("path");
const clime_1 = require("clime");
const cli = new clime_1.CLI('minda', path.join(__dirname, 'commands'));
const shim = new clime_1.Shim(cli);
shim.execute(process.argv).then(() => {
    process.exit(0);
}).catch((error) => {
    console.log(error);
    process.exit(-1);
});
//# sourceMappingURL=index.js.map