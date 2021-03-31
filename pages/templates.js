import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "../styles/template.module.css";
import RoundedButton from "../components/Base/RoundedButton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function template() {
  const classes = useStyles();
  const [categoryButtonSelected, setCategoryButtonSelected] = useState("");

  return (
    <div className="container">
      <div className={styles.selectTemplate}>
        <div>Select a template to get started</div>
        <div>search + request</div>
      </div>
      <div>
        <RoundedButton
          name="All"
          handleClick={(e) => setCategoryButtonSelected("all")}
          isSelected={categoryButtonSelected === "all"}
        />
        <RoundedButton
          name="Marketing"
          handleClick={(e) => setCategoryButtonSelected("Marketing")}
          isSelected={categoryButtonSelected === "Marketing"}
        />
        <RoundedButton
          name="Facebook Ads"
          handleClick={(e) => setCategoryButtonSelected("FacebookAds")}
          isSelected={categoryButtonSelected === "FacebookAds"}
        />
      </div>
      <div>Category list (object avec logo, title, description)</div>
    </div>
  );
}
