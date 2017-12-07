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
let default_1 = class extends clime_1.Command {
    execute(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            const docker = new docker_1.Docker();
            const containers = yield docker.containerList();
            const apiWorker = containers.find((containerInfo) => {
                return containerInfo.Image === 'minda-api-worker';
            });
            if (apiWorker !== undefined) {
                const container = docker.getContainer(apiWorker.Id);
                const execOption = {
                    Cmd: ['/var/www/artisan', ...commands],
                    AttachStdin: false,
                    AttachStdout: true,
                    AttachStderr: true
                };
                const exec = yield container.getExec(execOption);
                const result = yield container.getExecStream(exec, { hijack: false, stdout: true, stdin: false, stderr: true });
                const stream = result.output;
                container.getContainer().modem.demuxStream(stream, process.stdout, process.stderr);
                stream.on('end', () => {
                    console.log(`
====================================================
artisan ${commands.join(' ')} 완료
=====================================================`);
                    stream.destroy();
                    process.exit(0);
                });
                stream.on('close', () => {
                    process.exit(0);
                });
            }
            else {
                throw new Error('woker 가 실행되어 있지 않습니다.');
            }
        });
    }
};
__decorate([
    clime_1.metadata,
    __param(0, clime_1.params({ type: String, required: true, description: 'artisan 으로 실행시킬 명령어' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], default_1.prototype, "execute", null);
default_1 = __decorate([
    clime_1.command({
        description: 'php-worker에 artisan 명령을 실행시킵니다.'
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=artisan.js.map