<?php
/**
 * S-OIL media upload handler — deploy to soil-media.osamaqaseem.online/upload.php
 * Ensure /uploads/ exists alongside this file and is writable.
 */
set_time_limit(300);
ini_set('memory_limit', '512M');
ini_set('max_execution_time', 300);

$base_url = 'https://soil-media.osamaqaseem.online';

$max_file_size = 10 * 1024 * 1024;
ini_set('upload_max_filesize', '10M');
ini_set('post_max_size', '10M');

$allowed_origins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:4000',
    'https://s-oil-corporate-api.vercel.app',
    'https://s-oil-corporate-dashboard.vercel.app',
    'https://s-oil-corporate.vercel.app',
    'https://soil-media.osamaqaseem.online',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} elseif (strpos($origin, 'localhost') !== false || strpos($origin, '127.0.0.1') !== false) {
    header('Access-Control-Allow-Origin: ' . $origin);
} elseif (preg_match('#^https://[\w.-]+\.vercel\.app$#', $origin)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: ' . $base_url);
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

$allowed_image_types = [
    'image/jpeg', 'image/jpg', 'image/pjpeg', 'image/png', 'image/gif',
    'image/webp', 'image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence',
];

$allowed_document_types = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain', 'text/csv', 'application/csv',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/zip', 'application/x-zip-compressed',
];

$allowed_image_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif'];
$allowed_document_extensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'csv', 'odt', 'ods', 'zip'];

$blocked_extensions = [
    'php', 'php3', 'php4', 'php5', 'phtml', 'phar',
    'exe', 'bat', 'cmd', 'com', 'msi', 'scr',
    'sh', 'bash', 'zsh',
    'js', 'mjs', 'jsx', 'ts', 'tsx',
    'html', 'htm', 'xhtml', 'svg',
    'asp', 'aspx', 'jsp', 'cgi', 'pl',
];

function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

function sendError($message, $statusCode = 400) {
    sendResponse(['success' => false, 'message' => $message], $statusCode);
}

function sendSuccess($data) {
    sendResponse(['success' => true, 'message' => 'File uploaded successfully', 'data' => $data]);
}

function normalizeExtension($ext) {
    $ext = strtolower(trim((string) $ext));
    return preg_replace('/[^a-z0-9]/', '', $ext);
}

function isHeicFile($path) {
    $fh = @fopen($path, 'rb');
    if (!$fh) return false;
    $header = fread($fh, 32);
    fclose($fh);
    if ($header === false || strlen($header) < 12) return false;
    if (substr($header, 4, 4) !== 'ftyp') return false;
    $brands = strtolower(substr($header, 8));
    foreach (['heic', 'heif', 'heix', 'hevc', 'hevx', 'mif1', 'msf1', 'heim', 'heis'] as $b) {
        if (strpos($brands, $b) !== false) return true;
    }
    return false;
}

function detectMime($path, $clientType) {
    $mime = '';
    if (class_exists('finfo')) {
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = (string) ($finfo->file($path) ?: '');
    }
    if ($mime === '' || $mime === 'application/octet-stream') {
        $clientType = strtolower(trim((string) $clientType));
        if ($clientType !== '') $mime = $clientType;
    }
    if (isHeicFile($path)) return 'image/heic';
    return strtolower(trim($mime));
}

function fileCategory($ext) {
    $ext = normalizeExtension($ext);
    if ($ext === 'jpeg') $ext = 'jpg';
    return in_array($ext, ['jpg', 'png', 'gif', 'webp', 'heic', 'heif'], true) ? 'image' : 'document';
}

