
var _THINGY_COUNT = 0;

var _Thingy = function(){

	var Thingy = function forgeimage(temp){

		temp.off = new Math.Vector(0,0);
		temp.hit = false;
		temp.updateHit = function(other){

			this.app = SpiceJS.controller.list(0);
			var a = -this.app.client.setWidth/2 + this.x-main.maps.x-main.off.x-_Player.vel.x;
			var py = (_Player.position.y+_Player.vel.y);
			if (-16+this.y-py<64)
			if (-16+this.y-py>-64)
			if (a>-30)
			if (a<30) {

					this.hit = true;


			}

			var w = 32;
			var w2 = 35;

			if (a>-w)
			if (a<0)
			if (this.breakable == true)
				if (_Player.vel.x<0)
				_Player.vel.x = _Player.vel.x/-a;
			if (a>0)
			if (a<w)
			if (this.breakable == true)
				if (_Player.vel.x>0)
				_Player.vel.x = _Player.vel.x/-a;


			if (a>-w2)
			if (a<w2)
			{

				if (-w/2+this.y-py>-8)
				if (-w/2+this.y-py<w/2)
				if (this.solid == true)
					_Player.free = false,_Player.position.y=(-16+this.y-16);

			}else
			if (a>-w2*1.5)
			if (a<w2*1.5)
			{
				/*
								if (-w/2+this.y-py>-w/2)
								if (-w/2+this.y-py<w/2)
								if (this.solid == true)
									_Player.free = false,_Player.position.y=(-16+this.y-16);
				*/
			}

			if (_Player.jumping == false)
			if (_Player.free == true) {

				//if (_Player.vel.y<0.7)
				if (_Player.vel.y<0.57)
				if (a>-w)
				if (a<w)
				if (-w/2+this.y-py<30)
				if (-w/2+this.y-py>8)
				if (this.solid == true)
				_Player.free = false,_Player.position.y=(-16+this.y-16);


			}

			return;
			//var position = new Math.Vector(this.x-this.positon.x,0);
			/*
			var other_position = new Math.Vector(other.position.x,other.position.y);
			var offset = (new Math.Vector()).Difference(this.position, other_position)



			if ((offset.x<25)&&
				(offset.y<40)&&
				(offset.y<40)&&
				(offset.x>-25))
				this.hit = true;
			*/
		};

		temp.delete = false;

	};

	return (function(props){

		var _temp =  new Math.Vector(props[0],props[1]);

		_temp.type = 0;

		_temp.image = props[2];

		_temp.id = _THINGY_COUNT;

		_THINGY_COUNT++;

		Thingy(_temp);

		return _temp;

	})(arguments);

};
