// The timer updates only the required fields, and does not update all the components of the timer, at the interval of one second.

var reset=0;  // Reset flag, for setting the event date and time

var message = function() {      // Display end message, after the timer is over
	document.body.innerHTML = "<br/><br/><br/><br/> <center><h1> Welcome to Outer Space !! </center></h1>";
}

var timer = function() {  // Main timer function
	
	// Checks for the special cases in the timer
	    if (document.getElementById('seconds').innerHTML === '0') {
		if( Number(document.getElementById('minutes').innerHTML) > 0) {   
		    // Decrement number of minutes by 1
			document.getElementById('minutes').innerHTML -= 1;
			document.getElementById('seconds').innerHTML = '59';
			return; 
		}
		if( Number(document.getElementById('minutes').innerHTML) === 0 && Number(document.getElementById('hours').innerHTML) > 0) {			
		    // Decrement number of hours by 1
			document.getElementById('minutes').innerHTML = '59';
			document.getElementById('seconds').innerHTML = '59';
			document.getElementById('hours').innerHTML -= 1;
			return;			
		}
        if( Number(document.getElementById('hours').innerHTML) === 0 && Number(document.getElementById('days').innerHTML) > 0) {    	
     		// Decrement number of days by 1
			document.getElementById('hours').innerHTML = '23';
			document.getElementById('seconds').innerHTML = '59';
			document.getElementById('minutes').innerHTML = '59';
			document.getElementById('days').innerHTML -= 1;
			return;			
		}		
		
		// Countdown over
		console.log("Timer Over !!")  // Print a message to the console
		document.getElementById('whole').style.visibility = 'hidden'; // Hide the timer div 
		document.body.style.backgroundImage = "url('outerspace.jpg')"; // Change the background image
		clearInterval(myTimer);      // Stop the 'timer'
	    setTimeout(message, 2000);	 // Display a message after 2 seconds of background change
	}
	else  // If all the above conditions fail, then decrement timer by 1 second
		document.getElementById('seconds').innerHTML -= 1;    // Decrement seconds by 1
	
};

var myTimer = setInterval(timer,1000);   // Start timer function , calls at intervals of one second


// Setting the current time values to the input fields, when 'Reset' has been clicked
var resetTimer = function() {
	stopTimer();    // Stop the timer, before setting the event date
	setToZero();    // Set all timer elements to 0
	var now = new Date();
	var dd = now.getDate();
	var mm = now.getMonth()+1;   // As months start from 0, i.e. January is 0
	var yyyy = now.getFullYear();
	var hh = now.getHours();
	var min = now.getMinutes();
	var ss = now.getSeconds();
	
	if(dd<10) { 
	dd = '0' + dd ;
	} 
	if(mm<10) {
    mm = '0' + mm;
	}
	if(hh<10) {
    hh = '0' + hh;
	}
	if(min<10) {
    min = '0' + min;
	}
	if(ss<10) {
    ss = '0' + ss;
	}
	
	reset = 1;    // Set reset flag to 1, as reset button has been clicked
	
	document.getElementById('date').value = yyyy+'-'+mm+'-'+dd;  // Set the value in the date field
	document.getElementById('time').value= hh+':'+min+':'+ss;   // Set the value in the time field
	document.getElementById('input-field').style.visibility='visible'; // Show the input div

}

var setToZero = function() {
	// This function sets the value of all timer elements to 0
	document.getElementById('days').innerHTML = '0';
	document.getElementById('hours').innerHTML = '0';
	document.getElementById('minutes').innerHTML = '0';
	document.getElementById('seconds').innerHTML = '0';
	}

var stopTimer = function() {
	clearInterval(myTimer); 
	myTimer=0;
}

var startTimer = function() {
	if(reset === 1) {  // If Reset button has been clicked before clicking the Start button
		getTimeLeft();  // Get the time left for the event 
        reset = 0;  
	}
	if (!myTimer) myTimer = setInterval(timer,1000);
	document.getElementById('input-field').style.visibility='hidden';
}

var getTimeLeft = function() {
	var eventDate = document.getElementById('date').value;
	var eventTime = document.getElementById('time').value;
	eventDate = eventDate.split("-")
	eventTime = eventTime.split(":");
	
	var EventOn = new Date(eventDate[0],parseInt(eventDate[1])-1,eventDate[2],eventTime[0],eventTime[1],eventTime[2]);
	
	if(!EventOn) {
		console.log("Set proper value of event date");
	    return;
	}
	
	console.log(EventOn.toString())
	
	var t = EventOn.getTime() - Date.now();
	
	if(t<=0) {
		alert("The date and time entered for the event has passed.\nThe event has taken place.")
		setToZero();	 // Set all time elements to zero, if time remaining is less than 0	
        return ;		
	}
	
	// Calculate the required time remaining for the event
	var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
	
	// Set the time remaining in the timer elements
	document.getElementById('days').innerHTML = String(days);
	document.getElementById('hours').innerHTML = String(hours);
	document.getElementById('minutes').innerHTML = String(minutes);
	document.getElementById('seconds').innerHTML = String(seconds);
	
	// Return control to startTimer
	
}

// Adding event listeners for the buttons
document.getElementById("stop").addEventListener("click", stopTimer );
document.getElementById("start").addEventListener("click", startTimer );
document.getElementById("reset").addEventListener("click", resetTimer );