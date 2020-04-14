import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { createStyles, withStyles } from "@material-ui/core";
import { COLORS } from "../styles/colors";
import { withTranslation } from "react-i18next";
import MainForm from "./form/MainForm";
import Summary from "./summary/Summary";
import User from "./userDetails/User";
import i18n from "../config/i18n";
import ChangeLanguage from "./ChangeLanguage";
import Title from "./Title";

@inject("appStore", "orderStore")
@observer
class Home extends Component {
  state = {
    language: "",
    openLangPicker: null,
  };

  componentDidMount() {
    this.props.appStore.getInitialLocaleAction();
    this.setState({ language: this.props.appStore.locale });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  editMode = () => {
    this.props.orderStore.editModeAction(false);
  };

  addMode = () => {
    this.props.orderStore.editModeAction(false);
    this.props.orderStore.addModeAction(true);
  };

  orderNextStep = () => {
    alert(i18n.t("ALERT"));
  };

  handleLangPickerClick = (event) => {
    this.setState({ openLangPicker: event.currentTarget });
  };

  handleLangPickerClose = (lang) => () => {
    if (lang) {
      this.props.appStore.setLocaleAction(lang);
      window.location.reload();
    } else {
      this.setState({ openLangPicker: null });
    }
  };

  render() {
    const {
      classes,
      t,
      orderStore: { user, send, add },
    } = this.props;

    const InputLabelPropsStyles = {
      classes: {
        root: classes.inputLabel,
      },
    };
    const InputPropsStyles = {
      classes: {
        root: classes.outlinedInput,
        focused: classes.outlinedInputFocused,
        notchedOutline: classes.notchedOutline,
      },
    };

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.orderData}>
            <ChangeLanguage
              classes={classes}
              t={t}
              handleLangPickerClose={this.handleLangPickerClose}
              handleLangPickerClick={this.handleLangPickerClick}
              language={this.state.language}
              openLangPicker={this.state.openLangPicker}
            />
            <Title
              classes={classes}
              t={t}
              addMode={this.addMode}
              editMode={this.editMode}
              send={this.props.orderStore.send}
            />
            {((!send || add) && (
              <MainForm
                classes={classes}
                t={t}
                InputLabelPropsStyles={InputLabelPropsStyles}
                InputPropsStyles={InputPropsStyles}
              />
            )) || <User user={user} t={t} classes={classes} />}
          </div>
          <div className={classes.summary}>
            <Summary
              classes={classes}
              send={send}
              orderType={user.orderType}
              t={t}
              orderNextStep={this.orderNextStep}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = (theme) =>
  createStyles({
    container: {
      display: "flex",
      maxWidth: 1400,
      width: "100%",
      margin: "auto",
    },

    topBarButton: {
      color: COLORS.BLACK,
      fontSize: 16,
      fontWeight: "bold",
      textTransform: "capitalize",
        background:'rgba(0,0,0,0.1)'
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

    subtitleContainer: {
      display: "flex",
      justifyContent: "space-between",
    },

    subtitleBtnContainer: {
      display: "flex",
      alignItems: "flex-end",
    },

    textField: {
      width: "100%",
      maxWidth: 380,
      marginTop: 12,
      borderRadius: 4,
    },

    customSelect: {
      height: 56,
    },

    formContainer: {
      display: "flex",
      justifyContent: "space-between",

      "@media (max-width:850px)": {
        flexDirection: "column",
      },
    },

    subtitle: {
      marginTop: 10,
    },

    radioRow: {
      marginTop: 10,
      display: "block",
    },

    orderForm: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      "@media (max-width:850px)": {
        order: 2,
      },

      "@media (max-width:600px)": {
        order: 2,
        alignItems: "center",
      },
    },

    saveData: {
      maxWidth: 380,
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
    },

    btnSave: {
      background: COLORS.PRIMARY,
      color: COLORS.WHITE,
      fontWeight: 600,
      width: "70%",
      textTransform: "none",
      "&:hover": {
        background: COLORS.SECONDARY,
      },
    },

    vatInfo: {
      flex: 1,
      padding: "0 20px",

      "@media (max-width:850px)": {
        padding: 0,
        order: 1,
      },
    },

    textInfo: {
      fontSize: 12,
      textAlign: "justify",
    },

    infoIcon: {
      color: COLORS.SECONDARY,
      marginRight: 10,
      fontSize: 28,
    },

    subtitleInfo: {
      marginLeft: 10,
    },

    summary: {
      flex: 1,
      margin: '100px 50px',

      "@media (max-width:850px)": {
        margin: "50px 0",
        padding: 30,
      },
    },

    summaryCard: {
      padding: 20,
        boxShadow: '0px 2px 5px 3px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
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

    btn: {
      background: COLORS.PRIMARY,
      color: COLORS.WHITE,
      fontWeight: 600,
      width: "100%",
      margin: '20px 0',
      textTransform: "none",
      "&:hover": {
        background: COLORS.SECONDARY,
      },
    },

    btnDisabled: {
      color: COLORS.WHITE + "!important",
      fontWeight: 600,
      width: "100%",
      margin: '20px 0',
      textTransform: "none",
      backgroundColor: COLORS.PRIMARY + "!important",
      opacity: "0.4",
    },

    userType: {
      fontWeight: 600,
      fontSize: 16,
      display: "flex",
    },

    userTypeIcon: {
      marginLeft: 5,
    },

    userName: {
      fontWeight: 600,
      fontSize: 14,
      margin: "2px 0",
    },

    userInformation: {
      margin: "2px 0",
    },

    userInvoice: {
      marginTop: 10,
    },

    userDivider: {
      display: "flex",
      justifyContent: "flex-end",
    },

    userDetailDivider: {
      marginTop: 75,
      width: "70%",
    },

    inputLabel: {
      color: `${COLORS.BLACK} !important`,
    },
    outlinedInput: {
      color: COLORS.BLACK,
    },
    outlinedInputFocused: {
      color: COLORS.BLACK,
    },

    select: {
      width: "100%",
      maxWidth: 380,
      height: 56,
      marginTop: 10,
      borderRadius: 5,
      borderColor: COLORS.WHITE,
      background: "rgba(255, 255, 255, 0.12)",
    },
    notchedOutline: {
      borderWidth: 1,
      borderColor: COLORS.BLACK + "!important",
    },

    formControl: {
      background: "rgba(255, 255, 255, 0.12)",
    },

    content: {
      width: "100%",
      padding: 20,
      display: "flex",
      justifyContent: "center",

      "@media (max-width:600px)": {
        width: "100%",
        justifyContent: "space-around",
        flexDirection: "column",
      },
    },

    orderData: {
      flex: 2,
      "@media (max-width:850px)": {
        flex: 1,
      },
    },

    cardContainer: {
      background: "transparent",
      display: "flex",
      flexDirection: "column",
      width: "80%",
      margin: "0 auto",
      boxShadow: "none",
      overflow: "visible",
    },

    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    cardAction: {
      justifyContent: "center",
    },
  });

export default withStyles(styles)(withTranslation()(Home));
