<?php
    $jsonFile = 'records.json';
    $recordsData = file_get_contents($jsonFile);
    echo json_encode(['records' => json_decode($recordsData, true)]);
?>