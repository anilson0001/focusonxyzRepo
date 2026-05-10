class EditProperty
{
    constructor(title)
    {
        this.title = title;
        this.frame = eval(title).frame;
        this.property = new Map();
    }
    
    frameBlock()
    {}
    
    _processProperty(data)
    {
        switch(data)
        {
            case "button":
                
                break;
            case "selector":
            
                break;
            case "loader":
                
                break;
                
        }
    }
    
    returnProperty(caller)
    {
        let value = _processProperty(caller)
    }
}



class EditAction extends EditProperty 
{
    constructor(ID)
    {
        super();
        this.actionID = ID;
        this.actionProperty = [];
    }
    
    processAction(data)
    {
        let dataProperties = data.split("*|3f3x|*");
        for(let dp of dataProperties)
        {   }
        
    }
    
    returnAction()
    {}
}
