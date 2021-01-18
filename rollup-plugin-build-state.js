const ora = require("ora");
const chalk = require("chalk")
const spinner = ora()
spinner.spinner ="monkey"
let buildStartTime;
export default function rollupBuildState(){
    return {
        name:"RollupBuildState",
        buildStart:async (options) => {
            spinner.color = "blue"
            spinner.start("build start...")
            buildStartTime =  new Date().getTime()
        },
        buildEnd:async () => {
            spinner.color = "cyan"
            spinner.succeed(`Build complete: ${chalk.red((new Date().getTime() - buildStartTime) / 1000 + 's')}`)
        },
        renderStart:async () => {
            spinner.start("Generate bundle start...")
        },
        writeBundle:async () => {
            spinner.succeed(`Generate complete: it takes ${chalk.green((new Date().getTime() - buildStartTime) / 1000 + 's')} until now`)
        }
    }
}