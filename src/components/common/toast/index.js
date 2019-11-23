import Toast from './Toast'
const objToast = {}

objToast.install = function (Vue) {
  // document.body.appendChild(Toast.$el)
  // Vue.prototype.$toast = Toast;
  //1.创建组件构造器
  const tostContructor = Vue.extend(Toast)

  //2.用new的方式，根据组件构造器，创建一个组件对象
  const newToast = new tostContructor()

  //3.将组件对象手动挂载到div元素上
  newToast.$mount(document.createElement('div'))

  //4.newToast.$el对应的就是div
  document.body.appendChild(newToast.$el)
  Vue.prototype.$toast = newToast;
}

export default objToast
