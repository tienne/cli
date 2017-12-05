import * as Dockerode from 'dockerode';
import { isWindows } from '../util';

export class Docker {
  private client: Dockerode;

  constructor() {
    try {
      if (isWindows()) {
        this.client = new Dockerode({ socketPath: '//./pipe/docker_engine' });
      } else {
        this.client = new Dockerode({ socketPath: '/var/run/docker.sock' });
      }
    } catch (error) {
      throw new Error('Docker daemon not running');
    }
  }
}
