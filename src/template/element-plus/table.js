export const elementPlusTableMe = `
<script setup>
  import { useTable } from "@/hook/usePage.js";
  import { onMounted, provide } from "vue";
  
  // ========== 表格 开始 ==========

  const tableData = useTable({
    column: [
      <% for(var i=0;i<data.length;i++){%>
        { prop: "<%=data[i].field%>", label: "<%=data[i].label%>", },
      <% } %>
      { prop: "option", label: "操作", width: 200, render: "slot" },
    ],
  });
  
  provide("NIL_TABLE", tableData);
  
  tableData.listener.onSearch = (searchData) => {
    tableData.table.search = tableData.formatSearchData(searchData);
    tableData.table.search["key"] = tableData.table.search.name;
    initData();
  };
  
  tableData.listener.onSearchCancel = (searchData) => {
    tableData.table.search = tableData.formatSearchData(searchData);
    tableData.table.search["key"] = tableData.table.search.name;
    initData();
  };
  
  function initData() {
    tableData.table.loading = true;
    // 
    setTimeout(() => {
      tableData.table.loading = false;
    }, 200);
  }
  
  onMounted(() => {
    initData();
  });
  
  tableData.listener.onPageChange = () => {
    initData();
  };
  
  // ========== 表格 结束 ==========

  // ========== 表单 开始 (默认注释) ==========
  // const formData = useForm({
  //   // 默认值
  //   defaultItems: {},
  //   // 额外参数
  //   extra: {}
  //   });
  //   provide("NIL_FORM", formData);
  //   // 保存
  //   formData.listener.onSave = (method, items) => {
  //     console.log("saveData - method == > ", method)
  //     console.log("saveData - items == > ", JSON.stringify(items))
  //   };
  // ========== 表单 结束 ==========

  // 添加
  function handelAdd() {
    console.log("handelAdd.....")
  }

  // 修改
  function handelChange (row) {
    console.log("handelChange.....", row)
  }
  </script>
  
  <template>
    <div class="page-user">
      <nil-page title="搜索" icon="EiSearch" marginBottom="20px">
        <nil-search />
      </nil-page>
      <nil-page title="列表">
        <template #option>
          <el-button type="primary" icon="EiPlus"  @click="handelAdd">添加</el-button>
          <nil-hide />
        </template>
        <nil-table>
          <template #option="{ row }">
            <el-button type="primary" @click="handelChange(row)">修改</el-button>
          </template>
        </nil-table>
  
        <el-pagination
          class="nil-pagination"
          layout="total,prev, pager, next,->,jumper"
          :current-page="tableData.page.cur"
          :total="tableData.page.total"
          @update:current-page="tableData.onPageChange"
        />
      </nil-page>
    </div>
  </template>
`