/*
class WriterPanelHandler
{
   	constructor(editor) 
   	{
      		this.editor = editor;
      		this.writerCounter = 0;
      		this.elementCounter = 0;
      		this.selectedWriter = null;
   	}


	initializeExisting() 
	{
  		// Update scriptCounter based on existing scriptcodes
  		//this.writerCounter = 0;
  		this.editor.container.querySelectorAll('.scriptcode').forEach(div => 
		{
    			const numMatch = div.closest('.script-panel')?.id?.match(/_(\d+)$/); // Approximate
    			const num = numMatch ? parseInt(numMatch[1], 10) : 0;
    			this.writerCounter = Math.max(this.writerCounter, num + 1);
    			//this.makeConfigurable(div);
    			this.ditor.makeElementConfigurable(div);
    			
    			this.elementCounter = this.writerCounter;
  		});
	}




  	showConfigPanel(wrapper, callFromToolbar) 
  	{
        if(!this.editor.configPanel) 
            this.editor = this.editor.updateEditor(wrapper);   

        this.editor.configPanel.innerHTML = '';
        
        this.editor.configPanel.appendChild(callFromToolbar? this.initialObjPanel(): this.updateObjPanel(wrapper));
        this.editor.configPanel.style.display = "block";
  	}



	initialObjPanel()
	{
		let cnt = this.writerCounter + 1;
		//this.elementCounter++
		const wrapper = document.createElement("div");
		wrapper.id = `writer_${this.editor.propertyID}_${cnt}`;

    		const writerNameLabel = document.createElement("label");
    		writerNameLabel.textContent = "Writer Name:";
wrapper.appendChild(writerNameLabel);

    		const writerNameInput = document.createElement("input");
		writerNameInput.id = `${wrapper.id}_name`;
	wrapper.appendChild(writerNameInput);	
		


    		const bgColorLabel = document.createElement("label");
    		bgColorLabel.textContent = "Background Color:";
wrapper.appendChild(bgColorLabel);

    		const bgColorInput = document.createElement("input");
    		bgColorInput.type = "color";
		bgColorInput.id = `${wrapper.id}_bgColor`;
    		bgColorInput.value = "#e1e4e5";
wrapper.appendChild(bgColorInput);

    		const txtColorLabel = document.createElement("label");
    		txtColorLabel.textContent = "Text Color:";
wrapper.appendChild(txtColorLabel);

    		const txtColorInput = document.createElement("input");
    		txtColorInput.type = "color";
		txtColorInput.id = `${wrapper.id}_txtColor`;
    		txtColorInput.value = "#e1e4e5";
wrapper.appendChild(txtColorInput);

    		const contentLabel = document.createElement("label");
    		contentLabel.textContent = "Writer Comments:";
wrapper.appendChild(contentLabel);

    		const contentTextarea = document.createElement("textarea");
    		contentTextarea.rows = 5;
		contentTextarea.id = `${wrapper.id}_comments`;
wrapper.appendChild(contentTextarea);

		const lineNumbers = document.createElement("div");
    		const lineNumbersLabel = document.createElement("label");
    		lineNumbersLabel.textContent = "Show Line Numbers:";
//wrapper.appendChild(bgColorInput);

    		const lineNumbersCheckbox = document.createElement("input");
    		lineNumbersCheckbox.type = "checkbox";
		lineNumbersCheckbox.id = `${wrapper.id}_lnum_checkbox`;
    		//lineNumbersCheckbox.checked = scriptDiv.classList.contains('line-numbers');
//wrapper.appendChild(bgColorInput);		


		lineNumbers.appendChild(lineNumbersLabel);
		lineNumbers.appendChild(lineNumbersCheckbox);
wrapper.appendChild(lineNumbers);

    		const applyButton = document.createElement("button");
    		applyButton.textContent = "Create";
		applyButton.addEventListener("click", (e)=>{	this.createObjElement(e.target.parentElement)});
wrapper.appendChild(applyButton);

        const cancelBtn = document.createElement("button");
        cancelBtn.style.width = "30%";
        cancelBtn.style.margin = "5px";
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", () => 
        {
            this.editor.deselectAllConfigs();
            this.editor.restoreSelection();
        });
        wrapper.appendChild(cancelBtn);


		return wrapper;
	}


  	updateObjPanel(element)
 	{
		const wrapper = document.createElement("div");
		wrapper.id = element.id;
		wrapper.classList = "editmode";

    	const writerNameLabel = document.createElement("label");
    	writerNameLabel.textContent = "Writer Name:";
        wrapper.appendChild(writerNameLabel);

    	const writerNameInput = document.createElement("input");
		writerNameInput.id = `${wrapper.id}_name`;
		writerNameInput.value = element.dataset.pseudoName ||= "";
	    wrapper.appendChild(writerNameInput);	



    	const bgColorLabel = document.createElement("label");
    	bgColorLabel.textContent = "Background Color:";
        wrapper.appendChild(bgColorLabel);

    	const bgColorInput = document.createElement("input");
    	bgColorInput.type = "color";
		bgColorInput.id = `${wrapper.id}_bgColor`;
    	bgColorInput.value = element.dataset.pseudoBgcolor ||= "#e1e4e5";
        wrapper.appendChild(bgColorInput);

    	const txtColorLabel = document.createElement("label");
    	txtColorLabel.textContent = "Text Color:";
        wrapper.appendChild(txtColorLabel);

    	const txtColorInput = document.createElement("input");
    	txtColorInput.type = "color";
		txtColorInput.id = `${wrapper.id}_txtColor`;
    	txtColorInput.value = element.dataset.pseudoColor ||= "#e1e4e5";
        wrapper.appendChild(txtColorInput);


    	const contentLabel = document.createElement("label");
    	contentLabel.textContent = "Writer Comments:";
        wrapper.appendChild(contentLabel);


    	const contentTextarea = document.createElement("textarea");
    	contentTextarea.rows = 5;
		contentTextarea.id = `${wrapper.id}_comments`;
		let txtContent = "";

		const content = element.querySelector("[data-pseudo-Comments]");
		let lncheckbox = false;
		if(content.classList.value.includes("numberedlines"))
		{
			let contentArr = [];
			
			content.querySelectorAll("span[data-content-line]").forEach((line, index)=>
			{
				contentArr.push(line.textContent);
			});

			contentTextarea.value = contentArr.join("\n");
			lncheckbox = true;
		}
		else
		{ 	contentTextarea.value = content.innerText; 	}
        wrapper.appendChild(contentTextarea);

		const lineNumbers = document.createElement("div");
		const lineNumbersLabel = document.createElement("label");
		lineNumbersLabel.textContent = "Show Line Numbers:";
//wrapper.appendChild(bgColorInput);

		const lineNumbersCheckbox = document.createElement("input");
		lineNumbersCheckbox.type = "checkbox";
	    lineNumbersCheckbox.id = `${wrapper.id}_lnum_checkbox`;
	
		lineNumbersCheckbox.checked = lncheckbox;
//wrapper.appendChild(bgColorInput);		


		lineNumbers.appendChild(lineNumbersLabel);
		lineNumbers.appendChild(lineNumbersCheckbox);
        wrapper.appendChild(lineNumbers);

    	const applyButton = document.createElement("button");
    	applyButton.textContent = "Update";
		applyButton.addEventListener("click", (e)=>
		{	
			const oldwriter = this.editor.container.querySelector(`div[id='${this.editor.selectedElement.id}']:not(.editmode)`);
			if(oldwriter){  oldwriter.remove();   }
			this.createObjElement(e.target.parentElement);
		});
        wrapper.appendChild(applyButton);

		const removeButton = document.createElement("button");
		removeButton.textContent = "Remove";
		removeButton.addEventListener("click", ()=> {	this.editor.removeElement(); });
		wrapper.appendChild(removeButton);


        const cancelBtn = document.createElement("button");
        cancelBtn.style.width = "30%";
        cancelBtn.style.margin = "5px";
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", () => 
        {
            this.editor.deselectAllConfigs();
            this.editor.restoreSelection();
        });
        wrapper.appendChild(cancelBtn);
        
        
		return wrapper;
    }



  	createObjElement(panel) 
	{
    	if (!panel) return;
        

		const writerDiv = document.createElement("div");
		writerDiv.classList = "writerStyle";
		writerDiv.id = `writer_${this.editor.propertyID}_${this.editor.selectedElement? this.elementCounter: ++this.elementCounter}`;
		writerDiv.dataset.editorElement = "writer";
		writerDiv.dataset.editorProperty = `${this.editor.propertyID}`;

    	writerDiv.style.backgroundColor = document.getElementById(`${writerDiv.id}_bgColor`).value;
		writerDiv.style.Color 		= document.getElementById(`${writerDiv.id}_txtColor`).value;

		const dataid = document.createElement("div");
		dataid.classList = 'writerheader';
		dataid.textContent = document.getElementById(`${writerDiv.id}_name`).value;

		writerDiv.dataset.pseudoName = document.getElementById(`${writerDiv.id}_name`).value;
		writerDiv.dataset.pseudoBgcolor = document.getElementById(`${writerDiv.id}_bgColor`).value;
		writerDiv.dataset.pseudoColor   = document.getElementById(`${writerDiv.id}_txtColor`).value;

		dataid.className = 'writerConfig';
		dataid.style.background = '#ccc';
		dataid.style.cursor = 'move';
	
		writerDiv.appendChild(dataid);

		const hr = document.createElement("hr");
		hr.style.width = '100%';
		writerDiv.appendChild(hr);


		const writerContent = document.createElement("div");
		writerContent.dataset.pseudoComments = "true";

    	const newContent = this.editor.sanitizeText(document.getElementById(`${writerDiv.id}_comments`).value.trim());
    	if (document.getElementById(`${writerDiv.id}_lnum_checkbox`).checked) 
		{
      		const escaped = this.escapeHtml(newContent);
      		const lines = escaped.split('\n');
      		writerContent.innerHTML = lines.map((l, i) => `<div class="line" data-line="${i+1}"><span data-pseudo-id="${writerDiv.id}" class="linewriter">${i+1} </span><span data-content-line='${i+1}'>${l}</span></div>`).join('');
      		writerContent.classList.add('line-numbers');
			writerContent.classList.add('numberedlines');
            writerDiv.dataset.pseudoCommentlines = "numbered";
    	} 
		else 
		{
      		writerContent.innerHTML = newContent;
      		writerContent.classList.remove('line-numbers');
            writerDiv.dataset.pseudoCommentlines = "none";
    	}
		writerDiv.append(writerContent);


        this.editor.makeElementConfigurable(writerDiv, "", this.showConfigPanel.bind(this));
        
        document.getElementById(writerDiv.id).remove();
		this.editor.container.querySelector(".editor").appendChild(writerDiv);
  	}
}
*/


