import { IRoute } from "@/typings";

export function formatRouteTree(data: IRoute[]) {
  const rootRoutes = data.filter((routeInfo) => routeInfo.pid === 0),
    routeList = data.filter((routeInfo) => routeInfo.pid !== 0);

  rootRouteToTree(rootRoutes, routeList);
  return rootRoutes;
}
function rootRouteToTree(rootRoutes: IRoute[], routeList: IRoute[]) {
  rootRoutes.map((rootRoute: IRoute) => {
    routeList.map((route, idx) => {
      if (rootRoute.id === route.pid) {
        const _routeList: IRoute[] = JSON.parse(JSON.stringify(routeList));
        _routeList.splice(idx, 1);
        rootRouteToTree([route], _routeList);

        if (rootRoute.children) {
          rootRoute.children.push(route);
        } else {
          rootRoute.children = [route];
        }
      }
    });
  });
}
