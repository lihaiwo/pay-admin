<template>
  <div class="layout">
    <Layout style="height:100%;">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="0">
          <div class="layout-logo" @click="goHomePage">
          </div>
          <user :user-avatar="userAvatar"/>
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
                    <MenuItem name="system/duty">值班表</MenuItem>
                    <MenuItem name="system/import">国标导入</MenuItem>
                    <MenuItem name="system/svg">svg图标</MenuItem>
                    <MenuItem name="system/cropper">图片剪切</MenuItem>
                  </Submenu>
                  <Submenu name="3">
                    <template slot="title">
                      <Icon type="md-bonfire" />
                      工具
                    </template>
                    <MenuItem name="tools/check">考勤表统计</MenuItem>
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
import User from '../components/user'
export default {
  components: {
    Fullscreen,User
  },
  data () {
    return {
      isFullscreen: false
    }
  },
  computed: {
    userAvatar () {
      return 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
    },
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