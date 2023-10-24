<?php
  include "connect-db.php";

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
    $dc = new DatabaseConnector("mfee43_03");
    $sql = "DELETE FROM `user_table` WHERE u_id={$id} ";
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