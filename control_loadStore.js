window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

let fob_DB;
let connLocalDB;
let reportData=[];
let properties=[];
const editor = new Editor();

const apps = 
{
    uniqueData:
    {
        datetime:{start:{from:"1900-01-01T00:01:01", to:"3000-12-31T23:59:59"}, end:{from:"1900-01-01T00:01:01", to:"3000-12-31T23:59:59"}},
        aiModels:[]    
    },

    uproperty:   [
                            "reportData",
                            "ExternalCode",
                            "InternalCode",
                            "AccessRef",
                            "SourceRef",
                            "ServerRef",
                            "MaxInnerActionCounter",
                            "MaxOuterActionCounter",
                            "Status",
                            "Title",
                            "Description",
                            "DateTime",
                            "Priority",
                            "Category",
                            "ListItem",
                            "Locations",
                            "Contacts",
                            
                            
                            "Closure",
                            "Comments"
                        ], 
    properties:  [
                        "References",
                        "Status",
                        "Title",
                        "Description",
                        "DateTime",
                        "Priority",
                        "Category",
                        "ListItem",
                        "Locations",
                        "Contacts",
                        
                        "Comments"
                    ],                        
    environment: "", 
    dbConnection:"", 
    temp_uploadedFiles:[], 
    
    
/*
kpi = sum(kpis) = 1; 1 / 16 (properties) = 0.0625; 
kpo = sum(kpos) = 1
kpe = sum(kpes) = 1
kpa = sum(kpas) = 1

maximum regular points = 1015
title           = 5
Description     = 30
Datetime        = 100
Priority        = 65    
Risk            = 130   = (25 + (20) * 2) * 2
ListItem        = 60    = (20) * 3
Category        = 10    = (10) * 1
Contacts        = 60    = (30) * 2 
Locations       = 30    = (30) * 1
Resources       = 35    = (35) * 1
Transactions    = 30    = (30) * 1
Variables       = 60    = (30) * 2
Attachments     = 40    = (20) * 2
Closure         = 70    = (35) * 2
Analysis        = 30    = (30) * 1
Comments        = 100   = (50) * 2
Status          = 200
*/    

    PerformanceStore:
    {
        title:"Indicators",
        children: 
        [
            { title: "Title",    kpo:0.0625, kpo:0.05,   ids:{Local:[], Global:[]}, points:5},
            
            
            { title: "Description",  kpi:0.0625, kpo:0.1,   report:true,   ids:{Local:[], Global:[]}, children:[{title:"Extra", ids:{Local:[], Global:[]}, kpo:0, points:25}]},
            { title: "DateTime",     kpi:0.0625, report:true, ids:{Local:[], Global:[]}, children:
                [
                    {title:"Terms", kpo:0.05, points:0, children:
                        [
                            {title:"VeryShort",     ids:{Local:[], Global:[]}, kpo:0, points:100},
                            {title:"Short",         ids:{Local:[], Global:[]}, kpo:0, points:85},                                                                                    
                            {title:"SlightShort",   ids:{Local:[], Global:[]}, kpo:0, points:70},                                                                                    
                            {title:"Standard",      ids:{Local:[], Global:[]}, kpo:0, points:50},                                                                                    
                            {title:"SlightLong",    ids:{Local:[], Global:[]}, kpo:0, points:30},                                                                                    
                            {title:"Long",          ids:{Local:[], Global:[]}, kpo:0, points:25},                                                                                    
                            {title:"VeryLong",      ids:{Local:[], Global:[]}, kpo:0, points:10}                                                                                    
                        ]},
                    {title:"Status", kpo:0, points:0, children:
                        [
                            {title:"White",     ids:{Local:[], Global:[]}, children:[{title:"Start", ids:{Local:[], Global:[]}},{title:"End", ids:{Local:[], Global:[]}}]},
                            {title:"Green",     ids:{Local:[], Global:[]}, children:[{title:"Start", ids:{Local:[], Global:[]}},{title:"End", ids:{Local:[], Global:[]}}]},
                            {title:"Yellow",    ids:{Local:[], Global:[]}, children:[{title:"Start", ids:{Local:[], Global:[]}},{title:"End", ids:{Local:[], Global:[]}}]},
                            {title:"Violent",   ids:{Local:[], Global:[]}, children:[{title:"Start", ids:{Local:[], Global:[]}},{title:"End", ids:{Local:[], Global:[]}}]},
                            {title:"Red",       points:-350, kpo:0, ids:{Local:[], Global:[]}, children:[{title:"Start", ids:{Local:[], Global:[]}},{title:"End", ids:{Local:[], Global:[]}}]},
                        ]}
                ]},   
            { title: "Priority", kpi:0.0625, report:true, ids:{Local:[], Global:[]}, children:
                [
                        {title:"Summary", ids:{Local:[], Global:[]}, children:
                            [
                                {title:"Low-",      kpo:0, points:0, ids:{Local:[], Global:[]}},
                                {title:"Low",       kpo:0, points:0, ids:{Local:[], Global:[]}},
                                {title:"Low+",      kpo:0, points:0, ids:{Local:[], Global:[]}},                                
                                {title:"Medium-",   kpo:0, points:0, ids:{Local:[], Global:[]}},
                                {title:"Medium",    kpo:0, points:0, ids:{Local:[], Global:[]}},
                                {title:"Medium+",   kpo:0, points:0, ids:{Local:[], Global:[]}},                                
                                {title:"High-",     kpo:0, points:0, ids:{Local:[], Global:[]}},
                                {title:"High",      kpo:0, points:0, ids:{Local:[], Global:[]}},   
                                {title:"High+",     kpo:0, points:0, ids:{Local:[], Global:[]}}
                            ]},
                        {title:"Significance", kpo:0.010417, points:0, ids:{Local:[], Global:[]}, children:
                            [
                                {title:"Low",       kpo:0, points:18, ids:{Local:[], Global:[]}},
                                {title:"Medium",    kpo:0, points:24, ids:{Local:[], Global:[]}},
                                {title:"High",      kpo:0, points:30, ids:{Local:[], Global:[]}}
                            ]},
                        {title:"Impact", kpo:0.010417, points:0, ids:{Local:[], Global:[]}, children:
                            [
                                {title:"Low",       kpo:0, points:18, ids:{Local:[], Global:[]}},
                                {title:"Medium",    kpo:0, points:24, ids:{Local:[], Global:[]}},
                                {title:"High",      kpo:0, points:30, ids:{Local:[], Global:[]}}
                            ]},
                        {title:"Urgency", kpo:0.010417, points:0, ids:{Local:[], Global:[]}, children:
                            [
                                {title:"Low",       kpo:0, points:12, ids:{Local:[], Global:[]}},
                                {title:"Medium",    kpo:0, points:18, ids:{Local:[], Global:[]}},
                                {title:"High",      kpo:0, points:24, ids:{Local:[], Global:[]}}
                            ]},
                        {title:"Dependency", kpo:0.010417, points:0, ids:{Local:[], Global:[]}, children:
                            [
                                {title:"Low",       kpo:0, points:6, ids:{Local:[], Global:[]}},
                                {title:"Medium",    kpo:0, points:12, ids:{Local:[], Global:[]}},
                                {title:"High",      kpo:0, points:18, ids:{Local:[], Global:[]}}
                            ]},
                        {title:"Simplicity", kpo:0.010417, points:0, ids:{Local:[], Global:[]}, children:
                            [
                                {title:"Low",       kpo:0, points:3, ids:{Local:[], Global:[]}},
                                {title:"Medium",    kpo:0, points:6, ids:{Local:[], Global:[]}},
                                {title:"High",      kpo:0, points:12, ids:{Local:[], Global:[]}}
                            ]},
                        {title:"Visibility", kpo:0.010417, points:0, ids:{Local:[], Global:[]}, children:
                            [
                                {title:"Low",       kpo:0, points:3, ids:{Local:[], Global:[]}},
                                {title:"Medium",    kpo:0, points:6, ids:{Local:[], Global:[]}},
                                {title:"High",      kpo:0, points:12, ids:{Local:[], Global:[]}}
                            ]}
                ]},
            { title: "ListItem", dataindex:true, kpi:0.0625,  kpo:0.2, report:true,  ids:{Local:[], Global:[]},  children:
                [
                    {title:"_class1",  points:2.5, dataindex:true, ids:{Local:[], Global:[]}, children:
                        [
                            {title:"_name", dataindex:true, kpo:0, points:15,  ids:{Local:[], Global:[]}, children:
                    			[
                    				{title:"_comments", dataindex:true, kpo:0, points:15, ids:{Local:[], Global:[]}, children:
                        				[
                        				    {title:sessionStorage.username, children:[]}
                        				]},
                        	        {title:"_class2",  dataindex:true,  kpo:0, points:15,  ids:{Local:[], Global:[]}, children:[]}
                        		]}
                        ]}, 
                    {title:"_class2", dataindex:true,  points:2.5,  ids:{Local:[], Global:[]}, children:
                        [
                            {title:"_name", dataindex:true, children:
                                [ 
                    				{title:"_comments", dataindex:true, points:15, ids:{Local:[], Global:[]}, children:
                        				[
                        				    {title:sessionStorage.username, children:[]}
                        				]},
                        	        {title:"_class1", dataindex:true,   kpo:0, points:15,  ids:{Local:[], Global:[]}, children:[]}
                        	    ]}
                        ]},  
                    {title:"_name",  dataindex:true, kpo:0, points:15,  ids:{Local:[], Global:[]}, children:
            			[
            				{title:"_comments",  dataindex:true,  kpo:0, points:15,  ids:{Local:[], Global:[]}, children:
                				[
                				    {title:sessionStorage.username, children:[]}
                				]}
                		]},

                    {title:"Impact", dataindex:true,  kpo:0, points:5, ids:{Local:[], Global:[]}, children:
                        [
                            {title:"Low",     dataindex:true,  ids:{Local:[], Global:[]}},
                            {title:"Medium",  dataindex:true,  ids:{Local:[], Global:[]}},
                            {title:"High",    dataindex:true,  ids:{Local:[], Global:[]}}
                        ]},
                    {title:"Priority", dataindex:true, kpo:0, points:5, ids:{Local:[], Global:[]}, children:
                        [
                            {title:"Low",     dataindex:true, ids:{Local:[], Global:[]}},
                            {title:"Medium",   dataindex:true, ids:{Local:[], Global:[]}},
                            {title:"High",     dataindex:true, ids:{Local:[], Global:[]}}
                        ]}
                ]},
            { title: "Category",  kpi:0.0625,  kpo:0.2, report:true,   menu:"true", ids:{Local:[], Global:[]}, children:
                [
                     {title:"_name", kpo:0, points:10,  ids:{Local:[], Global:[]}, children:
                        [
                            { title: "...", kpo:-0.03,  points:-75, ids:{Local:[], Global:[]}}
                        ]},
                ]},
                
                
            { title: "Contacts",  kpi:0.0625, kpe:0.2, report:true,  ids:{Local:[], Global:[]}, children:
                [
                    {title:"_class1",  kpe:0, points:2.5,  ids:{Local:[], Global:[]}}, 
                    {title:"_class2",  kpe:0, points:2.5,  ids:{Local:[], Global:[]}},  
                    {title:"_name",    kpe:0, points:10,  ids:{Local:[], Global:[]}, children:[]}, 
                    {title:"_phone",   kpe:0, points:5,  ids:{Local:[], Global:[]}}, 
                    {title:"_email",   kpe:0, points:5,  ids:{Local:[], Global:[]}}, 
                    {title:"_access",  kpe:0, points:5,  ids:{Local:[], Global:[]}, children:[]}
                ]},
            { title: "Locations",  kpi:0.0625, kpe:0.16,   report:true,   ids:{Local:[], Global:[]}, children:
                [
                    {title:"_class1", kpe:0, points:2.5,  ids:{Local:[], Global:[]}}, 
                    {title:"_class2", kpe:0, points:2.5,  ids:{Local:[], Global:[]}},                                                                                
                    {title:"_name",   kpe:0, points:10,  ids:{Local:[], Global:[]}, children:[]},    
                    {title:"Country", kpe:0, points:5,  ids:{Local:[], Global:[]}, children:[]},   
                    {title:"State/Province", kpe:0, points:5,  ids:{Local:[], Global:[]}, children:[]}, 
                    {title:"City",    kpe:0, points:5,  ids:{Local:[], Global:[]}, children:[]}, 
                    {title:"Street",  ids:{Local:[], Global:[]}, children:[]}
                ]},

            { title: "Comments", kpi:0.0625, kpa:0.3, report:true, ids:{Local:[], Global:[]}, children:[]},
            
            { title: "Status", report:true,  kpa:0, ids:{Local:[], Global:[]}, children:
                        [
                            {title:"Open", ids:{Local:[], Global:[]}}, 
                            {title:"Closed", ids:{Local:[], Global:[]}, kpa:0.1, points:200}                                                                                       
                        ]}
        ]
    },

    temp:{},
    loadControllers:
    {
        uploadReference:    -1,
        workerOn:           false, 
        actionsDownloaded:  false,
        menuReady:          false, 
        menuLoaded:         false, 
    },
    database_Controllers:{},
    eventCaller:"",
    actions:[],
    att:[],
    funcLogger: new Map(),
    
};


