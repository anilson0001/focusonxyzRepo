function loadFrontPage(){   window.location.assign("https://www.focusonxyz.com")    }
    
function idleLogout() 
{
    var idleTime;
    window.onload       = resetTimer;
    window.onmousemove  = resetTimer;
    window.onmousedown  = resetTimer;   // catches touchscreen presses as well      
    window.ontouchstart = resetTimer;   // catches touchscreen swipes as well      
    window.ontouchmove  = resetTimer;   // required by some devices 
    window.onclick      = resetTimer;   // catches touchpad clicks as well
    window.onkeydown    = resetTimer;   
    window.addEventListener('scroll', resetTimer, true); // improved; see comments

    function resetTimer() 
    {
        clearTimeout(idleTime);
        //idleTime = setTimeout(loadFrontPage, 1200000);  //1000=1sec; 60 000=1minute; 120 000=2minutes; 1 200 000=20minutes
        idleTime = setTimeout(loadFrontPage, 3_600_000);  //1000=1sec; 60 000=1minute; 600 000=10minutes; 1 200 000=20minutes
    }
}

idleLogout();