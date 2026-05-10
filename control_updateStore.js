function update_point(arr)
{
    /*        
        arr[0]=status, 
        arr[1]=title[1], 
        arr[2]=description[1], 
        arr[3]=datetime[1], 
        arr[4]=priority[1], 
        arr[5]=category[1],  
        arr[6]=risk[1], 
        arr[7]=list[1], 
        arr[8]=locations[1], 
        arr[9]=contacts[1], 
        arr[11]=resources[1], 
        arr[12]=transactions[1], 
        arr[13]=variables[1], 
        arr[14]=analysis[],
        arr[15]=links[1], 
        arr[16]=attachments,
        arr[17]=closure[1], 
        arr[18]=comments[1]]),
    */      
    
    let kpo = (function(Arr)
    {
        let a, b, c;

        
        a = (aux_existence(Arr[2]))? (Arr[2].split("*|3f4x|*")[1].length>45)? 30: 5: 0;
        

        b = (function c0(lst1, lnk1)
            {
                let rlst=0, rlnk=0;
                let lstState=true, lnkState=true;

                
                if(lst1>=6){ rlst = 60; lstState=false;}
                if((lst1>=4)&&(lstState)){ rlst = 40; lstState=false;}
                if((lst1>=2)&&(lstState)){ rlst = 20; lstState=false;}
                if((lst1===1)&&(lstState)){ rlst = 5; lstState=false;}

                if(lnk1>=3){ rlnk = 40; lnkState=false;}
                if((lnk1>=2)&&(lnkState)){ rlnk = 20; lnkState=false;}
                if((lnk1===1)&&(lnkState)){ rlnk = 5; lnkState=false;}                    
                
                return (parseInt(rlst) + parseInt(rlnk))*0.35;
            })(
                aux_existence(Arr[6])?  Arr[6].split("*|3f4x|*").length: 0, 
                aux_existence(Arr[14])? Arr[14].split("*|3f4x|*").length: 0
              );
            
            
        c = (function(datetime)
            {
                let dtTerms =   [   
                            //[numericDateTime, Percentage, [max lst/lnk, min lst/lnk]]
                            [31622400000,35],  //hht:  high long term
                            [15897600000,30],  //ht:   long term
                            [7948800000, 25],  //lht:  low long term
                            [2678400000, 20],  //mt:   middle term
                            [604800000,  15],  //hst:  high short term
                            [86400000,   10],  //st:   short term
                            [0,  5]           //lst:  low short term
                        ];
                        
                datetime = (function(dt)
                            {
                                if(dt[1].length<12)
                                {
                                    let i="000";
                                    dt[1] = dt[1] + i;
                                    dt[2] = dt[2] + i;
                                    dt[3] = dt[3] + i;
                                    dt[4] = dt[4] + i;
                                }
                                return dt;
                            })(datetime);
                
                
                
        
                let returner = 0;
                let looper   = true;
                dtTerms.forEach(function(value, index)
                {
                    if(looper)
                    {   if(parseInt(datetime[3])-parseInt(datetime[2])>parseInt(value[0])){returner=value[1]; looper=false;}}
                }); 
                
                return returner;
            })(aux_existence(Arr[3])? Arr[3].split("*|3f4x|*"): "");
        
        return Number(Number(a) + Number(b) + Number(c));
    })(arr);
    
    
    let kpi=0, cntKPI=18;
    arr.forEach(function(value, index)
    {
        if((aux_existence(value))&&(parseInt(value)!==0))
        {
            let a=value.split("*|3f4x|*");
            if(a.length>2)
            {
                for(let b of a)
                { if(aux_existence(b)&&(parseInt(b)!==0)&&(b!=="none")){ kpi++; break;}}
            }
            else
            {   if(aux_existence(a[1])){ kpi++;}}
        }
    });
    kpi = parseInt((kpi/cntKPI)*100);

let kpe=0;
/*    
    let kpe = (function(status, dt, prio, risk, clo, cap, cmt)
    {
        let returner;
        
        let prioM = (function(valueArr)
        {
            let indexer=0;
            
            if(aux_existence(valueArr))
            {    
                let pRearrangeArr = [];
                pRearrangeArr[0] = valueArr[0];
                pRearrangeArr[1] = valueArr[4];
                pRearrangeArr[2] = valueArr[3];
                pRearrangeArr[3] = valueArr[2];
                pRearrangeArr[4] = valueArr[1];
                
                
                pRearrangeArr.forEach(function(value, index)
                {   indexer += ((aux_existence(value))?parseInt(value):0) * parseInt(index);  });
            }
            
            if(indexer>=30){return 40;}
            if(indexer>=20){return 30;}
            if(indexer>=10){return 20;}
            if(indexer>0){return 10;}
            
            return indexer;
            
        })(prio);
        let priorityIndex = (parseInt(prioM)/40);
        
        
        let cntR=0;
        if(aux_existence(risk))
        {   
            if(Array.isArray(risk))
            {risk.forEach(function(value){   if(aux_existence(value)){cntR++;}}) }
            else
            {cntR++;}
        }
        let riskM = (parseInt(cntR)>=3)? 15: (parseInt(cntR)>=1)? 5: 0;
        
        
        let cntClo=0;
        if(aux_existence(clo))
        {   
            if(Array.isArray(clo))
            {   clo.forEach(function(value){if(aux_existence(value)){cntClo++;}})   }
            else
            {   cntClo++; }
        }
        let cloM = (parseInt(cntClo)>=3)? 15: (parseInt(cntClo)>=1)? 5: 0;                                            
        

        let cntCap=0;
        if(aux_existence(cap))
        {   
            if(Array.isArray(cap))
            { cap.forEach(function(value){if(aux_existence(value)){cntCap++;}})   }
            else
            { cntCap++; }
        }
        let capM = (parseInt(cntCap)>=3)? 15: (parseInt(cntCap)>=1)? 5: 0;
        
        
        let cntCMT=0;
        if(aux_existence(cmt))
        {   
            if(Array.isArray(cmt))
            { cmt.forEach(function(value){if(aux_existence(value)){cntCMT++;}})   }
            else
            { cntCMT++; }
        }
        let cmtM = (parseInt(cntCMT)>=3)? 15: (parseInt(cntCMT)>=1)? 5: 0;
        
        returner = (Number(prioM) + Number(riskM) + Number(cloM) + Number(capM) + Number(cmtM));
        

        
        if(parseInt(status)!==1)
        { 
            let now = new Date().getTime();  
            if((now-(Number(dt[3]) + Number(dt[5])))>0){ returner=-85; }
            if((now-(Number(dt[3]) + Number(dt[5]) + Number("86400000")))>0){ returner=-95; }
        }
        
        if(parseInt(status)===1){   if(((Number(dt[3]) + Number(dt[5]))-Number(dt[4]))<-604800000){ returner= returner + (returner*(priorityIndex)*(-1)); }}
        
       return returner;
       
    })(arr[0],
      (arr[3].includes("*|3f4x|*"))? arr[3].split("*|3f4x|*") :arr[3],  //datetime
      (arr[4].includes("*|3f4x|*"))? arr[4].split("*|3f4x|*") :arr[4],  //priority
      (arr[5].includes("*|3f3x|*"))? arr[5].split("*|3f3x|*") :arr[5],  //risk
      (arr[13].includes("*|3f3x|*"))? arr[13].split("*|3f3x|*") :arr[13],  //analysis
      (arr[16].includes("*|3f3x|*"))? arr[16].split("*|3f3x|*") :arr[16],  //closure
      (aux_existence(arr[18]))? (arr[18].includes("*|3f3x|*"))? arr[17].split("*|3f3x|*") :arr[17]:"")  //comments
*/      
      
    
    let kp = Number((kpo*0.333)+(kpi*0.333)+(kpe*0.333));
    
    let kpb=0, kpbStatus=true;
    if((kpbStatus)&&(kp>=85)){kpb=3; kpbStatus=false; }
    if((kpbStatus)&&(kp>=70)){kpb=2; kpbStatus=false; }
    if((kpbStatus)&&(kp>=50)){kpb=1; kpbStatus=false; }
    
    
    
    return kpo + "*|3f4x|*" + kpi + "*|3f4x|*" + kpe + "*|3f4x|*" + kpb + "*|3f4x|*" + kp;
} 



