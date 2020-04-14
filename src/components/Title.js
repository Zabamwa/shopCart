import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const Title = (props) => {
  const { classes, t, editMode, addMode, send } = props;
  return (
    <>
      <div className={"titleContainer"}>
        <Typography className={classes.title} display="block" variant="h5">
          {t("TITLE")}
        </Typography>
      </div>
      <div className={classes.subtitleContainer}>
        <Typography className={classes.subtitle} display="block" variant="h6">
          {t("ORDER.DATA")}
          <HelpOutlineIcon className={classes.subtitleInfo} />
        </Typography>
        {send && (
          <div className={classes.subtitleBtnContainer}>
            <Button onClick={addMode}>{t("BUTTONS.NEW_DATA")}</Button>
            <Button onClick={editMode}>{t("BUTTONS.EDIT")}</Button>
          </div>
        )}
      </div>
      <Divider component="div" className={"divider"} />
    </>
  );
};

export default Title;
