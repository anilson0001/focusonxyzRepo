/******************** Opening Page ********************/
function openPage()
{
    try
    {
        sessionStorage.username     = 'anilson001'
        apps.uniqueData.uDB         = 'foxyz13579';
        apps.uniqueData.uid         = 'anilson001_foxyz13579';
        apps.uniqueData.uFolder     = 'development';
        apps.uniqueData.uVersion    = 'local_1';

        apps.environment = csshandler_environmentManager();
        
        const header = document.getElementById(`${apps.environment}_Header`);
        if(aux_existence(header))
        {
            header.classList.remove("closedDisplay");
        }
        

        loadPage();                
        setConfigurationBoard();    

        apps.funcLogger.set(Date.now(),
            {
                file:           "pageConfig.js",
                name:           "openPage",
                process:        "initiate Page Loading",
                qDescription:   "Process the initial variable/data from the login page." + 
                                "Set Environment. " +
                                "Analyze the type of loading request (normal loading or scanned Action), and proceed accordingly."
            }
        );
        
    }
    catch(error)
    {   
       console.log(error);
    }
}


function loadScannedActionToPage(data)
{
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "loadScannedActionToPage",
            process:        "initiate Page Loading",
            qDescription:   "Process/loop the scanned-object-action-data returning from webworker."
        }
    );
        
    data.forEach((action)=>
    {
        if(aux_existence(action))
        {
            let obj = {};            
            for(let a in action)
            {
                if(apps.properties.includes(a))
                {
                    if(aux_existence(action[a]))
                    {   obj[a] = JSON.parse(action[a]); }
                }
                else
                {   obj[a] = action[a];     }
            }
            apps.actions.push(obj);
            document.getElementById('coverBoard').innerHTML = "";
            frmDisplay.Action.Placer(obj, "", "actionBoard");             
        }
    });
}



function loadPage()
{
        apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "loadPage",
            process:        "initiate Page Loading",
            qDescription:   "Manage the Loading of the UserInterface."
        }
    );
    
    function initializePage()
    {
        
                apps.funcLogger.set(
            Date.now(),
            {
                file:           "pageConfig.js",
                name:           "loadPage.initializePage",
                process:        "initiate Page Loading",
                qDescription:   "Manage the timeout to load the UserInterface."
            }
        );
    
        document.getElementById(`${apps.environment}_userTitle`).innerText = `@${sessionStorage.username}`;
        
        
        /*
        let footHeight;

        document.getElementById("Motivator").innerHTML = cover.Motivation();
        footHeight = (Number(document.getElementById("footContainer").scrollHeight));
        let ifheight  = (Number(document.getElementById("Motivator").scrollHeight));
        
        document.querySelector(':root').style.setProperty("--footHeight", (Number(footHeight)+Number(60))+"px");
        document.querySelector(':root').style.setProperty("--ifootHeight", (Number(ifheight)+Number(15))+"px");
        */
        csshandler_motivatorManager();
        
        setTimeout(()=>
        {
            function initializeMenu()
            {
                let cnt0=0, cnt1=3, cnt2=0;
                const loadMenuSettings = setInterval(function()
                {
                    if(cnt2===10)
                    {  
                        clearInterval(loadMenuSettings);
                        cover.userPercentage();         
                        //display performance and points (coverPage.js --> cover.userPercentage())
                        

                        if(apps.environment === "mobile")
                        {
                            document.getElementById(`${apps.environment}_MenuSelector`).classList.remove("closedDisplay");                              
                            document.getElementById(`${apps.environment}_MenuSelector`).classList.add("openDisplay");

                            csshandler_frontcontainersManager();
                        }
                    }
                    else
                    {   
                        let p0="", p1="";
                        
                        if(cnt0>0){   for(let i=0; i<cnt0; i++){ p0 += " ."} }
                        if(cnt1>0){   for(let i=0; i<cnt1; i++){ p1 += " ."} }
                        
                        document.getElementById("3FPerformance").innerText = p0 + " Loading Data " + p1;
                        cnt0 = (cnt0>=3)? cnt0=0: ++cnt0;
                        cnt1 = (cnt1<=0)? cnt1=3: --cnt1;
                        cnt2++;
                    }
                }, 500);
                let windowHeight = Number(window.innerHeight);
                let windowFooter = Number(document.getElementById("footContainer").offsetHeight);
                let windowHeader = Number(document.getElementById("headContainer").offsetHeight);
                
                document.querySelector(':root').style.setProperty("--pageHeight", (`${windowHeight}px`));
                document.querySelector(':root').style.setProperty("--pageFooter", (`${windowFooter}px`));       
                document.querySelector(':root').style.setProperty("--pageBody", (`${windowHeight - (windowFooter + windowHeader)}px`));  
            }
            
            if(aux_existence(sessionStorage.username))
            {   initializeMenu();   }
            else
            {   closePage();        }
        } , 1000);
    }
    
     
    function initializeExtra()
    {
        apps.funcLogger.set(
            Date.now(),
            {
                file:           "pageConfig.js",
                name:           "loadPage.initializeExtra",
                process:        "initiate Page Loading",
                qDescription:   "Manage the loading of the footer and extraboard on the UserInterface."
            }
        );
        
        if(apps.environment!=="mobile")
        {   
            document.getElementById("extraContainer").innerHTML = auxPanel.Instructions();
            document.getElementById("extraContainer").classList.add("visualUP");  
            
            if(apps.environment==="desktop")
            {  
                document.getElementById("footDisplay").classList.remove("openDisplay");   
                document.getElementById("footDisplay").classList.add("closedDisplay"); 
            }
        }
        else
        {  
            document.getElementById("extraBoard").innerHTML = auxPanel.Instructions();  
            document.getElementById("footDisplay").classList.remove("closedDisplay");
            document.getElementById("footDisplay").classList.add("openDisplay"); 
        } 
    }


    initLayoutMode();
    openFocusFocusFocusDB(); 
    

    initializePage();
    initializeExtra();
}
    
    
    
