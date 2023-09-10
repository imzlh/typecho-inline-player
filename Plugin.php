<?php
    /**
     * 简单的内联单曲播放器，极简方案
     * 
     * @package inlinePlayer 
     * @author imzlh
     * @version 1.0.0
     * @link https://inline-player.imzlh.top
     */
    class inlinePlayer_Plugin implements Typecho_Plugin_Interface{
        static function init(string $content){
            return preg_replace('/{{\s*play\s*\:\s*\<code\>\s*([\w\W]+?)\s*\<\/code\>\s*}}/i','<div class="inline-player" data-src="\\1"></div>',$content) . 
                '<script src="'.Typecho_Common::url('inlinePlayer/lazyload.js', Helper::options()->pluginUrl).'"></script>'.
                '<link rel="stylesheet" href="'.Typecho_Common::url('inlinePlayer/core.css', Helper::options()->pluginUrl).'">';
        }

        static function activate(){
            Typecho_Plugin::factory('Widget_Abstract_Contents')->contentEx = ['inlinePlayer_Plugin', 'init'];
        }
        
        static function personalConfig(Typecho_Widget_Helper_Form $form){}
        static function config(Typecho_Widget_Helper_Form $form){}
        static function deactivate(){}
    }
?>