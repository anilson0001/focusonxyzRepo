
class DetailsHandler
{
   	constructor(editor) 
   	{
   	    this.title = "Detail";
      		this.editor = editor;
      		this.detailerCounter = 0;
      		this.selectedDetails = null;
		this.positioner = null;
   	}


	initializeExisting() 
	{
		// Update detailsCounter based on existing details
		this.detailsCounter = 0;
		this.editor.container.querySelectorAll('details').forEach(details => 	
		{
		    details.contentEditable = "false";
		    
			const numMatch = details.closest('.details-panel')?.id?.match(/_(\d+)$/); // Approximate
			const num = numMatch ? parseInt(numMatch[1], 10) : 0;
			this.detailsCounter = Math.max(this.detailsCounter, num + 1);
			
			const summary = details.querySelector('summary');
            if(summary){   this.editor.makeElementConfigurable(summary);   } // ← ONLY summary
            
            
            const content = details.querySelector('.detailContent');
            if(content) content.contentEditable = "inherit"; // or false
		});
	}
	


  	editorHandler(wrapper) 
	{
		return this.initialObjPanel();
  	}



  	showConfigPanel(wrapper, panelSelector) 
  	{
        if(!this.editor.configPanel) 
            this.editor = this.editor.updateEditor(wrapper);   
            
        this.editor.configPanel.innerHTML = '';
        
        this.editor.configPanel.appendChild(this.initialObjPanel(wrapper));
        this.editor.configPanel.style.display = "block";
  	}


    // Optional helper: show config panel and focus summary input
    initialObjPanel(wrapper=null)
    {
        //this.editor.restoreSelection(); // ← also good here
        this.editor.saveSelection();
        const id = this.editor.container.dataset.pseudoId;
        
        let head, body, placer;


        const bodyWrapper = document.createElement("div");
        bodyWrapper.className = "details-controls";
        bodyWrapper.dataset.editorElement = "detailed";
        
        
        if(!this.editor.savedRange)
        {   placer = window.getSelection().anchorOffset;    }
        
        
        //const selection = this.editor.savedRange? this.editor.savedRange.toString();
        if(wrapper)
        {   
            head = wrapper.querySelector("[data-detail-element='head']").textContent; 
            body = wrapper.querySelector("[data-detail-element='body']").textContent; 
        }
        
        const summaryInput = document.createElement("input");
        summaryInput.id = `editDetailer_head_${id}`;
        summaryInput.type = "text";
        summaryInput.value = wrapper? head: this.editor.savedRange?.toString() || "";
        summaryInput.dataset.elementSection = "head";
        summaryInput.placeholder = "Summary text (title of the collapsible section)";

        const contentTextarea = document.createElement("textarea");
        contentTextarea.id = `editDetailer_body_${id}`;
        contentTextarea.placeholder = "Content (will appear when expanded)";
        contentTextarea.dataset.elementSection = "body";
        contentTextarea.value = wrapper? body: "";
        contentTextarea.rows = 5;
        
        
        const footWrapper = document.createElement("div");
        
        const insertBtn = document.createElement("button");
        insertBtn.className = "btnPanel oPanel";
        insertBtn.textContent = "Insert Details";
        insertBtn.addEventListener("click", () => this.createObjElement(bodyWrapper, placer, wrapper));
        footWrapper.appendChild(insertBtn);

        if(wrapper)
        {
            const removeBtn = document.createElement("button");
            removeBtn.className = "btnPanel oPanel";
            removeBtn.textContent = "Remove Details";
            removeBtn.addEventListener("click", () => this.editor.remove(wrapper));
            footWrapper.appendChild(removeBtn);
        }
        
        



        return this.editor.panelWrapper(
        {
            head: this.title,
            body: bodyWrapper.appendChild(summaryInput) && bodyWrapper.appendChild(contentTextarea) && bodyWrapper,
            foot: footWrapper
        });
    }

	

