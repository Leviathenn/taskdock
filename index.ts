/**
 * @author Leviathenn
 */

import { parseConfig } from "./lib/configparser";
import { runner } from "./lib/runner";
const args = process.argv;
function usage() {
    console.log(`
        ./taskdock <r[R]e[E]l[L][d][D][l][L]s[S]h[H]>
        
        help[h]:
            brings you to this screen
        run[r,R]:
            run's the .taskdock file found in your running directory!
        exec[e,E]<t[{TASK -> RUNNER ~ For all who don't know}:runner ID],*[All Task]>:
            runs bash code on the [RUNNER | TASK | ALL | ALL OF THE ABOVE]
        list[l,L]:
            list all of the task running.  
        delete[d,D]<t[TASK ID],*[All Task]>:
            deletes the [TASK | All Task].
        shell[s,D]<t[{TASK -> RUNNER ~ For all who don't know}:runner ID]>:
            creates a reverse shell into the runner.
        `)
}
if(args.length < 2){
    usage();
}else{
    parseConfig(".taskdock.yml")
    var runnr = new runner();
    runnr.prep();

}