<?php
  include "connect-db.php";

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/x-www-form-urlencoded; charset=utf-8');
  header("Access-Control-Allow-Methods: GET");

  get_db();

  function get_db() {
    $dc = new DatabaseConnector("mfee43_03");
    $sql = "SELECT * FROM `user_table`";
    $result = $dc->exec_sql($sql);
  
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
        $object->addr = $row["u_addr"];
        $object->createtime = $row["u_createtime"];
        $object->updatetime = $row["u_updatetime"];
        array_push($jsonObj, $object);
      }
      gen_http_resp($jsonObj);
    } else {
      $resp = new stdClass();
      $resp->message = "0 results";
      gen_http_resp($resp);
    }
    
    $dc->disconnect_db();
  }

  function gen_http_resp($data) {
    echo json_encode($data);
  }

  function debug_to_console($data) {
    echo "<script>console.log(JSON.parse('" . json_encode($data) . "'));</script>";
  }
?>