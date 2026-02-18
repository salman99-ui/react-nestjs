import Main from "../pages/todos/presentation/main";
import Detail from "../pages/todos/presentation/detail";

const todoRoutes = {
  path: "/",
  hidden: false,
  exact: true,
  component: Main,
};

const todoDetailRoutes = {
  path: "/detail/:id",
  hidden: false,
  exact: true,
  component: Detail,
};

export const allRoutes = [todoDetailRoutes, todoRoutes];
