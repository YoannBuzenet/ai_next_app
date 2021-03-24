import { useSession, getSession } from "next-auth/client";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";

export default function MyAccount() {
  const { userContext } = useContext(userContextFile);
  const [session, loading] = useSession();
}
