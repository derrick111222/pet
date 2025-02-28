// pages/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderInfo: null,
    logisticsInfo: null
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
      this.getLogisticsInfo();
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
        actualAmount: 128.00,
        logistics: {
          company: '顺丰速运',
          number: 'SF1234567890',
          phone: '95338'
        },
        address: {
          name: '张三',
          phone: '138****1234',
          address: '北京市朝阳区三里屯SOHO 101室'
        }
      };
      
      this.setData({
        orderInfo
      });
    }, 500);
  },

  /**
   * 获取物流信息
   */
  getLogisticsInfo() {
    // 模拟获取物流信息
    // 实际应用中应该从服务器获取
    setTimeout(() => {
      const logisticsInfo = {
        company: '顺丰速运',
        number: 'SF1234567890',
        status: '运输中',
        traces: [
          {
            time: '2024-01-03 10:00:00',
            content: '快件已被签收，签收人：前台',
            status: 'done'
          },
          {
            time: '2024-01-03 08:30:00',
            content: '快件已到达北京市朝阳区三里屯营业点，快递员正在派送中，请保持电话畅通',
            status: 'done'
          },
          {
            time: '2024-01-03 06:00:00',
            content: '快件已到达北京市朝阳区分拣中心',
            status: 'done'
          },
          {
            time: '2024-01-02 20:00:00',
            content: '快件已从上海市发出，正在运往北京市',
            status: 'done'
          },
          {
            time: '2024-01-02 18:00:00',
            content: '快件已到达上海市分拣中心',
            status: 'done'
          },
          {
            time: '2024-01-02 15:00:00',
            content: '卖家已发货，快件已被揽收',
            status: 'done'
          }
        ]
      };
      
      this.setData({
        logisticsInfo
      });
    }, 500);
  },

  /**
   * 复制物流单号
   */
  copyTrackingNumber() {
    if (this.data.orderInfo && this.data.orderInfo.logistics) {
      wx.setClipboardData({
        data: this.data.orderInfo.logistics.number,
        success: () => {
          wx.showToast({
            title: '物流单号已复制',
            icon: 'success'
          });
        }
      });
    }
  },

  /**
   * 联系快递
   */
  contactLogistics() {
    if (this.data.orderInfo && this.data.orderInfo.logistics) {
      wx.makePhoneCall({
        phoneNumber: this.data.orderInfo.logistics.phone
      });
    }
  },

  /**
   * 确认收货
   */
  confirmReceipt() {
    wx.showModal({
      title: '确认收货',
      content: '确认已收到商品吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中'
          });
          
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '已确认收货',
              icon: 'success',
              duration: 1500,
              success: () => {
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/order/order?status=3'
                  });
                }, 1500);
              }
            });
          }, 1000);
        }
      }
    });
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