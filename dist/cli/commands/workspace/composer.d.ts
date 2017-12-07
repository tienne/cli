import { Command } from 'clime';
export default class  extends Command {
    execute(commands: string[]): Promise<void>;
}
