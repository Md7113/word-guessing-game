var startBtn = document.querySelector("#start")
var resetBtn = document.querySelector("#reset")
var wordLogVar = document.getElementById("wordLog")
var wordList = ["boogie","doublepump","scar","tilted","ninja","ninties","hot your shots"]
var timeVar = document.getElementById("timeId")
var loseVar = document.getElementById("loses")
var winVar = document.getElementById("wins")
 function randWord() {
        randArrEnd = []
        randArrStart = ["boogie","doublepump","scar","tilted","ninja","ninties","hit-your-shots"]
        for( i=0 ; i < wordList.length;i++){
        randOrder = Math.floor(Math.random() * randArrStart.length)
        randArrEnd.push(randArrStart[randOrder])
        randArrStart.splice(randOrder, 1)
        }
}
loses = 0
wins = 0

loopVar = 0
letterArr = []
var correct = 0
var trueArr = []
function onStart(){
        
        correct = 0
        
        timer = 30
        
        
        if(loopVar === 0){
            setTime()
        }else if(loopVar === 1){
           clearInterval(timerInterval)
           setTime()
        for(i=0; i < letterArr.length+1;i++){
            wordLogVar.removeChild(wordLogVar.firstChild)
        }
        }else{
            clearInterval(timerInterval)
            setTime()
            for(i=0; i < letterArr.length;i++){
                wordLogVar.removeChild(wordLogVar.firstChild)
            }
        }
       
        randWord()

        var wordChoice = randArrEnd[0]
        letterArr = wordChoice.split('')
        trueArr = []
        for(i=0;i<letterArr.length;i++){
            letterPlace = document.createElement("li")
            letterPlace.setAttribute("id", i)
            letterPlace.setAttribute("data-letter", letterArr[i])
            letterPlace.innerHTML = '-'
           
            wordLogVar.appendChild(letterPlace)
            trueArr.push(false)
        }

        

        document.addEventListener("keypress" ,function(event){
            event.preventDefault()
        console.log(event)
        var key = event.key.toLowerCase()
        for(i = 0;i < letterArr.length ;i++){
            
            if(key === letterArr[i] && !trueArr[i]){
               
                correctLetter = document.getElementById(i)
                correctLetter.innerHTML = letterArr[i]
                trueArr[i] = true
                correct = correct + 1
            }
        }
        })
        if(loopVar === 0){
            localStorage.setItem("wins", wins)
            localStorage.setItem("loses", loses)
        }else{
            // wins += Number(localStorage.getItem("wins"))
            // loses += Number(localStorage.getItem("loses"))
            // localStorage.setItem("wins", wins)
            // localStorage.setItem("loses", loses)
        }
        if(loopVar === 0){
            loopVar = 1
        }else{
            loopVar = 2
        }

        winInterval = setInterval(function(){
           
            if(correct === letterArr.length){
                clearInterval(timerInterval)
                correct = 0 
                winsNum = 1 + Number(localStorage.getItem("wins"))
                localStorage.setItem("wins", winsNum)
                clearInterval(winInterval)
                document.removeEventListener("keypress", this,)
            }
        }, 1000)
        


        loseVar.innerHTML = Number(localStorage.getItem("loses"))
        winVar.innerHTML = Number(localStorage.getItem("wins"))
       

}

function setTime(){
     timerInterval = setInterval(function(){
        timer--
        if(timer < 1){
            clearInterval(timerInterval)
            loseNum = 1 + Number(localStorage.getItem("loses"))
            localStorage.setItem("loses", loseNum)
            document.removeEventListener("keypress", this,)
        }
        // if(correct === letterArr.length){
        //     clearInterval(timerInterval)
        //     winsNum = 1 + Number(localStorage.getItem("wins"))
        //     localStorage.setItem("wins", winsNum)
        // }
        timeVar.innerHTML = timer
    },1000)

}


function onReset(){
    localStorage.setItem("wins", 0)
    localStorage.setItem("loses", 0)
    wins = 0
    loses = 0 
    loseVar.innerHTML = loses
    winVar.innerHTML = wins
}

startBtn.addEventListener("click", onStart)
resetBtn.addEventListener("click", onReset)
