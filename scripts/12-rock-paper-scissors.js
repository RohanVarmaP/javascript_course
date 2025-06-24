console.log(localStorage.getItem('score'));
function gameResult(user,uphoto){
    const num=Math.random()
    let computer='';
    let cphoto='';
    if (num<1/3){
        computer='paper';
        cphoto='images/paper.jpg';
    }else if (1/3<num && num<2/3){
        computer='scissor';
        cphoto='images/scissors.jpg';
    }else{
        computer='rock';
        cphoto='images/rock.jpg';
    }
    let result='';
    if ((user==='rock' && computer==='scissor')||(user==='paper' && computer==='rock')||(user==='scissor' && computer==='paper')){
        result='You Won.';
        score.wins++;
    }else if ((user==='rock' && computer==='paper')||(user==='paper' && computer==='scissor')||(user==='scissor' && computer==='rock')){
        result='You Lost.';
        score.loses++;
    }else{
        result='It\'s a Tie.';
        score.ties++;
    }
    document.querySelector('.js-result').innerHTML=result;
    document.querySelector('.js-moves').innerHTML=`your move: <img class="move-icon" src='${uphoto}'>, computer move: <img class="move-icon" src='
    ${cphoto}'>`;
    localStorage.setItem('score',JSON.stringify(score));
    updateScoreElement();
    return `You choose ${user} and computer choose ${computer}.\n ${result}\nWins:${score.wins}, Losses:${score.loses}, Ties: ${score.ties}`
}

const score=JSON.parse(localStorage.getItem('score')) || {wins:0,loses:0,ties:0};

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Wins:${score.wins}, Losses:${score.loses}, Ties: ${score.ties}`;
}
let itervelid;
function autoPlay(){
    buttonElement=document.querySelector('.js-autoplay');
    console.log(buttonElement);
    if (buttonElement.innerHTML=='Start Autoplay'){
        intervelid=setInterval(function(){
            const num=Math.random()
            let user='';
            let uphoto='';
            if (num<1/3){
                user='paper';
                uphoto='images/paper.jpg';
            }else if (1/3<num && num<2/3){
                user='scissor';
                uphoto='images/scissors.jpg';
            }else{
                user='rock';
                uphoto='images/rock.jpg';
            }
            gameResult(user,uphoto);
        },1000);
        buttonElement.innerHTML='End Autoplay';
        console.log('The Auto Play method started');
    }else{
        buttonElement.innerHTML='Start Autoplay';
        clearInterval(intervelid);
        console.log('The Auto Play method stopped');
    }
}
updateScoreElement();