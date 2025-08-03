<?php
require_once 'auth.php';
require_once 'config.php';

verificarAutenticacion();

// Validar parámetros
$scriptName = filter_input(INPUT_GET, 'script', FILTER_SANITIZE_STRING);
if (!$scriptName || !preg_match('/^[a-zA-Z0-9_-]+\.js$/', $scriptName)) {
    http_response_code(400);
    die('Nombre de script inválido');
}

// Ruta segura al script
$scriptPath = realpath(SCRIPT_DIR . $scriptName);
if (!$scriptPath || strpos($scriptPath, realpath(SCRIPT_DIR)) !== 0) {
    http_response_code(404);
    die('Script no encontrado');
}

// Verificar que el archivo existe y es legible
if (!is_file($scriptPath)) {
    http_response_code(404);
    die('Script no encontrado');
}

// Enviar el script con los headers adecuados
header('Content-Type: application/javascript');
header('Content-Length: ' . filesize($scriptPath));
header('Cache-Control: private, max-age=3600');

// Opcional: puedes ofuscar el código al vuelo aquí
readfile($scriptPath);
?>