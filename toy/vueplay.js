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
