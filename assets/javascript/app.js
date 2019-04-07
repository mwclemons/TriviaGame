var currentID;
var previousIDs = [];
var numWins = 0;
var numLoses = 0;
var numUnanswered = 0;
var timerRunning = false;
var timeLeft = 0;
var delayLeft = 0;
var intervalID;  
        
        
var triviaQuestions = [
    {question:"Before the steroid era completely obliterated the MLB HR records in the late 90s, Roger Maris held the single season HR record at 61.  In what year did he accomplish this feat?", 
        choices:["1956", "1983", "1961", "1972"], 
        answer: "1961", 
        image:"assets/images/maris.jpg"},
    {question:"In the 1982 season finale on Monday Night Football, Tony Dorsett set an NFL record for the longest run in NFL history by scoring a 99 yard TD.  This record will never be broken.  What fellow Heisman winner was the first and only NFL player to tie this record?", 
        choices:["Derrick Henry", "Ricky Williams", "Eddie George", "Mark Ingram"], 
        answer: "Derrick Henry", 
        image:"assets/images/henry.jpg"},
    {question:"Who is the only person in NBA History to be named MVP, Coach of the Year and Executive of the Year?", 
        choices:["Michael Jordan", "Bill Russell", "Larry Bird", "Phil Jackson"], 
        answer: "Larry Bird", 
        image:"assets/images/bird.jpg"},
    {question:"What former major leaguer retired from baseball with exact same number of major league HRs as his father?", 
        choices:["Prince Fielder", "Ken Griffey Jr.", "Cal Ripken Jr.", "Moises Alou"], 
        answer: "Prince Fielder", 
        image:"assets/images/prince.jpg"},
    {question:"Who was Muhammad Ali's opponent in the Rumble in the Jungle?", 
        choices:["Joe Fraizer", "George Foreman", "Ken Norton", "Trevor Berbick"], 
        answer: "George Foreman", 
        image:"assets/images/rumble.jpg"},
    {question:"Only 7 players in NBA history have completed a season where they shot 50% on FGs, 90% on FTs and 40% on 3FGs.  Who is the only player to accomplish this in 4 different seasons?", 
        choices:["Steve Nash", "Dirk Nowitzki", "Steph Curry", "Larry Bird"], 
        answer: "Steve Nash", 
        image:"assets/images/nash.jpg"},
    {question:"Who is the only coach to win a championship in both the NBA and NCAA? ", 
        choices:["Mike Krzyzewski", "Larry Brown", "Chuck Daly", "Rick Pitino"], 
        answer: "Larry Brown", 
        image:"assets/images/brown.jpg"},
    {question:"What is the single season Touchdown passing record?", 
        choices:["55, Peyton Manning, 2013", "56, Tom Brady, 2007", "50, Patrick Mahomes, 2018", "51, Drew Brees, 2012"], 
        answer: "55, Peyton Manning, 2013", 
        image:"assets/images/peyton.jpg"},
    {question:"Where were the Utah Jazz originally located?", 
        choices:["Chicago", "New Orleans", "Fort Wayne", "San Antonio"], 
        answer: "New Orleans", 
        image:"assets/images/jazz.jpg"},
    {question:"What NBA team temporarily relocated to Oklahoma City to play a full season in 2005?", 
        choices:["Seattle Supersonics", "New Orleans Hornets", "Phoenix Suns", "San Antonio Spurs"], 
        answer: "New Orleans Hornets", 
        image:"assets/images/okc.jpg"},   
    {question:"During his NBA career, Michael Jordan played at least one game in all but which of the following jersey numbers?", 
        choices:["45", "12", "23", "32"], 
        answer: "32", 
        image:"assets/images/12.jpg"},  
    {question:"Who owns the record for the most consecutive games started in the NFL?", 
        choices:["Eli Manning", "Brett Favre", "Jason Witten", "Joe Montana"], 
        answer: "Brett Favre", 
        image:"assets/images/favre.jpg"},    
    {question:"Which is the only NFL team in history to go an entire regular season and post season undefeated?", 
        choices:["1972 Miami Dolphins", "2007 New England Patriots", "1993 Dallas Cowboys", "1981 Pittsburgh Steelers"], 
        answer: "1972 Miami Dolphins", 
        image:"assets/images/dolphins.jpg"}, 
    {question:"Which country won the first ever World Cup in 1930?", 
        choices:["Uruguay", "Brazil", "Argentina", "Spain"], 
        answer: "Uruguay", 
        image:"assets/images/uruguay.jpg"}, 
    {question:"Raging Bull, the classic boxing movie is about which real life boxer?", 
        choices:["Jake LaMotta", "Rocky Marciano", "Mike Tyson", "Sonny Liston"], 
        answer: "Jake LaMotta", 
        image:"assets/images/lamotta.jpg"}, 
    {question:"What young real life boxer had a starring role in Rocky V, but was forced to retire from boxing after testing positive for HIV in 1996?", 
        choices:["Tommy Morrison", "Ray Mercer", "Tommy Gunn", "Michael Bennett"], 
        answer: "Tommy Morrison", 
        image:"assets/images/morrison.jpg"}, 
    {question:"Often considered the biggest upset in sports history, which boxer KO'd Mike Tyson in 1990 for the heavyweight championship?", 
        choices:["Buster Douglas", "Evander Holyfield", "Lennox Lewis", "Michael Spinks"], 
        answer: "Buster Douglas", 
        image:"assets/images/buster.jpg"}, 
    {question:"Who is the NBA all time leading scorer?", 
        choices:["Kareem Abdul-Jabbar", "Michael Jordan", "Karl Malone", "Wilt Chamberlain"], 
        answer: "Kareem Abdul-Jabbar", 
        image:"assets/images/jabbar.jpg"}, 
    // {question:"", 
    //     choices:["", "", "", ""], 
    //     answer: "", 
    //     image:"assets/images/photo.jpg"}, 
    // {question:"", 
    //     choices:["", "", "", ""], 
    //     answer: "", 
    //     image:"assets/images/photo.jpg"}, 
    // {question:"", 
    //     choices:["", "", "", ""], 
    //     answer: "", 
    //     image:"assets/images/photo.jpg"}, 
    // {question:"", 
    //     choices:["", "", "", ""], 
    //     answer: "", 
    //     image:"assets/images/photo.jpg"}, 
    // {question:"", 
    //     choices:["", "", "", ""], 
    //     answer: "", 
    //     image:"assets/images/photo.jpg"}, 
    // {question:"", 
    //     choices:["", "", "", ""], 
    //     answer: "", 
    //     image:"assets/images/photo.jpg"}, 

];

