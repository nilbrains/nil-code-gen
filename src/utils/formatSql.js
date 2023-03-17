/**
 * 
 * @param {String} sql 
 */
export function formatSql(sql) {
    const _body = {};
    sql = sql
        // 去回车
        .replace(/[\r\n]/g, "")
        // 去空格
        .replace(/\s+/g, ' ')
        .trim()

    // 正则 /CREATE TABLE '(.*?)'/

    const tableName = sql.match(/CREATE TABLE \`(.*?)\`/);
    if (tableName == null) {
        throw new Error("未找到表名称");
    }
    _body.tableName = tableName[1];

    const primaryKey = sql.match(/PRIMARY KEY \(\`(.*?)\`\)/);
    if (primaryKey == null) {
        throw new Error("未找到表主键");
    }
    _body.primaryKey = primaryKey[1];

    const varsSql = sql.match(/\` \((.*?) PRIMARY KEY/);

    if (varsSql == null || varsSql == "") {
        throw new Error("SQL不正确");
    }

    const varsSqls = varsSql[1].split(",")

    const _vars = []
    varsSqls.forEach(item => {
        const field = item.trim()?.match(/^`(.*?)` \w+(\(?(\d+)?\)?)/);
        const comment = item.trim()?.match(/COMMENT '(.*?)'$/);
        if (field) {
            _vars.push({
                field: field ? field[1] : '',
                comment: (comment ? comment[1] : '')
            })
        }
    });
    _body.vars = _vars;
    return _body
}
