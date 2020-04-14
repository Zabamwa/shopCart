import React from "react";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import Divider from "@material-ui/core/Divider";

const User = (props) => {
  const { user, t, classes } = props;
  return (
    <div>
      {(user.orderType === "company" && (
        <>
          <p className={classes.userType}>
            {t("ORDER.COMPANY")}
            <AssignmentOutlinedIcon className={classes.userTypeIcon} />
          </p>
          <p className={classes.userName}>{user.companyName}</p>
          <p className={classes.userInformation}>{`${t("ORDER.COMPANY_NIP")} ${
            user.companyNip
          }`}</p>
        </>
      )) || (
        <>
          <p className={classes.userType}>
            {t("ORDER.PERSON")}
            <AssignmentOutlinedIcon className={classes.userTypeIcon} />
          </p>
          <p
            className={classes.userName}
          >{`${user.firstName} ${user.lastName}`}</p>
        </>
      )}

      <p
        className={classes.userInformation}
      >{`${user.street} ${user.addressNumber}`}</p>
      <p
        className={classes.userInformation}
      >{`${user.postalCode} ${user.city}, ${user.country}`}</p>
      <p className={classes.userInformation}>{`${t("ORDER.PHONE")} (${
        user.phoneNumberPrefix
      }) ${user.phoneNumber}`}</p>
      <p className={classes.userInvoice}>
        {user.invoice ? t("ORDER.INVOICE_YES") : t("ORDER.INVOICE_NO")}
      </p>
      <div className={classes.userDivider}>
        <Divider component="div" className={classes.userDetailDivider} />
      </div>
    </div>
  );
};

export default User;
