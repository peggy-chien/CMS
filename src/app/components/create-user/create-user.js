"use strict";
fetch("./components/create-user/create-user.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

function define(html) {
  class CreateUser extends HTMLElement {
    static formAssociated = true;
    myForm;
    myModal;

    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = html;
      const template = shadow.getElementById("create-form").content;
      this.internals_ = this.attachInternals();

      shadow.appendChild(template.cloneNode(true));
    }

    connectedCallback() {
      this.myModal = new bootstrap.Modal(this.shadowRoot.getElementById("create-form-modal"), {});
      this.myForm = this.shadowRoot.querySelector("form[id='my-form']");

      this.shadowRoot.getElementById("create-btn").addEventListener("click", (event) => {
        this.myModal.show();
      });

      this.shadowRoot.querySelectorAll("form input").forEach((element) => {
        element.addEventListener("input", (event) => {
          const value = event.target.value;
          element.setAttribute("value", value);
        });
      });

      this.shadowRoot.querySelector("button[type='submit']").addEventListener("click", (event) => {
        event.preventDefault();
        this.checkForm();
      });
    }

    checkForm() {
      if (
        this.myForm.querySelector("input[id='password']").value !==
        this.myForm.querySelector("input[id='password-confirm']").value
      ) {
        alert("密碼不一致，請確認");
        return false;
      }
      this.submit();
    }

    submit() {
      const formData = new FormData(this.myForm);
      // loop over FormData because some browsers do not support
      let payload = {};
      for (let [key, value] of formData.entries()) {
        payload[key] = value;
      }

      fetch("http://localhost/cms/create-user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(response);
          }
          return response.json();
        })
        .then((data) => {
          if (data.type === "SUCCESS") {
            alert(`用戶${payload.name}新增成功`);
            this.myModal.hide();
            this.dispatchEvent(new CustomEvent("send", { detail: { action: "FORM_SUBMITTED" } }));
          } else {
            alert(`用戶${payload.name}新增失敗`);
          }
        })
        .catch((error) => {
          if (typeof error.json === "function") {
            error
              .json()
              .then((jsonError) => {
                console.log("Json error from API");
                console.log(jsonError);
              })
              .catch((genericError) => {
                console.log("Generic error from API");
                console.log(error.statusText);
              });
          } else {
            console.log("Fetch error");
            console.log(error);
          }
        });
    }
  }

  // let the browser know about the custom element
  customElements.define("create-user", CreateUser);
}
