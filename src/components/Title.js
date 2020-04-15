import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {COLORS} from "../styles/colors";

const useStyles = makeStyles(() =>
  createStyles({
    subtitleContainer: {
      display: "flex",
      justifyContent: "space-between",
    },

    subtitleBtnContainer: {
      display: "flex",
      alignItems: "flex-end",
      "@media (max-width:600px)": {
        display: "none",
      },
    },

    subtitleInfo: {
      marginLeft: 10,
        color:COLORS.GREY
    },

    subtitle: {
      marginTop: 10,
    },
  })
);
const Title = (props) => {
  const { t, editMode, addMode, send } = props;
  const classes = useStyles();
  return (
    <>
      <div className={"titleContainer"}>
        <Typography display="block" variant="h5">
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