function breakpointLog(a)
{
    let ptimer = performance.now();
    console.log(a, "timing: " + (ptimer - ptimer1)/1000 + " seconds");
    ptimer1 = ptimer;
}


/**/
function openFocusFocusFocusDB()
{  
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "openFocusFocusFocusDB",
            qDescription:   "It initializes the indexedDB"
        }
    );
        
    if(!window.indexedDB)
    {   window.alert("not supported");}
    else
    {
        const requestDB = window.indexedDB.open(`${apps.uniqueData.uDB}_${apps.uniqueData.uVersion}`, 1);
        requestDB.onerror       = function(){   window.alert("Cannot open database");};
        requestDB.onsuccess     = function(event)
                                {  
                                    apps.dbConnection   = event.target.result;
                                    loadData();
                                };
                                
        requestDB.onupgradeneeded   = function(event)
                                    {    
                                        const db = event.target.result;
                                    
                                        if (!db.objectStoreNames.contains("PerformanceStore")) 
                                        {
                                            const performanceStore = db.createObjectStore("PerformanceStore", { keyPath: "title" });

                                            performanceStore.add(apps.PerformanceStore);                                            
                                        }
                                    
                                        if (!db.objectStoreNames.contains("Actions")) 
                                        {
                                            const actionStore = db.createObjectStore("Actions", { keyPath: "id", autoIncrement: true });
                                    
                                            //actionStore.createIndex("actionOuterReference", "ExternalCode", { unique: true });
                                            actionStore.createIndex("actionInnerReference", "InternalCode", { unique: true });
                                            actionStore.createIndex("actionAccessCode", "AccessRef");
                                            actionStore.createIndex("actionSourceCode", "SourceRef");
                                            actionStore.createIndex("actionServerCode", "ServerRef");
                                            actionStore.createIndex("actionLastUpdate", "UpdateRef");
                                            actionStore.createIndex("innerLogCounter", "MaxInnerActionCounter");
                                            actionStore.createIndex("outerLogCounter", "MaxOuterActionCounter");
                                            actionStore.createIndex("statusIndexer", "Status");
                                            actionStore.createIndex("dateIndexer", "DateTime", { unique: true });
                                        }
                                    };
    }
}