function closePage()
{
            apps.funcLogger.set(
            Date.now(),
            {
                file:           "pageConfig.js",
                name:           "closePage",
                process:        "Exiting Page",
                qDescription:   "Close the Page."
            }
        );
        
    sessionStorage.username = "";
    window.open("https://www.focusonxyz.com", "_self");  
}


function initLayoutMode() 
{
        apps.funcLogger.set(
            Date.now(),
            {
                file:           "pageConfig.js",
                name:           "initLayoutMode",
                process:        "???",
                qDescription:   "Sets pageContainer to 'show-main' class"
            }
        );
        
        
    const page = document.getElementById('pageContainer');
    page.classList.add('show-main');
}
    
    
    
/******************** Menu ********************/    
    
function reloadPageMenu()
{   
    
            apps.funcLogger.set(
            Date.now(),
            {
                file:           "pageConfig.js",
                name:           "reloadPageMenu",
                process:        "???",
                qDescription:   "Reload Page"
            }
        );
        
    loadData(gbDefault());  
    
}


function toggleMenuClass_LR()
{
        apps.funcLogger.set(
            Date.now(),
            {
                file:           "pageConfig.js",
                name:           "toggleMenuClass_LR",
                process:        "Menu Handler",
                qDescription:   "It manages the moviment of the menu to Left or Right"
            }
        );
        
        
    let menuNav   = document.getElementById("menuContainer");
    let menuSlide = document.getElementById("menu_sign_LR");  
    
    
    if((menuNav.style.display!=='none')&&(menuNav.style.display!=='')&&(menuNav.style.display!==""))
    {
        menuNav.style.display = 'none';   
        menuSlide.innerText = "\u21f6";     //rightwards triple arrow
    }
    else
    {
        menuNav.style.display = 'block';   
        menuSlide.innerText = "\u2b31";     //leftwards triple arrow
    }
}


function toggleMenuClass_UD()
{
        apps.funcLogger.set(
            Date.now(),
            {
                file:           "pageConfig.js",
                name:           "toggleMenuClass_UD",
                process:        "Menu Handler",
                qDescription:   "It manages the moviment of the menu to Up or Down"
            }
        );
        
    let menuNav = document.getElementById("menuContainer");
    let menuSlide = document.getElementById("menu_sign_UD");


    if((menuNav.style.display!=='none')&&(menuNav.style.display!=='')&&(menuNav.style.display!==""))
    {
        menuNav.style.display = 'none';   
        menuSlide.innerText = "\u290b";     //downwards triple arrow
    }
    else
    {
        menuNav.style.display = 'block';   
        menuSlide.innerText = "\u290a";     //upwards triple arrow
    }
}


function getMenuSelector()
{
            apps.funcLogger.set(
            Date.now(),
            {
                file:           "pageConfig.js",
                name:           "getMenuSelector",
                process:        "Menu Handler",
                qDescription:   "It manages the menu selector on different environments"
            }
        );
        
    if(apps.environment==="mobile")
    {
        document.getElementById("desktop_MenuSelector").classList.remove("openDisplay");
        document.getElementById("desktop_MenuSelector").classList.add("closedDisplay");
        
        document.getElementById("mobile_MenuSelector").classList.remove("closedDisplay");
        document.getElementById("mobile_MenuSelector").classList.add("openDisplay");
    }
    else
    {
        document.getElementById("desktop_MenuSelector").classList.remove("closedDisplay");
        document.getElementById("desktop_MenuSelector").classList.add("openDisplay");
        
        document.getElementById("mobile_MenuSelector").classList.remove("openDisplay");
        document.getElementById("mobile_MenuSelector").classList.add("closedDisplay");
    }
}


