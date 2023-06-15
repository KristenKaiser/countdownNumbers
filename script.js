let deck = {
    largeNumDeck: [25, 50, 75, 100],
    smallNumDeck: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10],

    getCard: function (size) {
        if (size == "big") { return shuffel(this.largeNumDeck).pop(); }
        if (size == "little") { return shuffel(this.smallNumDeck).pop(); }
    },
    isNoBigCards: function () {
        if (this.largeNumDeck.length == 0) { return true; }
        else { return false; }
    }
};
let board = {
    container: document.getElementById("math-container"),
    button_temp: document.getElementById("numberButton_temp"),
    equasion_temp: document.getElementById("equasion_temp"),
    firstTerm: null,
    secondTerm: null,
    opperation: null,
    currentEquasion: null,

    eraseBoard: function () {
        console.log("eraseboard");
        let equasion = document.getElementById("math-container");
        while (equasion.firstChild) {
            equasion.removeChild(equasion.lastChild);
        }
    },
    calculate: function () {
        let first = parseInt(this.firstTerm.innerHTML);
        let second = parseInt(this.secondTerm.innerHTML);
        switch (this.opperation.innerHTML) {
            case "+": return first + second;
            case "-": return first - second;
            case "x": return first * second;
            case "/": return first / second;
        }
    },
    writeSolution: function () {
        const newButton = this.button_temp.content.firstElementChild.cloneNode(true);
        let currentOpp = this.container.lastElementChild;
        let calculation = this.calculate();
        if (this.firstTerm == null || this.opperation == null || this.secondTerm == null) { return; }
        if (calculation < 0) { return; }
        if (!Number.isInteger(calculation)) { return; }
        currentOpp.children[0].classList.add("noClick");
        currentOpp.children[1].classList.add("noClick");
        currentOpp.children[2].classList.add("noClick");
        currentOpp.children[3].innerHTML = "=";
        newButton.innerHTML = this.calculate();
        toggleSelect(newButton);
        currentOpp.children[4].appendChild(newButton);
        this.clearCurrentEqu();

    },
    getCurrentequ: function () {
        return(this.container.lastElementChild.children[1]);
    },
    writeOpperation: function () {
        let currentOpp = this.getCurrentequ();
        if (this.currentEquasion == null) { return; }
        if (this.opperation == null) { currentOpp.innerHTML = " "; } // "&#9633;"; }
        else { currentOpp.innerHTML = this.opperation.innerHTML; }
    },
    writeTerm: function (element) {
        if (this.firstTerm != null && this.secondTerm != null) { return; }// PLACEHOLDER what should the game do if a 3rd term is clicked?
        if (this.currentEquasion == null) { this.newEquasion(); }
        let equasion = this.container.lastElementChild;
        let term;
        if (this.firstTerm == null) {
            this.firstTerm = element;
            term = equasion.children[0];

        }
        else if (this.secondTerm == null) {
            this.secondTerm = element;
            term = equasion.children[2];
        }
        term.innerHTML = element.innerHTML;
        toggleSelect(element);
        return;
    },
    eraseTerm: function (element) {
        console.log(element);
        let parrent;
        if (element.classList.contains("term1")) {
            parrent = this.firstTerm;
            this.firstTerm = null;
            
        }
        if (element.classList.contains("term2")) {
            parrent = this.secondTerm;
            this.secondTerm = null;
        }
        console.log(parrent);
        toggleSelect(parrent);
        element.innerHTML = "";
    },
    eraseOpp: function (opp) {
        console.log(opp.innerHTML);
        opp.innerHTML = "";
        this.opperation = null;
    },

    eraseCurrentEqu: function () {
        if (this.firstTerm != null) { this.eraseTerm(this.firstTerm); }
        if (this.secondTerm != null) { this.eraseTerm(this.secondTerm); }
    },
    clearCurrentEqu: function () {

        this.firstTerm = null;
        this.secondTerm = null;
        this.opperation = null;
        this.currentEquasion = null;
    },
    newEquasion: function () {
        var equasion = this.equasion_temp.content.firstElementChild.cloneNode(true);
        
        this.currentEquasion = this.container.appendChild(equasion);
        this.misalignText(this.currentEquasion);
        return;
    },


    misalignText: function (text) {
        console.log(text);
        angle = randBetween(-4, 4);
        text.style.transform = "rotate("+ angle +"deg)";
    },
    
};


