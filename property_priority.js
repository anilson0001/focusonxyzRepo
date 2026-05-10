var Priority =
{
    //called from updateStore.js >>  frame_update_action 
    //called from frame.js >>  edit.edit_Property >> edit.edit_ExpandProperty 
    //it allows the code to loop n times and get the values from n inputs
    propertyDivision: ()=>1,

    
    
    //called from obj frame >>  edit >> edit_Body >> groupProperties >> edit_Property
    //it determine how many property block is already created; 
    // 1 represents no block is created
    initialCounter: 2,
    pointException: "1@5",
    data:"",
    
    instructions: function()
    {
        return `Strategic Value (5): 
                        How strongly this supports long-term goals or vision. Used to rank items that align with strategy highest.

                    Impact (4): 
                        The level of benefit or change it will create. Used to prioritize items that deliver the biggest results.

                    Urgency (3): 
                        How time-sensitive it is. Used to move up items with deadlines or immediate needs.

                    Dependencies (3): 
                        How many other tasks rely on it. Used to prioritize items that unlock or enable others.

                    Simplicity (2): 
                        How easy it is to complete. Used to quickly win progress by tackling low-effort tasks.

                    Visibility (2): 
                        How noticeable it will be to stakeholders or users. Used to prioritize items that improve perception and trust.

                    They differ in focus: some look at long-term alignment (Strategic Value), 
                    others at outcomes (Impact), 
                    deadlines (Urgency), 
                    sequencing (Dependencies), 
                    quick wins (Simplicity), 
                    or perception (Visibility)`
    },
    

    frame: 
    {   
        headFrame:"",
        bodyFrame_v1:
        {   
            id:1, 
            dMode: "true",            
            eDimensionalData: function(data)
            {
                let arr1 = [["None","",""],["Low","",""],["Medium","",""],["High","",""]];
                let arr2 = [["None","",""],["Low","",""],["Medium","",""],["High","",""]];
                let arr3 = [["None","",""],["Low","",""],["Medium","",""],["High","",""]];
                let arr4 = [["None","",""],["Low","",""],["Medium","",""],["High","",""]];
                
                            
                if(!aux_existence(data)){data = ["","0","0","0"];}
                
                function optionArr(arr, selector)
                {
                    let returner="";
                    if(aux_existence(arr))
                    {
                        for(let aLen=arr.length, a=0; a<aLen; a++)
                        {
                            let selection = "";
                            if(a===parseInt(selector)){selection="selected"; }
                            if(aux_existence(arr[a]))
                            {   
                                let value = (a!==0)? a: "";
                                returner = returner + "<option value=\"" + value + "\" " + selection + ">" + aux_textSignIn(arr[a][0]) + "</option>";   
                                
                            }
                        }   
                    }
                    return returner;
                }
 
                return [1,optionArr(arr1, data[1]),optionArr(arr2, data[2]),optionArr(arr3, data[3]), optionArr(arr4, data[4])];
            },
            exceptionToStore: "Priority",
            eframe:   [
                                {label:"Importance",elementID: "importance_", mandatory: "true",required:"true", fixedDimension: [["None",""],["Low",""],["Medium",""],["High",""]], name:"unignore", type:"select"},
                                {label:"Urgency",   elementID: "urgency_",    mandatory: "true",required:"true", fixedDimension: [["None",""],["Low",""],["Medium",""],["High",""]], name:"unignore", type:"select"},
                                {label:"Impact (+)",elementID: "impactplus_", mandatory: "true",required:"true", fixedDimension: [["None",""],["Low",""],["Medium",""],["High",""]], name:"unignore", type:"select"},
                                {label:"Effort",elementID: "effort_", mandatory: "true",required:"true", fixedDimension: [["High",""],["Medium",""],["Low",""],["None",""]], name:"unignore", type:"select"},
                            ]
        },

        bodyFrame_v2:
        {   
            id:2, 
            dMode: "true",  
            exceptionToStore: true,
            eDimensionalData: function(data)
            {
                let arr1 = [["None","",""],["Low","",""],["Medium","",""],["High","",""]];
                let arr2 = [["None","",""],["Low","",""],["Medium","",""],["High","",""]];
                let arr3 = [["None","",""],["Low","",""],["Medium","",""],["High","",""]];
                
                            
                if(!aux_existence(data)){data = ["","0","0","0"];}
                
                function optionArr(arr, selector)
                {
                    let returner="";
                    if(aux_existence(arr))
                    {
                        for(let aLen=arr.length, a=0; a<aLen; a++)
                        {
                            let selection = "";
                            if(a===parseInt(selector)){selection="selected"; }
                            if(aux_existence(arr[a]))
                            {   
                                let value = (a!==0)? a: "";
                                returner = returner + "<option value=\"" + value + "\" " + selection + ">" + aux_textSignIn(arr[a][0]) + "</option>";   
                                
                            }
                        }   
                    }
                    return returner;
                }
 
                return [2, optionArr(arr1, data[1]), optionArr(arr2, data[2]), optionArr(arr3, data[3])];
            },
         
            eframe:   [
                                {label:"Importance",elementID: "importance_", mandatory: "true",required:"true", fixedDimension: [["None",""],["Low",""],["Medium",""],["High",""]], name:"unignore", type:"select"},
                                {label:"Urgency",   elementID: "urgency_",    mandatory: "true",required:"true", fixedDimension: [["None",""],["Low",""],["Medium",""],["High",""]], name:"unignore", type:"select"},
                                {label:"Effort",elementID: "effort_", mandatory: "true",required:"true", fixedDimension: [["High",""],["Medium",""],["Low",""],["None",""]], name:"unignore", type:"select"},
                            ]
        },
        
        bodyFrame_v3:
        {   
            id:3, 
            dMode: "true",   
            exceptionToStore: true,
            eframe:   [
                                {label:"Importance", type:"select", elementID: "importance_", rIndex:"f1", dReport:["f1"], name:"unignore", attribute: {options:[["None","0"],["Low","1"],["Medium","2"],["High","3"]]}},
                                {label:"Urgency",    type:"select", elementID: "urgency_",    rIndex:"f2", dReport:["f2"], name:"unignore", attribute: {options:[["None","0"],["Low","1"],["Medium","2"],["High","3"]]}},
                                {label:"Impact (+)", type:"select", elementID: "impactplus_", rIndex:"f3", dReport:["f3"], name:"unignore", attribute: {options:[["None","0"],["Low","1"],["Medium","2"],["High","3"]]}},
                                {label:"Effort",     type:"select", elementID: "effort_",     rIndex:"f4", dReport:["f4"], name:"unignore", attribute: {options:[["None","0"],["Low","1"],["Medium","2"],["High","3"]]}}
                            ]
        },
        
        bodyFrame_v4:
        {   
            id:4, 
            dMode: "true",   
            exceptionToStore: true,
            eframe: [
                        {label:"Importance",  type:"select", rIndex:"f1", dReport:["f1"], name:"unignore", attribute:{options:[["None",""],["Low","Low"],["Medium","Medium"],["High","High"]]}},
                        {label:"Urgency",     type:"select", rIndex:"f3", dReport:["f3"], name:"unignore", attribute:{options:[["None",""],["Low","Low"],["Medium","Medium"],["High","High"]]}},
                        {label:"Difficulty", type:"select", rIndex:"f4", dReport:["f4"], name:"unignore", attribute:{options:[["None",""],["Low","Low"],["Medium","Medium"],["High","High"]]}}
                    ]
        },
        
        
        bodyFrame_v5:
        {   
            id:5, 
            dMode: "true",   
            exceptionToStore: true,
            eframe: [
                        {label:"Summary",  type:"text", bodyWrapperHead:"10", changeDepth:true,  attribute:{disabled:true}},              
                        {label:"Importance",  type:"select", rIndex:"f1", dReport:["f1"], name:"unignore", attribute:{options:[["None","None"],["Low","Low"],["Medium","Medium"],["High","High"]]}},
                        {label:"Urgency",     type:"select", rIndex:"f3", dReport:["f3"], name:"unignore", attribute:{options:[["None","None"],["Low","Low"],["Medium","Medium"],["High","High"]]}},
                        {label:"Difficulty", type:"select", rIndex:"f4", dReport:["f4"], name:"unignore", attribute:{options:[["None","None"],["Low","Low"],["Medium","Medium"],["High","High"]]}}

                    ]
        },
        
        bodyFrame_v6:
        {   
            id:6, 
            dMode: "true",   
            exceptionToStore: true,
            eframe: [
                        {label:"Summary",  type:"text", bodyWrapperHead:"10", changeDepth:true,  attribute:{disabled:true}},     
                        {label:"Strategic Value",  type:"select", rIndex:"f1", dReport:["f1"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","2.5"],["Medium","Medium","4"],["High","High","5"]]}},
                        {label:"Impact",  type:"select", rIndex:"f1", dReport:["f1"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","2"],["Medium","Medium","3"],["High","High","4"]]}},
                        {label:"Urgency",     type:"select", rIndex:"f3", dReport:["f3"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","1.5"],["Medium","Medium","2"],["High","High", "3"]]}},
                        {label:"Dependency", type:"select", rIndex:"f4", dReport:["f4"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","1.5"],["Medium","Medium","2"],["High","High","3"]]}},
                        {label:"Simplicity",  type:"select", rIndex:"f1", dReport:["f1"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","1"],["Medium","Medium","1.5"],["High","High","2"]]}},
                        {label:"Visibility",  type:"select", rIndex:"f1", dReport:["f1"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","1"],["Medium","Medium","1.5"],["High","High","2"]]}}
                    ]
        },
        
        bodyFrame_v7:
        {   
            id:7, 
            dMode: "true",   
            exceptionToStore: true,
            eframe: [
                        {label:"Summary",  type:"text", bodyWrapperHead:"10", changeDepth:true,  attribute:{disabled:true}},     
                        {label:"Significance",  type:"select", rIndex:"f1", dReport:["f1"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","2.5"],["Medium","Medium","4"],["High","High","5"]]}},
                        {label:"Impact",  type:"select", rIndex:"f1", dReport:["f1"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","2"],["Medium","Medium","3"],["High","High","4"]]}},
                        {label:"Urgency",     type:"select", rIndex:"f3", dReport:["f3"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","1.5"],["Medium","Medium","2"],["High","High", "3"]]}},
                        {label:"Dependency", type:"select", rIndex:"f4", dReport:["f4"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","1.5"],["Medium","Medium","2"],["High","High","3"]]}},
                        {label:"Simplicity",  type:"select", rIndex:"f1", dReport:["f1"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","1"],["Medium","Medium","1.5"],["High","High","2"]]}},
                        {label:"Visibility",  type:"select", rIndex:"f1", dReport:["f1"], name:"unignore", attribute:{options:[["None","None","0"],["Low","Low","1"],["Medium","Medium","1.5"],["High","High","2"]]}}
                    ]
        },
        
        footFrame:"",

        returner: function(frameID)
        {
            if(parseInt(frameID)===1){ return this.bodyFrame_v1;}
            if(parseInt(frameID)===2){ return this.bodyFrame_v2;}
            if(parseInt(frameID)===3){ return this.bodyFrame_v3;}    
            if(parseInt(frameID)===4){ return this.bodyFrame_v4;}  
            if(parseInt(frameID)===5){ return this.bodyFrame_v5;} 
            if(parseInt(frameID)===6){ return this.bodyFrame_v6;} 
            if((frameID==="head")||(frameID==="foot")){ return "";}
            
            
            //return this.bodyFrame_v6;
            return this.bodyFrame_v7;
        }
    },


    saveToClassStore: function(Data)
    {  
        function singleLogManager(userdata)
        {
            function userData(data)
            {
                let thisReturner=[];
                
                
                function valueReturner(value0)
                {
                    let value1, kpi="[1.25]", kpe=0;
                    switch(parseInt(value0))
                    {
                        case 3:     value1 = "High";     kpe=4; break;
                        case 2:     value1 = "Medium";   kpe=3; break;
                        case 1:     value1 = "Low";      kpe=2;  break;
                        default:    value1 = "None";     kpi=0; 
                    }
                    return [value1, kpi, kpe];
                }


                
                if((valueReturner(data[1])==='None')&&(valueReturner(data[2])==='None')&&(valueReturner(data[3])==='None')&&(valueReturner(data[4])==='None'))
                {   thisReturner.push([{name:"No Data"}]);  }   
                else
                {
                    let [value4, kpi4, kpe4] = valueReturner(data[4]);      //Importance
                    let [value3, kpi3, kpe3] = valueReturner(data[3]);      //Urgency
                    let [value2, kpi2, kpe2] = valueReturner(data[2]);      //Impact
                    let [value1, kpi1, kpe1] = valueReturner(data[1]);      //Difficulty  
                    
                    kpe4=kpe4*5;
                    kpe3=kpe3*4;
                    kpe2=kpe2*3;
                    
                    switch(parseInt(data[0]))
                    {
                        case 1:
                            thisReturner.push([{name:"With Data", kpi:-1, kpe:-1}]);    //kpi:(-1) means that this level does not count on the overall performance, low values are the ones being counted
                            thisReturner.push([{name:"With Data"},{name:"Importance", kpi:-1, kpe:-1},{name:value1, kpe:`[${kpe1}]`, kpi:kpi1}]);
                            thisReturner.push([{name:"With Data"},{name:"Urgency", kpi:-1, kpe:-1},{name:value2, kpe:`[${kpe2}]`, kpi:kpi2}]);
                            thisReturner.push([{name:"With Data"},{name:"Impact", kpi:-1, kpe:-1}, {name:value3, kpe:`[${kpe3}]`, kpi:kpi3}]);
                            thisReturner.push([{name:"With Data"},{name:"Difficulty", kpi:-1, kpe:-1},{name:value4, kpe:`[${kpe4}]`, kpi:kpi4}]);
                            break;
                    
                        case 2:
                            thisReturner.push([{name:"With Data", kpi:-1, kpe:-1}]);    //kpi:(-1) means that this level does not count on the overall performance, low values are the ones being counted
                            thisReturner.push([{name:"With Data"},{name:"Importance", kpi:-1, kpe:-1},{name:value1, kpe:`[${kpe1}]`, kpi:kpi1}]);
                            thisReturner.push([{name:"With Data"},{name:"Urgency", kpi:-1, kpe:-1},{name:value2, kpe:`[${kpe2}]`, kpi:kpi2}]);
                            thisReturner.push([{name:"With Data"},{name:"Effort", kpi:-1, kpe:-1},{name:value4, kpe:`[${kpe4}]`, kpi:kpi4}]);
                            break;
                    }
                    

                }

                
                return [thisReturner];
            }

            return userData(userdata);    
        }

        return singleLogManager(Data.split("*|3f4x|*")); 
    },
   
    arrayStorage: "",
   
    pMatrix: function(pArr)
    {
        //this is not accurate
        //check matrix table
        
        let indexer=0;
        let preturner="None";
        let pCode = "";
        
        let pRearrangeArr = [];
        pRearrangeArr[0] = pArr[0];
        pRearrangeArr[1] = pArr[4];
        pRearrangeArr[2] = pArr[3];
        pRearrangeArr[3] = pArr[2];
        pRearrangeArr[4] = pArr[1];
        
        
        pRearrangeArr.forEach(function(value, index){indexer += ((aux_existence(value))? parseInt(value):0) * parseInt(index);  });
        
        if(indexer>25){preturner = "High+"; pCode="H+";}
        if(indexer===25){preturner = "High";  pCode="H";}
        if((indexer<25)&&(indexer>20)){preturner = "High-";  pCode="H-";}
        
        if((indexer<=20)&&(indexer>15)){preturner = "Medium+";  pCode="M+";}
        if((indexer===15)){preturner = "Medium";  pCode="M";}
        if((indexer<15)&&(indexer>10)){preturner = "Medium-";  pCode="M-";}
        
        
        if((indexer<=10)&&(indexer>5)){preturner = "Low+";  pCode="L+";}
        if(indexer===5){preturner = "Low";  pCode="L";}        
        if((indexer<5)&&(indexer>0)){preturner = "Low-";  pCode="L-";}

        
        return [preturner, pCode, indexer];
    },
   
    saveException: function(){  return "";  },
    
    repoExist: true,
};
