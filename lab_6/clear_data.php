<?php
$jsonFile = 'content.json';
$fileHandle = fopen($jsonFile, 'w');

if ($fileHandle) {
    fclose($fileHandle);
    echo json_encode(['success' => true]);
} 
else {
    echo json_encode(['error' => 'Failed to clear data file']);
}
?>