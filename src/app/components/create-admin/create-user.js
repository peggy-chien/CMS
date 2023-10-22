getUserData();

function getUserData() {
    const payload = encodeURI("name=new user&acco=user_account&birth=0101&email=newUser@gmail.com&pw=123&tel=0912345678");
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost/amusement-park/create-account.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(payload);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        //   displayData(JSON.parse(this.responseText));
        }
    };
}
