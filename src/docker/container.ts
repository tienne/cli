import * as Dockerode from 'dockerode';
import {Docker} from './docker';
import {Exec} from 'dockerode';

export class Container {
  private client: Dockerode;
  private container: Dockerode.Container;

  constructor (dockerode: Dockerode, container: Dockerode.Container) {
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

  async getAttachStream(options: {}) {
    return await this.container.attach(options);
  }

  async getExec(options: {}) {
    return await this.container.exec(options);
  }

  async getExecStream(exec: Exec, options: {}) {
    return await exec.start(options);
  }

}
