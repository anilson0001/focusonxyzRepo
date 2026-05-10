class FlowchartHandler 
{
  	constructor(editor) 
  	{
  	    this.title = "Flowchart";
		this.editor 	= editor;
		this.configPanel 	= document.getElementById('configPanel');
		this.selectedShape 	= null;

		this.shapeCounters = { rectangle: 0, diamond: 0, oval: 0, pentagon: 0, hexagon: 0, "connection-line": 0 };
  	}



initializeExisting() 
{
    const types = ['rectangle', 'diamond', 'oval', 'pentagon', 'hexagon', 'connection-line'];

    types.forEach(type =>
    {
        this.shapeCounters[type] = 0;
    });

    this.editor.container.querySelectorAll('.flowchart-shape').forEach(shape =>
    {
        const baseType = Array.from(shape.classList).find(cls => types.includes(cls));
        if (baseType)
        {
            const numMatch = shape.id.match(/_(\d+)$/);
            const num = numMatch ? parseInt(numMatch[1], 10) : 0;
            this.shapeCounters[baseType] = Math.max(this.shapeCounters[baseType], num + 1);
        }
    });

    this.editor.container.querySelectorAll('.flowchart-shape').forEach(shape =>
    {
        this.attachShapeBehavior(shape);
    });

    this.updateAllConnectedLines();
    this.checkConnectionPointOverlap();
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
		const wrapper = document.createElement("div");

		const oval = document.createElement("button");
		oval.className = "btnPanel oPanel";
		oval.textContent = "Oval";
		oval.addEventListener("click", ()=>{	this.createObjElement('oval'); 	});
		wrapper.appendChild(oval);

		const diamond = document.createElement("button");
		diamond.className = "btnPanel oPanel";
		diamond.textContent = "Diamond";
		diamond.addEventListener("click", ()=>{	this.createObjElement('diamond'); 	});	
		wrapper.appendChild(diamond);

		const rectangle = document.createElement("button");
		rectangle.className = "btnPanel oPanel";
		rectangle.textContent = "Rectangle";
		rectangle.addEventListener("click", ()=>{	this.createObjElement('rectangle'); 	});	
		wrapper.appendChild(rectangle);

		const pentagon = document.createElement("button");
		pentagon.className = "btnPanel oPanel";
		pentagon.textContent = "Pentagon";
		pentagon.addEventListener("click", ()=>{	this.createObjElement('pentagon'); 	});	
		wrapper.appendChild(pentagon);

		const hexagon = document.createElement("button");
		hexagon.className = "btnPanel oPanel";
		hexagon.textContent = "Hexagon";
		hexagon.addEventListener("click", ()=>{	this.createObjElement('hexagon'); 	});	
		wrapper.appendChild(hexagon);


		const freeform_line = document.createElement("button");
		freeform_line.className = "btnPanel oPanel";
		freeform_line.textContent = "Freeform Line";
		freeform_line.addEventListener("click", ()=>{	this.createObjElement('connection-line'); 	});	
		wrapper.appendChild(freeform_line);

		const horizontal_line = document.createElement("button");
		horizontal_line.className = "btnPanel oPanel";
		horizontal_line.textContent = "Horizontal Line";
		horizontal_line.addEventListener("click", ()=>{	this.createObjElement('connection-line-h'); 	});	
		wrapper.appendChild(horizontal_line);

		const vertical_line = document.createElement("button");
		vertical_line.className = "btnPanel oPanel";
		vertical_line.textContent = "Vertical Line";
		vertical_line.addEventListener("click", ()=>{	this.createObjElement('connection-line-v'); 	});	
		wrapper.appendChild(vertical_line);

		const vhv_line = document.createElement("button");
		vhv_line.className = "btnPanel oPanel";
		vhv_line.textContent = "V-H-V Line";
		vhv_line.addEventListener("click", ()=>{	this.createObjElement('connection-line-vhv'); 	});	
		wrapper.appendChild(vhv_line);

		const hvh_line = document.createElement("button");
		hvh_line.className = "btnPanel oPanel";
		hvh_line.textContent = "H-V-H Line";
		hvh_line.addEventListener("click", ()=>{	this.createObjElement('connection-line-hvh'); 	});	
		wrapper.appendChild(hvh_line);


		//return wrapper;
		return this.editor.panelWrapper({head:this.title, body:"", foot:wrapper});
	}



    updateObjPanel(element) 
    {
        const bodyWrapper = document.createElement("div");
        
        
      
        const isLine = element.classList.contains('connection-line');
        const idLabel = document.createElement("label");
        idLabel.textContent = "ID:";
        const idInput = document.createElement("input");
        idInput.type = "text";
        idInput.value = element.dataset.pseudoId;
        let textInput, colorInput, bgColorInput, fontSizeInput;
        if (!isLine) 
        {
            const textDiv = element.querySelector('.shape-text');
            const textLabel = document.createElement("label");
            textLabel.textContent = "Text:";
            textInput = document.createElement("input");
            textInput.type = "text";
            textInput.value = textDiv.innerHTML;
            const textColorLabel = document.createElement("label");
            textColorLabel.textContent = "Text Color:";
            colorInput = document.createElement("input");
            colorInput.type = "color";
            colorInput.value = this.editor.rgbToHex(textDiv.style.color) || "#000000";
            const bgColorLabel = document.createElement("label");
            bgColorLabel.textContent = "Background Color:";
            bgColorInput = document.createElement("input");
            bgColorInput.type = "color";
            let bgElem = element.querySelector('.shape-fill') || element;
            bgColorInput.value = this.editor.rgbToHex(bgElem.style.backgroundColor) || "#FFFFFF";
            const fontSizeLabel = document.createElement("label");
            fontSizeLabel.textContent = "Font Size:";
            fontSizeInput = document.createElement("input");
            fontSizeInput.type = "number";
            fontSizeInput.min = "8";
            fontSizeInput.value = parseInt(textDiv.style.fontSize) || 16;
            
            bodyWrapper.appendChild(textLabel);
            bodyWrapper.appendChild(textInput);
            bodyWrapper.appendChild(textColorLabel);
            bodyWrapper.appendChild(colorInput);
            bodyWrapper.appendChild(bgColorLabel);
            bodyWrapper.appendChild(bgColorInput);
            bodyWrapper.appendChild(fontSizeLabel);
            bodyWrapper.appendChild(fontSizeInput);
        }
        const lineColorLabel = document.createElement("label");
        lineColorLabel.textContent = "Line Color:";
      
        const lineColorInput = document.createElement("input");
        lineColorInput.type = "color";
        if (isLine) 
        {
            lineColorInput.value = element.dataset.lineColor || "#000000";
        } 
        else 
        {
            if (element.classList.contains('pentagon') || element.classList.contains('hexagon')) 
            {
                lineColorInput.value = element.dataset.lineColor || "#000000";
            } 
            else 
            {
                lineColorInput.value = this.editor.rgbToHex(element.style.borderColor) || "#000000";
            }
        }
        
        const commentLabel = document.createElement("label");
        commentLabel.textContent = "Comment:";
      
        const commentInput = document.createElement("textarea");
        commentInput.rows = 3;
        commentInput.value = element.dataset.comment || "";
      
      
        const footWrapper = document.createElement("div");
        
        const applyButton = document.createElement("button");
        applyButton.textContent = "Update";
        applyButton.addEventListener("click", (e) => this.updateObjElement(e.target.parentElement));
        const removeButton = document.createElement("button");
      
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => this.editor.removeElement(element));
      
      
        footWrapper.appendChild(applyButton);
        footWrapper.appendChild(removeButton);
        
        bodyWrapper.appendChild(idLabel);
        bodyWrapper.appendChild(idInput);
        bodyWrapper.appendChild(lineColorLabel);
        bodyWrapper.appendChild(lineColorInput);
        bodyWrapper.appendChild(commentLabel);
        bodyWrapper.appendChild(commentInput);
      
        this.idInput = idInput;
        this.lineColorInput = lineColorInput;
        this.commentInput = commentInput;
      
        if (!isLine) 
        {
            this.textInput = textInput;
            this.colorInput = colorInput;
            this.bgColorInput = bgColorInput;
            this.fontSizeInput = fontSizeInput;
        }
        
        
        //return wrapper;
        return this.editor.panelWrapper({head:this.title, body:bodyWrapper, foot:footWrapper});
    }



    createObjElement(shapeType)
    {
		this.selectedShape = shapeType;

    	const baseShapeType = shapeType.startsWith("connection-line") ? "connection-line" : shapeType;
    	this.shapeCounters[baseShapeType] = (this.shapeCounters[baseShapeType] || 0) + 1;
    	const shapeId = `flowchart_${this.editor.propertyID}_${baseShapeType}_${this.shapeCounters[baseShapeType]}`;

//wrapper = shape

    	const wrapper = document.createElement("div");
    	wrapper.id = shapeId;    	
    	
		wrapper.dataset.editorElement = "flowchart";
		wrapper.dataset.wrapElement = "flowchart";
		
		wrapper.dataset.resizeElement = "outer";
		wrapper.dataset.elementLayer = "outer";
		wrapper.dataset.familyChain = "parent";
		
		
		wrapper.dataset.rteContainerId = `${this.editor.propertyID}`;
		wrapper.dataset.editorProperty = `${this.editor.propertyID}`;
	    wrapper.dataset.flowchartElement = shapeType;    	
	    
	    
	    wrapper.contentEditable = "false";
    	wrapper.className = `flowchart-shape ${baseShapeType} element-outer-layer`;

    	//wrapper.style.position = 'absolute';
    	//wrapper.style.left = "150px";
   		//wrapper.style.top = "150px";
   		

	    
		if (shapeType === 'pentagon' || shapeType === 'hexagon') 
		{
  			wrapper.style.border = 'none';
  			wrapper.style.background = 'transparent';
  			wrapper.style.width = "100px";
  			wrapper.style.height = "100px";

  			const fillDiv = document.createElement("div");
  			fillDiv.className = "shape-fill";
  			fillDiv.style.position = 'absolute';
  			fillDiv.style.left = '0';
  			fillDiv.style.top = '0';
  			fillDiv.style.width = '100%';
  			fillDiv.style.height = '100%';
  			fillDiv.style.backgroundColor = '#FFFFFF';

  			wrapper.appendChild(fillDiv);
  			wrapper.dataset.lineColor = '#000000';
  			this.updateShapeOutline(wrapper);
		}

		let isLine = false;
		if (baseShapeType === "connection-line")
		{
  			isLine = true;
  			wrapper.dataset.lineType = shapeType;
  			wrapper.dataset.pseudoId = wrapper.id;

  			const startPoint = document.createElement("div");
  			startPoint.className = "start-point";
		    startPoint.id = `${shapeId}_start`;
  			startPoint.dataset.connectedId = "";
  			startPoint.dataset.coordinateX = "50";
  			startPoint.dataset.coordinateY = "50";
  			startPoint.dataset.coordinateZ = "0";

		    const middlePoint = document.createElement("div");
  			middlePoint.className = "middle-point";
		    middlePoint.id = `${shapeId}_middle`; 
  			middlePoint.dataset.coordinateX = shapeType === "connection-line-v" ? "50" : "100";
  			middlePoint.dataset.coordinateY = shapeType === "connection-line-v" ? "100" : "100";
  			middlePoint.dataset.coordinateZ = "0";

  			const endPoint = document.createElement("div");
  			endPoint.className = "end-point";
		    endPoint.id = `${shapeId}_end`;
  			endPoint.dataset.connectedId = "";
  			endPoint.dataset.coordinateX = shapeType === "connection-line-v" ? "50" : "150";
  			endPoint.dataset.coordinateY = shapeType === "connection-line-v" ? "150" : "50";
  			endPoint.dataset.coordinateZ = "0";

  			wrapper.appendChild(startPoint);
  			wrapper.appendChild(middlePoint);
  			wrapper.appendChild(endPoint);

  			this.makePointDraggable(wrapper, startPoint, middlePoint, endPoint);
  			this.updateLine(wrapper);
		}
		else
		{
  			wrapper.dataset.pseudoId = wrapper.id;
  			wrapper.style.position = 'absolute';

  			const textDiv = document.createElement("div");
  			textDiv.className = "shape-text";
  			textDiv.id = `${shapeId}_innertext`;
  			textDiv.innerHTML = shapeType.charAt(0).toUpperCase() + shapeType.slice(1);
  			textDiv.contenteditable = false;
  			
  			if (shapeType === 'pentagon' || shapeType === 'hexagon') 
  			{
    			wrapper.querySelector('.shape-fill').appendChild(textDiv);
  			} 
  			else 
  			{
    			wrapper.appendChild(textDiv);
  			}

  			//const resizeHandle = document.createElement("div");
  			//resizeHandle.className = "resize-handle";
  			//resizeHandle.dataset.elementType = "handler";

  			//wrapper.appendChild(resizeHandle);

  			this.editor.makeElementDraggable(wrapper, textDiv, false);
  			//this.makeElementResizable(wrapper, resizeHandle);
  			this.editor.makeElementResizable(wrapper);
		}


		wrapper.addEventListener("click", (e) =>
		{
		    const dhandler = e.target.querySelector(".drag-handle") || e.target.parentElement.querySelector(".drag-handle");
		    const rhandler = e.target.querySelector(".resize-handle") || e.target.parentElement.querySelector(".resize-handle");
		    
		    
		    if(dhandler) dhandler.style.display = "block";
		    if(rhandler) rhandler.style.display = "block";
		});
		
		wrapper.addEventListener("mouseover", () =>
		{
  			if (!wrapper.classList.contains("selected")) { wrapper.classList.add("show-connection-points"); }
		});

		wrapper.addEventListener("mouseout", () =>
		{
  			if (!wrapper.classList.contains("selected")) { wrapper.classList.remove("show-connection-points"); }
		});

//this.editor.makeElementDraggable(shape);
        this.editor.makeElementConfigurable(wrapper, "", this.showConfigPanel.bind(this));

		this.addConnectionPoints(wrapper, baseShapeType); 
		this.updateConnectionPointCoordinates(wrapper);
        this.checkConnectionPointOverlap();

    	if (baseShapeType === "connection-line") { this.updateLine(wrapper); }
    	if (shapeType === 'pentagon' || shapeType === 'hexagon'){	this.updateShapeOutline(wrapper);	}

	

        this.editor.insertIntoEditor(wrapper);
        this.editor.deselectAllConfigs();	
  	}
    
    
    updateObjElement(panel)
    {
        if (!this.editor.selectedElement) return;
        if (!panel) return;
        
        const shape = this.editor.selectedElement;
        const oldId = shape.id;
        const newId = this.idInput.value.trim();
        if (!newId) return; // Prevent empty ID
        const isLine = shape.classList.contains('connection-line');
        shape.dataset.pseudoId = newId;
        shape.dataset.comment = this.commentInput.value;
        if (oldId !== newId) 
        {
            shape.id = newId;
            if (isLine) 
            {
                const startPoint = shape.querySelector('.start-point');
                const middlePoint = shape.querySelector('.middle-point');
                const endPoint = shape.querySelector('.end-point');
                if (startPoint) startPoint.id = `${newId}_start`;
                if (middlePoint) middlePoint.id = `${newId}_middle`;
                if (endPoint) endPoint.id = `${newId}_end`;
                
                // Update references in connection points' connectedTo
                this.editor.container.querySelectorAll('.connection-point').forEach(cp => 
                {
                    if (cp.dataset.connectedTo === `${oldId}_start`) cp.dataset.connectedTo = `${newId}_start`;
                    if (cp.dataset.connectedTo === `${oldId}_middle`) cp.dataset.connectedTo = `${newId}_middle`;
                    if (cp.dataset.connectedTo === `${oldId}_end`) cp.dataset.connectedTo = `${newId}_end`;
                });
            } 
            else    
            {
                const textDiv = shape.querySelector('.shape-text');
                if (textDiv) textDiv.id = `${newId}_innertext`;
                shape.querySelectorAll('.connection-point').forEach((cp, i) => 
                {
                    const oldCpId = cp.id;
                    cp.id = `${newId}_connectpoint_${i+1}`;
                    // Update references in line points' connectedId
                    this.editor.container.querySelectorAll('.connection-line .start-point, .connection-line .end-point').forEach(p => 
                    {
                        if (p.dataset.connectedId === oldCpId) p.dataset.connectedId = cp.id;
                    });
                    
                    // Update references in other connection points' connectedTo
                    this.editor.container.querySelectorAll('.connection-point').forEach(otherCp => 
                    {
                        if (otherCp.dataset.connectedTo === oldCpId) otherCp.dataset.connectedTo = cp.id;
                    });
                });
            }
            this.updateAllConnectedLines();
            this.checkConnectionPointOverlap();
        }
        
        if (isLine) 
        {
            shape.dataset.lineColor = this.lineColorInput.value;
            this.updateLine(shape, this.lineColorInput.value);
        } 
        else 
        {
            const textDiv = shape.querySelector('.shape-text');
            const shapeType = shape.classList[1];
            textDiv.innerHTML = this.textInput.value || shapeType.charAt(0).toUpperCase() + shapeType.slice(1);
            textDiv.style.color = this.colorInput.value;
            let bgElem = shape.querySelector('.shape-fill') || shape;
            bgElem.style.backgroundColor = this.bgColorInput.value;
            textDiv.style.fontSize = `${this.fontSizeInput.value}px`;
            if (shape.classList.contains('pentagon') || shape.classList.contains('hexagon')) 
            {
                shape.dataset.lineColor = this.lineColorInput.value;
                this.updateShapeOutline(shape);
            } 
            else 
            {
                shape.style.borderColor = this.lineColorInput.value;
            }
        }
        
         this.editor.deselectAllConfigs();
    }
    






  removeShape() 
  {
    if (!this.selectedShape) return;
    const shape = this.selectedShape;
    if (!shape.classList.contains('connection-line')) 
    {
      shape.querySelectorAll(".connection-point").forEach(cp => {
        if (cp.dataset.connectedTo) {
          const otherCp = this.editor.container.querySelector(`#${cp.dataset.connectedTo}`);
          if (otherCp) {
            otherCp.dataset.connectedTo = "";
            otherCp.classList.remove("locked");
          }
        }
      });
    } 
    else 
    {
      const start = shape.querySelector('.start-point');
      const end = shape.querySelector('.end-point');
      [start, end].forEach(p => {
        if (p.dataset.connectedId) {
          const cp = this.editor.container.querySelector(`#${p.dataset.connectedId}`);
          if (cp) {
            cp.dataset.connectedTo = "";
            cp.classList.remove("locked");
          }
        }
      });
    }
    shape.remove();
    this.editor.configPanel.style.display = 'none';
    this.editor.configPanel = null;
    this.selectedShape = null;

    this.editor.deselectAllConfigs();
  }



  updateShapeOutline(shape)
  {
    const shapePoints =
    {
      pentagon:
      [
        [0.5, 0],
        [1, 0.38],
        [0.82, 1],
        [0.18, 1],
        [0, 0.38]
      ],
      hexagon:
      [
        [0.25, 0],
        [0.75, 0],
        [1, 0.5],
        [0.75, 1],
        [0.25, 1],
        [0, 0.5]
      ]
    };
    const shapeType = shape.classList.contains('pentagon') ? 'pentagon' : 'hexagon';
    const relativePoints = shapePoints[shapeType];
    if (!relativePoints) return;
    // Remove old segments
    shape.querySelectorAll('.shape-segment').forEach(seg => seg.remove());
    const w = shape.offsetWidth;
    const h = shape.offsetHeight;
    const points = relativePoints.map(([rx, ry]) => [rx * w, ry * h]);
    const shapeRect = shape.getBoundingClientRect();
    const editorRect = this.editor.container.getBoundingClientRect();
    const shapeAbsLeft = shapeRect.left - editorRect.left + this.editor.container.scrollLeft;
    const shapeAbsTop = shapeRect.top - editorRect.top + this.editor.container.scrollTop;
    const numSides = relativePoints.length;
    for (let i = 0; i < numSides; i++)
    {
      const x1 = points[i][0];
      const y1 = points[i][1];
      const x2 = points[(i + 1) % numSides][0];
      const y2 = points[(i + 1) % numSides][1];
      const segment = document.createElement('div');
      segment.className = 'shape-segment';
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      segment.style.left = `${x1}px`;
      segment.style.top = `${y1}px`;
      segment.style.width = `${length}px`;
      segment.style.height = '1px';
      segment.style.background = shape.dataset.lineColor || '#000000';
      segment.style.transform = `rotate(${angle}deg)`;
      segment.style.transformOrigin = '0 0';
      segment.dataset.startX = shapeAbsLeft + x1;
      segment.dataset.startY = shapeAbsTop + y1;
      segment.dataset.endX = shapeAbsLeft + x2;
      segment.dataset.endY = shapeAbsTop + y2;
      shape.appendChild(segment);
    }
  }


  addConnectionPoints(shape, shapeType)
  {
    if (shapeType === "connection-line") return;
    const width = shape.offsetWidth;
    const height = shape.offsetHeight;
    const points = [];
    if (shapeType === "rectangle" || shapeType === "diamond")
    {
      points.push({ name: "top", left: "50%", top: "0%" });
      points.push({ name: "bottom", left: "50%", top: "100%" });
      points.push({ name: "left", left: "0%", top: "50%" });
      points.push({ name: "right", left: "100%", top: "50%" });
      points.push({ name: "top-left", left: "0%", top: "0%" });
      points.push({ name: "top-right", left: "100%", top: "0%" });
      points.push({ name: "bottom-left", left: "0%", top: "100%" });
      points.push({ name: "bottom-right", left: "100%", top: "100%" });
    }
    else if (shapeType === "oval")
    {
      for (let i = 0; i < 4; i++)
      {
        const angle = (i * Math.PI) / 2;
        const x = 50 + 50 * Math.cos(angle);
        const y = 50 + 50 * Math.sin(angle);
        points.push({ name: `oval-${i}`, left: `${x}%`, top: `${y}%` });
      }
    }
    else if (shapeType === "pentagon")
    {
      points.push({ name: "top", left: "50%", top: "0%" });
      points.push({ name: "bottom-left", left: "18%", top: "100%" });
      points.push({ name: "bottom-right", left: "82%", top: "100%" });
      points.push({ name: "top-left", left: "0%", top: "38%" });
      points.push({ name: "top-right", left: "100%", top: "38%" });
    }
    else if (shapeType === "hexagon")
    {
      points.push({ name: "top-left", left: "25%", top: "0%" });
      points.push({ name: "top-right", left: "75%", top: "0%" });
      points.push({ name: "right", left: "100%", top: "50%" });
      points.push({ name: "bottom-right", left: "75%", top: "100%" });
      points.push({ name: "bottom-left", left: "25%", top: "100%" });
      points.push({ name: "left", left: "0%", top: "50%" });
    }
    points.forEach((pos, i) =>
    {
      const cp = document.createElement("div");
      cp.className = "connection-point";
      cp.id = `${shape.id}_connectpoint_${i + 1}`;
      cp.style.left = pos.left;
      cp.style.top = pos.top;
      cp.dataset.positionName = pos.name;
      cp.dataset.connectedTo = "";
      cp.addEventListener("mousedown", (e) =>
      {
        e.preventDefault();
        e.stopPropagation();
        cp.classList.add("clicked");
        this.handleMagneticConnection(cp, shape, e);
        setTimeout(() => cp.classList.remove("clicked"), 300);
      });
      shape.appendChild(cp);
    });
  }


  handleMagneticConnection(draggedCp, parentShapeOfDraggedCp, mousedownEventOriginal)
  {
    const MAGNETIC_DISTANCE = 15;
    const editorRect = this.editor.container.getBoundingClientRect();
    let currentAttractionTargetCpEl = null;
    let originalTargetCpColor = '';
    const originalConnectedToId = draggedCp.dataset.connectedTo;
    if (originalConnectedToId)
    {
      const originalOtherCp = this.editor.container.querySelector(`#${originalConnectedToId}`);
      if (originalOtherCp)
      {
        originalOtherCp.dataset.connectedTo = "";
        originalOtherCp.classList.remove("locked");
        originalOtherCp.style.background = '';
      }
      draggedCp.dataset.connectedTo = "";
      draggedCp.classList.remove("locked");
      draggedCp.style.background = '';
      this.updateAllConnectedLines();
    }
    this.checkConnectionPointOverlap();
    const doDrag = (eMove) =>
    {
      eMove.preventDefault();
      const mouseX = eMove.pageX - editorRect.left + this.editor.container.scrollLeft;
      const mouseY = eMove.pageY - editorRect.top + this.editor.container.scrollTop;
      if (currentAttractionTargetCpEl)
      {
        currentAttractionTargetCpEl.classList.remove("overlapping");
        currentAttractionTargetCpEl.style.background = originalTargetCpColor;
      }
      currentAttractionTargetCpEl = null;
      originalTargetCpColor = '';
      let closestValidCp = null;
      let minDistanceSq = MAGNETIC_DISTANCE * MAGNETIC_DISTANCE;
      this.editor.container.querySelectorAll(".flowchart-shape:not(.connection-line) .connection-point").forEach(otherCp =>
      {
        if (otherCp === draggedCp) return;
        const otherShape = otherCp.closest('.flowchart-shape');
        if (otherShape === parentShapeOfDraggedCp) return;
        const isOtherCpAvailable = !otherCp.dataset.connectedTo || otherCp.dataset.connectedTo === draggedCp.id;
        if (!isOtherCpAvailable) return;
        const cpX = parseFloat(otherCp.dataset.coordinateX);
        const cpY = parseFloat(otherCp.dataset.coordinateY);
        const distSq = (mouseX - cpX) ** 2 + (mouseY - cpY) ** 2;
        if (distSq < minDistanceSq)
        {
          minDistanceSq = distSq;
          closestValidCp = otherCp;
        }
      });
      if (closestValidCp)
      {
        currentAttractionTargetCpEl = closestValidCp;
        originalTargetCpColor = currentAttractionTargetCpEl.style.background;
        currentAttractionTargetCpEl.classList.add("overlapping");
      }
    };
    const stopDrag = (eUp) => 
    {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
      this.editor.container.style.cursor = 'auto';
      if (currentAttractionTargetCpEl) 
      {
        currentAttractionTargetCpEl.classList.remove("overlapping");
        currentAttractionTargetCpEl.style.background = "";
        draggedCp.dataset.connectedTo = currentAttractionTargetCpEl.id;
        currentAttractionTargetCpEl.dataset.connectedTo = draggedCp.id;
      }
      this.updateAllConnectedLines();
      this.checkConnectionPointOverlap();
    };
    this.editor.container.style.cursor = 'grabbing';
    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
    doDrag(mousedownEventOriginal);
  }


  updateConnectionPointCoordinates(element) 
  {
    element.querySelectorAll(".connection-point").forEach(cp => {
      const cpRect = cp.getBoundingClientRect();
      const parentRect = element.getBoundingClientRect();
      const editorRect = this.editor.container.getBoundingClientRect();
      const x = cpRect.left - editorRect.left + this.editor.container.scrollLeft + (cpRect.width / 2);
      const y = cpRect.top - editorRect.top + this.editor.container.scrollTop + (cpRect.height / 2);
      cp.dataset.coordinateX = x;
      cp.dataset.coordinateY = y;
    });
  }




    updateAllConnectedLines() 
    {
    const lines = this.editor.container.querySelectorAll(".flowchart-shape.connection-line");
    if (!lines) return;
    lines.forEach(lineElement => 
    {
      const startPointEl = lineElement.querySelector(".start-point");
      const endPointEl = lineElement.querySelector(".end-point");
      let lineNeedsRedraw = false;
      [startPointEl, endPointEl].forEach(lineEndNode => {
        if (!lineEndNode) return;
        const connectedCpId = lineEndNode.dataset.connectedId;
        if (connectedCpId) {
          const connectedCp = this.editor.container.querySelector(`#${connectedCpId}`);
          if (connectedCp) 
   	  {
            const cpDataX = parseFloat(connectedCp.dataset.coordinateX) || 0;
            const cpDataY = parseFloat(connectedCp.dataset.coordinateY) || 0;
            if (parseFloat(lineEndNode.dataset.coordinateX) !== cpDataX || parseFloat(lineEndNode.dataset.coordinateY) !== cpDataY) {
              lineEndNode.dataset.coordinateX = cpDataX;
              lineEndNode.dataset.coordinateY = cpDataY;
              lineNeedsRedraw = true;
            }
          } 
	  else 
	  {
            lineEndNode.dataset.connectedId = "";
            lineNeedsRedraw = true;
          }
        }
      });
      if (lineNeedsRedraw){ this.updateLine(lineElement); }
    });
  }





    checkConnectionPointOverlap() 
    {
        const allConnectionPoints = Array.from(this.editor.container.querySelectorAll(".flowchart-shape:not(.connection-line) .connection-point"));
        if (!allConnectionPoints) return;
        allConnectionPoints.forEach(cp => 
        {
          cp.classList.remove("overlapping", "locked", "magnetic");
          cp.style.background = '';
        });
    
        allConnectionPoints.forEach(cp => 
        {
          const connectedToId = cp.dataset.connectedTo;
          if (connectedToId) {
            const otherCp = this.editor.container.querySelector(`#${connectedToId}`);
            if (otherCp && (otherCp.classList.contains("start-point") || otherCp.classList.contains("end-point"))) {
              cp.classList.add("locked");
            } else if (!otherCp) {
              cp.dataset.connectedTo = "";
            }
          }
        });
    
        for (let i = 0; i < allConnectionPoints.length; i++) 
        {
          for (let j = i + 1; j < allConnectionPoints.length; j++) {
            const point1 = allConnectionPoints[i];
            const point2 = allConnectionPoints[j];
            if (point1.closest('.flowchart-shape') === point2.closest('.flowchart-shape')) continue;
            const x1 = parseFloat(point1.dataset.coordinateX) || 0;
            const y1 = parseFloat(point1.dataset.coordinateY) || 0;
            const x2 = parseFloat(point2.dataset.coordinateX) || 0;
            const y2 = parseFloat(point2.dataset.coordinateY) || 0;
            const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
            if (distance < 15 && !point1.classList.contains("locked") && !point2.classList.contains("locked")) {
              point1.classList.add("magnetic");
              point2.classList.add("magnetic");
            }
          }
        }
    }


    drawDivLine(element, x1, y1, x2, y2, hasArrow, lineColor = '#000000') 
    {
        const segment = document.createElement('div');
        segment.className = 'line-segment';
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        segment.style.left = x1 + 'px';
        segment.style.top = y1 - 1 + 'px';
        segment.style.width = length + 'px';
        segment.style.transform = `rotate(${angle}deg)`;
        segment.style.background = lineColor;
        if (hasArrow && length > 5) 
        {
            const arrow = document.createElement('div');
            arrow.className = 'segment-arrowhead';
            arrow.style.borderLeftColor = lineColor;
            segment.appendChild(arrow);
        }
        element.appendChild(segment);
  }



    updateLine(element, lineColor = null) 
    {
    const lineType = element.dataset.lineType || "connection-line";
    const startPointEl = element.querySelector(".start-point");
    const middlePointEl = element.querySelector(".middle-point");
    const endPointEl = element.querySelector(".end-point");
    
    if (!startPointEl || !middlePointEl || !endPointEl) return;
    
    let sX = parseFloat(startPointEl.dataset.coordinateX) || 0;
    let sY = parseFloat(startPointEl.dataset.coordinateY) || 0;
    let mX = parseFloat(middlePointEl.dataset.coordinateX) || 0;
    let mY = parseFloat(middlePointEl.dataset.coordinateY) || 0;
    let eX = parseFloat(endPointEl.dataset.coordinateX) || 0;
    let eY = parseFloat(endPointEl.dataset.coordinateY) || 0;
    
    const currentLineColor = lineColor || element.dataset.lineColor || '#000000';
    element.dataset.lineColor = currentLineColor;
    element.querySelectorAll('.line-segment, .segment-arrowhead').forEach(segment => segment.remove());
    element.style.position = 'absolute';
    element.style.backgroundColor = 'transparent';
    element.style.border = 'none';
    element.style.transform = 'none';
    element.style.overflow = 'visible';
    
    const handleRadius = 5;
    let segments = [];
    if (lineType === "connection-line-h") 
    {
      const avgY = (sY + eY) / 2;
      sY = mY = eY = avgY;
      mX = (sX + eX) / 2;
      segments = [[sX, sY, eX, eY]];
    } 
    else if (lineType === "connection-line-v") 
    {
      const avgX = (sX + eX) / 2;
      sX = mX = eX = avgX;
      mY = (sY + eY) / 2;
      segments = [[sX, sY, eX, eY]];
    } 
    else if (lineType === "connection-line-vhv") 
    {
      mX = (sX + eX) / 2;
      segments = [[sX, sY, sX, mY], [sX, mY, eX, mY], [eX, mY, eX, eY]];
    } 
    else if (lineType === "connection-line-hvh") 
    {
      mY = (sY + eY) / 2;
      segments = [[sX, sY, mX, sY], [mX, sY, mX, eY], [mX, eY, eX, eY]];
    } 
    else 
    {
      segments = [[sX, sY, mX, mY], [mX, mY, eX, eY]];
    }
    middlePointEl.dataset.coordinateX = mX;
    middlePointEl.dataset.coordinateY = mY;
    const allPoints = segments.flatMap(([x1, y1, x2, y2]) => [[x1, y1], [x2, y2]]);
    const minX = Math.min(...allPoints.map(p => p[0])) - handleRadius;
    const minY = Math.min(...allPoints.map(p => p[1])) - handleRadius;
    const maxX = Math.max(...allPoints.map(p => p[0])) + handleRadius;
    const maxY = Math.max(...allPoints.map(p => p[1])) + handleRadius;
    element.style.left = `${minX}px`;
    element.style.top = `${minY}px`;
    element.style.width = `${Math.max(10, maxX - minX)}px`;
    element.style.height = `${Math.max(10, maxY - minY)}px`;
    const rel = (x, y) => [x - minX, y - minY];

    segments.forEach(([x1, y1, x2, y2], i) => 
    {
      const [rx1, ry1] = rel(x1, y1);
      const [rx2, ry2] = rel(x2, y2);
      const dx = rx2 - rx1;
      const dy = ry2 - ry1;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const segment = document.createElement('div');
      segment.className = 'line-segment';
      segment.style.position = 'absolute';
      segment.style.left = `${rx1}px`;
      segment.style.top = `${ry1 - 1}px`;
      segment.style.width = `${length}px`;
      segment.style.height = '2px';
      segment.style.background = currentLineColor;
      segment.style.transformOrigin = '0 50%';
      segment.style.transform = `rotate(${angle}deg)`;
      segment.style.zIndex = '1';
      if (i === segments.length - 1 && length > 5) 
      {
        const arrow = document.createElement('div');
        arrow.className = 'segment-arrowhead';
        arrow.style.position = 'absolute';
        arrow.style.left = `${length - 8}px`;
        arrow.style.top = `-3px`;
        arrow.style.borderLeftColor = currentLineColor;
        segment.appendChild(arrow);
      }
      element.appendChild(segment);
    });
    const [relSX, relSY] = rel(sX, sY);
    const [relMX, relMY] = rel(mX, mY);
    const [relEX, relEY] = rel(eX, eY);
    startPointEl.style.position = 'absolute';
    startPointEl.style.left = `${relSX - handleRadius}px`;
    startPointEl.style.top = `${relSY - handleRadius}px`;
    startPointEl.style.zIndex = '2';
    middlePointEl.style.position = 'absolute';
    middlePointEl.style.left = `${relMX - handleRadius}px`;
    middlePointEl.style.top = `${relMY - handleRadius}px`;
    middlePointEl.style.zIndex = '2';
    endPointEl.style.position = 'absolute';
    endPointEl.style.left = `${relEX - handleRadius}px`;
    endPointEl.style.top = `${relEY - handleRadius}px`;
    endPointEl.style.zIndex = '2';
  }




    makePointDraggable(element, startHandle, middleHandle, endHandle) 
    {
    const ATTRACTION_DISTANCE = 15;
    const getAttractedConnectionPoint = (x, y) => 
    {
        let attracted = null;
        let minDistance = ATTRACTION_DISTANCE;
        this.editor.container.querySelectorAll(".flowchart-shape:not(.connection-line) .connection-point").forEach((item, i) => 
        {
            if (item.classList.contains("locked") && item.dataset.connectedTo && item.dataset.connectedTo) 
            {
                const lockerElement = this.editor.container.querySelector(`#${item.dataset.connectedTo}`);
                if (lockerElement && (lockerElement.classList.contains('start-point') || lockerElement.classList.contains('end-point'))) return;
            }
            const cpX = parseFloat(item.dataset.coordinateX) || 0;
            const cpY = parseFloat(item.dataset.coordinateY) || 0;
            const dist = Math.sqrt((x - cpX) ** 2 + (y - cpY) ** 2);
            if (dist < minDistance) 
            {
                minDistance = dist;
                attracted = { x: cpX, y: cpY, id: item.id, cpElement: item };
            }
        });
        return attracted;
    };
    
    
    
    
    
    const attachDrag = (handle) => {
  handle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const editorRect = this.editor.container.getBoundingClientRect();

    // Get initial mouse position (absolute in editor coords)
    const startMouseX = e.pageX - editorRect.left + this.editor.container.scrollLeft;
    const startMouseY = e.pageY - editorRect.top + this.editor.container.scrollTop;

    // Get current point position (absolute from dataset)
    const currentX = parseFloat(handle.dataset.coordinateX) || 0;
    const currentY = parseFloat(handle.dataset.coordinateY) || 0;

    // Calculate offset: how far is mouse from center of point at click moment
    const offsetX = startMouseX - currentX;
    const offsetY = startMouseY - currentY;

    let currentAttractedCpElement = null;

    // Disconnect if already connected (your existing logic)
    if (handle.dataset.connectedId) {
      const oldCp = this.editor.container.querySelector(`#${handle.dataset.connectedId}`);
      if (oldCp && oldCp.dataset.connectedTo === handle.id) {
        oldCp.dataset.connectedTo = "";
        oldCp.classList.remove("locked");
      }
      handle.dataset.connectedId = ""; // Clear on drag start
    }

    const doDrag = (eMove) => {
      eMove.preventDefault();

      const mouseX = eMove.pageX - editorRect.left + this.editor.container.scrollLeft;
      const mouseY = eMove.pageY - editorRect.top + this.editor.container.scrollTop;

      // Apply offset → new position = mouse - initial click offset
      let newX = mouseX - offsetX;
      let newY = mouseY - offsetY;

      // Attraction logic (your existing getAttractedConnectionPoint)
      const attractPoint = getAttractedConnectionPoint(newX, newY);

      if (attractPoint && handle !== middleHandle) {
        newX = attractPoint.x;
        newY = attractPoint.y;
        handle.dataset.connectedId = attractPoint.id;
        currentAttractedCpElement = attractPoint.cpElement;
        currentAttractedCpElement.classList.add('overlapping', 'magnetic');
      } else {
        handle.dataset.connectedId = "";
        if (currentAttractedCpElement) {
          currentAttractedCpElement.classList.remove('overlapping', 'magnetic');
          currentAttractedCpElement = null;
        }
      }

      // Update dataset (absolute coords)
      handle.dataset.coordinateX = newX;
      handle.dataset.coordinateY = newY;

      // Redraw the line
      this.updateLine(element);
    };

    const stopDrag = (eUp) => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);

      if (currentAttractedCpElement) {
        currentAttractedCpElement.classList.remove('overlapping', 'magnetic');
        if (handle.dataset.connectedId === currentAttractedCpElement.id) {
          currentAttractedCpElement.dataset.connectedTo = handle.id;
          currentAttractedCpElement.classList.add("locked");
        }
      }

      this.updateLine(element);
      this.checkConnectionPointOverlap();

      // Optional: clean up visual feedback on other shapes
      this.editor.container.querySelectorAll(".flowchart-shape").forEach(s => {
        if (!s.classList.contains("selected")) s.classList.remove("active");
      });
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
  });
};





    attachDrag(startHandle);
    attachDrag(middleHandle);
    attachDrag(endHandle);
  }



    makeElementDraggable(element, handle) 
    {
        handle.addEventListener("mousedown", (e) => 
        {
          e.preventDefault();
          e.stopPropagation();
          const editorRect = this.editor.container.getBoundingClientRect();
          const startX = e.pageX;
          const startY = e.pageY;
          const shapesToMove = new Set();
          const initialPositions = new Map();
          const queue = [element];
          while (queue.length > 0) 
          {
            const currentShape = queue.shift();
            if (shapesToMove.has(currentShape) || currentShape.classList.contains('connection-line')) continue;
            shapesToMove.add(currentShape);
            initialPositions.set(currentShape, 
            {
              left: parseFloat(currentShape.style.left || getComputedStyle(currentShape).left || "0"),
              top: parseFloat(currentShape.style.top || getComputedStyle(currentShape).top || "0")
            });
            currentShape.querySelectorAll(".connection-point").forEach(cp => {
              const connectedCpId = cp.dataset.connectedTo;
              if (connectedCpId) 
              {
                const otherCp = this.editor.container.querySelector(`#${connectedCpId}`);
                if (otherCp) 
                {
                  const otherShape = otherCp.closest('.flowchart-shape');
                  if (otherShape && !shapesToMove.has(otherShape)) {
                    queue.push(otherShape);
                  }
                }
              }
            });
          }
          const doDrag = (eMove) => 
          {
            eMove.preventDefault();
            const deltaX = eMove.pageX - startX;
            const deltaY = eMove.pageY - startY;
            shapesToMove.forEach(shape => {
              const initialPos = initialPositions.get(shape);
              shape.style.left = `${initialPos.left + deltaX}px`;
              shape.style.top = `${initialPos.top + deltaY}px`;
              this.updateConnectionPointCoordinates(shape);
            });
            this.updateAllConnectedLines();
          };
          const stopDrag = () => 
          {
            document.removeEventListener("mousemove", doDrag);
            document.removeEventListener("mouseup", stopDrag);
            shapesToMove.forEach(shape => this.updateConnectionPointCoordinates(shape));
            this.checkConnectionPointOverlap();
            this.updateAllConnectedLines();
          };
          document.addEventListener("mousemove", doDrag);
          document.addEventListener("mouseup", stopDrag);
        });
    }


    makeElementResizable(element, handle)
    {
        handle.addEventListener("mousedown", (e) =>
        {
            e.preventDefault();
            e.stopPropagation();
            const startX = e.pageX;
            const startY = e.pageY;
            const startWidth = element.offsetWidth;
                const startHeight = element.offsetHeight;
            const doResize = (eMove) =>
            {
                element.style.width = `${startWidth + (eMove.pageX - startX)}px`;
                element.style.height = `${startHeight + (eMove.pageY - startY)}px`;
                this.updateConnectionPointCoordinates(element);
                this.updateAllConnectedLines();
            };
            
            const stopResize = () =>
            {
                document.removeEventListener("mousemove", doResize);
                document.removeEventListener("mouseup", stopResize);
                this.updateConnectionPointCoordinates(element);
                this.updateAllConnectedLines();
                this.checkConnectionPointOverlap();
                if (element.classList.contains('pentagon') || element.classList.contains('hexagon'))
                { this.updateShapeOutline(element); }
            };
            
            document.addEventListener("mousemove", doResize);
            document.addEventListener("mouseup", stopResize);
        });
        if (element.classList.contains('pentagon') || element.classList.contains('hexagon')) 
        {
          this.updateShapeOutline(element);
        }
    }

