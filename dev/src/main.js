enchant();

var core;

window.onload = function() {
	core = new Core(320, 320);
	core.fps = 24;
	core.touched = false;
	core.preload([
		'images/icon1.png'
	]);

	core.onload = function() {
		core.currentScene.backgroundColor = 'rgb(239, 228, 202)';
		
		
	};

	core.start();
};