function pickNextQuestion() {
    currentID = Math.floor(Math.random() * (triviaQuestions.length));
    while (previousIDs.includes(currentID)){
        currentID = Math.floor(Math.random() * (triviaQuestions.length));
    };
    previousIDs.push(currentID);
    stopCountDown();
    updateBoardNewQuestion(); 
};

function updateBoardNewQuestion() {
    
    $("#trivia-question").text(triviaQuestions[currentID].question);
    //Randomize the order in which the answer choices appear on the page
    randomizeChoices(triviaQuestions[currentID].choices) 
    $("#question-image").empty();
    resetCountDown(30);
    startCountDown();
};

function updateBoardAnswer(myResult){
    
    $("#time-remaining").empty();
    $("#trivia-question").empty();
    $("#choice-0").empty();
    $("#choice-1").empty();
    $("#choice-2").empty();
    $("#choice-3").empty();
    if (myResult === "Wrong") {
        numLoses++;
        $("#trivia-question").text("Sorry that is incorrect. The correct answer is "+triviaQuestions[currentID].answer+".");
    } else if (myResult === "Correct") {
        numWins++;
        $("#trivia-question").text("Congratulations!! That was the correct answer.");
    } else if (myResult === "TimerExpired") {
        numUnanswered++;
        $("#trivia-question").text("Sorry, you ran out of time. The correct answer is "+triviaQuestions[currentID].answer+".");
    };
    $("#question-image").html("<img src='"+triviaQuestions[currentID].image+"' class='img-fluid rounded'>");
        
    stopCountDown();
    startDelay();
    
    
};

function updateBoardGameOver() {

    $("#start-button").css("visibility", "visible");
    $("#start-button").text("Start Over?");
    $("#question-image").empty();
    $("#trivia-question").text("Game Over!! Here's how you did:");
    $("#trivia-question").append("<br>Correct Answers: "+numWins);
    $("#trivia-question").append("<br>Incorrect Answers: "+numLoses);
    $("#trivia-question").append("<br>Unanswered: "+numUnanswered);
                
};


function randomizeChoices(myChoices) {
    var currentChoice;
    var previousChoices = [];
    var x = 0;
    while (previousChoices.length < myChoices.length) {
        currentChoice = Math.floor(Math.random() * (myChoices.length));
        while (previousChoices.includes(currentChoice)){
            currentChoice = Math.floor(Math.random() * (myChoices.length));
        };
        previousChoices.push(currentChoice);
        $("#choice-"+x).text(myChoices[previousChoices[x]]);
        x++;
    };
};

function startDelay() {
    delayLeft=3;
    if (!timerRunning) {
        intervalID = setInterval(countDownDelay, 1000);
        timerRunning = true;
    }
};

function countDownDelay() {
    delayLeft--;
    
    
    if (delayLeft < 0) {
        if (numLoses+numWins+numUnanswered < 10) {
            stopCountDown();
            pickNextQuestion();
        } else {
            stopCountDown();
            updateBoardGameOver();
        };
        
    };
};

function startCountDown() {
    if (!timerRunning) {
        intervalID = setInterval(countDownQuestion, 1000);
        timerRunning = true;
    }
};

function stopCountDown() {
    clearInterval(intervalID);
    timerRunning = false;
};

function resetCountDown(countFrom) {
    timeLeft = countFrom;
    $("#time-remaining").text(timeLeft+" seconds remaining");
};

function countDownQuestion() {
    timeLeft--;
    if (timeLeft>=0) {
        $("#time-remaining").text(timeLeft+" seconds remaining");
    } else {
        stopCountDown();
        updateBoardAnswer("TimerExpired");   
    };
};




$(".trivia-choices").on("click", function(){
    if ($(this).text() === triviaQuestions[currentID].answer) {
        updateBoardAnswer("Correct");
    } else {
        updateBoardAnswer("Wrong");   
    };
});


$("#start-button").on("click", function(){
    numWins = 0;
    numLoses = 0;
    numUnanswered = 0;
    timerRunning = false;
    timeLeft = 0;
    previousIDs = [];
    $("#start-button").css("visibility", "hidden");
    pickNextQuestion();
    
});
