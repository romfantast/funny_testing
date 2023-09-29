import { Suspense } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default Layout;
