/**
 * @author Leviathenn
 * @note typescript is better
 */

import * as fs from "fs"
import Dockerode from "dockerode"

export class runner{
    private container: Dockerode;
    constructor(){
        this.container = new Dockerode();
    }
    prep(){
        this.container.createContainer({Image:""});
    }
}