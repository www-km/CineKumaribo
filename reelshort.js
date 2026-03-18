// ==UserScript==
// @name         ReelShort CineKumaribo
// @namespace    https://viayoo.com/
// @version      5.0
// @description  CineKumaribo
// @match        https://www.reelshort.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastM3U8 = null;

    // ===== UI =====
    function createUI() {
        if (document.getElementById("m3u8-btn")) return;
        const btn = document.createElement("button");
        btn.id = "m3u8-btn";
        btn.innerText = "▶ PLAY";
        Object.assign(btn.style, {
            position: "fixed", bottom: "20px", right: "20px",
            zIndex: 99999, padding: "10px 14px",
            background: "red", color: "white",
            border: "none", borderRadius: "8px",
            fontSize: "14px", cursor: "pointer"
        });
        btn.onclick = openPlayer;
        document.body.appendChild(btn);
    }

    function setM3U8(url) {
        if (!url || url === lastM3U8) return;
        lastM3U8 = url;
        console.log("✅ video_url capturado:", url);
        createUI();
        // Si el player ya está abierto, actualizar automáticamente
        const player = document.getElementById("m3u8-player");
        if (player) {
            player.src = url;
            player.play();
        }
    }

    function openPlayer() {
        if (!lastM3U8) return alert("No hay video aún");
        let container = document.getElementById("player-box");
        if (!container) {
            container = document.createElement("div");
            container.id = "player-box";
            Object.assign(container.style, {
                position: "fixed", bottom: "70px", right: "20px",
                width: "320px", zIndex: 99999,
                background: "black", borderRadius: "10px", overflow: "hidden"
            });
            const close = document.createElement("button");
            close.innerText = "✖";
            Object.assign(close.style, {
                position: "absolute", top: "5px", right: "5px",
                zIndex: 2, background: "red", color: "white", border: "none", cursor: "pointer"
            });
            close.onclick = () => container.remove();
            const video = document.createElement("video");
            video.id = "m3u8-player";
            video.controls = true;
            video.style.width = "100%";
            container.appendChild(close);
            container.appendChild(video);
            document.body.appendChild(container);
        }
        const player = document.getElementById("m3u8-player");
        player.src = lastM3U8;
        player.play();
    }

    // ===== EXTRAER video_url de cualquier objeto JSON =====
    function extraerVideoUrl(obj) {
        // Primero buscar directamente la clave exacta "video_url"
        function buscarClave(o) {
            if (!o || typeof o !== "object") return null;
            if (typeof o.video_url === "string" && o.video_url.includes(".m3u8")) {
                return o.video_url;
            }
            for (const key of Object.keys(o)) {
                const resultado = buscarClave(o[key]);
                if (resultado) return resultado;
            }
            return null;
        }
        return buscarClave(obj);
    }

    // ===== LEER __NEXT_DATA__ INICIAL =====
    function leerNextDataInicial() {
        try {
            const script = document.querySelector('#__NEXT_DATA__');
            if (!script) return;
            const data = JSON.parse(script.textContent);
            const url = extraerVideoUrl(data);
            if (url) setM3U8(url);
        } catch(e) {}
    }

    // ===== INTERCEPTAR FETCH (captura SPA navigation) =====
    const origFetch = window.fetch;
    window.fetch = function(...args) {
        const reqUrl = typeof args[0] === "string" ? args[0] : args[0]?.url || "";

        return origFetch.apply(this, args).then(response => {
            // Next.js SPA data: /_next/data/BUILDID/es/episodes/SLUG.json
            if (reqUrl.includes("/_next/data/") && reqUrl.includes("/episodes/")) {
                response.clone().json().then(data => {
                    const url = extraerVideoUrl(data);
                    if (url) setM3U8(url);
                }).catch(() => {});
            }
            return response;
        });
    };

    // ===== INICIO =====
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => setTimeout(leerNextDataInicial, 500));
    } else {
        setTimeout(leerNextDataInicial, 500);
    }
    // ===== BLOQUEAR MODAL VIP (SIN ROMPER TU PLAYER) =====
function bloquearVIP() {

    // NO tocar nuestros elementos
    const esNuestro = (el) => {
        return el.closest('#player-box') || el.id === 'm3u8-btn';
    };

    // eliminar modales típicos
    document.querySelectorAll('[class*="modal"], [class*="Modal"], [class*="popup"], [class*="Popup"]').forEach(e => {
        if (!esNuestro(e)) e.remove();
    });

    // eliminar overlays oscuros
    document.querySelectorAll('div').forEach(e => {

        if (esNuestro(e)) return; // 🔥 protección

        const style = window.getComputedStyle(e);

        if (
            style.position === 'fixed' &&
            parseInt(style.zIndex) > 1000 &&
            e.offsetHeight > 100
        ) {
            e.remove();
        }
    });

    // eliminar botones de pago
    document.querySelectorAll('button').forEach(btn => {
        if (esNuestro(btn)) return; // 🔥 protección

        if (btn.innerText && (
            btn.innerText.includes('Desbloquear') ||
            btn.innerText.includes('VIP') ||
            btn.innerText.includes('Recargar')
        )) {
            btn.remove();
        }
    });

    // restaurar interacción (sin romper tu player)
    document.body.style.overflow = 'auto';

    document.querySelectorAll('*').forEach(e => {
        if (esNuestro(e)) return; // 🔥 protección
        e.style.pointerEvents = 'auto';
        e.style.filter = 'none';
    });
}

// ejecutar continuamente
setInterval(bloquearVIP, 1000);

})();