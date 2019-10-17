// 参数说明
/*
key:后端字段
value:显示字段
minWidth:单元格最小宽度
component:自定义组件
*/
export default [{
  key: 'gradeName',
  value: '名称'
},
{
  key: 'sensitivityStr',
  value: '敏感程度'
},
{
  key: 'priority',
  value: '安全等级',
  component: 'GradeComponent'
},
{
  key: 'recogniseCount',
  value: '已绑定规则'
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

