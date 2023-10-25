"use strict";
fetch("./components/get-customer/get-customer.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

function define(html) {
  class GetCustomer extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = html;
      const template = shadow.getElementById("result-table").content;

      shadow.appendChild(template.cloneNode(true));
    }

    connectedCallback() {
      this.getUserData();
    }

    getUserData() {
      fetch("http://localhost/cms/get-user-info.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(response);
          }
          return response.json();
        })
        .then((data) => {
          if (!data.message) {
            this.displayData(data);
          } else {
            console.log(data.message);
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

    displayData(data) {
      let html =
        "<div>刪除</div><div>id</div><div>姓名</div><div>帳號</div><div>生日</div><div>電子信箱</div><div>密碼</div><div>連絡電話</div><div>地址</div><div>建立時間</div><div>更新時間</div>";
      data.forEach((cus) => {
        html += `<div name="row_${cus.id}">
                    <button class="btn btn-warning btn-sm edit-item" data-id="${cus.id}" data-name="${cus.name}" data-acco="${cus.acco}" data-birth="${cus.birth}" data-email="${cus.email}" data-pw="${cus.pw}" data-tel="${cus.tel}" data-addr="${cus.addr}">編輯</button>
                    <button class="btn btn-danger btn-sm remove-item" data-id="${cus.id}" data-name="${cus.name}">刪除</button>
                </div>`;
        html += `<div name="row_${cus.id}">${cus.id}</div>`;
        html += `<div name="row_${cus.id}">${cus.name}</div>`;
        html += `<div name="row_${cus.id}">${cus.acco}</div>`;
        html += `<div name="row_${cus.id}">${cus.birth}</div>`;
        html += `<div name="row_${cus.id}">${cus.email}</div>`;
        html += `<div name="row_${cus.id}">${cus.pw}</div>`;
        html += `<div name="row_${cus.id}">${cus.tel}</div>`;
        html += `<div name="row_${cus.id}">${cus.addr}</div>`;
        html += `<div name="row_${cus.id}">${cus.createtime}</div>`;
        html += `<div name="row_${cus.id}">${cus.updatetime}</div>`;
      });
      this.shadowRoot.getElementById("table").innerHTML = html;

      this.handleEditUserListener(this.shadowRoot.querySelectorAll(".edit-item"));

      this.handleDeleteUserListener(this.shadowRoot.querySelectorAll(".remove-item"));
    }

    handleEditUserListener(arrayOfElements) {
      arrayOfElements.forEach((element) => {
        element.onclick = (event) => {
          this.editUser(event.target.dataset);
        };
      });
    }

    handleDeleteUserListener(arrayOfElements) {
      arrayOfElements.forEach((element) => {
        element.onclick = (event) => {
          this.deleteUser(event.target.dataset);
        };
      });
    }

    editUser(obj) {
      this.dispatchEvent(new CustomEvent("showModal", { detail: { ...obj } }));
    }

    deleteUser(obj) {
      if (confirm(`確認刪除${obj.name}(代號：${obj.id})？`)) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", `http://localhost/cms/delete-user.php?id=${obj.id}`, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();

        const $this = this;
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "SUCCESS") {
              alert("刪除成功！");
              let childArray = Array.prototype.slice.call(
                $this.shadowRoot.querySelectorAll(`div[name='row_${obj.id}']`)
              );
              childArray.forEach((child) => child.parentNode.removeChild(child));
            }
          }
        };
      }
    }
  }

  // let the browser know about the custom element
  customElements.define("get-customer", GetCustomer);
}
