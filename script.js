const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timeRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
	if(time <= 9){
		time = "0" + time;
	}
	return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
	let currentTimer = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2])
	theTimer.innerHTML = currentTimer;
	timer[3]++;

	timer[0] = Math.floor((timer[3]/100)/60)
	timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60))
	timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0]*6000))
}


// Match the text entered with the provided text on the page:
function spellCheck() {
	let textEnter = testArea.value;

	let originTextMatch = originText.substring(0,textEnter.length)

	if(textEnter == originText) {
		clearInterval(interval)
		testWrapper.style.borderColor = "#429890"
	} else {
		if (textEnter == originTextMatch) {
			testWrapper.style.borderColor = "#65ccf3"
		}else {
			testWrapper.style.borderColor = "#e95d0f"
		}
	}

	// console.log(textEnter)
}

// Start the timer:
function start() {
	let textEnterLength = testArea.value.length;

	if(textEnterLength === 0 && !timeRunning){
		timeRunning = true;
		interval = setInterval(runTimer,10)
	}

	// console.log(textEnterLength);
}

// Reset everything:
function reset() {
	clearInterval(interval)
	interval = null;
	timer = [0,0,0,0];
	timeRunning = false;

	testArea.value = "";
	theTimer.innerHTML = "00:00:00";
	testWrapper.style.borderColor = gray;
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener('keypress',start,false)
testArea.addEventListener('keyup',spellCheck,false)
resetButton.addEventListener('click',reset, false)