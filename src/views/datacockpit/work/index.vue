<template>
  <div>
    <div class="data-wrapper">
      <div class="title">档案归集各门类总数</div>
      <div class="content">
        <div class="card-list">
          <div class="card-item" v-for="(item,index) in otherData.mlzs" :key="index">
            <div class="number">{{ item.value }}</div>
            <div class="name">{{ item.name }}</div>
          </div>
          <!-- <div class="card-item">
            <div class="number">654</div>
            <div class="name">门类2</div>
          </div>
          <div class="card-item">
            <div class="number">345</div>
            <div class="name">门类3</div>
          </div>
          <div class="card-item">
            <div class="number">122</div>
            <div class="name">门类4</div>
          </div>
          <div class="card-item">
            <div class="number">1322</div>
            <div class="name">门类5</div>
          </div>
          <div class="card-item">
            <div class="number">85</div>
            <div class="name">门类6</div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title">监管数据源头使用情况</div>
      <div class="content">
        <div class="circle-card-list">
          <div class="card-item" v-for="(item,index) in otherData.sjyt" :key="index">
            <div class="number">{{ item.value }}</div>
            <div class="name">{{ item.name }}</div>
          </div>
          <!-- <div class="card-item">
            <div class="number">654</div>
            <div class="name">业务系统</div>
          </div>
          <div class="card-item">
            <div class="number">345</div>
            <div class="name">博通系统</div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title">归集工作开展情况</div>
      <div class="content">
        <div class="circle-card-list">
          <div class="card-item">
            <div class="number">{{ otherData.kzqk.taskNum - otherData.kzqk.finishNum - otherData.kzqk.shouldNotNum }}</div>
            <div class="name" style="color: #ff6b00">进行中</div>
          </div>
          <div class="card-item">
            <div class="number">{{ otherData.kzqk.finishNum }}</div>
            <div class="name" style="color: #15be50">已完成</div>
          </div>
          <div class="card-item">
            <div class="number">{{ otherData.kzqk.shouldNotNum }}</div>
            <div class="name" style="color: #d40000">未完成</div>
          </div>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-place">
        <div class="title">各单位开展情况</div>
        <div>
          <el-select v-model="value" placeholder="请选择" size="mini" @change="change">
            <el-option
              v-for="(item,index) in units"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="content">
        <div class="large-card-list">
          <div class="card-item" v-for="(item,index) in typeData" :key="index">
            <div class="status success">
              <img :src="require('@/assets/images/icons/success.png')" />
              <span>已收集</span>
            </div>
            <div class="name">{{ item }}</div>
          </div>
          <!-- <div class="card-item">
            <div class="status success">
              <img :src="require('@/assets/images/icons/success.png')" />
              <span>已收集</span>
            </div>
            <div class="name">门类2</div>
          </div>
          <div class="card-item">
            <div class="status success">
              <img :src="require('@/assets/images/icons/success.png')" />
              <span>已收集</span>
            </div>
            <div class="name">门类3</div>
          </div>
          <div class="card-item">
            <div class="status error">
              <img :src="require('@/assets/images/icons/error.png')" />
              <span>未收集</span>
            </div>
            <div class="name">门类4</div>
          </div>
          <div class="card-item">
            <div class="status error">
              <img :src="require('@/assets/images/icons/error.png')" />
              <span>未收集</span>
            </div>
            <div class="name">门类5</div>
          </div>
          <div class="card-item">
            <div class="status error">
              <img :src="require('@/assets/images/icons/error.png')" />
              <span>未收集</span>
            </div>
            <div class="name">门类6</div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="data-wrapper" v-for="(item1,index1) in specialData.records" :key="index1">
      <div class="title">{{ item1.specialName }}</div>
      <div class="content">
        <div>
          <div class="sub-title">档案归集各门类总数</div>
          <div class="card-list" v-if="item1.mlzs">
            <div class="card-item" v-for="(ele,index) in item1.mlzs.slice(0, 6)" :key="index">
              <div class="number">{{ ele.value }}</div>
              <div class="name">{{ ele.name }}</div>
            </div>
            <!-- <div class="card-item">
              <div class="number">654</div>
              <div class="name">门类2</div>
            </div>
            <div class="card-item">
              <div class="number">345</div>
              <div class="name">门类3</div>
            </div>
            <div class="card-item">
              <div class="number">122</div>
              <div class="name">门类4</div>
            </div>
            <div class="card-item">
              <div class="number">1322</div>
              <div class="name">门类5</div>
            </div>
            <div class="card-item">
              <div class="number">85</div>
              <div class="name">门类6</div>
            </div> -->
          </div>
        </div>

        <div>
          <div class="sub-title">监管数据源头使用情况</div>
          <div class="circle-card-list">
            <div class="card-item" v-for="(ele,index) in item1.syqk" :key="index">
              <div class="number">{{ ele.value }}</div>
              <div class="name">{{ ele.name }}</div>
            </div>
            <!-- <div class="card-item">
              <div class="number">654</div>
              <div class="name">业务系统</div>
            </div>
            <div class="card-item">
              <div class="number">345</div>
              <div class="name">博通系统</div>
            </div> -->
          </div>
        </div>

        <div>
          <div class="sub-title">归集工作开展情况</div>
          <div class="circle-card-list">
            <div class="card-item" v-for="(ele,index) in item1.kzqk" :key="index">
              <div class="number">{{ ele.value }}</div>
              <div class="name" style="color: #ff6b00">{{ ele.name }}</div>
            </div>
            <!-- <div class="card-item">
              <div class="number">654</div>
              <div class="name" style="color: #15be50">已完成</div>
            </div>
            <div class="card-item">
              <div class="number">345</div>
              <div class="name" style="color: #d40000">未完成</div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOther, getUnitList, development, specialPro } from "@/api/datacockpit";
