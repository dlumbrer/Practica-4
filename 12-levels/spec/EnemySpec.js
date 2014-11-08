/*

  Requisitos:

  El objetivo de este prototipo es a�adir al juego naves enemigas. Las
  naves se a�adir�n al tablero de juegos (objeto GameBoard) al igual
  que el resto de los elementos del juego (nave del jugador y
  misiles).

  Cada nave enemiga debe tener un patr�n de movimiento que exhibir�
  desde que entra por la parte superior del canvas hasta que
  desaparece por la parte inferior. En este prototipo las naves
  enemigos no interaccionan con el resto de los elementos del juego:
  los disparos de la nave del jugador no les afectan. La nave del
  jugador tampoco se ve afectada por la colisi�n con una nave enemiga.


  Especificaci�n:

  1. El patr�n de movimiento lo dictan las ecuaciones que se
     utilizar�n para calcular las componentes vx e vy de su velocidad.
     Los par�metros de las ecuaciones que definen vx e vy determinan
     el patr�n de comportamiento:

     vx = A + B * sin (C * t + D) 
     vy = E + F * sin (G * t + H)

     siendo t la edad de un enemigo, calculada como el tiempo que ha
     pasado desde que se cre� la nave.

     A: componente constante de la velocidad horizontal
     B: fuerza de la velocidad horizontal sinusoidal
     C: periodo de la velocidad horizontal sinusoidal
     D: desplazamiento en el tiempo de la velocidad horizontal
        sinusoidal

     E: componente constante de la velocidad vertical
     F: fuerza de la velocidad vertical sinusoidal
     G: periodo de la velocidad vertical sinusoidal
     H: desplazamiento en el tiempo de la velocidad vertical
        sinusoidal

     Todos estos par�metros tendr�n un valor por defecto de 0
     (definido en la variable baseParameters en el constructor), que
     puede ser substituido por otro valor cuando se crea la nave.


  2. Se crear� un nuevo constructor/clase Enemy. Los enemigos se
     diferenciar�n s�lo en su posici�n inicial, en el sprite que
     utilizan y en el patr�n de movimiento (par�metros A..H de la
     velocidad), pero todos ser�n de la misma clase: Enemy.

     Para definir diferentes tipos de enemigos se pasar� al
     constructor una plantilla con valores para las propiedades (x, y,
     sprite, A..H).

     Para poder definir f�cilmente enemigos parecidos creados a partir
     de una misma plantilla, se pasar� un segundo argumento al
     constructor con valores alternativos para algunas de las
     propiedades de la plantilla.

*/

describe("Enemies", function(){
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
	  alien = new Enemy({ x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 });
	  spyOn(SpriteSheet,"draw") ;
	  alien.draw(ctx); 
	  expect(SpriteSheet.draw).toHaveBeenCalled() ; 
	}); 
	
	
	
	
	it("step",function(){
      var board = new GameBoard();    
      alien = new Enemy({ x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 });
      board.add(alien);
      alien.step(1);
      expect(alien.y).toBeGreaterThan(0); 
    });
	
	
});