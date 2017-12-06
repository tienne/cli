/// <reference types="dockerode" />
import * as Dockerode from 'dockerode';
export declare class Container {
    private client;
    private container;
    constructor(dockerode: Dockerode, container: Dockerode.Container);
    stop(): void;
    getExec(options: {}): Promise<any>;
}
