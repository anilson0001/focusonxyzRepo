/*
document.getElementById("3FPiramide").addEventListener('click', function() 
{  
    openModal(
            'piramide',
            'Hierarchy Piramide',
            '3FP: TripleFocus Performance(TextBreaker)3Fpts: TripleFocus Points'
            );    
});
*/

document.getElementById("footContainer")?.addEventListener('click', function() 
{  
    let footBoard = document.getElementById("footBoard");
    let ph = getComputedStyle(document.documentElement).getPropertyValue('--pageBody');
    if(footBoard.classList.value.includes("openDisplay"))
    {   
        let fc = document.getElementById("footContainer").offsetHeight;
        let fb = footBoard.offsetHeight;
        
        if(fc<fb)
        {   document.getElementById("footContainer").style.height = `${fb}px`;  }
        else
        {   document.getElementById("footBoard").style.height = `${fc}px`;}
    }
    else
    {   document.getElementById("footContainer").style.height = `${ph}px`;  }
});




document.addEventListener("click",(e)=>
{
    try
    {
        if(e.target.matches("[data-focus-onoff='true']"))
        {   
            let doc = document.getElementById(e.target.id);
            let indexArr = e.target.id.split("_");
            let [mode, property, id, cntB, cntSB, cntSBE] = indexArr;
            let permission = e.target.getAttribute("removepermission");
            let frameid = document.getElementById(`${mode}_${property}_${id}_${cntB}_0`).value;
            
            if(aux_existence(permission))
            {
                if(permission==="main")
                {
                    //let [mode, property, id, block, element] = indexArr;
                    let frameid = document.getElementById(`${mode}_${property}_${id}_${cntB}_0`).value;
                    document.getElementById(`${mode}_${property}_${id}_foot_1`).setAttribute("data-property-block", cntB);
                    //document.getElementById(`${mode}_${property}_${id}_foot_1`).setAttribute("data-property-element", cntBE);
                    document.getElementById(`${mode}_${property}_${id}_foot_1`).setAttribute("data-property-frameid", frameid);  
                }
                
                if(permission==="sub")
                {
                    //let [mode, property, id, block, blockelement, sblock, selement] = indexArr;
                    //let frameid = document.getElementById(`${mode}_${property}_${id}_${cntB}_0`).value;
                    let frameid = document.getElementById(`${mode}_${property}_${id}_${cntB}_${cntSB}_0`).value;
                    document.getElementById(`${mode}_${property}_${id}_foot_1`).setAttribute("data-property-block", `${cntB}_${cntSB}`);
                    document.getElementById(`${mode}_${property}_${id}_foot_1`).setAttribute("data-property-frameid", frameid);                
                }
                focusDetectedAt = `${mode}_${property}_${id}_foot_1`;
            }
            else
            {
                if(aux_existence(document.getElementById(`${mode}_${property}_${id}_foot_1`)))
                {
                    document.getElementById(`${mode}_${property}_${id}_foot_1`).setAttribute("data-property-block", "");
                    document.getElementById(`${mode}_${property}_${id}_foot_1`).setAttribute("data-property-frameid", "");    
                }
            }
            
            
            let titleActivation = false, descriptionActivation = false;
            let tIndex, dIndex;
            
            tdoc = document.getElementById(`${mode}_Title_${id}_${cntB}_1`);
            if(tdoc)
            {
                if(tdoc.value.length > 2 )
                titleActivation = true;
            }
            
            ddoc = document.getElementById(`${mode}_Description_${id}_${cntB}_1`);
            if(ddoc)
            {
                if(ddoc.querySelector(".editor").innerText.length > 10 )
                descriptionActivation = true;
            }
        
            if(titleActivation && descriptionActivation)
            {
                let bai = document.getElementById(`button_${id}_airev`);
                
                if(bai)
                {
                    bai.classList.remove("disableButton");
                }
            }
        
            apps.eventCaller = true;
        }
            
        
        if(e.target.matches("div[button-type='RemovalButton']"))
        {   
            console.log(e.target);
            
            let index  = e.target.id;        
            let cntB   = e.target.dataset.propertyBlock;
            let frameid       = e.target.dataset.propertyFrameid;           //e.target.getAttribute("data-action-id");
            let [mode, property, id, footB, footBE] = e.target.id.split("_");
            
            
            if(cntB.includes("_"))
            {   
                let [cntb, cntsb]       = cntB.split("_"); 
                frmEdit.eAction.eBody.eProperty.requestFrameBlockFromButton(property, id, frameid, true, true, cntb, cntsb); 
            }
            else
            {   frmEdit.eAction.eBody.eProperty.requestFrameBlockFromButton(property, id,  "", true, false, cntB);   }
            
            apps.eventCaller = true;
        }
        
    
        //if(e.target.matches(".menuButton"))
        if(e.target.matches("[data-element-family='menuButton']"))
        {
            document.getElementById("actionBoard").classList.remove("closedDisplay");
            document.getElementById("actionBoard").classList.add("openDisplay");
        }
        
        
        if((e.target.matches(`#${apps.environment}_userTitle`))||(e.target.matches("#ucb_exit")))
        {
            let ucb     = document.getElementById("userConfiguratioBoard");
            let title   = document.getElementById(`${apps.environment}_headTitle`);
            let user    = document.getElementById(`${apps.environment}_userTitle`);
            
            if(ucb.classList.value.includes("closedDisplay"))
            {
                title.classList.remove("pTitle-fw");
                user.classList.add("userInfoActive");
                
                document.getElementById("dataBoard").classList.remove("openDisplay");
                document.getElementById("dataBoard").classList.add("closedDisplay");  
                
                document.getElementById("coverBoard").classList.remove("openDisplay");
                document.getElementById("coverBoard").classList.add("closedDisplay"); 
                
                document.getElementById("actionBoard").classList.remove("openDisplay");
                document.getElementById("actionBoard").classList.add("closedDisplay"); 
    
                ucb.classList.remove("closedDisplay");     
                ucb.classList.add("openDisplay");
            }
            else
            {
                title.classList.add("pTitle-fw");
                user.classList.remove("userInfoActive");                
                
                document.getElementById("dataBoard").classList.remove("openDisplay");
                document.getElementById("dataBoard").classList.add("closedDisplay");  

                document.getElementById("actionBoard").classList.remove("openDisplay");
                document.getElementById("actionBoard").classList.add("closedDisplay"); 
    
                ucb.classList.remove("openDisplay");     
                ucb.classList.add("closedDisplay");    
                
                document.getElementById("coverBoard").classList.remove("closedDisplay");
                document.getElementById("coverBoard").classList.add("openDisplay");                 
            } 
        }
        
        
        if(e.target.matches(".uconfigboard"))
        {

        }
        
        
        if(e.target.matches("[framecaller]"))
        {
            let frameid = e.target.getAttribute("framecaller");
            let [emode, property, id, cntb, cntsb] = e.target.id.split("_");
            
            let subFrameBlock   = ((cntb!=="head")&&aux_existence(cntsb))? true: false;
        
            
            frmEdit.eAction.eBody.eProperty.requestFrameBlockFromButton(property, id, frameid, false, subFrameBlock, cntb, cntsb);
            apps.eventCaller = true;
        }  
        
        
        if(e.target.matches("button[data-link-copy]"))
        {
            const linkToCopy = e.target.dataset.linkCopy;
            //document.execCommand("copy", false, linker)
            
            
            navigator.clipboard.writeText(linkToCopy)
            .then(() => {
                console.log('Link copied to clipboard:', linkToCopy);
                // Optional: Show user feedback, e.g., alert('Copied!') or tooltip
            })
            .catch(err => {
                console.error('Failed to copy link:', err);
                // Fallback for older browsers or permission issues
                alert('Copy failed. Please copy manually.');
            });
        
        
        }
            
            
        if(e.target.matches(".qrcode"))
        {
            let aeRef = e.target.dataset.actionEref;
            const targetURL = `https://focusonxyz.com?id=${aeRef}123456789ABCDEF${apps.uniqueData.uDB}`;

                // Build footer with link + copy button
            const footerHTML = `
                <div class="qrFooterLinkBox" style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                    <a id="qrFooterLink" href="${targetURL}" target="_blank" rel="noopener noreferrer"
                        style="word-break:break-all; text-decoration:underline;">${targetURL}
                    </a>
                    <button id="qrCopyBtn" type="button" data-link-copy='${targetURL}' style="cursor:pointer;">
                        Copy Link
                    </button>
                </div>
            `;

            openModal('', e.target.dataset.actionHead, footerHTML, targetURL);
        }
        
        
        if(!aux_existence(apps.eventCaller))
        {        
            if(e.target.matches("[data-report-title]"))
            {   
                console.log(e.target);
                aux_collapseBox(e.target.dataset.reportId);
            }
        
            
            let focusDetectedAt;
            
            if(e.target.className==="mainPropertyElement")
            {   
                let btn = e.target.children[1];
                if(aux_existence(btn.getAttribute("data-removeblock")))
                {  
                    //let property    = btn.dataset.property;
                    let dataid      = btn.dataset.id;
                    let arr         = btn.id.split("_");
                    let removeIndex = (arr.length>5)? true: arr[4];
                    let removalObj;
                    arr.pop();
                    arr.shift();
                    let indexSet    = `${arr.join("_")}_0`;
                        frameid     = document.getElementById(`${indexSet}`).value;
        
                    
                    const [actiondefiner, mode, property, id, block, blockElement, sblock] = btn.id.split("_");
                    
                    btn.setAttribute("data-removeblock","false");
                    frmEdit.eAction.eBody.eProperty.requestFrameBlockFromButton(property, id, frameid, true, (aux_existence(sblock))? true: false, block, blockElement, sblock);
                }
            }
            
            document.querySelectorAll("div[data-property-block]").forEach((bRemove)=>
            {
                if(bRemove.id!==focusDetectedAt)
                {
                    bRemove.setAttribute("data-property-block", "");
                }
            });
            
            apps.eventCaller = true;
        }
        else
        {   apps.eventCaller = ""; }
    }
    catch (err)
    {
        console.log("problem with global eventListener: ", err);
    }
    
}, false);


