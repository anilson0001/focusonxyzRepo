// objFB Constructor
/*
const objFB = function(index, parent = "root") 
{
    this.index          = index; // root:index="title + id"
    this.parentIndex    = parent;
    this.data           = {head:[], body:[], foot:[]};
    this.children       = [];
    this.mainStrReturner;
};
*/
const objFB = function(index, parent = "root") 
{
    this.index          = index; // root:index="title + id"
    this.parentIndex    = parent;
    this.children       = [];    
    this.head   = {data:[]};
    this.body   = {data:[]};
    this.foot   = {data:[]};
};




// Add methods to objFB prototype
objFB.prototype = 
{
    // Save property frame values by collecting data from DOM elements
    savePropertyFrameValues: function(oIndexer, remover, property) 
    {
        let notEOB, notEOBE, cntB = 1, cntO = 1;
        do {
            let elementIndex = `${oIndexer}_${cntB}`;
            let o = new objFB(`${oIndexer}_${cntO}`, `${this.index}`);
            let objBlock = {};
            let cntBE = 0;
            let notEOBE;
            
            do 
            {
                let subBlockNotConfirmed = true;
                let BE = document.getElementById(`edit_${elementIndex}_${cntBE}`);
                let BE_Name = document.getElementsByName(`edit_${elementIndex}_${cntBE}_ignore`);
                
                if (aux_existence(BE_Name)) 
                {
                    o.savePropertyFrameValues(elementIndex, [remover[1]], property);
                    subBlockNotConfirmed = false;
                }
                
                if (aux_existence(BE) && subBlockNotConfirmed) 
                {
                    let label = BE.dataset.actionPropertyLabel;
                    if (aux_existence(label)) 
                    {
                        if (label !== "_comments") 
                        {
                            objBlock[label] = [BE.value];
                        } 
                        else
                        {
                            if(aux_existence(BE.querySelector(".editor")))
                            objBlock[label] = [BE.querySelector(".editor").innerHTML];
                        }
                    }
                }
                
                if (!aux_existence(BE) && !aux_existence(BE_Name)) break;
                cntBE++;
            } 
            while (true);
            
            if (aux_existence(objBlock)) 
            {
                if (cntB !== parseInt(remover[0])) 
                {
                    o.body = { frameRef: property.frame.returner(objBlock["_frameID"][0]), data: objBlock };
                    this.children.push(o);
                    cntO++;
                }
            } 
            else 
            {   break;  }
            
            cntB++;
        } while (true);
    },

    // Generate HTML for main frame blocks, return as string
    addPropertyFrameBlock: function(addExtra, property, frameID) 
    {
        let mapSubFrameBlock = new Map();
        let dL0 = this.children.length;
        let returner = "";   
        
        function wrapper(odata) 
        {
            return `<div id="BodyFrame_${odata.index}" class="longSeparation" draggable="true"
                         ondragstart="frmEdit.eDetails.mover.handleDragStart(event, '${odata.index}')"
                         ondragover="frmEdit.eDetails.mover.handleDragOver(event)"
                         ondrop="frmEdit.eDetails.mover.handleDrop(event, '${odata.index}')"
                         ondragend="frmEdit.eDetails.mover.handleDragEnd(event)">
                        ${odata.body.strReturner}
                        <div id="subBodyFrame_${odata.index}"></div>
                    </div>`;
        }        
        
        
        for (let i0 = 0; i0 < dL0; i0++) 
        {
            let fbchild = this.children[i0];
            fbchild = frmEdit.eAction.eBody.eProperty.uniqueFrame(fbchild, "body", (i0 + 1));
            if (aux_existence(fbchild.children)) 
            {
                for (var i1 = 0, dL1 = fbchild.children.length; i1 < dL1; i1++) 
                {
                    let sfbchild = fbchild.children[i1];
                    mapSubFrameBlock.set(`subBodyFrame_${fbchild.index}`, [fbchild, (i0 + 1), (i1 + 1)]);
                }
            }
        }
        
        
        if (aux_existence(addExtra)) 
        {
            let fr = property.frame.returner(frameID);
            let newo = new objFB(`${this.index}_${(dL0 + 1)}`, `${this.index}`);
            newo.body = { frameRef: fr, strReturner: "", data: addExtra };
            this.children.push(frmEdit.eAction.eBody.eProperty.uniqueFrame(newo, "body", (dL0 + 1)));
        }


        for(let o of this.children){   returner = wrapper(o) + returner;   }
        

        return { html: returner, subFrameMap: mapSubFrameBlock };
    },

    // Generate HTML for sub-frame blocks, return as string
    addPropertySubFrameBlock: function(cntB, addExtra, oProperty, frameID) 
    {
        
       //let targetChild = (this.children)? this.children[parseInt(cntB) - 1]: this;
        
        let dL0 = this.children.length;
        for (var i0 = 0; i0 < dL0; i0++) 
        {
            this.children[i0] = frmEdit.eAction.eBody.eProperty.uniqueFrame(this.children[i0], "body", (i0 + 1));
        }
        
        if (aux_existence(addExtra)) 
        {
            frameID = (!aux_existence(frameID))?  this.body.frameRef.id: frameID;
            let fr = oProperty.frame.returner(frameID);
            let subLen = (aux_existence(this.children)) ? (this.children.length + 1) : 1;
            let newo = new objFB(`${this.index}_${subLen}`, `${this.index}`);
            newo.body = { frameRef: fr, strReturner: "", data: "" };
            newo = frmEdit.eAction.eBody.eProperty.uniqueFrame(newo, "body", subLen);
            this.children.push(newo);
        }
        let returner = "";
        function wrapper(sodata) 
        {
            return `<div id="subPropertyBodyFrame_${sodata.index}" class="shortSeparation" draggable="true"
                         ondragstart="frmEdit.eDetails.mover.handleDragStart(event, '${sodata.index}')"
                         ondragover="frmEdit.eDetails.mover.handleDragOver(event)"
                         ondrop="frmEdit.eDetails.mover.handleDrop(event, '${sodata.index}')"
                         ondragend="frmEdit.eDetails.mover.handleDragEnd(event)">
                        ${sodata.body.strReturner}
                    </div>`;
        }
        this.children.forEach((o, k1) => { returner = wrapper(o) + returner; });
        
        
        return { subhtml: returner};
        //return returner; // Return HTML string
    }
};



