import React from "react";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <>
      <Outlet /> {/* This renders the child public pages */}
    </>
  );
}

export default PublicLayout;