function resolveExtension($ext, $mime, $tmpPath) {
    $ext = normalizeExtension($ext);
    if ($ext === 'jpeg') $ext = 'jpg';

    $mimeToExt = [
        'image/jpeg' => 'jpg', 'image/jpg' => 'jpg', 'image/pjpeg' => 'jpg',
        'image/png' => 'png', 'image/gif' => 'gif', 'image/webp' => 'webp',
        'image/heic' => 'heic', 'image/heif' => 'heif',
        'application/pdf' => 'pdf',
        'application/msword' => 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
        'application/vnd.ms-excel' => 'xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xlsx',
        'text/plain' => 'txt', 'text/csv' => 'csv', 'application/csv' => 'csv',
        'application/vnd.oasis.opendocument.text' => 'odt',
        'application/vnd.oasis.opendocument.spreadsheet' => 'ods',
        'application/zip' => 'zip', 'application/x-zip-compressed' => 'zip',
    ];

    $allowed = array_merge(
        ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif'],
        ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'csv', 'odt', 'ods', 'zip']
    );

    if ($ext !== '' && in_array($ext, $allowed, true)) {
        return $ext === 'jpeg' ? 'jpg' : $ext;
    }
    if (isset($mimeToExt[$mime])) return $mimeToExt[$mime];
    if (isHeicFile($tmpPath)) return 'heic';
    if (strpos($mime, 'image/') === 0) return 'jpg';
    return '';
}

function isAllowedUpload($ext, $mime, $tmpPath) {
    global $allowed_image_extensions, $allowed_document_extensions, $allowed_image_types, $allowed_document_types;

    $ext = normalizeExtension($ext);
    if ($ext === 'jpeg') $ext = 'jpg';

    if (in_array($ext, $allowed_image_extensions, true) || in_array($ext, $allowed_document_extensions, true)) {
        return true;
    }
    if (isHeicFile($tmpPath)) return true;
    if (in_array($mime, $allowed_image_types, true) || in_array($mime, $allowed_document_types, true)) {
        return true;
    }
    if (strpos($mime, 'image/') === 0) return true;
    return false;
}

if (!isset($_FILES['file'])) {
    sendError('No file uploaded');
}

$file = $_FILES['file'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    $error_messages = [
        UPLOAD_ERR_INI_SIZE => 'File exceeds upload_max_filesize directive',
        UPLOAD_ERR_FORM_SIZE => 'File exceeds MAX_FILE_SIZE directive',
        UPLOAD_ERR_PARTIAL => 'File was only partially uploaded',
        UPLOAD_ERR_NO_FILE => 'No file was uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
        UPLOAD_ERR_EXTENSION => 'File upload stopped by extension',
    ];
    sendError($error_messages[$file['error']] ?? 'Unknown upload error', 400);
}

if ($file['size'] > $max_file_size) {
    sendError('File too large. Maximum size is 10MB.');
}

$originalExt = pathinfo($file['name'], PATHINFO_EXTENSION);
$mime = detectMime($file['tmp_name'], $file['type'] ?? '');

if (in_array(normalizeExtension($originalExt), $blocked_extensions, true)) {
    sendError('This file type is not allowed for security reasons.');
}

if (!isAllowedUpload($originalExt, $mime, $file['tmp_name'])) {
    sendError('Invalid file type. Allowed: images (JPG, PNG, GIF, WEBP, HEIC) and documents (PDF, DOC, DOCX, XLS, XLSX, TXT, CSV, ODT, ODS, ZIP).');
}

$ext = resolveExtension($originalExt, $mime, $file['tmp_name']);
if ($ext === '') {
    sendError('Could not determine a valid file extension.');
}

$upload_dir = __DIR__ . '/uploads/';

if (!file_exists($upload_dir) && !mkdir($upload_dir, 0755, true)) {
    sendError('Failed to create upload directory', 500);
}

if (!is_writable($upload_dir)) {
    sendError('Upload directory is not writable', 500);
}

$uniqueName = time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
$target = $upload_dir . $uniqueName;

if (!move_uploaded_file($file['tmp_name'], $target)) {
    sendError('Failed to upload file. Please try again.');
}

if (!file_exists($target) || !is_readable($target)) {
    sendError('File upload verification failed', 500);
}

$fileUrl = rtrim($base_url, '/') . '/uploads/' . $uniqueName;

sendSuccess([
    'url' => $fileUrl,
    'filename' => $uniqueName,
    'original_name' => $file['name'],
    'size' => $file['size'],
    'mimetype' => $mime !== '' ? $mime : ($file['type'] ?? 'application/octet-stream'),
    'category' => fileCategory($ext),
    'extension' => $ext,
]);