function toggleMenu()
{
            apps.funcLogger.set(
            Date.now(),
            {
                file:           "pageConfig.js",
                name:           "toggleMenu",
                process:        "Menu Handler",
                qDescription:   "It toggles menu status (closed/open)"
            }
        );
    
    let menuNav = document.getElementById("menuContainer");

        if(menuNav.classList.value.includes("openDisplay"))
        {   closeMenu();  }
        else
        {   openMenu();  }
    
    document.getElementById("coverBoard").classList.remove("openDisplay");
    document.getElementById("coverBoard").classList.add("closedDisplay");
}


function closeMenu()
{
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "closeMenu",
            process:        "Menu Handler",
            qDescription:   "It sets menu closed, and manages the correspondent settings"
        }
    );
        
    let menuNav = document.getElementById("menuContainer");
    
    document.getElementById("openMenu").value=""; 
    
    if(apps.environment==="mobile")
    {
        menuNav.classList.remove("openDisplay"); 
        menuNav.classList.remove("menuHeightON");  
        menuNav.classList.add("closedDisplay");             
        
        //dime color
        document.getElementById(`${apps.environment}_MenuSelector`).style.color = "#8e9eaf";
    } 
    
    
    if(apps.environment==="tablet")
    {} 
    
   
    if(apps.environment==="desktop")
    {
        //document.querySelectorAll(".menuButton:not([data-menu-depth='0'])").forEach((menu)=>
        document.querySelectorAll(".menuButton").forEach((menu)=>
        {
            
            if(menu.dataset.menuDepth!=='0')
            {   menu.style.display="none";  }
            
            let group   = menu.dataset.menuGroup;
            let arrow   = document.getElementById(`menuArrow_${group}`);
            let folder  = document.getElementById(`menuFolder_${group}`);
            let title   = document.getElementById(`menuTitle_${group}`);
            let positionTitle = document.getElementById(`menuPositionTitle_${group}`);
            
            arrow.innerText = "\u25b6";
            folder.innerText = "🗀";
            title.style.fontFamily = "sans-serif";
            title.style.fontWeight = "normal";
            title.style.fontSize = "16px";
            positionTitle.style.padding = "5px";
            positionTitle.style.setProperty("--menu_postitle", "white");
        });
        
        
        //menuNav.classList.remove("openDisplay"); 
        //menuNav.classList.remove("menuHeightON");  
        //menuNav.classList.add("closedDisplay");             
        
        //dime color
        //document.getElementById(`${apps.environment}_MenuSelector`).style.color = "#8cb3d9;";
    }

}


function openMenu()
{

    apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "openMenu",
            process:        "Menu Handler",
            qDescription:   "It sets menu open, and manages the correspondent settings"
        }
    );
    
    let menuNav = document.getElementById("menuContainer");
    if(apps.environment==="mobile")
    {    
        menuNav.classList.remove("closedDisplay");  
        menuNav.classList.add("openDisplay"); 
        menuNav.classList.add("menuHeightON");  
        
        
        document.getElementById("mainContainer").classList.remove("closedDisplay"); 
        document.getElementById("mainContainer").classList.add("openDisplay"); 
        
        
        document.getElementById("actionBoard").classList.remove("closedDisplay");
        document.getElementById("actionBoard").classList.add("openDisplay");
        
        document.getElementById("extraContainer").classList.remove("closedDisplay"); 
        document.getElementById("extraContainer").classList.add("openDisplay"); 
        
        
        document.getElementById(`${apps.environment}_MenuSelector`).style.color = "#ffffff"; 
    }
    
    
    if(apps.environment==="tablet")
    {}
        
 /*       
    if(apps.environment==="desktop")
    {
        menuNav.classList.remove("closedDisplay");  
        menuNav.classList.add("openDisplay"); 
        //menuNav.classList.add("menuHeightON");  
        
        
        document.getElementById("mainContainer").classList.remove("closedDisplay"); 
        document.getElementById("mainContainer").classList.add("openDisplay"); 
        
        document.getElementById("actionBoard").classList.remove("closedDisplay");
        document.getElementById("actionBoard").classList.add("openDisplay");
        
        document.getElementById("extraContainer").classList.remove("closedDisplay"); 
        document.getElementById("extraContainer").classList.add("openDisplay"); 
        
        
        document.getElementById(`${apps.environment}_MenuSelector`).style.color = "#ffffff"; 
    }
*/
}




