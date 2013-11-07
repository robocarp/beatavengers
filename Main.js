/**
 * Created by hessj on 11/3/13.
 */
enchant();
var preLoadList = new Array();

window.onload = function() {
    preLoadFiles();
    var game = new Core(694, 366);
    var fps = 30;
    game.preload(preLoadList);
    game.scale = 2;
    game.fps = fps;

    var arrowsPerScreen = 9;
    var bpm = 128;
    var fpb = Math.round(game.fps/(bpm/60));
    var startDelay = 2 * fps;

    game.onload = function(){
        var beatarrow = new beatArrow();
        var arrows = new ArrowBase(60,300);
        var lastFrame;
        var startText = new beginText();

        game.rootScene.addChild(beatarrow);
        game.rootScene.backgroundColor = '#080808';
        game.addEventListener("enterframe", function(){
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
        });

        beatarrow.addEventListener("enterframe", function(){
            if(Math.round(this.y) >= 350 || (game.frame > startDelay && game.frame < startDelay + 2)){
                this.opacity = 1;
                var arrowPose = Math.floor((Math.random()*4)+1);
                if(arrowPose == 1){
                    this.rotation = -90;
                    this.x=56;
                };
                if(arrowPose == 2){
                    this.rotation = -180;
                    this.x=96;
                };
                if(arrowPose == 3){
                    this.rotation = 0;
                    this.x=136;
                };
                if(arrowPose == 4){
                    this.rotation = 90;
                    this.x=176;
                };
                this.y = 10;
                this.tl.moveTo(this.x,350,fpb*arrowsPerScreen);
            };
            //label.text = " BPM: "+ bpm;//"Arrow y: "+ Math.round(this.y);
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
        initialize: function(){
            enchant.Sprite.call(this,36 ,36);
            this.image =       game.assets["img/ArrowGlow.png"];
            this.frame = 1;
            this.opacity=0;
        }
    });
    var beginText = enchant.Class.create(enchant.Sprite,{
        initialize: function(){
            enchant.Sprite.call(this,83 ,41);
            this.image = game.assets["img/battleText.png"];
            this.frame = 0;
            this.x = 80;
            this.y = 150;
            this.opacity = 0;
            game.rootScene.addChild(this);
            this.addEventListener("enterframe",function(){
                if(game.frame == 0){
                    this.tl.fadeIn(30).fadeOut(30).then(function(){this.opacity=0;});
                };
                if(this.age == 60){
                  this.frame = 1;
                  this.opacity = 0;
                  this.tl.fadeIn(5).fadeOut(7).fadeIn(7).fadeOut(5);
                };
                if(this.age >= 90){
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
    preLoadList.push("img/ArrowGlow.png");
    preLoadList.push("img/Arrow.png");
    preLoadList.push("img/battleText.png");

};
