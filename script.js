document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DE NAVEGAÇÃO E OVERLAYS ---
    const btnHome = document.getElementById('btn-home');
    const janelaSobre = document.getElementById('sobre-window');
    const telaContatos = document.getElementById('contatos-window');
    const projetosWindow = document.getElementById('projetos-window');
    const overlayCert = document.getElementById('overlay-certificados');
    const polaroidCards = document.querySelectorAll('.polaroid-card');

    let fullMatrixTimer = null;

    // --- FUNÇÃO CENTRALIZADA PARA FECHAR OVERLAYS ---
    function closeAllOverlays() {
        if (janelaSobre) janelaSobre.classList.add('d-none');
        if (telaContatos) telaContatos.classList.add('d-none');
        if (projetosWindow) {
            projetosWindow.classList.add('d-none');
            polaroidCards.forEach(card => card.classList.remove('show'));
        }
        if (overlayCert) overlayCert.classList.add('d-none');
        if (fullMatrixTimer) {
            clearInterval(fullMatrixTimer);
            fullMatrixTimer = null;
        }
    }

    if (btnHome) {
        btnHome.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllOverlays();
        });
    }

    // --- 1. RELÓGIO DA BARRA DE TAREFAS (WINDOWS XP) ---
    function initClock() {
        const clockEl = document.getElementById('xp-clock');
        if (!clockEl) return;
        
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            clockEl.textContent = `${hours}:${minutes}`;
        }
        setInterval(updateClock, 1000);
        updateClock();
    }
    initClock();

    // --- 2. ENGINE DA ANIMAÇÃO MATRIX (MINI & FULLSCREEN) ---
    const charsBinary = "01".split('');
    const charsMulti = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";

    function setupMatrixCanvas(canvasId, isFullscreen) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            if (isFullscreen) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            } else {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width || (canvas.parentElement ? canvas.parentElement.offsetWidth : 120);
                canvas.height = rect.height || 32;
            }
        }

        resizeCanvas();

        const fontSize = isFullscreen ? 18 : 10;
        let columns = Math.floor(canvas.width / fontSize) || 1;
        let drops = Array(columns).fill(1);
        let currentChars = charsBinary;
        let density = 0.95;

        return {
            draw() {
                ctx.fillStyle = isFullscreen ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.3)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#0F0';
                ctx.font = `${fontSize}px monospace`;

                for (let i = 0; i < drops.length; i++) {
                    if (Math.random() > density) {
                        const text = currentChars[Math.floor(Math.random() * currentChars.length)];
                        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                            drops[i] = 0;
                        }
                        drops[i]++;
                    }
                }
            },
            setMode(chars, newDensity) {
                currentChars = chars;
                density = newDensity;
            },
            resize() {
                resizeCanvas();
                columns = Math.floor(canvas.width / fontSize) || 1;
                drops = Array(columns).fill(1);
            }
        };
    }

    const matrixMini = setupMatrixCanvas('matrix-mini', false);
    const matrixFull = setupMatrixCanvas('matrix-full', true);

    if (matrixMini) setInterval(() => matrixMini.draw(), 50);

    const btnCert = document.getElementById('btn-certificados');
    const btnFecharCert = document.getElementById('btn-fechar');

    if (btnCert && matrixMini) {
        btnCert.addEventListener('mouseenter', () => matrixMini.setMode(charsMulti, 0.8));
        btnCert.addEventListener('mouseleave', () => matrixMini.setMode(charsBinary, 0.95));

        btnCert.addEventListener('click', (e) => {
            e.preventDefault();
            if (overlayCert) overlayCert.classList.remove('d-none');
            if (matrixFull) {
                matrixFull.resize();
                matrixFull.setMode(charsMulti, 0.1);
                if (!fullMatrixTimer) fullMatrixTimer = setInterval(() => matrixFull.draw(), 30);
            }
        });
    }

    if (btnFecharCert) btnFecharCert.addEventListener('click', closeAllOverlays);

    // --- 3. JANELA WINDOWS XP (SOBRE MIM) ---
    const btnSobre = document.getElementById('btn-sobre');
    const conteudoSobre = document.getElementById('xp-window-body');
    const mouseFalso = document.getElementById('fake-mouse');
    const btnFecharSobre = document.getElementById('btn-fechar-sobre');

    if (btnSobre && janelaSobre && conteudoSobre && mouseFalso) {
        btnSobre.addEventListener('click', (e) => {
            e.preventDefault();
            janelaSobre.style.width = '10vw';
            janelaSobre.style.height = '10vh';
            conteudoSobre.style.opacity = '0';

            janelaSobre.classList.remove('d-none');
            mouseFalso.classList.remove('d-none');
            mouseFalso.style.left = '100vw';
            mouseFalso.style.top = '100vh';

            setTimeout(() => {
                mouseFalso.style.left = '30vw';
                mouseFalso.style.top = '30vh';
            }, 100);

            setTimeout(() => {
                janelaSobre.style.width = '60vw';
                janelaSobre.style.height = '60vh';
                mouseFalso.style.left = '80vw';
                mouseFalso.style.top = '80vh';
            }, 1200);

            setTimeout(() => {
                conteudoSobre.style.opacity = '1';
                mouseFalso.style.opacity = '0';
            }, 2200);

            setTimeout(() => {
                mouseFalso.classList.add('d-none');
                mouseFalso.style.opacity = '1';
            }, 2800);
        });
    }

    if (btnFecharSobre) btnFecharSobre.addEventListener('click', closeAllOverlays);

    // --- 4. CONTATOS (TV CRT + CHROMA KEY DE ALTA PRECISÃO NO CANVAS) ---
    const tvVideo = document.getElementById('tv-video');
    const tvCanvas = document.getElementById('tv-canvas');
    const iconeAudio = document.getElementById('hover-audio-icon');
    const somTelefone = document.getElementById('phone-ring-sound');
    const btnContatos = document.getElementById('btn-contatos');
    const p3Menu = document.querySelector('.p3-menu');

    if (tvVideo && tvCanvas) {
        const ctx = tvCanvas.getContext('2d', { willReadFrequently: true });

        function processTVFrame() {
            if (!tvVideo.paused && !tvVideo.ended) {
                if (tvCanvas.width !== tvVideo.videoWidth && tvVideo.videoWidth > 0) {
                    tvCanvas.width = tvVideo.videoWidth;
                    tvCanvas.height = tvVideo.videoHeight;
                }

                if (tvCanvas.width > 0) {
                    ctx.drawImage(tvVideo, 0, 0, tvCanvas.width, tvCanvas.height);
                    const frame = ctx.getImageData(0, 0, tvCanvas.width, tvCanvas.height);
                    const data = frame.data;
                    const len = data.length;

                    for (let i = 0; i < len; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];

                        const maxC = Math.max(r, g, b);
                        const minC = Math.min(r, g, b);
                        const diff = maxC - minC;

                        // O fundo do vídeo é branco neutro (> 238 e pouca variação de cor)
                        if (minC > 238 && diff < 12) {
                            data[i + 3] = 0; // Transparência total
                        } else if (minC > 215 && diff < 15) {
                            // Suavização progressiva para evitar rebordos denteados
                            const alphaRatio = (238 - minC) / (238 - 215);
                            data[i + 3] = Math.floor(alphaRatio * 255);
                        }
                    }
                    ctx.putImageData(frame, 0, 0);
                }
            }
            requestAnimationFrame(processTVFrame);
        }

        tvVideo.addEventListener('play', () => {
            requestAnimationFrame(processTVFrame);
        });
    }

    if (iconeAudio && somTelefone) {
        iconeAudio.addEventListener('mouseenter', () => {
            somTelefone.currentTime = 0;
            somTelefone.play().catch(() => {});
        });
        iconeAudio.addEventListener('mouseleave', () => somTelefone.pause());
    }

    if (btnContatos && telaContatos && p3Menu) {
        btnContatos.addEventListener('click', (e) => {
            e.preventDefault();
            telaContatos.classList.remove('d-none');

            // Reinicia a animação Persona 3
            p3Menu.classList.remove('p3-menu');
            void p3Menu.offsetWidth;
            p3Menu.classList.add('p3-menu');

            if (tvVideo) {
                tvVideo.play().catch(() => {});
            }
        });
    }

    // --- 5. GALERIA DE PROJETOS (CÂMERA, FLASH & POLAROID) ---
    const btnProjetos = document.getElementById('btn-projetos');
    const cameraContainer = document.getElementById('camera-container');
    const flashOverlay = document.getElementById('flash-overlay');
    const btnFecharProjetos = document.getElementById('btn-fechar-projetos');

    if (btnProjetos && cameraContainer && flashOverlay && projetosWindow) {
        btnProjetos.addEventListener('click', (e) => {
            e.preventDefault();
            cameraContainer.style.top = '0px';

            setTimeout(() => { flashOverlay.style.opacity = '1'; }, 700);

            setTimeout(() => {
                cameraContainer.style.top = '-300px';
                projetosWindow.classList.remove('d-none');
                flashOverlay.style.opacity = '0';

                polaroidCards.forEach((card, index) => {
                    card.classList.remove('show');
                    setTimeout(() => { card.classList.add('show'); }, index * 250);
                });
            }, 850);
        });
    }

    if (btnFecharProjetos) btnFecharProjetos.addEventListener('click', closeAllOverlays);

    // --- 6. EVENTOS GLOBAIS DE FECHAMENTO ---
    [telaContatos, projetosWindow, overlayCert].forEach(overlay => {
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeAllOverlays();
            });
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllOverlays();
    });

    window.addEventListener('resize', () => {
        if (matrixMini) matrixMini.resize();
        if (matrixFull && overlayCert && !overlayCert.classList.contains('d-none')) {
            matrixFull.resize();
        }
    });
});