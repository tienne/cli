/// <reference types="dockerode" />
/// <reference types="node" />
import * as Dockerode from 'dockerode';
import { Exec } from 'dockerode';
export declare class Container {
    private client;
    private container;
    constructor(dockerode: Dockerode, container: Dockerode.Container);
    stop(): void;
    getContainer(): Dockerode.Container;
    getAttachStream(options: {}): Promise<NodeJS.ReadableStream>;
    getExec(options: {}): Promise<any>;
    getExecStream(exec: Exec, options: {}): Promise<any>;
}
