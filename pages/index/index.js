// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    bannerList: [],
    categoryList: [],
    recommendList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBannerList();
    this.getCategoryList();
    this.getRecommendList();
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

  },

  // 获取轮播图数据
  getBannerList() {
    // 模拟轮播图数据
    const bannerList = [
      {
        id: 1,
        image: 'https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generated-by-ai_188544-15537.jpg',
        url: '/pages/detail/detail?id=1'
      },
      {
        id: 2,
        image: 'https://img.freepik.com/free-photo/cute-dog-portrait-studio_23-2150141892.jpg',
        url: '/pages/detail/detail?id=2'
      },
      {
        id: 3,
        image: 'https://img.freepik.com/free-photo/cute-pet-collage-isolated_23-2150312566.jpg',
        url: '/pages/detail/detail?id=3'
      }
    ];

    this.setData({
      bannerList: bannerList
    });
  },

  // 获取分类导航数据
  getCategoryList() {
    // 模拟分类导航数据
    const categoryList = [
      {
        id: 1,
        name: '宠物护理',
        icon: 'https://img.icons8.com/color/96/000000/pet-grooming.png',
        url: '/pages/category/category?id=1'
      },
      {
        id: 2,
        name: '宠物诊疗',
        icon: 'https://img.icons8.com/color/96/000000/veterinarian.png',
        url: '/pages/category/category?id=2'
      },
      {
        id: 3,
        name: '宠物用品',
        icon: 'https://img.icons8.com/color/96/000000/dog-bowl.png',
        url: '/pages/category/category?id=3'
      },
      {
        id: 4,
        name: '宠物训练',
        icon: 'https://img.icons8.com/color/96/000000/dog-training.png',
        url: '/pages/category/category?id=4'
      }
    ];

    this.setData({
      categoryList: categoryList
    });
  },

  // 获取推荐内容数据
  getRecommendList() {
    // 模拟推荐内容数据
    const recommendList = [
      {
        id: 1,
        title: '如何照顾新生小猫',
        desc: '新手养猫必看指南，让您的小猫健康成长',
        image: 'https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generated-by-ai_188544-15537.jpg',
        url: '/pages/article/article?id=1'
      },
      {
        id: 2,
        title: '狗狗的日常训练',
        desc: '专业训犬师分享训练技巧和方法',
        image: 'https://img.freepik.com/free-photo/cute-dog-portrait-studio_23-2150141892.jpg',
        url: '/pages/article/article?id=2'
      },
      {
        id: 3,
        title: '宠物营养搭配指南',
        desc: '科学的宠物饮食计划',
        image: 'https://img.freepik.com/free-photo/bowl-with-dry-food-small-dog_1150-18458.jpg',
        url: '/pages/article/article?id=3'
      },
      {
        id: 4,
        title: '猫咪行为解析',
        desc: '了解猫咪的身体语言',
        image: 'https://img.freepik.com/free-photo/cute-domestic-cat-portrait-closeup_23-2150782344.jpg',
        url: '/pages/article/article?id=4'
      }
    ];

    this.setData({
      recommendList: recommendList
    });
  },

  // 搜索框输入事件
  onSearchInput(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },

  // 搜索事件
  onSearch() {
    if (!this.data.searchValue.trim()) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      });
      return;
    }

    wx.navigateTo({
      url: `/pages/search/search?keyword=${this.data.searchValue}`,
    });
  },

  // 点击分类导航
  onCategoryTap(e) {
    const { url } = e.currentTarget.dataset;
    wx.navigateTo({
      url: url
    });
  },

  // 点击推荐内容
  onRecommendTap(e) {
    const { url } = e.currentTarget.dataset;
    wx.navigateTo({
      url: url
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
    this.getBannerList();
    this.getCategoryList();
    this.getRecommendList();
    
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 可以在这里加载更多推荐内容
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: 'PetMatch宠遇 - 您的宠物社交平台',
    }
  }
})