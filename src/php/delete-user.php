<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/x-www-form-urlencoded');
  header("Access-Control-Allow-Methods: DELETE");

  parse_delete_payload();

  function parse_delete_payload() {
    if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
      delete_user($_GET['id']);
    }
  }

  function delete_user($id) {
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
    $sql = "DELETE FROM `user_table` WHERE u_id={$id} ";
    $result = $conn->query($sql);

    if ($result) {
      echo "SUCCESS";
    } else {
      echo "FAILED";
    }

    $conn->close();
  }
    
  function debug_to_console($data) {
    echo "<script>console.log(JSON.parse('" . json_encode($data) . "'));</script>";
  }
?>