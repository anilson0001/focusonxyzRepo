const ListItem = 
{
    instructions: function()
    {
        return "* To add a frame block, click on 'Add Item' button<br>" +
                "* To remove a frame block, select first the name and while it has the focus Click on 'Remove Selected Name' button<br><br>" +
                "* Each Item of the List has its own set of properties ...<br>" +
                "Priority: Item can be set based on Importance, Urgency, Impact and Difficulty<br>" +
                "Risk: The negative effect of the risk on the objectives<br>" +
                "Status: The root source of the risk<br><br>" +
                "Note-1: Only Name is mandatory, the other properties elements are optional";
                "Note-2: A List property can be made of items representing steps the Action has to accomplish. In other words it can be used to divide the Action into steps";
    },

    frame: 
    {   
        headFrame:
        {   
            id:"head",
            eframe: 
            [
                {type:"button", attribute: {value:"Add New ListItem", framecaller:7}},
                {type:"select", dymanicDimension: "true", labelID:"_name", attribute: {headselector:true, placeholder: "--- [Select Class Group] ---"}}  
            ]
        },
        
        
        bodyFrame_v1:
        {   
            id:1, 
            dMode: "true",
            eDimensionalData: function(data)
            {
                let arr1 = [["None","",""],["Low","",""],["Medium","",""],["High","",""],["Imperative","",""]];
                let arr2 = [["None","",""],["Low","",""],["Medium","",""],["High","","","",""],["Extreme","",""]];
                let arr3 = [["Active","",""],["Closed","",""]];
                
                let datetime = new Date().getTime() + 86400000;
                if(aux_existence(data))
                {   
                    if(data.length>7){   data.splice(4,1); }
                }
                else
                {   data = ["","","0","0","0","", DateTime.aux_ParseTo.extendDateTime_local(datetime)];}
                
                            
                function optionArr(arr, selector)
                {
                    let returner="";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        let selection = "";
                        if(a===parseInt(selector)){selection="selected"; }
                        if(aux_existence(arr[a]))
                        {   returner = returner + "<option value=\"" + a + "\" " + selection + ">" + aux_textSignIn(arr[a][0]) + "</option>";   }
                    }   
                    return returner;
                }
 

                
                
                return ["",data[1],optionArr(arr1, data[2]),optionArr(arr2, data[3]),optionArr(arr3, data[4]), data[5], data[6]];
            },
                        
            eframe:  
            [
                {label:"Name", bodyWrapperHead:"10", type:"text", required:true, moveupdown:true, dynamicDimension: "true", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {required:"true", maxlength: 40}},
                {label:"Priority", type:"select",  fixedDimension:[["None","",""],["Low","",""],["Medium","",""],["High","",""]], efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Risk", type:"select",  fixedDimension:[["None","",""],["Low","",""],["Medium","",""],["High","",""]],  efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Status", type:"select",  fixedDimension:[["Active",""],["Closed",""]], efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Comments", type:"textarea",  efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Due By",  type:"datetime-local", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]}       
            ]
        },
        
        
        bodyFrame_v2:
        {   
            id:2, 
            dMode: "true",
            eDimensionalData: function(data)
            {
                let selectArr_1 = [["None","",""],["Low","",""],["Medium","",""],["High","",""],["Imperative","",""]];
                let selectArr_2 = [["None","",""],["Very Negative","",""],["Negative","",""],["Slightly Negative","",""],["Somewhat Positive","",""],["Positive","",""],["Very Positive","",""]];
                let selectArr_3 = [["Active","",""],["Closed","",""]];
                
                let thisReturner = ["2","","","","","",""];
                let lstArr = [];
                let dimension = document.getElementById("dimension_List");
                
                let datetime = new Date().getTime() + 86400000;
                

                            
                function getSelector(selector, data1)
                {
                    let returner="";
                    for(let aLen=data1.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(data1[a]))
                        { 
                            let selection = "";
                            if(a===parseInt(selector)){selection="selected"; }
                            if(aux_existence(data1[a]))
                            {   returner += "<option value=\"" + a + "\" " + selection + ">" + aux_textSignIn(data1[a][0]) + "</option>";   }
                        }
                        else
                        {   returner += "<option value=\"\" >Enter Selection</option>";       }
                    }   
                    return returner;
                }
                
                
                function getListor(selector, data1)
                {
                    let returner;
                    if(aux_existence(data1))
                    {
                        returner = "<option value=\"\">";
                        for(let aLen=data1.length, a=0; a<aLen; a++)
                        {
                            if(aux_existence(data1[a]))
                            {   returner += "<option value=\"" + aux_textSignIn(data1[a]) + "\">";  }
                        }                        
                    }
                    else
                    {   returner = "<option value=\"" + aux_textSignIn(selector) + "\">";    }

                    return [selector, returner];                     
                }
                
                
                
                
                if(!aux_existence(data))
                {   data = ["","","","","","","", DateTime.aux_ParseTo.extendDateTime_local(datetime)];   }
                
                
                
                if(aux_existence(dimension))
                {
                    (function(data1)
                    {
                        let data2 = data1.split("*|3f4x|*");
                        if(aux_existence(data2[1]))
                        {   
                            for(let data3 of data2[1])
                            {
                                if(aux_existence(data3))
                                {   if(lstArr_1.indexOf(data3)===-1){   lstArr_1.push(data3); } }
                            }
                        } 
                    })(dimension.value);
                }                      
                      

                
                
                thisReturner[1] = getListor(aux_existence(data[1])? data[1]: "", lstArr);                   //className-1
                thisReturner[2] = getListor(aux_existence(data[2])? data[2]: "", lstArr);                   //className-2
                thisReturner[3] = getSelector(aux_existence(data[3])? data[3]: "", selectArr_1);            //priority
                thisReturner[4] = getSelector(aux_existence(data[4])? data[4]: "", selectArr_2);            //impact
                thisReturner[5] = getSelector(aux_existence(data[5])? data[5]: "", selectArr_3);            //status
                thisReturner[6] = (aux_existence(data[6]))? data[6]: "";                                    //comments
                thisReturner[7] = (aux_existence(data[7]))? data[7]: "";        //DateTime.aux_ParseTo.extendDateTime_local(datetime);                                    //dueby

                
                
                return  thisReturner;
            },
                        
            eframe:  
            [
                {label:"ClassName", bodyWrapperHead:"10", dimensional:true, moveupdown:true, changeDepth:true, type:"list", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute:{maxlength: 40, list:"editList_1", removepermission:true}},
                {label:"ClassName", bodyWrapperHead:"20", dimensional:true, type:"list", changeDepth:true, efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {maxlength: 40}},
                {label:"Priority", type:"select", dimensional:true,  efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Impact", type:"select", dimensional:true, efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Status", type:"select", dimensional:true, efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]] , affectedByClosedStatus:true},
                {label:"Comments", type:"textarea",  efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Closed On", type:"datetime-local",  efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]}     
            ]
        }, 
        
        
        bodyFrame_v3:
        {   
            id:3, 
            dMode: "true",
            eDimensionalData: function(data)
            {
                let selectArr_1 = [["None","",""],["Low","",""],["Medium","",""],["High","",""],["Imperative","",""]];
                let selectArr_2 = [["None","",""],["Very Negative","",""],["Negative","",""],["Slightly Negative","",""],["Somewhat Positive","",""],["Positive","",""],["Very Positive","",""]];
                let selectArr_3 = [["Active","",""],["Closed","",""]];
                
                let thisReturner = ["3","","","","","",""];
                let lstArr = [];
                let dimension = document.getElementById("dimension_List");
                
                let datetime = new Date().getTime() + 86400000;
                

                            
                function getSelector(selector, data1)
                {
                    let returner="";
                    for(let aLen=data1.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(data1[a]))
                        { 
                            let selection = "";
                            if(a===parseInt(selector)){selection="selected"; }
                            if(aux_existence(data1[a]))
                            {   returner += "<option value=\"" + a + "\" " + selection + ">" + aux_textSignIn(data1[a][0]) + "</option>";   }
                        }
                        else
                        {   returner += "<option value=\"\" >Enter Selection</option>";       }
                    }   
                    return returner;
                }
                
                
                function getListor(selector, data1)
                {
                    let returner;
                    if(aux_existence(data1))
                    {
                        returner = "<option value=\"\">";
                        for(let aLen=data1.length, a=0; a<aLen; a++)
                        {
                            if(aux_existence(data1[a]))
                            {   returner += "<option value=\"" + aux_textSignIn(data1[a]) + "\">";  }
                        }                        
                    }
                    else
                    {   returner = "<option value=\"" + aux_textSignIn(selector) + "\">";    }

                    return [selector, returner];                     
                }
                
                
                
                
                if(!aux_existence(data))
                {   data = [3,"","","","","",DateTime.aux_ParseTo.extendDateTime_local(datetime),""];   }
                
                
                
                if(aux_existence(dimension))
                {
                    (function(data1)
                    {
                        let data2 = data1.split("*|3f4x|*");
                        if(aux_existence(data2[1]))
                        {   
                            for(let data3 of data2[1])
                            {
                                if(aux_existence(data3))
                                {   if(lstArr_1.indexOf(data3)===-1){   lstArr_1.push(data3); } }
                            }
                        } 
                    })(dimension.value);
                }                      
                      

                
                
                thisReturner[1] = getListor(aux_existence(data[1])? data[1]: "", lstArr);                   //className-1
                thisReturner[2] = getListor(aux_existence(data[2])? data[2]: "", lstArr);                   //className-2
                thisReturner[3] = getSelector(aux_existence(data[3])? data[3]: "", selectArr_1);            //priority
                thisReturner[4] = getSelector(aux_existence(data[4])? data[4]: "", selectArr_2);            //impact
                thisReturner[5] = getSelector(aux_existence(data[5])? data[5]: "", selectArr_3);            //status
                thisReturner[6] = (aux_existence(data[6]))? data[6]: "";                                    //DateTime.aux_ParseTo.extendDateTime_local(datetime);
                thisReturner[7] = (aux_existence(data[7]))? data[7]: "";                                    //Comments                                    

                
                
                return  thisReturner;
            },
                        
            eframe:  
            [
                {label:"ClassName", bodyWrapperHead:"10", type:"list", dimensional:true, dynamic:"true", changeDepth:true, changeDepth:true, moveupdown:true, attribute:{maxlength: 40, removepermission:true, list:"editList_1"}},
                {label:"ClassName", bodyWrapperHead:"20", type:"list", dimensional:true, dynamic:"true", attribute: {maxlength: 40}},
                {label:"Priority", type:"select"},
                {label:"Impact", type:"select"},
                {label:"Status", type:"select", affectedByClosedStatus:true},
                {label:"Closed On", type:"datetime-local"},
                {label:"Comments", type:"textarea"}
            ]
        },    
        
        
        bodyFrame_v4:
        {   
            id:4, 
            dMode: "true",
                        
            eframe:  
            [
                {label:"Class", bodyWrapperHead:"10", type:"list", changeDepth:"true",dimensional:true,  dynamic:"true", attribute:{maxlength: 40, list:"editList_1"}},
                {label:"Name",  bodyWrapperHead:"20", type:"list", changeDepth:true,  dimensional:true, dynamicAction:"true", moveupdown:true, attribute:{maxlength: 40, removepermission:true, list:"editList_2"}},
                
                {label:"Priority", type:"select",dimensional:true, },
                {label:"Impact",   type:"select",dimensional:true, },
                {label:"Comments", type:"textarea"}
            ]
        }, 
        
        
        bodyFrame_v5:
        {   
            id:5, 
            dMode: "true",
            exceptionToStore: "ListItem",
                        
            eframe:  
            [
                //{label:"Name", labelID:"_name",   bodyWrapperHead:"30", type:"list", changeDepth:"true", dimensional:true, rIndex:"f3", dReport:["f3-f1","f3-f2","f3-f4","f3-f5"], required:"true", moveupdown:true, attribute:{maxlength: 40, removepermission:true, list:"editList_3"}},
                {label:"Class-1", labelID:"_class1",bodyWrapperHead:"10", type:"list", changeDepth:"true", dimensional:true, rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{maxlength: 40, list:"editList_1"}},
                {label:"Class-2", labelID:"_class2", bodyWrapperHead:"20", type:"list", changeDepth:"true", dimensional:true, rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{maxlength: 40, list:"editList_2"}},
                
                {label:"Name", labelID:"_name",   bodyWrapperHead:"30", type:"list", changeDepth:"true", dimensional:true, rIndex:"f3", dReport:["f3-f1","f3-f2","f3-f4","f3-f5"], required:"true", moveupdown:true, attribute:{maxlength: 40, removepermission:"main", list:"editList_3", moveupdown:true}},
                
                {label:"Priority", type:"select", rIndex:"f4", dReport:["f4-f3"], attribute:{options:[["None","0",""],["Low","1",""],["Medium","2",""],["High","3",""],["Imperative","4",""]]}},
                {label:"Impact",   type:"select", rIndex:"f5", dReport:["f5-f3"], attribute:{options:[["None","0",""],["Very Negative","1",""],["Negative","2",""],["Slightly Negative","3",""],["Somewhat Positive","4",""],["Positive","5",""],["Very Positive","5",""]]}},
                {labelID:"_comments", type:"textarea"}
            ]
        },
        
        
        bodyFrame_v6:
        {   
            id:6, 
            dMode: "true",
                        
            eframe:  
            [
                {label:"Class-1", bodyWrapperHead:"10", type:"list", changeDepth:"true", dimensional:true, rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{maxlength: 40, list:"editList_1"}},
                {label:"Class-2", bodyWrapperHead:"20", type:"list", changeDepth:"true", dimensional:true, rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{maxlength: 40, list:"editList_2"}},
                {label:"Name",  labelID:"_name",  bodyWrapperHead:"30", type:"list", changeDepth:"true", dimensional:true,  moveupdown:true, rIndex:"f3", dReport:["f3-f1","f3-f2","f3-f4","f3-f5","f3-f6"], required:"true", attribute:{maxlength: 40, removepermission:"main", list:"editList_3"}},
                {label:"Priority", type:"select", rIndex:"f5", dReport:["f5-f3"], attribute:{options:[["None","0",""],["Low","1",""],["Medium","2",""],["High","3",""],["Imperative","4",""]]}},
                {label:"Impact",   type:"select", rIndex:"f6", dReport:["f6-f3"], attribute:{options:[["None","0",""],["Very Negative","1",""],["Negative","2",""],["Slightly Negative","3",""],["Somewhat Positive","4",""],["Positive","5",""],["Very Positive","5",""]]}},
                {label:"Link",    type:"select", linker:true,  attribute: {}},
                {type:"hidden",   rIndex:"f4",  wait:true},                 
                {type:"textarea"}
            ]
        },
        
        
        bodyFrame_v7:
        {   
            id:7, 
            dMode: "true",
                        
            eframe:  
            [
                {label:"Class-1", labelID:"_class1", bodyWrapperHead:"10", type:"list", changeDepth:"true", dimensional:true, rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{maxlength:40, list:"editList_1"}},
                {label:"Class-2", labelID:"_class2", bodyWrapperHead:"20", type:"list", changeDepth:"true", dimensional:true, rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{maxlength:40, list:"editList_2"}},
                {label:"Name",    labelID:"_name",  bodyWrapperHead:"30", type:"list", changeDepth:"true", dimensional:true,  moveupdown:true, rIndex:"f3", sameValueAs:4, dReport:["f3-f1","f3-f2","f3-f4","f3-f5","f3-f6"], required:"true", attribute:{maxlength:45, removepermission:"main", list:"editList_3", data_reference_value:true, data_action_property_linked:"4"}},
                {type:"hidden",   labelID:"_reference",    linker:true},                
                
                {label:"Priority", labelID:"_priority", type:"select", rIndex:"f5", dReport:["f5-f3"], attribute:{options:[["None","",""],["Low","Low",""],["Medium","Medium",""],["High","High",""],["Imperative","Imperative",""]]}},
                
                {label:"Impact",   labelID:"_impact", type:"select", rIndex:"f6", dReport:["f6-f3"], attribute:{options:[["None","",""],["Very Negative","Very Negative",""],["Negative","Negative",""],["Slightly Negative","Slightly Negative",""],["Somewhat Positive","Somewhat Positive",""],["Positive","ositive",""],["Very Positive","Very Positive",""]]}},

                
                {type:"textarea", labelID:"_comments", codeSelector:9}
            ]
        },
        
        
        bodyFrame_v8:
        {   
            id:8, 
            dMode: "true",
                        
            eframe:  
            [
                {label:"Class-1", labelID:"_class1", bodyWrapperHead:"10", type:"list", changeDepth:"true", dimensional:true, rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{maxlength:40, list:"editList_1"}},
                {label:"Class-2", labelID:"_class2", bodyWrapperHead:"20", type:"list", changeDepth:"true", dimensional:true, rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{maxlength:40, list:"editList_2"}},
  
                {label:"Name",    labelID:"_name",   bodyWrapperHead:"30", type:"list", changeDepth:"true", dimensional:true,  moveupdown:true, rIndex:"f3", sameValueAs:4, dReport:["f3-f1","f3-f2","f3-f4","f3-f5","f3-f6"], required:"true", attribute:{maxlength:40, removepermission:"main", list:"editList_3", data_reference_value:true, data_action_property_linked:"4"}},
                {type:"hidden",   labelID:"_reference", linker:true},                
                
                {label:"Priority", labelID:"_priority", type:"select", rIndex:"f5", dReport:["f5-f3"], attribute:{options:[["None","0",""],["Low","1",""],["Medium","2",""],["High","3",""],["Imperative","4",""]]}},
                {label:"Impact",   labelID:"_impact", type:"select", rIndex:"f6", dReport:["f6-f3"], attribute:{options:[["None","0",""],["Very Negative","1",""],["Negative","2",""],["Slightly Negative","3",""],["Somewhat Positive","4",""],["Positive","5",""],["Very Positive","5",""]]}},

                {label:"Status", labelID:"_status", type:"select", rIndex:"f5", attribute:{data_element_blocker:"_datetime", options:[["Open","0",""],["Closed","1",""]]}},
                {label:"DateTime", labelID:"_datetime", type:"datetime-local", eMode:"false", rIndex:"dt", dReport:["dt"], attribute:{data_element_skip:true, disabled:true}},  
                
                {type:"textarea", labelID:"_comments", codeSelector:9}
            ]
        },
        
        bodyFrame_v9:
        {   
            id:9, 
            dMode: "true",
                        
            eframe:  
            [
                {label:"Class-1", labelID:"_class1", bodyWrapperHead:"10", type:"list", changeDepth:"true", dimensional:true, rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{maxlength:40, list:"editList_1"}},
                {label:"Class-2", labelID:"_class2", bodyWrapperHead:"20", type:"list", changeDepth:"true", dimensional:true, rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{maxlength:40, list:"editList_2"}},
                
                {label:"Status", labelID:"_status",  bodyWrapperHead:"30",type:"select", rIndex:"f5", attribute:{data_element_blocker:"_datetime", options:[["Open","0",""],["Closed","1",""]]}},
                {label:"DateTime", labelID:"_datetime",  bodyWrapperHead:"31",type:"datetime-local", eMode:"false", rIndex:"dt", dReport:["dt"], attribute:{data_element_skip:true, disabled:true}},                
                
                {label:"Name",    labelID:"_name",   bodyWrapperHead:"40", type:"list", changeDepth:"true", dimensional:true,  moveupdown:true, rIndex:"f3", sameValueAs:4, dReport:["f3-f1","f3-f2","f3-f4","f3-f5","f3-f6"], required:"true", attribute:{maxlength:40, removepermission:"main", list:"editList_3", data_reference_value:true, data_action_property_linked:"4"}},
                {type:"hidden",   labelID:"_reference", linker:true},                
                
                {label:"Priority", labelID:"_priority", type:"select", rIndex:"f5", dReport:["f5-f3"], attribute:{options:[["None","0",""],["Low","1",""],["Medium","2",""],["High","3",""],["Imperative","4",""]]}},
                {label:"Impact",   labelID:"_impact", type:"select", rIndex:"f6", dReport:["f6-f3"], attribute:{options:[["None","0",""],["Very Negative","1",""],["Negative","2",""],["Slightly Negative","3",""],["Somewhat Positive","4",""],["Positive","5",""],["Very Positive","5",""]]}},


                
                {type:"textarea", labelID:"_comments", codeSelector:9}
            ]
        },
 
         bodyFrame_v10:
        {   
            id:10, 
            dMode: "true",
                        
            eframe:  
            [
                {label:"Class-1", labelID:"_class1", bodyWrapperHead:"10", type:"list", changeDepth:"true", dimensional:true, rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{maxlength:40, list:"editList_1"}},
                {label:"Class-2", labelID:"_class2", bodyWrapperHead:"20", type:"list", changeDepth:"true", dimensional:true, rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{maxlength:40, list:"editList_2"}},
                {label:"Name",    labelID:"_name",  bodyWrapperHead:"30", type:"list", changeDepth:"true", dimensional:true,  moveupdown:true, rIndex:"f3", sameValueAs:4, dReport:["f3-f1","f3-f2","f3-f4","f3-f5","f3-f6"], required:"true", attribute:{maxlength:45, removepermission:"main", list:"editList_3", data_reference_value:true, data_action_property_linked:"4"}},
                {type:"hidden",   labelID:"_reference",    linker:true},                
                

                {label:"Impact",   labelID:"_impact", type:"select", rIndex:"f6", dReport:["f6-f3"], attribute:{options:[["None","",""],["Very Negative","Very Negative",""],["Negative","Negative",""],["Slightly Negative","Slightly Negative",""],["Somewhat Positive","Somewhat Positive",""],["Positive","ositive",""],["Very Positive","Very Positive",""]]}},
                {label:"Urgency", type:"select",  rIndex:"f4", dReport:["f5-f3"],  attribute:{options:[["None","0"],["Low","1"],["Medium","2"],["High","3"]]}},                
                {label:"Probability", type:"select",  rIndex:"f4", dReport:["f5-f3"],  attribute:{options:[["None","0"],["Low","1"],["Medium","2"],["High","3"]]}},

                
                {label:"Resolved",  type:"select",  attribute:{options:[["0%","0"],["25%","1"],["50%","2"],["75%","3"],["100%","4"]]}},    
                
                {type:"textarea", labelID:"_comments", codeSelector:9}
            ]
        },       
        
        footFrame:
        {
            id:"foot",
            eframe:  [{type:"button", attribute: {value:"Remove Selected Name", button_type:"RemovalButton", data_property_block:"", data_property_element:""}}]
        },
        
        
        returner: function(frameID)
        {  
            if(parseInt(frameID)===1){ return this.bodyFrame_v1;} 
            if(parseInt(frameID)===2){ return this.bodyFrame_v2;} 
            if(parseInt(frameID)===3){ return this.bodyFrame_v3;} 
            if(parseInt(frameID)===4){ return this.bodyFrame_v4;} 
            if(parseInt(frameID)===5){ return this.bodyFrame_v5;}
            if(parseInt(frameID)===6){ return this.bodyFrame_v6;} 
            if(parseInt(frameID)===7){ return this.bodyFrame_v7;}     
            //if(parseInt(frameID)===8){ return this.bodyFrame_v8;}  
            //if(parseInt(frameID)===9){ return this.bodyFrame_v9;} 
            
            if(frameID==="head"){ return this.headFrame;   }
            if(frameID==="foot"){ return this.footFrame;}       
            
            //return this.bodyFrame_v7;
            return this.bodyFrame_v10;
        }
    },
};



    


