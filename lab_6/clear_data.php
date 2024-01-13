<?php
$jsonFile = 'content.json';
$fileHandle = fopen($dataFilePath, 'w');

if ($jsonFile) {
    fclose($jsonFile);
    echo json_encode(['success' => true]);
} 
else {
    echo json_encode(['error' => 'Failed to clear data file']);
}
?>