//called by updateStore.js >> updatePropertyStore_S(controller:submitActionDataToUpdate(controller:reload(unchanged)))
//called by updateStore.js >> submitActionDataToUpdate(controller:aaaaaa111111(reload(changed)))
//called by updateStore.js >> submitActionDataToUpdate(controller:Category(unchanged))
async function loadData(fromSFReport)
{                                                   
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "loadData",
            qDescription:   "This is the first function that requests all the necessary data before initializing the menu container." +
                            "It Opens the indexedDB and runs all the actions and checks for..." +
                            "- Newest updated action (internal and external server)" +
                            "- DateTime processing" +
                            "- Perform action Filter by request" +
                            "- Remove from the internal database any/all actions set to be deleted"
        }
    );
    
    let incomevalues =  (aux_existence(fromSFReport))? fromSFReport: 
                                                        {
                                                            idList:[],  
                                                            //datetime:{start:"1900-01-01T00:01:01", end:"3000-12-31T23:59:59"}, 
                                                            datetime:   
                                                            {  
                                                                start:  
                                                                {
                                                                    from:DateTime.aux_ParseTo.numericDateTime("1990-01-01T00:01:01"), 
                                                                    to: DateTime.aux_ParseTo.numericDateTime("3000-12-31T23:59:59")
                                                                }, 
                                                                end:    
                                                                {
                                                                    from:DateTime.aux_ParseTo.numericDateTime("1990-01-01T00:01:01"), 
                                                                    to:DateTime.aux_ParseTo.numericDateTime("3000-12-31T23:59:59")
                                                                }
                                                            },
                                                            menu:"Category",
                                                            filtersearch:false,
                                                            wordSearch:"",
                                                            actionLinker:[]
                                                        };
                                                        
    document.getElementById("dimensions").innerHTML=""; 
                                    
   
    
    (function(innerData)
    {
        let InternalUpdateReference = 0;
        let actionsID   = [];     
        let searchArr   = [];
        let actions     = [];
        let insertID = aux_existence(innerData.idList)? false: true;
        
        
        function getWord(action, ws)
        {
            for(let [key, arrValue] of Object.entries(action))
            {
                if((apps.properties.includes(`${key}`))&&(`${key}`!=="References"))
                {
                    if(aux_existence(arrValue))
                    {
                        for(let o of arrValue)
                        {
                            if(aux_existence(o))
                            {
                                for(let oo in o)
                                {   
                                    if(aux_existence(o[oo]))
                                    {   
                                        if(typeof o[oo][0] !== "string")
                                        {
                                            for(let ao of o[oo])
                                            {
                                                if((aux_existence(ao[0]))&&(isNaN(ao[0])))
                                                {   if(ao[0].includes(ws)){return true;}    }     
                                            }
                                        }
                                        else
                                        {
                                            if((aux_existence(o[oo][0]))&&(isNaN(o[oo][0])))
                                            {   if(o[oo][0].includes(ws)){return true;}    }
                                        }
                                    }
                                }
                            }
                        }
                        
                        //if(arrValue.includes(ws)){   return true;}
                    }
                }
            } 
            return false;
        }
        


        let getterAction = apps.dbConnection.transaction(["Actions"], "readonly").objectStore("Actions").openCursor();
            getterAction.onsuccess =    function(event1)
                                        { 
                                            let aResult = event1.target.result;
                                            let menuNotCalled = true;
                                            let notCalledBefore, datetimeReady;
                                            
                                            if(aResult)
                                            {   
                                                const {id, InternalCode, UpdateRef, Status, Title, Links} = aResult.value;
                                               
                                                //this block tries to find the highest count inside of the local database to only later compare to backup/online server database count
                                                if(Number(UpdateRef)>InternalUpdateReference)
                                                {   InternalUpdateReference = Number(UpdateRef);  }
                                                
                                                
                                                if(Number(UpdateRef)>Number(apps.uniqueData.uDate))
                                                {   actions.push(aResult.value);    }
                                                
                                                
                                                if(parseInt(Status)!==2)
                                                {
                                                    if(aux_existence(innerData.wordSearch))
                                                    {   
                                                        if(getWord(aResult.value, innerData.wordSearch))
                                                        {   innerData.idList.push(id);    }
                                                    }
                                                    else
                                                    {   innerData.idList.push(id);  }
                                                }
                                                else
                                                {   submitActionDataToDelete(aResult.value, id, false);  }
                                                
                                                aResult.continue();
                                            }
                                            else
                                            {   
                                                //debugger;
                                                
                                                //It updates internal/local database by downloading from external/online server database || (Number(InternalUpdateReference) < Number(apps.LastUpdate))
                                                /*wr_OuterStorageSync(InternalUpdateReference, innerData.idList);  */
                                                
                                                //It updates external/online server database by uploading from internal/local database  || (Number(InternalUpdateReference) > Number(apps.LastUpdate))
                                                /*wr_InnerStorageSync(actions); */
    
                                                let loopCounter=0;
                                                //const readyToLoadMenu = setInterval(function()
                                                //{  
                                                    breakpointLog("checkpoint (loadData-1): actions downloaded and ready for next step"); 
                                                    //clearInterval(readyToLoadMenu);
                                                    
                                                    notCalledBefore = true;
                                                    // = setInterval(function()
                                                    //{
                                                        breakpointLog("checkpoint (loadData-2): datetime processed and menu ready to be initialized"); 
                                                        
                                                        clearInterval(datetimeReady);
                                                        load_display_Menu(innerData);  
                                            
                                                        breakpointLog("checkpoint (loadData-2a2): datetime being processed");
                                                        
                                                        //wr_DateTimeStatus(innerData); 
                                                        
                                                        breakpointLog("checkpoint (loadData-2a2): datetime processed");
                                                        
                                                        //clearInterval(datetimeReady);   
                                                        
                                                        apps.loadControllers.uploadReference =      -1;
                                                        apps.loadControllers.workerOn =             false;
                                                        apps.loadControllers.actionsDownloaded =    false;
                                                        apps.loadControllers.menuReady =            false; 
                                                        apps.loadControllers.menuLoaded =           false; 
                                                        
                                                        //loadData();
                                                        
                                                        
                                                    //}, 500);
                                                    
                                                //}, 500);
                                                
                                                /*wr_attachmentSync();*/
                                            }
                                        };
    })(incomevalues);
};



