import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Button from "@material-ui/core/Button";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import { RadioGroup, TextField } from "formik-material-ui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  StringValidator,
  NIPValidator,
  NumberValidator,
} from "../../utils/validators";
import { countryList } from "../../constants/countryList";
import { TwoFieldsForm } from "./TwoFieldsForm";
import OrderForm from "../../model/userModel";
import { ORDER_TYPE } from "../../constants/orderType";
import {COLORS} from "../../styles/colors";

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
  postalCode: NumberValidator(6),
  city: StringValidator,
  phoneNumberPrefix: NumberValidator(3),
  phoneNumber: NumberValidator(11),
  orderType: StringValidator,
});

@inject("appStore", "userStore")
@observer
class MainForm extends Component {
  state = {
    orderType: "person",
    invoice: false,
  };

  componentDidMount() {
    if (this.props.userStore.id !== "" && this.props.userStore.edit) {
      this.props.userStore.getUserAction(this.props.userStore.id);
    }
  }

  submit = (values) => {
    if (this.props.userStore.edit) {
      this.editUser(values);
    } else {
      this.addUser(values);
    }
  };

  addUser = (values) => {
    if (values.invoice === "") {
      values.invoice = false;
    }
    values.id = Date.now();
    this.props.userStore.addUserAction(values);
  };

  editUser = (values) => {
    if (values.invoice === "") {
      values.invoice = false;
    }
    this.props.userStore.editUserAction(values);
  };

  handleRadioChange = (event, setFieldValue) => {
    this.setState({ orderType: event.target.value }, () =>
      setFieldValue("orderType", this.state.orderType)
    );
    if (event.target.value === ORDER_TYPE.PERSON) {
      setFieldValue("companyName", "");
      setFieldValue("companyNip", "");
    } else {
      setFieldValue("firstName", "");
      setFieldValue("lastName", "");
    }
  };

  handleInvoiceCheckbox = (event, setFieldValue) => {
    this.setState(
      (prevState, props) => {
        return { invoice: !prevState.invoice };
      },
      () => setFieldValue("invoice", this.state.invoice)
    );
  };

  render() {
    const {
      classes,
      t,
      InputLabelPropsStyles,
      InputPropsStyles,
      userStore: { pending, user },
    } = this.props;

    return (
      <Formik
        enableReinitialize
        initialValues={new OrderForm(user)}
        validationSchema={OrderSchema}
        onSubmit={(values, actions) => {
          this.submit(values).then(() => {
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
                      values.orderType === ORDER_TYPE.COMPANY
                        ? "companyName"
                        : "firstName"
                    }
                    name={
                      values.orderType === ORDER_TYPE.COMPANY
                        ? "companyName"
                        : "firstName"
                    }
                    label={t(
                      values.orderType === ORDER_TYPE.COMPANY
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
                      values.orderType === ORDER_TYPE.COMPANY
                        ? "companyNip"
                        : "lastName"
                    }
                    name={
                      values.orderType === ORDER_TYPE.COMPANY
                        ? "companyNip"
                        : "lastName"
                    }
                    label={t(
                      values.orderType === ORDER_TYPE.COMPANY
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
                    value={values.country}
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
                  <TwoFieldsForm
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
                  <TwoFieldsForm
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
                  <TwoFieldsForm
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
                    label={t("ORDER.INVOICE_YES")}
                  />
                  <div className={classes.saveData}>
                    <Button
                      disabled={isSubmitting || !isValid || pending}
                      type="submit"
                      variant="contained"
                      color="primary"
                      classes={{root: classes.btnSave}}
                    >
                      {pending ? (
                        <CircularProgress
                          size={20}
                          thickness={5}
                          color='secondary'
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
