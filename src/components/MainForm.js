import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import { RadioGroup, TextField } from "formik-material-ui";
import {FormControlLabel, withStyles} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import { Field, Form, Formik } from "formik";
import { countryList } from "../constants/countryList";
import MenuItem from "@material-ui/core/MenuItem";
import { TwoFormsFields } from "./TwoFormsFields";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import { inject, observer } from "mobx-react";
import * as Yup from "yup";
import {
  StringValidator,
  NumberValidator,
  NIPValidator,
} from "../utils/validators";
import orderStore from "../stores/orderStore";
import {withTranslation} from "react-i18next";

class OrderForm {
  constructor(user) {
    if (user) {
      this.firstName = user.firstName || "";
      this.lastName = user.lastName || "";
      this.companyName = user.companyName || "";
      this.companyNip = user.companyNip || "";
      this.country = user.country || "";
      this.street = user.street || "";
      this.number = user.number || "";
      this.postalCode = user.postalCode || "";
      this.invoice = user.invoice || "";
      this.orderType = user.orderType || "person";
      this.addressNumber = user.addressNumber || "";
      this.city = user.city || "";
      this.phoneNumberPrefix = user.phoneNumberPrefix || "";
      this.phoneNumber = user.phoneNumber || "";
    }
  }

  firstName = "";
  lastName = "";
  companyName = "";
  companyNip = "";
  country = "";
  street = "";
  addressNumber = "";
  postalCode = "";
  city = "";
  phoneNumberPrefix = "";
  phoneNumber = "";
  orderType = "";
  invoice = "";
}

@inject("appStore", "orderStore")
@observer
class MainForm extends Component {
  state = {
    orderType: "person",
    invoice: false,
    user: "",
  };

  componentDidMount() {
    if (this.props.orderStore.add) {
      this.resetUser();
    }
  }

  resetUser = () => {
    this.props.orderStore.resetUser();
  };

  addUser = (values) => {
    setTimeout(() => {
      this.props.orderStore.addUserAction(values);
    }, 1000);
  };

  handleRadioChange = (event, setFieldValue) => {
    this.setState({ orderType: event.target.value }, () =>
      setFieldValue("orderType", this.state.orderType)
    );
    if (event.target.value === "person") {
      setFieldValue("companyName", "");
      setFieldValue("companyNip", "");
    } else {
      setFieldValue("firstName", "");
      setFieldValue("lastName", "");
    }
  };

  handleInvoiceCheckbox = (event, setFieldValue) => {
    this.setState({ invoice: !this.state.invoice }, () =>
      setFieldValue("invoice", this.state.invoice)
    );
  };

