import { formatRouteTree } from "@/libs";
import { getUserRouteList } from "@/services";
import { IRoute, IState } from "@/typings";
import { defineStore } from "pinia";

export const useStore = defineStore("U", {
  state: (): IState => {
    return {
      uid: 3,
      hasAuth: false,
      routeTree: <IRoute[]>[],
    };
  },
  actions: {
    async setRouteTree() {
      const routeList = await getUserRouteList("/api/user_router_list", {
        uid: this.uid,
      });
      const routeTree = formatRouteTree(routeList);
      this.routeTree = routeTree;

      if (routeList.length) {
        this.hasAuth = true;
      }
    },
  },
});
