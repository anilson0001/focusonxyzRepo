const Locations =
{                     
    instructions: function()
    {
        return "* To add Location by clicking on \'Add New Location\' button, or \'Select Existing Location\' selector<br>" +
                "* To remove a frame block, select first the name and while it has the focus Click on 'Remove Selected Name' button<br><br>" +
                "Note-1: Only Name is mandatory, the other Location properties are optional";
    },
    
    
    frame: 
    {   
        headFrame:
        {   
            id:"head", 
            eframe:  
            [
                {type:"button", attribute:{value:"Add New Location", framecaller:5}},
                {type:"select", dymanicDimension: "true", labelID:"_name", attribute: {headselector:true}}    
            ],
        },
        
        
        bodyFrame_v1:
        {   
            id:1, 
            dMode: "true",
           
            eDimensionalData: function(data01)
            {
                let data02 = document.getElementById("dimension_Locations").value;
                let lstArr_1=[], lstArr_2=[], lstArr_3=[], lstArr_4=[], lstArr_5=[];
                let selectArr_1=[[]];
                let arrReturner = ["","","","","","","","","",""];
                
                data01 = (aux_existence(data01))? data01: [1,"","","","","","","","",""];
                

                function getArr(data1)
                {
                    let data2 = data1.split("*|3f4x|*");
                       
                    if(aux_existence(data2[1]))
                    {   if(lstArr_1.indexOf(data2[1])===-1){   lstArr_1.push(data2[1]); } } 
                    
                    if(aux_existence(data2[2]))
                    {   if(lstArr_2.indexOf(data2[2])===-1){   lstArr_2.push(data2[2]); } }   
                    
                    if(aux_existence(data2[3]))
                    {   if(lstArr_3.indexOf(data2[3])===-1){   lstArr_3.push(data2[3]); } } 
                    
                    if(aux_existence(data2[4]))
                    {   if(lstArr_4.indexOf(data2[4])===-1){   lstArr_4.push(data2[4]); } }                     
                    
                    if(aux_existence(data2[5]))
                    {   if(lstArr_5.indexOf(data2[5])===-1){   lstArr_5.push(data2[5]); } } 
                }
                
                
                function getSelector(data1, arr)
                {
                    let returner = "";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   
                            if(arr[a][0]!==data1)
                            {   returner += "<option value=\"" + arr[a][1] + "\" >" + aux_textSignIn(arr[a][0]) + "</option>";  }
                            else
                            {   returner += "<option value=\"" + arr[a][1] + "\" selected>" + aux_textSignIn(arr[a][0]) + "</option>";  }
                        }
                    }
                    
                    return returner;                     
                }
                
                function getListor(data1, arr)
                {
                    let returner = "";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   returner += "<option value=\"" + aux_textSignIn(arr[a]) + "\">";  }
                    }
                    
                    return [data1, returner];                      
                }




                let data03 = data02.split("*|DP|*");
                for(let row of data03) {   getArr(row);       }
                
                

                    arrReturner[0] = "1";                               //frameID
                    arrReturner[1] = getListor(data01[1], lstArr_1);        //Name
                    arrReturner[2] = getListor(data01[2], lstArr_2);        //Country
                    arrReturner[3] = getListor(data01[3], lstArr_3);        //State/Province
                    arrReturner[4] = getListor(data01[4], lstArr_4);        //City
                    arrReturner[5] = getListor(data01[5], lstArr_5);        //Street
                    arrReturner[6] = data01[6];                             //Number/Unit
                    arrReturner[7] = data01[7];                             //Point (fixedDimension: Set from eframe on uniqueFrame.getFrame...inputter.formatOptions(){})
                    arrReturner[8] = data01[8];                             //Comments
                
 
                return arrReturner;
            },
            
            eframe:  
            [
                {label:"Name", bodyWrapperHead:"10", type:"list", required:true, moveupdown:true, dynamicDimension: "true", efunction:[["onfocus","frame.edit.eDetails.efocusON",""],["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {removepermission:true, list:"editList_1"}},
                {label:"Country", type:"list", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_2"}},
                {label:"State/Province", type:"list", efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_3"}},
                {label:"City", type:"list", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_4"}},
                {label:"Street", type:"list", efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_5"}},
                {label:"Number/Unit", type:"text", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Point", type:"select", fixedDimension: [], efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute:{options:[["Destination","",""],["Start at","",""],["Finish at","",""],["Start and Finish","",""],["Pass by","",""]]}},
                {label:"Comments", type:"textarea", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]] }       
            ],
        },


        bodyFrame_v2:
        {   
            id:2, 
            dMode: "true",
           
            eDimensionalData: function(data01)
            {
                let data02 = document.getElementById("dimension_Locations").value;
                let lstArr_1=[], lstArr_2=[], lstArr_3=[], lstArr_4=[], lstArr_5=[];
                let selectArr_1=[[]];
                let arrReturner = ["","","","","","","","","",""];
                

                function getArr(data1)
                {
                    let data2 = data1.split("*|3f4x|*");
                       
                    if(aux_existence(data2[1]))
                    {   if(lstArr_1.indexOf(data2[1])===-1){   lstArr_1.push(data2[1]); } } 
                    
                    if(aux_existence(data2[2]))
                    {   if(lstArr_2.indexOf(data2[2])===-1){   lstArr_2.push(data2[2]); } }   
                    
                    if(aux_existence(data2[3]))
                    {   if(lstArr_3.indexOf(data2[3])===-1){   lstArr_3.push(data2[3]); } } 
                    
                    if(aux_existence(data2[4]))
                    {   if(lstArr_4.indexOf(data2[4])===-1){   lstArr_4.push(data2[4]); } }                     
                    
                    if(aux_existence(data2[5]))
                    {   if(lstArr_5.indexOf(data2[5])===-1){   lstArr_5.push(data2[5]); } } 
                }
                
                
                function getSelector(data1, arr)
                {
                    let returner = "";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   
                            if(arr[a][0]!==data1)
                            {   returner += "<option value=\"" + arr[a][1] + "\" >" + aux_textSignIn(arr[a][0]) + "</option>";  }
                            else
                            {   returner += "<option value=\"" + arr[a][1] + "\" selected>" + aux_textSignIn(arr[a][0]) + "</option>";  }
                        }
                    }
                    
                    return returner;                     
                }
                
                function getListor(data1, arr)
                {
                    let returner = "";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   returner += "<option value=\"" + aux_textSignIn(arr[a]) + "\">";  }
                    }
                    
                    return [data1, returner];                      
                }




                if(data02.indexOf("*|DP|*")!==-1)
                {
                    let data03 = data02.split("*|DP|*");
   
                    for(let iLen = data03.length, i=0; i<iLen; i++)
                    {   getArr(data03[i]);       }
                }
                else
                {   getArr(data02);   }
                
                
                
                if(aux_existence(data01))
                { 
                    if(parseInt(data01[0])===1)
                    {
                        let arrD = data01;
                        
                        data01[6] = arrD[2];
                        data01[5] = arrD[3];
                        
                        data01[3] = arrD[5];
                        data01[2] = arrD[6];                        
                    }
                }
                else
                {   data01 = ["","","","","","","","","",""]; }
                
                
                arrReturner[0] = "2";                                   //frameID
                arrReturner[1] = getListor(data01[1], lstArr_1);        //Name
                arrReturner[2] = data01[2];                             //Number/Unit
                arrReturner[3] = getListor(data01[3], lstArr_2);        //Street
                arrReturner[4] = getListor(data01[4], lstArr_3);        //City
                arrReturner[5] = getListor(data01[5], lstArr_4);        //State/Province
                arrReturner[6] = getListor(data01[6], lstArr_5);        //Country
                arrReturner[7] = data01[7];                             //Point (fixedDimension: Set from eframe on uniqueFrame.getFrame...inputter.formatOptions(){})
                arrReturner[8] = data01[8];                             //Comments
                
 
                return arrReturner;
            },
            
            eframe:  
            [
                {label:"Name", bodyWrapperHead:"10", type:"list", dynamicDimension:"true", required:true, moveupdown:true, efunction:[["onfocus","frame.edit.eDetails.efocusON",""],["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {removepermission:true, list:"editList_1"}},
                {label:"Number/Unit", type:"text", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Street", type:"list", efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_2"}},
                {label:"City", type:"list", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_3"}},
                {label:"State/Province", type:"list", efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_4"}},
                {label:"Country", type:"list", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_5"}},
                {label:"Point-Of-Interest", type:"select", fixedDimension: [], efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute:{options:[["Destination","",""],["Start at","",""],["Finish at","",""],["Start and Finish","",""],["Pass by","",""]]}},
                {label:"Comments", type:"textarea", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]] }       
            ],
        },


        bodyFrame_v3:
        {   
            id:3, 
            dMode: "true",
 
            exceptionToStore: "Locations",
            eframe:  
            [
                {label:"Class-1", type:"list", bodyWrapperHead:"10", dimensional:true, dynamic:"true", rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{list:"editList_1"}},
                {label:"Class-2", type:"list", bodyWrapperHead:"20", dimensional:true,  dynamic:"true", rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{list:"editList_2"}},
                {label:"Name",  type:"list", bodyWrapperHead:"30", dimensional:true,  dynamicAction:"true", required:true, moveupdown:true, rIndex:"f3", dReport:["f3-f1","f3-f2","f3-f4","f3-f5","f3-f6"], attribute:{removepermission:"main", list:"editList_3", moveupdown:true}},
                {label:"Number/Unit", type:"text"},
                {label:"Street", type:"list", dimensional:true,  rIndex:"f4", dReport:["f4-f3"], attribute:{list:"editList_4"}},
                {label:"City", type:"list", dimensional:true,  rIndex:"f5", dReport:["f5-f3"], attribute:{list:"editList_5"}},
                {label:"State/Province", type:"list", dimensional:true,   rIndex:"f6", dReport:["f6-f3"], attribute:{list:"editList_6"}},
                {label:"Country", type:"list", dimensional:true, rIndex:"f7", dReport:["f7-f3"], attribute:{list:"editList_7"}},
                {type:"textarea"}       
            ],
        },
        
                
                
        bodyFrame_v4:
        {   
            id:4, 
            dMode: "true",
 
            exceptionToStore: "Locations",
            eframe:  
            [
                {label:"Class-1", labelID:"_class1", type:"list", bodyWrapperHead:"10", changeDepth:true, dimensional:true, dynamic:"true", rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{list:"editList_1"}},
                {label:"Class-2", labelID:"_class2", type:"list", bodyWrapperHead:"20", changeDepth:true, dimensional:true,  dynamic:"true", rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{list:"editList_2"}},
                {label:"Name",  labelID:"_name", type:"list", bodyWrapperHead:"30", changeDepth:true, dimensional:true, dynamic:"true", dynamicAction:"true", required:true, moveupdown:true, rIndex:"f3", dReport:["f3-f1","f3-f2","f3-f4","f3-f5"], attribute:{removepermission:"main", list:"editList_3", moveupdown:true}},
                {labelID:"_reference", type:"hidden"},
                {label:"Unit", labelID:"_unit", type:"text"},
                {label:"Street", type:"list", dimensional:true,  rIndex:"f4", dReport:["f4-f3"], attribute:{list:"editList_4"}},
                {label:"City", type:"list", dimensional:true,  rIndex:"f5", dReport:["f5-f3"], attribute:{list:"editList_5"}},
                {label:"State/Province", type:"list", dimensional:true,   rIndex:"f6", dReport:["f6-f3"], attribute:{list:"editList_6"}},
                {label:"Country", type:"list", dimensional:true, rIndex:"f7", dReport:["f7-f3"], attribute:{list:"editList_7"}},
                {type:"textarea", labelID:"_comments", codeSelector:9}       
            ],
        },
        
        bodyFrame_v5:
        {   
            id:5, 
            dMode: "true",
 
            exceptionToStore: "Locations",
            eframe:  
            [
                {label:"Class-1", labelID:"_class1", type:"list", bodyWrapperHead:"10", changeDepth:true, dimensional:true, dynamic:"true", rIndex:"f1", dReport:["f1-f2","f1-f3"], attribute:{list:"editList_1"}},
                {label:"Class-2", labelID:"_class2", type:"list", bodyWrapperHead:"20", changeDepth:true, dimensional:true,  dynamic:"true", rIndex:"f2", dReport:["f2-f1","f2-f3"], attribute:{list:"editList_2"}},
                
                
                {label:"Name",  labelID:"_name", type:"list", bodyWrapperHead:"30", changeDepth:true, dimensional:true, dynamic:"true", dynamicAction:"true", required:true, moveupdown:true, rIndex:"f3", dReport:["f3-f1","f3-f2","f3-f4","f3-f5"], attribute:{removepermission:"main", list:"editList_3", moveupdown:true, data_reference_value:true, data_action_property_linked:"4"}},
                {labelID:"_reference", type:"hidden", linker:true},
                
                
                {label:"Unit", labelID:"_unit", type:"text"},
                {label:"Street", type:"list", dimensional:true,  rIndex:"f4", dReport:["f4-f3"], attribute:{list:"editList_4"}},
                {label:"City", type:"list", dimensional:true,  rIndex:"f5", dReport:["f5-f3"], attribute:{list:"editList_5"}},
                {label:"State/Province", type:"list", dimensional:true,   rIndex:"f6", dReport:["f6-f3"], attribute:{list:"editList_6"}},
                {label:"Country", type:"list", dimensional:true, rIndex:"f7", dReport:["f7-f3"], attribute:{list:"editList_7"}},
                {type:"textarea", labelID:"_comments", codeSelector:9}       
            ],
        },


        bodyFrame_resources:
        {   
            id:"Resources", 
            dMode: "true",
           
            eDimensionalData: function(data01 = ["","","","","","","","","",""])
            {
                let data02 = document.getElementById("dimension_Locations").value;
                let lstArr_1=[], lstArr_2=[], lstArr_3=[], lstArr_4=[], lstArr_5=[];
                let selectArr_1=[[]];
                let arrReturner = ["","","","","","","","","",""];
                

                function getArr(data1)
                {
                    let data2 = data1.split("*|3f4x|*");
                       
                    if(aux_existence(data2[0]))         //Name
                    {   if(lstArr_1.indexOf(data2[0])===-1){   lstArr_1.push(data2[0]); } } 
                }
                
                
                function getSelector(data1, arr)
                {
                    let returner = "<option value=\"\">Select Location</option>";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   
                            if(arr[a]!==data1)
                            {   returner += "<option value=\"" + arr[a] + "\">" + aux_textSignIn(arr[a]) + "</option>";  }
                            else
                            {   returner += "<option value=\"" + arr[a] + "\" selected>" + aux_textSignIn(arr[a]) + "</option>";  }
                        }
                    }
                    
                    return returner;                     
                }
                
                function getListor(data1, arr)
                {
                    let returner = "";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   returner += "<option value=\"" + aux_textSignIn(arr[a]) + "\">";  }
                    }
                    
                    return [data1, returner];                      
                }




                if(data02.indexOf("*|DP|*")!==-1)
                {
                    let data03 = data02.split("*|DP|*");
   
                    for(let iLen = data03.length, i=0; i<iLen; i++)
                    {   getArr(data03[i]);       }
                }
                else
                {   getArr(data02);   }
                
                
                //if(aux_existence(data01))
                //{
                    arrReturner[0] = "Resources";                               //frameID
                    arrReturner[1] = data01[1];                                 //Container
                    arrReturner[2] = data01[2];                                 //pTitle=(Locations)
                    arrReturner[3] = getSelector(data01[3], lstArr_1);          //Name
                    arrReturner[4] = data01[4];                                 //Number-Unit
                    arrReturner[5] = data01[5];                                 //Street
                    arrReturner[6] = data01[6];                                 //City
                    arrReturner[7] = data01[7];                                 //State-Province
                    arrReturner[8] = data01[8];                                 //Country
                    arrReturner[9] = data01[9];                                 //Comments
                    arrReturner[10] = (data01[10])? data01[11]: DateTime.aux_ParseTo.extendDateTime_local(new Date().getTime());                             //DateTime
                //}
 
                return arrReturner;
            },
            
            eframe:  
            [
                {label:"Container", type:"text", /*bodyWrapperHead:"20"*/dMode:false, fixedDimension: [], efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute:{disabled:true /*readonly:true*/}},
                {label:"Property", type:"text", fixedDimension: [], dMode:false, efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute:{disabled:true}},                
                {label:"Name", bodyWrapperHead:"30", type:"select", required:true, moveupdown:true, datahold:true, dynamicDimension: "true", efunction:[["onfocus","frame.edit.eDetails.efocusON",""],["onfocusout","frame.edit.eDetails.efocusOFF",""],["onchange","Locations.setLocation",""]], attribute: {removepermission:"main"}},
                {label:"Number/Unit", type:"text", datahold:true, efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {readonly:true}},
                {label:"Street", type:"text", datahold:true, efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {readonly:true}},
                {label:"City", type:"text", datahold:true, efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {readonly:true}},
                {label:"State/Province", type:"text", datahold:true, efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {readonly:true}},
                {label:"Country", type:"text", datahold:true, efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {readonly:true}},                
                {label:"Comments", type:"textarea", datahold:true, efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Closed On", bodyWrapperHead:"31", type:"datetime-local", datahold:true, efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]}
            ],
        },

        
        footFrame:
        {
            id:"foot",
            eframe: [{type:"button", attribute: {value:"Remove Selected Name", button_type:"RemovalButton", data_property_block:"", data_property_element:""}}]
        },
        
        
        returner: function(frameID)
        {  
            if(parseInt(frameID)===1){  return this.bodyFrame_v1; }   
            if(parseInt(frameID)===2){  return this.bodyFrame_v2; }  
            if(parseInt(frameID)===3){  return this.bodyFrame_v3; } 
            
            if(frameID==="head"){ return this.headFrame;}
            if(frameID==="foot"){ return this.footFrame;}
            //if(aux_existence(frameID)){if(frameID.includes("Resources")){  return this.bodyFrame_resources; }}
            //if((aux_existence(dframe))||(!aux_existence(frameID))||(parseInt(frameID)===3)){return this.bodyFrame_v3; }
            
            return this.bodyFrame_v5; 
        }
    },
}




