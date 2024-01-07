// data 是一个 function 而不是 object
const data = {
    x: 1,
    y: 2,
  },
  Component = function () {
    return {
      x: "string: 3",
      y: "string: 4",
    };
    return data;
  };

const c1 = new Component(),
  c2 = new Component();

c1.x = "string: 1";
console.log("c1:", c1.x, "c2", c2.x);

// v2、3 中的 vif 和 vfor
// v2 中的 vif 优先级低于 vfor，这将导致每一次都会重新渲染 产生不必要的更新
// v3 中的 vif 优先级高于 vfor，这将导致被 vif 访问的元素值无法被获取

// vue 中的 vdom
// 为什么需要虚拟 dom？
// 虚拟 dom 保证了代码执行速度的下限（而不是上限）。同时为了支持跨平台可用，便有了通过编译虚拟 dom
//     来做到多端可用的能力。
// v2 中数据的每一次的改动都会触发组件数据的全量更新（全量递归 diff，打补丁）
// v3 因为 proxy 更小的颗粒度，使得可以通过 diff 算法来捕捉变动 线性对比（局部递归 diff，打补丁）

// 效率的提升是虚拟 dom 附带的效果，而非 vdom 设计的本质。
// 再者，vue 的底层实现是通过一系列内部功能方法集合组合来实现的，页面的最终展现是通过调用 render 函数来
//      实现的，当数据变更时 render 函数是无法与 dom 进行精确绑定的，所以需要 vdom 来提升效率。

// 什么情况下使用 nextTick()？设思想是什么？
// vue dom 的操作是异步的，这也导致存在依赖关系的 dom ，在被依赖 dom 发生更新便变动时，依赖该 dom 的 dom
// 	  	的视图并没有更新，此时便需要使用 nextTick();
// TIP: 在 vue 生命周期中，如果在 created() 中进行 dom 操作，同样也需要使用 nextTick()，将钩子函数放置在 nextTick() 中执行
// 		因为在 created 阶段，页面 dom 还未渲染，此时没有办法操作 dom。
//		nextTick 方法是在 beforeUpdate 和 updated 这两个生命周期钩子之间被执行的。

// 在它的设计实现上，本质是对 JS eventloop 的一种应用（），
// 		引入更新队列机制的根本原因是：如果是同步更新，则会对一个或多个属性赋值 频繁触发 UI/DOM 渲染（reflow、repaint）。

// Vue 单页面应用与多页面应用的区别
// SinglePage Web Application (SPWA) ，只有一个主页面，只需要加载一次 Js、css 等相关资源。
// 		单页面使得用户在页面切换时不需要重新加载整个页面、前后端分离、等等
//  	但不利于 SEO 优化、首屏加载慢等等

// vue data 中的某个属性发生变更时，视图并不会立即执行渲染 why?
// vue 在更新 dom 时是异步的，在侦听到 dom 的变化后，会把变更的操作放到一个队列中，并缓冲在同一事件循环中发生的所有变更。
//  	v2 中，会使用 watcher 来监听 data 的变更，当 watcher 被多次触发时，会将需要更新的组件加入到队列中，并在下一个事件循环中批量更新这些组件。
// 	 	v3 中，watcher 的概念更换为了 effect（effect：返回值为一个副作用对象，用于收集依赖于该副作用的依赖项。）
// 			在 effect 机制中使用了 proxy 来实现对数据的追踪。

// vue template compiler 编译原理？
// template 是无法被编译的，它的 dom 语法是不能被浏览器解析的（这不符合浏览器的标准），所以在 vue 内部将其
// 		转换为了一个函数，这各函数的转换过程就是：模板编译。编译有三个过程：
// 		parse: 解析模板，构建 ast
//      optimize: 优化 ast，找到其中的静态节点并进行标记，让后续页面重新渲染时进行的 diff 优化可以跳过这些静态节点，优化 runtime 性能。
// 		render: 将 ast 转换为 render 函数

// vue 组件化
// 组件可以分为：页面组件、业务组件、自定义组件、复用性组件
// 高内聚低耦合、组件封装上遵循单项数据流

// v3 新特性
// 1. 模板：在 v2 中，当作用域插槽发生了变更，父组件会重新渲染；在 v3 中，把作用域插槽改为了函数的方式
//     	这样只会影响子组件的重新渲染，提升了渲染性能。
// 2. 更好的 TS 支持，v2 中 template 没有完善的工具列支持且对于 render 来说，需要三方依赖来支持对 Ts 的解析。
// 		相对于 react 的 'all in js‘ 不同，vue 中视图和逻辑是分离的，这便无法很好的支持 Ts。
// 3. 组合式 API
// 4. diff 优化时，静态节点会被跳过。
// 5，多根组件

// 说 v3 中通过 proxy 代替了 v2 中的响应式机制，为什么有用 proxy?
// 不需要使用 vue.set or vue.delete 来触发响应式机制，proxy  本身可以便可以对对象类型的数据进行拦截

// vue 中的钩子函数
// 1. beforeCreate: 实例初始化之前，无法访问 data 和 methods，也可以访问 $el
// 		实例初始化之后，创建完成之前调用，props 被初始化但不可被访问
// 2. created: 实例初始化之后，可访问 data 和 methods，$el 依旧不可用
// 		实例创建完成，props 被注入到实例中 此时 props 可以被访问
// 3. beforeMount:
// 4. mounted
// 5. beforeUpdate
// 6. updated
// 7. beforeDestroy | beforeUnmount
// 8. destroyed | unmounted
// 9. beforeUnmount
// 10. unmounted
// 在页面的第一次加载会触发：beforeCreate、created、beforeMount、mounted