/*      
    ////'uploadToWeb()' it is saved/placed at ../javascript/ajax/synchronizeDB.js 
*/
async function getFileToAttach(data)
{   
    let attachments = data.querySelectorAll("[data-editor-element='attachment']");
    for(let file of attachments)
    {   
        if(file.fileObject)
        {   
            const uploader = await uploadToWeb(file.fileObject, apps.uniqueData.uDB);
            
            if(file.fileObject.type.includes('image'))
            {   
                if(uploader.error)
                {   file.querySelector("[data-element='comments']").innerText = uploader.error; }   
            }
            else if(file.fileObject.type.includes('application'))
            {   
                if(uploader.error)
                {   file.querySelector("[data-element='comments']").innerText = uploader.error; }      
            }
        }
    }   
    
    return data;
}
        
        
async function getActionData(propertyID, status, clonation)
{
    async function saveData(property, id)
    {
        let value       = "";
        let arr_B       = [];
        let emptyData   = true;

        const {frame, saveException=function(){return "";}} = eval(property);             
        let exception=saveException(id);


        if(aux_existence(exception))
        {   arr_B = exception; }
        else
        {
            let cntB = 1, cntBE;
            let Bexistence, EBexistence;
            let arrSubInserted = [];               
            do
            {     
                let obj_B   = {};
                let ignoreBlock = false;
                let notIgnoreBlock = true;

                Bexistence      = false;
                
                if(aux_existence(document.getElementById(`BodyFrame_${property}_${id}_${cntB}`)))
                {
                    cntBE = 0;
                    do
                    {
                        EBexistence = false;
                        let ebNotVerified   = true;
                        let elementName = document.getElementsByName("edit_" + property + "_" + id + "_" + cntB + "_" + cntBE + "_ignore")[0];    
                        let elementID   = document.getElementById("edit_" + property + "_" + id + "_" + cntB + "_" + cntBE);
                        
                        
                        if(aux_existence(elementID))
                        {   
                            let elementKey  = elementID.getAttribute("data-action-property-label"); 
                            if(aux_existence(elementName))
                            {
                                /*
                                    This block deals with subFrameBlock property
                                */
                                let SBexistence, ESBexistence;
                                let cntSB  = 1;
                                
                                let arr_SB = [];
                                
                                do
                                {
                                    let obj_SB = {};
                                    let notIgnoreSBlock = true;
                                    SBexistence = false;
                                    
                                    subB = document.getElementById(`subPropertyBodyFrame_${property}_${id}_${cntB}_${cntBE}_${cntSB}`);
                                    if(aux_existence(subB))
                                    {
                                        cntSBE = 0;
                                        let selementFB;
                                        do
                                        {
                                            ESBexistence    = false;
                                            esbNotVerified  = true;
                                            
                                            let selementName = document.getElementsByName(`edit_${property}_${id}_${cntB}_${cntBE}_${cntSB}_${cntSBE}_ignore`)[0];    
                                            let selementID   = document.getElementById(`edit_${property}_${id}_${cntB}_${cntBE}_${cntSB}_${cntSBE}`);
                                            let selementKey  = selementID?.getAttribute("data-action-property-label");                                                     
                                                
                                            
                                            if(aux_existence(selementID))
                                            {

                                                if(!aux_existence(selementName))
                                                {
                                                    if((aux_existence(selementID.getAttribute("mandatory")))&&(!aux_existence(selementID.value)))
                                                    {   notIgnoreSBlock = false;  }
                                                    
                                                    
                                                    if((aux_existence(selementID.required))&&(!aux_existence(selementID.value)))
                                                    {   notIgnoreSBlock = false; }
                                                          
/*
                                                    if(selementID.getAttribute("RichTextEditorSetBy"))
                                                    {
                                                        if(selementID.getAttribute("RichTextEditorSetBy")==="foxyzrte")
                                                        {   
                                                            if((elementID.querySelectorAll("[data-editor-element='attachment']").length!==0))
                                                            {
                                                                elementID = await getFileToAttach(elementID);
                                                            }
                                                            
                                                            let commentData = editor.saveEditor(elementID.querySelector(".editor"));
                                                            
                                                            if(aux_existence(commentData))
                                                            obj_SB[selementKey] = [aux_textSignOut(commentData)]; 
                                                        } 
                                                        
                                                        esbNotVerified=false; 
                                                    }
*/

                                                    if(selementID.getAttribute("RichTextEditorSetBy"))
                                                    {
                                                        if(selementID.getAttribute("RichTextEditorSetBy")==="foxyzrte")
                                                        {   
                                                            if((selementID.querySelectorAll("[data-editor-element='attachment']").length!==0))
                                                            {
                                                                selementID = await getFileToAttach(selementID);
                                                            }
                                                            
                                                            let commentData =  editor.getDataToSave(selementID);
                                                            if(selementID.getAttribute("required"))
                                                            {
                                                                if(elementID.getAttribute("required")==="true")
                                                                {
                                                                    if((aux_existence(commentData))&&(esbNotVerified))
                                                                    {   
                                                                        if(commentData!=='<div class="editorHiddenData"></div>')
                                                                        {   obj_SB[selementKey] = [aux_textSignOut(commentData)];  }
                                                                        else
                                                                        {
                                                                            notIgnoreSBlock = false;
                                                                            ignoreSBlock = true;                                                             
                                                                        }
                                                                    }
                                                                    else
                                                                    {
                                                                        notIgnoreSBlock = false;
                                                                        ignoreSBlock = true;   
                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    notIgnoreSBlock = false;
                                                                    ignoreSBlock = true;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                if((aux_existence(commentData))&&(esbNotVerified))
                                                                {    
                                                                    if(commentData!=='<div class="editorHiddenData"></div>')
                                                                    {   obj_SB[selementKey] = [aux_textSignOut(commentData)];  }
                                                                } 
                                                            }
                                                        } 
                                                        
                                                        esbNotVerified=false; 
                                                    }
                                
                                                    
                                                    if(selementID.hasAttribute("buffervalue"))
                                                    {
                                                        obj_SB[selementKey] = [selementID.getAttribute("buffervalue")];   
                                                        
                                                        esbNotVerified=false;                                        
                                                    }
                                                    
                                                    
                                                    if(selementID.hasAttribute("data-element-skip"))
                                                    {
                                                        if(aux_existence(selementID.getAttribute("data-element-skip")))
                                                        {   esbNotVerified = false; }
                                                    }
                                                    
                                                    
                                                    if((esbNotVerified)&&(!selementID.hasAttribute("data-property-skip"))) 
                                                    {   obj_SB[selementKey] = [aux_textSignOut(selementID.value)];  }  
                                                }
                                                ESBexistence = true;
                                            }
                                            
                                            cntSBE++;
/*                                                
                                            if(!aux_existence(selementFB))
                                            {
                                                selementFB ||= document.getElementById(`edit_${property}_${id}_${cntB}_${cntBE}_${cntSB}_${cntSBE}`);
                                                
                                                if(selementFB.dataset["subProperty"]!==selementKey)
                                                {
                                                    ESBexistence = false;
                                                    notIgnoreSBlock = false;
                                                }
                                            }
*/
                                        }
                                        while(ESBexistence)
                                        
                                        if(aux_existence(notIgnoreSBlock))
                                        {   
                                            if(arrSubInserted.indexOf(`subPropertyBodyFrame_${property}_${id}_${cntB}_${cntBE}_${cntSB}`)===-1)
                                            {
                                                if(aux_existence(obj_B[elementKey]))
                                                {   obj_B[elementKey].push(obj_SB);   }
                                                else
                                                {   obj_B[elementKey] = [obj_SB];    }
                                                arrSubInserted.push(`subPropertyBodyFrame_${property}_${id}_${cntB}_${cntBE}_${cntSB}`);
                                            }
                                        }
                                        
                                        SBexistence = true;
                                    }
                                    
                                    cntSB++;
                                }
                                while(SBexistence)
                            }
                            else
                            {
                                /*
                                    This block deals with FrameBlock property
                                */
                                if(aux_existence(elementID.getAttribute("mandatory")))
                                {
                                    if(!aux_existence(elementID.value))
                                    {   notIgnoreBlock = false; }
                                }
                                

                                if(elementID.getAttribute("RichTextEditorSetBy"))
                                {
                                    if(elementID.getAttribute("RichTextEditorSetBy")==="foxyzrte")
                                    {   
                                        if((elementID.querySelectorAll("[data-editor-element='attachment']").length!==0))
                                        {
                                            elementID = await getFileToAttach(elementID);
                                        }
                                        
                                        //let commentData = editor.saveEditor(elementID.querySelector(".editor"));
                                        let commentData =  editor.getDataToSave(elementID);
                                        if(elementID.getAttribute("required"))
                                        {
                                            if(elementID.getAttribute("required")==="true")
                                            {
                                                if((aux_existence(commentData))&&(ebNotVerified))
                                                {   
                                                    if(commentData!=='<div class="editorHiddenData"></div>')
                                                    {   obj_B[elementKey] = [aux_textSignOut(commentData)];  }
                                                    else
                                                    {
                                                        notIgnoreBlock = false;
                                                        ignoreBlock = true;                                                             
                                                    }
                                                }
                                                else
                                                {
                                                    notIgnoreBlock = false;
                                                    ignoreBlock = true;   
                                                }
                                            }
                                            else
                                            {
                                                notIgnoreBlock = false;
                                                ignoreBlock = true;
                                            }
                                        }
                                        else
                                        {
                                            if((aux_existence(commentData))&&(ebNotVerified))
                                            {    
                                                if(commentData!=='<div class="editorHiddenData"></div>')
                                                {   obj_B[elementKey] = [aux_textSignOut(commentData)];  }
                                            } 
                                        }
                                    } 
                                    
                                    ebNotVerified=false; 
                                }
                                
                                
                                if(elementID.hasAttribute("buffervalue"))
                                {
                                    obj_B[elementKey] = [elementID.getAttribute("buffervalue")];   
                                    
                                    ebNotVerified=false;                                        
                                }


                                if(elementID.hasAttribute("data-element-skip"))
                                {
                                    if(aux_existence(elementID.getAttribute("data-element-skip")))
                                    {   ebNotVerified = false; }
                                }
                                
                                
                                if(aux_existence(elementID.required))
                                {
                                    if(!aux_existence(elementID.value))
                                    {
                                        notIgnoreBlock  = false;  
                                        ignoreBlock     = true;  
                                        ebNotVerified   = false;
                                        cntBE           = 1000;
/*
There should be no reason for the block below to be executed
if elementID.required and aux_existence(elementID.value)===false
                                        if(aux_existence(obj_B["_name"]))
                                        {
                                            if((obj_B["_name"][0].indexOf("0#@")===-1)&&(obj_B["_name"][0].indexOf("1#@")===-1)&&(obj_B["_name"][0].indexOf("0###@")===-1)&&(obj_B["_name"][0].indexOf("1###@")===-1)&&(obj_B["_name"][0].indexOf("#action#@")===-1))
                                            {
                                                notIgnoreBlock = false;  
                                                ignoreBlock = true;   
                                            }
                                        }
*/
                                    }
                                }  
                                       
                                                                  
                                if(ebNotVerified)
                                {   obj_B[elementKey] = [aux_textSignOut(elementID.value)];  }                                      
                            }
                            EBexistence = true;
                        }
                        cntBE++;
                    }
                    while(EBexistence)
                    
                    if(notIgnoreBlock)
                    {   arr_B.push(obj_B);   }
                    Bexistence = true;
                }  
                cntB++;
            }
            while(Bexistence);
        }
        
        return (aux_existence(arr_B))? arr_B: null;   
    } 



    let title = await saveData("Title", propertyID); 
    if(aux_existence(title))
    {   
        let description     = await saveData("Description", propertyID);
        let datetime        = await saveData("DateTime", propertyID);
        let priority        = await saveData("Priority", propertyID);
        let category        = await saveData("Category",propertyID);
        let risk            = await saveData("Risk", propertyID, status);  
        let listitem        = await saveData("ListItem", propertyID);
        
        let locations       = await saveData("Locations", propertyID);
        let contacts        = await saveData("Contacts",  propertyID);
        let resources       = await saveData("Resources", propertyID);        
        let transactions    = await saveData("Transactions", propertyID);
        
        let variables       = await saveData("Variables", propertyID);
        let analysis        = await saveData("Analysis", propertyID);       
        let links           = await saveData("Links", propertyID); 
        //let attachments     = saveData("Attachments", propertyID); // getFileToAttach(propertyID);      
         
        let closure         = await saveData("Closure", propertyID);  
        let comments        = await saveData("Comments", propertyID);   
/*
                     "reportData",
                    "externalCode",
                    "internalCode",
                    "accessRef",
                    "sourceRef",
                    "serverRef",
                    "updateRef",
                    "maxInnerActionCounter",
                    "maxStorageUpdateCounter",
                    "maxOuterActionCounter",
                    "Status",
                    "Title",
                    "Description",
                    "DateTime",
                    "Priority",
                    "Category",
                    "Risk",
                    "List",
                    "Locations",
                    "Contacts",
                    
                    "Resources",
                    "Transactions",
                    //"Variants",
                    "Variables",
                    "Analysis", 
                    "Links",
                    "Attachments",
                    
                    "Closure",
                    "Comments"       
*/

        return  { 
                    reportData:             "", //update_point([status, title, description, datetime, priority, risk, listitem, category, contacts, locations, resources, transactions, /*variants*/variables, analysis, links, closure, comments]),       //action Points
                    ExternalCode:           References.saveException(propertyID, 1, clonation),            //action External Reference     
                    InternalCode:           References.saveException(propertyID, 2, clonation),            //action Internal Reference    
                    AccessRef:              References.saveException(propertyID, 3, clonation),            //Action Access Code                           
                    SourceRef:              References.saveException(propertyID, 4, clonation),            //Action Source {0: profile user (internal) / 1: outerUser uid (it can also be userName)}
                    ServerRef:              References.saveException(propertyID, 5, clonation),            //externalDB/online server {0:action needs to be uploaded to external/online server (localDB needs to send to externalDB); 1:default; 2:action has to be downloaded to the localDB (new action externalDB needs to sent to localDB)}         -->>it checks if the action has been connected with outside world (outside servers has been updated) 
                    UpdateRef:              References.saveException(propertyID, 6, clonation),            //last numeric datetime         
                    MaxInnerActionCounter:  References.saveException(propertyID, 7, clonation),           //last action update log count  -->>updates of the action (inside of the localStorage) -->> It counts the number of local updates    
                    MaxOuterActionCounter:  References.saveException(propertyID, 8, clonation),            //last outside-sharable-server log count //action update count     -->>external updates into the action 
                    Status:             status,                          //"0"= open; "1"=closed                      
                    Title:              title,          //(10)title
                    Description:        description,    //(11)description
                    DateTime:           datetime,       //(12)datetime
                    Priority:           priority,       //(13)priority
                    Category:           (aux_existence(category))? category: [{_name:["..."]}],       //(16)category
                    Risk:               risk,           //(14)risk
                    ListItem:           listitem,           //(15)list  
                    
                    Locations:          locations,      //(18)locations 
                    Contacts:           contacts,       //(17)contacts    
                       
                    Resources:          resources,      //(19)resources
                    Transactions:       transactions,   //(20)transactions                          
                    Variables:          variables,       //(21)values
                    Analysis:           analysis,   //(25)capabilities  
                    
                    Links:              links,          //(23)attachments     )   
                    //Attachments:        aux_textSignOut(attachments),    //(24)getFileToAttach(propertyID)
                                           
                    Closure:            closure,        //(22)closure 
                    Comments:           comments       //(27)comments     
                };    
    }
                 
    return;
}
    
    


/*
    Last Update: 
        Dec 25, 2021 (ver. 26)
        (AC)- Jan 15, 2022 (ver. 29): Action Order
        (AC)- Jan 29, 2022 (ver. 30): 
            rename function from frame_update_action() to current
                    
    Source of Data:
                            
                        
    Description:
        What does it do?
                                
                            
        Why is it called
                            
        Where is it called from
            set by: frame.edit.eAction.eBody.returner(){frame_BottomButtons(){}}
            called by: [Save Button] and [Close Button]
                                
                                
        When is it called
        
        Values:
            status:
                0: Active
                1: Close
                2: Delete
                3: Cancel
    Concerns: 
        Changing the order of the action elements will affect the following functions:
            - submitActionDataToUpdate(){ storeNew_Object(){ addToStore.onsuccess(){ getAction.onsuccess(){}}}}
            - submitActionDataToUpdate(){ storeExisting_Object(){ objStore.get(parseInt(id)).onsuccess(){}}}
            
            - frame.js >> frame.Display.Detail.Action.Placer()
            - frame.js >> frame.Display.Detail.Action.Body()
            
            - loadStore.js >> openFocusFocusFocusDB(){requestDB.onupgradeneeded(){}}
            - loadStore.js >> downloadWWWDB(){dbLogRequest.onsuccess(){}}
            - loadStore.js >> load_display_Body(){getterAction.onsuccess(){getThisColor(){}}}
            
            - updateWWWDB.js (worker) >>updateReference(){ActionStore.onsuccess(){}}
            
            - db_update.php
            - db_synchronization.php
*/
async function update_action_OnFrame(propertyID, status, clonation)
{
    const action = await getActionData(propertyID, status, clonation);
    
    switch(parseInt(status))
    {
        case 2:
            submitActionDataToDelete(action, propertyID, true);
            //if(apps.menuReady){ loadData();  }
            break;
            
        case 3:
            loadData();
            break;
            
        default:
/*
            submitActionDataToUpdate(action(), propertyID, clonation, true);   
            //getFileToAttach(propertyID); 
            if(apps.menuReady){ loadData();  }
*/
            
                if (aux_existence(action)) 
                {
                    submitActionDataToUpdate(action, propertyID, clonation, true);
                }
                if (apps.menuReady) { loadData(); }
           
    }
}




function update_action_onObject(b, reload)
{  
    let propertyCounter;
    try
    {
        if(parseInt(b.Status)!==2)
        {
        /* 
        
                //this function inside the status module sets the  datetime_5 
                //let a6  = Status.saveException(propertyID);
                
                let title           = deconstructData(b.Title);
                let description     = deconstructData(b.Description);
                let datetime        = deconstructData(b.DateTime);
                let priority        = deconstructData(b.Priority);
                let risk            = deconstructData(b.Risk);  
                let listitem        = deconstructData(b.List);
                let category        = deconstructData(b.Category);
                let contacts        = deconstructData(b.Contacts);
                let locations       = deconstructData(b.Locations);
                let resources       = deconstructData(b.Resources);        
                let transactions    = deconstructData(b.Transactions);
                let variants        = deconstructData(b.Variants);
                let closure         = deconstructData(b.Closure);        
                let links           = deconstructData(b.Links);      
                let attachments     = deconstructData(b.Attachments);    
                let capabilities    = deconstructData(b.Capabilities);    
                let states          = deconstructData(b.States);    
                let comments        = deconstructData(b.Comments);
                
        
        Changing the order of the action elements will affect the following functions:
            - submitActionDataToUpdate(){ storeNew_Object(){ addToStore.onsuccess(){ getAction.onsuccess(){}}}}
            - submitActionDataToUpdate(){ storeExisting_Object(){ objStore.get(parseInt(id)).onsuccess(){}}}
            
            - frame.js >> frame.Display.Detail.Action.Placer()
            - frame.js >> frame.Display.Detail.Action.Body()
            
            - loadStore.js >> openFocusFocusFocusDB(){requestDB.onupgradeneeded(){}}
            - loadStore.js >> downloadWWWDB(){dbLogRequest.onsuccess(){}}
            - loadStore.js >> load_display_Body(){getterAction.onsuccess(){getThisColor(){}}}
            
            - updateWWWDB.js (worker) >>updateReference(){ActionStore.onsuccess(){}}
            
            - db_update.php
            - db_synchronization.php  
        */
            propertyCounter = [];
            for(let bb of apps.properties)
            {

                
                if((bb!=="References")&&(bb!=="Status")&&(aux_existence(b[bb])))
                {   
                    propertyCounter.push(bb); 
                    
                    if(typeof b[bb] === "string")
                    {   
                        let decoded = aux_textSignIn(b[bb], 0);   // or mode=1 if you want <br>, but 0 is safer for parsing
                        decoded = decoded.trim();   
                        
                        try 
                        {
                            //b[bb] = JSON.parse(decoded);
                            b[bb] = JSON.parse(b[bb]);
                        } 
                        catch (e) 
                        {
                            console.error(`JSON parse error for property ${bb}:`, e);
                            console.warn(`Raw value from (actionID-${b.id}) was :`, decoded);
                            // fallback: keep the decoded string instead of crashing
                            b[bb] = decoded;
                        }
                    }
                    else if(!Array.isArray(b[bb]))
                    {   
                        console.warn(b);
                        console.log(`Problematic Property: (actionID-${b.id})  ${b[bb]}`);
                    }
                }
            }
        
            let action =  { 
                            reportData:                 "",                         //update_point([b.Status, b.Title, b.Description, b.DateTime, b.Priority, b.Risk, b.ListItem, b.Category, b.Contacts, b.Locations, b.Resources, b.Transactions, b.Variables, b.Analysis, b.Links, b.Closure, b.Comments]),       //b.reportData,
                            ExternalCode:               b.ExternalCode,             //action External Reference      
                            InternalCode:               b.InternalCode,             //action Internal Reference                       
                            AccessRef:                  b.AccessRef,                //Action Access Code                           
                            SourceRef:                  b.SourceRef,                //Action Source (internal: 0 / external: 1) 
                            ServerRef:                  1,                          //(true: 1/false: 0) update outside server         -->>it checks if the action has been connected with outside world (outside servers has been updated) 
                            UpdateRef:                  b.UpdateRef,                    
                            MaxInnerActionCounter:      b.MaxInnerActionCounter,    //last action update log count     -->>updates of the action      
                            MaxOuterActionCounter:      b.MaxOuterActionCounter,    //last sharable-server log count //action update count     -->>updates of the action 
        
                            Status:         (b.Status),                 //"0"= open; "1"=closed                             
                            Title:          (b.Title),                  //title
                            Description:    (b.Description),            //description
                            DateTime:       (b.DateTime),               //datetime: there is a saveException 
                            Priority:       (b.Priority),               //priority
                            //Category:       ((b.Category)? b.Category: [nocategory]),               //category
                            Category:       (aux_existence(b.Category)? b.Category: [{_name:["..."]}]),               //category                        
                            Risk:           (b.Risk),                   //risk
                            ListItem:       (b.ListItem),                   //list   
                            
                            Locations:      (b.Locations),              //locations 
                            Contacts:       (b.Contacts),               //contacts    
                               
                            Resources:      (b.Resources),              //resources
                            Transactions:   (b.Transactions),           //transactions                          
                            Variables:      (b.Variables),              //values
                            Analysis:       (b.Analysis),               //Capabilities
                            
                            Links:          (b.Links),                  //Links         (old: a23[0],  //attachments    )  
                            //Attachments:    (b.Attachments),          //Attachments
                            
                            
                            Closure:        (b.Closure),                //aux_textSignOut(a21[0]),       //closure  
                            Comments:       (b.Comments),               //comments          
                        };   
    
            submitActionDataToUpdate(action, "", false, reload);  
        }
    }
    catch(err)
    {
        console.warn(propertyCounter);
        console.error("Error saving action:", err, b)
    }
}




/*
Updates: 29-Jan-2021
    Jan 13, 2021 (ver 28): object order
    
    
Description:

    Variables:
        "reLoadPage": Sometimes multiple actions are submitted for update/insertion (multiple actions downloaded from external/online server)
                        Only the last action will trigger a reload, otherwise it will be always true to reload the page
*/
function submitActionDataToUpdate(editaction, indexerID, clone, reLoadPage)
{
    /*
    lastest update: 29-Jan-2021
    - --->>>aaaaaa111111("Category", editaction.a11, editaction.a0, id, reset, reloadPage);<<<
    - cancell --->>>//wCaller_localRequest(editaction.a11);<<<
    */
    let id, properties, indexArr;
    let objStore        = apps.dbConnection.transaction(["Actions"], "readwrite").objectStore("Actions");    
    let propertyList    = apps.properties; //document.getElementById("properties").value.split("*|3f2x|*");
    let propertyReference = "";//apps.reporter_2.Indicators.children;
    let propertyRef = apps.PerformanceStore.children;
 



    (function(action, store)
    {
        function subAction_Object(actionExtCode, subactionExtCode, property)
        {
            let iStore          = store.index("actionInnerReference");
            let actionToLoad    = iStore.get(subactionExtCode);
                actionToLoad.onsuccess =   function(e)
                                        {  
                                            let naction = e.target.result;
                                            if(naction)
                                            {
                                                let noMatchFound = true;
                                                if(aux_existence(naction[property]))
                                                {
                                                    naction[property].forEach((o)=>
                                                    {
                                                        if(aux_existence(o["_reference"]))
                                                        {
                                                            if(o["_reference"][0]===actionExtCode)
                                                            {   noMatchFound = false;}
                                                        }
                                                    });
                                                }
                                                
                                                
                                                if(noMatchFound)
                                                {
                                                    //if(naction[property])
                                                    {
                                                        let nactionObject = {_name:[`#action-${naction.Status}###@${naction["Title"][0]["_name"]}`], _reference:[actionExtCode]};
                                                        
                                                        if(aux_existence(naction[property]))
                                                        {   naction[property].push(nactionObject);     }
                                                        else
                                                        {   naction[property] = [nactionObject];        }
                                                    }
                                                }
                                                
                                                let addToAction = store.put(naction);
                                            }
                                        };        
        }
        
        
        
        if(aux_existence(action["ListItem"]))
        {
            for(let a of action["ListItem"])
            {
                if(aux_existence(a["_reference"]))
                {
                    subAction_Object(action["InternalCode"], a["_reference"][0], "ListItem")
                }                    
            }
        }
        
        if(aux_existence(action.Locations))
        {
            for(let a of action["Locations"])
            {
                if(aux_existence(a["_reference"]))
                {
                    subAction_Object(action["InternalCode"], a["_reference"][0], "Locations")
                }                    
            }                
        }
        
        if(aux_existence(action.Contacts))
        {
            for(let a of action["Contacts"])
            {
                if(aux_existence(a["_reference"]))
                {
                    subAction_Object(action["InternalCode"], a["_reference"][0], "Contacts")
                }                    
            }                
        }
        
        if(aux_existence(action.Resources))
        {
            for(let a of action["Resources"])
            {
                if(aux_existence(a["_reference"]))
                {
                    subAction_Object(action["InternalCode"], a["_reference"][0], "Resources")
                }                    
            }                
        }
        
        if(aux_existence(action.Transactions))
        {
            for(let a of action["Transactions"])
            {
                if(aux_existence(a["_reference"]))
                {
                    subAction_Object(action["InternalCode"], a["_reference"][0], "Transactions")
                }                    
            }                
        }
        
        if(aux_existence(action.Analysis))
        {
            for(let a of action["Analysis"])
            {
                if(aux_existence(a["_reference"]))
                {
                    subAction_Object(action["InternalCode"], a["_reference"][0], "Analysis")
                }                    
            }                
        }
        
        if(aux_existence(action.Variables))
        {
            for(let a of action["Variables"])
            {
                if(aux_existence(a["_reference"]))
                {
                    subAction_Object(action["InternalCode"], a["_reference"][0], "Variables")
                }                    
            }                
        }
        
    })(editaction, objStore);    


/*
This block sends 'DataToSave' to storeKPI() function

    
    DataToSave = 
    [
        [{title:property}, {...}],
        [{title:property}, {...}],
        [...],
        ...
    ]
    
    Note: this DataToSave can have arrays of different properties (have parasite Properties)
        ex: 
            DataToSave = 
            [
                [{title:"Resources"}, {title:"_name"},{title:"Ford Scape"}, ...],
                [{title:"Contacts"}, {title:"_name"},{title:"Anilson Cardoso"}, ...],
                [{title:"Variables"}, {title:"_class1"},{title:"Maintenance"}, ...]
                [...],
                ...
            ]    
*/
    function insertDataIntoKPI(actionData, actionID, objReference, upperReload) 
    {
        //let formatObj = apps.reporter_2.Indicators.children;
        let objRef = propertyRef;
    
        function propertyStoreObj(Data, Buffer)
        {   
            this.psData     = Data;
            this.psBuffer   = Buffer;
        } 
            
            
        function actionDateTime(status, datetime) 
        {
            if (!(datetime)) return;
        
            let {_create, Start, End, _actualend, _grace} = datetime[0];
            let [cdt]=(aux_existence(_create))?_create: Start, [sdt]=Start, [edt]=End, [aedt]=(aux_existence(_actualend))?_actualend: End, [gdt]=_grace;
            let now = new Date().getTime();
            let tweentyfour = 86400000; //86400000
            let dtCode, dtColor, dtTerm="VeryShort";
            let kpo=0, kpe=0, kpi=0, points=0;

/*

            |---------------------------|---------------------------|---------------------------|---------------------------| {open status} 
            creation                    start                       end                         actualend                   grace  
            (now < start) = white
            
            
            
            |---------------------------|---------------------------|---------------------------|---------------------------| {open status} 
            creation                    start                       end                         actualend                   grace              
                                         (start <= now < (end - 24)) = green



                                                       (end - 24)       (end + 24)
            |---------------------------|-----------------------|---|---|-----------------------|---------------------------| {open status} 
            creation                    start                       end                         actualend                   grace  
                                                                   ((end - 24) < now < end) = yellow     
                                                                     (end < now < (end + 24) <=> (end + grace)) = violet
            
            

            |---------------------------|---------------------------|---------------------------|---------------------------| {open status} 
            creation                    start                       end                         actualend                   grace  
                                                                     ((end + 24) <=> (end + grace) < now) = red        
                                                                     
                                                                     
                                                                     
            ----------------------      ----------------------      ----------------------      ----------------------      ----------------------                                                                         
                                                                     
                                                                     
                                                                     
                                                                     
             |---------------------------|---------------------------|---------------------------|---------------------------| {close status} 
            creation                    start                       end                         actualend                   grace  
            (actualend < start) = white
            
            
            
            |---------------------------|---------------------------|---------------------------|---------------------------| {close status} 
            creation                    start                       end                         actualend                   grace              
                                         (start <= actualend < (end - 24)) = green



                                                       (end - 24)       (end + 24)
            |---------------------------|-----------------------|---|---|-----------------------|---------------------------| {close status} 
            creation                    start                       end                         actualend                   grace  
                                                                   ((end - 24) < actualend < end) = yellow     
                                                                     (end < actualend < (end + 24) <=> (end + grace)) = violet
            
            

            |---------------------------|---------------------------|---------------------------|---------------------------| {close status} 
            creation                    start                       end                         actualend                   grace  
                                                                     ((end + 24) <=> (end + grace) < actualend) = red        
                                               
*/
                              
            if(Number(status)!==1)
            {
                let notchecked = true;
                if((((Number(edt) + Number(tweentyfour)) < now)&&((Number(edt) + Number(gdt)) < now))&&(notchecked))
                {  
                    code=5; 
                    notchecked  = false; 
                    dtCode      = "#ff0000"; 
                    dtColor     = "Red"; 
                    kpe         = -1; 
                    points      = -300;
                }      //red
                
                if((Number(edt) < now)&&((now < (Number(edt) + Number(tweentyfour)))||(now < (Number(edt) + Number(gdt))))&&(notchecked))
                {  
                    code=4; 
                    notchecked  = false; 
                    dtCode      = "#ab57a2"; 
                    dtColor     = "Violet";
                    kpe         = 0.05; 
                    points      = 0;
                }      //violet
                
                if(((Number(edt) - tweentyfour) < now)&&(now < Number(edt))&&(notchecked))
                {  
                    code=2; 
                    notchecked  = false; 
                    dtCode      = "#ab6b0d";
                    dtColor     = "Yellow"; 
                    kpe         = 0.0667; 
                    points      = 0;
                }      //yellow
                
                if((Number(sdt) <= now)&&(now < (Number(edt) - tweentyfour))&&(notchecked))
                {  
                    code=3; 
                    notchecked  = false; 
                    dtCode      = "#008000"; 
                    dtColor     = "Green"; 
                    kpe         = 0.0667; 
                    points      = 0;
                }      //green
                
                if(now < Number(sdt))
                {  
                    code=1; 
                    notchecked  = false; 
                    dtCode      = "#ffffff"; 
                    dtColor     = "White"; 
                    kpe         = 0.0667;
                    points      = 0;
                }      //white
            }
            else
            {
                let notchecked = true;
                if(((Number(edt) + Number(tweentyfour)) < Number(aedt))&&((Number(edt) + Number(gdt)) < Number(aedt))&&(notchecked))
                {  
                    code=5; 
                    notchecked  = false; 
                    dtCode      = "#ff0000"; 
                    dtColor     = "Red"; 
                    kpe         = -1, 
                    points      = -300;
                }      //red
                
                if((Number(edt) < Number(aedt))&&((Number(aedt) < (Number(edt) + Number(tweentyfour)))||(Number(aedt) < (Number(edt) + Number(gdt))))&&(notchecked))
                {  
                    code=4; 
                    notchecked  = false; 
                    dtCode      = "#ab57a2"; 
                    dtColor     = "Violet"; 
                    kpe         = 0.05;
                    points      = 0;
                }      //violet
                
                if(((Number(edt) - tweentyfour) < Number(aedt))&&(Number(aedt) < Number(edt))&&(notchecked))
                {  
                    code=2; 
                    notchecked  = false; 
                    dtCode      = "#ab6b0d"; 
                    dtColor     = "Yellow"; 
                    kpe         = 0.0667; 
                    points      = 0;
                }      //yellow
                
                if((Number(sdt) <= Number(aedt))&&(Number(aedt) < (Number(edt) - tweentyfour))&&(notchecked))
                {  
                    code=3; 
                    notchecked  = false; 
                    dtCode      = "#008000";
                    dtColor     = "Green"; 
                    kpe         = 0.0667; 
                    points      = 0;
                }      //green
                
                if(Number(aedt) < Number(sdt))
                {  
                    code=1; 
                    notchecked  = false; 
                    dtCode      = "#ffffff"; 
                    dtColor     = "White"; 
                    kpe         = 0.0667; 
                    points      = 0;
                }      //white    
            }



            let notConfirmed = true;
        
            if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24 * 365))&&(notConfirmed)){  dtTerm = "VeryLong";      notConfirmed=false; kpo=0.0667;  points=100;    }           //VeryLong:     more than (24 * 365) hours = 1 year
            if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24 * 180))&&(notConfirmed)){  dtTerm = "Long";          notConfirmed=false; kpo=0.05;    points=80;     }           //Long:         more than (24 * 180) hours = 6 months
            if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24 * 90))&&(notConfirmed)){   dtTerm = "SlightLong";    notConfirmed=false; kpo=0.04;    points=65;     }           //SlightLong:   more than (24 * 90) hours = 3 months 
            if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24 * 30))&&(notConfirmed)){   dtTerm = "Standard";      notConfirmed=false; kpo=0.03;    points=40;     }           //Standart:     more than (24 * 30) hours = 1 month
            if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24 * 7))&&(notConfirmed)){    dtTerm = "SlightShort";   notConfirmed=false; kpo=0.02;    points=25;     }           //SlightShort:  more than (24 * 7) hours = 1 week
            if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24))&&(notConfirmed)){     dtTerm = "Short";            notConfirmed=false; kpo=0.01;    points=15;     }           //Short:        more than 24 hours
            if(((Number(edt) - Number(sdt)) <= (60 * 60 * 1000 * 24))&&(notConfirmed)){     dtTerm = "VeryShort";        notConfirmed=false; kpo=0.0085;  points=5;      }           //VeryShort:    less than 24 hours
            
            if(!aux_existence(dtTerm))
            {   console.log("dtTerm with Problems: ", sdt, edt);    }
                                    
            return  [
                        [{title: "DateTime", kpi:0.0667, kpo:0, kpe:0, report:true}, {title: "Terms", kpo:0}, {title:dtTerm, kpo:kpo, points:points}], 
                        [{title: "DateTime", kpi:0.0667, kpo:0, kpe:0}, {title: "Status", kpe:0}, {title:dtColor, kpe:kpe, points:points}], 
                        [{title: "DateTime", kpi:0.0667, kpo:0, kpe:0}, {title: "Start", report:false}, {title:Start.toString(), report:false}],
                        [{title: "DateTime", kpi:0.0667, kpo:0, kpe:0}, {title: "End", report:false}, {title:End.toString(), report:false}]
                    ];
        }
    
        
        function processDefault(robj, actionProperty, arrr, secondaryCall) 
        {
            let arr2=[], arr4=[];
            let subgroup = false;
    
            function valueObjectifier(propertyArr, obj, key) 
            {
                if (Array.isArray(propertyArr[key])) 
                {
                    for(let propertyString of propertyArr[key]) 
                    {
                        if((propertyString)&&(typeof propertyString === 'string'))
                        {   return {title: propertyString};   }
                        else
                        {
                            if(propertyString instanceof Object)
                            {   return {title: "na"};  }
                        }
                    }
                }
                return "";
            }
            
            
            function handleArr(ra, arr, p)
            {
                for (let pobj of ra) 
                {
                    let arr1 = [...arr];
                    if (aux_existence(pobj)) 
                    {
                        let o2 = valueObjectifier(actionProperty, ra, pobj.title);
                        if (o2 !== "") 
                        {
                            let o1 = {title: pobj.title};
                            arr1.push(o1);

                            if(o2.title!=="na")
                            {   
                                arr1.push(o2); 
                                                   
                                let subResult = processDefault(pobj, actionProperty, arr1, true);
                                subgroup = subResult.subgroup;
                                if (pobj["exception"]) 
                                {   arr2.push(subResult.value);                                  } 
                                else 
                                {
                                    if ((secondaryCall) && (secondaryCall !== undefined)) 
                                    {   arr2 = subResult.value;       } 
                                    else 
                                    {   arr2.push(subResult.value);   }
                                } 
                            }
                            else
                            {   
                                let arr3  = [];
                                arr3.push([...arr2]);
                                subgroup = true;
                                arr3.push(...saveToPropertyStore(pobj, actionProperty[pobj.title], arr1, true));  
                                arr2 = [...arr3];
                            }
                        }
                        else
                        {   arr1=[""];  }
                    }
                }
                
                return arr2;
            }
            
            
            function handleObj(ro, arr, p)
            {
                for (let pobj in ro) 
                {
                    let arr1 = [...arr];
                    if (actionProperty[pobj]) 
                    {
                        let o2 = valueObjectifier(actionProperty, ro, pobj);
                        if (o2 !== "") 
                        {
                            let o1 = {title: pobj};
                            if (ro[pobj].kpo){o1.kpo = ro[pobj].kpo;}
                            if (ro[pobj].kpe){o1.kpe = ro[pobj].kpe;}
                            arr1.push(o1);

                            if(o2.title!=="na")
                            {   
                                arr1.push(o2); 
                                                   
                                let subResult = processDefault(ro[pobj], actionProperty, arr1, true);
                                subgroup = subResult.subgroup;
                                if (ro[pobj]["exception"]) 
                                {   
                                    arr2.push(subResult.value);  
                                   
                                } 
                                else 
                                {
                                    if ((secondaryCall) && (secondaryCall !== undefined)) 
                                    {   arr2 = subResult.value;       } 
                                    else 
                                    {   arr2.push(subResult.value);   }
                                } 
                            }
                            else
                            {   
                                let arr3  = [];
                                arr3.push([...arr2]);
                                subgroup = true;
                                arr3.push(...saveToPropertyStore(ro[pobj], actionProperty[pobj], arr1, true));  
                                arr2 = [...arr3];
                            }
                        }
                        else
                        {   arr1=[""];  }
                    }
                }
                
                return arr2;
            }
            
            
    
    
            if((robj) && (actionProperty)) 
            {
                let ro = (robj.children)? robj.children: robj;
                
                if(Array.isArray(ro))
                {   arr4 = handleArr(ro, arrr, actionProperty);    }
                else
                {   arr4 = handleObj(ro, arrr, actionProperty);    } 
            }
            
            
/*
            console.log("arrr: ", arrr);
            return arr2.length > 0 ? arr2 : arrr;
*/
            let objProcessed = {value: arr4.length > 0 ? arr4 : arrr, subgroup:subgroup}
            return objProcessed;
        }
        
        
        function saveToPropertyStore(oData, pData, arr) 
        {
            let thisReturner = [];
    
    
            if((oData)&&(pData))
            {
/*
                for (let iterateAction of pData) 
                {   thisReturner.push(...processDefault(oData, iterateAction, arr));  }
*/
                for (let iterateAction of pData) 
                {   
                    let obj = processDefault(oData, iterateAction, arr);
                    
                    if(obj.subgroup)
                    {   thisReturner = obj.value[0]; }
                    else
                    {   thisReturner.push(...obj.value); }
                }
            }
    
            return thisReturner;
        }
    
        
        //for (let property in objReference) 
        //for (let i0=0, i1=Object.entries(objReference), i2=i1.length; i0<i2; i0++) 
        for (let i0=0, i1=objRef, i2=i1.length; i0<i2; i0++) 
        {
            let DataToSave, lowerReload=(i0<(i2-1))? false: true;
            let updateNotConfirmed = true;
            let pkey    = i1[i0].title;
            let pvalue  = i1[i0];
            
            console.log("Property: ", pkey);
            
            
            if(aux_existence(actionData[pkey]))
            {
                let o = {title:pkey};
    
                let noKeyProcessedYet = true;
                
                
                if (pkey === "Description") 
                {
                    if(actionData[pkey])
                    {   
                        DataToSave = [[o]]; 
                        noKeyProcessedYet = false;
                    } 
                }
    
    
                if (pkey === "Status") 
                {
                    let oo = {};
                    if (parseInt(actionData[pkey]) !== 0) 
                    {
                        actionData[pkey] = [{Closed: ["na"]}];
                        oo.title  = "Closed";
                        oo.kpe    = 1;
                        oo.points = 100;
                    } 
                    else 
                    {   
                        actionData[pkey] = [{Open: ["na"]}];
                        oo.title = "Open";
                    }
                    DataToSave = [[o, oo]];
                    noKeyProcessedYet = false;
                    
/*
This block will output ==>
    DataToSave = [[{title:"Status"},{title:"Closed/Open"}]]
*/
                }
    
    
                if (pkey === "DateTime") 
                {
                    console.log(actionData[pkey]);
                    DataToSave = actionDateTime(actionData["Status"], actionData[pkey]);
                    noKeyProcessedYet = false;
                }
    
    
                if (pkey === "Category") 
                {
                    if(o.title==="..."){    o.kpi=0;    }
                    
                    let oo = [o];
                    for (let ao of actionData[pkey]) 
                    {
                        oo.push({
                            title: ao["_name"][0],
                            kpo: (ao["_name"][0]!=="...")? 0.012: -0.4,
                            kpi: (ao["_name"][0]!=="...")? 0.0667: 0,
                            points: (ao["_name"][0]!=="...")? 20: -40,
                        });
                    }
                    DataToSave = [oo];
                    noKeyProcessedYet = false;
                }
                
                
                if(pkey === "ListItem")
                {
                    noKeyProcessedYet = false;
                }
                
                
                if (pkey === "Contacts") 
                {


                    noKeyProcessedYet = false;
                }  
                
                
                if (pkey === "Locations") 
                {


                    noKeyProcessedYet = false;
                } 
                
                
                if (pkey === "Transactions") 
                {
                    let t = [];
                    for(let t0 of actionData[pkey])
                    {
                        if(aux_existence(t0))
                        {
                            if(aux_existence(t0["_resources"]))
                            {
                                for(let r of t0["_resources"])
                                {
                                    let v_1=[{title:"Transfer Out"},{title:r["_measure1"][0], specific:r["_value1"][0]}];
                                    let v_2=[{title:"Transfer In"},{title:r["_measure2"][0], specific:r["_value2"][0]}];
                                    
                                    let r_1=[{title:r["_resource1"][0]}, ...v_1];
                                    let r_2=[{title:r["_resource2"][0]}, ...v_2];
                                    
                                    let c_1=[{title:t0["_contact1"][0]}, ...r_1];
                                    let c_2=[{title:t0["_contact2"][0]}, ...r_2];
        
                                    let ref1=[{title:"Reference"},{title:t0["_dtReference"][0]}, ...c_1];
                                    let ref2=[{title:"Reference"},{title:t0["_dtReference"][0]}, ...c_2];
                                    
                                    let conf1=[{title:"Confirmation"},{title:r["_confirmed"][0]}, ...ref1];
                                    let conf2=[{title:"Confirmation"},{title:r["_confirmed"][0]}, ...ref2];
                                    
                                    let conf3=[{title:"Confirmation"},{title:r["_confirmed"][0]},{title:r["_resource1"][0]}];
                                    let conf4=[{title:"Confirmation"},{title:r["_confirmed"][0]},{title:r["_resource2"][0]}];
                                    
                                    let nam1=[{title:"_name"},{title:t0["_name"][0]}, ...conf3];
                                    let nam2=[{title:"_name"},{title:t0["_name"][0]}, ...conf4];  
                                    
                                    let nam3=[{title:"_name"},{title:t0["_name"][0]}, ...r_1];
                                    let nam4=[{title:"_name"},{title:t0["_name"][0]}, ...r_2]; 
                                    
                                    let nam5=[{title:"_name"},{title:t0["_name"][0]}, ...c_1];
                                    let nam6=[{title:"_name"},{title:t0["_name"][0]}, ...c_2]; 

                                    let nam7=[{title:"_name"},{title:t0["_name"][0]}, ...v_1];
                                    let nam8=[{title:"_name"},{title:t0["_name"][0]}, ...v_2]; 
                                    
                                    let class21=[{title:"_class2"},{title:t0["_class2"][0]}, ...nam1];
                                    let class22=[{title:"_class2"},{title:t0["_class2"][0]}, ...nam2];  
                                    
                                    let class11=[{title:"_class1"},{title:t0["_class1"][0]}, ...class21];
                                    let class12=[{title:"_class1"},{title:t0["_class1"][0]}, ...class22];                               
                                    
                                    t.push([o, ...class11]);
                                    t.push([o, ...class12]);
                                    
                                    t.push([o, ...class21]);
                                    t.push([o, ...class22]);
                                    
                                    t.push([o, ...conf1]);
                                    t.push([o, ...conf2]);  
                                    
                                    t.push([o, ...nam1]);
                                    t.push([o, ...nam2]);                            
                                    
                                    t.push([o, ...nam3]);
                                    t.push([o, ...nam4]);                                     

                                    t.push([o, ...nam5]);
                                    t.push([o, ...nam6]); 
                                    
                                    t.push([o, ...ref1]);
                                    t.push([o, ...ref2]);                            
        
                                    t.push([o, ...c_1]);
                                    t.push([o, ...c_2]);                            
                                    
                                    t.push([o, ...r_1]);
                                    t.push([o, ...r_2]);                             
        
                                    t.push([o, ...v_1]);
                                    t.push([o, ...v_2]); 
                                    
                                    t.push([{title:"Contacts"},{title:"_name"}, ...c_1]);
                                    t.push([{title:"Contacts"},{title:"_name"}, ...c_2]);     
                                    
                                    t.push([{title:"Resources"},{title:"_name"},{title:r["_resource1"][0]}, {title:"Variables"}, ...v_1]);
                                    t.push([{title:"Resources"},{title:"_name"},{title:r["_resource2"][0]}, {title:"Variables"}, ...v_2]); 
                                    
                                    t.push([{title:"Resources"},{title:"_name"},{title:r["_resource1"][0]},{title:"Contacts"}, ...r_1]);
                                    t.push([{title:"Resources"},{title:"_name"},{title:r["_resource2"][0]},{title:"Contacts"}, ...r_2]);                             
        
                                    t.push([{title:"Resources"},{title:"_name"},{title:r["_resource1"][0]},{title:"Transactions"},{title:t0["_name"][0]}]);
                                    t.push([{title:"Resources"},{title:"_name"},{title:r["_resource2"][0]},{title:"Transactions"},{title:t0["_name"][0]}]);    
                                    
                                    //t.push([{title:"Resources"},{title:"_name"}, ...r_1]);
                                    //t.push([{title:"Resources"},{title:"_name"}, ...r_2]); 

                                    t.push([{title:"Variables"},{title:"_name"}, ...v_1]);
                                    t.push([{title:"Variables"},{title:"_name"}, ...v_2]);                             
                                }
                            }
                        }
                    }
                    
                    DataToSave = t;
                    noKeyProcessedYet = false;
                } 
                
                
                if (pkey === "Resources") 
                {
                    let t = [];
                    for(let r0 of actionData[pkey])
                    {
                        if(aux_existence(r0))
                        {
                            //let nam1=[{title:"_name"},{title:r0["_name"][0]},{title:"DateTime"},{title:v["_ldatetimeRef"]},{title:"Reference"},{title:v["_lreference"]}];
                            //let nam2=[{title:"_name"},{title:r0["_name"][0]},{title:"Reference"},{title:v["_lreference"]},{title:"DateTime"},{title:v["_datetimeRef"]}];
                                  
                            if(aux_existence(r0["Variables"]))
                            {
                                for(let v of r0["Variables"])
                                {
                                    if(aux_existence(v["_vname"]))
                                    {
                                        try
                                        {
                                            //let var1=[{title:"Variables"},{title:"_name"},{title:v["_vname"][0]},{title:"Measures"},{title:v["Measure"][0]},{title:v["vdatetimeRef"][0]},{title:"Value"},{title:v["Value"][0]}];
                                            let var1=[{title:"Variables"},{title:"_name"},{title:v["_vname"][0]},{title:"Measures"},{title:v["Measure"][0]},{title:v["vdatetimeRef"][0]},{title:"Value"},v["Value"][0]];
                                            let var2=[{title:"Variables"},{title:"_name"},{title:v["_vname"][0]},{title:"Measures"},{title:v["Measure"][0]},{title:v["vdatetimeRef"][0]},{title:"Reference"},{title:v["_vreference"][0]}];
                                            let var3=[{title:"Variables"},{title:"_name"},{title:v["_vname"][0]},{title:"Measures"},{title:v["Measure"][0]},{title:"Reference"},{title:v["_vreference"][0]},{title:"Value"},{title:v["Value"][0]}];
                                            let var4=[{title:"Variables"},{title:"_name"},{title:v["_vname"][0]},{title:"Measures"},{title:v["Measure"][0]},{title:v["vdatetimeRef"][0]},{title:"UpdateBy"},{title:v["_uvcontact"][0]}];
                                            
                                            let nam1=[{title:"_name"},{title:r0["_name"][0]},{title:"DateTime"},{title:v["vdatetimeRef"][0]},{title:"Reference"},{title:v["_vreference"][0]}];
                                            let nam2=[{title:"_name"},{title:r0["_name"][0]},{title:"Reference"},{title:v["_vreference"][0]},{title:"DateTime"},{title:v["vdatetimeRef"][0]}];
                                            
                                            let nam3=[{title:"_name"},{title:r0["_name"][0]},...var1];
                                            let nam4=[{title:"_name"},{title:r0["_name"][0]},...var2];
                                            let nam5=[{title:"_name"},{title:r0["_name"][0]},...var3];
                                            let nam6=[{title:"_name"},{title:r0["_name"][0]},...var4];
                                            
                                            let ref1=[{title:"Reference"},{title:v["_vreference"][0]},{title:"DateTime"},{title:v["vdatetimeRef"][0]}];
                                            let ref2=[{title:"Reference"},{title:v["_vreference"][0]},{title:"_name"},{title:v["_vname"][0]}];
                                            
                                            if(aux_existence(r0["_class2"]))
                                            {
                                                let class21=[{title:"_class2"},{title:r0["_class2"][0]}, ...nam1];
                                                let class22=[{title:"_class2"},{title:r0["_class2"][0]}, ...nam2]; 
                                                
                                                t.push([o, ...class21]);
                                                t.push([o, ...class22]);
                                            }

                                            if(aux_existence(r0["_class1"]))
                                            {                                            
                                                let class11=[{title:"_class1"},{title:r0["_class1"][0]}, ...class21];
                                                let class12=[{title:"_class1"},{title:r0["_class1"][0]}, ...class22];   
                                                
                                                t.push([o, ...class11]);
                                                t.push([o, ...class12]);                                                
                                            }
                                            


                                            t.push([o, ...nam1]);
                                            t.push([o, ...nam2]);  
                                            
                                            t.push([o, ...nam3]);
                                            t.push([o, ...nam4]);                                     
        
                                            t.push([o, ...nam5]);
                                            t.push([o, ...nam6]); 
                                            
                                            t.push([o, ...ref1]);
                                            t.push([o, ...ref2]);                            
                                            
                                            t.push([ ...var1]);
                                            t.push([ ...var2]); 
                                            t.push([ ...var3]);
                                            t.push([ ...var4]);   
                                        }
                                        catch(e)
                                        {   console.error(`actionID: ${actionData.id} / property: ${pkey} / ${v}`); }
                                    }
                                }
                            }
                           
                            
                            if(aux_existence(r0["Contacts"]))
                            {
                                for(let c of r0["Contacts"])
                                {
                                    let cont1 = [{title:c["_cname"][0]},{title:"DateTime"},{title:c["_cdatetimeRef"][0]}];
                                    let cont2 = [{title:c["_cname"][0]},{title:"Reference"},{title:c["_creference"][0]}];
                                    
                                    let cont3=[{title:"Contacts"}, ...cont1];
                                    let cont4=[{title:"Contacts"}, ...cont2];
                                                                        
                                    let nam3=[{title:"_name"},{title:r0["_name"][0]}, ...cont3];
                                    let nam4=[{title:"_name"},{title:r0["_name"][0]}, ...cont4];
                                    
                                    let ref1=[{title:"Reference"},{title:c["_creference"][0]}, ...cont1];
                                    let ref2=[{title:"Reference"},{title:c["_creference"][0]}, ...cont3];
                                    
                                    let class21=[{title:"_class2"},{title:r0["_class2"][0]}, ...nam3];
                                    let class22=[{title:"_class2"},{title:r0["_class2"][0]}, ...nam4];  
                                    
                                    let class11=[{title:"_class1"},{title:r0["_class1"][0]}, ...class21];
                                    let class12=[{title:"_class1"},{title:r0["_class1"][0]}, ...class22];                               
                                    
                                    
                                    t.push([o, ...class11]);
                                    t.push([o, ...class12]);
                                    
                                    t.push([o, ...class21]);
                                    t.push([o, ...class22]);
                                    
                                    t.push([o, ...nam3]);
                                    t.push([o, ...nam4]);  
                                    
                                    t.push([o, ...cont3]);
                                    t.push([o, ...cont4]);     
                                    
                                    t.push([...cont3]);
                                    t.push([...cont4]);    
                                }
                            }

                            
                            if(aux_existence(r0["Locations"]))
                            {
                                for(let l of r0["Locations"])
                                {
                                    let loc1 = [{title:l["_lname"][0]},{title:"DateTime"},{title:l["_ldatetimeRef"][0]}];
                                    let loc2 = [{title:l["_lname"][0]},{title:"Reference"},{title:l["_lreference"][0]}];
                                    
                                    let loc3=[{title:"Locations"}, ...loc1];
                                    let loc4=[{title:"Locations"}, ...loc2];
                                                                        
                                    let nam3=[{title:"_name"},{title:r0["_name"][0]}, ...loc3];
                                    let nam4=[{title:"_name"},{title:r0["_name"][0]}, ...loc4];
                                    
                                    let ref1=[{title:"Reference"},{title:l["_lreference"][0]}, ...loc1];
                                    let ref2=[{title:"Reference"},{title:l["_lreference"][0]}, ...loc3];
                                    
                                    let class21=[{title:"_class2"},{title:r0["_class2"][0]}, ...nam3];
                                    let class22=[{title:"_class2"},{title:r0["_class2"][0]}, ...nam4];  
                                    
                                    let class11=[{title:"_class1"},{title:r0["_class1"][0]}, ...class21];
                                    let class12=[{title:"_class1"},{title:r0["_class1"][0]}, ...class22];                               
                                    
                                    
                                    t.push([o, ...class11]);
                                    t.push([o, ...class12]);
                                    
                                    t.push([o, ...class21]);
                                    t.push([o, ...class22]);
                                    
                                    t.push([o, ...nam3]);
                                    t.push([o, ...nam4]);  
                                    
                                    t.push([o, ...loc3]);
                                    t.push([o, ...loc3]);     
                                    
                                    t.push([...loc3]);
                                    t.push([...loc4]); 
                                }
                            }
                        }
                    }
                    
                    DataToSave = t;
                    noKeyProcessedYet = false;
                } 


                if (pkey === "Attachments") 
                {


                    noKeyProcessedYet = false;
                }     
    
    
                if(pkey === "Comments")
                {
                    let a1=[], a2=[];
                    for (let ao of actionData[pkey]) 
                    {
                        if(aux_existence(ao["_name"]))
                        {
                            if(ao["_name"][0]!==sessionStorage.username)
                            {  ao["External"] = ao["_name"];}
                            else
                            {  ao["Current"] = ao["_name"];}
                            
                            a1.push(ao);
                        }
                    }   
                    if(aux_existence(a1))
                    {  
                        actionData[pkey] = [...a1]; 
                        noKeyProcessedYet = false;                        
                    }
                }
    
    
                if ((!DataToSave) || (DataToSave === undefined))
                    DataToSave = saveToPropertyStore(pvalue, actionData[pkey], [o]);
    
    
    
                if(aux_existence(DataToSave))
                {   console.log("Output: ", DataToSave); }
                else
                {   console.log("Existing Data Not Processed");}
                
                
                
                storeKPI(pkey, DataToSave, actionID, upperReload, lowerReload); 
                updateNotConfirmed = false;
            }
            
            if((updateNotConfirmed)&&(lowerReload)&&(upperReload))
            {   loadData(); }
        }
    }
    
    
    function addNew_Object(plist, reLoad)
    {
        let pNotConfirmated = true;
        let endMessage = "";
        
        let addToStore = objStore.put(editaction);
            addToStore.onerror   = function(e){console.log("Something wrong with adding new object: ", addToStore.error, editaction.internalCode);};
            addToStore.onsuccess = function(e)
                                   {
                                        let newActionID = e.target.result;

                                        insertDataIntoKPI(editaction, newActionID, plist, reLoad);
                                   };   
    }


    function update_Object(plist, reLoad)
    {
        let endMessage="";
            objStore.get(parseInt(id)).onsuccess = function(e)
            {
                let DataToUpdate = e.target.result;
                
                let update_obj = {};
                let dynamicObj = [];
                let dynamicBuffer = new Map();  
                 
                for(let i in editaction)
                {  
                    if(JSON.stringify(editaction[i])!==JSON.stringify(DataToUpdate[i]))
                    {   
                        if(aux_existence(DataToUpdate[i]))
                        {   deleteActionFromPropertyStore(i, parseInt(id));     }
                        
                        DataToUpdate[i] = editaction[i]; 
                        update_obj[i]   = editaction[i]; 
                    }  
                }

                let updateToStore = objStore.put(DataToUpdate); 
                    updateToStore.onerror   = function(){   console.log("Something wrong with updating an object: ", updateToStore.error, editaction.internalCode);  };
                    updateToStore.onsuccess = function(){   insertDataIntoKPI(update_obj, id, plist, reLoad);  };
            };        
    }
    

    
    if(aux_existence(editaction))
    {
        if(indexerID!=="newAction")
        {
            if(indexerID!=="")
            {   //existing objectData coming from local form
                indexArr = indexerID.split("_");
                id = parseInt(indexArr.pop());  
                update_Object(propertyReference, reLoadPage);
            }
            else
            {   
                let IndexedStore = objStore.index("actionOuterReference");
                let objToLoad = IndexedStore.get(editaction.ExternalCode);
                    objToLoad.onerror   =   function(){ console.log("Something wrong with getting an object from externalcode: ", objToLoad.error, editaction.ExternalCode);  };
                    objToLoad.onsuccess =   function(e)
                                            {  
                                                if(e.target.result)
                                                {
                                                    id = parseInt(e.target.result.id);
                                                    update_Object(propertyReference, reLoadPage); 
                                                }
                                                else
                                                {
                                                    id = parseInt(editaction.id);    
                                                    addNew_Object(propertyReference, reLoadPage);
                                                }
                                            };
            }
        }
        else
        {   addNew_Object(propertyReference, reLoadPage); }
    }
}




