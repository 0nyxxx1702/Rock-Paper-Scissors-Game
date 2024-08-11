let score=JSON.parse(localStorage.getItem('score'));
            if(score==null){
                score={
                    wins: 0,
                    losses: 0,
                    ties: 0
                };
            }
            
            updateScoreElement();
            

            let isAutoPlaying=false;
            let intervalId;
            function autoPlay(){
                if(!isAutoPlaying){
                    intervalId=setInterval(function (){
                        const playerMove=pickComputerMove();
                        playGame(playerMove);
                    }, 1000);
                    isAutoPlaying=true;
                }
                else{
                    clearInterval(intervalId);
                    isAutoPlaying=false;
                }
            }

            function playGame(playerMove){
                const computerMove=pickComputerMove();
       
                let result='';

                if(playerMove === 'scissors'){
                    if(computerMove==='rock') result='You lose';
                    else if(computerMove==='paper') result='You Win';
                    else if(computerMove==='scissors') result='Tie';
                }
                else if(playerMove === 'paper'){
                    if(computerMove==='rock') result='You Win';
                    else if(computerMove==='paper') result='Tie';
                    else if(computerMove==='scissors') result='You lose';
                }
                else if( playerMove==='rock'){
                    if(computerMove==='rock') result='Tie';
                    else if(computerMove==='paper') result='You lose';
                    else if(computerMove==='scissors') result='You Win';

                }


                if(result=='You Win') score.wins++;
                else if(result=='You lose') score.losses++;
                else if(result=='Tie') score.ties++;

                localStorage.setItem('score', JSON.stringify(score));
                
                updateScoreElement();
                document.querySelector('.js-result').innerHTML=`${result}.`;
                document.querySelector('.js-moves').innerHTML=`You
                    <img src="images/${playerMove}-emoji.png" class="move-icon">
                    <img src="images/${computerMove}-emoji.png" class="move-icon">
                    Computer`;
                

                
                
                

            }

            function updateScoreElement(){
                document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
            }
            
            function pickComputerMove(){
                const randomNumber=Math.random();
                let computerMove='';
                if(randomNumber>0 && randomNumber<=1/3){
                    computerMove='rock';
                }
                else if(randomNumber>1/3 && randomNumber<=2/3){
                    computerMove='paper';
                }
                else if(randomNumber>2/3 && randomNumber<=1){
                    computerMove='scissors';
                }
                
                return computerMove;
            }
