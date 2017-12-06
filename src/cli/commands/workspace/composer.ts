import { command, Command, metadata, params } from 'clime';
import { Docker } from '../../../docker';
import { Exec, ContainerInfo } from 'Dockerode';
import { green } from 'chalk';

@command({
  description: 'workspace 에 composer 명령을 실행시킵니다.'
})
export default class extends Command {
  @metadata
  async execute(
    @params({
      type: String,
      required: true,
      description: 'composer 로 실행시킬 명령어',
    })
    command: string[]
  ) {
    const docker = new Docker();
    const containers = await docker.containerList();

    const apiWorker = containers.find((containerInfo: ContainerInfo) => {
      return containerInfo.Image === 'minda-api-workspace';
    });

    if (apiWorker !== undefined ) {
      const workerContainer = docker.getContainer(apiWorker.Id);
      const execOption = {
        Cmd: ['composer', ...command],
        AttachStdin: false,
        AttachStdout: true
      };

      const exec: Exec = await workerContainer.getExec(execOption);
      await exec.start({hijack: true}).then(async (result) => {
        result.output.setEncoding('UTF-8');
        result.output.on('data', (chunk: any) => {
          console.log(chunk.toString());
        });
        await result.output.on('close', function () {
          console.log('end');
        });
      });
    } else {
      throw new Error('workspace 가 실행되어 있지 않습니다.');
    }
  }
}
