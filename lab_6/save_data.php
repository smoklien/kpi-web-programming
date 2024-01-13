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

            // Save data to content.json file
            $jsonData = json_encode(['collapsibleIndex' => $collapsibleIndex, 'textContent' => $textContent]);
            file_put_contents('content.json', $jsonData, FILE_APPEND | LOCK_EX);

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