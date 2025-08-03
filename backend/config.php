<?php
// Configuración de seguridad
header("X-Frame-Options: DENY");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection: 1; mode=block");

// Configuración de la aplicación
define('API_KEY', 'tu_clave_secreta_123');
define('ALLOWED_TOKENS', ['token_valido_1', 'token_valido_2']);
define('SCRIPT_DIR', __DIR__ . '/../protected_scripts');
?>