import {debounce} from './utils'
import BackTop from '../../components/content/backTop/BackTop'

export const itemListenerMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.itemImgListener = () => {
      refresh()
    }
      this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTopClick () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    demoShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 500
    }
  }
}
