import Phaser from 'phaser'

class Example extends Phaser.Scene {
  tileset;
  map;
  layer;
  controls;
  pipe;
  block;
  player;
  camera;

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/map1.json')
    this.load.image('tiles', 'assets/map-tile.png')
    this.load.spritesheet('player', 'assets/marioSmall.png', {frameWidth: 36, frameHeight: 33});
  }

  create() {
    this.map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('map-tile', 'tiles');

    this.layer = this.map.createLayer('ground', this.tileset);
    this.map.createLayer('background', this.tileset)

    this.layer.setCollision([63, 62, 64, 55, 54, 112, 113, 122, 107, 123, 124, 125, 126, 110, 108, 109, 111, 98, 97, 78, 122, 77, 69, 70, 84, 85]);

    this.player = this.physics.add.sprite(150, 100, 'player');
    this.player.setBounce(0);
    
    console.log(this.player.body.setCollideWorldBounds(true))
    this.physics.world.setBounds(0, 0, 3800, 320);
    
  

    this.pickups = this.map.filterTiles(tile => tile.index === 82);



    this.cursors = this.input.keyboard.createCursorKeys();

    this.cursors.up.on('down', () => {
      if (this.player.body.blocked.down) {
        this.player.body.setVelocityY(-360);
      }
    }, this);

    this.info = this.add.text(10, 10, 'Player');


    this.camera = this.cameras.main;
    this.camera.setBounds(0,0)
    this.camera.startFollow(this.player, true, 0.05, 0, -200, 120);
    this.camera.setFollowOffset(-40, 120);
    console.log(this.camera)




  }

  update(time, delta) {
    //  Collide player against the tilemap layer
    this.physics.collide(this.player, this.layer, this.pipe);


    this.player.body.setVelocityX(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
    }
    else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
    }


    //  Custom tile overlap check
    this.physics.world.overlapTiles(this.player, this.pickups, this.hitPickup, null, this);

    //  Debug info
    const blocked = this.player.body.blocked;

    this.info.setText(`left: ${blocked.left} right: ${blocked.right} down: ${blocked.down}`);

  }

  hitPickup(player, tile) {
    this.map.removeTile(tile, 29, false);

    this.pickups = this.map.filterTiles(tile => tile.index === 82);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 320,
  parent: 'app',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 600 }

    }
  },
  scene: Example
};

const game = new Phaser.Game(config);
