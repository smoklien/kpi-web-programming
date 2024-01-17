<?php
    // $data = json_decode(file_get_contents("php://input"), true);

    // if ($data) {
    //     if (isset($data['numCollapsibles']) && isset($data['orderArray'])) {
    //         $numCollapsibles = $data['numCollapsibles'];
    //         $orderArray = $data['orderArray'];

    //         // Save data to collapsibles.json file
    //         $jsonData = json_encode(['numCollapsibles' => $numCollapsibles, 'orderArray' => $orderArray]);
    //         file_put_contents('collapsibles.json', $jsonData);

    //         echo json_encode(['success' => true]);
    //     } 
    //     elseif (isset($data['collapsibleIndex']) && isset($data['textContent'])) {
    //         $collapsibleIndex = $data['collapsibleIndex'];
    //         $textContent = $data['textContent'];
    //         $existingContent = file_get_contents('content.json');
    //         $existingData = $existingContent ? json_decode($existingContent, true) : [];
    //         $existingData[] = ['collapsibleIndex' => $collapsibleIndex, 'textContent' => $textContent];

    //         // Save data to content.json file
    //         $jsonData = json_encode($existingData, JSON_PRETTY_PRINT);
    //         file_put_contents('content.json', $jsonData);

    //         echo json_encode(['success' => true]);
    //     } 
    //     else {
    //         echo json_encode(['error' => 'Invalid data format']);
    //     }
    // } 
    // else {
    //     echo json_encode(['error' => 'No data received']);
    // }



    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        if ($data) {
            // Extract and validate expected fields
            $id = $data['id'] ?? null;
            $timestamp = $data['timestamp'] ?? null;
            $content = $data['content'] ?? null;

            if ($id && $timestamp && $content) {
                // Process received data
                $timestamp = microtime(true);
                $datetime = new DateTime("@$timestamp");
                $formatted_time = $datetime->format('H:i:s.') . sprintf("%03d", round(($timestamp - floor($timestamp)) * 1000));

                $newSection = [
                    'id' => $id,
                    'timestamp' => $timestamp,
                    'server_timestamp' => $formatted_time,
                    'content' => $content
                ];

                $jsonFile = 'records.json';
                
                $existingData = [];
                if (file_exists($jsonFile)) {
                    $jsonData = file_get_contents($jsonFile);
                    $existingData = json_decode($jsonData, true);
                }

                $existingData[] = $newSection;

                file_put_contents($jsonFile, json_encode($existingData));
                echo json_encode($newSection);
            } else {
                echo json_encode(['error' => 'Invalid data format']);
            }
        } else {
            echo json_encode(['error' => 'No data received']);
        }
    }





    // if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //     $timestamp = microtime(true);
    //     $datetime = new DateTime("@$timestamp");
    //     $formatted_time = $datetime->format('H:i:s.') . sprintf("%03d", round(($timestamp - floor($timestamp)) * 1000));

    //     $id = $_POST['id'];
    //     $timestamp = $_POST['timestamp'];
    //     $content = $_POST['content'];

    //     $data = [];
    //     $jsonFile = 'data.json';

    //     if (file_exists($jsonFile)) {
    //         $jsonData = file_get_contents($jsonFile);
    //         $data = json_decode($jsonData, true);
    //     }

    //     $newSection = [
    //         'id' => $id,
    //         'timestamp' => $timestamp,
    //         'server_timestamp' => $formatted_time,
    //         'content' => $content
    //     ];

    //     $data[] = $newSection;

    //     file_put_contents($jsonFile, json_encode($data));
    //     echo json_encode($newSection);
    // }
?>