/**
   	* What it does:
   	*   - Makes a table wrapper configurable by adding click and dblclick event listeners.
   	* How does it do it:
   	*   - Removes any existing listeners, adds new ones for click (to select the table and clear selections)
   	*     and dblclick (to show the config panel), and stores the listeners for future removal.
   	* Where is it called from:
   	*   - Called from `insertTable` and `initializeExisting` to enable interaction with new
   	*     and existing tables.
	
	makeConfigurable(wrapper, extra) 
	{
        wrapper.addEventListener("dblclick", (e) =>
		{
  			e.preventDefault();
  			e.stopPropagation();

		    //this.selectedShape = shape.dataset.flowchartElement;
		    this.selectedShape = wrapper;
  			this.showConfigPanel(wrapper);
  			
  			wrapper.classList.add("selected", "show-connection-points");
  			if (!extra) 
  			{
    			const resizeHandle = wrapper.querySelector('.resize-handle');
    			if (resizeHandle) resizeHandle.style.display = 'block';
  			}
		});

		wrapper.addEventListener("click", (e) =>
		{
  			e.preventDefault();
  			e.stopPropagation();
  
		    document.querySelectorAll(".flowchart-shape").forEach(el =>
  			{
    			el.classList.remove("selected", "show-connection-points");
    			const resize = el.querySelector('.resize-handle');
    			if (resize) resize.style.display = 'none';
  			});

  			wrapper.classList.add("selected", "show-connection-points");
  			if (!extra) 
  			{
    			const resizeHandle = wrapper.querySelector('.resize-handle');
    			if (resizeHandle) resizeHandle.style.display = 'block';
  			}
		});
  	}
*/  	

