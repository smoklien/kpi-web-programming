<?php
$jsonFile = 'records.json';
$recordsData = file_get_contents($jsonFile);
$records = json_decode($recordsData, true);
echo json_encode(['records' => $records ?: []]);
?>