import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import React from "react";

const Summary = (props) => {
  const { classes, pending, t, send, orderType, orderNextStep } = props;
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
        className={send === true ? classes.btn : classes.btnDisabled}
      >
        {pending ? (
          <CircularProgress size={20} thickness={5} color="primary" />
        ) : (
          <div>{t("BUTTONS.NEXT")}</div>
        )}
      </Button>
    </Card>
  );
};

export default Summary;
