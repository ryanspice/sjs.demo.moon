
var _SOLID_COUNT = 0;

var _SOLID = function(temp){

	temp.update = function(){

		if (this.hit) {


		}

	}
	temp.draw = function(visuals,position){
	//	console.log('eh')

		if (this.breakable) {

				visuals.rect(this.x-position.x ,this.y-position.y,this.width,this.height,"#FFFFFF",0.5);
		} else {

				visuals.rect(this.x-position.x ,this.y-position.y,this.width,this.height,"#DDDDDD",0.5);

		}
		//visuals.image_part(this.image, this.x-position.x ,this.y-position.y, 1, this.image_alpha, 1, 70+70*this.image_index,80,70,80);

	}

};

var _Solid = function(){

	return (function(props){

		var _temp =  new _Thingy(props[0],props[1],props[2]);

		_temp.type = 100;
		_temp.solid = true;
		_temp.breakable = false;
		_temp.width = _temp.height = 32;
		_temp.width = 70;

		_temp.id = _SOLID_COUNT;

		_SOLID_COUNT++;

		_SOLID(_temp);

		return _temp;

	})(arguments);

};
