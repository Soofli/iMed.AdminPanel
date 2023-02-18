import MembersContent from "@comp/dashboard/MembersContent";
import SideBarDashboard from "@comp/dashboard/SideBarDashboard";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Members = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("token");
      if (!!!item) {
        // router.push('/dashboard')
        router.push("/");
      }
    }
  }, []);
  return (
    <div className="container-fluid">
      <Head>
        <title>کاربران</title>
        <meta name="description" content="کاربران" />
      </Head>
      <div className="row rtl ">
        <SideBarDashboard />
        <MembersContent />
      </div>
    </div>
  );
};

export default Members;
