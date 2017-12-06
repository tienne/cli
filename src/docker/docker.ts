import * as Dockerode from 'dockerode';
import { isWindows } from '../util';
import {Container} from './container';

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

  async version() {
    let version;
    let errorMsg = '';

    await this.client.version((error, info) => {
      if (error) {
        errorMsg = error;
      } else {
        version = info.Version;
      }
    });

    if (version === undefined) {
      throw new Error(errorMsg);
    }

    return version;
  }

  async containerList(option?: {}) {
    let containers: Dockerode.ContainerInfo[] = [];
    try {
      await this.client.listContainers(option).then((containerList) => {
        containers = containerList;
      });
    } catch (e) {
      throw new Error('컨테이너 리스트를 불러올 수 없습니다.');
    }

    return containers;
  }

  getContainer(id: string) {
    const container = this.client.getContainer(id);
    return new Container(this.client, container);
  }
}
