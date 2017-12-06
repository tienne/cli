import { SubcommandDefinition } from 'clime';
import { version, author } from '../../../package.json';

export const description = `
==============================
minda-cli: v${version}
maintainer: ${author}
==============================
`;

export const subcommands: SubcommandDefinition[] = [
  { name: 'worker' }
];
