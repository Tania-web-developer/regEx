<?php

if (isset($_POST['login'],$_POST['password'])){
    $connection = mysqli_connect('localhost', 'f0464737_shop', '090902', 'f0464737_shop');
    if (!$connection){
        http_response_code(500);
        $responseObj['error']='Не полчилось подключиться к БД!';
        echo json_encode($responseObj);
        return;
    }
    
    $login = $_POST['login'];
    $password = $_POST['password'];
    $sex = $_POST['sex'];
    
    $checkQuery = mysqli_query($connection, "SELECT COUNT(login) FROM users WHERE login='$login'");
    if ($checkQuery) {
            $array = mysqli_fetch_array($checkQuery);
            if ($array[0] > 0) {
                http_response_code(409);
                $responseObj['error']= 'Логин занят!';
                 echo json_encode($responseObj);
                 return;
            }else {
                $query = mysqli_query($connection,"insert INTO users (login,password,sex,role) VALUES ('$login','$password','$sex','user')");
                 if (!$query){
                    http_response_code(500);
                    $responseObj['error']='Не полчилось подключиться к БД!';
                    echo json_encode($responseObj);
                    return;
            } else {
                $checkQuery = mysqli_query($connection, "SELECT * FROM users WHERE login='$login'");
                 while($row = mysqli_fetch_array($checkQuery)) {
                    $arrRow["role"] = $row["role"];
                    $arrRow["login"] = $row["login"];
                    $arrRow["sex"] = $row["sex"];
                    $arrRow["user_id"] = (int)$row["user_id"];
                 }
                 http_response_code(200);
                 $responseObj['result']= $arrRow;
                 echo json_encode($responseObj);
                 return;
            }
        } 
    } else {
        http_response_code(500);
        $responseObj['error']='Не полчилось подключиться к БД!';
        echo json_encode($responseObj);
        return;
    }
} else {
    http_response_code(400);
    $responseObj['error']='Не пришло параметров';
     echo json_encode($responseObj);
    return;
}

?>