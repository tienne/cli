import { SubcommandDefinition } from 'clime';

import {
  version,
  author
} from '../../../package.json';

export const description = `\
==============================
Minda-cli v${version}
Maintainer: ${author}
==============================
`;

export const subcommands: SubcommandDefinition[] = [
  { name: 'worker' }
];

