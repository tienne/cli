"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const clime_1 = require("clime");
const docker_1 = require("../../../docker");
const chalk_1 = require("chalk");
let default_1 = class extends clime_1.Command {
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const docker = new docker_1.Docker();
            const containers = yield docker.containerList();
            const apiWorker = containers.find((containerInfo) => {
                return containerInfo.Image === 'minda-workspace';
            });
            if (apiWorker !== undefined) {
                const workerContainer = docker.getContainer(apiWorker.Id);
                const execOption = {
                    Cmd: ['/var/www/artisan', command],
                    AttachStdin: false,
                    AttachStdout: true
                };
                const exec = yield workerContainer.getExec(execOption);
                yield exec.start({ hijack: false }).then((result) => {
                    console.log(chalk_1.green(`
======================
artisan ${command}
======================`));
                });
            }
            else {
                throw new Error('workspace 가 실행되어 있지 않습니다.');
            }
        });
    }
};
__decorate([
    clime_1.metadata,
    __param(0, clime_1.param({
        required: true,
        description: 'artisan 으로 실행시킬 명령어',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "execute", null);
default_1 = __decorate([
    clime_1.command({
        description: 'workspace 에 artisan 명령을 실행시킵니다.'
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=artisan.js.map