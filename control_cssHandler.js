function csshandler_motivatorManager()
{
    let footHeight;

    document.getElementById("Motivator").innerHTML = cover.Motivation();
    footHeight = (Number(document.getElementById("footContainer").scrollHeight));
    let ifheight  = (Number(document.getElementById("Motivator").scrollHeight));
    
    document.querySelector(':root').style.setProperty("--footHeight", (Number(footHeight)+Number(60))+"px");
    document.querySelector(':root').style.setProperty("--ifootHeight", (Number(ifheight)+Number(15))+"px");
}

function csshandler_environmentManager()
{   return getComputedStyle(document.documentElement).getPropertyValue('--environment');    }

function csshandler_frontcontainersManager()
{
    let mheight = document.getElementById("menuContainer").scrollHeight;
    let fh      = getComputedStyle(document.documentElement).getPropertyValue('--footHeight');
    
    document.querySelector(':root').style.setProperty("--menuHeight", (Number(60) + Number(mheight)) +"px");
    document.getElementById("mainContainer").style.setProperty("margin-bottom", fh);  
}

function csshandler_actionheadRetracted(head, body, foot)
{
    head.style.whiteSpace = "nowrap";
    head.style.width="100%";
    body.style.maxHeight = null; 
    body.classList.add("closedDisplay");
    
    
}

function csshandler_actionheadExpanded(head, body, foot)
{   head.style.whiteSpace = "unset"; }
