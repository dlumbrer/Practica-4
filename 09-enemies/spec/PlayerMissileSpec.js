/*

  Requisitos: 

  La nave del usuario disparar� 2 misiles si est� pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendr� un tiempo de recarga de 0,25s, no pudi�ndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificaci�n:

  - Hay que a�adir a la variable sprites la especificaci�n del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se a�adir�n
    misiles al tablero de juego en la posici�n en la que est� la nave
    del usuario. En el c�digo de la clase PlayerSip es donde tienen
    que a�adirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creaci�n de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declarar�n los m�todos de
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

	
	it("A�adir Missile", function(){
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
		  expect(misil.y).toBe(20);
	
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