function customizedData()
{
        apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "customizedData",
            qDescription:   "Sets the default start/end datetime"
        }
    );
    
    let sdt="", edt="";
    let lstID = "";
    

        sdt = DateTime.aux_ParseTo.numericDateTime("1990-01-01", "00:01:01"); 
        edt = DateTime.aux_ParseTo.numericDateTime("3000-12-31", "23:59:59");        
    
    
    lstID = document.getElementById("IDSelection_cnter").value;
    
    return lstID + "*|w|*" + sdt + "*|w|*" + edt; 
}



function loadFilter(filter, datetime)  
{
        apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "loadFilter",
            qDescription:   "Not sure if this is called"
        }
    );
   var dt="";
   var filtered = false;

   if(aux_existence(datetime)){ dt = datetime; filtered = true; }else{dt = refDateTime; }

   var ftr;
   if(aux_existence(filter)){ ftr = document.getElementById(filter).value; filtered = true;}else{ ftr = "";}
}




/*
Called from...
    frame.Display.Detail.report.initiallizer.(function(){})()
    
    
*/
function loadFilterSearch()
{
        apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "loadFilterSearch",
            qDescription:   "Not sure if this is called"
        }
    )
    let now = new Date().getTime();
    let dtSet   = document.getElementById("reportSettingsDT").value;
    let dtFrom  = document.getElementById("fromdtSearcher").value;
    let dtTo    = document.getElementById("todtSearcher").value;
    //let wSearch = document.getElementById("wordSearcher").value;

    let sdtFrom, sdtTo, edtFrom, edtTo;
        
    switch(dtSet)
    {
        case "start":
            sdtFrom = dtFrom; 
            sdtTo   = dtTo;
            edtFrom = "1990-01-01T00:01:01";
            edtTo   = "3000-12-31T23:59:59";
            break;
            
        case "end":
            edtFrom = dtFrom; 
            edtTo   = dtTo;
            sdtFrom = "1990-01-01T00:01:01";
            sdtTo   = "3000-12-31T23:59:59";
            break;
            
        default:
            sdtFrom = dtFrom; 
            sdtTo   = dtTo;
            edtFrom = dtFrom;
            edtTo   = dtTo;
    }
    

    
    loadData({idList:[],  
            datetime:   
            {  
                start:  
                {
                    from:DateTime.aux_ParseTo.numericDateTime(sdtFrom), 
                    to: DateTime.aux_ParseTo.numericDateTime(sdtTo)
                }, 
                end:    
                {
                    from:DateTime.aux_ParseTo.numericDateTime(edtFrom), 
                    to:DateTime.aux_ParseTo.numericDateTime(edtTo)
                }
            },
            wordSearch:document.getElementById("wordSearcher").value,            
            menu:document.getElementById("menuFilterSettler").value,
            filtersearch:true,
            actionLinker:[]
        });
}



