<?php
    $collapsiblesData = file_get_contents('collapsibles.json');
    $contentData = file_get_contents('content.json');

    echo json_encode(['collapsibles' => json_decode($collapsiblesData, true), 'content' => json_decode($contentData, true)]);
?>