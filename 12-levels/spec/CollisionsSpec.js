/*

  Requisitos:

  El objetivo de este prototipo es que se detecten colisiones entre
  varios tipos de sprites:
  
  - Los misiles tienen ahora una nueva propiedad: el da�o (damage) que
    infligen a una nave enemiga cuando colisionan con ella. Cuando un
    misil colisione con una nave enemiga le infligir� un da�o de
    cierta cuant�a (damage) a la nave enemiga con la que impacta, y
    desaparecer�.

  - Las naves enemigas tienen ahora una nueva propiedad: su salud
    (health).  El da�o ocasionado a una nave enemiga por un misil har�
    que disminuya la salud de la nave enemiga, y cuando llegue a cero,
    la nave enemiga desaparecer�.

  - cuando una nave enemiga colisione con la nave del jugador, deber�
    desaparecer tanto la nave enemiga como la nave del jugador.



  Especificaci�n:

  En el prototipo 07-gameboard se a�adi� el constructor GameBoard. El
  m�todo overlap() de los objetos creados con GameBoard() ofrece
  funcionalidad para comprobar si los rect�ngulos que circunscriben a
  los sprites que se le pasan como par�metros tienen intersecci�n no
  nula. El m�todo collide() de GameBoard utiliza overlap() para
  detectar si el objeto que se le pasa como primer par�metro ha
  colisionado con alg�n objeto del tipo que se le pasa como segundo
  par�metro.

  En este prototipo se utilizar� el m�todo collide() para detectar los
  siguientes tipos de colisiones:

    a) detectar si un misil disparado por la nave del jugador
       colisiona con una nave enemiga

    b) detectar si una nave enemiga colisiona con la nave del jugador


  En el m�todo step() de los objetos creados con PlayerMissile() y
  Enemy(), tras "moverse" a su nueva posici�n calculada, se comprobar�
  si han colisionado con alg�n objeto del tipo correspondiente. 

  No interesa comprobar si se colisiona con cualquier otro objeto,
  sino s�lo con los de ciertos tipos. El misil tiene que comprobar si
  colisiona con naves enemigas. Por otro lado, tras moverse una nave
  enemiga, �sta tiene que comprobar si colisiona con la nave del
  jugador. Para ello cada sprite tiene un tipo y cuando se comprueba
  si un sprite ha colisionado con otros, se pasa como segundo
  argumento a collide() el tipo de sprites con los que se quiere ver
  si ha colisionado el objeto que se pasa como primer argumento.

  Cuando un objeto detecta que ha colisionado con otro, llama al
  m�todo hit() del objeto con el que ha colisionado. 


  Efectos de las colisiones de un misil con una nave enemiga:

    Cuando el misil llama al m�todo hit() de una nave enemiga, pasa
    como par�metro el da�o que provoca para que la nave enemiga pueda
    calcular la reducci�n de salud que conlleva la colisi�n. Cuando
    una nave enemiga recibe una llamada a su m�todo .hit() realizada
    por un misil que ha detectado la colisi�n, la nave enemiga
    recalcula su salud reduci�ndola en tantas unidades como el da�o
    del misil indique, y si su salud llega a 0 desaparece del tablero
    de juegos, produci�ndose en su lugar la animaci�n de una
    explosi�n.

    El misil, tras informar llamando al m�tod hit() de la nave enemiga
    con la que ha detectado colisi�n, desaparece.


  Efectos de las colisiones de una nave enemiga con la nave del jugador:

    Cuando la nave del jugador recibe la llamada .hit() realizada por
    una nave enemiga que ha detectado la colisi�n, la nave del jugador
    desaparece del tablero.

    La nave enemiga, tras informar llamando a hit() de la nave del
    jugador, desaparece tambi�n.

*/

describe("Collision", function(){
	var canvas, ctx;
	beforeEach(function () {
		loadFixtures('index.html');
		canvas = $('#game')[0];
		expect(canvas).toExist();
		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
		oldGame = Game;
		SpriteSheet = {
			map: {
			ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
			missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
			enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
			fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 12},
			explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
			},
		};
	});


	

  it("Alien destruido",function(){
	var board = new GameBoard();
	alien = new Enemy({ x: 1, y: 1, sprite: 'enemy_purple', health: 10  });
	var misil = new PlayerMissile(2,11);
	board.add(misil);
	board.add(alien);
	board.step(0);
	expect(board.objects.length).toBe(1);
	expect(board.objects[0].sprite).toBe("explosion");
  });	
	
  it("Alien da�ado pero no destruido",function(){
	var board = new GameBoard();
	alien = new Enemy({ x: 1, y: 1, sprite: 'enemy_purple', health: 20  });
	var misil = new PlayerMissile(2,11);
	board.add(misil);
	board.add(alien);
	board.step(0);
	expect(board.objects.length).toBe(1);
	expect(board.objects[0]).toBe(alien);
	expect(alien.health).toBe(10);
  });

  it("La bola destruye pero no desparece",function(){
	var board = new GameBoard();
	alien = new Enemy({ x: 1, y: 1, sprite: 'enemy_purple', B: 100, C: 2, E: 100, health: 20  });
	var bolafuego = new FireBall(1,1, false);
	alien.x = 1;
	alien.y = 1;
	bolafuego.x = 1;
	bolafuego.y = 1;
	bolafuego.vx = 0;
	bolafuego.vy = 0;
	alien.vx = 0;
	alien.vy = 0;

	board.add(bolafuego);
	board.add(alien);

	board.step(1);

	expect(board.objects.length).toBe(2);
	expect(board.objects[0].sprite).toBe(bolafuego.sprite);
	expect(board.objects[1].sprite).toBe("explosion");
  });

  it("Muerte de jugador (colision nave<->alien)",function(){
	var board = new GameBoard();
	alien = new Enemy({ x: 1, y: 1, sprite: 'enemy_purple', B: 100, C: 2, E: 100, health: 20  });
	var nave = new PlayerShip();
	nave.x = 1;
	nave.y = 1;
	board.add(nave);
	board.add(alien);
	board.step(0.1);
	expect(board.objects.length).toBe(1);
	expect(board.objects[0].sprite).toBe("explosion");
  });
  
});
