const Category = 
{
    instructions: function()
    {
        return  "* To add a new Category, click on 'Add Category' button<br>" +
                "* To remove a frame block, select first the input field and while it has the focus Click on 'Remove Selected Category' button<br><br>" +
                "This property sets the Action into menu categories tabs<br>" +
                "Each new Category added goes into a deeper level of a cascade menu<br><br>" +
                "Note-1: Each input field is mandatory<br>" +
                "Note-2: The current Action can also be categorized (set into menu) as another previews Action by \'Select Existing Category\'";
    },    
    
    dimensional: true,
    dimensionKey: 1,

  
    frame: 
    {   
        headFrame:
        {   
            id:"head",
            
            eframe:  
            [
                {type:"button", extraclass: "_Button", attribute: {value:"Add New Category", framecaller:2}},
                {type:"select", dymanicDimension: "true"}                      
            ]
        },
        
        bodyFrame_v1:
        {   
            id:1, 
            dMode: "true",
            eframe:  [{type:"text", labelID:"_name", codeSelector:7, dMode:"false", required:true, moveupdown:true, rIndex:"f", dReport:["f"], attribute: {removepermission:"main", placeholder:"..."}}],  
            
            insertionBottom: true,
            exceptionToStore:"Category",
        },
        
        bodyFrame_v2:
        {   
            id:2, 
            dMode: "true",
            eframe: [
                        {type:"text", label:"Name",labelID:"_name", labelTop:"na", codeSelector:7, required:true, moveupdown:true, rIndex:"f", dReport:["f"], attribute: {removepermission:"main", placeholder:"..."}},
                        {type:"textarea", labelID:"_comments", codeSelector:9}
                    ],  
            
            insertionBottom: true,
            exceptionToStore:"Category",
        },
        
        footFrame:
        {
            id:"foot",
            eframe:  [{type:"button", attribute: {value:"Remove Selected Category", button_type:"RemovalButton", data_property_block:"", data_property_element:""}}]
        },
        
        returner: function(frameID)
        {  
            if(frameID==="head"){       return this.headFrame; } 
            if(frameID==="foot"){       return this.footFrame; }
            //if(parseInt(frameID)===1){  return this.bodyFrame_v1; }

            //return this.bodyFrame_v2;
            return this.bodyFrame_v1;
        }
    },
};




