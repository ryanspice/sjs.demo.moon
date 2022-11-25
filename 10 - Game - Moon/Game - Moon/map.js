
var Tile = {

	position: new Math.Vector(0,0)


};

var _TileID = 0;
var _Tile = function(){

	return (function(props){

		var _tile =  new Math.Vector(props[0],props[1]);

		_tile.type = 0;

		_tile.id = _TileID;

		_TileID++;

		return _tile;

	})(arguments);

};


const map = {

	data:[],
	_tile_size:0,
	init:function(){

		var _size = 1024;
		var _tile_size = this._tile_size = 32 +2;

		this.width = _size / _tile_size;
		this.height = _size /_tile_size;

		var _map = [];


		this.loopdata = function(fun){

			for(var x = 0; x<this.width; x++)
				for(var y = 0; y<this.height; y++) {

					fun(x,y);
					//_map.indexOf(id-1).position = x;
					//console.log(id);

				}

		}

		this.populatedata = function(x,y){

			var temp = _Tile(x * _tile_size, y * _tile_size);
			var id = _map.push(temp);

		}

		this.loopdata(this.populatedata);


		this.unitdata = [];

		this.unitdata.push(_Unit(0,0))

		this.data = _map;

	},

	update:function(){

		let a = 0;
		a++;

	},

	draw:function(){



		for(var i = 0; i<this.data.length;i++) {

			var temp = this.data[i];
			var position = temp.position;
/*
			switch (temp.type){

				case 0:
					this.visuals.rect( Math.floor(this.data[i].position.x),Math.floor(this.data[i].position.y),32,32,"#1111FF");

				break;

				case 1:

					this.visuals.rect( Math.floor(this.data[i].position.x),Math.floor(this.data[i].position.y),32,32,"#333333");

				break;

				case 2:

					this.visuals.rect( Math.floor(this.data[i].position.x),Math.floor(this.data[i].position.y),32,32,"#115511");

				break;

				case 3:

					this.visuals.rect( Math.floor(this.data[i].position.x),Math.floor(this.data[i].position.y),32,32,"#FFFFFF");

				break;

			}
*/
			if (i%2 == 0)
				this.visuals.rect( Math.floor(this.data[i].position.x),Math.floor(this.data[i].position.y),32+6,32+6,"#FFFFFF");
				else
				this.visuals.rect( Math.floor(this.data[i].position.x),Math.floor(this.data[i].position.y),32+6,32+6,"#DDDDDD");
		}
		
		for(var i = 0; i<this.unitdata.length;i++) {

			var unit = this.unitdata[i];
			var position = unit.position;
			this.visuals.rect(position.x,position.y,16,16,"#FF2222");

		}

	}

}
