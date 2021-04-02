import React, { useContext } from "react";
import { useRouter } from "next/router";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/Card.module.css";
import { FormattedMessage } from "react-intl";
import SelectedCategoryId from "../contexts/selectedCategoryContext";

export default function SimpleCard({
  cardNameId,
  cardNameDefault,
  cardDescriptionId,
  cardDescriptionDefault,
  urlLogo,
  categoryID,
}) {
  const router = useRouter();

  const { selectedCategoryID, setSelectedCategoryID } = useContext(
    SelectedCategoryId
  );

  const handleClick = (e, categoryID) => {
    console.log("go to category :", categoryID);
    setSelectedCategoryID(categoryID);
    router.push("/templates/text");
  };

  return (
    <Card className={styles.card} onClick={(e) => handleClick(e, categoryID)}>
      <CardContent>
        <div className={styles.logoBackground}>
          <img src={urlLogo} className={styles.pictures} />
        </div>

        <Typography className={styles.cardTitle}>
          <FormattedMessage id={cardNameId} defaultMessage={cardNameDefault} />
        </Typography>
        <Typography className={styles.cardDescription}>
          <FormattedMessage
            id={cardDescriptionId}
            defaultMessage={cardDescriptionDefault}
          />
        </Typography>
      </CardContent>
    </Card>
  );
}
