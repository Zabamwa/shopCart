import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const ChangeLanguage = (props) => {
  const {
    classes,
    t,
    language,
    openLangPicker,
    handleLangPickerClick,
    handleLangPickerClose,
  } = props;
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
        <MenuItem onClick={handleLangPickerClose("pl")}>{t("LANGUAGE.POLISH")}</MenuItem>
        <MenuItem onClick={handleLangPickerClose("en")}>
          {t("LANGUAGE.ENGLISH")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default ChangeLanguage;
