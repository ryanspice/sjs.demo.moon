
var _GROUNDTILE_COUNT = 0;

var _GROUNDTILE = function(temp){

	temp.update = function(){

		if (this.hit) {


		}

	}
	temp.draw = function(visuals,position){
	//	console.log('eh')


	var x = Math.floor(this.x-position.x);



	if (x<-window.innerWidth/3)
		return;

	if (x>window.innerWidth/1.5)
		return;

		switch (this.tileType){

			case 1:

			visuals.image_part(this.image, x ,13+this.y-position.y, 1, this.image_alpha, 1, 70*5,80*3,70,80);

			//visuals.image_part(this.image, x ,-1+this.y-position.y, 1, this.image_alpha, 1, 70,80*3,70,80);
			break;

			case 2:
				visuals.image_part(this.image, x ,13+this.y-position.y, 1, this.image_alpha, 1, 70*3,80*3,70,80);

			//visuals.image_part(this.image, x ,27+this.y-position.y, 1, this.image_alpha, 1, 140,80*3,70,80);
			break;

			case 3:
			//visuals.image_part(this.image, x ,27+this.y-position.y, 1, this.image_alpha, 1, 210,80*3,70,80);

			break;

			case 4:
				visuals.image_part(this.image, x ,13+this.y-position.y, 1, this.image_alpha, 1, 70*4,80*3,70,80);
			//visuals.image_part(this.image, x ,27+this.y-position.y, 1, this.image_alpha, 1, 280,80*3,70,80);

			break;

			case 6:
				visuals.image_part(this.image, x ,13+this.y-position.y, 1, this.image_alpha, 1, 70*7,80*3,70,80);
			break;
			case 7:
				visuals.image_part(this.image, x ,13+this.y-position.y, 1, this.image_alpha, 1, 70*1,80*3,70,80);
			break;
			case 8:
				visuals.image_part(this.image, x ,13+this.y-position.y, 1, this.image_alpha, 1, 70*2,80*3,70,80);
			break;


			case 9:
				visuals.image_part(this.image, x ,13+this.y-position.y, 1, this.image_alpha, 1, 70*3,80*3,70,80);
			break;
			case 10:
				visuals.image_part(this.image, x ,13+this.y-position.y, 1, this.image_alpha, 1, 70*5,80*3,70,80);
			break;
			case 11:
				visuals.image_part(this.image, x ,13+this.y-position.y, 1, this.image_alpha, 1, 70*6,80*3,70,80);
			break;


		}
	}

};

var _GroundTile = function(){

	return (function(props){

		var _temp =  new _Solid(props[0],props[1],props[2]);

		_temp.type = 101;
		_temp.cliffLeft = false;

		_temp.tileType = 1;

		_temp.id = _GROUNDTILE_COUNT;

		_GROUNDTILE_COUNT++;

		_GROUNDTILE(_temp);

		return _temp;

	})(arguments);

};
