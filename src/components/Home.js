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

@inject("appStore", "userStore")
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

  editMode = () => {
    this.props.userStore.editModeAction(false);
    this.props.userStore.editModeUserAction(true);
    if (this.props.userStore.id === "") {
      this.props.userStore.getUserAction(this.props.userStore.userList[0].id);
    } else {
      this.props.userStore.getUserAction(this.props.userStore.id);
    }
  };

  addMode = () => {
    this.props.userStore.editModeAction(false);
    this.props.userStore.addModeAction(true);
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
      userStore: { userList, user, send, add },
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
              t={t}
              handleLangPickerClose={this.handleLangPickerClose}
              handleLangPickerClick={this.handleLangPickerClick}
              language={this.state.language}
              openLangPicker={this.state.openLangPicker}
            />
            <Title
              t={t}
              addMode={this.addMode}
              editMode={this.editMode}
              send={this.props.userStore.send}
            />
            {!send || add ? (
              <MainForm
                classes={classes}
                t={t}
                InputLabelPropsStyles={InputLabelPropsStyles}
                InputPropsStyles={InputPropsStyles}
              />
            ) : (
              <User
                users={user}
                addMode={this.addMode}
                editMode={this.editMode}
                t={t}
                userStore={this.props.userStore}
                selectedUser={user[0].id}
              />
            )}
          </div>
          <div className={classes.summary}>
            <Summary
              classes={classes}
              send={send}
              orderType={userList.orderType}
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
    summary: {
      flex: 1,
      margin: "100px 50px",

      "@media (max-width:850px)": {
        margin: "50px 0",
        padding: 30,
      },
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
      color: COLORS.ORANGE,
      marginRight: 10,
      fontSize: 28,
    },

    userName: {
      fontWeight: 600,
      fontSize: 14,
      margin: "2px 0",
    },

    inputLabel: {
      color: `${COLORS.SECONDARY} !important`,
      width: "75%",
      fontSize: 14,
    },
    outlinedInput: {
      color: COLORS.SECONDARY,
    },
    outlinedInputFocused: {
      color: COLORS.SECONDARY,
    },
    notchedOutline: {
      borderWidth: 1,
      borderColor: COLORS.SECONDARY + "!important",
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
  });

export default withStyles(styles)(withTranslation()(Home));
