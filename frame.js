const frame = 
{
    pageInitializer: function(filtered)
    {
        document.getElementById("menuControl").value = "fromMenu_report,fromMenu_newAction"; 

        document.getElementById("reportBoard").innerHTML =   "<div id=\"fromMenu_report\" style=\"display:none;\">" +
                                                                "<div id=\"reportboard_FromMenu_report\"  class=\"aboardFromMenu\"></div>" +
                                                            "</div>";

        document.getElementById("actionBoard").innerHTML = "<div id=\"fromMenu_newAction\" style=\"display:none;\" class=\"fromMenu\">" +
                                                            "<div id=\"actionboard_FromMenu_newAction\" class=\"aboardFromMenu\"></div>" +
                                                        "</div>";
    },    
    
    
    structure:
    {
        appendToChildren: function(obj)
        {
            let node;
            if(aux_existence(obj))
            {            
                const {element="", text="", html="", docToAppend=document.body, attributes=[] } = obj;
                

                    if(aux_existence(document.getElementById(docToAppend)))
                    {    node = document.getElementById(docToAppend);   }
                    else
                    {    node = document.createElement(element);   }
                        
                        
                    if(aux_existence(attributes))
                    {
                        for(let {key, data} of attributes)
                        {   node.setAttribute(key, data); }
                    }
                    
                    if(aux_existence(text))
                    {  rnode.innerText = text;  }
                    
                    if(aux_existence(html))
                    {   
                        node.innerHTML += html;  
                        //node.innerHTML += frame.Display.Detail.report.returner();
                    }
            }
        }
    },

    
    edit: 
    {
/*
The order:
- edit_menu
- edit_action
-- edit_body
--- edit_expandproperty

*/
        eObjProto:
        {
            bodyFramer: function(thisObj)
            {
                let thisReturner = "";
                let md = thisObj.body.mapReturner, mdLen = md.size;
                let titleIndexer = `${thisObj.property}_${thisObj.id}`; 
                let s1=0;
                
                
                function wrapper(bPosition, sbPosition, returnString, currentData)
                {
                    if(aux_existence(sbPosition))
                    {   returnString[1].unshift(currentData);     }
                    return returnString;
                }
                
                function stringifyArr(arr)
                {
                    let str="";
                    
                    for(let b of arr)
                    {
                        if(aux_existence(b))
                        {   str += b; }
                    }
                    
                    return str;
                }
                
                
                md.forEach(function(mdata, mkey)
                {
                    let r=["",[]];
                       
                    for(let m0=mdata.length, m1=0; m1<m0; m1++)
                    {   
                        if(aux_existence(mdata[m1]))
                        { 
                            if(m1>0)
                            {   r  = wrapper(mkey, (m1), r, mdata[m1]);   }
                            else
                            {   r[0] = mdata[m1];   }
                        }
                    }
                    
                    
                    thisReturner =  (aux_existence(r[0]))?
                                        `<div id="BodyFrame_${titleIndexer}_${mkey}" class="longSeparation">${r[0]}
                                            <div id="subBodyFrame_${titleIndexer}_${mkey}">${stringifyArr(r[1])}</div>
                                        </div>${thisReturner}`:
                                        `${stringifyArr(r[1])}`;
                });
                
                
                return thisReturner;
            }    
            
        },
        
        eMenu:  function(menu, indexer, fs)
        { 
            let values = "", msColor = "mbDefault_mode";
          
            if(aux_existence(fs))
            {   msColor = "mbReport_mode"}
            
            if(indexer!=="newAction")
            {   value =  "<div class=\"menuButton " + msColor + "\" name=\"groupMenu_report\" id=\"Menu_report\" onclick=\"aux_colapseMenuDIV('fromMenu_report', 'Menu'); \">" + menu + "</div>";    } 
            else
            {   value =  "<div class=\"menuButton " + msColor + "\" name=\"groupMenu_newAction\" id=\"Menu_newAction\" onclick=\"frame.edit.eAction.placer('newAction'); \">" + menu + "</div>";    }   

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
                    created on 19 Nov 2022
                    
                    Called from:
                        - frame.edit.eAction.eBody.eProperty.eFrameBlock(){}
                        - frame.edit.eAction.eBody.eProperty.returner(){}
                        - frame.edit.eDetails.mover.blockFrame(){}
                    */
                    propertyFrameBlock: function(title, id, section, userdata="", ufb=-1, data="", head="", body="", foot="", piRequest, a, b, c)
                    {
                        this.title              = title;
                        this.id                 = id;
                        this.postInitialRequest = piRequest;
                         
                        this.Section            = section;
                        this.BlockCount         = cntB;
                        
                        this.data               = data;
                        this.head               = head;
                        this.body               = body;
                        this.foot               = foot;
                       
                        this.userData           = (aux_existence(userdata))? [(userdata.includes("*|3f3x|*"))? [userdata.split("*|3f3x|*")]: [userdata]]: [[""]];
                        this.arrData            = [];
                        this.mapData            = new Map();
                        
                        this.returner           = "";
                        this.dataReturner       = function()
                                                  {
                                                      let cntB=0;
                                                      let newdataBlock = "";    //`<input type='hidden' id='countBlocks_${this.title}_${this.id}' value='${mapSize}'>`;
                                                        
                                                        

                                                        
                                                        for(let a=this.mapData, a0=1, a1=(this.mapData.size+1); a0<a1; a0++)
                                                        {
                                                            if(aux_existence(a.get(a0)))
                                                            {
                                                                cntB++;
                                                                let cntSB=0;
                                                                    
                                                                for(let b=a.get(a0), b0=1, b1=b.length; b0<b1; b0++)
                                                                {   if(aux_existence(b[b0])){   cntSB++;    }   }
                                                                
                                                                newdataBlock += `<input type='hidden' id='countSubBlocksInBlock_${this.title}_${this.id}_${cntB}' value='${cntSB}'>`;    
                                                            }
                                                        }
                                                       
                                                        
                                                        
                                                        return  `<input type='hidden' id='countBlocks_${this.title}_${this.id}' value='${cntB}'>` +
                                                                newdataBlock;
                                                  };
                    },
 
/*                   
                    objFrameBlock: function(title, id, fid, ufb=0)
                    {
                        this.title          = title;
                        this.id             = id;
                        this.updateBlock    = ufb;
                        this.propertyFrame  = eval(title).frame.returner(fid);  
                        
                        this.head           = new (function(a){ this.oid="Head"; this.mapReturner=new Map(); this.objFrame; this.returner=""; this.requested=false;})();
                        this.body           = new (function(a){ this.oid="Body"; this.mapReturner=new Map(); this.objFrame; this.returner=""; this.requested=false; this.data=[[""]];})();
                        this.foot           = new (function(a){ this.oid="Foot"; this.mapReturner=new Map(); this.objFrame; this.returner=""; this.requested=false;})();
                    },
*/                    

                    objSection: function(property, frameid)
                    {
                        this.mapReturner = new Map(); 
                        this.objFrame    = eval(property).frame.returner(frameid); 
                        this.subObjIndex = "";
                        this.returner    = ""; 
                        this.objData     = []; 
                    },
                    
                    
                    objFrameBlock: function(property, id)
                    {
                        this.property   = property;
                        this.id         = id; 
                        
                        this.head       = "";
                        this.body       = "";
                        this.foot       = "";
                        
                        this.frame      = eval(property).frame;
                    },     
                          
                                    
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
                    uniqueFrame: function(propertyFrameBlock, section, updateBlock, updateBlockElem, updateSubBlock)
                    {
                        let allowFrame = false;
                        
                        
                        function returnBlockFrameBody(obj, sectionID, cntB, cntBE, cntSB, dimensionalData)
                        {
                            let arrData=[], noData=true;
                            let dimCode="", value="", userData="", frameid;
                            
                                            
                            function inputter(title, id, B, BE, SB, SBE, objFrame, uData, dimData, pDisabled, section)
                            {   
                                let clickFunction="", inputName="", buffer="", dt="", dataProperty=[];
                                let listID="", listFrame="", require="", adjacent="", typeClass="propertyTag-4";
                                let format_1, format_2, format_3, format_4, format_5;
                                let propertyOptions="", multiselection = false;
                                let nextInput = "", nextLabel="", propertyClass="";
                                let propertyDisabled = "";  //(aux_existence(pDisabled))? "disabled=\"true\"": "";
                                let rteActivation = false;
                                let value="", keyValue="";
                                let propertyRequired="";

                                if(aux_existence(objFrame.labelID))
                                {   keyValue = objFrame.labelID;  }
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
                                    }
                                }
                                
                                if((section!=="foot")&&(section!=="head"))
                                {
                                    if(aux_existence(SB))
                                    {
                                        propertyID      = "edit_" + title + "_" + id + "_" + B + "_" + BE + "_" + SB + "_" + SBE; 
                                        propertyBodyID  = "body_" + title + "_" + id;
                                        //propertyIndexer = title + "_" + id;
                                    }
                                    else
                                    {
                                        propertyID      = "edit_" + title + "_" + id + "_" + B + "_" + BE; 
                                        propertyBodyID  = "body_" + title + "_" + id; 
                                        //propertyIndexer = title + "_" + id;
                                    }
                                }
                                else
                                {
                                    propertyID      = "edit_" + title + "_" + id + "_" + section + "_" + BE; 
                                    propertyBodyID  = section + "_" + title + "_" + id;                                        
                                }
                                
                                
                                
                                function getRTEframed(id, bid)
                                { 
                                    return "<div class=\"rteContainer\" id=\"rteContainer_" + propertyID + "\" >" +
                                                "<div   id=\"" + propertyID + "\" " + propertyRequired + " RichTextEditorSet=\"rteSetToTrue\" data-action-property-label=\"" + keyValue + "\">" + aux_textSignIn(value, 1)  + "</div>" +
                                            "</div>";
                                }
                                
                                
                                function formatOptions(selectOptions)
                                {   
                                    if(Array.isArray(selectOptions))
                                    {
                                        if(multiselection)
                                        {
                                            if(aux_existence(dimData))
                                            {
                                                //- multiple selection highlight
                                                //- existing userData
                                                for(let a0=0, a1=selectOptions.length; a0<a1; a0++)
                                                {   
                                                    let selected="", disabled = "";
                                                    if((selectOptions[a0][1]!=="")||(parseInt(userData[a0])==1)){selected = "selected"; nextLabel++;}
                                                    if(selectOptions[a0][2]!==""){ disabled = "disabled";}
                                                    propertyOptions = propertyOptions + "<option value=\"" + a0 + "\" " + selected + " " + disabled + ">" + selectOptions[a0][0] + "</option>"; 
                                                }                                                        
                                            }
                                            else
                                            {
                                                //- multiple selection highlight
                                                //- No userData
                                                for(let a0=0, a1=selectOptions.length; a0<a1; a0++)
                                                {   
                                                    if(selectOptions[a0][1]!==""){ nextLabel++;}
                                                    propertyOptions = propertyOptions + "<option value=\"" + a0 + "\" " + selectOptions[a0][1] + " " + selectOptions[a0][2] + ">" + selectOptions[a0][0] + "</option>"; 
                                                }
                                            }
                                        }
                                        else
                                        {
                                            if(aux_existence(dimData))
                                            {   
                                                //- Single selection highlight
                                                //- existing userData
                                                for(let a0=0, a1=selectOptions.length; a0<a1; a0++)
                                                {   
                                                    
                                                    let selectValue = selectOptions[a0][1]? selectOptions[a0][1]:a0;
                                                    let selected=((parseInt(dimData)==a0)||(dimData=== selectValue))? "selected": ""; 
                                                    
                                                    propertyOptions += "<option value=\"" +  selectValue + "\" " + selected + " >" + selectOptions[a0][0] + "</option>"; 
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
                                            labelData += `: <div id="move_${propertyID}" style="float:right; display:block">
                                                                <span class="blockMover" onclick="frame.edit.eDetails.mover.blockframe('${propertyID}','Up')">\u21e7</span>
                                                                ::
                                                                <span class="blockMover" onclick="frame.edit.eDetails.mover.blockframe('${propertyID}','Down')">\u21e9</span>
                                                            </div>
                                                            <div id="Remove_${propertyID}" style="float:right; display:none" data-removeblock="false" data-id="${id}" data-property="${title}">
                                                                <pan class="remover">[X]</span>
                                                            </div>`; 
                                                            
                                            nameClass = "mainPropertyElement";
                                        }
                                        
                                        label = `<div class="eProperty-11"><label for="${propertyID}" class="${nameClass}">${labelData}</label></div>`; 
                                    }
                                    
                                    
                                    return label;
                                }

                                
                                function formatCase_Class(data)
                                {   return "class=\"" + data + "\"";   }  
                                

                                function formatCase_Function(data, title, id)
                                {
                                    let func="";
                                    if(aux_existence(data))
                                    {   
                                        for(let x0=0, x1=data.length; x0<x1; x0++)
                                        {
                                            
                                            let parameter="";
                                            if(Array.isArray(data[x0][2]))
                                            {
                                                for(let a0=0,a1=data[x0][2].length; a0<a1; a0++)
                                                {   
                                                    if(a0!==0)
                                                    {   parameter = parameter + "','" + data[x0][2][a0];   }
                                                    else
                                                    {   parameter = data[x0][2][a0]; }
                                                }
                                            }
                                            else
                                            {   parameter = data[0][2]; }
                                            
                                            func = func + " " +  data[x0][0] + "=\"" + data[x0][1] + "('" + title + "','" + id + "','" + propertyID + "','" + parameter + "')\""; 
                                        }
                                    }
                                    
                                   
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
                                        if(property.toString()==="RichTextEditor"){ rteActivation=true;}
                                        if(property.toString()==="class"){ propertyClass = " class=\"" + data[property] + "\"  "; }
                                        if(property.toString()==="value"){ att[1] = data[property]; NoOptionsFound=false; } // ??? which cases ???
                                        if(property.toString()==="allowEmptyOnly"){ if((aux_existence(dimData))){ propertyDisabled = "disabled"} ; NoOptionsFound=false; }
                                        if(property.toString()==="subframeblock"){  att[0] += `${property.toString()}=${B} `; NoOptionsFound=false; }
                                        
                                        
                                        if(property.includes("_"))
                                        {   
                                            let newdata = property.replaceAll("_","-");
                                            att[0] += `${newdata}="${data[property]}" `;
                                        }
                                        
                                        if(NoOptionsFound){ att[0] += property + "=\"" + data[property] + "\" ";  }
                                    }
                                    
                                    
                                    if(NoOptionsFound)
                                    {   
                                        if(aux_existence(dimData))
                                        {   if(aux_existence(dimData[B-1])){propertyOptions = dimData[B-1][BE]; } }
                                    }
                                    
                                    return att;
                                }
                                
                                
                                function formatCase_Type(type, propertyLabel, propertyFunction, propertyAttributes, dataRequired)                                    
                                {
                                    let inputData ="";
                                    let dRequired = (aux_existence(dataRequired))? " required=\"true\" ": "";
                                    propertyRequired = (aux_existence(dataRequired))? " required=\"true\" ": "";
                                    
                                    if(aux_existence(rteActivation))
                                    {   
                                        propertyData = getRTEframed(propertyID, propertyBodyID); 
                                        new Promise(function(cb){cb(propertyID, propertyBodyID); }).then(function(a, b){/*rteLoader_v1(a, b);*/ setTimeout(function() {rteLoader_v1(a, b);}, 500); });
                                    }
                                    else
                                    {
                                        if(aux_existence(type))
                                        {   
                                            let onFocusFunction     = "onfocus=\"frame.edit.eDetails.efocusON('" + propertyID + "')\"";
                                            let onFocusOutFunction  = "onfocusout=\"frame.edit.eDetails.efocusOFF('" + propertyID + "')\"";

                                            switch(type)
                                            {
                                                case "select": 
                                                    propertyClass += formatCase_Class("universalProperty");
                                                    propertyFunction = (section==="head")? "onchange=\"handleSelector('" + propertyID + "')\"": ""; 
                                                    propertyAttributes[0] += " data-actionid=\"" + id + "\" ";
                                                    propertyData = "<select id=\"" + propertyID + "\" style=\"width:100%\" data-action-property=\"" + title + "\" data-section=\"" + pDisabled + "\" data-action-property-label=\"" + keyValue + "\" name=\"" + inputName + "\" " + propertyClass + " " + dRequired + " " + propertyFunction + " " + propertyAttributes[0] + " " + propertyDisabled + ">"  + propertyOptions + "</select>"; 
                                                    break;
                                                    
                                                case "list":
                                                    let valueOption="";
                                                    let v = (aux_existence(uData))? value: "";
                                                    value = " value=\"" + v + "\" placeholder=\"Select or Enter New\" ";      
                                                        
                                                    if(aux_existence(dimData))
                                                    {   valueOption=dimData; }
                                                    
                                                    propertyClass += formatCase_Class("universalProperty");
                                                    propertyData = "<input list=\"list_" + propertyID + "\" id=\"" + propertyID + "\"   data-action-property=\"" + title + "\"  data-action-property-label=\"" + keyValue + "\" name=\"" + inputName + "\" type=\"" + type + "\" " + dRequired + "  " + propertyClass + " " + propertyFunction + " " + onFocusFunction + " " + onFocusOutFunction + " " + propertyAttributes[0] + " " + value + " " + propertyDisabled + ">"+ 
                                                                    "<datalist id=\"list_" + propertyID + "\">" + valueOption + "</datalist>";
                                                    
                                                    break;
                                                case "textarea": 
                                                    
                                                    let txtData="";
                                                    if(aux_existence(uData))
                                                    {   
                                                        txtData= aux_existence(value)? aux_textSignIn(value, 1): "";
                                                        propertyDisabled = ((title==="Comments")&&(aux_existence(txtData)))? " disabled=\"true\" ": "";
                                                    }
                                                    
                                                    propertyClass += formatCase_Class("universalProperty textarearesize");
                                                    propertyData = "<textarea id=\"" + propertyID + "\"   data-action-property=\"" + title + "\"  data-action-property-label=\"" + keyValue + "\" name=\"" + inputName + "\" " + propertyClass + " " + propertyFunction + " " + dRequired + " " + propertyAttributes[0] + " value=\"" + propertyAttributes[1] + "\"  " + propertyDisabled + ">"  + txtData + "</textarea>"; 

                                                    break;
                                                case "button":
                                                    let dp = ""; for(let d of dataProperty){ dp += ` ${d} `;}
                                                    
                                                    if(dp!==""){   dp += ` data-id='${id}' `;  }
                                                    
                                                    
                                                    //propertyID      = `edit_${title}_${id}_${B}_${keyValue}`; 
                                                    //inputName = `${propertyID}_ignore`;
                                        
                                                    propertyClass += formatCase_Class("universalProperty _Button");
                                                    propertyData = "<div  id=\"" + propertyID + "\"  data-action-property=\"" + title + "\"  data-action-id=\"" + id + "\" data-action-property-label=\"" + keyValue + "\"data-label-objname=\"" + keyValue + "\" name=\"" + inputName + "\" " + propertyAttributes[0] + " " + propertyClass + " " + propertyFunction + " onmousedown=\"eHandlerMouseDown(" + propertyID + ")\" " + propertyDisabled + " " + dp + ">" + propertyAttributes[1] + "</div>"; 
                                                    
                                                    break; 
                                                case "datetime-local":
                                                                    
                                                    if(aux_existence(uData))
                                                    {
                                                        if(aux_existence(value))
                                                        {    buffer = value; }
                                                        else
                                                        {
                                                            if(inputName.includes("sdt")){  buffer = Number(DateTime.aux_ParseTo.numericDateTime());    }
                                                            if(inputName.includes("edt")){  buffer = Number(DateTime.aux_ParseTo.numericDateTime()) + Number("86400000");    }
                                                        }
                                                    }
                                                    else
                                                    {
                                                        if(inputName.includes("sdt")){  buffer = Number(DateTime.aux_ParseTo.numericDateTime());    }
                                                        if(inputName.includes("edt")){  buffer = Number(DateTime.aux_ParseTo.numericDateTime()) + Number("86400000");    }
                                                    }
                                                    
                                                    value =  "value=\"" + DateTime.aux_ParseTo.extendDateTime_local(buffer) + "\"";
                                                    
                                                    propertyClass += formatCase_Class("universalProperty");
                                                    propertyData = "<input id=\"" + propertyID + "\"   data-action-property=\"" + title + "\"  data-action-property-label=\"" + keyValue + "\" oninput=\"eHandlerDateTime()\" name=\"" + inputName + "\" type=\"" + type + "\"  buffervalue=\"" + buffer + "\" "  + propertyClass + " " + value + " >";
                                                    
                                                    break;
                                                case "hidden":
                                                    if(title==="DateTime")
                                                    {
                                                        if(aux_existence(uData))
                                                        {
                                                            if(aux_existence(value))
                                                            {    dt = value; }
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
                                                    {
                                                        let v = (aux_existence(uData))? value: ""; 
                                                        value = "value=\"" + v + "\"";
                                                    }
                                                    
                                                    propertyClass += formatCase_Class("universalProperty");
                                                    propertyData = "<input id=\"" + propertyID + "\"   data-action-property=\"" + title + "\"  data-action-property-label=\"" + keyValue + "\" name=\"" + inputName + "\" type=\"" + type + "\" " + buffer + " "  + propertyClass + " " + value + " >";
                                                    
                                                    break;
                                                default:
                                                    if(aux_existence(uData))
                                                    {   value = " value=\"" + value + "\" ";    }
                                                    else
                                                    {   value = " value=\"\" "; }
                                                    
                                                    
                                                    propertyClass   += formatCase_Class("universalProperty");    
                                                    propertyData     = `<input id="${propertyID}"  data-action-property="${title}" data-block="edit_${title}_${id}_${B}" data-action-property-label="${keyValue}" name="${inputName}" type="${type}"  ${value} ${dRequired} ${propertyClass} ${propertyFunction} ${onFocusFunction} ${onFocusOutFunction} ${propertyAttributes[0]} ${propertyDisabled}>`; 
                                            }
                                        }
                                        else
                                        {
                                            if(aux_existence(objFrame.multiple))
                                            {   alert("hi");      }
                                        }
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
                                
                                
                                formatName(id);
                                format_3 = formatCase_Function(objFrame.efunction, title, id); 
                                format_4 = formatCase_Attributes(objFrame.attribute);  
                                format_1 = formatCase_Label(objFrame.bodyWrapperHead, objFrame.moveupdown, objFrame.label, B);          
                                format_5 = formatCase_Type(objFrame.type, format_1, format_3, format_4, objFrame.required);

                                return "<div class=\"eProperty-1\">" + format_5 + "</div>" + nextInput;
                            }
                                    
                                                      
                            function idFrameSetter(block, title, id, frameid, cntb, cntbe, cntsb)
                            {  
                                if(aux_existence(cntsb))
                                return  `<div id="sbodyframe_${title}_${id}_${cntb}_${cntbe}_${cntsb}" class="shortSeparation">
                                            <input type="hidden" name="frameID" id="edit_${title}_${id}_${cntb}_${cntbe}_${cntsb}_0" data-action-property-label="_frameID" value="${frameid}">${block}
                                        </div>`;  
                                
                                return   `<input type="hidden" name="frameID" id="edit_${title}_${id}_${cntb}_0\" data-action-property-label="_frameID" value=\"${frameid}\">${block}`; 
                            }                            
                            
                            
                            function getInputter(t, id, b, sb, e0, e1, ofr, ud, dd)
                            {
                                if(aux_existence(sb))
                                return inputter(t, id, b, e0, sb, e1, ofr, ud, dd, section);
                                return inputter(t, id, b, e1, "", "", ofr, ud, dd, section);
                            }
                            
                            
                            if((sectionID!=="head")&&(sectionID!=="foot"))
                            {  
                                if(aux_existence(cntSB))
                                {   
                                    if(aux_existence(obj.body.objData[(cntB-1)][cntBE][(cntSB-1)]))
                                    {   userData = obj.body.objData[(cntB-1)][cntBE][(cntSB-1)];  }
                                }
                                else
                                {   userData = obj.body.objData[(cntB-1)];  }
                                
                                frameid = obj.body.objFrame.id;
                            }
                            
                            
 
                            value = "<table width=\"100%\">";
                            for(let i=0, len=obj[sectionID]["objFrame"]["eframe"].length; i<len; i++)
                            {
                                value += "<tr><td width=\"100%\">" + 
                                            getInputter(obj.property, obj.id, cntB, cntSB, cntBE, (i+1), obj[section]["objFrame"]["eframe"][i], userData, dimensionalData, sectionID) +
                                         "</td></tr>";
                            }
                            value += "</table>";
                    
                            
                            
                            return idFrameSetter(value, obj.property, obj.id, (frameid)? frameid: sectionID, cntB, cntBE, cntSB);
                        }
                        
                        

                        function processBodyBlockFrame(pF, uBlock, uBlockElem, uSBlock)
                        {
                            let thisBody = returnBlockFrameBody(pF, "body", uBlock, uBlockElem, uSBlock, frame.edit.eAction.eBody.eProperty.eDimensionSettler(pF, pF.body.objFrame.eframe, "body", uBlock)); 
                            
                            pF.body.returner += thisBody;   
                            if(aux_existence(uSBlock))
                            {   
                                let sm = pF.body.mapReturner.get(uBlock);
                                if(aux_existence(sm))
                                {  
                                    sm.push(thisBody); 
                                    pF.body.mapReturner.set(uBlock, sm);   
                                }
                                else
                                {   pF.body.mapReturner.set(uBlock, ["", thisBody]);    }
                            }
                            else
                            {   
                                let sm = pF.body.mapReturner.get(uBlock);
                                if(aux_existence(sm))
                                {  
                                    sm[0] = thisBody; 
                                    pF.body.mapReturner.set(uBlock, sm);  
                                }
                                else
                                {   pF.body.mapReturner.set(uBlock, [thisBody]);    }
                            }
                                
                            return pF;
                        }
                        
                        
                        
                        if(section==="head")
                        {   
                            propertyFrameBlock.head = new this.objSection(propertyFrameBlock.property, "head");
                            if(aux_existence(propertyFrameBlock.head.objFrame))
                            propertyFrameBlock.head.returner = returnBlockFrameBody(propertyFrameBlock, section, "head","","", this.eDimensionSettler(propertyFrameBlock, propertyFrameBlock.head.objFrame.eframe, "head", "head"));  
                        }
                        
                        
                        if(section==="foot")
                        {   
                            propertyFrameBlock.foot = new this.objSection(propertyFrameBlock.property, "foot");
                            if(aux_existence(propertyFrameBlock.foot.objFrame))
                            propertyFrameBlock.foot.returner = returnBlockFrameBody(propertyFrameBlock, section, "foot");  
                        }
                        
                        
                        if(section==="body")
                        {   propertyFrameBlock = processBodyBlockFrame(propertyFrameBlock, updateBlock, updateBlockElem, updateSubBlock);    }
                        
                        
                        
                        propertyFrameBlock.returner = (function(objframe)
                        { 
                            let indexer = objframe.property + "_" + objframe.id;
                            return  "<div id=\"objProperty_" + indexer + "\"  class=\"eBlockFrame\" >" +
                                        "<div id=\"propertyDataFrame_" + indexer + "\">" + objframe.data + "</div>" +
                                        "<div id=\"propertyHeadFrame_" + indexer + "\" class=\"eBlockFrame_Head\" >" + objframe.head.returner + "</div>" +  
                                        "<div id=\"propertyHeadFrame_" + indexer + "\" class=\"eBlockFrame_Body\" >" + objframe.body.returner + "</div>" +  
                                        "<div id=\"propertyHeadFrame_" + indexer + "\" class=\"eBlockFrame_Foot\" >" + objframe.foot.returner + "</div>" +
                                    "</div></br>"; 
                        })(propertyFrameBlock);
                       
                                    
                        return  propertyFrameBlock;
                    },
                    
                    
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
                                
                                Separators:
                                    universalBlock:
                                        bodyFrame:              Block_1*|3f3x|*Block_2*|3f3x|*Block_3                                               //bodyFrames        (ex: cntBlock=3)
                                            Block_1:            frame_1*|3f4x|*subframe_1*|3f4x|*subframe_2                                         //it has subFrames  (ex: countSubBlocksInBlock_1: 2)
                                                frame_1:        frameID_1*|3f5x|*frameElement_1_1*|3f5x|*frameElement_1_2*|3f5x|*...                //mainBlock Frame   (made of frameElements: first element is frameID)
                                                subframe_1_1:   sframeID_1*|3f5x|*sframeElement_1_1_1*|3f5x|*sframeElement_1_1_2*|3f5x|*...         //subFrameBlock     (made of sframeElements: first element is frameID)
                                                subframe_1_2:   sframeID_2*|3f5x|*sframeElement_1_2_1*|3f5x|*sframeElement_1_2_2*|3f5x|*...         //subFrameBlock     (made of sframeElements: first element is frameID)
                            
                            Concerns:
                                BlockCount should not be changed here, it must be changed at caller
                                
                            Note-1: propertyFrame={{title:, id:, frameID:, BlockCount:, userData:, afterRequest:}}
                    */
                    getFrameBlock: function(propertyFrame, actionStatus)
                    {
                        let objFrame = eval(propertyFrame.title).frame;
                        let allowFrame = false;


                        
                        function processingFrameBlockBody(obj, eFrame, dimenData, userData, bfDisable, idException)
                        {
                            let {title, id, frameID:fid, BlockCount:cntB} = obj;
                            let arrData=[], noData=true;
                            let dimCode="", value="";
                            
                            
                            if(aux_existence(idException)){ cntB=idException; }
                            
                            let objectType = 
                            {                   
                                inputter: function(title, id, B, BE, dataFrameObj, uData, dimData, pDisabled)
                                {   
                                    let value="", clickFunction="", inputName="";
                                    let listID="", listFrame="", require="", adjacent="", typeClass="propertyTag-4";
                                    let format_1, format_2, format_3, format_4, format_5;
                                    let propertyOptions="", multiselection = false;
                                    let nextInput = "", nextLabel="", propertyClass="";
                                    let propertyDisabled = (aux_existence(pDisabled))? "disabled=\"true\"": "";
                                    let rteActivation = false;
                                    
                                    
                                    
                                    propertyID      = "edit_" + title + "_" + id + "_" + B + "_" + BE; 
                                    propertyBodyID  = "body_" + title + "_" + id;
                                    
                                    
                                    
                                    
                                    function getRTEframed(id, bid)
                                    {
                                        return "<div class=\"rteContainer\" id=\"rteContainer_" + propertyID + "\" >" +
                                                    "<div   id=\"" + propertyID + "\" RichTextEditorSet=\"rteSetToTrue\" >" + aux_textSignIn(dimData, 1)  + "</div>" +
                                                "</div>";
                                    }
                                    
                                    
                                    function formatOptions(selectOptions)
                                    {   
                                        if(Array.isArray(selectOptions))
                                        {
                                            if(multiselection)
                                            {
                                                if(aux_existence(dimData))
                                                {
                                                    //- multiple selection highlight
                                                    //- existing userData
                                                    for(let a0=0, a1=selectOptions.length; a0<a1; a0++)
                                                    {   
                                                        let selected="", disabled = "";
                                                        if((selectOptions[a0][1]!=="")||(parseInt(userData[a0])==1)){selected = "selected"; nextLabel++;}
                                                        if(selectOptions[a0][2]!==""){ disabled = "disabled";}
                                                        propertyOptions = propertyOptions + "<option value=\"" + a0 + "\" " + selected + " " + disabled + ">" + selectOptions[a0][0] + "</option>"; 
                                                    }                                                        
                                                }
                                                else
                                                {
                                                    //- multiple selection highlight
                                                    //- No userData
                                                    for(let a0=0, a1=selectOptions.length; a0<a1; a0++)
                                                    {   
                                                        if(selectOptions[a0][1]!==""){ nextLabel++;}
                                                        propertyOptions = propertyOptions + "<option value=\"" + a0 + "\" " + selectOptions[a0][1] + " " + selectOptions[a0][2] + ">" + selectOptions[a0][0] + "</option>"; 
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                if(aux_existence(dimData))
                                                {   
                                                    //- Single selection highlight
                                                    //- existing userData
                                                    for(let a0=0, a1=selectOptions.length; a0<a1; a0++)
                                                    {   
                                                        
                                                        let selectValue = selectOptions[a0][1]? selectOptions[a0][1]:a0;
                                                        let selected=((parseInt(dimData)==a0)||(dimData=== selectOptions[a0][0]))? "selected": ""; 
                                                        
                                                        propertyOptions += "<option value=\"" +  selectValue + "\" " + selected + " >" + selectOptions[a0][0] + "</option>"; 
                                                    }
                                                }
                                                else
                                                {
                                                    //- single selection highlight
                                                    //- No userData     
                                                    for(let a0=0, a1=selectOptions.length; a0<a1; a0++)
                                                    {   
                                                        let selectValue = aux_existence(selectOptions[a0][1])? selectOptions[a0][1]:a0;
                                                        let selected=(a0===0)? "selected": ""; 
                                                        propertyOptions += "<option value=\"" +  selectValue + "\" " + selected + " >" + selectOptions[a0][0] + "</option>"; 
                                                    } 
                                                }
                                            }  
                                        }  
                                        //propertyOptions = ""; //this is ONLY TEST
                                    }


                                    function formatName(data)
                                    {   if(aux_existence(data)){ inputName = propertyID + "_" + data; } }                                       
                                    
                                    
                                    function formatCase_Label(nameSpec="", mud=false, labelData="", cntB)
                                    {
                                        let label="";
                                        if(aux_existence(labelData))
                                        {
                                            let nSpecClass = "";
                                            if(Array.isArray(labelData))
                                            {    
                                                if((aux_existence(mud)))
                                                { 
                                                    labelData[0] += ": <span class=\"blockMover\" onclick=\"frame.edit.eDetails.mover.blockframe('"+ title + "','" + id + "','Up','" + cntB + "','')\">\u21e7</span>:::<span class=\"blockMover\" onclick=\"frame.edit.eDetails.mover.blockframe('"+ title + "','" + id + "','Down','" + cntB + "','')\">\u21e9</span>"; 
                                                    nSpecClass = "nameSpec"; 
                                                }
                                                
                                                label = "<div class=\"eProperty-11 nameSpec\"><label for=\"" + propertyID + "\">" + labelData[0] + "</label><span id=\"" + propertyID + "_" + labelData[1] + "\" class=\"eProperty-112\">" + nextLabel + "</span></div>"; 
                                            }
                                            else
                                            {   
                                                if((aux_existence(mud)))
                                                { 
                                                    labelData += ": <span class=\"blockMover\" onclick=\"frame.edit.eDetails.mover.blockframe('"+ title + "','" + id + "','Up','" + cntB + "','')\">\u21e7</span>:::<span class=\"blockMover\" onclick=\"frame.edit.eDetails.mover.blockframe('"+ title + "','" + id + "','Down','" + cntB + "','')\">\u21e9</span>"; 
                                                    nSpecClass = "nameSpec";
                                                }
                                                
                                                label = "<div class=\"eProperty-11 nameSpec\"><label for=\"" + propertyID + "\">" + labelData + "</label></div>"; 
                                            }
                                        }
                                        
                                        return label;
                                    }

                                    
                                    function formatCase_Class(data)
                                    {   return "class=\"" + data + "\"";   }  
                                    

                                    function formatCase_Function(data, title, id)
                                    {
                                        let func="";
                                        if(aux_existence(data))
                                        {   
                                            for(let x0=0, x1=data.length; x0<x1; x0++)
                                            {
                                                
                                                let parameter="";
                                                if(Array.isArray(data[x0][2]))
                                                {
                                                    for(let a0=0,a1=data[x0][2].length; a0<a1; a0++)
                                                    {   
                                                        if(a0!==0)
                                                        {   parameter = parameter + "','" + data[x0][2][a0];   }
                                                        else
                                                        {   parameter = data[x0][2][a0]; }
                                                    }
                                                }
                                                else
                                                {   parameter = data[0][2]; }
                                                
                                                func = func + " " +  data[x0][0] + "=\"" + data[x0][1] + "('" + title + "','" + id + "','" + propertyID + "','" + parameter + "')\""; 
                                            }
                                        }
                                        
                                       
                                        return func;
                                        
                                    }                                    
                                    
                                    
                                    function formatCase_Attributes(data)
                                    {
                                        let att=["",""];
                                        let NoOptionsFound = true;
                                       
                                        
                                        for(let property in data)
                                        {   
                                            if(property.toString()==="options"){    formatOptions(data[property]); NoOptionsFound = false; }
                                            if(property.toString()==="name"){       formatName(data[property]);    }
                                            if(property.toString()==="multiple"){   multiselection = true; }
                                            if(property.toString()==="RichTextEditor"){ rteActivation=true;}
                                            if(property.toString()==="class"){ propertyClass = " class=\"" + data[property] + "\"  "; }
                                            if(property.toString()==="value"){ att[1] = data[property]; NoOptionsFound=false; } // ??? which cases ???
                                            if(property.toString()==="allowEmptyOnly"){ if((aux_existence(dimData))){ propertyDisabled = "disabled"} ; NoOptionsFound=false; }
                                            //if(property.toString()==="readonly"){ if(aux_existence(data.readonly.creator))
                                            //{   propertyDisabled = "disabled"} ; NoOptionsFound=false; }
                                            
                                            att[0] += property + "=\"" + data[property] + "\" "; 
                                        }
                                        
                                        
                                        if(NoOptionsFound)
                                        {   if(aux_existence(dimData)){propertyOptions = dimData; } }
                                        
                                        return att;
                                    }
                                    
                                    
                                    function formatCase_Type(type, propertyLabel, propertyFunction, propertyAttributes, dataRequired)                                    
                                    {
                                        let inputData ="";
                                        let dRequired = (aux_existence(dataRequired))? " required=\"true\" ": "";
                                        
                                        if(aux_existence(rteActivation))
                                        {   
                                            propertyData = getRTEframed(propertyID, propertyBodyID); 
                                            new Promise(function(cb){cb(propertyID, propertyBodyID); }).then(function(a, b){/*rteLoader_v1(a, b);*/ setTimeout(function() {rteLoader_v1(a, b);}, 500); });
                                        }
                                        else
                                        {
                                            if(aux_existence(type))
                                            {   
                                                let onFocusFunction     = "onfocus=\"frame.edit.eDetails.efocusOFF('" + title +  "','" + id + "','" + propertyID + "')\"";
                                                let onFocusOutFunction  = "onfocusout=\"frame.edit.eDetails.efocusOFF('" + title +  "','" + id + "','" + propertyID + "')\"";

                                                switch(type)
                                                {
                                                    case "select": 
                                                        propertyClass += formatCase_Class("universalProperty");
                                                        propertyData = "<select id=\"" + propertyID + "\" style=\"width:100%\" name=\"" + inputName + "\" " + propertyClass + " " + dRequired + " " + propertyFunction + " " + propertyAttributes[0] + " " + propertyDisabled + ">"  + propertyOptions + "</select>"; 
                                                       
                                                        break;
                                                    case "list":
                                                        let valueOption="";
                                                        if(aux_existence(dimData)){value = (aux_existence(dimData[0]))? "value=\"" + uData[BE] + "\"": "placeholder=\"Select or Enter New\" "; valueOption=dimData[BE]; }
                                                        propertyClass += formatCase_Class("universalProperty");
                                                        propertyData = "<input list=\"list_" + propertyID + "\" id=\"" + propertyID + "\"  name=\"" + inputName + "\" type=\"" + type + "\" " + dRequired + "  " + propertyClass + " " + propertyFunction + " " + propertyAttributes[0] + " " + value + " " + propertyDisabled + ">"+ 
                                                                        "<datalist id=\"list_" + propertyID + "\">" + valueOption + "</datalist>";
                                                        
                                                        break;
                                                    case "textarea": 
                                                        let txtData = aux_existence(dimData)?aux_textSignIn(dimData[BE], 1):"";
                                                        propertyClass += formatCase_Class("universalProperty textarearesize");
                                                        propertyData = "<textarea id=\"" + propertyID + "\"  name=\"" + inputName + "\" " + propertyClass + " " + propertyFunction + " " + dRequired + " " + propertyAttributes[0] + " value=\"" + propertyAttributes[1] + "\"  " + propertyDisabled + ">"  + txtData + "</textarea>"; 
    
                                                        break;
                                                    case "button":
                                                        propertyClass += formatCase_Class("universalProperty _Button");
                                                        propertyData = "<div  id=\"" + propertyID + "\" name=\"" + inputName + "\" " + propertyClass + " " + propertyFunction + " onmousedown=\"eHandlerMouseDown(" + propertyID + ")\" " + propertyDisabled + ">" + propertyAttributes[1] + "</div>"; 
                                                        
                                                        break;    
                                                        
                                                    case "datetime-local":
                                                        value = DateTime.aux_ParseTo.extendDateTime_local(uData[BE]);
                                                        propertyClass += formatCase_Class("universalProperty");
                                                        propertyData = "<input  id=\"" + propertyID + "\" name=\"" + inputName + "\" type=\"" + type + "\"  data-property=\"" + title + "\" buffervalue=\"" + DateTime.aux_ParseTo.numericDateTime(uData[BE]) + "\" oninput=\"eHandlerDateTime()\" " + value + " " + propertyClass + " " + propertyAttributes[0] + " " + propertyDisabled + ">"; 
                                                        
                                                        break;                                                         
                                                    default:
                                                        if(aux_existence(propertyOptions))
                                                        {    value = " value=\"" + propertyOptions + "\" ";  }  
                                                        else
                                                        {    
                                                            if(aux_existence(dimData))
                                                            {   value = " value=\"" + dimData[BE] + "\" "; }
                                                            else
                                                            {   value = " value=\"\" "; }
                                                        }
                                                        
                                                        propertyClass   += formatCase_Class("universalProperty");    
                                                        propertyData     = "<input id=\"" + propertyID + "\" name=\"" + inputName + "\" type=\"" + type + "\"  " + value + " " + dRequired + " " + propertyClass + " " + propertyFunction + " " + propertyAttributes[0] + " value=\"" + propertyAttributes[1] + "\" " + propertyDisabled + ">"; 
                                                }
                                            }
                                            else
                                            {
                                                if(aux_existence(dataFrameObj.multiple))
                                                {   alert("hi");      }
                                            }
                                        }
                                        
                                        if(aux_existence(propertyLabel))
                                        {   propertyData = propertyLabel + "<div class=\"eProperty-12\">" + propertyData + "</div>"; }
                                        else
                                        {  
                                            if((dataFrameObj.type==="button")&&(aux_existence(dataFrameObj.halfLength)))
                                            {   propertyData = "<div class=\"eProperty-12\">" + propertyData + "</div>"; }
                                            else
                                            {   propertyData = "<div class=\"eProperty-13\">" + propertyData + "</div>"; } 
                                        }                                        
                                        
                                        return propertyData;
                                    }
                                    
                                    
                                    format_3 = formatCase_Function(dataFrameObj.efunction, title, id); 
                                    format_4 = formatCase_Attributes(dataFrameObj.attribute);  
                                    format_1 = formatCase_Label(dataFrameObj.bodyWrapperHead, dataFrameObj.moveupdown, dataFrameObj.label, B);          
                                    format_5 = formatCase_Type(dataFrameObj.type, format_1, format_3, format_4, dataFrameObj.required);

                                    return "<div class=\"eProperty-1\">" + format_5 + "</div>" + nextInput;
                                },
                                
                                diver: function(title, id, B, BE, dataObj, uData, dimData, propertyDisabled)
                                {   
                                    let nextInput = "", propertyData="", divID = "";
                                    let displayData = dimData;
                                    
                                    
                                    if(dataObj.eMode!==false)
                                    {
                                        propertyID=title + "_" + id + "_" + B + "_" + BE; 
                                        divID = "div_" + propertyID;
                                        
                                        
                                        
                                        if((aux_existence(dataObj.label))&&(!aux_existence(dataObj.embedded)))
                                        {   
                                            displayData = (aux_existence(displayData))? aux_textSignIn(displayData,1): "";
                                            propertyData =  "<div class=\"eProperty-11\"><label for=\"" + divID + "\">" + dataObj.label + "</label></div>" +
                                                            "<div  id=\"" + divID + "\" class=\"eProperty-12\">" + displayData + "</div>"; 
                                        }
                                        else
                                        {   
                                            if(aux_existence(dataObj.subdismantle))
                                            {
                                                let clrsd="", filet="";
                                                
                                                propertyData = clrsd;
                                            }
                                            else
                                            {   
                                                if(aux_existence(dataObj.embedded))
                                                {  
                                                    propertyData =  "<div  id=\"" + divID + "\" class=\"eProperty-11\">" + aux_textSignIn(dataObj.label) + "</div>" +
                                                                    "<div class=\"eProperty-13 _Button\">" +
                                                                        "<label for=\"edit_" + propertyID + "\">" + dataObj.embedded.attribute.value + "</label>" +
                                                                        this.inputter(title, id, B, BE, dataObj.embedded, dimData, propertyDisabled) + 
                                                                    "</div>"; 
                                                }
                                                else
                                                {   
                                                    displayData = (aux_existence(displayData))? aux_textSignIn(displayData,1): "";
                                                    propertyData = "<div  id=\"" + divID + "\" class=\"eProperty-13\">" + displayData + "</div>"; 
                                                }
                                            }  
                                        }
                                            
                                            
                                         
                                            
                                        if(aux_existence(dataObj.inputRequest))
                                        {   nextInput = this.inputter(title, id, B, BE, {type:"hidden"}, dimData, propertyDisabled); }
                                    }
                                    
                                    
                                    return  "<div class=\"propertyTag-4\" >" + propertyData + "</div>" + nextInput;
                                },
                            };
   


                            function idFrameSetter(block, title, id, frameid, cntb)
                            {  
                                return  "<input type=\"hidden\" name=\"frameID\" id=\"edit_" + title + "_" + id + "_" + cntb + "_0\" value=\"" + frameid + "\">" +
                                        block;
                            }
                            
                            
                            function fbPropertyReturner(t, id, b, p, frame, udata, dim, status)
                            {
                                //let ud = (aux_existence(udata))? udata.split("*|3f4x|*"): "";
                                switch(frame.type)
                                {  
                                    
/*                                    
                                    case "div":     return objectType.diver(t, id, b, p, frame, (aux_existence(ud))? ud[cntB].split("*|3f4x|*"): "", dim, status);    
                                    default:        return objectType.inputter(t, id, b, p, frame, (aux_existence(ud))? ud[cntB].split("*|3f4x|*"): "", dim, status);  
*/
                                    case "div":     return objectType.diver(t, id, b, p, frame, udata, dim, status);    
                                    default:        return objectType.inputter(t, id, b, p, frame, udata, dim, status);                                       
                                    
                                }   
                                return "";
                            }
 
 
                            value = "<table width=\"100%\">";
                            for(let i=0, len=eFrame.length; i<len; i++)
                            {
                                if(!aux_existence(eFrame[i].eCancel))
                                {   
                                    if(aux_existence(dimenData))
                                    {   value += "<tr><td width=\"100%\">" + fbPropertyReturner(title, id, cntB, (i+1), eFrame[i], userData, (fid==="head")? dimenData: dimenData[i+1], bfDisable) + "</td></tr>"; } 
                                }
                            }
                            value += "</table>";
                            
                            return idFrameSetter(value, title, id, (aux_existence(dimenData))? dimenData[0]:fid, cntB);
                        }
                        
                        

                        function processingDimensionalData(obj, structure)
                        {
                            let userDataIsObject = false;
                            let userDataObj="";
                            
                            
                            function fb(title, id, o)
                            {
                                if(aux_existence(o.Data))
                                {
                                    const {eframe} = o.objFrame; 
                                    let cnt=0;
                                    for(let d of o.Data)
                                    {
                                        let fbIndexer = `edit${o.oid}_${id}_${title}_${++cnt}`;
                                        o.set(fbIndexer, processingFrameBlockBody(frame.edit.eAction.eBody.eProperty.eDimensionSettler(d, eframe)));
                                    } 
                                }
                            }
                            
                            
                            
                            
                            
                            switch(structure)
                            {
                                case "head":
                                    fb(obj.title, obj.id, obj.Head);
                                    break;
                                    
                                case "body":
                                    fb(obj.title, obj.id, obj.Body);
                                    break;
                                    
                                case "foot":
                                    fb(obj.title, obj.id, obj.Foot);
                                    break;
                            }
                            
                            
                            return obj;
                        }
                        
                        
                        
                        
                        if(aux_existence(propertyFrame.head.requested))
                        {   propertyFrame = processingDimensionalData(propertyFrame, "head");  }
                        
                        
                        if(aux_existence(propertyFrame.foot.requested))
                        {   propertyFrame = processingDimensionalData(propertyFrame, "foot");  }  
                              
                        
                        if(aux_existence(propertyFrame.body.requested))
                        {   propertyFrame = processingDimensionalData(propertyFrame, "body");  }
                        
                        
                        propertyFrame.returner = (function(objframe)
                        { 
                            let indexer = objframe.title + "_" + objframe.id;
                            return  "<div id=\"objProperty_" + indexer + "\"  class=\"eBlockFrame\" >" +
                                        "<div id=\"propertyDataFrame_" + indexer + "\">" + objframe.data + "</div>" +
                                        "<div id=\"propertyHeadFrame_" + indexer + "\" class=\"eBlockFrame_Head\" >" + objframe.head + "</div>" +  
                                        "<div id=\"propertyHeadFrame_" + indexer + "\" class=\"eBlockFrame_Body\" >" + objframe.body + "</div>" +  
                                        "<div id=\"propertyHeadFrame_" + indexer + "\" class=\"eBlockFrame_Foot\" >" + objframe.foot + "</div>" +
                                    "</div></br>"; 
                        })(propertyFrame);
                       
                                    
                        return  propertyFrame;
                    },
                    
                    
                    
                    
                    addFrameBlockFrom_addButton: function(title, id, index) //function(obj)
                    {
                        let obj = new frame.edit.eAction.eBody.eProperty.objFrameBlock(title, id, eval(title).frame);
                        
                        function saveFrameBlockValues(o)
                        {
                            let cnt=1;
                            while((aux_existence(document.getElementById("edit_" + o.title + "_" + o.id + "_" + (cnt)))))
                            {
                                let frameid = document.getElementById("edit_" + o.title + "_" + o.id + "_" + (cnt) + "_0");
                                if(aux_existence(frameid))
                                {
                                    let fullFrameLoop=true;
                                    let bodyFrameArr = [frameid];
                                    let bodyFrame = o.frame.returner(frameid);
                                    for(let fr=bodyFrame.eframe, b0=0, b1=fr.length; b0<b1; b0++)
                                    {
                                        if(fr.type!=="button")
                                        {   
                                            if(fr[b0].moveupdown)
                                            {   bodyFrameArr.push(document.getElementById("edit_" + o.title + "_" + o.id + "_" + (cnt) + "_" + (b0+1))); }
                                            else
                                            {   fullFrameLoop=false; break;}
                                        }
                                    }
                                    
                                    if(fullFrameLoop)
                                    {   o.body.data.push(bodyFrameArr); }
                                }
                                
                                cnt++;
                            }
                        }
                        
                        
                        function getPropertyFrameBlocks(o)
                        {
                            /*
                            Question:
                                should this function request single blocks and place them inside the DOM?
                                or should it send full arrData and all blocks inside a Map?
                            */
                            
                            let frameblock = o.propertyFrame.returner();
                            
                            o.body.requested=true;
                            o.body.data.push((function(fb)
                            {
                                let a = [fb.id];
                                
                                for(let b of fb.eframe)
                                {   if(b.type!=="button"){   a.push(""); }  }
                                
                                return a;
                                
                            })(frameblock));
                            
                            o = frame.edit.eAction.eBody.eProperty.getFrameBlock(o);  
                        }
                        
                        /*
                            this function should clear the DOM
                            place the new empty frames
                            and restore values into the frameblocks
                            */
                        function restoreFrameBlock(o)
                        {
                            let mainDOM = document.getElementById(`propertyBodyFrame_${title}_${actionID}`);
                            if(mainDOM){   mainDOM.innerHTML = ""; }                         
                            
                            /*
                            there is a similar function in pageConfig.js 
                            */
                            function insertDOM(i, v)
                            {
                                return   "<div id=\"" + index + "\"  class=\"editFrameBlockBody\" >" + 
                                            value + 
                                        "</div>";  
                            }
                            

                            
                            o.body.mapReturner.forEach(function(value, indexer){   mainDOM.innerHTML += insertDOM(indexer, value); });
                        }
                    
                    
                        saveFrameBlockValues(obj);
                        getPropertyFrameBlocks(obj);
                        restoreFrameBlock(obj);
                    },
                    
                    
                    //addFrameBlockFrom_eActionLoader: function(obj)
                    addFrameBlockFrom_eActionLoader: function(title, id, index)
                    {
                        let actionProperties = [], actionData = [], editAction = "";
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
                            
                            permission      = 000 111 111 111 111 111 100 1110
                                               1   2   3   4   5   6   7   8
                            
                            permission[0]   = No Access                 |
                            permission[1]   = Default (Not Counting)    | 1
                            permission[2]   = Title                     |
                            
                            permission[3]   = Description               |
                            permission[4]   = DateTime                  | 2
                            permission[5]   = Priority                  |
                            
                            permission[6]   = Risk                      |
                            permission[7]   = List                      | 3
                            permission[8]   = Category                  |
                            
                            permission[9]   = Contacts                  |
                            permission[10]  = Locations                 | 4
                            permission[11]  = Resources                 |
                            
                            permission[12]  = Transactions              |
                            permission[13]  = Variants                  | 5
                            permission[14]  = Closure                   |
                            
                            permission[15]  = Links                     |
                            permission[16]  = Attachments               | 6
                            permission[17]  = Capabilities              |
                            
                            permission[19]  = Comments                  | 
                            permission[20]  = buffer                    | 7
                            permission[21]  = buffer                    |
                            
                            permission[22]  = Save                      |
                            permission[23]  = Close                     | 8
                            permission[24]  = Delete                    | 
                            permission[25]  = ***                       |
                        */
                        let len = actionProperties.length;
                        let wrapFrame_start="", wrapFrame_end="";
                        let permission;
                        let deleteButton = false;
                        let piRequest = true;
                    
    
                        function frame_BottomButtons(index, firstLogCNT, [saveBtn, closeBtn, deleteBtn])
                        {
                            let button = "";
                            let allowance = false;
                            if(aux_existence(toBeCloned))
                            { deleteBtn="0"; closeBtn="0";}
                            
                            function frame_buttons(data)
                            {   return "<table style=\"width:100%\"><tr><td colspan = \"2\">" + data + "</td></tr></table>";    }
    
    
                            if(saveBtn=="1"){   button += "<div class=\"_Button\" style=\"width:100%;\" onmousedown=\"eHandlerMouseDown(this)\"  onclick=\"update_action_OnFrame('" + index + "', '0', '" + toBeCloned + "')\" >Save</div>";     } //it needs to be changed because closed can also be saved
                            if(closeBtn=="1"){   button += "<div class=\"_Button\" style=\"width:100%;\" onmousedown=\"eHandlerMouseDown(this)\"  onclick=\"update_action_OnFrame('" + index + "', '1')\" >Close</div>";    }
                            
                            if((parseInt(firstLogCNT)===0)&&(!aux_existence(toBeCloned))){   allowance = true; }
                            if(((deleteBtn=="1")||(allowance))&&(!deleteButton)){   button = button + "<div class=\"_Button\" style=\"width:100%;\" onmousedown=\"eHandlerMouseDown(this)\" onclick=\"update_action_OnFrame('" + index + "', '2')\" >Delete</div>";   }
    
    
                            if(aux_existence(toBeCloned)){   button += "<div class=\"_Button\" style=\"width:100%;\" onmousedown=\"eHandlerMouseDown(this)\" onclick=\"update_action_OnFrame('" + index + "', '3')\" >Cancel</div>";   }                        
                            return button;
                        }
                        
                        
                        if(id!=="newAction")
                        {   
                            //actionData = document.getElementById("aod_rowData_" + indexer).value.split("*|3f2x|*"); 
                            actionData = document.getElementById("rowData_" + id).value.split("*|3f2x|*"); 
                            notNewAction = true; 
                            
                            
                            if(aux_existence(toBeCloned))
                            {   
                                //Status = Open (Clone)
                                permission = ("000 111 111 111 111 111 100 1110").replaceAll(" ", ""); // By cloning you will be administrator and have full access
                                id = "newAction";
                            }      
                            else
                            {  
                                //Status = closed
                                if(parseInt(actionData[9])===1)
                                {   
                                    permission = ("000 000 001 000 000 000 010 0100").replaceAll(" ", "");    
                                    //permission[8]  = category (ON)
                                    //permission[19] = comments (ON)
                                    //permission[23] = close (ON)
                                }
                                else
                                {   
                                    //status = Open
                                    if(actionData[3].length < 21)
                                    {   permission = ("000 111 111 111 111 111 100 1110").replaceAll(" ", ""); }
                                    else
                                    {   permission = actionData[3]; }
                                }
                            }
                        } 
                        else
                        {   
                            permission = ("000 111 111 111 111 111 100 1100").replaceAll(" ", "");    
                            //permission[24] = delete (OFF)
                        }
    
    
                                            
                        for(let x=0; x<len; x++)
                        {   
                            let full_Display    = "block";
                            let inner_Display   = "none";
                            let aData = actionData[x+8];
                            
                            
                            if(aux_existence(actionProperties[x]))
                            {
                                if(x===0)
                                {   
                                    editAction =  editAction + References.eFrame(id, '1', actionData[x+1]);        //action external reference
                                    editAction =  editAction + References.eFrame(id, '2', actionData[x+2]);        //action internal reference
                                    editAction =  editAction + References.eFrame(id, '3', actionData[x+3]);        //action access code
                                    editAction =  editAction + References.eFrame(id, '4', actionData[x+4]);        //action sourcer (userDatabase / externalSourcerDatabase)                                  
                                    editAction =  editAction + References.eFrame(id, '5', actionData[x+5]);        //action databases connection checker
                                    editAction =  editAction + References.eFrame(id, '6', actionData[x+6]);        //action log counter inside localDatabase   (userInternalDatabase)                          
                                    editAction =  editAction + References.eFrame(id, '7', actionData[x+7]);        //action log Counter inside webDatabase     (userExternalDatabase)
                                    
                                    if(parseInt(actionData[x+4])!==0)
                                    {   editAction =  editAction + References.eFrame(id, '8', actionData[x+8]);    }       //externalSourcerDatabase log Counter
                                    else
                                    {   editAction =  editAction + References.eFrame(id, '8', actionData[x+6]);    }       //externalSourcerDatabase (action.a8 === action.a8) only for action creator
                                } 
                                else
                                {
                                    let obj = new frame.edit.eAction.eBody.eProperty.objFrameBlock(title, id, eval(actionProperties[x]).frame);
                                            obj.head.requested = true;
                                            obj.body.requested = true;
                                            obj.foot.requested = true;
                                            
                                            
                                            if(aux_existence(aData))
                                            {
                                                let arrData = aData.split("*|3f3x|*");
                                                for(let arr of arrData)
                                                {   obj.body.data.push(arr.split("*|3f4x|*"));  }
                                            }
                                            
                                            
                                            
                                            
                                            editAction +=  this.eProperty.getFrameBlock(obj);
    
                                }
                            }                               
                        }
                    },
                    
                    
                    addFrameBlockFrom_headSelector: function(obj)
                    {},
                    
                    
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
                    eFrameBlock: function(title, id, index, frameID, removeSet, sbSet, cntb, cntbe, cntsb)
                    {
                        let propertyFrameBlock = new frame.edit.eAction.eBody.eProperty.objFrameBlock(title, id);
                            propertyFrameBlock.body = new frame.edit.eAction.eBody.eProperty.objSection(title, frameID);
                        
                        //debugger;
                            
                            
                        function savePropertyFrameValues(pF, be, remover)
                        {  
                            let cntB=1; 
                             
                            if(document.getElementById(`propertyBodyFrame_${pF.property}_${pF.id}`).innerHTML!=="")
                            {
                                do
                                {  
                                    notEOB = false;
                                    
                                    let runner_1=true;
                                    let B = document.getElementById(`BodyFrame_${pF.property}_${pF.id}_${cntB}`);
                                    if(aux_existence(B))
                                    {
                                        notEOB=true;
                                        if(cntB===parseInt(remover.rb))
                                        {
                                            if(parseInt(remover.rsb)===-1)
                                            {   runner_1 = false;   }
                                        }
                                            
                                        if(runner_1)
                                        {
                                            let notEOBE;
                                            let objBlock = {};
                                            let cntBE = 0;
                                            do
                                            {
                                                notEOBE = false;
                                                let BE      = document.getElementById(`edit_${pF.property}_${pF.id}_${cntB}_${cntBE}`);
                                                let BE_Name = document.getElementsByName(`edit_${pF.property}_${pF.id}_${cntB}_${cntBE}_ignore`);
                                                if(aux_existence(BE))
                                                {
                                                    if(!aux_existence(BE_Name))
                                                    {
                                                        objBlock[BE.getAttribute("data-action-property-label")] = [BE.value]; 
                                                        notEOBE = true;
                                                    }
                                                    else
                                                    {
                                                        let notEO_SB, notEO_SBE;
                                                        let cntSB=1;//let cntSBE=0;
                                                        let subLabel = BE.getAttribute("data-action-property-label");
                                                        pF.body.subObjIndex = subLabel; 
                                                        objBlock[subLabel] = []; 
                                                        
                                                        
                                                        do
                                                        {
                                                            let objSBlock = {}, runner_2=true;
                                                            notEO_SB=false;
                                                            
                                                            if(cntB===parseInt(remover.rb))
                                                            {
                                                                if(cntSB===parseInt(remover.rsb))
                                                                {   runner_2 = false;   }
                                                            }
                                                            
                                                            let cntSBE=0;
                                                            
                                                            if(aux_existence(document.getElementById(`edit_${pF.property}_${pF.id}_${cntB}_${subLabel}_${cntSB}_0`)))
                                                            {       
                                                                if(runner_2)
                                                                {
                                                                    do
                                                                    {
                                                                        notEO_SBE = false;
                                                                        let SBE = document.getElementById(`edit_${pF.property}_${pF.id}_${cntB}_${subLabel}_${cntSB}_${cntSBE}`);
                                                                        if(aux_existence(SBE))
                                                                        {
                                                                            objSBlock[SBE.getAttribute("data-action-property-label")]=[SBE.value];
                                                                            notEO_SBE = true;
                                                                        }
                                                                        
                                                                    
                                                                        cntSBE++;
                                                                    }
                                                                    while(notEO_SBE);
                                                                }
                                                                notEO_SB = true;
                                                            }
                                                            cntSB++;
                                                            
                                                            if(aux_existence(objSBlock))
                                                            {   objBlock[subLabel].push(objSBlock);     }
                                                        }
                                                        while(notEO_SB);
                                                        
                                                    }
                                                }
                                                
                                                cntBE++;
                                            }
                                            while(notEOBE)
                                            
                                            if(aux_existence(objBlock))
                                            {   pF.body.objData.push(objBlock);  }
                                            
                                        }
                                    }
                                    
                                    cntB++;
                                }
                                while(notEOB)
                            }
                        }
                        
                        
                        function clearPropertyFrameBlock(pF)
                        {   document.getElementById("propertyBodyFrame_" + pF.property + "_" + pF.id).innerHTML =  "";   }
   
   
                        function addPropertyFrameBlock(pF, addExtra)
                        {
                            for(var i0=0, dL0=pF.body.objData.length; i0<dL0; i0++)
                            {   pF = frame.edit.eAction.eBody.eProperty.uniqueFrame(pF, "body", (i0+1)); } 
                            
                            if(aux_existence(addExtra))
                            {    pF = frame.edit.eAction.eBody.eProperty.uniqueFrame(pF, "body", (dL0+1)); }
                            
                            pF.body.returner = (function(thisMap, titleIndexer)
                            {
                                let returner = "";
                                let s0 = thisMap.size;

                                function wrapper(bPosition, sbPosition, x, data, classB)
                                {
                                    let bClass = "longSeparation";
                                    x[0]=  "<div id=\"BodyFrame_" + titleIndexer +  "_" + bPosition + "\" class=\"" + bClass + "\">" +
                                                data + 
                                                "<div id=\"subBodyFrame_" + titleIndexer +  "_" + bPosition + "\">" + 
                                                    x[1] + 
                                                "</div>" +
                                            "</div>";      
                                    
                                    
                                    return x;
                                }
                                
                                
                                let s1=0
                                thisMap.forEach(function(mdata, mkey)//for(let i=0; i<s; i++)
                                {
                                    s1++
                                    let r=["",""];
                                        
                                    for(let m=mdata.length, ml=0; m>ml; m--)
                                    {   r  = wrapper(mkey, (m-1), r, mdata[m-1], (s1!==s0)? true: false); }
                                    
                                    
                                    returner = r[0] + returner;
                                });
                                
                                return returner;
                                
                            })(pF.body.mapReturner,  pF.property + "_" + pF.id);
                            
                            document.getElementById("propertyBodyFrame_" + pF.property + "_" + pF.id).innerHTML =  pF.body.returner;
                            
                            let b = pF.body.subObjIndex;
                            if(aux_existence(b))
                            {
                                for(let i1=0, dL1=pF.body.objData.length; i1<dL1; i1++)
                                {   
                                    if(aux_existence(pF.body.objData[i1][b]))
                                    {
                                        pF.body.returner = "";
                                        frameid = pF.body.objData[i1][b][0]["_frameID"];
                                        pF.body.objFrame = eval(pF.property).frame.returner(frameid);
                                        addPropertySubFrameBlock(pF, (i1+1), b, false);  
                                    }
                                }
                            }
                        }   
   

                        function clearPropertySubFrameBlock(pF, cntB)
                        {   document.getElementById(`subBodyFrame_${pF.property}_${pF.id}_${cntB}`).innerHTML =  "";    }  
                        
                        
                        function addPropertySubFrameBlock(pF, cntB, cntBE, addExtra)
                        {   
                            let cnt = 1, bLen=0;
                                
                            if(aux_existence(pF.body.objData[(parseInt(cntB)-1)]))
                            {
                                dLen=pF.body.objData[(parseInt(cntB)-1)][cntBE].length;
                                cnt=(dLen+1);
                                for(var i=0; i<dLen; i++)
                                {   pF = frame.edit.eAction.eBody.eProperty.uniqueFrame(pF, "body", cntB, cntBE, (i+1)); } 
                            }
                            
                            if(addExtra)
                            {
                                cntB = (aux_existence(cntB))? cntB: 1;
                                pF   = frame.edit.eAction.eBody.eProperty.uniqueFrame(pF, "body", cntB, cntBE, (aux_existence(cnt))?cnt:1); 
                            }
                           
                           
                            
                            //document.getElementById(`subBodyFrame_${pF.property}_${pF.id}_${cntB}`).innerHTML = pF.body.returner;
                            document.getElementById(`subBodyFrame_${pF.property}_${pF.id}_${cntB}`).innerHTML = (function(thisMap, titleIndexer)
                            {
                                let returner = "";
                                let s0 = thisMap.size;
                                
                                thisMap.forEach(function(mdata, mkey)
                                {   
                                    for(let e=1, el=mdata.length; e<el; e++)
                                    {   
                                        if(aux_existence(mdata[e]))
                                        {   returner = mdata[e] + returner;     }
                                    }
                                });
                                
                                return returner;
                                
                            })(pF.body.mapReturner,  pF.property + "_" + pF.id);
                        }


                        let remover = (aux_existence(removeSet))? {rb:cntb, rsb:(aux_existence(cntsb))? cntsb: -1}: {rb:-1, rsb:-1};
                        savePropertyFrameValues(propertyFrameBlock, cntbe, remover);
                        
      
                        if((aux_existence(sbSet))&&(parseInt(sbSet)!==-1)) 
                        {  
                            clearPropertySubFrameBlock(propertyFrameBlock, cntb);
                            addPropertySubFrameBlock(propertyFrameBlock, cntb, cntbe, (remover.rsb!==-1)? false: true);
                        }
                        else
                        {  
                            clearPropertyFrameBlock(propertyFrameBlock);
                            addPropertyFrameBlock(propertyFrameBlock,  (remover.rb!==-1)? false: true);
                        }   
                    },
                    
                    
                    updateReferenceField: function(a, b, c)
                    {
                        console.log("hello");
                    },

                    
                    
                    getDimensionalDataFromPermanceStore: function(store, index, returnedData, propertyFrameArr, property)
                    {
                        let value="", value1=[];
                    
                        
                        function categoryException(pStore)
                        {
                            function optionObjectifier(obj,  counter = "", level=0, returnIndex1="") 
                            {
                                let returner = (level===0)? "<option>Select Category</option>": "";
                                let cnt1 = parseInt(level) + 1;
                                if (obj) 
                                { 
                                    let returnIndex2;
                                    for (let i = 0, l = obj.length; i < l; i++) 
                                    {
                                        let o = obj[i], cntO = (counter!=="")? `${counter}_${i + 1}`: `${i+1}`;
                                        
                                        if(level===0) 
                                        {
                                            if(o.title==="..."){   break; }
                                            returner += `<optgroup label='[ Group: ${i+1} ]'>`; 
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
                            
                                
                                return returner;
                            }
                            
                            return optionObjectifier(pStore);
                        }
                        
                                                
                        function linksException(pStore, status)
                        {
                            function optionObjectifier(obj,  counter = "", level=0, returnIndex1="") 
                            {
                                let returner = (level===0)? "<option>Select Action to Link</option>": "";
                                let cnt1 = parseInt(level) + 1;
                                if (obj) 
                                { 
                                    let returnIndex2;
                                    for (let i = 0, l = obj.length; i < l; i++) 
                                    {
                                        let o = obj[i], cntO = (counter!=="")? `${counter}_${i + 1}`: `${i+1}`;
                                        
                                        if(level===0) 
                                        {
                                            if(o.title==="..."){   break; }
                                            returner += `<optgroup label='[ Group: ${i+1} ]'>`; 
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
                            
                                
                                return returner;
                            }
                            
                            return optionObjectifier(pStore);
                        }
                        
                        
                        function setListor(arr)
                        {
                            let returner = "";
                            
                            if(aux_existence(arr))
                            {
                                for(let a of arr)
                                {
                                    if(aux_existence(a))
                                    {      returner += "<option value=\"" + a + "\" >";  }
                                }
                            }
                            
                            return returner; 
                        }
                        
                        
                        let links, stat;
                        for(let propertyStoreObj of returnedData.children)
                        {
                            if(propertyStoreObj.title===property)
                            {
                                
                                if(property==="Category")
                                {  
                                    console.log("Category Index: ", `${index}`);
                                    if(index.includes("head"))
                                        {
                                        let elementCounter = 2;     //in propertyHead, the selector is in position (2)
                                        document.getElementById(`${index}_${elementCounter}`).innerHTML = categoryException(propertyStoreObj.children);
                                    }
                                    break;
                                }
                                
                                
                                if((property==="Links")||(property==="Status"))
                                {  
                                    if(property==="Links"){ links = propertyStoreObj; }
                                    
                                    if(property==="Status"){ stat = propertyStoreObj; }
                                    
                                    if(aux_existence(links)&&aux_existence(stat))
                                    {
                                        console.log("Links Index: ", `${index}`);
                                        
                                        let elementCounter = 2;     //in propertyHead, the selector is in position (2)
                                        document.getElementById(`${index}_${elementCounter}`).innerHTML = linksException(propertyStoreObj.children, stat.children);
                                        
                                        break;
                                    }
                                }
                                
                                
                                for(let innerStoreObj of propertyStoreObj.children)
                                {
                                    let cnt1 = 0;
                                    for(let element of propertyFrameArr)
                                    {
                                        cnt1++;
                                        if((innerStoreObj.title===element.label)||(innerStoreObj.title===element.labelID))
                                        {
                                            for(let innerInnerStoreObj of innerStoreObj.children)
                                            {   value1.push(innerInnerStoreObj.title);  }
                                            
                                            document.getElementById(`list_${index}_${cnt1}`).innerHTML  = setListor(value1);
                                            break;
                                        }
                                    }
                                }
                                
                                break;
                            }
                        }
                    },
                    
                    
                    
                    getDimensionalDataFromActionStore: function(storegroup, index, actionArr, property, data)
                    {
                        let gid, glabel, selector = document.getElementById(`${index}_4`);
                        let sIntro = "Select Action To Link Here";
                    
                        
                        function setListor(id, label, arr, selector, userdata)
                        {
                            let optGroup = document.createElement("optgroup");
                                optGroup.id = id;
                                optGroup.label = label;  
                                
                                
                                for(let a of arr)
                                {
                                    let opt = document.createElement("option");
                                        opt.value   = a.InternalCode;
                                        opt.id      = a.InternalCode;
                                        opt.text    = a.Title[0]["_name"];
                                        //if(opt.value===userdata["_reference"][0]){opt.selected=true;}
                                        optGroup.appendChild(opt);
                                }
                                
                                selector.appendChild(optGroup);
                        }
                       

                        
                        
/*                        
                        if (selector.selectedIndex === 0) 
                        {

                          var option = document.createElement("option");
                          option.text = "Select Action To Link Here";
                          var sel = selector.options[0];
                          selector.add(option, sel);

                        let value0 = document.createElement("option");
                            value0.text = "Select Action To Link Here";
                        selector.add(value0, selector[0]);
                        }
*/                        
                        if(parseInt(storegroup)!==0)
                        {   
                            gid="closedActions"; 
                            glabel="--- [ Closed Actions ] ---";
                        }
                        else
                        {   
                            gid="openActions";
                            glabel="--- [ Open Actions ] ---"; 
                        }
                        
                        setListor(gid, glabel, actionArr, selector, data);
                        
                        
                        if (selector.options[0].text!==sIntro) 
                        {
                            let value0 = document.createElement("option");
                                value0.text = sIntro;
                            selector.prepend(value0);
                        }
                        
                        if(aux_existence(data))
                        {  document.getElementById(`${data["_reference"][0]}`).selected = true;    }
                        else
                        {   selector.selectedIndex = 0;            }
                    },
                    

                    eDimensionSettler: function(obj, framer, section, cnt)
                    {  
/*
Important NOTE:
    these dimensional inputors only save the dimensions of the frame. The no longer save the entire block information.
    
    
*/                 //let userData    = body.data[cnt-1];
                        let userData    = obj[section]["objData"];
                        let arrContact  = (obj.property!=="Contacts")?  (aux_existence(document.getElementById("dimension_Contacts")))? document.getElementById("dimension_Contacts").value.split("*|3f3y|*"): []:  [];   
                        let arrResource = (obj.property!=="Resources")?  (aux_existence(document.getElementById("dimension_Resources")))? document.getElementById("dimension_Resources").value.split("*|3f3y|*"): []:  []; 
                        let arrLocation = (obj.property!=="Locations")?  (aux_existence(document.getElementById("dimension_Locations")))? document.getElementById("dimension_Locations").value.split("*|3f3y|*"): []:  []; 
                        let arrLinker   = (obj.property==="Links")?      (aux_existence(document.getElementById("dimension_Links")))? document.getElementById("dimension_Links").value.split("*|3f3y|*"): []:  [];
                        
                        //let dimensionData = document.getElementById(`dimension_${obj.property}`);
                        
                        if(obj.property!=="Links")
                        {   loadDataFromStore("PerformanceStore", "Indicators", "", frame.edit.eAction.eBody.eProperty.getDimensionalDataFromPermanceStore, `edit_${obj.property}_${obj.id}_${cnt}`, obj.frame.returner().eframe, obj.property);  }
                        else
                        {   
                            if(cnt!=="head")
                            {
                                let data = (aux_existence(obj.body.objData))? (aux_existence(obj.body.objData[cnt-1]))? obj.body.objData[cnt-1]: [""]: [""];
                                loadIndexDataFromStore("Actions", "statusIndexer", "0", "", frame.edit.eAction.eBody.eProperty.getDimensionalDataFromActionStore, `edit_${obj.property}_${obj.id}_${cnt}`, obj.property, data);     
                                loadIndexDataFromStore("Actions", "statusIndexer", "1", "", frame.edit.eAction.eBody.eProperty.getDimensionalDataFromActionStore, `edit_${obj.property}_${obj.id}_${cnt}`, obj.property, data);   
                            }
                        }
                    },                           

                    
// Concern: instead of sending all these arguments why not just sent an object//
                    eDimensionalSelection: function({title, id, indexer, frameID, userData}, headFrame)
                    {
                        let extraD="";
                        let data = document.getElementById("dimension_" + title).value;
                        let p = document.getElementById(indexer).value;
                        
                        let b = document.getElementById("countBlocks_" + title + "_" + id);
                        let Bnumber    = (b)? parseInt(b.value): 0;
                        //let Bnumber = document.getElementById("countBlocks_" + title + "_" + id).value;
                        
                        
                        if(!aux_existence(userData))
                        {
                            if(title==="Variants")
                            {
                                let arrAction = data.split("*|DP|*");
                                
                                for(let row of arrAction)
                                {
                                    if(aux_existence(row))
                                    {
                                        let rowElements = row.split("*|3f4x|*"); 
                                        if(rowElements[0]===document.getElementById(indexer).options[document.getElementById(indexer).selectedIndex].text)
                                        {   userData = frameID + "*|3f4x|*" + rowElements[0] + "*|3f4x|*" + rowElements[1] + "*|3f4x|**|3f4x|*" + rowElements[2] + "*|3f4x|**|3f4x|*" + rowElements[3]; }
                                    }
                                }
                            }
                            else
                            {
                                if(p.indexOf("Group")!==-1)         
                                {
                                    let contactArr = [];
                                    let groupArr = [];
                                    let groupIndex = document.getElementById(indexer).selectedIndex;
                                    let group = document.getElementById(indexer).options[groupIndex].text;
                                    
                                    let d=data.split("*|3f3y|*");
                                    
                                        for(let dData of d)
                                        {   
                                            let contact = dData.split("*|3f4y|*");
                                            
                                            if(aux_existence(contact[3]))
                                            {   
                                                let contactGroup = contact[3].split("*|3f7y|*");
                                                for(let cgroup of contactGroup)
                                                {   if(cgroup===group){   userData += frameID + "*|3f4y|*" + dData + "*|3f3y|*";  } }
                                            }
                                        }
                                    
                                }
                                else
                                {
                                    let i=0;
                                    let arrAction = data.split("*|3f3y|*")
                                    
                                    for(let row of arrAction)
                                    {
                                        if(aux_existence(row))
                                        {
                                            let rowElements = row.split("*|3f4y|*"); 
                                            if(title==="Links")
                                            {
                                                //let linkRef = document.getElementById("dimension_Links_References");
                                                
                                                if(rowElements[2]===aux_textSignIn(document.getElementById(indexer).options[document.getElementById(indexer).selectedIndex].value))
                                                {   userData = rowElements[1] + "*|3f4y|*" + rowElements[0] + "*|3f4y|*" + rowElements[2];    }
                                            }
                                            else
                                            {
                                                if(title==="Attachments")
                                                {
                                                    let rowdata = rowElements[0].split("*|3fxx|*");
                                                    if(rowdata[0]===aux_textSignIn(document.getElementById(indexer).options[document.getElementById(indexer).selectedIndex].text))
                                                    {   userData = frameID + "*|3f4x|*" + rowElements[1] + "*|3f4y|*" + rowdata[0] + "*|3f4y|*" + rowdata[1]; }
                                                }
                                                else
                                                {
                                                    if(rowElements[0]===aux_textSignIn(document.getElementById(indexer).options[document.getElementById(indexer).selectedIndex].text))
                                                    {   userData = frameID + "*|3f4y|*" + row;  } 
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    
                        
                        this.eFrameBlock(title, id, indexer, frameID, "", "", sbPosition, userData);    

                        document.getElementById(indexer).selectedIndex = 0;
                    },
 
 
                    eDimensionalHeadSelector: function(obj, objHead, bodyFrame)
                    {    
                        /*
                        Important Note: 
                            this can be processed by a dedicated-worker
                        */
                        
                        
                        let mapCategory = new Map();
                        
                        let {title, id} = obj;      
                        
                        let returner="<option value=\"\">Select Existing " + title + " Name</option>"; 
                        
                        let headPlacer = (function(fr)
                        {
                            let hp=0;
                            for(let i0=0, i1=fr.length; i0<i1; i0++)
                            {   if(fr[i0].moveupdown){hp = i0; break;}  }
                            
                            return hp;
                        })(bodyFrame.eframe);    
                        

                        let data = document.getElementById("dimension_" + title);

                        function categoryException(Str)
                        {
                            function parseStringToTree(str)
                            {
                                // Split the string based on the pattern "*|level|*"
                                const regex = /\*\|3f(\d+)y\|\*([^*]+)/g;
                                let match;
                                const nodes = [];
                            
                                while ((match = regex.exec(str)) !== null) 
                                {
                                    const level = parseInt(match[1], 10);
                                    const title = match[2].trim();
                                    nodes.push({ level: level, title: title, sublevel: [] });
                                }
                            
                                // Build the tree
                                const root = { sublevel: [] };
                                const stack = [root];
                            
                                nodes.forEach(node => 
                                {
                                    while (stack.length > node.level + 1) 
                                    {   stack.pop(); }
                                    
                                    stack[stack.length - 1].sublevel.push(node);
                                    stack.push(node);
                                });
                            
                                return root.sublevel;
                            }
                            
                            function optionObjectification(obj,  counter = "", mainLevel) 
                            {
                                 let returner = "";
                                if (obj) 
                                { 
                                    
                                    for (let i = 0, l = obj.length; i < l; i++) 
                                    {
                                        let o = obj[i], cntO = (counter!=="")?`${counter}_${i + 1}`: `${i+1}`;
                                        
                                        if(obj[i].level===0) returner += `<optgroup label='[ Group: ${i+1} ]'>`;
                                        if ((o.title) && (o.title !== "")) 
                                        {
                                            returner += `<option value='${cntO}'>${cntO}: ${o.title}</option>`;
                            
                                            if ((o.sublevel) && (o.sublevel.length > 0)) 
                                            {   returner += optionObjectification(o.sublevel, cntO);   }
                                        }
                                        if(obj[i].level===0) returner += `</optgroup>`;
                                    }
                                }
                            
                                
                                return returner;
                            }
                            
                            return optionObjectification(parseStringToTree(Str));
                        }
                        
                        function linksException(Str)
                        {
                            let cArr=[], aArr=[];
                            let returner="";
                            
                            let str = Str.split("*|3f3y|*");
                            for(let strBlock of str)
                            {
                                let elements = strBlock.split("*|3f4y|*");
                                if(Number(elements[1])!==0)
                                {
                                    cArr.push(elements);
                                }
                                else
                                {   aArr.push(elements); }
                            }
                            
                            cArr.sort();
                            aArr.sort();
                            
                            
                            returner += "<optgroup label=\"---[ Active Actions ]---\">";
                            for(let a of aArr){   returner += "<option value=\""  + a[2] + "\">" + a[0] + "</option>";  }
                            returner += "</optgroup>";                            
                            
                            
                            returner += "<optgroup label=\"---[ Closed Actions ]---\">";
                            for(let c of cArr){   returner += "<option value=\""  + c[2] + "\">" + c[0] + "</option>";  }
                            returner += "</optgroup>";
                            
                            return returner;
                        }

                        

                        if(aux_existence(data))
                        {
                            let hd1=data.value.split("*|3f3y|*");
                            let cnt=0;
                            if(aux_existence(hd1))
                            {
                                switch(title)
                                {
                                    case "Category":
                                        returner += categoryException(data.value);
                                        
                                        break;
                                        
                                    case "Links":
                                        returner += linksException(data.value);
                                        break;
                                        
                                    case "Attachments":
                                        break;
                                        
                                    case "Variables":
                                        break;
                                                                            
                                        
                                    default:
                                        //let hd1=data.value.split("*|3f3y|*");
                                        if(aux_existence(hd1[headPlacer]))
                                        {
                                            let hd2 = hd1[headPlacer].split("*|3f4y|*");
                                            for(let hd3 of hd2)
                                            {
                                                cnt++;
                                                returner += "<option value=\""  + cnt + "\">" + hd3 + "</option>";
                                            } 
                                        }
                                }   
                            }
                        }       
                        
                        //eFrameBlock(title, id, index, frameID, removeSet, sbSet, SBposition, userdata)
                        //this.eFrameBlock(title, id, indexer, frameID, "", "");    
                        //document.getElementById(indexer).selectedIndex = 0;
                        return returner;
                    },
                    
                    
                    eExpandAll: function(id)
                    {
                        let propertyList = apps.properties; //document.getElementById("properties").value.split("*|3f2x|*");
                        let nab = document.getElementById("body_newAction");
                        let nabh = nab.scrollHeight;
                        let cntH = 0;
                        for(let x0=3, x1=(propertyList.length-1); x0<x1; x0++)
                        {
                            let body = document.getElementById("body_" + propertyList[x0] + "_" + id);
                            body.style.display = "block";  
                            let bHeight = body.scrollHeight;
                            body.style.maxHeight = bHeight + "px";
                            cntH = cntH + Number(bHeight);
                            
                            document.getElementById("arrow_" + propertyList[x0] + "_" + id).innerText = "\u25bc";
                        }
                        
                        nab.style.maxHeight = Number(nabh) + Number(cntH) + "px";
                        
                       document.getElementById("newActionExpandRetract").innerHTML = "<div style=\"text-align: right;\" onclick=\"frame.edit.eAction.eBody.eProperty.eRetractAll('" + id + "')\" >Retract All</div>";
                    },


                    eRetractAll: function(id)
                    {
                        let propertyList =  apps.properties; //document.getElementById("properties").value.split("*|3f2x|*");
                        
                        for(let x0=3, x1=(propertyList.length-1); x0<x1; x0++)
                        {
                            document.getElementById("body_" + propertyList[x0] + "_" + id).style.display = "none";  
                            document.getElementById("arrow_" + propertyList[x0] + "_" + id).innerText = "\u25b6";
                        }
                        
                       document.getElementById("newActionExpandRetract").innerHTML = "<div style=\"text-align: right;\" onclick=\"frame.edit.eAction.eBody.eProperty.eExpandAll('" + id + "')\" >Expand All</div>";
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
                    returner: function(title, id, propertyData, blockDisplay, innerDisplay, status, piRequest)
                    {
                        let classArr = ["openDisplay eProperty",[["noclass","noclass","noclass"],["noclass","noclass","noclass"]], "closedDisplay", "closedDisplay"];
                        let objHead, objBody, objFoot;
                        let defaultBlockCounter=0;
                        let defaultFrameID = 1;
                        let value;
                        let instructions = aux_existence(eval(title).instructions())? eval(title).instructions(): "Instructions coming soon";
                        let footExtension = "<div id=\"propertyBodyInstructor" + title + "_" + id + "\"  class=\"eFrameInstructor\">"  + 
                                                "<div id=\"head_Instructor_" + title + "_" + id + "\"  class=\"eFrameHeadInstructor\"  onclick=\"aux_colapseDivItem('Instructor_" + title + "_" + id + "','4', 'edit')\">" + 
                                                    "<span id=\"arrow_Instructor_" + title + "_" + id + "\"  class=\"eFrameArrowInstructor\">\u25b6</span>" +
                                                    "<span id=\"title_Instructor_" + title + "_" + id + "\"  class=\"eFrameTitleInstructor\">Help</span>" +
                                                "</div>" + 
                                                "<div id=\"body_Instructor_" + title + "_" + id + "\"  style=\"display:none\" class=\"eFrameBodyInstructor\">" + instructions + "</div>" +                                                     
                                            "</div><br>";
                                            
                                            
                        let simbol = "\u25bc";
                        if(innerDisplay!=="block"){simbol = "\u25b6"; }

                        function universalPropertyFrame(objFrame)
                        {   
                            //let {BlockCount, data="", head="", body="", foot=""} = objFrame;
                            let head = (aux_existence(objFrame.head.returner))? objFrame.head.returner: "";
                            let foot = (aux_existence(objFrame.foot.returner))? objFrame.foot.returner: "";
                            
                            objFrame.body.returner = (function(thisMap, titleIndexer)
                            {
                                let returner = "";
                                
                                if(thisMap)
                                {
                                    let s0 = thisMap.size;
                                    
                                    function wrapper(bPosition, sbPosition, x, data, bSeparatorRequired, sbSeparatorRequired)
                                    {
    /*                                    
                                        if(sbPosition!==0)
                                        {   
                                            let sbClass = (sbPosition!==1)? "shortSeparation": ""; 
                                            x[1] +=  "<div id=\"subBodyFrame_" + titleIndexer + "_" + bPosition + "-" + sbPosition + "\" class=\"" + sbClass + "\">" + data + "</div>";     
                                            
                                        }
                                        else
                                        {
                                            let bClass = (classB)? "longSeparation": "";
                                            x[0]=   "<div id=\"BodyFrame_" + titleIndexer +  "_" + bPosition + "\" class=\"" + bClass + "\">" +
                                                        data + "<div id=\"subBodyFrame_" + titleIndexer +  "_" + bPosition + "\">" + x[1] + "</div>" +
                                                    "</div>";      
                                        }
    */
                                        if(sbPosition!==0)
                                        {   x[1] +=  data;   }
                                        else
                                        {
                                            x[0]=   "<div id=\"BodyFrame_" + titleIndexer +  "_" + bPosition + "\" class=\"longSeparation\">" +
                                                        data + "<div id=\"subBodyFrame_" + titleIndexer +  "_" + bPosition + "\">" + x[1] + "</div>" +
                                                    "</div>";      
                                        }
                                        return x;
                                    }
                                    
                                    let s1=0;
                                    thisMap.forEach(function(mdata, mkey)//for(let i=0; i<s; i++)
                                    {
                                        let r=["",""];
                                        s1++;
                                        let mdL = mdata.length;
                                        for(let m=mdL, ml=0; m>ml; m--)
                                        {   if(aux_existence(mdata[m-1])){ r  = wrapper(mkey, (m-1), r, mdata[m-1], (s0!==s1)? true: false, (m!==mdL)? true: false); }}
                                        
                                        
                                        returner = r[0] + returner;
                                    });
                                }
                                
                                return returner;
                            
                            })(objFrame.body.mapReturner, objFrame.property + "_" + objFrame.id);
                            
                            if(!aux_existence(objFrame.body.objData)){ data = "<input type=\"hidden\" id=\"countBlocks_" + objFrame.property + "_" + id + "\" value=\"0\">"; }
                            let footDisplay = (aux_existence(objFrame.body.returner))? "block": "none";


                                                                     
                            return  "<div id=\"objProperty_" + objFrame.property + "_" + id + "\"  class=\"eProperty\"  style=\"display: " + blockDisplay + "\">" +
                                        "<div id=\"data_" + objFrame.property + "_" + id + "\">" +
                                            //objFrame.dataReturner() + 
                                        "</div>" +
                                        "<div id=\"head_" + objFrame.property + "_" + id + "\" class=\"eFrame_Head\" onclick=\"aux_colapseDivItem('" + objFrame.property + "_" + id + "','2','edit')\">" +
                                            "<span id=\"arrow_" + objFrame.property + "_" + id + "\">" + simbol + "</span>" +
                                            "<strong>" + objFrame.property + "</strong>" +
                                        "</div>" +
                                        "<div id=\"body_" + objFrame.property + "_" + id + "\" class=\"eFrame_Body\" style=\"display: " + innerDisplay + ";\" >" +
                                            "<div class=\"BAEPB_Head\" id=\"propertyHeadFrame_" + objFrame.property + "_" + objFrame.id + "\">" + head + "</div>" +  
                                            "<div class=\"BAEPB_Body\" id=\"propertyBodyFrame_" + objFrame.property + "_" + objFrame.id + "\">" + objFrame.body.returner + "</div>" +  
                                            "<div class=\"BAEPB_Foot\" id=\"propertyFootFrame_" + objFrame.property + "_" + objFrame.id + "\"  >" + 
                                                "<div id=\"head_Instructor_" + objFrame.property + "_" + id + "\"  class=\"eFrameHeadInstructor\"  onclick=\"aux_colapseDivItem('Instructor_" + objFrame.property + "_" + id + "','3', 'edit')\">" + 
                                                    "<span id=\"arrow_Instructor_" + objFrame.property + "_" + id + "\"  class=\"eFrameArrowInstructor\">\u25b6</span>" +
                                                    "<span id=\"title_Instructor_" + objFrame.property + "_" + id + "\"  class=\"eFrameTitleInstructor\">Help</span>" +
                                                "</div>" +
                                                "<div id=\"body_Instructor_" + objFrame.property + "_" + id + "\"  style=\"display:none\" class=\"eFrameBodyInstructor\">" + instructions + "</div>" +                                                     
                                            "</div>" +
                                        "</div>" +
                                        "<div id=\"foot_" + objFrame.property + "_" + id + "\" class=\"eFrame_Foot\"></div>" + 
                                    "</div>"; 
                        }
                        
                        let headData = ["head"];            //why???
                        let footData = ["foot"];            //why???
                        
                        
                        let obj     = new this.objFrameBlock(title, id);  
                        obj.body    = new this.objSection(obj.property, "");
                        let subLabel = obj.body.objFrame.subFrameLabel;
                        
                        obj = this.uniqueFrame(obj, "head", "head");
                        obj = this.uniqueFrame(obj, "foot", "foot");
                        
                         
                        
                        
                        
                        if(aux_existence(propertyData))
                        {
                            obj.body.objData = propertyData;
                            propertyData.forEach((b, i0)=>
                            {   obj = this.uniqueFrame(obj, "body", (i0+1));   });
                            
                            
                            obj.body.objData.forEach((b, i0)=>
                            {
                                if(aux_existence(b[subLabel]))
                                {
                                    for(let i1=0, i2=b[subLabel].length; i1<i2; i1++)
                                    {  
                                        frameid = b[subLabel][0]["_frameID"];
                                        obj.body.objFrame = obj.frame.returner(frameid);
                                        obj = this.uniqueFrame(obj, "body", (i0+1), subLabel, (i1+1)); 
                                    }
                                }
                            });    
                        }
                        else
                        {   
                            if(!aux_existence(obj.head.returner))
                            {   obj = this.uniqueFrame(obj, "body", 1);  }
                        }
                        
                        
                                        
                                        
                        return universalPropertyFrame(obj);                          
                    },
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
                        
                        permission      = 000 111 111 111 111 111 000 1110  (newAction)
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
                        
                        permission[12]  = Transactions              1|
                        permission[13]  = Variables                 1| 5
                        permission[14]  = Analysis                  1|
                        
                        permission[15]  = Links                     1|
                        permission[16]  = Attachments               1| 6
                        permission[17]  = Closures                  1|
                        
                        permission[18]  = Comments                  0| 
                        permission[19]  = buffer                    0| 7
                        permission[20]  = buffer                    0|
                        
                        permission[21]  = Save                      1|
                        permission[22]  = Close                     1| 8
                        permission[23]  = Delete                    1| 
                        permission[24]  = ***                       0|
                    */
                    let len = actionProperties.length;
                    let wrapFrame_start="", wrapFrame_end="";
                    let permission;
                    let deleteButton = false;
                    let piRequest = true;
                

                    function frame_BottomButtons(index, firstLogCNT, [saveBtn, closeBtn, deleteBtn])
                    {
                        let button = "";
                        let allowance = false;
                        if(aux_existence(toBeCloned))
                        { deleteBtn="0"; closeBtn="0";}
                        
                        function frame_buttons(data)
                        {   return "<table style=\"width:100%\"><tr><td colspan = \"2\">" + data + "</td></tr></table>";    }


                        if(saveBtn=="1"){   button += "<div class=\"_Button\" style=\"width:100%;\" onmousedown=\"eHandlerMouseDown(this)\"  onclick=\"update_action_OnFrame('" + index + "', '0', '" + toBeCloned + "')\" >Save</div>";     } //it needs to be changed because closed can also be saved
                        if(closeBtn=="1"){   button += "<div class=\"_Button\" style=\"width:100%;\" onmousedown=\"eHandlerMouseDown(this)\"  onclick=\"update_action_OnFrame('" + index + "', '1')\" >Close</div>";    }
                        
                        if((parseInt(firstLogCNT)===0)&&(!aux_existence(toBeCloned))){   allowance = true; }
                        if(((deleteBtn=="1")||(allowance))&&(!deleteButton)){   button = button + "<div class=\"_Button\" style=\"width:100%;\" onmousedown=\"eHandlerMouseDown(this)\" onclick=\"update_action_OnFrame('" + index + "', '2')\" >Delete</div>";   }


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
                    

                    if(indexer!=="newAction")
                    {   
                        notNewAction = true; 
                        
                        
                        if(aux_existence(toBeCloned))
                        {   
                            //Status = Open (Clone)
                            permission = ("000 111 111 111 111 111 100 1110").replaceAll(" ", ""); // By cloning you will be administrator and have full access
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
                                permission[2] = "0";
                                permission[3] = "0";
                                permission[4] = "0";
                                
                                permission = permission.join("");
                            }
                        }
                    } 
                    else
                    {   permission = ("000 111 111 111 111 111 000 1110").replaceAll(" ", "");    }


                                        
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
                                    let aData = actionData[actionProperties[x]];
                                    if(x>2)             //Start editing from description
                                    {   
                                        if(aux_existence(aData))
                                        {   inner_Display = "block"; }
                                        else
                                        {   if(actionProperties[x]!=="Description"){  inner_Display = "none";  }}


                                        if(permission[x]!=="1"){   full_Display = "none"; }


                                        if(actionProperties[x]==="DateTime")
                                        {
                                            if(aux_existence(toBeCloned))
                                            {   aData = ""; }
                                            else
                                            {
                                                const colorCode = DateTime.actionColorCode(actionData["Status"], actionData["DateTime"]).cReference;
                                                if((parseInt(actionData[8])===0)&&(colorCode<2)){  full_Display = "none"; deleteButton=true;}
                                            }
                                        }



                                        if(actionProperties[x]==="Comments")           //create an empty comment block
                                        {   
                                            let commentDateTime = DateTime.aux_ParseTo.extendDateTime();
                                            let commentUserName = sessionStorage.username;
                                            
                                            if(aux_existence(aData))
                                            {   aData.push({_name:[commentUserName], _eodt:[commentDateTime], _comments:[""]}); }
                                            else
                                            {   
                                                piRequest = true;
                                                aData = [{_name:[commentUserName], _eodt:[commentDateTime], _comments:""}];
                                            }                                            
                                        }
                                        
                                       
                                        if(x==(len-1))
                                        {
                                            if(!aux_existence(toBeCloned))
                                            {   full_Display = "block"; inner_Display = "block"; }
                                            else
                                            {   aData = ""; full_Display = "none";}
                                        }
                                        
                                        editAction +=  frame.edit.eAction.eBody.eProperty.returner(actionProperties[x], indexer, (aux_existence(aData))? aData: "", full_Display, inner_Display, actionData["Status"], piRequest);
                                    }
                                    else
                                    {
                                        if(toBeCloned)
                                        {   if(x===2){   editAction +=  frame.edit.eAction.eBody.eProperty.returner("Title", "newAction", (aux_existence(aData))? aData: "", "block", "block", "0", piRequest);  }  }
                                    }
                                }
                                else
                                {   //id===newAction
                                    if(x===3)
                                    {  
                                        editAction += "<div id=\"newActionExpandRetract\" >" + 
                                                                        "<div style=\"text-align: right;\" onclick=\"frame.edit.eAction.eBody.eProperty.eExpandAll('" + indexer + "')\" >Expand All</div>" +
                                                                    "</div>";
                                    }
                                    
                                    if(x<3){    inner_Display = "block"; }
                                    
                                    if((x!==1)&&(x!==(len-1)))
                                    {   editAction +=  this.eProperty.returner(actionProperties[x], indexer, "", full_Display, inner_Display, 0, piRequest); }
                                }
                            }
                        }                               
                    }
                         
                    let head=["","","","","","","",""] 
                    let body = editAction;
                    let foot = frame_BottomButtons(indexer, (notNewAction)? actionData["MaxInnerActionCounter"]: 0, [permission[21], permission[22], permission[23]]);
                    
                    if(tinymce){tinymce.remove(); }
                    
                    if(indexer!=="newAction")
                    {   
                        let classArr = ["openDisplay ",[["noclass","noclass","noclass"],["noclass","noclass","noclass"]], "openDisplay", "openDisplay"];
                        
                        document.getElementById("actionboard_FromMenu_newAction").innerHTML = "";
                        if(aux_existence(toBeCloned))
                        {   
                            document.getElementById(id).innerHTML = "<div id=\"body_newAction\">" + body + "</div>" +
                                                                    "<div id=\"foot_newAction\">" + foot + "</div>"; 
                        }
                        else
                        {
                            if(document.getElementById("body_" + indexer))
                            { 
                                document.getElementById("body_" + indexer).innerHTML = body;                          
                                document.getElementById("foot_" + indexer).innerHTML = foot;
                            }
                            
                            document.getElementById(indexer).setAttribute("data-display-mode","edit");
                        }
                        document.getElementById("headeditor_" + indexer).classList.toggle("closedDisplay");
                    }
                    else
                    {   
                        let editNewActionBoard = document.getElementById("actionboard_FromMenu_newAction");
                        
                        if(editNewActionBoard.innerHTML!=="")
                        {   editNewActionBoard.innerHTML="";   }
                        else
                        {                       
                            let classArr = ["openDisplay ",[["noclass","noclass","noclass"],["noclass","noclass","noclass"]], "openDisplay", "openDisplay"];
                            editNewActionBoard.innerHTML=collapseBlock("", head, [body,false], [foot], [indexer,"",""], classArr);  
                        }
                        
                        aux_colapseMenuDIV('fromMenu_newAction', 'Menu'); 
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
                {   loadDataFromStore("Actions", parseInt(id), "", frame.edit.eAction.eBody.returner, "", CloneAction);  }
                else
                {   frame.edit.eAction.eBody.returner(id);    }
                
                populate_eHandlers();
                //document.addEventListener("DOMContentLoaded", () => { populate_eHandler(); });
            }
        },



        report:
        {
            datetimeFrame: function(index)
            {
                let now = new Date().getTime();
                
                document.getElementById("foot_dstart_datetime_" + index).innerHTML   = "<input type=\"datetime-local\" id=\"foot_estart_datetime_" + index + "\" value=\"\">";
                document.getElementById("foot_dend_datetime_" + index).innerHTML     = "<input type=\"datetime-local\" id=\"foot_eend_datetime_" + index + "\" value=\"" + DateTime.aux_ParseTo.extendDateTime_local(now) + "\">";
            }
        },
        
        
        eDetails:
        {
            efocusON: function(indexer) 
            { 
                let arrIndex = indexer.split("_");
                //let [iEdit, iProperty, iID, iBlock, iElement, iSubElement] = indexer.split("_");
                let [mode, property, id, block, belement, sblock, sbelement] = indexer.split("_");
                
                //let selectedBlockFrame = (aux_existence(iSubElement))? `${iBlock}_${Element}_${iSubElement}`: iBlock;
/*                
                function setElements(i)
                {
                    if(aux_existence(document.getElementById(i).getAttribute("removepermission")))
                    {
                        document.getElementById(`move_${mode}_${property}_${id}_${block}_${belement}`).style.display    = "none";  
                        document.getElementById(`Remove_${iEdit}_${title}_${id}_${iBlock}_${iElement}`).style.display  = "block";  
                        document.getElementById(`Remove_${iEdit}_${title}_${id}_${iBlock}_${iElement}`).setAttribute("data-removeblock","true"); 
                    }
                }
*/                
                document.getElementById(indexer).style.backgroundColor = "#d6f5f5";       
                
                if(aux_existence(document.getElementById(indexer).getAttribute("removepermission")))
                {
                    document.getElementById(`move_${indexer}`).style.display    = "none";  
                    document.getElementById(`Remove_${indexer}`).style.display  = "block";  
                    document.getElementById(`Remove_${indexer}`).setAttribute("data-removeblock","true"); 
                }
            },


            efocusOFF: function(indexer) 
            { 
                //let [iEdit, iProperty, iID, iBlock, iElement, iSubElement] = indexer.split("_");
                let [mode, property, id, block, belement, sblock, sbelement] = indexer.split("_");
                //document.getElementById("edit_" + title + "_" + id + "_foot_3").value = indexer;  
                
                let docvalue = document.getElementById(indexer);
                
                if(aux_existence(aux_textValidated(docvalue.value)))
                {   docvalue.style.backgroundColor = "white"; }
                else
                {   
                    docvalue.style.backgroundColor = "#ffe6e6"; 
                    docvalue.focus();
                }
                
                
                //if(!aux_existence(document.getElementById(`Remove_${iEdit}_${title}_${id}_${iBlock}`).dataset.removeblock))
                //if(aux_existence(document.getElementById(indexer).getAttribute("removepermission")))
                {
                    document.getElementById(`move_${indexer}`).style.display    = "block";  
                    document.getElementById(`Remove_${indexer}`).style.display  = "none";  
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
                
                frame.edit.eDetails.efocusOFF(title, id, indexer);
            },
            
            
            mover:
            {
                blockframe: function(propertyIndex, mover)
                {
                    let bfArray = [];
                    let SBE = "";
                    let dataUpdateRequired = false;
                    let movingSub = false;
                    let [mode, property, id, cntB, cntBElem, cntSB, cntSBElem] = propertyIndex.split("_");
                    
                    let bf_Obj = new frame.edit.eAction.eBody.eProperty.objFrameBlock(property, id);
                        bf_Obj.body = new frame.edit.eAction.eBody.eProperty.objSection(property, "");
                        

                    function runFrameBlock_2(index)
                    {
                        //let index = `edit_${index}`;
                        
                        let arrB=[];
                        let cntB=1, notEndOfBlock, notEndOfBlockElements;
                        do
                        {
                            notEndOfBlock = false;
                            let objB = {};
                            let cntBE=0;
                            do
                            {
                                notEndOfBlockElements = false;
                                let BE      = document.getElementById(`${index}_${cntB}_${cntBE}`);
                                let BE_Name = document.getElementsByName(`${index}_${cntB}_${cntBE}_ignore`);
                                
                                if(aux_existence(BE))
                                {
                                    let label   = BE.getAttribute("data-action-property-label");
                                    notEndOfBlockElements = true;
                                    if(aux_existence(BE_Name))
                                    {   
                                        bf_Obj.body.subObjIndex = label;
                                        objB[label] = runFrameBlock_2(`${index}_${cntB}_${label}`);  
                                        
                                    }
                                    else
                                    {   objB[label] = [BE.value];  }
                                }
                                cntBE++;
                            }
                            while(aux_existence(notEndOfBlockElements))
                                
                            
                            cntB++;
                            if(aux_existence(objB))
                            {
                                notEndOfBlock = true;
                                arrB.push(objB);
                            }
                        }
                        while(aux_existence(notEndOfBlock));
                        
                        return arrB;
                    }
                    


                    //Note: addBlockFrame overwrite BlockCount (it starts to count from the beginning of the obj.frameArr)
                    //Question:
                    //  Why BlockCount can start from zero but SBlockFrame has to start from 1???
                    //  how is uniqueFrame() handling BlockCount vs SBlockCount???
                    //Concern:
                    //  BlockCount is sent to uniqueFrame as (zero) but it returns as one (1), which is a problem when sent for addSubBlockFrame
                    //  Note: (false statement){It seems that uniqueFrame only increase BlockCount when it is zero, but for BlockCount>0 it does not change}
                    function addBlockFrame(bfObj, arrData)
                    {
                        //let lenB = arrData.length;
                        let lenB = bfObj.body.objData.length;
                        let bfhtml = document.getElementById("propertyBodyFrame_" + bfObj.property + "_" + bfObj.id);
                        if(bfhtml){   bfhtml.innerHTML = ""; }
                        
                        
                            
                        for(let a=0; a<lenB; a++)
                        {
                            bfObj.body.objFrame =  bfObj.frame.returner(bfObj.body.objData[a]["_frameID"][0]);
                            bfObj = frame.edit.eAction.eBody.eProperty.uniqueFrame(bfObj, "body", (a+1)); 
                            
                            
                            
                            if(aux_existence(bfObj.body.subObjIndex))
                            {
                                for(let b=0, lenSB=bfObj.body.objData[a][bfObj.body.subObjIndex].length; b<(lenSB); b++)
                                {   
                                    bfObj.body.objFrame =  bfObj.frame.returner(bfObj.body.objData[a][bfObj.body.subObjIndex][b]["_frameID"][0]);
                                    bfObj = frame.edit.eAction.eBody.eProperty.uniqueFrame(bfObj, "body", (a+1), bfObj.body.subObjIndex, (b+1));   
                                } 
                            }
                        }
                        
                        //bfhtml.innerHTML = bfObj.body.returner;
                        bfhtml.innerHTML = frame.edit.eObjProto.bodyFramer(bfObj);
                    }



                    function addSubBlockFrame(bfObj, arrData, cntB, cntSBE)
                    {
                        let sbfhtml = document.getElementById("subBodyFrame_" + bfObj.property + "_" + bfObj.id + "_" + (cntB+1));
                        if(sbfhtml){   sbfhtml.innerHTML = ""; }
                        
                        bfObj.body.objFrame = bfObj.frame.returner(bfObj.body.objData[cntB][cntSBE][0]["_frameID"][0]);
                        for(let i=0, lenSB=bfObj.body.objData[cntB][cntSBE].length; i<(lenSB); i++)
                        {   
                            bfObj = frame.edit.eAction.eBody.eProperty.uniqueFrame(bfObj, "body", (cntB+1), cntSBE, (i+1));   
                        }  
                        
                        //sbfhtml.innerHTML = bfObj.body.returner;
                        sbfhtml.innerHTML = frame.edit.eObjProto.bodyFramer(bfObj);
                    }
                    

                    function clearDataFromBlockFrame(bfobj)
                    {
                        for(let x0=0, x1=bfobj.frameArr.length; x0<x1; x0++)                             //x0: counts Blocks         (cntB)
                        {
                            for(let y0=0, y1=bfobj.frameArr[x0].length; y0<y1; y0++)                     //y0: counts BlockElements  (cntBE)
                            {   
                                if(!Array.isArray(bfobj.frameArr[x0][y0]))                                
                                {   
                                    if(aux_existence(bfobj.frameArr[x0][y0]))
                                    {   document.getElementById("edit_" + bfobj.property + "_" + bfobj.id + "_" + (x0+1) + "_" + (y0)).value = "";   }
                                }
                                else
                                {
                                    for(let z0=0, z1=bfobj.frameArr[x0][y0].length; z0<z1; z0++)         //z0: counts sub-Blocks     (cntSB)
                                    {
                                        for(let r0=0, r1=bfobj.frameArr[x0][y0][z0].length; r0<r1; r0++)//r0: counts sub-Blocks     (cntSBE)
                                        {   document.getElementById("edit_" + bfobj.property + "_" + bfobj.id + "_" + (x0+1) + "_" + (y0) + "_" + (z0+1) + "_" + (r0)).value = ""; }    
                                    }                                                    
                                }
                            }
                        }    
                                        
                    }

                        
                                        
                    cntB    = (!isNaN(cntB))? parseInt(cntB): cntB;
                    cntSB   = (!isNaN(cntSB))? parseInt(cntSB): cntSB;
                    
                    bf_Obj.body.objData = runFrameBlock_2(`edit_${bf_Obj.property}_${bf_Obj.id}`);


                    if((aux_existence(cntSB))&&(!isNaN(cntSB))&&(parseInt(cntSB)!==0))
                    {   
                        cntSB = cntSB-1;
                        movingSub = true;
                    }
                    else
                    {   cntSB = 0; }

                    let moveReturner;
                    if(mover!=="Up")
                    {   moveReturner = this.Downer(property, id, (cntB-1), cntSB, cntBElem, bf_Obj.body.objData, movingSub); }
                    else
                    {   moveReturner = this.Upper(property, id, (cntB-1), cntSB, cntBElem, bf_Obj.body.objData, movingSub); }      
                    
                    bf_Obj.body.objData = moveReturner.returnObj;
                    
                        
                    if(moveReturner.status)
                    {
                        if(movingSub)
                        {   addSubBlockFrame(bf_Obj, bfArray, (cntB-1), cntBElem);  }
                        else
                        {   addBlockFrame(bf_Obj, bfArray);     }
                    }
                },

                Upper: function(title, id, moveB, moveSB, movePosition, arr, sbSettler)
                {   
                    let moveDone = false;
                    if(sbSettler)
                    {               
                        let moveArr = arr[parseInt(moveB)][movePosition];
                        if((moveArr.length-1)>parseInt(moveSB))
                        {
                            let buffer = moveArr[parseInt(moveSB)+1];
                            moveArr[parseInt(moveSB)+1] = moveArr[parseInt(moveSB)];
                            moveArr[parseInt(moveSB)] = buffer;
                            
                            moveDone = true;
                        }
                        else
                        {   alert("Cannot Move Higher"); }
                    }
                    else
                    {
                        if(parseInt(moveB)!==(arr.length)-1)
                        {
                            let buffer = arr[parseInt(moveB)];
                            arr[parseInt(moveB)] = arr[parseInt(moveB)+1];
                            arr[parseInt(moveB)+1] = buffer;
                            
                            moveDone = true;
                        }
                        else
                        {   alert("Cannot Move Higher"); }
                    }
                    
                    return {returnObj: arr, status: moveDone};
                },
                
                Downer: function(title, id, moveB, moveSB, movePosition, arr, sbSettler)
                {
                    let moveDone = false;
                    if(sbSettler)
                    {         
                        let moverArr = arr[parseInt(moveB)][movePosition];
                        if(parseInt(moveSB)>0)
                        {
                            let buffer = moverArr[parseInt(moveSB)-1];
                            moverArr[parseInt(moveSB)-1] = moverArr[parseInt(moveSB)];
                            moverArr[parseInt(moveSB)]   = buffer;
                            
                            moveDone = true;
                        }
                        else
                        {   alert("Cannot Move Lower"); }
                    }
                    else
                    {
                        if(parseInt(moveB)!==0)
                        {
                            let buffer = arr[parseInt(moveB)];
                            arr[parseInt(moveB)] = arr[parseInt(moveB)-1];
                            arr[parseInt(moveB)-1] = buffer;
                            
                            moveDone = true;
                        }
                        else
                        {   alert("Cannot Move Lower"); }
                    }
                    
                    return {returnObj: arr, status: moveDone};
                },
                
                returner: function(){}
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
        
   
        
        duplication:
        {
            display: function(property, id, data1)
            {
                let cnt = document.getElementById(property + "_" + id + "_message_counter").value;
                let Data1="<table style=\"width:100%;\" border=\"1\">";
                
                for(let i=0, len=data1.length; i<len; i++)
                {   Data1 = Data1 + "<tr><td>" + data1[i] + "</td></tr>";   }
                Data1 = Data1 + "<tr><td><i>Already Existing Property values</i></td></tr></table>";
            
            
                let value = "<div id=\"" + property + "_" + id + "_MessageBoard_" + cnt + "\">" +
                                "<input type=\"hidden\" id=\"" + property + "_" + id + "_" + cnt + "_dataString\" value=\"" + data1 + "\">" +
                                "<table style=\"width:100%;\">" +
                                    "<tr><td style=\"width:35%;\" rowspan=\"2\">CONFLICTING INFORMATION:</td>" +
                                        "<td><b>Change New Property value Name or</b>" +
                                            "<select id=\"" + property + "_" + id + "_MB_selection\" style=\"width:100%;\" onChange=\"frame.edit.duplication.selection('" + property + "','" + id + "','" + cnt + "')\">" + 
                                                "<option>choose one for both</option>" +
                                                "<option value=\"1\">New Property values</option>" +
                                                "<option value=\"2\">Already Existing Property values</option>" +                                    
                                            "</select><br><br></td></tr>" + 
                                    "<tr><td>" + Data1 + "</td></tr></table>" + 
                            "</div>";
                            
                cnt = parseInt(cnt) + 1;      

                document.getElementById(property + "_message_" + id).innerHTML = document.getElementById(property + "_message_" + id).innerHTML + value;                                
                document.getElementById(property + "_" + id + "_message_counter").value = cnt;     

                
                return cnt;
            }, 
        
        
            selection: function(property, id, mbCNT)
            {
                let optValue = document.getElementById(property + "_" + id + "_MB_selection").value;
                let dataArr = document.getElementById(property + "_" + id + "_" + mbCNT + "_dataString").value.split(",");
                
                
                function updatePropertyValue()
                {
                    let cnt_1 = document.getElementById(property + "_" + id + "_cnt_1").value;
                    
                    for(let i=1; i<cnt_1; i++)
                    {
                        if(document.getElementById("edit_" + property + "_" + id + "_" + i + "_1").value===dataArr[0])
                        {
                            for(let x=1, xLen=dataArr.length; x<xLen; x++)
                            {   document.getElementById("edit_" + property + "_" + id + "_" + i + "_" + (x+1)).value = dataArr[x];   }
                        }
                    }
                }
                
                
                function deletePropertyValue()
                {
                    let value = "";
                    let cnt = document.getElementById(property + "_" + id + "_message_counter").value;
                    
                    let cnt_1 = document.getElementById(property + "_" + id + "_cnt_1").value;
                    let newDataArr = [];
                    
                    for(let i=1; i<cnt_1; i++)
                    {
                        if(document.getElementById("edit_" + property + "_" + id + "_" + i + "_1").value===dataArr[0])
                        {
                            for(let x=1, xLen=(dataArr.length); x<xLen; x++)
                            {   newDataArr.push(document.getElementById("edit_" + property + "_" + id + "_" + i + "_" + x).value);   }
                            
                            let dimen = document.getElementById("dimension_" + property).value;
                            
                            dimen = dimen.replace(dataArr.join("*|x|*"), newDataArr.join("*|x|*"));
                            document.getElementById("dimension_" + property).value = dimen;
                            break;
                        }
                    }
                    
                    for(let i=0; i<cnt; i++)
                    {
                        let mb = document.getElementById(property + "_" + id + "_MessageBoard_" + i);
                        if(aux_existence(mb))
                        {
                            if(parseInt(mbCNT)!==i)
                            {   value = value + mb.innerHTML; }
                        }
                    }
                    
                    
                    //(document.getElementById(property + "_" + id + "_message_counter").value) needs to be reset
                    document.getElementById(property + "_message_" + id).innerHTML = "<input type=\"hidden\" id=\"" + property + "_" + id + "_message_counter\" value=\"" + (parseInt(mbCNT)-1) + "\">" + 
                                                                                    value;
                }
                
                
                
                if(optValue!=="1")              
                updatePropertyValue();          //use/keep the old value and update it to the contact block
                deletePropertyValue();          //clear the message board, save the values on the contact block to the dimension property
            },
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
        {   document.getElementById("actionBody_0").innerHTML = frame.edit.eAction.eBody.returner("newAction");  },
    },  


    Display:
    {
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
        Menu: function(data, datetime, customizeArr, fs)
        {         
            var bodyArray = ["","",false], processedIDs=[];
            let actionCounter = [[0,""],[0,""],[0,""],[0,""],[0,""],[0,""]];
            let list, menuIndexer = 2;
            let pHigh="", pMedium="", pLow="", menuPositioner = "";
            
            const menuControl_DOM = document.getElementById("menuControl");
            const {open:activeArr, close:closedArr, deleted:deleteArr, Red:redArr, Violet:vioArr, Yellow:yelArr, Green:greArr, White:whiArr, idList} = datetime;
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
            
        
        
         	function formatMenu(theData1, badgeCounter, i, order, menu, group, display)     
            {  
                let placer = " "; 
                let redPlacer="", vioPlacer="", yelPlacer="", grePlacer="", whiPlacer="";
                let rDisplacement = 4;   
                let msColor = "mbDefault_mode";
          
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
                    return  `<div class="menuButton ${msColor}" name="${group}" id="Menu_${i}" style="display:${display};" onclick="load_display_Body('Menu_${i}', '${group}')">
                                <span class="menuPositionTitle" id="menuPositionTitle_${i}">
                                    ${placer}
                                    <span class="menuArrow" id="menuArrow_${i}">\u25b6</span>
                                    <span class="menuFolder" id="menuFolder_${i}">&#128448;</span>
                                    <span class="menuTitle" id="menuTitle_${i}" >${aux_textSignIn((aux_existence(menu.title))? menu.title: i)}</span>
                                </span>
                                <span class="menuActionNotification">
                                    ${redPlacer}  
                                    ${vioPlacer} 
                                    ${yelPlacer} 
                                    ${grePlacer} 
                                    ${whiPlacer} 
                                </span>
                                </div>${theData1}</div>
                            </div>`; 
                }
                else
                {   return  `</div>${theData1}</div>`; }
            }
        
        
        
            function formatBody(theData, i, matchValue, order)
            {
                return `<div id="fromMenu_${i}" style="display: none;" class="fromMenu">
                            <input type="hidden" id="listMenu_${i}" value="${matchValue}">
                            <input type="hidden" id="orderMenu_${i}" value="${order}">
                            <div id="actionboard_FromMenu_${i}" class="aboardFromMenu"></div>
                        </div>${theData}`;
            }  



	        function formatMaster(dataArr, data3, indexer, group, display, order)
	        {
	            let cnt = 0;
                let match = [];
                //actionCounter = [[0,""],[0,""],[0,""],[0,""],[0,""],[0,""]];
               
	            if(aux_existence(data3))
                {
                    if(checkEmptyMenu(data3.ids.Global))
                    {
                        for(let c=0, cnt=data3.children.length; c<cnt; c++)
                        {   dataArr = formatMaster(dataArr, data3.children[c], indexer + "_3_" + c, "Menu_" + indexer, "none", (order+1));     }
                        
                        actionCounter = [[0,""],[0,""],[0,""],[0,""],[0,""],[0,""]];
                        
                        for(let ID of data3.ids.Local)
                        {
                            if(masterReferenceArr.includes(parseInt(ID)))
                            {
                                    match.push(parseInt(ID));
                                    dataArr[2]=true;                                
                            }
                        }

 
                        for(let ID of data3.ids.Global)        
                        {   //rowData is choosen because it represents all the values saved in the current level as well all the values in the lower levels
                            //while ID_currentLevel has only values for the current level and nothing from lower levels
                            
                            if(masterReferenceArr.includes(parseInt(ID)))
                            {
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
                    

                
                    if(dataArr[2])
                    {
                        if(menuPositioner!=="")
                        {   menuPositioner = menuPositioner + ",fromMenu_" + indexer;   }
                        else
                        {   menuPositioner = "fromMenu_" + indexer; }
                    }
                        
                        
                    dataArr[0] = formatBody(dataArr[0], indexer, match, order);     
                    dataArr[1] = formatMenu(dataArr[1], actionCounter, indexer,  order, data3, group, display);                           
                    dataArr[2] = dataArr[2];
                }
                
                
                return dataArr;
	        }
	        
          
	        
	        if(aux_existence(data))
	        {
    	        for(store of data)
        	    {
        	        bodyArray = formatMaster(bodyArray, store, menuIndexer, "Menu", "block", 0);
                    menuIndexer++;
                    bodyArray[2]=false;
    	        }
	        }
	        else
	        {   bodyArray = formatMaster(bodyArray, masterReferenceArr, "NoMenuActions", "NoMenuActions", "block", 0); }
	        


	        if(menuControl_DOM.value!=="")
	        {  
	            if(menuPositioner!=="")
	            {    menuControl_DOM.value = menuControl_DOM.value + "," + menuPositioner; }
	        }
	        else
	        {   menuControl_DOM.value = menuPositioner; }
	        
	        
	        
            return bodyArray;
        },

        StructuralReport: function(Obj, parentObj, referenceObj)
        {
            let data = function(index, data)
            {
                let d = {data: `<div id="Data_${index}">${data}</div>` };
                return d;
            }
            
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
            

            
            Obj.data = data(Obj.Index, Obj.data),
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


        Detail:
        {
            /*
            Last Update: June 22, 2021
            Last Update by: Anilson Cardoso
            called from: loadStore.js>>load_display_Body(){}
            Description:
        
            */
            Action: 
            {
                actionData: "",
                processor: function(action)
                { 
                    this.rowData        = (typeof action === "string")? JSON.parse(action): action;
                    this.colors         = DateTime.actionColorCode(this.rowData["Status"], this.rowData["DateTime"]);
                    this.pMatrix        = Priority.pMatrix(this.rowData["Priority"].split("*|3f4x|*"));
                    this.performance    = (function(data)
                                        {
                                                let arr = (aux_existence(data))? data.split("*|3f4x|*"): ["","","","", ""]; 
                                                
                                                return  [
                                                                (aux_existence(arr[0]))? (Number(arr[0])*0.333).toFixed(2): 0.00,
                                                                (aux_existence(arr[1]))? (Number(arr[1])*0.333).toFixed(2): 0.00,
                                                                (aux_existence(arr[2]))? (Number(arr[2])*0.333).toFixed(2): 0.00,
                                                                
                                                                (aux_existence(arr[3]))? (arr[3]): "",
                                                                
                                                                (aux_existence(arr[4]))? (Number(arr[4])).toFixed(2): 0.00
                                                            ]
                                            })(action["reportData"]);                            
                },
                
                displayActionHandler: function(actionID, someData, actionData)
                {
                    if(aux_existence(someData))
                    { 
                        actionID = someData;
                        actionData.id = someData;
                    }
                   // else
                    //{       }
                    
                    //this.actionData = actionData;
                    
                    let initiallized = document.getElementById("head_" + actionID);
                    let collapse = initiallized.getAttribute("data-collapseblock");
                    let arrData = [];
                    
                
                    
                    if(collapse!=="set")
                    {
                        initiallized.setAttribute("data-collapseblock","set");
                        //let actionData  = document.getElementById("rowData_" + actionID).value;
                        
                        let headBottom  = document.getElementById("headbottom_" + actionID);
                        let headGraph   = document.getElementById("headGraph_" + actionID); 
                        
                        if(document.getElementById("headsymbol_" + actionID).innerHTML === "\u25b7")
                        {   document.getElementById("headsymbol_" + actionID).innerHTML = "\u25bd"; }
                        else
                        {   document.getElementById("headsymbol_" + actionID).innerHTML = "\u25bc"; }
                    
                        //arrData = actionData.split("*|3f2x|*");
                        //let r   = (aux_existence(actionData["reportData"]))? actionData["reportData"].split("*|3f4x|*"): "";
                        //let r   = (aux_existence(actionData["reportData"]))? actionData["reportData"].split("*|3f4x|*"): "";
                        
                        
                        document.getElementById("body_" + actionID).innerHTML = frame.Display.Detail.Action.bodyReturner(actionID, actionData);
                        frame.Display.Detail.Action.footReturner(actionID, actionData);
                        
                
                
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
                
                bodyR: function(id, someData, actionData)
                {
                    //this.actionData(actionData);
                    
                    this.actionData = actionData;
                    let body ="";
                    let summaryMap = new Map();                     //countBlockFrames
                    let permission = actionData["AccessRef"];       //thisAction[3];
                    let status =    actionData["Status"];    //thisAction[8];
    
                    let framePropertyBody = function(id, cnt, framer, userdata, Header)
                    {
                        let objArr=[], returnerArr
                        
                        //let fr = framer.returner()
                        let fr      = framer.returner(true)
                            //frID    = fr.
                        let arr=userdata.split("*|3f3x|*");
                        let dr = null, aMapped = arr.map((v)=> [v]);
                        let obj = new objFrame(id, `${Header}_${id}`, "root");
//obj.data.head = getHead("10", Header);
//obj.data.head = getHead("10", "");                        
                        
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
                        

                        function getHead(headCode=5, data, status, o)
                        {
                            let arrHead, h0, h1;
                            if(aux_existence(o)){ h0=o.data.head[0]??=headCode; h1=o.data.head[1]??=""; }
                            
                            arrHead = [
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
                                    arrHead[1] = data;
                            }
                            
                            return arrHead;
                        }             
    
    
                        function getBody(obj, data, {label:ftitle, fixedDimension:fDimension, codeSelector:fcode, toBeReplaced:thisRef})
                        {
                            let newUserSubData = data;
                            let bData = "";
                            
                            function elementaryAssembler(a, b, c, d, data, id) 
                            {
                                let titleSpan="", bodySpan="";
                                if(aux_existence(data))
                                {
                                    switch(parseInt(b))
                                    {
                                        case 1: 
                                            titleSpan = "";                                         //description
                                            bodySpan = `<span class='apbElement_body ${d}'>${aux_textSignIn(data, 1)}</span>`;
                                            break;
                                            
                                        case 2: 
                                            titleSpan = `<span class='apbElement_title_2 ${c}'>${aux_textSignIn(a)}:</span>`;                                         
                                            bodySpan = `<span class='apbElement_body_2 ${d}'>${aux_textSignIn(data, 1)}</span>`;
                                            break;   
                                        case 3: 
                                            titleSpan = `<div class='apbElement_title_3 ${c}'>${aux_textSignIn(a)}:</div>`;
                                            bodySpan = `<div class='apbElement_body_3 ${d}'>${aux_textSignIn(data, 1)}</div>`;
                                            break;
                                        case 4: 
                                            titleSpan = "";                                         //textarea
                                            bodySpan = `<div class='apbElement_body ${d}'>${aux_textSignIn(data)}</div>`;
                                            break;
                                        case 5: 
                                            
                                            titleSpan = "";                                       //file linker
                                            bodySpan = "<div class=\"apbElement_body " + d + "\">" +
                                                            "<img id=\"attachments_" + id + "\" class=\"classicPic\" onclick=\"sendToModal('attachments_" + id + "','','')\" src=\"https://3focus.net/focus_Storage/" + sessionStorage.database + "/"  + data + "\">" + 
                                                        "</div>";
                                            break;
                                        case 6: 
                                            titleSpan =  `<div class='apbElement_title_6 ${c}'>${aux_textSignIn(a)}:</div>`;                                         //file linker
                                            bodySpan = "<span class=\"apbElement_body_6 " + d + "\"><a href=\"https://3focus.net/focus_Storage/" + sessionStorage.database + "/"  + data + "\">" + data + "</a></span>";
                                            break; 
                                        case 7: 
                                            titleSpan = "";                                         //disabled textarea
                                            bodySpan = `<div class='apbElement_body ${d}'>${aux_textSignIn(data)}</div>`;
                                            break;                                    
                                        default:
                                            titleSpan = `<span class='apbElement_title ${c}'>${aux_textSignIn(a)}:</span>`;
                                            bodySpan = `<span class='apbElement_body ${d}'>${aux_textSignIn(data, 0)}</span>`;
                                            break;
                                    }
                                }
                            
                                
                                return `<div class='aProperty_Body '>${titleSpan}${bodySpan}</div>`;
                            };
                        
                        
                            
                            if((aux_existence(fDimension)&&(!isNaN(data))))
                            {
                                if(Header==="Contacts")
                                {   
                                    newUserSubData = (function(a, b)
                                    {
                                        let value = "";
                                        if(Array.isArray(a)){   a.forEach(function([v, d]){   if(d===b){value=v;}    })  }
                                        
                                        return value;
                                    })(fDimension, data);
                                }
                                else
                                {   if(aux_existence(fDimension[data])){ newUserSubData = fDimension[data][0];   } }                               
                            }
                            
                            
                            if(parseInt(data)!==0)
                            {   bData += elementaryAssembler(ftitle, fcode, "", "", newUserSubData, obj.Index);   }  
                            
                            
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
                            function noSubBlockFound(objA, objB, r, e)
                            {
                                let noStatusChange = true;
                                for(let cntBE=e, len=eframe.length; cntBE<(len+1); cntBE++)
                                {
                                    if(aux_existence(objB.data[r][e]))
                                    {
                                        if((objB.data[r][e].includes("*|3f6x|*"))&&(noStatusChange))
                                        {
                                            noStatusChange = false;
                                            let newArrObj = [], newArrData=[];
                                            let newValueData = objB.data[r][cntBE].split("*|3f5x|*");
                                            for(let b0=newValueData.length, cntSB=0; cntSB<b0; cntSB++)
                                            {   
                                                if(aux_existence(newValueData[cntSB]))
                                                {   
                                                    let o = new objFrame(objB.ID, `${objB.Index}_${cntBE+1}_${(cntSB+1)}`, objB.Frame, objB.Index);
                                                    let odata = objB.data[r][cntBE].split("*|3f6x|*");
                                                    
                                                    o.data.push(odata);
                                                    newArrObj.push(getObjReturner(objA, o, r, cntBE));
                                                }
                                            }
                                            
                                            objB.Children.push(...newArrObj);       
                                        }
                                    }
                                }
                                
                                return noStatusChange;
                            }
                            
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
                            
                            function reAttributeOptions(fr, head)
                            {    
                                let thisFuncReturn="";
                                
                                fr.forEach(function([value, index], key)
                                {   if(index===head){   thisFuncReturn = value;  }});
                                
                                return thisFuncReturn;   
                            }


                            
                            for(let e=Elem, eL=frame.length; e<eL; e++)
                            {
                                const {wait=false, bodyWrapperHead, codeSelector, changeDepth, sameValueAs, attribute} = frame[e];
                                
                                if(!wait)
                                {
                                    if(bodyWrapperHead)
                                    {
                                        
                                        let headName = (aux_existence(attribute))? aux_existence((attribute.options))? reAttributeOptions(attribute.options, propertyArr[e+1]): propertyArr[e+1]: propertyArr[e+1];
                                         
                                        
                                        let o = new objFrame(parentO.ID, `${parentO.Index}_${parentO.Children.length+1}`, parentO.Index);
                                            o.data.head = getHead(codeSelector, headName, affectedByClosedStatus=false, o);
                                            
                                        if(aux_existence(o.data.head[1]))
                                        {
                                            let oChecker = findHeader(parentO, o);
                                            if(aux_existence(changeDepth))
                                            {
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
                                    }
                                    else
                                    {   
                                        if(aux_existence(sameValueAs))
                                        {
                                            if((aux_existence(propertyArr[sameValueAs+1]))&&(parseInt(propertyArr[sameValueAs+1])!==0))
                                            {   parentO.data.body.push(getBody(parentO, propertyArr[sameValueAs+1], frame[sameValueAs]));    }   
                                        }
                                        else
                                        {
                                            if((aux_existence(propertyArr[e+1]))&&(parseInt(propertyArr[e+1])!==0))
                                            {   parentO.data.body.push(getBody(parentO, propertyArr[e+1], frame[e]));    }
                                        }
                                    }
                                }
                            } 
                        }
                        
                        
                        function printObj(obj)
                        {
                            let returner = (aux_existence(obj.data.body))? 
                                            ((ar)=>{let b=""; ar.forEach((d)=>{b+=aux_existence(d)?d:""}); return b;})(obj.data.body): 
                                            "";
                                            
                            if((aux_existence(obj.data.head))&&(aux_existence(returner)))
                            {
                                    returner = collapseBlock("",                           //data
                                                                      obj.data.head,            //header
                                                                      [returner],             //body
                                                                      obj.data.foot,            //footer
                                                                      [obj.Index+"_rootID", "", ""],      //index
                                                                      ["openDisplay ",[["noclass topheader","noclass","spaceWhiteBreak"],["noclass","noclass","noclass"]], "openDisplay apeWrapper_body", "openDisplay"]);  
                                
                            }
                            else
                            {
                                obj.Children.forEach(function(o, okey)
                                {   
                                    let returnHead="", returnBody="", returnFoot="";
                                    let {head, body, foot} = o.data;
                                    
                                    returnHead = head;                               
                                    returnBody = (aux_existence(body))? ((ar)=>{let b=""; ar.forEach((d)=>{b+=aux_existence(d)?d:""}); return b;})(body):"";
                                    
                                                                    if(aux_existence(o.Children))
                                    {     returnBody = returnBody + printObj(o); }
                                    
                                    
                                    if(aux_existence(returnHead))
                                    {
                                        returner += collapseBlock("",                           //data
                                                                          returnHead,            //header
                                                                          [returnBody],             //body
                                                                          returnFoot,            //footer
                                                                          [o.Index, "", ""],      //index
                                                                          ["openDisplay ",[["noclass topheader","noclass","spaceWhiteBreak"],["noclass","noclass","noclass"]], "openDisplay apeWrapper_body", "openDisplay"]);  
                                    }
                                })
                            }
                            

                            
                            return returner;
                        }
                        
                            
                            
                        if(aux_existence(fr.idOverRide))
                        {   fr=framer.returner(false, fr.idOverRide); }
                        
                        
                        if(aux_existence(fr.dMode))
                        {
                            for(let cntB=0, cnt=arr.length; cntB<cnt; cntB++)
                            {   
                                let propertyDataArr = arr[cntB].split("*|3f4x|*");
                                if(parseInt(fr.id)!==parseInt(propertyDataArr[0])){ fr = framer.returner(false, propertyDataArr[0]); }
                                
                                
                                if(aux_existence(fr.embedData))
                                {   fr.embedData(propertyDataArr, obj); }
                                else
                                {   getObjReturner(obj, propertyDataArr, fr.eframe, 0); }
                            }
                            
                            return printObj(obj);
                        }
                        
                        
                       
                        return;
                    };
            
              
                    for(let a1=3, a2=apps.properties, a3=a2.length; a1<a3; a1++)
                    {
                        if((a2[a1]!=="Reference")&&(a2[a1]!=="Status"))
                        {
                            body += ((id, property, userdata, frame, cnt, permission)=>
                                    {
                                        let bpreturner="";
                                        
                                        if(aux_existence(userdata))
                                        {   
                                            let fbreturner = framePropertyBody(id, cnt, frame, userdata, property);
                                            
                                            if((fbreturner)||(property==="Links"))                            
                                            {
                                                let pSize="";
                                                if((property!=="Description")&&(property!=="Priority"))
                                                {   pSize = "<span> (" + summaryMap.size  + ")</span>"; }

                                                bpreturner = collapseBlock("",                                                                      //data
                                                                           [(parseInt(status)!==1)? 3: (parseInt(permission[(cnt+7)])!==1)? 4: 3, property, "", "", "", ""],                                      //header
                                                                           [fbreturner],                                                            //body
                                                                           [""],                                                                    //footer
                                                                           [property + "_" + id, "", ""],                                           //indexer
                                                                           ["openDisplay dProperty",[["dProperty_Head","noclass","noclass"],["noclass","noclass","noclass"]],"openDisplay dProperty_Body","openDisplay dProperty_Foot"]);
                                            }
                                        }
                                        
                                        return bpreturner;
                                        
                                    })(id, a2[a1], actionData[a2[a1]], eval(a2[a1]).frame, a1, permission);
                        }
                    }
                    
                     document.getElementById("body_" + actionID).innerHTML = body;                    
                },
                
                //bodyReturner: function(thisAction, id)
                bodyReturner: function(id, actionData)
                {
/*                    
                    let NoDoc="", NoExtraID="";
                    loadDataFromStore("Actions", parseInt(id[0]), NoDoc, frame.Display.Detail.Action.bodyR, NoExtraID);
*/

//this.actionData(actionData);
//this.actionData = actionData;

                    let body ="";
                    let summaryMap  = new Map();                    //countBlockFrames
                    let permission  = actionData["AccessRef"];      //thisAction[3];
                    let status      = actionData["Status"];      //thisAction[8];
    
                    let framePropertyBody = function(id, cnt, framer, userdata, Header)
                    {
                        let objArr=[], returnerArr
                        let arr = userdata;
                        let dr  = null, aMapped = arr.map((v)=> [v]);
                        let obj = new objFrame(id, `${Header}_${id}`, "root");
                        
                        
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
                                    arrHead[1] = data;
                            }
                            
                            return arrHead;
                        }   
    
    
                        function getBody(obj, data, {label:ftitle, codeSelector:fcode, toBeReplaced:thisRef, attribute})
                        {
                            let newUserSubData = data;
                            let bData = "";
                            
                            function elementaryAssembler(a, b, c, d, data, id) 
                            {
                                let titleSpan="", bodySpan="";
                                if(aux_existence(data))
                                {
                                    if((!aux_existence(c))&&(!aux_existence(a))){   b=7; }
                                    
                                    switch(parseInt(b))
                                    {
                                        case 1: 
                                            titleSpan = "";                                         //description
                                            bodySpan = `<span class='apbElement_body ${d}'>${aux_textSignIn(data, 1)}</span>`;
                                            break;
                                            
                                        case 2: 
                                            titleSpan = `<span class='apbElement_title_2 ${c}'>${aux_textSignIn(a)}:</span>`;                                         
                                            bodySpan = `<span class='apbElement_body_2 ${d}'>${aux_textSignIn(data, 1)}</span>`;
                                            break; 
                                            
                                        case 3: 
                                            titleSpan = `<div class='apbElement_title_3 ${c}'>${aux_textSignIn(a)}:</div>`;
                                            bodySpan = `<div class='apbElement_body_3 ${d}'>${aux_textSignIn(data, 1)}</div>`;
                                            break;
                                        case 4: 
                                            titleSpan = "";                                         //textarea
                                            bodySpan = `<div class='apbElement_body ${d}'>${aux_textSignIn(data)}</div>`;
                                            break;
                                            
                                        case 5: 
                                            titleSpan = "";                                       //file linker
                                            bodySpan = "<div class=\"apbElement_body " + d + "\">" +
                                                            "<img id=\"attachments_" + id + "\" class=\"classicPic\" onclick=\"sendToModal('attachments_" + id + "','','')\" src=\"https://3focus.net/focus_Storage/" + sessionStorage.database + "/"  + data + "\">" + 
                                                        "</div>";
                                            break;
                                            
                                        case 6: 
                                            titleSpan =  `<div class='apbElement_title_6 ${c}'>${aux_textSignIn(a)}:</div>`;                                         //file linker
                                            bodySpan = "<span class=\"apbElement_body_6 " + d + "\"><a href=\"https://3focus.net/focus_Storage/" + sessionStorage.database + "/"  + data + "\">" + data + "</a></span>";
                                            break; 
                                            
                                        case 7: 
                                            titleSpan = "";                                         //disabled textarea
                                            bodySpan = `<div class='apbElement_body ${d}'>${aux_textSignIn(data)}</div>`;
                                            break;   

                                        case 8: 
                                            titleSpan = "";                                         //Links
                                            bodySpan = `<div id='${id}' class='apbElement_body ${d}'></div>`;
                                            break;   
                                            
                                        default:
                                            titleSpan = `<span class='apbElement_title ${c}'>${aux_textSignIn(a)}:</span>`;
                                            bodySpan = `<span class='apbElement_body ${d}'>${aux_textSignIn(data, 0)}</span>`;
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
                            {   bData += elementaryAssembler(ftitle, fcode, "", "", newUserSubData, obj.Index);   }  
                            
                            
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
                                        child.data.head[1][0]===currentObj.data.head[1][0]&&
                                        child.data.head[2]===currentObj.data.head[2]
                                      )
                                    {   return child; }
                                }
                            
                                return;   
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
                                const {label, labelID, noJump=true, linker=false, bodyWrapperHead, codeSelector, changeDepth, sameValueAs, attribute=""} = frame[e];
                                
                                //Links are set with wait=true
                                if(noJump)
                                {
                                    let data = (!aux_existence(propertyArr[label]))? (!aux_existence(propertyArr[labelID]))? "": propertyArr[labelID]: propertyArr[label];
                                    if(bodyWrapperHead)
                                    {
                                        if(aux_existence(data))
                                        {   
                                            let headName = (aux_existence(attribute))? aux_existence((attribute.options))? reAttributeOptions(attribute.options, data): data: data; 
                                            let o = new objFrame(parentO.ID, `${parentO.Index}_${parentO.Children.length+1}`, parentO.Index);
                                                o.data.head = getHead(codeSelector, headName, affectedByClosedStatus=false, o);
                                                
                                            if(aux_existence(o.data.head[1]))
                                            {
                                                let oChecker = findHeader(parentO, o);
                                                if(aux_existence(changeDepth))
                                                {
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
                                        let notCheckedYet = true;
                                        if((aux_existence(attribute))&&(notCheckedYet))
                                        {
                                            if(aux_existence(attribute.subframeblockelem))
                                            {
                                                if(aux_existence(data))
                                                {   
                                                    let headName = labelID;
                                                    let cnt=0;
                                                    for(let a0=0, a1=data.length; a0<a1; a0++)
                                                    {   
                                                        cnt++;
                                                        let o = new objFrame(parentO.ID, `${parentO.Index}_${parentO.Children.length+cnt}`, parentO.Index);
                                                            o.data.head = getHead(3, headName, "", o);
                                                            
                                                            getObjReturner(o, data[a0], eval(Header).frame.returner(data[a0]["_frameID"][0]).eframe, 0);
                                                            
                                                            parentO.Children.push(o);
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
                                        
                                        if((linker)&&(notCheckedYet))
                                        {   
                                            //parentO.data.body.push(getBody(parentO, "Links", {codeSelector:8}));
                                            loadEmbededObj(propertyArr, parentO); 
                                            notCheckedYet = false;
                                        }
                                        
                                        if(notCheckedYet)
                                        {
                                            if((aux_existence(data))&&(parseInt(data)!==0))
                                            {   parentO.data.body.push(getBody(parentO, data, frame[e]));    }
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
                            
/*                            
                            if(obj.Parent!=="root")
                            {
                                if(aux_existence(obj.Children))
                                {
                                    obj.Children.forEach(function(o, okey)
                                    {  returner += processBlock(o); });                                
                                }
                                else
                                {     
                                    returner += processBlock(obj);                                 
                                }
                            }
                            
                            return returner;
*/                            
                            
                                            
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
                                        
                                        if(aux_existence(head))
                                        {                              
                                            returnBody = (aux_existence(body))? ((ar)=>{let b=""; ar.forEach((d)=>{b+=aux_existence(d)?d:""}); return b;})(body):"";
                                            
                                            if(aux_existence(o.Children))
                                            {     returnBody = returnBody + printObj(o); }
                                            
                                            returner += collapseBlock("",                           //data
                                                                      head,            //header
                                                                      [returnBody],         //body
                                                                      foot,            //footer
                                                                      [o.Index, "", ""],      //index
                                                                      ["openDisplay ",[["noclass topheader","noclass","spaceWhiteBreak"],["noclass","noclass","noclass"]], "openDisplay apeWrapper_body", "openDisplay"]);  
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
                                            returner += collapseBlock("",                           //data
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
                                                returner += collapseBlock("",                           //data
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
                            
                            if(aux_existence(fr.dMode))
                            {
                                getObjReturner(obj, propertyDataObj, fr.eframe, 0);
                                dModeConfirmed = true;
                            }
                        }
                            
                        return (aux_existence(dModeConfirmed))? printObj(obj): "";
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
                                            
                                            if((fbreturner)||(property==="Links"))                            
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
                                        
                                            return bpreturner;
                                            
                                        })(id, a2[a1], actionData[a2[a1]], eval(a2[a1]).frame, a1, permission);
                            }
                        }
                    }
                    
                     //document.getElementById("body_" + id).innerHTML = body; 
                    return body;
                },
                
                
                footReturner: function(id, actionData, noButtons)   
                {
                    let close="",clone="",objButton="";
                    let thisActionColors = DateTime.actionColorCode(actionData["Status"], actionData["DateTime"]);
                    let onclickFunc =   
                    [
                        ["_Button", ["frame.edit.eAction.placer", [id]], "Edit"],
                        ["_Button", ["frame.edit.eAction.placer", [id, true]], "Clone"]
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
                        
                        objButton = (aux_existence(noButtons))? "": "<div class=\"_Button\" onclick=\"frame.edit.eAction.placer('" + id + "')\">Edit</div>" +
                                    "<div class=\"_Button\" onclick=\"frame.edit.eAction.placer('" + id + "','true')\">Clone</div>";
                    }
                        
                        
                    let dtfoot = (function([{_creation, Start, End, _actualend, _grace}], cc)
                    {
                        let [cdt]=_creation, [sdt]=Start, [edt]=End, [aedt]=(aux_existence(_actualend))? _actualend: End, [gdt]=_grace;
                        
/*
 dtArr = [frame, creationDateTime_millisecond, startActionDateTime_millisecond, endActionDateTime_millisecond, ActualEndDateTime_millisecond, graceDateTime_millisecond];
*/
                        let footdatetime  = "";
                        let initializeDateTime = ["Starting", "Due", "Closed"];
                        let {cReference, cName} = cc;
    
    
                        if(parseInt(cReference)===5)
                        {   
                            footdatetime =  "<div><span class=\"aFoot_hElement_Body1\" >" + DateTime.aux_ParseTo.extendDateTime(sdt) + "</span></div>" +
                                            "<div><span class=\"aFoot_hElement_Body1\" >" + DateTime.aux_ParseTo.extendDateTime(Number(edt)) + "</span></div>" + 
                                            "<div><span class=\"aFoot_hElement_Body0\" style=\"color:" + cc.cCode + "\">" + DateTime.aux_ParseTo.extendDateTime(aedt) + "</span></div>";
                        }
                        
                        
                        if(parseInt(cReference)===1)
                        {   
                            footdatetime =  "<div><span class=\"aFoot_hElement_Body1\" >" + DateTime.aux_ParseTo.extendDateTime(sdt) + "</span></div>" +
                                            "<div><span  class=\"aFoot_hElement_Body0\"  style=\"color:" + cc.cCode + "\">" + DateTime.aux_ParseTo.extendDateTime(edt) + "</span></div>"; 
                        }
                        
                        
                        if((parseInt(cReference)!==5)&&(parseInt(cReference)!==1))
                        {   
                            footdatetime =  "<div><span class=\"aFoot_hElement_Body1\" >" + DateTime.aux_ParseTo.extendDateTime(sdt) + "</span></div>" +
                                            "<div><span  class=\"aFoot_hElement_Body0\"  style=\"color:" + cc.cCode + "\">" + DateTime.aux_ParseTo.extendDateTime(edt) + "</span></div>"; 
                        }
                        
                        return footdatetime;
                    })(actionData["DateTime"], thisActionColors);
                    
                    let performance = frame.Display.Detail.objectificator.actionObject.object_performance(actionData);
                    let ppercentage = (((Number(performance.kpo) + Number(performance.kpe))/2) * 100);
     
                    let buttons = isNaN(id)? "": "<div id=\"foot_aof_" + id + "\" class=\"aFoot_Foot\" >" + objButton + "</div>";
                                         
                                         
                                         
                    let data_v1 =  "<div id=\"aof_performance_kpo_" + id + "\" class=\"aFoot_performance\" >" +  
                                    "<span id=\"aof_pkpo_Head_" + id + "\" class=\"aFoot_pHead\">Objectives Performance:</span>" +
                                    "<span id=\"aof_pkpo_Body_" + id + "\" class=\"aFoot_pBody\">" + Number(performance.kpo).toFixed(2) + "%</span>" +                        
                                "</div>" +
                                "<div id=\"aof_performance_kpe_" + id + "\" class=\"aFoot_performance\" >" +  
                                    "<span id=\"aof_pkpe_Head_" + id + "\" class=\"aFoot_pHead\">Execution Performance</span>" +
                                    "<span id=\"aof_pkpe_Body_" + id + "\" class=\"aFoot_pBody\">" + Number(performance.kpe).toFixed(2) + "%</span>" +                        
                                "</div>" +
                                "<div id=\"aof_performance_points_" + id + "\" class=\"aFoot_performance\" >" +  
                                    "<span id=\"aof_pp_Head_" + id + "\" class=\"aFoot_pHead\">3Focus Performance (3FP):</span>" +
                                    "<span id=\"aof_pp_Body_" + id + "\" class=\"aFoot_pBody\"><strong>" + parseInt(performance.points) + "%</strong></span>" +    
                                "</div>";
                                                      


                    let data_v2 =   "<div id=\"footGraph_" + id + "\"  class=\"footGraph\" style=\"left:0; position:relative; cursor:pointer;\" onclick=\"actionFooterGrahpHandler('" + id + "')\">" + createCircularGraph("kp_" + id, thisActionColors.cFrame) + "</div>" +
                                    "<div id=\"performanceDetail_" + id + "\" class=\"performanceDetail\"></div>";
    
                                    
                                
                    let returner =  "<div class=\"Footer\">" +
                                        "<div id=\"FootBody_" + id + "\" class=\"FootBody\" >" + data_v2 + "</div>" +
                                        "<div id=\"FootHeader_" + id + "\" class=\"FootHeader\" >" + dtfoot + "</div>" +
                                    "</div>";
                             
                    document.getElementById("foot_" + id).innerHTML = returner;
                    
/*                    
                    setCircleAttribute(`Circle_kpo_${id}`, 0, 50, 50, "0 0 50 50", 20, Number(performance.points).toFixed(2), (Number(performance.kpo)*100).toFixed(2), thisActionColors.cFrame, true); 
                    document.getElementById("textCircle_kpo_" + id).style.setProperty("fill", thisActionColors.cFrame);
                    
                    setCircleAttribute(`Circle_kpe_${id}`, 0, 50, 50, "0 0 50 50", 20, Number(performance[2]).toFixed(2), thisActionColors.cFrame, true); 
                    document.getElementById("textCircle_kpe_" + id).style.setProperty("fill", thisActionColors.cFrame);
*/                    
                    //setCircleAttribute(`Circle_kp_${id}`, 0, 50, 50, "0 0 50 50", 20, Number(performance.points).toFixed(2), ppercentage, thisActionColors.cFrame, true); 
                    setCircleAttribute(`Circle_kp_${id}`, 0, 50, 50, "0 0 50 50", 20, Number(performance.points), ppercentage, thisActionColors.cFrame, true); 
                    document.getElementById("textCircle_kp_" + id).style.setProperty("fill", thisActionColors.cFrame);
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
                Placer: function(dataLoader, menuIndexer, actionID, Placer, opencloseStatus, initializer, localIndex, actionIndex)
                {   
                    let source, linkerButtons=false; 
                    let colorObj    = DateTime.actionColorCode(dataLoader["Status"], dataLoader["DateTime"]);
                        dataLoader.reportData  = frame.Display.Detail.objectificator.actionObject.object_performance(dataLoader);
                    
                    let actionData  = frame.Display.Detail.objectificator.actionObject.object_returner(actionID, dataLoader, colorObj, (aux_existence(localIndex))? false: true);

let p = ((dataLoader.reportData.kpo + dataLoader.reportData.kpe)/2);
    p = (p * 100);
console.log(`Action: ${p}% (${dataLoader.reportData.points} points)`, `Maximum: 100% (${(dataLoader.reportData.points * 100)/p})`);

                    if(aux_existence(localIndex))
                    {   
                        dataLoader.id   = actionID;
                        linkerButtons   = true;
                        
                        /*  
                            This block is called for a linked action    
                            It creates the action header but lacks extra data
                            
                            Concern: 
                            It needs improvement
                        */
                        document.getElementById("body_" + localIndex).innerHTML +=   actionData;    
                    }
                    else
                    {   
                        /*  This block is called for normal/regular actions inside a menu   */
                        document.getElementById("actionboard_FromMenu_" + menuIndexer).innerHTML += actionData;  
                    } 
                    
                    
                    
                    setCircleAttribute(`Circle_${actionID}`, 0, 50, 50, "0 0 50 50", 20, dataLoader["reportData"]["points"], p, colorObj.cFrame); 
                    //document.getElementById(actionID).style.setProperty("border-color", colorObj.cFrame); 
                    //document.getElementById("textCircle_" + actionID).style.setProperty("fill", "75");
                    
                    
                    if(parseInt(dataLoader.Status)!==1)
                    {   document.getElementById(actionID).style.setProperty("border-color", colorObj.cFrame); }
                    else
                    {   document.getElementById(actionID).style.setProperty("border-width", "8px"); }                  
                },
            },


            report:
            {
            //Data will be added by loadStore.js >> load_display_Menu(){ populateMenuBody(){ selectionRequest.onsuccess(){ if(repoExist){CALL THIS FUNCTION}}} }
            reportPage: function(totalCounter=0, fs) 
            {  
                    let cancelButton = (fs)? "<div><input type=\"button\" class=\"_Button extendedButton\" value=\"Cancel Previews (Filter / Search)\" onclick=\"loadData()\"></div>": "";  
                    let returnerFrame = "<div>" +  
/*
                                            "<input type=\"hidden\" id=\"Filter_PO\" value=\"\" data-filter=\"PO\">" +     
                                            "<input type=\"hidden\" id=\"Selection_PO\" value=\"\">" +  
                                            "<span  class=\"auxboardElementHead\">Objectives pre-Filter:</span>" +     
                                            "<span id=\"counter_PO\" class=\"auxboardElementBody tail\"></span>" +     
                                        "</div>" +           
                                        "<div>" +   
                                            "<input type=\"hidden\" id=\"Filter_PI\" value=\"\" data-filter=\"PI\">" +   
                                            "<input type=\"hidden\" id=\"Selection_PI\" value=\"\">" +  
                                            "<span  class=\"auxboardElementHead\">Indicators pre-Filter:</span>" +   
                                            "<span id=\"counter_PI\" class=\"auxboardElementBody tail\"></span>" +   
                                        "</div>" +   
                                        "<div>" +   
                                            "<input type=\"hidden\" id=\"Filter_PE\" value=\"\" data-filter=\"PE\">" +  
                                            "<input type=\"hidden\" id=\"Selection_PE\" value=\"\">" +  
                                            "<span  class=\"auxboardElementHead\">Execution pre-Filter:</span>" +   
                                            "<span id=\"counter_PE\" class=\"auxboardElementBody tail\"></span>" +   
                                        "</div>" +   
                                        "<div>" +   
                                            "<input type=\"hidden\" id=\"Filter_PB\" value=\"\" data-filter=\"PB\">" +   
                                            "<input type=\"hidden\" id=\"Selection_PB\" value=\"\">" +  
                                            "<span  class=\"auxboardElementHead\">Bonus pre-Filter:</span>" +   
                                            "<span id=\"counter_PB\" class=\"auxboardElementBody tail\"></span>" +   
                                        "</div><br>" +  
*/          
         
         
                                        "<div>" +   
                                            "<input type=\"hidden\" id=\"_Filter\" value=\"\">" +   
                                            "<span  class=\"auxboardElementHead\">Total Actions:</span>" + 
                                            "<span  class=\"auxboardElementBody\">" + totalCounter + "</span>" +
                                            "<span id=\"_counterFilter\" class=\"auxboardElementBody tail\"></span>" +   
                                        "</div><br>" +  
         

/*
                                        "<div class=\"eProperty-1\">" +   
                                            "<label  class=\"eProperty-11\" for=\"sdtSearcher\">Status:</label>" +    
                                            "<select  class=\"eProperty-12\" id=\"reportStatus\">" + 
                                                "<option value=\"2\">All Actions</option>" +
                                                "<option value=\"1\">Closed Actions</option>" +
                                                "<option value=\"0\">Open Actions</option>" +
                                            "</select>" +                        
                                        "</div><br>" +           
*/         
         
                                        "<div>" +   
                                            "<div for=\"sdtSearcher\">DateTime:</div>" +  
                                            "<div class=\"eProperty-1\" style=\"padding-bottom:5px\">" +   
                                                "<label   class=\"eProperty-11\" for=\"reportSettingsDT\">Settings:</label>" +   
                                                "<select   class=\"eProperty-12\" id=\"reportSettingsDT\">" + 
                                                    "<option value=\"start\">Action Start</option>" +
                                                    "<option value=\"end\">Action End</option>" +
                                                    "<option value=\"startend\">Action Start-End</option>" +
                                                "</select>" + 
                                            "</div>" +                                            
                                            "<div class=\"eProperty-1\" style=\"padding-bottom:5px\">" +   
                                                "<label   class=\"eProperty-11\" for=\"fromdtSearcher\">From:</label>" +   
                                                "<input   class=\"eProperty-12\" type=\"datetime-local\" id=\"fromdtSearcher\"  value=\"" + DateTime.aux_ParseTo.extendDateTime_local(0) + "\">" +   
                                            "</div>" +
                                            "<div class=\"eProperty-1\" style=\"padding-bottom:5px\">" +   
                                                "<label   class=\"eProperty-11\" for=\"todtSearcher\">To:</label>" +   
                                                "<input   class=\"eProperty-12\" type=\"datetime-local\" id=\"todtSearcher\"  value=\"" + DateTime.aux_ParseTo.extendDateTime_local(DateTime.aux_ParseTo.numericDateTime()) + "\">" +   
                                            "</div><br>" +                                            
                                        "</div>" +         

                 
                                                    
                                        "<div>" +   
                                            "<label for=\"edtSearcher\">Filter by:</label>" +   
                                            
                                            "<select id=\"menuFilterSettler\" class=\"eProperty-13\">" + 
                                                (function(properties)
                                                {
                                                    let returner = "<option value=\"\">Select</option>";
                                                    
                                                    properties.forEach(function(data, index)
                                                    {
                                                        let mSelect = (data==="Category")? "selected": ""
                                                        if((parseInt(index)!==0)&&(parseInt(index)!==2)){   returner += "<option value=\"" + data + "\" " + mSelect + ">" + data + "</option>";     }
                                                    });
                                                    
                                                    return returner;
                                                })(apps.properties) + 
                                            "</select>" +
                                            
                                        "</div><br>" +
                                                    
                                                    
                                        "<div>" +   
                                            "<label for=\"search\">Search for:</label>" +   
                                            "<input type=\"text\" id=\"wordSearcher\" class=\"eProperty-13\" value=\"\">" +   
                                        "</div><br>" + 
                                  
        
                                        "<div><input type=\"button\" class=\"_Button extendedButton\" value=\"Filter / Search\" onclick=\"loadFilterSearch()\"></div>" + 
                                        cancelButton;
                                               
                                        return collapseBlock("", [2,"Filter / Search", "", "", "", "topic_1"], [returnerFrame], [""], ["topic_1","",""], ["openDisplay",[["noclass","noclass","noclass"],["noclass","noclass","noclass"]],"openDisplay auxTopic","openDisplay"]);
            },
            
            returner: function(totalCounter=0, filtersearch=false)
            {
                document.getElementById("reportboard_FromMenu_report").innerHTML = this.reportPage(totalCounter, filtersearch);
            }
},


            objectificator: 
            {
                menuObject: {},
                
                
                reportObject: 
                {
                    object_rReturner: function(id, arrids)
                    {
                        return  "<div id=\"rObject_" + id + "\" class=\"objectification\">" +
                                    "<div id=\"data_" + id + "\">" +
                                        "<input type=\"hidden\" id=\"IDlist_" + id + "\" value=\"" + arrids + "\">" +
                                        "<input type=\"hidden\" id=\"rod_opencloseObjStatus_" + id + "\" value=\"\">" +
                                    "</div>" +
                                    "<div id=\"head_" + id + "\" class=\"dHead\" onclick=\"aux_colapseDivItem('" + id + "')\"></div>" +
                                    "<div id=\"body_" + id + "\" class=\"dBody\"></div>" +
                                    "<div id=\"foot_" + id + "\" class=\"dFoot\"></div>" +
                                "</div>";  
                    },


                    
                    
                    object_rHeadFrame: function(action, cnt, openStatus)
                    {
                        let arrowRotation=""; 
                        let placer = (function(a){
                                                    let pos="";
                                                    for(let i=0; i<a; i++){ pos = pos + "<span class=\"Positioner\" ></span> ";}
                                                    return pos;
                                                })(parseInt(cnt));
                                                
                        let dt              = this._DateTime(action.adatetime)
                        let cssColor        = this._Color(dt, action.astatus);
                        
                        let title =  action.atitle.includes("*|3f4x|*")? action.atitle.split("*|3f4x|*")[1]: action.atitle;
                        
                        if(aux_existence(openStatus))
                        {   arrowRotation   = "openArrow"; }
                        else
                        {   displayDateTime = DateTime.aux_ParseTo.extendDateTime(dt[3]); }
                        
                        return      "<span id=\"positioner_" + id + "_roh_Header\" class=\"dHead_positioner " + cssColor[0] + "\">" + placer + "</span>" +
                                    "<span id=\"arrow_" + id + "_roh_Header\" class=\"dHead_arrow " + arrowRotation + "\">\u25b6</span>" +
                                    "<span id=\"title_" + id + "_roh_Header\" class=\"dHead_title\">" + title + "</span>";
                    },
     
                    
                    object_rBodyFrame: function(indexer, title, data, foot)
                    {
                        let returner="";
                        if(aux_existence(data))
                        {
                            returner = "<div id=\"head_aob_" + title + "_" + indexer + "\" class=\"dBody_head\" onclick=\"aux_colapseDivItem('aob_" + title + "_" + indexer + "')\">" +
                                            "<span id=\"arrow_rob_" + title + "_" + indexer + "\" class=\"dBody_head_arrow\">\u25bd</span>" +
                                            "<span id=\"title_rob_" + title + "_" + indexer + "\" class=\"dBody_head_title\">" + title + "</span>" +
                                        "</div>" +
                                        "<div  id=\"body_rob_" + title + "_" + indexer + "\" class=\"dBody_Body\" style=\"display:block\">" + data + "</div>" +
                                        "<div  id=\"foot_rob_" + title + "_" + indexer + "\" class=\"dBody_Foot\" style=\"display:block\">" + foot + "<br></div>"; 
                        }
                        return returner;
                    },
                    
                    object_rFootFrame: function(id, data, finalReport)
                    {
                        let points=0,objButton="",displayData="";
                        let dataMap=new Map(data);
    
                        function getPerformance(a, b, c, d)
                        {
                            let eclass="", percent="";
                            let e = a.replace(" ","");
                            
                            if(aux_existence(c)){   eclass=c; }
                            if(aux_existence(d)){   percent="%"; }
                            
                            return  "<div id=\"rof_" + a + "\" class=\"dFoot_performance\" >" +  
                                        "<span id=\"rof_Head_" + e + "\" class=\"dFoot_head\">" + a + ":</span>" +
                                        "<span id=\"rof_Body_" + e + "\" class=\"dFoot_body tail" + eclass + "\">" + b + percent + "%</span></div>";  
                        }
             
             
                        dataMap.forEach(function(value, keys, arr)
                        {
                            let [num, rate, percent, newclass] = value;
                            let performance = (Number(num)*Number(rate));
                            points += Number(performance);
                            displayData +=  getPerformance(keys, performance.toFixed(2), newclass, percent);
                        });
                        
                                
                        return  "<div id=\"head_rof_" + id + "\" class=\"dFoot_head\" ></div>" +
                                "<div id=\"body_rof_" + id + "\" class=\"dFoot_Body\" >" + displayData + "</div>" +
                                "<div id=\"foot_rof_" + id + "\" class=\"dFoot_Foot\" ><br></div>";  
                    },                    
                },
                
                
                actionObject:
                {
                    actionData: function(id, arr)
                    {
                        this.id              = id;
                        this.astatus         = arr[0];
                        this.atitle          = arr[1];
                        this.adescription    = arr[2];
                        this.adatetime       = arr[3];
                        this.apriority       = arr[4];
                        this.arisk           = arr[5];
                        this.alist           = arr[6];
                        this.acategory       = arr[7];
                        this.acontacts       = arr[8];
                        this.alocations      = arr[9];
                        this.aresources      = arr[10];
                        this.atransactions   = arr[11];
                        this.avariants       = arr[12];
                        this.aclosure        = arr[13];
                        this.alinks          = arr[14];
                        this.attachments     = arr[15];
                        this.acomments       = arr[16];
                    }, 
                    
                    _Index:     function(cnt){return `${this.actionData.id}_${cnt}`; },
                    _DateTime:  function(dt){return dt.split("*|3f4x|*"); },
                    _Color:     function(dt, status)
                    {
                        let cssFrameColor, cssActionColor,a,b;
                        let colorCode = (function([frame, creation, strtime, endtime, actualendtime, grace])
                        {
                            let gracetime = Number(endtime)+Number(grace);
                            let now = new Date().getTime();
                            let code;
                                  
                            if((now+86400000)<strtime)
                            {   code=1; /*white*/ }           
                            else 
                            {
                                if((now<strtime)&&((now+86400000)>strtime)&&((now+86400000)<gracetime))
                                {   code=2; /*yellow*/ }
                                else
                                {
                                    if((now>strtime)&&((now+86400000)<gracetime))
                                    {   code=3; /*green*/ }
                                    else
                                    {
                                        if((now<gracetime)&&((now+86400000)>gracetime))
                                        {   code=4; /*orange*/ }
                                        else
                                        {   code=0; /*red*/ }                                               
                                    }                                                
                                }                                           
                            }
                            
                            return code;
                        })(dt);
                        
                        
                        switch(colorCode)
                        {
                            case 1:     cssActionColor="cssActionColor_w";  cssFrameColor="cssFrameColor_g";  a="white";  b="green";    break;
                            case 2:     cssActionColor="cssActionColor_y";  cssFrameColor="cssFrameColor_g";  a="yellow"; b="green";    break;
                            case 3:     cssActionColor="cssActionColor_g";  cssFrameColor="cssFrameColor_g";  a="green";  b="green";    break;
                            case 4:     cssActionColor="cssActionColor_p";  cssFrameColor="cssFrameColor_p";  a="orange"; b="orange";   break;
                            default:    cssActionColor="cssActionColor_r";  cssFrameColor="cssFrameColor_r";  a="red";    b="red";      break;
                        }
                        
                        if(parseInt(status)!==0)                                      //0: Active; 1: Close; 2: Delete  
                        {   cssFrameColor = "cssFrameColor_closed"; }

                        
                        return [cssActionColor, cssFrameColor, a, b];
                    },
                    
                    
                    object_performance: function(objAction)
                    {
                        let performance = {kpo:0 , kpe:0, points:0};
                        let datetime = DateTime.actionDateTime(objAction["Status"], objAction["DateTime"]);
                        
                        function analyzePerformance(or, od)
                        {
                            if ((aux_existence(od))&&(parseInt(od)!==0))
                            {
                                if (or.kpo && !isNaN(or.kpo)) performance.kpo += parseFloat(or.kpo);
                                if (or.kpe && !isNaN(or.kpe)) performance.kpe += parseFloat(or.kpe);
                                if (or.points && !isNaN(or.points)) performance.points += parseInt(or.points);
                
                
console.log(`=>> ${or.title}: ${or.points}`);
                                if (or.children) calculatePerformance(or.children, od);
                            }
                        }
                        
                        
                    
                        function calculatePerformance(objReport, objData) 
                        {
                            for(let obj of objReport)
                            {   
                                if(aux_existence(objData[obj.title]))
                                {
                                    let data = (obj.title!=="DateTime")? objData[obj.title]: datetime;
                                    
    
                                    if(Array.isArray(data))
                                    {
                                        for(let newObjData of data)
                                        {   analyzePerformance(obj, newObjData); }
                                    }
                                    else
                                    {   analyzePerformance(obj, objData);   }   
                                }
                            }
                        }
                    
                        calculatePerformance(apps.reporter.children, objAction);
                        return performance;
                    },
                    

                    object_returner: function(actionID, actionData, colorSettler, updatable)
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
                        
                        
                        
                        return  "<div id=\"" + actionID + "\"  class=\"collapseBlock  sideFrame\" data-block-index=\"1\" data-display-mode=\"display\">" +
                                    this.object_DataFrame(actionID, actionID) + 
                                    this.object_HeadFrame(actionID, actionData.reportData, cssFrameColor, actionData.Status, actionData.Title, "", actionData.DateTime, updatable) +
                                    "<div id=\"body_" + actionID + "\" class=\"actionBody closedDisplay\"></div>" +
                                    "<div id=\"foot_" + actionID + "\" class=\"actionFoot closedDisplay " + cssFrameColor + "\"></div>" +
                                    /*<id=foot_actionID> will be populated from frame.Display.Detail.Action.footReturner()*/
                                "</div>";  
                    },

                   
                    object_DataFrame: function(id, stringData)
                    {   
                        return  "<div id=\"data_" + id + "\">" + 
                                    "<input type=\"hidden\" id=\"rowData_" + id + "\" value=\"" + stringData + "\">" +
                                "</div>";
                    },
                    
                    
                    object_HeadFrame: function(indexer, reportData, acolor, status, title, outteruser, datetime, update)
                    {
                        let classData   = [["actionHead topheaderSpacer",(parseInt(status)===1)? "closedActionArrow":"","noclass", acolor],["headerSupport headerColored","noclass", "moveToTail " + acolor]];
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


                        let simbol = (parseInt(status)!==1)? "\u25b7": "\u25b6";
                        if(aux_existence(title))
                        {
                            let [title0] = title;
                            let {_name:title1} = title0;
                            let [title2] = title1;
                            

                            
                            let headEditor =    (aux_existence(update))? 
                                                            `<span class="aHeadEditor">\u22EE</span>
                                                            <div id="headToolTip_${indexer}"   class="htooltip " >
                                                                <a href="javascript:frame.edit.eAction.placer('${indexer}')" id="aEdit_${indexer}"   class="ttcomponent" >Edit</a><br>
                                                                <a href="javascript:frame.edit.eAction.placer('${indexer}','true')"  id="aClone_${indexer}"   class="ttcomponent" >Clone</a>
                                                            </div>`:
                                                            "";
                                                            
                            let headClass = (aux_existence(headEditor))? "headEditor": "";
                                   
                            return "<div id=\"head_" + indexer + "\" class=\"header\" data-collapseblock=\"unset\" >" + 
                                        "<div id=\"headData_" + indexer + "\"  class=\"headData\">" + 
                                            "<div id=\"BodyFrame_Title_" + indexer + "_1\">" +
                                                "<input type=\"hidden\" id=\"edit_Title_" + indexer + "_1_0\" data-action-property-label=\"_frameID\" value=\"1\">" +
                                                "<input type=\"hidden\" id=\"edit_Title_" + indexer + "_1_1\" data-label-objname=\"_name\"  data-action-property-label=\"_name\" required=\"true\" value=\"" + title2 + "\">" +  
                                            "</div>" +
                                            "<div id=\"headtop_" + indexer + "\" class=\"" + classData[0][0] + "\">" + 
                                                "<div class=\"headselector\"  onclick=\"actionHandler('" + indexer + "')\">" +
                                                    "<span id=\"headsymbol_" + indexer + "\"  class=\"" + classData[0][1] + "\">" + simbol + "</span>" +
                                                    "<span id=\"headpositioner_" + indexer + "\"  class=\"" + classData[0][2] + "\"></span>" +
                                                    "<span id=\"headtitle_" + indexer + "\"  title=\"" + title2 + "\"  class=\"aHead_title  truncateTitle" + classData[0][3] + "\" >" + title2 + "</span>" +
                                                "</div>" +
                                                "<div id=\"headeditor_" + indexer + "\"   class=\"" + headClass + " closedDisplay\"  onclick=\"actionEditorHandler('" + indexer + "')\">" + headEditor + "</div>" +
                                            "</div>" +
                                            "<div id=\"headbottom_" + indexer + "\"  class=\"" + classData[1][0] + "\">" +
                                                "<span id=\"headbottom_1_" + indexer + "\"   class=\"" + classData[1][1] + "\">" + outteruser + "</span>" +
                                                "<span id=\"headbottom_2_" + indexer + "\"   class=\"" + classData[1][2] + "\" >" + processedDateTime(datetime, status) + "</span>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div id=\"headGraph_" + indexer + "\"  class=\"headGraph\">" + createCircularGraph(indexer, acolor) + "</div>" +                                        
                                    "</div>"; 
                        }
                        
                        return "";
                    },
     
                    
                    object_dBodyFrame: function(indexer, title, data, foot)
                    {
                        let returner="";
                        if(aux_existence(data))
                        {
                            returner = "<div id=\"head_" + title + "_" + indexer + "\" class=\"abProperty_Head\" onclick=\"aux_colapseDivItem('" + title + "_" + indexer + "')\">" +
                                            "<span id=\"arrow_aob_" + title + "_" + indexer + "\" class=\"abPropertyHead_arrow\">\u25bd</span>" +
                                            "<span id=\"title_aob_" + title + "_" + indexer + "\" class=\"abPropertyHead_title\">" + title + "</span>" +
                                        "</div>" +
                                        "<div  id=\"body_" + title + "_" + indexer + "\" class=\"abProperty_Body\" style=\"display:block\">" + data + "</div>" +
                                        "<div  id=\"foot_" + title + "_" + indexer + "\" class=\"abProperty_Foot\" style=\"display:block\">" + foot + "<br></div>"; 
                        }
                        return returner;
                    },
                    
                    object_bElement: function(eArr, dataArr)
                    {
                        let elementStructure="";  
                      
                        
                        eArr.forEach(function(element, index)
                        {
                            let {title, elementID, codeClass, extraClass, displayData} = element;
                            let titleSpan="", bodySpan="";
                            
                            switch(codeClass)
                            {
                                case 0: 
                                    if(aux_existence(displayData))
                                    {
                                        titleSpan = `<span class='apbElement_title ${extraClass}'>${aux_textSignIn(title)}:</span>`;
                                        bodySpan = `<span class='apbElement_body ${extraClass}'>${aux_textSignIn(displayData)}</span>`;
                                    }
                                    break;
                                case 1: 
                                    if(aux_existence(displayData))
                                    {
                                        titleSpan = "";                                         //textarea
                                        bodySpan = `<span class='apbElement_text ${extraClass}'>${displayData}</span>`;
                                    }
                                    break;
                            }
                            
                            elementStructure += `<div class='aProperty_Body'>${titleSpan}${bodySpan}</div>`;
                        })
                        return elementStructure;
                    },
                    
                    object_eBodyFrame: {},
                    
                    object_FootFrame: function(id, indexer, action, func)
                    {
                        let close="",clone="",objButton="";
    
                        let acolor = DateTime.actionColorCode(action.astatus, action.adatetime)
                        let performance = this._Performance(this._DateTime(action.adatetime), action);
                        let points = (action.returnData.points);
                        
                        if(aux_existence(func))
                        {
                            for(let f0=0, f1=func.length; f0<f1; f0++)
                            {
                                const [objClass, objFunc, objValue] = func[f0];
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
                                
                                objButton = objButton + "<div class=\"" + objClass + "\" onclick=\"" + placement + "('" + id + "')\">" + objValue + "</div>";
                            }
                        }
                        
                        
                        let dtfoot = (function(dt, cc)
                        {
                            let footdatetime  = "";
                            let initializeDateTime = ["Starting", "Due", "Closed"];
                            let {cReference, cName} = cc;
                            let dtArr = dt.split("*|3f4x|*");
                            
                            let datetime = DateTime.aux_ParseTo.extendDateTime(dtArr);
                            
                            
                            if(parseInt(cReference)===5)
                            {   
                                footdatetime =  "<div><span class=\"aFoot_hElement_Head0\" >Closed Date@Time:</span><span class=\"aFoot_hElement_Body0\" style=\"color:" + cc.cCode + "\">" + DateTime.aux_ParseTo.extendDateTime(dtArr[4]) + "</span></div>" +
                                                "<div><span class=\"aFoot_hElement_Head1\" >Due Date@Time:</span><span class=\"aFoot_hElement_Body1\" >" + DateTime.aux_ParseTo.extendDateTime(Number(dtArr[3])+Number(dtArr[5])) + "</span></div>";
                            }
                            
                            if(parseInt(cReference)===1)
                            {   footdatetime = "<div><span class=\"aFoot_hElement_Head0\" >Starting Date@Time:</span><span class=\"aFoot_hElement_Body0\" style=\"color:" + cc.cCode + "\">" + DateTime.aux_ParseTo.extendDateTime(dtArr[2]) + "</span></div>"; }
                            
                            
                            if((parseInt(cReference)!==5)&&(parseInt(cReference)!==1))
                            {   footdatetime =  "<div><span class=\"aFoot_hElement_Head0\" >Due Date@Time:</span><span  class=\"aFoot_hElement_Body0\"  style=\"color:" + cc.cCode + "\">" + DateTime.aux_ParseTo.extendDateTime(dtArr[3]) + "</span></div>";  }
                            
                            return footdatetime;
                        })(action.adatetime, acolor);
                    
                    
                        let data =  "<div id=\"aof_performance_points_" + indexer + "\" class=\"aFoot_performance\" >" +  
                                        "<span id=\"aof_pp_Head_" + indexer + "\" class=\"aFoot_pHead\">Points</span>" +
                                        "<span id=\"aof_pp_Body_" + indexer + "\" class=\"aFoot_pBody\"><strong>" + points.toFixed(2) + "</strong></span>" +                        
                                    "</div>" +
                                    "<div id=\"aof_performance_kpo_" + indexer + "\" class=\"aFoot_performance\" >" +  
                                        "<span id=\"aof_pkpo_Head_" + indexer + "\" class=\"aFoot_pHead\">Objectives Performance:</span>" +
                                        "<span id=\"aof_pkpo_Body_" + indexer + "\" class=\"aFoot_pBody\">" + (performance[0]*100). toFixed(2) + "</span>" +                        
                                    "</div>" +
        
                                    "<div id=\"aof_performance_kpe_" + indexer + "\" class=\"aFoot_performance\" >" +  
                                        "<span id=\"aof_pkpe_Head_" + indexer + "\" class=\"aFoot_pHead\">Execution Performance</span>" +
                                        "<span id=\"aof_pkpe_Body_" + indexer + "\" class=\"aFoot_pBody\">" + (performance[2]*100). toFixed(2) + "</span>" +                        
                                    "</div>";
                                    
                                
                        return  "<div id=\"head_aof_" + indexer + "\" class=\"aFoot_head\" >" + dtfoot + "</div>" +
                                "<div id=\"body_aof_" + indexer + "\" class=\"aFoot_Body\" >" + data + "</div>" +
                                "<div id=\"foot_aof_" + indexer + "\" class=\"aFoot_Foot\" >" + objButton + "</div>";  
                    },
                    
                    object_Footer: function(Indexer, performance, status, datetime, color, func)
                    {   
                        let close="";
                        let clone="";
                        let objButton="";
                        let objDTButton = "";
                        
                        if(!aux_existence(datetime))
                        {   
                            datetime = ["Begining of Times", "End of Times"];  
                            objDTButton = "<tr><td></td><td><div class=\"_Button\" onclick=\"frame.edit.report.datetimeFrame('" + Indexer + "')\">Enter new DateTime</div></td></tr>";
                        }
                        
                        
                        if(aux_existence(func))
                        {
                            for(let f0=0, f1=func.length; f0<f1; f0++)
                            {
                                const [objClass, objFunc, objValue] = func[f0];
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
                                
                                objButton = objButton + 
                                            "<div class=\"" + objClass + "\" onclick=\"" + placement + "('" + funcArguments + "')\">" + objValue + "</div>";
                            }
                        }
    
    
                        if(parseInt(status)!==0)
                        {
                            if(color!=="")
                            {   close= "<tr><td>Close Date@Time:</td><td><span class=\"actionHeaderDateTime\" style=\"color:" + color + "\">" + datetime[2] + "</span></td></tr>"; }
                            else
                            {   color="blue";   }
                        }
                        
    
                        let objFoot =   "<input type=\"hidden\" id=\"groups_" + Indexer + "\" value=\"\">" +
                                        "<table width=\"100%\">" +
                                            "<tr>" +
                                                "<td colspan=\"2\">" +
                                                    "<table class=\"objectFoot_datetime\">" +
                                                        "<tr><td  colspan=\"2\">" + performance + "</td></tr>" +
                                                        close +
                                                    "</table>" +
                                                "</td>" +
                                            "</tr>" +
                                            "<tr>" +
                                                "<td colspan=\"2\">" + 
                                                    objButton +
                                                "</td>" +
                                            "</tr>" +
                                        "</table>";
                    
                        return "<div id=\"obj_Footer_" + Indexer + "\" class=\"objectFoot\">" + objFoot + "</div>"; 
                    },  
                    
                    object_format: function(ddata, hdata, bdata, fdata, nameid, classArr, stopper)
                    {   return  collapseBlock(ddata, hdata, [bdata, false], fdata, nameid, classArr, stopper); }
                },
            },
        },   
    }, 
    
   
    MenuBoard:
    {
        returner: function()
        {
            let actionStates, actionDateTime, actionPriorities;
            
            
        },
    },
    

    ReportBoard:
    {
        
    },
};


const aux_FrameMechanisms = 
{};


class Frame
{
    constructor(action){   this.action = action; }
    
    
    displayframe(specificRequest)
    {
/*
maybe deep nest is not a good idea
it loses the object instance
*/

        
        
        function bodyReturner(actionObj)
        {
            let returner="";
            
            function propertyReturner(propertyObj)
            {
                return (function({propertyTitle, propertyData})
                        {
                            let elementaryBlockFrame = function()
                            { return; }
                            
                            
                            return (function(title, data)
                            {
                                //let fbreturner;
                                let aFrame = eval(title).frame.returner(true);
                                
                                
                                let fbreturner = framePropertyBody(data.id, aFrame, title, data);
                                        
                                return "<div id=\"head_" + title + "_" + data.id + "\" class=\"abProperty_Head\" onclick=\"aux_colapseDivItem('" + title + "_" + data.id + "','2','display')\">" +
                                            "<span id=\"arrow_" + title + "_" + data.id + "\" class=\"abPropertyHead_arrow\">\u25bd</span>" +
                                            "<span id=\"title_" + title + "_" + data.id + "\" class=\"abPropertyHead_title\">" + title + "</span>" +
                                            pSize +
                                        "</div>" +
                                        "<div  id=\"body_" + title + "_" + data.id + "\" class=\"abProperty_Body\" style=\"display:block; background-color:#d8e5f3;\">" + fbreturner + "</div>" +
                                        "<div  id=\"foot_" + title + "_" + data.id + "\" class=\"abProperty_Foot\"  style=\"display:block\"></div>"; 
                            })(propertyTitle, propertyData);
                        })(propertyObj);
            }
        
        
/*
            Object.keys(actionObj).forEach(function(key){returner += propertyReturner(key, actionObj(key)); });
            Object.values(actionObj).forEach(function(dataValue){returner += propertyReturner("", dataValue); });       
            Object.entries(actionObj).forEach(function([titleKey, dataValue]){returner += propertyReturner(titleKey, dataValue); });
*/
            for(const [titleKey, dataValue] of Object.entries(actionObj))
            {   
                if(titleKey!=="title")
                {   returner += propertyReturner(titleKey, dataValue);  }
            }
            
            return returner;
        }
        
        
        function actionReturner(actionObj)
        {
            let head = function(){};
            
            let body = bodyReturner(actionObj);
            
            let foot = function(){};
            
            
            
            function getActionColors(){};   
            
            function frameAction(a, b, c, d){};
            
            
            
            return frameAction(head, body, foot, getActionColors());
        }
        

        return (aux_existence(specificRequest))? bodyReturner(specificRequest): actionReturner(this.action);
    }
    
    editframe()
    {
        function elementaryBlockFrame()
        {}
        
        function propertyReturner()
        {}
        
        function bodyReturner()
        {}
        
        function actionReturner()
        {}
    }
    
    actionPlacer()
    {}
}