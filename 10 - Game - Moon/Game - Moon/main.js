
var GameInit = function(app){

	/* */

	this._InitPlayerObject = function(){

		this.player = _Player.init(this);

		this.otherplayer = [];

		this.otherplayer.push(this.player);

	};

	/* */

	this._InitGameObjects = function(){


		this.gameobjectlist = [];

		this.gameObject = function(type,position,image){

			var object = new type(position.x,position.y,image);
			this.gameobjectlist.push(object);

			return this.gameobjectlist.length;
		}


	};

	/* */

	this._InitGameMap = function(){

		this.maps = {};

		this.maps.x = 0;

		this.maps.y = 0;

		this.off = new Math.Vector(0,0);

	}

	/* */

	this._initGameLevel = function(){

		var img = this.player.spritelist['moon-character'];
		var self = this;

			setInterval(function(){

				var val = new Math.Vector(self.maps.x+25+Math.random()*self.app.width,self.app.height-75);
				self.gameObject(_Melon,val,img);

			},1050);

			var val = new Math.Vector(self.maps.x+25+Math.random()*self.app.width,self.app.height-75);



		var level = [];
		var newlevelpiece = function(position,breakable){

			var tiletemp = 	{
				position:position,
				breakable:breakable||false
			}

			level.push(tiletemp);

		}

		var w = 70;

		//Placing tiles

		//Main Ground
		for(var i = 0; i<=74; i++){

				newlevelpiece(new Math.Vector(-70*8+i*w,+this.app.client.setHeight-25))

		}

		//First 3
		for(var i = 0; i<=2; i++){

				newlevelpiece(new Math.Vector(210+i*w,48+this.app.client.setHeight-225))
		}

		for(var i = 0; i<=2; i++) {

			if (i==2)
					newlevelpiece(new Math.Vector(800+i*w,-6+164-(i-1)*13+this.app.client.setHeight-200))
					else
					newlevelpiece(new Math.Vector(800+i*w,-6+164-i*13+this.app.client.setHeight-200))

		}

		for(var i = 0; i<=2; i++){

					if (i==0){

							i+3;
						newlevelpiece(new Math.Vector(1010+i*w,-6+142+(i+1)*13+this.app.client.setHeight-204))
						i-3;
					}
					else {


						i+3;
						newlevelpiece(new Math.Vector(1010+i*w,-6+142+i*13+this.app.client.setHeight-204))
						i-3;

					}
		}

		for(var i = 0; i<=2; i++){

				newlevelpiece(new Math.Vector(1300+i*w,148+this.app.client.setHeight-225))
		}


		for(var i = 0; i<=16; i++)
		for(var y = 0;y<=8-i; y++)
				newlevelpiece(new Math.Vector(64*y+1700+i*w/3,164-i*8+this.app.client.setHeight-204))

		for(var i = 0; i<=4; i++)
		for(var y = 0;y<=8-i; y++)
				newlevelpiece(new Math.Vector(64*y+2500+i*w/3,164-i*8+this.app.client.setHeight-204))

		//for(var i = 0; i<=32; i++)
		//		newlevelpiece(new Math.Vector(2500+i*w/3,i*8+this.app.client.height-292))

		for(var i = 0; i<=2; i++){
			newlevelpiece(new Math.Vector(3500+i*w,172+this.app.client.setHeight-204),true)
		}

		for(var i = 0; i<=2; i++){
			newlevelpiece(new Math.Vector(3500+i*w,140+this.app.client.setHeight-204),true)
		}

		// Populate game objects list with Level Data

		for(var i = 0; i<=level.length-1; i++){

			var tile = level[i];

			var id = this.gameObject(_GroundTile,new Math.vector(tile.position.x-1*i,tile.position.y),img);

			this.gameobjectlist[this.gameobjectlist.length-1].breakable = tile.breakable;

		}

		// Weight tile surroundings

		for(var i = 1; i<=this.gameobjectlist.length-1; i++){

			var ObjA = this.gameobjectlist[i];

			var left = 0;

			var right = 0;

			var nobottom = 0;

			var center = 0;

			var above = 0;

			for(var y = 1; y<=this.gameobjectlist.length-1; y++){

				if (y==i)
					continue;

				var ObjB = this.gameobjectlist[y];

				var ObjOffX = ObjA.x-ObjB.x;

				var ObjOffY = ObjA.y-ObjB.y;

				var w = 75;

				if (ObjOffX<-w)
					continue;
				if (ObjOffX>w)
					continue;

				var h = 15;

				if (ObjOffY<-h) {

					//above++;
					continue;
				}

				if (ObjOffY<0)
				if (ObjOffY>-235) {

					above++;
					continue;
				}

				if (ObjOffY<-h)
					continue;
				if (ObjOffY>h)
					continue;


				if (ObjOffX<0){

					left++;

					if (ObjOffY==0){ left++; };
					if (ObjOffY>0){

						left++;

					}

				}

				if (ObjOffX>0){

					right++;

					if (ObjOffY==0){ right++; };
					if (ObjOffY>0){

						right++;

					}

				}

				if (ObjOffY>0){

					//right++;
					above++;

				}

			}

			if (left>right)
				type = 6;
		 	if (left<right)
				type = 8;
			if (left==right)
				type = 7;

			if (center>left)
			if (center>right)
				type = 7;


			if (above) {

				if (type==6) {
					type = 9;
				}
				if (type==7) {
					type = 10;
				}
				if (type==8) {
					type = 11;
				}

			}

			ObjA.tileType = type;

		}

		//Sort Y Depth

		this.gameobjectlist = this.gameobjectlist.sort(function(a,b){

			if (a.y>b.y)
			return -1;

			if (a.y<b.y)
			return 1;

			return 0;

		});

	}

	/* */

	this.drawData = function(){

		this.visuals.text("OFFX"+Math.round(this.off.x),125,125,"#FFFFFF");
		this.visuals.text("MAPSX"+Math.round(this.maps.x),125,145,"#FFFFFF");
		this.visuals.text("SCALE"+Math.round(this.app.client.scale*100)/100,125,165,"#FFFFFF");
		this.visuals.text("DELTA"+Math.round(this.app.client.delta*100)/100,125,185,"#FFFFFF");

	};

	/* */

	this.drawStars = function(){
		//this.visuals.image(this.drawStarsImages[0],-this.maps.x*0.02,0, this.alpha);
		//this.visuals.image(this.drawStarsImages[1],-this.maps.x*0.001,0, this.alpha);
		this.visuals.texture(this.loader.sprite4,0,0,326,200,0,0,0,-this.maps.x*0.009,0,1);
		this.visuals.texture(this.loader.sprite5,0,0,326,200,0,0,0,-this.maps.x*0.01,0,1);
	}

	/* */

	window.main = this;

	this.alpha = 1;

	this.ground = _GroundMoon.init(this.app);

	this._InitGameObjects();

	this._InitGameMap();

	this._InitPlayerObject();

	this._initGameLevel();


	return this;
};

