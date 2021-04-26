<?php
if (isset($_POST['name'],$_POST['price'],$_FILES['image']['type'])){
    $connection = mysqli_connect('localhost', 'f0464737_shop', '090902', 'f0464737_shop');
    if (!$connection){
        http_response_code(500);
        $responseObj['error']='Не полчилось подключиться к БД!';
        echo json_encode($responseObj);
        return;
    }
    ////////////////////////////////////////////////
    
    $query = mysqli_query($connection,"SELECT MAX(product_id) as max FROM shop_products");
    if (!$query){
        http_response_code(500);
        $responseObj['error']='Не полчилось подключиться к БД!';
        echo json_encode($responseObj);
        return;
    } else {
        while($row = mysqli_fetch_array($query)) {
          $id = (int)$row["max"];
          $id++;
       }
    }    
    $type = substr($_FILES['image']['type'], 6);
     if ($type == 'jpeg') {
         $picSrc="../product_img/$id.jpg";
     } else if ($type == 'png') {
         $picSrc="../product_img/$id.png";
     }
    //////////////
    $name = $_POST['name'];
    $price = $_POST['price'];
    $query = mysqli_query($connection,"insert INTO shop_products (name,price,pic_src) VALUES ('$name',$price,'$picSrc')");
    if (!$query){
        http_response_code(500);
        $responseObj['error']='Не полчилось подключиться к БД!';
        echo json_encode($responseObj);
        return;
    } 
    
    ///////////////////////////////////////////////////
    if ($type == 'jpeg') {
        $img = imagecreatefromjpeg($_FILES['image']['tmp_name']);
        imagejpeg($img, "../product_img/$id.jpg", 100);
    } else if ($type == 'png') {
        $img = imagecreatefrompng($_FILES['image']['tmp_name']);
        imagepng($img, "../product_img/$id.png", 100);
    }
    http_response_code(200);
    $responseObj['result']= 'Запрос прошел успешно';
    echo json_encode($responseObj);
    return;
} else {
    http_response_code(400);
    $responseObj['error']='Не пришло параметров';
    echo json_encode($responseObj);
    return;
}

?>