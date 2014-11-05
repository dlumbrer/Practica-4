/*

  Requisitos: 

  La nave del usuario disparará 2 misiles si está pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendrá un tiempo de recarga de 0,25s, no pudiéndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificación:

  - Hay que añadir a la variable sprites la especificación del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se añadirán
    misiles al tablero de juego en la posición en la que esté la nave
    del usuario. En el código de la clase PlayerSip es donde tienen
    que añadirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creación de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declararán los métodos de
    la clase en el prototipo

*/

describe("Missile", function(){
	var canvas, ctx;

	beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();

	oldGame = Game;
	});

	afterEach(function(){
	Game = oldGame;
	}); 

	
	it("Añadir Missile", function(){
		var board = new GameBoard();
		misil = new PlayerMissile(50,50);
		spyOn(board, 'add');
		board.add(misil);

		expect(board.add).toHaveBeenCalledWith(misil);
		
	});
	
	it("Movimiento y Velocidad", function(){
	
		  var board = new GameBoard();
		  misil = new PlayerMissile(100,100);

		  board.add(misil);
		  misil.step(0.1);
		  expect(misil.vy).toBe(-700);
		  expect(misil.y).toBe(40);
	
	});	
	
	it("Mantener tecla pulsada", function(){
		var board = new GameBoard();
		var nave = new PlayerShip();
		board.add(nave);
		Game.keys['fire'] = true;
		nave.step(1);
		nave.step(1);
		expect(board.objects.length).toBe(3);
		Game.keys['fire'] = false;
		nave.step(1);
		Game.keys['fire'] = true;
		nave.step(1);
		expect(board.objects.length).toBe(5);
		
		
	});
	
});
