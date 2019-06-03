 var config = {
        type: Phaser.AUTO,
        width: 1200,
        height: 800,
        backgroundColor: '#42bff4',
        parent: 'canvasid',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 700 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var player;
    var platforms;
    var cursors;
    var addplat;
    var win;
    var victorytext;
    var game = new Phaser.Game(config);


    function preload ()
    {
        this.load.image('ground', 'Assets/platform.png');
        this.load.image('tegelane', 'Assets/tegelane.png');
        this.load.image('win', 'Assets/greenstar.png');
        this.load.image('newgreenstar', 'Assets/newgreenstar.png');
    }

    function create ()
    {	
    	
    	tutorial1 = this.add.text(380, 30, 'Liikumiseks kasuta nooleklahve', { fontSize: 20 }).setOrigin(1, 0.5);
    	tutorial2 = this.add.text(430, 60, 'Bloki asetamiseks kasuta nuppu "c"', { fontSize: 20 }).setOrigin(1, 0.5);
        
        platforms = this.physics.add.staticGroup();
        //1200 laius x,800 pikkus y
        platforms.create(400, 800, 'ground').setScale(4).refreshBody();
        //esimene tase
        platforms.create(800, 628, 'ground');
        platforms.create(100, 628, 'ground');
        //teine tase
        platforms.create(500, 425, 'ground');
        platforms.create(1100, 425, 'ground');
        //kolmas tase
        platforms.create(50, 275, 'ground');
        platforms.create(800, 275, 'ground');
        //end
        platforms.create(600, 125, 'ground');


        //võit
        win = this.physics.add.staticGroup();
        win.create(600, 75, 'win');

        player = this.physics.add.sprite(100, 720, 'tegelane');

        player.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(player, platforms);
 
        addplat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.physics.add.overlap(player, win, winGame, null, this);

    }

	function winGame(player, win){
    	win.disableBody(true, true);
    	victorytext = this.add.text(750, 360, 'Victory!', { fontSize: 60 }).setOrigin(1, 0.5);
    }
        
    function update ()
    {
    	    	
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

        }
        else
        {
            player.setVelocityX(0);

        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-400);
        }
        if (Phaser.Input.Keyboard.JustDown(addplat)){
            console.log(player.x);
    		console.log(player.y);
            platforms.create(player.x, player.y + 50, 'newgreenstar');
            player.x = 100;
            player.y = 720;
        }
    }
    