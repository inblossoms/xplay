export interface IRoute {
  id: number;
  pid: number;
  path: string;
  name: string;
  title: string;
  link?: string;
}

export default <IRoute[]>[
  {
    id: 1,
    pid: 0,
    path: "/course",
    name: "Course",
    title: "课程管理",
  },
  {
    id: 2,
    pid: 1,
    path: "operate",
    name: "CourseOperate",
    title: "课程操作",
    link: "/course/operate",
  },
  {
    id: 3,
    pid: 2,
    path: "info_data",
    link: "/course/operate/info_data",
    name: "CourseInfoData",
    title: "课程数据",
  },
  {
    id: 4,
    pid: 1,
    path: "add",
    link: "/course/add",
    name: "CourseAdd",
    title: "增加课程",
  },
  {
    id: 5,
    pid: 0,
    path: "/student",
    name: "Student",
    title: "学生管理",
  },
  {
    id: 6,
    pid: 5,
    path: "add",
    link: "/student/add",
    name: "StudentAdd",
    title: "增加学生",
  },
  {
    id: 7,
    pid: 5,
    path: "operate",
    link: "/student/operate",
    name: "StudentOperate",
    title: "学生操作",
  },
];
