// import { ConnectionOptions } from "mysql";

export interface ConnectionOptions {
    /**
     * The MySQL user to authenticate as
     */
    user?: string;

    /**
     * The password of that MySQL user
     */
    password?: string;

    /**
     * Name of the database to use for this connection
     */
    database?: string;

    /**
     * The hostname of the database you are connecting to. (Default: localhost)
     */
    host?: string;

    /**
     * The port number to connect to. (Default: 3306)
     */
    port?: number;
}


/**
 *
 * @export
 * @interface DbExecSqlStringOptions 执行查询语句选项
 */
export interface DbExecSqlStringOptions {
    queryString?: string;
    [propName: string]: any;
}

export interface DbExecSqlFileOptions {
    filepath?: string;
    [propName: string]: any;
}

export interface DbImportOptions {
    autoRemoveFile?: boolean;
    filepath?: string;
}

export interface DbExportOptions {
    tables?: string | string[];
    filepath?: string;
}