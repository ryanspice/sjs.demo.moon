
var _MELON_COUNT = 0;

var _MELON = function(temp){

	temp.image_count = 4;
	temp._image_index = Math.floor(Math.random()*4);
	temp.image_speed = _MELON_IMAGESPEED;
	temp.image_index = 0;
	temp.image_alpha = 1;
	temp.off = new Math.Vector(0,0);

	temp.hitdurationmax = 11;
	temp.hitduration = 0;
	temp.update = function(){

		if (this.hit) {

			if (this.image_alpha-0.1>0)
			this.image_alpha-=0.1;


			if (this.hitdurationmax>this.hitduration) {

				this.y--;


				this.hitduration++;

			} else {

				this.delete = true;

			}

		}

	}
	temp.draw = function(visuals,position){

		//this.position = position;
		if (this.x-position.x<-window.innerWidth/3)
			return;

		if (this.x-position.x>window.innerWidth/1.5)
			return;

		visuals.image_part(this.image, this.x-position.x ,this.y-position.y, 1, this.image_alpha, 1, 70+70*this.image_index,80,70,80);

	}

};

var _Melon = function(){

	return (function(props){

		var _temp =  new _Thingy(props[0],props[1],props[2]);

		_temp.type = 100;

		_temp.id = _MELON_COUNT;

		_MELON_COUNT++;

		_MELON(_temp);

		return _temp;

	})(arguments);

};
