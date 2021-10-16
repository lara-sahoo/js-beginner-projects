
function getUserInput(){
  var input;
  do
  {
    input = prompt('Choose your input rock/paper/scissors')
    input = input.toLowerCase()
    console.log(input,typeof input)
  }
  while(input!=='rock' && input!=='paper' && input!=='scissors')

  console.log(input)
  return input;
}

function getCompChoice(){
  let options = ['rock','paper','scissors']
  let max = 3
  let min = 1
  let randomNumber =  Math.floor(Math.random() * (max - min + 1)) + min;
  let computerChoice = options[randomNumber-1] 
  console.log(computerChoice)
  return computerChoice
}

function decision(user,comp){
  if (user===comp)
  {
    alert("Draw!!")
  }
  else if((user=='paper' && comp=='rock') || (user=='scissors' && comp == 'paper') || (user =='rock' && comp == 'scissors'))
  {
    alert(`User input- ${user} \nComputer input - ${comp} \nUser Won`)
  }
  else
  {
    alert(`User input- ${user} \nComputer input - ${comp} \nComputer Won`)
  }
}

let input = getUserInput();
let computerChoice = getCompChoice();
decision(input,computerChoice)

var r = confirm("Do you want to play again?");
while(r)
{
  let input = getUserInput();
  let computerChoice = getCompChoice();
  decision(input,computerChoice)
  r = confirm("Do you want to play again?");
}
alert("Thank you! See you back soon")