/*
updateStore.js ==>> aaaaaa111111();
Explanation:
     (!aux_existence(kpc))||= kpc.push(parseInt(id)):
        if(aux_existence(kpc)===false){ kpc.push(parseInt(id));  }

*/
function storeKPI(Property, actionData, id, resetter, reloader) 
{
    function insertNewPropertyArray(newData) 
    {
        let i = 0, obj_Package = "", noRunBefore = true, record = [];
    
        if (Array.isArray(newData)) 
        {
            i = parseInt(newData.length) - 1;
            record = newData;
        } 
        else 
        {   record[0] = newData; }
    
        while (i > -1) 
        {
            let gid = [parseInt(id)], lid=[];
            let { title="", report=true, dimensional:dimension=false, dataindex=false, kpi=0, kpo=0, kpe=0 } = record[i];
    
            if (noRunBefore) 
            {
                lid = [parseInt(id)];
                noRunBefore = false;
            }
          
            if (title !== "") 
            {
                obj_Package = 
                {
                    title: title.trim(),
                    report: report,
                    dimensional: dimension,
                    dataindex: dataindex,
                    kpi: kpi,
                    kpo: kpo,
                    kpe: kpe,
                    children: (aux_existence(obj_Package))? [obj_Package]: [], //insert Package inside Package
                    ids: { Local: lid, Global: gid }
                };
            }
            i--;
        }
    
        return obj_Package;
    }

    
    function handlePropertyMatch(storeArrBlock, newArr)
    {
        let title;  
        
        if(storeArrBlock.ids)
        {
            if(storeArrBlock.ids.Global.indexOf(parseInt(id))===-1)
            {  storeArrBlock.ids.Global.push(parseInt(id));    }  
        }
                
        newArr.shift();        
        if(aux_existence(storeArrBlock.children))
        {
            if(aux_existence(newArr))
            {
                let noMatchFound=true, {title}=newArr[0];
                for(let obj of storeArrBlock.children)
                {
                    if(title===obj.title)
                    {   
                        noMatchFound = false;
                        obj = handlePropertyMatch(obj, newArr);
                    }
                }
                
                if(noMatchFound)
                {   storeArrBlock.children.push(insertNewPropertyArray(newArr));    }
            }
            else
            {   
                if(storeArrBlock.ids.Local.indexOf(parseInt(id))===-1)
                {  storeArrBlock.ids.Local.push(parseInt(id));    }
            }
        }
        else
        {
            if(aux_existence(newArr))
            {   storeArrBlock.children=[insertNewPropertyArray(newArr)]; }
            else
            {   
                if(aux_existence(storeArrBlock.ids.Local))
                {
                    if(storeArrBlock.ids.Local.indexOf(parseInt(id))===-1)
                    {  storeArrBlock.ids.Local.push(parseInt(id));    }
                }
                else
                {  storeArrBlock.ids.Local= [parseInt(id)];    }
            }
        }
        
        return storeArrBlock;
    }



    if((aux_existence(actionData))&&(aux_existence(id)))
    {
        let propertyStore = apps.dbConnection.transaction(["PerformanceStore"], "readwrite").objectStore("PerformanceStore");
        let dataRequest = propertyStore.get("Indicators");
        dataRequest.onsuccess = function (ee1) 
        {
            let dataProperty = ee1.target.result;
            if (aux_existence(dataProperty)) 
            {
                try 
                {
                    if(Property==="Priority")
                    {
                        let checker;
                    }
                    
                    for (var arr of actionData) 
                    {
                        if (aux_existence(arr)) 
                        {
                            if((aux_existence(arr[0])))
                            {
                                let { title = "" } = arr[0];
                                if (aux_existence(title)) 
                                {
                                    let propertyNotFound = true;
                                    for(let objProperty of dataProperty.children)
                                    {
                                        if(objProperty.title === title)
                                        {
                                            objProperty = handlePropertyMatch(objProperty, arr);
                                            propertyNotFound = false;
                                            break;
                                        }
                                    }
                                    
                                    if(propertyNotFound)
                                    {
                                        insertNewPropertyArray(arr);
                                    }
                                }
                            }
                            else
                            {   console.log("Corrupted data: ", id, arr);   }
                        }
                    }

                    let re = propertyStore.put(dataProperty);

                    re.onsuccess = function () 
                    {
                        if (resetter) 
                        {
                            console.log("reload Status: " + reloader);
                            console.log("resetter Status: " + id);

                            if (reloader) 
                            {
                                apps.menuReady = true;
                                loadData();
                            }
                        }
                    };
                    
                    re.onerror = function () 
                    {
                        console.log("StoreData error: ", re.error);
                        console.log("Info: ", storeData);
                    };                   
                } 
                catch (err) 
                {   
                    console.log("Property_error: ", Property, err); 
                    console.log("Property_DataArr: ", actionData); 
                    console.log("Property_DataError: ", arr); 
                }
            }
        };
    }
}




