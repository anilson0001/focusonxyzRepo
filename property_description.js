var Description = 
{
    instructions: function()
    {   return "Define your objectives here. Be detailed about 'What' and/or 'Why'"},
    
    frame: 
    {   
        headFrame:"",
        
        bodyFrame_v1:
        {   
            id:1,
            dMode: "true",
            exceptionToStore: "Description",
           
            
            eframe: [{codeSelector:9, labelID:"_comments", eMode:"false", type:"textarea", required:"true", attribute: {RichTextEditor:"true", name:"unignore", required:"true",  rows:"8"}}]
        },
        
        bodyFrame_v2:
        {   
            id:2,
            dMode: "true",
            exceptionToStore: "Description",
           
            
            eframe: [{codeSelector:9, labelID:"_comments", eMode:"false", type:"textarea", required:"true", attribute: {name:"unignore"}}]
        },
        
        footFrame:"",
        
        returner: function(frameID)
        {   
            if(frameID==="head"){ return this.headFrame;}
            if(frameID==="foot"){ return this.footFrame;}
            if(parseInt(frameID)===1){ return this.bodyFrame_v1;}
            
            return this.bodyFrame_v2; 
        }
    }
};
