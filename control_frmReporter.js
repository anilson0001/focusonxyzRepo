const frmReport = 
{
    
    perform_v1: function(obj)
    {
        //let performance = {cnt:0, kpo:0, kpe:0, kpa:0, points:0};
        //let performance = {cnt:0, points:0, kpi:{maxcnt:0, mincnt:0, points:0, percent:0}, kpo:{maxcnt:0, mincnt:0, points:0, percent:0}, kpe:{maxcnt:0, mincnt:0, points:0, percent:0}, kpa:{maxcnt:0, mincnt:0, points:0, percent:0}};     
        
        let performance = {cnt:0, points:0, kpo:{points:0, percent:0}, kpe:{points:0, percent:0}, kpa:{points:0, percent:0}};
        let kp = {points:0, cnt:0, percent:0};
        
        function analyzePerformance(pso)
        {
            if(aux_existence(pso.ids))
            {
                let cnt1 = (aux_existence(pso.ids.Local))? pso.ids.Local.length: 0;
                let cnt2 = (aux_existence(pso.ids.Global))? pso.ids.Global.length: 0;
                let points = (aux_existence(pso.points))? pso.points: 0;
                

                if(aux_existence(pso.kpo))
                {
                    performance.kpo.percent += (aux_existence(pso.kpo))? Number(pso.kpo): 0;
                    performance.kpo.points  += Number(Number(points) * ((cnt1!==0)? cnt1: 1));                     
                }
                

                if(aux_existence(pso.kpe))
                {
                    performance.kpe.percent += (aux_existence(pso.kpe))? Number(pso.kpe): 0;
                    performance.kpe.points  += Number(Number(points) * ((cnt1!==0)? cnt1: 1));                     
                }
                
                
                if(aux_existence(pso.kpa))
                {
                    performance.kpa.percent += (aux_existence(pso.kpa))? Number(pso.kpa): 0;
                    performance.kpa.points  += Number(Number(points) * ((cnt1!==0)? cnt1: 1));                     
                }
                
                performance.cnt = (cnt2 > performance.cnt)? cnt2: performance.cnt;
                if (pso.points && !isNaN(pso.points)) performance.points += Number(Number(points) * ((cnt1!==0)? cnt1: 1));
            }
        }
        
    
        function calculatePerformance(psArr) 
        {
            if(Array.isArray(psArr))
            {
                for(let psObj of psArr)
                {   
                    if(aux_existence(psObj.title))   
                    {                  
                        analyzePerformance(psObj);
                        calculatePerformance(psObj.children); 
                    }
                }
            }
        }
        
    
        calculatePerformance(obj);
        
        
        return  performance;
    },
        
    
    //Data will be added by loadStore.js >> load_display_Menu(){ populateMenuBody(){ selectionRequest.onsuccess(){ if(repoExist){CALL THIS FUNCTION}}} }
    reportPage: function(idList, fs) 
    {  
        let totalCounter = (aux_existence(idList))? idList.length: 0;
        let cancelButton = (fs)? "<div><input type=\"button\" class=\"_Button extendedButton\" value=\"Cancel Previews (Filter / Search)\" onclick=\"loadData()\"></div>": "";     
        
        let objOption = function(properties)
        {
            let returner = "";
            
            for(let ovalue of properties)
            {
                //let ovalue = (aux_existence(properties[okey]))? properties[okey]: "";
                let mSelect = (ovalue.title==="Category")? "selected": "";
                
                if(aux_existence(ovalue))
                {   
                    if(aux_existence(ovalue.report))
                    {   
                        if(ovalue.report==="na")
                        {   returner += `<optgroup label='${ovalue.title}'>${objOption(ovalue)}</optgroup>`;       }  
                        else
                        {   returner += "<option value=\"" + ovalue.title + "\" " + mSelect + ">" + ovalue.title + "</option>";     }
                    }
                    else
                    {   returner += "<option disabled>" + ovalue.title + "</option>";    }
                }
            }
            
            return returner;            
        };
        
        
        
        let perform = (function(idArr, ref)
            {
                //ref = apps.reporter_2.Indicators.children (Object)
                let analitics = {points:0, cnt:0, kpi:{total:0, cnt:0, percentage:0}, kpo:{total:0, cnt:0, percentage:0}, kpe:{total:0, cnt:0, percentage:0}};
                    
                    
                function exceptions(property)
                {   }
                
                
                function calculatePropertyPerformance(arrProperty, objB)
                {
                    if((typeof arrProperty === "object")&&(arrProperty instanceof Object))
                    {
                        for(let objElement in arrProperty)
                        {
                            let arrA = arrProperty[objElement];   
                            
                            let {[objElement]:_, ...rest} = arrProperty;
                
                
                            if((aux_existence(objB[objElement]))&&(Object.keys(objB).includes(objElement)))
                            {   calculatePropertyPerformance(arrA, objB[objElement]);   }

                            
                            if(aux_existence(objB.children))
                            {   calculatePropertyPerformance(((arrA.length>1)&&(Array.isArray(arrA)))? arrA: rest, objB.children);    }
                        }                         
                    }
                    else
                    {
                        for(let propertyBlockFrame of arrProperty)
                        {
                            if(aux_existence(propertyBlockFrame))
                            {                        
                                if(aux_existence(objB.report))
                                {                        
                                    if((typeof propertyBlockFrame === "object")&&(propertyBlockFrame instanceof Object))
                                    {
                                        for(let objElement in propertyBlockFrame)
                                        {
                                            let arrA = propertyBlockFrame[objElement];   
                                            
                                            let {[objElement]:_, ...rest} = propertyBlockFrame;
                                
                                
                                            if((aux_existence(objB[objElement]))&&(Object.keys(objB).includes(objElement)))
                                            {   calculatePropertyPerformance(arrA, objB[objElement]);   }
           
                                            
                                            if(aux_existence(objB.children))
                                            {   calculatePropertyPerformance(((arrA.length>1)&&(Array.isArray(arrA)))? arrA: rest, objB.children);    }
                                        } 
                                    }
                                    else
                                    {
                                        if((aux_existence(objB[propertyBlockFrame]))&&(Object.keys(objB).includes(propertyBlockFrame)))
                                        {   calculatePropertyPerformance(propertyBlockFrame, objB[propertyBlockFrame]);  }     
                                        
                                        if(aux_existence(objB.children))
                                        {   calculatePropertyPerformance(propertyBlockFrame, objB.children);    }                                        
                                    }
                                }  
                            }    
                        }   
                    }
                    

                    if(aux_existence(objB.points))
                    {   analitics.points     += objB.points;    }
                    
                    if(aux_existence(objB.kpi))
                    {   
                        analitics.kpi.percentage     += objB.kpi;
                        analitics.kpi.cnt++;
                    }
                    
                    if(aux_existence(objB.kpo))
                    {    
                        analitics.kpo.percentage     += objB.kpo;
                        analitics.kpo.cnt++;
                    }
                    
                    
                    if(aux_existence(objB.kpe))
                    {      
                        analitics.kpe.percentage     += objB.kpe; 
                        analitics.kpe.cnt++;  
                    } 
                }          
                
                
                function getPropertyPerformance(action)
                {
                    for(let property in action)
                    {
                        
                        for(let obj of ref)
                        {
                            if(obj.title===property)
                            {
                                if(aux_existence(action[property]))
                                {   
                                    analitics.kpi.cnt++;
                                    if((property==="Status")||(property==="DateTime"))
                                    {   exceptions(action[property]);   }
                                    else
                                    {   calculatePropertyPerformance(action[property], obj);        }
                                }
                            }
                        }
                    }
                }
                
                
                
                //for(let id of idArr)
                for(let x0=0, x1=idArr, x2=x1.length; x0<x2; x0++)
                {
                    let id = idArr[x0];
                    let reportRequest = apps.dbConnection.transaction(["Actions"], "readonly").objectStore("Actions").get(parseInt(id));     //openCursor();
                    
                    reportRequest.onsuccess = function(e)    
                    {
                        let action = e.target.result;
                        if(aux_existence(action))
                        {   
                            analitics.cnt++;
                            getPropertyPerformance(action); 
                        }
                        
                        if(x0===(x2-1))
                        {   
                            document.getElementById("counter_PI").innerText = `${Number(((analitics.kpi.percentage)*100)/(analitics.cnt)).toFixed(2)}%`;
                            document.getElementById("counter_PO").innerText = `${(((analitics.kpo.percentage)*100)/(analitics.cnt)).toFixed(2)}%`;
                            document.getElementById("counter_PE").innerText = `${(((analitics.kpe.percentage)*100)/(analitics.cnt)).toFixed(2)}%`;
                            document.getElementById("counter_Points").innerText = `${analitics.points}`;
                        }
                    };
                }
                
                //apps.analitics = analitics;
                return analitics;
            })(idList, apps.PerformanceStore.children);
        
        
        
        

            let returnerFrame = "<div>" +  
                                    "<div>" +   
                                        "<input type=\"hidden\" id=\"_Filter\" value=\"\">" +   
                                        "<span  class=\"auxboardElementHead\">Total Actions:</span>" + 
                                        "<span  class=\"auxboardElementBody\">" + totalCounter + "</span>" +
                                        "<span id=\"_counterFilter\" class=\"auxboardElementBody tail\"></span>" +   
                                    "</div><br>" + 
                                    
                                    "<div>" +    
                                        "<span  class=\"auxboardElementHead\">Indicators Performance:</span>" +   
                                        "<span id=\"counter_PI\" class=\"auxboardElementBody tail\"></span>" +   
                                    "</div>" + 
                                    
                                     "<div>" + 
                                        "<span  class=\"auxboardElementHead\">Objectives Performance:</span>" +     
                                        "<span id=\"counter_PO\" class=\"auxboardElementBody tail\"></span>" +     
                                    "</div>" +           
     
                                    "<div>" +   
                                        "<span  class=\"auxboardElementHead\">Execution Performance:</span>" +   
                                        "<span id=\"counter_PE\" class=\"auxboardElementBody tail\"></span>" +   
                                    "</div>" +   
                                    
                                    "<div>" +    
                                        "<span  class=\"auxboardElementHead\">Points:</span>" +   
                                        "<span id=\"counter_Points\" class=\"auxboardElementBody tail\"></span>" +   
                                    "</div><br>" +  
         
 
                                    "<div>" +  
                                        "<div for=\"sdtSearcher\">DateTime:</div>" +  
                                        "<table width=\"100%\">" + 
                                            "<tr width=\"100%\">" + 
                                                "<td>" + 
                                                    "<label   class=\"eProperty-11\" for=\"reportSettingsDT\">Settings:</label>" +   
                                                "</td>" + 
                                                "<td>" + 
                                                    "<div class=\"eProperty-1\" style=\"padding-bottom:5px\">" +   
                                                        "<select   class=\"eProperty-13\" id=\"reportSettingsDT\">" + 
                                                            "<option value=\"start\">Action Start</option>" +
                                                            "<option value=\"end\">Action End</option>" +
                                                            "<option value=\"startend\">Action Start-End</option>" +
                                                        "</select>" + 
                                                    "</div>" +                                         
                                                "</td>" +                                     
                                            "</tr>" + 
                                            "<tr width=\"100%\">" + 
                                                "<td>" + 
                                                    "<label   class=\"eProperty-11\" for=\"fromdtSearcher\">From:</label>" +   
                                                "</td>" + 
                                                "<td>" + 
                                                    "<div class=\"eProperty-1\" style=\"padding-bottom:5px\">" +  
                                                        "<input   class=\"eProperty-13\" type=\"datetime-local\" id=\"fromdtSearcher\"  value=\"" + DateTime.aux_ParseTo.extendDateTime_local(0) + "\">" +  
                                                    "</div>" + 
                                                "</td>" +                                     
                                            "</tr>" +                                     
                                            "<tr width=\"100%\">" + 
                                                "<td>" + 
                                                    "<label   class=\"eProperty-11\" for=\"todtSearcher\">To:</label>" + 
                                                "</td>" + 
                                                "<td>" + 
                                                    "<div class=\"eProperty-1\" style=\"padding-bottom:5px\">" +  
                                                        "<input   class=\"eProperty-13\" type=\"datetime-local\" id=\"todtSearcher\"  value=\"" + DateTime.aux_ParseTo.extendDateTime_local(DateTime.aux_ParseTo.numericDateTime()) + "\">" +   
                                                    "</div>" + 
                                                "</td>" +                                     
                                            "</tr>" + 
                                            "<tr width=\"100%\">" + 
                                                "<td>" + 
                                                    "<label for=\"menuFilterSettler\">Filter by:</label>" +   
                                                "</td>" + 
                                                "<td>" + 
                                                    "<div class=\"eProperty-1\" style=\"padding-bottom:5px\">" +  
                                                        "<select id=\"menuFilterSettler\" class=\"eProperty-13\">" + 
                                                            (function(properties)
                                                            {   
                                                                return `<option>Select</option>
                                                                        <option value='AllActions'>All Actions</option>
                                                                        ${objOption(properties)}`;   
                                                            })(apps.PerformanceStore.children) + 
                                                        "</select>" +     
                                                    "</div>" + 
                                                "</td>" +                                     
                                            "</tr>" +                                     
                                            "<tr width=\"100%\">" + 
                                                "<td>" + 
                                                    "<label for=\"wordSearcher\">Search for:</label>" + 
                                                "</td>" + 
                                                "<td>" + 
                                                    "<div class=\"eProperty-1\" style=\"padding-bottom:5px\">" +  
                                                        "<input type=\"text\" id=\"wordSearcher\" class=\"eProperty-13\" value=\"\">" +  
                                                    "</div>" + 
                                                "</td>" +                                     
                                            "</tr>" +                                     
                                        "</table>" + 
                                    "</div>" +
                                    "<div>" +
                                        "<div><input type=\"button\" class=\"_Button extendedButton\" value=\"Filter / Search\" onclick=\"loadFilterSearch()\"></div>" + 
                                        cancelButton +
                                    "</div><br>" + 
                                "</div>" ;
                                       
                                return collapseBlock("", [2,"Filter / Search", "", "", "", "topic_1"], [returnerFrame], [""], ["topic_1","",""], ["openDisplay",[["noclass","noclass","noclass"],["noclass","noclass","noclass"]],"openDisplay auxTopic","openDisplay"]);
    },
    
    returner: function(ids, filtersearch=false)
    {   document.getElementById("reportboard_FromMenu_report").innerHTML = this.reportPage(ids, filtersearch);  },
    

    objectificator: 
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
                                    
            let dt          = this._DateTime(action.adatetime);
            let cssColor    = this._Color(dt, action.astatus);
            
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
        }                    
    }
};
