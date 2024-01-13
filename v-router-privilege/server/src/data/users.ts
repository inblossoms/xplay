export interface IUser {
  id: number;
  username: string;
  auth: number[];
}

export default <IUser[]>[
  {
    id: 1,
    username: "Zs",
    auth: [1, 2, 5, 6],
  },
  {
    id: 2,
    username: "Ls",
    auth: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 3,
    username: "Ww",
    auth: [1, 2, 3, 4, 5, 6, 7],
  },
];
