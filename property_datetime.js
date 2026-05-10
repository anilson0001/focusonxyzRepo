const DateTime =
{
    // frame + "*|3f4x|*" + creationDateTime_millisecond + "*|3f4x|*" + startActionDateTime_millisecond + "*|3f4x|*" + endActionDateTime_millisecond + "*|3f4x|*" + ActualEndDateTime_millisecond + "*|3f4x|*" + graceDateTime_millisecond;

    //called from updateStore.js >>  frame_update_action 
    //called from frame.js >>  edit.edit_Property >> edit.edit_ExpandProperty 
    //it allows the code to loop n times and get the values from n inputs
    propertyDivision: ()=>6,
    
    //called from obj frame >>  edit >> edit_Body >> groupProperties >> edit_Property
    //it determine how many property block is already created; 
    // 1 represents no block is created
    initialCounter: 2,
    reloadAtNewestDateTime:true,
    
    //this has to be called from loadStore
    newestDateTime: function(data)
    {
        function confirmArr(obj)
        {
            let cnt = 0;
            if(aux_existence(obj.subLevel[0]))
            {
                for(let a1=obj.subLevel, a2=a1.length, a3=0; a3<a2; a3++ )
                {   confirmArr(a1[a3]); }
            }
            
            
        }
        
        for(let dt of data)
        {
            if(dt.title!=="Red")
            {   confirmArr(dt); }
        }
    },
    
    //called from obj frame >>  edit >> edit_Body 
    //it determine which configuration to select on function frame.edit.edit_Property  
    configuration: 1,
    pointException: function(id){return ""; },
 
    repoExist: true,
 
    report: (data) =>
    {
        let arrTitle = [], arrData  = [];
            let redDateTime=0;        
        function changeData(value)
        {
            let arrID = value.special.rowData;

            
            for(let arr of arrID)
            {
                for(let b=arr.length, a=1; a<b; a++)
                {
                    if(arrTitle[0]!==undefined)
                    {   
                        let arrIndexer = arrTitle.indexOf(arr[a][0]); 
                        if(arrIndexer!==-1)
                        {  
                            if(arrTitle[arrIndexer]==="redDateTime")
                            {   arrData[arrIndexer] = parseInt(arrData[arrIndexer]) + parseInt(arr[a][1]); redDateTime = arrData[arrIndexer];}
                            else
                            {   arrData[arrIndexer].push(arr[a][1]); }
                        }
                        else
                        {  
                            arrTitle.push(arr[a][0]);
                            //arrData.push([arr[a][1]]);
                            if(arrTitle[arrIndexer]==="redDateTime")
                            {   arrData[arrIndexer]  = parseInt(arrData[arrIndexer]) + parseInt(arr[a][1]); redDateTime = arrData[arrIndexer];}
                            else
                            {   arrData.push([arr[a][1]]); }
                        }
                    }
                    else
                    {   
                        arrTitle.push(arr[a][0]);
                        arrData.push([arr[a][1]]);
                        //if(arrTitle[arrIndexer]==="redDateTime"){arrData[arrIndexer] += arrData; }else{arrData[arrIndexer].push([arr[a][1]]); }
                    }
                }
            }
        };
        
        
        if(Array.isArray(data))
        {
            for(value of data)
            {   changeData(value);  }
        }
        else
        { changeData(data); }
        
        
        //return [arrTitle, arrData];
        //return ["DateTime in Red", this.DateTime.aux_Parse.extDateTime(redDateTime)];
        return "";
    },
 
    instructions: function()
    {
        return "Set the start and end point of this action and use it to set you timeframe-term.</br>" +
                "Very Short < 24hrs </br>" +
                "24 hrs <= Short < 7 days </br>" +
                "7 days <= Sligthly Short <21 days </br>" +
                "21 days <= Normal <90 days </br>" +
                "90 days <= Sligthly Long <180 days </br>" +
                "180 days <= Long <367 days </br>" +
                "367 days <= Very Long </br>" +
                "Remember that if the action is closed after the End DateTime has passed, it will affect negatively on your performance. The gracing DateTime extends the due time a bit longer"
    },

    


    actionColorCode: function(st, data)
    {
        if(aux_existence(data))
        {
            let datetime = (Array.isArray(data))?data:data.split("*|3f4x|*");
            let incrementor = (aux_existence(datetime[1]))?(datetime[1].length<12)? "000": "":"";
            let colorRef, cssFrameColor, colorCode, colorName, colorPercent;
            
                //colorRef = (function([_frame, creation, strtime, endtime, actualendtime, grace], status, i)
                colorRef = (function([{Start, End, _actualend, _grace}], status, i)
                                {
                                    
                                    let [sdt]=Start, [edt]=End, [aedt]=(aux_existence(_actualend))?_actualend: End, [gdt]=_grace;
                                     sdt = Number(sdt) + Number(i);
                                     edt = Number(edt) + Number(i);
                                     aedt = Number(aedt) + Number(i);
                                     gdt = Number(gdt) + Number(i);
                                    let tweentyfour = 86400000; //86400000

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
                                    
                                    
                                    let gracetime = Number(edt)+Number(gdt);
                                    let now = new Date().getTime();
                                    let code;
                                
                                
/*                                    
if(Number(status)!==1)
{
                                        let notchecked = true;
                                        if((((Number(edt) + Number(tweentyfour)) < now)&&((Number(edt) + Number(gdt)) < now))&&(notchecked))
                                        {  code=5; notchecked=false; }      //red
                                        
                                        if((Number(edt) < now)&&((now < (Number(edt) + Number(tweentyfour)))||(now < (Number(edt) + Number(gdt))))&&(notchecked))
                                        {  code=4; notchecked=false; }      //violet
                                        
                                        if(((Number(edt) - tweentyfour) < now)&&(now < Number(edt))&&(notchecked))
                                        {  code=2; notchecked=false; }      //yellow
                                        
                                        if((Number(sdt) <= now)&&(now < (Number(edt) - tweentyfour))&&(notchecked))
                                        {  code=3; notchecked=false; }      //green
                                        
                                        if(now < Number(sdt))
                                        {  code=1; notchecked=false; }      //white
}
else
{
                                        let notchecked = true;
                                        if(((Number(edt) + Number(tweentyfour)) < Number(aedt))&&((Number(edt) + Number(gdt)) < Number(aedt))&&(notchecked))
                                        {  code=5; notchecked=false; }      //red
                                        
                                        if((Number(edt) < Number(aedt))&&((Number(aedt) < (Number(edt) + Number(tweentyfour)))||(Number(aedt) < (Number(edt) + Number(gdt))))&&(notchecked))
                                        {  code=4; notchecked=false; }      //violet
                                        
                                        if(((Number(edt) - tweentyfour) < Number(aedt))&&(Number(aedt) < Number(edt))&&(notchecked))
                                        {  code=2; notchecked=false; }      //yellow
                                        
                                        if((Number(sdt) <= Number(aedt))&&(Number(aedt) < (Number(edt) - tweentyfour))&&(notchecked))
                                        {  code=3; notchecked=false; }      //green
                                        
                                        if(Number(aedt) < Number(sdt))
                                        {  code=1; notchecked=false; }      //white    
}
                                   
                                    return code;
                                })(datetime, st, incrementor);
                
                
            switch(colorRef)
            {
                case 1:     colorCode="#ffffff";    colorName="white";      cssFrameColor="green";      kpo="";         kpi="[5]";      kpe="";         kpb="";         break;
                case 2:     colorCode="#ab6b0d";    colorName="yellow";     cssFrameColor="green";      kpo="";         kpi="[5]";      kpe="";         kpb="";         break;
                case 3:     colorCode="#008000";    colorName="green";      cssFrameColor="green";      kpo="";         kpi="[5]";      kpe="";         kpb="";         break;
                case 4:     colorCode="#ab57a2";    colorName="violet";     cssFrameColor="violet";     kpo="";         kpi="[5]";      kpe="";         kpb="";         break; //violetlike
                case 5:     colorCode="#ff0000";    colorName="red";        cssFrameColor="red";        kpo="[-30]";    kpi="[-5]";     kpe="[-30]";    kpb="[-10]";    break;
                default:    colorCode="#204060";    colorName="darkblue";   cssFrameColor="#204060";    kpo="";         kpi="[5]";      kpe="[10]";     kpb="";         break; //darkblue
            }  
            
            return {cReference:colorRef, cCode:colorCode, cFrame:(parseInt(st)!==1)? cssFrameColor: "#204060", cName:colorName, ckpo:kpo, ckpi:kpi, ckpe:kpe, ckpb:kpb};
        }
*/

if(Number(status)!==1)
{
                                        let notchecked = true;
                                        if((((Number(edt) + Number(tweentyfour)) < now)&&((Number(edt) + Number(gdt)) < now))&&(notchecked))
                                        {  code=5; notchecked=false; }      //red
                                        
                                        if((Number(edt) < now)&&((now < (Number(edt) + Number(tweentyfour)))||(now < (Number(edt) + Number(gdt))))&&(notchecked))
                                        {  code=4; notchecked=false; }      //violet
                                        
                                        if(((Number(edt) - tweentyfour) < now)&&(now < Number(edt))&&(notchecked))
                                        {  code=2; notchecked=false; }      //yellow
                                        
                                        if((Number(sdt) <= now)&&(now < (Number(edt) - tweentyfour))&&(notchecked))
                                        {  code=3; notchecked=false; }      //green
                                        
                                        if(now < Number(sdt))
                                        {  code=1; notchecked=false; }      //white
}
else
{
                                        let notchecked = true;
                                        if(((Number(edt) + Number(tweentyfour)) < Number(aedt))&&((Number(edt) + Number(gdt)) < Number(aedt))&&(notchecked))
                                        {  code=5; notchecked=false; }      //red
                                        
                                        if((Number(edt) < Number(aedt))&&((Number(aedt) < (Number(edt) + Number(tweentyfour)))||(Number(aedt) < (Number(edt) + Number(gdt))))&&(notchecked))
                                        {  code=4; notchecked=false; }      //violet
                                        
                                        if(((Number(edt) - tweentyfour) < Number(aedt))&&(Number(aedt) < Number(edt))&&(notchecked))
                                        {  code=2; notchecked=false; }      //yellow
                                        
                                        if((Number(sdt) <= Number(aedt))&&(Number(aedt) < (Number(edt) - tweentyfour))&&(notchecked))
                                        {  code=3; notchecked=false; }      //green
                                        
                                        if(Number(aedt) < Number(sdt))
                                        {  code=1; notchecked=false; }      //white    
}
                                   
                                    return code;
                                })(datetime, st, incrementor);
                
                
            switch(colorRef)
            {
                case 1:     colorCode="#ffffff";    colorName="White";      cssFrameColor="green";      break;
                case 2:     colorCode="#ab6b0d";    colorName="Yellow";     cssFrameColor="green";      break;
                case 3:     colorCode="#008000";    colorName="Green";      cssFrameColor="green";      break;
                case 4:     colorCode="#ab57a2";    colorName="Violet";     cssFrameColor="violet";     break; //violetlike
                case 5:     colorCode="#ff0000";    colorName="Red";        cssFrameColor="red";        break;
                default:    colorCode="#204060";    colorName="DarkBlue";   cssFrameColor="#204060";    break; //darkblue
            }  
            
            return {cReference:colorRef, cCode:colorCode, cFrame:(parseInt(st)!==1)? cssFrameColor: "#204060", cName:colorName};
        }
        return;
    },


    actionDateTime: function(status, datetime) 
    {
        if (!aux_existence(datetime)) return;
    
        let { _creation, Start, End, _actualend, _grace } = datetime[0];
        let now = new Date().getTime();
    
        let endWithGrace = Number(End) + Number(_grace);
        let dtColor, dtTerm, kpo, kpe;
    
        if (parseInt(status) !== 1) 
        { // Open Status
            dtColor = (endWithGrace - now);
            dtTerm = (endWithGrace - _creation);
        } 
        else 
        { // Closed Status
            dtColor = (_actualend - now);
            dtTerm = (_actualend - _creation);
        }
    
        let colorRef;
        if (dtColor > 86400000) colorRef = 1; // White
        else if (dtColor > 0) colorRef = 2; // Yellow
        else if (dtColor > -_grace) colorRef = 3; // Green
        else if (dtColor > -_grace * 2) colorRef = 4; // Violet
        else colorRef = 0; // Red
    
        let termCategory;
        if (dtTerm < 604800000) termCategory = "VeryShort";
        else if (dtTerm < 2592000000) termCategory = "Short";
        else if (dtTerm < 7776000000) termCategory = "SlightShort";
        else if (dtTerm < 15552000000) termCategory = "Standard";
        else if (dtTerm < 31536000000) termCategory = "SlightLong";
        else if (dtTerm < 157680000000) termCategory = "Long";
        else termCategory = "VeryLong";
    
        let colorMappings = {
            1: { colorCode: "#ffffff", dtColor: "White"},
            2: { colorCode: "#ab6b0d", dtColor: "Yellow"},
            3: { colorCode: "#008000", dtColor: "Green"},
            4: { colorCode: "#ab57a2", dtColor: "Violet"},
            0: { colorCode: "#ff0000", dtColor: "Red"},
        };
    
        return [{title:termCategory},{title:dtColor}];
    },
    
    
    dtPerformance: function(status, datetime) 
    {
        if (!(datetime)) return;
    
        let {_create, Start, End, _actualend, _grace} = datetime[0];
        let [cdt]=(aux_existence(_create))?_create: Start, [sdt]=Start, [edt]=End, [aedt]=(aux_existence(_actualend))?_actualend: End, [gdt]=_grace;
        let now = new Date().getTime();
        let tweentyfour = 86400000; //86400000
        let dtCode, dtColor, dtTerm="VeryShort";

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
            }      //red
            
            if((Number(edt) < now)&&((now < (Number(edt) + Number(tweentyfour)))||(now < (Number(edt) + Number(gdt))))&&(notchecked))
            {  
                code=4; 
                notchecked  = false; 
                dtCode      = "#ab57a2"; 
                dtColor     = "Violet";
            }      //violet
            
            if(((Number(edt) - tweentyfour) < now)&&(now < Number(edt))&&(notchecked))
            {  
                code=2; 
                notchecked  = false; 
                dtCode      = "#ab6b0d";
                dtColor     = "Yellow"; 
            }      //yellow
            
            if((Number(sdt) <= now)&&(now < (Number(edt) - tweentyfour))&&(notchecked))
            {  
                code=3; 
                notchecked  = false; 
                dtCode      = "#008000"; 
                dtColor     = "Green"; 
            }      //green
            
            if(now < Number(sdt))
            {  
                code=1; 
                notchecked  = false; 
                dtCode      = "#ffffff"; 
                dtColor     = "White"; 
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
            }      //red
            
            if((Number(edt) < Number(aedt))&&((Number(aedt) < (Number(edt) + Number(tweentyfour)))||(Number(aedt) < (Number(edt) + Number(gdt))))&&(notchecked))
            {  
                code=4; 
                notchecked  = false; 
                dtCode      = "#ab57a2"; 
                dtColor     = "Violet"; 
            }      //violet
            
            if(((Number(edt) - tweentyfour) < Number(aedt))&&(Number(aedt) < Number(edt))&&(notchecked))
            {  
                code=2; 
                notchecked  = false; 
                dtCode      = "#ab6b0d"; 
                dtColor     = "Yellow"; 
            }      //yellow
            
            if((Number(sdt) <= Number(aedt))&&(Number(aedt) < (Number(edt) - tweentyfour))&&(notchecked))
            {  
                code=3; 
                notchecked  = false; 
                dtCode      = "#008000";
                dtColor     = "Green"; 
            }      //green
            
            if(Number(aedt) < Number(sdt))
            {  
                code=1; 
                notchecked  = false; 
                dtCode      = "#ffffff"; 
                dtColor     = "White"; 
            }      //white    
        }



        let notConfirmed = true;
    
        if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24 * 365))&&(notConfirmed)){    dtTerm = "VeryLong";    notConfirmed = false; }           //VeryLong:     more than (24 * 365) hours = 1 year
        if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24 * 180))&&(notConfirmed)){    dtTerm = "Long";        notConfirmed = false; }           //Long:         more than (24 * 180) hours = 6 months
        if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24 * 90))&&(notConfirmed)){     dtTerm = "SlightLong";  notConfirmed = false; }           //SlightLong:   more than (24 * 90) hours = 3 months 
        if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24 * 30))&&(notConfirmed)){     dtTerm = "Standard";    notConfirmed = false; }           //Standart:     more than (24 * 30) hours = 1 month
        if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24 * 7))&&(notConfirmed)){      dtTerm = "SlightShort"; notConfirmed = false; }           //SlightShort:  more than (24 * 7) hours = 1 week
        if(((Number(edt) - Number(sdt)) > (60 * 60 * 1000 * 24))&&(notConfirmed)){          dtTerm = "Short";       notConfirmed = false; }           //Short:        more than 24 hours
        if(((Number(edt) - Number(sdt)) <= (60 * 60 * 1000 * 24))&&(notConfirmed)){         dtTerm = "VeryShort";   notConfirmed = false; }           //VeryShort:    less than 24 hours
        
        if(!aux_existence(dtTerm))
        {   console.log("dtTerm with Problems: ", sdt, edt);    }
                                
        return  [
                    {title: "DateTime", children:
                        [
                            {title:"Terms",  children:[{title:dtTerm}]}, 
                            {title:"Status", children:[{title:dtColor}]}
                        ]}
                ];
    },
    



    frame: 
    {   
        headFrame:"",
        bodyFrame:
        {   
            id:1, 
            dMode: "false",
            eDimensionalData: function(data, id, status)
            {
/*
                data =  [
                            (0)frame, 
                            (1)creationDateTime_millisecond, 
                            (2)startActionDateTime_millisecond, 
                            (3)endActionDateTime_millisecond, 
                            (4)ActualEndDateTime_millisecond, 
                            (5)graceDateTime_millisecond
                        ]
*/
                let returner="",cdt="",sdt="",edt="",aedt="";
                
                let numbericNow = DateTime.aux_ParseTo.numericDateTime();
                
                function grace(a)
                {
                    switch(parseInt(a))
                    {
                        case 3600000:       return 1;                  //1 hour
                        case 21600000:      return 2;                   //6 hours
                        case 43200000:      return 3;                   //12 hours
                        case 86400000:      return 4;                   //24 hours (1day)
                        case 604800000:     return 5;                //7 days
                        case 1296000000:    return 6;               //15 days
                        default:            return 0;
                    }
                };
                             
                             
                if(aux_existence(data))
                {
                     cdt  = DateTime.aux_ParseTo.extendDateTime_local(data[1]);
                     sdt  = DateTime.aux_ParseTo.extendDateTime_local(data[2]);
                     edt  = DateTime.aux_ParseTo.extendDateTime_local(data[3]);
                     aedt = DateTime.aux_ParseTo.extendDateTime_local((aux_existence(status)&&(parseInt(status)===0))? numbericNow: data[4]);
                     gt   = grace(data[5]);
                }
                else
                {
                    cdt  = DateTime.aux_ParseTo.extendDateTime_local(numbericNow);
                    sdt  = DateTime.aux_ParseTo.extendDateTime_local(numbericNow);
                    edt  = DateTime.aux_ParseTo.extendDateTime_local(86400000+numbericNow);
                    aedt = DateTime.aux_ParseTo.extendDateTime_local(86400000+numbericNow);
                    gt   = grace();
                }
                
                
                
                
                let arr =   [
                                ["30 Minutes"],
                                ["1 Hour"],
                                ["6 Hours"],
                                ["12 Hours"],
                                ["24 Hours"],
                                ["7 Days"],
                                ["15 Days"]
                            ];
                            
                           
                for(let aLen=arr.length, a=0; a<aLen; a++)
                {
                    if(aux_existence(arr[a]))
                    {   
                        if(gt!==a)
                        {   returner = returner + "<option value=\"" + a + "\" >" + arr[a][0] + "</option>";   }
                        else
                        {   returner = returner + "<option value=\"" + a + "\" selected>" + arr[a][0] + "</option>";   }
                    }
                }   
                
                return [1, cdt, sdt, edt, aedt, returner];
            },
        
            exceptionToStore: "DateTime",
                eframe: [
                            {labelID:"_creation", type:"hidden", attribute: {name:"cdt"}},
                            {label:"Start", eMode:"false", type:"datetime-local", rIndex:"dt1", dReport:["dt1"], attribute: {required:"true", name:"sdt"}},
                            {label:"End", eMode:"false", type:"datetime-local", rIndex:"dt2", dReport:["dt2"], attribute: {required:"true", name:"edt"}},
                            {labelID:"_actualend", type:"hidden", rIndex:"dt3", dReport:["dt3"], attribute: { name:"edt"}},
                            {labelID: "_grace", label:"Grace Time", eMode:"false", rIndex:"dt4", dReport:["dt4"], type:"select", attribute:{options:[["30 Minutes","1800000"],["1 Hour","3600000"],["6 Hours","21600000"],["12 Hours","43200000"],["24 Hours","86400000"],["7 Days","604800000"],["15 Days","1296000000"]]}}
                        ]   
        },
        footFrame:"",

        returner: function(frameID)
        {  
            if(frameID==="head"){   return this.headFrame; }
            if(frameID==="foot"){   return this.foodFrame; }
            
            return this.bodyFrame;
        }
    },
    
    

    
    saveToClassStore: function(data1)
    {  
        let returner=[],buffer=[];
        
    
        function singleLogManager(data2)
        {
            let thisReturner=[];
            
            function userData(data4)
            {            
                let [,,pstart,pend,aend,grace] = data4;
                //userdata = [frame, creation, start, plannedEnd, ActualEnd, grace = ActualEnd + graceDateTime]
                let now = new Date().getTime();
                let topObj = "";
            
            
                function return_objectiveLength(start, end)
                {
                    let dtLength=((aux_existence(start))&&(aux_existence(end))&&(Number(start)>0)&&(Number(end)>0))? Number(end)-Number(start): 0;
                    let returner = ["",""];
                    
                    if(dtLength > 94608000000)                      
                    {   returner = ["Very Long","[35]"]; }                               //more than 3 years
                    else
                    {
                        if(dtLength > 31536000000)                  
                        {   returner = ["Long","[30]"]; }                                //more than 1 year
                        else
                        {
                            if(dtLength > 7776000000)                  
                            {   returner = ["Slight Long","[25]"]; }                     //more than 3 months
                            else
                            {
                                if(dtLength > 2592000000)                
                                {   returner = ["Standard","[20]"]; }                    //more than 1 months
                                else
                                {
                                    if(dtLength > 604800000)                   
                                    {   returner = ["Slight Short","[15]"]; }            //more than 1 week
                                    else
                                    {
                                       if(dtLength > 86400000)                  
                                        {   returner = ["Short","[10]"];         }       //more than 1 day
                                        else
                                        {   returner = ["Very Short","[5]"];    }       //less than a day
                                    } 
                                } 
                            }  
                        } 
                    }
                    
                    return returner;
                }

             
                let {cName, ckpo, ckpi, ckpe, ckpb} = DateTime.actionColorCode(0, data4);
                topObj = [{name:cName, kpo:ckpo, kpi:ckpi, kpe:ckpe, ckpb:kpb}]
                
                thisReturner.push(topObj);     
                thisReturner.push([{name:"start", specific: pstart, report:false}]); 
                thisReturner.push([{name:"end", specific: pend, report:false}]); 
                
                if(parseInt(data4)===1)
                {
                    if(ckpe!=="[10]")
                    {   thisReturner.push([{name:"Negative", kpe:ckpe}]);   }
                    else
                    {   thisReturner.push([{name:"Positive", kpe:ckpe}]);    }
                }
                
                
                let [lengthObj, tkpo] = return_objectiveLength(pstart, pend);
                thisReturner.push([{name:"TimeFrame Objectives", report:false, kpo:-1},{name:lengthObj,  kpo:tkpo}]); 
                
                if((Number(pend)+Number(grace))<aend)
                { thisReturner.push([{name:"TimeFrame Objectives", report:false},{name:"Missed Objectives", kpo:"[-30]"}]);   }    
            }


            
            data2.forEach(function(data3){if(aux_existence(data3)){ userData(data3.split("*|3f4x|*")); }});
            
            return [thisReturner, buffer];
        }

 
        return singleLogManager(data1.split("*|3f3x|*"));  
    },


    aux_arrDateTime: function(data)
    {
        let dt = [];
        if(aux_existence(data))
        { 
            if(!aux_isArray(data))
            {   dt = data.split("*|3f4x|*"); }
            else
            {   dt = data;}
        }
        else
        {   for(let i=0; i<6; i++){dt[i]="";} }

        return dt; 
    },


   
   
   
    myTime: function()
    {
        var tim = new Date();
        var time = aux_twoDigits(tim.getHours()) + ":" + aux_twoDigits(tim.getMinutes()) + ":" + aux_twoDigits(tim.getSeconds()); 

        return time;
    },

 
    myDate: function()
    {
        var dat = new Date();
        var date = dat.getFullYear() + "-" + aux_twoDigits((dat.getMonth() + 1)) + "-" + aux_twoDigits(dat.getDate());
  
        return date;
    },
    
    
    aux_UpdateDateTime: 
    {
        updateDateTime: function(id, d, t, placer)
        {
            let dd = document.getElementById("Disedit_DateTime_" + d + "_" + id + "_1").value;
            let tt = document.getElementById("Disedit_DateTime_" + t + "_" + id + "_1").value;
            document.getElementById("edit_DateTime_" + id + "_1_" + placer).value = this.aux_Parse.numDateTime(dd, tt);
        }, 
        
        
        
        //update automatically value for List Due By
        updateDueDT: function(title, id, indexer)
        {
            let Bs = document.getElementById("countBlocks_List_" + id);
            
            if(Bs)
            {
                cntB_max = Bs.value;
                for(let i=1; i<(cntB_max+1); i++)
                {
                    let eframeid = document.getElementById("edit_List_" + id + "_" + i + "_0");
                    if(eframeid)
                    {
                        let edt_list = document.getElementById("edit_List_" + id + "_" + i + "_6");
                        if(edt_list)
                        {
                            let edt_1 = document.getElementById("edit_DateTime_" + id + "_1_3").value;
                            let edt_2 = document.getElementById("edit_DateTime_" + id + "_1_4").value;
                            let edt12 = DateTime.aux_ParseTo.numericDateTime(edt_1, edt_2);
                            
                            let edtListValue = new Date(edt_list.value).getTime();
                            if(edtListValue.toString()!='NaN')
                            {
                                if(edt12<edtListValue)
                                {   document.getElementById("edit_List_" + id + "_" + i + "_7").value = DateTime.aux_ParseTo.extendDateTime_local(edt12); }
                            }
                            else
                            {   document.getElementById("edit_List_" + id + "_" + i + "_7").value = DateTime.aux_ParseTo.extendDateTime_local(edt12); }
                        }
                    }
                }
            }
            document.getElementById(indexer).style.background = "white";
        },        
    },    

    
    aux_ParseTo:
    {
        extendDateTime: (d1) =>
        {
            let a = (aux_existence(d1))?(d1.length<12)? "000": "":"";
            const d = (aux_existence(d1))? (aux_existence(a))? new Date(parseFloat(d1+a)): new Date(parseFloat(d1)): new Date();
            const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

            let day = days[d.getDay()];

            return  day +":" + d.getFullYear() + "-" + aux_twoDigits(d.getMonth() + 1) + "-" + aux_twoDigits(d.getDate()) +  
                    "@" +
                    aux_twoDigits(d.getHours()) + ":" + aux_twoDigits(d.getMinutes()) + ":" + aux_twoDigits(d.getSeconds());                  
        },


        extendDateTime_local: (d) =>
        {
            let d2;
            if(aux_existence(d))
            {   d2 = new Date(parseFloat(d)); }
            else
            {   d2 = new Date(); }

            return  d2.getFullYear() + "-" + aux_twoDigits(d2.getMonth() + 1) + "-" + aux_twoDigits(d2.getDate()) +  
                    "T" +
                    aux_twoDigits(d2.getHours()) + ":" + aux_twoDigits(d2.getMinutes());                  
        },

            
        extendDate: function(d1)
        {   
            d = new Date(parseFloat(d1));
            return d.getFullYear() + "-" + aux_twoDigits(d.getMonth() + 1) + "-" + aux_twoDigits(d.getDate());  
        },
    

        extendTime: function(d1)
        {   
            d = new Date(parseFloat(d1));
            return aux_twoDigits(d.getHours()) + ":" + aux_twoDigits(d.getMinutes()) + ":" + aux_twoDigits(d.getSeconds());  
        },
        
        numericDateTime: function(d, t="")
        {
            if(aux_existence(d))
            {
                if(isNaN(d))
                {
                    if(d.includes("T"))
                    {   
                        let dt = d.split("T");
                        return DateTime.aux_ParseTo.numericDateTime(dt[0], dt[1]); 
                    }
                    
                    if(d.includes("@"))
                    {   
                        let dt = d.split("@");
                        return DateTime.aux_ParseTo.numericDateTime(dt[0], dt[1]); 
                    }
                        
                    if(aux_existence(t))
                    {   return new Date(d + " " + t).getTime();}
                    
                    return new Date(d).getTime();
                }
                else
                {   return new Date(d).getTime();   }
            }
            else
            {   return new Date().getTime();    }
        }
    }
};