    createObjElement(wrapper, positioner, toBeReplaced) 
    {
        const detailerHead = wrapper.querySelector("[data-element-section='head']");
        const detailerBody = wrapper.querySelector("[data-element-section='body']");
        const detailerUpdate = wrapper.querySelector("[data-confirm-update]")? true: false;

        if (!detailerHead || !detailerBody) return;

        const summaryText = detailerHead.value.trim();
        const contentText = this.editor.sanitizeText(detailerBody.value.trim());

        if (!summaryText) return; // optional: prevent empty creation

        // Create the details element
        const newDetails = document.createElement("details");
        newDetails.dataset.editProperty = this.editor.propertyID;
        newDetails.dataset.editorElement = "detail";
        newDetails.dataset.editorProperty = this.editor.propertyID;
        newDetails.dataset.layer = "inline";
        newDetails.dataset.confirmUpdate = "true";
        newDetails.style.position = "relative";
        newDetails.style.display = "inline-block";



        const summary = document.createElement("summary");
        summary.dataset.detailElement = "head";
        summary.textContent = summaryText;

        const content = document.createElement("div");
        content.dataset.detailElement = "body";
        content.className = "detailContent";
        content.textContent = detailerBody.value.trim(); // or innerHTML if you allow formatting later
        //content.textContent = contentText; // or innerHTML if you allow formatting later


        // IMPORTANT: Tell browser these are not part of editable content
        newDetails.contentEditable = "false";
        //summary.contentEditable = "false";
        content.contentEditable = "false"; // optional, but harmless

        newDetails.appendChild(summary);
        newDetails.appendChild(content);

        // ── INSERT AT CURSOR POSITION ──
        this.editor.restoreSelection(); // Very important!







        const selection = window.getSelection();  // ← Always use current selection after restore
        
        if (toBeReplaced) 
        {
            toBeReplaced.replaceWith(newDetails);
        } 
        else if (selection.rangeCount > 0) 
        {
            const range = selection.getRangeAt(0);
        
            // Safety: ensure range is inside editor
            if (this.editor.container.contains(range.commonAncestorContainer)) 
            {
                const hasSelection = !range.collapsed && range.toString().trim() !== "";
        
                if (hasSelection)
                {
                    range.deleteContents();      // Remove selected text first
                }
        
                // Now insert at the (possibly adjusted) range position
                range.insertNode(newDetails);
        
                // Move caret AFTER the inserted details
                const newRange = document.createRange();
                newRange.setStartAfter(newDetails);
                newRange.collapse(true);
        
                selection.removeAllRanges();
                selection.addRange(newRange);
            } 
            else 
            {
                // Fallback if restored range is invalid
                this.editor.container.querySelector(".editor")?.appendChild(newDetails);
            }
        }
        else 
        {
            // No selection at all → append to end
            //this.editor.container.querySelector(".editor")?.appendChild(newDetails);
            this.editor.insertIntoEditor(newDetails);
        }
                


        //this.editor.makeElementConfigurable(confirmSummary);      // ← ONLY summary
        this.editor.makeElementConfigurable(newDetails, null, this.showConfigPanel.bind(this));
        

        // Optional: Prevent accidental editing inside content
        //content.contentEditable = "inherit"; // or false if you don't want to edit body yet
  		//this.editor.makeElementConfigurable(newDetails, "", this.showConfigPanel.bind(this));
  		
        // Final cleanup & feedback
        this.editor.deselectAllConfigs();
        //this.editor.saveSelection(); // if you want to remember position after insert
    }



	requestToRemoveAllSelection()
	{}
}

