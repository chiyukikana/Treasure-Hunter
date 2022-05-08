import anime from "animejs";
import scene from "./scene";
import convert from "../utils/convert";
import logger from "../components/logger";
import stages from "./stages";

const ticks = {
  rootElement: document.querySelector("#ticks-module")!,
  animeInstance: <anime.AnimeInstance>{},
  timeRecorder: 0,
  start() {
    let time = stages.opts.time;

    logger("Ticks", "计时开始");
    this.animeInstance = anime({
      loop: true,
      duration: 1000,
      loopBegin: () => {
        if (time <= 0) {
          this.rootElement.innerHTML = "时间到！";
          // 停止计时
          this.stop();
          // 清理Chunk模块，移除实体/关闭监听器。
          scene.chunk.clear();
          anime({
            duration: 1000,
            complete: () => {
              // 隐藏Chunk模块
              scene.chunk.hide();
              // 加载Ending模块
              scene.ending.show();
              // 清空tick节点遗留下的内容
              this.rootElement.innerHTML = "";
            },
          });
        } else {
          this.rootElement.innerHTML = convert(() => {
            this.timeRecorder++;
            return time--;
          });
        }
      },
    });
  },
  stop() {
    this.animeInstance.restart();
    this.animeInstance.pause();
    logger("Ticks", "计时停止");
  },
  reset() {
    this.timeRecorder = 0;
    logger("Ticks", "已重置计时");
  },
};

export default ticks;
