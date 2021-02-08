import { db01COnfig } from "./appConfig";
import {DbShellHelper} from '../dist/index'

var app = new DbShellHelper();
app.dbServer = db01COnfig;
// app.execSqlFile({
//     filepath:`${__dirname}/demo.sql`
// })

app.execSqlString({
    // queryString:'insert into tb_demo values (2, "1", "1");'
    queryString:'delete from tb_demo;'
})

