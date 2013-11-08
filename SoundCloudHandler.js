/**
 * Created by Barton on 11/7/13.
 */

function SoundCloudHandler(url){
    if (url) { this.url = url; } else { this.loadRandomUrl(); }
    this.song = {};
    this.target = new enchant.EventTarget();
    this.init();
}
SoundCloudHandler.prototype = {
    init: function() {
        this.widgetId = 'sc-widget';
        this.initComponent();
        this.initEvents();
    },
    initComponent: function(){
        var body = document.getElementsByTagName('body') [0];
        var fullUrl = 'https://w.soundcloud.com/player/?url=' + this.url;
        if(body && !document.getElementById(this.widgetId)){
        var iframe = document.createElement('iframe');
            iframe.setAttribute('id',this.widgetId);
            iframe.setAttribute('frameborder','no');
            iframe.setAttribute('scrolling','no');
            iframe.setAttribute('width','0');
            iframe.setAttribute('height','0');
            iframe.setAttribute('style','display:none;');
            iframe.setAttribute('src',fullUrl);
            body.appendChild(iframe);
            this.widget = SC.Widget(iframe);
        }else{
            //handle append fail
        }
    },
    initEvents: function(){
        var _this = this;
        this.widget.bind(SC.Widget.Events.READY, function() {
            _this.widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(o) {
                if (o.currentPosition > 50){
                    console.log('Hearing music now');
                    _this.setSongStarted();
                    _this.widget.unbind(SC.Widget.Events.PLAY_PROGRESS);
                }
            });
            _this.widget.bind(SC.Widget.Events.PLAY, function(o) {
                _this.widget.getCurrentSound(function(currentSound) {
                    console.log('played' + currentSound.title);
                    _this.loadSongInfo(currentSound);
                });
            });

            _this.widget.play();
        });
    },
    getWidget: function(){
        return this.widget;
    },
    getIframe: function(){
        return document.getElementById(this.widgetId);
    },
    loadSongInfo:function(currentSound){
        this.song = currentSound;
    },
    loadRandomUrl: function(){

    },
    setSongStarted: function(){
        var e = new enchant.Event("startsong");
        this.target.dispatchEvent(e);
        console.log('startsong event fired');
    }


}