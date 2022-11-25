var LoadingInit = function(){

	this.spritelist = [];
	this.data = [
		'../images/moon-ground',
		'../images/moon-earth',
		'../images/moon-character',
		'../images/moon-stars0',
		'../images/moon-stars1'
	];

	this.datacount = 0;
	this.loadcount = 0;

	var self = this;
	var data = this.data;

	for(var i = 0; i<data.length; i++)
	this.app.client.loader.asyncLoadImage('./'+data[i],'./'+data[i]).then(function(st){

		self.datacount++;
		self['sprite'+self.datacount] = st;

		var img =self['sprite'+self.datacount];
		img.onload = function(){

				setTimeout(function(){
					self.loadcount++;
				},20);

		};

	});

	this.time = 100;
	this.timetostart = 0;

	this.loaded = false;
	this.colour = "#DD0000";

};

var LoadingScreen = {

	init:LoadingInit,

	update:function(){


		return;
	},

	draw:function(){

		var T = this.time;

		if (this.time-1>=0)
			this.time = this.data.length-this.loadcount;

		if (this.time==0)
			this.timetostart++;

		if (this.timetostart==2) {
			this.app.game.app = (this.app);
			this.app.game.graphics = (this.app.client.graphics);
			this.app.game.visuals = (this.app.client.visuals);
			this.app.game.loader = this;
			this.app.client.update.state = this.app.game;

			return;
		}

		if (this.time<8)
			this.colour = "#DDD000";

		if (this.time<1)
			this.colour = "#00FF00";

		var d = 15;
		var time = new Date().getTime();

		var y = Math.cos(time/360) * d;
		var x = Math.sin(time/360) * d;

		this.visuals.circle(this.app.width/2 + x,this.app.height/2+y,2.5,this.colour);

		for(var i = 0; i<6; i++){

			time = new Date().getTime() + 380 * i;

			y = Math.cos(time/360) * d + Math.sin(time/180)*T;
			x = Math.sin(time/360) * d + Math.cos(time/180)*T;

			this.visuals.circle(this.app.width/2 + x,this.app.height/2+y,2.5,this.colour);

		}

		return;
	}

};
