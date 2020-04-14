import * as Yup from "yup";
import i18n from "../config/i18n";

export const StringValidator = Yup.string()
  .required(() => i18n.t("ERRORS.FIELD_EMPTY"))
  .nullable();

export const NumberValidator = Yup.number()
  .transform((v, o) => (o === "" ? null : v))
    .required(() => i18n.t("ERRORS.FIELD_EMPTY"))
  .typeError(i18n.t("ERRORS.FIELD_ONLY_NUMBER"))
  .nullable();

export const NIPValidator = () => {
  const weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let result = 0;
  return Yup.bool()
    .transform((v, o) => {
      let splitNip = o.split("");
      if (splitNip.length === 10) {
        weight.forEach((el, index) => {
          if (index < splitNip.length - 1) result += splitNip[index] * el;
        });
        return Number(splitNip[splitNip.length - 1]) === result % 11;
      }
    })
    .test(
      "nipPattern",
      () => i18n.t("ERRORS.NIP_INVALID"),
      (value) => value === true
    )
};
