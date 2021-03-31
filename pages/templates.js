import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/template.module.css";
import RoundedButton from "../components/Base/RoundedButton";
import TextField from "@material-ui/core/TextField";
import {
  categoriesDefinition,
  listOfCategories,
} from "../definitions/categories";
import Card from "../components/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function template() {
  const [categoryButtonSelected, setCategoryButtonSelected] = useState("");

  return (
    <div className="genericBackground">
      <div className="container80">
        <div className={styles.selectTemplate}>
          <div>
            <span className={styles.title}>
              Select a template to get started
            </span>
          </div>
          <div>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              variant="outlined"
            />
          </div>
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
        <div>
          <div className={styles.globalCardsContainer}>
            <div className={styles.cardsContainer}>
              {listOfCategories.map((category) => (
                <Card
                  cardNameId={category.name.id}
                  cardNameDefault={category.name.defaultMessage}
                />
              ))}
            </div>
            <div className={styles.greyCompletingDiv}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
