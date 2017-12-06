/// <reference types="dockerode" />
import * as Dockerode from 'dockerode';
import { Container } from './container';
export declare class Docker {
    private client;
    constructor();
    version(): Promise<never>;
    containerList(option?: {}): Promise<Dockerode.ContainerInfo[]>;
    getContainer(id: string): Container;
}
