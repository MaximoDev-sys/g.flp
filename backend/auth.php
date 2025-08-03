<?php
require_once 'config.php';

function verificarAutenticacion() {
    // Verificar API Key
    if (!isset($_SERVER['HTTP_X_API_KEY']) || $_SERVER['HTTP_X_API_KEY'] !== API_KEY) {
        http_response_code(403);
        die('Acceso no autorizado: API Key inválida');
    }

    // Verificar token de sesión (puedes usar cookies o headers)
    session_start();
    if (!isset($_SESSION['auth_token']) || !in_array($_SESSION['auth_token'], ALLOWED_TOKENS)) {
        http_response_code(401);
        die('Acceso no autorizado: Sesión inválida');
    }
}

// Función para generar tokens CSRF
function generarTokenCSRF() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Función para validar tokens CSRF
function validarTokenCSRF($token) {
    if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
        http_response_code(403);
        die('Token CSRF inválido');
    }
}
?>