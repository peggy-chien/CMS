<?php
  include "connect-db.php";

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/x-www-form-urlencoded; charset=utf-8');
  header("Access-Control-Allow-Methods: PATCH");

  get_post_payload();

  function get_post_payload() {
    if ($_SERVER["REQUEST_METHOD"] === "PATCH") {
      $form_data = json_decode(file_get_contents('php://input'));
      post_db($form_data);
    }
  }

  function post_db($form_data) {
    $dc = new DatabaseConnector("mfee43_03");
    $set = "";
    foreach ($form_data as $key => $value) {
      if ($key !== "id") {
        $set .= "u_{$key} = '{$value}',";
      }
    }
    $sql = "UPDATE `user_table` SET ". substr($set, 0, -1). " WHERE u_id = {$form_data->id}";
    $result = $dc->exec_sql($sql);

    if ($result) {
      echo json_encode(['type' => 'SUCCESS']);
    } else {
      echo json_encode(['type' => 'FAILED']);
    }

    $dc->disconnect_db();
  }
    
  function debug_to_console($data) {
    echo "<script>console.log(JSON.parse('" . json_encode($data) . "'));</script>";
  }
?>