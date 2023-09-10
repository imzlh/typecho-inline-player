function inlinePlay(element, source) {
    // 初始化音频源
    source = source || element.dataset.src || '';
    // 初始化HTML和元素
    element.classList.add('inline-play');
    element.innerHTML = "\n<div class=\"ip-btns\">\n<div class=\"ip-paused\">\n<svg fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" viewBox=\"0 0 24 24\">\n<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z\"></path>\n</svg>\n</div>\n<div class=\"ip-playing\">\n<svg fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" viewBox=\"0 0 24 24\">\n<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.75 5.25v13.5m-7.5-13.5v13.5\"></path>\n</svg>\n</div>\n</div>\n<div class=\"ip-prog\"></div>\n<audio class=\"ip-audio\"></audio>";
    var audio = element.getElementsByTagName('audio')[0], btn_play = element.getElementsByClassName('ip-paused')[0], btn_pause = element.getElementsByClassName('ip-playing')[0], timer = element.getElementsByClassName('ip-prog')[0];
    audio.onplay = function () {
        element.setAttribute('play', '');
    };
    audio.onpause = function () {
        element.removeAttribute('play');
    };
    audio.ontimeupdate = function () {
        timer.style.width = audio.currentTime / audio.duration * 100 + '%';
    };
    btn_play.onclick = function (e) {
        audio.play();
        e.stopPropagation();
    };
    btn_pause.onclick = function (e) {
        audio.pause();
        e.stopPropagation();
    };
    element.onclick = function () {
        element.setAttribute('active', ''); // 初始化
        audio.src = source === null || source === void 0 ? void 0 : source.toString();
        audio.play(); // 播放
        element.onclick = function (e) {
            var progress = e.offsetX / element.offsetWidth;
            audio.currentTime = audio.duration * progress;
            audio.play();
        };
    };
}

window.addEventListener('load', function () {
    var elements = this.document.getElementsByClassName('inline-player');
    for (var i = 0; i < elements.length; i++)
        elements[i].player = inlinePlay(elements[i]);
});
