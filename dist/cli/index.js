#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const path = require("path");
const clime_1 = require("clime");
const cli = new clime_1.CLI('minda', path.join(__dirname, 'commands'));
const shim = new clime_1.Shim(cli);
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield shim.execute(process.argv).then(() => {
            console.log('execute then');
        }).catch((error) => {
            console.log(error);
            process.exit(-1);
        });
        console.log('execute end');
        // process.exit(0);
    });
})();
//# sourceMappingURL=index.js.map