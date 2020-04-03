$(document).ready()
    
    var suits= ['Hearts','Clubs','Diamonds','Spades'];
    var ranks= ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','King','Queen'];
    var values= {'Two':2,'Three':3,'Four':4,'Five':5,'Six':6,'Seven':7,'Eight':8,'Nine':9,'Ten':10,'King':10,'Queen':10,'Ace':11};
    var deck=[];
    var gameOn=false;
    var playerTurn;
    var playerHit=0;
    var dealerHit=0;
    var gameCount=0;
    /*cache common variables*/
    var $text=$('#text');
    var $startGame=$('#startGame');
    var $hit=$('#hit');
    var $stand=$('#stand');
    var $pval=$('#pval');
    var $dval=$('#dval');
    var $newGame=$('#newGame');
    
    /*Page initialization*/
    $newGame.hide();
    $text.text('Place your bet before starting game!');
    
    /*sprite for deck canvas*/
    var canvas=document.querySelector('canvas');
    var context=canvas.getContext('2d');
    var sprite= new Image();
    var cx=0;
    var cy=0;
    /*width of card=332*/
    var sx=0;
    var sy=0;
    var swidth=810;
    var sheight=1200;
    


    sprite.onload=function(){

      context.drawImage(sprite,sx,sy,swidth,sheight,cx,cy,355,170);
    }
      sprite.src='purple_back.png';

    
       

  function Deck(){
    
    for(var i=0; i<ranks.length;i++){
    for (var j=0; j<suits.length;j++){
        deck.push(new Card(ranks[i],suits[j]));
      }
    }
    Shuffle(deck);
    console.log(deck);

  };
  
  /* Card class to store suit and rank */
  class Card{

    constructor(ranks,suits){
      
      this.rank=ranks;
      this.suit=suits;

    }
    string(){
      return this.rank + ' of ' + this.suit;
    }
  };

  /* Shuffle Array */
  function Shuffle(array){
    for (let i = deck.length-1; i>0; i--){
      var j = Math.floor(Math.random()*i);
      var temp = deck[i];
      deck[i] = deck[j];
      deck[j]=temp;

    }
  };

/* Hand class to hold information about player's cards, value, aces*/
  class Hand{

    constructor(value,cards,aces,fillAce){
      this.cards=[];
      this.value=0;
      this.aces=0;
      this.fillAce=0;
        
    }
    addCard(card) {
      this.cards.unshift(deck[0]);
      this.value += values[deck[0].rank];
      deck.shift();
      if (this.cards[0].rank=='Ace'){
        this.aces+=1;
        this.fillAce+=1;
      }
      if (playerTurn==true){
        playerHit+=1;
      }
      else{
        dealerHit+=1;
      }
    }
    /*Check for aces*/
    aceCheck(){
      
      while ((this.aces>=1)&& (this.value>21)){
       
          this.value-=10;
          this.aces-=1;
        break;
        }
        
      }
    
    string(){
      for (var j=0;j<this.cards.length;j++){
        var str= rank+suit;
        return str;
      }
    }
  };

/*Disable hit and stand buttons*/
function disable(){
  $hit.attr('disabled',true);
  $stand.attr('disabled',true);
}
/* Ask to hit or stand. If player 1 turn, choose hit or stand. Dealer hits if under 17. */
function hitOrStand(Hand){
  $text.text('Hit for new card, or stand!');
  /*player's turn*/
  while (playerTurn==true){
    if (player1.value<21){
      $hit.click(function(e){
        console.log('hit');
        hit(deck,player1);
        $('#p'+(playerHit+2)).addClass(player1.cards[0].rank+player1.cards[0].suit, 400,'linear');
        $pval.text('Player Value: '+player1.value);
        if (player1.value==21){
          $text.text('Player Wins!');
          gameOn=false;
          playerTurn=false;
          disable();
          gameOver();
        }
        else if (player1.value>21){
          $text.text('Player Busts!');
          gameOn=false;
          playerTurn=false;
          disable();
          gameOver();
      }
      });
      $stand.click(function(e){
        playerTurn=false;
        disable();
        dealerTurn();
      });
      
    }
      break;
  }

    /*dealer's turn*/
};
  function dealerTurn(){
    $('#d2').removeClass();
    $('#d2').addClass(dealer.cards[0].rank+dealer.cards[0].suit, 400,'linear');
    while((playerTurn==false)&&(dealer.value<17)){
        hit(deck,dealer);
        $('#d'+(dealerHit-2)).addClass(dealer.cards[0].rank+dealer.cards[0].suit);
        $dval.text('Dealer Value: '+dealer.value);
      
      }
      win_check();
    };


function hit(deck,Hand){
  Hand.addCard(Hand);
  Hand.aceCheck();
};

/*Win Conditions*/
function win_check(){  
  /*dealer goes over 21*/
    if (dealer.value>21){
      $text.text('Dealer Busts! Player Wins!');
      gameOn=false;
      gameOver();
    }
    if (dealer.value==21){
      $text.text('Dealer Wins!');
      gameOn=false;
      gameOver();
    }
  
    if (player1.value<21){
      while (dealer.value<21){
        if (dealer.value>player1.value){
          $text.text('Dealer Wins!');
          gameOn=false;
          gameOver();
        }
    
        else if (player1.value>dealer.value){
          $text.text('Player Wins!');
          gameOn=false;
          gameOver();
        }
        else if (player1.value=dealer.value){
          $text.text('Push!');
          gameOn=false;
          gameOver();
        }
        break;
      }
    }   
  /*player1 and dealer under 21. player1 and dealer value match*/
};
/* Game over function*/
function gameOver(){
  $('#over').text('Hit new game to start a new game!');
  $newGame.show();
}

  if (gameCount<1){
    var player1 = new Hand;
    var dealer = new Hand;
    gameCount+=1;
  }



/*Start playing*/
$startGame.click(function(){
    gameOn=true;
    Deck();
    $startGame.attr('disabled',true);
    
    player1.addCard();
    $('#p1').addClass(player1.cards[0].rank+player1.cards[0].suit, 400,'linear');
    player1.addCard();
    $('#p2').addClass(player1.cards[0].rank+player1.cards[0].suit, 800,'linear');
    player1.aceCheck();
    $pval.text("Player Value: "+player1.value);
      if (player1.value==21){
          $text.text('Player Wins!');
          gameOn=false;
          playerTurn=false;
          $hit.attr('disabled',true);
          gameOver();
        };
 
    dealer.addCard();
    $('#d1').addClass(dealer.cards[0].rank+dealer.cards[0].suit, 400,'linear');
    dealer.addCard();
    $('#d2').addClass('DeckCover', 800,'linear');
    dealer.aceCheck();
    $dval.text('Dealer Value: '+(dealer.value));
    /*start game*/
    /*Player1 turn*/
    playerTurn=true;
    while (gameOn==true){
      hitOrStand(player1);
        
    break;
    }
  });
var newGame = function(){
document.getElementById('newGame').addEventListener('click', function(e){
 location.reload(true);
});
};
newGame();