class WriterPanelHandler
{
    constructor(editor)
    {
        this.title = "Writer";
        this.editor = editor;
        this.writerCounter = 0;
        this.elementCounter = 0;
        this.selectedWriter = null;
    }

    initializeExisting()
    {
        this.elementCounter = 0;
        this.writerCounter  = 0;
        const existing = this.editor.container.querySelectorAll('.writerStyle');
        existing.forEach(div => 
        {
            const numMatch = div.id.match(/_(\d+)$/);
            const num = numMatch ? parseInt(numMatch[1], 10) : 0;
            this.writerCounter = Math.max(this.writerCounter, num + 1);
            this.elementCounter = Math.max(this.elementCounter, num + 1);

            this.editor.makeElementConfigurable(div, "", this.showConfigPanel.bind(this));
        });
    }

    showConfigPanel(wrapper, callFromToolbar = false)
    {
        if(!this.editor.configPanel) 
            this.editor = this.editor.updateEditor(wrapper);   

        this.editor.configPanel.innerHTML = '';
        
        this.editor.configPanel.appendChild(callFromToolbar? this.initialObjPanel(): this.updateObjPanel(wrapper));
        this.editor.configPanel.style.display = "block";
    }

    initialObjPanel()
    {
        //const cnt = ++this.writerCounter;
        const wrapperId = `writer_${this.editor.propertyID}_${this.writerCounter}`;

        const bodyWrapper = document.createElement("div");
        bodyWrapper.id = wrapperId;

        // Writer Name
        bodyWrapper.appendChild(this.createLabel("Writer Name:"));
        const nameInput = this.createInput("text", `${wrapperId}_name`);
        bodyWrapper.appendChild(nameInput);

        // Background Color
        bodyWrapper.appendChild(this.createLabel("Background Color:"));
        const bgInput = this.createInput("color", `${wrapperId}_bgColor`, "#e1e4e5");
        bodyWrapper.appendChild(bgInput);

        // Text Color
        bodyWrapper.appendChild(this.createLabel("Text Color:"));
        const txtInput = this.createInput("color", `${wrapperId}_txtColor`, "#000000");
        bodyWrapper.appendChild(txtInput);

        // Content
        bodyWrapper.appendChild(this.createLabel("Writer Comments / Code:"));
        const textarea = document.createElement("textarea");
        textarea.rows = 8;
        textarea.id = `${wrapperId}_comments`;
        textarea.style.width = "100%";
        textarea.style.fontFamily = "monospace";
        bodyWrapper.appendChild(textarea);

        // Line Numbers Checkbox
        const lineNumDiv = document.createElement("div");
        lineNumDiv.style.margin = "10px 0";
        lineNumDiv.appendChild(this.createLabel("Show Line Numbers:"));
        const lineNumCheckbox = this.createInput("checkbox", `${wrapperId}_lnum_checkbox`);
        lineNumDiv.appendChild(lineNumCheckbox);
        bodyWrapper.appendChild(lineNumDiv);




        const footWrapper = document.createElement("div");
        const applyBtn = document.createElement("button");
        applyBtn.innerText = "Create";
        applyBtn.className = "btnPanel oPanel";
        applyBtn.addEventListener("click", ()=>
        {
            this.createObjElement(bodyWrapper);
        });
        footWrapper.appendChild(applyBtn);
        
/*
        // Buttons
        const applyBtn = this.createButton("Create", () => 
        {
            this.createObjElement(wrapper);
            this.editor.configPanel.style.display = "none";
        });
        wrapper.appendChild(applyBtn);
*/

		return this.editor.panelWrapper({head:this.title, body:bodyWrapper, foot:footWrapper});
		
    }

