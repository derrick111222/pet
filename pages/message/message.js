// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: [],
    unreadCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMessageList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 每次显示页面时更新未读消息数
    this.countUnreadMessages();
  },

  // 获取消息列表
  getMessageList() {
    // 模拟消息数据
    const messageList = [
      {
        id: 1,
        userId: 101,
        userName: '奶糖的主人',
        avatar: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
        lastMessage: '您好，我对您的奶糖很感兴趣',
        time: '09:30',
        unread: 2,
        petName: '奶糖'
      },
      {
        id: 2,
        userId: 102,
        userName: '皮皮的主人',
        avatar: 'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg',
        lastMessage: '好的，周末下午方便面看看皮皮吗？',
        time: '昨天',
        unread: 0,
        petName: '皮皮'
      },
      {
        id: 3,
        userId: 103,
        userName: '米粒的主人',
        avatar: 'https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg',
        lastMessage: '米粒很乖的，已经打过疫苗了，您可以放心',
        time: '昨天',
        unread: 1,
        petName: '米粒'
      },
      {
        id: 4,
        userId: 104,
        userName: '豆豆的主人',
        avatar: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
        lastMessage: '收到您的申请了，豆豆现在在观察期',
        time: '星期一',
        unread: 0,
        petName: '豆豆'
      }
    ];

    this.setData({
      messageList: messageList
    });

    this.countUnreadMessages();
  },

  // 计算未读消息数
  countUnreadMessages() {
    let unreadCount = 0;
    this.data.messageList.forEach(item => {
      unreadCount += item.unread;
    });

    this.setData({
      unreadCount: unreadCount
    });

    // 更新TabBar的消息数
    if (unreadCount > 0) {
      wx.setTabBarBadge({
        index: 3, // 消息选项卡的索引，根据实际情况调整
        text: unreadCount.toString()
      });
    } else {
      wx.removeTabBarBadge({
        index: 3
      });
    }
  },

  // 前往聊天页面
  goToChat(e) {
    const { userid, username, petname } = e.currentTarget.dataset;
    
    // 将该消息标记为已读
    const messageList = this.data.messageList.map(item => {
      if (item.userId === userid) {
        return {
          ...item,
          unread: 0
        };
      }
      return item;
    });
    
    this.setData({
      messageList: messageList
    });
    
    this.countUnreadMessages();
    
    // 跳转到聊天页面
    wx.navigateTo({
      url: `/pages/chat/chat?userId=${userid}&userName=${username}&petName=${petname}`,
    });
  },

  // 删除消息
  deleteMessage(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '提示',
      content: '确定要删除这条消息吗？',
      success: (res) => {
        if (res.confirm) {
          const messageList = this.data.messageList.filter(item => item.id !== id);
          
          this.setData({
            messageList: messageList
          });
          
          this.countUnreadMessages();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 下拉刷新，重新获取数据
    this.getMessageList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})