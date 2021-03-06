import anime from "animejs";
import { Home } from "../scenes";
import { Collection, Detail, Difficult, History, Store } from "../features";
import storage from "../storage";
import logger from "@/components/logger";
import { querySelector } from "@/components/selector";
import { RootElementType } from "@/global-types";

const Auth: AuthPropsType = {
  rootElement: querySelector("#auth-module"),
  confirmElement: querySelector("#auth-confirm"),
  tipElement: querySelector("#auth-tip"),
  inputElement: <HTMLInputElement>querySelector("#auth-input"),
  isLoginElement: querySelector("#is-login"),
  joinMessageElement: querySelector("#welcome-bar"),
  load() {
    // 命名处理程序
    const loginHandler = () => {
      if (
        this.inputElement.value === "" ||
        this.inputElement.value.trim() === ""
      ) {
        this.tipElement.innerHTML = "名称不能为空！";
      } else if (this.inputElement.value.length > 15) {
        this.tipElement.innerHTML = "名称的长度不能超过10个字符！";
      } else {
        storage.save((data) => (data.name = this.inputElement.value.trim()));
        // 隐藏玩家命名功能
        this.isLoginElement.classList.add("hidden");
        // 验证通过
        this.success();
      }
    };

    anime({
      targets: this.rootElement,
      duration: 1000,
      translateY: [-600, 0],
      begin: () => {
        // 显示命名模块
        this.isLoginElement.classList.remove("hidden");
      },
    });
    this.confirmElement.addEventListener("click", loginHandler);
    this.inputElement.addEventListener("keydown", (ev) => {
      this.tipElement.innerHTML = "";
      // 按下回车键快速确认
      ev.code === "Enter" && loginHandler();
    });
  },
  success() {
    const { clientHeight } = document.documentElement;
    const label = this.joinMessageElement.children[0];
    const timeline = anime.timeline({
      targets: this.rootElement,
    });

    // 修改标题栏
    document.title += ` (${storage.get().name})`;
    // 修改欢迎消息
    label.innerHTML = `欢迎回来，${storage.get().name}！`;
    // 为欢迎消息添加动画
    timeline.add({
      duration: 1000,
      translateY: [clientHeight, 0],
      begin: () => {
        // 显示欢迎消息
        this.joinMessageElement.classList.remove("hidden");
      },
    });
    timeline.add({
      opacity: 0,
      duration: 500,
      easing: "easeInOutQuad",
      complete: () => {
        // 删除Auth模块
        this.rootElement.remove();
        // 初始化Collection模块
        Collection.init();
        // 初始化History模块
        History.init();
        // 初始化Store模块
        Store.init();
        // 初始化Difficult模块
        Difficult.init();
        // 初始化Detail模块
        Detail.init();
        // 显示Home模块
        Home.show();
      },
    });
  },
  init() {
    const hasName = storage.get().name;

    // 显示Auth模块
    this.rootElement.classList.remove("hidden");
    if (hasName) {
      logger("Auth", "验证通过");
      this.success();
    } else {
      logger("Auth", "载入模块");
      this.load();
    }
  },
};

type AuthMethodsType = {
  load(): void;
  success(): void;
  init(): void;
};
type ExtendsType = AuthMethodsType & RootElementType;

interface AuthPropsType extends ExtendsType {
  readonly confirmElement: Element;
  readonly tipElement: Element;
  readonly inputElement: HTMLInputElement;
  readonly isLoginElement: Element;
  readonly joinMessageElement: Element;
}

export default Auth;
export { AuthPropsType };
