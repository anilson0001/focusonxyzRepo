//version_8c
class VariableHandler
{
   	constructor(editor)
   	{
   	    this.title = "Variable";
      	this.editor = editor;
      	this.variableCounter = 0;
      	this.variableRefCounter = 0;
      	this.splitType = null;
      	this.variableElement = null;
      	this.variableMap = new Map();
   	}




	initializeExisting(wrapper)
	{
   		this.variableCounter = 0;
   		this.variableRefCounter = 0;

	    document.querySelectorAll("div[data-editor-element='variable']").forEach(div =>
   		{
      		const numMatch = div.closest('.variable-panel')?.id?.match(/_(\d+)$/);
      		const num = numMatch ? parseInt(numMatch[1], 10) : 0;
      		this.variableCounter = Math.max(this.variableCounter, num + 1);

      		div.querySelectorAll('[data-variable-section="elements"]').forEach(el =>
      		{
     			if (el.dataset.refId)
     			{
        			const span = document.getElementById(el.dataset.refId);
        			if (span)
        			{
           				this.setupObserver(span, el);
        			}
     			}
      		});
   		});
	}



	textSelected()
	{
		let returner = {selectedText:[]};
		let selText = [], selected=[];
		let fragmentMap = new Map();

    	this.splitType = null;
    	this.editor.saveSelection();


        this.editor.container.querySelector(".editor").querySelectorAll("div[data-wrap-element='table']").forEach(table =>
        {
            table.querySelectorAll(".selectedTableCells").forEach((cell)=>
            {
                returner.selectedText.push({text:cell.textContent, wrapped:true, counter:this.variableCounter, sourceId:`t${table.dataset.tableCounter}_r${cell.dataset.cellColumn}_c${cell.dataset.cellColumn}`});
            });        
        });


    	if (this.editor.hasSelection())
    	{
 		    const sel = window.getSelection();
    		const range = sel.getRangeAt(0);
    		const cloneFragment = range.cloneContents();

			let cloneCounter = document.querySelectorAll('span[id^="sel-var-ref-"]').length;

			this.savedRange = this.editor.savedRange;
			const nodeList = Array.from(cloneFragment.childNodes);
		
/*
            for(let node of nodeList)
			{
				if(node)
				{
					if(node.nodeType === Node.TEXT_NODE)
					{
						const divElement = document.createElement("div");
			
						const spanElement = document.createElement("span");
						spanElement.id = `sel-var-ref-${++cloneCounter}`;
						spanElement.classList = "selectedByVariable";
						spanElement.textContent  = node.textContent.trim();

						divElement.appendChild(spanElement);
						returner.replacementText.appendChild(divElement);
						returner.selectedMap.set(spanElement.id, divElement);

						fragmentMap.set(node.data, {text:node.textContent, wrapped:true, sourceId:spanElement.id});
					}
					else if(node.nodeType === Node.ELEMENT_NODE)
					{
						let newNode = node.querySelector('span[id^="sel-var-ref-"]');
						if(newNode)
						{
							if(newNode.textContent)
							{
								returner.replacementText.appendChild(node);
								returner.selectedMap.set(newNode.id, node);

								fragmentMap.set(newNode.textContent, {text:newNode.textContent, wrapped:true, sourceId:newNode.id});
							}
						}
						else
						{
							let txtContent = node.textContent.trim();
							if(txtContent)
							{
								const spanElement = document.createElement("span");
								spanElement.id = `sel-var-ref-${++cloneCounter}`;
								spanElement.classList = "selectedByVariable";
								spanElement.textContent  = txtContent;

								node.innerHTML = "";
								node.appendChild(spanElement);

								returner.replacementText.appendChild(node);
								returner.selectedMap.set(spanElement.id, node);

								fragmentMap.set(spanElement.innerText, {text:spanElement.textContent, wrapped:true, sourceId:spanElement.id});
							}
						}
					}
				}
			}
*/
            //const rText = this.editor.saveSelection();
     		const rawObj = this.editor.saveSelection();
     		if (rawObj.selectedText !== "")
     		{
     		    let rawText = rawObj.selectedText;
    			if (rawText.includes("\n"))
    			{ 	
					selected = rawText.split("\n").map(item => item.trim()).filter(item => item); 
					this.splitType = 'newline'; 
				}
    			else if (rawText.includes(" "))
    			{ 	
					selected = rawText.split(" ").map(item => item.trim()).filter(item => item); 
					this.splitType = 'space'; 
				}
    			else
    			{ 	
					selected = [rawText]; 
					this.splitType = 'single'; 
				}
     		}
     		else
     		{
        		selected = [rawText];
     		}
		}


    	selected.forEach((value, position)=>
    	{	
    		let fm = fragmentMap.get(value);
    		if(fm)
    		{
    			returner.selectedText.push(fm);
    		}
    		else
    		{	
    		    //returner.selectedText.push({text: e, wrapped: false, sourceId: null }); 
    		     returner.selectedText.push({text:value, counter:this.variableCounter, sourceId:`s${position}`});
    		}	
    	});
    
    


    
    	return returner;
    }




