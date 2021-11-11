<template>
  <div
    class="sidebar-container"
    :class="{ 'has-logo': showLogo }"
    :style="{
      backgroundColor:
        settings.sideTheme === 'theme-dark'
          ? variables.menuBackground
          : variables.menuLightBackground,
    }"
  >
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar
      class="el-scrollbar"
      :class="settings.sideTheme"
      wrap-class="scrollbar-wrapper"
    >
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="
          settings.sideTheme === 'theme-dark'
            ? variables.menuBackground
            : variables.menuLightBackground
        "
        :text-color="
          settings.sideTheme === 'theme-dark'
            ? variables.menuColor
            : variables.menuLightColor
        "
        :unique-opened="true"
        :active-text-color="settings.theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
    <div class="stretch">
      <el-menu :collapse="isCollapse">
        <el-menu-item class="submenu-title-noDropdown"
      >
        <hamburger
          id="hamburger-container"
          :is-active="sidebar.opened"
          class="hamburger-container"
          @toggleClick="toggleSideBar"
        />
        <span slot="title">展开</span>
      </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import Hamburger from "@/components/Hamburger";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";
import scrollbarWidth from "element-ui/src/utils/scrollbar-width";

export default {
  components: { SidebarItem, Logo, Hamburger },
  data() {
    return {
      scrollbarWidth: 0,
    };
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["sidebarRouters", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },

  created() {
    this.scrollbarWidth = scrollbarWidth();
    console.log(this.sidebarRouters);
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
      console.log(this.sidebar.opened);
    },
  },
};
</script>

<style lang="scss" scoped>
.stretch {
  height: 72px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left:0;
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.08);
}
.stretch ::v-deep .el-menu-item {
  height: 72px !important;
  line-height: 72px !important;
}
.stretch ::v-deep .el-submenu__title {
  height: 72px !important;
  line-height: 72px !important;
}
.el-scrollbar ::v-deep .el-submenu__title {
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  padding-right: 16px !important;
}
.el-scrollbar ::v-deep .el-menu-item {
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  padding: 0 16px 0 36px;
}
.el-scrollbar ::v-deep .el-submenu__title i {
  font-size: 20px;
}
</style>
