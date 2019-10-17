// 参数说明
/*
key:后端字段
value:显示字段
minWidth:单元格最小宽度
component:自定义组件
*/
export default [{
  key: 'algorithmName',
  value: '算法名称'
},
{
  key: 'algorithmType',
  value: '算法类型'
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
  key: 'createdAt',
  value: '创建时间',
  minWidth: '120px'
},
{
  key: 'period',
  value: '有效期(/天)'
},
{
  key: 'endTime',
  value: '下次重置时间',
  minWidth: '120px'
}
]