let timer = {

    sec: 1,
    currentTimer: null,

    start: function (length) {
        if (this.currentTimer != null) {
            timer.reset();
        }
        timer.currentTimer = setInterval(this.rotateHand, 1000, length);
    },
    reset: function () {
        clearInterval(timer.currentTimer);
        timer.sec = 0;
        second.style.transform = "rotate(0deg)";
    },
    rotateHand: function (length) {
        sec_rotation = 6 * timer.sec;
        second.style.transform = `rotate(${sec_rotation}deg)`;
        timer.sec++;
        if (timer.sec > length) {
            timer.end();
        }
    },
    end: function () {
        clearInterval(timer.currentTimer);
        terms = document.getElementsByClassName("num");
        selectAll(terms);
        writeScore();
        toggleOppButtons();
    },

}

function writeScore() {
    let scoreSpot = document.getElementById("clockText");
    let distance = distanceFromGoal();
    scoreSpot.innerHTML = (
        "you earned " + pointsEarned(distance) + " points<br>" + 
        "You were " + distance + " away from the goal");
    scoreSpot.style.paddingTop = "45%";
}

function distanceFromGoal() {
    let bestOutput = getBestResult();
    let goal = document.getElementById("goal-area").innerHTML;
    return Math.abs(goal - bestOutput);
}

function pointsEarned(difference) {  
    if (difference == 0) { return "10"; }
    if (difference < 5) { return "7"; }
    if (difference < 10) { return "5"; }
    return "0";
}


function initallizeGame() {
    console.log("page loaded");
    let sizeChoiceButtons = document.getElementById("numSizeChoice_temp").innerHTML;
    numObjs = document.getElementsByClassName("num-container");
    for (let i = 0; i < numObjs.length; i++) {
        numObjs[i].innerHTML = sizeChoiceButtons;
    }
}
function sizeClick(element, size) {
    let template = document.getElementById('numberButton_temp');
    let container = element.parentNode;
    container.innerHTML = "";
    const clone = template.content.firstElementChild.cloneNode(true);
    let newNum = container.appendChild(clone);
    newNum.innerHTML = deck.getCard(size);

    if (document.getElementsByClassName("choice").length == 0) {
        toggleSelect(document.getElementById("goalroll"));
        /*document.getElementById("goalroll").style.visibility = "visible";*/
    }
    if (deck.isNoBigCards()) {
        let bigChoices = document.getElementsByClassName("chooseBig");
        for (let i = 0; i < bigChoices.length; i++) {
            bigChoices[i].classList.add("selected");
        }
    }
}
function numClick(element) {

    if (element.classList.contains("unselected")) {
        board.writeTerm(element);
    }
    else {
        board.eraseTerm(element);
    }
}
function removeElement(node) {
    node.parentNode.removeChild(node);
}

function submit(element) {
    if (board.firstTerm == null || board.opperation == null || board.secondTerm == null) { return; }
    board.writeSolution();
    if (document.getElementById("goalroll").classList.contains("unselected")) {
        toggleSelect(document.getElementById("goalroll"));
    }
}
function randBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}
function setOpperation(element) {
    past = board.opperation;
    future = element.innerHTML;
    board.opperation = element;
    board.writeOpperation();
}

function goalRoll(element) {
    goalContainer = document.getElementById("goal-area");
    goalContainer.innerHTML = randBetween(100, 999);
    document.getElementById("goalroll").innerHTML = "reroll";

    if (document.getElementById("startRound").classList.contains("selected")) {
        console.log("toggle start round");
        toggleSelect(document.getElementById("startRound"));
    }
   /* toggleSelect(document.getElementById("startRound"));*/
}

function startRound() {
    toggleOppButtons();
    toggleSelect(document.getElementById("goalroll"));
    terms = document.getElementsByClassName("num");
    unselectAll(terms);
    timer.start(30);
    toggleSelect(document.getElementById("startRound"));
}

function shuffel(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function toggleSelect(element) {
    element.classList.toggle("unselected");
    element.classList.toggle("selected");
}

function unselectAll(list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].classList.contains("selected")) {
            console.log(list[i].classList)
            toggleSelect(list[i]);
        }
    }
}

function selectAll(list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].classList.contains("unselected")) {
            console.log(list[i].classList)
            toggleSelect(list[i]);
        }
    }
}

function getBestResult() {
    let answers = document.getElementsByClassName("answer");
    console.log(answers);
    let bestAnswer = 0;
    let goal = document.getElementById("goal-area").innerHTML;
    console.log(goal);
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].firstChild) {
            let newAnswer = answers[i].firstChild.innerHTML;
            if (Math.abs(goal - newAnswer) < Math.abs(goal - bestAnswer)) {
                bestAnswer = newAnswer;
            }
        }
    }
    return bestAnswer;
}

function toggleOppButtons() {
    let opperations = document.getElementsByClassName("oppButtons");
    toggleSelect(document.getElementById("submit"));
    for (let i = 0; i < opperations.length; i++) {
        for (let j = 0; j < opperations[i].children.length; j++) {
            toggleSelect(opperations[i].children[j]);
        }
    }

}


