<?php
    $connect = mysqli_connect('localhost', 'f0464737_shop', '090902', 'f0464737_shop');
     if (!$connect){
        http_response_code(500);
        $responseObj['error']='Не полчилось подключиться к БД!';
        echo json_encode($responseObj);
        return;
     } 
    $query = mysqli_query($connect,"SELECT * FROM `shop_products`");
    $products = [];
    if($query) {
       while($row = mysqli_fetch_array($query)) {
          $arrRow["product_id"] = (int)$row["product_id"];
          $arrRow["name"] = $row["name"];
          $arrRow["price"] = (int)$row["price"];
          $arrRow["pic_src"] = $row["pic_src"];
          $products[]=$arrRow;
       }
       if (count($products)==0){
          http_response_code(204);
        $responseObj['error']='Нет товаров!';
        echo json_encode($responseObj);
        return;
       }
       http_response_code(200);
       $responseObj['result']= $products;
       echo json_encode($responseObj);
       return;
    } else {
        http_response_code(500);
        $responseObj['error']='Не полчилось подключиться к БД!';
        echo json_encode($responseObj);
        return;
    }
    mysqli_close($connect);

