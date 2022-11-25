
var _UNIT_COUNT = 0;

var _Unit = function(){

	return (function(position){

		var _temp =  new Math.Vector(position[0],position[1]);

		_temp.type = 0;

		_temp.id = _UNIT_COUNT;

		_UNIT_COUNT++;

		return _temp;

	})(arguments);

};