/******************** Supporters ********************/   


function openFrontCover(openCoverPage)
{
        apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "openFrontCover",
            process:        "Menu Handler",
            qDescription:   "It manages the behaviour of the coverBoard"
        }
    );
    
    let menuNav = document.getElementById("menuContainer");
    
    closeMenu();
    
    document.getElementById("actionBoard").classList.remove("openDisplay");            
    document.getElementById("actionBoard").classList.add("closedDisplay"); 

    if(aux_existence(openCoverPage))
    {
        document.getElementById("coverBoard").classList.remove("closedDisplay");
        document.getElementById("coverBoard").classList.add("openDisplay"); 
    }
    else
    {
        document.getElementById("coverBoard").classList.remove("openDisplay");  
        document.getElementById("coverBoard").classList.remove("elementDisplay");          
        document.getElementById("coverBoard").classList.add("closedDisplay");
    }

    document.getElementById("extraContainer").classList.remove("closedDisplay");
    document.getElementById("extraContainer").classList.add("openDisplay");    
}


function csshandler_motivatorManager()
{
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "csshandler_motivatorManager",
            process:        "Foot Behaviour",
            qDescription:   "It manages/handles the behaviour of the footer motivator"
        }
    );
    
    let footHeight;

    document.getElementById("Motivator").innerHTML = cover.Motivation();
    footHeight = (Number(document.getElementById("footContainer").scrollHeight));
    let ifheight  = (Number(document.getElementById("Motivator").scrollHeight));
    
    document.querySelector(':root').style.setProperty("--footHeight", (Number(footHeight)+Number(60))+"px");
    document.querySelector(':root').style.setProperty("--ifootHeight", (Number(ifheight)+Number(15))+"px");
}



function csshandler_environmentManager()
{  
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "csshandler_environmentManager",
            process:        "???",
            qDescription:   "It handles the environment setting"
        }
    );
     
    return getComputedStyle(document.documentElement).getPropertyValue('--environment'); 
}



function csshandler_frontcontainersManager()
{
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "csshandler_frontcontainersManager",
            process:        "???",
            qDescription:   "It handles the mainContainer and footer heights"
        }
    );
    
    let mheight = document.getElementById("menuContainer").scrollHeight;
    let fh      = getComputedStyle(document.documentElement).getPropertyValue('--footHeight');
    
    document.querySelector(':root').style.setProperty("--menuHeight", (Number(60) + Number(mheight)) +"px");
    document.getElementById("mainContainer").style.setProperty("margin-bottom", fh);  
}





function insertFrameBlockBody(index, value)
{
        apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "insertFrameBlockBody",
            process:        "???",
            qDescription:   "???"
        }
    );
    
        returner =  "<div id=\"" + index + "\"  class=\"editFrameBlockBody\" >" + 
                        value + 
                    "</div>";     
}


function manageHeadSupport(itemID)
{
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "insertFrameBlockBody",
            process:        "Head Behaviour",
            qDescription:   "It manages/handles the behaviour of the header"
        }
    );    
    
    let footElementID = document.getElementById("foot_" + itemID);
    if(footElementID.getAttribute("class").includes("closedDisplay"))
    {   
        document.getElementById("headsupport_" + itemID).style.display="none"; 
        document.getElementById("headtail_" + itemID).style.display="none"; 
    }
    else
    {   
        document.getElementById("headsupport_" + itemID).style.display="block"; 
        document.getElementById("headtail_" + itemID).style.display="block";
    }
}
     
            
/*
The function beloow has to be moved to frame.js
*/
function pageInitializer(filtered)
{
        apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "pageInitializer",
            process:        "Menu Behaviour",
            qDescription:   "It manages/handles the very inital flow of the menu"
        }
    );  
    
    document.getElementById("menuControl").value = "fromMenu_report,fromMenu_newAction"; 
                              
    document.getElementById("actionBoard").innerHTML = "<div id=\"fromMenu_report\" style=\"display:none;\" data-menu-source=\"Menu_report\">" +
                                                            "<div id=\"reportboard_FromMenu_report\"  class=\"eActionBoardFromMenu\"></div>" +
                                                        "</div>" +
                                                        "<div id=\"fromMenu_newAction\" style=\"display:none;\" class=\"fromMenu\" data-block-index=\"3\" data-menu-source=\"Menu_newAction\">" +
                                                            "<div id=\"actionboard_FromMenu_newAction\" class=\"eActionBoardFromMenu\" data-block-index=\"4\"></div>" +
                                                        "</div>";
}




