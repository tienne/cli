#!/usr/bin/env node

import 'source-map-support/register';
import * as path from 'path';
import { CLI, Shim } from 'clime';

const cli = new CLI('minda', path.join(__dirname, 'commands'));

const shim = new Shim(cli);
shim.execute(process.argv);