/*
What:

Why/How:

Where: 
    Coming From:
        wCaller.wCaller_requestUpdate()
        
    Going to:

When:

Who:

*/
function load_DateTime_Management(datetime)
{
        apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "load_DateTime_Management",
            qDescription:   "Not sure if this is called"
        }
    )
    
    let now = new Date().getTime();
    if(aux_existence(datetime))
    {
        let newDT = datetime.split("*|@|*");
        let diff = parseInt(newDT[1]) - now;
        
    
        let getterAction = apps.dbConnection.transaction(["Actions"], "readonly").objectStore("Actions").get(parseInt(newDT[0]));
        getterAction.onsuccess =    function(event1)
                                    { 
                                        let action = event1.target.result; 
                                        if(action)
                                        {   //alert(DateTime.aux_ParseTo.extendDateTime(newDT[1]));
                                            setTimeout( function()
                                                        {   
                                                            deleteActionFromPropertyStore("DateTime", parseInt(newDT[0])); 
                                                            let datetime=DateTime.saveToClassStore(action.a12); 
                                                            aaaaaa111111("DateTime", datetime, action.a0, newDT[0], true);
                                                        }, diff); 
                                        }
                                    };
    }
}


//this function has to be re-structured, it has to return a value to be placed by requester. This way it can be called at the begining, called by the search, and called by sub category
//this function is called by: aaaaaa111111(); submitActionDataToUpdate(); downloadWWWDB(); loadStore.js >> loadData()
async function load_display_Menu(data)
{ 
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "load_display_Menu",
            qDescription:   "This opens the indexedDB and builds the menu organized by the property set in the data variable (default is category)" +
                            "then it populates the menuContainer and actionContainer"
        }
    )
    
    
    let filterSelection = apps.temp?.menuData?.dtArr ?? [];
    //let filterSelection = data.idList;
    
    
    /*
    [
        [],     //[0] = arrIDs
        "",     //[1] = startdatetime
        "",     //[2] = enddatetime
        "",     //[3] = selected menuStore
    ];
    */
   //function populateMenuBody([dvids, dvsdt, dvedt, dvm])
   function populateMenuBody(dataLoader, getDateTime)
   {           
        let dvids = dataLoader.idList; 
        let report = "";
        let summaryPriority={High:[], Medium:[], Low:[]};

        let dataMenu;
        let dataReport=[];
        let getDimensions=[];
        let status={};
        let noActionCreatedYet = true;
        let idsToKeep = [];
        let filterSet = false;
        
        if(aux_existence(dvids))
        {    
            dvids = dvids.map(Number); 
            filterSet = true;
        } 
        

breakpointLog("checkpoint (load_Menu):  test-1");
               
        document.getElementById("reportboard_FromMenu_report").innerHTML="";       
                           
        //if(dataLoader.menu!=="AllActions")
        
            let selectionRequest = apps.dbConnection.transaction(["PerformanceStore"], "readonly").objectStore("PerformanceStore").get("Indicators");     //openCursor();
            selectionRequest.onsuccess = function(e2)
                            { 
                                let m = e2.target.result;
    //console.log("checkpoint (load_Menu):  test-2");   
    
                               
                                if(m)
                                {
                                    apps.analitics = frmReport.perform_v1(m.children);
                                    
                                    for(let mData of m.children)
                                    {
                                        const {dimensional=false, title, menu=false, ids, kpo, kpi, kpe, children} = mData; 
                                        
                                        
                                        if(title===dataLoader.menu){   dataMenu = children; }
                                        
                                        if(title==="Priority")
                                        {
                                            let high      = new Set();
                                            let medium    = new Set();
                                            let low       = new Set();
                                            
                                            function addToSet(a, b)
                                            {   
                                                b.forEach((n)=>{a.add(n); });
                                                return a;
                                            }
                                            
                                            function getPriorityData(thisArr, dataStoredArr, arrToCompare)
                                            {
                                                if((dataStoredArr.title==="High+")||(dataStoredArr.title==="High +")||(dataStoredArr.title==="High")||(dataStoredArr.title==="High-")||(dataStoredArr.title==="High -"))
                                                {  
                                                   high = addToSet(high, aux_arrInterception(arrToCompare, dataStoredArr.ids.Global));
                                                }
                                                
                                                if((dataStoredArr.title==="Medium+")||(dataStoredArr.title==="Medium +")||(dataStoredArr.title==="Medium")||(dataStoredArr.title==="Medium-")||(dataStoredArr.title==="Medium -"))
                                                {   medium = addToSet(medium, aux_arrInterception(arrToCompare, dataStoredArr.ids.Global)); }
                                                
                                                if((dataStoredArr.title==="Low+")||(dataStoredArr.title==="Low +")||(dataStoredArr.title==="Low")||(dataStoredArr.title==="Low-")||(dataStoredArr.title==="Low -"))
                                                {   low = addToSet(low, aux_arrInterception(arrToCompare, dataStoredArr.ids.Global)); }
                                            }
                                            
                                            
                                            for(let p of children)
                                            {
                                                if(p.title==="Summary")  
                                                {   p.children.forEach(function(value){   getPriorityData(summaryPriority, value, dvids);  }) }
                                            }
                                            
                                            summaryPriority = {High:high, Medium:medium, Low:low};
                                        }
    
                                        if(title==="Status")
                                        {   
                                            for(let s0=0, s1=children, s2=s1.length; s0<s2; s0++)
                                            {   
                                                if(s1[s0].title!=="Open")
                                                {   
                                                    if(s1[s0].title!=="Closed")
                                                    {   status.deleted = s1[s0].ids.Local;  }     //Deleted
                                                    else
                                                    {   
                                                        let arr1 = (aux_existence(dvids))? aux_arrInterception(s1[s0].ids.Local, dvids): s1[s0].ids.Local; 
                                                        let arr2 = [];
                                                        arr2.push(...aux_arrInterception(arr1, getDateTime.White));
                                                        arr2.push(...aux_arrInterception(arr1, getDateTime.Green));
                                                        arr2.push(...aux_arrInterception(arr1, getDateTime.Yellow));
                                                        arr2.push(...aux_arrInterception(arr1, getDateTime.Violet));
                                                        arr2.push(...aux_arrInterception(arr1, getDateTime.Red));
                                                        
                                                        status.close = arr2;
                                                        s1[s0].ids.Local = arr2;
                                                    }  //Close     
                                                }    
                                                else
                                                {   
                                                    let arr1 = (aux_existence(dvids))? aux_arrInterception(s1[s0].ids.Local, dvids): s1[s0].ids.Local; 
                                                    let arr2 = [];
                                                    arr2.push(...aux_arrInterception(arr1, getDateTime.White));
                                                    arr2.push(...aux_arrInterception(arr1, getDateTime.Green));
                                                    arr2.push(...aux_arrInterception(arr1, getDateTime.Yellow));
                                                    arr2.push(...aux_arrInterception(arr1, getDateTime.Violet));
                                                    arr2.push(...aux_arrInterception(arr1, getDateTime.Red));
                                                    
                                                    //status.close = arr2; 
                                                    
                                                    status.open = arr2;  
                                                    s1[s0].ids.Local = arr2;
                                                }     //Active       
                                            }
                                        }
                                    }
                                    
                                    if(!aux_existence(dataMenu))
                                    {
                                        let newidlist = [];
                                        newidlist.push(...status.close);
                                        
                                        let getNonIncludedElement = function(aArr, bArr)
                                        {
                                            let valueArr=[];
                                            for(let b of bArr)
                                            {   if(!aArr.includes(b)){  valueArr.push(b);}  }
                                            return valueArr;
                                        }
                                        newidlist.push(...getNonIncludedElement(newidlist, getDateTime.White));
                                        newidlist.push(...getNonIncludedElement(newidlist, getDateTime.Green));
                                        newidlist.push(...getNonIncludedElement(newidlist, getDateTime.Yellow));
                                        newidlist.push(...getNonIncludedElement(newidlist, getDateTime.Violet));
                                        newidlist.push(...getNonIncludedElement(newidlist, getDateTime.Red));
                                        
                                        dataMenu = [{title:"All Actions", children:[], ids:{Local:[...newidlist], Global:[...newidlist]}}];
                                    }
                                
                               
    breakpointLog("checkpoint (load_Menu):  test-2 (new thread: end of looping 'class_Store')");
                                    //document.getElementById("IDSelection_cnter").value = dvids;
                                    //document.getElementById("IDSelection_all").value = dvids; 
    
    

    
                                    let arrData = {...status, ...getDateTime, summaryPriority}; 
                                    
                                    frmDisplay.storedContentLoader(frmDisplay.Menu(dataMenu, arrData, dvids, dataLoader.filtersearch));                                               
                                    frmDisplay.menuLoader(dataLoader.filtersearch);
                                    frmDisplay.environmentLoader();

                                    
                                    frmReport.returner(dvids, dataLoader.filtersearch);
                                    
                                    
                                    
    breakpointLog("checkpoint (load_Menu):  test-4 (Starting Promises)");     
                                    new Promise((myPromiseFunction)=>
                                                {
                                                    myPromiseFunction("-1"); 
                                                    breakpointLog("checkpoint (load_Menu):  test-9"); })
                                                        .then((value)=>
                                                        { 
                                                            breakpointLog("checkpoint (load_Menu):  test-10");   
                                                            updateRequests(value);  
                                                            return getDateTime;
                                                        })
                                                        .then((dtReturner)=>
                                                        {    
                                                            breakpointLog("checkpoint (load_Menu):  test-11");
                                                            //wr_ContinuousOuterStorageSync();
                                                        });
                                                                    
    breakpointLog("checkpoint (load_Menu):  test-8 (while in Promises)");                                                                                                                                        
                               }
                            };
        
   };

 

   frmDisplay.pageInitializer();
   populateMenuBody(data, filterSelection);
   
   apps.actionsDownloaded   = false;
   apps.menuReady           = false;
   apps.menuDateTimeSet     = false;
}




