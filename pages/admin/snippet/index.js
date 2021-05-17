import React from "react";
import Breadcrumb from "../../../components/admin/Breadcrumb";
import styles from "../../../styles/admin/snippet.module.css";
import { pathlvl2Snippet } from "../../../definitions/breadcrumb";
import { useSession, getSession } from "next-auth/client";
import UserCheck from "../../../services/userCheck";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("session from server", session);
  const hasAccess = UserCheck.hasAdminAccess(session?.user?.rightsCentralAPI);

  if (!hasAccess) {
    console.log("user doesnt have access");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  } else {
    return { props: { session } };
  }
}

const Snippet = () => {
  return (
    <div className="container">
      <main className={styles.main}>
        <Breadcrumb listOfPath={pathlvl2Snippet} />
        Snippet
      </main>
    </div>
  );
};

export default Snippet;
