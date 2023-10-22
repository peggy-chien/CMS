getUserData();

function getUserData() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost/cms/get-user-info.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          displayData(JSON.parse(this.responseText));
        }
    };
}

function displayData(data) {
    let html = "<div>刪除</div><div>id</div><div>姓名</div><div>帳號</div><div>生日</div><div>電子信箱</div><div>密碼</div><div>連絡電話</div>";
    data.forEach(obj => {
        html +=
            `<div>
                <button class="btn btn-danger" onclick="deleteUser(${obj.id})">刪除</button>
            </div>`;
        html += `<div>${obj.id}</div>`;
        html += `<div>${obj.name}</div>`;
        html += `<div>${obj.acco}</div>`;
        html += `<div>${obj.birth}</div>`;
        html += `<div>${obj.email}</div>`;
        html += `<div>${obj.pw}</div>`;
        html += `<div>${obj.tel}</div>`;
    });
    document.getElementById("table").innerHTML = html;
}

function deleteUser(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `http://localhost/cms/delete-user.php?id=${id}`, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        //   displayData(JSON.parse(this.responseText));
        }
    };
}
