import { command, Command, metadata, param } from 'clime';
import { Docker } from '../../../docker';
import { Exec, ContainerInfo } from 'Dockerode';
import { green } from 'chalk';

@command({
  description: 'workspace 에 artisan 명령을 실행시킵니다.'
})
export default class extends Command {
  @metadata
  async execute(
    @param({
      required: true,
      description: 'artisan 으로 실행시킬 명령어',
    })
    command: string
  ) {
    const docker = new Docker();
    const containers = await docker.containerList();

    const apiWorker = containers.find((containerInfo: ContainerInfo) => {
      return containerInfo.Image === 'minda-workspace';
    });

    if (apiWorker !== undefined ) {
      const workerContainer = docker.getContainer(apiWorker.Id);
      const execOption = {
        Cmd: ['/var/www/artisan', command],
        AttachStdin: false,
        AttachStdout: true
      };

      const exec: Exec = await workerContainer.getExec(execOption);
      await exec.start({hijack: false}).then((result) => {
        console.log(green(`
======================
artisan ${command}
======================`));
      });
    } else {
      throw new Error('workspace 가 실행되어 있지 않습니다.');
    }
  }
}
