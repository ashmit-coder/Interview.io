"use client";

import { useSession } from "next-auth/react";
import { BreadcrumbDemo } from "./components/Path";

function USER() {
  const { data } = useSession();
  return (
    <div className=" w-full flex justify-center items-center">
      <BreadcrumbDemo />
    </div>
  );
}

export default USER;
