/**
 * file: ScriptExecutor.ts
 * creator: 27Onion
 * create time: May 10th, 2022, 21:18
 * description: The TNT script executor.
 * main developer: sheepbox8646
 */

namespace TNTScript {
    export class ScriptExecutor {
        exec(scriptContent: string) {
	    TNTFunctionSplit(scriptContent);
            // TODO: Fill in this function to execute the script. The content is given.
            console.log(scriptContent);
        }
    }
}