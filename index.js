import { origWords } from './words.js';
import audioFile from "url:./sounds/flexatone-cartoon-wobble-ni-sound-1-00-02.mp3";

const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = 400;
const canvasHeight = 400;
let balloonCoordinates = [];
let balloonRadius = 30;
//let origWords = ["wide","goods","tufts","same","cove","mask","gift","mess","drill","post","logs","upon","feet","sprung","plates","bread","loud","beak","foam","oil","also","spikes","smug","shelter","frankly","found","bonnet","camera","single","Texas","alas","embers","slumped","circus","imagined","part","nook","cold","much","thing","hike","very","left","meet","bent","hat","idea","must","zoomed","matching","clock","flapped","cog","clutch","gushed","floor","speech","rapids","creak","knot","gloves","rodeo","wrenches","polish","mumble","barrels","paddles","blurted","aware","reveal","mink","jelly","lane","deer","try","car","last","rush","lid","mice","swim","singing","turning","large","track","crusts","cell","poor","knife","china","frames","shoe","slide","gutter","search","pretty","salad","goggles","dolphin","direct","clerks","whiskers","wallet","mango","ached","tummy","slow","son","silk","duckling","rage","well","gone","lisp","rope","read","kites","wanted","closed","chart","pain","cheese","power","place","stopped","studied","prize","goals","booth","crouched","baskets","cousin","inflate","skiing","detail","forty","condition","focus","firmly","fabric","detour","teachers","gusto","scarf","shimmery","blindfolded","clobbered","rattled","throat","scuba","absent","savor","inclined","masthead","Leghorn","crockery","Neptune","lavished","nada","adorned","invasions","destination","scrawny","mulberry","weird","mutual","alibi","devious","flaxen","biome","cardigan","withered","Lincoln","tartan","wretched","expanse","contessa","wreaked","sudoku","exerts","reflexology","fetlocks","pulverized","impolite","ordinary","kitchen","surface","indent","basically","relative","indie","hull","trickster","texture","hedgehog","wardrobe","vibrant","shrine","gauze","notification","archduke","Juneteenth","loneliness","dedicated","ostriches","classified","surrounded","dependable","dormitories","orientation","sardine","triplicate","Wales","columns","cambric","granite","surveyed","contorted","chai","acutely","renowned","dutifully","arid","intentionally","ranchero","mystified","demeanor","squiggles","capture","cleat","Nile","sitcom","squints","cringed","eyesore","outright","glib","scuffle","stoats","revved","wizard","Jamestown","exception","ogre","dingoes","parsnips","caverns","symbol","grudgingly","telescope","associated","summit","tuxedo","inlaid","contraption","emboldened","Avalon","cubicle","hackles","radiation","emitting","charlotte","metropolis","granules","colleagues","mournful","deceptively","cocoon","intolerance","swankiest","mallet","disembodied","because","feline","bustling","scrolls","detect","drone","playlist","squabbling","sneer","irregular","talons","dire","nudged","pineapple","cavity","simplicity","passersby","curtains","novie","reduce","canopy","fidgeting","furthermore","conkers","decimal","cobblestone","technique","Javas","corridor","interjected","faltered","wattles","preened","elation","mousse","pedestals","invigorating","professional","sustenance","motley","gluten","clouting","Singapore","Korea","morbidity","referral","stalemate","appeasement","instinctive","convictions","lineage","drudgery","heirloom","russet","heresy","dispensation","bantlings","padre","chaplain","herbalist","adduced","transept","mortification","aversion","vuvuzela","Wiesbaden","condyles","Chelonia","quatrains","hawsers","abalones","Confucianism","Mantua","Durham","bier","refectory","presidio","aisles","proctors","aerials","thoroughfare","liability","infectious","intestine","coaxing","ransacked","pallid","topologicaly","perdition","prioress","mien","feinted","fortuitous","impertinent","condescendingly","covenant","primordial","adzuki","Montmorency","Quasimodo","katabatic","Bayreuth","Albion","repast","Chaucerian","Jains","derrick","conurbation","unsportsmanlike","trodden","surgeon","transgressions","penchant","Minnesota","discriminating","permanence","renal","kimchi","burgundy","incorrigibles","palpable","embroidery","resinous","humus","poultice","fractious","rhetorical","throes","moppet","allée","justaucorps","Firenze","Helvetia","bivouac","vambrace","paschal","Bloomsbury","Edinburgh","ziggurat","Kerala","Sioux","ensnarement","torturous","Judaism","abdomen","propensity","adversity","exile","larkspur","menorahs","mete","brocade","porcine","congealing","coronation","Scree","Cantonese","guarantor","Darwinism","phenomenal","semblance","assassinate","ducats","kaddish","lachrymose","plastron","coracle","aquiline","Carlisle","Arapaho","chandleries"];
let numberOfWords = 0;
let words = origWords;
//words = origWords;
numberOfWords = 0;
let currentWordArray = words[0].split("");
let currentWord = words[0];
let currentTypedWord = [];
let currentTypedIndex = 0;
let typedWordText = '';
let wordIndex = 0;
let highStreak = 0;
let currentStreak = 0;
let correctCount = 0;
let spellingWord = false;
let correctWords = '';
let numberOfTries = 0;
let startWord = 0;
let subsetWord = 200;