const frmEdit = 
{
/*
The order:
- edit_menu
- edit_action
-- edit_body
--- edit_expandproperty

*/ 
    objframer: function(thisObj, subBodySection)
    {
        let returner="";
        
        function wrapper(odata, sub)
        {
            if(aux_existence(sub))
            {
                
                return`<div id='subBodyFrame_${odata.index}'  class='shortSeparation' >${odata.body.strReturner}</div>`;
            }
            else
            {
                return  `<div id='BodyFrame_${odata.index}' class='longSeparation' >
                            ${odata.body.strReturner}
                            <div id='subPropertyBodyFrame_${odata.index}'></div>
                        </div>`;
            }
        }      
        
        thisObj.children.forEach(function(o){   returner =  wrapper(o, subBodySection) + returner;    }); 
        
        return returner;
    },
    
    eMenu:  function(menu, indexer, fs)
    { 
        let values = "", msColor = "mbDefault_mode";
      
        if(aux_existence(fs))
        {   msColor = "mbReport_mode"}
        
        if(indexer!=="newAction")
        {   value =  "<div class=\"menuButton " + msColor + "\" name=\"Menu\" id=\"Menu_report\" data-menu-indexer='report' data-menu-depth='0' data-menu-group='report' onclick=\"aux_collapseMenuDIV('Menu_report'); \" data-element-family=\"menuButton\" >" + menu + "</div>";    } 
        else
        {   value =  "<div class=\"menuButton " + msColor + "\" name=\"Menu\" id=\"Menu_newAction\"  data-menu-indexer='newAction' data-menu-depth='0' data-menu-group='newAction' onclick=\"frmEdit.eAction.placer('newAction'); \" data-element-family=\"menuButton\" >" + menu + "</div>";    }   

        return value;           
    },
  
  
  
    /*
    Last Update: 
    Last Update by: Anilson Cardoso
    called from: 
            
    Description:
           
    */      
    edit_fullList: function(data)
    {
        let value="";
        for(let a0=0, a1=data.length; a0<a1; a0++)
        {
            if(aux_existence(value))
            {   value = value + "," + data[a0].special.ID_currentLevel;  }
            else
            {   value = data[a0].special.ID_currentLevel;  }
        }
        
        document.getElementById("IDSelection_all").value = value;
    },
  
  

    /*
    Last Update: 
    Last Update by: Anilson Cardoso
    called from: 
            
    Description:
           
    */  
    eAction:    
    {
        /*
        Last Update: 
        Last Update by: Anilson Cardoso
        called from: 
            
        Description:
           
        */              
        eBody: 
        {
            /*
            Last Update: 
            Last Update by: Anilson Cardoso
            Called from: 
            
            
            Calls Made from here:
            
            
            Description:
           
            */  
            eProperty: 
            {       
                /*
                    Created On: 
                        Dec 17, 2021
                        
                    Last Update On: 
                        Dec 25, 2021 (ver. 26)
                        (ver 26):   Dec 29, 2021 by Anilson Cardoso
                            update BlockValue (preview: cntBlock), to reflect existing action
                        Jan 09, 2021 by AC
                            reframe the function


                    Description:
                        What does it do?
                            Gets the frame from a particular property (title),
                            formats the frame based on the frame from the property,
                            returns (sends back) this basic formated frame and the counts of frames and input formats
                            
                            Source of Data:
                                title       = property
                                id          = id (can be existing id or newAction: new id)
                                inputData   = userSavedData
                                objFrame    = property frame object
                                cntBlock    =
                                frameID     =   calls from universalPropertyFrame (frameID=0): headFrames can only be called with this
                                                calls from eExpandProperty (frameID>0)
            
                        Why is it called
                            
                            
                        Where is it called from (callers)
                            frame.edit.eAction.eBody.returner()
                                get:    - headFrame (if property has headFrame)
                                        - defaultFrame (Description/Comments/.../DateTime/Risk/Priority)
                                        - Frame user data (framedData)
                                        - emptyFrame (only for comments)
                                    
                            frame.edit.eAction.eBody.eExpandProperty()
                                get:    - Frame user data (called from select field)
                                        - emptyFrame (called from button field)
                                        
                        When is it called
                            
                            
                        How does it work?
                            
                        
                        Concerns:
                            propertyFrameBlock.body.objFrame should be set inside here and not from outside source.
                                it shoud be set inside returnBlockFrameBody(). 
                                - For blocks with userdata get the frame from userdata["_frameID"].
                                - For blocks without userdata get the default returned frame which should include ...objFrame.subframeid
                */
                uniqueFrame: function(propertyFrameBlock, section, updateBlock)
                {
                    let allowFrame = false;
                    
/*
    This function is supposed to return something
*/
                    function eDimensionSettler(obj, framer, section, cnt)
                    {  
    /*
    Important NOTE:
    these dimensional inputors only save the dimensions of the frame. The no longer save the entire block information.
    */             
                        let [property, id, ...indexRemainer]    = obj.index.split("_");
                        let userData    = obj[section]["data"];
                        
    
    
                        /*
                        Block Description:
                            This will search/get all the names in the propoerty to be displayed on the block element datalist
                        */
                        loadDataFromStore("PerformanceStore", "Indicators", "", frmEdit.eAction.eBody.eProperty.placeDimensionalDataFromPermanceStore, `edit_${obj.index}`, obj[section]["frameRef"]["eframe"], [property]);  


                        /*
                        Block Description:
                            This will search/get all the actions in the Store and displayed on the block element datalist
                        */
                        if((cnt!=="head")&&((property=="ListItem")||(property=="Contacts")||(property=="Locations")||(property=="Resources")))
                        {
                            let data = (aux_existence(obj.body.data))? (aux_existence(obj.body.data[cnt-1]))? obj.body.data[cnt-1]: [""]: [""];
                            
                            loadIndexDataFromStore("Actions", "statusIndexer", "0", "", frmEdit.eAction.eBody.eProperty.placeDimensionalDataFromActionStore, `edit_${obj.index}`, property, data);     
                            loadIndexDataFromStore("Actions", "statusIndexer", "1", "", frmEdit.eAction.eBody.eProperty.placeDimensionalDataFromActionStore, `edit_${obj.index}`, property, data);     
                        }
                    }  

                    
                    
                    function returnBlockFrameBody(obj, sectionID, cntB)
                    {
                        let arrData=[], noData=true;
                        let dimCode="", value="", userData="", frameid;
                        
                                        
                        function inputter(titleindex, B, E, objFrame, uData, section)
                        {   
                            let clickFunction="", inputName="", buffer="", dt="", dataProperty=[];
                            let listID="", listFrame="", require="", adjacent="", typeClass="propertyTag-4";
                            let format_1, format_2, format_3, format_4, format_5;
                            let propertyOptions="", multiselection = false;
                            let nextInput = "", nextLabel="", removeLabel="", propertyClass="";
                            let propertyDisabled = "";  //(aux_existence(pDisabled))? "disabled=\"true\"": "";
                            //let rteActivation = false;
                            let value="", keyValue="";
                            let propertyRequired="";
                            let dataActionSelected = "data-action-selected='false'";
                            let [title, id, ...unused] = titleindex.split("_");
                            
                            let propertyID  = "edit_" + titleindex + "_" + E;  
                            let propertyBodyID  = section + "_" + titleindex;                              
let v;
                            

 
                            
                            function formatOptions(selectOptions)
                            {   
                                if(Array.isArray(selectOptions))
                                {
                                    if(multiselection)
                                    {
                                        for(let a0=0, a1=selectOptions.length; a0<a1; a0++)
                                        {   
                                            if(selectOptions[a0][1]!==""){ nextLabel++;}
                                            propertyOptions = propertyOptions + "<option value=\"" + a0 + "\" " + selectOptions[a0][1] + " " + selectOptions[a0][2] + ">" + selectOptions[a0][0] + "</option>"; 
                                        }
                                    }
                                    else
                                    {
                                        //- single selection highlight
                                        //- No userData     
                                        if(aux_existence(uData))
                                        {
                                            for(let a0=0, a1=selectOptions.length; a0<a1; a0++)
                                            {   
                                                let selectValue = aux_existence(selectOptions[a0][1])? selectOptions[a0][1]:a0;
                                                let selected=(aux_existence(uData[keyValue]))? (selectValue===uData[keyValue][0])? "selected": "":""; 
                                                propertyOptions += "<option value=\"" +  selectValue + "\" " + selected + " >" + selectOptions[a0][0] + "</option>"; 
                                            } 
                                        }
                                        else
                                        {
                                            for(let a0=0, a1=selectOptions.length; a0<a1; a0++)
                                            {   
                                                let selectValue = aux_existence(selectOptions[a0][1])? selectOptions[a0][1]:a0;
                                                propertyOptions += "<option value=\"" +  selectValue + "\"  >" + selectOptions[a0][0] + "</option>"; 
                                            }                                                    
                                        }
                                    }  
                                }  
                            }


                            function formatName(data)
                            {   if(aux_existence(data)){ inputName = propertyID + "_" + data; } }                                       
                            
                            
                            function formatCase_Label(nameClass="", moveupdown=false, labelData="", cntB)
                            {
                                let label="";
                                if(aux_existence(labelData))
                                {
                                    let nSpecClass = ""; 
                                    
                                    if((aux_existence(moveupdown)))
                                    { 
                                        labelData += `: <div id="move_${propertyID}" class="emovers" style="float:right; display:block">
                                                            <span class="blockMover" class="emoverupdown" onclick="frmEdit.eDetails.mover.blockframe('${propertyID}','Up')">\u21e7</span>
                                                            <span class="dragHandle"> ::: </span>
                                                            <span class="blockMover" class="emoverupdown"  onclick="frmEdit.eDetails.mover.blockframe('${propertyID}','Down')">\u21e9</span>
                                                        </div>`; 
                                                        
                                        nameClass = "mainPropertyElement";
                                    }
                                    
                                    label = `<div class="eProperty-11"><label for="${propertyID}" class="${nameClass}">${labelData}</label></div>`; 
                                }
                                
                                
                                return label;
                            }

                            
                            function formatCase_Class(data)
                            {   return "class=\"" + data + "\"";   }  
                            

                            function formatCase_Function(data, titleid)
                            {
                                let func="";

                               
                                return func;
                            }                                    
                            
                            
                            function formatCase_Attributes(data)
                            {
                                let att=["",""];
                                let NoOptionsFound;
                               
                                
                                for(let property in data)
                                {   
                                    NoOptionsFound=true;
                                    
                                    if(property.toString()==="options"){    formatOptions(data[property]);  NoOptionsFound = false; }
                                    if(property.toString()==="name"){       formatName(data[property]);    }
                                    if(property.toString()==="multiple"){   multiselection = true; }
                                   // if(property.toString()==="RichTextEditor"){ rteActivation=true;}
                                    if(property.toString()==="class"){ propertyClass = " class=\"" + data[property] + "\"  "; }
                                    if(property.toString()==="value"){ att[1] = data[property]; NoOptionsFound=false; } // ??? which cases ???
                                    //if(property.toString()==="subframeblock"){  att[0] += `${property.toString()}=${B} `; NoOptionsFound=false; }
                                    

                                    
                                    if(property.includes("_"))
                                    {   
                                        let newdata = property.replaceAll("_","-");
                                        att[0] += `${newdata}="${data[property]}" `;
                                        NoOptionsFound = false;
                                    }


                                    if(NoOptionsFound){ att[0] += property + "=\"" + data[property] + "\" ";  }
                                }
    
                                return att;
                            }
                            
                            
                            function formatCase_Type(type, propertyLabel, propertyFunction, propertyAttributes, dataRequired)                                    
                            {
                                let inputData ="";
                                let dRequired = (aux_existence(dataRequired))? " required=\"true\" ": "";
                                propertyRequired = (aux_existence(dataRequired))? " required=\"true\" ": "";
                                
                                
                                if(aux_existence(value))
                                {   
                                    v = value; 
                                    keyValue = keyValue? keyValue: objFrame.labelID? objFrame.labelID: objFrame.label? objFrame.label: "";
                                }                              
                                else if(aux_existence(uData))
                                {
                                    if(aux_existence(uData[keyValue]))
                                    {   v = aux_textSignIn(uData[keyValue]);     }
                                    else
                                    {   v = aux_existence(propertyAttributes[1])? aux_textSignIn(propertyAttributes[1]): "";    }
                                }
                                else
                                {   v = aux_existence(propertyAttributes[1])? aux_textSignIn(propertyAttributes[1]): "";}
                            
                                
 
                                    if(aux_existence(type))
                                    {   
                                        let dataFocusOnOff      = "data-focus-onoff='true'";

                                        switch(type)
                                        {
                                            case "select": 
                                                propertyClass += formatCase_Class("universalProperty");
                                                propertyAttributes[0] += `data-actionid='${id}'`;
                                                propertyData = `<select style='width:100%' id='${propertyID}' name='${inputName}' data-action-property='${title}' data-section='' data-action-property-label='${keyValue}' ${dataFocusOnOff} ${propertyClass} ${dRequired} ${propertyFunction} ${propertyAttributes[0]} ${propertyDisabled} >${propertyOptions}</select>${removeLabel}`; 
                                                break;
                                                
                                            case "list":
                                                let valueOption="";

                                                
                                                //let v = (aux_existence(uData))? aux_textSignIn(uData[keyValue]): aux_existence(propertyAttributes[1])? aux_textSignIn(propertyAttributes[1]): "";
                                                value = " value=\"" + v + "\" placeholder=\"Select or Enter New\" ";      
                                                    
                                                
                                                propertyClass += formatCase_Class("universalProperty");
                                                propertyData = `<input list='list_${propertyID}' id='${propertyID}' name='${inputName}' type='${type}' data-action-property='${title}' data-action-property-label='${keyValue}' ${dataActionSelected} ${dataFocusOnOff} ${dRequired} ${propertyClass} ${propertyFunction} ${propertyAttributes[0]} ${value} ${propertyDisabled}>
                                                                <datalist id='list_${propertyID}'>${valueOption}</datalist>
                                                                ${removeLabel}`;
                                                
                                                break;
                                            case "textarea": 
                                                
                                                
                                               
                                                if(aux_existence(v))
                                                {   
                                                    //propertyClass += " displayActionText"; 
                                                    propertyDisabled = (title==="Comments")? " disabled=\"true\" ": "";
                                                }
                                                propertyClass += formatCase_Class("universalProperty textarearesize");
                                                
                                    			try 
                                    			{
                                    			    let divid = propertyID;
                                    				new Promise((resolve)=>
                                    				{
                                    					resolve(editor.rteReturner_EditMode(v, propertyID));
                                    				}).then((render)=>
                                    				{ 
                                    					const elem = document.getElementById(divid);
                                     				    const attachments = render.querySelectorAll(".attachment-item");
                                    				    
                                    				    if(attachments)
                                    				    {   
                                                            attachments.forEach((a,i) => 
                                                            {
                                                                a.classList.add("attachmentEditMode");
                                                                a.classList.remove("attachmentDisplayMode");
                                                
                                                                // Remove interactive handles
                                                                //a.querySelectorAll(".drag-handle")?.forEach(ro=>{ro.remove();});
                                                                //a.querySelectorAll(".resize-handle")?.forEach(ro=>{ro.remove();});
                                                                
                                                                // Safety: fix any stray blob URLs
                                                                const media = a.querySelector("[data-attachment-element='file']");
                                                                if (media && media.src?.startsWith("blob:")) 
                                                                {
                                                                    const fileName = encodeURIComponent(a.dataset.attachmentName);
                                                                    media.src = `/focus_Storage/${apps.uniqueData.uDB}/${fileName}`;
                                                                }
                                                            });  
                                    				    }	                                   					
                                    					
                                    					
                                    					if(elem)
                                    					{	
                                    					    render.classList.add("eActionComments");
                                    					    
                                        					if(!aux_existence(elem.innerHTML))
                                        					{
                                        						//elem.innerHTML = "";	
                                        						if(aux_existence(render)) elem.appendChild(render);
                                        					}
                                    					}
                                    				});
                                    
                                    
                                      				propertyData = `<div id='${divid}' class='eContainer' name='${inputName}' value='${propertyAttributes[1]}' RichTextEditorSetBy='foxyzrte' data-action-property='${title}' data-action-property-label='${keyValue}'  ${dataFocusOnOff} ${propertyClass} ${propertyFunction} ${dRequired} ${propertyAttributes[0]} ${propertyDisabled}></div>`;
                                    			} 
                                    			catch (err) 
                                    			{
                                      				console.error('Error fetching edit mode:', err);
                                      				propertyData = `<textarea id='${propertyID}' name='${inputName}' value='${propertyAttributes[1]}' data-action-property='${title}' data-action-property-label='${keyValue}'  ${dataFocusOnOff} ${propertyClass} ${propertyFunction} ${dRequired} ${propertyAttributes[0]} ${propertyDisabled}>${v}</textarea>`;
                                    			}


/*
                            const localV =
  (aux_existence(uData) && aux_existence(uData[keyValue]))
    ? aux_textSignIn(uData[keyValue])
    : (aux_existence(propertyAttributes[1]) ? aux_textSignIn(propertyAttributes[1]) : "");


  const divid = propertyID;
  const textForThisBlock = localV; // capture it

  Promise.resolve(editor.rteReturner_EditMode(textForThisBlock, divid))
         .then((render) => 
         {
            const elem = document.getElementById(divid);
            if (elem) 
            {
                if(!aux_existence(elem.innerHTML))
                {
                    //elem.innerHTML = "";
                    if (render) elem.appendChild(render);
                }
            }
         });

  propertyData = `<div id='${divid}' class='eContainer' ...></div>`;
  */
                                                break;
                                            case "button":
                                                let dp = ""; for(let d of dataProperty){ dp += ` ${d} `;}
                                                
                                                if(dp!==""){   dp += ` data-id='${id}' `;  }
                                    
                                                propertyClass += formatCase_Class("universalProperty _Button");
                                                propertyData = `<div  id='${propertyID}' name='${inputName}' data-action-id='${id}' data-action-property='${title}'  data-action-property-label='${keyValue}' data-label-objname='${keyValue}' ${propertyAttributes[0]} ${propertyClass} ${propertyFunction} ${propertyDisabled} ${dp}>${propertyAttributes[1]}</div>`; 
                                                //propertyData = `<div  id='${propertyID}'  data-action-property='${title}'  data-action-id='${id}' data-action-property-label='${keyValue}' data-label-objname='${keyValue}'  name='${inputName}'   ${propertyAttributes[0]} ${propertyClass} ${propertyFunction} onmousedown='eHandlerMouseDown("${propertyID}")'  ${propertyDisabled} ${dp}>${propertyAttributes[1]}</div>`; 
                                                
                                                break; 
                                            case "datetime-local":
                                                if(aux_existence(uData))
                                                {
                                                    if(aux_existence(value))
                                                    {   buffer = (value.includes("T"))? DateTime.aux_ParseTo.numericDateTime(value): value; }
                                                    else
                                                    {
                                                        if(inputName.includes("edt"))
                                                        {  buffer = Number(DateTime.aux_ParseTo.numericDateTime()) + Number("86400000");    }
                                                        else
                                                        {   buffer = Number(DateTime.aux_ParseTo.numericDateTime());   }
                                                    }
                                                }
                                                else
                                                {
                                                    if(inputName.includes("edt"))
                                                    {   buffer = Number(DateTime.aux_ParseTo.numericDateTime()) + Number("86400000");    }
                                                    else
                                                    {   buffer = Number(DateTime.aux_ParseTo.numericDateTime());     }
                                                }
                                                
                                                value =  `value='${DateTime.aux_ParseTo.extendDateTime_local(buffer)}'`;
                                                
                                                propertyClass += formatCase_Class("universalProperty");
                                                propertyData = `<input id='${propertyID}' name='${inputName}' type='${type}'  buffervalue='${buffer}'  data-action-property='${title}'  data-action-property-label='${keyValue}' ${propertyAttributes[0]} ${dataFocusOnOff} ${propertyClass} ${value} >`;
                                                
                                                break;
                                            case "hidden":
                                                if(title==="DateTime")
                                                {
                                                    if(aux_existence(uData))
                                                    {
                                                        if(aux_existence(value))
                                                        {    dt = v; }
                                                        else
                                                        {   if(inputName.includes("sdt")){  dt = Number(DateTime.aux_ParseTo.numericDateTime());    }  }
                                                        
                                                        if(inputName.includes("edt")){  dt = Number(DateTime.aux_ParseTo.numericDateTime()); }
                                                    }
                                                    else
                                                    {
                                                        if(inputName.includes("sdt")){  dt = Number(DateTime.aux_ParseTo.numericDateTime());    }
                                                        if(inputName.includes("edt")){  dt = Number(DateTime.aux_ParseTo.numericDateTime());    }
                                                    }
                                                                    
                                                    buffer = " buffervalue=\"" + dt + "\" ";
                                                    value =  " value=\"" + DateTime.aux_ParseTo.extendDateTime_local(dt) + "\" ";
                                                }
                                                else
                                                {   value = "value=\"" + v + "\""; }
                                                
                                                propertyClass += formatCase_Class("universalProperty");
                                                propertyData = `<input id='${propertyID}' name='${inputName}' type='${type}' data-action-property='${title}' data-action-property-label='${keyValue}' ${propertyAttributes[0]}  ${dataFocusOnOff} ${buffer} ${propertyClass} ${value} >`;
                                                
                                                break;
                                            default:
                                                value = " value=\"" + v + "\" ";    
                                                
                                                propertyClass   += formatCase_Class("universalProperty");    
                                                propertyData     = `<input id="${propertyID}" name="${inputName}" type="${type}" data-action-property="${title}" data-block="edit_${titleindex}_${B}" data-action-property-label="${keyValue}"  ${dataFocusOnOff} ${value} ${dRequired} ${propertyClass} ${propertyFunction} ${propertyAttributes[0]} ${propertyDisabled}>${removeLabel}`; 
                                        }
                                    }
                                    else
                                    {
                                        if(aux_existence(objFrame.multiple))
                                        {   alert("hi");      }
                                    }
                                
                                
                                
                                if(aux_existence(propertyLabel))
                                {   propertyData = propertyLabel + "<div class=\"eProperty-12\">" + propertyData + "</div>"; }
                                else
                                {  
                                    if((objFrame.type==="button")&&(aux_existence(objFrame.halfLength)))
                                    {   propertyData = "<div class=\"eProperty-12\">" + propertyData + "</div>"; }
                                    else
                                    {   propertyData = "<div class=\"eProperty-13\">" + propertyData + "</div>"; } 
                                }                                        
                                
                                return propertyData;
                            }
                            
                            
                            
                            
                            if(aux_existence(objFrame.labelID))
                            {   
                                if(aux_existence(objFrame.defaultuser))
                                {   value = sessionStorage.username;    }
                                else
                                {   keyValue = objFrame.labelID;  }
                            }
                            else
                            {   
                                if(aux_existence(objFrame.label))
                                {   keyValue = objFrame.label;  }
                            }
                            
                            if(aux_existence(keyValue))
                            {   
                                if(aux_existence(uData))
                                {
                                    if(aux_existence(uData[keyValue]))
                                    {   [value] = uData[keyValue];  }
                                    else
                                    {   
                                        if(typeof uData === "string")
                                        {   value=uData;    }
                                    }
                                }
                            }  
                            
                            
                            
                            
                                                                            

                            
                            
                            format_3 = formatCase_Function(objFrame.efunction, titleindex); 
                            format_4 = formatCase_Attributes(objFrame.attribute);  
                            format_1 = formatCase_Label(objFrame.bodyWrapperHead, objFrame.moveupdown, objFrame.label, B);          
                            format_5 = formatCase_Type(objFrame.type, format_1, format_3, format_4, objFrame.required);

                            return "<div class=\"eProperty-1\">" + format_5 + "</div>" + nextInput;
                        }
                                
                                                  
                        function idFrameSetter(block, section, o)
                        {  
                            return   `<input type="hidden" name="frameID" id='edit_${o.index}_0' data-action-property-label="_frameID" value='${o[section]["frameRef"]["id"]}'>${block}`; 
                        }                            
                    
                        
                        
                        if((sectionID!=="head")&&(sectionID!=="foot"))
                        {  userData = obj.body.data;  }
                        
                        
                        
if(aux_existence(obj[sectionID]["frameRef"]))
{
                        value = "<table width=\"100%\">";
                        for(let i=0, len=obj[sectionID]["frameRef"]["eframe"].length; i<len; i++)
                        {
                            value += "<tr><td width=\"100%\">" + 
                                        inputter(obj.index, cntB, (i+1), obj[section]["frameRef"]["eframe"][i], userData, sectionID) +
                                     "</td></tr>";
                        }
                        value += "</table>";
}               
                        
                        
                        return idFrameSetter(value, sectionID, obj, cntB);
                    }
                    
                    

                    function processBodyBlockFrame(pF, uBlock)
                    {
                        eDimensionSettler(pF, pF.body.frameRef.eframe, "body", uBlock)
                        pF.body.strReturner = returnBlockFrameBody(pF, "body", uBlock); 
                        
                        return pF;
                    }
                    
                    
                    
                    if(section==="head")
                    {   
                        if(aux_existence(propertyFrameBlock.head.frameRef))
                        propertyFrameBlock.head.strReturner = returnBlockFrameBody(propertyFrameBlock, section, "head", "", eDimensionSettler(propertyFrameBlock, propertyFrameBlock.head.frameRef.eframe, "head", "head"));  
                    }
                    
                    
                    if(section==="foot")
                    {   
                        if(aux_existence(propertyFrameBlock.foot.frameRef))
                        propertyFrameBlock.foot.strReturner = returnBlockFrameBody(propertyFrameBlock, section, "foot");  
                    }
                    
                    
                    if(section==="body")
                    {   propertyFrameBlock = processBodyBlockFrame(propertyFrameBlock, updateBlock);    }
                    
                   
                                
                    return  propertyFrameBlock;
                },
                
                
                /*
                    Last Update: 
                        Dec 25, 2021 (ver. 26)
            
                    Last Update by: 
                        Anilson Cardoso

                    Source of Data:
                        arguments:                  (from caller)
                            title                   (property Name)
                            indexer                 (action id)
                            actionData              (user saved/stored Data)
                            propertyBasicFrame      (propertyObject)
                    
                    Description:
                        What does it do?
                            It gets the argument data and sends to uniqueFrame() and gets back a set of single frames which is inserted into the universal property block
                            The UniversalBlock is made of:
                                - title
                                - data
                                - headframe
                                - bodyframe
                                - footframe
                        
                        Why is it called
                        
                        Where is it called from
                            frame.edit.eAction.eBody.returner()     (callers)
                            
                        When is it called
                            During the creation of the edit module all properties are called with exception for comments when actionID = newAction
                            It build the frame (format) for every property
                            
                        How many times is it called
                            The UniversalBlock is called for every single property at least once.
                        
                */
                requestFrameBlockFromAction: function(title, id, propertyData, blockDisplay, innerDisplay, status, piRequest)
                {
                    let classArr = ["openDisplay eProperty",[["noclass","noclass","noclass"],["noclass","noclass","noclass"]], "closedDisplay", "closedDisplay"];
                    let objHead, objBody, objFoot;
                    let defaultBlockCounter=0;
                    let defaultFrameID = 1;
                    let propertyObj = eval(title);
                    let value;
                    let instructions = aux_existence(propertyObj.instructions())? propertyObj.instructions(): "Instructions coming soon";
                    let footExtension = (function(){ return "<div id=\"propertyBodyInstructor" + title + "_" + id + "\"  class=\"eFrameInstructor\">"  + 
                                            "<div id=\"head_Instructor_" + title + "_" + id + "\"  class=\"eFrameHeadInstructor\"  onclick=\"aux_colapseDivItem('Instructor_" + title + "_" + id + "','4', 'edit')\">" + 
                                                "<span id=\"arrow_Instructor_" + title + "_" + id + "\"  class=\"eFrameArrowInstructor\">\u25b6</span>" +
                                                "<span id=\"title_Instructor_" + title + "_" + id + "\"  class=\"eFrameTitleInstructor\">Help</span>" +
                                            "</div>" + 
                                            "<div id=\"body_Instructor_" + title + "_" + id + "\"  style=\"display:none\" class=\"eFrameBodyInstructor\">" + instructions + "</div>" +                                                     
                                        "</div><br>";})();
                                        
                                        
                    let simbol = "\u25bc";
                    if(innerDisplay!=="block"){simbol = "\u25b6"; }

                    function universalPropertyFrame(objFrame)
                    {   
                        
                        function wrapper(mainBodySection, odata, subB)
                        {
                            if(mainBodySection)
                            {
                                return  "<div id=\"BodyFrame_" + odata.index  + "\" class=\"longSeparation\" >" +
                                            odata.body.strReturner + 
                                            "<div id=\"subBodyFrame_" + odata.index + "\" >" + subB + "</div>" +
                                        "</div>"; 
                            }
                            else
                            {
                                return  "<div id=\"subPropertyBodyFrame_" + odata.index  + "\" class=\"shortSeparation\" >" +
                                            odata.body.strReturner + 
                                        "</div>";
                            }
                        }
                        
                        
                        if(aux_existence(objFrame.children))
                        {
                            let head="",body="",foot="";
                            objFrame.children.forEach((subo, cnt)=>
                            {
                                let notConfirmed = true;
                                if(subo.index.includes("head"))
                                {   
                                    head = subo.head.strReturner; 
                                    notConfirmed = false;
                                }
                                
                                if(subo.index.includes("foot"))
                                {   
                                    foot = subo.foot.strReturner;  
                                    notConfirmed = false;
                                }
                                
                                if(notConfirmed)
                                {
                                    let sbody="";
                                    if(aux_existence(subo.children))
                                    {
                                        subo.children.forEach((ssubo)=>
                                        {    sbody += wrapper(false, ssubo);   });
                                    }
                                    
                                    body = wrapper(true, subo, sbody) + body;
                                }
                            });
                            
                            
                            let footDisplay = (aux_existence(body))? "openDisplay": "closedDisplay";
    
    
                                                                     
                            return  (function(){ return "<div id=\"objProperty_" + objFrame.index + "\"  class=\"eProperty\"  style=\"display: " + blockDisplay + "\" data-block-index=\"7\">" +
                                        "<div id=\"data_" + objFrame.index + "\">" +
                                        "</div>" +
                                        "<div id=\"head_" + objFrame.index + "\" class=\"eFrame_Head\" onclick=\"aux_colapseDivItem('" + objFrame.index + "','2','edit')\">" +
                                            "<span id=\"arrow_" + objFrame.index + "\">" + simbol + "</span>" +
                                            "<strong>" + title + "</strong>" +
                                        "</div>" +
                                        "<div id=\"body_" + objFrame.index + "\" class=\"eFrame_Body\" style=\"display: " + innerDisplay + ";\" data-block-index=\"8\">" +
                                            "<div class=\"BAEPB_Head\" id=\"propertyHeadFrame_" + objFrame.index + "\">" + head + "</div>" +  
                                            "<div class=\"BAEPB_Body\" id=\"propertyBodyFrame_" + objFrame.index + "\" data-block-index=\"9\">" + body + "</div>" +  
                                            "<div class=\"BAEPB_Foot " + footDisplay  + "\" id=\"propertyFootFrame_" + objFrame.index + "\"  >" + foot + "</div>" +
                                        "</div>" +
                                        "<div id=\"foot_" + objFrame.index + "\" class=\"eFrame_Foot\"  style=\"display: " + innerDisplay + ";\" >" +
                                            "<div id=\"foot_Instructor_" + objFrame.index + "\" class=\"eFramer\">" +                                    
                                                "<div id=\"head_Instructor_" + objFrame.index + "\"  class=\"eFrameHeadInstructor\"  onclick=\"aux_colapseDivItem('Instructor_" + objFrame.index + "','3', 'edit')\">" + 
                                                    "<span id=\"arrow_Instructor_" + objFrame.index + "\"  class=\"eFrameArrowInstructor\">\u25b6</span>" +
                                                    "<span id=\"title_Instructor_" + objFrame.index+ "\"  class=\"eFrameTitleInstructor\">Help</span>" +
                                                "</div>" +
                                                "<div id=\"body_Instructor_" + objFrame.index + "\"  class=\"eFrameBodyInstructor closedDisplay\">" + instructions + "</div>" +                                  
                                            "</div>" + 
                                        "</div>" + 
                                    "</div>"; })();
                        }
                        
                        return;
                    }


                    let obj = new objFB(`${title}_${id}`);              
                    
                    
                    let ohead = propertyObj.frame.returner("head");
                    if(aux_existence(ohead))
                    {
                        let objHead = new objFB(`${obj.index}_head`, `${obj.index}`); 
                        objHead.head = {frameRef:ohead, strReturner:""};
                        objHead = this.uniqueFrame(objHead, "head", "head");
                        obj.children.push(objHead);
                    }
                    
                    
                    
                    let ofoot = propertyObj.frame.returner("foot");
                    if(aux_existence(ofoot))
                    {
                        let objFoot = new objFB(`${obj.index}_foot`, `${obj.index}`);
                        objFoot.foot = {frameRef:ofoot, strReturner:""};
                        objFoot = this.uniqueFrame(objFoot, "foot", "foot");
                        obj.children.push(objFoot);
                    }
                 
                    
                    if(aux_existence(propertyData))
                    {
                        propertyData.forEach((b, i0)=>
                        {   
                            let obody;
/*
                            if(aux_existence(b["_frameID"]))
                            {   obody = propertyObj.frame.returner(b["_frameID"]);  }
                            else
                            {   obody = propertyObj.frame.returner();   }
*/
                            obody = propertyObj.frame.returner(); 

                            let objBody = new objFB(`${obj.index}_${(i0+1)}`, `${obj.index}`);
                            objBody.body = {frameRef:obody, strReturner:"", data:b};
                            objBody = this.uniqueFrame(objBody, "body", (i0+1));
                            
                            
                            let sfr = obody.subFrameLabel;
                            if(aux_existence(sfr))
                            {
                                for(let ssfr of  sfr)
                                {
                                    if(aux_existence(b[ssfr]))
                                    {
                                        let oo;
                                        obody.eframe.forEach((o)=>{if(o.labelID===ssfr){oo=o.attribute.subframeblock}});
                                                                                
                                        b[ssfr].forEach((sb, i1)=>
                                        {   
                                            let sobody;
                                            if(aux_existence(sb["_frameID"]))
                                            {   sobody = propertyObj.frame.returner(sb["_frameID"]);  }
                                            else
                                            {   sobody = propertyObj.frame.returner();   }
                                            
                                            let sBlockValue = parseInt(objBody.children.length) + 1;
                                            let sobjBody = new objFB(`${objBody.index}_${oo}_${sBlockValue}`, `${objBody.index}`);
                                            sobjBody.body = {frameRef:sobody, strReturner:"", data:sb};
                                            sobjBody = this.uniqueFrame(sobjBody, "body", (sBlockValue));
                                            objBody.children.push(sobjBody);
                                        });
                                    }
                                }
                                
                                
                            }
                            
                            
                            obj.children.push(objBody);
                        });  
                    }
                    else
                    {   
                        if(!aux_existence(ohead))
                        { 
/*
this block...
    propertyData -> does not exist
    ohead        -> does not exist
        then     -> ???
        What is the purpose of this block ???
*/
                            let   obody = propertyObj.frame.returner();   
                            
                            let objBody = new objFB(`${obj.index}_1`, `${obj.index}`);
                            objBody.body = {frameRef:obody, strReturner:"", data:{}};
                            objBody = this.uniqueFrame(objBody, "body", 1);
                            obj.children.push(objBody);
                        }
                    }
                    
                               
                    return universalPropertyFrame(obj);                          
                },                
                
                
                /*
                    Update Dates: 
                        Dec 25, 2021 (ver. 26)
                        Dec 26, 2021 (ver. 26)
                        Dec 27, 2021 (ver. 26)
                        Feb 13, 2022 (ver. 32)
                            Set for remove Block; function sub-divided into savePropertyValues(); addNewFrameBlock(); removeFrameBlock(); and restoreSavedPropertyValues()
                        Mar 11, 2022 (ver. 44)
                            Adding and removing capabilities enabled. However, at
            
                    Last Update by: 
                        Anilson Cardoso

                    Source of Data:
                        arguments (requirements):   (from caller)
                            PropertyTitle           (property Name)
                            actionID                (action id)
                            indexer                 ()
                            frameID                 (frame from/in propertyObject.frame) frameID defines which frame to return and its division (each frame block has a specific id)
                            SetToRemove             (true: remove block || false: add block)
                            isForSubBlockFrame      (true: remove/add subBlock || false: remove/add mainBlock)
                            subBlockFrameHoster     (it defines which element of the mainBlock hoist the subBlock, where is the subBlock placed inside of the mainBlock "cnntBE=subBlockFrameHoster")
                            ExtraBData              (it defines the data to fill the mainBlock, data to fill the elements of the mainBlock. It doesnot include dimensionalData)
                            ExtraSBData             (it defines the data to fill the subBlock, data to fill the elements of the subBlock. It doesnot include dimensionalData)
                           
                    
                    Description:
                        What does it do?
                            if(Bvalue===""){call from head button}
                            if(Bvalue!==""){call from body button or ...}
                            
                            called by property_HeadButton
                            called by property_SubButton
                            called by property_RemovalButton
                            
                            
                        Why is it called
                        
                        Where is it called from
                            head button: [Add New...] - defined on objProperty.frame; edited by uniqueFrame(){getFrame(){objectType=function(){}}
                            body button: [Add New...]
                            
                            eventConfig.js => fbAddFromSelector()
                            eventConfig.js => handleSelector()
                            
                        When is it called

                            
                        How many times is it called
                        How can it be done?

                        
                    Concerns:
                        - (version 44): Even though it can add and remove frames without any problem.
                        - (version 177): this function should also replace frame.edit.eAction.eBody.eProperty.returner().
                            One single point of connection with frame.edit.eAction.eBody.eProperty.uniqueFrame()
                */
                requestFrameBlockFromButton: function(title, actionid, frameID, removeSet, sbSet, cntb, cntsb, extraData=true) 
                {
                    let htmlElement = (aux_existence(sbSet)) ? "subBodyFrame" : "BodyFrame";
                    let fb = new objFB((aux_existence(sbSet)) ? `${title}_${actionid}_${cntb}_${cntsb}` : `${title}_${actionid}`);
                    let oproperty = eval(title);
                    let remover = (aux_existence(removeSet)) ? [cntb, (aux_existence(cntsb)) ? cntsb : -1] : [-1, -1];
                
                
                    /*
                    This calls an internal method of the object 'fb', which will save all the frameblocks, 
                    but any frameblock set for removal will not be saved and then later the object fb will not be able to re-create it. 
                    */
                    fb.savePropertyFrameValues(fb.index, (sbSet) ? [remover[1]] : remover, oproperty);
                
                
                    if (aux_existence(sbSet)) 
                    {
                        //let shtml = fb.addPropertySubFrameBlock(cntb, (removeSet) ? false : true,  oproperty, frameID).subhtml;
                        let shtml = fb.addPropertySubFrameBlock(cntb, (removeSet) ? false : true,  oproperty, frameID).subhtml;
                        document.getElementById(`subBodyFrame_${title}_${actionid}_${cntb}`).innerHTML = shtml;
                    } 
                    else 
                    {
                        /*
                        It will create a frameblock for all saved objectData and then it creates one extra frameblock,
                        but If removeset is set to true then no extra frameblock will be created.
                        */
                        let { html, subFrameMap } = fb.addPropertyFrameBlock((removeSet) ? false : extraData, oproperty);
                        document.getElementById(`propertyBodyFrame_${fb.index}`, frameID).innerHTML = html;
                       
                        subFrameMap.forEach((m, k) => 
                        {
                            let [o, cntB] = m;
                            let subHtml = o.addPropertySubFrameBlock(cntB, false, oproperty).subhtml;
                            document.getElementById(k).innerHTML = subHtml;
                        });
                    }
                
                    if (aux_existence(fb.children)) 
                    {
                        document.getElementById(`propertyFootFrame_${fb.index}`).classList.remove("closedDisplay");
                        document.getElementById(`propertyFootFrame_${fb.index}`).classList.add("openDisplay");
                    } 
                    else 
                    {
                        document.getElementById(`propertyFootFrame_${fb.index}`).classList.add("closedDisplay");
                        document.getElementById(`propertyFootFrame_${fb.index}`).classList.remove("openDisplay");
                    }
                },
                         
                         
                selectorFrameBlock: function(notUsed, selectedObj, dataFromStore, headObjSelected, objFrame)
                {
                    let dataObj;
                    let dataArr = [];
                    let [mode, property, id, ...toIgnore] = headObjSelected.id.split("_");
                    

                    
                    let storePropertyObj = ((indicatorList)=>
                    {
                        for(let po of indicatorList.children)
                        {
                            if(po.title===property){   return po;}
                        }
                        return;
                    })(dataFromStore);
                    


                    let storePropertyChildrenArr = ((a0, b)=>
                    {
                        for(let a1 of a0.children)
                        {
                            if(a1.title===b.key)
                            {   return a1.children;  }
                        }
                            
                        return [];
                    })(storePropertyObj, selectedObj) 
        
 
 
                      
                    let o1 = ((a0, b)=>
                    {
                        for(let a1 of a0)
                        {   
                            if(a1.title===b.value){     return a1;  }   
                        }
                        
                        return "";
                    })(storePropertyChildrenArr, selectedObj);
                    

                    let o2 = ((o, b)=>
                    {
                        let oo = {[b.key]:b.value};
                        for(let arr1 of o.children)
                        {   
                            for(let names of arr1.children)
                            {
                                oo[arr1.title] = names.title;
                                
                                if(aux_existence(names.children))
                                {   
                                    for(let arr2 of names.children)
                                    {
                                        for(let value1 of arr2.children)
                                        {
                                            oo[arr2.title] = value1.title;
                                            let ooo = Object.assign({}, oo);
                                            dataArr.push(ooo);
                                            
                                            
                                            if(aux_existence(value1.children))
                                            {   
                                                for(let arr3 of value1.children)
                                                {
                                                    for(let value2 of arr3.children)
                                                    {
                                                        ooo[arr2.title] = value.title;
                                                        let oooo = Object.assign({}, ooo);
                                                        dataArr.push(oooo);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else
                                {   
                                    let ooo = Object.assign({}, oo);
                                    dataArr.push(ooo);   
                                }
                            }
                        }
                        
                        console.log(oo);
                    })(o1, selectedObj);
                    
                    
                    dataArr.forEach((objToBeAddedToFB, i0)=>
                    {       
                        frmEdit.eAction.eBody.eProperty.requestFrameBlockFromButton(property, id, "", false, false, true, true, objToBeAddedToFB);   
                    });
                },
                       
                
                placeDimensionalDataFromPermanceStore: function(store, index, returnedData, propertyFrameArr, property)
                {
                    let value="";
                    let links, stat;
                    let dimensionNotVerified = true;
                    let propertyIndicators = returnedData.children;
                    
                    function categoryException(pStore)
                    {
                        function optionObjectifier(obj,  counter = "", level=0, returnIndex1="") 
                        {
                            let returner = (level===0)? "<option>Select Category</option>": "";
                            let cnt1 = parseInt(level) + 1;
                            if (obj) 
                            { 
                                let returnIndex2, cnt2=0;
                                for (let i = 0, l = obj.length; i < l; i++) 
                                {
                                    let o = obj[i], cntO = (counter!=="")? `${counter}_${i + 1}`: `${i+1}`;
                                    
                                    if(o.title!=="...")
                                    { 
                                        cnt2++;
                                        if(level===0) 
                                        {
                                            //returner += `<hr><optgroup label='[ Group: ${i+1} ]'>`; 
                                            returner += `<hr><optgroup label='[ Group: ${cnt2} ]'>`;
                                            returnIndex2 = o.title;
                                        }
                                        else
                                        {   returnIndex2 = `${returnIndex1}_${o.title}`; }
                                        
                                        if ((o.title) && (o.title !== "")) 
                                        {
                                            returner += `<option value='${returnIndex2}'>${cntO}: ${o.title}</option>`;
                            
                                            if ((o.children) && (o.children.length > 0)) 
                                            {   returner += optionObjectifier(o.children, cntO, cnt1, returnIndex2);   }
                                        }
                                        if(level===0) returner += `</optgroup>`;
                                    }
                                }
                            }
                        
                            
                            return returner;
                        }
                        
                        return optionObjectifier(pStore);
                    }
                    
                    
                    function setListor(arr)
                    {
                        let returner = (aux_existence(arr))? `<option value='--- [ Select Existing Names ] ---' >`: "";
                        
                        if(aux_existence(arr))
                        {
                            for(let a of arr)
                            {
                                if(aux_existence(a))
                                {      
                                    if((a.indexOf("-0###@")===-1)&&(a.indexOf("-1###@")===-1)&&(a.indexOf("-0#@")===-1)&&(a.indexOf("-1#@")===-1)&&(a.indexOf("#action#@")===-1))
                                    {   returner += "<option value=\"" + a + "\" >";    }
                                }
                            }
                        }
                        
                        return returner; 
                    }
                    
                    
                    function setSelector(data, selector, index)
                    {
                        let returner = "";
                        for(let aLen=data.length, a=0; a<aLen; a++)
                        {
                            if(aux_existence(data[a]))
                            {      
                                if((data[a].indexOf("-0###@")===-1)&&(data[a].indexOf("-1###@")===-1)&&(data[a].indexOf("-0#@")===-1)&&(data[a].indexOf("-1#@")===-1)&&(data[a].indexOf("#action#@")===-1))  
                                {
                                    returner += `<option data-index='${index? index: ""}'  value='${data[a]}'  ${data[a]!==selector? "": "selected"}>${aux_textSignIn(data[a])}</option>`;  
                                }
                            }
                        }
                        
                        return returner;                     
                    }
                
                    
 
                    function getDimension(psArr, frameArr, head)
                    {
                        let arr = []
                        
                        loopFinder = function(a,b)
                        {
                            if(aux_existence(a))
                            {
                                for(let aa of a)
                                {   if(aa.title===b){return aa;}}
                            }
                            return;
                        }
                        
                        if(aux_existence(head))
                        {
                            //for(let oLabel of ["_class1","_class2","_name"])
                            for(let oLabel of ["_class1","_class2"])
                            {
                                let arr1 = [oLabel];
                                
                                if(aux_existence(oLabel))
                                {
                                    let eo = loopFinder(psArr, oLabel);
                                    let arr2 = [];
                                    if(aux_existence(eo))
                                    {
                                        if(aux_existence(eo.children))
                                        {
                                            for(let innerInnerStoreObj of eo.children)
                                            {   arr2.push(innerInnerStoreObj.title);   }  
                                        }
                                    }
                                    
                                    arr1.push(arr2);
                                } 
                                arr.push(arr1);
                            }                            
                        }
                        else
                        {
                            for(let frObj of frameArr)
                            {
                                let oLabel = (aux_existence(frObj.labelID))? frObj.labelID: frObj.label;
                                let arr1 = [oLabel];
                                
                                if(aux_existence(frObj.outerProperty))
                                {   arr1.push(`###_${frObj.outerProperty}`); }
                                else
                                {
                                    let eo = loopFinder(psArr, oLabel);
                                    let arr2 = [];
                                    if(aux_existence(eo))
                                    {
                                        if(aux_existence(eo.children))
                                        {
                                            for(let innerInnerStoreObj of eo.children)
                                            {   arr2.push(innerInnerStoreObj.title);   }  
                                        }
                                    }
                                    
                                    arr1.push(arr2);
                                } 
                                arr.push(arr1);
                            }
                        }
                        return arr;
                    }                    
                   
                   
                    if(property.includes("Risk"))
                    {
                        let cnt=0, value1;
                        for(let propertyStoreObj of propertyIndicators)
                        {
                            cnt++;
                            if(property[0]===propertyStoreObj.title)
                            {   
                                value1 = getDimension(propertyStoreObj.children, propertyFrameArr, index);  
                            
                                if(index.includes("head"))
                                {
                                    if(aux_existence(document.getElementById(`${index}_2`)))
                                    {
                                        let value2 = value1[1][1];
                                        value2.sort();
                                        document.getElementById(`${index}_2`).innerHTML  = `<option>--- [Select Risk] ---</option>${setSelector(value2)}`;
                                        break; 
                                    }   
                                }
                                
                                
                                for(let opf of propertyFrameArr)
                                {
                                    let label = (opf.labelID)? opf.labelID: opf.label;
                                    
                                    if((aux_existence(opf.dimensional))&&(aux_existence(label)))
                                    {
                                        let i = value1.findIndex(varr => varr[0]===label);
                                        if(aux_existence(document.getElementById(`list_${index}_${i+1}`)))
                                        {
                                            document.getElementById(`list_${index}_${i+1}`).innerHTML  = setListor(value1[i][1].sort());
                                        }
                                    }
                                }
                            }
                        }  
                        
                        dimensionNotVerified = false;
                    }
                    
                    
                    if(property.includes("ListItem"))
                    {
                        let cnt=0, value1;
                        for(let propertyStoreObj of propertyIndicators)
                        {
                            cnt++;
                            if(property[0]===propertyStoreObj.title)
                            {   
                                let headValue = index.includes("head")? true: false;
                                let value1 = getDimension(propertyStoreObj.children, propertyFrameArr, headValue);  
                            
                                if(headValue)
                                {
                                    if(aux_existence(document.getElementById(`${index}_2`)))
                                    {
                                        let optionValue = "<option>--- [Select Class Group] ---</option>";
                                        for(let valueArr of value1)
                                        {
                                            let value3, value4;
                                            let arr1 = valueArr[1];
                                            arr1.sort();
                                            if(valueArr[0]==="_class1"){    value3="Class-1";   }
                                            if(valueArr[0]==="_class2"){    value3="Class-2";   }
                                            
                                            optionValue += `<optgroup label="--- [${value3}] ---">
                                                                ${setSelector(arr1, "", valueArr[0])}
                                                            </optgroup>`;
                                        }
                                        
                                        document.getElementById(`${index}_2`).innerHTML  = optionValue;
                                        break; 
                                    }   
                                }
                                
                                
                                for(let opf of propertyFrameArr)
                                {
                                    let label = (opf.labelID)? opf.labelID: opf.label;
                                    
                                    if((aux_existence(opf.dimensional))&&(aux_existence(label)))
                                    {
                                        let i = value1.findIndex(varr => varr[0]===label);
                                        if(aux_existence(document.getElementById(`list_${index}_${i+1}`)))
                                        {
                                            document.getElementById(`list_${index}_${i+1}`).innerHTML  = setListor(value1[i][1].sort()) + document.getElementById(`list_${index}_${i+1}`).innerHTML;
                                        }
                                    }
                                }
                            }
                        }  
                        
                        dimensionNotVerified = false;
                    }
                          
                                        
                    if(property.includes("Locations"))
                    {
                        let cnt=0, value1;
                        for(let propertyStoreObj of propertyIndicators)
                        {
                            cnt++;
                            if(property[0]===propertyStoreObj.title)
                            {   
                                value1 = getDimension(propertyStoreObj.children, propertyFrameArr, index);  
                            
                                if(index.includes("head"))
                                {
                                    if(aux_existence(document.getElementById(`${index}_2`)))
                                    {
                                        let value2 = value1[1][1];
                                        value2.sort();
                                        document.getElementById(`${index}_2`).innerHTML  = `<option>--- [Select Locations] ---</option>${setSelector(value2)}`;
                                        break; 
                                    }   
                                }
                                
                                
                                for(let opf of propertyFrameArr)
                                {
                                    let label = (opf.labelID)? opf.labelID: opf.label;
                                    
                                    if((aux_existence(opf.dimensional))&&(aux_existence(label)))
                                    {
                                        let i = value1.findIndex(varr => varr[0]===label);
                                        if(aux_existence(document.getElementById(`list_${index}_${i+1}`)))
                                        {
                                            document.getElementById(`list_${index}_${i+1}`).innerHTML  = setListor(value1[i][1].sort()) + document.getElementById(`list_${index}_${i+1}`).innerHTML;
                                        }
                                    }
                                }
                            }
                        }  
                        
                        dimensionNotVerified = false;
                    }
                    
                    
                    if(property.includes("Contacts"))
                    {
                        let cnt=0, value1;
                        for(let propertyStoreObj of propertyIndicators)
                        {
                            cnt++;
                            if(property[0]===propertyStoreObj.title)
                            {   
                                value1 = getDimension(propertyStoreObj.children, propertyFrameArr, index);  
                            
                                if(index.includes("head"))
                                {
                                    if(aux_existence(document.getElementById(`${index}_2`)))
                                    {
                                        let value2 = value1[1][1];
                                        value2.sort();
                                        document.getElementById(`${index}_2`).innerHTML  = `<option>--- [Select Contacts] ---</option>${setSelector(value2)}`;
                                        break; 
                                    }   
                                }
                                
                                
                                for(let opf of propertyFrameArr)
                                {
                                    let label = (opf.labelID)? opf.labelID: opf.label;
                                    
                                    if((aux_existence(opf.dimensional))&&(aux_existence(label)))
                                    {
                                        let i = value1.findIndex(varr => varr[0]===label);
                                        if(aux_existence(document.getElementById(`list_${index}_${i+1}`)))
                                        {
                                            document.getElementById(`list_${index}_${i+1}`).innerHTML  = setListor(value1[i][1].sort()) + document.getElementById(`list_${index}_${i+1}`).innerHTML;
                                        }
                                    }
                                }
                            }
                        }  
                        
                        dimensionNotVerified = false;
                    }
                                        
                    
                    if(property.includes("Resources"))
                    {
                        let cnt=0, value1;
                        for(let propertyStoreObj of propertyIndicators)
                        {
                            cnt++;
                            if(property[0]===propertyStoreObj.title)
                            {   
                                value1 = getDimension(propertyStoreObj.children, propertyFrameArr, index);  
                            
                                if(index.includes("head"))
                                {
                                    if(aux_existence(document.getElementById(`${index}_2`)))
                                    {
                                        let value2 = value1[1][1];
                                        value2.sort();
                                        document.getElementById(`${index}_2`).innerHTML  = `<option>--- [Select Resources] ---</option>${setSelector(value2)}`;
                                        break; 
                                    }   
                                }
                                
                                
                                for(let opf of propertyFrameArr)
                                {
                                    let label = (opf.labelID)? opf.labelID: opf.label;
                                    
                                    if((aux_existence(opf.dimensional))&&(aux_existence(label)))
                                    {
                                        let i = value1.findIndex(varr => varr[0]===label);
                                        if(aux_existence(document.getElementById(`list_${index}_${i+1}`)))
                                        {
                                            document.getElementById(`list_${index}_${i+1}`).innerHTML  = setListor(value1[i][1].sort());
                                        }
                                    }
                                }
                            }
                        }  
                        
                        dimensionNotVerified = false;
                    }
                          
                    
                    if(property.includes("Variables"))
                    {
                        let cnt=0, value1;
                        for(let propertyStoreObj of propertyIndicators)
                        {
                            cnt++;
                            if(property[0]===propertyStoreObj.title)
                            {   
                                value1 = getDimension(propertyStoreObj.children, propertyFrameArr, index);  
                            
                                if(index.includes("head"))
                                {
                                    if(aux_existence(document.getElementById(`${index}_2`)))
                                    {
                                        let value2 = value1[1][1];
                                        value2.sort();
                                        document.getElementById(`${index}_2`).innerHTML  = `<option>--- [Select Variables] ---</option>${setSelector(value2)}`;
                                        break; 
                                    }   
                                }
                                
                                
                                for(let opf of propertyFrameArr)
                                {
                                    let label = (opf.labelID)? opf.labelID: opf.label;
                                    
                                    if((aux_existence(opf.dimensional))&&(aux_existence(label)))
                                    {
                                        let i = value1.findIndex(varr => varr[0]===label);
                                        if(aux_existence(document.getElementById(`list_${index}_${i+1}`)))
                                        {
                                            document.getElementById(`list_${index}_${i+1}`).innerHTML  = setListor(value1[i][1].sort());
                                        }
                                    }
                                }
                            }
                        }  
                        
                        dimensionNotVerified = false;
                    }
                          
                                        
                    if(property.includes("Transactions"))
                    {
                        let componentArr    = ["Transactions", "Contacts", "Resources", "Variables"];
                        let propertyMap     = new Map();
                        
                        
                        for(let propertyStoreObj of propertyIndicators)
                        {
                            if(componentArr.includes(propertyStoreObj.title))
                            {
                                if(!aux_existence(propertyMap.has(propertyStoreObj.title)))
                                {   propertyMap.set(propertyStoreObj.title,{storeObj:propertyStoreObj.children, framer:eval(propertyStoreObj.title).frame.returner().eframe, Arr:[], returnIndex:""});  }
                            }
                        }  
                        
                        propertyMap.forEach((value, element)=>
                        {   
                            //if(aux_existence(value.storeObj))
                            {   value.Arr = getDimension(value.storeObj, value.framer);  }
                        });
                        
                        
                        propertyMap.forEach(elementMapped=>
                        {   
                            let arr1 = elementMapped.Arr;
                            for(let i0=0, iLen0=arr1.length; i0<iLen0; i0++)
                            {
                                if(arr1[i0][1].includes("###_"))
                                {
                                    let nProperty = arr1[i0][1].split("_")[1];
                                    if(aux_existence(propertyMap.get(nProperty)))
                                    {
                                        let arr2 = propertyMap.get(nProperty).Arr;
                                        
                                        for(let i1=0, iLen1=arr2.length; i1<iLen1; i1++)
                                        {
                                            if(arr2[i1][0]==="_name")
                                            {  arr1[i0][1] = arr2[i1][1]; }
                                        }
                                        
                                        elementMapped.Arr = arr1;
                                    }
                                }
                            }
                        });                        
                        
                        
                        let propertyArr;
                        let r;
                        if(propertyFrameArr[0]["labelID"]==="_class0")
                        {   
                            let key  = propertyFrameArr[0]["attribute"]["data_sub_property"];   
                            propertyArr = ((key==="_resource1")||(key==="_resource2"))? propertyMap.get("Resources"): propertyMap.get(key);   //propertyMap.get(propertyFrameArr[0]["attribute"]["data_sub_property"]);   
                            r=2;
                        }
                        else
                        {   
                            propertyArr = propertyMap.get("Transactions");   
                            r=1;
                        }
                        
                        
                        for(let x=0, xLen=propertyFrameArr.length; x<xLen; x++)
                        {   
                            if(aux_existence(document.getElementById(`list_${index}_${x+r}`)))
                            {   document.getElementById(`list_${index}_${x+r}`).innerHTML= setListor(propertyArr.Arr[x][1]);  }
                        }                        
                        
                        
                        dimensionNotVerified = false;
                    }


                    if(property.includes("Analysis"))
                    {
                        let cnt=0, value1;
                        for(let propertyStoreObj of propertyIndicators)
                        {
                            cnt++;
                            if(property[0]===propertyStoreObj.title)
                            {   
                                value1 = getDimension(propertyStoreObj.children, propertyFrameArr, index);  
                            
                                if(index.includes("head"))
                                {
                                    if(aux_existence(document.getElementById(`${index}_2`)))
                                    {
                                        let value2 = value1[1][1];
                                        value2.sort();
                                        document.getElementById(`${index}_2`).innerHTML  = `<option>--- [Select Analysis] ---</option>${setSelector(value2)}`;
                                        break; 
                                    }   
                                }
                                
                                
                                for(let opf of propertyFrameArr)
                                {
                                    let label = (opf.labelID)? opf.labelID: opf.label;
                                    
                                    if((aux_existence(opf.dimensional))&&(aux_existence(label)))
                                    {
                                        let i = value1.findIndex(varr => varr[0]===label);
                                        if(aux_existence(document.getElementById(`list_${index}_${i+1}`)))
                                        {
                                            document.getElementById(`list_${index}_${i+1}`).innerHTML  = setListor(value1[i][1].sort());
                                        }
                                    }
                                }
                            }
                        }  
                        
                        dimensionNotVerified = false;
                    }
                    
                    
                    if(property.includes("Closure"))
                    {
                        let cnt=0, value1;
                        for(let propertyStoreObj of propertyIndicators)
                        {
                            cnt++;
                            if(property[0]===propertyStoreObj.title)
                            {   
                                value1 = getDimension(propertyStoreObj.children, propertyFrameArr, index);  
                            
                                if(index.includes("head"))
                                {
                                    if(aux_existence(document.getElementById(`${index}_2`)))
                                    {
                                        let value2 = value1[1][1];
                                        value2.sort();
                                        document.getElementById(`${index}_2`).innerHTML  = `<option>--- [Select Closure] ---</option>${setSelector(value2)}`;
                                        break; 
                                    }   
                                }
                                
                                
                                for(let opf of propertyFrameArr)
                                {
                                    let label = (opf.labelID)? opf.labelID: opf.label;
                                    
                                    if((aux_existence(opf.dimensional))&&(aux_existence(label)))
                                    {
                                        let i = value1.findIndex(varr => varr[0]===label);
                                        if(aux_existence(document.getElementById(`list_${index}_${i+1}`)))
                                        {
                                            document.getElementById(`list_${index}_${i+1}`).innerHTML  = setListor(value1[i][1].sort());
                                        }
                                    }
                                }
                            }
                        }  
                        
                        dimensionNotVerified = false;
                    }
                    
                    
                    
                    if(dimensionNotVerified)
                    {
                        for(let propertyStoreObj of returnedData.children)
                        {
                            if(property.includes(propertyStoreObj.title))
                            {
                                if(propertyStoreObj.title==="Category")
                                {  
                                    console.log("Category Index: ", `${index}`);
                                    if(index.includes("head"))
                                    {
                                        let elementCounter = 2;     //in propertyHead, the selector is in position (2)
                                        document.getElementById(`${index}_${elementCounter}`).innerHTML = categoryException(propertyStoreObj.children);
                                    }
                                    break;
                                }
                                
                                
                                if(propertyStoreObj.title==="Status")
                                {  
                                    if(propertyStoreObj.title==="Status"){ stat = propertyStoreObj; }
                                }
                                
                                
                                if(aux_existence(propertyStoreObj.children))
                                {
                                    for(let innerStoreObj of propertyStoreObj.children)
                                    {
                                        let cnt1 = 0, value1=[];
                                        for(let element of propertyFrameArr)
                                        {
                                            cnt1++;
                                            if((innerStoreObj.title===element.label)||(innerStoreObj.title===element.labelID))
                                            {
                                                if(aux_existence(innerStoreObj.children))
                                                {
                                                    for(let innerInnerStoreObj of innerStoreObj.children)
                                                    {   value1.push(innerInnerStoreObj.title);  }
                                                }
                                                
                                                
                                                
                                                if(element.type==="list")
                                                {
                                                    if(aux_existence(document.getElementById(`list_${index}_${cnt1}`)))
                                                    {
                                                        value1.sort();
                                                        document.getElementById(`list_${index}_${cnt1}`).innerHTML  = setListor(value1);
                                                        break; 
                                                    }                                         
                                                }
                                            }
                                        }
                                    }
                                }
                                
                                break;
                            }
                        }
                    }
                },
                
                
                placeDimensionalDataFromActionStore: function(storegroup, index, actionArr, property, data)
                {
                    let gid, glabel, gsymbol, selector = document.getElementById(`list_${index}_3`);
                    //const INTRO_TEXT    = "--- [ Select Existing Names ] ---"; 
                
                    //const selector = document.getElementById(`list_${index}_3`);
                    if (!selector) return;
                
                    
                    function setListor(id, label, arr, selector, userdata, symbol)
                    {
                        let opt0 = document.createElement("option");
                            opt0.text = `${label}`;    
                            selector.appendChild(opt0);
                            
                            for(let a of arr)
                            {
                                let opt1 = document.createElement("option");
                                opt1.id      = a.InternalCode || "";
                                opt1.text    = `${symbol} ${a.Title[0]['_name']}`;
                                selector.appendChild(opt1);
                            }
                    }
                    
                       
                    if(parseInt(storegroup)!==0)
                    {   
                        gid     = "closedActions"; 
                        glabel  = "--- [ Select Closed Actions ] ---";
                        gsymbol = "\u2b24";
                    }
                    else
                    {   
                        gid     = "openActions";
                        glabel  = "--- [ Select Open Actions ] ---"; 
                        gsymbol = "\u25ef";
                    }
                    
                    actionArr.sort(function(a, b)
                    {
                        let x = a.Title[0]['_name'][0].toLowerCase();
                        let y = b.Title[0]['_name'][0].toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    });


                    setListor(gid, glabel, actionArr, selector, data, gsymbol);
                    
 /*                   
                    if (selector.options[0].text!==INTRO_TEXT) 
                    {
                        let value0 = document.createElement("option");
                        value0.text = INTRO_TEXT;
                        selector.prepend(value0);
                    }
 */
 
 
                    if(aux_existence(data))
                    {  document.getElementById(`${data["_reference"][0]}`).selected = true;    }
                    else
                    {   selector.selectedIndex = 0;            }
                }
            },


            /*
                    Last Update: 
                        Dec 25, 2021 (ver. 26)
                        Anilson Cardoso: Jan 05, 2022 (ver. 26)
                            Rearrange the for loop caller(Simplify)
            
                    Last Update by: 
                        Anilson Cardoso

                    Source of Data:
                            argument: indexer                 (action id)
                    
                    Description:
                        What does it do?
                            It gets a list of all properties and loops them to get the frame for all/most of them (most of the properties)
                            It sends each property and the action id to get back a universalBlock frame for the property (with/or without userdata)
                            it adds all the property frame together to form an editable action module`.
                        
                        Why is it called
                            this function gets a list of the properties and send them individually to be formatted
                            
                        Where is it called from
                            frame.edit.eAction.placer()
                            
                        When is it called
                            It is called to build an editable action module which can be for a newAction or to edit an existing action
                            
                        How does it work?
                            Each property is returned wrapped by an universalBlock Frame from (...), then 
                            all the universalBlocks are added together to create an editable action (existing or new)
                            
                    Important Notes: Contact permission has to match the permissions here to preven
                        (06-Feb-2024):
                            To include actions as input of a property and for that all sequence has to change starting from here
                        
                */
            returner: function(indexer, someid, actionData, toBeCloned)
            { 
                let actionProperties = [], editAction = "";
                let notNewAction = false;
                actionProperties = apps.properties;
                /*
                    actionProperties[0] = References
                    actionProperties[1] = Status
                    actionProperties[2] = Title
                    actionProperties[3] = Description
                    actionProperties[4] = DateTime
                    actionProperties[5] = Priority
                    actionProperties[6] = Risk
                    actionProperties[7] = List
                    actionProperties[8] = Category
                    actionProperties[9] = Contacts
                    actionProperties[10] = Locations
                    actionProperties[11] = Resources
                    actionProperties[12] = Transactions
                    actionProperties[13] = Variants
                    actionProperties[14] = Closure
                    actionProperties[15] = Links
                    actionProperties[16] = Attachments
                    actionProperties[17] = Capabilities
                    //actionProperties[18] = States
                    actionProperties[19] = Comments 
                */
                /*
                    
                    permission      = 000 111 111 111 111 110 000 111   (newAction)
                                       1   2   3   4   5   6   7   8
                    
                    permission[0]   = No Access                 0|
                    permission[1]   = Default (Not Counting)    0| 1
                    permission[2]   = Title                     0|
                    
                    permission[3]   = Description               1|
                    permission[4]   = DateTime                  1| 2
                    permission[5]   = Priority                  1|
                    
                    permission[6]   = Category                  1|
                    permission[7]   = Risk                      1| 3
                    permission[8]   = List                      1|
                    
                    permission[9]   = Locations                 1|
                    permission[10]  = Contacts                  1| 4
                    permission[11]  = Resources                 1|
                    
                    permission[12]  = Variables                 1|                     
                    permission[13]  = Transactions              1| 5
                    permission[14]  = Analysis                  1|
                    
                    permission[15]  = Attachments               1| 
                    permission[16]  = Closures                  1| 6
                    permission[17]  = Comments                  0| 
                    
                    permission[18]  = buffer                    0| 
                    permission[19]  = buffer                    0| 7
                    permission[20]  = buffer                    0|
                    
                    permission[21]  = Save                      1|
                    permission[22]  = Close                     1| 8
                    permission[23]  = Delete                    1| 
                    
                    permission[24]  = permission version        0| (can be igonored)
                */
                let len = actionProperties.length;
                let wrapFrame_start="", wrapFrame_end="";
                let permission;
                let deleteButton = false;
                let saveButton = true;
                let piRequest = true;
                let airPermission = false;
            

                function frame_BottomButtons(index, firstLogCNT, [saveBtn, closeBtn, deleteBtn])
                {
                    let button = "";
                    let allowance = false;
                    if(aux_existence(toBeCloned))
                    { deleteBtn="0"; closeBtn="0"; saveBtn="1";}
                    else
                    {   if((saveBtn==="0")||(!saveButton)){ saveBtn="0";}}
                    
                    function frame_buttons(data)
                    {   return "<table style=\"width:100%\"><tr><td colspan = \"2\">" + data + "</td></tr></table>";    }
                    
                    let dbutton = (!airPermission)? "disableButton":""; 
                    
                    button = `<div id='button_${index}_airev' class='${(indexer!=="newAction")? '_Button': '_ButtonDisabled'} ${dbutton}' data-action-edit-end-button='true' style='width:100%; disabled:true;'>AI Revision</div>`;

                    if(saveBtn==="1"){   button += "<div class=\"_Button\" style=\"width:100%;\" onmousedown=\"eHandlerMouseDown(this)\"  onclick=\"update_action_OnFrame('" + index + "', '0', '" + toBeCloned + "')\" >Save</div>";     } //it needs to be changed because closed can also be saved
                    if(closeBtn==="1"){   button += "<div class=\"_Button\" style=\"width:100%;\" onmousedown=\"eHandlerMouseDown(this)\"  onclick=\"update_action_OnFrame('" + index + "', '1')\" >Close</div>";    }
                    
                    if((parseInt(firstLogCNT)===0)&&(!aux_existence(toBeCloned))){   allowance = true; }
                    if(((deleteBtn==="1")||(allowance))&&(!deleteButton)){   button = button + "<div class=\"_Button\" style=\"width:100%;\" onmousedown=\"eHandlerMouseDown(this)\" onclick=\"update_action_OnFrame('" + index + "', '2')\" >Delete</div>";   }


                    if(aux_existence(toBeCloned)){   button += "<div class=\"_Button\" style=\"width:100%;\" onmousedown=\"eHandlerMouseDown(this)\" onclick=\"update_action_OnFrame('" + index + "', '3')\" >Cancel</div>";   }   
                    

                    return button;
                }
                
                
                function getActionReferences(eAction, id, adata)
                {
                    eAction =  eAction + References.eFrame(id, '1', (id==="newAction")? "": adata["ExternalCode"]);             //action external reference
                    eAction =  eAction + References.eFrame(id, '2', (id==="newAction")? "": adata["InternalCode"]);             //action internal reference
                    eAction =  eAction + References.eFrame(id, '3', (id==="newAction")? "": adata["AccessRef"]);                //action access code
                    eAction =  eAction + References.eFrame(id, '4', (id==="newAction")? "": adata["SourceRef"]);                //action sourcer (userDatabase / externalSourcerDatabase)                                  
                    eAction =  eAction + References.eFrame(id, '5', (id==="newAction")? "": adata["ServerRef"]);                //action databases connection checker
                    eAction =  eAction + References.eFrame(id, '6', (id==="newAction")? "": adata["UpdateRef"]);                //latest update in the database                        
                    eAction =  eAction + References.eFrame(id, '7', (id==="newAction")? "": adata["MaxInnerActionCounter"]);    //action log counter inside localDatabase   (userInternalDatabase)                          
                    eAction =  eAction + References.eFrame(id, '8', (id==="newAction")? "": adata["MaxOuterActionCounter"]);    //action log Counter inside webDatabase     (userExternalDatabase)
                    

                    return eAction;
                }
                
                function aiComponentAdded(id)
                {   return  `<div id='body_${id}_AI_revision' class='revisionaction'></div>`; }


                if(indexer!=="newAction")
                {   
                    notNewAction = true;    //existing action
                    
                    
                    if(aux_existence(toBeCloned))
                    {   
                        permission = ("001 111 111 111 111 110 000 111").replaceAll(" ", ""); // By cloning you will be administrator and have full access
                        indexer = "newAction";
                    }      
                    else
                    {  
                        if(actionData["AccessRef"].length < 21)
                        {   
                            permission = `${actionData["AccessRef"]}01110`;    
                            permission = permission.split("");
                            permission[19] = "0";
                            permission.join();
                        }
                        else
                        {   permission = actionData["AccessRef"]; }
                        
                        
                        if(parseInt(actionData["Status"])===1)
                        {   //Status = closed
                            if(!Array.isArray(permission)){permission = permission.split("");}
                            permission[2] = "0";    // why???
                            permission[3] = "0";    // why???
                            permission[4] = "0";    // why???
                            
                            permission = permission.join("");
                        }
                    }
                }   
                else
                {   permission = ("000 111 111 111 111 110 000 111").replaceAll(" ", "");    }  //permission for newAction

                                    
                for(let x=0; x<len; x++)
                {   
                    let full_Display    = "block";
                    let inner_Display   = "none";
                    
                    
                    
                    if(aux_existence(actionProperties[x]))
                    {
                        if(x===0)
                        {   editAction = getActionReferences(editAction, indexer, actionData);   } 
                        else
                        {
                            piRequest = (x>5)? false: true;
                            
                            if(notNewAction)        //id !== newAction
                            {   
                                if(x===1)
                                {   
                                    if(parseInt(actionData[actionProperties[x]])===1)
                                    {   
                                        saveButton = false; 
                                        let p = permission.split("");
                                        p[21] = "0";
                                        p[23] = "0";
                                        //turn off all kpos
                                        p[3]   = "0"; //Description               
                                        p[4]   = "0"; //DateTime                  
                                        p[5]   = "0"; //Priority                  
                    
                                        //permission[6]   = "0"; //Category     (exception)            
                                        p[7]   = "0"; //Risk                      
                                        p[8]   = "0"; //List      
                                        
                                        permission = p.join("");
                                    }
                                }
                                
                                let aData = actionData[actionProperties[x]];
                                if(x>2)             //Start editing from description
                                {   
                                    inner_Display = (aux_existence(aData))? "block": "none";

                                    if(actionProperties[x]==="Description")
                                    {
                                        if(aux_existence(aData))
                                        {
                                            if(aux_existence(aData[0]["_comments"])){   if(aData[0]["_comments"][0].length > 25) airPermission = true;}
                                        }
                                        
                                        editAction +=   "<div id=\"newActionExpandRetract\" >" + 
                                                            "<div style=\"text-align: right;\" onclick=\"frmEdit.eDetails.eExpandAll('" + indexer + "')\" >Expand All</div>" +
                                                        "</div>";                                             
                                    }



                                    if(actionProperties[x]==="DateTime")
                                    {
/*
                                        if(aux_existence(toBeCloned))
                                        {   aData = ""; }
                                        else
                                        {
                                            const colorCode = DateTime.actionColorCode(actionData["Status"], actionData["DateTime"]).cReference;
                                            //if(colorCode<2){  full_Display = "none"; deleteButton=true;}
                                            if(colorCode>=4)
                                            {  
                                                let p       = Array.isArray(permission)? permission: permission.split("");
                                                    p[23]   = "0";  deleteButton = true;    //delete button
                                                    p[4]    = "0";  full_Display = "none";  //DateTime     
                                        
                                                permission  = p.join("");
                                            }
                                        }
*/
                                        if(parseInt(actionData["Status"])!==1)
                                        {   
                                            //active(open) status
                                            const colorCode = DateTime.actionColorCode(actionData["Status"], actionData["DateTime"]).cReference;
                                            if(colorCode>=4)
                                            {  
                                                let p       = Array.isArray(permission)? permission: permission.split("");
                                                    p[23]   = "0";  deleteButton = true;    //delete button
                                                    p[4]    = "0";  full_Display = "none";  //DateTime     
                                        
                                                permission  = p.join("");
                                            } 
                                        }
                                        else
                                        {
                                            full_Display    = "none";
                                            inner_Display   = "none"; 
                                        }
                                    }



                                    if(actionProperties[x]==="Comments")           //create an empty comment block
                                    {   
                                        let commentDateTime = DateTime.aux_ParseTo.extendDateTime();
                                        let commentUserName = sessionStorage.username;
                                        
                                        if(aux_existence(aData))
                                        {   aData.push({_updateby:[commentUserName], _eodt:[commentDateTime], _comments:[""]}); }
                                        else
                                        {   
                                            piRequest = true;
                                            aData = [{_updateby:[commentUserName], _eodt:[commentDateTime], _comments:""}];
                                        }    
                                        
                                        full_Display = "block"; 
                                        inner_Display = "block"; 
                                    }
                                    
                                     
                                         
                                    if(x==(len-1))
                                    {
                                        if(!aux_existence(toBeCloned))
                                        {   full_Display = "block"; inner_Display = "block"; }
                                        else
                                        {   aData = ""; full_Display = "none";}
                                        
                                        if(permission[x]!=="1"){   full_Display = "none"; }  
                                    }
                                    else
                                    {
                                        if(aux_existence(toBeCloned))
                                        {   full_Display = "block"; inner_Display = "block"; }                                       
                                    }
                                    
                                    
                                    
                                    editAction +=  frmEdit.eAction.eBody.eProperty.requestFrameBlockFromAction(actionProperties[x], indexer, (aux_existence(aData))? aData: "", full_Display, inner_Display, actionData["Status"], piRequest);
                                }
                                else
                                {
                                    if(toBeCloned)
                                    {   if(x===2){   editAction +=  frmEdit.eAction.eBody.eProperty.requestFrameBlockFromAction("Title", "newAction", (aux_existence(aData))? aData: "", "block", "block", "0", piRequest);  }  }
                                }
                            }
                            else
                            {   //id===newAction
                                if(x===3)
                                {  
                                    editAction +=   "<div id=\"newActionExpandRetract\" >" + 
                                                        "<div style=\"text-align: right;\" onclick=\"frmEdit.eDetails.eExpandAll('" + indexer + "')\" >Expand All</div>" +
                                                    "</div>";
                                }
                                
                                if(x<3){    inner_Display = "block"; }
                                
                                if((x!==1)&&(x!==(len-1)))
                                {   editAction +=  this.eProperty.requestFrameBlockFromAction(actionProperties[x], indexer, "", full_Display, inner_Display, 0, piRequest); }
                            }
                        }
                    }                               
                }
                     
                
                let head=["","","","","","","",""] 
                let body = editAction + aiComponentAdded(indexer);
                let foot = frame_BottomButtons(indexer, (notNewAction)? actionData["MaxInnerActionCounter"]: 0, [permission[21], permission[22], permission[23]]);
                
                if(indexer!=="newAction")
                {   
                    let classArr = ["openDisplay ",[["noclass","noclass","noclass"],["noclass","noclass","noclass"]], "openDisplay", "openDisplay"];
                    
                    document.getElementById("actionboard_FromMenu_newAction").innerHTML = "";
                    if(aux_existence(toBeCloned))
                    {   
                        document.getElementById(id).innerHTML = "<div id=\"body_newAction\" class=\"reaction\">" + 
                                                                    body + 
                                                                    //"<div id=\"body_newAction_AI_revision\" class=\"revisionaction\"></div>" + 
                                                                "</div>" +
                                                                "<div id=\"foot_newAction\">" + foot + "</div>"; 
                    }
                    else
                    {
                        if(document.getElementById("body_" + indexer))
                        { 
                            document.getElementById("body_" + indexer).innerHTML = body;   
                            document.getElementById("body_" + indexer).classList.add("reaction");  
                            //document.getElementById("body_" + indexer).appendChild(`<div id='body_${indexer}_AI_revision' class='revisionaction'></div>`);
                            document.getElementById("foot_" + indexer).innerHTML = foot;
                        }
                        
                        document.getElementById(indexer).setAttribute("data-display-mode","edit");
                    }
                    
                    document.getElementById("headeditor_" + indexer).classList.toggle("closedDisplay");
                    
                    document.getElementById("foot_" + indexer).classList.remove("actionFootDMode");
                    document.getElementById("foot_" + indexer).classList.add("actionFootEMode");
                }
                else
                {   
                    let editNewActionBoard = document.getElementById("actionboard_FromMenu_newAction");
                    
                    if(editNewActionBoard.innerHTML!=="")
                    {   editNewActionBoard.innerHTML="";   }
                    
                  
                    let classArr = ["openDisplay", [["noclass","noclass","noclass"],["noclass","noclass","noclass"]], "openDisplay reaction", "openDisplay"];
                    editNewActionBoard.innerHTML=collapseBlock("", head, [body,false], [foot], [indexer,"",""], classArr);  
                    
                    
                    aux_collapseMenuDIV('Menu_newAction'); 
                }
            },
        },
        
        
        /*
        Last Update: 
            Dec 25, 2021 (ver. 26)
            
        Last Update by: 
            Anilson Cardoso
            
        called from: 
            (Set by) frame.Display.Detail.Action.Footer
                To edit (update) an existing action
                To clone an existing action
            from Menu Button (New Action)
                To create a very new action
            
        Description:
            It sends the id to edit and returns a full action with edition frame, and then place (diplay) it on the page for the user.
            Meaning that it gets an action into edit mode ready for the user to input data.

        */             
        placer: function(id, CloneAction)
        {   
            if(id!=="newAction")
            {   loadDataFromStore("Actions", parseInt(id), "", frmEdit.eAction.eBody.returner, "", CloneAction);  }
            else
            {   
                frmEdit.eAction.eBody.returner(id);    
                frmEdit.eDetails.eAI_buttonActivation(id);
            }
            
            
            populate_eHandlers();
        }
    },


    
    eDetails:
    {
        efocusON: function(indexer) 
        { 
            let [mode, property, id, block, belement, sblock, sbelement] = indexer.split("_");
            let docvalue = document.getElementById(indexer);
            
            document.getElementById(indexer).style.backgroundColor = "#d6f5f5";  
        },


        efocusOFF: function(indexer) 
        { 
            let [mode, property, id, block, belement, sblock, sbelement] = indexer.split("_");
            let docvalue = document.getElementById(indexer);
            
            let titleActivation = false; descriptionActivation = false;
            let tIndex, dIndex;
            
            docvalue.style.backgroundColor = "white"; 
            
            tdoc = document.getElementById(`${mode}_title_${id}_${block}_1`);
            if(tdoc)
            {
                if(tdoc.value.length> 5 )
                titleActivation = true;
            }
            
            ddoc = document.getElementById(`${mode}_description_${id}_${block}_1`);
            if(ddoc)
            {
                if(tdoc.value.length > 5 )
                titleActivation = true;
            }
        },
        
        
        eConfigureDateTimeToNumeric: function(title, id, indexer)
        {
            let element = document.getElementById(indexer);
            let dt = element.value;
            let newNumericDateTime = DateTime.aux_ParseTo.numericDateTime(dt);
            element.setAttribute("buffervalue", newNumericDateTime);
        },
        
        
        efocusTransformation: function(title, id, indexer)
        { 
            let vmArr  = indexer.split("_");
                vmArr.pop();
                vm1Arr = [...vmArr];
                vm1Arr.push(3);
            let vm1Index    = vm1Arr.join("_");
            let vm1 = document.getElementById(vm1Index).value;
                
                vm2Arr = [...vmArr];
                vm2Arr.push(5);
            let vm2Index    = vm2Arr.join("_");
            let vm2 = document.getElementById(vm2Index).value;
            
            
            let transform = [...vmArr];
                transform.push(6);
            let transformIndex = transform.join("_");  
            let tvalue = document.getElementById(transformIndex).value;
            
            
            let vtotalArr = [...vmArr];
                vtotalArr.push(7);
            let vtotalIndex = vtotalArr.join("_");
                
            
            
            
            
            vm1 = (isNaN(parseFloat(vm1)))? 1: parseFloat(vm1);
            vm2 = (isNaN(parseFloat(vm2)))? 1: parseFloat(vm2);

            if(tvalue==="=(VM1)"){   document.getElementById(vtotalIndex).value = vm1;}
            if((tvalue==="=(VM1)*(VM2)")||(tvalue==="=(VM1)(VM2)")){   document.getElementById(vtotalIndex).value = vm1 * vm2;}
            if(tvalue==="=(VM1)/(VM2)"){   document.getElementById(vtotalIndex).value = vm1 / vm2;}
            if(tvalue==="=(VM1)+(VM2)"){   document.getElementById(vtotalIndex).value = vm1 + vm2;}
            
            frmEdit.eDetails.efocusOFF(title, id, indexer);
        },
        
        
        eExpandAll: function(id)
        {
            let propertyList = apps.properties; //document.getElementById("properties").value.split("*|3f2x|*");
            let ab = document.querySelector(".reaction"); //document.getElementById("body_newAction");
            let nabh = ab.scrollHeight;
            let cntH = 0;
            for(let x0=3, x1=(propertyList.length); x0<x1; x0++)
            {
                let headArrow = document.getElementById("arrow_" + propertyList[x0] + "_" + id);
                if(aux_existence(headArrow))   headArrow.innerText = "\u25bc";
                
                let body = document.getElementById("body_" + propertyList[x0] + "_" + id);
                if(aux_existence(body))
                {
                    body.classList.remove("closedDisplay");
                    body.classList.add("openDisplay");
                    body.style.display = "block";       
                    
                    let foot = document.getElementById("foot_" + propertyList[x0] + "_" + id);
                    foot.classList.remove("closedDisplay");
                    foot.classList.add("openDisplay");                            
                    foot.style.display = "block";          
                        
    
                    let bHeight = body.scrollHeight;
                    body.style.maxHeight = bHeight + "px";
                    cntH = cntH + Number(bHeight);
                }
            }
            
            ab.style.maxHeight = Number(nabh) + Number(cntH) + "px";
            
           document.getElementById("newActionExpandRetract").innerHTML = "<div style=\"text-align: right;\" onclick=\"frmEdit.eDetails.eRetractAll('" + id + "')\" >Retract All</div>";
        },


        eRetractAll: function(id)
        {
            let propertyList =  apps.properties; 
            
            for(let x0=3, x1=(propertyList.length); x0<x1; x0++)
            {
                const hpropertyArrow = document.getElementById("arrow_" + propertyList[x0] + "_" + id);
                const bproperty = document.getElementById("body_" + propertyList[x0] + "_" + id);
                const fproperty = document.getElementById("foot_" + propertyList[x0] + "_" + id);
                
                if(hpropertyArrow)
                {
                    hpropertyArrow.innerText = "\u25b6";
                }
                
                if(aux_existence(bproperty))
                {
                    bproperty.classList.remove("openDisplay");
                    bproperty.classList.add("closedDisplay");
                    bproperty.style.display = "none";  
                }
                    
                if(fproperty)
                {
                    fproperty.classList.remove("openDisplay");
                    fproperty.classList.add("closedDisplay");
                    fproperty.style.display = "none";                                  
                }
                
            }
            
           document.getElementById("newActionExpandRetract").innerHTML = "<div style=\"text-align: right;\" onclick=\"frmEdit.eDetails.eExpandAll('" + id + "')\" >Expand All</div>";
        },
        
           
        eAI_buttonActivation: function(id)
        {
            document.getElementById(id).addEventListener("focusout", (e)=>
            {
                const [mode, property, aid, block, element] = e.target.id.split("_");       
                const btnAI = document.getElementById(`button_${aid}_airev`);
                if(aux_existence(e.target.value))
                {
                    btnAI.classList.remove("_ButtonDisabled");
                    btnAI.classList.add("_Button");
                }
                else
                {
                    btnAI.classList.add("_ButtonDisabled");
                    btnAI.classList.remove("_Button");
                }
            });
        },
        
        mover:
        {
            blockframe: function(propertyIndex, mover)
            {
                let bfArray = [];
                let SBE = "";
                let dataUpdateRequired = false;
                let movingSub = false;
                let objMoved;
                let [mode, property, id, cntB, cntSB, ...Element] = propertyIndex.split("_");
                let propertyObj = eval(property);
                let indexer = `${property}_${id}`;
                let ofb = new objFB(indexer);
                
                
                ofb.savePropertyFrameValues(indexer, false, propertyObj);

/*
                if(mover!=="Up")
                {   objMoved = this.Downer(property, id, (cntB-1), (aux_existence(Element))? parseInt(cntSB)-1: "", bfObj); }
                else
                {   objMoved = this.Upper(property, id, (cntB-1), (aux_existence(Element))? parseInt(cntSB)-1: "", bfObj); }      
*/                
  
                if(mover!=="Up")
                {   this.Downer(property, id, (cntB-1), (aux_existence(Element))? parseInt(cntSB)-1: "", ofb); }
                else
                {   this.Upper(property, id, (cntB-1), (aux_existence(Element))? parseInt(cntSB)-1: "", ofb); }    
                
                
                if(aux_existence(Element))
                {   
                    let frameid = document.getElementById(`${mode}_${property}_${id}_${cntB}_${cntSB}_0`).value;
                    document.getElementById(`subBodyFrame_${indexer}_${cntB}`).innerHTML = ofb.children[cntB-1].addPropertySubFrameBlock((cntB-1), false, propertyObj, frameid).subhtml; 
                }
                else
                {   
                    document.getElementById(`propertyBodyFrame_${indexer}`).innerHTML = ofb.addPropertyFrameBlock().html;  
                }
            },


            transferChildren: function(parentO, oArr)
            {
                let arr = [];
                oArr.forEach((o, i)=>
                {
                    o.index = `${parentO.index}_${(i+1)}`;
                    o.parentIndex = parentO.index;
                    arr.push(o);
                });
                
                return arr;
            },
            
            
            Upper: function(title, id, moveB, moveSB, obj)
            {   
                let arrObj = obj.children;
                
                if(aux_existence(moveSB))
                {               
                    let moveObj = arrObj[parseInt(moveB)];
                    if((moveObj.children.length-1)>parseInt(moveSB))
                    {
                        let buffer = moveObj.children[parseInt(moveSB)+1].body.data;
                        moveObj.children[parseInt(moveSB)+1].body.data = moveObj.children[parseInt(moveSB)].body.data;
                        moveObj.children[parseInt(moveSB)].body.data = buffer;
                    }
                    else
                    {   alert("Cannot Move Higher"); }
                }
                else
                {
                    if((arrObj.length-1)>parseInt(moveB))
                    {
                        let buffer  = arrObj[parseInt(moveB)].body.data;
                        let cbuffer = arrObj[parseInt(moveB)].children;
                        
                        arrObj[parseInt(moveB)].body.data = arrObj[parseInt(moveB)+1].body.data;
                        arrObj[parseInt(moveB)].children  = this.transferChildren(arrObj[parseInt(moveB)], arrObj[parseInt(moveB)+1].children);
                        
                        arrObj[parseInt(moveB)+1].body.data = buffer;
                        arrObj[parseInt(moveB)+1].children  = this.transferChildren(arrObj[parseInt(moveB)+1], cbuffer);
                    }
                    else
                    {   alert("Cannot Move Higher"); }
                }
            },
            
            
            Downer: function(title, id, moveB, moveSB, obj)
            {
                let moveDone = false;
                let arrObj = obj.children;
                if(aux_existence(moveSB))
                {         
                    let moveObj = arrObj[parseInt(moveB)];
                    if(parseInt(moveSB)>0)
                    {
                        let buffer = moveObj.children[parseInt(moveSB)-1].body.data;
                        moveObj.children[parseInt(moveSB)-1].body.data = moveObj.children[parseInt(moveSB)].body.data;
                        moveObj.children[parseInt(moveSB)].body.data   = buffer;
                    }
                    else
                    {   alert("Cannot Move Lower"); }
                }
                else
                {
                    if(parseInt(moveB)>0)
                    {
                        let buffer  = arrObj[parseInt(moveB)].body.data;
                        let cbuffer = arrObj[parseInt(moveB)].children;
                        
                        arrObj[parseInt(moveB)].body.data = arrObj[parseInt(moveB)-1].body.data;
                        arrObj[parseInt(moveB)].children  = this.transferChildren(arrObj[parseInt(moveB)], arrObj[parseInt(moveB)-1].children);
                        
                        arrObj[parseInt(moveB)-1].body.data = buffer;
                        arrObj[parseInt(moveB)-1].children  = this.transferChildren(arrObj[parseInt(moveB)-1], cbuffer);
                    }
                    else
                    {   alert("Cannot Move Lower"); }
                }
            },
            
 
            
/*  
This features have to be paused because they are not working properly and they are causing freeze to the application
            handleDragStart: function(evt, index) 
            {
                evt.dataTransfer.setData("text/plain", index);  // Store the dragged index
                evt.target.style.opacity = "0.5";  // Visual feedback
            },


            handleDragOver: function(evt) 
            {
                evt.preventDefault();  // Allow drop
            },
            
            
            handleDrop: function(evt, targetIndex) 
            {
                evt.preventDefault();
                let draggedIndex = evt.dataTransfer.getData("text/plain");
                if (draggedIndex === targetIndex) return;  // No-op if same
            
                // Determine if sub-block or main block (parse indices)
                let [prop, aid, dragB, dragSB] = draggedIndex.split('_').slice(1);  // Adjust based on index format
                let [tprop, taid, targetB, targetSB] = targetIndex.split('_').slice(1);            
            
                let o = new objFB(`${prop}_${aid}`);
                // Get current obj (from saveFrameBlock or global reference)
                let bfObj = o.savePropertyFrameValues(o, dragSB, prop);  // Reuse existing save logic
            

            
                // Reorder: Swap or insert based on positions (extend Upper/Downer logic)
                if (parseInt(dragB) > parseInt(targetB)) 
                {
                    bfObj = this.Upper(tprop, taid, targetB, dragSB, bfObj);  // Move up
                } 
                else 
                {
                    bfObj = this.Downer(prop, aid, dragB, targetSB, bfObj);  // Move down
                }
            
                // Re-render
                o.addPropertyFrameBlock(bfObj);  // Or addSubBlockFrame if sub-block
            },
            
            
            handleDragEnd: function(evt) 
            {
                evt.target.style.opacity = "1";  // Reset visual
            }
*/
handleDragStart:    ()=>{},
handleDragOver:     ()=>{},
handleDrop:         ()=>{},
handleDragEnd:      ()=>{} 

        },
    },
      
      
    /*
    Last Update: 
    Last Update by: Anilson Cardoso
    called from: 
            
    Description:
           
    */  
    edit_Detail:    function(a)
    {
        var dtext = document.getElementById("newActionDetail").innerText;
    
        if(dtext != "More Details")
        {   dtext = "More Details";  }
        else
        {   dtext = "Less Details"; }

        document.getElementById("newActionDetail").innerText = dtext;
        aux_colapseDIV(a);
    },
    



    /*
    Last Update: 
    Last Update by: Anilson Cardoso
    called from: 
            
    Description:
           
    */      
    edit_PageReset: function(starter)
    {
        document.getElementById("pageMenu").value = "";    
        document.getElementById("pageBody").innerHTML = "";
        if(starter)
        {   document.getElementById("menuControl").value = "fromMenu_0,fromMenu_1";   }
    },
    
    
    
    /*
    Last Update: 
    Last Update by: Anilson Cardoso
    called from: 
            
    Description:
           
    */          
    edit_PageClear: function()
    {   document.getElementById("actionBody_0").innerHTML = frmEdit.eAction.eBody.returner("newAction");  },
};