/*Updates: 29-Jan-2021
    Jan 13, 2021 (ver 28): object order
    Oct 13, 2024 (ver 183)
        - The deleted action will remain online for about 12 months then it will be removed by the online maintenance system
            Reason: multiple locations can have the action, if it is deleted from a particular location and then from the online store,
                    other locations can still have it and then re-insert into the system (online and all other system)
        - This particular function will only clear performanceStore
*/
function submitActionDataToDelete(editaction, ID, reloadPage)
{
    let id, properties, indexArr;
    let objStore = apps.dbConnection.transaction(["Actions"], "readwrite").objectStore("Actions");    
        objStore.get(parseInt(ID)).onsuccess = function(e)
        {
            let actionToDelete = e.target.result;
            
            actionToDelete["ServerRef"] = "0";    
            actionToDelete["Status"] = "2";
            actionToDelete["Contacts"] = "";
                
            let actionDeleted = objStore.put(actionToDelete);
            actionDeleted.onsuccess = function()
            {    
                for(let i=0, iLen=apps.properties.length; i<iLen; i++)
                {   
                    if(aux_existence(actionToDelete[apps.properties[i]]))
                    {   deleteActionFromPropertyStore(apps.properties[i], actionToDelete.id);   }  
                    
                    if(reloadPage && (i===(iLen-1))){   loadData(); }
                } 
            };
        };
}




