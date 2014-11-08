describe("FireBall", function(){
	var canvas, ctx;

	beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();

	oldGame = Game;
	SpriteSheet = {
		map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
			  ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
			  enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
			  enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
			  enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
			  enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 },
			  fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 12},
			  },
	  draw: function(ctx, name, x, y){},
	};

	});

	afterEach(function(){
	Game = oldGame;
	}); 
	
	
	it ("draw",function() {
	  bolaizquierda = new FireBall(50,50, true);
	  boladerecha = new FireBall(50,50, false);
	  spyOn(SpriteSheet,"draw");
	  bolaizquierda.draw(ctx); 
	  boladerecha.draw(ctx); 
	  expect(SpriteSheet.draw).toHaveBeenCalled();
	  expect(SpriteSheet.draw.calls[0].args[1]).toEqual("fireball");
	  expect(SpriteSheet.draw.calls[1].args[1]).toEqual("fireball"); 
	});
	
	it("step (al salir del canvas deben borrarse)",function(){
      var board = new GameBoard();
	  bolaizquierda = new FireBall(50,50, true);
	  boladerecha = new FireBall(50,50, false);
      board.add(bolaizquierda);
      board.add(boladerecha);
      spyOn(board, "remove");
      board.step(1000);
      expect(board.remove).toHaveBeenCalled();
 
    }); 
});
