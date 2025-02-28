// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    isLogin: false,
    myPets: [],
    orderStats: {
      unpaid: 0,
      unshipped: 0,
      shipped: 0,
      completed: 0
    },
    functionList: [
      { id: 'myPets', name: '我的宠物', icon: 'https://img.icons8.com/ios/50/000000/pet.png', url: '/pages/my-pets/my-pets' },
      { id: 'favorites', name: '我的收藏', icon: 'https://img.icons8.com/ios/50/000000/like.png', url: '/pages/favorites/favorites' },
      { id: 'moments', name: '我的动态', icon: 'https://img.icons8.com/ios/50/000000/camera.png', url: '/pages/moments/moments' },
      { id: 'health', name: '宠物健康', icon: 'https://img.icons8.com/ios/50/000000/stethoscope.png', url: '/pages/health/health' },
      { id: 'settings', name: '设置', icon: 'https://img.icons8.com/ios/50/000000/settings.png', url: '/pages/settings/settings' },
      { id: 'help', name: '帮助与反馈', icon: 'https://img.icons8.com/ios/50/000000/help.png', url: '/pages/help/help' },
      { id: 'about', name: '关于我们', icon: 'https://img.icons8.com/ios/50/000000/info.png', url: '/pages/about/about' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLoginStatus();
    this.getMyPets();
    this.getOrderStats();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 每次显示页面时更新数据
    if (this.data.isLogin) {
      this.getMyPets();
      this.getOrderStats();
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 检查登录状态
   */
  checkLoginStatus: function () {
    // 模拟获取登录状态
    const isLogin = true; // 实际应用中应该从缓存或全局状态获取
    
    if (isLogin) {
      // 模拟用户数据
      const userInfo = {
        id: 'user123',
        nickName: '宠物爱好者',
        avatar: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
        level: '铂金会员',
        points: 2580
      };
      
      this.setData({
        isLogin: true,
        userInfo: userInfo
      });
    }
  },

  /**
   * 获取我的宠物列表
   */
  getMyPets: function () {
    // 模拟获取宠物数据
    const myPets = [
      {
        id: 'pet1',
        name: '球球',
        avatar: 'https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generated-by-ai_188544-15536.jpg',
        type: '猫咪',
        breed: '英短'
      },
      {
        id: 'pet2',
        name: '豆豆',
        avatar: 'https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg',
        type: '狗狗',
        breed: '柯基'
      }
    ];
    
    this.setData({
      myPets: myPets
    });
  },

  /**
   * 获取订单统计
   */
  getOrderStats: function () {
    // 模拟获取订单统计数据
    const orderStats = {
      unpaid: 2,
      unshipped: 1,
      shipped: 3,
      completed: 15
    };
    
    this.setData({
      orderStats: orderStats
    });
  },

  /**
   * 跳转到登录页面
   */
  goToLogin: function () {
    // 跳转到登录页面
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  /**
   * 跳转到编辑资料页面
   */
  goToEditProfile: function () {
    wx.navigateTo({
      url: '/pages/edit-profile/edit-profile'
    });
  },

  /**
   * 跳转到我的宠物页面
   */
  goToMyPets: function () {
    wx.navigateTo({
      url: '/pages/my-pets/my-pets'
    });
  },

  /**
   * 跳转到订单页面
   */
  goToOrders(e) {
    const status = e.currentTarget.dataset.status || 'all';
    let statusNum = 0; // 默认为"全部"标签页
    
    if (status === 'unpaid') {
      statusNum = 1; // 待付款
    } else if (status === 'unshipped') {
      statusNum = 2; // 待发货
    } else if (status === 'shipped') {
      statusNum = 3; // 待收货
    } else if (status === 'completed') {
      statusNum = 4; // 已完成
    } else if (status === 'all') {
      statusNum = 0; // 全部订单
    }
    
    wx.navigateTo({
      url: `/pages/order/order?status=${statusNum}`
    });
  },

  /**
   * 跳转到功能页面
   */
  goToFunction: function (e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '宠物配对 - 找到心仪的宠物伙伴',
      path: '/pages/index/index'
    };
  }
})