/*
function deleteActionFromPropertyStore(Property, ID)
{
    function searchDeeperIntoArray(pArr, replaceID, indexer)
    {  
        if(aux_existence(pArr))
        {
            if(aux_existence(pArr.subLevel))
            {   
                for(let newSubLevel of pArr.subLevel)
                {   newSubLevel = searchDeeperIntoArray(newSubLevel, replaceID, indexer++);  }
            }
            
            if(aux_existence(pArr.ids))
            {
                pArr.ids.Local  =   (function(n, m)
                {
                        let indexID = n.indexOf(parseInt(m));
                        if(indexID!==-1)
                        {   
                            //console.log(`old Local ${pArr.title}:`, n);
                            n.splice(indexID, 1); 
                            //console.log(`new Local ${pArr.title}:`, n);
                        }
                    
                    return n;
                })(pArr.ids.Local, replaceID);  
                    
                    
                pArr.ids.Global =   (function(rdArr, removeID)
                {
                    let newRow = [];
                    for(let row of rdArr)
                    {   
                        if(parseInt(row[0])!==parseInt(removeID))
                        {   newRow.push(row);   }    
                    }
                    
                    //if(rdArr.length!==newRow.length){   console.log(`old Global ${pArr.title}:`, rdArr); console.log(`new Global ${pArr.title}:`, newRow);}
                    return newRow;
                })(pArr.ids.Global, replaceID); 
            }
        }

        return pArr;
    }
                                             

    let deleteFromStore = apps.dbConnection.transaction(["PerformanceStore"], "readwrite").objectStore("PerformanceStore");
    let dataRequest = deleteFromStore.get("kpi");
        dataRequest.onsuccess = function(ee1)
        { 
            let dataProperty = ee1.target.result;
            
            for(let propertyToRemove of dataProperty.data)
            {
                if(propertyToRemove.title===Property)
                {   propertyToRemove = searchDeeperIntoArray(propertyToRemove, ID, 0);   }
            }
            
            
            let deleteConfirmation = deleteFromStore.put(dataProperty); 
            deleteConfirmation.onerror = function(){ console.log("Error deleting " + Property + " from Action:" + ID); }    
        };
}
*/
function deleteActionFromPropertyStore(Property, ID)
{
    function removeFromObj(arr, id)
    {
        if(aux_existence(arr))
        {
            let index = arr.indexOf(parseInt(id));
            if(index!==-1)
            {   arr.splice(index, 1); }
            return arr;
        }
        return [];
    }
    
    function searchDeeperIntoArray(pArr, replaceID, indexer)
    {  
        if(aux_existence(pArr))
        {
            
            if(aux_existence(pArr.children))
            {   
                let newSubLevel = [];
                for(let subItem of pArr.children)
                {   
                    let result = searchDeeperIntoArray(subItem, replaceID, indexer++);
                    if(result !== null) 
                    {   newSubLevel.push(result);  }
                }
                pArr.children = newSubLevel; // Update subLevel with any non-null items
            }
            
            if(aux_existence(pArr.ids))
            {
                pArr.ids.Local  = removeFromObj(pArr.ids.Local, replaceID);
                pArr.ids.Global = removeFromObj(pArr.ids.Global, replaceID);
            }

            // If both Local and Global arrays are empty, return null to indicate the object should be removed{
            if(aux_existence(pArr.ids))
            {
                if (pArr.ids.Local.length === 0 && pArr.ids.Global.length === 0) 
                {   return null;  }
            }
        }

        return pArr;
    }


    let deleteFromStore = apps.dbConnection.transaction(["PerformanceStore"], "readwrite").objectStore("PerformanceStore");
    let dataRequest = deleteFromStore.get("Indicators");
    dataRequest.onsuccess = function(ee1)
    { 
        let dataProperty = ee1.target.result;
        
        // Update the data array by removing any null elements after processing
        dataProperty.children = dataProperty.children.map(propertyToRemove => 
        {
            if (propertyToRemove.title === Property)
            {   return searchDeeperIntoArray(propertyToRemove, ID, 0);    }
            
            return propertyToRemove;
        }).filter(propertyToRemove => propertyToRemove !== null); // Remove any null values
        
        let deleteConfirmation = deleteFromStore.put(dataProperty); 
        deleteConfirmation.onerror = function(){ console.log("Error deleting " + Property + " from Action:" + ID); }    
        deleteConfirmation.onsuccess = function(){  console.log("Deleting " + Property + ", from Action: " + ID);  } 
    };
}




