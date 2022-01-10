<template>
  <div id="people-select-tree">
    <p>people-select-tree</p>
    <el-button @click="dialogVisible = true">open</el-button>
    <el-dialog title="选择人员" width="60%" :visible="dialogVisible" :before-close="handleClose">
      <div class="select-people-wrapper">
        <div class="left-wrapper">
          <tree-list ref='treeList' :initData="initDeptData" :loadItems='getDeptPeople'/>
        </div>
        <div class="right-wrapper">
          <check-list @getChooseData="getChooseData" @onEmpty="resetTree"/>
        </div>
      </div>
      <template slot='footer'>
        <el-button type='primary' @click="confirm">确认</el-button>
        <el-button @click="handleClose">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import treeList from '../components/peopleSelectTree/treeList'
import checkList from '../components/peopleSelectTree/checkList'
import { getAllDepartmentsApi, getPeopleByDepartmentApi } from '../components/peopleSelectTree/api'

export default {
  name: 'peopleSelectTree',
  data () {
    return {
      dialogVisible: false,
      chooseData: [],
      initDeptData: null
    }
  },
  components: {
    treeList,
    checkList
  },
  methods: {
    handleClose () {
      this.chooseData = []
      this.dialogVisible = false
    },
    confirm () {
      this.dialogVisible = false
    },
    async getDepartments () {
      this.initDeptData = await getAllDepartmentsApi()
    },
    async getDeptPeople (code) {
      return (await getPeopleByDepartmentApi(code))
    },
    getChooseData (v) {
      this.chooseData = v
    },
    resetTree () {
      this.$refs.treeList && this.$refs.treeList.resetCheck()
    }
  },
  mounted () {
    this.getDepartments()
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog__body {
  padding: 0;
}

.select-people-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 600px;

  .left-wrapper {
    width: 33%;
    padding: 16px 0;
  }

  .right-wrapper {
    width: 67%;
    border-left: 1px solid #e6e6e6;
  }
}
</style>
