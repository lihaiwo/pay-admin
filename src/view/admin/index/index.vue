<template>
  <div class="layout">
    <Layout style="height:100%;">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="0">
          <div class="layout-logo" @click="goHomePage">
          </div>
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
                      系统
                    </template>
                    <MenuItem name="accountManage">账户管理</MenuItem>
                    <MenuItem name="onDuty">值班表</MenuItem>
                    <MenuItem name="autoCode">代码生成</MenuItem>
                    <MenuItem name="board">模板</MenuItem>
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
export default {
  methods: {
    goHomePage () {
      this.$router.push({ path: `/` })
    },
    turnUrl (name) {
      this.$router.push({ path: `/admin/${name}` })
    }
  },
}
</script>
<style lang="less" src="./index.less"></style>