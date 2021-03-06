import storage from "../storage";
import formatter from "../formatter";
import logger from "@/components/logger";
import { querySelector } from "@/components/selector";
import { BalanceElementType, RootElementType } from "@/global-types";

const Profile: ProfilePropsType = {
  rootElement: querySelector("#profile-module"),
  name: querySelector("#profile-name"),
  levels: querySelector("#profile-levels"),
  balanceElement: {
    copper: querySelector("#bal-copper-ingot>div"),
    iron: querySelector("#bal-iron-ingot>div"),
    gold: querySelector("#bal-gold-ingot>div"),
  },
  updateBar() {
    logger("Profile", "已更新");
    const savedStorage = storage.get();
    const savedBalances = storage.get().balances;
    const convertFormat = (x: number): string => {
      if (x >= 1e6) {
        return formatter(x, 2);
      } else {
        return x.toLocaleString("en");
      }
    };

    this.levels.innerHTML = `Lv.${savedStorage.levels}`;
    this.name.innerHTML = savedStorage.name;
    this.balanceElement.copper.innerHTML = convertFormat(savedBalances.copper);
    this.balanceElement.iron.innerHTML = convertFormat(savedBalances.iron);
    this.balanceElement.gold.innerHTML = convertFormat(savedBalances.gold);
  },
};

type ProfileMethodsType = {
  updateBar(): void;
};
type ExtendsType = ProfileMethodsType & BalanceElementType & RootElementType;

interface ProfilePropsType extends ExtendsType {
  readonly name: Element;
  readonly levels: Element;
}

export default Profile;
export { ProfilePropsType };
