import React from "react";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    userType: {
      fontWeight: 600,
      fontSize: 16,
      display: "flex",
    },

    userTypeIcon: {
      marginLeft: 5,
    },
  })
);
const Company = (props) => {
  const { user, t } = props;
  const classes = useStyles();
  return (
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
  );
};
export default Company;
