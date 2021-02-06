"use strict";
/*
 * @Author: hujuran
 * @Date: 2021-02-04 07:36:41
 * @Last Modified by: hujuran
 * @Last Modified time: 2021-02-04 10:50:22
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbShellHelper = void 0;
var shelljs = require("shelljs");
var fs = require("fs");
/**
 * 基于shelljs对数据库进行操作
 *
 * @export
 * @class DbShellHelper
 */
var DbShellHelper = /** @class */ (function () {
    function DbShellHelper() {
    }
    /**
     * 执行sql语句，可传入一条或多条，按顺序执行，以分号分割
     *
     * @param {dbQueryOptions} options
     *
     */
    DbShellHelper.prototype.execSqlString = function (options) {
        var _a = this.dbServer, host = _a.host, port = _a.port, user = _a.user, password = _a.password;
        var database = this.database || this.dbServer.database;
        var prefix = "mysql -h " + host + " -P " + port + " -u" + user + " -p" + password + " -e ;use " + database + ";";
        var queryString = options.queryString;
        if (!queryString) {
            console.log('查询语句为空');
            return;
        }
        else {
            console.log("🚀 ~ execQuery 执行查询语句", queryString);
        }
        var query = prefix + '"' + queryString + '"';
        shelljs.exec(query);
    };
    /**
     * 执行sql文件
     *
     * @param {dbQueryOptions} options
     * @memberof DbQueryBase
     */
    DbShellHelper.prototype.execSqlFile = function (options) {
        this.checkDbServer();
        this.checkDatabase();
        var _a = this, dbServer = _a.dbServer, database = _a.database;
        var host = dbServer.host, port = dbServer.port, user = dbServer.user, password = dbServer.password;
        console.log("🚀 ~ execSqlFile ~ port", port);
        console.log("🚀 ~ execSqlFile ~ host", host);
        var filepath = options.filepath;
        if (!filepath) {
            console.log('请指定要执行的文件');
            return;
        }
        var query = "mysql -h " + host + " -P " + port + " -u" + user + " -p" + password + " "
            + (" " + (database || '') + " <" + filepath);
        console.log("🚀 ~ execSqlFile 执行sql文件~ filepath", filepath);
        shelljs.exec(query);
    };
    /**
     * 导出数据库/数据表
     *
     * @param {exportDbOptions} options
     * @return {*}
     * @memberof DbShellHelper
     */
    DbShellHelper.prototype.exportDb = function (options) {
        var dbServer = this.dbServer;
        var filepath = options.filepath;
        if (!filepath) {
            console.log('文件路径为空');
            return;
        }
        if (!dbServer) {
            console.log('no dbserver');
            return;
        }
        if (!this.database) {
            console.log('未指定数据库');
            return;
        }
        var tableListStr = '';
        if (typeof options.tables == 'string') {
            tableListStr = options.tables;
        }
        else if (typeof options.tables == 'object') {
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
        var _a = this.dbServer, host = _a.host, port = _a.port, user = _a.user, password = _a.password;
        console.log("🚀 ~ exportDb ~ host", host);
        console.log("🚀 ~ exportDb ~ port", port);
        var database = this.database;
        var query = "mysqldump -h " + host + " -P " + port + " -u" + user + " -p" + password + " "
            + (" " + database + " " + tableListStr + " > " + filepath);
        shelljs.exec(query);
        console.log("🚀 ~ 导出完成 ~ tableListStr", tableListStr);
        console.log();
    };
    /**
     * 导入数据库/数据表
     *
     * @param {dbQueryOptions} options
     * @memberof DbQueryBase
     */
    DbShellHelper.prototype.importSqlFile = function (options) {
        console.log("🚀 ~ importSqlFile ~ importSqlFile", '导入文件');
        this.checkDbServer();
        this.checkDatabase();
        var _a = this, dbServer = _a.dbServer, database = _a.database;
        console.log("🚀 ~ importSqlFile ~ database", database);
        var host = dbServer.host, port = dbServer.port, user = dbServer.user, password = dbServer.password;
        console.log("🚀 ~ importSqlFile ~ host", host);
        console.log("🚀 ~ importSqlFile ~ port", port);
        var filepath = options.filepath, autoRemoveFile = options.autoRemoveFile;
        if (!filepath) {
            console.log('请指定要导入的文件');
            return;
        }
        if (!fs.existsSync(filepath)) {
            console.log('文件不存在');
            return;
        }
        var query = "mysql -h " + host + " -P " + port + " -u" + user + " -p" + password + " "
            + (" " + (database || '') + " <" + filepath);
        console.log("🚀 ~ importSqlFile 准备导入文件~ filepath", filepath);
        shelljs.exec(query);
        console.log("🚀 ~ importSqlFile 导入完成~ filepath", filepath);
        if (autoRemoveFile) {
            fs.rmSync(filepath);
            console.log('导入成功,文件已删除');
            console.log();
        }
    };
    DbShellHelper.prototype.checkDbServer = function () {
        if (!this.dbServer) {
            console.log('未指定数据库连接配置');
            process.exit();
        }
    };
    DbShellHelper.prototype.checkDatabase = function () {
        if (!this.database) {
            console.log('未指定要操作的数据库');
            process.exit();
        }
    };
    return DbShellHelper;
}());
exports.DbShellHelper = DbShellHelper;
