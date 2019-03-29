<template>
  <div class="layout">
    <Layout style="height:100%;">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="0">
          <div class="layout-logo" @click="goHomePage">
          </div>
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
        </Menu>
      </Header>
      <Content>
        <Layout :style="{padding: '0 50px 15px'}">
          <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
            <Layout>
              <Sider hide-trigger :style="{background: '#fff'}">
                <Menu theme="light" width="auto" @on-select="turnUrl">
                  <Submenu name="1">
                    <template slot="title">
                      <Icon type="ios-people" />
                      系统管理
                    </template>
                    <MenuItem name="system/dict">字典</MenuItem>
                    <MenuItem name="system/duty">值班表</MenuItem>
                    <MenuItem name="system/import">国标导入</MenuItem>
                    <MenuItem name="system/svg">svg图标</MenuItem>
                    <MenuItem name="system/cropper">图片剪切</MenuItem>
                  </Submenu>
                  <Submenu name="2">
                    <template slot="title">
                      <Icon type="ios-analytics" />
                      国标数据管理
                    </template>
                    <MenuItem name="gbt/gbtBasic">标准数据</MenuItem>
                    <MenuItem name="gbt/gbtEnum">枚举值管理</MenuItem>
                  </Submenu>
                </Menu>
              </Sider>
              <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                <router-view/>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>
<script>
import Fullscreen from '../components/fullscreen'
export default {
  components: {
    Fullscreen,
  },
  data () {
    return {
      isFullscreen: false
    }
  },
  methods: {
    goHomePage () {
      window.location.href = '//admin.akpay.top'
    },
    turnUrl (name) {
      this.$router.push({ path: `/admin/${name}` })
    }
  },
}
</script>