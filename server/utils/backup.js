import { execSync } from "child_process";
// import { unlinkSync } from "fs";


export function backupAuto(download) {
    console.log('Backup em andamento');

    execSync('./backup.sh');

    console.log('Backup concluído');
}