export default {
  data() {
    return {
      // 单位名称
      value: "",
      // 监管对象归集工作开展情况-其他(门类总数、使用情况、开展情况)数据
      otherData: {
        // 档案归集各门类总数
        mlzs: [],
        // 监管数据源头使用情况
        sjyt: [],
        // 归集工作开展情况
        kzqk: [],
      },
      // 开展情况单位集合
      units: [],
      // 门类
      typeData: [],
      // 专项数据
      specialData: [],
    };
  },
  created(){
    this.getOther();
    this.getUnitList();
    this.development(this.units[0]);
    this.specialPro()
  },
  methods:{
    // 监管对象归集工作开展情况-其他(门类总数、使用情况、开展情况)
    getOther(){
      getOther().then(({ data })=>{
        this.otherData = data
      })
    },
    // 获取开展情况单位集合
    getUnitList(){
      getUnitList().then(({ data })=>{
        this.units = data
      })
    },
    // 监管对象归集工作开展情况--各单位开展情况
    development(data){
      development({ unitName: data }).then(({ data })=>{
        this.typeData = data
      })
    },
    // 切换单位
    change(data){
      this.development(data);
    },
    // 获取监管对象归集工作开展情况-专项归集
    specialPro(){
      specialPro().then(({ data })=>{
        this.specialData = data
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.data-wrapper {
  padding: 16px 20px;
  &:not(:first-child) {
    border-top: 1px solid #ddd;
  }
  .title {
    height: 22px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    &:before {
      display: block;
      content: "";
      margin-right: 8px;
      height: 5px;
      width: 5px;
      border-radius: 50%;
      background-color: #1492ff;
    }
  }
  .content {
  }
}
.card-list {
  width: 100%;
  padding: 12px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 56px 56px;
  grid-gap: 12px 12px;
  .card-item {
    border-radius: 2px;
    border: 1px solid #dddddd;
    background: #ffffff;
    text-align: center;
    .number {
      padding-top: 4px;
      height: 28px;
      line-height: 28px;
      font-weight: bold;
      font-size: 24px;
    }
    .name {
      margin-top: 1px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #999;
    }
  }
}
.circle-card-list {
  width: 100%;
  padding: 18px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .card-item {
    height: 104px;
    width: 104px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid #dddddd;
    background: #ffffff;
    .number {
      height: 28px;
      line-height: 28px;
      font-weight: bold;
      font-size: 24px;
    }
    .name {
      margin-top: 11px;
      height: 18px;
      line-height: 18px;
      font-size: 14px;
      color: #999;
    }
  }
}

.large-card-list {
  width: 100%;
  padding: 12px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 80px 80px;
  grid-gap: 12px 20px;
  .card-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    border: 1px solid #dddddd;
    background: #ffffff;
    text-align: center;
    .status {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 22px;
      line-height: 22px;
      font-size: 16px;
      &.success {
        color: #15be50;
      }
      &.error {
        color: #d40000;
      }
      img {
        height: 17px;
        width: 17px;
        margin-right: 4px;
      }
    }
    .name {
      margin-top: 6px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #999;
    }
  }
}

.sub-title {
  margin-top: 12px;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}

.title-place {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