var GameDraw = function() {

		this.drawStars();

		this.ground.draw(this.player);

			//Set MapPosition and Camera Offset

			if (!this.app.client.delta) {

				this.off.x += this.player.vel.x;
				this.maps.x += this.player.vel.x;

			} else {

				this.off.x += this.player.vel.x * this.app.client.delta;
				this.maps.x += this.player.vel.x * this.app.client.delta;

			}

			//Move Player and Ground

			this.ground.offx = -this.maps.x;

			this.player.off.x = -this.off.x;

			//Pan Offset

			if (this.off.x>50) {

				this.maps.x+= (this.off.x/100);
				this.off.x-= (this.off.x/100);

			} else if (this.off.x<-50) {

				this.maps.x+= (this.off.x/100);
				this.off.x-= (this.off.x/100);

			}



			for(var i = 0; i<=this.gameobjectlist.length-1; i++) {

				var obj = this.gameobjectlist[i];
				obj.off.x = this.off.x;
				var MAPS = new Math.Vector(this.maps.x,this.maps.y);
				//MAPS.x-=this.off.x;
				MAPS.x = this.maps.x;
				obj.draw(this.visuals,MAPS);
				switch(obj.type){

					case 100:
						if (obj._image_index<=obj.image_count)
							obj._image_index+=obj.image_speed,obj.image_index = Math.floor(obj._image_index);
							else obj.image_index = 4,obj._image_index = 0;
					break;


				}

			}

			for(var i = 0; i<=this.otherplayer.length-1; i++) {
				var player = this.otherplayer[i];
				if (i==0) {

					player.maps = this.maps;
					player.draw();

				} else {
					//player.position.x = window.position.x;
					//player.position.y = window.position.y;
					//player.vel.x = window.vel.x;
					//player.vel.y = window.vel.y;
					player.maps = this.maps;
					player.draw(window.position,window.vel);
					//this.visuals.text(Math.round(window.position.x),125,125,"#FFFFFF");
				}
			}

			this.drawData();

			};


var GameUpdate = function(){


	for(var i = 0; i<=this.gameobjectlist.length-1; i++) {
		var obj = this.gameobjectlist[i];
		obj.updateHit(this.player);
		obj.update(this.player);
	}

};




var _App_Main = {

	init:GameInit,

	update:GameUpdate,

	draw:GameDraw

};

var _App = ((SpiceJS.create()).OnLoad = function (self) {

	var width = _RESOLUTION_WIDTH;
	var height = _RESOLUTION_HEIGHT;

	self.game = _App_Main;
		self.main = LoadingScreen;

	self.start(width, height);

	window.Application = this;

	Application.state = function(){return Application.client.update.state;};
});
