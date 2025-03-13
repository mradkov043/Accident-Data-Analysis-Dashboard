<?php 
    $connection = include ('db.inc.php');
    $table = "unfall";

    $sql = $_POST['sqlQuery'];
    
    $result = mysqli_query($connection, $sql);

    $data = array();
    if($result -> num_rows > 0){
        while($row = $result->fetch_assoc()){
            $data[] = $row;
        }
    }    
    echo json_encode($data);

    mysqli_close($connection);
?>