  	showConfigPanel(wrapper, callFromToolbar) 
  	{
        if(!this.editor.configPanel) 
            this.editor = this.editor.updateEditor(wrapper);   
            
        this.editor.configPanel.innerHTML = '';
        
        this.editor.configPanel.appendChild(this.initialObjPanel(wrapper));
        this.editor.configPanel.style.display = "block";
  	}





	initialObjPanel(wrapper=null)
	{   
		let varText = this.textSelected();
        let selText = varText.selectedText;
        let selectedArr = varText.selectedText;
		let varCounter = 1, newcnt=1;
		let commentFromMap = "", counterFromMap=-1;
		

     	const bodyWrapper = document.createElement("div");
     	bodyWrapper.className = "variable-panel";
     	bodyWrapper.id = `variable_${this.variableCounter + 1}`;
     	bodyWrapper.dataset.editorProperty = `${this.editor.propertyID}`;


     	const varSourceLabel = document.createElement("label");
     	varSourceLabel.textContent = "Variable Source: ";

	
     	const varSourceSelect = document.createElement("select");
		varSourceSelect.id = `variableSelector`;

		const frontOpt = document.createElement('option');
		frontOpt.value = "";

		const firstOpt = document.createElement('option');
		firstOpt.value = "selectedVariable";
		firstOpt.textContent = "Selected Text";
		
		const secondOpt = document.createElement('option');
		secondOpt.value = "newVariable";
		secondOpt.textContent = "Create New Variable";		
		
		varSourceSelect.appendChild(frontOpt);
		varSourceSelect.appendChild(secondOpt);		
		varSourceSelect.appendChild(firstOpt);


this.variableMap.forEach((v,k)=>
{
	const nodeOpt = document.createElement('option');
	nodeOpt.textContent = k;
	nodeOpt.value = v.counter;
		
    varSourceSelect.appendChild(nodeOpt);
});
		
		bodyWrapper.appendChild(varSourceLabel);
		bodyWrapper.appendChild(varSourceSelect);
		
		
		
		const varLabel = document.createElement("label");
		varLabel.textContent = "New Name Variable";

		const varInput = document.createElement("input");
		varInput.id = `variable_${this.variableCounter + 1}_name`;
		varInput.dataset.inputSection="name";
		varInput.dataset.variable="name";

        bodyWrapper.appendChild(varLabel);
        bodyWrapper.appendChild(varInput);
        
        
		const varElem = document.createElement("div");        
		selectedArr.forEach((elem)=>
		{
		    if(elem.text)
		    {
		        const dataToSend = {};
		        dataToSend.id = `variable_${this.variableCounter + 1}_${newcnt}`;
		        dataToSend.value = elem.text;
		        dataToSend.label = `Element ${newcnt}`;
		        dataToSend.sourceId = elem.sourceId;
		        
				varElem.appendChild(this.panelElementWrapper(dataToSend, newcnt, true));
				newcnt++;;
		    }
		});



		varSourceSelect.addEventListener("change",(e)=>
		{
			const vars = document.createElement("div");
			e.target.querySelectorAll("option").forEach((optVar, i)=>
			{
				if(e.target.selectedIndex===i)
				{ 
					if(optVar.textContent==="Selected Text")
					{
						document.getElementById("createupdate").style.display = "block";
						document.getElementById("delete").style.display = "block";
					}
					else if(optVar.textContent==="Create New Variable")
					{
						document.getElementById("createupdate").style.display = "block";
						document.getElementById("delete").style.display = "block";						
					}
					else
					{
					    let mobj = this.variableMap.get(optVar.textContent);
					    if(mobj)
					    {
					        counterFromMap = mobj.counter;
					        const configPanel = this.editor.container.querySelector(".config-panel");
    						configPanel.querySelector("input[data-variable='name']").value = optVar.textContent;		
    						
    						mobj.data.forEach((value) =>
    						{
    						    if(value)
    						    {
    						        const dataToSend = {};
    						        dataToSend.id = `variable_${this.variableCounter + 1}_${counterFromMap? counterFromMap: newcnt}`;
    						        dataToSend.value = value;
    						        dataToSend.label = `Element ${counterFromMap? counterFromMap: newcnt}`;
    						        
        							vars.appendChild(this.panelElementWrapper(dataToSend, `${counterFromMap? counterFromMap: newcnt}`, true));
        							newcnt++;
    						    }
    						});		
    					    configPanel.querySelector("textarea[data-variable='comments']").value = mobj.comments;
					    }
					    document.getElementById("variableSelector").selectedIndex = 0;
					    
						varElem.appendChild(vars);

						document.getElementById("createupdate").style.display = "block";
						document.getElementById("delete").style.display = "block";					    
					}
				}
			});
		});
     	bodyWrapper.appendChild(varElem);


        const newVarElement = document.createElement("div");
        newVarElement.id = "newVarElement";
        bodyWrapper.appendChild(newVarElement);
        

		
		
        const btnAddElement = document.createElement("button");
        btnAddElement.textContent = "Add New Element";
        btnAddElement.addEventListener("click", ()=>
        {
	        const dataToSend = {};
	        dataToSend.id = `variable_${this.variableCounter + 1}_${newcnt}`;
	        dataToSend.value = "";
	        dataToSend.label = `Element ${newcnt}`;
	        
			varElem.appendChild(this.panelElementWrapper(dataToSend, newcnt++));
			//newcnt++;

            document.getElementById("newVarElement").appendChild(varElem);
        });
        bodyWrapper.appendChild(btnAddElement);


        const newCreatedVarElements = document.createElement("div");
        bodyWrapper.appendChild(newCreatedVarElements);




 		const varMainComments = document.createElement("textarea");
 		varMainComments.placeholder = "Comments";
 		varMainComments.id = `variable_${this.variableCounter + 1}_Comments`;
 		varMainComments.rows = 5;
 		varMainComments.className = "variable-panel-area";
 		varMainComments.dataset.variable = "comments";
 		varMainComments.textContent = commentFromMap;
		bodyWrapper.appendChild(varMainComments);




     	

        const footWrapper = document.createElement("div");
     	const createupdateBtn = document.createElement("button");
     	createupdateBtn.className = "btnPanel oPanel";
     	createupdateBtn.textContent = "Create/Update";
		createupdateBtn.id = "createupdate";
		createupdateBtn.style.display = "none";
        createupdateBtn.dataset.pseudoId = parseInt(this.variableCounter) + 1;
        createupdateBtn.addEventListener("click", (e) => 
		{	
/*
			this.variableCounter++;
			let selVariableID = (this.selectedVariable)? this.selectedVariable.id: `variable_${e.target.dataset.pseudoId}`;

        	let txt = document.getElementById(`edit_${selVariableID}_Comments`).value.trim();
        	if(txt){ txt = this.editor.sanitizeText(txt); }

			//let editorElem = document.getElementById("editorElement_variables");
			let editorElem = this.editor.container.querySelector("div[id='editorElement_variables']");
			if(!editorElem)
			{
				editorElem = document.createElement("div");
				editorElem.id = "editorElement_variables";
				editorElem.className = "variables-wrapper";
                //this.editor.container.querySelector(".editor").appendChild(editorElem);
                this.editor.insertIntoEditor(editorElem);
			}
			

        	const varName = document.createElement("div");
        	varName.id = `${selVariableID}_Name`;
        	varName.dataset.parentId = `${selVariableID}`;
        	varName.dataset.variableSection = 'name';
        	varName.className = "_button";
			let inputName = document.getElementById(`edit_${selVariableID}_name`);
			varName.dataset.contentSaved = (inputName)? inputName.value: `${selVariableID}`;

        	const varComm = document.createElement("div");
        	varComm.id = `${selVariableID}_Comments`;
        	varComm.dataset.parentId = `${selVariableID}`;
        	varComm.dataset.variableSection = `comments`;
        	varComm.dataset.contentSaved = txt;

        	const variableGroup = document.createElement("div");
        	variableGroup.id = variableID;
       		variableGroup.className = 'variable';
            variableGroup.dataset.editorElement = "variable";
            variableGroup.addEventListener("click", (ee) => 
			{	
				this.insertVariablePanel(ee.target); 
			});
        	variableGroup.appendChild(varName);
        	variableGroup.appendChild(varComm);

            this.selectedVariable = variableGroup;
            this.createObjElement(bodyWrapper, varText);

			editorElem.appendChild(variableGroup);
			
        	bodyWrapper.remove();

        	this.selectedVariable = null;
        	this.splitType = null;
        	this.savedRange = null;
*/
            this.createObjElement(bodyWrapper, null, );
         });	


        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btnPanel oPanel";
		deleteBtn.id = "delete";
        deleteBtn.textContent = "Delete";
		deleteBtn.style.display = "none";
        deleteBtn.addEventListener("click", () => 
		{
            this.editor.removeElement();
        });

        footWrapper.appendChild(createupdateBtn);
        footWrapper.appendChild(deleteBtn);


        this.variableCounter++;
        this.selectedVariable = bodyWrapper;              //Why???
        this.editor.selectedElement = bodyWrapper;        //why???
        
        
        
 		return this.editor.panelWrapper({head:this.title, body:bodyWrapper, foot:footWrapper});
	}





