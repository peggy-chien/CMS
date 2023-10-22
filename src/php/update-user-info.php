<?php

$servername = "localhost";
$username = "db_admin";
$password = "P@ssw0rd";
$dbname = "mfee43_03";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM `user_table`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "id: ".$row["u_id"]. " - name: ".$row["u_name"]. " - acco: ".$row["u_acco"]. " - brith: ".$row["u_brith"]. " - email: ".$row["u_email"]. " - pw: ".$row["u_pw"]. " - tel: ".$row["u_tel"]. "<br>";
  }
} else {
  echo "0 results";
}

$conn->close();

?>