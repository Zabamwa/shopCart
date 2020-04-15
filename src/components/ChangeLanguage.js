import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../styles/colors";

const useStyles = makeStyles(() =>
  createStyles({
    topBarButton: {
      color: COLORS.SECONDARY,
      fontSize: 16,
      fontWeight: "bold",
      textTransform: "capitalize",
      background: "rgba(0,0,0,0.1)",
    },

    topBarButtonWrap: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    languageBox: {
      borderRadius: "100%",
      backgroundColor: COLORS.PRIMARY,
      color: COLORS.WHITE,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 5,
      marginRight: 5,
      padding: 7,
      width: 15,
      height: 15,
      fontSize: 13,
    },
  })
);
const ChangeLanguage = (props) => {
  const {
    t,
    language,
    openLangPicker,
    handleLangPickerClick,
    handleLangPickerClose,
  } = props;
  const classes = useStyles();
  return (
    <>
      <Button
        aria-owns={openLangPicker ? "menu" : undefined}
        aria-haspopup="true"
        onClick={handleLangPickerClick}
        className={classes.topBarButton}
      >
        <div className={classes.topBarButtonWrap}>
          {t("BUTTONS.LANGUAGE")}
          <div className={classes.languageBox}>
            {language && language.toUpperCase()}
          </div>
        </div>
      </Button>
      <Menu
        id="menu"
        anchorEl={openLangPicker}
        open={Boolean(openLangPicker)}
        onClose={handleLangPickerClose(null)}
      >
        <MenuItem onClick={handleLangPickerClose("pl")}>
          {t("LANGUAGE.POLISH")}
        </MenuItem>
        <MenuItem onClick={handleLangPickerClose("en")}>
          {t("LANGUAGE.ENGLISH")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default ChangeLanguage;
