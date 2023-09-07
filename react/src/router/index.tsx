import { createBrowserRouter, Outlet } from "react-router-dom";

import IgntHeader from "../components/IgntHeader";
import DataView from "../views/DataView";
import PortfolioView from "../views/PortfolioView";
import FeeTransferView from "../views/FeeTransferView";

const items = [
  {
    label: "Portfolio",
    to: "/",
  },
  {
    label: "Data",
    to: "/data",
  },
  {
    label: "Fee IBC Transfer",
    to: "/feetransfer",
  },
];
const Layout = () => {
  return (
    <>
      <IgntHeader navItems={items} />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <PortfolioView /> },
      { path: "/data", element: <DataView /> },
      { path: "/feetransfer", element: <FeeTransferView /> },
    ],
  },
]);

export default router;
