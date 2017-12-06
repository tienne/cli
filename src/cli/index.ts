#!/usr/bin/env node

import 'source-map-support/register';
import * as path from 'path';
import { CLI, Shim } from 'clime';

const cli = new CLI('minda', path.join(__dirname, 'commands'));
const shim = new Shim(cli);

(async function() {
  await shim.execute(process.argv).then(() => {
    //
  }).catch((error) => {
    console.log(error);
    process.exit(-1);
  });

  process.exit(0);
})();
