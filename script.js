var myMemoryCardsDeck = [];
var selectedCards = [];
var x = 1;
var y = null;
var defaultSrc = document.createAttribute("src");
defaultSrc.value = "images/placeholder.jpg";
initialize();

function initialize()
{
    myMemoryCardsDeck = [];
    createMemoryCardsDeck();
    let cardsHolder = document.getElementById("cardsContainer");
    removeAllChildNodes(cardsHolder);
    
    for (let i = 0; i < myMemoryCardsDeck.length; i++)
    {
       cardsHolder.appendChild(myMemoryCardsDeck[i]);
    }
}

function createMemoryCardsDeck()
{
    let defaultImg = document.createElement("img");
    let newSrcDefault = document.createAttribute("src");
    let newOnClick = document.createAttribute("onclick");
    let aantal = document.getElementById("aantal").value;
    let arrayImgs = ["bull", "bunny", "bunny2", "elephant","goat","leopard","moose","piglet","puppy","seal","stitch" ];
    let imgNumber = 0;
    let cardNumber = 1;
  
    newSrcDefault.value = "images/placeholder.jpg";
    defaultImg.setAttributeNode(newSrcDefault);
    defaultImg.className = "img-thumbnail memoryCard";
    
    for (let i = 0; i < (aantal/2); i++)
    {
        for (let j = 0; j < 2; j++)
        {
            defaultImg.id = "memoryCard" + cardNumber++;
            newOnClick.value = "clickOnCard(this,"+ "\""+arrayImgs[imgNumber]+".jpg"+"\""+");";
            defaultImg.setAttributeNode(newOnClick);
            if (myMemoryCardsDeck == null)
                myMemoryCardsDeck
            myMemoryCardsDeck.push(defaultImg.cloneNode());
        }
        imgNumber++;
    }
    myMemoryCardsDeck = shuffleArray(myMemoryCardsDeck);
}

function shuffleArray(array) {
    // source: https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
      // Pick a remaining element
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      // Swap it with the current element.
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }

function removeAllChildNodes(parent)
{
    while (parent.firstChild)
    {
        parent.removeChild(parent.firstChild);
    }
}

function clickOnCard(myId, myPicture)
{

    if (myId != null)
    {
        if (selectedCards.length < 2)
        {
            let newSrc = document.createAttribute("src");
            newSrc.value = "images/"+myPicture;
    
            myId.setAttributeNode(newSrc);
            selectedCards.push(myId);
            if (selectedCards.length == 2)
                checkPairs();
        }
    }
}

function checkPairs()
{
    
    if ((selectedCards != null) && (selectedCards.length == 2))
    {
        let msg;
        let msgClass;
        if (selectedCards[0].src == selectedCards[1].src )
        {
            selectedCards = [];
            msg = "Dat was een match! proficiat!";
            msgClass = "alert alert-success";
        }               
        else
        {
            setTimeout(function() {
                selectedCards.forEach(element => {
                    element.setAttribute("src","images/placeholder.jpg");
                });
                selectedCards = [];
            }, 2000);
            msg = "Fout! Wat gaat dat zijn als je 80 bent?!";
            msgClass = "alert alert-danger";
        }

        let myMsg = document.getElementById("resultaat");
        removeAllChildNodes(myMsg);
        let myDiv = document.createElement("div");
        myDiv.className = msgClass;
        myDiv.textContent = msg;
        myMsg.appendChild(myDiv);
    }
}
