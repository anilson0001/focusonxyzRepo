/*
function rteLoader(id, bodyID)
{
    if(aux_existence(id))
    {
        //let indexer = id.split("_");
        //let placer = indexer.pop();     indexer.push(parseInt(placer) + 1);
        //let textSelectID = indexer.join("_");
        //let textSelectMode = document.getElementById(textSelectID).value;
        
        if(tinymce.get(id)!==null)
        {
            if(tinymce.get(id).isHidden())
            {   
                tinymce.get(id).show(); 
                document.getElementById("rteCaller_" + id).innerText = "OFF";
                document.getElementById(id).setAttribute("RichTextEditorSet", "rteSetToTrue");
                document.getElementById(id).style.height = "420px";
                document.getElementById("rteContainer_" + id).style.height = "180px";     
                //document.getElementById(textSelectID).value = "1";
            }
            else
            {
                tinymce.get(id).hide(); 
                document.getElementById("rteCaller_" + id).innerText = "ON";
                document.getElementById(id).setAttribute("RichTextEditorSet", "rteSetToFalse");
                document.getElementById(id).style.height = "420px";
                document.getElementById("rteContainer_" + id).style.height = "160px";  
                //document.getElementById(textSelectID).value = "0";
            }
        }
        else
        {
            document.getElementById("rteCaller_" + id).innerText = "OFF";
            document.getElementById(id).setAttribute("RichTextEditorSet", "rteSetToTrue");
            document.getElementById(bodyID).style.maxHeight = "420px";
            document.getElementById(id).style.height = "420px";
            document.getElementById("rteContainer_" + id).style.height = "420px";  
            //document.getElementById(textSelectID).value = "1";


      
            tinymce.init({
      selector: 'textarea#rteDescription_101',

 plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
      
toolbar: 'undo | fontsize | bold italic underline strikethrough | image table mergetags | align lineheight bullist numlist | removeformat',
     

  advlist_bullet_styles: 'square',
  advlist_number_styles: 'lower-alpha,lower-roman,upper-alpha,upper-roman',
  menubar: false,
statusbar: false,



  setup: (ed) => {
    // Register example command
    ed.addCommand('mycommand', (ui, v) => {
      ed.windowManager.alert('Hello world!! Selection: ' + ed.selection.getContent({ format: 'text' }));
    })},
  
    });      
       }
    }
    alert("hello tinymce 1");
}
*/
function rteLoader_v1(id, bodyID)
{
    //default function
    try
    {
        if(aux_existence(id))
        {
            let arrid = id.split("_");
            let actionB = document.getElementById("body_" + arrid[2]);
            //actionB.style.maxHeight =  "fit-content"; //Number(Number(actionB.scrollHeight) + Number("436")) + "px";
        
                tinymce.init({
          selector: `#${id}`,
    
     plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
          
    toolbar: 'undo | fontsize | bold italic underline strikethrough | image table mergetags | align lineheight bullist numlist | removeformat',
         
    
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'lower-alpha,lower-roman,upper-alpha,upper-roman',
      menubar: false,
    statusbar: false,
    
        });
        
    
             
    /*
                const ed = new tinymce.Editor(id, 
                {
                    height: 300,
                    width:  '100%',
        
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace  table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed          linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode          editimage tinycomments tableofcontents footnotes mergetags autocorrect typography          inlinecss',
              
                    toolbar: 'undo | fontsize | bold italic underline strikethrough | image table mergetags | align lineheight bullist numlist | removeformat',
                    advlist_bullet_styles: 'square',
                    advlist_number_styles: 'lower-alpha,lower-roman,upper-alpha,upper-roman',
                    menubar: false,
                    statusbar: false
                }, tinymce.EditorManager);
        
                ed.render();
    */       
        }
        
        //alert("hello tinymce 21");
    }
    catch
    {
        //alert("hello tinymce 22");
        console.log("some bugs found, but the application is ready to go");
    }
    
    //alert("hello tinymce 3");
}

/*
function rteLoader_v2(id)
{
    if(aux_existence(id))
    {
        tinymce.init(
            {
                selector: `#${id}`,
                height: 300,
                width:  '100%',
    
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace  table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed          linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode          editimage tinycomments tableofcontents footnotes mergetags autocorrect typography          inlinecss',
          
                toolbar: 'undo | fontsize | bold italic underline strikethrough | image table mergetags | align lineheight bullist numlist | removeformat',
                advlist_bullet_styles: 'square',
                advlist_number_styles: 'lower-alpha,lower-roman,upper-alpha,upper-roman',
                menubar: false,
                statusbar: false
            });     
    }
    
    alert("hello tinymce 4");
}
*/