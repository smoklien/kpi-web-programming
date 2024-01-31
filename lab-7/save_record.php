<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data) {
        // Extract and validate expected fields
        $id = $data['id'] ?? null;
        $timestamp = $data['timestamp'] ?? null;
        $content = $data['content'] ?? null;

        if ($id && $timestamp && $content) {
            // Process received data
            $unix_timestamp = microtime(true);
            $datetime = new DateTime("@$unix_timestamp");
            $formatted_time = $datetime->format('H:i:s.') . sprintf("%03d", round(($unix_timestamp - floor($unix_timestamp)) * 1000));

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
?>