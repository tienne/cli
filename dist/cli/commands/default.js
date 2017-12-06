"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = require("../../../package.json");
exports.description = `
==============================
minda-cli: v${package_json_1.version}
maintainer: ${package_json_1.author.name}
==============================
`;
exports.subcommands = [
    { name: 'worker' }
];
//# sourceMappingURL=default.js.map