function load_display_Body(menu, group)
{    
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "load_display_Body",
            qDescription:   "This is a redirect from any/all clicks on the/a menu button." + 
                            "This opens the indexedDB and gets all the action associated with button pressed. " +
                            "Then it analysis the datetime to get the color and status of the action before sending to be posted"
        }
    )
    
    var data = document.getElementById("list" + menu).value;
    let order = document.getElementById("order" + menu).value; 
    
    var action = "";
    var adata;
    let index = menu.split("_");  index.shift();  index = index.join("_");
    document.getElementById("actionboard_FromMenu_" + index).innerHTML = ""; 
    
    function menuManagementDisplay(menu, group, index)
    {   if(aux_existence(menu)){   aux_collapseMenuDIV(menu, group, index); } };
        

    let arrColorDefinition = [[], [], [], []]; //[0]:red;  [1]:yellow; [2]:green; [3]:white; [4]:black; 

    if(aux_existence(data))
    {
        { adata = data.split(",").map(Number);  /*cnt = adata.length;*/ }

        for(let i=0, cnt=adata.length; i<cnt; i++)
        {
            if(aux_existence(adata[i]))
            {
                //Why is the loop check (for loop) not inside of the "onsuccess" function ???
                let getterAction = apps.dbConnection.transaction(["Actions"], "readonly").objectStore("Actions").get(parseInt(adata[i]));
                getterAction.onsuccess =    function(event1)
                                            { 
                                                let d = event1.target.result;  
                                                if(aux_existence(d))
                                                {
                                                    function getThisColor(status, datetime)
                                                    {
                                                        let dateTime = DateTime.aux_arrDateTime(datetime);  //dateTime = [frame, creation, start, plannedEnd, ActualEnd, grace=ActualEnd+graceDateTime]
                                                        var aColor;
                
                                                        if(parseInt(status)===2)
                                                        {   aColor=4; }           //black                  
                                                        else
                                                        {
                                                            let now     = new Date().getTime();                                     //now
                                                            let strtime = parseFloat(dateTime[2]);                                  //startdatetime
                                                            let endtime = parseFloat(dateTime[3]);                                  //enddatetime
                                                            let grace   =parseFloat(dateTime[5])
    
    
                                                            if(strtime>now)
                                                            {   aColor = 3; }           //white
                                                            else
                                                            {
                                                                if(now>(endtime+grace))
                                                                { aColor = 0; }            //red
                                                                else
                                                                {
                                                                    if((endtime - now)>86400000)
                                                                    {   aColor = 2; }       //green
                                                                    else
                                                                    {   aColor = 1; }       //yellow
                                                                }
                                                            }
                                                        }
                                                        
                                                        return aColor;
                                                    };
                             
                                                    //let c = getThisColor(d.Status, d.DateTime);
                                                    //arrColorDefinition[c].push({data: d, indexer: index, id: adata[i], placeHolder: order});
                                                    if(parseInt(d.Status)!==2)
                                                    arrColorDefinition[getThisColor(d.Status, d.DateTime)].push({data: d, indexer: index, id: adata[i], placeHolder: order});
    
                                                    if(i==parseInt(cnt-1))
                                                    {   
                                                        for(let actionGroup=0; actionGroup<4; actionGroup++)
                                                        {
                                                            if(aux_existence(arrColorDefinition[actionGroup][0]))
                                                            {
                                                                for(let actionMember of arrColorDefinition[actionGroup])
                                                                {
                                                                     //d.a8=status = (2): deleted
                                                                     if(parseInt(d.Status)!==2)
                                                                    {   frmDisplay.Action.Placer(actionMember.data, actionMember.indexer);          }                       
                                                                }
                                                            }
                                                        }
                                                        
                                                        menuManagementDisplay(menu, group);    
                                                    }
                                                }
                                            };
            }
        }
    }
    else
    {  aux_collapseMenuDIV(menu, group); }
}


