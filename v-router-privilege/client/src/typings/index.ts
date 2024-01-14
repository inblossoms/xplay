export interface IRoute {
  id: number;
  pid: number;
  path: string;
  name: string;
  title: string;
  link?: string;
  children?: IRoute[];
}

export interface IUID {
  uid: number;
}

export interface IState {
  uid: number;
  hasAuth: boolean;
  routeTree: IRoute[];
}
