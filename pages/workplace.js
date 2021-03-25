import Head from "next/head";
import Link from "next/link";
import { useSession, getSession } from "next-auth/client";
import { useContext } from "react";
import userContextFile from "../contexts/userContext";
import styles from "../styles/Workplace.module.css";

export default function Workplace() {
  // Checker si logé, sinon redirect

  const { userContext } = useContext(userContextFile);
  const [session, loading] = useSession();

  const sendDataToBackEnd = () => {
    console.log("pinging the back end...");
  };

  return <>Workplace</>;
}
