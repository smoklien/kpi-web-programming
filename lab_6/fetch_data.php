<?php
    // header('Content-Type: application/json');

    // $jsonFile = 'content.json';
    // if (file_exists($jsonFile)) {
    //     $data = json_decode(file_get_contents($jsonFile), true);
    //     echo json_encode($data);
    // }

    // $jsonFile = 'content.json';
    // if (file_exists($jsonFile)) {
    //     $jsonData = file_get_contents($jsonFile);
    //     echo $jsonData;
    // }
    // Read data from collapsibles.json file
    $collapsiblesData = file_get_contents('collapsibles.json');
    $contentData = file_get_contents('content.json');

    echo json_encode(['collapsibles' => json_decode($collapsiblesData, true), 'content' => json_decode($contentData, true)]);
?>