    updateObjPanel(element)
    {
        const wrapperId = element.id;

        const bodyWrapper = document.createElement("div");
        bodyWrapper.id = wrapperId;
        bodyWrapper.classList.add("editmode");

        // Writer Name
        bodyWrapper.appendChild(this.createLabel("Writer Name:"));
        const nameInput = this.createInput("text", `${wrapperId}_name`, element.dataset.pseudoName || "");
        bodyWrapper.appendChild(nameInput);

        // Background Color
        bodyWrapper.appendChild(this.createLabel("Background Color:"));
        const bgInput = this.createInput("color", `${wrapperId}_bgColor`, element.dataset.pseudoBgcolor || "#e1e4e5");
        bodyWrapper.appendChild(bgInput);

        // Text Color
        bodyWrapper.appendChild(this.createLabel("Text Color:"));
        const txtInput = this.createInput("color", `${wrapperId}_txtColor`, element.dataset.pseudoColor || "#000000");
        bodyWrapper.appendChild(txtInput);

        // Content
        bodyWrapper.appendChild(this.createLabel("Writer Comments / Code:"));
        const textarea = document.createElement("textarea");
        textarea.rows = 8;
        textarea.id = `${wrapperId}_comments`;
        textarea.style.width = "100%";
        textarea.style.fontFamily = "monospace";

        const contentDiv = element.querySelector("[data-pseudo-comments]");
        let rawText = "";
        let hasLineNumbers = false;

        if (contentDiv && contentDiv.classList.contains("numberedlines")) 
        {
            const lines = [];
            contentDiv.querySelectorAll("span[data-content-line]").forEach(span => 
            {
                lines.push(span.textContent);
            });
            rawText = lines.join("\n");
            hasLineNumbers = true;
        } 
        else 
        {
            rawText = contentDiv ? contentDiv.innerText : "";
        }

        textarea.value = rawText;
        bodyWrapper.appendChild(textarea);

        // Line Numbers Checkbox
        const lineNumDiv = document.createElement("div");
        lineNumDiv.style.margin = "10px 0";
        lineNumDiv.appendChild(this.createLabel("Show Line Numbers:"));
        const lineNumCheckbox = this.createInput("checkbox", `${wrapperId}_lnum_checkbox`);
        lineNumCheckbox.checked = hasLineNumbers;
        lineNumDiv.appendChild(lineNumCheckbox);
        bodyWrapper.appendChild(lineNumDiv);




        // Buttons
        const footWrapper = document.createElement("div");

        const updateBtn = this.createButton("Update", () => 
        {
            const oldElement = this.editor.container.querySelector(`#${element.id}:not(.editmode)`);
            if (oldElement) oldElement.remove();
            this.createObjElement(wrapper);
            this.editor.configPanel.style.display = "none";
        });
        footWrapper.appendChild(updateBtn);

        const removeBtn = this.createButton("Remove", () => 
        {
            if (confirm("Remove this writer block?")) 
            {
                element.remove();
                this.editor.configPanel.style.display = "none";
                this.editor.deselectAllConfigs();
            }
        });
        footWrapper.appendChild(removeBtn);



        //return wrapper;
        return this.editor.panelWrapper({head:this.title, body:bodyWrapper, foot:footWrapper});
    }

