function inlinePlay(element: HTMLElement,source?: String){
    // 初始化音频源
    source = source || element.dataset.src || '';

    // 初始化HTML和元素
    element.classList.add('inline-play');
    element.innerHTML = `
        <div class="ip-btns">
            <div class="ip-paused">
                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"></path>
                </svg>
            </div>
            <div class="ip-playing">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"></path>
                </svg>
            </div>
        </div>
        <div class="ip-prog"></div>
        <audio class="ip-audio"></audio>`;
    var audio:HTMLAudioElement = element.getElementsByTagName('audio')[0],
        btn_play = <HTMLElement>element.getElementsByClassName('ip-paused')[0],
        btn_pause = <HTMLElement>element.getElementsByClassName('ip-playing')[0],
        timer = <HTMLElement>element.getElementsByClassName('ip-prog')[0];

    audio.onplay = function(){              // 开始播放
        element.setAttribute('play','');
    }
    audio.onpause = function(){             // 暂停播放
        element.removeAttribute('play');
    }
    audio.ontimeupdate = function(){
        timer.style.width = audio.currentTime / audio.duration * 100 + '%';
    }
    btn_play.onclick = function(e){         // 播放
        audio.play();e.stopPropagation();
    }
    btn_pause.onclick = function(e){        // 暂停
        audio.pause();e.stopPropagation();
    }
    element.onclick = function(){
        element.setAttribute('active','');  // 初始化
        audio.src = <string>source?.toString();
        audio.play();                       // 播放
        element.onclick = function(e:MouseEvent){
            var progress = e.offsetX / element.offsetWidth;
            audio.currentTime = audio.duration * progress;
            audio.play();
        }
    }
    
}