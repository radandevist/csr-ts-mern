import Home from "./pages/Home/Home";
import NameForm from "./pages/NameForm/NameForm";

interface ClientRoute {
  name: string;
  path: string;
  component: React.ComponentType<any>;
}

const clientRoutes: Array<ClientRoute> = [
  { name: "home", path: "/", component: Home },
  { name: "nameForm", path: "/form", component: NameForm },
];

export default clientRoutes;
