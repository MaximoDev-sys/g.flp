async function cargarScriptProtegido(nombreScript) {
        try {
            const response = await fetch(`/backend/get_script.php?script=${nombreScript}`, {
                headers: {
                    'X-API-Key': 'tu_clave_secreta_123',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Error al cargar el script');
            }
            
            const scriptCode = await response.text();
            const script = document.createElement('script');
            script.text = scriptCode;
            document.body.appendChild(script);
            
        } catch (error) {
            console.error('Error:', error);
            // Manejo de errores
        }
    }
    
    // Ejemplo de uso
    document.addEventListener('DOMContentLoaded', () => {
        cargarScriptProtegido('scripts.js');
    });