import Head from "next/head";
import Link from "next/link";
import { useSession, getSession } from "next-auth/client";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";
import styles from "../styles/MyAccount.module.css";

export default function MyAccount() {
  const { userContext } = useContext(userContextFile);
  const [session, loading] = useSession();

  return null;
}
