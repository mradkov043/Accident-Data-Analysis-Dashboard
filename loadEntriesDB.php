<?php
$connection = include('db.inc.php');

$table = "unfall";

$filters = [];

if (isset($_GET['filters'])) {
    $filters = json_decode($_GET['filters'], true);
}

$sql = "SELECT * FROM $table";
$whereClauses = [];

if (isset($filters['ukategorie']) && $filters['ukategorie'] != 'all') {
    $whereClauses[] = "UKATEGORIE = '".mysqli_real_escape_string($connection, $filters['ukategorie'])."'";
}

$vehicleTypes = $filters['vehicleTypes'] ?? [];
foreach ($vehicleTypes as $column => $value) {
    if ($value) {
        $whereClauses[] = "$column = 1";
    }
}

if (!empty($filters['date'])) {
    $dateParts = explode('-', $filters['date']);
    $year = $dateParts[0];
    $month = $dateParts[1];
    $whereClauses[] = "UMONAT = '".mysqli_real_escape_string($connection, $month)."'";
    $whereClauses[] = "UJAHR = '".mysqli_real_escape_string($connection, $year)."'";
}

if (isset($filters['unfallart']) && $filters['unfallart'] != 'all') {
    $whereClauses[] = "UART = '".mysqli_real_escape_string($connection, $filters['unfallart'])."'";
}

if (count($whereClauses) > 0) {
    $sql .= " WHERE " . implode(" AND ", $whereClauses);
}

$result = mysqli_query($connection, $sql);

$data = array();
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($data);

mysqli_close($connection);
?>