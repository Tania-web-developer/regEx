<?php
if (isset($_POST['product_id'])){
    $connection = mysqli_connect('localhost', 'f0464737_shop', '090902', 'f0464737_shop');
    if (!$connection){
        http_response_code(500);
        $responseObj['error']='Не полчилось подключиться к БД!';
        echo json_encode($responseObj);
        return;
    }
    $productId = $_POST['product_id'];
    $query = mysqli_query($connection,"delete from shop_products where product_id=$productId");
    if (!$query){
        http_response_code(500);
        $responseObj['error']='Не полчилось подключиться к БД!';
        echo json_encode($responseObj);
        return;
    } else {
         $filepathJPEG = dirname(__FILE__)."/images/$productId.jpeg";
         $filepathJPG = dirname(__FILE__)."/images/$productId.jpg";
         $filepathPNG = dirname(__FILE__)."/images/$productId.png";
         unlink($filepathJPG);
         unlink($filepathJPEG);
         unlink($filepathPNG);
         
         http_response_code(200);
         $responseObj['result']= 'Запрос успешен';
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