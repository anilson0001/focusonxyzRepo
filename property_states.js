const States =
{
    
    instructions: function()
    {
        return "";
/*
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
*/
    },
    
    saveException: function(){  return "";  },
    
    saveToClassStore: function(data1)
    {  
        function singleLogManager(data2)
        {
            let thisReturner=[], buffer=[];            
            /*
                Last Update:            July 07, 2023
                Last Update by:         Anilson Cardoso
                Called from:            next upper Level
                Calls Made from here:   none
                
                Description:            This function sets the format that property will be stored inside of the class_Store
            */  
            function userData(data4)
            {
                    let data5 = data4[4].split("*|3f5x|*");
                    for(let data6 of data5)
                    {
                        if(aux_existence(data6))
                        {
                            let data7 = data6.split("*|3f6x|*");
                            if(parseInt(data7[0])===10)
                            {  
                                if(aux_existence(data7[1]))
                                {   
                                    thisReturner.push([{name:"With Data", dimensional:true}, {name:"Names", dimensional:true, kpe:"-1",kpi:"-1"}, {name:data7[3], dimensional:true, kpe:"[5]",kpi:"[5]"}, {name:data4[3], dimensional:true}, {name:data7[1], dimensional:true}, {name:data7[2], dimensional:true}]);                
                                    thisReturner.push([{name:"With Data"}, {name:"Tools"},{name:data4[3]},{name:data7[2]},{name:data7[3]},{name:data7[4]},{name:data7[1]}]);      
                                }  
                                
                                buffer.push([{name:"With Data"},{name:"Names"}, {name:data7[1]}, {name:(aux_existence(data7[2]))? data7[2]: "..."/*measure-1*/}, {name:(aux_existence(data4[3]))? data7[3]: "..." /*measure-2*/}, {name:(aux_existence(data7[4]))? data7[4]: "..." /*measure-3*/}]);
                                buffer.push([{name:"With Data"},{name:"Measures"},{name:data7[2]},{name:data7[1]}]);
                                buffer.push([{name:"With Data"},{name:"Measures"},{name:data7[3]},{name:data7[1]}]);
                                buffer.push([{name:"With Data"},{name:"Measures"},{name:data7[4]},{name:data7[1]}]);
                            }
                        }
                    }
            }

        
            
            data2.forEach(function(data3){ if(aux_existence(data3)){ userData(data3.split("*|3f4x|*")); }}); 
            
            
            return [thisReturner, ["Variants", buffer]];
        }

        
        return singleLogManager(data1.split("*|3f3x|*"));  
    },


     

    
    frame: 
    {   
        headFrame_v1:
        {   
            id:"head",
            dMode: "true",
 
            eDimensionalData: function(Data)
            {
                let arrReturner = ["head","",""];
                
                let lstArr_1 = ["<option value=\"\">Select Existing States</option>"];          //pname


                function getSelector(selected, arr)
                {
                    
                    let returner = "";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   
                            let value="";
                            if((aux_existence(selected)))
                            {   if(selected===arr[a]){  value="selected"; }  }
                            returner += "<option value=\"" + a + "\" " + value + ">" + aux_textSignIn(arr[a]) + "</option>";  
                            
                        }
                    }
                    
                    return returner; 
                }
             
                
                if(aux_existence(document.getElementById("dimension_States")))
                {
                    (function(data1)
                    {
                        for(let row of data1)
                        {   
                            if(aux_existence(row))
                            { 
                                let element = row.split("*|3f4x|*");
                                lstArr_1.push(element[0]); 
                            }  
                        }
                        
                        lstArr_1.sort();
                    })(document.getElementById("dimension_States").value.split("*|DP|*"));
                }
                

                
                arrReturner[1] = "";                                    //button
                arrReturner[2] = getSelector(Data[2], lstArr_1);        //name
 
                return arrReturner;
            },    
            
            
            eframe: 
            [
                {type:"button", efunction:[["onclick","frame.edit.eAction.eBody.eProperty.eFrameBlock",["1",false,false]]], extraclass: "_Button", attribute: {value:"Add State"}},
                {type:"select", dynamicDimension: "true",  efunction: [["onchange","frame.edit.eAction.eBody.eProperty.eDimensionalSelection",""]]}
            ],
        },
        
        
        headFrame:
        {   
            id:"head",
            dMode: "true",
            eframe: 
            [
                {type:"button", efunction:[["onclick","frame.edit.eAction.eBody.eProperty.eFrameBlock",["1",false,false]]], extraclass: "_Button", attribute: {value:"Add State"}}
            ],
        },
        
        bodyFrame_v1:
        {   
            id:1, 
            dMode: "true",
            eDimensionalData: function(data=["","",""])
            {
                let returnerArr = ["1","",""];
                
                let lstArr_1 = [];


                (function getListArr(data1)
                {
                    if(aux_existence(data1))
                    {
                        let data2 = data1.value.split("*|DP|*");
                        {
                            for(let data3 of data2)
                            {
                                let data4 = data3.split("*|3f4x|*");
                                   
                                if(aux_existence(data4[1]))
                                {   if(lstArr_1.indexOf(data4[1])===-1){   lstArr_1.push(data4[1]); } } 
                            }
                        }
                    }
                })(document.getElementById("dimension_States"));
                
                
                
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
                
                  
                returnerArr[1] = aux_existence(data[1])? data[1]: "";                                           //name
                returnerArr[2] = aux_existence(data[2])? data[2]: "";                                           //comment
                returnerArr[3] = aux_existence(data[3])? data[3]: ""; //getListor(data[3], lstArr_1);                                                  //tools
                
                return returnerArr;
            },
            
            eframe:  
            [                         
                {label:"Name", bodyWrapperHead:"10", required:true, moveupdown:true, type:"text", efunction:[["onfocus","frame.edit.eDetails.efocusON",""],["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {removepermission:true}},
                {label:"Comments", type:"textarea", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},  
                {label:"Tools", type:"list", /*bodyWrapperHead:"10",*/  moveupdown:false, efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]],  attribute: {list:"editList_31", required:"true", placeholder:"Select/Enter Name"}},
                {label:"Configuration", type:"button", halfLength:"true", dynamicDimension: "true", efunction: [["onclick","frame.edit.eAction.eBody.eProperty.eFrameBlock",["10",false,true,"4"]]], attribute:{value:"Add New", name:"ignore"}}
            ],
        },
        
        
        bodySubFrame_v1:
        {   
            id:10, 
            dMode: "true",
            
            eDimensionalData: function(Data)
            {
                let data0 = document.getElementById("dimension_States");
                let data1 = (aux_existence(data0))? data0.value: ["","","","","","","","","","","","","",""];
                let returnerArr = ["10","","","","","","","","","","","","","","",""];
                
                let lstArr_1=[], lstArr_2=[], lstArr_3=[], lstArr_4=[];
                
                let selectArr_1 = [["None","",""],["Low","1",""],["Medium","2",""],["High","3",""]];
                let selectArr_2 = [["None","",""],["Low","1",""],["Medium","2",""],["High","3",""]];
                let selectArr_3 = [["Select Completion","",""],["0%","1",""],["Bellow 20%","2",""],["Bellow 35%","3",""],["Bellow 50%","",""],["Above 50%","4",""],["Above 65%","5",""],["Above 80%","6",""], ["100%","7",""]];


                (function getArr(data1)
                {
                    if(aux_existence(data1))
                    {
                        let data2 = data1.value.split("*|DP|*");
                        {
                            for(let data3 of data2)
                            {
                                let data4 = data3.split("*|3f4x|*");
                                   
                                if(aux_existence(data4[1]))
                                {   if(lstArr_1.indexOf(data4[1])===-1){   lstArr_1.push(data4[1]); } } 
                                
                                if(aux_existence(data4[2]))
                                {   if(lstArr_2.indexOf(data4[2])===-1){   lstArr_2.push(data4[2]); } }   
                                
                                if(aux_existence(data4[3]))
                                {   if(lstArr_3.indexOf(data4[3])===-1){   lstArr_3.push(data4[3]); } } 
                            }
                        }
                    }
                })(document.getElementById("dimension_States"));
                
                
                (function getArr(data1)
                {
                    if(aux_existence(data1))
                    {
                        let data2 = data1.value.split("*|DP|*");
                        {
                            for(let data3 of data2)
                            {
                                let data4 = data3.split("*|3f4x|*");
                                   
                                if(aux_existence(data4[1]))
                                {   if(lstArr_4.indexOf(data4[1])===-1){   lstArr_4.push(data4[1]); } } 
                                
                                if(aux_existence(data4[2]))
                                {   if(lstArr_4.indexOf(data4[2])===-1){   lstArr_4.push(data4[2]); } }   
                                
                                if(aux_existence(data4[3]))
                                {   if(lstArr_4.indexOf(data4[3])===-1){   lstArr_4.push(data4[3]); } } 
                            }
                        }
                    }
                })(document.getElementById("dimension_Variants"));
                
                
                function getSelector(data1, arr)
                {
                    let returner = "";
                    for(let aLen=arr.length, a=0; a<aLen; a++)
                    {
                        if(aux_existence(arr[a]))
                        {   
                            if(arr[a][1]!==data1)
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

                
                
                
                
                  

                returnerArr[1] = getListor(data1[1], lstArr_2);                                                      //class
                returnerArr[2] = getListor(data1[2], lstArr_3);                                                      //subclass 
                returnerArr[3] = aux_existence(data1[3])? data1[3]: "";                                               //name                
                returnerArr[4] = getSelector(data1[4], selectArr_1);                                                 //priority
                returnerArr[5] = getSelector(data1[5], selectArr_2);                                                 //risk
                returnerArr[6] = getSelector(data1[6], selectArr_3);                                                 //status
                returnerArr[7] = getListor(data1[7], lstArr_4);                                                      //measure-1
                returnerArr[8] = aux_existence(data1[8])? data1[8]: "";                                               //value-1
                returnerArr[9] = getListor(data1[9], lstArr_4);                                                    //measure-2           
                returnerArr[10] = aux_existence(data1[10])? data1[10]: "";                                            //value-2
                returnerArr[11] = getListor(data1[11], lstArr_4);                                                    //measure-3
                returnerArr[12] = aux_existence(data1[12])? data1[12]: "";                                            //value-3
                returnerArr[13] = aux_existence(data1[13])? data1[13]: "";                                            //Comment
                
                return returnerArr;
            },            
            
            eframe: 
            [       
                {label:"Class", type:"list", bodyWrapperHead:"10",  moveupdown:false,  efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]],  attribute: {list:"editList_32", required:"true", placeholder:"Select/Enter Name"}},
                {label:"SubClass", type:"list", bodyWrapperHead:"20", moveupdown:false,  efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]],  attribute: {list:"editList_33", placeholder:"Select/Enter Name"}},
                {label:"Name", type:"text", bodyWrapperHead:"30", moveupdown:true, required:true, efunction:[["onfocus","frame.edit.eDetails.efocusON",""],["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {removepermission:true}},                
                {label:"Priority", type:"select",  efunction:[["onfocus","frame.edit.eDetails.efocusON",""],["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Risk", type:"select",  efunction:[["onfocus","frame.edit.eDetails.efocusON",""],["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Status", type:"select",  efunction:[["onfocus","frame.edit.eDetails.efocusON",""],["onfocusout","frame.edit.eDetails.efocusOFF",""]]},
                {label:"Measure-1", type:"list",  dynamicDimension: "true", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_34"}},
                {label:"Value-1", type:"text",  efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},    
                {label:"Measure-2", type:"list",  dynamicDimension: "true", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_35"}},
                {label:"Value-2", type:"text",  efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},   
                {label:"Measure-3", type:"list",  dynamicDimension: "true", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]], attribute: {list:"editList_36"}},
                {label:"Value-3", type:"text",  efunction:[["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]},  
                {label:"Comments", type:"textarea", efunction: [["onfocus","frame.edit.eDetails.efocusON",""], ["onfocusout","frame.edit.eDetails.efocusOFF",""]]}
            ]
        },
        
        
        footFrame:
        {
            id:"foot",
            eframe:  
            [
                {type:"button", efunction:[["onclick","frame.edit.eAction.eBody.eProperty.eFrameBlock",["",true,""]]], extraclass: "_Button", attribute: {value:"Remove Selected Name"}},
                {type:"hidden", name: "blockSelected"},
                {type:"hidden", name: "lastElementToLoseFocus"}                        
            ]
        },
        
        returner: function(dframe=true, frameID)
        {  
            let value = "";
            if((aux_existence(dframe))||(!aux_existence(frameID))||(parseInt(frameID)===1)){  value = this.bodyFrame_v1; }
            
            if(parseInt(frameID)===10){   value = this.bodySubFrame_v1;  }
                
            if(frameID==="head"){       value = this.headFrame; }
            if(frameID==="foot"){       value = this.footFrame; }
            
            return value;
        }
    }
};



