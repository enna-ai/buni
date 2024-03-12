import * as fs from "fs";
import chalk from "chalk";
import { deleteAsync } from "del";
import { spawnSync } from "child_process";

const checkForBunFile = (target: string) => {
    if (fs.existsSync(target)) {
        console.log(`${chalk.red("✘")} ${chalk.gray("bun.lockb found!")} This project is already using bun.`);
        process.exit(1);
    }
};

const deleteNodeModulesFile = async () => {
    if (fs.existsSync("node_modules")) {
        console.log(`${chalk.green("✔")} node_modules found!`);
        console.log(`${chalk.gray("Removing node_modules...")}`);
        await deleteAsync("node_modules");
    }
};

const installBun = async () => {
    try {
        spawnSync("bun", ["i"], {
            stdio: "inherit",
            shell: true,
        });
    } catch (error) {
        console.error(`${chalk.red("✘")} Error installing bun: ${error}`);
        process.exit(1);
    }
};

const convertToBun = async (lockFiles: string[], target: string) => {
    checkForBunFile(target);

    for (const lockFile of lockFiles) {
        try {
            if (!fs.existsSync(lockFile)) continue;

            console.log(`${chalk.green("✔")} ${lockFile} found!`);
            console.log(`${chalk.gray(`Removing ${lockFile}...`)}`);
            await deleteAsync(lockFile);
        } catch (error) {
            console.error(`${chalk.red("✘")} Error installing bun: ${error}`);
            process.exit(1);
        }
    }
    
    await deleteNodeModulesFile();
    await installBun();
};

convertToBun(["yarn.lock", "package-lock.json", "pnpm-lock.yaml"], "bun.lockb");