/******************** actionHandlers ********************/

function populate_eHandlers()
{
        apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "populate_eHandlers",
            process:        "???",
            qDescription:   "???"
        }
    );  
    
    headSelector = document.querySelectorAll("select[data-section='head']");
    headSelector.forEach((hs)=>{   hs.addEventListener("input", ()=>{}, true);    });
}




function handleSelector(propertyID)
{ 
    
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "handleSelector",
            process:        "???",
            qDescription:   "??? some kind of property handler ???"
        }
    );  
    
        
    let index = "", frameAlphaElement="";
    let thisHeadSelected    = document.getElementById(propertyID);
    let property            = thisHeadSelected.getAttribute("data-action-property");
    let id                  = thisHeadSelected.getAttribute("data-actionid");
    let arrGetter
    
    
    function exceptionHandler(p, pid, id)
    {
        function categoryException()
        {
            let doc = document.getElementById(`dimension_${p}`);
            
            arrGetter = ["Indicators"];
            document.getElementById(`propertyBodyFrame_${p}_${id}`).innerHTML = "";
            
            if(aux_existence(doc))
            {
                let valueDoc = document.getElementById(pid);
                let valueSel = valueDoc.options[valueDoc.selectedIndex];
                let valueInd = valueDoc.value;
                let indexArr = valueInd.split("_");
                let index1, index2, value1, value4, valueArr=[];
                
                
                if(valueInd.includes("_")){   [index1, index2] = valueInd.split("_"); }
                let strValue = doc.value;


                indexArr.forEach((e, i) => 
                {
                    const parts = strValue.split(`*|3f${i}y|*`); strValue = parts[e];
                    const value = strValue.split(`*|3f`)[0];     
                    frmEdit.eAction.eBody.eProperty.eFrameBlock(p, id, "", "", false, false, "", ["1",value.trim()]);  
                });

                document.getElementById(pid).selectedIndex  = 0;
                
                return true;
            } 
        }
        
        function linksException()
        {
            let doc = document.getElementById(`dimension_${p}`);
            //document.getElementById(`propertyBodyFrame_${p}_${id}`).innerHTML = "";
            
            if(aux_existence(doc))
            {
                let valueDoc = document.getElementById(pid);
                let action = valueDoc.options[valueDoc.selectedIndex];
                
                frmEdit.eAction.eBody.eProperty.eFrameBlock(p, id, "", "", false, false, "", ["4", "", "", action.textContent, action.value, ""]);  


                document.getElementById(pid).selectedIndex  = 0;
                
                return true;
            }             
            
        }
        
        let returner = false;
        switch(p)
        {
            case "Category":
                returner = categoryException();
                break;
            case "Links":
                returner = linksException();
                break;
        }
        
        return returner;
    }
    
    if(!exceptionHandler(property, propertyID, id))
    {
        frameAlphaElement   = (function(arr)
                            {
                                let returner;
                                arr.forEach((row)=>{   if(row.moveupdown){returner = row.label; }});
                                return returner;
                            })(eval(property).frame.returner().eframe); 
                            
        loadPropertyDataNameFromStore("PerformanceStore", arrGetter, nameToSearch, placerID)
    }
}


function fbAddFromSelector(id, pid, data, property)
{   
        apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "fbAddFromSelector",
            process:        "???",
            qDescription:   "??? some kind very old settings incompactable with new versions ???"
        }
    ); 
    
    let d = document.getElementById(`edit_${property}_${pid}_head_2`);
    let dText = d.options[d.selectedIndex].text;
    
    if(aux_existence(data))
    {
        let frameAlphaElementcnt   = (function(arr)
                        {
                            let returner;
                            arr.forEach((row, index)=>{   if(row.moveupdown){returner = (index+1); }});
                            return returner;
                        })(eval(property).frame.returner().eframe);
                            
        let pData = data[property].split("*|3f3x|*");
        let rData="";
        for(e of pData)
        {   
            let ee = e.split("*|3f4x|*");
            if(ee[frameAlphaElementcnt]===dText){rData = ee;}    
        }
        
        frmEdit.eAction.eBody.eProperty.eFrameBlock(property, pid, "", "",false, false, "", rData); 
    }
    
    document.getElementById(`edit_${property}_${pid}_head_2`).selectedIndex = 0;
}


