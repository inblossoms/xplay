import { IRoute } from "@/typings";
import { RouteRecordRaw, Router } from "vue-router";

function generateRouter(routeTree: IRoute[]) {
  const routes = routeTree.map((rootRoute) => {
    const _route: RouteRecordRaw = {
      path: rootRoute.path,
      name: rootRoute.name,
      component: () => import("*/@/views/" + rootRoute.name + ".vue"),
      children: [],
    };

    if (rootRoute.children) {
      _route.children = generateRouter(rootRoute.children);
    }

    return _route;
  });

  return routes;
}

export function routerBeforeEach(router: Router, store: any) {
  router.beforeEach(async (to, from, next) => {
    if (!store.hasAuth) {
      await store.setRouteTree();
      const routes = generateRouter(store.routeTree);

      routes.forEach((route) => {
        router.addRoute(route);
      });

      next({ path: to.path });
    } else {
      next();
    }
  });
}