    // Helper methods
    createLabel(text)
    {
        const label = document.createElement("label");
        label.textContent = text;
        label.style.display = "block";
        label.style.marginTop = "10px";
        return label;
    }

    createInput(type, id, value = "") 
    {
        const input = document.createElement("input");
        input.type = type;
        input.id = id;
        if (value) input.value = value;
        input.style.width = "100%";
        input.style.marginBottom = "5px";
        return input;
    }

    createButton(text, callback) 
    {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.style.margin = "5px";
        btn.style.padding = "8px 12px";
        btn.addEventListener("click", callback);
        return btn;
    }

    escapeHtml(text) 
    {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    createObjElement(panel)
    {
        if (!panel) return;

        this.elementCounter++;
        this.writerCounter++;

        const writerDiv = document.createElement("div");
        writerDiv.className = "writerStyle";
        writerDiv.id = panel.id;
        writerDiv.dataset.editorElement = "writer";
        writerDiv.dataset.editorProperty = this.editor.propertyID;
        writerDiv.dataset.rteContainerId = this.editor.propertyID;

        const name = document.getElementById(`${writerDiv.id}_name`).value.trim() || "";
        const bgColor = document.getElementById(`${writerDiv.id}_bgColor`).value;
        const txtColor = document.getElementById(`${writerDiv.id}_txtColor`).value;
        const rawContent = document.getElementById(`${writerDiv.id}_comments`).value;
        const showLineNumbers = document.getElementById(`${writerDiv.id}_lnum_checkbox`).checked;

        // Apply styles
        writerDiv.style.backgroundColor = bgColor;
        writerDiv.style.color = txtColor;
        writerDiv.style.padding = "10px";
        writerDiv.style.borderRadius = "6px";
        writerDiv.style.margin = "10px 0";
        writerDiv.style.fontFamily = "monospace";
        writerDiv.contenteditable = "false";

        // Header
        if(name)
        {
            const header = document.createElement("div");
            header.className = "writerConfig";
            header.textContent = name;
            header.style.background = "#ccc";
            header.style.padding = "6px";
            header.style.fontWeight = "bold";
            header.style.cursor = "move";
            writerDiv.appendChild(header);
    
            writerDiv.appendChild(document.createElement("hr"));
        }
        
        // Content container
        const contentWrapper = document.createElement("div");
        contentWrapper.dataset.pseudoComments = "true";

        if (showLineNumbers) 
        {
            const lines = rawContent.split('\n');
            const codeBlock = document.createElement("pre");
            codeBlock.style.margin = "0";
            codeBlock.style.whiteSpace = "pre";
            codeBlock.style.overflowX = "auto";

            const code = document.createElement("code");
            code.className = "line-numbers";

            lines.forEach((line, i) => 
            {
                const lineDiv = document.createElement("div");
                lineDiv.className = "line";
                lineDiv.innerHTML = `<span class="line-number">${i + 1}</span><span class="line-content">${this.escapeHtml(line)}</span>`;
                code.appendChild(lineDiv);
            });

            codeBlock.appendChild(code);
            contentWrapper.appendChild(codeBlock);
            contentWrapper.classList.add("numberedlines");
        } 
        else 
        {
            const pre = document.createElement("pre");
            pre.textContent = rawContent;
            pre.style.margin = "0";
            pre.style.whiteSpace = "pre-wrap";
            pre.contenteditable = "false";
            contentWrapper.appendChild(pre);
        }

        writerDiv.appendChild(contentWrapper);

        // Save metadata
        //writerDiv.dataset.pseudoName = name;
        writerDiv.dataset.pseudoBgcolor = bgColor;
        writerDiv.dataset.pseudoColor = txtColor;

        // Remove any existing version and insert new
        const existing = document.getElementById(writerDiv.id);
        if (existing) existing.remove();
        
        
        this.editor.makeElementDraggable(writerDiv, null, false);
        this.editor.insertIntoEditor(writerDiv);
        this.editor.makeElementConfigurable(writerDiv, "", this.showConfigPanel.bind(this));
        
        this.editor.insertIntoEditor(writerDiv);
        this.editor.deselectAllConfigs();
    }
    
    requestToRemoveAllSelection()
    {}
}
