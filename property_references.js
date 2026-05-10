const References = 
{
    eFrame:      function(id, cnt, data, clone)
    { 
        function UniqueExternalReference()  //case: 1   
        {
            let value="";
            if(aux_existence(data)){ value = data;}
            return value;
        }
        
        function UniqueInternalReference()  //case: 2
        {
                let value = "";
                let maxLength = 16;
                let len=0, letters=0, numbers=0;
        
                let type        = function(){ return parseInt(Math.floor(Math.random() * 2)); };                        //returns 0 or 1;
                let getNumber   = function(){ return parseInt(Math.floor(Math.random() * 10)); };                       //returns a random integer from 0 to 9:
                let getLetter   = function(a)
                    {
                        let aph = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                        let aphLen = Math.floor(Math.random() * aph.length);
                        let upper_lower_Case = Math.floor(Math.random() * 2);  
                        
                        if(upper_lower_Case!==1)
                        {   return aph[aphLen].toLowerCase(); }
                        else
                        {   return aph[aphLen].toUpperCase(); }
                    }; 
                
                function defaultFunc(a)
                    {
                            if(type()!==1)
                            {   return getLetter(); letters++; }
                            else
                            {   return getNumber(); numbers++;}    
                    }
        
            if(!aux_existence(data))
            {
                while(len<maxLength)
                {
                    switch(len)
                    {
                        case 5: 
                            if(letters===5){ value = value + getNumber(); }
                            if(numbers===5){ value = value + getLetter(); }
                            value = value + defaultFunc();
                            numbers=1; letters=1; break;
                            
                        case 10: 
                            if(letters===5){ value = value + getNumber(); }
                            if(numbers===5){ value = value + getLetter(); }
                            value = value + defaultFunc();
                            numbers=1; letters=1; break; 
                            
                        case 15: 
                            if(letters===5){ value = value + getNumber(); }
                            if(numbers===5){ value = value + getLetter(); }
                            value = value + defaultFunc();
                            numbers=1; letters=1; break;            
                            
                        default:
                            value = value + defaultFunc();
                    }
                    len++;
                }
            }
            else
            {   value = data; }
                
            return value;
        }

        function setAccessReference()       //case: 3
        {
            let value="";
            if(aux_existence(data)){  value = (data.length<25)? "0001111111111111111001110": data;  }
            if(id==="newAction"){ value = "0001111111111111111001110";}
            return value;
        }
        
        function setSourceReference()       //case: 4
        {    
            if(aux_existence(data))
            {   return data; }
            else
            {   return sessionStorage.username;    }
        }
        
        function setServerReference()       //case: 5
        {   return "0";     }
        
        /*
            Note: this is a temporary value, the real value will be set by the returner in workerOuterStorageOperator.js 
            The value represents the highest update counter in the outer server
        */
        function UpdateReference()         //case: 6; 
        {   return DateTime.aux_ParseTo.numericDateTime();  }    
        
        function setInternalCounter()       //case: 7
        {   
            let value=1;
            if(id!=="newAction"){ value = parseInt(data)+1;  }
            return value;
        }
        
        function setExternalCounter()       //case: 8
        {
            let value=0;
            if(aux_existence(data)){value = data;}
            return value;
        } 
        


        
        let value;
        switch(parseInt(cnt))
        {
            case 1:     value = UniqueExternalReference();  break;      //Unique External Action Reference
            case 2:     value = UniqueInternalReference();  break;      //Unique Internal Action Reference
            case 3:     value = setAccessReference();       break;
            case 4:     value = setSourceReference();       break;      //creator
            case 5:     value = setServerReference();       break;
            case 6:     value = UpdateReference();          break;   
            case 7:     value = setInternalCounter();       break;
            case 8:     value = setExternalCounter();       break;   
        }
    
        
        return aux_existence(clone)? value: "<input type=\"hidden\" id=\"edit_References_" + id + "_1_" + cnt + "\" value=\"" + value + "\">"; 
    },   
 
 
    
    saveException:  function(id, indicator, clone)
    {   
        let value = "";
        
        if(aux_existence(clone))
        {   value = this.eFrame(id, indicator, "", "true");  }
        else
        {
            if(aux_existence(document.getElementById("edit_References_" + id + "_1_" + indicator)))
            {
                if(aux_existence(document.getElementById("edit_References_" + id + "_1_" + indicator).value))
                {   value = document.getElementById("edit_References_" + id + "_1_" + indicator).value; }
            }  
            
            /*
            It seems that eFrame has been called before when the action was inserted into frame.
            It was called by frame.edit.eAction.eBody.returner(){}
            */
            //value = this.eFrame(id, indicator, value, "false");
        }
        
        return value;
    },

};
