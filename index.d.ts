import { ConnectionOptions, DbExecSqlFileOptions, DbImportOptions, DbExecSqlStringOptions, DbExportOptions } from "./interfaces";
/**
 * 基于shelljs对数据库进行操作
 *
 * @export
 * @class DbShellHelper
 */
export declare class DbShellHelper {
    dbServer: ConnectionOptions;
    database?: string;
    constructor();
    /**
     * 执行sql语句，可传入一条或多条，按顺序执行，以分号分割
     *
     * @param {DbExecSqlStringOptions} options
     *
     */
    execSqlString(options: DbExecSqlStringOptions): void;
    /**
     * 执行sql文件
     *
     * @param {DbExecSqlFileOptions} options
     * @return {*}
     * @memberof DbShellHelper
     */
    execSqlFile(options: DbExecSqlFileOptions): void;
    /**
     * 导出数据库/数据表
     *
     * @param {DbExportOptions} options
     * @return {*}
     * @memberof DbShellHelper
     */
    exportDb(options: DbExportOptions): void;
    /**
     * 导入数据库/数据表
     *
     * @param {DbImportOptions} options
     * @return {*}
     * @memberof DbShellHelper
     */
    importSqlFile(options: DbImportOptions): void;
    private checkDbServer;
}
