const Contacts =
{
    instructions: function()
    {
        return  "* To add Contact by clicking on \'Add New Contact\' button, or \'Select Existing Contact\' selector<br>" +
                "* To remove a frame block, select first the name and while it has the focus Click on 'Remove Selected Name' button<br><br>" +
                "* Each Contact has its own set of properties ...<br>" +
                "->Group: Places the Contact into a group, and all contact elements of the group can be retrived all at once in future Actions<br>" +
                "->Access: Allows Action shareability<br>" +
                "-->>Full: Contact will get a copy of the Action and will be allowed to fully edit the Action<br>" +   
                "-->>Partial: Contact will get a copy of the Action and will be allowed to fully edit except close the Action<br>" +   
                "-->>Minimum: Contact will get a copy of the Action but will only be allowed to edit category, comments, save and/or delete the action from its database<br>" +   
                "-->>None: Sends NO copy to the user<br><br>" +     
                "->Duties: Creates an organogram into a group<br>" +
                "Note-1: Name and Telephone are mandatory, the other Contact properties are optional";
    },


    frame: 
    {   
        headFrame:
        {   
            id:"head",
            dMode: "true",
            eframe: 
            [
                {type:"button", extraclass: "_Button", attribute: {value:"Add New Contact", framecaller:5}},
                {type:"select", dymanicDimension: "true", labelID:"_name", attribute: {headselector:true}}   
            ],
        },
        
        bodyFrame_v1:
        {   
            id:1, 
            dMode: "true",
            eDimensionalData: function(userData=["","","","","","","","","",""])
            {
                let returner = "";
                let returnerArr = ["","","","","","","","","",""];
                
                let dimensionalData = document.getElementById("dimension_Contacts").value;
                let contactReturner = "";
                let listArr_1 = [];
                let listArr_2 = [];
                let selectArr_1 = [["None","0"],["Minimum","00000000100000011101"],["Partial","00011111111111111101"],["Full","00011111111111111111"]];


                function getArr(data)
                {
                    let contact = data.split("*|3f4x|*");
                       
                    //groups
                    if(aux_existence(contact[3]))
                    {   
                        let newData = contact[3].split("*|3f7x|*");
                        for(let dim of newData)
                        {
                            if(aux_existence(dim))
                            {   if(listArr_1.indexOf(dim)===-1){   listArr_1.push(dim); } }
                        }
                    } 


                    //duties
                    if(aux_existence(contact[6]))
                    {   
                        let newData = contact[6].split("*|3f7x|*");
                        for(let dim of newData)
                        {
                            if(aux_existence(dim))
                            {   if(listArr_2.indexOf(dim)===-1){   listArr_2.push(dim); } }
                        }
                    } 
                }
                
                function getSelector(selected, arr)
                {
                    let returner = "";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   
                            if(arr[a][1]!==selected)
                            {   returner += "<option value=\"" + arr[a][1] + "\" >" + aux_textSignIn(arr[a][0]) + "</option>";  }
                            else
                            {   returner += "<option value=\"" + arr[a][1] + "\" selected>" + aux_textSignIn(arr[a][0]) + "</option>";  }
                        }
                    }
                    
                    return returner; 
                }
                
                function getListor(selected, arr)
                {
                    let returner = "";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   returner += "<option value=\"" + aux_textSignIn(arr[a]) + "\">";  }
                    }
                    return [selected, returner];                     
                }
                
                
                
                let rowData = dimensionalData.split("*|DP|*");
                for(let row of rowData){   getArr(row);       }
                
                  
                returnerArr[1] = aux_existence(userData[1])? userData[1]: "";                                   //name
                returnerArr[2] = aux_existence(userData[2])? userData[2]: "";                                   //telephone
                returnerArr[3] = aux_existence(userData[3])? userData[3]: "";                                   //email
                returnerArr[4] = getListor(aux_existence(userData[4])? (userData[4].indexOf("*|3f7x|*")!==-1)?"":userData[4]: "", listArr_1);             //group             dimensional
                returnerArr[5] = aux_existence(userData[5])? userData[5]: "";                                   //alias
                returnerArr[6] = getSelector(aux_existence(userData[6])? userData[6]: "", selectArr_1);         //access
                returnerArr[7] = getListor(aux_existence(userData[7])? (userData[7].indexOf("*|3f7x|*")!==-1)?"":userData[7]: "", listArr_2);             //duties            dimensional
                returnerArr[8] = aux_existence(userData[8])? userData[8]: "";                                   //comments
                
                
                
                return returnerArr;
            },
            
            eDisableFrame: function(data)
            {
                if(!Array.isArray(data)){ data = data.split("*|3f4x|*");  }
                if(data[data.length-1]==="master"){    return true; }
                
                return false;
            },
            
            eframe:  
            [                         
                {label:"Name", bodyWrapperHead:"10", type:"text", required:true, moveupdown:true, efunction:[["onfocus","frame.edit.eDetails.efocusON",""],["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {removepermission:"main"}},
                {label:"Telephone", type:"text",  required:"true", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Email", type:"text",  required:"true", efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Group", type:"list",  dynamicDimension: "true", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_1"}},
                {label:"Alias", type:"text", efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Access", type:"select",  efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], fixedDimension:[["None","0"],["Minimum","00000000100000011101"],["Partial","00011111111111111101"],["Full","00011111111111111111"]]},
                {label:"Duties", type:"list", efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_2"}},
                {label:"Comments", type:"textarea", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {type:"master",  eMode:false, dMode:false, eCancel:true}
            ],
        },
        
        bodyFrame_v2:
        {   
            id:2,
            dMode: "true",
            eframe:  
            [                         
                {label:"ClassName", type:"list", bodyWrapperHead:"10", dynamic:"true", required:true, moveupdown:true, attribute:{list:"editList_1", removepermission:"main"}},
                {label:"ClassName", type:"list", bodyWrapperHead:"20", dynamic:"true", attribute:{list:"editList_2"}},  
                {label:"Duties", type:"list", dynamic:"true", attribute:{list:"editList_3"}},                
                {label:"Telephone", type:"text", required:"true"},
                {label:"Email",  type:"text",   required:"true"},
                {label:"Access", type:"select", fixedDimension:[["None","0"],["Minimum","00000000100000011101"],["Partial","00011111111111111101"],["Full","00011111111111111111"]]},

                {label:"Comments", type:"textarea"}
            ],
        },
        
        bodyFrame_v3:
        {   
            id:3,
            dMode: "true",
            eframe:  
            [                         
                {label:"Class-1", type:"list", bodyWrapperHead:"10", changeDepth:true, dimensional:true, dynamic:"true", rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{list:"editList_1"}},
                {label:"Class-2", type:"list", bodyWrapperHead:"20", changeDepth:true, dimensional:true, dynamic:"true", rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{list:"editList_2"}},  
                {label:"Name",  type:"list", bodyWrapperHead:"30", changeDepth:true, dimensional:true, dynamicAction:"true", required:true, moveupdown:true, rIndex:"f3", dReport:["f3-f1","f3-f2","f3-f4","f3-f5"], attribute: {removepermission:"main", list:"editList_3"}},
                
                {label:"Duties", type:"list", dynamic:"true",  rIndex:"f4", dReport:["f4-f3"],attribute:{list:"editList_4"}},                
                {label:"Telephone", type:"text", required:"true"},
                {label:"Email",  type:"text",   required:"true"},
                {label:"Access", type:"select",  rIndex:"f5", dReport:["f5-f3"], attribute: {options:[["None","0"],["Minimum","00000000100000011101"],["Partial","00011111111111111101"],["Full","00011111111111111111"]]}},

                {label:"Comments", type:"textarea"}
            ],
        },
        
        bodyFrame_v4:
        {   
            id:4,
            dMode: "true",
            exceptionToStore: "Contacts",
            eframe:  
            [                         
                {label:"Class-1", labelID:"_class1", type:"list", bodyWrapperHead:"10", changeDepth:true, dimensional:true, dynamic:"true", rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{list:"editList_1"}},
                {label:"Class-2", labelID:"_class2", type:"list", bodyWrapperHead:"20", changeDepth:true, dimensional:true, dynamic:"true", rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{list:"editList_2"}}, 
                
                {label:"Name", labelID:"_name", type:"list", bodyWrapperHead:"30", changeDepth:true, dimensional:true, dynamicAction:"true", required:true, moveupdown:true, rIndex:"f3", dReport:["f3-f1","f3-f2","f3-f4","f3-f5"], attribute: {removepermission:"main", list:"editList_3", moveupdown:true}},
                {labelID:"_reference", type:"hidden"},
                
                {label:"Telephone", type:"text"},
                {label:"Email",  type:"text",   required:"true"},
                
                {label:"Full Name", labelID:"_fulname", type:"text", rIndex:"f5", dReport:["f5-f3"]}, 
                {label:"Access", labelID:"_access", type:"select",  rIndex:"f6", dReport:["f6-f3"], attribute: {options:[["None",""],["Minimum","00000000100000011101"],["Partial","00011111111111111101"],["Full","00011111111111111111"]]}},

                {type:"textarea", labelID:"_comments"}
            ],
        },
        
        
                
        bodyFrame_v5:
        {   
            id:5,
            dMode: "true",
            exceptionToStore: "Contacts",
            eframe:  
            [                         
                {label:"Class-1", labelID:"_class1", type:"list", bodyWrapperHead:"10", changeDepth:true, dimensional:true, dynamic:"true", rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{list:"editList_1"}},
                {label:"Class-2", labelID:"_class2", type:"list", bodyWrapperHead:"20", changeDepth:true, dimensional:true, dynamic:"true", rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{list:"editList_2"}}, 
                
                
                {label:"Name", labelID:"_name", type:"list", bodyWrapperHead:"30", changeDepth:true, dimensional:true, dynamicAction:"true", required:true, moveupdown:true, rIndex:"f3", dReport:["f3-f1","f3-f2","f3-f4","f3-f5"], attribute: {removepermission:"main", list:"editList_3", moveupdown:true, data_reference_value:true, data_action_property_linked:"4"}},
                {labelID:"_reference", type:"hidden", linker:true},
                
                {label:"Telephone", type:"text"},
                {label:"Email",  type:"text",   required:"true"},
                
                {label:"Full Name", labelID:"_fulname", type:"text", rIndex:"f5", dReport:["f5-f3"]}, 
                {label:"Access", labelID:"_access", type:"select",  rIndex:"f6", dReport:["f6-f3"], attribute: {options:[["None",""],["Minimum","00000000100000011101"],["Partial","00011111111111111101"],["Full","00011111111111111111"]]}},

                {type:"textarea", labelID:"_comments", codeSelector:9}
            ],
        },
        
        bodyFrame_resources:
        {   
            id:"Resources", 
            dMode: "true",
            eDimensionalData: function(Data)
            {
                let returner = "";
                let returnerArr = ["","","","","","","","","",""];
                
                let data = document.getElementById("dimension_Contacts").value;
                let contactReturner = "";
                let groupiesArr = [];
                let dutiesArr = [];
                let setArr_1 = [["None","0"],["Minimum","00000000100000011101"],["Partial","00011111111111111101"],["Full","00011111111111111111"]];
                let lstArr_1=[], lstArr_2=[], lstArr_3=[];


                function getArr(data1)
                {
                    let data2 = data1.split("*|3f4x|*");
                       
                    if(aux_existence(data2[0]))
                    {   if(lstArr_1.indexOf(data2[0])===-1){   lstArr_1.push(data2[0]); } } 
                    
                    if(aux_existence(data2[3]))
                    {   if(lstArr_2.indexOf(data2[3])===-1){   lstArr_2.push(data2[3]); } }  
                    
                    if(aux_existence(data2[5]))
                    {   if(lstArr_3.indexOf(data2[5])===-1){   lstArr_3.push(data2[5]); } } 
                }
                
                function getSelector(selected, arr)
                {
                    let returner = "";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   
                            if(arr[a]!==selected)
                            {   returner += "<option value=\"" + arr[a] + "\" >" + aux_textSignIn(arr[a]) + "</option>";  }
                            else
                            {   returner += "<option value=\"" + arr[a] + "\" selected>" + aux_textSignIn(arr[a]) + "</option>";  }
                        }
                    }
                    
                    return returner; 
                }
                
                function getListor(selected, arr)
                {
                    let returner = "";
                    
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   returner += "<option value=\"" + aux_textSignIn(arr[a]) + "\">" + aux_textSignIn(arr[a]) + "</option>";  }
                        //{   returner += "<option value=\"" + aux_textSignIn(arr[a]) + "\">";  }
                    }
                    selected = aux_existence(selected)? selected: "Select or Enter New";
                    return [selected, returner];                     
                }
                
                
                if(data.indexOf("*|DP|*")!==-1)
                {
                    let d = data.split("*|DP|*");
   
                    for(let iLen = d.length, i=0; i<iLen; i++)
                    {   getArr(d[i]);       }
                }
                else
                {   getArr(data);   }
                
                 
                    
                //if(aux_existence(Data))
                //{   
                    returnerArr[0] = "Resources";
                    returnerArr[1] = Data[1];                               //Container
                    returnerArr[2] = Data[2];                               //pTitle
                    returnerArr[3] = getSelector(Data[3], lstArr_1);        //Name
                    returnerArr[4] = Data[4];                               //Telephone
                    returnerArr[5] = Data[5];                               //Email
                    returnerArr[6] = getSelector(Data[6], lstArr_2);        //Groups
                    returnerArr[7] = Data[7];                               //Alias;
                    returnerArr[8] = getSelector(Data[8], lstArr_3);        //Duties
                    returnerArr[9] = Data[9];                               //Comments
                    returnerArr[10] = (Data[10])? Data[10]: DateTime.aux_ParseTo.extendDateTime_local(new Date().getTime());
                //}
                
                
                return returnerArr;
            },
            
            eframe:  
            [         
                {label:"Container", type:"text", /*bodyWrapperHead:"20"*/ dMode:false,  fixedDimension: [], efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute:{disabled:true /*readonly:true*/}},
                {label:"Property", type:"text", fixedDimension: [], dMode:false, efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute:{disabled:true}},                
                {label:"Name", bodyWrapperHead:"30", type:"select", datahold:true, required:true, moveupdown:true, efunction:[["onfocus","frame.edit.eDetails.efocusON",""],["onfocusout","frame.edit.eDetails.efocusOFF",""],["onchange","Contacts.setContact",""]], attribute: {removepermission:"main"}},
                {label:"Telephone", type:"text", datahold:true,  required:"true", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {readonly:true}},
                {label:"Email", type:"text", datahold:true,  required:"true", efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {readonly:true}},
                {label:"Group", type:"select", datahold:true,  dynamicDimension: "true", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_1"}},
                {label:"Alias", type:"text", datahold:true, efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Duties", type:"select", datahold:true, efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},//, attribute: {list:"editList_2", name:"list"}},
                {label:"Comments", type:"textarea", datahold:true, efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Closed On", bodyWrapperHead:"31", type:"datetime-local", datahold:true, efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]}   
            ],
        },
        
        footFrame:
        {
            id:"foot",
            eframe:  
            [{type:"button", attribute: {value:"Remove Selected Name", button_type:"RemovalButton", data_property_block:"", data_property_element:""}}]
        },
        
        returner: function(frameID)
        {  
            if(frameID==="Resources"){  return this.bodyFrame_resources;    }
            if(frameID==="head")     {  return this.headFrame;              }
            if(frameID==="foot")     {  return this.footFrame;              }
            if(parseInt(frameID)===1){  return this.bodyFrame_v1;           }
            if(parseInt(frameID)===2){  return this.bodyFrame_v2;           }
            if(parseInt(frameID)===3){  return this.bodyFrame_v3;           }
            if(parseInt(frameID)===4){  return this.bodyFrame_v4;           }
                        
            return this.bodyFrame_v5; 
        }
    }
};



