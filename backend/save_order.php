<?php 
$postdata = json_decode(file_get_contents("php://input"));

function save_data($shopping_cart){
    $servername = "localhost";
    $username = "xxxxxxxxxxx";
    $password = "xxxxxxxxxxx";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=cake_shop", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //Prepared query to save cake orders in the database
        $stmt = $conn->prepare("INSERT INTO orders (cake_name, quantity, price) 
        VALUES (:cake_name, :quantity, :price)");
        $stmt->bindParam(':cake_name', $cake_name);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->bindParam(':price', $price);

        //Loop for inserting shopping cart items into the database
            foreach($shopping_cart as $cake){
                $cake_name = $cake->name;
                $quantity = $cake->quantity;
                $price = $cake->price;
                $stmt->execute();
            }
        }
    catch(PDOException $e)
        {
        echo "Connection failed: " . $e->getMessage();
        }
    
}

save_data($postdata);



?>