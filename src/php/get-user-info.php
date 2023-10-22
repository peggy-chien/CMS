<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json; charset=utf-8');
  header("Access-Control-Allow-Methods: GET");

  get_db();

  function get_db() {
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
      $jsonObj = [];
      while($row = $result->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $row["u_id"];
        $object->name = $row["u_name"];
        $object->acco = $row["u_acco"];
        $object->birth = $row["u_birth"];
        $object->email = $row["u_email"];
        $object->pw = $row["u_pw"];
        $object->tel = $row["u_tel"];
        array_push($jsonObj, $object);
      }
      gen_http_resp($jsonObj);
    } else {
      $resp = new stdClass();
      $resp->message = "0 results";
      gen_http_resp($resp);
    }
    
    $conn->close();
  }

  function gen_http_resp($data) {
    echo json_encode($data);
  }

  function debug_to_console($data) {
    echo "<script>console.log(JSON.parse('" . json_encode($data) . "'));</script>";
  }
?>