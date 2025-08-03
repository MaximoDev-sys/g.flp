<?php
if ($_SERVER['HTTP_REFERER'] !== 'https://losciruja.life/index.html') {
    http_response_code(403);
    exit('Acceso denegado');
}

header("Content-Type: application/javascript");
readfile(__DIR__ . "/assets/scripts/scripts.js");
