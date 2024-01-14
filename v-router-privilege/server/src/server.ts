import express, { Application, Request, Response } from "express";
import { users, IUser, routes, IRoute } from "./data";

const app: Application = express(),
  PORT = 3301;

app.use(express.urlencoded({ extended: true })).use(express.json());

interface IBody {
  uid: number;
}
app.post("/user_router_list", (request: Request, response: Response) => {
  const { uid }: IBody = request.body;

  if (uid) {
    const userInfo: IUser | undefined = users.find((user) => user.id == uid);

    if (userInfo) {
      const { auth } = userInfo;
      const authRouteList: IRoute[] = [];

      auth.map((ait) => {
        routes.map((route: IRoute) => {
          if (ait === route.id) {
            authRouteList.push(route);
          }
        });
      });

      response.status(200).send({
        code: "success",
        data: authRouteList,
      });
    } else {
      response.status(200).send({
        code: "wraning",
        massage: "The User is not found.",
        data: null,
      });
    }
  } else {
    response.status(401).send({
      code: "fail",
      message:
        "The request is not allowed. Please check current user identity or authority.",
      data: null,
    });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});