/*
class DetailsHandler 
{
    constructor(editor) {
        this.title = "Detail";
        this.editor = editor;
        this.detailsCounter = 0;
        this.selectedDetails = null;
        this.positioner = null;
    }

    initializeExisting() {
        // Update detailsCounter based on existing details
        this.detailsCounter = 0;
        this.editor.container.querySelectorAll('details').forEach(details => {
            const numMatch = details.closest('.details-panel')?.id?.match(/_(\d+)$/); // Approximate
            const num = numMatch ? parseInt(numMatch[1], 10) : 0;
            this.detailsCounter = Math.max(this.detailsCounter, num + 1);

            details.contentEditable = "false"; // NEW: Non-editable in edit mode

            const summary = details.querySelector('summary');
            if (summary) {
                summary.contentEditable = "false"; // NEW: Prevent direct editing of summary

                // Attach configurable with dblclick for edit
                this.editor.makeElementConfigurable(summary, null, (summaryEl) => {
                    this.showEditPanel(summaryEl.closest('details'));
                });
            }

            const content = details.querySelector('.detailContent');
            if (content) {
                content.contentEditable = "false"; // NEW: Prevent direct editing of content (change to "true" later if needed)
            }
        });
    }

    // NEW: Method to show config panel for editing existing <details>
    showEditPanel(existingDetails) 
    {
        if (!existingDetails) return;

        this.editor.restoreSelection(); // Optional: Restore position if needed
        const id = this.editor.container.dataset.pseudoId;

        const bodyWrapper = document.createElement("div");
        bodyWrapper.className = "details-controls";
        bodyWrapper.dataset.editorElement = "detailed";

        // Populate with existing values
        const currentSummary = existingDetails.querySelector('summary')?.textContent?.trim() || "";
        const currentContent = existingDetails.querySelector('.detailContent')?.textContent?.trim() || "";

        const summaryInput = document.createElement("input");
        summaryInput.id = `editDetailer_head_${id}`;
        summaryInput.type = "text";
        summaryInput.value = currentSummary;
        summaryInput.dataset.elementSection = "head";
        summaryInput.placeholder = "Summary text (title of the collapsible section)";

        const contentTextarea = document.createElement("textarea");
        contentTextarea.id = `editDetailer_body_${id}`;
        contentTextarea.value = currentContent;
        contentTextarea.placeholder = "Content (will appear when expanded)";
        contentTextarea.dataset.elementSection = "body";
        contentTextarea.rows = 5;

        bodyWrapper.appendChild(summaryInput);
        bodyWrapper.appendChild(contentTextarea);

        const updateBtn = document.createElement("button");
        updateBtn.className = "btnPanel oPanel";
        updateBtn.textContent = "Update Details";
        updateBtn.addEventListener("click", () => 
        {
            this.updateObjElement(bodyWrapper, existingDetails);
        });

        const footWrapper = document.createElement("div");
        footWrapper.appendChild(updateBtn);

        // Show the panel
        this.editor.configPanel.appendChild(this.editor.panelWrapper(
        {
            head: this.title + " (Edit)",
            body: bodyWrapper,
            foot: footWrapper
        }));
        this.editor.configPanel.style.display = "block";
    }

    // NEW: Method to update existing <details> from config panel
    updateObjElement(wrapper, existingDetails)
    {
        const detailerHead = wrapper.querySelector("[data-element-section='head']");
        const detailerBody = wrapper.querySelector("[data-element-section='body']");

        if (!detailerHead?.value.trim() || !detailerBody || !existingDetails) return;

        const summaryText = detailerHead.value.trim();
        const contentText = this.editor.sanitizeText(detailerBody.value.trim());

        // Update existing elements
        const summary = existingDetails.querySelector('summary');
        if (summary) summary.textContent = summaryText;

        const content = existingDetails.querySelector('.detailContent');
        if (content) content.textContent = contentText;

        // Close panel and cleanup
        this.editor.deselectAllConfigs();
        this.editor.configPanel.style.display = "none";
    }

    // Your existing showConfigPanel (for new creation, if needed)
    showConfigPanel(wrapper, panelSelector) {
        if (!this.editor.configPanel) this.editor = this.editor.updateEditor(wrapper);

        this.editor.configPanel.innerHTML = '';
        this.editor.configPanel.appendChild(this.initialObjPanel(wrapper));
        this.editor.configPanel.style.display = "block";
    }

    initialObjPanel() {
        this.editor.saveSelection(); // Your change – good
        const id = this.editor.container.dataset.pseudoId;

        const bodyWrapper = document.createElement("div");
        bodyWrapper.className = "details-controls";
        bodyWrapper.dataset.editorElement = "detailed";

        const summaryInput = document.createElement("input");
        summaryInput.id = `editDetailer_head_${id}`;
        summaryInput.type = "text";
        summaryInput.value = this.editor.savedRange?.toString() || "";
        summaryInput.dataset.elementSection = "head";
        summaryInput.placeholder = "Summary text (title of the collapsible section)";

        const contentTextarea = document.createElement("textarea");
        contentTextarea.id = `editDetailer_body_${id}`;
        contentTextarea.placeholder = "Content (will appear when expanded)";
        contentTextarea.dataset.elementSection = "body";
        contentTextarea.rows = 5;

        const insertBtn = document.createElement("button");
        insertBtn.className = "btnPanel oPanel";
        insertBtn.textContent = "Insert Details";
        insertBtn.addEventListener("click", () => this.createObjElement(bodyWrapper));

        const footWrapper = document.createElement("div");
        footWrapper.appendChild(insertBtn);

        return this.editor.panelWrapper({
            head: this.title,
            body: bodyWrapper.appendChild(summaryInput) && bodyWrapper.appendChild(contentTextarea) && bodyWrapper,
            foot: footWrapper
        });
    }

    createObjElement(wrapper) {
        const detailerHead = wrapper.querySelector("[data-element-section='head']");
        const detailerBody = wrapper.querySelector("[data-element-section='body']");
        if (!detailerHead || !detailerBody) return;

        const summaryText = detailerHead.value.trim();
        const contentText = this.editor.sanitizeText(detailerBody.value.trim());
        if (!summaryText) return;

        const newDetails = document.createElement("details");
        newDetails.dataset.editProperty = this.editor.propertyID;
        newDetails.dataset.editorElement = "detail";
        newDetails.dataset.editorProperty = this.editor.propertyID;
        newDetails.dataset.layer = "inline";
        newDetails.style.position = "relative";
        newDetails.style.display = "inline-block";

        newDetails.contentEditable = "false"; // NEW: Non-editable in edit mode

        const summary = document.createElement("summary");
        summary.textContent = summaryText;
        summary.contentEditable = "false"; // NEW: Prevent direct editing

        const content = document.createElement("div");
        content.className = "detailContent";
        content.textContent = contentText;
        content.contentEditable = "false"; // NEW: Prevent direct editing (change to "true" if you want nested editing later)

        newDetails.appendChild(summary);
        newDetails.appendChild(content);

        // ── INSERT AT CURSOR POSITION ──
        this.editor.restoreSelection();
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(newDetails);

            const newRange = document.createRange();
            newRange.setStartAfter(newDetails);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
        } else {
            this.editor.container.querySelector(".editor").appendChild(newDetails);
        }

        // Attach configurable with dblclick for edit
        if (summary) {
            this.editor.makeElementConfigurable(summary, null, (summaryEl) => {
                this.showEditPanel(summaryEl.closest('details'));
            });
        }

        this.editor.deselectAllConfigs();
    }

    // Your other methods (editorHandler, requestToRemoveAllSelection, etc.)
    
    
	requestToRemoveAllSelection()
	{}
}
*/