serializeElementsForStorage(root)
{
    if (!root) return;

    const shapes = root.querySelectorAll(".flowchart-shape");
    shapes.forEach(shape =>
    {
        const obj = this.convertHtmlToObject(shape);
        const placeholder = this.createStoragePlaceholder(obj);
        shape.replaceWith(placeholder);
    });
}


createStoragePlaceholder(obj)
{
    const wrapper = document.createElement("div");
    wrapper.className = "editor-object-placeholder";
    wrapper.dataset.objectStorage = "json";
    wrapper.dataset.objectType = "flowchart";
    wrapper.contentEditable = "false";

    const script = document.createElement("script");
    script.type = "application/json";
    script.textContent = JSON.stringify(obj);

    wrapper.appendChild(script);
    return wrapper;
}


convertHtmlToObject(shape)
{
    const isLine = shape.classList.contains("connection-line");
    const shapeType = Array.from(shape.classList).find(cls =>
        ["rectangle", "diamond", "oval", "pentagon", "hexagon", "connection-line"].includes(cls)
    ) || "";

    const obj = {
        objectType: "flowchart",
        id: shape.id || "",
        pseudoId: shape.dataset.pseudoId || "",
        rteContainerId: shape.dataset.rteContainerId || "",
        editorProperty: shape.dataset.editorProperty || "",
        flowchartElement: shape.dataset.flowchartElement || shapeType,
        shapeType,
        isLine,
        className: shape.className || "",
        dataset: { ...shape.dataset },
        style: {
            left: shape.style.left || "",
            top: shape.style.top || "",
            width: shape.style.width || "",
            height: shape.style.height || "",
            backgroundColor: shape.style.backgroundColor || "",
            borderColor: shape.style.borderColor || "",
            position: shape.style.position || "",
            overflow: shape.style.overflow || ""
        }
    };

    if (isLine)
    {
        const start = shape.querySelector(".start-point");
        const middle = shape.querySelector(".middle-point");
        const end = shape.querySelector(".end-point");

        obj.lineData = {
            lineType: shape.dataset.lineType || "connection-line",
            lineColor: shape.dataset.lineColor || "#000000",
            start: start ? { ...start.dataset, id: start.id } : null,
            middle: middle ? { ...middle.dataset, id: middle.id } : null,
            end: end ? { ...end.dataset, id: end.id } : null
        };
    }
    else
    {
        const textDiv = shape.querySelector(".shape-text");
        const fillDiv = shape.querySelector(".shape-fill");

        obj.shapeData = {
            text: textDiv ? textDiv.innerHTML : "",
            textId: textDiv ? textDiv.id : "",
            textColor: textDiv?.style.color || "",
            fontSize: textDiv?.style.fontSize || "",
            fillColor: fillDiv?.style.backgroundColor || shape.style.backgroundColor || "",
            lineColor: shape.dataset.lineColor || shape.style.borderColor || "#000000",
            connectionPoints: Array.from(shape.querySelectorAll(".connection-point")).map(cp => ({
                id: cp.id,
                className: cp.className,
                left: cp.style.left || "",
                top: cp.style.top || "",
                dataset: { ...cp.dataset }
            }))
        };
    }

    return obj;
}



