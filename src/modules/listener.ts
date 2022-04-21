import anime from "animejs";
import localstorage from "../utils/localstorage";
import entities, { Entity } from "./entities";

const downHandler = (ev: KeyboardEvent) => {
  document.onkeydown = null;
  import.meta.env.DEV && console.log(ev);
  const children = <Entity[]>(
    Array.prototype.slice.call(entities.modal.children)
  );

  children.forEach((el) => {
    const { activeKey } = el;

    if (ev.key.toLowerCase() === activeKey.toLowerCase()) {
      // 停止路线动画
      el.tracker.pause();
      // 执行消失动画
      anime({
        targets: el,
        duration: 250,
        scale: 0,
        easing: "easeInOutQuad",
        begin() {
          localstorage.save((data) => {
            data.historyBreak += 1;
          });
        },
        complete() {
          el.remove();
        },
      });
    }
  });
};
const listener = {
  enable() {
    import.meta.env.DEV && console.log("开启键盘监听器");
    document.onkeydown = downHandler;
    document.onkeyup = () => (document.onkeydown = downHandler);
  },
  disable() {
    import.meta.env.DEV && console.log("关闭键盘监听器");
    document.onkeydown = document.onkeyup = null;
  },
};

export default listener;
