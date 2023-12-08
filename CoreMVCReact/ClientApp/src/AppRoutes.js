import { Home } from "./components/Home";
import { Categories } from "./components/Categories";
import { Contacts } from "./components/Contacts";
import { AddContact } from "./components/AddContact";
import { Phones } from "./components/Phones";
import { AddPhone } from "./components/AddPhone";
import { AddCategory } from "./components/AddCategory";
import { EditPhone } from "./components/EditPhone";

const AppRoutes = [
  {
    index: true,
      element: <Contacts />
  },
  {
      path: '/addContact',
      element: <AddContact />
  },
  {
      path: '/addCategory',
      element: <AddCategory />
  },
  {
      path: '/categories',
      element: <Categories />
  },
  {
      path: '/phones',
      element: <Phones />
  },
  {
    path: '/addPhone',
    element: <AddPhone />
  },
  {
      path: '/editPhone',
      element: <EditPhone />
  }
];

export default AppRoutes;