function updateStores(ReturnData, status)
{
    //called from "/focus/focus_test/version_14/javascript/ajax/synchronizeDB.js"
    //requested by  loadStore.js >> openFocusFocusFocusDB() >> downloadWWWDB() 
    //download all actions from backup/online server with higher update-count-reference then local database
    //update-count-reference can be an existing action that been updated externally or a newAction on local database
    if(aux_existence(ReturnData))
    {
        for(let i=0, len=ReturnData.length; i<len; i++)
        {   
            if(aux_existence(ReturnData[i]))
            {  update_action_onObject(ReturnData[i], (i!==(len-1))? false: true);   }
        } 
    }
} 




function updateRequests(status, data)
{
    function requestUpdateButton(index)
    {  document.getElementById(`${apps.environment}_loadRequest`).style.display = "block";   }
    
    

    if(parseInt(status)>=0)
    {   requestUpdateButton(status); }
}




function updateReloadRequest(data)
{
    function requestUpdateButton(index)
    {  document.getElementById(`${apps.environment}_loadRequest`).style.display = "block";   }
    
    

    if(aux_existence(data))
    {   requestUpdateButton(data); }
}




function update_datetimeStore([red, green, white, start, end, nextdatetime])
{
    sessionStorage.nextDateTimeClick = nextdatetime;
    
    let datetimeStore = apps.dbConnection.transaction(["class_Store"], "readwrite").objectStore("class_Store");
    let datetimeRequest = datetimeStore.index("nameIndexer").get('DateTime');
    datetimeRequest.onsuccess = function(ee1)
                                { 
                                    let datetimeData = ee1.target.result; 
                                    
                                    if(datetimeData)
                                    {
                                        let dataDateTime = datetimeData.data;
                                        for(let i=0, len=dataDateTime.length; i<len; i++)
                                        {
                                            if(dataDateTime[i].title==="Redish")
                                            {
                                                let a=red.split(","), b=[];
                                               
                                                for(let c of a)
                                                {   b.push([c]);    }
                                                
                                                dataDateTime[i].special.ID_currentLevel    = a.map(Number);
                                                dataDateTime[i].special.rowData            = b;
                                            }
                                            
                                            
                                            if(dataDateTime[i].title==="Greenish")
                                            {
                                                let a=green.split(","), b=[];
                                               
                                                for(let c of a)
                                                {   b.push([c]);    }
                                                
                                                dataDateTime[i].special.ID_currentLevel    = a.map(Number);
                                                dataDateTime[i].special.rowData            = b;
                                            }
                                            
                                            
                                            if(dataDateTime[i].title==="Whitish")
                                            {
                                                let a=white.split(","), b=[];
                                               
                                                for(let c of a)
                                                {   b.push([c]);    }
                                                
                                                dataDateTime[i].special.ID_currentLevel    = a.map(Number);
                                                dataDateTime[i].special.rowData            = b;
                                            }
                                            
                                            
                                            if(dataDateTime[i].title==="start")
                                            {
                                                let a=[]; b=[];
                                                
                                                for(let c of start)
                                                { 
                                                    a.push(c[0]);
                                                    b.push(c);
                                                }
                                                dataDateTime[i].special.ID_currentLevel    = a.map(Number);
                                                dataDateTime[i].special.rowData            = b;
                                            }
                                            
                                            
                                            if(dataDateTime[i].title==="end")
                                            {
                                                let a=[]; b=[];
                                                
                                                for(let c of end)
                                                { 
                                                    a.push(c[0]);
                                                    b.push(c);
                                                }
                                                dataDateTime[i].special.ID_currentLevel    = a.map(Number);
                                                dataDateTime[i].special.rowData            = b;
                                            }
                                        }
                                        
                                        datetimeData.data = dataDateTime;
                                        let confirmation = datetimeStore.put(datetimeData);
                                        confirmation.onsuccess = function(){load_DateTime_Management(nextdatetime)}
                                    }
                                };
}
