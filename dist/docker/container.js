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
class Container {
    constructor(dockerode, container) {
        this.client = dockerode;
        this.container = container;
    }
    stop() {
        if (this.container !== undefined) {
            this.container.stop();
        }
    }
    getContainer() {
        return this.container;
    }
    getAttachStream(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.container.attach(options);
        });
    }
    getExec(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.container.exec(options);
        });
    }
    getExecStream(exec, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exec.start(options);
        });
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map