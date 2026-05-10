
//xxxxxxxxxx [ Auxiliar ] xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


    function aux_textValidated(text)
    {
        let approved = true;
        
        if(aux_existence(text))
        {
            //if(text.indexOf("\'")!==-1){alert("Invalid text"); approved = false;} 
            //if(text.indexOf("\"")!==-1){alert("Invalid text"); approved = false;} 
            if(text.indexOf("*|3f2w|*")!==-1){alert("Invalid input: *||*"); approved = false;} 
            if(text.indexOf("*|3f2x|*")!==-1){alert("Invalid input: *||*"); approved = false;} 
            if(text.indexOf("*|3f3x|*")!==-1){alert("Invalid input: *||*"); approved = false;} 
            if(text.indexOf("*|3f4x|*")!==-1){alert("Invalid input: *||*"); approved = false;} 
            if(text.indexOf("*|3f5x|*")!==-1){alert("Invalid input: *||*"); approved = false;} 
            if(text.indexOf("*|3f6x|*")!==-1){alert("Invalid input: *||*"); approved = false;} 
            if(text.indexOf("*|3f7x|*")!==-1){alert("Invalid input: *||*"); approved = false;} 
            if(text.indexOf("*|3f8x|*")!==-1){alert("Invalid input: *||*"); approved = false;} 
            if(text.indexOf("*|3f9x|*")!==-1){alert("Invalid input: *||*"); approved = false;} 
            if(text.indexOf("#|3f|#")!==-1){alert("Invalid input: *||*"); approved = false;} 
            if(text.indexOf("#|fff|#")!==-1){alert("Invalid input: *||*"); approved = false;} 
            if(text.indexOf("*|000|*")!==-1){alert("Invalid input: *||*"); approved = false;} 
        }

        return approved;  
    }
    

