<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $filename = basename($_POST['filename']); 
    $content = $_POST['content'];

    $dir = __DIR__ . '/data';
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true); 
    }

    $filePath = $dir . '/' . $filename;

    if (file_put_contents($filePath, $content) !== false) {
        echo "File saved to data/$filename";
    } else {
        http_response_code(500);
        echo "Failed to save file";
    }
}
?>
