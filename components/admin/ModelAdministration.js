import React from "react";
import Link from "next/link";

const ModelAdministration = ({ name, href }) => {
  return (
    <div>
      <Link href={href}>
        <a>{name}</a>
      </Link>
    </div>
  );
};

export default ModelAdministration;
