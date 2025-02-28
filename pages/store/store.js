// pages/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    currentTab: 0,
    categories: ['全部', '食品', '玩具', '清洁', '医疗', '服饰'],
    productList: [],
    cartCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getProductList();
    this.getCartCount();
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
    // 每次显示页面时更新购物车数量
    this.getCartCount();
  },

  // 获取商品列表
  getProductList(categoryIndex = 0) {
    // 模拟商品数据
    const allProducts = [
      {
        id: 1,
        name: '优质猫粮 10kg',
        price: 299,
        image: 'https://img.freepik.com/free-photo/cat-food-wooden-floor_1150-18079.jpg',
        category: 1, // 食品
        sales: 256,
        rating: 4.8
      },
      {
        id: 2,
        name: '狗狗磨牙玩具',
        price: 49,
        image: 'https://img.freepik.com/free-photo/dog-toys-floor_23-2148523888.jpg',
        category: 2, // 玩具
        sales: 189,
        rating: 4.6
      },
      {
        id: 3,
        name: '猫咪按摩梳',
        price: 68,
        image: 'https://img.freepik.com/free-photo/grooming-kit-pets_23-2148523883.jpg',
        category: 3, // 清洁
        sales: 132,
        rating: 4.7
      },
      {
        id: 4,
        name: '宠物智能喂食器',
        price: 399,
        image: 'https://img.freepik.com/free-photo/automatic-pet-feeder-isolated-white-background_123827-22909.jpg',
        category: 1, // 食品
        sales: 98,
        rating: 4.9
      },
      {
        id: 5,
        name: '宠物医用项圈',
        price: 89,
        image: 'https://img.freepik.com/free-photo/dog-collar-isolated_1150-18079.jpg',
        category: 4, // 医疗
        sales: 76,
        rating: 4.5
      },
      {
        id: 6,
        name: '宠物冬季保暖衣',
        price: 129,
        image: 'https://img.freepik.com/free-photo/dog-wearing-clothes_23-2148523889.jpg',
        category: 5, // 服饰
        sales: 112,
        rating: 4.7
      }
    ];

    // 根据分类筛选商品
    let productList = [];
    if (categoryIndex === 0) {
      productList = allProducts;
    } else {
      productList = allProducts.filter(item => item.category === categoryIndex);
    }

    this.setData({
      productList: productList
    });
  },

  // 获取购物车商品数量
  getCartCount() {
    // 实际应用中应该从本地存储或服务器获取
    // 这里仅做模拟
    const cartCount = 3;
    
    this.setData({
      cartCount: cartCount
    });
  },

  // 切换分类标签
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    
    this.setData({
      currentTab: index
    });
    
    this.getProductList(index);
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

    // 实际应用中应该根据搜索关键词请求数据
    // 这里仅做模拟
    wx.showLoading({
      title: '搜索中',
    });

    setTimeout(() => {
      wx.hideLoading();
      
      // 模拟搜索结果
      const searchResult = this.data.productList.filter(item => 
        item.name.indexOf(this.data.searchValue) !== -1
      );
      
      this.setData({
        productList: searchResult
      });
    }, 500);
  },

  // 前往商品详情页
  goToProductDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${id}`,
    });
  },

  // 添加到购物车
  addToCart(e) {
    const id = e.currentTarget.dataset.id;
    
    // 实际应用中应该将商品添加到购物车
    // 这里仅做模拟
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
    
    this.setData({
      cartCount: this.data.cartCount + 1
    });
  },

  // 前往购物车页面
  goToCart() {
    wx.navigateTo({
      url: '/pages/cart/cart',
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
    this.getProductList(this.data.currentTab);
    this.getCartCount();
    
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 可以在这里加载更多商品
    wx.showToast({
      title: '已加载全部商品',
      icon: 'none'
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: 'PetMatch宠遇商城 - 宠物用品一站式购物平台',
      path: '/pages/store/store'
    };
  }
})