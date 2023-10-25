import "./components/nav-bar/nav-bar.js";
import "./components/get-customer/get-customer.js";
import "./components/create-user/create-user.js";
import "./components/update-user/update-user.js";

document.addEventListener("DOMContentLoaded", () => {
  const createUserForm = document.getElementById("create-user-form");
  const getCustomerTable = document.getElementById("get-customer-table");
  const updateFormModal = document.getElementById("update-form-modal");

  createUserForm.addEventListener("send", (e) => {
    if (e.detail.action === "FORM_SUBMITTED") {
      getCustomerTable.getUserData();
    }
  });

  getCustomerTable.addEventListener("showModal", (e) => {
    updateFormModal.showModal(e.detail);
  });

  updateFormModal.addEventListener("send", (e) => {
    if (e.detail.action === "FORM_SUBMITTED") {
      getCustomerTable.getUserData();
    }
  });
});
