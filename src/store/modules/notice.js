const notice = {
    state: {
      unread: 0,
      noticeList: [],
    },
  
    mutations: {
      SET_UNREAD: (state, unread) => {
        state.unread = unread
      },
      SET_NOTICE_LIST: (state, noticeList) => {
        state.noticeList = noticeList
      },
    },
  
    actions: {
    }
  }
  
  export default notice