// get buttons from index.html
const loadCustomerDataButton = document.getElementById(
  "loadCustomerDataButton"
);
const changeCustomerDataButton = document.getElementById(
  "changeCustomerDataButton"
);
const saveCustomerDataButton = document.getElementById(
  "saveCustomerDataButton"
);
const customerDataForm = document.getElementById("customerDataForm");
const formElements = document.getElementsByClassName("form-control");
const anrede = document.getElementById("anrede");
const defaultAnredeSelect = document.getElementById("defaultAnredeSelect");
const titel = document.getElementById("titel");

const elements = {
  loadCustomerDataButton,
  changeCustomerDataButton,
  saveCustomerDataButton,
  customerDataForm,
  formElements,
  anrede,
  defaultAnredeSelect,
  titel,
};

export default elements;
