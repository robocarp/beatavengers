/**
 * Created by hessj on 11/3/13.
 */
enchant();
var arrowsPerScreen = 9;
var fps = 60;
var songStart = false;
var startDelay = 2 * fps;
var Console = enchant.Class.create(enchant.Scene,{
    initialize: function(bpm){
        var game = enchant.Core.instance;
        game.preload(preLoadFiles());
        game.scale = 2;
        game.fps = fps;
        game.bpm = 135;
    }
});
var scwidget;
window.onload = function() {
    var game = new Core(694, 366);
    var test = new Console()
    var bpm = 140;
    scwidget = new SoundCloudHandler('https://soundcloud.com/strangetalkmusic/picking-up-all-the-pieces-ta');

    var fps = 30;
    game.scale = 2;
    game.fps = fps;

    var arrowsPerScreen = 9;


    var fpb = Math.round(game.fps/(bpm/60));

    /*game.rootScene.addEventListener('touchstart', function(e) {
        var ea = new enchant.Event("startSong");
        game.rootScene.dispatchEvent(ea);
    });*/
    game.onload = function(){
        var arrows = new ArrowBase(60,300);
        var lastFrame;

        game.rootScene.backgroundColor = '#080808';
        game.addEventListener("enterframe", function(){
            if(game.frame == startDelay){
                scwidget.startSong();
            }
            if(game.frame > 1){
                var e = new enchant.Event("BeatHit");
                var nextBeat = game.frame % fpb;
                if(nextBeat < 8 ){
                    this.beatHit = true;

                }else{

                    this.beatHit = false;
                }
                game.rootScene.dispatchEvent(e);
                lastFrame = game.frame;
            };
            // BEAT......
            if(game.frame > startDelay && nextBeat == 0){};
            if(nextBeat == 0 && songStart){
                var arrowPose = Math.floor((Math.random()*4)+1);
                var beatarrow = new beatArrow(arrowPose);
            };
        });
        game.rootScene.addEventListener('startSong',function(){
            songStart = true;
        });
        game.rootScene.addEventListener('songReady',function(){
                beginText();
        });
        game.rootScene.addEventListener('songInfoLoaded',function(){
            var songTitle = new Label();
            songTitle.font = "13px Helvetica";
            songTitle.text = scwidget.getSongTitle();
            songTitle.color = "#f8b800";
            songTitle.x = 280;
            songTitle.y = 20;
            game.rootScene.addChild(songTitle);
        });
    };
    game.start();

// ---------  Base Arrows Class---------- \\
    var ArrowBase = enchant.Class.create(enchant.Sprite,{
        initialize: function(x, y){
            var ArrowUp    = new arrow01(140, 300);
            var ArrowDown  = new arrow01(100, 300);
            var ArrowLeft  = new arrow01(60 , 300);
            var ArrowRight = new arrow01(180, 300);
            ArrowUp.rotate(0);
            ArrowDown.rotate(180);
            ArrowLeft.rotate(-90);
            ArrowRight.rotate(90);
            game.rootScene.addChild(ArrowUp);
            game.rootScene.addChild(ArrowDown);
            game.rootScene.addChild(ArrowLeft);
            game.rootScene.addChild(ArrowRight);
            game.rootScene.addEventListener('BeatHit',function(){
                if(game.beatHit == true){
                    ArrowUp.frame    =  2;
                    ArrowDown.frame  =  2;
                    ArrowLeft.frame  =  2;
                    ArrowRight.frame =  2;
                }else{
                    ArrowUp.frame    =  1;
                    ArrowDown.frame  =  1;
                    ArrowLeft.frame  =  1;
                    ArrowRight.frame =  1;
                }
            });
        }
    })

    var beatArrow = enchant.Class.create(enchant.Sprite,{
        initialize: function(arrowPose){
            enchant.Sprite.call(this,35 ,35);
            this.arrow = new Arrow02();
            if(arrowPose == 1){
                this.arrow.rotation = -90;
                this.arrow.x=56;
            };
            if(arrowPose == 2){
                this.arrow.rotation = -180;
                this.arrow.x=96;
            };
            if(arrowPose == 3){
                this.arrow.rotation = 0;
                this.arrow.x=136;
            };
            if(arrowPose == 4){
                this.arrow.rotation = 90;
                this.arrow.x=176;
            };
            this.arrow.opacity=0;
            game.rootScene.addChild(this.arrow);
            this.arrow.addEventListener("enterframe",function(){
                if(this.age == 1){
                    this.opacity = 0;
                    this.tl.setFrameBased();
                    this.fpb = Math.round(game.fps/(bpm/60)*arrowsPerScreen)
                    this.tl.moveTo(this.x,350,this.fpb).and().fadeIn(30);
                };
                if(Math.round(this.y) == 350){
                  game.rootScene.removeChild(this);
                };
            });
        }
    });

    //--------- Arrow 2 ----------------\\
    var Arrow02 = enchant.Class.create(enchant.Sprite,{
        initialize: function(arrowPose){
            this.startFrame = 1;
            enchant.Sprite.call(this,35 ,35);
            this.image =       game.assets["img/ArrowGlow.png"];
            this.fader = new Sprite(35,35);
            this.fader.image=  game.assets["img/ArrowGlow.png"];
            this.fader.frame = 1;
            this.tl.setFrameBased();
            this.fader.tl.setFrameBased();
            //game.rootScene.addChild(this);
            //game.rootScene.addChild(this.fader);
            this.addEventListener("enterframe",function(){
                if(this.age % 12 == 0){
                    this.frame = this.startFrame;
                    this.fader.frame = this.startFrame +1;
                    this.tl.fadeOut(6).fadeIn(6);
                    this.fader.tl.fadeIn(6).fadeOut(6);
                    this.startFrame += 1;
                    if(this.startFrame > 5){
                        this.startFrame =0;
                    };
                }
            });

        }
    });

    // -------- Start Text -------- \\
    var beginText = enchant.Class.create(enchant.Sprite,{
        initialize: function(){
            enchant.Sprite.call(this,83 ,41);
            this.image = game.assets["img/battleText.png"];
            this.frame = 0;
            this.x = 92;
            this.y = 150; //@TODO
            this.opacity = 0;
            game.rootScene.addChild(this);
            this.addEventListener("enterframe",function(){
                if(this.age < 60){
                    this.tl.fadeIn(30).fadeOut(30).then(function(){this.opacity=0;});
                };
                if(this.age == 60){
                  this.frame = 1;
                  this.opacity = 0;
                  this.tl.fadeIn(5).fadeOut(7).fadeIn(7).fadeOut(10);
                };
                if(this.age >= 95){
                    game.rootScene.removeChild(this);
                }
            });
        }
    });

    var arrow01 = enchant.Class.create(enchant.Sprite,{
        initialize: function(x, y){
            enchant.Sprite.call(this,27 ,27);
            this.image =    game.assets["img/Arrow.png"];
            this.x =        x;
            this.y =        y;
            //this.frameState =   1;
            this.frame = 1;       //this.frameState;
        }

    });
};



function preLoadFiles(){
    var fileList = new Array();
    fileList.push("img/ArrowGlow.png");
    fileList.push("img/Arrow.png");
    fileList.push("img/battleText.png");
    return(fileList);
};
