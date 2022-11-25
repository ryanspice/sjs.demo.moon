
						var _GroundMoon = {

							init:function(app){




								this.app = app;
								this.graphics = this.app.client.graphics;
								this.visuals = this.app.client.visuals;

								this.spritelist = [];

								let data = [
									'../images/moon-ground',
									'../images/moon-earth'
								];

								this.datacount = 0;

								for(var i = 0; i<data.length; i++)
								this.app.client.loader.asyncLoadImage('./'+data[i],'./'+data[i]).then((st)=>{
									this.spritelist['sprite'+this.datacount] = st;
									this.datacount++;
								});

								this.position = {x:0,y: this.app.client.height-54};
								this.position = new Math.Vector(30,this.app.client.setHeight-54);

								this.off = {x:0,y:0};


								this.offx = 0;
								this.alpha = 1;
								return this;

							},

							update:function(){},

							draw:function(player){

								//var mpx = (-player.position.x)/10;
							//	var mapXmultiplier = 0.1;
								//if (this.position.x!=player.position.x)
								//	this.position.x=mpx;
								//this.position.x = -map.x;


								this.visuals.image_centered(this.spritelist['sprite0'],this.position.x+this.offx,this.position.y, this.alpha);
								this.visuals.image_centered(this.spritelist['sprite0'],this.position.x+this.offx+this.spritelist['sprite0'].width,this.position.y, this.alpha);
								this.visuals.image_centered(this.spritelist['sprite0'],this.position.x+this.offx+this.spritelist['sprite0'].width*2,this.position.y, this.alpha);
								this.visuals.image_centered(this.spritelist['sprite0'],this.position.x+this.offx+this.spritelist['sprite0'].width*3,this.position.y, this.alpha);
								//this.visuals.image_centered(this.spritelist['ground'],this.offx+app.width/2,this.position.y, this.alpha);
								//this.visuals.image_centered(this.spritelist['ground'],this.offx+app.width*1.8,this.position.y, this.alpha);
								//this.visuals.image_centered(this.spritelist['ground'],this.offx-app.width*0.8,this.position.y, this.alpha
								this.visuals.image_centered(this.spritelist['sprite1'],this.position.x+this.offx*0.005+this.app.width*0.75,this.position.y*0.25, this.alpha);

							}

						}
