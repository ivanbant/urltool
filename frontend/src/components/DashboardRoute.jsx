import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashboardRoute = () => {
  return (
    <div className="flex min-h-[50vh]">
      <div className="w-1/5 bg-gray-800">
        <div className="flex flex-col justify-start items-start h-full p-10 pl-16">
          <div className="flex flex-col space-y-4 mt-4">
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                "text-white text-lg cursor-pointer w-fit " +
                (isActive
                  ? "border-b-2 border-white"
                  : "hover:border-b-2 hover:border-white")
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/subscription"
              className={({ isActive }) =>
                "text-white text-lg cursor-pointer w-fit " +
                (isActive
                  ? "border-b-2 border-white"
                  : "hover:border-b-2 hover:border-white")
              }
            >
              Subscription
            </NavLink>
            <NavLink
              to="/dashboard/analytics"
              className={({ isActive }) =>
                "text-white text-lg cursor-pointer w-fit " +
                (isActive
                  ? "border-b-2 border-white"
                  : "hover:border-b-2 hover:border-white")
              }
            >
              Analytics
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardRoute;
