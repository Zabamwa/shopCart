class OrderForm {
  constructor(user) {
    if (user) {
      this.id = user.id || "";
      this.firstName = user.firstName || "";
      this.lastName = user.lastName || "";
      this.companyName = user.companyName || "";
      this.companyNip = user.companyNip || "";
      this.country = user.country || "";
      this.street = user.street || "";
      this.postalCode = user.postalCode || "";
      this.invoice = user.invoice || "";
      this.orderType = user.orderType || "person";
      this.addressNumber = user.addressNumber || "";
      this.city = user.city || "";
      this.phoneNumberPrefix = user.phoneNumberPrefix || "";
      this.phoneNumber = user.phoneNumber || "";
    }
  }

  id = "";
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
  orderType = "person";
  invoice = "";
}

export default OrderForm;
