// 参数说明
/*
key:后端字段
value:显示字段
minWidth:单元格最小宽度
component:自定义组件
*/
export default [{
  key: 'id',
  value: '申请单号'
},
{
  key: 'databaseId',
  value: '申请数据库'
},
{
  key: 'tableId',
  value: '申请数据表'
},
{
  key: 'columnIdCount',
  value: '申请字段数'
},
{
  key: 'userName',
  value: '申请人'
},
{
  key: 'createdAt',
  value: '申请时间',
  minWidth: '120px'
},
{
  key: 'updatedAt',
  value: '审批时间',
  minWidth: '120px'
},
{
  key: 'approvalStatus',
  value: '审批结果',
  minWidth: '120px'
}
]