document.addEventListener("change",(e)=>
{
    console.log("select changed");
    if(aux_existence(apps.eventCaller))
    {   apps.eventCaller = ""; }
    else
    {
        if(e.target.matches("[headselector]"))
        {
            //alert(`${e.target.dataset.actionProperty}: ${e.target.value}`);
            
            apps.eventCaller = e.target.dataset.actionProperty;
            //console.log(e.target);
            

            let property    = e.target.dataset.actionProperty;
            let dataid      = e.target.dataset.actionid;
            let indexer     = `${property}_${dataid}`;
            
            let selector    = e.target.options[e.target.selectedIndex];
            //let selectValue = selector.value;
            let selectText  = selector.textContent;
            
            let dataFrame = eval(property).frame.returner();
            //let obj = new objFB(`${property}_${dataid}`);                
            
            //let dIndexer = selector.dataset.index;
            //obj.head.data.push(selector.dataset.index)
            
            
            loadDataFromStore("PerformanceStore", "Indicators", "", frmEdit.eAction.eBody.eProperty.selectorFrameBlock, {key:selector.dataset.index, value:selector.value}, e.target, dataFrame);  
            
            document.getElementById(`edit_${indexer}_head_2`).selectedIndex = 0;
        }
        
        
        if(e.target.matches("[data-action-property-linked]"))
        {   
            apps.eventCaller = "Links";
            
            let refDocID    = e.target.getAttribute("data-action-property-linked");            
            let dataid      = e.target.dataset.actionid;
            let index       = e.target.id;
            let [mode, property, id, cntb, cntbe] = index.split("_");
            let selector, otherCounters=refDocID;
            
            if(aux_existence(refDocID))
            {
                let datalist = document.getElementById(`list_${index}`);
                if(aux_existence(datalist))
                {   
                    selector = Array.from(datalist.options).find(option => 
                    {
                        let sel = e.target.value.trim();
                        let opt = option.value.trim();

                        return (sel.length < 45)? opt === sel: opt.includes(sel);
                    });
                }
                else
                {   selector = e.target.options[e.target.selectedIndex];     }
                
                if(aux_existence(selector))
                {
                    document.getElementById(`${mode}_${property}_${id}_${cntb}_${refDocID}`).value = selector.id;
                    e.target.dataset.actionSelected = (aux_existence(selector.id));
                    
                    while(true)
                    {
                        otherCounters++;
                        let otherElement = document.getElementById(`${mode}_${property}_${id}_${cntb}_${otherCounters}`);
                        if(aux_existence(otherElement))
                        {
                            otherElement.disabled = (!aux_existence(selector.id)? aux_existence(selector.parentElement.id): true);
                            otherElement.value = "";
                        }
                        else
                        {   break; }
                    }                 
                }
            }
            

        }
        
        
        if(e.target.matches("[data-resource-property]"))
        {   
            apps.eventCaller = true;
            
            let dataid      = e.target.dataset.actionid;
            let index       = e.target.id;
            
            let [mode, property, id, cntb, cntbe] = index.split("_");
            let refDocID = e.target.getAttribute("data-resource-property");
            
            let frameid  = e.target.value;
            let sframeid = "";
            
            switch(e.target.options[e.target.selectedIndex].textContent)
            {
                case "Contacts":
                    sframeid = "71"; break;
                    
                case "Locations":
                    sframeid = "72"; break;
                    
                case "Variables":
                    sframeid = "73"; break;
                    
                case "Transactions":
                    sframeid = "74"; break;
            }
            
            document.getElementById(`${mode}_${property}_${id}_${cntb}_${refDocID}`).setAttribute("framecaller", sframeid);
            //document.getElementById(`${mode}_${property}_${id}_${cntb}_${refDocID}`).setAttribute("subframeblockelem", "");
        }
        
        
        if(e.target.matches("[data-action-property='Category']"))
        {   
            apps.eventCaller = "Category";
            console.log(e.target);
            

            let property    = e.target.dataset.actionProperty;
            let dataid      = e.target.dataset.actionid;
            let index       = e.target.id;
            
            let selector    = e.target.options[e.target.selectedIndex];
            let selectValue = selector.value;
            let selectText  = selector.textContent;
            
            console.log(selectValue);
            let obj = new objFB(`${property}_${dataid}`);                
            
            
            function objFormat(newIndex, objParent, data)
            {
                let o = new objFB(newIndex);  
                    o.body  = {frameRef:Category.frame.returner(), data:data};    
                objParent.children.push(o);
            }
            
            
            let svArr = selectValue.split("_").forEach((data, i)=>
            {
                if(aux_existence(data))
                {   objFormat(`${obj.index}_${(i+1)}`, obj, {_name:[data]});    }
            });
            

            
            obj.children.forEach((b, i0)=>
            {   
                b = frmEdit.eAction.eBody.eProperty.uniqueFrame(b, "body", (i0+1));   
            });
            
            
            
            document.getElementById("propertyBodyFrame_" + obj.index).innerHTML =  (function(oArr)
            {
                let returner = "";

                function wrapper(odata)
                {
                    return  "<div id=\"BodyFrame_" + odata.index  + "\" class=\"longSeparation\" >" +
                                odata.body.strReturner + 
                                "<div id=\"subPropertyBodyFrame_" + odata.index + "\" ></div>" +
                            "</div>";
                }
                
                
                oArr.forEach(function(o){   returner =  wrapper(o) + returner;    });
                
                return returner;
                
            })(obj.children);
            
            document.getElementById(`edit_Category_${dataid}_head_2`).selectedIndex = 0;
        }
        
        
        if(e.target.matches("[data-action-property='Priority']"))
        {   
            apps.eventCaller = "Priority";

            let summary;
            let property    = e.target.dataset.actionProperty;
            let dataid      = e.target.dataset.actionid;
            let index       = e.target.id;
            let seletedElem = e.target.dataset.actionPropertyLabel;
            
            let selector    = e.target.options[e.target.selectedIndex];
            let selectValue = selector.value;
            let selectText  = selector.textContent;
            
            let svIndex=0,iIndex=0,uIndex=0,dIndex=0,sIndex=0,vIndex=0;
            
            
        
            document.querySelectorAll("[data-action-property='Priority']").forEach((eObj)=>
            {
                let element = eObj.dataset.actionPropertyLabel;
                
                if(element === "Summary") {  summary = eObj; } 
                
                switch(element)
                {
                    case "Strategic Value":
                            if(eObj.value==="High"){     svIndex = 15; }
                            if(eObj.value==="Medium"){   svIndex = 10; }
                            if(eObj.value==="Low"){      svIndex = 5; }
                        break;
                        
                    case "Impact":
                            if(eObj.value==="High"){     iIndex = 15; }
                            if(eObj.value==="Medium"){   iIndex = 10; }
                            if(eObj.value==="Low"){      iIndex = 5; }                        
                        break;
                        
                    case "Urgency":
                            if(eObj.value==="High"){     uIndex = 12; }
                            if(eObj.value==="Medium"){   uIndex = 8; }
                            if(eObj.value==="Low"){      uIndex = 4; }                        
                        break;
                        
                    case "Dependency":
                            if(eObj.value==="High"){     dIndex = 9; }
                            if(eObj.value==="Medium"){   dIndex = 6; }
                            if(eObj.value==="Low"){      dIndex = 3; }                        
                        break;
                        
                    case "Simplicity":
                            if(eObj.value==="High"){     sIndex = 6; }
                            if(eObj.value==="Medium"){   sIndex = 4; }
                            if(eObj.value==="Low"){      sIndex = 2; }                        
                        break;
                        
                    case "Visibility":
                            if(eObj.value==="High"){     vIndex = 6; }
                            if(eObj.value==="Medium"){   vIndex = 4; }
                            if(eObj.value==="Low"){      vIndex = 2; }                        
                        break;
                }
            });
            
            let priorityValue="";
            let priorityIndex = svIndex + iIndex + uIndex + dIndex + sIndex + vIndex;
            
            
            
            if((2 <=priorityIndex)&&(priorityIndex > 0)){ priorityValue = "Low-"}                            //L-    = [1;-)
            if((6 <= priorityIndex)&&(priorityIndex < 12)){ priorityValue = "Low"}       //L     = [2;1)     
            if((12 <= priorityIndex)&&(priorityIndex < 15)){ priorityValue = "Low+"}      //L+    = (3;2)
            
            
            if((15 <= priorityIndex)&&(priorityIndex < 19)){ priorityValue = "Medium-"} 
            if((19 <= priorityIndex)&&(priorityIndex < 23)){ priorityValue = "Medium"}            
            if((23 <= priorityIndex)&&(priorityIndex < 27)){ priorityValue = "Medium+"}
            
            
            if((27 <= priorityIndex)&&(priorityIndex < 36)){ priorityValue = "High-"} 
            if((36 <= priorityIndex)&&(priorityIndex < 45)){ priorityValue = "High"}            
            if(45 <= priorityIndex){ priorityValue = "High+"}


            if(1 > priorityIndex){ priorityValue = "None";    } 
            

            summary.value = priorityValue;
        }
        
        
        if(e.target.matches("[data-element-blocker]"))
        {   
            apps.eventCaller = "true";
            console.log(e.target);
            
            let elementToBlock = e.target.dataset.elementBlocker;
            
            if(e.target.selectedIndex===1)
            {
                document.querySelectorAll("[data-element-skip]").forEach((element)=>
                {
                    if((element.dataset.actionPropertyLabel===elementToBlock)&&(element.dataset.actionProperty===e.target.dataset.actionProperty))
                    {
                        element.disabled = false;
                        element.dataset.elementSkip = false;
                    }
                });
            }
            else
            {
                document.querySelectorAll("[data-element-skip]").forEach((element)=>
                {
                    if((element.dataset.actionPropertyLabel===elementToBlock)&&(element.dataset.actionProperty===e.target.dataset.actionProperty))
                    {
                        element.disabled = true;
                        element.dataset.elementSkip = true;
                    }
                });                
            }
        }
        
        
        if(e.target.matches("input[type='datetime-local']"))
        {
            e.target.setAttribute("buffervalue",  new Date(e.target.value).getTime());  
        }
        
        
        if(aux_existence(e.target.dataset.modeChecker))
        {
            let reportGroup = e.target.dataset.group;
            let docValues   = document.getElementById(`data_${reportGroup}`);
            let reportSet   = new Set();
            let fg          = e.target.dataset.filterGroup;
            
            let filterGroup = document.querySelectorAll(`[data-filter-group='${fg}']`)
            for(let node of filterGroup)
            {
                let checkgroup  = node.dataset.group;
                if(aux_existence(document.getElementById(`checkbox_${checkgroup}`).checked))
                {
                    let dCheck  = document.getElementById(`data_${checkgroup}`);
                    let arr     = dCheck.value.split(",");
                    let s = reportSet.get(0)
                    reportSet.add(arr);
                }
            }
            
            document.getElementById(`Filter_${fg}`).value = [...reportSet];
            document.getElementById(`Selection_${fg}`).value = [...reportSet];
            document.getElementById(`counter_${fg}`).innerText = reportSet.size;
        }
    }
    
}, false)


    

//window.addEventListener("resize", updateFooterHeight);
window.onscroll = function()
{
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) 
    {
        //sidebar moved down
        document.getElementById(`${apps.environment}_headTitle`).innerText = "foxyz";    
    }
    else
    {
        //fully moved to the top
        document.getElementById(`${apps.environment}_headTitle`).innerText = "FocusOnXYZ";  
    }  
};





/* Allow reload by scrolling on the head */
//const headercontainer = document.querySelector('.headContainer');
const headercontainer = document.getElementById('headContainer');
let touchStartY = 0;
let touchEndY = 0;

headercontainer?.addEventListener('touchstart', (e) => 
{   touchStartY = e.touches[0].clientY;     });


headercontainer?.addEventListener('touchmove', (e) => 
{   touchEndY = e.touches[0].clientY;       });


// Detect downward swipe (endY > startY) with a minimum distance
headercontainer?.addEventListener('touchend', () => 
{   if (touchEndY - touchStartY > 60) {window.location.reload(); }});

