// 参数说明
/*
key:后端字段
value:显示字段
minWidth:单元格最小宽度
component:自定义组件
*/
export default [{
  key: 'ruleName',
  value: '名称'
},
{
  key: 'gradeName',
  value: '所属分级'
},
{
  key: 'enabled',
  value: '启用状态',
  component: 'SwitchComponent',
  componentConfig: { handler: 'enabledHandler' }
},
{
  key: 'recogniseTypeStr',
  value: '识别方式'
},
{
  key: 'functionName',
  value: '识别函数'
},
{
  key: 'desTypeStr',
  value: '脱敏方式'
},
{
  key: 'desName',
  value: '脱敏规则'
},
{
  key: 'operatedName',
  value: '操作人'
},
{
  key: 'updatedAt',
  value: '操作时间',
  minWidth: '120px'
}
]

