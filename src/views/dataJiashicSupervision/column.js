// 文件模板
export const columns = {
  // 档案室达标情况表
  COCKPIT_DATA_DBQK: [
    {
      prop: 'orderNum',
      label: '序号',
    },
    {
      prop: 'unitQzh',
      label: '单位全宗号',
    },
    {
      prop: 'unitName',
      label: '单位名称',
    },
    {
      prop: 'isStandard',
      label: '是否达标',
    },

  ],
  // 全宗建设情况表
  COCKPIT_DATA_JSQK: [
    {
      prop: 'orderNum',
      label: '序号',
    },
    {
      prop: 'unitQzh',
      label: '单位全宗号',
    },
    {
      prop: 'unitName',
      label: '单位名称',
    },
    {
      prop: 'bigEvent',
      label: '大事件',
    },
    {
      prop: 'yearBook',
      label: '年鉴',
    },
    {
      prop: 'scopePeriod',
      label: '归档范围和保管期限',
    },
    {
      prop: 'administrativeHistory',
      label: '组织沿革',
    },
    {
      prop: 'qzIntroduce',
      label: '全宗介绍',
    },
    {
      prop: 'schemeType',
      label: '分类方案',
    },
  ],
  // 队伍人员登记情况表
  COCKPIT_DATA_RYDJ: [
    {
      prop: 'orderNum',
      label: '序号',
    },
    {
      prop: 'unitQzh',
      label: '单位全宗号',
    },
    {
      prop: 'unitName',
      label: '单位名称',
    },
    {
      prop: 'isDispose',
      label: '人员是否配置齐全',
    },
  ],
  // 队伍开展工作情况表
  COCKPIT_DATA_GZQK: [
    {
      prop: 'orderNum',
      label: '序号',
    },
    {
      prop: 'qzh',
      label: '全宗号',
    },
    {
      prop: 'unitName',
      label: '单位名称',
    },
    {
      prop: 'isArchives',
      label: '有无档案室',
    },
    {
      prop: 'isArmy',
      label: '有无队伍',
    },
    {
      prop: 'isWork',
      label: '有无开展工作',
    },
  ],
  // 归集人员能力表
  COCKPIT_DATA_RYNL: [
    {
      prop: 'orderNum',
      label: '序号',
    },
    {
      prop: 'qzh',
      label: '全宗号',
    },
    {
      prop: 'unitName',
      label: '单位名称',
    },
    {
      prop: 'depaName',
      label: '科室名称',
    },
    {
      prop: 'userName',
      label: '姓名',
    },
    {
      prop: 'ywStudy',
      label: '业务学习',
    },
    {
      prop: 'workYear',
      label: '工作年限',
    },
    {
      prop: 'education',
      label: '学历',
    },
    {
      prop: 'post',
      label: '职务',
    },
    {
      prop: 'training',
      label: '培训情况',
    },
    {
      prop: 'rewardPunish',
      label: '奖惩荣誉',
    },
  ],
  // 监管数据源头使用表
  COCKPIT_DATA_SJYT: [
    {
      prop: 'orderNum',
      label: '序号',
    },
    {
      prop: 'qzh',
      label: '全宗号',
    },
    {
      prop: 'unitName',
      label: '单位名称',
    },
    {
      prop: 'oaSystem',
      label: 'OA系统',
    },
    {
      prop: 'businessSystem',
      label: '业务系统',
    },
    {
      prop: 'btSystem',
      label: '博通系统',
    },
  ],
  // 各单位开展情况表
  COCKPIT_DATA_KZQK: [
    {
      prop: 'orderNum',
      label: '序号',
    },
    {
      prop: 'qzh',
      label: '全宗号',
    },
    {
      prop: 'unitName',
      label: '单位名称',
    },
    {
      prop: 'collectionCategory',
      label: '归集门类',
    },
  ],
  // 专项档案归集各门类总数表
  COCKPIT_DATA_ZXGJML: [
    {
      prop: 'orderNum',
      label: '序号',
    },
    {
      prop: 'qzh',
      label: '全宗号',
    },
    {
      prop: 'unitName',
      label: '单位名称',
    },
    {
      prop: 'depaName',
      label: '科室名称',
    },
    {
      prop: 'collectionCategory',
      label: '归集门类',
    },
    {
      prop: 'collectionNumber',
      label: '归集文件数',
    },
  ],
  // 专项档案归集监管数据源头使用情况表
  COCKPIT_DATA_ZXSJYT: [
    {
      prop: 'orderNum',
      label: '序号',
    },
    {
      prop: 'qzh',
      label: '全宗号',
    },
    {
      prop: 'unitName',
      label: '单位名称',
    },
    {
      prop: 'oaSystem',
      label: 'OA系统',
    },
    {
      prop: 'businessSystem',
      label: '业务系统',
    },
    {
      prop: 'btSystem',
      label: '博通系统',
    },
  ],
  // 专项档案归集工作开展情况表
  COCKPIT_DATA_ZXGZKZ: [
    {
      prop: 'orderNum',
      label: '序号',
    },
    {
      prop: 'qzh',
      label: '全宗号',
    },
    {
      prop: 'unitName',
      label: '单位名称',
    },
    {
      prop: 'depaName',
      label: '科室名称',
    },
    {
      prop: 'taskInNumber',
      label: '任务进行中数量',
    },
    {
      prop: 'taskEndNumber',
      label: '任务已完成数量',
    },
    {
      prop: 'taskNotNumber',
      label: '任务未完成数量',
    },
  ]
}
