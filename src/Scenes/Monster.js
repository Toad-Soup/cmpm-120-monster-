class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.rightarmX = this.bodyX + 90;
        this.rightarmY = this.bodyY + 60;

        this.leftarmX = this.bodyX - 90;
        this.leftarmY = this.bodyY + 60;

        this.leftLegX = this.bodyX - 60;
        this.leftLegY = this.bodyY + 110;

        //this.rightLegX =  350;
        //this.rightLegY =  20;

        this.Akey = null;
        this.Dkey = null;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_blueD.png");

        my.sprite.Rarm = this.add.sprite(this.rightarmX, this.rightarmY, "monsterParts", "arm_blueE.png");
        my.sprite.leftarm = this.add.sprite(this.leftarmX, this.leftarmY, "monsterParts", "arm_blueE.png");
        my.sprite.leftarm.flipX = true;

        my.sprite.rightLeg = this.add.sprite(this.bodyX + 60, this.bodyY + 110, "monsterParts", "leg_blueE.png")
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_blueE.png")
        my.sprite.leftLeg.flipX = true;

        my.sprite.rightEye = this.add.sprite(this.bodyX + 30, this.bodyY - 25, "monsterParts", "eye_cute_light.png");
        my.sprite.leftEye = this.add.sprite(this.bodyX -30, this.bodyY - 25, "monsterParts", "eye_cute_light.png");
        my.sprite.rightMad = this.add.sprite(this.bodyX + 30, this.bodyY - 25, "monsterParts", "eye_red.png");
        my.sprite.leftMad = this.add.sprite(this.bodyX - 30, this.bodyY - 25, "monsterParts", "eye_red.png");

        my.sprite.rightMad.visible =false;
        my.sprite.leftMad.visible =false;
        //my.sprite.topEye = this.add.sprite(); //not enough space lol my guy tiny

        my.sprite.rightEar = this.add.sprite(this.bodyX + 70, this.bodyY - 65, "monsterParts", "detail_blue_ear_round.png");
        my.sprite.leftEar = this.add.sprite(this.bodyX - 70, this.bodyY - 65, "monsterParts", "detail_blue_ear_round.png");
        my.sprite.leftEar.flipX = true;

        my.sprite.smile = this.add.sprite(this.bodyX, this.bodyY + 20, "monsterParts", "mouth_closed_fangs.png")
        my.sprite.smile.flipY = true;
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY + 30, "monsterParts", "mouthF.png")
        my.sprite.fangs.visible =false;
        
        //now to toggle visibility or whatever
        this.input.keyboard.on('keydown-S', (event) => {
            //this.smileType = "Smile";
            my.sprite.smile.visible = true;
            my.sprite.rightEye.visible = true;
            my.sprite.leftEye.visible = true;

            my.sprite.fangs.visible =false;
            my.sprite.rightMad.visible =false;
            my.sprite.leftMad.visible =false;
        });
        
        //Event input: dimple smile *********************************************
        this.input.keyboard.on('keydown-F', (event) => {
            //this.smileType = "Smile";
            my.sprite.smile.visible = false;
            my.sprite.rightEye.visible = false;
            my.sprite.leftEye.visible = false;

            my.sprite.fangs.visible =true;
            my.sprite.rightMad.visible =true;
            my.sprite.leftMad.visible =true;
        });
        
        //create the polling this necessary to move the creature
        this.Akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        //this is where we need to do the movement i think
        if(this.Akey.isDown){
            //move the creature to the left
            //use for loop like prof said
            for(let part in my.sprite){
                my.sprite[part].x -= 1;
            }
        }

        if(this.Dkey.isDown){
            //move creature to the right
            for(let part in my.sprite){
                my.sprite[part].x += 1;
            }
        }
       
    }

}