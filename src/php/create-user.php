<?php
  include "connect-db.php";

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/x-www-form-urlencoded; charset=utf-8');
  header("Access-Control-Allow-Methods: POST");

  get_post_payload();

  function get_post_payload() {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
      $form_data = json_decode(file_get_contents('php://input'));
      $form_data->birth = str_replace("-", "", $form_data->birth);
      $form_data->pw = sha1($form_data->pw);
      post_db($form_data);
    }
  }

  function post_db($form_data) {
    $dc = new DatabaseConnector("mfee43_03");
    $sql = "INSERT INTO `user_table` (`u_name`, `u_acco`, `u_birth`, `u_email`, `u_pw`, `u_tel`, `u_addr`) VALUES ";
    $sql .= "('{$form_data->name}', '{$form_data->acco}', '{$form_data->birth}', '{$form_data->email}', '{$form_data->pw}', '{$form_data->tel}', '{$form_data->addr}')";
    $result = $dc->exec_sql($sql);

    if ($result) {
      exit("SUCCESS");
    } else {
      exit("FAILED");
    }

    $dc->disconnect_db();
  }
    
  function debug_to_console($data) {
    echo "<script>console.log(JSON.parse('" . json_encode($data) . "'));</script>";
  }
?>