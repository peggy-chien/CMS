"use strict";
fetch("./components/update-user/update-user.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

function define(html) {
  class UpdateUser extends HTMLElement {
    myModal;
    myForm;
    userIndex;

    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = html;
      const template = shadow.getElementById("update-modal").content;

      shadow.appendChild(template.cloneNode(true));
    }

    connectedCallback() {
      this.myModal = new bootstrap.Modal(this.shadowRoot.getElementById("update-form-modal"), {});
      this.myForm = this.shadowRoot.querySelector("form[id='update-form']");

      this.shadowRoot.querySelectorAll("form input").forEach((element) => {
        if (!element.readOnly) {
          element.addEventListener("input", (event) => {
            const value = event.target.value;
            element.setAttribute("value", value);
            element.setAttribute("data-dirty", true);
          });
        }
      });

      this.shadowRoot.querySelector("button[type='submit']").addEventListener("click", (event) => {
        event.preventDefault();
        this.submit();
      });
    }

    showModal(formData) {
      for (let [key, value] of Object.entries(formData)) {
        if (key === "id") {
          this.userIndex = value;
          continue;
        }
        const ele = this.myForm.querySelector(`input[name='${key}']`);
        if (ele) {
          ele.value =
            ele.type === "date"
              ? `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6)}`
              : value;
        }
      }
      this.myModal.show();
    }

    submit() {
      let payload = {};
      this.myForm.querySelectorAll('input[data-dirty="true"]').forEach((ele) => {
        payload[ele.name] = ele.value;
      });

      fetch("http://localhost/cms/update-user-info.php", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({ ...payload, id: this.userIndex }),
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(response);
          }
          return response.json();
        })
        .then((data) => {
          if (data.type === "SUCCESS") {
            alert(`更新成功`);
            this.myModal.hide();
            this.dispatchEvent(new CustomEvent("send", { detail: { action: "FORM_SUBMITTED" } }));
          } else {
            alert(`更新失敗`);
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

    // disconnectedCallback() {
    //   this.shadowRoot.querySelector("button").removeEventListener('click', this._showModal);
    //   this.shadowRoot.querySelector(".close").removeEventListener('click', this._hideModal);
    // }

    // _showModal() {
    //  this._modalVisible = true;
    //  this._modal.style.display = 'block';
    // }

    // _hideModal() {
    //   this._modalVisible = false;
    //   this._modal.style.display = 'none';
    // }
  }

  // let the browser know about the custom element
  customElements.define("update-user", UpdateUser);
}
