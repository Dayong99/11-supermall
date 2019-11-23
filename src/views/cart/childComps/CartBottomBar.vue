<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button
          :is-checked="isSelectAll" class="check-width"
          @click.native="checkClick"/>
        <span>全选</span>
      </div>

      <div class="price">
        合计: {{totalPrice}}
      </div>

      <div class="calculate" @click="calcClick">
        去结算({{checkLength}})
      </div>
    </div>
</template>

<script>
  import CheckButton from '../../../components/content/checkButton/CheckButton'
  import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if(this.cartList.length === 0) return false
        return !(this.cartList.filter(item => !item.checked).length)
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {  //cartList全部选中时，点击全选按钮check-button时cartList变成全部取消
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll) {
          this.$toast.show('请选择购买商品', 900)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;

    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 15px;
    width: 75px;
  }

  .check-width {
    width: 21px;
    height: 21px;
    line-height: 20px;
    margin-right: 12px;
  }

  .price {
    margin-left: 25px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: #ff5777;
    color: #ffffff;
    text-align: center;
  }
</style>
