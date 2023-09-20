import { exec } from 'node:child_process';
import { writeFile } from 'fs/promises';
import { fail } from '@sveltejs/kit';
import util from 'node:util';

export const actions = {
	run: async ({ request }) => {

        const execPromise = util.promisify(exec);
        const data = await request.formData();
        const file = data.get('file');
        const type = data.get('type');
        
        let file_path = `./uploads/${type}.zip`;

        console.log(...data);

        await writeFile(file_path, new Uint8Array(await file.arrayBuffer()));

        try {

            const {stdout, stderr} = await execPromise(`src/scripts/test.sh -f "${file_path}" -t "${type}"`);
            console.log(stdout);
            if (type == "surprise") {
                return {success: true, message: `hahaha remember when the internet was fun like this`, surprise: true};
            }
            else {
                return {success: true, message: `${stdout}` };
            }
        } 
        catch (error) {
            console.log(error);
            return fail(500, {success: false, message: `${error}`});
        }
	} 
};