	createObjElement(panel, tSelect, i=1)
	{
   		if (!panel) return;

		let objToBePlaced = panel;
		let cnt = 1;
		
        const variableObj = document.createElement("div");
    	variableObj.className = 'variable-wrapper';
    	variableObj.id = `variable_${this.editor.propertyID}_${this.variableCounter}`;
		variableObj.dataset.variableCounter = this.variableCounter;
		variableObj.dataset.rteContainerId = `${this.editor.propertyID}`;
		variableObj.dataset.editorProperty = `${this.editor.propertyID}`;
		variableObj.dataset.editorElement = "variable";
	    
	    
	    let counter = 1;
	    const vobj = {color:"#ffffff", data:[]};
	    let mapName = "";
	    const panelArrElement = panel.querySelectorAll("[data-variable]");
   		//.forEach((elem) =>
   		for(let elem of panelArrElement)
   		{
			const element = document.createElement("div");
			const value = elem.value?.trim();
			
            //element.dataset.parentId = objToBePlaced.id;
			element.dataset.parentId = variableObj.id;
			element.dataset.variableSection = elem.dataset.variable;
			element.dataset.variableMember = elem.dataset.variable;
			element.dataset.contentSaved = value;
			if(elem.dataset.sourceId)
			{	
				element.dataset.variableSource = elem.dataset.sourceId;
			}
			variableObj.appendChild(element);
			
			
			if(elem.dataset.variable!=="element")
			{   
			    vobj[elem.dataset.variable] = value;  

			    element.id = `${objToBePlaced.id}_${elem.dataset.variable}`;
			    if(elem.dataset.variable==="name") 
			    {
			        let o = this.variableMap?.get(elem.dataset.variable);
			        element.dataset.variableColor = o?.color || vobj.color;
			        vobj.color = element.dataset.variableColor;
			        if(!value)
			        {   
			            this.editor.deselectAllConfigs();
			            return;     
			        }
			        
			        mapName = value;			        
			    }
			}
			else
            {   
                vobj.data.push(value);  
                element.id = `${objToBePlaced.id}_${counter++}_${elem.dataset.variable}`;
            }
   		}
/*
 			    if(this.variableMap.has(mapName))
			    {   
			        let mn = this.variableMap.get(mapName);    
			        mn = vobj;
			        this.variableMap.set();
			    }
			    else
			    {   this.variableMap.set(mapName, vobj); }  
*/

this.variableMap.set(mapName, vobj);

/*
    	if(this.savedRange && this.editor.container.contains(this.savedRange.startContainer))
    	{
        	const range = this.savedRange.cloneRange();
    
    		range.deleteContents();
    
    		if(tSelect)
    		{
    			this.removeElementNode(this.editor.container, tSelect.selectedMap);
    			range.insertNode(tSelect.replacementText);
    		}
    	}
*/    
       	panel.style.display = "none";
        panel.innerHTML = "";
    
       	this.selectedVariable = null;
       	this.editor.selectedElement = null;
       	this.splitType = null;
       	this.savedRange = null;
       	
       	let objNotReplaced = true;
        this.editor.container.querySelectorAll(`[data-variable-counter]`).forEach(v0 =>
        {
            const v1 = v0.querySelector("div[data-variable-member='name']");
            if(v1.dataset.contentSaved === mapName){   v0.replaceWith(variableObj);   objNotReplaced = true;  }
        });

        if(objNotReplaced)
        {   this.editor.insertIntoEditor(variableObj);  }
        
        
        this.variableCounter++;       
        this.editor.deselectAllConfigs();
    }



