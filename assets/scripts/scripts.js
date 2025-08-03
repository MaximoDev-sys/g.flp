        document.addEventListener('DOMContentLoaded', () => {
            const texts = [
                { id: 'text1', delay: 500 },
                { id: 'text2', delay: 1000 },
                { id: 'text3', delay: 1500 },
                { id: 'text4', delay: 2000 },
                { id: 'text5', delay: 2500 },
                { id: 'text6', delay: 3000 }
            ];

            texts.forEach(text => {
                setTimeout(() => {
                    const element = document.getElementById(text.id);
                    element.style.animation = 'slideIn 0.5s ease forwards';
                }, text.delay);
            });

            // Mostrar botón después de que terminen las animaciones
            setTimeout(() => {
                document.getElementById('continueBtn').style.display = 'block';
                document.getElementById('continueBtn').style.animation = 'slideIn 0.5s ease forwards';
            }, 3500);

            // Evento del botón Continuar
            document.getElementById('continueBtn').addEventListener('click', () => {
                document.getElementById('loadingContainer').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loadingContainer').style.display = 'none';
                    document.getElementById('mainContent').style.display = 'block';
                    setTimeout(() => {
                        document.getElementById('mainContent').style.opacity = '1';
                    }, 100);
                    
                    // Iniciar particles.js
                    particlesJS('particles-js', {
                        "particles": {
                            "number": {
                                "value": 80,
                                "density": {
                                    "enable": true,
                                    "value_area": 800
                                }
                            },
                            "color": {
                                "value": "#7289da"
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#000000"
                                },
                                "polygon": {
                                    "nb_sides": 5
                                }
                            },
                            "opacity": {
                                "value": 0.5,
                                "random": false,
                                "anim": {
                                    "enable": false,
                                    "speed": 1,
                                    "opacity_min": 0.1,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 3,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 40,
                                    "size_min": 0.1,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 150,
                                "color": "#7289da",
                                "opacity": 0.4,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": 6,
                                "direction": "none",
                                "random": false,
                                "straight": false,
                                "out_mode": "out",
                                "bounce": false,
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 1200
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "grab"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "push"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 140,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 400,
                                    "size": 40,
                                    "duration": 2,
                                    "opacity": 8,
                                    "speed": 3
                                },
                                "repulse": {
                                    "distance": 200,
                                    "duration": 0.4
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true
                    });

                    // Iniciar música
                    const music = document.getElementById('backgroundMusic');
                    const playPauseBtn = document.getElementById('playPauseBtn');
                    const volumeControl = document.getElementById('volumeControl');

                    // Intentar reproducir automáticamente (puede ser bloqueado por el navegador)
                    music.volume = 0.5;
                    const playPromise = music.play();

                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("Reproducción automática prevenida. Mostrando controles.");
                            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                        });
                    }

                    // Controles de audio
                    playPauseBtn.addEventListener('click', () => {
                        if (music.paused) {
                            music.play();
                            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        } else {
                            music.pause();
                            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                        }
                    });

                    volumeControl.addEventListener('input', () => {
                        music.volume = volumeControl.value;
                    });

                    // Actualizar icono según el estado de la música
                    music.addEventListener('play', () => {
                        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    });

                    music.addEventListener('pause', () => {
                        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                    });

                }, 500);
            });
        });

        // Cargar perfiles de Discord
        document.addEventListener('DOMContentLoaded', () => {
            // Lista de perfiles (puedes modificar las IDs y los identificadores HTML a gusto)
            const profiles = [
                { id: "837149144476155905", imgId: "img1", usernameId: "username1", decorId: "deco_us1" },
                { id: "941757673441988671", imgId: "img2", usernameId: "username2", decorId: "deco_us2" },
                { id: "1215022068991660054", imgId: "img3", usernameId: "username3", decorId: "deco_us3" }
            ];

            profiles.forEach(profile => {
                const apiUrl = `https://discord-lookup-api-alpha.vercel.app/v1/user/${profile.id}`;

                const profilePicture = document.getElementById(profile.imgId);
                const usernameText = document.getElementById(profile.usernameId);
                const avatarFrame = document.getElementById(profile.decorId);

                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(`API Response for ID ${profile.id}:`, data);

                        // Set avatar
                        const avatarUrl = data.avatar ? `${data.avatar.link}?size=1024` : './assets/pfp/default.jpg';
                        if (profilePicture) {
                            profilePicture.src = avatarUrl;
                        }

                        // Mostrar nombre de usuario + tag
                        if (usernameText) {
                            const tag = data.discriminator && data.discriminator !== "0" ? `#${data.discriminator}` : "";
                            usernameText.textContent = `${data.username}${tag}`;
                        }
                        // Set avatar frame if available
                        if (data.avatar_decoration && data.avatar_decoration.asset) {
                            const asset = data.avatar_decoration.asset;
                            const frameUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=1024&passthrough=true`;
                            avatarFrame.src = frameUrl;
                            avatarFrame.classList.add('show');
                        } else {
                            console.warn("No avatar frame asset found.");
                        }
                    })
                    .catch(error => {
                        console.error(`Error fetching user data for ID ${profile.id}:`, error);
                    });
            });
        });