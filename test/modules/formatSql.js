/**
 * 
 * @param {String} sql 
 */
function formatSql(sql) {
    const _body = {};
    sql = sql
        // 去回车
        .replace(/[\r\n]/g, "")
        // 去空格
        .replace(/\s+/g, ' ')
        .trim()
    // console.log(sql);

    // 正则 /CREATE TABLE '(.*?)'/

    const tableName = sql.match(/CREATE TABLE \'(.*?)\'/);
    if (tableName == null) {
        throw new Error("未找到表名称")
    }
    _body.tableName = tableName[1]

    const varsSql = sql.match(/' \((.*?) PRIMARY KEY/)

    if (varsSql == null || varsSql == "") {
        throw new Error("SQL不正确")
    }
    // console.log(varsSql[1]);

    const varsSqls = varsSql[1].split(",")

    const _vars = []
    varsSqls.forEach(item => {
        const field = item.trim()?.match(/^'(.*?)' \w+(\(?(\d+)?\)?)/)
        // console.log(field[1]);
        const comment = item.trim()?.match(/COMMENT '(.*?)'$/)
        // console.log(comment ? comment[1] : '');
        _vars.push({
            field: field ? field[1] : '',
            comment: (comment ? comment[1] : '')
        })
    });
    _body.vars = _vars





    return _body
}


export function main() {
    const sql = `
    CREATE TABLE 'pda_action_log' ( 
        'id' varchar(32) NOT NULL COMMENT 'ID',
        'type' varchar(20) DEFAULT NULL COMMENT '类型 0 配药 1 收药 2 用药 3 巡查',
        'user_account' varchar(255) DEFAULT NULL COMMENT '账号',
        'user_nickname' varchar(255) DEFAULT NULL COMMENT '昵称',
        'op_time' datetime DEFAULT NULL COMMENT '时间',
        'barcode' varchar(255) DEFAULT NULL COMMENT '处方号',
        'subcode' varchar(255) DEFAULT NULL COMMENT '待定',
        'ex_ok' varchar(1) DEFAULT NULL COMMENT '0 失败 1 成功',
        'ex_msg' varchar(255) DEFAULT NULL COMMENT '信息',
        'sort' int(11) DEFAULT '0' COMMENT '排序'
        PRIMARY KEY ('id')
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;


    console.log(sql);
    const _ = formatSql(sql);
    console.log(_);


}

