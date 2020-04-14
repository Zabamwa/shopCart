import React from "react";
import { fieldToTextField, TextField } from "formik-material-ui";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Field } from "formik";
import { COLORS } from "../styles/colors";
import MuiTextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { prefixList } from "../constants/prefixList";
import conformToMask from "text-mask-core/src/conformToMask";
const useStyles = makeStyles(() =>
  createStyles({
    containerField: {
      display: "flex",
      width: "100%",
      maxWidth: 380,
      justifyContent: "space-between",
    },

    longerField: {
      width: "63%",
      marginTop: 12,
      borderRadius: 4,
    },

    shorterField: {
      width: "35%",
      marginTop: 12,
      borderRadius: 4,
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

    notchedOutline: {
      borderWidth: 1,
      borderColor: `${COLORS.BLACK} !important`,
      color: COLORS.BLACK,
    },
  })
);
const postalCodeMask = [/\d/, /\d/, "-", /\d/, /\d/, /\d/];
const phoneNumberPrefixMask = ["+", /\d/, /\d/];
const phoneNumberMask = [/\d/, /\d/, /\d/, "-",/\d/, /\d/, /\d/,"-", /\d/, /\d/, /\d/];
const MaskTextField = (props) => (

  <MuiTextField
    {...fieldToTextField(props)}
    onChange={(event) => {
      const { value } = event.target;
      let valueToUpdate;
      const dashDeleting =
        props.field.value[props.field.value.length - 1] === "-" &&
        value.length < props.field.value.length;
      if (!dashDeleting) {
          switch(props.id){
              case 'postalCode':
                  valueToUpdate = conformToMask(
                      value,
                      postalCodeMask,
                      { guide: false }
                  ).conformedValue;
                  break;
              case 'phoneNumber':
                  valueToUpdate = conformToMask(
                      value,
                      phoneNumberMask,
                      { guide: false }
                  ).conformedValue;
                  break;
              default:
                  valueToUpdate = conformToMask(
                      value,
                      phoneNumberPrefixMask,
                      { guide: false }
                  ).conformedValue;
                  break;
          }
      } else {
        valueToUpdate = value;
      }
      props.form.setFieldValue(props.field.name, valueToUpdate);
    }}
  />
);

export const TwoFormsFields = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.containerField}>
        <Field
          id={props.firstField}
          name={props.firstField}
          label={props.t(props.firstFieldLabel)}
          required
          InputLabelProps={{
            classes: {
              root: classes.inputLabel,
            },
          }}
          InputProps={{
            classes: {
              root: classes.outlinedInput,
              focused: classes.outlinedInputFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
          component={
            props.firstField !== "street" ? MaskTextField : TextField
          }
          className={
            props.shortLeft ? classes.shorterField : classes.longerField
          }
          margin="normal"
          autoComplete="off"
          variant="outlined"
        />
      {/*)}*/}
      <Field
        id={props.secondField}
        name={props.secondField}
        label={props.t(props.secondFieldLabel)}
        required
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
          },
        }}
        InputProps={{
          classes: {
            root: classes.outlinedInput,
            focused: classes.outlinedInputFocused,
            notchedOutline: classes.notchedOutline,
          },
        }}
        component={
            props.secondField === "phoneNumber" ? MaskTextField : TextField
        }
        className={props.shortLeft ? classes.longerField : classes.shorterField}
        margin="normal"
        autoComplete="off"
        variant="outlined"
      />
    </div>
  );
};