/*
Description: The function bellow removes the original strings and inserts the Z!strings

*/
    function aux_textSignOut(text)
    {  
        if(aux_existence(text))
        {
            text = text.toString();
            text = text.replace(/\'/g,"Z!a01");  
            text = text.replace(/\"/g,"Z!a02");  
            text = text.replace(/\r/g,"Z!a03");  
            text = text.replace(/\t/g,"Z!a04");  

            //text = text.replace(/\n/g,"Z!a05"); 
            
            text = text.replace(/\n/g,"Z!a06");             
            text = text.replace(/<br>/g,"Z!a06"); 
            
            text = text.replace(/,/g,"Z!a07");  
            text = text.replace(/;/g,"Z!a08");  
            text = text.replace(/&/g,"Z!a09");  
            
            
            //text = text.replace(/\u25ef/g,"#action-0#@");   //active (open) action;     status=0
            //text = text.replace(/\u25ef/g,"#action-0###@");   //active (open) action;     status=0
            text = text.replace(/\u25ef/g,"#action#@0#");   //active (open) action;     status=0
            
            //text = text.replace(/\u2b24/g,"#action-1#@");   //closed action;            status=1         
            //text = text.replace(/\u2b24/g,"#action-1###@");   //active (open) action;     status=0
            text = text.replace(/\u2b24/g,"#action#@1#");   //active (open) action;     status=0
            
            text.toString();
        }

        return text.trim();
    }

/*
Description: The function bellow removes the Z!strings strings and inserts back the original

*/
    function aux_textSignIn(text, mode)
    {
        if(aux_existence(text))
        {
            text = text.toString();
            text = text.replace(/Z!a01/g,"\'"); 
            text = text.replace(/Z!a02/g,"\""); 
            text = text.replace(/Z!a03/g,"\r"); 
            text = text.replace(/Z!a04/g,"\t"); 
            
            //text = text.replace(/Z!a05/g,"\n");            
            //text = text.replace(/Z!a06/g,"<br>");  

            text = text.replace(/Z!a07/g,",");  
            text = text.replace(/Z!a08/g,";");  
            text = text.replace(/Z!a09/g,"&"); 

            if(parseInt(mode)===1)
            {    
                text = text.replace(/Z!a06/g,"<br>");    
                text = text.replace(/Z!a05/g,"<br>");
            }
            else
            {    
                text = text.replace(/Z!a06/g,"\n");    
                text = text.replace(/Z!a05/g,"\n");
            }
            
            text = text.replace(/#action-0#@/g,"\u25ef");  
            text = text.replace(/#action-0###@/g,"\u25ef");  
            text = text.replace(/#action#@0#/g,"\u25ef"); 
            
            text = text.replace(/#action-1#@/g,"\u2b24");  
            text = text.replace(/#action-1###@/g,"\u2b24"); 
            text = text.replace(/#action#@1#/g,"\u2b24"); 
        }

        return text;
    } 


/*
Description:    The function bellow removes the Z!a06 (\n) strings and inserts Z!a05 (<br>)
                this is only usefull in display mode 

*/
    function aux_textSignInBreaker(text)
    {
        if(aux_existence(text))
        {   text = text.replace(/Z!a06/g,"Z!a05");  }

        return text.toString();  
    }     
    

/* 
Description: 

*/
    function aux_formatToCurrency(text)
    {
        if(aux_existence(text))
        {return text.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");}
    }
 


    function aux_isArray(x){   return x.constructor.toString().indexOf("Array") > -1; }


    function aux_arrInterception(x,y)
    {   
        let newArr = []; 
        let n = false;
        let m = false;
        
        if(Array.isArray(x)){n=true; x=x.map(Number); }
        if(Array.isArray(y)){m=true; y=y.map(Number); }
        
        if(n&&m)
        {
            for(let i10=0, i11=x.length; i10<i11; i10++)
            {
                if(y.indexOf(x[i10])!==-1)
                {   newArr.push(x[i10]); }
            }
    
            for(let i10=0, i11=y.length; i10<i11; i10++)
            {
                if(x.indexOf(y[i10])!==-1)
                {   if(newArr.indexOf(y[i10])===-1){newArr.push(y[i10]); }}
            }
        }

        return newArr; 
    }



    function aux_arrExclude(x,y)
    {   
        let newArr = []; 
        let n = false;
        let m = false;
        
        if(Array.isArray(x)){n=true; x=x.map(Number); }
        if(Array.isArray(y)){m=true; y=y.map(Number); }
        
        if(n&&m)
        {
            for(let i10=0, i11=x.length; i10<i11; i10++)
            {
                if(y.indexOf(x[i10])===-1)
                {   newArr.push(x[i10]); }
            }
    
            for(let i10=0, i11=y.length; i10<i11; i10++)
            {
                if(x.indexOf(y[i10])===-1)
                {   if(newArr.indexOf(y[i10])===-1){newArr.push(y[i10]); }}
            }
        }

        return newArr; 
    }
    
    
/*
Description:
Note: this function is the same as  (function(data){ return new Set(data); })(y);
*/
    function aux_arrSanitizer(y)
    {   
        let newArr = []; 
        
        if(Array.isArray(y))
        {
            for(let i10=0, i11=y.length; i10<i11; i10++)
            {   if(newArr.indexOf(y[i10])===-1){newArr.push(y[i10]); } }
        }

        return newArr; 
    } 
    
    
    function aux_dimensionalSort(a)
    {   return a.sort((x, y)=>{(x[0]>y[0])? 1: -1;}); }
    
    
    function aux_existence(data)
    {
        if((data===null)||(data==="null")){ return false; }
        if((data==="false")||(data===false)){ return false;}     
        if((data===undefined)||(data==="undefined")||(data===""))
        {   return false; }
        else
        {   if((data==="NaN")||(data===NaN)||(data.toString()===NaN.toString())){ return false;}     }

        
        if(typeof data === "object")
        {
            if(Array.isArray(data))
            {   
                let findAnyTrue = false;
                for(let checker of data){   if(aux_existence(checker)){ findAnyTrue = true; break;}   }
                
                return findAnyTrue;
            }
            else
            { 
                if(aux_existence(data.id))
                {   return true; }
                else
                {   return aux_existence(Object.getOwnPropertyNames(data)); }
            }
        }
        
        return true;
    }
    
    


    function aux_stringifyArr(arr)
    {
        let str = "";
        
        arr.forEach((data)=>
        {
            if(aux_existence(data))
            {   str += data; }
        });
        
        return str;
    }



    function aux_twoDigits(m)
    {//not complete
        var d=m;
        if(m<10)
        { 
            if(m<0)
            {  if(m>(-10)){d = "-0" + (parseInt(m)*(-1)); }}
            else
            {  d = "0" + m;}
        }

        return d;
    }
    



//xxxxxxxxxxxxxxxx [ ---colapsers--- ] xxxxxxxxxxxxxxxxxxxxxxxxxx
    
/**
 * Toggles the visibility of menu items in a web interface, managing open/closed states and styles.
 * @param {string} menuButtonElementID - The ID of the menu button to toggle.
 * @param {string} name - The name of the menu (e.g., "Menu" for top-level menus).
 */
function aux_collapseMenuDIV(menuButtonElementID) 
{
    const menuControl = document.getElementById("menuControl");
    const menuIds = menuControl?.value.split(",") || [];
    const isMobile = apps.environment === "mobile";
    let r = document.querySelector(':root');

    /**
     * Checks if an element exists.
     * @param {any} element - The element to check.
     * @returns {boolean} True if the element exists.
     */
    function aux_existence(element) 
    {
        return !!element;
    }

    /**
     * Determines the tab identifier for a menu item.
     * @param {string} menuId - The menu item ID.
     * @param {number} index - The index in the menuIds array.
     * @returns {string} The tab identifier.
     */
    function getTabIdentifier(menuId, index) 
    {
        let tab = menuId.includes("_") ? menuId.slice(menuId.indexOf("_")) : "";
        if (index < 2 && !aux_existence(document.getElementById(`menuArrow${tab}`))) 
        {
            return index === 0 ? "_newAction" : "_report";
        }
        return tab;
    }

    /**
     * Updates the visual style of a menu button and its positioner dots.
     * @param {string} tab - The tab identifier.
     * @param {boolean} isOpen - Whether the menu is open.
     */
    function updateMenuButtonStyle(tab, isOpen) 
    {
        const arrow = document.getElementById(`menuArrow${tab}`);
        const folder = document.getElementById(`menuFolder${tab}`);
        const title = document.getElementById(`menuTitle${tab}`);
        const positionTitle = document.getElementById(`menuPositionTitle${tab}`);

        //if (!arrow || !folder || !title || !positionTitle) return;
        if (!arrow || !title || !positionTitle) return;
        
        arrow.innerText = isOpen ? "\u25bd" : "\u25b6";
        if(apps.environment!=="mobile")
        {   
            if(aux_existence(folder))
            folder.innerText = isOpen ? "🗁" : "🗀";    
        }
        title.style.fontFamily = isOpen ? "Fantasy" : "sans-serif";
        //title.style.fontFamily = isOpen ? "Times New Roman" : "sans-serif";
        //title.style.fontWeight = isOpen ? "bold" : "normal";
        //title.style.fontSize = isOpen ? "20px" : "16px";
        positionTitle.style.padding = isOpen ? "0 0 0 5px" : "5px";
        positionTitle.style.setProperty("--menu_postitle", isOpen ? "#9bc5ae" : "white");
        positionTitle.style.color =  isOpen ? "#9bc5ae" : "white";

        let i = 0;
        while (document.getElementById(`menuPositioner${tab}_${++i}`)) 
        {
            const size = isOpen ? "10px" : "5px";
            document.getElementById(`menuPositioner${tab}_${i}`).style.height = size;
            document.getElementById(`menuPositioner${tab}_${i}`).style.width = size;
        }
    }
    

    /**
     * Adjusts the menu container height for mobile devices.
     */
    function adjustMobileMenuHeight() 
    {
        if (!isMobile) return;

        const menuContainer = document.getElementById("menuContainer");
        const footContainer = document.getElementById("footContainer");
        const menuSelector = document.getElementById(`${isMobile ? "mobile" : apps.environment}_MenuSelector`);

        if (!menuContainer || !footContainer || !menuSelector) return;

        if (!menuSelector.classList.contains("menuPositionerOFF")) 
        {
            menuContainer.style.height = "fit-content";
            menuContainer.style.maxHeight = "fit-content";
        }
    }
    
    
    function closeMenu(menuButtonToClose)
    {
        menuButtonToClose.dataset.menuStatus = 'close';
        updateMenuButtonStyle(`_${menuButtonToClose.dataset.menuIndexer}`, false);
        
        let menus = document.getElementById("openMenu").value.split(",");
        
        let lstmenus = [];
        menus.forEach((m)=>
        {
            if(m!==menuButtonToClose.id)
            {   lstmenus.push(m); }
        });
        
        document.getElementById("openMenu").value = (aux_existence(lstmenus))? lstmenus.join(","): "";
    }
    
    
    function closeDeptherMenu()
    {}

    function openActionBoard(aboard)
    {
        if(aux_existence(aboard))
        {   aboard.style.display = "block"; }
    }
    
    
    function openMenu(newMenu)
    {
        let menuTitleLine = document.getElementById(`menuPositionTitle_${newMenu.dataset.menuIndexer}`);
        
        if(aux_existence(menuTitleLine))
        menuTitleLine.style.color = "#9bc5ae";      //currently Selected color
        
        newMenu.dataset.menuStatus = "open";        
    }
    

    /**
     * Closes all menu buttons (sub-menus) that belong to a different menu group than the specified menu,
     * excluding top-level menu buttons (name="Menu"), and applies close style.
     * @param {string} menuId - The ID of the menu button.
     * @param {string} menuGroup - The menu group of the menu button.
     */
    function closeOtherMenuGroups(newMenuId, menuGroup) 
    {
        const allMenuButtons = document.querySelectorAll(`.menuButton`);      
        const currentMenu = document.getElementById(newMenuId);
        const menuDepthLevel = currentMenu.dataset.menuDepth;
        const menuStatus = currentMenu.dataset.menuStatus;
        const menuIndex = currentMenu.dataset.menuIndexer;
               
               
        for(let mButton of allMenuButtons)
        {
            if (parseInt(mButton.dataset.menuGroup) !== parseInt(menuGroup)) 
            {
                // Step 1.1: Set display:none (except top-menuButtons)
                if(mButton.getAttribute("name")!=="Menu")
                {   mButton.style.display = "none";  }
                
                
                // Step 1.2: Set close style
                if(mButton.id!==newMenuId)
                {   
                    //updateMenuButtonStyle(getTabIdentifier(menuButton.id, menuIds.indexOf(menuButton.id)), false);  
                    let menutab = getTabIdentifier(mButton.id, menuIds.indexOf(mButton.id)); 
                    closeMenu(mButton);
                }
            }
            else
            {
                if(parseInt(mButton.dataset.menuDepth)>=parseInt(menuDepthLevel))
                {
                    if(parseInt(mButton.dataset.menuDepth)>parseInt(menuDepthLevel))
                    {
                        mButton.style.display = "none";
                    }
                    else
                    {
                        if(document.getElementById("openMenu").value.includes(mButton.id))
                        {   closeMenu(mButton); }
                    }
                }
                else
                {
                    if((parseInt(mButton.dataset.menuDepth)===(parseInt(menuDepthLevel)-1))&&(mButton.dataset.menuStatus==="open"))
                    {
                        openActionBoard(document.getElementById(`from${mButton.id}`));
                        openMenu(mButton)
                    }
                }
            }
            
            const actionBoardElement = document.getElementById(`from${newMenuId}`);
            if(aux_existence(actionBoardElement))
            {   
                actionBoardElement.style.display = "none";    
                let elemToChangeColor = document.getElementById(document.getElementById(newMenuId).dataset.previewsMenuId);
                if(aux_existence(elemToChangeColor))
                {   
                    elemToChangeColor.style.color = "#ffffff";  
                    r.style.setProperty('--menu_postitle', '#ffffff');
                }
            }
        }

/*
        // Update openMenu to remove IDs from other groups
        let returner = [];
        let openMenuInput = document.getElementById("openMenu");
        let openMenus = openMenuInput.value.split(",").filter(id => id);
        let depth = parseInt(document.getElementById(newMenuId).dataset.menuDepth);
    
        openMenuInput.value = "";
        allMenuButtons.forEach(menuButton => 
        { 
            if((menuButton.dataset.menuGroup === menuGroup) && (menuButton.dataset.menuDepth<=depth) && (openMenus.includes(menuButton.id)))
            {
                returner.push(menuButton.id);
            }
        });
        
        //openMenuInput.value = returner.join(",");
        openMenuInput.value = returner;
*/        
        
    }

    /**
     * Closes all actionBoard elements except the one related to the specified menu.
     * @param {string} menuId - The ID of the menu button.
     */
    function closeOtherActionBoards(menuId) 
    {
        const currentMenu = document.getElementById(menuId);
        const menuGroup = currentMenu.dataset.menuGroup;
        const menuDepth = currentMenu.dataset.menuDepth;
        const index = currentMenu.dataset.menuIndexer;
        
        const allActionBoards = document.querySelectorAll(`#actionBoard [data-menu-source]:not([data-menu-source="${menuId}"])`);
        for(let actionBoard of allActionBoards)
        {   
            actionBoard.style.display = "none";  
           
            //set all menuTitles to white
            (function()
            {
                let menuChecker = document.getElementById(actionBoard.dataset.menuSource);
                let menuCheckerGroup = menuChecker.dataset.menuGroup;
                let menuCheckerDepth = menuChecker.dataset.menuDepth;
                let indexArr = menuChecker.id.split("_");
                    indexArr.shift();
                    
                let menutitleline = document.getElementById(`menuPositionTitle_${indexArr.join("_")}`);

                menutitleline.style.color = (menuGroup===menuCheckerGroup)? (parseInt(menuDepth)>parseInt(menuCheckerDepth))?  (menuChecker.dataset.menuStatus==="open")? '#e5e5cc': '#ffffff': '#ffffff': '#ffffff';  
                //menutitleline.style.color = (menuGroup===menuCheckerGroup)? (parseInt(menuDepth)>parseInt(menuCheckerDepth))?  (menuChecker.dataset.menuStatus==="open")? '#e5e5cc': updateMenuButtonStyle(`_${index}`, false): updateMenuButtonStyle(`_${index}`, false): updateMenuButtonStyle(`_${index}`, false); 
            })();
        }
/*        
        document.querySelectorAll(`data-menu-source="${menuId}")`).forEach((e)=>
        {
            updateMenuButtonStyle(`_${index}`, false);
        });
*/
    }

    /**
     * Toggles the visibility and style of a menu button and its immediate children.
     * @param {string} menuId - The ID of the menu button to toggle.
     * @param {string} name - The name of the menu.
     */
    function toggleMenu(menuId, name) 
    {
        const menuButton = document.getElementById(menuId);
        if (!menuButton) 
        {
            console.warn(`Menu button with ID ${menuId} not found`);
            return;
        }

        const openMenuInput = document.getElementById("openMenu");
        const openMenus = openMenuInput.value.split(",").filter(id => id);
        const isOpening = !openMenus.includes(menuId);
        const index = menuIds.indexOf(menuId);
        const tab = getTabIdentifier(menuId, index);
        const menuGroup = menuButton.dataset.menuGroup;
        const currentDepth = parseInt(menuButton.dataset.menuDepth, 10) || 0;
        const immediateChildDepth = currentDepth + 1;
        
        let previousMenu;

        // Find the related actionBoard element
        const actionBoardElement = document.querySelector(`#actionBoard [data-menu-source="${menuId}"]`);


        if (isOpening) 
        {
            // Step 1: Close all other data-menu-group elements
            closeOtherMenuGroups(menuId, menuGroup);

            // Step 2: Close all other actionBoard elements
            closeOtherActionBoards(menuId);

            // Step 3: Open menuButtonElementID (set open style)
            menuButton.style.display = "block";
            updateMenuButtonStyle(tab, true);



openActionBoard(actionBoardElement);

openMenu(menuButton);


            // Step 5: Display only immediate children of menuButtonElementID, set them closed (set close style, display:block)
            const allSubMenus = document.querySelectorAll(`.menuButton[name="${menuId}"]`);
            allSubMenus.forEach(subMenu => 
            {   // Display immediate children
                subMenu.style.display = "block"; 
            });


            // Update openMenu value
            if (!openMenuInput.value.split(",").includes(menuId)) 
            {   openMenuInput.value += aux_existence(openMenuInput.value)? `,${menuId}`: menuId;    }
        } 
        else 
        {
            // Step 1: Set all menuButtonElementID.children (immediate children: set close style)
            const allSubMenus = document.querySelectorAll(`.menuButton[data-menu-group="${menuGroup}"]`);
            allSubMenus.forEach(subMenu => 
            {
                if (subMenu.id !== menuId) 
                {
                    const subTab = getTabIdentifier(subMenu.id, menuIds.indexOf(subMenu.id));
                    const subDepth = parseInt(subMenu.dataset.menuDepth, 10) || 0;
                    if (subDepth >= immediateChildDepth) 
                    {   
                        //updateMenuButtonStyle(subTab, false); 
                        closeMenu(subMenu);
                    }// Set close style for immediate children
                    
                }
            });

            // Step 2: Set all menuButtonElementID.children (immediate children: display:none)
            allSubMenus.forEach(subMenu => 
            {
                if (subMenu.id !== menuId) 
                {
                    const subDepth = parseInt(subMenu.dataset.menuDepth, 10) || 0;
                    if (subDepth >= immediateChildDepth) 
                    {
                        subMenu.style.display = "none";

                        // Hide related menu items
                        const menuItems = document.getElementsByName(subMenu.id.replace("from", ""));
                        if (aux_existence(menuItems)) 
                        {
                            Array.from(menuItems).forEach(item => 
                            {
                                item.style.display = "none";
                                const itemActionBoardElement = document.querySelector(`#actionBoard [data-menu-source="${item.id}"]`);
                                if (itemActionBoardElement) 
                                {
                                    itemActionBoardElement.style.display = "none";
                                }
                            });
                        }

                        // Hide the actionBoard element for the sub-menu
                        const subActionBoardElement = document.querySelector(`#actionBoard [data-menu-source="${subMenu.id}"]`);
                        if (subActionBoardElement) 
                        {
                            subActionBoardElement.style.display = "none";
                        }
                    }
                }
            });
/*
            // Step 3: Set menuButtonElementID (set close style)
            updateMenuButtonStyle(tab, false);
            // Remove the menuId from openMenu
            openMenuInput.value = openMenus.filter(id => id !== menuId).join(",");  
*/            
            closeMenu(menuButton);

            if((menuButton.id==="fromMenu_report")||(menuButton.id==="fromMenu_newAction"))
            {   menuButton.style.display = "none"; }
            else
            {
                // Step 4: Set menuButtonElementID (display:block)
                menuButton.style.display = "block";
            }

            // Step 5: Don't worry about other data-menu-group (already handled by not modifying them)

            // Close the actionBoard element for the menu itself
            if (actionBoardElement) 
            {
                actionBoardElement.style.display = "none";
            }

            if(parseInt(menuButton.dataset.menuDepth)>0)
            {
                previousMenu = document.querySelectorAll(`[data-menu-depth='${parseInt(menuButton.dataset.menuDepth)-1}']:not([data-menu-status='close'])`);
                previousMenu.forEach(pmenu=>
                {
                    openActionBoard(document.getElementById(`from${pmenu.id}`));
                    openMenu(pmenu);
                });
            }
        }

        // Adjust mobile menu height
        adjustMobileMenuHeight();

        // Update cover and main container visibility for non-mobile
        if (!isMobile) 
        {
            const coverBoard = document.getElementById("coverBoard");
            const mainContainer = document.getElementById("mainContainer");
            if (openMenuInput.value) 
            {
                coverBoard.classList.remove("openDisplay");
                coverBoard.classList.add("closedDisplay");
                mainContainer.classList.remove("closedDisplay");
                mainContainer.classList.add("openDisplay");
            } 
            else 
            {
                coverBoard.classList.remove("closedDisplay");
                coverBoard.classList.add("openDisplay");
                mainContainer.classList.remove("openDisplay");
                mainContainer.classList.add("closedDisplay");
            }
        }

        coverPage(); // Update the page
    }

    toggleMenu(menuButtonElementID);
}



/*
Description:

*/
function aux_colapseDivItem(itemID, collapseIndexer, mode)
{
    let head    = document.getElementById("head_" + itemID);        
    let body    = document.getElementById("body_" + itemID);
    let foot    = document.getElementById("foot_" + itemID);
    let symbol  = document.getElementById("arrow_" + itemID);
    let dt      = document.getElementById("dt_head_" + itemID); 
    let oa      = document.getElementById("outteraccess_" + itemID); 
    let action  = document.getElementById("aod_opencloseObjStatus_" + itemID); 
    let arrIndex = itemID.split("_");
    //let id = arrIndex.pop();
    let bgArr;
    
    

    
    if(aux_existence(mode))
    {
        if(mode==="edit"){   bgArr = ["#eef4f6","#dee9ed","#dce8ec","#cddee4","#bddrdb","#acc9d2","#8bb3c1"];    }
    }

    
    function symbolSelection(symbol)
    {
        switch(symbol)
        {
            case "down":   return "\u25c1"; 
            case "\u25c1": return "\u25bd"; 
            case "\u25b6": return "\u25bc"; 
            case "\u25bc": return "\u25b6"; 
            case "\u25b7": return "\u25bd"; 
            case "\u25bd": return "\u25b7"; 
            case "\u2b04": return "\u21f3"; 
            case "\u21f3": return "\u2b04"; 
            case "\u2194": return "\u2195"; 
            case "\u2195": return "\u2194"; 
            case "\u2192": return "\u2193";
            case "\u2193": return "\u2192";
            case "\u25ef": return "\u2b24";
            case "\u2b24": return "\u25ef";
        }
                
        return  "";
    }
    
    let getID =function(dataArr, deep, firstProperty)
    {
        let retrofitID;
        switch(parseInt(deep))
        {
            case 1: 
                retrofitID = dataArr; 
                break;
                
            case 2: 
                if(aux_existence(firstProperty)){dataArr.shift();}
                retrofitID = dataArr;
                break;
                
            case 3:
                dataArr.pop();
                if(aux_existence(firstProperty)){dataArr.shift();}
                retrofitID = dataArr;
                break;
                
            case 4:
                dataArr.pop();
                dataArr.pop();
                if(aux_existence(firstProperty)){dataArr.shift();}
                retrofitID = dataArr;
                break;
                
            case 5:
                dataArr.pop();
                dataArr.pop();
                dataArr.pop();
                if(aux_existence(firstProperty)){dataArr.shift();}
                retrofitID = dataArr;                        
        }
        
        return retrofitID;
    };
    
    
    function expansionBubble(arrID, depth, increment, pName, noMoreAllowed)
    {
        if(parseInt(depth)>1)
        {
            depth--;  
            
            if(!aux_existence(noMoreAllowed))
            {
                if(aux_existence(bgArr))
                {
                    body.style.backgroundColor=bgArr[parseInt(depth)];                
                    noMoreAllowed = true;
                }
            }
            

/*                        
            if(!aux_existence(pName))
            {   pName = `${arrID.shift()}_`; }
            else
            {   
                if(arrID.length>1)
                {   arrID.pop(); } 
                else
                {   pName=""; }
            }
*/


            if(depth>1)
            {
                thisID = `${arrID.join("_")}`;
                arrID.shift();     
            }
            else
            {
                if(arrID[depth]!=="newAction")
                {
                    if(isNaN(arrID[0]))
                    {
                        thisID = `${arrID.join("_")}`;
                        arrID.shift();
                    }
                    else
                    {
                        arrID.pop();
                        thisID = `${arrID.join("_")}`;
                    }
                }
                else
                {
                    thisID = `${arrID.join("_")}`; 
                    arrID.shift(); 
                }
            }
            //document.getElementById("body_" + pName + thisID).style.maxHeight =  parseInt(document.getElementById("body_" + pName + thisID).scrollHeight) + parseInt(increment) + "px";
            
            document.getElementById("body_" + thisID).style.maxHeight =  "fit-content"; //parseInt(document.getElementById("body_" + thisID).scrollHeight) + parseInt(increment) + "px";
            expansionBubble(arrID, depth, increment, pName, noMoreAllowed);
        }
        else
        {   
            if(arrID.length>1)
            {   
                thisID = `${arrID.join("_")}`;
                
                //document.getElementById("body_" + thisID).style.maxHeight =  parseInt(document.getElementById("body_" + thisID).scrollHeight) + parseInt(increment) + "px";
                document.getElementById("body_" + thisID).style.maxHeight =  "fit-content";    // parseInt(document.getElementById("body_" + thisID).scrollHeight) + parseInt(increment) + "px";
                expansionBubble(arrID, 3, increment, "Links_", noMoreAllowed); 
            }   
            else
            {   
                //document.getElementById("body_" + arrID[0]).style.maxHeight =  parseInt(document.getElementById("body_" + arrID[0]).scrollHeight) + parseInt(increment) + "px";  
                document.getElementById("body_" + arrID[0]).style.maxHeight =  "fit-content";      //parseInt(document.getElementById("body_" + arrID[0]).scrollHeight) + parseInt(increment) + "px";  
            }
        }
    }


    function bubbleReport(arrID, depth, increment)
    {
        if(parseInt(depth)>1)
        {
            thisID = `${arrID.join("_")}`;
            
            if(aux_existence(document.getElementById("body_" + thisID)))
            {
                //document.getElementById("body_" + thisID).style.maxHeight =  parseInt(document.getElementById("body_" + thisID).scrollHeight) + parseInt(increment) + "px";
                document.getElementById("body_" + thisID).style.maxHeight =   "fit-content";    //parseInt(document.getElementById("body_" + thisID).scrollHeight) + parseInt(increment) + "px";
                
                depth--;  arrID.pop();
            
                bubbleReport(arrID, depth, increment);
            }
        }
        else
        {   
            if(aux_existence(document.getElementById("body_" + thisID)))
            //{document.getElementById("body_" + arrID[0]).style.maxHeight =  parseInt(document.getElementById("body_" + arrID[0]).scrollHeight) + parseInt(increment) + "px";  }
            document.getElementById("body_" + arrID[0]).style.maxHeight =  "fit-content";     //parseInt(document.getElementById("body_" + arrID[0]).scrollHeight) + parseInt(increment) + "px";  }
        }
    }


    function getFirstCollapse(b)
    {   
        //body.style.maxHeight = `${b}px`; 
        body.style.maxHeight = "fit-content";
        body.style.overflow = "hidden";   
            
        if(parseInt(b)>0)
        {
            b=b-10;
            if(parseInt(b)<0){ b=0;}
            setTimeout(function(){ getFirstCollapse(b); }, 0.4);    
        }
    }
    
    
    
    function retraction()
    {
        head.style.whiteSpace = "nowrap";
        body.style.maxHeight = null;   
        if(aux_existence(foot)){foot.style.maxHeight = null;  }
    }
    
    function bubbleSelector(indexer, a,b,c)
    {
        if((indexer.includes("report-PO"))||
           (indexer.includes("report-PI"))||
           (indexer.includes("report-PE"))||
           (indexer.includes("report-PB")))
        
        {   bubbleReport(a, b, c); }
        else
        {   expansionBubble(a, b, c); }
    }
    
    
    if(symbol.dataset.symbolCode)
    {   
        if(symbol.innerText===symbol.dataset.symbolCode)
        {symbol.innerText = symbolSelection(symbol.innerText);}
        else
        {symbol.innerText = symbolSelection("down");}
    }
    else
    {   symbol.innerText = symbolSelection(symbol.innerText);}
    
    
    if(aux_existence(body))
    {
        if(!body.classList.contains("collapse_InOut"))
        {   
            head.style.whiteSpace = "nowrap";
            
            
            if(body.style.display==="block")
            {   
                //getFirstCollapse(body.scrollHeight); 
                body.style.display = "none"; 
                foot.style.display = "none"; 
                body.classList.add('collapse_InOut'); 
            }
            else
            {
                body.classList.add('collapse_InOut'); 
                body.style.display = "block"; 
                foot.style.display = "block"; 
                //body.style.maxHeight = `${body.scrollHeight}px`; 
                
                if(aux_existence(collapseIndexer))
                {   bubbleSelector(itemID, arrIndex, collapseIndexer, body.scrollHeight);  }
            }
        }
        else
        {
            if(aux_existence(action))
            {
                if(parseInt(action.value)!==1)
                { 
                    head.style.whiteSpace = "nowrap";
                    dt.style.display="block";
                    dt.style.maxHeight = "fit-content";; 
                    
                    if(aux_existence(oa))
                    {
                        oa.style.maxHeight = "fit-content"; //"23px";
                        oa.style.display="block";                             
                    }
        
                    body.style.maxHeight = null;   
                    if(aux_existence(foot)){foot.style.maxHeight = null;  }
                    action.value="1";
                    let id = getID(arrIndex, collapseIndexer, true);
                    
                    if(document.getElementById("aod_module_" + itemID).value==="edit")
                    {   frame.Display.Detail.Action.Placer("", "", itemID, id[0]); }
                }
                else
                {   
                    action.value="0";
                    head.style.whiteSpace = "unset";
                    dt.style.maxHeight = "0px";
                    dt.style.display="none";  
                    
                    if(aux_existence(oa))
                    {
                        oa.style.maxHeight = "0px";
                        oa.style.display="none";                             
                    }
                    
                    //body.style.maxHeight = body.scrollHeight + "px"; 
                    let bHeight = body.scrollHeight;
body.style.maxHeight = "fit-content";
                    if(aux_existence(foot)){foot.style.maxHeight = "fit-content"; /*foot.scrollHeight + "px"; */ bHeight += foot.scrollHeight;}
                    if((aux_existence(arrIndex))&&(aux_existence(collapseIndexer)))
                    {   bubbleSelector(itemID, arrIndex, collapseIndexer, bHeight);  }
                } 
            }
            else
            {
                if(((aux_existence(body.style.maxHeight))&&(body.style.maxHeight!="0px")))
                { 
                    head.style.whiteSpace = "nowrap";
                    body.style.maxHeight = null; 
                    body.style.display = "none"; 
                    if(aux_existence(foot)){foot.style.maxHeight = null;  foot.style.display = "none"; }
                    
                }
                else
                {   
                    head.style.whiteSpace = "unset";
                    //body.style.maxHeight = body.scrollHeight + "px"; 
                    let bHeight = body.scrollHeight;
                    body.style.display = "block"; 
body.style.maxHeight = "fit-content";
                    if(aux_existence(foot)){foot.style.maxHeight = "fit-content";  bHeight += foot.scrollHeight; foot.style.display = "block"; }
                    
                    if(aux_existence(collapseIndexer))
                    {   bubbleSelector(itemID, arrIndex, collapseIndexer, bHeight); }
                    else
                    {   /*body.style.maxHeight = bHeight + "px";  */ body.style.maxHeight = "fit-content";}
                } 
            }              
        }
    }
}  


  
/*
Description:

*/
function aux_collapseBox(itemID)
{
    let mode    = document.getElementById("aod_mode_" + itemID);
    let head    = document.getElementById("head_" + itemID);        
    let body    = document.getElementById("body_" + itemID);
    let foot    = document.getElementById("foot_" + itemID);
    let symbol  = document.getElementById("headsymbol_" + itemID); 
    
    let headBottom = document.getElementById("headbottom_" + itemID);
    let headGraph = document.getElementById("headGraph_" + itemID);  


    
    function symbolSelection(symbol)
    {
        switch(symbol)
        {
            case "requestpointleft":   return "\u25c1";    //case:  => return white-left-pointing triangle 
            case "requestpointdown":   return "\u25bd";    //case:  => return white-down-pointing triangle 
            case "\u25b6": return "\u25bc";     //case: black-right-pointing triangle => return black-down-pointing triangle
            case "\u25bc": return "\u25b6";     //case: black-down-pointing triangle  => return black-right-pointing triangle 
            case "\u25b7": return "\u25bd";     //case: white-right-pointing triangle => return white-down-pointing triangle
            case "\u25bd": return "\u25b7";     //case: white-down-pointing triangle  => return white-right-pointing triangle 
            case "\u2b04": return "\u21f3"; 
            case "\u21f3": return "\u2b04"; 
            case "\u2194": return "\u2195"; 
            case "\u2195": return "\u2194"; 
            case "\u2192": return "\u2193";
            case "\u2193": return "\u2192";
            case "\u25ef": return "\u2b24";
            case "\u2b24": return "\u25ef";
            case "\u25c9": return "\u25c9";
        }
                
        return  "";
    }
    

    function expansionBubble(currentID, increment, bubbleStopper)
    {   
        let stopBubble = false;
        let parentID = document.getElementById(currentID).parentNode.id;
        
        if(aux_existence(bubbleStopper))
        {
            if((currentID===bubbleStopper)||(parentID===bubbleStopper))
            {   stopBubble = true; }
        }
        
        
        if((aux_existence(parentID))&&(!stopBubble))
        {
            let parentElement   = document.getElementById(parentID);
            let newParentHeight = Number(parentElement.scrollHeight) + Number(increment);  
            
            //parentElement.style.maxHeight   = newParentHeight + "px";
              parentElement.style.maxHeight   = "fit-content";
            
            expansionBubble(parentID, increment, bubbleStopper);
        }
    }


    function reverseBubble(currentID, deduction, bubbleStopper) 
    {
        let stopBubble = false;
        let parentID = document.getElementById(currentID).parentNode.id;

        if (aux_existence(bubbleStopper)) 
        {
            if (currentID === bubbleStopper || parentID === bubbleStopper) 
            {   stopBubble = true;  }
        }

        if (aux_existence(parentID) && !stopBubble) 
        {
            let parentElement = document.getElementById(parentID);
            let parentHeight = Number(parentElement.scrollHeight);
        
            parentElement.style.maxHeight = "fit-content";
        
            reverseBubble(parentID, deduction, bubbleStopper);
        }
    }


  
    //if(aux_existence(symbol))
    //{   symbol.innerText = symbolSelection(symbol.innerText);   }
    
    if(symbol.dataset.symbolCode)
    {   
        if(symbol.innerText===symbol.dataset.symbolCode)
        {symbol.innerText = symbolSelection("requestpointdown");}
        else
        {symbol.innerText = symbolSelection("requestpointleft");}
    }
    else
    {   symbol.innerText = symbolSelection(symbol.innerText);}
    
    
    if(aux_existence(body))
    {    
        if(body.getAttribute("class").includes("openDisplay"))                   
        { 
            let bHeight = body.scrollHeight;
            if(aux_existence(foot))
            {
                foot.style.maxHeight = foot.scrollHeight + "px";  
                bHeight += foot.scrollHeight; 
                foot.classList.remove("openDisplay");
            }
            
            body.classList.remove("openDisplay");
            
            if(aux_existence(headBottom)) headBottom.style.display = "block";
            if(aux_existence(headGraph)) headGraph.style.display = "block";
            
            reverseBubble(itemID, bHeight, document.getElementById("head_" + itemID).getAttribute("stopbubbleat")); 
            
            //head.style.whiteSpace = "nowrap";
            //body.style.maxHeight = null; 
            //body.classList.add("closedDisplay");
            csshandler_actionheadRetracted(head, body, foot);
            
            if(aux_existence(foot))
            {
                foot.style.maxHeight = null;  
                foot.classList.add("closedDisplay"); 
            } 
        }
        else
        {           
            if(aux_existence(headBottom)) headBottom.style.display = "none";
            if(aux_existence(headGraph)) headGraph.style.display = "none";
            
            body.classList.remove("closedDisplay");
            
            
            
            let bHeight = body.scrollHeight;
            
            body.style.maxHeight =  "fit-content";
            if(aux_existence(foot))
            {
                foot.classList.remove("closedDisplay");
                //foot.style.maxHeight = foot.scrollHeight + "px";  
                bHeight += foot.scrollHeight; 
                foot.classList.add("openDisplay");
            }

            if(aux_existence(head))
            { 
                //head.style.whiteSpace = "unset"; 
                csshandler_actionheadExpanded(head, body, foot);
                expansionBubble(itemID, bHeight, document.getElementById("head_" + itemID).getAttribute("stopbubbleat")); 
            }
            
            body.classList.add("openDisplay");  
             
        }  
    }
}  
  
  
      
/*
            called from 
                this.pageConfig.loadPage.(function())()
                frame.ActionBoard.Displayer.bodyReturner.body()
                frame.ActionBoard.Displayer.bodyReturner.framePropertyBody.structuralAssembler()
                frame.Display.Detail.objectificator.actionObject.object_format()
                auxPanel.Instructions.formatMessage()
                frame.Display.Detail.report.Report_PI/...PO/...PE/...PB
*/            
//function collapseBox(ddata, [simbol, title, tail, extra1, extra, stopper], [bdata, allowedEmpty], fdata, blockID, classarr)
function collapseBlock(ddata, header, boded, footer, blockID, classArr)
{
    function collapseBoxSymbol(index)
    {
        if(parseInt(index)==1){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol\">\u25b6</span>"; }                    //black-right-pointing triangle
        if(parseInt(index)==2){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol\">\u25bc</span>"; }                    //black-down-pointing triangle
        if(parseInt(index)==3){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol\">\u25bd</span>"; }                    //white-down-pointing triangle
        if(parseInt(index)==4){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol closedActionArrow\">\u25b6</span>"; }
        if(parseInt(index)==5){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol\">\u25b7</span>"; }                    //white-right-pointing triangle
        if(parseInt(index)==6){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol\">\u25c9</span>"; }                    //circle
        
        return  "";
    }
    
    let returner="",
        data="",
        head="", 
        body="", 
        foot="";
        [mainclass, headclass, bodyclass, footclass] = classArr;
        
        
    
        data =  ((a, b)=>{
                            return  "<div id=\"data_" + a + "\">" + 
                                        b +
                                    "</div>";
                })(blockID[0], ddata);
                
        head =  ((a, b, [thisbody, linkSetter], hclass)=>{

                                    let [
                                            symbol,             //(1)
                                            title,              //(2): title of the block
                                            tail,               //(3)
                                            extra1,             //(4)
                                            extra2,             //(5)
                                            stopper,            //(6): stop the bubble   
                                            onclick,            //(7): extra function called
                                            groupname           //(8): 
                                        ] = b;
                                        
                                            tail        = (aux_existence(tail))? tail: "",               //(3)
                                            extra1      = (aux_existence(extra1))? extra1: "",             //(4)
                                            extra2      = (aux_existence(extra2))? extra2: "",             //(5)
                                            stopper     = (aux_existence(stopper))? stopper: "",            //(6): stop the bubble   
                                            onclick     = (aux_existence(onclick))? onclick: "",            //(7): extra function called
                                            groupname   = (aux_existence(groupname))? groupname: ""           //(8): 
                                            
                                    
                                    let click = (aux_existence(onclick))? "onclick=\"" +  onclick[0] + "('" + a + "','" + onclick[1] + "')\"" : "";
                                    let newSymbol = ((!aux_existence(thisbody))&&(!aux_existence(linkSetter)))? 6: symbol;
                                    
                                    //if((aux_existence(title))&&(aux_existence(thisbody))&&(!aux_existence(linkSetter)))
                                    if((aux_existence(title))&&(!aux_existence(linkSetter)))
                                    //if(aux_existence(title))
                                    {
                                        return "<div id=\"head_" + a + "\" class=\"header\" stopbubbleat=\"" + stopper + "\" onclick=\"aux_collapseBox('" + a + "')\">" + 
                                                    "<div id=\"headtop_" + a + "\" " + click + " class=\"" + hclass[0][0] + "\">" +
                                                        //collapseBoxSymbol(symbol) +  
                                                        collapseBoxSymbol(newSymbol) + 
                                                        "<span id=\"headfolder_" + a + "\"  class=\"" + hclass[0][1] + "\"></span>" +
                                                        "<span id=\"headtitle_" + a + "\"   class=\"" + hclass[0][2] + "\">" + title + "</span>" +
                                                        "<span id=\"headtail_" + a + "\" class=\"tail\">" + tail + "</span>" +
                                                    "</div>" +
                                                    "<div   id=\"headsupport_" + a + "\"  class=\"" + hclass[1][0] + "\">" +
                                                        "<span id=\"headsupport_1_" + a + "\"   class=\"" + hclass[1][1] + "\">" + extra1 + "</span>" +
                                                        "<span id=\"headsupport_2_" + a + "\"   class=\"" + hclass[1][2] + "\">" + extra2 + "</span>" +
                                                    "</div>" +
                                                "</div>"; 
                                    }
                                    
                                    return "";
                                })(blockID[0], header, boded, headclass);
        
        body =  ((a, b, bclass)=>{
                                let thisbody = (aux_existence(b[0]))? b[0]: "";
                                return  "<div id=\"body_" + a + "\" class=\"" + bclass + "\">" + 
                                            thisbody +
                                        "</div>";
                            })(blockID[0], boded, bodyclass);
                
        foot =  ((a, b, fclass)=>{
                    
                                return  "<div id=\"foot_" + a + "\" class=\"" + fclass + "\">" + 
                                            b +
                                        "</div>";
                            })(blockID[0], footer, footclass);                                
                
                
                
        returner =  "<div id=\"" + blockID[0] + "\"  name=\"" + blockID[1] + "\" groupindex=\"" + blockID[2] + "\" class=\"collapseBlock " + mainclass + "\" >" + 
                        data +
                        head +
                        body + 
                        foot + 
                    "</div>";       

    return returner;
}
  
  
  
function aux_headSymbol(index, id)
{ 
    if(parseInt(index)==1){ return `<span id="headsymbol_${id}" class="boxsymbol">\u25b6</span>`; }        //black-right-pointing triangle
    if(parseInt(index)==2){ return `<span id="headsymbol_${id}" class="boxsymbol">\u25bc</span>`; }        //black-down-pointing triangle
    if(parseInt(index)==3){ return `<span id="headsymbol_${id}" class="boxsymbol">\u25bd</span>`; }        //white-down-pointing triangle
    if(parseInt(index)==4){ return `<span id="headsymbol_${id}" class="boxsymbol closedActionArrow">\u25b6</span>`; }
    if(parseInt(index)==5){ return `<span id="headsymbol_${id}" class="boxsymbol">\u25b7</span>`; }        //white-right-pointing triangle
    if(parseInt(index)==6){ return `<span id="headsymbol_${id}" class="boxsymbol">\u25c9</span>`; } //circle
    
    return  `<span id="headsymbol_${id}" class="boxsymbol">\u25bc</span>`;    
}



function aux_collapseSymbol(index)
{
    if(parseInt(index)==1){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol\">\u25b6</span>"; }                    //black-right-pointing triangle
    if(parseInt(index)==2){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol\">\u25bc</span>"; }                    //black-down-pointing triangle
    if(parseInt(index)==3){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol\">\u25bd</span>"; }                    //white-down-pointing triangle
    if(parseInt(index)==4){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol closedActionArrow\">\u25b6</span>"; }
    if(parseInt(index)==5){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol\">\u25b7</span>"; }                    //white-right-pointing triangle
    if(parseInt(index)==6){ return "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol\">\u25c9</span>"; }                    //circle
    
    return  "<span id=\"headsymbol_" + blockID[0] + "\" class=\"boxsymbol\">\u25bc</span>";
} 
 
 
 
function aux_htmlElementCreator(element)
{
    let {type, id, name, objcontent, objdata, objclass} = element;
    
}



function aux_collapser({index:{indexID, indexName, indexGroup, indexClass}, head, body, foot})
{
    let thisHead =  ((indexer, {classHeader, dataHeader})=>
                    {   return `<div id='head_${indexer}' class='${classHeader}'  data-structure-section='head' data-collapser='${indexer}'>${dataHeader}</div>`; })(indexID, head);
        
        
    let hisBody =  ((indexer, {classBody, dataBody})=>
                    {   return `<div id='body_${indexer}' class='${classBody}' data-structure-section='body' >${dataBody}</div>`; })(indexID, body);
        
        
    let thisFoot = ((indexer, {classFooter, dataFooter})=>
                    {   return `<div id='foot_${indexer}' class='${classFooter}' data-structure-section='foot' >${dataFooter}</div>`; })(indexID, foot);                               
                
                
                
    return  `<div id='${indexID}'  name='${indexName}' data-group='${indexGroup}' class='${indexClass.join(" ")}' >
                ${thisHead} 
                ${thisBody} 
                ${thisFoot}  
            </div>`; 
}
  
 
  
