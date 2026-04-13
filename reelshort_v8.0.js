// ==UserScript==
// @name         ReelShort CineKumaribo
// @namespace    https://viayoo.com/
// @version      8.0
// @description  CineKumaribo
// @match        https://www.reelshort.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let lastM3U8 = null;
    let savedTime = 0;

    // ===== ESTILOS =====
    function injectStyles() {
        if (document.getElementById('ck-styles')) return;
        const style = document.createElement('style');
        style.id = 'ck-styles';
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

            #ck-backdrop {
                position: fixed; inset: 0;
                background: rgba(0,0,0,0.72);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                z-index: 99990;
                animation: ck-fadein 0.25s ease;
            }
            @keyframes ck-fadein { from { opacity:0 } to { opacity:1 } }
            @keyframes ck-slidein {
                from { opacity:0; transform: translate(-50%,-48%) scale(0.96) }
                to   { opacity:1; transform: translate(-50%,-50%) scale(1) }
            }

            #player-box {
                position: fixed;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                width: min(390px, 95vw);
                z-index: 99999;
                background: #0d0d14;
                border-radius: 20px;
                overflow: hidden;
                box-shadow:
                    0 0 0 1px rgba(255,255,255,0.06),
                    0 24px 60px rgba(0,0,0,0.85),
                    0 0 80px rgba(99,102,241,0.08);
                font-family: 'Inter', sans-serif;
                animation: ck-slidein 0.28s cubic-bezier(.22,.68,0,1.2);
            }

            /* ── Cabecera ── */
            #ck-titlebar {
                display: flex; align-items: center;
                justify-content: space-between;
                padding: 13px 16px 11px;
                background: linear-gradient(180deg, rgba(99,102,241,0.12) 0%, transparent 100%);
                border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            #ck-title-left {
                display: flex; align-items: center; gap: 9px;
            }
            #ck-logo {
                width: 28px; height: 28px; border-radius: 8px;
                background: linear-gradient(135deg,#6366f1,#818cf8);
                display: flex; align-items: center; justify-content: center;
                font-size: 14px; flex-shrink: 0;
                box-shadow: 0 2px 10px rgba(99,102,241,0.45);
            }
            #ck-title-text {
                display: flex; flex-direction: column; gap: 1px;
            }
            #ck-title-text strong {
                color: #fff; font-size: 13px;
                font-weight: 700; letter-spacing: 0.3px;
                line-height: 1;
            }
            #ck-title-text span {
                color: rgba(255,255,255,0.35);
                font-size: 10px; font-weight: 400; line-height: 1;
            }
            #ck-close {
                background: rgba(255,255,255,0.07);
                color: rgba(255,255,255,0.6); border: none;
                border-radius: 50%; width: 28px; height: 28px;
                cursor: pointer; font-size: 13px;
                display: flex; align-items: center; justify-content: center;
                transition: background 0.2s, color 0.2s;
                flex-shrink: 0;
            }
            #ck-close:hover {
                background: rgba(239,68,68,0.75); color: #fff;
            }

            /* ── Video ── */
            #ck-video-wrap {
                position: relative; background: #000;
                cursor: pointer;
            }
            #m3u8-player {
                width: 100%; display: block;
                max-height: 460px; background: #000;
            }
            /* Overlay de play/pausa al tocar el video */
            #ck-tap-overlay {
                position: absolute; inset: 0;
                display: flex; align-items: center; justify-content: center;
                pointer-events: none; opacity: 0;
                transition: opacity 0.15s;
            }
            #ck-tap-overlay.show { opacity: 1; }
            #ck-tap-icon {
                width: 52px; height: 52px; border-radius: 50%;
                background: rgba(0,0,0,0.55);
                backdrop-filter: blur(4px);
                display: flex; align-items: center; justify-content: center;
                font-size: 22px; color: #fff;
            }

            /* ── Progreso ── */
            #ck-progress-section {
                padding: 14px 18px 6px;
                background: #0d0d14;
            }
            #ck-progress-track {
                position: relative; height: 4px;
                background: rgba(255,255,255,0.1);
                border-radius: 4px; cursor: pointer;
            }
            #ck-progress-fill {
                position: absolute; left: 0; top: 0; height: 100%;
                background: linear-gradient(90deg, #6366f1, #818cf8);
                border-radius: 4px; pointer-events: none;
                transition: width 0.1s linear;
            }
            #ck-progress-thumb {
                position: absolute; top: 50%;
                width: 14px; height: 14px; border-radius: 50%;
                background: #818cf8;
                box-shadow: 0 0 8px rgba(129,140,248,0.7);
                transform: translate(-50%, -50%);
                pointer-events: none;
                transition: left 0.1s linear;
            }
            #ck-time-row {
                display: flex; justify-content: space-between;
                margin-top: 7px;
                color: rgba(255,255,255,0.28); font-size: 10px;
            }

            /* ── Info inferior ── */
            #ck-info {
                display: flex; align-items: center;
                justify-content: space-between;
                padding: 10px 18px 14px;
                background: #0d0d14;
            }
            #ck-info-left {
                display: flex; align-items: center; gap: 7px;
                min-width: 0;
            }
            #ck-dot {
                width: 7px; height: 7px; border-radius: 50%;
                background: #4ade80;
                box-shadow: 0 0 7px rgba(74,222,128,0.8);
                animation: ck-pulse 1.8s infinite; flex-shrink: 0;
            }
            @keyframes ck-pulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
            #ck-label {
                color: rgba(255,255,255,0.28); font-size: 10px;
                white-space: nowrap; overflow: hidden;
                text-overflow: ellipsis; max-width: 220px;
            }
            #ck-vol-wrap {
                display: flex; align-items: center; gap: 6px; flex-shrink: 0;
            }
            #ck-vol-icon {
                color: rgba(255,255,255,0.35); font-size: 13px; cursor: pointer;
                transition: color 0.2s;
            }
            #ck-vol-icon:hover { color: #fff; }
            #ck-vol-slider {
                width: 60px; height: 3px;
                -webkit-appearance: none; appearance: none;
                background: rgba(255,255,255,0.12);
                border-radius: 3px; outline: none; cursor: pointer;
            }
            #ck-vol-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 11px; height: 11px;
                border-radius: 50%; background: #818cf8; cursor: pointer;
            }

            /* ── Botón PLAY flotante ── */
            #m3u8-btn {
                position: fixed; bottom: 22px; right: 22px;
                z-index: 99999; padding: 11px 20px;
                background: linear-gradient(135deg, #6366f1, #4f46e5);
                color: white; border: none; border-radius: 12px;
                font-size: 14px; font-weight: 700; cursor: pointer;
                box-shadow: 0 4px 18px rgba(99,102,241,0.55);
                transition: transform 0.15s, box-shadow 0.15s;
                letter-spacing: 0.4px;
                font-family: 'Inter', sans-serif;
            }
            #m3u8-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 7px 24px rgba(99,102,241,0.75);
            }
            #m3u8-btn:active { transform: scale(0.96); }
        `;
        document.head.appendChild(style);
    }

    // ===== SET M3U8 =====
    function setM3U8(url) {
        if (!url || url === lastM3U8) return;
        lastM3U8 = url;
        savedTime = 0; // nuevo episodio = reiniciar tiempo guardado
        console.log("✅ video_url:", url);
        createUI();
        const player = document.getElementById("m3u8-player");
        if (player) {
            player.src = url;
            player.currentTime = 0;
            player.play();
            actualizarLabel(url);
        }
    }

    // ===== CREAR BOTÓN =====
    function createUI() {
        if (document.getElementById("m3u8-btn")) return;
        injectStyles();
        const btn = document.createElement("button");
        btn.id = "m3u8-btn";
        btn.innerText = "▶ PLAY";
        btn.onclick = openPlayer;
        document.body.appendChild(btn);
    }

    function actualizarLabel(url) {
        const label = document.getElementById("ck-label");
        if (label) label.textContent = url.split("/").pop().split("?")[0];
    }

    // ===== CERRAR =====
    function closePlayer() {
        const video = document.getElementById("m3u8-player");
        if (video) savedTime = video.currentTime; // guardar posición
        document.getElementById("player-box")?.remove();
        document.getElementById("ck-backdrop")?.remove();
    }

    // ===== PROGRESS DRAG =====
    function setupProgressDrag(track, video) {
        function calcTime(e) {
            const rect = track.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            return pct * video.duration;
        }
        let dragging = false;
        track.addEventListener("mousedown",  e => { dragging = true; video.currentTime = calcTime(e); });
        track.addEventListener("touchstart", e => { dragging = true; video.currentTime = calcTime(e); }, {passive:true});
        document.addEventListener("mousemove",  e => { if (dragging) video.currentTime = calcTime(e); });
        document.addEventListener("touchmove",  e => { if (dragging) video.currentTime = calcTime(e); }, {passive:true});
        document.addEventListener("mouseup",  () => { dragging = false; });
        document.addEventListener("touchend", () => { dragging = false; });
    }

    // ===== ABRIR PLAYER =====
    function openPlayer() {
        if (!lastM3U8) return alert("No hay video aún");
        injectStyles();

        // Backdrop
        if (!document.getElementById("ck-backdrop")) {
            const backdrop = document.createElement("div");
            backdrop.id = "ck-backdrop";
            backdrop.onclick = closePlayer;
            document.body.appendChild(backdrop);
        }

        // Si ya está abierto → reanudar / no hacer nada más
        if (document.getElementById("player-box")) return;

        // ── Contenedor ──
        const box = document.createElement("div");
        box.id = "player-box";
        box.onclick = e => e.stopPropagation();

        // ── Titlebar ──
        const titlebar = document.createElement("div");
        titlebar.id = "ck-titlebar";

        const titleLeft = document.createElement("div");
        titleLeft.id = "ck-title-left";

        const logo = document.createElement("div");
        logo.id = "ck-logo";
        logo.textContent = "🎬";

        const titleText = document.createElement("div");
        titleText.id = "ck-title-text";
        titleText.innerHTML = `<strong>CineKumaribo</strong><span>ReelShort Player</span>`;

        titleLeft.appendChild(logo);
        titleLeft.appendChild(titleText);

        const closeBtn = document.createElement("button");
        closeBtn.id = "ck-close";
        closeBtn.innerHTML = "✕";
        closeBtn.onclick = closePlayer;

        titlebar.appendChild(titleLeft);
        titlebar.appendChild(closeBtn);

        // ── Video ──
        const videoWrap = document.createElement("div");
        videoWrap.id = "ck-video-wrap";

        const video = document.createElement("video");
        video.id = "m3u8-player";
        video.src = lastM3U8;

        // Tap overlay (feedback visual al tocar el video)
        const tapOverlay = document.createElement("div");
        tapOverlay.id = "ck-tap-overlay";
        const tapIcon = document.createElement("div");
        tapIcon.id = "ck-tap-icon";
        tapIcon.textContent = "⏸";
        tapOverlay.appendChild(tapIcon);

        videoWrap.appendChild(video);
        videoWrap.appendChild(tapOverlay);

        // Click en video = play/pausa con feedback
        videoWrap.onclick = () => {
            if (video.paused) { video.play(); tapIcon.textContent = "▶"; }
            else              { video.pause(); tapIcon.textContent = "⏸"; }
            tapOverlay.classList.add("show");
            setTimeout(() => tapOverlay.classList.remove("show"), 600);
        };

        // ── Progreso ──
        const progressSection = document.createElement("div");
        progressSection.id = "ck-progress-section";

        const track = document.createElement("div");
        track.id = "ck-progress-track";
        const fill = document.createElement("div");
        fill.id = "ck-progress-fill";
        fill.style.width = "0%";
        const thumb = document.createElement("div");
        thumb.id = "ck-progress-thumb";
        thumb.style.left = "0%";
        track.appendChild(fill);
        track.appendChild(thumb);

        const timeRow = document.createElement("div");
        timeRow.id = "ck-time-row";
        const tLeft  = document.createElement("span"); tLeft.textContent  = "0:00";
        const tRight = document.createElement("span"); tRight.textContent = "0:00";
        timeRow.appendChild(tLeft);
        timeRow.appendChild(tRight);

        progressSection.appendChild(track);
        progressSection.appendChild(timeRow);
        setupProgressDrag(track, video);

        // ── Info inferior ──
        const info = document.createElement("div");
        info.id = "ck-info";

        const infoLeft = document.createElement("div");
        infoLeft.id = "ck-info-left";
        const dot = document.createElement("div");
        dot.id = "ck-dot";
        const label = document.createElement("div");
        label.id = "ck-label";
        label.textContent = lastM3U8.split("/").pop().split("?")[0];
        infoLeft.appendChild(dot);
        infoLeft.appendChild(label);

        // Control de volumen
        const volWrap = document.createElement("div");
        volWrap.id = "ck-vol-wrap";
        const volIcon = document.createElement("div");
        volIcon.id = "ck-vol-icon";
        volIcon.textContent = "🔊";
        volIcon.title = "Silenciar";
        volIcon.onclick = () => {
            video.muted = !video.muted;
            volIcon.textContent = video.muted ? "🔇" : "🔊";
        };
        const volSlider = document.createElement("input");
        volSlider.type = "range"; volSlider.id = "ck-vol-slider";
        volSlider.min = 0; volSlider.max = 1; volSlider.step = 0.05; volSlider.value = 1;
        volSlider.oninput = () => { video.volume = volSlider.value; };
        volWrap.appendChild(volIcon);
        volWrap.appendChild(volSlider);

        info.appendChild(infoLeft);
        info.appendChild(volWrap);

        // ── Ensamblar ──
        box.appendChild(titlebar);
        box.appendChild(videoWrap);
        box.appendChild(progressSection);
        box.appendChild(info);
        document.body.appendChild(box);

        // ── Reanudar donde quedó ──
        video.addEventListener("loadedmetadata", () => {
            if (savedTime > 0) {
                video.currentTime = savedTime;
            }
            tRight.textContent = formatTime(video.duration);
        });

        // ── Actualizar barra de progreso ──
        video.addEventListener("timeupdate", () => {
            if (!video.duration) return;
            const pct = (video.currentTime / video.duration) * 100;
            fill.style.width  = pct + "%";
            thumb.style.left  = pct + "%";
            tLeft.textContent = formatTime(video.currentTime);
        });

        video.play();
    }

    function formatTime(s) {
        if (!s || isNaN(s)) return "0:00";
        const m = Math.floor(s / 60);
        return `${m}:${Math.floor(s % 60).toString().padStart(2,"0")}`;
    }

    // ===== EXTRAER video_url =====
    function extraerVideoUrl(obj) {
        function buscar(o) {
            if (!o || typeof o !== "object") return null;
            if (typeof o.video_url === "string" && o.video_url.includes(".m3u8")) return o.video_url;
            for (const k of Object.keys(o)) { const r = buscar(o[k]); if (r) return r; }
            return null;
        }
        return buscar(obj);
    }

    // ===== LEER __NEXT_DATA__ =====
    function leerNextDataInicial() {
        try {
            const script = document.querySelector('#__NEXT_DATA__');
            if (!script) return;
            const url = extraerVideoUrl(JSON.parse(script.textContent));
            if (url) setM3U8(url);
        } catch(e) {}
    }

    // ===== INTERCEPTAR FETCH =====
    const origFetch = window.fetch;
    window.fetch = function (...args) {
        const reqUrl = typeof args[0] === "string" ? args[0] : args[0]?.url || "";
        return origFetch.apply(this, args).then(res => {
            if (reqUrl.includes("/_next/data/") && reqUrl.includes("/episodes/")) {
                res.clone().json().then(data => {
                    const url = extraerVideoUrl(data);
                    if (url) setM3U8(url);
                }).catch(() => {});
            }
            return res;
        });
    };

    // ===== INICIO =====
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => setTimeout(leerNextDataInicial, 500));
    } else {
        setTimeout(leerNextDataInicial, 500);
    }

    // ===== BLOQUEAR VIP =====
    function bloquearVIP() {
        const esNuestro = el =>
            el.closest('#player-box') || el.closest('#ck-backdrop') || el.id === 'm3u8-btn';

        document.querySelectorAll('[class*="modal"],[class*="Modal"],[class*="popup"],[class*="Popup"]')
            .forEach(e => { if (!esNuestro(e)) e.remove(); });

        document.querySelectorAll('div').forEach(e => {
            if (esNuestro(e)) return;
            const s = window.getComputedStyle(e);
            if (s.position === 'fixed' && parseInt(s.zIndex) > 1000 && e.offsetHeight > 100) e.remove();
        });

        document.querySelectorAll('button').forEach(b => {
            if (esNuestro(b)) return;
            if (b.innerText && (b.innerText.includes('Desbloquear') ||
                b.innerText.includes('VIP') || b.innerText.includes('Recargar'))) b.remove();
        });

        document.body.style.overflow = 'auto';
        document.querySelectorAll('*').forEach(e => {
            if (esNuestro(e)) return;
            e.style.pointerEvents = 'auto';
            e.style.filter = 'none';
        });
    }

    setInterval(bloquearVIP, 1000);
})();
