import enquirer from 'enquirer'
import {ossUtilConfig} from "@/src/lib";

import chalk from "chalk";
import {Command} from "commander";
import path from "path";
import ora, {spinners} from "ora";

import {execSync} from "child_process";
import {logger} from "../utils/logger";
import * as fs from "node:fs";


const spinner = ora({
  text: "Loading...",
  color: "yellow",
});
const cwd = process.cwd()

type Env = 'test' | 'prod'


export const deploy = new Command()
  .name("deploy")
  .command('deploy')
  .alias('d')
  .description("command [deploy | d] to deploy your project")
  .action(async () => {
    await run();
  });

async function initCheck() {
  // 检查是否存在dist文件夹
  if (!fs.existsSync(path.join(cwd, "dist"))) {
    logger.error("未找到dist文件夹，请先执行build命令");
    process.exit(1);
  }

}


function initOssUtilConfig(env: Env) {
  const config = ossUtilConfig[env]

  try {
    execSync(`ossutil config -e ${config.endpoint} -i ${config.accessKeyID} -k ${config.accessKeySecret}`, {stdio: "inherit"});
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export async function run() {

  // 检查是否存在dist文件夹
  await initCheck()

  const {prompt} = enquirer

  //提示输入项目名称，必填
  const projectPrompt = await prompt({
    type: "input",
    name: "name",
    message: "请输入项目名称",
    required: true
  });

  // 选择部署环境
  const envPrompt = await prompt({
    type: "select",
    name: "env",
    message: "请选择部署环境",
    choices: ["test", "prod"],
    required: true
  });


  const {env} = envPrompt

  const confirmResult = await prompt({
    type: 'confirm',
    name: 'confirm',
    message: `确认发布这个项目 ${chalk.blue(envPrompt.env)}:${chalk.green(projectPrompt.name)} ？`
  })

  if (!confirmResult.confirm) {
    logger.warn("部署已取消");
    return
  }

  initOssUtilConfig(env)
  const distPath = path.join(cwd, "dist/");

  try {
    execSync(`ossutil cp -r ${distPath}  oss://v-out-dev/images/${projectPrompt.name}/`, {stdio: "inherit"});

  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  spinner.succeed(`发布成功
  http://v-out-dev.oss-ap-southeast-1.aliyuncs.com/images/${projectPrompt.name}`);

}