deserializeElementFromStorage(objData)
{
    if (!objData || objData.objectType !== "flowchart") return null;

    const shape = this.convertObjectToHtml(objData);
    this.attachShapeBehavior(shape);

    return shape;
}



convertObjectToHtml(obj)
{
    const wrapper = document.createElement("div");

    wrapper.id = obj.id;
    wrapper.className = obj.className || `flowchart-shape ${obj.shapeType}`;
    wrapper.contentEditable = "false";

    Object.entries(obj.dataset || {}).forEach(([key, value]) =>
    {
        wrapper.dataset[key] = value;
    });

    Object.assign(wrapper.style, obj.style || {});

    if (obj.isLine)
    {
        const startPoint = document.createElement("div");
        startPoint.className = "start-point";
        if (obj.lineData?.start)
        {
            startPoint.id = obj.lineData.start.id || `${obj.id}_start`;
            Object.entries(obj.lineData.start).forEach(([k, v]) =>
            {
                if (k !== "id") startPoint.dataset[k] = v;
            });
        }

        const middlePoint = document.createElement("div");
        middlePoint.className = "middle-point";
        if (obj.lineData?.middle)
        {
            middlePoint.id = obj.lineData.middle.id || `${obj.id}_middle`;
            Object.entries(obj.lineData.middle).forEach(([k, v]) =>
            {
                if (k !== "id") middlePoint.dataset[k] = v;
            });
        }

        const endPoint = document.createElement("div");
        endPoint.className = "end-point";
        if (obj.lineData?.end)
        {
            endPoint.id = obj.lineData.end.id || `${obj.id}_end`;
            Object.entries(obj.lineData.end).forEach(([k, v]) =>
            {
                if (k !== "id") endPoint.dataset[k] = v;
            });
        }

        wrapper.appendChild(startPoint);
        wrapper.appendChild(middlePoint);
        wrapper.appendChild(endPoint);
    }
    else
    {
        let targetParent = wrapper;

        if (obj.shapeType === "pentagon" || obj.shapeType === "hexagon")
        {
            const fillDiv = document.createElement("div");
            fillDiv.className = "shape-fill";
            fillDiv.style.position = 'absolute';
            fillDiv.style.left = '0';
            fillDiv.style.top = '0';
            fillDiv.style.width = '100%';
            fillDiv.style.height = '100%';
            fillDiv.style.backgroundColor = obj.shapeData?.fillColor || "#FFFFFF";
            wrapper.appendChild(fillDiv);
            targetParent = fillDiv;
        }

        const textDiv = document.createElement("div");
        textDiv.className = "shape-text";
        textDiv.id = obj.shapeData?.textId || `${obj.id}_innertext`;
        textDiv.innerHTML = obj.shapeData?.text || "";
        textDiv.contentEditable = "false";
        textDiv.style.color = obj.shapeData?.textColor || "";
        textDiv.style.fontSize = obj.shapeData?.fontSize || "";

        targetParent.appendChild(textDiv);

        (obj.shapeData?.connectionPoints || []).forEach(cpObj =>
        {
            const cp = document.createElement("div");
            cp.className = cpObj.className || "connection-point";
            cp.id = cpObj.id;
            cp.style.left = cpObj.left || "";
            cp.style.top = cpObj.top || "";

            Object.entries(cpObj.dataset || {}).forEach(([k, v]) =>
            {
                cp.dataset[k] = v;
            });

            wrapper.appendChild(cp);
        });
    }

    return wrapper;
}



