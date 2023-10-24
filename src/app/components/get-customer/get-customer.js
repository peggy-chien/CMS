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
      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", "http://localhost/cms/get-user-info.php", true);
      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhttp.send();

      const $this = this;
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          $this.displayData(JSON.parse(this.responseText));
        }
      };
    }

    displayData(data) {
      let html =
        "<div>刪除</div><div>id</div><div>姓名</div><div>帳號</div><div>生日</div><div>電子信箱</div><div>密碼</div><div>連絡電話</div>";
      data.forEach((cus) => {
        html += `<div name="row_${cus.id}">
                    <button class="btn btn-danger" onclick="deleteUser(${cus.id}, '${cus.name}')">刪除</button>
                </div>`;
        html += `<div name="row_${cus.id}">${cus.id}</div>`;
        html += `<div name="row_${cus.id}">${cus.name}</div>`;
        html += `<div name="row_${cus.id}">${cus.acco}</div>`;
        html += `<div name="row_${cus.id}">${cus.birth}</div>`;
        html += `<div name="row_${cus.id}">${cus.email}</div>`;
        html += `<div name="row_${cus.id}">${cus.pw}</div>`;
        html += `<div name="row_${cus.id}">${cus.tel}</div>`;
      });
      this.shadowRoot.getElementById("table").innerHTML = html;
    }

    deleteUser(id, name) {
      if (confirm(`確認刪除${name}(代號：${id})？`)) {
        const xhttp = new XMLHttpRequest();
        xhttp.open(
          "DELETE",
          `http://localhost/cms/delete-user.php?id=${id}`,
          true
        );
        xhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhttp.send();

        const $this = this;
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            alert("刪除成功！");
            let childArray = Array.prototype.slice.call(
              $this.shadowRoot.querySelectorAll(`div[name='row_${id}']`)
            );
            childArray.forEach((child) => child.parentNode.removeChild(child));
          }
        };
      }
    }
  }

  // let the browser know about the custom element
  customElements.define("get-customer", GetCustomer);
}

// function getUserData() {
//   const xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "http://localhost/cms/get-user-info.php", true);
//   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhttp.send();

//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       displayData(JSON.parse(this.responseText));
//     }
//   };
// }

// function displayData(data) {
//   let html =
//     "<div>刪除</div><div>id</div><div>姓名</div><div>帳號</div><div>生日</div><div>電子信箱</div><div>密碼</div><div>連絡電話</div>";
//   data.forEach((cus) => {
//     html += `<div name="row_${cus.id}">
//                 <button class="btn btn-danger" onclick="deleteUser(${cus.id}, '${cus.name}')">刪除</button>
//             </div>`;
//     html += `<div name="row_${cus.id}">${cus.id}</div>`;
//     html += `<div name="row_${cus.id}">${cus.name}</div>`;
//     html += `<div name="row_${cus.id}">${cus.acco}</div>`;
//     html += `<div name="row_${cus.id}">${cus.birth}</div>`;
//     html += `<div name="row_${cus.id}">${cus.email}</div>`;
//     html += `<div name="row_${cus.id}">${cus.pw}</div>`;
//     html += `<div name="row_${cus.id}">${cus.tel}</div>`;
//   });
//   GetCustomer.getElementById("table").innerHTML = html;
// }

// function deleteUser(id, name) {
//   if (confirm(`確認刪除${name}(代號：${id})？`)) {
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("DELETE", `http://localhost/cms/delete-user.php?id=${id}`, true);
//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhttp.send();

//     xhttp.onreadystatechange = function () {
//       if (this.readyState == 4 && this.status == 200) {
//         alert("刪除成功！");
//         let childArray = Array.prototype.slice.call(
//           document.querySelectorAll(`div[name='row_${id}']`)
//         );
//         childArray.forEach((child) => child.parentNode.removeChild(child));
//       }
//     };
//   }
// }
