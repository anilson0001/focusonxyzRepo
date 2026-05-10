const Comments = 
{
    instructions: function()
    {
        return  "This property is used to follow the evolution of the current Action, in orther words use it to report the progress of the current action";
    },

    frame: 
    {   
        headFrame:"",
        
        emptyBodyFrame:
        {   
            id:1, 
            idOverRide: 2,
            dMode: "true",
            eDimensionalData: function(b)
            {
                let selectArr_1 = [["Generic","",""],["Plan (PDCA cycle)","",""], ["Do (PDCA cycle)","",""], ["Check (PDCA cycle)","",""], ["Act (PDCA cycle)","",""]];
                let fr="2",txt="",usr="",dt="", rt="";
                
                
                
                if(aux_existence(b))
                {   //existing Comments
                    if(Array.isArray(b))
                    {
                        fr="2";
                        txt=aux_textSignIn(b[1]);
                        dt=(aux_existence(b[3]))? b[3]: DateTime.aux_ParseTo.extendDateTime(DateTime.aux_ParseTo.numericDateTime());
                        usr=aux_existence(b[2])? b[2]: document.getElementById("username").innerText;
                        rt=aux_existence(b[3])? getSelector(selectArr_1, b[3]): getSelector(selectArr_1, "");
                    }
                    else
                    {
                        if(b.indexOf("*|3f4x|*")!==-1)
                        {
                            let bData = b.split("*|3f4x|*");
                            fr = bData[0];
                            txt = aux_textSignIn(bData[1]);
                            dt = DateTime.aux_ParseTo.extendDateTime(DateTime.aux_ParseTo.numericDateTime());
                            usr = document.getElementById("username").innerText;
                            rt=aux_existence(b[3])? b[3]: "Generic";
                        }
                    }
                }
                else
                {   //new Comment
                    dt = DateTime.aux_ParseTo.extendDateTime(DateTime.aux_ParseTo.numericDateTime());
                    usr = document.getElementById("username").innerText;
                }
                
                
                function getSelector(selectData, comparator)
               {
                   returner = "<option value=\"\">Make a Selection</option>";
                   for(let i=0, l=selectData.length; i<l; i++)
                   {    
                           if(comparator!==selectData[i])
                           {    returner += "<option value=\"" + i + "\">" + aux_textSignIn(selectData[i][0]) + "</option>"; }
                           else
                           {    returner += "<option value=\"" + i + "\" selected>" + aux_textSignIn(selectData[i][0]) + "</option>"; }
                   }
                   return returner;
               }
                return [fr, txt, usr, dt, rt];
            },            
            
            eframe:  
            [
                {type:"textarea", codeSelector: 1, attribute: {required: true}},
                {type:"hidden",bodyWrapperHead:"10"},
                {type:"hidden",bodyWrapperHead:"11"},
                {label:"Review Type", type:"select", /*efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]*/}
            ]
        },
 
 
        bodyFrame_v4:
        {   
            id:4, 
            dMode: "true",
            eDimensionalData: function(data)
            {
                let selectArr_1 = [["Generic","",""],["Plan (PDCA cycle)","",""], ["Do (PDCA cycle)","",""], ["Check (PDCA cycle)","",""], ["Act (PDCA cycle)","",""]];
                let fr="2",txt="",usr="",dt="", rt="";
                let thisReturner = [4,"","","",""];

                function getSelector(selectData, comparator)
                {
                    returner = "<option value=\"\">Select Type</option>";
                    for(let i=0, l=selectData.length; i<l; i++)
                    {    
                        if(comparator!==selectData[i])
                        {    returner += "<option value=\"" + i + "\">" + aux_textSignIn(selectData[i][0]) + "</option>"; }
                        else
                        {    returner += "<option value=\"" + i + "\" selected>" + aux_textSignIn(selectData[i][0]) + "</option>"; }
                    }
                    
                    return returner;
                }
               
                if(aux_existence(data))
                {
                    if(data.length<5)
                    {   thisReturner[3] = data[2];  }
                    else
                    {   
                        if(aux_existence(data[3]))
                        {   thisReturner[3] = data[3];}
                        else
                        {   thisReturner[3] = document.getElementById("username").innerText;}
                        //thisReturner[3] = data[3];  
                    }
                }
                else
                {   thisReturner[3] = document.getElementById("username").innerText;}
               
                thisReturner[1] = (aux_existence(data[1]))? aux_textSignIn(data[1]): "";
                thisReturner[2] = getSelector(selectArr_1, data[2]);
                
                thisReturner[4] = DateTime.aux_ParseTo.extendDateTime((aux_existence(data[4]))? data[4]: "");
               
                return thisReturner;
            },            
            
            eframe:  
            [
                {type:"textarea", wait:true, codeSelector:4, attribute: {required: true}},
                {label:"Type", type:"select", /*efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]*/ },
                {label:"UserName", type:"text", moveupdown:false, bodyWrapperHead:"10", codeSelector: 6, attribute:{disabled:true}},
                {label:"Edited On", type:"text",bodyWrapperHead:"11", moveupdown:false, codeSelector: 6, attribute:{disabled:true}},
                {sameValueAs:0}
            ]
        },   
        

        bodyFrame_v5:
        {   
            id:5, 
            dMode: "true",
            eDimensionalData: function(data)
            {
                let fr="2",txt="",usr="",dt="", rt="";
                let thisReturner = [5,"","",""];

                function getSelector(selectData, comparator)
                {
                    returner = "<option value=\"\">Select Type</option>";
                    for(let i=0, l=selectData.length; i<l; i++)
                    {    
                        if(comparator!==selectData[i])
                        {    returner += "<option value=\"" + i + "\">" + aux_textSignIn(selectData[i][0]) + "</option>"; }
                        else
                        {    returner += "<option value=\"" + i + "\" selected>" + aux_textSignIn(selectData[i][0]) + "</option>"; }
                    }
                    
                    return returner;
                }
                
                thisReturner[1] = (aux_existence(data[1]))? data[1]: "";
               
                    if(aux_existence(data[2]))
                    {
                        if((data[2].includes("T"))||(data[2].includes("@")))
                        {   thisReturner[3] = data[2]; }
                        else
                        {   thisReturner[2] = data[2];   }
                    }
                    else
                    //{   thisReturner[2] = document.getElementById("username").innerText;  }
                    {   thisReturner[2] = sessionStorage.username;  }
                                                 
                    if(aux_existence(data[3]))
                    {   
                        if((data[3].includes("T"))||(data[3].includes("@")))
                        {   thisReturner[3] = data[3]; }
                        else
                        {   thisReturner[3] = DateTime.aux_ParseTo.extendDateTime(); }
                    }
                    else
                    {   thisReturner[3] = DateTime.aux_ParseTo.extendDateTime(); }
                
                return thisReturner;
            },            
            
            eframe:  
            [
                {type:"textarea", wait:true, codeSelector:4, attribute: {required:true, allowEmptyOnly:true}},                         //data[1]             
                {label:"UserName", type:"text", moveupdown:false, changeDepth:true, bodyWrapperHead:"10", attribute:{disabled:true}},         //data[2]
                {label:"Edited On", type:"text",bodyWrapperHead:"11", moveupdown:false, attribute:{disabled:true}},          //data[3]
                {sameValueAs:0}  
            ]
        }, 
        
        
        bodyFrame_v6:
        {   
            id:6, 
            dMode: "true",
            eDimensionalData: function(data)
            {
                let thisReturner = [7,"",sessionStorage.username, DateTime.aux_ParseTo.extendDateTime(),""];
                let lstArr1 = [];
                let comments = document.getElementById("dimension_Comments");
                
                
                
                function getListor(arr, selector)
                {
                    let returner="";
                    if(aux_existence(arr))
                    {
                        for(let  i=0, len=arr.length; i<len; i++)
                        {    
                            if(aux_existence(arr[i]))
                            {      returner += `<option value=\"${aux_textSignIn(arr[i])}\">`; }   
                        }
                    }
                    else
                    {   returner += `<option value=\"${aux_textSignIn(selector)}\">`; }
                    
                    return [(aux_existence(selector)? selector: ""), returner];
                }

                if(aux_existence(comments))
                {
                    comments = comments.value.split("*|DP|*");
                    comments.forEach(function(value){   lstArr1.push(value);    })  
                }
                
                
                if(!aux_existence(data)){   data=[7,"","","",""];    }
                
                
                switch(parseInt(data[0]))
                {
                    case 1:
                        thisReturner[0] = 7;
                        thisReturner[1] = getListor(lstArr1, "");
                        thisReturner[2] = (aux_existence(data[2]))? data[2]: sessionStorage.username;
                        thisReturner[3] = (aux_existence(data[3]))? data[3]: DateTime.aux_ParseTo.extendDateTime();
                        thisReturner[4] = data[1];
                        break;
                        
                    case 4:
                        thisReturner[0] = 7;
                        thisReturner[1] = getListor(lstArr1, "");
                        thisReturner[2] = (aux_existence(data[3]))? data[3]: sessionStorage.username;
                        thisReturner[3] = (aux_existence(data[4]))? data[4]: DateTime.aux_ParseTo.extendDateTime();
                        thisReturner[4] = data[1];
                        break;      
                        
                    case 5:
                        thisReturner[0] = 7;
                        thisReturner[1] = getListor(lstArr1, "");
                        thisReturner[2] = (aux_existence(data[2]))? data[2]: sessionStorage.username;
                        thisReturner[3] = (aux_existence(data[3]))? data[3]: DateTime.aux_ParseTo.extendDateTime();
                        thisReturner[4] = data[1];
                        break;        
                        
                    case 6:
                        thisReturner[0] = 7;
                        thisReturner[1] = getListor(lstArr1, (aux_existence(data[1]))? data[1]: "");
                        thisReturner[2] = (aux_existence(data[3]))? data[3]: sessionStorage.username;
                        thisReturner[3] = (aux_existence(data[4]))? data[4]: DateTime.aux_ParseTo.extendDateTime();
                        thisReturner[4] = data[5];
                        break;  
                    case 7:
                        thisReturner[0] = 7;
                        thisReturner[1] = getListor(lstArr1, (aux_existence(data[1]))? data[1]: "");
                        thisReturner[2] = (aux_existence(data[2]))? data[2]: sessionStorage.username;
                        thisReturner[3] = (aux_existence(data[3]))? data[3]: DateTime.aux_ParseTo.extendDateTime();
                        thisReturner[4] = data[4];
                        break;
                }   
                
                
                return thisReturner;
            },            
            
            eframe:  
            [
                {label:"ClassName", type:"list", changeDepth:true, bodyWrapperHead:"10"},         //data[2]
                {label:"UserName", type:"text", changeDepth:true, bodyWrapperHead:"20", attribute:{disabled:true}},         //data[2]
                {label:"Edited On", type:"text",bodyWrapperHead:"21", attribute:{disabled:true}},          //data[3]
                {type:"textarea", codeSelector:4, attribute: {required:true, allowEmptyOnly:true}}
            ]
        }, 
        
        
        bodyFrame_v7:
        {   
            id:7, 
            dMode: "true",          
            
            eframe:  
            [
                {label:"Class-1", labelID:"_class1", type:"list", changeDepth:true, bodyWrapperHead:"10", dimensional:true, rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{list:"editList_1"}},         //data[2]
                {label:"Class-2", labelID:"_class2", type:"list", changeDepth:true, bodyWrapperHead:"20", dimensional:true, rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{list:"editList_2"}},          //data[3]
                {label:"UpdatedBy", labelID:"_updateby",  defaultuser:true, type:"text", changeDepth:true, moveupdown:false, bodyWrapperHead:"30", dimensional:true, rIndex:"f3", dReport:["f3-f1","f3-f2"], attribute:{disabled:true}},         //data[2]
                {labelID:"_eodt", label:"Edited On", type:"text", bodyWrapperHead:"31", codeSelector:11, attribute:{disabled:true}},          //data[3]
                {label:"Stars", labelID:"_stars",  type:"select",  attribute:{options: [["None","",""],["1 Star","_star1",""],["2 Stars","_star2",""],["3 Stars","_star3",""],["4 Stars","_star4",""],["5 Stars","_star5",""]]}},          //data[3]
                {labelID:"_comments", type:"textarea", codeSelector:9, required:true, attribute: {required:true, allowEmptyOnly:true}}
            ]
        },
        
        
        dataBodyFrame:
        {   
            id:2, 
            dMode: "true",
            eDimensionalData: function(b)
            {
                let fr=txt="",usr="",dt="";
                if(aux_existence(b))
                {   //existing Comments
                    txt=aux_textSignIn(b[1]);
                    dt=b[3];
                    usr=b[2];
                    
                }
                else
                {   //new Comment
                    dt = DateTime.aux_ParseTo.extendDateTime(DateTime.aux_ParseTo.numericDateTime());
                    usr = document.getElementById("username").innerText;
                }
                
                return [2,txt, usr, dt];
            },            
            
            eframe:  
            [
                {type:"div", codeSelector: 1, inputRequest: true},
                {bodyWrapperHead:"10",  type:"div", inputRequest: true},
                {bodyWrapperHead:"11",  type:"div", inputRequest: true},
                {type:"div"}
            ],
            
        },
        
        defaultBodyFrame:
        {   
            id:3, 
            idOverRide: 1,
            dMode:true,
        },
        
        footFrame:"",

        returner: function(fID)
        { 
            if(fID==="head"){return this.headFrame; } 
            if(fID==="foot"){return this.footFrame; }      
            
            if(parseInt(fID)===2){return this.dataBodyFrame; }       
            if(parseInt(fID)===3){return this.defaultBodyFrame; } 
            if(parseInt(fID)===4){return this.bodyFrame_v4; } 
            if(parseInt(fID)===5){return this.bodyFrame_v5; } 
            if(parseInt(fID)===6){return this.bodyFrame_v6; } 

            return this.bodyFrame_v7;
        }
    }
};
