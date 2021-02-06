import { ConnectionOptions, DbExecSqlFileOptions, DbImportOptions, dbQueryOptions } from "./interfaces";
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
     * @param {dbQueryOptions} options
     *
     */
    execSqlString(options: dbQueryOptions): void;
    /**
     * 执行sql文件
     *
     * @param {dbQueryOptions} options
     * @memberof DbQueryBase
     */
    execSqlFile(options: DbExecSqlFileOptions): void;
    /**
     * 导出数据库/数据表
     *
     * @param {exportDbOptions} options
     * @return {*}
     * @memberof DbShellHelper
     */
    exportDb(options: exportDbOptions): void;
    /**
     * 导入数据库/数据表
     *
     * @param {dbQueryOptions} options
     * @memberof DbQueryBase
     */
    importSqlFile(options: DbImportOptions): void;
    private checkDbServer;
    private checkDatabase;
}
interface exportDbOptions {
    tables?: string | string[];
    filepath?: string;
}
export {};
