// pages/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderInfo: null,
    paymentMethods: [
      { id: 1, name: '微信支付', icon: '/static/icons/wechat-pay.png', selected: true },
      { id: 2, name: '支付宝', icon: '/static/icons/alipay.png', selected: false },
      { id: 3, name: '银行卡', icon: '/static/icons/bank-card.png', selected: false }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.setData({
        orderId: options.id
      });
      this.getOrderInfo();
    }
  },

  /**
   * 获取订单信息
   */
  getOrderInfo() {
    // 模拟获取订单信息
    // 实际应用中应该从服务器获取
    setTimeout(() => {
      const orderInfo = {
        id: this.data.orderId,
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
        actualAmount: 99.00,
        paymentDeadline: '2024-01-01 22:00'
      };
      
      this.setData({
        orderInfo
      });
    }, 500);
  },

  /**
   * 选择支付方式
   */
  selectPaymentMethod(e) {
    const id = e.currentTarget.dataset.id;
    const paymentMethods = this.data.paymentMethods.map(item => {
      return {
        ...item,
        selected: item.id === id
      };
    });
    
    this.setData({
      paymentMethods
    });
  },

  /**
   * 确认支付
   */
  confirmPayment() {
    const selectedMethod = this.data.paymentMethods.find(item => item.selected);
    
    if (!selectedMethod) {
      wx.showToast({
        title: '请选择支付方式',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '处理中'
    });
    
    // 模拟支付过程
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 1500,
        success: () => {
          setTimeout(() => {
            wx.redirectTo({
              url: `/pages/order/order?status=1`
            });
          }, 1500);
        }
      });
    }, 1500);
  },

  /**
   * 返回订单页
   */
  navigateBack() {
    wx.navigateBack();
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})