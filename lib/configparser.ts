/**
 * @author Leviathenn
 */

import { file } from "bun";
import * as fs from "fs"
import * as yaml from 'yaml';
export function parseConfig(filepath: string){
    let configfile = yaml.parse(fs.readFileSync(filepath).toString());
    return configfile;
}
export function parseRunner(filepath: string){
    let runnerFile = yaml.parse(fs.readFileSync(filepath).toString());
    return runnerFile;
}
export function parseTask(filepath: string){
    let taskFile = yaml.parse(fs.readFileSync(filepath).toString());
    return taskFile;
}
