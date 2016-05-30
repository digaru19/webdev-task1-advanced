// The timer updates only the required fields, and does not update all the components of the timer, at the interval of one second.

var reset=0; 
var myTimer = 0;

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
		document.getElementById('whole').style.visibility = 'hidden'; 
		document.body.style.backgroundImage = "url('outerspace.jpg')"; 
		clearInterval(myTimer);      // Stop the 'timer'
	    setTimeout(message, 2000);	 // Display a message after 2 seconds of background change
	}
	else  // If all the above conditions fail, then decrement timer by 1 second
		document.getElementById('seconds').innerHTML -= 1;    
	
};


var setNow = function() {
	stopTimer();    
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
	
	document.getElementById('date').value = yyyy+'-'+mm+'-'+dd;  
	document.getElementById('time').value= (hh+1)+':'+min+':'+ss;   
	document.getElementById('input-field').style.visibility='visible'; 

}

var setToZero = function() {
	
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
		if(getTimeLeft()=== -1) {
           	setToZero();
		    return ;
		}
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
	
	if(verifyInput(eventDate,eventTime)=== -1) {
		alert("Please enter the date and time of the event properly.")
		setNow();
		setToZero();
	    return -1;
	}
	
	var EventOn = new Date(eventDate[0],parseInt(eventDate[1])-1,eventDate[2],eventTime[0],eventTime[1],eventTime[2]);

	
	if(!EventOn) {
		console.log("Set proper value of event date");
	    return;
	}
	
	console.log(EventOn.toString())
	
	var t = EventOn.getTime() - Date.now();
	if(t<=0) {
		alert("The event date and time should be in the future.")
		return -1;
		
	}
	
	// Calculate the required time remaining for the event
	var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
	
	document.getElementById('days').innerHTML = String(days);
	document.getElementById('hours').innerHTML = String(hours);
	document.getElementById('minutes').innerHTML = String(minutes);
	document.getElementById('seconds').innerHTML = String(seconds);
	
	// Return control to startTimer
	
}

var verifyInput = function(date,time) {
	yyyy = date[0];
	mm = date[1];
	dd = date[2];
	hh = time[0];
	min = time[1];
	ss = time[2];
	console.log("called")
	
    if ( isNaN(yyyy) || isNaN(mm) || isNaN(dd) || isNaN(hh) || isNaN(min) || isNaN(ss))
	{
		return -1;
	}
	console.log("passed 1")
	
	if(Number(mm) < 1 || Number(mm) > 12 || Number(dd) < 1)
		return -1;
	
    if(Number(mm) === 2) {     //  Checking for leap years
	console.log("feb");
			if (Number(dd)>29) {
				console.log(String(Number(dd)) + "feb more days");
				return -1;
				
			}
			else if(Number(dd)===29) {
			if( Number(yyyy)%4===0 && Number(yyyy)%100!=0) {
			   console.log("condn 1");
			   return 0;
			}
		    else if ( Number(yyyy)%400 === 0) {
				console.log("condn 2");
				return 0;
			}
			else return -1;
			}
		return 0;
	}
	
	if(mm in ['1','3','5','7','8','10','12']) {
		if (! dd <= '30')
			return -1;
	}
	else if (mm in ['4','6','9','11']){
		if (! dd <= '31')
			return -1;
	    }
    	
	else if ((Number(hh)>23 || Number(hh)<0) || (Number(min)<0 || Number(min)>59) || (Number(ss)<0 || Number(ss)>59))
		return -1;
	
	return 0;
	
	
}

// Adding event listeners for the buttons
document.getElementById("stop").addEventListener("click", stopTimer );
document.getElementById("start").addEventListener("click", startTimer );
document.getElementById("reset").addEventListener("click", setNow );

setNow();

