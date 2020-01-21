<template>
  <div>
    <Row :gutter="10">

      <Col :md="24" :lg="24">
        <Card>
          <div>
            <Icon type="md-list-box" size="18"/>
            配置
            <Button :style="{float:'right'}" type="primary" style="margin-left: 8px">保存</Button>
          </div>


          <Divider style="margin: 15px 0"/>
          <Form :model="formItem" :label-width="150">

            <FormItem label="数据库配置">
              <Select v-model="formItem.select2" multiple>
                <Option value="customer_center">customer_center</Option>
                <Option value="loan_center">loan_center</Option>
                <Option value="api_center">api_center</Option>
                <Option value="message_center">message_center</Option>
              </Select>
            </FormItem>

            <FormItem label="通知人员">
              <Select v-model="formItem.select3" multiple>
                <Option value="程俊杰">程俊杰</Option>
                <Option value="程鹏">程鹏</Option>
                <Option value="丁金梁">丁金梁</Option>
                <Option value="申俊伯">申俊伯</Option>
              </Select>
            </FormItem>
          </Form>
        </Card>


        <br/>
      </Col>

      <Col :md="24" :lg="24">
        <Card>
          <div>
            <Icon type="md-list-box" size="18"/>
            配置变更通知表
            <Button :style="{float:'right'}" type="primary" style="margin-left: 8px">保存</Button>

          </div>
          <Divider style="margin: 15px 0"/>


          <Form :model="formItem" :label-width="150">
            <FormItem label="customer_center">
              <Select v-model="formItem.select" multiple>
                <Option value="user">user</Option>
                <Option value="customer_idenitiy_{16}">customer_idenitiy_{16}</Option>
                <Option value="customer_address_{60}">customer_address_{60}</Option>
              </Select>
            </FormItem>

            <FormItem label="loan_center">
              <Select v-model="formItem.select" multiple>
                <Option value="user">user</Option>
                <Option value="customer_idenitiy_{16}">customer_idenitiy_{16}</Option>
                <Option value="customer_address_{60}">customer_address_{60}</Option>
              </Select>
            </FormItem>

            <FormItem label="api_center">
              <Select v-model="formItem.select" multiple>
                <Option value="user">user</Option>
                <Option value="customer_idenitiy_{16}">customer_idenitiy_{16}</Option>
                <Option value="customer_address_{60}">customer_address_{60}</Option>
              </Select>
            </FormItem>

            <FormItem label="message_center">
              <Select v-model="formItem.select" multiple>
                <Option value="user">user</Option>
                <Option value="customer_idenitiy_{16}">customer_idenitiy_{16}</Option>
                <Option value="customer_address_{60}">customer_address_{60}</Option>
              </Select>
            </FormItem>

            <FormItem label="customer_center">
              <Select v-model="formItem.select" multiple>
                <Option value="user">user</Option>
                <Option value="customer_idenitiy_{16}">customer_idenitiy_{16}</Option>
                <Option value="customer_address_{60}">customer_address_{60}</Option>
              </Select>
            </FormItem>

            <FormItem label="loan_center">
              <Select v-model="formItem.select" multiple>
                <Option value="user">user</Option>
                <Option value="customer_idenitiy_{16}">customer_idenitiy_{16}</Option>
                <Option value="customer_address_{60}">customer_address_{60}</Option>
              </Select>
            </FormItem>

            <FormItem label="api_center">
              <Select v-model="formItem.select" multiple>
                <Option value="user">user</Option>
                <Option value="customer_idenitiy_{16}">customer_idenitiy_{16}</Option>
                <Option value="customer_address_{60}">customer_address_{60}</Option>
              </Select>
            </FormItem>

            <FormItem label="message_center">
              <Select v-model="formItem.select" multiple>
                <Option value="user">user</Option>
                <Option value="customer_idenitiy_{16}">customer_idenitiy_{16}</Option>
                <Option value="customer_address_{60}">customer_address_{60}</Option>
              </Select>
            </FormItem>

          </Form>

        </Card>
      </Col>
    </Row>

  </div>


</template>
<script>

  import {baseURL} from '@/config'
  import {getCurrentDate, formatDateYYYMMDD} from '@/lib/tools'
  import {JsonToString, StringToJson} from '@/lib/utils'
  import {baseServices, userList, baseDepartments, baseFiles, baseFilesPreview} from '@/api/base'
  import {createOrUpdateFlowTesttask, getflowTesttask, getflowTesttaskOperations} from '@/api/testtask'
  import {mapState, mapGetters} from 'vuex'

  export default {
    data() {
      return {
        formItem: {
          input: '',
          select: ['user', 'customer_idenitiy_{16}', 'customer_address_{60}'],
          select2: ['customer_center', 'loan_center', 'api_center', 'message_center'],
          select3: ['程俊杰', '程鹏', '丁金梁', '申俊伯'],
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        }
      }
    }
  }
</script>
