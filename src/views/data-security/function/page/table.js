// 参数说明
/*
key:后端字段
value:显示字段
minWidth:单元格最小宽度
component:自定义组件
*/
export default [{
  key: 'displayName',
  value: '函数名称'
},
{
  key: 'funTypeStr',
  value: '类型'
},
{
  key: 'funSyntaxStr',
  value: '脚本类型'
},
{
  key: 'enabled',
  value: '启用状态',
  component: 'SwitchComponent',
  componentConfig: { handler: 'enabledHandler' }
},
{
  key: 'operatedName',
  value: '操作人'
},
{
  key: 'updatedAt',
  value: '修改时间',
  minWidth: '120px'
}
]