//called from
async function loadDataFromStore(store, getter, documentID, someCallBack_Func, someid, someData1, someData2)
{
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "loadDataFromStore",
            indexedDB:      "true",
            returner:       "false",
            callBack:       "true",
            qDescription:   "This opens the indexedDB and gets a single action from the/a database store. " +
                            "It returns the action through a callback"
        }
    )
    
    
    if(apps.dbConnection!=="")
    {
        let request = apps.dbConnection.transaction([store], "readonly").objectStore(store).get(getter);      
        request.onsuccess = function(event)
        {
            let data = event.target.result;
            
            if(aux_existence(data))
            {
                if(aux_existence(documentID))
                {  document.getElementById(documentID).value = data;   }
                
                if(aux_existence(someCallBack_Func))
                {   someCallBack_Func(getter, someid, data, someData1, someData2); }  
            }
        }
    }
}



/*
called from:
    - Links.frame.bodyFrame_display.embedData(){ getActionList(){  callingFromHere  }}
*/
async function loadIndexDataFromStore(store, indexing, getter, documentID, someCallBack_Func, someid, someData, someGetter)
{
        apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "loadIndexDataFromStore",
            indexedDB:      "true",
            returner:       "false",
            callBack:       "true",
            qDescription:   "This opens the indexedDB and gets a single action from the/a database indexedStore. " +
                            "It then returns the action through a callback"
        }
    )
    
    let request = apps.dbConnection.transaction([store], "readonly").objectStore(store).index(indexing).getAll(getter);      
    request.onsuccess   = function(event)
    {
        let obj = event.target.result;
        
        if(aux_existence(obj))
        {
            if(aux_existence(someGetter))
            {
                if(obj.children)
                {
                    for(let sl of obj.children)
                    {   if(sl.title===someGetter){   obj = sl; break;}}
                }
            }
            
            if(aux_existence(documentID))
            {   document.getElementById(documentID).value = obj; }
            
            
            if(aux_existence(someCallBack_Func))
            {   someCallBack_Func(getter, someid, obj, someData, someGetter); }   
        }
    }
}



//function loadPropertyDataNameFromStore(store, getter, propetyName, nameToSearch, placerID)
function loadPropertyDataNameFromStore(store, getter, nameToSearch, placerID)
{
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "loadPropertyDataNameFromStore",
            qDescription:   "Not sure if this is ever called"
        }
    );
    
    let returner="";
    let breaker = false;
    let gCounter = 0;
    
    function recursiveChildren(obj, lookupName)
    {
        const{title, children} = obj;
        if(title===lookupName){   return obj; }
        
        return (aux_existence(children))? recursiveChildren(children, lookupName): obj;
    }
    
    
    let request = apps.dbConnection.transaction([store], "readonly").objectStore(store).get(getter[gCounter]); 
        request.onsuccess = function(event)
        {
            let property = event.target.result;
            gCounter++;
            if(property)
            {
                for(let propertyData of property.Value)
                {
                    const {title, children} = propertyData;
                    if(title===getter[gCounter])
                    {
                        gCounter++;
                        for(deepLevel_1 of children)
                        {
                            const{title, children} = deepLevel_1;
                            if(deepLevel_1.title===getter[gCounter])
                            {
                                for(deepLevel_2 of children)
                                {
                                    if(title===nameToSearch)
                                    {
                                        returner = dimensionalData;
                                        for(let dData of dimensinalData)
                                        {
                                            if(aux_existence(dData[1]))
                                            {  
                                                returner = dData[1];  
                                                breaker=true; 
                                                break;
                                            }
                                        }
                                    }
                                    if(breaker){break; }
                                }
                            }
                            if(breaker){break; }
                        }
                    }
                    if(breaker){break; }
                }
            }
            else
            {   document.getElementById(placerID).value = returner; }
        }
}



function updateRequests(status, data)
{
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "updateRequests",
            indexedDB:      "false",
            returner:       "false",
            callBack:       "false",
            redirect:       "true",
            qDescription:   "It gets a check-marker from a/the dedicated web-worker, and then ... " +
                            "It notifies to reload the application due to new updated action"
        }
    );
    
    function requestUpdateButton(index)
    {  document.getElementById("reloadRequest").style.display = "block";   }
    
    
    if(parseInt(status)<0)
    {   
        //if(aux_existence(data))
        //load_display_Menu(data.dtArr);
        
        console.log("checkpoint (updateRequests): menu loaded");
         
        /*
        wr_InnerStorageSync();
        wr_ContinuousOuterStorageSync(); 
        
        Note: The function above is important but it needs to be rechecked
        */
    }
    
    if(parseInt(status)>=0)
    {   requestUpdateButton(status); }
}



