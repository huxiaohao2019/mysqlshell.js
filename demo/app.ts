import { db01COnfig } from "./appConfig";
import { DbShellHelper } from '../dist/index'
import { DbImportOptions, DbExportOptions } from "../dist/interfaces";

var app = new DbShellHelper();
app.dbServer = db01COnfig;

function execFile() {
    app.execSqlFile({
        filepath: `${__dirname}/demo.sql`
    })
}
// execFile();

function execString() {
    app.execSqlString({
        // queryString:'insert into tb_demo values (2, "1", "1");'
        queryString: 'delete from tb_demo;'
    });
}
// execString();

function exportDb() {
    let options: DbExportOptions = {
        tables: 'tb_demo',
        filepath: `${__dirname}/tb_demo.sql`
    }
    app.exportDb(options);
}
// exportDb();

function importDb() {
    let options: DbImportOptions={
        filepath:`${__dirname}/tb_demo.sql`
    }
    app.importSqlFile(options)
}

importDb();

