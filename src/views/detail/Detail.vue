<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info ref="params" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommend" :goods="recommends"/>

      </scroll>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
<!--      <toast :message="message" :show="show"/>-->
    </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from '../../components/common/scroll/Scroll'
  import GoodsList from '../../components/content/goods/GoodsList'
  // import Toast from '../../components/common/toast/Toast'

  import {getDetail, Goods, Shop, GoodsParam,getRecommend} from '../../network/detail'
  import {itemListenerMixin,backTopMixin} from '../../components/common/mixin'
  import { mapActions } from 'vuex'


  export default {
    name: 'Detail',
    components: {
      DetailBottomBar,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      // Toast
    },
    mixins: [itemListenerMixin,backTopMixin],
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        DetailBottomBar,
        detailYs: [],
        currentIndex: 0,
        isShowBackTop: false,
        message: '',
        // show: false
      }
    },
    created () {
      // 1.获取iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        // 1.获取顶部轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // 组件加载完并在DOM上渲染完执行nextTick操作，但是此时图片并没有加载完，即offsetTop拿到的值并不包含全部图片
        // this.$nextTick(() => {
        //   this.detailYs = []
        //
        //   this.detailYs.push(0);
        //   this.detailYs.push(this.$refs.params.$el.offsetTop);
        //   this.detailYs.push(this.$refs.comment.$el.offsetTop);
        //   this.detailYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.detailYs)
        // })
      })
      // 7.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted () {

    },
    updated () {

    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad () {
        this.$refs.scroll.refresh();
        this.detailYs = []

        this.detailYs.push(0);
        this.detailYs.push(this.$refs.params.$el.offsetTop);
        this.detailYs.push(this.$refs.comment.$el.offsetTop);
        this.detailYs.push(this.$refs.recommend.$el.offsetTop);
        this.detailYs.push(Number.MAX_VALUE);
        // console.log(this.detailYs);
      },
      titleClick (index) {
        this.$refs.scroll.scrollTo(0, -this.detailYs[index], 100)
      },
      contentScroll (position) {
        // 1.取上拉y值
        const positionY = -position.y

        // 2.positionY和detailY进行对比
        let length = this.detailYs.length
        for(let i = 0; i < length-1; i++) {
          if (this.currentIndex !== i && (positionY >= this.detailYs[i] && positionY < this.detailYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // 判断BackTop是否显示
        this.demoShowBackTop(position)
      },
      addToCart() {
        // 获取商品信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 将商品加入购物车
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
        //用mapActicons加入购物车
        this.addCart(product).then(res => {
            // this.show = true;
            // this.message = res;
            //
            // setTimeout(() => {
            //   this.show = false;
            //   this.message = ''
            // },900)
          this.$toast.show(res, 900)
        })
      }
    },
    destroyed () {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: white;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
</style>
