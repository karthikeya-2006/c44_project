class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200,20,70);
    player1.addImage("player1",player1img);
    player2 = createSprite(100,400,20,70);
    //car2.addImage("car2",car2_img);
    enemy1 = createSprite(600,200,20,70);
    //car3.addImage("car3",car3_img);
    enemy2 = createSprite(700,200,20,70);
    //car4.addImage("car4",car4_img);
    //cars = [car1, car2, car3, car4];
    enemy3 = createSprite(800,200,20,70);
    enemy4 = createSprite(900,200,20,70);
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    //player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      //image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //cars[index - 1].shapeColor = "red";
          fill("red");
          ellipse(x,y,150,150);
          
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      player.rank+= 1;
      gameState = 2;
      Player.updateCarsAtEnd(player.rank);
      
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log("rank:"+ player.rank);
  }
}
