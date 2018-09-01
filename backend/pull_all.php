<?php 
header('Content-type: application/json');
    $servername = "localhost";
    $username = "xxxxxxxxxxx";
    $password = "xxxxxxxxxxxx";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=cake_shop", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //Prepared query to save cake orders in the database
        $stmt = $conn->prepare("SELECT cake_id, cake_name, cake_description, cake_img, cake_price FROM cakes"); 
        $stmt->execute();

        // set the resulting array to associative
        $result = $stmt->fetchAll(); 
        echo json_encode($result);
    
        }
    catch(PDOException $e)
        {
        echo "Connection failed: " . $e->getMessage();
        }  

?>