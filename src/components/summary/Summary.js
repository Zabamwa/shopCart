import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../../styles/colors";

const useStyles = makeStyles(() =>
  createStyles({
    summaryCard: {
      padding: 20,
      boxShadow:
        "0px 2px 5px 3px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },

      btn: {
          background: COLORS.PRIMARY,
          color: COLORS.WHITE,
          fontWeight: 600,
          width: "100%",
          margin: "20px 0",
          textTransform: "none",
          "&:hover": {
              background: COLORS.ORANGE,
          },
          "&:disabled": {
              backgroundColor: COLORS.PRIMARY,
              opacity:0.4,
              color: COLORS.WHITE,
          },
      },

    cartTitle: {
      fontWeight: 600,
    },

    summaryCart: {
      display: "flex",
      justifyContent: "space-between",
      height: 35,
    },

    summaryValue: {
      fontSize: 20,
      fontWeight: 600,
      marginTop: 10,
    },

    beforeDivider: {
      marginBottom: 20,
    },
  })
);
const Summary = (props) => {
  const { t, send, orderType, orderNextStep } = props;
  const classes = useStyles();
  return (
    <Card className={classes.summaryCard}>
      <Typography className={classes.cartTitle} display="block" variant="h6">
        {t("ORDER.SUMMARY")}
      </Typography>
      <div className={classes.summaryCart}>
        <p>{t("ORDER.PRODUCT_VALUE")}</p>
        <p>35,99 zł</p>
      </div>
      {orderType === "company" && (
        <div className={classes.summaryCart}>
          <p>{t("ORDER.PRODUCT_VAT")}</p>
          <p>-5,99 zł</p>
        </div>
      )}
      <div className={classNames(classes.summaryCart, classes.beforeDivider)}>
        <p>{t("ORDER.DELIVERY_VALUE")}</p>
        <p>00,00 zł</p>
      </div>
      <Divider component="div" className={"divider"} />
      <div className={classes.summaryCart}>
        <p className={classes.summaryValue}>{t("ORDER.ORDER_VALUE")}</p>
        <p className={classes.summaryValue}>30,00 zł</p>
      </div>
      <Button
        onClick={orderNextStep}
        disabled={!send}
        variant="contained"
        color="primary"
        classes={{root: classes.btn}}
      >
        <div>{t("BUTTONS.NEXT")}</div>
      </Button>
    </Card>
  );
};

export default Summary;
