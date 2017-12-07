import {command, Command, metadata, param, params} from 'clime';
import { Docker } from '../../../docker';
import { Exec, ContainerInfo } from 'Dockerode';
import { green } from 'chalk';

@command({
  description: 'workspace 에 artisan 명령을 실행시킵니다.'
})
export default class extends Command {
  @metadata
  async execute(
    @params({type: String, required: true, description: 'artisan 으로 실행시킬 명령어'})
    command: string []
  ) {
    const docker = new Docker();
    const containers = await docker.containerList();

    const apiWorker = containers.find((containerInfo: ContainerInfo) => {
      return containerInfo.Image === 'minda-api-workspace';
    });

    if (apiWorker !== undefined ) {
      const container = docker.getContainer(apiWorker.Id);
      const execOption = {
        Cmd: ['/var/www/artisan', ...command],
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true
      };

      const exec: Exec = await container.getExec(execOption);
      const result = await container.getExecStream(exec, {hijack: false, stdout: true, stdin: false, stderr: true});
      const stream = result.output;

      container.getContainer().modem.demuxStream(stream, process.stdout, process.stderr);

      stream.on('end', () => {
        console.log(`
====================================================
artisan ${command.join(' ')} 완료
=====================================================`
        );
        stream.destroy();
        process.exit(0);
      });

      stream.on('close', () => {
        process.exit(0);
      });

    } else {
      throw new Error('workspace 가 실행되어 있지 않습니다.');
    }
  }
}
