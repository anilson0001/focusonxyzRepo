class DrawingPanelHandler 
{
    constructor(editor) 
    {
        this.title = "Drawing";
        this.editor = editor;
        this.drawingCounter = 0;
        this.selectedDrawing = null;
        this.deleteDrawingBtn = null;
    }


    initializeExisting() 
    {
        this.drawingCounter = 0;
        this.editor.container.querySelectorAll('.drawing-image').forEach(img => {
            const numMatch = img.closest('.drawing-panel')?.id?.match(/_(\d+)$/);
            const num = numMatch ? parseInt(numMatch[1], 10) : 0;
            this.drawingCounter = Math.max(this.drawingCounter, num + 1);
        });
        this.editor.container.querySelectorAll('.drawing-image').forEach(img => {
            this.makeElementInteractive(img);
        });
    }


    showConfigPanel(wrapper, callFromToolbar)
    {
        if(!this.editor.configPanel) 
            this.editor = this.editor.updateEditor(wrapper);   

        this.editor.configPanel.innerHTML = '';
        
        this.editor.configPanel.appendChild(this.initialObjPanel(wrapper));
        //this.editor.configPanel.style.display = "block";
        this.editor.configPanel.style.display = "flex"; 
    }       


    initialObjPanel(existingImg = null)   // you can add param later if needed
    {
        // Main content wrapper - normal flow, will be placed inside configPanel
        const contentWrapper = document.createElement("div");
        contentWrapper.className = "drawing-panel-content";  // optional helpful class
        contentWrapper.dataset.pseudoId = this.editor.productID;
        contentWrapper.style.padding = "15px";
        contentWrapper.style.maxWidth = "380px";             // prevent being too wide on desktop
        contentWrapper.style.margin = "0 auto";              // center inside configPanel
    
    
    
    
    
    
        // ── SVG drawing area ───────────────────────────────────────
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "300");
        svg.setAttribute("height", "250");
        svg.setAttribute("class", "drawingPanel");
        
    svg.setAttribute("viewBox", `0 0 300 250`);
    svg.setAttribute("width",  "100%");   // or specific px
    svg.setAttribute("height", "100%");   // or specific px
    // or fixed: svg.setAttribute("width", "380px"); etc.
        
        svg.style.userSelect = "none";
        svg.style.touchAction = "none";
        svg.style.border = "1px solid #ccc";                 // visual feedback
        svg.style.backgroundColor = "#fff";
        svg.style.display = "block";
        //svg.style.margin = "0 auto 15px auto";
    
        // ... (keep all your drawing variables and event listeners the same)
        let currentPath = null;
        let strokeColor = "#000000";
        let strokeWidth = 2;
        let isEraser = false;
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
    
        // Controls container
        const controls = document.createElement("div");
        controls.className = "drawing-controls";
        controls.style.display = "flex";
        controls.style.flexDirection = "column";
        controls.style.gap = "12px";
    
        // Color, thickness, eraser, layer – keep the same structure
        // (I'm skipping repetitive code here – copy your existing controls creation)
    
    
    
    
            const colorpicker = document.createElement("div");
            colorpicker.style.width = "100%";
            colorpicker.style.display = "flex";
            colorpicker.style.alignItems = "center";
            const colorLabel = document.createElement("label");
            colorLabel.textContent = "Line Color: ";
            colorLabel.style.marginRight = "5px";
            const colorInput = document.createElement("input");
            colorInput.type = "color";
            colorInput.value = "#000000";
            colorInput.addEventListener("input", (e) => 
            {
                strokeColor = e.target.value;
            });
            colorpicker.appendChild(colorLabel);
            colorpicker.appendChild(colorInput);
    
            const lineThickness = document.createElement("div");
            lineThickness.style.width = "100%";
            lineThickness.style.display = "flex";
            lineThickness.style.alignItems = "center";
            const lineWidthLabel = document.createElement("label");
            lineWidthLabel.textContent = "Line Thickness: ";
            lineWidthLabel.style.marginRight = "5px";
            const lineWidthInput = document.createElement("input");
            lineWidthInput.type = "number";
            lineWidthInput.min = "1";
            lineWidthInput.max = "20";
            lineWidthInput.value = "2";
            lineWidthInput.style.width = "50px";
            lineWidthInput.addEventListener("input", (e) => 
            {
                const val = parseInt(e.target.value);
                if (val >= 1 && val <= 20) strokeWidth = val;
            });
            lineThickness.appendChild(lineWidthLabel);
            lineThickness.appendChild(lineWidthInput);
    
            const eraser = document.createElement("div");
            eraser.style.width = "100%";
            eraser.style.display = "flex";
            eraser.style.alignItems = "center";
            const eraserCheckbox = document.createElement("input");
            eraserCheckbox.type = "checkbox";
            eraserCheckbox.id = `eraser_drawing_${this.editor.productID}`;
            const eraserLabel = document.createElement("label");
            eraserLabel.htmlFor = eraserCheckbox.id;
            eraserLabel.textContent = "Eraser";
            eraserLabel.style.marginLeft = "5px";
            eraserCheckbox.addEventListener("change", (e) =>
            {
                isEraser = e.target.checked;
                svg.style.cursor = e.target.checked ? "crosshair" : "grab";
            });
            eraser.appendChild(eraserCheckbox);
            eraser.appendChild(eraserLabel);
    
            const layer = document.createElement("div");
            layer.style.width = "100%";
            layer.style.display = "flex";
            layer.style.alignItems = "center";
            const layerLabel = document.createElement("label");
            layerLabel.textContent = "Layer Position: ";
            layerLabel.style.marginRight = "5px";
            const layerSelect = document.createElement("select");
            layerSelect.value = "500";        
            [
                { value: "0", text: "Back" },
                { value: "500", text: "Middle" },
                { value: "2000", text: "Top" }
            ].forEach(opt => 
            {
                const option = document.createElement("option");
                option.value = opt.value;
                option.text = opt.text;
                layerSelect.appendChild(option);
            });
            layer.appendChild(layerLabel);
            layer.appendChild(layerSelect);
    
            controls.appendChild(colorpicker);
            controls.appendChild(lineThickness);
            controls.appendChild(eraser);
            controls.appendChild(layer);
    
    
    
    
    
            svg.addEventListener("pointerdown", (e) => 
            {
                e.preventDefault();
                isDrawing = true;
                const rect = svg.getBoundingClientRect();
                lastX = e.clientX - rect.left;
                lastY = e.clientY - rect.top;
                console.log(`Start drawing at: (${lastX}, ${lastY})`);
                currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                currentPath.setAttribute("stroke", isEraser ? "#FFFFFF" : strokeColor);
                currentPath.setAttribute("stroke-width", strokeWidth);
                currentPath.setAttribute("fill", "none");
                currentPath.setAttribute("stroke-linecap", "round");
                currentPath.setAttribute("d", `M${lastX},${lastY}`);
                svg.appendChild(currentPath);
            });
    
            svg.addEventListener("pointermove", (e) => 
            {
                if (!isDrawing || !currentPath) return;
                e.preventDefault();
                const rect = svg.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                console.log(`Drawing to: (${x}, ${y})`);
                const pathData = currentPath.getAttribute("d") + ` L${x},${y}`;
                currentPath.setAttribute("d", pathData);
                lastX = x;
                lastY = y;
            });
    
            svg.addEventListener("pointerup", (e) => 
            {
                e.preventDefault();
                isDrawing = false;
                currentPath = null;
                console.log("Drawing stopped");
            });
    
            svg.addEventListener("pointerleave", (e) => 
            {
                if (isDrawing) 
                {
                    isDrawing = false;
                    currentPath = null;
                    console.log("Drawing interrupted by pointerleave");
                }
            });
    
         
    
        contentWrapper.appendChild(svg);
        contentWrapper.appendChild(controls);
        //controls.appendChild(buttonContainer);
    
        // Button row
        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "12px";
        buttonContainer.style.justifyContent = "center";
        buttonContainer.style.marginTop = "20px";
    
        const clearBtn = document.createElement("button");
        clearBtn.className = "btnPanel oPanel";
        clearBtn.textContent = "Clear";
        clearBtn.style.flex = "1";
        clearBtn.style.maxWidth = "120px";
        clearBtn.addEventListener("click", () => 
        {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
        });
    
        const applyBtn = document.createElement("button");
        applyBtn.className = "btnPanel oPanel";
        applyBtn.textContent = "Apply";
        applyBtn.style.flex = "1";
        applyBtn.style.maxWidth = "120px";
        applyBtn.addEventListener("click", () => 
        {
            this.createObjElement(contentWrapper);  // ← important: pass contentWrapper
        });
    
        buttonContainer.appendChild(clearBtn);
        buttonContainer.appendChild(applyBtn);
    
        // Assemble
    
    
    
        // Return wrapped panel (same pattern as Table)
        return this.editor.panelWrapper(
        {
            head: this.title || "Drawing",
            body: contentWrapper,
            foot: buttonContainer
        });
    }


    createObjElement(panelContent)   // ← now receives contentWrapper, not svg directly
    {
        // Usually we want to extract/save only the SVG part
        const svg = panelContent.querySelector('svg.drawingPanel');
        
        if (!svg) return;
    
        // Create final draggable element
        const finalWrapper = document.createElement("div");
        finalWrapper.className = "drawing-panel";
/*
        finalWrapper.addEventListener("click", (e)=>
        {
		    const dhandler = e.target.querySelector(".drag-handle") || e.target.parentElement.querySelector(".drag-handle");
		    const rhandler = e.target.querySelector(".resize-handle") || e.target.parentElement.querySelector(".resize-handle");
		    
		    if(dhandler) dhandler.style.display = "block";
		    if(rhandler) rhandler.style.display = "block";
        });
*/
        finalWrapper.appendChild(svg.cloneNode(true));  // or move original
    
    
    
    
    
    
    	finalWrapper.id = `drawing_${this.editor.propertyID}_${++this.drawingCounter}`;
    	finalWrapper.style.position = 'absolute';
    	finalWrapper.style.left = "150px";
   		finalWrapper.style.top = "150px";
   		
   		
        finalWrapper.dataset.familyChain = "parent";    		
    	finalWrapper.dataset.resizeElement = "outer";
    	finalWrapper.dataset.elementLayer = "outer";
        finalWrapper.dataset.editorElement = "drawing";
		finalWrapper.dataset.editorElement = "drawing";
		finalWrapper.dataset.rteContainerId = `${this.editor.propertyID}`;
		finalWrapper.dataset.editorProperty = `${this.editor.propertyID}`;
	    
	    
	    
        this.editor.makeElementDraggable(finalWrapper);
        this.editor.makeElementResizable(finalWrapper);
        this.editor.makeElementConfigurable(finalWrapper, null, this.showConfigPanel.bind(this));
        this.editor.insertIntoEditor(finalWrapper);
        this.editor.deselectAllConfigs();
    }


    requestToRemoveAllSelection()
    {
        this.editor.container.querySelectorAll("div[data-editor-element='drawing']").forEach((shape)=>
		{
			shape.classList.remove("selected");	
			
			const dHandler = shape.querySelector(".drag-handle") || shape.parentElement.querySelector(".drag-handle") || "";
			const rHandler = shape.querySelector(".resize-handle") || shape.parentElement.querySelector(".resize-handle") || "";
			
			if(dHandler) dHandler.style.display = "none";
			if(rHandler) rHandler.style.display = "none";
		});

		this.selectedShape = null;
		this.selectedCells = [];
    }
    
    
    selectDrawing(img) 
    {
        document.querySelectorAll(".drawing-image.selected").forEach(el => el.classList.remove("selected"));
        this.selectedDrawing = img;
    }
}