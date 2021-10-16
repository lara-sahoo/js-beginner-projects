class SnakeGame {
  constructor() {

    this.state = {
      gameover: false,
      direction: 2,
      snake: [
        { x: 10, y: 10,direction:2 },
      ],
      food: { x: 0, y: 0 },
      score: 0,
      speed:1000,
    }

    this.speed = {
      easy: 800,
      medium: 400,
      hard:100,
    }
    this.canvas = {
      height:250,
      width:250,
    }
    
    this.soundEffects = {
      score: new Audio('./audio/eat.mp3'),
      gameOver: new Audio('./audio/dead.mp3')
    }

    if (localStorage.getItem("highScore") === null) {
      localStorage.setItem("highScore", this.state.score);
    }
    
    this.init()
    
    this.resetListner()
    this.keyEventListner()
    this.startListner()
  }

  elements = {
    score : document.getElementById("scoring"),
    highScore : document.getElementById("highScore"),
    gameStartBtn : document.getElementById("gameStartBtn"),
    playAgainBtn : document.getElementById("playAgainBtn"),
    formBoard: document.getElementById("formBoard"),
    scoreBoard: document.getElementById("scoreBoard"),
    difficultyIp: document.getElementById("difficultyIp"),
    heightIp: document.getElementById("heightIp"),
    widthIp: document.getElementById("widthIp"),
    message: document.getElementById("message"),
    canvas : document.getElementById("draw-board"),
    ctx : document.getElementById("draw-board").getContext("2d"),
  }

  init() {
    this.state.snake[0] = this.generateRandom(0)
    this.state.snake[0].direction = 0
    this.state.food = this.generateRandom(1)
    this.checkDirection()
    this.updateScore()
    this.drawBackground()
    this.drawSnake()
    this.drawFood(this.state.food.x,this.state.food.y)
  }

  generateRandom(isFood) {
    let maxX = this.canvas.width/10-3
    let maxY = this.canvas.height/10-3
    //   Random box between canvas size and Multiplied by 10 since size = height*width
    let x = Math.floor(Math.random() * (maxX-3+1)+3) * 10;
    let y = Math.floor(Math.random() * (maxY-3+1)+3) * 10; 
    // coordinates for food and checking if snake and food position are not the same
    if(isFood)
    {
      while (this.state.snake.some(part => part.x === x && part.y === y)) {
        x = Math.floor(Math.random() * (maxX-3+1)+3) * 10;
        y = Math.floor(Math.random() * (maxY-3+1)+3) * 10;
      }      
    }
    return { x, y };
  }

  checkDirection(){
    const {snake} = this.state
    const {height,width} = this.canvas 
    if(width>height){
      this.state.direction = (snake[0].x > width/2) ? -2 : 2      
    }
    else{
      this.state.direction = (snake[0].y > height/2) ? -1 : 1      
    }
    this.state.snake[0].direction = this.state.directions
  }

  drawBackground(){
    this.elements.canvas.setAttribute('height',this.canvas.height);
    this.elements.canvas.setAttribute('width',this.canvas.width);

    const {ctx} = this.elements
    ctx.fillStyle="#c8e4bd";
    ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
  }

  drawFood(x,y) {

    const {ctx} = this.elements
    ctx.beginPath();
    ctx.fillStyle="red";
    // Making a circle
    ctx.arc(x+5,y+5,5,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  drawSnakePart(x,y,head=false) {
    const {ctx} = this.elements
    ctx.fillStyle = head ? "#0b3e9c":"#536aec";
    // size of each rectange is 10x10
    ctx.fillRect(x,y,10,10);
  }

  drawSnake() {
    const {ctx} = this.elements
    const {snake} = this.state
    //   we draw the snake form tail so that head is drawn last. It makes the head appear above all other drawings.
    for (let i = snake.length - 1; i >= 0; --i) {
      this.drawSnakePart(snake[i].x, snake[i].y, i === 0);
    }
  }

// Game Logic

  mod(m, val) {
    while (val < 0) {
      val += m;
    }
    return val % m;
  }

  addPart() {
    let {snake} = this.state
    let tail = snake[snake.length - 1];

    let direction = tail.direction;
    let x = tail.x;
    let y = tail.y;
    // finding the new parts coordinates according to tail
    switch (direction) {
      // DOWN
      case 1:
        y = this.mod(this.canvas.height, y - 10);
        break;
      // UP
      case -1:
        y = this.mod(this.canvas.height, y + 10);
        break;
      // LEFT
      case -2:
        x = this.mod(this.canvas.width, x + 10);
        break;
      // RIGHT
      case 2:
        x = this.mod(this.canvas.width, x - 10);
        break;
    }
    snake.push({ x, y, direction });
  }

  updateScore(){
    this.elements.score.innerHTML = "Score: " + this.state.score
    this.elements.highScore.innerHTML = "High Score: "+localStorage.getItem("highScore");
  }

  pauseSound(){

    this.soundEffects.score.pause()
    this.soundEffects.score.currentTime = 0
    this.soundEffects.gameOver.pause()
    this.soundEffects.gameOver.currentTime = 0
     
  }

  eatFood() {
    const {snake,food,score} = this.state
    let x = snake[0].x;
    let y = snake[0].y;
    
    let fx = food.x;
    let fy = food.y;
    // if head and food are at same position
    if (x == fx && y == fy) {
      this.pauseSound()

      this.soundEffects.score.play();
      this.state.score++;
      this.updateScore()
      this.addPart();
      this.state.food = this.generateRandom(1);
    }
  }

  moveSnake() {
    let {snake,direction} = this.state
    let x = snake[0].x;
    let y = snake[0].y;

    switch (direction) {
      //DOWN
      case 1:
        y = this.mod(this.canvas.height, y + 10);
        break;
      //UP
      case -1:
        y = this.mod(this.canvas.height, y - 10);
        break;
      //LEFT
      case -2:
        x = this.mod(this.canvas.width, x - 10);
        break;
      //RIGHT
      case 2:
        x = this.mod(this.canvas.width, x + 10);
        break;
    }
    const newSnake = [{ x, y, direction:direction }];
    const snakeLength = snake.length;

    for (let i = 1; i < snakeLength; ++i) {
      newSnake.push({ ...snake[i - 1] });
    }
    this.state.snake = newSnake;
  }

  detectCollision() {
    // Self collison
    const {snake} = this.state
    for(let i = 4; i < snake.length; i++) {
      const selfCollison = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
 
      if(selfCollison) {
        return true;
      }
    }
    // Wall collison
    const leftCollison = snake[0].x <= 0;
    const topCollison = snake[0].y <= 0;
    const rightCollison = snake[0].x >= (this.canvas.width - 10);
    const bottomCollison = snake[0].y >= (this.canvas.height - 10);

    return leftCollison || topCollison || rightCollison || bottomCollison;
  }

  gameOverfunc(){
    
    this.pauseSound()
    this.soundEffects.gameOver.play();

    snakeGame.state.gameover = true
    let localScore = parseInt(localStorage.getItem("highScore"))
    if(localScore<snakeGame.state.score)
    {
      this.elements.message.innerHTML = "Congrats!!! New High Score"
      const jsConfetti = new JSConfetti()
      jsConfetti.addConfetti({
        // emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
        // confettiColors: [
        //   '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
        // ],  
        confettiNumber: 500,
      })

      localStorage.setItem("highScore",snakeGame.state.score)
    }
    snakeGame.updateScore()
    console.log(localStorage.getItem("highScore")) 
    this.elements.playAgainBtn.classList.remove('vanish')
  }


  startListner(){
    this.elements.gameStartBtn.addEventListener("click", this.startHandler);
  }
  resetListner(){
    this.elements.playAgainBtn.addEventListener("click", this.resetHandler);
  }
  keyEventListner(){
    document.addEventListener("keyup", this.keyEventHandler);
  }

  startHandler = (event)=>{
    event.preventDefault();
    this.elements.formBoard.classList.add('vanish')
    this.elements.scoreBoard.classList.remove('vanish')
    this.elements.playAgainBtn.classList.add('vanish')

    if(this.elements.difficultyIp.value=='hard'){
      this.state.speed = this.speed.hard
    }
    else if(this.elements.difficultyIp.value=='medium'){
      this.state.speed = this.speed.medium
    }
    else{
      this.state.speed = this.speed.easy
    }

    this.canvas.height = this.elements.heightIp.value
    this.canvas.width = this.elements.widthIp.value
    this.init()

    this.play()
  }

  resetHandler = (event)=>{
    this.state = {
      gameover: false,
      direction: 2,
      snake: [
        { x: 10, y: 10,direction:2 },
      ],
      food: { x: 0, y: 0 },
      score: 0,
      speed:1000,
    }

    this.updateScore()
    this.elements.message.innerHTML = ""
    this.elements.formBoard.classList.remove('vanish')
    this.elements.scoreBoard.classList.add('vanish')
  }

  keyEventHandler = (event) => {
    //   Checking if Arrow keys are pressed
    if (!event.key)
      return;

    event.preventDefault();

    let {direction,snake} = this.state
    let directionTmp = 0;

    switch (event.key) {
      case "ArrowDown":
        directionTmp = 1;
        break;
      case "ArrowUp":
        directionTmp = -1;
        break;
      case "ArrowLeft":
        directionTmp = -2;
        break;
      case "ArrowRight":
        directionTmp = 2;
        break;
    }
    if ( directionTmp && direction === snake[0].direction && direction !== -directionTmp) {
      this.state.direction = directionTmp;
    }
  }

  gameLoop(timestamp) {
    let {gameover,snake,food} = snakeGame.state
    if(snakeGame.detectCollision())
    {
      snakeGame.gameOverfunc()
      return;
    }
    snakeGame.moveSnake();
    snakeGame.drawBackground();
    snakeGame.drawFood(food.x, food.y);
    snakeGame.drawSnake();
    
    // Checking if the snake eats the food
    snakeGame.eatFood();
     //   recursively calls itself until game over
    setTimeout(function(){
      if (!gameover) {
        snakeGame.gameLoop();
      } 
    }, snakeGame.state.speed);
  }

  play(){
    if (!this.state.gameover) {
      // Game Loop
      this.gameLoop();
    }
  }

}

const snakeGame = new SnakeGame();