function loadEmbededObj(data, obj, topaction)
{
    apps.funcLogger.set(
        Date.now(),
        {
            file:           "loadStore.js",
            name:           "loadEmbededObj",
            indexedDB:      "false",
            returner:       "false",
            callBack:       "false",
            redirect:       "true",
            qDescription:   "It checks if there is any action set to be attached as linked. If so, it makes the call to insert it"
        }
    );
    
    let {ID:id, Index:indexer, Children} = obj;
    if(aux_existence(Children))
    {
        let lastChild = Children[(Children.length-1)];
        let lastIndex = lastChild.Index;

        if(aux_existence(data["_reference"]))
        {   
            if(aux_existence(apps.actions))
            {
                for(let a of apps.actions)
                {
                    if(a["InternalCode"]===data["_reference"][0])
                    {
                        new Promise(forwardFunc=>{}).then();
                        
                        setTimeout(()=>{   frmDisplay.placeLinks(data["_reference"][0], a.id, [a], lastIndex, topaction); }, 0);
                        
                        break;
                    }
                }
            }
            else
            {
                loadIndexDataFromStore("Actions", "actionInnerReference", data["_reference"][0], "", frmDisplay.placeLinks, id, lastIndex, topaction);  
            }
        }
    }
}

function wrDateTimeStatus(obj)
{
    let fffDB, fff_dbStore, actionStore;
    let sdt, edt;
    let nowDateTime = new Date().getTime();
    let {idList=IDs, datetime} = obj;

                            
    function returner(data1, data2)
    {   apps.temp.menuData = {dtNextExpire:data1, dtArr: data2};    }

    function datetimeClosest(dt, idArr)
    {
        function findCloserDateTime(a, b, c)
        {
            let cdt = [];
            function closestDateTime(a1, a2, a3)
            {   cdt = [a1, a2, a3]; }
            closestDateTime(0,0,0);
                
                
                
            a.forEach(function(iValue)
            {
                let value = iValue.split("*|@|*");
                if(b.indexOf(value[0])!==-1)
                {
                    if(Number(c)<Number(value[1]))
                    {
                        if(((cdt[0]===0)&&(cdt[1]===0))||((Number(value[1])-Number(c))<cdt[2]))
                        {   closestDateTime(value[0], value[1], (Number(value[1])-Number(c)));    }
                    }
                }
            });
            
            
            return cdt;
        }
        
                        
    
        
        return "";
    }

    function this_arrInterception(x, y)
    {   
        let newArr = []; 
        let n = false;
        let m = false;
        
        if(Array.isArray(x)){n=true; x=x.map(Number); }
        if(Array.isArray(y)){m=true; y=y.map(Number); }
        
        if(n&&m)
        {
            for(let i10=0, i11=x.length; i10<i11; i10++)
            {
                if(y.indexOf(x[i10])!==-1)
                {   newArr.push(x[i10]); }
            }

            for(let i10=0, i11=y.length; i10<i11; i10++)
            {
                if(x.indexOf(y[i10])!==-1)
                {   if(newArr.indexOf(y[i10])===-1){newArr.push(y[i10]); }}
            }
        }

        return newArr; 
    }

    function datetimeArr(datetime, ids)
    {
        let sArr=[], eArr=[], getDateTime={};
        let Red=[], Violet=[], Green=[], Yellow=[], White=[], Start=[], End=[], list="";
        
        for(let dt of datetime)
        {
    
            if(dt.title==="Red")    
            {   Red.push(...dt.ids.Local);   }
                                    
            if(dt.title==="Violet")
            {   Violet.push(...dt.ids.Local);   }
                                    
            if(dt.title==="Yellow") 
            {   Yellow.push(...dt.ids.Local);   }
                                    
            if(dt.title==="Green")  
            {   Green.push(...dt.ids.Local);   } 
            
            if(dt.title==="White")  
            {   White.push(...dt.ids.Local);   }
        }
        
        getDateTime.Red     = this_arrInterception(ids, Red);
        getDateTime.Violet  = this_arrInterception(ids, Violet);
        getDateTime.Yellow  = this_arrInterception(ids, Yellow);
        getDateTime.Green   = this_arrInterception(ids, Green);
        getDateTime.White   = this_arrInterception(ids, White);
        getDateTime.idList  = [...ids];   
        
        return getDateTime;
    }

    //let {IDs, datetime} = e1;
    let sdtFrom = datetime.start.from;
    let sdtTo = datetime.start.to;
    let edtFrom = datetime.end.from;
    let edtTo = datetime.end.to;
                                                                                                                    
  
    actionStore = apps.dbConnection.transaction(["PerformanceStore"], "readwrite").objectStore("PerformanceStore").get("Indicators");
    actionStore.onsuccess = function(e2)
    {
        let m = e2.target.result;
    
        if(m)
        {
            let idArr = [];
            let arrDateTime, nextDateTime;
            for(let mData of m.children)
            {
                const {title, children} = mData;    
                if(title==="DateTime")
                {
                    if(children)
                    {
                        let d1, d2, d3, d4;
                        
                        for(let dt of children)
                        {
                            if(dt.title==="Status"){d1 = dt.children; }
                            if(dt.title==="Terms"){ d2 = dt.children; }


                            if(dt.title==="Start")
                            {   
                                d3 = []; 
                                for(let t of dt.children)
                                {
                                    if((parseInt(t.title)>=(sdtFrom))&&(parseInt(t.title)<=(sdtTo)))
                                    {   d3.push(...t.ids.Local); }
                                }
                            }
                            
                            if(dt.title==="End")
                            { 
                                d4 = []; 
                                for(let t of dt.children)
                                {
                                    if((parseInt(t.title)>=(edtFrom))&&(parseInt(t.title)<=(edtTo)))
                                    {   d4.push(...t.ids.Local); }
                                }                                                               
                            } 
                        }
                        
                        let arrID = this_arrInterception(d3, d4);
                        
                        
                            arrDateTime = datetimeArr(d1, arrID);
                            nextDateTime = datetimeClosest(d2, arrID);                                                      
                        
                        returner(nextDateTime, arrDateTime);
                    }
                    
                    break;
                } 
            }
        }
    };
    
    actionStore.onerror = function(){   returner("","");   };

    breakpointLog("checkpoint (wrDateTimeStatus-2): datetime initialed (done)");                                    
}         


