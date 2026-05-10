/**
 * TableHandler class manages table-related functionality in a rich text editor.
 * It handles table creation, resizing, dragging, and configuration, including
 * row and column operations and styling.
 */
class TableHandler 
{
  	/**
   	* What it does:
   	*   - Initializes the TableHandler with the editor instance and sets up the config panel.
   	* How does it do it:
   	*   - Assigns the editor instance to the class, retrieves or creates a config panel element,
   	*     and initializes selectedTable to null, selectedCells as an array, and selectionTextarea to null.
   	* Where is it called from:
   	*   - Instantiated in Editor class constructor: `this.tableHandler = new TableHandler(this);`.
   	*/
  	constructor(editor) 
	{
	    this.title = "Table";
		this.editor = editor;
        this.tableCounter = 0;
        this.elementCounter = 0;
        this.selectedTable = null;
        this.selectedElement = null;
		this.selectedCells = [];
		this.selectionTextarea = null;
  	}




  	/**
   	* What it does:
   	*   - Initializes existing tables in the editor by making them resizable, draggable, configurable, and cells selectable.
   	* How does it do it:
   	*   - Queries all `.table-wrapper` elements in the editor container and applies
   	*     `makeTableResizable`, `makeTableDraggable`, `makeConfigurable`, `makeCellsSelectable`, and updates cell data attributes for each valid table.
   	* Where is it called from:
   	*   - Called from `Editor.initializeExistingElements()` during editor setup.
   	*/
  	initializeExisting() 
	{
	    this.tableCounter   = 0;
        this.elementCounter = 0;
    	this.editor.container.querySelectorAll('.table-wrapper').forEach(wrapper => 
		{
		    const table = wrapper.querySelector('table');
     	    if(this.editor.modeStatus!=="edit")
    	    {   		    
    		    wrapper.classList.remove("attachmentEditMode");
    		    wrapper.classList.remove("positionEditMode");

    		    wrapper.style.removeProperty("position");
    		    
    		    wrapper.querySelector(".drag-handle")?.remove();
    		    wrapper.querySelector("[data-column-aligner]")?.remove();
    		    		    
          		//const table = wrapper.querySelector('table');
          		if (table) 
    			{
    			    table.querySelectorAll(".resize-handle").forEach((td)=>
    			    {   
    			        td.classList.remove("resize-handle");
    			        td.classList.remove("table-resize");
    			    });
    			    
    			    table.querySelectorAll("[data-action-status='editMode']").forEach((td)=>
    			    {   td.dataset.actionStatus = "displayMode"; });
          		}
            }
            /*
            else
            {
                wrapper.querySelector(".drag-handle")?.remove();
                
                this.editor.makeElementDraggable(wrapper);          
                this.editor.makeElementConfigurable(wrapper, "", this.showConfigPanel.bind(this));
  		        this.makeTableResizable(table);	
  		        this.makeCellsSelectable(table);
            }
            */
            else {
    wrapper.querySelector(".drag-handle")?.remove();
    
    this.editor.makeElementDraggable(wrapper);          
    this.editor.makeElementConfigurable(wrapper, "", this.showConfigPanel.bind(this));
    this.makeTableResizable(table);	
    this.makeCellsSelectable(table);

    // NEW: start with aligner hidden (table not selected yet)
    this.setAlignerVisible(wrapper, false);
}
    		wrapper.classList.remove("selected");
    		
            this.tableCounter++;
            this.elementCounter++;
    	});
  	}



  	/**
   	* What it does:
   	*   - Displays a configuration panel for the selected table to modify its properties.
   	* How does it do it:
   	*   - Clears the config panel, creates input fields for ID (table ID), border color, background color,
   	*     row/column selection (with multi-select), comments textarea, and structural buttons. Dynamically updates options based on selection
   	*     type (table, row, or column) and adds event listeners for applying changes or modifying structure.
   	* Where is it called from:
   	*   - Triggered by `makeConfigurable` via a dblclick event on a table wrapper.
   	*/
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
		const bodyWrapper = document.createElement("div");


      	const rowLabel = document.createElement("label");
     	rowLabel.textContent = "Select Row";

      	const rowInput = document.createElement("input");
     	rowInput.type = "number";
      	rowInput.placeholder = "Rows";
      	rowInput.min = "1";
      	rowInput.value = "3"; 
		rowInput.classList = "createRowTable";
      

      	const colLabel = document.createElement("label");
     	colLabel.textContent = "Select Column";

      	const colInput = document.createElement("input");
      	colInput.type = "number";
      	colInput.placeholder = "Cols";
      	colInput.min = "1";
      	colInput.value = "3";
		colInput.classList = "createColTable";
      

      	const commLabel = document.createElement("label");
     	commLabel.textContent = "Select Column";

      	const comment = document.createElement("textarea");

		bodyWrapper.appendChild(rowLabel);
		bodyWrapper.appendChild(rowInput);
		bodyWrapper.appendChild(colLabel);
		bodyWrapper.appendChild(colInput);

		bodyWrapper.appendChild(commLabel);
		bodyWrapper.appendChild(comment);

        


        const footWrapper = document.createElement("div");
      	const insertBtn = document.createElement("button");
      	insertBtn.className = "btnPanel oPanel";
      	insertBtn.textContent = "Create";
      	insertBtn.addEventListener("click", (e) =>
      	{
      	    this.createObjElement(bodyWrapper);
      	});
      	
