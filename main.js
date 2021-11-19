 
/// get all question
let  Questions = ''
let QuestionNumber = 0
let score = 0;
let scroreBar = 0
let reponseValide = false
let Timer = 30
let Finish = false
let TrueReponse = 0
let OldScoreHave = []

// local storage
// localStorage.getItem("HighScore")  == null ? document.querySelector('.HighScore').innerHTML  = 0 
// : document.querySelector('.HighScore').innerHTML = localStorage.getItem("HighScore");
const GetheightScoreelemnt = () =>{
    if(localStorage.getItem("OldScoreHave") == null){
        localStorage.setItem("OldScoreHave", JSON.stringify(OldScoreHave))
    }
    else{
        var GetHighScore = JSON.parse(localStorage.getItem("OldScoreHave"))
        let HightScoreLocal = 0
        let GetHighScoreName = ""
        GetHighScore.forEach(element =>{
            if(HightScoreLocal <= element[0].ScoreUser){
                HightScoreLocal = element[0].ScoreUser
                GetHighScoreName = element[0].Name
            }
        })
        document.querySelector('.HighScore').innerHTML = `${GetHighScoreName} ${HightScoreLocal}`
        console.log(HightScoreLocal)
        console.log(GetHighScoreName )
    }
    
}
GetheightScoreelemnt()
// localStorage.getItem("OldScoreHave") == null ? localStorage.setItem("OldScoreHave", JSON.stringify(OldScoreHave)) : ''


/// fetch question
fetch('./Questioner.json').then(response => {
        return response.json();
}).then(data => {
        Questions = data
        // console.log(Questions.AllQuestion.length)
        document.querySelector('.NumberQuestion').innerHTML = Questions.AllQuestion.length
        // console.log(scroreBar)
        SwitchQuestion()
})

/// add question adn reponse to DOM
const SwitchQuestion = () =>{
    if(QuestionNumber < Questions.AllQuestion.length){
        document.querySelector('.Question').innerHTML =  `Question ${QuestionNumber +1} : ${Questions.AllQuestion[QuestionNumber].Question}`
        document.querySelector('.Reponse').innerHTML = ''
        for(let i = 0 ; i < Questions.AllQuestion[QuestionNumber].Reponse.length ; i++){
            document.querySelector('.Reponse').innerHTML += `<p class="Reponse_${i+1}" Onclick="ValideQuestion(${QuestionNumber},${i},'Reponse_${i+1}')"> ${Questions.AllQuestion[QuestionNumber].Reponse[i].Reponse}</p>`
        }
    }

}

/// VALIDE QUESTION
const  ValideQuestion = (n,Index,ClassName) =>{
    Finish = true
    if(QuestionNumber <= Questions.AllQuestion.length){
        reponseValide = true
        // QuestionNumber++;
        if(Questions.AllQuestion[n].Reponse[Index].Status == true){
            console.log(Questions.AllQuestion[n].Point)
            score += Questions.AllQuestion[n].Point;
            // document.querySelector('.ScoreWinnPlus').innerHTML = Questions.AllQuestion[n].Point
            TrueReponse++;
            scroreBar +=  100 / Questions.AllQuestion.length
            let allResponse = document.querySelectorAll('p')
            allResponse.forEach(Element =>{
                Element.style="background:red;color:white";
                document.querySelector(`.${ClassName}`).style = "background:rgb(42, 230, 42);color:white";
            })
            document.querySelector('.scoreNumber').innerHTML = score
            document.querySelector(`.${ClassName}`).style = "background:rgb(42, 230, 42);color:white";
            document.querySelector('.progress-bar').style =`background:rgb(42, 230, 42);width:${scroreBar}%`
            document.querySelector('.ReponeVrai').innerHTML= TrueReponse
        }
        else{
            let ReponseFalse = 1
            Questions.AllQuestion[n].Reponse.forEach(Element =>{
                Element.Status == false ?
                 document.querySelector(`.Reponse_${ReponseFalse}`).style='background:red;color:white'
                 : document.querySelector(`.Reponse_${ReponseFalse}`).style="background:rgb(42, 230, 42);color:white";
                
                ReponseFalse++
            })
        }


        //// game over
        if(QuestionNumber === Questions.AllQuestion.length -1){
            GameFinish()
        }
    }


}

/// next question

document.querySelector('.Next').addEventListener('click', ()=>{
    if(QuestionNumber <= Questions.AllQuestion.length-1 && reponseValide == true){
        QuestionNumber++;
        SwitchQuestion()
        reponseValide = false
        Timer = 30
        Finish = false
    }
})

/// game finish
const GameFinish = () =>{
    let AllPointHave = 0
    Questions.AllQuestion.forEach(element =>{
        AllPointHave +=element.Point
        // console.log(element.Point)
    })
    // console.log(AllPointHave)

    if(Math.floor(AllPointHave/2) <= score){
        console.log("winn")
        document.querySelector('.Congratulation').style='display:block'
        document.querySelector('.StatusFinl').innerHTML ="Congratulations"
    }
    else{
        document.querySelector('.StatusFinl').innerHTML ="Loser"
        document.querySelector('.Loser').style='display:block'
        console.log("lozer")
    }
    document.querySelector('.GamOver').style='display:block'
    document.querySelector('.BalckPage').style='display:block'
    document.querySelector('.scooreFinal').innerHTML=`${score} Points`
    Finish = true
}

////  restart game 
document.querySelector('.Restart').addEventListener('click',()=>{
    Finish = false
    QuestionNumber = 0
    score = 0;
    scroreBar = 0
    reponseValide = false
    Timer = 30
    TrueReponse = 0;
    SwitchQuestion()
    GetheightScoreelemnt()
    document.querySelector('.GamOver').style='display:none'
    document.querySelector('.BalckPage').style='display:none'
    document.querySelector('.progress-bar').style =`background:rgb(42, 230, 42);width:0%`
    document.querySelector('.scoreNumber').innerHTML = 0
    document.querySelector('.Congratulation').style='display:none'
    document.querySelector('.Loser').style='display:none'
    document.querySelector('.ReponeVrai').innerHTML = TrueReponse

})

//// timer  question

const IncurmentTime = () =>{
    if(Finish != true){
        if(QuestionNumber < Questions.AllQuestion.length){
            if(Timer == 0){
                QuestionNumber++;
                SwitchQuestion()
                Timer = 30
            }
            else{
                Timer--;
                document.querySelector('.TimerDownd').innerHTML = Timer
            }
            // console.log(Timer)
        }
        else{
            GameFinish()
        }

    
    }

}
setInterval(IncurmentTime, 1000);

document.querySelector('.ValideScore').addEventListener('click',() =>{
    let UserName = document.querySelector('.NameUser').value
    var HighScore = [{Name:UserName,ScoreUser:score}];
    var OldScoreHave = JSON.parse(localStorage.getItem("OldScoreHave"));
    console.log(OldScoreHave)
    OldScoreHave.push(HighScore)
    localStorage.setItem("OldScoreHave", JSON.stringify(OldScoreHave)); //store colors
})