function fbDataFromSelector(p, pid, data, property)
{   
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "fbDataFromSelector",
            process:        "???",
            qDescription:   "??? some kind of property head handler ???"
        }
    );  
    
    let lastData;
    
    let dataObj;
    let d = document.getElementById(`edit_${property}_${pid}_head_2`);
    let dText = d.options[d.selectedIndex].text;
    
    if(aux_existence(data))
    {
        if(aux_existence(data.subLevel))
        {
            for(let e of data.subLevel)
            {
                if(e.title===dText)
                {   
                    lastData = e.special.ID_currentLevel;
                    break; 
                }
            }
        }
    }
    
    loadDataFromStore("Actions", lastData[0], "", fbAddFromSelector, pid, property);
}





function eHandlerMouseDown(a)
{
       apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "eHandlerMouseDown",
            process:        "Property Handler",
            qDescription:   "It was/is supposed to handle the property Up and Down"
        }
    );  
/*
    //document.getElementById(a).style.borderStyle = "inset";
    a.style.borderStyle = "inset";
    a.style.fontSize="1rem";
    //a.style.bordeWidth= "thick";
    setTimeout(function()
    {
        //a.style.borderStyle="solid"; 
        a.style.removeProperty("border-style"); 
        //a.style.removeProperty("border-width"); 
        a.style.fontSize="1.3rem"; 
        
    },500);
*/    
}





function actionHandler(actionID)
{
    
       apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "actionHandler",
            process:        "Action Handler",
            qDescription:   "I???"
        }
    ); 

    let NoDoc="", NoExtraID="";
    if(actionID.includes("_"))
    {   
        NoExtraID = actionID;
        actionID = actionID.split("_").pop();
    }
    
    if(aux_existence(apps.actions))
    {   
        if(NoExtraID===""){NoExtraID=actionID;}
        apps.actions.forEach(a=>
        {
            if(a["id"]===actionID)
            {   
                
                
                const clonedObject = Object.assign({}, a);
    
                clonedObject.id = NoExtraID;
                
                frmDisplay.Action.displayActionHandler(NoExtraID, "", clonedObject);  
                
            }           
        }); 
    }
    else
    {   loadDataFromStore("Actions", parseInt(actionID), NoDoc, frmDisplay.Action.displayActionHandler, NoExtraID); }
}


function actionEditorHandler(actionID)
{
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "actionEditorHandler",
            process:        "Action Handler",
            qDescription:   "It handlers the display open/close action through the head"
        }
    ); 
    
    let headEditor = document.getElementById("headToolTip_" + actionID); 
    
    if(headEditor.classList.value.includes("openDisplay"))
    {   
        headEditor.classList.remove("openDisplay");
        headEditor.classList.add("closedDisplay");
        
        headEditor.style.setProperty("visibility", "hidden"); 
    }
    else
    {
        headEditor.classList.add("openDisplay");
        headEditor.classList.remove("closedDisplay");
        
       headEditor.style.setProperty("visibility", "visible");         
    }
}


function csshandler_actionheadRetracted(head, body, foot)
{
       apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "csshandler_actionheadRetracted",
            process:        "Action Handler",
            qDescription:   "It retracts the action"
        }
    ); 
    
    
    head.style.whiteSpace = "nowrap";
    head.style.width="100%";
    body.style.maxHeight = null; 
    body.classList.add("closedDisplay");
    
    
}

function csshandler_actionheadExpanded(head, body, foot)
{   
           apps.funcLogger.set(
        Date.now(),
        {
            file:           "pageConfig.js",
            name:           "csshandler_actionheadRetracted",
            process:        "Action Handler",
            qDescription:   "It applies extra settings to the head"
        }
    );
    
    head.style.whiteSpace = "unset"; 
    
}


/******************** Footer ********************/


function expandFooter() 
{
    openFrontCover(false);

    document.getElementById("mainContainer").classList.add("closedDisplay");
    document.getElementById("mainContainer").classList.remove("openDisplay");

    document.getElementById("footBoard").classList.add("openDisplay");
    document.getElementById("footBoard").classList.remove("closedDisplay");

    document.getElementById("extraContainer").classList.add("closedDisplay");
    document.getElementById("extraContainer").classList.remove("openDisplay");

    document.getElementById(`${apps.environment}_MenuSelector`).classList.add("closedDisplay");
    document.getElementById(`${apps.environment}_MenuSelector`).classList.remove("openDisplay");

    const pageHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pageHeight'));
    const pageHeader = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pageHeader'));
    const footBoard = document.getElementById("footBoard");
    const footContainer = document.getElementById("footContainer");

    // Set minimum expanded height
    let minHeight = pageHeight - pageHeader;
    let boardHeight = footBoard.scrollHeight;

    // Set footContainer height dynamically
    footContainer.style.height = Math.max(minHeight, boardHeight) + "px";

    footContainer.classList.remove("pageFooterRetracted");
    footContainer.classList.add("pageFooterExpanded");
    
    const observer = new MutationObserver(() => 
    {
        const boardHeight = document.getElementById("footBoard").scrollHeight;
        const pageHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pageHeight'));
        const pageHeader = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pageHeader'));
        const footContainer = document.getElementById("footContainer");
        let minHeight = pageHeight - pageHeader;
    
        footContainer.style.height = Math.max(minHeight, boardHeight) + "px";
    });
    observer.observe(document.getElementById("footBoard"), { childList: true, subtree: true });


    document.getElementById("Motivator").style.color="#ffffff";
    document.getElementById("Motivator").style.fontSize="11px";
}