const alphabet = ['A','B','C','D','E','F','G','H','I','J',
'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
// let buttonListener = new ButtonListenerFunction ();
let storageWords = getWordsArray();
highStreak = getHighStreak();
setStreakText();


if (getWordsArray() !== null) words = storageWords;
setCanvasBackground('white');

numberOfWords = words.length;
setWordsLeft();

document.addEventListener('keydown', logKey);
// addListenerToButton();

document.getElementById('sayWord').addEventListener('click', function(){
    if (!spellingWord) newWord();
    else setTimeout(function (){sayWord(currentWord)}, 1000);
    // sayWord(currentWord);
    let inputElement = document.getElementById('hiddenInput');
    inputElement.style.visibility = 'visible';
    inputElement.focus();
    inputElement.style.visibility = 'hidden';
});
document.getElementById('restart').addEventListener('click', function(){
    startWord = document.getElementById('startWord').value;
    subsetWord = document.getElementById('subsetWord').value;
    clearStorage();
    words = origWords.splice(startWord, subsetWord);
    saveWordsArray(words);
    location.reload();
});

document.getElementById('clear-storage').addEventListener('click', function(){
    clearStorage();
});

function sayWord (currentWord) {
    var msg = new SpeechSynthesisUtterance();
    msg.rate = 0.75;
    msg.text = currentWord;
    window.speechSynthesis.speak(msg);
}

function newWord() {
        setTypedWordText(typedWordText);
        numberOfWords = words.length - 1;
        wordIndex = Math.floor(Math.random()*numberOfWords);
        currentWord = words[wordIndex];
        currentWordArray = words[wordIndex].split("");
        spellingWord=true;
        flashWord(currentWord);
        setTimeout(function (){sayWord(currentWord)}, 2000);
        setWordsLeft();
}
function logKey(e) {
    let typedLetter = "";
    const typedArray = e.code.split("");
    if (typedArray[0] === 'K') typedArray.splice(0, 3);
    if (isLetter(typedArray[0])){
        typedLetter = typedArray[0].toLowerCase();
    }
    checkSpelling(typedLetter);
}

function setWordsLeft(){
    document.getElementById('words-left').innerHTML = 'Words Left: ' + numberOfWords;
    if (words.length === 0) document.getElementById('words-left').innerHTML = 'The End';
}

function isLetter(character) {
    for (let key of alphabet) {
        if (character === key) return true;
    }
    return false;
}

function setTypedWordText(typedWord) {
    document.getElementById('typed-word').innerHTML = typedWord;
}

function checkSpelling(typedLetter) {
    if (document.activeElement.id === "startWord" || document.activeElement.id === "subsetWord") return;
    currentTypedWord.push(typedLetter);
    typedWordText = currentTypedWord.join('');
    setTypedWordText(typedWordText);

    // correct letter
    if (currentTypedWord[currentTypedIndex] === currentWordArray[currentTypedIndex].toLowerCase()){
        // Last letter
        if (currentWordArray.length === (currentTypedIndex + 1)) {
            currentTypedIndex=0;
            currentTypedWord=[];
            
            spellingWord = false;
            addCorrectWords(typedWordText);
            typedWordText = '';
            
            // Correct on first try
            if (numberOfTries === 0) {
            words.splice(wordIndex, 1);
            saveWordsArray(words);
            correctCount++;
            currentStreak++;
            newBalloon();
            (currentStreak > highStreak) ? highStreak = currentStreak : highStreak = highStreak;
            saveHighStreak(highStreak);
            setStreakText(currentStreak);
            newWord();
            return true;
            }
            // Correct on second try
            newWord();    
            numberOfTries = 0;
        }
        // Still typing
        else currentTypedIndex++;
        return true;
    }

    // incorrect word
    else {
        numberOfTries++;
        playSound();
        currentStreak = 0;
        setStreakText();
        // set backgound on pause typing
        document.getElementById('typed-word-box').style.background = 'red';
        document.removeEventListener('keydown', logKey);
        setTimeout(function (){document.addEventListener('keydown', logKey)}, 2000);
        setTimeout(function(){document.getElementById('typed-word-box').style.background = 'none'}, 2000);

        //first fail
        if (numberOfTries < 2) {           
            currentTypedIndex=0;
            currentTypedWord=[];
            typedWordText = '';
            setTypedWordText(typedWordText);
            flashWord(currentWord);
            setTimeout(function (){sayWord(currentWord)}, 1000);
            clearCanvas();
            setCanvasBackground('white');
            return false;
        }
        //second fail
        else{
            flashWord(currentWord);
            currentTypedIndex=0;
            currentTypedWord=[];
            typedWordText = '';
            numberOfTries = 0;
            correctCount = 0;
            newWord();
            clearCanvas();
            setCanvasBackground('white');
            return false;
        }
    }
}

function flashWord(currentWord) {
    setTimeout(function (){setSayWordButtonText (currentWord)}, 1500);
    setTimeout(function (){setSayWordButtonText('Say Word')}, 3500);
    setTimeout(function (){sayWord(currentWord)}, 1000);
}
function playSound() {
    var audio = new Audio(audioFile);
    audio.play();
}

function setStreakText(correctStreak) {
    document.getElementById('streak').innerHTML = 'Current Streak: ' + currentStreak + '<br> High Streak: ' + highStreak;
}

function  setSayWordButtonText (currentWord) {
    document.getElementById('sayWord').innerHTML = currentWord;
}

function saveWordsArray(words){
    localStorage.setItem("wordsArray", JSON.stringify(words));
}

function getWordsArray() {
    if (localStorage.hasOwnProperty('wordsArray')){
        return JSON.parse(localStorage.getItem('wordsArray'));
    }
    else return null;
}

function saveHighStreak(highStreak){
    localStorage.setItem("highStreak", JSON.stringify(highStreak));
}

function getHighStreak(){
    if (localStorage.hasOwnProperty('highStreak')){
        return JSON.parse(localStorage.getItem('highStreak'));
    }
    else return null;
}

function newBalloon() {
    
    balloonCoordinates = getRandomCoordinates();
    drawBalloon(balloonCoordinates, balloonRadius);
}

function addCorrectWords (typedWordText) {
    correctWords = typedWordText + '<br>' + correctWords;
    document.getElementById('correct-words').innerHTML = correctWords;
}

function clearCorrectWords () {
    correctWords = '';
    document.getElementById('correct-words').innerHTML = correctWords;
}

function clearStorage(){
    localStorage.removeItem("wordsArray");
}

function getRandomCoordinates (){
    return [Math.floor(Math.random()*(canvasWidth-balloonRadius*2) + balloonRadius),
         Math.floor(Math.random()*(canvasHeight-balloonRadius*2) + balloonRadius)]
}

function drawBalloon (coordinateArray, radius) {
    const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
    const balloonColor = colors[Math.floor(Math.random()*6)];
    const x = coordinateArray[0]
    const y = coordinateArray[1]

    ctx.beginPath();
    ctx.moveTo(x,y)
    ctx.bezierCurveTo(x + 20, y + 20, x - 20, y + 40, x + 20, y + 60);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(coordinateArray[0], coordinateArray[1], radius, 0, 2 * Math.PI);
    ctx.fillStyle = balloonColor;
    ctx.fill();
    ctx.stroke();
    drawCircleText(coordinateArray);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function setCanvasBackground(backgroundColor){
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawCircleText(coordinateArray){
    ctx.font = 'bold 24px serif';
    ctx.fillStyle = 'black';
    ctx.fillText(currentStreak, coordinateArray[0] - 10, coordinateArray[1] + 6);
}

