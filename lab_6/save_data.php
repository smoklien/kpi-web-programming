<?php

// version 2

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $title = $_POST['title'];
//     $content = $_POST['content'];

//     $data = [];
//     $jsonFile = 'sections.json';

//     if (file_exists($jsonFile)) {
//         $jsonData = file_get_contents($jsonFile);
//         $data = json_decode($jsonData, true);
//     }

//     $newSection = [
//         'title' => $title,
//         'content' => $content,
//     ];

//     $data[] = $newSection;

//     file_put_contents($jsonFile, json_encode($data));
//     echo json_encode($newSection);
// }


// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //$jsonFile = 'data.json';
    
    $data = json_decode(file_get_contents("php://input"), true);

    // $belData = [];
    // if (file_exists($jsonFile)) {
    //     $belData = json_decode(file_get_contents($jsonFile), true);
    // }

    if ($data) {
        if (isset($data['numCollapsibles']) && isset($data['orderArray'])) {
            $numCollapsibles = $data['numCollapsibles'];
            $orderArray = $data['orderArray'];

            // Save data to data.json file
            $jsonData = json_encode(['numCollapsibles' => $numCollapsibles, 'orderArray' => $orderArray]);
            file_put_contents('collapsibles.json', $jsonData);

            echo json_encode(['success' => true]);
        } 
        elseif (isset($data['content'])) {
            $contentData = $data['content'];

            $collapsibleIndex = $contentData['collapsibleIndex'];
            $textContent = $contentData['textContent'];

            $contentJsonData = json_encode(['collapsibleIndex' => $collapsibleIndex, 'textContent' => $textContent]);
            file_put_contents('content.json', $contentJsonData);

            echo json_encode(['success' => true]);
        } 
        else {
            echo json_encode(['error' => 'Invalid data format']);
        }
    } 
    else {
        echo json_encode(['error' => 'No data received']);
    }


    //file_put_contents($jsonFile, json_encode($data));
//}
?>