function retractFooter() 
{
    const footContainer = document.getElementById("footContainer");

    document.getElementById("footBoard").classList.remove("openDisplay");
    document.getElementById("footBoard").classList.add("closedDisplay");

    footContainer.classList.remove("pageFooterExpanded");
    footContainer.classList.add("pageFooterRetracted");

    // Reset height to compact
    footContainer.style.height = getComputedStyle(document.documentElement).getPropertyValue('--ifootHeight');

    document.getElementById(`${apps.environment}_MenuSelector`).classList.remove("closedDisplay");
    document.getElementById(`${apps.environment}_MenuSelector`).classList.add("openDisplay");
    
        document.getElementById("Motivator").style.color="#8e9eaf";
        document.getElementById("Motivator").style.fontSize="15px";
}



function footHandler()
{   
    if(document.getElementById("footBoard").classList.value.includes("openDisplay"))
    {   retractFooter();    }
    else
    {   expandFooter();     }
}



function actionFooterGrahpHandler(actionID, status)
{

    let p = document.getElementById("performanceDetail_" + actionID); 
    if(p.classList.value.includes("openDisplay"))
    {   
        p.classList.remove("openDisplay");
        p.classList.add("closedDisplay");
        
        
        //document.getElementById("footGraph_" + actionID).classList.remove("closedDisplay");
        //document.getElementById("foot_" + actionID).style.height = (parseInt(status)!==1)? "65px": "80px";
        document.getElementById("foot_" + actionID).style.height = "80px";
    }
    else
    {
        p.classList.add("openDisplay");
        p.classList.remove("closedDisplay"); 
        
        //document.getElementById("footGraph_" + actionID).classList.add("closedDisplay");
        document.getElementById("foot_" + actionID).style.height = "245px";
    }
}



function updateFooterHeight(a)
{   
    if(a)
    {
        a = false;
        setTimeout(function()
        {
            a=true;
            document.getElementById("footContainer")
                    .style.setProperty("--footHeight", Number(document.getElementById("footDisplayON")
                                                                      .scrollHeight + 
                                                              document.getElementById("Motivator")
                                                                      .scrollHeight) + "px"); 
                                                                     
            getMenuSelector();     
        }, 500);
    }
}





/******************** Modal ********************/


function sendToModal(elementID, elementHead, elementFoot)
{
    openModal(
                elementID,
                elementHead,
                elementFoot
            ); 
}


function openModal(thisObj, header, footer, qrcode) 
{
    const content = thisObj.split("-")[1];
    const idClicked = document.getElementById(thisObj);

    const datahead = document.getElementById("head_modal3f_Content2");
    const databody = document.getElementById("body_modal3f_Content2");
    const datafoot = document.getElementById("foot_modal3f_Content2");

    document.getElementById("modal3f_box").style.display = "block";

    // Header
    if (aux_existence(header)) 
    {
        datahead.innerText = header;
        document.getElementById("headModal3f").classList.add("head_modal3f");
    }

    // Clear previous QR code
    databody.innerHTML = "";

    // QR Code or image/text
    if (!aux_existence(qrcode)) 
    {
        if (parseInt(content) !== 1) 
        {
            document.getElementById("body_modal3f_Content1").src = idClicked.src;
        } 
        else 
        {
            databody.innerHTML = idClicked.innerHTML;
        }
        
            // Footer
        if (aux_existence(footer)) 
        {
            document.getElementById("footModal3f").classList.add("foot_modal3f");
            document.getElementById("foot_modal3f_Content1").innerText = "Description";
            footer = footer.replaceAll("(TextBreaker)", "\n");
            datafoot.innerText = footer;
        }
    
    } 
    else 
    {
        // Create new QR code in body
        new QRCode(databody, 
        {
            text: qrcode,
            width: 300,
            height: 300,
            correctLevel: QRCode.CorrectLevel.H
        });
        datafoot.innerHTML = footer;
    }


    
    
    
    document.getElementById("bodyModalLinker").href = qrcode;
    document.querySelector(':root').style.setProperty('--badgePosition', 'unset');
}



