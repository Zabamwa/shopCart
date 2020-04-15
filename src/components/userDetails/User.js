import React from "react";
import Divider from "@material-ui/core/Divider";
import Company from "./Company";
import Person from "./Person";
import Radio from "@material-ui/core/Radio";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ORDER_TYPE } from "../../constants/orderType";
import Button from "@material-ui/core/Button";
import { COLORS } from "../../styles/colors";

const useStyles = makeStyles(() =>
  createStyles({
    radioUser: {
      padding: "9px 0",
      color: COLORS.ORANGE + "!important",
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

    btnUser: {
      display: "none",
      "@media (max-width:600px)": {
        display: "flex",
        alignItems: "flex-end",
      },
    },
  })
);

const User = (props) => {
  const { users, t, userStore, addMode, editMode } = props;
  const classes = useStyles();
  const [selectedUser, setSelectedValue] = React.useState(users[0].id);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    userStore.setId(event.target.value);
  };
  return (
    <>
      {users.map((user, index) => (
        <div key={user.id}>
          <Radio
            key={user.id}
            className={classes.radioUser}
            classes={{ root: classes.radioUser }}
            checked={Number(selectedUser) === user.id}
            onChange={handleChange}
            value={user.id}
            name="selectUser"
          />

          {user.orderType === ORDER_TYPE.COMPANY ? (
            <Company t={t} user={user} key={index} />
          ) : (
            <Person t={t} user={user} key={index} />
          )}
          <p
            className={classes.userInformation}
          >{`${user.street} ${user.addressNumber}`}</p>
          <p
            className={classes.userInformation}
          >{`${user.postalCode} ${user.city}, ${user.country}`}</p>
          <p className={classes.userInformation}>
            {`${t("ORDER.PHONE")} (${user.phoneNumberPrefix}) ${
              user.phoneNumber
            }`}
          </p>
          <p className={classes.userInvoice}>
            {user.invoice ? t("ORDER.INVOICE_YES") : t("ORDER.INVOICE_NO")}
          </p>
          <div className={classes.btnUser}>
            <Button onClick={addMode}>{t("BUTTONS.NEW_DATA")}</Button>
            <Button onClick={editMode}>{t("BUTTONS.EDIT")}</Button>
          </div>
          <div className={classes.userDivider}>
            <Divider component="div" className={classes.userDetailDivider} />
          </div>
        </div>
      ))}
    </>
  );
};

export default User;
