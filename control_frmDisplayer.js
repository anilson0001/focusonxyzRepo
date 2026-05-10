const frmDisplay = 
{
    pageInitializer: function(filtered)
    {
        //alert("confirmed")
        document.getElementById("menuControl").value = "fromMenu_report,fromMenu_newAction"; 


        document.getElementById("actionBoard").innerHTML = "<div id=\"fromMenu_report\" style=\"display:none;\" data-menu-source=\"Menu_report\">" +
                                                                "<div id=\"reportboard_FromMenu_report\"  class=\"eActionBoardFromMenu\"></div>" +
                                                            "</div>" +
                                                            "<div id=\"fromMenu_newAction\" style=\"display:none;\" class=\"fromMenu\" data-block-index=\"3\" data-menu-source=\"Menu_newAction\"  >" +
                                                                "<div id=\"actionboard_FromMenu_newAction\" class=\"eActionBoardFromMenu\" data-block-index=\"4\" ></div>" +
                                                            "</div>";
    },    
    
    
    storedContentLoader: function(returnArr)
    {
        const [thisBody, thisMenu] = returnArr; 

        document.getElementById("menuContainer").innerHTML  =  thisMenu + "<input type=\"hidden\" id=\"openMenu\" value=\"\">";
        document.getElementById("actionBoard").innerHTML   +=  thisBody;
    },
    
    
    menuLoader: function(dataFiltered)
    {
        document.getElementById("menuContainer").innerHTML = frmEdit.eMenu(`<span class='menuPositionTitle' id='menuPositionTitle_report' data-element-family='menuButton' ><span id='menuArrow_report' name='group_report' data-element-family='menuButton' >\u25b6</span>${(apps.environment!=="mobile")? "<span class='menuFolder' id='menuFolder_report' data-element-family='menuButton' >&#128448;</span>": ""}<span class='menuTitle' id='menuTitle_report' data-element-family="menuButton" >Report</span></span>`, "report", dataFiltered) + 
                                                             frmEdit.eMenu(`<span class='menuPositionTitle' id='menuPositionTitle_newAction' data-element-family='menuButton' ><span id='menuArrow_newAction' name='group_newAction' data-element-family='menuButton'>\u25b6</span>${(apps.environment!=="mobile")? "<span class='menuFolder' id='menuFolder_newAction' data-element-family='menuButton'>&#128448;</span>": ""}<span class='menuTitle' id='menuTitle_newAction' data-element-family='menuButton'>New Action</span></span>`, "newAction", dataFiltered) + 
                                                                document.getElementById("menuContainer").innerHTML;   
    },
    
    
    environmentLoader: function()
    {
        apps.funcLogger.set(
            Date.now(),
            {
                file:           "frmDisplayer.js",
                name:           "frmDisplay.environmentLoader",
                qDescription:   "It notifies that menu needs to be reloaded"
            }
        );
        
        if(aux_existence(document.getElementById(`${apps.environment}_loadRequest`)))
        {   
            document.getElementById(`${apps.environment}_loadRequest`).classList.remove("openDisplay");                                
            document.getElementById(`${apps.environment}_loadRequest`).classList.add("closedDisplay");
        }
    },
    


    /*
frame.Display.Menu


        Update: Nov 16, 2021
        Up Feb 03, 2022 (AC): 
            Update Comments

        called from: 
            function load_display_Menu(){ populateMenuBody(){dataRequest.onsuccess = else frame.Display.Menu(Menu.data, filter); }}}}

        Description:
            - gets a list of id array using customize (boolean value)
            - for every element of the data arr, format into formatMaster(){}, and return another array "bodyArray" with 3 elements["full menu format", "full body format", "a boolean value (true: the end level has been reached)"]
            - update document.id("pageMenu") = bodyArray[1]
            - update document.id("pageBody") = bodyArray[0]                

*/
    Menu: function(data, menuData, customizeArr, fs)
    {         
        apps.funcLogger.set(
            Date.now(),
            {
                file:           "frmDisplayer.js",
                name:           "frmDisplay.Menu",
                qDescription:   "It structures the menu container and all features in it"
            }
        );
        
        var bodyArray = ["","",false], processedIDs=[];
        let actionCounter = [[0,""],[0,""],[0,""],[0,""],[0,""],[0,""]];
        let list, menuIndexer = 2;
        let pHigh="", pMedium="", pLow="", menuPositioner = "";
        
        const menuControl_DOM = document.getElementById("menuControl");
        const {open:activeArr, close:closedArr, deleted:deleteArr, Red:redArr, Violet:vioArr, Yellow:yelArr, Green:greArr, White:whiArr, idList, summaryPriority:priority} = menuData;
        const masterReferenceArr = aux_existence(customizeArr)? 
                                                customizeArr.map(Number) : 
                                                document.getElementById("IDSelection_all").value.split(",").map(Number);
        

    
        /*
        Last Update: Nov 13, 2021
        Last Update by: Anilson Cardoso
        called from: this(){}
        Description:  It gets an array and check if there is any empty values, if so, remove it/all empty values and shrink the array
        */        
        function removeEmptySpace(Arr)
        {
            let arr1 = Arr.indexOf("");
            let removalConfirmed = false;

            if(arr1!==-1){  Arr.splice(arr1,1);    removalConfirmed=true;}
            if(removalConfirmed){   removeEmptySpace(Arr);}

            return Arr;
        };
    
    
    
        /*
        Last Update: Nov 13, 2021
        Last Update by: Anilson Cardoso
        called from: this(){}
        Description:
            It gets an array (from object.special.rowData) as argument and compares (if any of the values in one matches the values of the other one) with another array (from input.id=preferences_Data/_All)
            It returns true if any match exists or false if no value matches
        */
        function checkEmptyMenu(mArr)
        {
            let singleMatch=false;
            if(aux_existence(masterReferenceArr))
            {
                if(aux_existence(mArr))
                {
                    for(let L=mArr.length, s=0; s<L; s++)
                    {if(masterReferenceArr.indexOf(parseInt(mArr[s]))!==-1){singleMatch=true; break;}}
                }
            }
            else
            {   singleMatch = true; }
            
            return singleMatch;
        }
        
    
    
     	function formatMenu(theData1, badgeCounter, i, order, menu, group, display, indexgroup, priority)     
        {  
            let placer = " "; 
            let redPlacer="", vioPlacer="", yelPlacer="", grePlacer="", whiPlacer="";
            let rDisplacement = 4;   
            let msColor = "mbDefault_mode";
      
            const menuSet   = new Set(menu.ids.Global);
            const phigh     = priority.High.intersection(menuSet);
            const pmedium   = priority.Medium.intersection(menuSet);
            const plow      = priority.Low.intersection(menuSet);
            
            let priorityCounter = (function(h, m, l)
                                    {
                                        let ph = '',pm = '',pl = '';
                                        let pf = false
                                        
                                        if(h.size!==0){ph=`${h.size}H`; pf=true;}
                                        if(m.size!==0){pm=`${m.size}M`; pf=true;}
                                        if(l.size!==0){pl=`${l.size}L`; pf=true;}
                                        
                                        return (pf)? `<span class="priorityCounter" id="priorityCounter_${i}">${ph}${pm}${pl}</span>`: "";
                                        
                                    })(phigh, pmedium, plow);
            
      
            if(aux_existence(fs))
            {   msColor = "mbReport_mode";  }
            
            
            for(let a=0;a<order;a++)
            {  placer += `<span class="menuPositioner" id="menuPositioner_${i}_${(a+1)}"></span>`;}


            if(aux_existence(badgeCounter[4][0])&&(parseInt(badgeCounter[4][0])>0)){whiPlacer = `<span class="w3-badge badge_position badge_over_1" style="color: #204060; background: white; right: ${rDisplacement}px"><span class="badge_text_size">${aux_twoDigits(badgeCounter[4][0])}</span></span>`; rDisplacement += 20; }                    
            if(aux_existence(badgeCounter[3][0])&&(parseInt(badgeCounter[3][0])>0)){grePlacer = `<span class="w3-badge badge_position badge_over_2" style="color: #204060; background: green; right: ${rDisplacement}px"><span class="badge_text_size">${aux_twoDigits(badgeCounter[3][0])}</span></span>`;  rDisplacement += 20; }
            if(aux_existence(badgeCounter[2][0])&&(parseInt(badgeCounter[2][0])>0)){yelPlacer = `<span class="w3-badge badge_position badge_over_3" style="color: #204060; background: yellow; right: ${rDisplacement}px"><span class="badge_text_size">${aux_twoDigits(badgeCounter[2][0])}</span></span>`;  rDisplacement += 20; }                    
            if(aux_existence(badgeCounter[1][0])&&(parseInt(badgeCounter[1][0])>0)){vioPlacer = `<span class="w3-badge badge_position badge_over_4" style="color: #204060; background: #8f1f83; right: ${rDisplacement}px"><span class="badge_text_size">${aux_twoDigits(badgeCounter[1][0])}</span></span>`;  rDisplacement += 20; }                    
            if(aux_existence(badgeCounter[0][0])&&(parseInt(badgeCounter[0][0])>0)){redPlacer = `<span class="w3-badge badge_position badge_over_5" style="color: #204060; background: red; right: ${rDisplacement}px"><span class="badge_text_size">${aux_twoDigits(badgeCounter[0][0])}</span></span>`;  rDisplacement += 20; }                    
            
            
            if((parseInt(badgeCounter[0][0])!==0)||(parseInt(badgeCounter[1][0])!==0)||(parseInt(badgeCounter[2][0])!==0)||(parseInt(badgeCounter[3][0])!==0)||(parseInt(badgeCounter[4][0])!==0)||(parseInt(badgeCounter[5][0])!==0))
            {
                let title = aux_textSignIn((aux_existence(menu.title))? menu.title: i)
/*
                return  `<div class="menuButton ${msColor}" name="${group}" id="Menu_${i}" data-menu-indexer="${i}" data-menu-depth='${order}' data-menu-group="${indexgroup}" data-menu-status="close" data-previews-menu-id="${group}" style="display:${display};" onclick="load_display_Body('Menu_${i}', '${group}')">
                            <span class="menuPositionTitle" id="menuPositionTitle_${i}">
                                ${placer}
                                <span class="menuArrow" id="menuArrow_${i}">\u25b6</span>
                                <span class="menuFolder" id="menuFolder_${i}">&#128448;</span>
                                <span class="menuTitle" id="menuTitle_${i}" title="${title}">${title}</span>
                            </span>
                            
                            <span class="menuActionNotification">
                          
                                ${redPlacer}  
                                ${vioPlacer} 
                                ${yelPlacer} 
                                ${grePlacer} 
                                ${whiPlacer} 
                            </span>  ${priorityCounter}
                            </div>${theData1}</div>
                        </div>`; 

                return  `<div class="menuButton ${msColor}" name="${group}" id="Menu_${i}" data-menu-indexer="${i}" data-menu-depth='${order}' data-menu-group="${indexgroup}" data-menu-status="close" data-previews-menu-id="${group}" style="display:${display};" onclick="load_display_Body('Menu_${i}', '${group}')">
                            <span class="menuPositionTitle" id="menuPositionTitle_${i}">
                                ${placer}
                                <span class="menuArrow" id="menuArrow_${i}">\u25b6</span>
                                <span class="menuTitle" id="menuTitle_${i}" title="${title}">${title}</span>
                            </span>
                            
                            <span class="menuActionNotification">
                          
                                ${redPlacer}  
                                ${vioPlacer} 
                                ${yelPlacer} 
                                ${grePlacer} 
                                ${whiPlacer} 
                            </span>  ${priorityCounter}
                            </div>${theData1}</div>
                        </div>`; 
*/       
                return  `<div class="menuButton ${msColor}" name="${group}" id="Menu_${i}" data-menu-indexer="${i}" data-menu-depth='${order}' data-menu-group="${indexgroup}" data-menu-status="close" data-previews-menu-id="${group}" data-element-family="menuButton" style="display:${display};" onclick="load_display_Body('Menu_${i}', '${group}')">
                            <span class="menuPositionTitle" id="menuPositionTitle_${i}"  data-element-family="menuButton" >
                                ${placer}
                                <span class="menuArrow" id="menuArrow_${i}"  data-element-family="menuButton" >\u25b6</span>
                                ${(apps.environment!=="mobile")? '<span class="menuFolder" id="menuFolder_${i}">&#128448;</span>': ''}
                                <span class="menuTitle" id="menuTitle_${i}" title="${title}"  data-element-family="menuButton" >${title}</span>
                            </span>
                            
                            <span class="menuActionNotification">
                          
                                ${redPlacer}  
                                ${vioPlacer} 
                                ${yelPlacer} 
                                ${grePlacer} 
                                ${whiPlacer} 
                            </span>  ${priorityCounter}
                            </div>${theData1}</div>
                        </div>`; 
                        
            }
            else
            {   return  `</div>${theData1}</div>`; }
        }
    
    
    
        function formatBody(theData, i, matchValue, order)
        {
            return `<div id="fromMenu_${i}" style="display: none;" class="fromMenu" data-block-index="3" data-menu-source='Menu_${i}'>
                        <input type="hidden" id="listMenu_${i}" value="${matchValue}">
                        <input type="hidden" id="orderMenu_${i}" value="${order}">
                        <div id="actionboard_FromMenu_${i}" class="eActionBoardFromMenu" data-block-index="4" ></div>
                    </div>${theData}`;
        }  



        function formatMaster(dataArr, data3, indexer, group, indexgroup, display, order, priority)
        {
            let cnt = 0;
            let match = [];

            //actionCounter = [[0,""],[0,""],[0,""],[0,""],[0,""],[0,""]];
           
            if(aux_existence(data3))
            {
                let menuExistence=false;               
         
                
                if(aux_existence(data3.ids))
                {
                    if(checkEmptyMenu(data3.ids.Global))
                    {
                        for(let x0=0, x1=data3.children, x2=(aux_existence(x1))? x1.length: 0; x0<x2; x0++)
                        {   dataArr = formatMaster(dataArr, data3.children[x0], indexer + "_3_" + x0, "Menu_" + indexer, indexgroup, "none", (order+1), priority);     }
                        
                        actionCounter = [[0,""],[0,""],[0,""],[0,""],[0,""],[0,""]];
                        
                        for(let ID of data3.ids.Local)
                        {
                            if(masterReferenceArr.includes(parseInt(ID)))
                            {
                                    match.push(parseInt(ID));
                                    dataArr[2]=true;      
                                    menuExistence=true;
                            }
                        }
    
    
                        for(let ID of data3.ids.Global)        
                        {   //rowData is choosen because it represents all the values saved in the current level as well all the values in the lower levels
                            //while ID_currentLevel has only values for the current level and nothing from lower levels
                            
                            if(masterReferenceArr.includes(parseInt(ID)))
                            {
                                menuExistence = true;
                                if((aux_existence(activeArr))&&(activeArr.includes(parseInt(ID))))                                     
                                {
                                    if((aux_existence(redArr))&&(redArr.includes(ID))){  actionCounter[0][0]++;  }     //red
                                    if((aux_existence(vioArr))&&(vioArr.includes(ID))){  actionCounter[1][0]++;  }     //violetlike
                                    if((aux_existence(yelArr))&&(yelArr.includes(ID))){  actionCounter[2][0]++;  }     //yellow
                                    if((aux_existence(greArr))&&(greArr.includes(ID))){  actionCounter[3][0]++;  }     //green   
                                    if((aux_existence(whiArr))&&(whiArr.includes(ID))){  actionCounter[4][0]++;  }     //white 
                                }
                                
                                
                                if((aux_existence(closedArr))&&(closedArr.includes(parseInt(ID)))){   actionCounter[5][0]++; }      //Closed: black
                            }
                        }
                    }
                }
                

            
                if(dataArr[2])
                {
                    if(menuPositioner!=="")
                    {   menuPositioner = menuPositioner + ",fromMenu_" + indexer;   }
                    else
                    {   menuPositioner = "fromMenu_" + indexer; }
                }
                    
                    
                if(aux_existence(menuExistence))
                {
                    dataArr[0] = formatBody(dataArr[0], indexer, match, order);     
                    dataArr[1] = formatMenu(dataArr[1], actionCounter, indexer,  order, data3, group, display, indexgroup, priority);                           
                    dataArr[2] = dataArr[2];                    
                }
            }
            
            
            return dataArr;
        }
        
      
        
        if(aux_existence(data))
        {
	        for(store of data)
    	    {
    	        bodyArray = formatMaster(bodyArray, store, menuIndexer, "Menu", menuIndexer, "block", 0, priority);
                menuIndexer++;
                bodyArray[2]=false;
	        }
        }
        else
        {   bodyArray = formatMaster(bodyArray, masterReferenceArr, "NoMenuActions", "NoMenuActions", "noMenu", "block", 0, priority); }
        


        if(menuControl_DOM.value!=="")
        {  
            if(menuPositioner!=="")
            {    menuControl_DOM.value = menuControl_DOM.value + "," + menuPositioner; }
        }
        else
        {   menuControl_DOM.value = menuPositioner; }
        
        
        
        return bodyArray;
    },


/*  where is it called from???  */
    StructuralReport: function(Obj, parentObj, referenceObj)
    {
        let head = function(index, data)
        {
            let h = {
                        headDataset:    "data-report-type='head'",
                        headClass:      "reportHead",
                        head:           `<div id="Head_${index}" data-type="report" class="rheader">${data}</div>`,
                    };
                    
                    
            return h;
        };
        
        let body = function(index, data)
        {
            let b = {
                        bodyDataset:    "data-report-type='body'",
                        bodyClass:      "reportBody",
                        body:           `<div id="Body_${index}" data-type="report" class="rbody">${data}</div>`,
                    };
                    
            return b;
        };
        
        let foot = function(index, data)
        {
            let f = {
                        footDataset:    "data-report-type='foot'",
                        footClass:      "reportFoot",
                        foot:           `<div id="Foot_${index}" data-type="report" class="rfooter">${data}</div>`,
                    };
                    
            return f;                
        };
        

        Obj.head = head(Obj.Index, Obj.head); 
        Obj.body = body(Obj.Index, Obj.body); 
        Obj.foot = foot(Obj.Index, Obj.foot);
        
        
        return Obj;
    },
    
            

    objFrame: function(index, parent)
    {
        this.id       = index;
        this.parentid = parent;
        this.children = [];
        
        this.data;
        this.head;
        this.body;
        this.foot;
    },
    
    
    
    placeLinks: function(dataindexing, originalID, [dataObj], index, ta)
    {   
        const clonedObject = Object.assign({}, dataObj);
        const [property, ...rest] = index.split("_");
    
        //clonedObject.id = `Linked_${property}_${originalID}_${clonedObject.id}`;
        clonedObject.id = `${originalID}_${property}_LinkedAction_${clonedObject.id}`;
        frmDisplay.Action.Placer(clonedObject, "", `body_${index}`, ta);  
        //frmDisplay.Action.Placer(clonedObject, "", `body_${clonedObject.id}`, ta); 
    },


    
    /*
    Last Update: June 22, 2021
    Last Update by: Anilson Cardoso
    called from: loadStore.js>>load_display_Body(){}
    Description:

    */
    Action: 
    {
        /*
            Called From 
                - head clicked
                - pageConfig.js >> actionHandler(){ loadStore.js >> loadDataFromStore()}
        */
        displayActionHandler: function(actionID, someData, actionData)
        {
            let initiallized = document.getElementById(`head_${(aux_existence(someData))? someData: actionID}`);
            let collapse = initiallized.getAttribute("data-collapseblock");
            let arrData = [];   
            
            
            if(aux_existence(someData))
            { 
                actionID = someData;
                actionData.id = someData;
            }
            

            if(collapse!=="set")
            {
                initiallized.setAttribute("data-collapseblock","set");
                
                let headBottom  = document.getElementById("headbottom_" + actionID);
                let headGraph   = document.getElementById("headGraph_" + actionID); 
                
                if(document.getElementById("headsymbol_" + actionID).innerHTML === "\u25b7")
                {   document.getElementById("headsymbol_" + actionID).innerHTML = "\u25bd"; }
                else
                {   document.getElementById("headsymbol_" + actionID).innerHTML = "\u25bc"; }
            
                
                
                document.getElementById("body_" + actionID).innerHTML = frmDisplay.Action.bodyReturner(actionID, actionData);
                frmDisplay.Action.footReturner(actionID, actionData);
                
        
        
                document.getElementById("body_" + actionID).classList.toggle("closedDisplay");
                document.getElementById("body_" + actionID).classList.toggle("openDisplay");
                
                
                document.getElementById("foot_" + actionID).classList.toggle("closedDisplay");
                document.getElementById("foot_" + actionID).classList.toggle("openDisplay");
                
                
                document.getElementById("head_" + actionID).classList.remove("sideFrame");
                
                document.getElementById("headeditor_" + actionID).classList.remove("closedDisplay");
                document.getElementById("headeditor_" + actionID).classList.add("openDisplay");
                
                document.getElementById("headtop_" + actionID).classList.add("roundHead");   
                
                
                headBottom.style.display = "none";
                headGraph.style.display = "none";
            }
            else
            {   
                aux_collapseBox(actionID);  
                
                if(document.getElementById(actionID).getAttribute("data-display-mode")!=="edit")
                {
                    document.getElementById("headeditor_" + actionID).classList.toggle("closedDisplay");
                    document.getElementById("headeditor_" + actionID).classList.toggle("openDisplay");   
                }
                
                document.getElementById("headtop_" + actionID).classList.toggle("roundHead");   
            }
        },
        
        headReturner: function(actionID, actionData, acolor, update, topRef)
        {
            let indexer = actionID, aData = actionData;
            let outteruser = (aux_existence(actionData["SourceRef"]))? (actionData["SourceRef"]!==sessionStorage.username)? `@${actionData["SourceRef"]}`: "": "";
            
            let reportData, status=aData.Status, title=aData.Title, datetime=aData.DateTime;
            let classData   = [[`${(topRef)? 'actionHead2': 'actionHead1'} topheaderSpacer`,(parseInt(status)===1)? "closedActionArrow":"","noclass", acolor],["headerSupport headerColored","noclass", "moveToTail cssColor_" + acolor.cName]];
            let simbol = (parseInt(status)!==1)? "\u25b7": "\u25b6";
            let cssClassObj = {
                                    main:"actionHead", 
                                    head:{main:"actionHeadHeaderMain", symbol:"actionHeadHeaderSymbol", positioner:"actionHeadHeaderPositioner", title:"actionHeadHeaderTitle"}, 
                                    body:{main:"actionHeadBodyMain", front:"actionHeadBodyFront", back:"actionHeadBodyBack"}, 
                                    foot:{main:"actionHeadFooterMain", graphic:"actionHeadFootergraph"}
                                };
                                
                                
                                
            let processedDateTime = function(dt, status)
                                    {
                                        if(aux_existence(dt))
                                        {
                                            let [thisObj] = dt;
                                            let {_creation:creation, Start, End, _actualend:aend, _grace:grace} = thisObj;
                                            return (parseInt(status)!==1)? DateTime.aux_ParseTo.extendDateTime(Number(End) + Number(grace)): DateTime.aux_ParseTo.extendDateTime(Number(aend));
                                        }
                                        
                                        return "";
                                    };

            
            let processedPriority = (function(p)
                                    {
                                        let svIndex=0,iIndex=0,uIndex=0,dIndex=0,sIndex=0,vIndex=0;
                                        const pBall = document.createElement("div");
                                        pBall.classList = "priorityBall";
                                        
                                        for(let element in p)
                                        {
                                            switch(element)
                                            {
                                                case "Strategic Value":
                                                        if(p[element][0].trim()==="High"){     svIndex = 5; }
                                                        if(p[element][0].trim()==="Medium"){   svIndex = 4; }
                                                        if(p[element][0].trim()==="Low"){      svIndex = 2.5; }
                                                    break;
                                                    
                                                case "Impact":
                                                        if(p[element][0].trim()==="High"){     iIndex = 4; }
                                                        if(p[element][0].trim()==="Medium"){   iIndex = 3; }
                                                        if(p[element][0].trim()==="Low"){      iIndex = 2; }                        
                                                    break;
                                                    
                                                case "Urgency":
                                                        if(p[element][0].trim()==="High"){     uIndex = 3; }
                                                        if(p[element][0].trim()==="Medium"){   uIndex = 2; }
                                                        if(p[element][0].trim()==="Low"){      uIndex = 1.5; }                        
                                                    break;
                                                    
                                                case "Dependency":
                                                        if(p[element][0].trim()==="High"){     dIndex = 3; }
                                                        if(p[element][0].trim()==="Medium"){   dIndex = 2; }
                                                        if(p[element][0].trim()==="Low"){      dIndex = 1.5; }                        
                                                    break;
                                                    
                                                case "Simplicity":
                                                        if(p[element][0].trim()==="High"){     sIndex = 2; }
                                                        if(p[element][0].trim()==="Medium"){   sIndex = 1.5; }
                                                        if(p[element][0].trim()==="Low"){      sIndex = 1; }                        
                                                    break;
                                                    
                                                case "Visibility":
                                                        if(p[element][0].trim()==="High"){     vIndex = 2; }
                                                        if(p[element][0].trim()==="Medium"){   vIndex = 1.5; }
                                                        if(p[element][0].trim()==="Low"){      vIndex = 1; }                        
                                                    break;
                                            }
                                        }
            
                                        let priorityValue="";
                                        let priorityIndex = svIndex + iIndex + uIndex + dIndex + sIndex + vIndex;
                                        
                                        
                                        if (priorityIndex < 2){ priorityValue = (priorityIndex!==0)? "L-": "";}                            //L-    = [1;-)
                                        if((2 <= priorityIndex)&&(priorityIndex < 3)){ priorityValue = "L"}       //L     = [2;1)     
                                        if((3 <= priorityIndex)&&(priorityIndex < 4)){ priorityValue = "L+"}      //L+    = (3;2)
                                        
                                        if((4 <= priorityIndex)&&(priorityIndex < 6)){ priorityValue = "M-"} 
                                        if((6 <= priorityIndex)&&(priorityIndex < 8)){ priorityValue = "M"}            
                                        if((8 <= priorityIndex)&&(priorityIndex < 10)){ priorityValue = "M+"}
                                        
                                        if((10 <= priorityIndex)&&(priorityIndex < 13)){ priorityValue = "H-"} 
                                        if((13 <= priorityIndex)&&(priorityIndex < 16)){ priorityValue = "H"}            
                                        if (16 <= priorityIndex){ priorityValue = "H+"}
                                        
                                    
                            
                                        pBall.textContent = priorityValue;
                                        
                                        
                                        //return (priorityValue)? pBall: "";
                                        return priorityValue;
                                    })(aData.Priority? aData.Priority[0]: "");

            
            if(aux_existence(title))
            {
                let [title0] = title;
                let {_name:title1} = title0;
                let [title2] = title1;
                

                let headSymbol = (aux_existence(topRef))?
                                        "<span id=\"headpositioner_" + indexer + "\"  class=\"" + classData[0][2] + "\"></span>" +
                                        "<span id=\"headtitle_" + indexer + "\"  title=\"" + aux_textSignIn(title2) + "\"  class=\"aHead_title  truncateTitle" + classData[0][3] + "\" >" + aux_textSignIn(title2) + "</span>" +
                                        "<span id=\"headsymbol_" + indexer + "\"  data-symbol-code=\"\u25c1\" class=\"" + classData[0][1] + "\">\u25c1</span>":                
                
                                        "<span id=\"headsymbol_" + indexer + "\"  class=\"" + classData[0][1] + "\">" + simbol + "</span>" +
                                        "<span id=\"headpositioner_" + indexer + "\"  class=\"" + classData[0][2] + "\"></span>" +
                                        "<span id=\"headtitle_" + indexer + "\"  title=\"" + aux_textSignIn(title2) + "\"  class=\"aHead_title  truncateTitle" + classData[0][3] + "\" >" + aux_textSignIn(title2) + "</span>";
                                        

                                   
/*                
                let headEditor =    (aux_existence(update))? 
                                                `<span class="aHeadEditor">\u22EE</span>
                                                <div id="headToolTip_${indexer}"   class="htooltip " >
                                                    <a href="javascript:frmEdit.eAction.placer('${indexer}')" id="aEdit_${indexer}"   class="ttcomponent" >Edit</a><br>
                                                    <a href="javascript:frmEdit.eAction.placer('${indexer}','true')"  id="aClone_${indexer}"   class="ttcomponent" >Clone</a><br>
                                                    <a href="javascript:frmEdit.eAction.placer('${indexer}','true')"  id="preferences_${indexer}"   class="ttcomponent" >Preferences</a><br>
                                                    <div   class="ttcomponent qrcode" data-action-eref='${aData.ExternalCode}' data-action-head='${aData.Title[0]["_name"][0]}'>QR Code</div>
                                                </div>`:
                                                "";
*/
                let headEditor =    (aux_existence(update))? 
                                                `<span class="aHeadEditor">\u22EE</span>
                                                <div id="headToolTip_${indexer}"   class="htooltip closedDisplay" >
                                                    <div onclick="javascript:frmEdit.eAction.placer('${indexer}')" id="aEdit_${indexer}"   class="ttcomponent" style='top:10px'>Edit</div>
                                                    <div onclick="javascript:frmEdit.eAction.placer('${indexer}','true')"  id="aClone_${indexer}"   class="ttcomponent"  style='top:35px'>Clone</div>
                                                    <div   data-action-eref='${aData.ExternalCode}' data-action-head='${aData.Title[0]["_name"][0]}' class="ttcomponent qrcode" style='top:60px'>QR Code</div>
                                                </div>`:
                                                "";


                let headClass = (aux_existence(headEditor))? "headEditor": "";
                       
                document.getElementById(`head_${indexer}`).innerHTML = "<div id=\"headData_" + indexer + "\"  class=\"headData\">" + 
                                "<div id=\"BodyFrame_Title_" + indexer + "_1\">" +
                                    "<input type=\"hidden\" id=\"edit_Title_" + indexer + "_1_0\" data-action-property-label=\"_frameID\" value=\"1\">" +
                                    "<input type=\"hidden\" id=\"edit_Title_" + indexer + "_1_1\" data-label-objname=\"_name\"  data-action-property-label=\"_name\" required=\"true\" value=\"" + aux_textSignIn(title2) + "\">" +  
                                "</div>" +
                                "<div id=\"headtop_" + indexer + "\" class=\"" + classData[0][0] + "\">" + 
                                    "<div class=\"headselector\"  onclick=\"actionHandler('" + indexer + "')\">" +
                                    
                                        headSymbol +
                                        
                                    "</div>" +
                                    "<div id=\"headeditor_" + indexer + "\"   class=\"" + headClass + " closedDisplay\"  onclick=\"actionEditorHandler('" + indexer + "')\">" + headEditor + "</div>" +
                                "</div>" +
                                "<div id=\"headbottom_" + indexer + "\"  class=\"" + classData[1][0] + "\">" +
                                    "<span class=\"priorityBall\">" + processedPriority + "</span>" +
                                    "<span id=\"headbottom_1_" + indexer + "\"   class=\"externalHeadUsername\">" + outteruser + "</span>" +
                                    "<span id=\"headbottom_2_" + indexer + "\"   class=\"" + classData[1][2] + "\" >" + processedDateTime(datetime, status) + "</span>" +
                                "</div>" +
                            "</div>" +
                            "<div id=\"headGraph_" + indexer + "\"  class=\"headGraph\">" + createCircularGraph(indexer, acolor) + "</div>"; 
            }
        },
        
        
        //bodyReturner: function(thisAction, id)
        bodyReturner: function(id, actionData)
        {
            let body        = "";
            let summaryMap  = new Map();                    //countBlockFrames
            let permission  = actionData["AccessRef"];      //thisAction[3];
            let status      = actionData["Status"];      //thisAction[8];

            let framePropertyBody = function(id, cnt, framer, userdata, Header)
            {
                let preventInternalCodeAction = actionData["InternalCode"];
                let objArr=[], returnerArr
                let arr = userdata;
                let dr  = null;
                //let aMapped = arr.map((v)=> [v]);
                let obj = new objFrame(id, `${Header}_${id}`, "root");
                let catLevel=false, catTrigger=false, catCounter=0;
                let propertyContent = false;
                
                
                function objFrame(id, a, b)
                {
                    this.ID         = id;
                    this.Index      = a;
                    this.Parent     = b;
                    this.Children   = [];
                    this.data       = 
                                    {
                                        head: [],
                                        body: [],  
                                        foot: []
                                    };
                }                        
                
                
                
                /*
                getHead(codeSelector, headName, affectedByClosedStatus=false, o);
                    Concerns:
                        Where does 'affectedByClosedStatus' come from?
                */
                function getHead(headCode=3, data, status, o)
                {
                    let arrHead, h0, h1;
                    if(aux_existence(o)){ h0=o.data.head[0]??=headCode; h1=o.data.head[1]??=""; }
                    
                    arrHead =   [
                                    h0,
                                    h1,
                                    ""
                                ];
                    headCode = ((parseInt(headCode)===11)||(parseInt(headCode)===21)||(parseInt(headCode)===31))? 11: headCode;
                    switch(parseInt(headCode))
                    {
                        case 11: 
                            arrHead[2] = `<span class='apehWrapper_title_tail'> [${aux_textSignIn(isNaN(data)? ((data.includes("T"))||(data.includes("@")))? DateTime.aux_ParseTo.extendDateTime(DateTime.aux_ParseTo.numericDateTime(data)): data: DateTime.aux_ParseTo.extendDateTime(data))}]</span>`;
                            break;
                            
                        default:
                            arrHead[0] = parseInt(headCode);
                            arrHead[1] = aux_textSignIn(data);
                    }
                    
                    return arrHead;
                }
                
                
                
                function getHead_v1(headCode=3, data, status, o)
                {
                    let arrHead, h0, h1;
                    
                    arrHead =   {
                                    symbol: o.data.head[0]??=headCode,
                                    head: o.data.head[1]??= aux_textSignIn(data),
                                    tail:(parseInt(headCode)%2!==0)? `<span class='apehWrapper_title_tail'> [${aux_textSignIn(isNaN(data)? ((data.includes("T"))||(data.includes("@")))? DateTime.aux_ParseTo.extendDateTime(DateTime.aux_ParseTo.numericDateTime(data)): data: DateTime.aux_ParseTo.extendDateTime(data))}]</span>`: "",
                                };

                    return arrHead;
                } 
                



                function getBody(obj, data, propertyRef, tlabel)
                {
                    let {label:ftitle, codeSelector:fcode, toBeReplaced:thisRef, attribute} = propertyRef;
                    ftitle = (aux_existence(ftitle))? ftitle: propertyRef.labelID || "";
                    let newUserSubData = data;
                    let bData = "";
                    
                    function elementaryAssembler(a, b, c, d, data, id, nameLabel) 
                    {
                        let titleSpan="", bodySpan="";
                        if(aux_existence(data))
                        {
                            if((!aux_existence(c))&&(!aux_existence(a)))
                            {   
                                b=7; 
                                    
                                if(Header==="Category") 
                                { 
                                    let spacer = ((d0)=>
                                    {
                                        let d = "";
                                        for(let d1=1; d1<d0; d1++)
                                        {   d += "<span class=catBall></span>"; }
                                        
                                        return d;
                                    })
                                    (catCounter);
                                    
                                    data = `${spacer} ${aux_textSignIn(data[0], 1)}`;
                                }
                                else
                                {   data = aux_textSignIn(data[0], 1); }
                            }
                            
                            switch(parseInt(b))
                            {
                                case 1:                     //description
                                    titleSpan = "";                                         
                                    bodySpan = `<span class='apbElement_body textCode_1 ${d}'>${aux_textSignIn(data, 1)}</span>`;
                                    break;
                                    
                                case 2: 
                                    titleSpan = `<span class='apbElement_title_2 ${c}'>${aux_textSignIn(a)}:</span>`;                                         
                                    bodySpan = `<span class='apbElement_body_x textCode_2 ${d}'>${aux_textSignIn(data, 1)}</span>`;
                                    break; 
                                    
                                case 3: 
                                    titleSpan = `<div class='apbElement_title_3 ${c}'>${aux_textSignIn(a)}:</div>`;
                                    bodySpan = `<div class='apbElement_body_x textCode_3 ${d}'>${aux_textSignIn(data, 1)}</div>`;
                                    break;
                                    
                                case 4:                     //textarea
                                    titleSpan = "";                                         
                                    bodySpan = `<div class='apbElement_body textCode_4 displayActionText ${d}'>${aux_textSignIn(data, 1)}</div>`;
                                    break;
                                    
                                case 5:                     //file linker
                                    titleSpan = "";                                      
                                    bodySpan = "<div class=\"apbElement_body " + d + "\">" +
                                                    "<img id=\"attachments_" + id + "\" class=\"classicPic\" onclick=\"sendToModal('attachments_" + id + "','','')\" src=\"https://focusonxyz.com/focus_Storage/" + sessionStorage.database + "/"  + data + "\">" + 
                                                "</div>";
                                    break;
                                    
                                case 6:                     //file linker
                                    if(aux_existence(data))
                                    {
                                        data = aux_textSignIn(data[0], 1);
                                        
                                        const parser = new DOMParser();
                                        const element = parser.parseFromString(data, "text/html").body;
                                        const fileHTML = element.querySelector("img");
                                        
                                        fileHTML.src = fileHTML.dataset.attachmentFileName;
                                    }
                                    
                               
                                    
                                    titleSpan =  `<div class='apbElement_title textCode_6 ${c}'>${aux_textSignIn(a, 1)}:</div>`;                                         
                                    bodySpan = "<span class=\"apbElement_body_x " + d + "\"><a href=\"https://focusonxyz.com/focus_Storage/" + apps.uniqueData.uDB + "/"  + data + "\">" + data + "</a></span>";
                                    break; 
                                    
                                case 7:                     //disabled textarea
                                    if(Header==="Category") 
                                    { 
                                        let spacer = ((d0)=>
                                        {
                                            let d = "";
                                            for(let d1=1; d1<d0; d1++)
                                            {   d += "<span class=catBall></span>"; }
                                            
                                            return d;
                                        })
                                        (catCounter);
                                        
                                        data = `${spacer} ${aux_textSignIn(data[0], 1)}`;
                                    }
                                    else
                                    {   data = aux_textSignIn(data[0], 1); }
                                
                                
                                    titleSpan = "";                                         
                                    bodySpan = `<div class='apbElement_body textCode_7 displayActionText ${d}'>${data}</div>`;
                                    break;   

                                case 8:                     //Links
                                    titleSpan = "";                                         
                                    bodySpan = `<div id='${id}' class='apbElement_body textCode_8 ${d}'></div>`;
                                    break; 
                                    
                                case 9:                     //rte
                                    titleSpan = "";    
                                    let divid = `rte_${id}`;
                        			try 
                        			{
                        				new Promise((resolve)=>
                        				{
                        					resolve(editor.rteReturner_DisplayMode(aux_textSignIn(data, 1), id));
                        				}).then((render)=>
                        				{ 
                        				    //console.log("checker-1", render.outerHTML);
                         				    const elem = document.getElementById(divid);                       				    
                        				    const attachments = render.querySelectorAll(".attachment-item");
                        				    
                        				    if(attachments)
                        				    {   
                                                attachments.forEach((a,i) => 
                                                {
                                                    // Switch visual mode
                                                    a.classList.remove("attachmentEditMode");
                                                    a.classList.add("attachmentDisplayMode");
                                    
                                                    // Remove interactive handles
                                                    a.querySelectorAll(".drag-handle")?.forEach(ro=>{ro.remove();});
                                                    a.querySelectorAll(".resize-handle")?.forEach(ro=>{ro.remove();});
                                                    
                                                    // Safety: fix any stray blob URLs
                                                    const media = a.querySelector("[data-attachment-element='file']");
                                                    if (media && media.src?.startsWith("blob:")) 
                                                    {
                                                        const fileName = encodeURIComponent(a.dataset.attachmentName);
                                                        media.src = `/focus_Storage/${apps.uniqueData.uDB}/${fileName}`;
                                                    }
                                                    //console.log(`checker-2(${i})`, render.outerHTML);
                                                });  
                        				    }	
                        				    
                        					if(elem)
                        					{	
                        					    //console.log("checker-3", render.outerHTML);
                        						elem.innerHTML = "";
                        						render.classList.add("apbElement_comment");
                        						elem.appendChild(render);
                        					}        
                        				});
                        
                              			bodySpan = `<div id='${divid}' class='dContainer' ></div>`;
                            		} 
                        			catch (err) 
                        			{
                              			console.error('Error fetching display mode:', err);
                              			bodySpan = `<div id='${divid}' class='apbElement_body textCode_8a ${d}'></div>`;
                            		}
    			
    			
                                    bodySpan = `<div id='${divid}' class='apbElement_body textCode_8b ${d}'></div>`;
                                    
                                    
                                    break; 
                                    
                                case 10:                //DateTime
                                
                                    data = Array.isArray(data)? data[0]: data;
                                    titleSpan = `<span class='apbElement_title ${c}'>${aux_textSignIn(a)}:</span>`;  
                                    bodySpan = `<span class='apbElement_body_x ${d}'>${DateTime.aux_ParseTo.extendDateTime(data)}</span>`;
                                        
                                        
                                        break;                                     
                                default:
                                    titleSpan = `<span class='apbElement_title ${c}'>${aux_textSignIn(a)}: ${nameLabel}</span>`;
                                    bodySpan = `<span class='apbElement_body_x ${d}'>${aux_textSignIn(data, 0)}</span>`;
                                    break;
                            }
                        }
                    
                        
                        return `<div class='aProperty_Body '>${titleSpan}${bodySpan}</div>`;
                    };
                
                
                    if(aux_existence(attribute))
                    {
                        let{options="" } = attribute;
                        if((aux_existence(options)&&(!isNaN(data))))
                        {
                            if(Header==="Contacts")
                            {   
                                newUserSubData = (function(a, b)
                                {
                                    let value = "";
                                    if(Array.isArray(a)){   a.forEach(function([v, d]){   if(d===b){value=v;}    })  }
                                    
                                    return value;
                                })(options, data);
                            }
                            else
                            {   if(aux_existence(options[data])){ newUserSubData = options[data][0];   } }                               
                        }
                    }
                    
                    
                    if(parseInt(data)!==0)
                    {   
                        let tl = aux_existence(tlabel)? ` (Top)`: "";
                        bData += elementaryAssembler(ftitle, fcode, "", "", newUserSubData, obj.Index, tl);   
                    }  
                    
                    
                    return bData;
                }
                
                
                
                function getFoot()
                {   
                    return ""; 
                }
                
                
                
               /*
               Description:
               This block creates a multidimensional tree
               */
                function getObjReturner(parentO, propertyArr, frame, Elem)
                {    
                    function findHeader(parentObj, currentObj)
                    {
                        for(let child of parentObj.Children)
                        {
                            if(
                                child.data.head[0]===currentObj.data.head[0]&&
                                child.data.head[1]===currentObj.data.head[1]&&
                                child.data.head[2]===currentObj.data.head[2]
                              )
                            {   return child; }
                        }
                    
                        return;   
                    }
                    
                    function handleHeader(po, o)
                    {
                        let oChecker = findHeader(po, o);
                        if(aux_existence(oChecker))
                        {   po = oChecker;  }
                        else
                        {
                            po.Children.push(o);
                            po = o;
                        }                        
                    }
                    
                    function reAttributeOptions(fr, head)
                    {    
                        let thisFuncReturn="";
                        
                        fr.forEach(function([value, index], key)
                        {   if(index===head){   thisFuncReturn = value;  }});
                        
                        return thisFuncReturn;   
                    }


                    
                    for(let e=Elem, eL=frame.length; e<eL; e++)
                    {
                        const {label, labelID, labelTop, linker=false, bodyWrapperHead, codeSelector, changeDepth, sameValueAs, attribute=""} = frame[e];
                        let data = (!aux_existence(propertyArr[label]))? (!aux_existence(propertyArr[labelID]))? "": propertyArr[labelID]: propertyArr[label];
                        
                        if((!aux_existence(catTrigger)) && (aux_existence(labelTop)) && (e==0))
                        {
                            catLevel = true;
                            catTrigger = true;
                        }
                        else
                        {   catLevel = false; }

                        if(aux_existence(data))
                        {
                            propertyContent = true;
                            if(bodyWrapperHead)
                            {
                                if(aux_existence(data))
                                {   
                                    let headName = (aux_existence(attribute))? aux_existence((attribute.options))? reAttributeOptions(attribute.options, data): data: data; 
                                    let o = new objFrame(parentO.ID, `${parentO.Index}_${parentO.Children.length+1}`, parentO.Index);
                                     
                                    
    
                                        if((data[0].includes("#action-0#@"))||
                                           (data[0].includes("#action-1#@"))||
                                           (data[0].includes("#action#@")))
                                           {   
                                                if(propertyArr["_reference"][0]!==preventInternalCodeAction)
                                                {                                         
                                                    o.data.head = "@#action#";           //where is it used??? (It seems that it used just make sure o.data.head is not empty which can cause an error)
                                                    parentO.Children.push(o);            //It is also used in printObj()
                                                }
                                                else
                                                {   o = "";   headName="";  break;}
                                                
                                                continue;    
                                           }   
                                           
                                        if((data[0].includes("#action-0###@"))||
                                           (data[0].includes("#action-1###@"))||
                                           (data[0].includes("#action#@")))
                                            {
                                                if(propertyArr["_reference"][0]!==preventInternalCodeAction)
                                                {
                                                    o.data.head = "#action#@";         //where is it used???
                                                    parentO.Children.push(o);
                                                }
                                                else
                                                {     o = "";   headName="";   break; }         //does it really prevent anything???
                                               continue; 
                                            }
                                       
                                        o.data.head = getHead(codeSelector, headName, affectedByClosedStatus=false, o);
                                        
                                                                            
                                    if(aux_existence(o.data.head[1]))
                                    {
                                        if(aux_existence(changeDepth))
                                        {   
                                            //handleHeader(parentO, o);  
                                            let oChecker = findHeader(parentO, o);
                                            if(aux_existence(oChecker))
                                            {   parentO = oChecker;  }
                                            else
                                            {
                                                parentO.Children.push(o);
                                                parentO = o;
                                            }
                                        }
                                        else
                                        {   parentO.data.head = getHead(bodyWrapperHead, headName, affectedByClosedStatus=false, parentO);  }
                                    }
                                    else
                                    {   parentO.data.head[2] = o.data.head[2];   }
                                }
                            }
                            else
                            {   
                                let subParentO = parentO;
                                let notCheckedYet = true;
                                if((aux_existence(attribute))&&(notCheckedYet))
                                {
                                    if(aux_existence(attribute.subframeblockelem))
                                    {
                                        if(aux_existence(data))
                                        {   
                                            //this loop handles subFrameBlock (It need revision)
                                            for(let a0=0, cnt=0, a1=data.length; a0<a1; a0++)
                                            {   
                                                cnt++;
                                                let sframe = eval(Header).frame.returner(data[a0]["_frameID"][0]).eframe;
                                                
                                                for(let se=0, seLen=sframe.length; se<seLen; se++)
                                                {//
                                                    const {label, labelID, bodyWrapperHead, codeSelector, changeDepth, attribute} = sframe[se];
                                                    let sdata = (!aux_existence(data[a0][label]))? (!aux_existence(data[a0][labelID]))? "": data[a0][labelID]: data[a0][label];
                                                    
                                                    if(bodyWrapperHead)
                                                    {
                                                        if(aux_existence(sdata))
                                                        {   
                                                            let headName = (aux_existence(attribute))? aux_existence((attribute.options))? reAttributeOptions(attribute.options, sdata): sdata: sdata; 
                                                            let o = new objFrame(subParentO.ID, `${subParentO.Index}_${(subParentO.Children.length+1)}`, subParentO.Index);
                                                            
                                                            if((sdata[0].includes("#action-0#@"))||
                                                               (sdata[0].includes("#action-1#@"))||
                                                               (sdata[0].includes("#action-0###@"))||
                                                               (sdata[0].includes("#action-1###@"))||
                                                               (sdata[0].includes("#action#@")))
                                                               
                                                               {   
                                                                   o.data.head = "#action#@";
                                                                   subParentO.Children.push(o);
                                                                   continue;    
                                                               }      
                                                               
                                                                o.data.head = getHead(codeSelector, headName, affectedByClosedStatus=false, o);
                                                                
                                                            
               
                                                                                                   
                                                            if(aux_existence(o.data.head[1]))
                                                            {
                                                                if(aux_existence(changeDepth))
                                                                {   
                                                                    //handleHeader(parentO, o);  
                                                                    let oChecker = findHeader(subParentO, o);
                                                                    if(aux_existence(oChecker))
                                                                    {   subParentO = oChecker;  }
                                                                    else
                                                                    {
                                                                        subParentO.Children.push(o);
                                                                        subParentO = o;
                                                                    }
                                                                }
                                                                else
                                                                {   subParentO.data.head = getHead(bodyWrapperHead, headName, affectedByClosedStatus=false, subParentO);  }
                                                            }
                                                            else
                                                            {   subParentO.data.head[2] = o.data.head[2];   }
                                                        }
                                                    }
                                                    else
                                                    {
                                                        if((aux_existence(sameValueAs))&&(notCheckedYet))
                                                        {
                                                            if((aux_existence(propertyArr[sameValueAs+1]))&&(parseInt(propertyArr[sameValueAs+1])!==0))
                                                            {   subParentO.data.body.push(getBody(subParentO, propertyArr[sameValueAs+1], sframe[sameValueAs]));   } 
                                                            
                                                            notCheckedYet = false;
                                                        }
                                                        
                                                        if(notCheckedYet)
                                                        {
                                                            if((aux_existence(sdata))&&(parseInt(sdata)!==0)&&(sdata[0]!=="None"))
                                                            {   subParentO.data.body.push(getBody(subParentO, sdata, sframe[se]));    }
                                                        }                                                       
                                                    }
                                                }
                                                subParentO = parentO;
                                            }
                                        }
                                        notCheckedYet = false;
                                    }
                                }
                                
                                if((aux_existence(sameValueAs))&&(notCheckedYet))
                                {
                                    if((aux_existence(propertyArr[sameValueAs+1]))&&(parseInt(propertyArr[sameValueAs+1])!==0))
                                    {   parentO.data.body.push(getBody(parentO, propertyArr[sameValueAs+1], frame[sameValueAs]));   } 
                                    
                                    notCheckedYet = false;
                                }
                                
                                
                                //This is the block that handles propertyActions
                                if((linker)&&(notCheckedYet))                               
                                {                                                   
                                    loadEmbededObj(propertyArr, parentO, (propertyArr["_name"][0].includes("###@"))?true:false); 
                                    notCheckedYet = false;
                                }
                                    
                                if(notCheckedYet)
                                {
                                    if((aux_existence(data))&&(parseInt(data)!==0)&&(data[0]!=="None"))
                                    {   parentO.data.body.push(getBody(parentO, data, frame[e], catLevel));    }
                                }
                            }
                        }
                    } 
                }


 
                function printObj(obj)
                {  
                    let returner="";
                    
                    function processException(oe)
                    {
                        let pereturner = "";
                        if(oe.Index.includes("Description"))
                        {
                            let {head="", body="", foot=""} = oe.data;
                            pereturner = collapseBlock("",                           //data
                                                              head,                         //header
                                                              [body],                 //body
                                                              foot,                         //footer
                                                              [oe.Index, "", ""],            //index
                                                              ["openDisplay ",[["noclass topheader","noclass","spaceWhiteBreak"],["noclass","noclass","noclass"]], "openDisplay", "openDisplay"]);  
                            
                        }
                        
                        return pereturner;
                    }
                    
                    function processBlock(oo)
                    {
                        //let returnHead="", returnBody="", returnFoot="";
                        let {head="", body="", foot=""} = oo.data;
                        
                        returnHead = head;                               
                        returnBody = (aux_existence(body))? ((ar)=>{let b=""; ar.forEach((d)=>{b+=aux_existence(d)?d:""}); return b;})(body):"";
                        
                        if(aux_existence(oo.Children))
                        {     returnBody = returnBody + printObj(oo); }
                        
                        
                        if(aux_existence(head))
                        {
                            returner += collapseBlock("",                       //data
                                                     head,                      //header
                                                     [returnBody],              //body
                                                     foot,                      //footer
                                                     [oo.Index, "", ""],         //index
                                                     ["openDisplay ",[["noclass topheader","noclass","spaceWhiteBreak"],["noclass","noclass","noclass"]], "openDisplay apeWrapper_body", "openDisplay"]);  
                        }
                    }
                    
                                    
                    if((aux_existence(obj.data.head))&&(aux_existence(returner)))
                    {
                        let returner = (aux_existence(obj.data.body))? 
                                    ((ar)=>{let b=""; ar.forEach((d)=>{b+=aux_existence(d)?d:""}); return b;})(obj.data.body): 
                                    "";
                        
                        returner = collapseBlock("",                           //data
                                                  obj.data.head,            //header
                                                  [returner],             //body
                                                  obj.data.foot,            //footer
                                                  [obj.Index+"_rootID", "", ""],      //index
                                                  ["openDisplay ",[["noclass topheader","noclass","spaceWhiteBreak"],["noclass","noclass","noclass"]], "openDisplay apeWrapper_body", "openDisplay"]);  
                    }
                    else
                    {
                        if(aux_existence(obj.Children))
                        {
                           obj.Children.forEach(function(o, okey)
                            {   
                                //let returnHead="", returnBody="", returnFoot="";
                                let {head="", body="", foot=""} = o.data;
                                //head = (head!=="#action#@")? head: "";
                                
                                if(aux_existence(head))
                                {                              
                                    returnBody = (aux_existence(body))? ((ar)=>{let b=""; ar.forEach((d)=>{b+=aux_existence(d)?d:""}); return b;})(body):"";
                                    
                                    if(aux_existence(o.Children))
                                    {     returnBody = returnBody + printObj(o); }
                                    
                                    let rdata = (aux_existence(returner))? `${returner}<br>`: returner;
                                    returner = rdata + collapseBlock("",                       //data
                                                              //(head!=="#action#@")? head: "",                     //header
                                                              (!head.includes("#action#"))? head: "",                     //header
                                                              [returnBody],             //body
                                                              foot,                     //footer
                                                              [o.Index, "", ""],        //index
                                                              ["openDisplay ",[["noclass topheader","noclass","spaceWhiteBreak"],["noclass","noclass","noclass"]], `openDisplay ${(aux_existence(returnBody))? (!head.includes("#action#"))? 'apeWrapper_body':'':''}`, "openDisplay"]);  
                                }
                            }); 
                        }
                        else
                        { 
                            let pExcept = processException(obj);
                            let {head="", body="", foot=""} = obj.data;
                           
                            
                            if(aux_existence(pExcept))
                            {   returner += pExcept;    }
                            else
                            {
                                returnBody = (aux_existence(body))? ((ar)=>{let b=""; ar.forEach((d)=>{b+=aux_existence(d)?d:""}); return b;})(body):"";
                                if(aux_existence(head))
                                {      
                                    let rdata = (aux_existence(returner))? `${returner}<br>`: returner;
                                    returner = rdata + collapseBlock("",                           //data
                                                              head, //(aux_existence(head))? head: [],                         //header
                                                              [returnBody],                 //body
                                                              foot,                         //footer
                                                              [obj.Index, "", ""],            //index
                                                              ["openDisplay ",[["noclass topheader","noclass","spaceWhiteBreak"],["noclass","noclass","noclass"]], "openDisplay apeWrapper_body", "openDisplay"]);  
                                }
                                else
                                {
                                    if(aux_existence(returnBody))
                                    {
                                        let rdata = (aux_existence(returner))? `${returner}<br>`: returner;
                                        returner = rdata + collapseBlock("",                           //data
                                                                  "", //(aux_existence(head))? head: [],                         //header
                                                                  [returnBody],                 //body
                                                                  foot,                         //footer
                                                                  [obj.Index, "", ""],            //index
                                                                  ["openDisplay ",[["noclass","noclass","spaceWhiteBreak"],["noclass","noclass","noclass"]], "openDisplay ", "openDisplay"]);  
                                    }
                                }
                            }
                        }
                    }
                    
                    return returner;
                }
                
                    
                
                let dModeConfirmed = false;
                for(let cntB=0, cnt=userdata.length; cntB<cnt; cntB++)
                {   
                    let propertyDataObj = userdata[cntB];
                    let fr  = framer.returner();
                    
                    if(Header==="Category")
                    {
                        catCounter++;
                        if(propertyDataObj["_name"][0]==="...")
                        {   break;    }
                    }
                    
                    if(aux_existence(fr.dMode))
                    {
                        getObjReturner(obj, propertyDataObj, fr.eframe, 0);
                        dModeConfirmed = true;
                    }
                }
                    
                return (aux_existence(dModeConfirmed))? (propertyContent)? printObj(obj): "": "";
            };
    
      
            for(let a1=3, a2=apps.properties, a3=a2.length; a1<a3; a1++)
            {
                if(aux_existence(actionData[a2[a1]]))
                {
                    if((a2[a1]!=="Reference")&&(a2[a1]!=="Status"))
                    {
                        body += ((id, property, userdata, frame, cnt, permission)=>
                                {
                                    let bpreturner = "";
                                    let fbreturner = framePropertyBody(id, cnt, frame, userdata, property);
                                    
                                    if((fbreturner))                            
                                    {
                                        let pSize="";
                                        if((property!=="Description")&&(property!=="Priority"))
                                        {   pSize = "<span> (" + summaryMap.size  + ")</span>"; }

                                        bpreturner = collapseBlock("",                                                                                                      //data
                                                                   [(parseInt(status)!==1)? 3: (parseInt(permission[(cnt+7)])!==1)? 2: 3, property, "", "", "", ""],        //header = [indexID, [symbol,title,tail,extra1,extra2,stopper,onclick,groupname ], [thisBody, linksetter], ["", class2, "",""]] 
                                                                   [fbreturner],                                                                                            //body   = [indexID, [thisBody,""], ["","", class3,""]]
                                                                   [""],                                                                                                    //footer = [indexID, foot, ["","","", class4]]
                                                                   [property + "_" + id, "", ""],                                                                           //indexer= [indexID, indexName]
                                                                   ["openDisplay dProperty",[["dProperty_Head","noclass","noclass"],["noclass","noclass","noclass"]],"openDisplay dProperty_Body","openDisplay dProperty_Foot"]);
                                                                   //(data, header, body, footer, indexer, classArr)
                                                                   //status=1 (closed); status=0 (open)
                                                                   //symbol=3 (white-down-pointing triangle); symbol=2 (black-down-pointing triangle)
                                                                   //permission=0 (no access); permission=1 (access granted)
                                    }  
                                
                                    //return ((o)=>{return `${o}<br>`;    })(bpreturner);
                                    return (aux_existence(bpreturner))? `${bpreturner}<br>`: bpreturner;
                                    
                                })(id, a2[a1], actionData[a2[a1]], eval(a2[a1]).frame, a1, permission);
                    }
                }
            }
            
            
            
            return body;
        },
        
        
        footReturner: function(id, actionData, noButtons)   
        {
            let close="",clone="",objButton="";
            let thisActionColors = DateTime.actionColorCode(actionData["Status"], actionData["DateTime"]);
            let onclickFunc =   
            [
                ["_Button", ["frmEdit.eAction.placer", [id]], "Edit"],
                ["_Button", ["frmEdit.eAction.placer", [id, true]], "Clone"]
            ];
            
                
            for(let f0=0, f1=onclickFunc.length; f0<f1; f0++)
            {
                const [objClass, objFunc, objValue] = onclickFunc[f0];
                const [placement, Args] = objFunc;
                
                let funcArguments = "";
                if(aux_existence(Args))
                {
                    for(let arg0=0, arg1=Args.length; arg0<arg1; arg0++)
                    {
                        if(funcArguments!=="")
                        {   funcArguments = funcArguments + "','" + Args[arg0]; }
                        else
                        {   funcArguments = Args[arg0]; }
                    }
                }
                
                objButton = (aux_existence(noButtons))? "": "<div class=\"_Button\" onclick=\"frmEdit.eAction.placer('" + id + "')\">Edit</div>" +
                            "<div class=\"_Button\" onclick=\"frmEdit.eAction.placer('" + id + "','true')\">Clone</div>";
            }
                
                
            let dtfoot = (function(status, [{_creation, Start, End, _actualend, _grace}], cc)
            {
                let [cdt]=_creation, [sdt]=Start, [edt]=End, [aedt]=(aux_existence(_actualend))? _actualend: End, [gdt]=_grace;
                
                let footdatetime  = "";
                let initializeDateTime = ["Starting", "Due", "Closed"];
                let {cReference, cName} = cc;
                

                let startDateTime = `<div><span class='aFoot_hElement_Body1' >${DateTime.aux_ParseTo.extendDateTime(sdt)} <span class='footer-dt-status fdt-start'>S</span></span></div>`;
                let endDateTime = `<div><span  class='aFoot_hElement_Body0'  style='color:${cc.cCode}'>${DateTime.aux_ParseTo.extendDateTime(edt)} <span class='footer-dt-status fdt-end'>E</span></span></div>`;  
                let graceDateTime = `<div><span class='aFoot_hElement_Body0' style='color:${cc.cCode}'>${DateTime.aux_ParseTo.extendDateTime(Number(edt) + Number(gdt))} <span class='footer-dt-status fdt-endgrace'>EG</span></span></div>`;
                let closedDateTime = (Number(status)!==1)? "": `<div><span class='aFoot_hElement_Body0' style='color:${cc.cCode}'>${DateTime.aux_ParseTo.extendDateTime(aedt)} <span class='footer-dt-status fdt-close'>C</span></span></div>`;


                if(cc.cName==='White')
                {   footdatetime = `${startDateTime}`;  }
                else if(cc.cName==='Green')
                {   footdatetime = `${startDateTime}${endDateTime}`;  }
                else if(cc.cName==='Yellow')
                {   footdatetime = `${startDateTime}${endDateTime}${graceDateTime}`;  }
                else if(cc.cName==='Violet')
                {   footdatetime = `${startDateTime}${endDateTime}${graceDateTime}`;  }
                else if((cc.cName==='Red')&&(cc.cFrame==='red'))                            //else if((cc.cName==='Red')&&(cc.cFrame!=='#204060'))
                {   footdatetime = `${startDateTime}${graceDateTime}`;  }
                else
                {   footdatetime = `${startDateTime}${graceDateTime}${closedDateTime}`;  }

                
                return footdatetime;
            })(actionData["Status"], actionData["DateTime"], thisActionColors);
            
            
            
            let performance = frmDisplay.objectificator.object_performance(actionData);
            
            let p1 = (performance.kpo.points * performance.kpo.percent) + (performance.kpe.points * performance.kpe.percent) + (performance.kpa.points * performance.kpa.percent)
            let p2 = ((p1/1000) * 100);
            
            

            let buttons = isNaN(id)? "": "<div id=\"foot_aof_" + id + "\" class=\"aFoot_Foot\" >" + objButton + "</div>";
            let performanceColor = (Number(actionData.Status)!==1)? thisActionColors.cFrame: "#f2f2f2";                     
                                 
                                 
            let data_v1 =   "<div id=\"aof_performance_kpo_" + id + "\" class=\"aFoot_performance\" >" +  
                                "<span id=\"aof_pkpo_Head_" + id + "\" class=\"aFoot_pHead\">Objectives Performance:</span>" +
                                "<span id=\"aof_pkpo_Body_" + id + "\" class=\"aFoot_pBody\">" + (Number(performance.kpo.percent).toFixed(2)*100) + "%</span>" +                        
                            "</div>" +
                            "<div id=\"aof_performance_kpe_" + id + "\" class=\"aFoot_performance\" >" +  
                                "<span id=\"aof_pkpe_Head_" + id + "\" class=\"aFoot_pHead\">Execution Performance</span>" +
                                "<span id=\"aof_pkpe_Body_" + id + "\" class=\"aFoot_pBody\">" + (Number(performance.kpe.percent).toFixed(2)*100) + "%</span>" +                        
                            "</div>" +
                            "<div id=\"aof_performance_kpa_" + id + "\" class=\"aFoot_performance\" >" +  
                                "<span id=\"aof_pkpa_Head_" + id + "\" class=\"aFoot_pHead\">Analyze Performance</span>" +
                                "<span id=\"aof_pkpa_Body_" + id + "\" class=\"aFoot_pBody\">" + (Number(performance.kpa.percent).toFixed(2)*100) + "%</span>" +                        
                            "</div>" +
                            "<div id=\"aof_performance_points_" + id + "\" class=\"aFoot_performance\" >" +  
                                "<span id=\"aof_pp_Head_" + id + "\" class=\"aFoot_pHead\">Accumulated Points:</span>" +
                                "<span id=\"aof_pp_Body_" + id + "\" class=\"aFoot_pBody\">" + parseInt(performance.points) + "</span>" +    
                            "</div>";
                                              


            let data_v2 =   "<div id=\"footGraph_" + id + "\"  class=\"footGraph\" style=\"left:0; position:relative; cursor:pointer;\" onclick=\"actionFooterGrahpHandler('" + id + "','" + actionData["Status"] + "')\">" + createCircularGraph("kp_" + id, thisActionColors.cFrame) + "</div>" +
                            "<div id=\"performanceDetail_" + id + "\" class=\"performanceDetail closedDisplay\">" + data_v1 + "</div>";

                            
                        
            let returner =  "<div class=\"footing\">" +
                                "<div id=\"FootPerformance_" + id + "\" class=\"FootPerformance\" >" + data_v2 + "</div>" +
                                "<div id=\"FootDateTime_" + id + "\" class=\"FootDateTime\" >" + dtfoot + "</div>" +
                            "</div>";
                     
            document.getElementById("foot_" + id).innerHTML = returner;
            
            setCircleAttribute(`Circle_kp_${id}`, 0, 50, 50, "0 0 50 50", 20, p2.toFixed(2), thisActionColors.cFrame, true); 
            document.getElementById("textCircle_kp_" + id).style.setProperty("fill", performanceColor);
        },
        
        
        /*
            Update Dates: 
                Jan 02, 2022 (ver. 26)
                    color
    
            Last Update by: 
                Anilson Cardoso

            Source of Data:
                arguments (requirements):   (from caller)

            
            Description:
                What does it do?

                    
                    
                Why is it called
                
                Where is it called from
                    loadStore.js ==>> load_display_Body()
                   
                    
                When is it called

                    
                How many times is it called
                How can it be done?   
        */
        Placer: function(dataLoader, menuIndexer, localIndex, topAction)
        {   
            let actionID = dataLoader.id;
            let source, linkerButtons=false; 
            let colorObj    = DateTime.actionColorCode(dataLoader["Status"], dataLoader["DateTime"]);
                dataLoader.reportData  = frmDisplay.objectificator.object_performance(dataLoader);
                
            let localIndexer = (aux_existence(localIndex))? false: true;
            let actionData  = frmDisplay.objectificator.object_returner(actionID, dataLoader, colorObj, localIndexer, topAction);
            
            let p1 = (dataLoader.reportData.kpo.points * dataLoader.reportData.kpo.percent) + (dataLoader.reportData.kpe.points * dataLoader.reportData.kpe.percent) + (dataLoader.reportData.kpa.points * dataLoader.reportData.kpa.percent)
            let p2 = ((p1/1000) * 100);



            if(!localIndexer)
            {   
                linkerButtons   = true;
                
                /*  
                    This block is called for a linked action    
                    It creates the action header but lacks extra data
                    
                    Concern: 
                    It needs improvement
                    
                    document.getElementById("body_" + localIndex).innerHTML +=   actionData;                    
                */
                document.getElementById(localIndex).innerHTML +=   actionData;   
            }
            else
            {   
                /*  This block is called for normal/regular actions inside a menu   */
                document.getElementById("actionboard_FromMenu_" + menuIndexer).innerHTML += actionData;  
            } 
            


            frmDisplay.Action.headReturner(actionID, dataLoader, colorObj, localIndexer, topAction);          
            
            setCircleAttribute(`Circle_${actionID}`, 0, 50, 50, "0 0 50 50", 20, p2.toFixed(2), colorObj.cFrame); 

            
            
            if(parseInt(dataLoader.Status)!==1)
            {   document.getElementById(actionID).style.setProperty("border-color", colorObj.cFrame); }
            else
            {   document.getElementById(actionID).style.setProperty("border-width", "8px"); }                  
        },
    },




    objectificator: 
    {
        object_performance: function(objAction)
        {
            let performance = {cnt:0, points:0, kpo:{points:0, percent:0}, kpe:{points:0, percent:0}, kpa:{points:0, percent:0}};
            
            
            function analyzePerformance(pso)
            {
                if(aux_existence(pso.ids))
                {
                    let cnt1 = (aux_existence(pso.ids.Local))? pso.ids.Local.length: 0;
                    let cnt2 = (aux_existence(pso.ids.Global))? pso.ids.Global.length: 0;
                    let points = (aux_existence(pso.points))? pso.points: 0;
                    
                    

                    if(aux_existence(pso.kpo))
                    {
                        performance.kpo.percent += (aux_existence(pso.kpo))? Number(pso.kpo): 0;
                        performance.kpo.points  += Number(Number(points) * ((cnt1!==0)? cnt1: 1));                     
                    }
                    
    
                    if(aux_existence(pso.kpe))
                    {
                        performance.kpe.percent += (aux_existence(pso.kpe))? Number(pso.kpe): 0;
                        performance.kpe.points  += Number(Number(points) * ((cnt1!==0)? cnt1: 1));                     
                    }
                    
                    
                    if(aux_existence(pso.kpa))
                    {
                        performance.kpa.percent += (aux_existence(pso.kpa))? Number(pso.kpa): 0;
                        performance.kpa.points  += Number(Number(points) * ((cnt1!==0)? cnt1: 1));                     
                    }
                    
                    performance.cnt = (cnt2 > performance.cnt)? cnt2: performance.cnt;
                    if (pso.points && !isNaN(pso.points)) performance.points += Number(Number(points) * ((cnt1!==0)? cnt1: 1));
                }
            }
        
            
        
            function calculatePerformance(psArr, userObj) 
            {
                if(Array.isArray(psArr))
                {
                    for(let psObj of psArr)
                    {   
                        let udata;
    
                        if(aux_existence(userObj))
                        {
                            if(aux_existence(userObj[psObj.title]))   
                            {   
                                if(psObj.title!=="DateTime")
                                {   
                                    let notFound = true;
                                    if(psObj.title==="Status")
                                    {   udata = {title:"Status", children:[{title:(Number(userObj[psObj.title][0])===1)? "Closed": "Open"}]};   notFound=false; }
                                    
                                    
                                    if(psObj.title==="Description")
                                    {   
                                        let child = (userObj[psObj.title][0].length>55)? [{title: "Extra"}]: [];
                                        udata = {title:"Status", children:child};   
                                        notFound=false;
                                    }
                                    
                                    
                                    if(notFound)
                                    {   udata = {title:psObj.title, children:userObj[psObj.title]};    }
                                }
                                else
                                {   udata = DateTime.dtPerformance(objAction["Status"], objAction["DateTime"]);   }
                                
                                
                                
                                if(Array.isArray(udata))
                                {
                                    if(typeof udata[0] === "object")
                                    {
                                        for(let newObjData of udata)
                                        {   
                                            if(psObj.title===newObjData.title)
                                            {
                                                if(aux_existence(psObj.children))
                                                {   calculatePerformance(psObj.children, newObjData.children);    }
                                                
                                                analyzePerformance(psObj, newObjData); 
                                            }
                                        }                               
                                    }
                                    else
                                    {   analyzePerformance(psObj, userObj); }
                                }
                                else
                                {   
                                    //analyzePerformance(psObj, udata);   
                                    if(psObj.title===udata.title)
                                    {   
                                        if(aux_existence(psObj.children))
                                        {   calculatePerformance(psObj.children, udata.children);    }
                                            
                                        analyzePerformance(psObj); 
                                    }
                                }
                            }
                            else
                            {
                                if(Array.isArray(userObj))
                                {
                                    for(let newUO of userObj)
                                    {
                                        if(typeof newUO !== "string")
                                        {
                                            if(aux_existence(newUO[psObj.title]))
                                            {
                                                calculatePerformance(psObj.children, newUO[psObj.title]);
                                                analyzePerformance(psObj); 
                                            }
                                            else if(psObj.title===newUO.title)
                                            {   
                                                if(aux_existence(psObj.children))
                                                {   calculatePerformance(psObj.children, newUO.children);    }
                                                    
                                                analyzePerformance(psObj); 
                                            }                                            
                                        }
                                        else
                                        {   
                                            if(psObj.title === newUO)
                                            {   analyzePerformance(psObj);  }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
        
            calculatePerformance(apps.PerformanceStore.children, objAction);
            
            
            return  performance;
        },
        

        object_returner: function(actionID, actionData, colorSettler, updatable, topLinker)
        {
            let source = (parseInt(actionData["sourceRef"])!==1)? "objectification_0": "objectification_1";
            
            let cssSupportColor = `cssColor_${colorSettler.cName}`;
            let cssFrameColor   = `cssColor_${colorSettler.cFrame}`;
            
            
            
            
                            
            let objStringfied = (function(a, b)
            {   
                let thisReturner=[];
                a.forEach(function(value){   thisReturner.push(b[value]);    });
                return thisReturner.join("*|3f2x|*");
                
            })(apps.uproperty, actionData);
            
            
          
            return  `<div id='${actionID}'  class='collapseBlock  sideFrame' data-block-index='5' data-display-mode='display'>
                        <div id="head_${actionID}" class="header" data-collapseblock="unset" ></div>
                        <div id="body_${actionID}" class="${(topLinker)? 'actionBody2': 'actionBody1'} closedDisplay" data-block-index="6"></div>
                        <div id="foot_${actionID}" class="actionFoot actionFootDMode closedDisplay ${cssFrameColor}"></div>
                    </div>`;  
        }
    },
};


