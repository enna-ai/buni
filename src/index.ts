import * as fs from "fs";
import chalk from "chalk";
import { deleteAsync } from "del";
import { spawnSync } from "child_process";

const searchBun = () => {
    const bunLockPath = "bun.lockb";
    if (fs.existsSync(bunLockPath)) {
        console.log(`\n${chalk.red("✘")} ${chalk.gray("bun.lockb found.")} This project is already using bun.`);
        process.exit(1);
    }
}

const convertToBun = async () => {
    try {
        const yarnLockPath = "yarn.lock";
        if (fs.existsSync(yarnLockPath)) {
            console.log(`${chalk.green("✔")} yarn.lock found!`);
            console.log(`${chalk.gray("Removing yarn.lock...")}`);

            await deleteAsync(yarnLockPath);
            spawnSync("bun", ["i"], {
                stdio: "inherit",
                shell: true,
            });
        }

        const nodeModulesPath = "node_modules";
        if (fs.existsSync(nodeModulesPath)) {
            console.log(`${chalk.green("✔")} node_modules found!`);
            console.log(`${chalk.gray("Removing node_modules...")}`);

            await deleteAsync(nodeModulesPath);
            spawnSync("bun", ["i"], {
                stdio: "inherit",
                shell: true,
            });
        }

        const packageLockPath = "package-lock.json";
        if (fs.existsSync(packageLockPath)) {
            console.log(`${chalk.green("✔")} package-lock.json found!`);
            console.log(`${chalk.gray("Removing package-lock.json")}`);

            await deleteAsync(packageLockPath);
            spawnSync("bun", ["i"], {
                stdio: "inherit",
                shell: true,
            });
        }

        const pnpmLockPath = "pnpm-lock.yaml";
        if (fs.existsSync(pnpmLockPath)) {
            console.log(`${chalk.green("✔")} pnpm-lock.yaml found!`);
            console.log(`${chalk.gray("Removing pnpm-lock.yaml")}`);

            await deleteAsync(pnpmLockPath);
            spawnSync("bun", ["i"], {
                stdio: "inherit",
                shell: true,
            });
        }
    } catch (error: any) {
        console.error(`An error occured: ${error.message}`);
        process.exit(1);
    }
}

const bunify = async () => {
    searchBun();
    await convertToBun();
};

bunify();