<?php
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data) {
        if (isset($data['numCollapsibles']) && isset($data['orderArray'])) {
            $numCollapsibles = $data['numCollapsibles'];
            $orderArray = $data['orderArray'];

            // Save data to collapsibles.json file
            $jsonData = json_encode(['numCollapsibles' => $numCollapsibles, 'orderArray' => $orderArray]);
            file_put_contents('collapsibles.json', $jsonData);

            echo json_encode(['success' => true]);
        } 
        elseif (isset($data['collapsibleIndex']) && isset($data['textContent'])) {
            $collapsibleIndex = $data['collapsibleIndex'];
            $textContent = $data['textContent'];
            $existingContent = file_get_contents('content.json');
            $existingData = $existingContent ? json_decode($existingContent, true) : [];
            $existingData[] = ['collapsibleIndex' => $collapsibleIndex, 'textContent' => $textContent];

            // Save data to content.json file
            $jsonData = json_encode($existingData, JSON_PRETTY_PRINT);
            file_put_contents('content.json', $jsonData);

            echo json_encode(['success' => true]);
        } 
        else {
            echo json_encode(['error' => 'Invalid data format']);
        }
    } 
    else {
        echo json_encode(['error' => 'No data received']);
    }
?>