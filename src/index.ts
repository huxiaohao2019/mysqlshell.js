import shelljs = require('shelljs');
import {
    ConnectionOptions, DbExecSqlFileOptions,
    DbImportOptions, DbExecSqlStringOptions,
    DbExportOptions
} from "./interfaces";
import fs = require('fs');

/**
 * 基于shelljs对数据库进行操作
 *
 * @export
 * @class DbShellHelper
 */
export class DbShellHelper {
    dbServer!: ConnectionOptions;
    database?: string;
    constructor() { }

    /**
     * 执行sql语句，可传入一条或多条，按顺序执行，以分号分割
     *
     * @param {DbExecSqlStringOptions} options
     * 
     */
    execSqlString(options: DbExecSqlStringOptions) {
        this.checkDbServer();
        let { host, port, user, password, database } = this.dbServer;
        let prefix = `mysql -h ${host} -P ${port} -u${user} -p${password} -e "use ${database};`;
        let { queryString } = options;
        if (!queryString) {
            console.log('查询语句为空');
            return;
        }
        console.log("🚀 ~ execQuery 执行查询语句", queryString);
        let query = prefix + queryString + '"';
        shelljs.exec(query);
    }

    /**
     * 执行sql文件
     *
     * @param {DbExecSqlFileOptions} options
     * @return {*} 
     * @memberof DbShellHelper
     */
    execSqlFile(options: DbExecSqlFileOptions) {
        console.log('执行sql文件');
        this.checkDbServer();
        let { database, host, port, user, password } = this.dbServer;
        let { filepath } = options;
        if (!filepath) {
            console.log('请指定要执行的文件');
            return;
        }
        let query = `mysql -h ${host} -P ${port} -u${user} -p${password} `
            + ` ${database || ''} <${filepath}`;

        console.log("🚀 ~ execSqlFile 执行sql文件~ filepath", filepath);
        console.log();

        let res = shelljs.exec(query);
        console.log(res.stdout);
    }

    /**
     * 导出数据库/数据表
     * 
     * @param {DbExportOptions} options
     * @return {*} 
     * @memberof DbShellHelper
     */
    exportDb(options: DbExportOptions) {
        let { filepath } = options;
        if (!filepath) {
            console.log('文件路径为空');
            return;
        }
        this.checkDbServer();
        let tableListStr = '';
        if (typeof options.tables == 'string') {
            tableListStr = options.tables;
        } else if (typeof options.tables == 'object') {
            if (Array.isArray(options.tables)) {
                tableListStr = options.tables.join(' ');
            }
        }
        if (!tableListStr) {
            console.log('没有设置要导出的表，将导出整个数据库');
            // return;
        }

        console.log("🚀 ~ 准备导出 ~ tableListStr", tableListStr);
        console.log();

        let { host, port, user, password, database } = this.dbServer;
        console.log("🚀 ~ exportDb ~ host", host);
        console.log("🚀 ~ exportDb ~ port", port);


        let query = `mysqldump -h ${host} -P ${port} -u${user} -p${password} `
            + ` ${database} ${tableListStr} > ${filepath}`;
        shelljs.exec(query);
        console.log("🚀 ~ 导出完成 ~ tableListStr", tableListStr);
        console.log();
    }

    /**
     * 导入数据库/数据表
     *
     * @param {DbImportOptions} options
     * @return {*} 
     * @memberof DbShellHelper
     */
    importSqlFile(options: DbImportOptions) {
        console.log("🚀 ~ 导入文件");
        this.checkDbServer();

        let { host, port, user, password, database } = this.dbServer;
        let { filepath, autoRemoveFile } = options;
        if (!filepath) {
            console.log('请指定要导入的文件');
            return;
        }
        if (!fs.existsSync(filepath)) {
            console.log('文件不存在');
            return;
        }
        let query = `mysql -h ${host} -P ${port} -u${user} -p${password} `
            + ` ${database || ''} <${filepath}`;
        console.log("🚀 ~ importSqlFile 准备导入文件~ filepath", filepath);
        shelljs.exec(query);
        console.log("🚀 ~ importSqlFile 导入完成~ filepath", filepath);
        if (autoRemoveFile) {
            fs.rmSync(filepath);
            console.log('导入成功,文件已删除');
        }
        console.log();
    }

    private checkDbServer() {
        if (!this.dbServer) {
            console.log('未指定数据库连接配置');
            process.exit();
        }
        let { host, port } = this.dbServer;
        console.log("🚀 ~ checkDbServer ~ port", port);
        console.log("🚀 ~ checkDbServer ~ host", host);
    }
}

