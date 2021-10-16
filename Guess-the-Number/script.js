const game = {
  title: 'Guess the Number!',
  biggestNum: -1,
  smallestNum: -1,
  secretNum: null,
  prevGuesses:[],
  play: function() {
    this.smallestNum = parseInt(prompt("Enter the smallest Number: "))
    this.biggestNum = parseInt(prompt("Enter the biggest Number: "))
    while(this.smallestNum===NaN)
    {
      this.smallestNum = parseInt(prompt("Enter the smallest Number: "))
    }

    while(this.biggestNum===NaN)
    {
      this.biggestNum = parseInt(prompt("Enter the biggest Number: "))
    }

    while(this.smallestNum>this.biggestNum)
    {
      let check = confirm("Entered Smallest number is greater than biggest Number. Do you want to change the smallest number?")
      if(check)
      {
        this.smallestNum = parseInt(prompt("Enter the smallest Number: "))
      }
      else
      {
        this.biggestNum = parseInt(prompt("Enter the biggest Number: "))
      }
    }
    
    this.secretNum = Math.floor(Math.random() * 
      (this.biggestNum - this.smallestNum + 1)) + this.smallestNum;

    let userGuess;
    while(userGuess !== this.secretNum) {
      userGuess = this.getGuess();
      this.prevGuesses.push(userGuess);
      this.render(userGuess);
      if (userGuess === this.secretNum) 
        return;
    }
  },
  getGuess: function(){
    let loop = true;
    let userGuess;
    while(loop)
    {
      userGuess = parseInt(prompt(`Enter a guess between ${this.smallestNum} and ${this.biggestNum}: `));
      if(userGuess!==NaN && userGuess >= this.smallestNum && userGuess <= this.biggestNum)
      {
        loop = false
        break
      }
      else
      {
        alert(`Incorrect format! Please enter number between ${this.smallestNum} and ${this.biggestNum}: `)        
      }
    }
    return userGuess
  },
  render: function(guess) {
    if(guess === this.secretNum) 
      alert(`Congrats! You guessed the number in ${this.prevGuesses.length} guesses!`)
    else
    {
      let val = guess > this.secretNum ? 'high' : 'low'
      alert(` Your guess is too ${guess > this.secretNum ? 'high' : 'low'}
      Previous guesses: ${this.prevGuesses.join(', ')}
      `)
    }
  }
};

game.play()
