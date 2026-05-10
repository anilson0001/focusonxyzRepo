const Title = 
{
    instructions: function()
    {   return "This is a mandatory field"; },
    
    frame: 
    {   
        headFrame:"",
        bodyFrame:
        {   
            id:1, 
            dMode: "true",
            
            exceptionToStore: "Title",
            
            eframe:   [{codeSelector:3, labelID:"_name", dMode:"false", eMode:"false",  required:"true", type:"text"}],
        },
        footFrame:"",

        returner: function(frameID)
        {   
            if(frameID==="head"){ return this.headFrame;}
            if(frameID==="foot"){ return this.footFrame;}
          
            return this.bodyFrame; 
        }
    },
};
