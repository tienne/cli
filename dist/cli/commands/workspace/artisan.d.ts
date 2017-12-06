import { Command } from 'clime';
export default class  extends Command {
    execute(command: string): Promise<void>;
}
