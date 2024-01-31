<?php
    $jsonFileContent = 'content.json';
    $jsonFileCollapsibles = 'collapsibles.json';

    $fileHandleContent = fopen($jsonFileContent, 'w');
    $fileHandleCollapsibles = fopen($jsonFileCollapsibles, 'w');

    if ($fileHandleContent && $fileHandleCollapsibles) {
        fclose($fileHandleContent);
        fclose($fileHandleCollapsibles);
        echo json_encode(['success' => true]);
    } 
    else {
        echo json_encode(['error' => 'Failed to clear data file']);
    }
?>