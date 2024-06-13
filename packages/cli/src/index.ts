#!/usr/bin/env node
import { deploy } from './commands'
import { Command } from 'commander'

import { version } from '../package.json'

function main() {
  const program = new Command()
    .name('cmsfe')
    .description('cmsfe cli')
    .version(version || '0.0.0')
  program.addCommand(deploy)
  program.parse()
}

main()
