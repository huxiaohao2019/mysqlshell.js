# mysqlshell.js
## 简介
## 使用方法
```javascript
    import { demoDbConfig } from "./appConfig";
    import { DbShellHelper } from '../index'
    import { DbImportOptions, DbExportOptions } from "../interfaces";
    
    var app = new DbShellHelper();
    app.dbServer = demoDbConfig;
    
    // exec sql file demo
    function execFile() {
        app.execSqlFile({
            filepath: `${__dirname}/tb_demo.sql`
        })
    }
    execFile();
    
    // exec sql string demo
    function execString() {
        app.execSqlString({
            queryString: 'delete from tb_demo;'
        });
    }
    execString();
    
    // export table demo. if tables is not set, this will export full database;
    function exportDb() {
        let options: DbExportOptions = {
            tables: 'tb_demo',
            filepath: `${__dirname}/tb_demo.sql`
        }
        app.exportDb(options);
    }
    exportDb();
    
    // import table demo
    function importDb() {
        let options: DbImportOptions = {
            filepath: `${__dirname}/tb_demo.sql`
        }
        app.importSqlFile(options)
    }
    importDb();
```