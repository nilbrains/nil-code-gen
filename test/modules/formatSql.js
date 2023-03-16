import { formatSql } from "../../src/utils/index.js";

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


    // console.log(sql);
    const _ = formatSql(sql);
    console.log(_);


}

