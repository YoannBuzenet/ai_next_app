import React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/Card.module.css";
import { FormattedMessage } from "react-intl";

export default function SimpleCard({
  cardNameId,
  cardNameDefault,
  cardDescriptionId,
  cardDescriptionDefault,
  urlLogo,
}) {
  const bull = <span>•</span>;

  return (
    <Card className={styles.card}>
      <CardContent>
        <img src={urlLogo} />
        <Typography color="textSecondary">
          <FormattedMessage id={cardNameId} defaultMessage={cardNameDefault} />
        </Typography>
        <Typography variant="body2" component="p">
          <FormattedMessage
            id={cardDescriptionId}
            defaultMessage={cardDescriptionDefault}
          />
        </Typography>
      </CardContent>
    </Card>
  );
}
