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
                      <Icon type="md-podium" />
                      柱状图
                    </template>
                    <MenuItem name="bar/demo1">简单示例</MenuItem>
                    <MenuItem name="bar/demo2">两根柱状</MenuItem>
                    <MenuItem name="bar/demo3">横着摆放</MenuItem>
                    <MenuItem name="bar/demo4">图表数据</MenuItem>
                    <MenuItem name="bar/demo5">压差突变</MenuItem>
                  </Submenu>
                  <Submenu name="2">
                    <template slot="title">
                      <Icon type="ios-radio" />
                      饼状图
                    </template>
                    <MenuItem name="pie/demo1">示例1</MenuItem>
                    <MenuItem name="pie/demo2">示例2</MenuItem>
                  </Submenu>
                  <Submenu name="3">
                    <template slot="title">
                      <Icon type="ios-pulse" />
                      线状图
                    </template>
                    <MenuItem name="line/demo1">示例1</MenuItem>
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