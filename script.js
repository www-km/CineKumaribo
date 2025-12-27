// DATOS DE SERIES Y EPISODIOS
const series = [
    {
        id: 1,
        title: "Atada Al Honor",
        thumbnail: "https://v-mps.crazymaplestudios.com/images/d1664840-b957-11f0-b4b4-bd031586a1b7.jpg",
        episodes: [
            {
                number: 1,
                title: "Episodio 01",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/c011e2a6c8fd71f08b495014c1da0102/f4eb14e6907e4fde8ba90d8cf5087707-0953618f1c531a53eb3ac7ee13fa668c-sd.m3u8"
            },
            {
                number: 2,
                title: "Episodio 02",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/901b353ac6b371f0885197c6360c0102/f69990138b854591a70c350d4e0a1c93-5f34193e74670de7ff56009cddc39640-sd.m3u8"
            },
            {
                number: 3,
                title: "Episodio 03",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/d08db93ac6b371f0bf8e87c7361c0102/cd35014dbafa41478e4f91c4250d9ab5-68e478c4bd65b64e504aef9bb4d8e164-sd.m3u8"
            },
            {
                number: 4,
                title: "Episodio 04",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/904f503bc6b371f080605114c1ca0102/a4156d18a05247df8f50e8b420efd734-d44a237b1209e3662c574a2125f8e464-sd.m3u8"
            },
            {
                number: 5,
                title: "Episodio 05",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/806fd63bc6b371f0bfa44077c0c20102/2d0762164a294227a09c4ec8fb779fa8-13e2c9a8b04bb950e3a21f00c55c9bca-sd.m3u8"
            },
            {
                number: 6,
                title: "Episodio 06",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/003d6fa4c8fd71f0bf9887c7361c0102/aad97d31c2c14b5ead2445dafcaaf732-e02fd5c30edb07a96f0f55f7af1c8515-sd.m3u8"
            },
            {
                number: 7,
                title: "Episodio 07",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/805349abc9ad71f0806a5114c1ca0102/2340468d3b234067b1405dfecc204edd-944a67ea0fb3c88d2a13dcf166e63a4c-sd.m3u8"
            },
            {
                number: 8,
                title: "Episodio 08",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/8079753dc6b371f0885197c6360c0102/3227c5a331e343f1a0c0f2e2dd27fb78-1fca4160ae643ce2ba333f264a0856a7-sd.m3u8"
            },
            {
                number: 9,
                title: "Episodio 09",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/1095cf67c91c71f0bfc44077c0c30102/1d5ef1c56640443cab075bdae233b62f-d980eef10855f0bcad66ed38ef7b9869-sd.m3u8"
            },
            {
                number: 10,
                title: "Episodio 10",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/b075983ec6b371f08b435014c1da0102/f6d283888c9e42238beeca12734d309b-cba783365358da16df6de3a737f6b3b0-sd.m3u8"
            },
            {
                number: 11,
                title: "Episodio 11",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/c09bd7a4c8fd71f0942b3108f4850102/f02d16b5d19a47768d0f86e34f9e4f11-deca7b821c9c40dc954c64bc8dfe166b-sd.m3u8"
            },
            {
                number: 12,
                title: "Episodio 12",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/40d194a5c8fd71f0bfa83108f4940102/2acb685c29fe4b8baf1f1c5a8c5c1b2a-a94c7864e708592cd49a51db61ccff7b-sd.m3u8"
            },
            {
                number: 13,
                title: "Episodio 13",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/7095f6a4c8fd71f09c7b3108f4840102/b8a196ed31754e7fab2b4dbf9de63aa2-ca0c00ebd5cb9be247bd7f8510edd75e-sd.m3u8"
            },
            {
                number: 14,
                title: "Episodio 14",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/700b0aacc9ad71f0bfea4177d0d10102/b6f989eb01e2465a92a6c5634ae698c4-ee7bb87fecee1e274a676003e0284bde-sd.m3u8"
            },
            {
                number: 15,
                title: "Episodio 15",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/20365641c6b371f0b47b87c6371c0102/f2b4166c10b3475d98a3662f7d7ec401-1987d1d926df74f4d58e8266fb6bc87b-sd.m3u8"
            },
            {
                number: 16,
                title: "Episodio 16",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/3072cd67c91c71f09f684177d1c10102/afd3a7a43a34454d98542ad429aa6ff3-0dcdd9c7dc93296893eacabb821efd1c-sd.m3u8"
            },
            {
                number: 17,
                title: "Episodio 17",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/50507442c6b371f0bfe036a5e8aa0102/624861838db84596baf0492a5c79194b-b28e20c317e08c997ad22a4353cdb763-sd.m3u8"
            },
            {
                number: 18,
                title: "Episodio 18",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/e0ba0543c6b371f0bfd84177d1c00102/656149cbdc9f4d188b6d9efc51ce9757-1361ec646b496cebd4e65c78b0575478-sd.m3u8"
            },
            {
                number: 19,
                title: "Episodio 19",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/d0bc9043c6b371f080754076d1d30102/299619ba34fd4811bf7e31c4fb0349f6-4cb5f6000a0c07df9549ce7681988815-sd.m3u8"
            },
            {
                number: 20,
                title: "Episodio 20",
                url: "https://v-mps.crazymaplestudios.com/vod-112094/e0c25144c6b371f0bfc587c7371d0102/74864bec8d9d4c2f823d06ed3f8fb998-a9568ae1e3e9d3f8d57b9ff975cb74cd-sd.m3u8"
            }
        ]
    }
];

