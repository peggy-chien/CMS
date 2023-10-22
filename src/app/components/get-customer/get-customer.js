getUserData();

function getUserData() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost/cms/get-user-info.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      displayData(JSON.parse(this.responseText));
    }
  };
}

function displayData(data) {
  let html =
    "<div>刪除</div><div>id</div><div>姓名</div><div>帳號</div><div>生日</div><div>電子信箱</div><div>密碼</div><div>連絡電話</div>";
  data.forEach((cus) => {
    html += `<div name="row_${cus.id}">
                <button class="btn btn-danger" onclick="deleteUser(${cus.id})">刪除</button>
            </div>`;
    html += `<div name="row_${cus.id}">${cus.id}</div>`;
    html += `<div name="row_${cus.id}">${cus.name}</div>`;
    html += `<div name="row_${cus.id}">${cus.acco}</div>`;
    html += `<div name="row_${cus.id}">${cus.birth}</div>`;
    html += `<div name="row_${cus.id}">${cus.email}</div>`;
    html += `<div name="row_${cus.id}">${cus.pw}</div>`;
    html += `<div name="row_${cus.id}">${cus.tel}</div>`;
  });
  document.getElementById("table").innerHTML = html;
}

function deleteUser(id) {
  if (confirm(`確認刪除？`)) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `http://localhost/cms/delete-user.php?id=${id}`, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        alert("刪除成功！");
        let childArray = Array.prototype.slice.call(
          document.querySelectorAll(`div[name='row_${id}']`)
        );
        childArray.forEach((child) => child.parentNode.removeChild(child));
      }
    };
  }
}
