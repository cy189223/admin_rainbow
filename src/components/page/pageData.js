export default {
  imageList: {
    type: 'imageList',
    images: [],
    margin: 0,
    style: {
      padding: 0,
      margin_top: 0
    }
  },
  banner: {
    type: 'banner', // 图片广告
    title: '点击下方图片可购买',
    img: 'https://resource.weseeke.com/wx/0/images/other/WzRSkyvh5E5Z0QgcWjknuSwNsgucPOKPyhAxbrBW.png',
    link: {},
    style: {
      padding: 0,
      margin_top: 0
    }
  },
  richtext: {
    type: 'richtext',
    content: '',
    style: {
      padding: 0,
      margin_top: 0
    }
  },
  products: {
    type: 'products',
    cols: 1,
    is_show_price: true,
    list: [],
    style: {
      padding: 0,
      margin_top: 0
    }
  },
  coupons: {
    type: 'coupons', // 优惠券
    ids: [],
    style: {
      padding: 0,
      margin_top: 0
    }
  },
  wVideo: {
    type: 'wVideo', // 视频
    vertical: false,
    img: '',
    url: '',
    style: {
      padding: 0,
      margin_top: 0
    }
  },
  description: {
    type: 'description',
    text: '这是一段描述',
    style: {
      padding: 0,
      margin_top: 0
    }
  }
}