	//panelElementWrapper(labelData, inputData, cnt, disableElement=false)
	panelElementWrapper(data, cnt, disableElement=false)
	{
		const thisVariableElement = document.createElement("div");

		const newLabelVarElem = document.createElement("label");
		newLabelVarElem.textContent = data.label;

		const newInputVarElem = document.createElement("input");
		newInputVarElem.id = data.id;
		newInputVarElem.value = data.value;
		newInputVarElem.dataset.variableElementCounter = cnt;
		if(disableElement){     newInputVarElem.disabled = true; }
		newInputVarElem.dataset.inputSection = `element`;
		newInputVarElem.dataset.variable = `element`;

		thisVariableElement.appendChild(newLabelVarElem);
		thisVariableElement.appendChild(newInputVarElem);	


		return thisVariableElement;
	}




	insertSelectedElementToPanel(variableObj, dataElement, variableID, cnt=1)
	{
		let thisVariable = document.createElement("div");

		if(variableObj)
		{
			variableObj.querySelectorAll("[data-variable-section='element']").forEach((element)=>
			{
				let newVariable = this.panelElementWrapper(element.dataset.contentSaved, (cnt++));
            	thisVariable.appendChild(newVariable);
			});
		}
		
      	dataElement.forEach((element) =>
      	{
		let newVariable = this.panelElementWrapper(element, cnt++);
        		thisVariable.appendChild(newVariable);
      	})

        thisVariable.appendChild(elementWrapper("", cnt++));
	}





	removeElementNode(container, map)
	{
		map.forEach((mElement, mKey)=>
		{
			let containerElement = container.querySelector(`[id='${mKey}']`);
			if(containerElement)
			{	containerElement.parentNode.remove(); }
		});
	}
}
