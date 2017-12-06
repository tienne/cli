import { command, Command, metadata } from 'clime';
import { Docker } from '../../../docker';
import { Exec, ContainerInfo } from 'Dockerode';
@command({
  description: 'php-worker의 queue 작업을 재시작합니다. [소스 수정 적용]'
})
export default class extends Command {
  @metadata
  async execute() {
    const docker = new Docker();
    const containers = await docker.containerList();

    const apiWorker = containers.find((containerInfo: ContainerInfo) => {
      return containerInfo.Image === 'minda-api-worker';
    });

    if (apiWorker !== undefined ) {
      const workerContainer = docker.getContainer(apiWorker.Id);
      const execOption = {
        Cmd: ['/var/www/artisan', 'queue:restart'],
        AttachStdin: false,
        AttachStdout: true
      };

      const exec: Exec = await workerContainer.getExec(execOption);
      await exec.start({hijack: false}).then((stream) => {
        console.log(stream);
      });
    } else {
      throw new Error('woker가 실행되어 있지 않습니다.');
    }
  }
}