let hls = null;
let currentSeries = null;
let currentEpisodeIndex = 0;

// RENDERIZAR CATÁLOGO DE SERIES
function renderSeriesCatalog() {
    const catalog = document.getElementById('series-catalog');
    catalog.innerHTML = '';
    
    series.forEach(serie => {
        const card = document.createElement('div');
        card.className = 'series-card';
        card.innerHTML = `
            <img src="${serie.thumbnail}" alt="${serie.title}">
            <div class="series-info">
                <div class="series-title">${serie.title}</div>
                <div class="episode-count">${serie.episodes.length} episodios</div>
            </div>
        `;
        card.onclick = () => showEpisodes(serie);
        catalog.appendChild(card);
    });
}

// MOSTRAR EPISODIOS DE UNA SERIE
function showEpisodes(serie) {
    currentSeries = serie;
    document.getElementById('series-catalog').classList.add('hidden');
    document.getElementById('episodes-view').classList.add('active');
    document.getElementById('current-series-title').textContent = serie.title;
    
    const grid = document.getElementById('episodes-grid');
    grid.innerHTML = '';
    
    serie.episodes.forEach((episode, index) => {
        const card = document.createElement('div');
        card.className = 'episode-card';
        card.textContent = episode.number;
        card.onclick = () => playEpisode(index);
        grid.appendChild(card);
    });
}

// MOSTRAR CATÁLOGO DE SERIES
function showSeriesCatalog() {
    document.getElementById('episodes-view').classList.remove('active');
    document.getElementById('series-catalog').classList.remove('hidden');
    currentSeries = null;
}

// MOSTRAR LISTA DE EPISODIOS
function showEpisodesList() {
    closePlayer();
    document.getElementById('player-view').classList.remove('active');
    document.getElementById('episodes-view').classList.add('active');
    document.getElementById('series-catalog').classList.add('hidden');
}

// CERRAR REPRODUCTOR
function closePlayer() {
    if (hls) {
        hls.destroy();
        hls = null;
    }
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.pause();
    videoPlayer.src = '';
    
    // Al cerrar, mostrar la lista de episodios si hay una serie seleccionada
    document.getElementById('player-view').classList.remove('active');
    if (currentSeries) {
        document.getElementById('episodes-view').classList.add('active');
        document.getElementById('series-catalog').classList.add('hidden');
    } else {
        document.getElementById('series-catalog').classList.remove('hidden');
        document.getElementById('episodes-view').classList.remove('active');
    }
}

// REPRODUCIR EPISODIO
function playEpisode(index) {
    currentEpisodeIndex = index;
    const episode = currentSeries.episodes[index];
    
    // Asegurarse de que solo el reproductor esté visible
    document.getElementById('episodes-view').classList.remove('active');
    document.getElementById('series-catalog').classList.add('hidden');
    document.getElementById('player-view').classList.add('active');
    
    document.getElementById('playing-episode').textContent = 
        `${currentSeries.title} - Episodio ${episode.number}`;
    
    updateNavigationButtons();
    
    const videoPlayer = document.getElementById('video-player');
    
    if (Hls.isSupported()) {
        if (hls) {
            hls.destroy();
        }
        
        hls = new Hls();
        hls.loadSource(episode.url);
        hls.attachMedia(videoPlayer);
        
        hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
            const qualitySelect = document.getElementById('quality');
            qualitySelect.innerHTML = '<option value="-1">Auto</option>';
            
            hls.levels.forEach((level, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.text = `${level.height}p`;
                qualitySelect.appendChild(option);
            });
            
            videoPlayer.play();
        });
        
    } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
        videoPlayer.src = episode.url;
        videoPlayer.addEventListener('loadedmetadata', function() {
            videoPlayer.play();
        });
    }
}

// ACTUALIZAR BOTONES DE NAVEGACIÓN
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-episode');
    const nextBtn = document.getElementById('next-episode');
    
    prevBtn.disabled = currentEpisodeIndex === 0;
    nextBtn.disabled = currentEpisodeIndex === currentSeries.episodes.length - 1;
}

// NAVEGACIÓN ENTRE EPISODIOS
document.getElementById('prev-episode').addEventListener('click', () => {
    if (currentEpisodeIndex > 0) {
        playEpisode(currentEpisodeIndex - 1);
    }
});

document.getElementById('next-episode').addEventListener('click', () => {
    if (currentEpisodeIndex < currentSeries.episodes.length - 1) {
        playEpisode(currentEpisodeIndex + 1);
    }
});

// CAMBIAR CALIDAD
document.getElementById('quality').addEventListener('change', function(e) {
    if (hls) {
        hls.currentLevel = parseInt(e.target.value);
    }
});

// CONTROLES DE REPRODUCCIÓN
const videoPlayer = document.getElementById('video-player');
const playPauseBtn = document.getElementById('play-pause');

playPauseBtn.addEventListener('click', () => {
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
});

videoPlayer.addEventListener('play', () => {
    playPauseBtn.textContent = '⏸️ Pausa';
});

videoPlayer.addEventListener('pause', () => {
    playPauseBtn.textContent = '▶️ Play';
});

document.getElementById('rewind-5').addEventListener('click', () => {
    videoPlayer.currentTime -= 5;
});

document.getElementById('forward-5').addEventListener('click', () => {
    videoPlayer.currentTime += 5;
});

// INICIALIZAR
renderSeriesCatalog();