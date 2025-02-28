// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, // 当前选中的标签页，0: 全部, 1: 待付款, 2: 待发货, 3: 待收货, 4: 已完成, 5: 已取消
    tabs: ['全部', '待付款', '待发货', '待收货', '已完成', '已取消'],
    orderList: [], // 订单列表
    searchValue: '', // 搜索关键词
    isLoading: false, // 是否正在加载数据
    isRefreshing: false, // 是否正在下拉刷新
    noMoreData: false // 是否没有更多数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 如果有传入状态参数，则切换到对应标签页
    if (options.status !== undefined && options.status !== '') {
      const status = parseInt(options.status);
      // 状态值需要+1，因为我们添加了"全部"标签页
      if (status >= 0 && status <= 4) {
        this.setData({
          currentTab: status + 1
        });
      }
    }
    
    // 获取订单列表
    this.getOrderList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时刷新订单列表
    this.getOrderList();
  },

  /**
   * 返回上一页
   */
  navigateBack() {
    wx.navigateBack();
  },

  /**
   * 切换标签页
   */
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab !== this.data.currentTab) {
      this.setData({
        currentTab: tab,
        orderList: [],
        noMoreData: false
      });
      this.getOrderList();
    }
  },

  /**
   * 获取订单列表
   */
  getOrderList() {
    // 显示加载中
    this.setData({
      isLoading: true
    });
    
    // 模拟获取订单数据
    // 实际应用中应该从服务器获取
    setTimeout(() => {
      let orderList = [];
      
      // 根据当前标签页生成不同状态的订单
      switch (this.data.currentTab) {
        case 0: // 全部
          orderList = [
            {
              id: '202401010001',
              status: 0,
              statusText: '待付款',
              createTime: '2024-01-01 10:00',
              products: [
                {
                  id: 1,
                  name: '优质猫粮 · 幼猫专用',
                  spec: '2kg/袋',
                  price: 99.00,
                  quantity: 1,
                  image: '/static/images/cat-food.jpg'
                }
              ],
              totalAmount: 99.00,
              actualAmount: 99.00
            },
            {
              id: '202401010002',
              status: 1,
              statusText: '待发货',
              createTime: '2024-01-01 11:00',
              products: [
                {
                  id: 2,
                  name: '猫咪玩具套装',
                  spec: '变色球',
                  price: 158.00,
                  quantity: 1,
                  image: '/static/images/cat-toys.jpg'
                }
              ],
              totalAmount: 158.00,
              actualAmount: 158.00
            }
          ];
          break;
        case 1: // 待付款
          orderList = [
            {
              id: '202401010001',
              status: 0,
              statusText: '待付款',
              createTime: '2024-01-01 10:00',
              products: [
                {
                  id: 1,
                  name: '优质猫粮 · 幼猫专用',
                  spec: '2kg/袋',
                  price: 99.00,
                  quantity: 1,
                  image: '/static/images/cat-food.jpg'
                }
              ],
              totalAmount: 99.00,
              actualAmount: 99.00
            }
          ];
          break;
        case 2: // 待发货
          orderList = [
            {
              id: '202401010002',
              status: 1,
              statusText: '待发货',
              createTime: '2024-01-01 11:00',
              products: [
                {
                  id: 2,
                  name: '猫咪玩具套装',
                  spec: '变色球',
                  price: 158.00,
                  quantity: 1,
                  image: '/static/images/cat-toys.jpg'
                }
              ],
              totalAmount: 158.00,
              actualAmount: 158.00
            }
          ];
          break;
        case 3: // 待收货
          orderList = [
            {
              id: '202401010003',
              status: 2,
              statusText: '待收货',
              createTime: '2024-01-01 12:00',
              products: [
                {
                  id: 3,
                  name: '猫咪洗澡套装',
                  spec: '标准版',
                  price: 128.00,
                  quantity: 1,
                  image: '/static/images/cat-bath.jpg'
                }
              ],
              totalAmount: 128.00,
              actualAmount: 128.00
            }
          ];
          break;
        case 4: // 已完成
          orderList = [
            {
              id: '202401010004',
              status: 3,
              statusText: '已完成',
              createTime: '2024-01-01 13:00',
              products: [
                {
                  id: 4,
                  name: '猫咪营养膏',
                  spec: '120g/支',
                  price: 68.00,
                  quantity: 2,
                  image: '/static/images/cat-nutrition.jpg'
                }
              ],
              totalAmount: 136.00,
              actualAmount: 136.00
            }
          ];
          break;
        case 5: // 已取消
          orderList = [
            {
              id: '202401010005',
              status: 4,
              statusText: '已取消',
              createTime: '2024-01-01 14:00',
              products: [
                {
                  id: 5,
                  name: '猫咪窝',
                  spec: '中号',
                  price: 199.00,
                  quantity: 1,
                  image: '/static/images/cat-house.jpg'
                }
              ],
              totalAmount: 199.00,
              actualAmount: 199.00
            }
          ];
          break;
      }
      
      // 如果有搜索关键词，则过滤订单
      if (this.data.searchValue) {
        const keyword = this.data.searchValue.toLowerCase();
        orderList = orderList.filter(order => {
          // 搜索订单号
          if (order.id.toLowerCase().includes(keyword)) {
            return true;
          }
          
          // 搜索商品名称
          for (const product of order.products) {
            if (product.name.toLowerCase().includes(keyword)) {
              return true;
            }
          }
          
          return false;
        });
      }
      
      this.setData({
        orderList,
        isLoading: false,
        isRefreshing: false,
        noMoreData: true // 模拟数据已全部加载
      });
    }, 500);
  },

  /**
   * 搜索框输入事件
   */
  onSearchInput(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },

  /**
   * 搜索事件
   */
  onSearch() {
    // 重置订单列表
    this.setData({
      orderList: [],
      noMoreData: false
    });
    
    // 重新获取订单列表
    this.getOrderList();
  },

  /**
   * 清空搜索框
   */
  clearSearch() {
    this.setData({
      searchValue: ''
    });
    
    // 重置订单列表
    this.setData({
      orderList: [],
      noMoreData: false
    });
    
    // 重新获取订单列表
    this.getOrderList();
  },

  /**
   * 显示筛选
   */
  showFilter() {
    wx.showToast({
      title: '筛选功能开发中',
      icon: 'none'
    });
  },

  /**
   * 去支付
   */
  goToPay(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '正在前往支付...',
      icon: 'loading',
      duration: 1000,
      success: () => {
        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/payment/payment?id=${id}`
          });
        }, 1000);
      }
    });
  },

  /**
   * 联系卖家
   */
  contactSeller(e) {
    wx.showToast({
      title: '正在连接客服...',
      icon: 'loading',
      duration: 1000,
      success: () => {
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/chat/chat?type=seller'
          });
        }, 1000);
      }
    });
  },

  /**
   * 查看物流
   */
  checkLogistics(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/logistics/logistics?id=${id}`
    });
  },

  /**
   * 再次购买
   */
  buyAgain(e) {
    const id = e.currentTarget.dataset.id;
    const order = this.data.orderList.find(item => item.id === id);
    
    if (order && order.products.length > 0) {
      // 将商品添加到购物车
      wx.showLoading({
        title: '正在添加到购物车'
      });
      
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: '已添加到购物车',
          icon: 'success',
          duration: 1500,
          success: () => {
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/cart/cart'
              });
            }, 1500);
          }
        });
      }, 1000);
    }
  },

  /**
   * 去商城
   */
  goToStore() {
    wx.switchTab({
      url: '/pages/store/store'
    });
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    this.setData({
      isRefreshing: true,
      orderList: [],
      noMoreData: false
    });
    
    // 重新获取订单列表
    this.getOrderList();
  },

  /**
   * 上拉加载更多
   */
  onReachBottom() {
    if (!this.data.noMoreData && !this.data.isLoading) {
      this.loadMoreOrders();
    }
  },

  /**
   * 加载更多订单
   */
  loadMoreOrders() {
    // 显示加载中
    this.setData({
      isLoading: true
    });
    
    // 模拟加载更多数据
    setTimeout(() => {
      this.setData({
        isLoading: false,
        noMoreData: true // 模拟数据已全部加载
      });
    }, 1000);
  }
}) 