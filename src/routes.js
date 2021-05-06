/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import DashboardGeral from "views/DashboardGeral.js";
import DashboardRealTime from "views/DashboardRealTime.js";



var routes = [
  {
    path: "/dashboard_realtime",
    name: "Dashboard Real Time",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: DashboardRealTime,
    layout: "/admin"
  },
  {
    path: "/corrida1",
    name: "Corrida1",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: DashboardGeral,
    layout: "/admin"
  }
  
];
export default routes;