attachShapeBehavior(shape)
{
    
    if (shape.dataset.flowchartInitialized === "true") return;
    shape.dataset.flowchartInitialized = "true";
    
    const isLine = shape.classList.contains("connection-line");

    shape.addEventListener("mouseover", () =>
    {
        if (shape.classList.contains('connection-line') || !shape.classList.contains("selected"))
        {
            shape.classList.add("show-connection-points");
        }
    });

    shape.addEventListener("mouseout", () =>
    {
        if (!shape.classList.contains("selected"))
        {
            shape.classList.remove("show-connection-points");
        }
    });

    shape.addEventListener("click", (e) =>
    {
        e.preventDefault();
        e.stopPropagation();

        document.querySelectorAll(".flowchart-shape").forEach(el =>
        {
            el.classList.remove("selected", "show-connection-points");
            const resize = el.querySelector('.resize-handle');
            if (resize) resize.style.display = 'none';
        });

        shape.classList.add("selected", "show-connection-points");
        const resizeHandle = shape.querySelector('.resize-handle');
        if (resizeHandle) resizeHandle.style.display = 'block';

        this.editor.deselectAllConfigs();
    });

    this.editor.makeElementConfigurable(shape, "", this.showConfigPanel.bind(this));

    if (isLine)
    {
        const start = shape.querySelector('.start-point');
        const middle = shape.querySelector('.middle-point');
        const end = shape.querySelector('.end-point');

        if (start && middle && end)
        {
            this.makePointDraggable(shape, start, middle, end);
            this.updateLine(shape, shape.dataset.lineColor || "#000000");
        }
    }
    else
    {
        const textDiv = shape.querySelector('.shape-text');
        if (textDiv)
        {
            this.makeElementDraggable(shape, textDiv);
        }

        this.editor.makeElementResizable(shape);

        shape.querySelectorAll('.connection-point').forEach(cp =>
        {
            cp.addEventListener("mousedown", (e) =>
            {
                e.preventDefault();
                e.stopPropagation();
                cp.classList.add("clicked");
                this.handleMagneticConnection(cp, shape, e);
                setTimeout(() => cp.classList.remove("clicked"), 300);
            });
        });

        this.updateConnectionPointCoordinates(shape);

        if (shape.classList.contains('pentagon') || shape.classList.contains('hexagon'))
        {
            this.updateShapeOutline(shape);
        }
    }

    this.updateAllConnectedLines();
    this.checkConnectionPointOverlap();
}




}