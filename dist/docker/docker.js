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
const Dockerode = require("dockerode");
const util_1 = require("../util");
const container_1 = require("./container");
class Docker {
    constructor() {
        try {
            if (util_1.isWindows()) {
                this.client = new Dockerode({ socketPath: '//./pipe/docker_engine' });
            }
            else {
                this.client = new Dockerode({ socketPath: '/var/run/docker.sock' });
            }
        }
        catch (error) {
            throw new Error('Docker daemon not running');
        }
    }
    version() {
        return __awaiter(this, void 0, void 0, function* () {
            let version;
            let errorMsg = '';
            yield this.client.version((error, info) => {
                if (error) {
                    errorMsg = error;
                }
                else {
                    version = info.Version;
                }
            });
            if (version === undefined) {
                throw new Error(errorMsg);
            }
            return version;
        });
    }
    containerList(option) {
        return __awaiter(this, void 0, void 0, function* () {
            let containers = [];
            try {
                yield this.client.listContainers(option).then((containerList) => {
                    containers = containerList;
                });
            }
            catch (e) {
                throw new Error('컨테이너 리스트를 불러올 수 없습니다.');
            }
            return containers;
        });
    }
    getContainer(id) {
        const container = this.client.getContainer(id);
        return new container_1.Container(this.client, container);
    }
}
exports.Docker = Docker;
//# sourceMappingURL=docker.js.map