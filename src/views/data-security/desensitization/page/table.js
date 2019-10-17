// 参数说明
/*
key:后端字段
value:显示字段
minWidth:单元格最小宽度
component:自定义组件
*/
export default [{
  key: 'ruleName',
  value: '规则名称'
},
{
  key: 'enabled',
  value: '启用状态',
  component: 'SwitchComponent',
  componentConfig: { handler: 'enabledHandler' }
},
{
  key: 'utilization',
  value: '引用次数'
},
{
  key: 'desTypeName',
  value: '脱敏方式'
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

