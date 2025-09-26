// src/dashboardRoutes.js
import Dashboard from "./pages/DashboardHome";
import Tables from "./layouts/tables";
import Billing from "./layouts/billing";
import RTL from "./layouts/rtl";
import Messages from "./layouts/notifications";
import Profile from "./layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";

const dashboardRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/dashboard/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/dashboard/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/dashboard/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Messages",
    key: "Messages",
    icon: <Icon fontSize="small">Messages</Icon>,
    route: "/dashboard/messages",
    component: <Messages />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/dashboard/profile",
    component: <Profile />,
  },
];

export default dashboardRoutes;
