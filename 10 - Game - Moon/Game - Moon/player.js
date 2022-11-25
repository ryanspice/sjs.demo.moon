var _STAR_RADIUS_MULTIPLIER = 0.45;
var _GRAVITY = 1.7028871391075;
window.position = {x:0,y:0};
window.vel = {x:0,y:0};
window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
	e.gamepad.index, e.gamepad.id,
	e.gamepad.buttons.length, e.gamepad.axes.length);
});
function buttonPressed(b) {
  if (typeof(b) == "object") {
	return b.pressed;
  }
  return b == 1.0;
}





var xhttp = new XMLHttpRequest();
var ID = 0;


var _Player = {

	init:function(state){

		this.id = ID++;
		this.state = state;
		this.app = state.app;
		this.graphics = state.app.client.graphics;
		this.visuals = state.app.client.visuals;
		//this.visuals.setBleed(0.5);
		this.gamepad = {
			left:0,
			right:0,
			up:0,
			down:0
		};
		this.free = true;
		this.spritelist = [];
		this.spritelist['moon-character'] = state.loader.sprite3;
//					this.spritelist['moon-man-spritesheet'] = this.graphics.load('moon-man-spritesheet','moon-man-spritesheet');

		this.density = 1;

		this.position = {x:this.app.width/2,y:325};
		this.vel = {x:0,y:0};

		this.jumping = false;
		this.off = new Math.Vector(0,0);

		this.imgoffx = 0;
		this.imgoffy = 0;
		this.start = true;



		this.walk_speed = _PLAYER_SPEED;

		return this;

	},

	checkGravity:function(){

		this.gamepad = this.app.input.gamepads;
		var y = this.position.y;
		var free = true;
		var freex = true;
		var groundy = 76;

		if (y + this.vel.y < this.app.height-groundy) {

			free = true;

		} else {

			free = false;

		}


		free = this.free;

		if (free) {

			this.position.y+=this.vel.y;

		}

		this.free = true;

		return free;

	},

	update:function(position){

		this.update_image();

		if (!this.app.input.gamepads)
			return;

		var free = true;
		var groundy = 76;

		free = this.checkGravity();

		//if (this.app.input.touch==false)
		//if (this.app.input.pressed)

		if (
			(this.app.input.keyController.keyboardCheck('space')) ||
			(this.gamepad.y)||
			(this.gamepad.x)||
			(this.gamepad.b)||
			(this.gamepad.a)
		) {
		if (this.jumping == false) {
			this.jumping = true,this.position.y+=this.vel.y -=_PLAYER_JUMP_VELOCITY || Math.sqrt(this.density / _GRAVITY)*2, free = true;




			}
		}

		if (
			(this.gamepad.up)
		) {
			if (this.jumping == false) {
				//this.jumping = true,this.vel.y-=Math.sqrt(this.density * 3 * _GRAVITY), free = true;

			}
		}



		var delta = 1 || this.app.client.delta;

		if (free)
		this.vel.y += (_GRAVITY*this.density/60) * delta;
		else {
			this.vel.y = 0,this.jumping = false;

		}

		this.movement(free,position);


	},

	movement:function(ground,position){

		var left = this.gamepad.left || this.app.input.keyController.keyboardCheck('leftarrow') || this.app.input.keyController.keyboardCheck('a');
		var right = this.gamepad.right || this.app.input.keyController.keyboardCheck('rightarrow') || this.app.input.keyController.keyboardCheck('d');
		var up = this.gamepad.up || this.app.input.keyController.keyboardCheck('uparrow') || this.app.input.keyController.keyboardCheck('w');
		var down = this.gamepad.up || this.app.input.keyController.keyboardCheck('downarrow') || this.app.input.keyController.keyboardCheck('s');
		var space = this.app.input.keyController.keyboardCheck('space');
		var z = this.app.input.keyController.keyboardCheck('z');
		var x = this.app.input.keyController.keyboardCheck('x');


		//this.visuals.setBleed(0.5);
		var xd = 0;

		//if (this.id == 0)
		xd = left*-1050 || right*1050 || 0;
		//if (this.app.input.released)
		//	xd = xDistance;

		var maxspeed = this.walk_speed;
		/*
		if (this.gamepad.trigger_left || space) {
			maxspeed = this.walk_speed*5;
		} else maxspeed = this.walk_speed;
		*/


		if (xd * 0.01 / this.density)
			this.vel.x = xd * 0.01 / this.density;

		if (this.vel.x>maxspeed)
			this.vel.x = maxspeed;

		if (this.vel.x<-maxspeed)
			this.vel.x = -maxspeed;

		if (!ground)
			this.vel.x*= 0.5;
		else
			this.vel.x*=0.9;

		if (this.vel.x<0)
		if (this.vel.x>-0.01) {

			this.vel.x = -0.001;

		}
		if (this.vel.x>0)
		if (this.vel.x<0.01) {

			this.vel.x = 0.001;

		}

		var leftCameraLock = this.app.width*0.45;
		var rightCameraLock = this.app.width*0.45;

		//if (this.position.x+this.vel.x>leftCameraLock)
		//if (this.position.x+this.vel.x<this.app.width-rightCameraLock)
		this.position.x+=this.vel.x * this.app.client.delta;

	},

	/*
	*	Increase image_index
	*/

	update_image:function(){

		//if ((this.start==true)&&(position)) this.position = position,this.start = false;

		if (this.vel.x!=0){


			if (this.imgoffx<=_PLAYER_IMAGE_COUNT) {

				this.imgoffx += _PLAYER_IMAGESPEED_ * this.app.client.delta;

			} else {

				this.imgoffy = 0, this.imgoffx =0;

			}


		} else {

			this.imgoffx = 0;

		}

		if (this.imgoffy>1) {

			this.imgoffy = 0;

		}

	},

	/*
	*	draws player
	*/

	draw:function(position,vel){

		this.update(position);

		if (vel) this.vel = vel;

		var r = -0;
		var w = 70;
		var x = y = 0;

		x = this.position.x*0.5;
		x =1/this.app.client.scale + -this.off.x + this.app.client.setWidth/2;
		y = this.position.y;

		if (this.vel.x>0){


			///x = this.position.x+r;
			//x = this.app.client.setWidth/2;

			if (this.vel.x>0.1)
			this.visuals.image_part(this.spritelist['moon-character'], x ,y, 1, this.alpha, 1, w+w*Math.floor(this.imgoffx),0+80*Math.floor(this.imgoffy),w,80);
			else
			this.visuals.image_part(this.spritelist['moon-character'], x,y, 1, this.alpha, 1, 0,0,w,80);

		} else {


			x =-5/this.app.client.scale + this.off.x + this.app.client.setWidth*0.5 -this.app.client.width/this.app.client.scale;// + 70/this.app.client.scale;
			this.visuals.buffer_context.scale(-1, 1);
			if (this.vel.x<-0.1)
			this.visuals.image_part(this.spritelist['moon-character'], x ,y, 1, this.alpha, 1, w+w*Math.floor(this.imgoffx),0,w,80);
			else
			this.visuals.image_part(this.spritelist['moon-character'], x,y, 1, this.alpha, 1, 0,0,w,80);

				this.visuals.buffer_context.scale(-1, 1);

		}
		if ((this.vel.x<0.1)&&(this.vel.x>-0.1)||(this.vel.x==0)) {


			x = this.position.x+r;
			y = this.position.y;
			//this.visuals.image_part(this.spritelist['moon-character'], x,y, 1, this.alpha, 1, 0,0,w,80);
		}


						 r = -this.maps.x;

	}

}

						var _TitleMoon = {

							init:function(app){

								this.app = app;
								this.graphics = this.app.client.graphics;
								this.visuals = this.app.client.visuals;

								this.spritelist = [];
								//this.spritelist['moon'] = this.graphics.load('title-moon','title-moon');

								this.position = {x:0,y:0};
								this.off = {x:0,y:0};

								this.position.y = app.height/4.5;

								this.alpha = 0;

								return this;

							},

							update:function(){},

							draw:function(){

								if (this.alpha+0.01 <1)
									this.alpha+=0.01;
									else this.alpha = 1;

								this.off.y = 15*Math.sin(new Date().getTime()/640);

								this.visuals.image_centered(this.spritelist['moon'],app.width/2,this.position.y+this.off.y, this.alpha);

								this.visuals.text("Start Game",app.width/2,this.position.y+200, "#FFFFFF", "23px","32px");

								this.visuals.text("Credits",app.width/2,this.position.y+240, "#EEEEEE", "23px","32px");

							}

						}


						var _Dust = {

							init:function(app){


								this.app = app;
								this.graphics = this.app.client.graphics;
								this.visuals = this.app.client.visuals;

								this.spritelist = [];
								this.spritelist['dust'] = this.graphics.load('./images/moon-dust','./images/moon-dust');

								this.position = {x:110,y:110};
								this.off = {x:0,y:0};

								this.random =-2 * Math.random()*4;
								this.alpha = 1;

								return this;

							},

							update:function(){},

							draw:function(index,r){
								this.position.x+= this.random/20 + (-1+index)/20;
								this.position.y-=this.alpha/5;
								if (this.alpha-0.02>=0)
									this.alpha-=0.02;

									if (index>2)
										index = 1;

									if (index>3)
										index = 1;
								this.visuals.image_part(this.spritelist['dust'],this.position.x+r,this.position.y, 1+(1 - 1-this.alpha), this.alpha, 1,20*index,0,20,20);
								this.visuals.opacity(1);
							},

							spawn(position){

								this.random =-Math.random()*2 * Math.random()*2;
								var random2 =-Math.random()*2 * Math.random()*2;

								this.position.x = position.x + this.random;
								this.position.y = position.y+9+random2;
								this.alpha = 1;


							}

						};

						var _Asteroid = {

							init:function(app){


								this.app = app;
								this.graphics = this.app.client.graphics;
								this.visuals = this.app.client.visuals;

								this.spritelist = [];
								this.spritelist['asteroid'] = this.graphics.load('./images/asteroid_strip64_sml','./images/asteroid_strip64_sml');

								this.position = {x:110,y:30};
								this.off = {x:0,y:0};

								this.index = 0;
								this.random =-2 * Math.random()*4;
								this.alpha = 1;

								return this;

							},

							update:function(){},

							draw:function(index){
								this.position.x+= 0.01;

									this.index+=0.001;
									if (this.index>63)
										this.index = 0;
								this.visuals.image_part(this.spritelist['asteroid'],this.position.x*0.35+40,this.position.y-5, 0.4, this.alpha, 1,25*Math.round(this.index),0,25,25);

																			this.index+=0.1;
								this.visuals.image_part(this.spritelist['asteroid'],this.position.x*0.35+30,this.position.y+5, 0.34, this.alpha, 1,25*Math.round(this.index),0,25,25);

									this.position.x+= 0.01;

										this.index+=0.01;
														this.index+=0.1;

								this.visuals.image_part(this.spritelist['asteroid'],this.position.x*0.5,this.position.y, 0.75, this.alpha, 1,25*Math.round(this.index),0,25,25);

									this.position.x+= 0.01;

										this.index+=0.01;
														this.index+=0.1;
								this.visuals.image_part(this.spritelist['asteroid'],this.position.x*0.7-25,this.position.y-25, 0.5, this.alpha, 1,25*Math.round(this.index),0,25,25);

									this.position.x+= 0.01;

										this.index+=0.01;
														this.index+=0.1;
								this.visuals.image_part(this.spritelist['asteroid'],this.position.x*0.75-15,this.position.y+30, 0.5, this.alpha, 1,25*Math.round(this.index),0,25,25);
								this.visuals.image_part(this.spritelist['asteroid'],this.position.x*0.45-20,this.position.y+10, 0.5, this.alpha, 1,25*Math.round(this.index),0,25,25);

									this.position.x+= 0.01;

										this.index+=0.01;
														this.index+=0.1;
								this.visuals.image_part(this.spritelist['asteroid'],this.position.x*0.8+15,this.position.y+10, 0.5, this.alpha, 1,25*Math.round(this.index),0,25,25);
								this.visuals.image_part(this.spritelist['asteroid'],this.position.x*0.3+15,this.position.y+10, 0.15, this.alpha, 1,25*Math.round(this.index),0,25,25);
								this.visuals.image_part(this.spritelist['asteroid'],this.position.x*0.3-15,this.position.y-10, 0.15, this.alpha, 1,25*Math.round(this.index),0,25,25);
								this.visuals.image_part(this.spritelist['asteroid'],this.position.x*0.5+15,this.position.y-10, 0.15, this.alpha, 1,25*Math.round(this.index),0,25,25);
								this.visuals.image_part(this.spritelist['asteroid'],this.position.x*0.5-15,this.position.y+20, 0.15, this.alpha, 1,25*Math.round(this.index),0,25,25);

									this.position.x-= 0.04;

										this.index-=0.04;
														this.index-=0.5;
							},

							spawn(position){

								this.random =-Math.random()*2 * Math.random()*2;
								var random2 =-Math.random()*2 * Math.random()*2;

								this.position.x = position.x + this.random;
								this.position.y = position.y+9+random2;
								this.alpha = 1;


							}

						};
