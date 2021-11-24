const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  currentWorkbench: state => state.user.currentWorkbench,
  deptList: state => state.user.deptList,
  roleList: state => state.user.roleList,
  permission_routes: state => state.permission.routes,
  indexRouter: state => state.permission.indexRouter,
  topbarRouters:state => state.permission.topbarRouters,
  defaultRoutes:state => state.permission.defaultRoutes,
  sidebarRouters:state => state.permission.sidebarRouters,
  noticeList:state => state.notice.noticeList,
  unread: state => state.notice.unread,
}
export default getters