  render() {
    const {
      classes,
      t,
      InputLabelPropsStyles,
      InputPropsStyles,
      orderStore: { user },
      pending,
    } = this.props;

    const OrderSchema = Yup.object().shape({
      firstName: Yup.string().when("orderType", {
        is: (val) => val === "person",
        then: StringValidator,
      }),
      lastName: Yup.string().when("orderType", {
        is: (val) => val === "person",
        then: StringValidator,
      }),
      companyName: Yup.string().when("orderType", {
        is: (val) => val === "company",
        then: StringValidator,
      }),
      companyNip: Yup.number().when("orderType", {
        is: (val) => val === "company",
        then: NIPValidator,
      }),
      country: StringValidator,
      street: StringValidator,
      addressNumber: StringValidator,
      postalCode: StringValidator,
      city: StringValidator,
      phoneNumberPrefix: StringValidator,
      phoneNumber: StringValidator,
      orderType: StringValidator,
    });
    return (
      <Formik
        enableReinitialize
        initialValues={new OrderForm(user)}
        validationSchema={OrderSchema}
        onSubmit={(values, actions) => {
          this.addUser(values).then(() => {
            actions.setSubmitting(false);
          });
        }}
      >
        {(props) => {
          const { setFieldValue, values, isValid, isSubmitting } = props;

          return (
            <Form noValidate>
              <div className={classes.formContainer}>
                <div className={classes.orderForm}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      className={classes.radioRow}
                      aria-label="orderType"
                      name="orderType"
                      value={values.orderType || this.state.orderType}
                    >
                      <FormControlLabel
                        value="person"
                        control={
                          <Radio
                            onChange={(event) =>
                              this.handleRadioChange(event, setFieldValue)
                            }
                            color="primary"
                          />
                        }
                        label={t("ORDER.PERSON")}
                      />
                      <FormControlLabel
                        value="company"
                        control={
                          <Radio
                            onChange={(event) =>
                              this.handleRadioChange(event, setFieldValue)
                            }
                            color="primary"
                          />
                        }
                        label={t("ORDER.COMPANY")}
                      />
                    </RadioGroup>
                  </FormControl>

                  <Field
                    id={
                      values.orderType === "company"
                        ? "companyName"
                        : "firstName"
                    }
                    name={
                      values.orderType === "company"
                        ? "companyName"
                        : "firstName"
                    }
                    label={t(
                      values.orderType === "company"
                        ? "ORDER.COMPANY_NAME"
                        : "ORDER.FIRST_NAME"
                    )}
                    required
                    InputLabelProps={InputLabelPropsStyles}
                    InputProps={InputPropsStyles}
                    component={TextField}
                    className={classes.textField}
                    margin="normal"
                    autoComplete="off"
                    variant="outlined"
                  />
                  <Field
                    id={
                      values.orderType === "company" ? "companyNip" : "lastName"
                    }
                    name={
                      values.orderType === "company" ? "companyNip" : "lastName"
                    }
                    label={t(
                      values.orderType === "company"
                        ? "ORDER.COMPANY_NIP"
                        : "ORDER.LAST_NAME"
                    )}
                    required
                    InputLabelProps={InputLabelPropsStyles}
                    InputProps={InputPropsStyles}
                    component={TextField}
                    className={classes.textField}
                    margin="normal"
                    autoComplete="off"
                    variant="outlined"
                  />
                  <Field
                    select
                    type="text"
                    name="country"
                    label={t("ORDER.COUNTRY")}
                    className={classes.textField}
                    component={TextField}
                    autoComplete="off"
                    margin="normal"
                    required
                    value={user.country}
                    variant="outlined"
                    InputLabelProps={InputLabelPropsStyles}
                    InputProps={InputPropsStyles}
                  >
                    {countryList().map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </Field>
                  <TwoFormsFields
                    t={t}
                    shortLeft={false}
                    firstField={"street"}
                    firstFieldLabel={"ORDER.STREET"}
                    secondField={"addressNumber"}
                    secondFieldLabel={"ORDER.ADDRESS_NUMBER"}
                    prefix={false}
                    InputLabelProps={InputLabelPropsStyles}
                    InputProps={InputPropsStyles}
                  />
                  <TwoFormsFields
                    t={t}
                    shortLeft={true}
                    firstField={"postalCode"}
                    firstFieldLabel={"ORDER.POSTAL_CODE"}
                    secondField={"city"}
                    secondFieldLabel={"ORDER.CITY"}
                    prefix={false}
                    InputLabelProps={InputLabelPropsStyles}
                    InputProps={InputPropsStyles}
                  />
                  <TwoFormsFields
                    t={t}
                    shortLeft={true}
                    firstField={"phoneNumberPrefix"}
                    firstFieldLabel={"ORDER.PHONE_NUMBER_PREFIX"}
                    secondField={"phoneNumber"}
                    secondFieldLabel={"ORDER.PHONE_NUMBER"}
                    prefix={true}
                    InputLabelProps={InputLabelPropsStyles}
                    InputProps={InputPropsStyles}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(event) =>
                          this.handleInvoiceCheckbox(event, setFieldValue)
                        }
                        checked={
                          values && values.invoice
                            ? values.invoice
                            : this.state.invoice
                        }
                        color="primary"
                      />
                    }
                    label={t("ORDER.GET_INVOICE")}
                  />
                  <div className={classes.saveData}>
                    <Button
                      disabled={isSubmitting || !isValid || pending}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={
                        !pending ? classes.btnSave : classes.btnDisabled
                      }
                    >
                      {pending ? (
                        <CircularProgress
                          size={20}
                          thickness={5}
                          color="primary"
                        />
                      ) : (
                        <div>{t("BUTTONS.SAVE")}</div>
                      )}
                    </Button>
                  </div>
                </div>
                <div className={classes.vatInfo}>
                  <p className={classes.textInfo}>
                    <ErrorOutlineOutlinedIcon className={classes.infoIcon} />
                    {t("ORDER.VAT")}
                  </p>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default MainForm;