function closeModal()
{
    document.getElementById("modal3f_box").style.display = "none";
    document.getElementById("head_modal3f_Content2").innerText = "";
    document.getElementById("body_modal3f_Content2").innerHTML = "";
    document.getElementById("body_modal3f_Content1").src = "";
    document.getElementById("foot_modal3f_Content1").innerText = "";
    document.getElementById("foot_modal3f_Content2").innerText = "";
    
    
    document.getElementById("headModal3f").classList.remove("head_modal3f");
    document.getElementById("footModal3f").classList.remove("foot_modal3f");
    
    let r = document.querySelector(':root');
    r.style.setProperty('--badgePosition', 'absolute');
}





/******************** User Configuration Board ********************/


function setConfigurationBoard()
{
    function set_ai_models()
    {
        const wrapper = document.createElement("div");
              wrapper.classList.add("uConfiguration");
              
        const div1 = document.createElement("div");
              div1.classList.add("ucbRow");
        const element10 = document.createElement("label");
              element10.classList.add("ucbElementLabel");
              element10.textContent = "AI Supplier: ";
        const element11 = document.createElement("select");
              element11.dataset.contentAbout = "ai";
              element11.dataset.contentField = "supplier";
              element11.innerHTML = `<option>select</option>
                                    <option value='gemini'>Gemini</option>
                                    <option value='grok'>Grok</option>
                                    <option value='openai'>chatGPT (OpenAI)</option>`;
        div1.appendChild(element10);
        div1.appendChild(element11);        
                
                
        const div2 = document.createElement("div");
              div2.classList.add("ucbRow");                    
        const element20 = document.createElement("label");
              element20.classList.add("ucbElementLabel");
              element20.textContent = "Models: ";
        const element21 = document.createElement("input");
              element21.dataset.contentAbout = "ai";
              element21.dataset.contentField = "model";
              element21.type = "text";
        div2.appendChild(element20);
        div2.appendChild(element21);                
             
              
        const div3 = document.createElement("div");
              div3.classList.add("ucbRow");                 
        const element30 = document.createElement("label");
              element30.classList.add("ucbElementLabel");
              element30.textContent = "Key: ";                            
        const element31 = document.createElement("input");
              element31.dataset.contentAbout = "ai";
              element31.dataset.contentField = "key";
              element31.type = "text";
        div3.appendChild(element30);
        div3.appendChild(element31);          
        
        const instElement = document.createElement("details");
        const instSummary = document.createElement("summary");
              instSummary.textContent = "Instructions:";
        const instBody = document.createElement("div");
              instBody.innerHTML ="<div> Important Notes: " +
                                 " <div>- Information entered here is suppose to be confidential, it will encoded and stored safely.</div>" +
                               "<div>- Each user has only access to AI capabilities 3 times daily, unless he/she setups and uses its own AI api key.</div>" +
                                "   <div>- Each AI supplier company will provide you a unique key. In order to obtain an api key go to:</div>" +
                                 "  <div>-- gemini: 'Google AI Studio: https://aistudio.google.com' (there is a free version)</div>" +
                                  "<div>-- chatGPT: 'https://platform.openai.com'</div>" +
                                 " <div>-- Grok: 'https://console.x.ai'</div>" +
                                 " <div>- You be able to use AI services under consumer subscription, for api key it requires another parallel subscription, which can provide the same basic service and each one adding some different extra features.</div></div>";
                                        
        instElement.appendChild(instSummary);
        instElement.appendChild(instBody);
        
        
              
              
        const btn = document.createElement("button");
              btn.dataset.contentAbout = "ai";
              btn.classList.add("ucbElementButton");
              btn.textContent = "Update Models";
              btn.addEventListener("click", (e)=>
              {
                  let w = wrapper;
                  let w1 = document.querySelectorAll("[data-content-about='ai']")
                                    const o = {supplier:"", model:[], key:""};
                  
                 document.querySelectorAll("[data-content-about='ai']").forEach((element)=>
            {
                      if((element.value!=="")&&(element.value!==undefined))
                      { 
                          if(element.dataset.contentField!=="model")
                          {
                          
                          o[element.dataset.contentField] = element.value; 
                          }
                          else
                          {
                              o[element.dataset.contentField].push(element.value);
                          }
                          
                          }
                  });
                  
                  wr_update_ai_manager(o);
                  loadPage();
              });

        
        wrapper.appendChild(div1);
        wrapper.appendChild(div2);
        wrapper.appendChild(div3);
        
        wrapper.appendChild(instElement);
        
        wrapper.appendChild(btn);
        
        document.getElementById("ucb_ai_models").appendChild(wrapper);
    }
    
    //set_ai_models();
}