      	footWrapper.appendChild(insertBtn);

        

        
		return this.editor.panelWrapper({head:this.title, body:bodyWrapper, foot:footWrapper});
   	}
   	

    updateObjPanel(wrapper) 
    {
        // Validate inputs
        if (!wrapper || !wrapper.dataset.tableId){   return document.createElement("div");   }
        
        this.selectedElement = wrapper;
        this.selectedTable = wrapper;
        
        
        const newWrapper = document.createElement("div");
        const bodyWrapper = document.createElement("div");
        const footWrapper = document.createElement("div");
        
        const table = document.getElementById(wrapper.dataset.tableId);
        if (!table) 
        {
            console.error("Error: Table not found for ID", wrapper.dataset.tableId);
            return newWrapper;
        }
    
        // Ensure table has a visible border
        table.style.border = table.style.border || "1px solid";
    
        // ID Input
        const idLabel = document.createElement("label");
        idLabel.textContent = "ID:";
        const idInput = document.createElement("input");
        idInput.type = "text";
        idInput.value = table.id || '';
    
        // Border Color Input
        const borderColorLabel = document.createElement("label");
        borderColorLabel.textContent = "Border Color:";
        borderColorLabel.setAttribute("for", "borderColorInput");
        const borderColorInput = document.createElement("input");
        borderColorInput.type = "color";
        borderColorInput.id = "borderColorInput";
        // Override CSS to ensure visibility and clickability
        borderColorInput.style.display = "block";
        borderColorInput.style.width = "50px";
        borderColorInput.style.height = "30px";
        borderColorInput.style.pointerEvents = "auto";
        borderColorInput.style.zIndex = "1003";
        // Set initial color
        //const computedBorderColor = getComputedStyle(table).borderColor;
        borderColorInput.value = this.editor.rgbToHex(table.style.borderColor || "#000000");
        console.log("Initial border color:", borderColorInput.value);
        // Update table border color on selection
        borderColorInput.addEventListener("change", (e) => 
        {
            console.log("Border color selected:", borderColorInput.value);
            table.style.borderColor = borderColorInput.value;
        });
        borderColorInput.addEventListener("click", (e) => 
        {
            console.log("Border color input clicked", e.target);
        });
    
        // Background Color Input
        const bgColorLabel = document.createElement("label");
        bgColorLabel.textContent = "Table Background Color:";
        const bgColorInput = document.createElement("input");
        bgColorInput.type = "color";
        bgColorInput.style.display = "block";
        bgColorInput.style.width = "50px";
        bgColorInput.style.height = "30px";
        bgColorInput.style.pointerEvents = "auto";
        bgColorInput.style.zIndex = "1003";
        //const computedBgColor = getComputedStyle(table).backgroundColor;
        bgColorInput.value = this.editor.rgbToHex(table.style.backgroundColor || "#FFFFFF");
        bgColorInput.addEventListener("change", () => 
        {
            console.log("Background color selected:", bgColorInput.value);
            table.style.backgroundColor = bgColorInput.value;
        });
    
        // Type Select
        const typeLabel = document.createElement("label");
        typeLabel.textContent = "Configure:";
        const typeSelect = document.createElement("select");
        ["table", "row", "column"].forEach(t => {
            const opt = document.createElement("option");
            opt.value = t;
            opt.textContent = t.charAt(0).toUpperCase() + t.slice(1);
            typeSelect.appendChild(opt);
        });
    
        // Index Select
        const indexLabel = document.createElement("label");
        indexLabel.textContent = "Index:";
        const indexSelect = document.createElement("select");
    
        // Row/Column Background Color
        const rowColBgLabel = document.createElement("label");
        rowColBgLabel.textContent = "Background Color:";
        const rowColBgInput = document.createElement("input");
        rowColBgInput.type = "color";
        rowColBgInput.value = "#FFFFFF";
        rowColBgInput.addEventListener("change", () => 
        {
            const selectedIndices = this.getSelectedIndices();
            if (typeSelect.value === "row") 
            {
                selectedIndices.forEach(index => 
                {
                    const row = table.rows[index];
                    row.style.backgroundColor = rowColBgInput.value;
                });
            } 
            else if (typeSelect.value === "column") 
            {
                selectedIndices.forEach(index => 
                {
                    for (let r = 0; r < table.rows.length; r++) 
                    {
                        const cell = table.rows[r].cells[index];
                        cell.style.backgroundColor = rowColBgInput.value;
                    }
                });
            }
        });
    
        // Size Input
        const sizeLabel = document.createElement("label");
        sizeLabel.textContent = "Size (px):";
        const sizeInput = document.createElement("input");
        sizeInput.type = "number";
        sizeInput.min = "10";
        sizeInput.value = "50";
    
        // Comments
        const commentLabel = document.createElement("label");
        commentLabel.textContent = "Comments:";
        const commentInput = document.createElement("textarea");
        commentInput.rows = 3;
        commentInput.placeholder = "Enter table comments";
    
    
    
        // Structure Buttons
        const insertAboveLeft = document.createElement("button");
        insertAboveLeft.className = "btnPanel";
        insertAboveLeft.textContent = "Insert Above/Left";
        insertAboveLeft.addEventListener("click", () => 
        {
            const selectedIndices = this.getSelectedIndices();
            if (selectedIndices.length === 0) return;
            if (typeSelect.value === "row") 
            {
                this.insertRows('above', selectedIndices);
            } 
            else if (typeSelect.value === "column") 
            {
                this.insertColumns('left', selectedIndices);
            }
        });
        const insertBelowRight = document.createElement("button");
        insertBelowRight.className = "btnPanel";
        insertBelowRight.textContent = "Insert Below/Right";
        insertBelowRight.addEventListener("click", () => 
        {
            const selectedIndices = this.getSelectedIndices();
            if (selectedIndices.length === 0) return;
            if (typeSelect.value === "row") 
            {
                this.insertRows('below', selectedIndices);
            } 
            else if (typeSelect.value === "column") 
            {
                this.insertColumns('right', selectedIndices);
            }
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btnPanel";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => 
        {
            const selectedIndices = this.getSelectedIndices();
            if (selectedIndices.length === 0) return;
            if (typeSelect.value === "row") 
            {
                this.deleteRows(selectedIndices);
            }
            else if (typeSelect.value === "column") 
            {
                this.deleteColumns(selectedIndices);
            }
        });
        const selectCellsBtn = document.createElement("button");
        selectCellsBtn.className = "btnPanel";
        selectCellsBtn.textContent = "Select Cells";
        selectCellsBtn.addEventListener("click", () => 
        {
            if (typeSelect.value === "row") 
            {
                this.selectRowCells();
            } 
            else if (typeSelect.value === "column") 
            {
                this.selectColumnCells();
            }
        });
        const copySelectedBtn = document.createElement("button");
        copySelectedBtn.className = "btnPanel";
        copySelectedBtn.textContent = "Copy Selected Cells";
        copySelectedBtn.addEventListener("click", () => 
        {
            this.copySelectedCells();
        });
        const addToVariableBtn = document.createElement("button");
        addToVariableBtn.className = "btnPanel";
        addToVariableBtn.textContent = "Add Selected to Variable";
        addToVariableBtn.addEventListener("click", () => 
        {
            this.addSelectedToVariable();
        });
        
        

        
        const structureButtons = document.createElement("div");
        structureButtons.appendChild(insertAboveLeft);
        structureButtons.appendChild(insertBelowRight);
        structureButtons.appendChild(deleteBtn);
        structureButtons.appendChild(selectCellsBtn);
        structureButtons.appendChild(copySelectedBtn);
        structureButtons.appendChild(addToVariableBtn);
        //structureButtons.appendChild(cancelBtn);
    
    
    const mergeBtn = document.createElement("button");
mergeBtn.className = "btnPanel";
mergeBtn.textContent = "Merge Selected Cells";
mergeBtn.addEventListener("click", () => this.mergeSelectedCells());

const unmergeBtn = document.createElement("button");
unmergeBtn.className = "btnPanel";
unmergeBtn.textContent = "Unmerge Cell";
unmergeBtn.addEventListener("click", () => this.unmergeSelectedCell());

structureButtons.appendChild(mergeBtn);
structureButtons.appendChild(unmergeBtn);
    
    
        // Update Options
        const updateOptions = () => 
        {
            indexLabel.style.display = 'block';
            indexSelect.innerHTML = '';
            indexSelect.multiple = false;
            indexSelect.style.display = 'block';
            sizeLabel.style.display = 'block';
            sizeInput.style.display = 'block';
            rowColBgLabel.style.display = 'block';
            rowColBgInput.style.display = 'block';
            structureButtons.style.display = 'block';
            commentLabel.style.display = 'none';
            commentInput.style.display = 'none';
            if (typeSelect.value === "table")
            {
                indexLabel.style.display = 'none';
                indexSelect.style.display = 'none';
                sizeLabel.style.display = 'none';
                sizeInput.style.display = 'none';
                rowColBgLabel.style.display = 'none';
                rowColBgInput.style.display = 'none';
                structureButtons.style.display = 'none';
                commentLabel.style.display = 'block';
                commentInput.style.display = 'block';
            } 
            else if (typeSelect.value === "row") 
            {
                indexSelect.multiple = true;
                sizeLabel.textContent = "Height (px):";
                rowColBgLabel.textContent = "Row Background Color:";
                insertAboveLeft.textContent = "Insert Above Selected";
                insertBelowRight.textContent = "Insert Below Selected";
                deleteBtn.textContent = "Delete Selected";
                selectCellsBtn.textContent = "Select Row Cells";
                for (let i = 0; i < table.rows.length; i++) 
                {
                    const opt = document.createElement("option");
                    opt.value = i;
                    opt.textContent = `Row ${i + 1}`;
                    indexSelect.appendChild(opt);
                }
            }
            else 
            {
                indexSelect.multiple = true;
                sizeLabel.textContent = "Width (px):";
                rowColBgLabel.textContent = "Column Background Color:";
                insertAboveLeft.textContent = "Insert Left Selected";
                insertBelowRight.textContent = "Insert Right Selected";
                deleteBtn.textContent = "Delete Selected";
                selectCellsBtn.textContent = "Select Column Cells";
                for (let i = 0; i < table.rows[0].cells.length; i++) 
                {
                    const opt = document.createElement("option");
                    opt.value = i;
                    opt.textContent = `Column ${i + 1}`;
                    indexSelect.appendChild(opt);
                }
            }
        };
        typeSelect.addEventListener("change", updateOptions);
        updateOptions();
    
        // Apply and Remove Buttons
        const applyButton = document.createElement("button");
        applyButton.className = "btnPanel oPanel";
        applyButton.textContent = "Update";
        applyButton.addEventListener("click", (e) => 
        {
            this.updateObjElement(e.target.parentElement);
            //this.createObjElement(e.target.parentElement);            
        });
        
        const removeButton = document.createElement("button");
        removeButton.className = "btnPanel oPanel";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", (e) => 
        {
            const objToRemove = e.target;
            this.editor.removeElement(objToRemove);
        });
            
            
        // Append elements to newWrapper
        bodyWrapper.appendChild(idLabel);
        bodyWrapper.appendChild(idInput);
        bodyWrapper.appendChild(borderColorLabel);
        bodyWrapper.appendChild(borderColorInput);
        bodyWrapper.appendChild(bgColorLabel);
        bodyWrapper.appendChild(bgColorInput);
        bodyWrapper.appendChild(typeLabel);
        bodyWrapper.appendChild(typeSelect);
        bodyWrapper.appendChild(indexLabel);
        bodyWrapper.appendChild(indexSelect);
        bodyWrapper.appendChild(rowColBgLabel);
        bodyWrapper.appendChild(rowColBgInput);
        bodyWrapper.appendChild(sizeLabel);
        bodyWrapper.appendChild(sizeInput);
        bodyWrapper.appendChild(commentLabel);
        bodyWrapper.appendChild(commentInput);
        
        
        footWrapper.appendChild(structureButtons);
        footWrapper.appendChild(applyButton);
        footWrapper.appendChild(removeButton);
        
        
        // Store inputs for updateObjElement
        this.idInput = idInput;
        this.borderColorInput = borderColorInput;
        this.bgColorInput = bgColorInput;
        this.typeSelect = typeSelect;
        this.indexSelect = indexSelect;
        this.rowColBgInput = rowColBgInput;
        this.sizeInput = sizeInput;
        this.commentInput = commentInput;
    
        // Create hidden textarea for selection handling
        this.selectionTextarea = document.createElement('textarea');
        this.selectionTextarea.id = `selection-${table.id}`;
        this.selectionTextarea.style.display = 'none';
        newWrapper.appendChild(this.selectionTextarea);

        //return newWrapper;
        return this.editor.panelWrapper({head:this.title, body:bodyWrapper, foot:footWrapper});
    }


    createObjElement(panel)
    {
        if(!panel){return;}
        
		const rows = panel.querySelector(".createRowTable").value;
  		const cols = panel.querySelector(".createColTable").value;

		this.editor.noSelection();


  		const element = document.createElement('table');
  		element.id = `table_${this.editor.propertyID}_${++this.elementCounter}`; // Add unique table ID
  		element.border = '1';
		element.dataset.editorElement = "table";  		
  		element.style.borderCollapse = 'collapse';

  		const wrapper = document.createElement('div');
  		wrapper.className = 'table-wrapper';
  		wrapper.id = `wrapper_${element.id}`;
  		wrapper.style.left = '50px';
  		wrapper.style.top = '50px';
  		wrapper.dataset.tableId = element.id;
		wrapper.dataset.wrapElement = "table";  
		wrapper.dataset.tableCounter = this.elementCounter;
		wrapper.dataset.rteContainerId = `${this.editor.propertyID}`;
  		wrapper.contentEditable = 'false'; // Wrapper is not editable
  		
  		
    	const tr = element.insertRow();
    	tr.dataset.columnAligner = true;
    	tr.style.height = "10px";
    	
    	//tr.addEventListener("dbclick",()=>{    this.editor.makeElementConfigurable(wrapper, null, this.showConfigPanel.bind(this));  }); 
    	//tr.addEventListener("dbclick",()=>{    this.showConfigPanel.bind(this); }); 
    	
    	for (let c = 0; c < cols; c++) 
		{	
		    const td = tr.insertCell();  
		    td.setAttribute('data-cell-align-column', c); // Add column index attribute  
		}
        //tr.style.display = "none";
        
  		for (let r = 0; r < rows; r++) 
		{
        	const tr = element.insertRow();
        	for (let c = 0; c < cols; c++) 
			{
      			const td = tr.insertCell();
      			td.style.padding   = '5px';
                //td.style.minWidth  = '15px';        // or '10px' if you want a floor
                td.style.width     = '60px';     // starting width (whatever you like)
      			td.setAttribute('contenteditable', 'true'); // Explicitly set
      			td.setAttribute('tabindex', '0'); // Make cells focusable
      			td.setAttribute('data-cell-row', r); // Add row index attribute
      			td.setAttribute('data-cell-column', c); // Add column index attribute   
      			td.setAttribute('data-action-status', "editMode"); // Add column index attribute 
			}
      	}

  		const elementComments = document.createElement("div");
  		elementComments.id = `comments_${element.id}`;
  		wrapper.appendChild(element);
  		wrapper.appendChild(elementComments);


  		this.editor.makeElementDraggable(wrapper);
  		//this.editor.makeElementConfigurable(wrapper, this.makeCellsSelectable.bind(this), this.showConfigPanel.bind(this));
  		
  		this.makeTableResizable(element);	
  		this.makeCellsSelectable(element);

        //this.editor.container.querySelector(".editor").appendChild(wrapper);
        this.editor.insertIntoEditor(wrapper);
        
        this.editor.deselectAllConfigs();
	}


    updateObjElement(panel)
	{
		if (!this.selectedTable) return;
		//const wrapper = this.selectedTable;
		
		const element = this.editor.selectedElement;
		const table = element.querySelector('table');
		
		table.id = this.idInput.value.trim() || `table_${Date.now()}`;
		element.dataset.tableId = table.id;
		
		table.style.borderColor = this.borderColorInput.value;
		const type = this.typeSelect.value;
		
    	if (type === "table") 
		{
      		table.style.backgroundColor = this.bgColorInput.value;
      		const comments = this.commentInput.value.trim();
      		if (comments) 
			{
    			const commentsDiv = element.querySelector(`#comments_${table.id}`);
    			commentsDiv.innerHTML += this.editor.sanitizeText(comments) + '<br>';
      		}
    	} 
		else 
		{
      		const selectedIndices = this.getSelectedIndices();
      		const bgColor = this.rowColBgInput.value;
      		const size = parseInt(this.sizeInput.value);
      		selectedIndices.forEach(index => 
			{
        		if (type === "row") 
				{
      				const row = table.rows[index];
      				row.style.backgroundColor = bgColor;
      				row.style.height = `${size}px`;
    			} 
				else if (type === "column") 
				{
          			for (let r = 0; r < table.rows.length; r++) 
					{
    					const cell = table.rows[r].cells[index];
    					cell.style.backgroundColor = bgColor;
    					cell.style.width = `${size}px`;
      				}
    			}
      		});
    	}
    	
    	let wrapper = this.editor.container.querySelector(`#${table.id}`).parentElement;
    	
    	this.editor.makeElementDraggable(wrapper);
  		this.makeTableResizable(table);	
  		this.makeCellsSelectable(table);
    	this.editor.container.querySelector(`#${table.id}`).replaceWith(table);        
        this.editor.deselectAllConfigs();
        
        
    	console.log("Element Replaced: table");

  	}



	requestToRemoveAllSelection()
	{
        this.editor.container.querySelectorAll(".table-wrapper").forEach(wrapper => 
        {
            wrapper.classList.remove("selected");

            const table = wrapper.querySelector("table");
            if (table) 
            {
                table.querySelectorAll("td").forEach(cell => 
                {
                    cell.classList.remove("selectedTableCells");
                });
                // hide aligner + handles for this table
                this.setAlignerVisible(wrapper, false);
            }
        });

      
		this.selectedCells = [];      
		this.selectionTextarea = null;
	}



    /**
   * What it does:
   *   - Inserts new rows above or below the selected row indices.
   * How does it do it:
   *   - Sorts the selected indices, inserts a new row above or below each, adjusting for index shifts with an offset.
   *     Refreshes resize handles, updates cell data attributes, clears selections, and updates the config panel.
   * Where is it called from:
   *   - Triggered by "Insert Above Selected" or "Insert Below Selected" buttons in `showConfigPanel`.
   */
    insertRows(position, selectedIndices) 
    {
        if (!this.editor.selectedElement) return;
        
        const table = this.editor.selectedElement.querySelector('table');
        selectedIndices = selectedIndices.sort((a, b) => a - b);
        let offset = 0;
        selectedIndices.forEach(index => 
        {
            const insertIndex = position === 'above' ? index + offset : index + 1 + offset;
            const newRow = table.insertRow(insertIndex);
            const numCols = table.rows[0].cells.length;
            for (let c = 0; c < numCols; c++) 
            {
                const td = newRow.insertCell();
                td.style.padding = '5px';
                td.style.minWidth = '50px';
                td.setAttribute('contenteditable', 'true');
                td.setAttribute('tabindex', '0');
                td.innerHTML = 'Cell';
            }
            
            offset++;
        });
        
        table.querySelectorAll('.resize-handle.table-resize').forEach(h => h.remove());
        
        this.makeTableResizable(table);
        this.updateCellDataAttributes(table);
        
        // Clear selections
        this.selectedCells = [];
        table.querySelectorAll('.selectedTableCells').forEach(cell => cell.classList.remove('selectedTableCells'));
        this.updateOptions();
    }


    /**
   * What it does:
   *   - Updates the index selection dropdown in the config panel after table structure changes.
   * How does it do it:
   *   - Clears the indexSelect dropdown, repopulates it with current row or column indices
   *     based on the selected type, sets multiple=true for row/column, and ensures the selected index remains valid.
   * Where is it called from:
   *   - Called internally by `insertRow`, `deleteRow`, `insertColumn`, and `deleteColumn`
   *     to refresh the config panel after structural changes.
   */
    updateOptions() 
    {
        const type = this.typeSelect.value;
        this.indexSelect.innerHTML = '';
        this.indexSelect.multiple = false;
        if (type === "row") {
          this.indexSelect.multiple = true;
          for (let i = 0; i < this.editor.selectedElement.querySelector('table').rows.length; i++) {
            const opt = document.createElement("option");
            opt.value = i;
            opt.textContent = `Row ${i + 1}`;
            this.indexSelect.appendChild(opt);
          }
        } else if (type === "column") {
          this.indexSelect.multiple = true;
          for (let i = 0; i < this.selectedElement.querySelector('table').rows[0].cells.length; i++) {
            const opt = document.createElement("option");
            opt.value = i;
            opt.textContent = `Column ${i + 1}`;
            this.indexSelect.appendChild(opt);
          }
        }
        // Ensure selected index is valid
        if (this.indexSelect.options.length > 0) {
          this.indexSelect.value = Math.min(parseInt(this.indexSelect.value) || 0, this.indexSelect.options.length - 1);
        }
  }



    /**
   * What it does:
   *   - Deletes the selected rows from the table.
   * How does it do it:
   *   - Sorts the selected indices descending, deletes each row, refreshes resize handles,
   *     updates cell data attributes, clears selections, and updates the config panel.
   * Where is it called from:
   *   - Triggered by "Delete Selected" button in `showConfigPanel` for rows.
   */
    deleteRows(selectedIndices) 
    {
        if (!this.editor.selectedElement) return;
        
        const table = this.editor.selectedElement.querySelector('table');
        selectedIndices = selectedIndices.sort((a, b) => b - a);
        selectedIndices.forEach(index => 
        {
            if (table.rows.length > 1) 
            {
                table.deleteRow(index);
            }
        });
        
        table.querySelectorAll('.resize-handle.table-resize').forEach(h => h.remove());
        this.makeTableResizable(table);
        this.updateCellDataAttributes(table);
        
        // Clear selections
        this.selectedCells = [];
        table.querySelectorAll('.selectedTableCells').forEach(cell => cell.classList.remove('selectedTableCells'));
        this.updateOptions();
    }



    /**
   * What it does:
   *   - Inserts new columns left or right of the selected column indices.
   * How does it do it:
   *   - Sorts the selected indices, inserts a new cell left or right of each in every row, adjusting for index shifts with an offset.
   *     Refreshes resize handles, updates cell data attributes, clears selections, and updates the config panel.
   * Where is it called from:
   *   - Triggered by "Insert Left Selected" or "Insert Right Selected" buttons in `showConfigPanel`.
   */
    insertColumns(position, selectedIndices) 
    {
        if (!this.editor.selectedElement) return;
        
        const table = this.editor.selectedElement.querySelector('table');
        selectedIndices = selectedIndices.sort((a, b) => a - b);
        let offset = 0;
        selectedIndices.forEach(index => 
        {
            const insertIndex = position === 'left' ? index + offset : index + 1 + offset;
            for (let r = 0; r < table.rows.length; r++) 
            {
                const td = table.rows[r].insertCell(insertIndex);
                td.style.padding = '5px';
                td.style.minWidth = '50px';
                td.setAttribute('contenteditable', 'true');
                td.setAttribute('tabindex', '0');
                td.innerHTML = 'Cell';
            }
            offset++;
        });
        
        table.querySelectorAll('.resize-handle.table-resize').forEach(h => h.remove());
        this.editor.makeElementResizable(table);
        this.updateCellDataAttributes(table);
        
        // Clear selections
        this.selectedCells = [];
        table.querySelectorAll('.selectedTableCells').forEach(cell => cell.classList.remove('selectedTableCells'));
        this.updateOptions();
    }



  /**
   * What it does:
   *   - Deletes the selected columns from the table.
   * How does it do it:
   *   - Sorts the selected indices descending, deletes each column from every row, refreshes resize handles,
   *     updates cell data attributes, clears selections, and updates the config panel.
   * Where is it called from:
   *   - Triggered by "Delete Selected" button in `showConfigPanel` for columns.
   */
    deleteColumns(selectedIndices) 
    {
        if (!this.editor.selectedElement) return;
        
        const table = this.editor.selectedElement.querySelector('table');
        selectedIndices = selectedIndices.sort((a, b) => b - a);
        selectedIndices.forEach(index => 
        {
            if (table.rows[0].cells.length > 1) 
            {
                for (let r = 0; r < table.rows.length; r++) 
                {
                    table.rows[r].deleteCell(index);
                }
            }
        });
        
        table.querySelectorAll('.resize-handle.table-resize').forEach(h => h.remove());
        this.editor.makeElementResizable(table);
        this.updateCellDataAttributes(table);
        // Clear selections
        this.selectedCells = [];
        table.querySelectorAll('.selectedTableCells').forEach(cell => cell.classList.remove('selectedTableCells'));
        this.updateOptions();
    }



  /**
   * What it does:
   *   - Selects all cells in the selected rows for visual indication and copying, and prepares them for variable creation.
   * How does it do it:
   *   - Gets selected row indices, queries cells in each selected row, applies the selectedTableCells class,
   *     stores unique cell identifiers in this.selectedCells, and populates the hidden textarea
   *     with cell contents for copying.
   * Where is it called from:
   *   - Triggered by the "Select Cells" button in `showConfigPanel` for rows.
   */
    selectRowCells() 
    {
        if (!this.editor.selectedElement || !this.selectionTextarea) return;
        const table = this.editor.selectedElement.querySelector('table');
        const selectedIndices = this.getSelectedIndices();
        if (selectedIndices.length === 0) return;
        
        selectedIndices.forEach(index => 
        {
          const cells = table.querySelectorAll(`td[data-cell-row="${index}"]`);
          cells.forEach(cell => 
          {
            const key = `row_${cell.dataset.cellRow}-column_${cell.dataset.cellColumn}`;
            if (!this.selectedCells.includes(key)) 
            {
              this.selectedCells.push(key);
            }
            cell.classList.add("selectedTableCells");
          });
        });
        this.updateSelectionTextarea(table);
    }



  /**
   * What it does:
   *   - Selects all cells in the selected columns for visual indication and copying, and prepares them for variable creation.
   * How does it do it:
   *   - Gets selected column indices, queries cells in each selected column, applies the selectedTableCells class,
   *     stores unique cell identifiers in this.selectedCells, and populates the hidden textarea
   *     with cell contents for copying.
   * Where is it called from:
   *   - Triggered by the "Select Cells" button in `showConfigPanel` for columns.
   */
  selectColumnCells() 
  {
    if (!this.editor.selectedElement || !this.selectionTextarea) return;
    const table = this.editor.selectedElement.querySelector('table');
    const selectedIndices = this.getSelectedIndices();
    if (selectedIndices.length === 0) return;
    selectedIndices.forEach(index => {
      const cells = table.querySelectorAll(`td[data-cell-column="${index}"]`);
      cells.forEach(cell => {
        const key = `row_${cell.dataset.cellRow}-column_${cell.dataset.cellColumn}`;
        if (!this.selectedCells.includes(key)) {
          this.selectedCells.push(key);
        }
        cell.classList.add("selectedTableCells");
      });
    });
    this.updateSelectionTextarea(table);
  }




  /**
   * What it does:
   *   - Copies the text content of selected cells to the clipboard.
   * How does it do it:
   *   - Uses the hidden textarea's selected content to trigger a copy operation.
   * Where is it called from:
   *   - Triggered by the "Copy Selected Cells" button in `showConfigPanel`.
   */
  copySelectedCells() 
  {
    if (!this.selectionTextarea || !this.selectionTextarea.value) return;
    this.selectionTextarea.select();
    try {
      document.execCommand('copy');
      alert('Selected cells copied to clipboard.');
    } catch (err) {
      console.error('Failed to copy cells:', err);
      alert('Failed to copy cells.');
    }
  }



  	/**
   	* What it does:
   	*   - Updates the data-cell-row and data-cell-column attributes for all cells in the table.
   	* How does it do it:
   	*   - Iterates over each row and cell, setting the attributes based on current row and cell indices.
   	* Where is it called from:
   	*   - Called after structural changes in `insertRow`, `deleteRow`, `insertColumn`, `deleteColumn`,
   	*     and during `initializeExisting` to ensure accurate data attributes.
   	*/
    updateCellDataAttributes(table) 
    {
        const rows = Array.from(table.rows);
    
      // If first row is the aligner row, skip it
        const start = rows[0]?.dataset?.columnAligner ? 1 : 0;
    
        let dataR = 0;
        for (let r = start; r < rows.length; r++) 
        {
            const row = rows[r];
            Array.from(row.cells).forEach((cell, c) => 
            {
              cell.setAttribute("data-cell-row", dataR);
              cell.setAttribute("data-cell-column", c);
            });
            dataR++;
        }
    }




  /**
   * What it does:
   *   - Adds the contents of selected cells to a new variable in the VariableHandler.
   * How does it do it:
   *   - Retrieves the selected cell identifiers from this.selectedCells, collects their text content,
   *     and passes them to VariableHandler.addCellsToVariable.
   * Where is it called from:
   *   - Triggered by the "Add Selected to Variable" button in `showConfigPanel`.
   */
    addSelectedToVariable()
    {
        if (!this.editor.selectedElement || !this.editor.variableHandler) 
        {
            alert('No table selected or VariableHandler not available.');
            return;
        }
        const table = this.editor.selectedElement.querySelector('table');
        const cellIds = this.selectedCells;
        if (cellIds.length === 0) 
        {
            alert('No cells selected. Please select cells first.');
            return;
        }
        
        const texts = [];
        cellIds.forEach(k => 
        {
            const [r, c] = k.match(/row_(\d+)-column_(\d+)/).slice(1);
            const cell = table.querySelector(`td[data-cell-row="${r}"][data-cell-column="${c}"]`);
            if (cell) texts.push({ text: cell.textContent.trim(), wrapped: false, sourceId: null });
        });
        
        this.editor.variableHandler.addCellsToVariable(texts);
    }




  /**
   * What it does:
   *   - Updates the selection textarea with the text content of selected cells.
   * How does it do it:
   *   - Iterates over selected cell keys, queries the corresponding cells, collects their text, and joins them with newlines.
   * Where is it called from:
   *   - Called from `selectRowCells`, `selectColumnCells`, and cell click listeners in `makeCellsSelectable`.
   */
  	updateSelectionTextarea(table) 
	{
    	const texts = [];
    	this.selectedCells.forEach(k => 
		{
      			const [r, c] = k.match(/row_(\d+)-column_(\d+)/)?.slice(1);
      			const cell = table.querySelector(`td[data-cell-row="${r}"][data-cell-column="${c}"]`);
      			if (cell) texts.push(cell.textContent.trim());
    		});

		if(this.selectionTextarea)
		{
    			this.selectionTextarea.value = texts.join('\n');
    			this.selectionTextarea.select();
		}
  	}



  	/**
   	* What it does:
   	*   - Retrieves the selected indices from the multi-select index dropdown.
   	* How does it do it:
   	*   - Maps the selected options to their integer values and sorts them ascending.
   	* Where is it called from:
   	*   - Called from insert, delete, and select methods to get multiple selected indices.
   	*/
  	getSelectedIndices() 
	{
    	return Array.from(this.indexSelect.selectedOptions).map(opt => parseInt(opt.value)).sort((a, b) => a - b);
  	}



  	/**
   	* What it does:
   	*   - Makes individual cells selectable by adding click event listeners.
   	* How does it do it:
   	*   - Adds a click listener to each cell to toggle the selected class, add/remove from this.selectedCells,
   	*     and update the selection textarea.
   	* Where is it called from:
   	*   - Called from `insertTable` and `initializeExisting` to enable single cell selection.
   	*/
    makeCellsSelectable(table) 
    {
        if (!table) return;
    
        const wrapper = table.parentElement;
    
        // All tables start deselected → aligner hidden
        this.setAlignerVisible(wrapper, wrapper.classList.contains("selected"));
    
        // Attach ONLY ONCE
        if (!table.dataset.cellSelectInit) {
            table.dataset.cellSelectInit = "1";
    
            table.addEventListener("click", (e) => {
                const td = e.target.closest("td");
    
                // ---------- A) Click on empty table area (no TD) → toggle whole table ----------
                if (!td) {
                    e.stopPropagation();
    
                    const nowSelected = wrapper.classList.toggle("selected");
    
                    // clear cell selection when toggling table
                    this.selectedCells = [];
                    table.querySelectorAll(".selectedTableCells")
                         .forEach(x => x.classList.remove("selectedTableCells"));
                    this.updateSelectionTextarea(table);
    
                    // aligner visibility follows table selection
                    this.setAlignerVisible(wrapper, nowSelected);
    
                    this.selectedTable = nowSelected ? wrapper : null;
                    this.editor.selectedElement = nowSelected ? wrapper : null;
                    return;
                }
    
                // ---------- B) Ignore the aligner row cells ----------
                if (td.hasAttribute("data-cell-align-column")) return;
    
                e.stopPropagation();
    
                const r = td.dataset.cellRow;
                const c = td.dataset.cellColumn;
                if (r == null || c == null) return;
    
                const key = `row_${r}-column_${c}`;
    
                // selecting any cell implies the table is selected
                wrapper.classList.add("selected");
                this.setAlignerVisible(wrapper, true);
    
                // toggle cell selection
                const nowSelected = td.classList.toggle("selectedTableCells");
                if (nowSelected) {
                    if (!this.selectedCells.includes(key)) this.selectedCells.push(key);
                } else {
                    this.selectedCells = this.selectedCells.filter(k => k !== key);
                }
    
                // optional: handles visible only if there are selected cells
                table.querySelectorAll("[data-cell-resize-handler]").forEach(hand => {
                    hand.style.display = this.selectedCells.length ? "block" : "none";
                });
    
                // If we unselected all cells, keep aligner visible as long as table is selected
                if (this.selectedCells.length === 0) {
                    this.setAlignerVisible(wrapper, wrapper.classList.contains("selected"));
                }
    
                this.updateSelectionTextarea(table);
                this.selectedTable = wrapper;
                this.editor.selectedElement = wrapper;
            });
        }
    
        // keep widths/datasets in sync
        this.updateAlignerWidths(table);
    }



  	/**
   	* What it does:
   	*   - Enables column resizing for a table by adding resize handles to cells in the first row.
   	* How does it do it:
   	*   - Iterates through cells in the first row, adds a resize handle to each, and sets up mousedown
   	*     event listeners to adjust cell width based on mouse movement until mouseup.
   	* Where is it called from:
   	*   - Called from `insertTable`, `initializeExisting`, `insertRow`, `deleteRow`, `insertColumn`,
   	*     and `deleteColumn` to ensure resizable columns after table creation or modification.
	**/
    makeTableResizable(table) 
    {
        if (!table) return;
    
        // Remove previous handles to avoid duplicates
        table.querySelectorAll(".resize-handle.table-resize").forEach(h => h.remove());
    
        const cols = table.querySelectorAll("[data-cell-align-column]");
        cols.forEach((cell) => {
            const handle = document.createElement("div");
            handle.className = "resize-handle table-resize";
            handle.dataset.cellResizeHandler = "true";
    
            // the aligner cell is the positioning context
            cell.innerText = "";
            cell.style.padding  = "0";
            cell.style.position = "relative";
    
            // handle on the RIGHT border
            handle.style.position = "absolute";
            handle.style.top      = "0";
            handle.style.bottom   = "0";
            handle.style.right    = "-3px";           // slightly over the border
            handle.style.width    = "6px";
            handle.style.cursor   = "col-resize";
            handle.style.background = "rgba(0,0,0,0.35)";
            handle.style.display  = "block";
    
            cell.appendChild(handle);
    
            handle.addEventListener("mousedown", (e) => {
                e.preventDefault();
                e.stopPropagation();
    
                const startX     = e.pageX;
                const startWidth = cell.getBoundingClientRect().width;
    
                const doResize = (eMove) => {
                    const delta = eMove.pageX - startX;       // < 0 when going left
                    const newW  = Math.max(10, startWidth + delta);
                    cell.style.width = `${newW}px`;
    
                    // push this width to all body cells in that column
                    this.updateAlignerWidths(table);
                };
    
                const stopResize = () => {
                    document.removeEventListener("mousemove", doResize);
                    document.removeEventListener("mouseup", stopResize);
                    this.updateAlignerWidths(table);
                };
    
                document.addEventListener("mousemove", doResize);
                document.addEventListener("mouseup", stopResize);
            });
        });
    
        // initial sync
        this.updateAlignerWidths(table);
    }


    /** Returns actual TD elements from this.selectedCells */
    getSelectedCellElements(table) 
    {
        const out = [];
        for (const k of this.selectedCells) 
        {
            const m = k.match(/row_(\d+)-column_(\d+)/);
            if (!m) continue;
            const r = m[1], c = m[2];
            const td = table.querySelector(`td[data-cell-row="${r}"][data-cell-column="${c}"]`);
            if (td) out.push(td);
        }
        return out;
    }
    
    /** Validates selection is a full rectangle and safe to merge */
    validateRectangularSelection(cells) 
    {
        if (!cells || cells.length < 2) 
        {
            return { ok: false, msg: "Select at least 2 neighboring cells." };
        }
    
      // Reject if any cell already uses spans (keeps logic simple & safe)
        for (const td of cells) 
        {
            const rs = parseInt(td.getAttribute("rowspan") || "1", 10);
            const cs = parseInt(td.getAttribute("colspan") || "1", 10);
            if (rs !== 1 || cs !== 1) 
            {
                return { ok: false, msg: "Merging cells that already have rowspan/colspan isn’t supported in this version." };
            }
        }
    
        const rows = cells.map(td => parseInt(td.dataset.cellRow, 10));
        const cols = cells.map(td => parseInt(td.dataset.cellColumn, 10));
    
        const minR = Math.min(...rows), maxR = Math.max(...rows);
        const minC = Math.min(...cols), maxC = Math.max(...cols);
    
        const expectedCount = (maxR - minR + 1) * (maxC - minC + 1);
        if (cells.length !== expectedCount)
        {
            return { ok: false, msg: "Selection must form a complete rectangle (no gaps)." };
        }
    
        // Ensure every coordinate in the rectangle is selected
        const set = new Set(cells.map(td => `r${td.dataset.cellRow}c${td.dataset.cellColumn}`));
        for (let r = minR; r <= maxR; r++) 
        {
            for (let c = minC; c <= maxC; c++) 
            {
                if (!set.has(`r${r}c${c}`)) 
                {
                    return { ok: false, msg: "Selection must be a solid rectangle of neighboring cells." };
                }
            }
        }
    
        return { ok: true, minR, maxR, minC, maxC };
    }
    
    
    /** Merge currently selected neighboring cells (rectangular block) */
    mergeSelectedCells() 
    {
        if (!this.editor.selectedElement) return;
        const wrapper = this.editor.selectedElement?.classList?.contains("table-wrapper")
                          ? this.editor.selectedElement
                          : this.editor.selectedElement?.closest?.(".table-wrapper");
                        
        const table = wrapper?.querySelector("table");
        if (!table) return;




    
        const cells = this.getSelectedCellElements(table);
        const v = this.validateRectangularSelection(cells);
        if (!v.ok) 
        {
            alert(v.msg);
            return;
        }
    
        const { minR, maxR, minC, maxC } = v;
    
      // master (top-left)
        const master = table.querySelector(`td[data-cell-row="${minR}"][data-cell-column="${minC}"]`);
        if (!master) return;
    
      // Combine text (optional – you can change separator)
        const texts = [];
        for (let r = minR; r <= maxR; r++) 
        {
            for (let c = minC; c <= maxC; c++) 
            {
                const td = table.querySelector(`td[data-cell-row="${r}"][data-cell-column="${c}"]`);
                if (td && td !== master) 
                {
                    const t = td.textContent.trim();
                    if (t) texts.push(t);
                }
            }
        }
        
        const masterText = master.textContent.trim();
        const combined = [masterText, ...texts].filter(Boolean).join(" ");
    
      // Apply spans
        const rowSpan = maxR - minR + 1;
        const colSpan = maxC - minC + 1;
        master.setAttribute("rowspan", String(rowSpan));
        master.setAttribute("colspan", String(colSpan));
        master.textContent = combined; // or keep original if you prefer
    
      // Remove the rest (remove from bottom-right to avoid weirdness)
        for (let r = maxR; r >= minR; r--) 
        {
            for (let c = maxC; c >= minC; c--) 
            {
                const td = table.querySelector(`td[data-cell-row="${r}"][data-cell-column="${c}"]`);
                if (td && td !== master) td.remove();
            }
        }
    
      // Clear selection + refresh attributes (note: spans make "grid indexing" trickier;
      // this still keeps your base mapping consistent for remaining cells)
        this.selectedCells = [];
        table.querySelectorAll(".selectedTableCells").forEach(td => td.classList.remove("selectedTableCells"));
        //this.updateCellDataAttributes(table);
        this.updateSelectionTextarea(table);
    }
    
    /** Unmerge a single merged cell (best-effort) */
    unmergeSelectedCell() 
    {
        if (!this.editor.selectedElement) return;
        
        const wrapper = this.editor.selectedElement?.classList?.contains("table-wrapper")
          ? this.editor.selectedElement
          : this.editor.selectedElement?.closest?.(".table-wrapper");
        
        const table = wrapper?.querySelector("table");
        if (!table) return;
    
    
    
    
      // Prefer: if user selected one cell
        const cells = this.getSelectedCellElements(table);
        const target = cells[0];
        if (!target) 
        {
            alert("Select the merged cell first.");
            return;
        }
    
        const rs = parseInt(target.getAttribute("rowspan") || "1", 10);
        const cs = parseInt(target.getAttribute("colspan") || "1", 10);
        if (rs === 1 && cs === 1) 
        {
            alert("Selected cell is not merged.");
            return;
        }
    
      // Remove spans
        target.removeAttribute("rowspan");
        target.removeAttribute("colspan");
    
      // Recreate missing cells in the rectangle (empty)
        const baseR = parseInt(target.dataset.cellRow, 10);
        const baseC = parseInt(target.dataset.cellColumn, 10);
    
        for (let r = baseR; r < baseR + rs; r++) 
        {
        // Find the row that contains cells with this data-cell-row
        // (Your table has an aligner row; make sure your data rows are mapped correctly.)
            const tr = Array.from(table.rows).find(row => row.querySelector(`td[data-cell-row="${r}"]`));
            if (!tr) continue;
    
            for (let c = baseC; c < baseC + cs; c++) 
            {
                if (r === baseR && c === baseC) continue; // target exists
    
          // If cell already exists, skip
                const exists = table.querySelector(`td[data-cell-row="${r}"][data-cell-column="${c}"]`);
                if (exists) continue;
    
          // Insert at the right approximate position: find next cell with bigger column
                const rowCells = Array.from(tr.querySelectorAll("td")).filter(td => td.hasAttribute("data-cell-column"));
                let insertBefore = null;
                for (const td of rowCells) 
                {
                    const cc = parseInt(td.dataset.cellColumn, 10);
                    if (cc > c) { insertBefore = td; break; }
                }
    
                const newTd = document.createElement("td");
                newTd.style.padding = "5px";
                newTd.style.minWidth = "50px";
                newTd.setAttribute("contenteditable", "true");
                newTd.setAttribute("tabindex", "0");
                newTd.setAttribute("data-action-status", "editMode");
    
                if (insertBefore) 
                    tr.insertBefore(newTd, insertBefore);
                else 
                    tr.appendChild(newTd);
            }
        }
    
        //this.updateCellDataAttributes(table);
        this.selectedCells = [];
        table.querySelectorAll(".selectedTableCells").forEach(td => td.classList.remove("selectedTableCells"));
        this.updateSelectionTextarea(table);
    }
    
    /** Returns the aligner TR inside a table */
    getAlignerRow(table) 
    {
      return table?.querySelector("tr[data-column-aligner='true'], tr[data-column-aligner]");
    }


    /** Show/hide the aligner row and its resize handles */
    setAlignerVisible(wrapperOrTable, visible) 
    {
        const table = wrapperOrTable?.tagName === "TABLE"
            ? wrapperOrTable
            : wrapperOrTable?.querySelector?.("table");
    
        if (!table) return;
    
        const aligner = table.querySelector("tr[data-column-aligner]");
        if (!aligner) return;
    
        // show / hide the whole row
        aligner.style.display = visible ? "table-row" : "none";
    
        // show / hide the resize handles inside that row
        aligner.querySelectorAll(".resize-handle.table-resize,[data-cell-resize-handler]")
            .forEach(h => {
                h.style.display = visible ? "block" : "none";
            });
    }



    /** Persist widths into datasets: table + each aligner TD */
    updateAlignerWidths(table) 
    {
      if (!table) return;
    
      const rows = Array.from(table.rows);
      const aligner = rows.find(r => r.dataset && r.dataset.columnAligner);
      if (!aligner) return;
    
      // Save table width (metadata only, if you want it)
      const tW = Math.round(table.getBoundingClientRect().width);
      aligner.dataset.tableWidth = String(tW);
    
      // For each aligner cell, push width into all body cells for that column
      const alignerCells = aligner.querySelectorAll("td[data-cell-align-column]");
      alignerCells.forEach(tdAlign => {
        const colIndex = tdAlign.dataset.cellAlignColumn;
        if (colIndex == null) return;
    
        const w = Math.round(tdAlign.getBoundingClientRect().width);
        tdAlign.dataset.colWidth = String(w);     // metadata for debug
    
        // ✅ apply width to all visible body cells in this column
        table
          .querySelectorAll(`td[data-cell-column="${colIndex}"]`)
          .forEach(bodyCell => {
            bodyCell.style.width = `${w}px`;
          });
      });
    }
}
