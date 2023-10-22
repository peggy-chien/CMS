<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json; charset=utf-8');
  header("Access-Control-Allow-Methods: POST");

  get_post_payload();

  function get_post_payload() {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
      $form_data = new stdClass();
      $form_data->name = htmlspecialchars($_POST['name']);
      $form_data->acco = htmlspecialchars($_POST['acco']);
      $form_data->birth = str_replace("-", "", htmlspecialchars($_POST['birth']));
      $form_data->email = htmlspecialchars($_POST['email']);
      $form_data->pw = sha1($_POST['pw']);
      $form_data->tel = htmlspecialchars($_POST['tel']);
      post_db($form_data);
    }
  }

  function post_db($form_data) {
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
    $sql = "INSERT INTO `user_table` (`u_name`, `u_acco`, `u_birth`, `u_email`, `u_pw`, `u_tel`) VALUES ";
    $sql .= "('{$form_data->name}', '{$form_data->acco}', '{$form_data->birth}', '{$form_data->email}', '{$form_data->pw}', '{$form_data->tel}')";
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