import CalenderView from "@/components/calender/CalenderView";
import ClientView from "@/components/client/ClientView";
import DashboardView from "@/components/dashboard/DashboardView";

import React from "react";

export default function View({ params }) {
  const view = params.view;
  console.log(view);

  let renderView;

  if (view == "dashboard") {
    renderView = <DashboardView />;
  } else if (view == "calender") {
    renderView = <CalenderView />;
  } else if (view == "client") {
    renderView = <ClientView />;
  }

  return <>{renderView}</>;
}
