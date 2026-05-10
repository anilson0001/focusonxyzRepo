//class AnalysisHandler
class AnalysisHandler
{
     /************ [Start: Main Section] ************************/
     constructor(editor)
     {
         this.title = "Analysis";
         this.editor = editor;
         //this.variableHandler = variableHandler;
         this.selectedChart = null;
         this.chartCounter = 0;
         this.analysisCounter = 0;
         this.analyzerCounter = 0;
         this.elementCounter = 0;
         this.variableMap = new Map();
     }
     
     
    initializeExisting(container)
    {
        this.chartCounter = 0;
        if(!container) container = this.editor.container;
        container.querySelectorAll('.chart-wrapper').forEach(wrapper =>
        {
            const numMatch = wrapper.id?.match(/_(\d+)$/);
            const num = numMatch ? parseInt(numMatch[1], 10) : 0;
            this.chartCounter = Math.max(this.chartCounter, num + 1);
      
            this.selectedChart = wrapper;
            this.editor.selectedElement = wrapper;
             
            this.editor.makeElementDraggable(wrapper);
             
            const svg = wrapper.querySelector('svg');
            if (svg)
            {
                this.editor.makeElementResizable(svg);
                this.editor.makeElementConfigurable(wrapper);
                 // Redraw the chart based on stored data
                const varId = wrapper.dataset.varId;
                const varPanel = document.getElementById(varId);
                if (varPanel)
                 {
                     const elements = Array.from(varPanel.querySelectorAll('[data-variable-section="element"]'))
                         .map(el => parseFloat(el.dataset.contentSaved?.trim() || 'NaN'))
                         .filter(val => !isNaN(val));
                     this.drawChart(svg, elements, wrapper.dataset.chartType, wrapper.dataset);
                 }
                else
                {
                     console.log("warn: ", `Variable panel with ID ${varId} not found for chart redraw`);
                     // Optionally, add a placeholder text in SVG
                     const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                     text.setAttribute("x", "10");
                     text.setAttribute("y", "20");
                     text.setAttribute("font-size", "12");
                     text.textContent = "Data not available";
                     svg.appendChild(text);
                 }
             }
         });
         
         
        container.querySelectorAll("[data-editor-element='variable']").forEach((variable)=>
        {
            let vobj = {data:[]};
            let vname;
            variable.querySelectorAll("[data-variable-member]").forEach((element)=>
            {
                if(element.dataset.variableMember==="name")
                {   vname = element.dataset.variableMember;     }
                
                
                if(element.dataset.variableMember==="element")
                {   vobj.data.push(element.dataset.contentSaved);    }
                
                
                if(element.dataset.variableMember==="comments")
                {   vobj['comments'] = element.dataset.contentSaved;    }
            });
            this.variableMap.set(vname, vobj);
        });
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
        const variables = this.getAvailableVariables();
        const bodyWrapper = document.createElement("div");
        
        if(wrapper)
        {           bodyWrapper.dataset.editorProperty = wrapper?.querySelector("[data-editor-property]")?.textContent;      }
        else
        {           bodyWrapper.dataset.editorProperty = `${this.editor.propertyID}`;      }
        
        
        // Populate fields with existing data
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Analyzer Name: ";
        const nameInput = document.createElement("input");
        nameInput.dataset.panelElement = "analyzer-name";
        nameInput.value = wrapper?.dataset?.analyzerName || "";
        
       
        bodyWrapper.appendChild(nameLabel);
        bodyWrapper.appendChild(nameInput);
       
        const btnSpace = document.createElement("div");
        btnSpace.id = "btnSpace";
       
        const typeLabel = document.createElement("label");
        typeLabel.textContent = "Analyzer Type:";
        const typeSelect = document.createElement("select");
        [
            { value: '', label: 'Select Type Here' },
            { value: 'vertical-bar', label: 'Vertical Bar Chart' },
            { value: 'horizontal-bar', label: 'Horizontal Bar Chart' },
            { value: 'pie', label: 'Pie Chart' },
            { value: 'line', label: 'Line Chart' },
            { value: 'points', label: 'Points Chart' },
            { value: 'area', label: 'Area Chart' },
            { value: 'histogram', label: 'Histogram Chart' }
        ].forEach(type =>
        {
            const opt = document.createElement("option");
            opt.value = type.value;
            opt.textContent = type.label;
            if (wrapper?.dataset?.chartType === type.value)
            {
                opt.selected = true;
            }
            typeSelect.appendChild(opt);
        });
        typeSelect.dataset.panelElement = "type";
        typeSelect.dataset.chartElement = "type";
        //typeSelect.dataset.analyzerType
        typeSelect.value = wrapper?.dataset?.analyzerType || "";
        bodyWrapper.appendChild(typeLabel);
        bodyWrapper.appendChild(typeSelect);
        
        
        const varLabel = document.createElement("label");
        varLabel.textContent = "Select Variable:";
        const varSelect = document.createElement("select");
        varSelect.dataset.panelElement = "variable";
        varSelect.dataset.analyzerVariable = wrapper?.dataset?.analyzerVariable || "";
        varSelect.dataset.chartElement = "variable";
     
        
         
        if (variables.length === 0) 
        {
            const opt = document.createElement("option");
            opt.value = "";
            opt.textContent = "No variables available";
            varSelect.appendChild(opt);
            varSelect.disabled = true;
        } 
        else 
        {
            const firstOpt = document.createElement("option");
            firstOpt.textContent = "Select Variable Here";
            varSelect.appendChild(firstOpt);
            variables.forEach((v) => 
            {
                const opt = document.createElement("option");
                opt.value = v.id;
                opt.textContent = v.name;
                if (wrapper?.dataset?.variableId === v.id)
                {
                    opt.selected = true;
                }
                varSelect.appendChild(opt);
            });
        }
        varSelect.addEventListener("change", this.handleVariableSelection);
        //varSelect.value = wrapper?.dataset?.variableName || "";  
        bodyWrapper.appendChild(varLabel);
        bodyWrapper.appendChild(varSelect);
        
        const varElemPlacer = document.createElement("div");
        varElemPlacer.id = "elementsFromVarToAnalyze";
        bodyWrapper.appendChild(varElemPlacer);
        
        // Populate elements if a variable is selected (for existing charts)
        if (wrapper?.dataset?.variableName) 
        {
            const selectedVar = variables.find(v => v.id === wrapper?.dataset?.variableId);
            if (selectedVar) 
            {
                varElemPlacer.innerHTML = "";
                const varPanel = document.getElementById(selectedVar.id);
                if (varPanel) 
                {
                    varPanel.querySelectorAll(`div[data-variable-section='element']`).forEach((elem, k) =>
                    {
                        const newVarElem = document.createElement("div");
                        const newVarElemLabel = document.createElement("label");
                        newVarElemLabel.textContent = `Element ${k}: `;
                        const newVarElemInput = document.createElement("div");
                        newVarElemInput.dataset.elementSourceId = elem.id;
                        newVarElemInput.dataset.panelType = "element";
                        newVarElemInput.innerText = elem.dataset.contentSaved;
                        newVarElemInput.dataset.panelElement = "input";
                        newVarElemInput.dataset.chartElement = `Element ${k}`;
                        newVarElemInput.className = "divAsInput";
                        newVarElem.appendChild(newVarElemLabel);
                        newVarElem.appendChild(newVarElemInput);
                        varElemPlacer.appendChild(newVarElem);
                    });
                    if (document.getElementById("btnSpace"))
                    {
                        document.getElementById("btnSpace").style.display = "block";
                    } 
                    else 
                    {
                        btnSpace.style.display = "block";
                    }
                }
            }
        }
        const xAxisLabel = document.createElement("label");
        xAxisLabel.textContent = "X-Axis Name:";
        const xAxisInput = document.createElement("input");
        xAxisInput.dataset.panelElement = "xAxis";
        xAxisInput.dataset.chartElement = "xAxis";
        xAxisInput.type = "text";
        xAxisInput.value = wrapper?.dataset?.xAxisName || '';
        bodyWrapper.appendChild(xAxisLabel);
        bodyWrapper.appendChild(xAxisInput);
        const yAxisLabel = document.createElement("label");
        yAxisLabel.textContent = "Y-Axis Name:";
        const yAxisInput = document.createElement("input");
        yAxisInput.dataset.panelElement = "yAxis";
        yAxisInput.dataset.chartElement = "yAxis";
        yAxisInput.type = "text";
        yAxisInput.value = wrapper?.dataset?.yAxisName || '';
        bodyWrapper.appendChild(yAxisLabel);
        bodyWrapper.appendChild(yAxisInput);
        const chartCommentLabel = document.createElement("label");
        chartCommentLabel.textContent = "Chart Comment:";
        const chartCommentInput = document.createElement("textarea");
        chartCommentInput.rows = 3;
        chartCommentInput.value = wrapper?.dataset?.analyzerComment || '';
        chartCommentInput.dataset.chartElement = "Comments";
        chartCommentInput.dataset.panelElement = "comments";
        bodyWrapper.appendChild(chartCommentLabel);
        bodyWrapper.appendChild(chartCommentInput);
       
       
        //btnSpace.style.display = wrapper?.dataset?.varId ? "block" : "none";
        const footWrapper = document.createElement("div");
        const applyButton = document.createElement("button");
        applyButton.className = "btnPanel oPanel";
        applyButton.textContent = "Apply";
        applyButton.addEventListener("click", ()=>{ this.createObjElement(bodyWrapper, wrapper);  });
        
        footWrapper.appendChild(applyButton);
       
        if(wrapper)
        {
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            //removeButton.addEventListener("click", this.handleRemoveButton);
            removeButton.addEventListener("click", ()=>{    this.editor.removeElement(wrapper); });
            btnSpace.appendChild(removeButton);
        }
       
        //panel.appendChild(btnSpace);
 
        //return panel;
        return this.editor.panelWrapper({head:this.title, body:bodyWrapper, foot:footWrapper});
        
        //this.editor.insertIntoEditor(variableObj);  }
    }
    
    
    updateObjPanel(wrapper) 
    {
        let objReturner = {};
        this.selectedChart = wrapper;
        this.selectedElement = wrapper;
        const varId = wrapper.dataset.varId;
        const variables = this.getAvailableVariables();
        const selectedVar = variables.find(v => v.id === varId);
        if(selectedVar)
        {
            objReturner =
            {
                dataset: 
                {
                    chartName: wrapper.dataset.chartName,
                    chartType: wrapper.dataset.chartType,
                    varId: wrapper.dataset.varId,
                    varName: wrapper.dataset.varName,
                    xAxisName: wrapper.dataset.xAxisName,
                    yAxisName: wrapper.dataset.yAxisName,
                    chartComment: wrapper.dataset.chartComment
                },
                data: selectedVar.data
            };
        }
        
        return objReturner;
    }
  
  
    createObjElement(panel=null, objToBeReplaced=false) 
    {
        let selVariableArr = [];
        const wrapper = document.createElement('div');
        wrapper.id = `analyzer_${this.editor.propertyID}_${this.elementCounter++}`;        



       
       let svg;
       if(panel.querySelector('svg'))
       {    svg = panel.querySelector('svg');    }
       else
       {
            svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 300 200");  
            
            svg.setAttribute("width", "300");  
            svg.setAttribute("height", "200");  
            
            svg.dataset.editorElement = "analyzer";
            svg.dataset.element = "svg";
            svg.dataset.resizeElement = "inner";
            svg.dataset.rteContainerId = `${this.editor.propertyID}`; 
            svg.dataset.elementLayer = "inner";
            svg.dataset.familyChain = "child";
            //svg.style.position = 'absolute';
            svg.style.boxSizing = 'border-box';    
            
/*
            svg.style.pointerEvents = "none";           // ← prevents editor from activating
            svg.style.userSelect    = "none";
*/
       }

   		wrapper.dataset.editorElement = "analyzer";     
		wrapper.dataset.wrapElement = "analyzer";        
		
  		wrapper.dataset.analyzerId = panel.id;


		wrapper.dataset.resizeElement = "outer";
     
        const varTitle = panel.querySelector("[data-chart-element='variable']").options[panel.querySelector("[data-chart-element='variable']").selectedIndex].textContent;

        
        let vid = "";
        this.editor.container.querySelectorAll(`[data-content-saved='${varTitle}']`).forEach(arr=>{ if(arr.dataset?.variableMember==="name") vid = arr.dataset.parentId; });
        
        wrapper.dataset.variableName = varTitle;        
        wrapper.dataset.variableId = vid;    

  

  		wrapper.dataset.analyzerName = panel?.querySelector("[data-panel-element='analyzer-name']")?.value?.trim() || "";
  		wrapper.dataset.analyzerType = panel?.querySelector("[data-panel-element='type']")?.value || "";
  		

  		wrapper.dataset.xAxisName = panel?.querySelector("input[data-panel-element='xAxis']")?.value || "";
  		wrapper.dataset.yAxisName = panel?.querySelector("input[data-panel-element='yAxis']")?.value || "";
  
  		
 		wrapper.dataset.rteContainerId = `${this.editor.propertyID}`; 		
        wrapper.dataset.editorProperty = panel?.querySelector("[data-editor-property]")?.textContent || `${this.editor.propertyID}`;     		
  		
  		//wrapper.contentEditable = 'false'; // Wrapper is not editable  		
        wrapper.className = 'element-outer-layer';  
        wrapper.dataset.elementLayer = "outer";
        wrapper.dataset.familyChain = "parent";

  		for(let element of panel.querySelectorAll("[data-panel-type='element']"))
  		{
  		    if(element){   selVariableArr.push(Number(element.innerText));   }
  		}
  		
           
                                // Add metadata
        const name = document.createElement("div");
        const title = panel?.querySelector("[data-panel-element='analyzer-name']")?.value?.trim() || "";
        name.dataset.element = "title";
        name.dataset.contentSaved = title;
        name.id = `title_${wrapper.id}`;
        name.innerText = title;
        name.style.width = "100%";
        name.style.fontWeight = "bold";
        

        const comments = document.createElement("div");
        const comm = this.editor.configPanel.querySelector("[data-panel-element='comments']")?.value?.trim() || "";
        comments.dataset.element = "comments";
        comments.dataset.contentSaved = comm;
        comments.id = `comments_${wrapper.id}`;
        comments.innerText = comm;
        comments.style = "font-size:12px; font-style:italic";
        comments.style.width = "100%";
        
        
        this.drawChart(svg, selVariableArr, wrapper.dataset.analyzerType, wrapper.dataset);  
        
  		wrapper.prepend(name);
        wrapper.appendChild(svg);
        wrapper.appendChild(comments);
        
        
        //this.makeElementResizable(svg);

          
        this.editor.makeElementDraggable(wrapper, null, false);
        this.editor.makeElementResizable(wrapper);    
        this.editor.makeElementConfigurable(wrapper, null, this.showConfigPanel.bind(this));    
        
        if(objToBeReplaced)this.editor.removeElement(objToBeReplaced);
        
        this.editor.insertIntoEditor(wrapper);       
        
        this.editor.deselectAllConfigs();
    }
  
    /************ [End: Main Section] ************************/
    /************ [Start: Handlers Section] ************************/
    handleVariableSelection(e)
    {
        const varSelect = e.target;
        const selectedIndex = varSelect.selectedIndex;
        varSelect.querySelectorAll("option").forEach((optVar, i) => 
        {
            if (selectedIndex !== 0) 
            {
                if (selectedIndex === i)
                {
                    document.getElementById("elementsFromVarToAnalyze").innerHTML = "";
                    const objToChart = document.getElementById(`${optVar.value}`);
                    objToChart.querySelectorAll(`div[data-variable-section='element']`).forEach((elem, k) => 
                    {
                        const newVarElem = document.createElement("div");
                        const newVarElemLabel = document.createElement("label");
                        newVarElemLabel.textContent = `Element ${k}: `;
                        const newVarElemInput = document.createElement("div");
                        newVarElemInput.dataset.elementSourceId = elem.id;
                        newVarElemInput.dataset.panelType = "element";
                        newVarElemInput.innerText = elem.dataset.contentSaved;
                        newVarElemInput.dataset.panelElement = "input";
                        newVarElemInput.dataset.chartElement = `Element ${k}`;
                        newVarElemInput.className = "divAsInput";
                        newVarElem.appendChild(newVarElemLabel);
                        newVarElem.appendChild(newVarElemInput);
                        document.getElementById("elementsFromVarToAnalyze").appendChild(newVarElem);
                    });
                }
            } 
        });
    }
    
    getAvailableVariables() 
    {
        const variables = [];
        document.querySelectorAll("div[data-editor-element='variable']").forEach((variable) => 
        {
            const varName = variable.querySelector('[data-variable-member="name"]')?.dataset.contentSaved.trim() || '';
            const varComments = variable.querySelector('[data-variable-member="comments"]')?.dataset?.contentSaved?.trim() || ""
            
            const elements = Array.from(variable.querySelectorAll('[data-variable-section="element"]'))
                .map(el => el.dataset.contentSaved?.trim() || '');
                
            const varElements = elements.map(val =>
            {
                const num = parseFloat(val);
                return isNaN(num) ? null : num;
            }).filter(val => val !== null);
            
            
            if((varName)&&(varElements.length > 0))
            {   variables.push({ id:variable.id, name:varName, varElements, comments:varComments });   }
        });
        return variables;
    }
    
    drawChart(svg, data, type, dataset) 
    {
        // Clear existing content
        while (svg.firstChild) 
        {
            svg.removeChild(svg.firstChild);
        }
        const dpr = window.devicePixelRatio || 1;
        const width = parseInt(svg.getAttribute("width")) * dpr;
        const height = parseInt(svg.getAttribute("height")) * dpr;
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("transform", `scale(${1 / dpr})`);
        g.dataset.rteContainerId = `${this.editor.propertyID}`; 
        g.dataset.elementLayer = "inner";
        g.dataset.familyChain = "grandchild";
        svg.appendChild(g);
        
        if (type === 'vertical-bar') 
        {
            this.verticalBarChart(g, data, dataset, width, height);
        } 
        else if (type === 'horizontal-bar') 
        {
            this.horizontalBarChart(g, data, dataset, width, height);
        } 
        else if (type === 'pie') 
        {
            this.pieChart(g, data, dataset, width, height);
        } 
        else if (type === 'line') 
        {
            this.lineChart(g, data, dataset, width, height);
        } 
        else if (type === 'points')
        {
            this.pointsChart(g, data, dataset, width, height);
        } 
        else if (type === 'area') 
        {
            this.areaChart(g, data, dataset, width, height);
        } 
        else if (type === 'histogram') 
        {
            this.histogramChart(g, data, dataset, width, height);
        }
    }    
    
    /************ [End: Handlers Section] ************************/
    verticalBarChart(g, data, dataset, width, height) 
    {
        if (!data || data.length === 0) 
        {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "10");
            text.setAttribute("y", "20");
            text.setAttribute("font-size", "12");
            text.textContent = "No data available";
            g.appendChild(text);
            return;
        }
        const margin = { top: 40, right: 20, bottom: 50, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        const maxVal = Math.max(...data);
        const minVal = Math.min(...data, 0);
        const range = maxVal - minVal || 1;
        const barWidth = chartWidth / (data.length * 2);
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
        // Draw X-Axis
        const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        xAxis.setAttribute("x1", margin.left);
        xAxis.setAttribute("y1", height - margin.bottom);
        xAxis.setAttribute("x2", width - margin.right);
        xAxis.setAttribute("y2", height - margin.bottom);
        xAxis.setAttribute("stroke", "#000");
        g.appendChild(xAxis);
        // Draw Y-Axis
        const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        yAxis.setAttribute("x1", margin.left);
        yAxis.setAttribute("y1", margin.top);
        yAxis.setAttribute("x2", margin.left);
        yAxis.setAttribute("y2", height - margin.bottom);
        yAxis.setAttribute("stroke", "#000");
        g.appendChild(yAxis);
        // Draw X-Axis Name
        const xAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xAxisText.setAttribute("x", width / 2);
        xAxisText.setAttribute("y", height - 10);
        xAxisText.setAttribute("text-anchor", "middle");
        xAxisText.setAttribute("font-size", "12");
        xAxisText.textContent = dataset.xAxisName || 'X-Axis';
        g.appendChild(xAxisText);
        // Draw Y-Axis Name
        const yAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        yAxisText.setAttribute("transform", `translate(${margin.left - 40}, ${height / 2}) rotate(-90)`);
        yAxisText.setAttribute("text-anchor", "middle");
        yAxisText.setAttribute("font-size", "12");
        yAxisText.textContent = dataset.yAxisName || 'Value';
        g.appendChild(yAxisText);
        // Draw X-Axis Comment
        if (dataset.xAxisComment) {
            const xAxisComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
            xAxisComment.setAttribute("x", width / 2);
            xAxisComment.setAttribute("y", height - 25);
            xAxisComment.setAttribute("text-anchor", "middle");
            xAxisComment.setAttribute("font-size", "10");
            xAxisComment.textContent = dataset.xAxisComment;
            g.appendChild(xAxisComment);
        }
        // Draw Y-Axis Comment
        if (dataset.yAxisComment) {
            const yAxisComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
            yAxisComment.setAttribute("transform", `translate(${margin.left - 50}, ${height / 2}) rotate(-90)`);
            yAxisComment.setAttribute("text-anchor", "middle");
            yAxisComment.setAttribute("font-size", "10");
            yAxisComment.textContent = dataset.yAxisComment;
            g.appendChild(yAxisComment);
        }
        // Draw Chart Comment
        if (dataset.chartComment) {
            const chartComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
            chartComment.setAttribute("x", width / 2);
            chartComment.setAttribute("y", margin.top - 10);
            chartComment.setAttribute("text-anchor", "middle");
            chartComment.setAttribute("font-size", "10");
            chartComment.textContent = dataset.chartComment;
            g.appendChild(chartComment);
        }
        // Draw Bars
        data.forEach((val, i) => {
            const barHeight = (val / range) * chartHeight;
            const x = margin.left + i * barWidth * 2 + barWidth / 2;
            const y = height - margin.bottom - barHeight;
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x - barWidth / 2);
            rect.setAttribute("y", y);
            rect.setAttribute("width", barWidth);
            rect.setAttribute("height", barHeight);
            rect.setAttribute("fill", colors[i % colors.length]);
            g.appendChild(rect);
            const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            valueText.setAttribute("x", x);
            valueText.setAttribute("y", y - 5);
            valueText.setAttribute("text-anchor", "middle");
            valueText.setAttribute("font-size", "10");
            valueText.textContent = val.toFixed(1);
            g.appendChild(valueText);
        });
    }
    horizontalBarChart(g, data, dataset, width, height) {
        if (!data || data.length === 0) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "10");
            text.setAttribute("y", "20");
            text.setAttribute("font-size", "12");
            text.textContent = "No data available";
            g.appendChild(text);
            return;
        }
        const margin = { top: 40, right: 20, bottom: 50, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        const maxVal = Math.max(...data);
        const minVal = Math.min(...data, 0);
        const range = maxVal - minVal || 1;
        const barHeight = chartHeight / (data.length * 2);
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
        // Draw Y-Axis (vertical)
        const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        yAxis.setAttribute("x1", margin.left);
        yAxis.setAttribute("y1", margin.top);
        yAxis.setAttribute("x2", margin.left);
        yAxis.setAttribute("y2", height - margin.bottom);
        yAxis.setAttribute("stroke", "#000");
        g.appendChild(yAxis);
        // Draw X-Axis (horizontal)
        const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        xAxis.setAttribute("x1", margin.left);
        xAxis.setAttribute("y1", height - margin.bottom);
        xAxis.setAttribute("x2", width - margin.right);
        xAxis.setAttribute("y2", height - margin.bottom);
        xAxis.setAttribute("stroke", "#000");
        g.appendChild(xAxis);
        // Draw X-Axis Name
        const xAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xAxisText.setAttribute("x", width / 2);
        xAxisText.setAttribute("y", height - 10);
        xAxisText.setAttribute("text-anchor", "middle");
        xAxisText.setAttribute("font-size", "12");
        xAxisText.textContent = dataset.xAxisName || 'X-Axis';
        g.appendChild(xAxisText);
        // Draw Y-Axis Name
        const yAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        yAxisText.setAttribute("transform", `translate(${margin.left - 40}, ${height / 2}) rotate(-90)`);
        yAxisText.setAttribute("text-anchor", "middle");
        yAxisText.setAttribute("font-size", "12");
        yAxisText.textContent = dataset.yAxisName || 'Value';
        g.appendChild(yAxisText);
        // Draw X-Axis Comment
        if (dataset.xAxisComment) {
            const xAxisComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
            xAxisComment.setAttribute("x", width / 2);
            xAxisComment.setAttribute("y", height - 25);
            xAxisComment.setAttribute("text-anchor", "middle");
            xAxisComment.setAttribute("font-size", "10");
            xAxisComment.textContent = dataset.xAxisComment;
            g.appendChild(xAxisComment);
        }
        // Draw Y-Axis Comment
        if (dataset.yAxisComment) {
            const yAxisComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
            yAxisComment.setAttribute("transform", `translate(${margin.left - 50}, ${height / 2}) rotate(-90)`);
            yAxisComment.setAttribute("text-anchor", "middle");
            yAxisComment.setAttribute("font-size", "10");
            yAxisComment.textContent = dataset.yAxisComment;
            g.appendChild(yAxisComment);
        }
        // Draw Chart Comment
        if (dataset.chartComment) {
            const chartComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
            chartComment.setAttribute("x", width / 2);
            chartComment.setAttribute("y", margin.top - 10);
            chartComment.setAttribute("text-anchor", "middle");
            chartComment.setAttribute("font-size", "10");
            chartComment.textContent = dataset.chartComment;
            g.appendChild(chartComment);
        }
        // Draw Horizontal Bars
        data.forEach((val, i) => {
            const barWidth = (val / range) * chartWidth;
            const y = margin.top + i * barHeight * 2 + barHeight / 2;
            const x = margin.left;
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y - barHeight / 2);
            rect.setAttribute("width", barWidth);
            rect.setAttribute("height", barHeight);
            rect.setAttribute("fill", colors[i % colors.length]);
            g.appendChild(rect);
            const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            valueText.setAttribute("x", x + barWidth + 5);
            valueText.setAttribute("y", y);
            valueText.setAttribute("text-anchor", "start");
            valueText.setAttribute("font-size", "10");
            valueText.textContent = val.toFixed(1);
            g.appendChild(valueText);
        });
    }
   
    pieChart(g, data, dataset, width, height) {
        if (!data || data.length === 0) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "10");
            text.setAttribute("y", "20");
            text.setAttribute("font-size", "12");
            text.textContent = "No data available";
            g.appendChild(text);
            return;
        }
        const margin = { top: 40, right: 20, bottom: 20, left: 20 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        const total = data.reduce((a, b) => a + b, 0) || 1;
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
        const radius = Math.min(chartWidth, chartHeight) / 2;
        const centerX = margin.left + chartWidth / 2;
        const centerY = margin.top + chartHeight / 2;
        // Draw Chart Name
        const chartName = document.createElementNS("http://www.w3.org/2000/svg", "text");
        chartName.setAttribute("x", width / 2);
        chartName.setAttribute("y", margin.top - 10);
        chartName.setAttribute("text-anchor", "middle");
        chartName.setAttribute("font-size", "12");
        chartName.textContent = dataset.chartName || 'Chart';
        g.appendChild(chartName);
        let startAngle = 0;
        data.forEach((val, i) => {
            const sliceAngle = (val / total) * 2 * Math.PI;
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const largeArc = sliceAngle > Math.PI ? 1 : 0;
            const endAngle = startAngle + sliceAngle;
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                `L ${centerX} ${centerY}`
            ].join(" ");
            path.setAttribute("d", pathData);
            path.setAttribute("fill", colors[i % colors.length]);
            g.appendChild(path);
            // Label each slice
            const midAngle = startAngle + sliceAngle / 2;
            const labelX = centerX + (radius + 10) * Math.cos(midAngle);
            const labelY = centerY + (radius + 10) * Math.sin(midAngle);
            const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            labelText.setAttribute("x", labelX);
            labelText.setAttribute("y", labelY);
            labelText.setAttribute("text-anchor", "middle");
            labelText.setAttribute("font-size", "10");
            labelText.textContent = val.toFixed(1);
            g.appendChild(labelText);
            startAngle += sliceAngle;
        });
        // Draw Chart Comment
        if (dataset.chartComment) {
            const chartComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
            chartComment.setAttribute("x", width / 2);
            chartComment.setAttribute("y", height - 10);
            chartComment.setAttribute("text-anchor", "middle");
            chartComment.setAttribute("font-size", "10");
            chartComment.textContent = dataset.chartComment;
            g.appendChild(chartComment);
        }
    }
    lineChart(g, data, dataset, width, height) {
        if (!data || data.length === 0) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "10");
            text.setAttribute("y", "20");
            text.setAttribute("font-size", "12");
            text.textContent = "No data available";
            g.appendChild(text);
            return;
        }
        const margin = { top: 40, right: 20, bottom: 50, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        const maxVal = Math.max(...data);
        const minVal = Math.min(...data, 0);
        const range = maxVal - minVal || 1;
        const colors = ['#FF6384'];

        // Draw X-Axis
        const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        xAxis.setAttribute("x1", margin.left);
        xAxis.setAttribute("y1", height - margin.bottom);
        xAxis.setAttribute("x2", width - margin.right);
        xAxis.setAttribute("y2", height - margin.bottom);
        xAxis.setAttribute("stroke", "#000");
        g.appendChild(xAxis);
        // Draw Y-Axis
        const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        yAxis.setAttribute("x1", margin.left);
        yAxis.setAttribute("y1", margin.top);
        yAxis.setAttribute("x2", margin.left);
        yAxis.setAttribute("y2", height - margin.bottom);
        yAxis.setAttribute("stroke", "#000");
        g.appendChild(yAxis);
        // Draw X-Axis Name
        const xAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xAxisText.setAttribute("x", width / 2);
        xAxisText.setAttribute("y", height - 10);
        xAxisText.setAttribute("text-anchor", "middle");
        xAxisText.setAttribute("font-size", "12");
        xAxisText.textContent = dataset.xAxisName || 'X-Axis';
        g.appendChild(xAxisText);
        // Draw Y-Axis Name
        const yAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        yAxisText.setAttribute("transform", `translate(${margin.left - 40}, ${height / 2}) rotate(-90)`);
        yAxisText.setAttribute("text-anchor", "middle");
        yAxisText.setAttribute("font-size", "12");
        yAxisText.textContent = dataset.yAxisName || 'Value';
        g.appendChild(yAxisText);
        // Draw Chart Comment
        if (dataset.chartComment) {
            const chartComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
            chartComment.setAttribute("x", width / 2);
            chartComment.setAttribute("y", margin.top - 10);
            chartComment.setAttribute("text-anchor", "middle");
            chartComment.setAttribute("font-size", "10");
            chartComment.textContent = dataset.chartComment;
            g.appendChild(chartComment);
        }

        // Draw Line
        let pathData = `M ${margin.left} ${height - margin.bottom - ((data[0] - minVal) / range) * chartHeight}`;
        data.forEach((val, i) => {
            const x = margin.left + (i / (data.length - 1)) * chartWidth;
            const y = height - margin.bottom - ((val - minVal) / range) * chartHeight;
            pathData += ` L ${x} ${y}`;
        });
        const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        line.setAttribute("d", pathData);
        line.setAttribute("stroke", colors[0]);
        line.setAttribute("fill", "none");
        line.setAttribute("stroke-width", "2");
        g.appendChild(line);
    }
    pointsChart(g, data, dataset, width, height) {
        if (!data || data.length === 0) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "10");
            text.setAttribute("y", "20");
            text.setAttribute("font-size", "12");
            text.textContent = "No data available";
            g.appendChild(text);
            return;
        }
        const margin = { top: 40, right: 20, bottom: 50, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        const maxVal = Math.max(...data);
        const minVal = Math.min(...data, 0);
        const range = maxVal - minVal || 1;
        const colors = ['#FF6384'];

        // Draw X-Axis
        const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        xAxis.setAttribute("x1", margin.left);
        xAxis.setAttribute("y1", height - margin.bottom);
        xAxis.setAttribute("x2", width - margin.right);
        xAxis.setAttribute("y2", height - margin.bottom);
        xAxis.setAttribute("stroke", "#000");
        g.appendChild(xAxis);
        // Draw Y-Axis
        const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        yAxis.setAttribute("x1", margin.left);
        yAxis.setAttribute("y1", margin.top);
        yAxis.setAttribute("x2", margin.left);
        yAxis.setAttribute("y2", height - margin.bottom);
        yAxis.setAttribute("stroke", "#000");
        g.appendChild(yAxis);
        // Draw X-Axis Name
        const xAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xAxisText.setAttribute("x", width / 2);
        xAxisText.setAttribute("y", height - 10);
        xAxisText.setAttribute("text-anchor", "middle");
        xAxisText.setAttribute("font-size", "12");
        xAxisText.textContent = dataset.xAxisName || 'X-Axis';
        g.appendChild(xAxisText);
        // Draw Y-Axis Name
        const yAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        yAxisText.setAttribute("transform", `translate(${margin.left - 40}, ${height / 2}) rotate(-90)`);
        yAxisText.setAttribute("text-anchor", "middle");
        yAxisText.setAttribute("font-size", "12");
        yAxisText.textContent = dataset.yAxisName || 'Value';
        g.appendChild(yAxisText);
        // Draw Chart Comment
        if (dataset.chartComment) {
            const chartComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
            chartComment.setAttribute("x", width / 2);
            chartComment.setAttribute("y", margin.top - 10);
            chartComment.setAttribute("text-anchor", "middle");
            chartComment.setAttribute("font-size", "10");
            chartComment.textContent = dataset.chartComment;
            g.appendChild(chartComment);
        }

        // Draw Points
        data.forEach((val, i) => {
            const x = margin.left + (i / (data.length - 1)) * chartWidth;
            const y = height - margin.bottom - ((val - minVal) / range) * chartHeight;
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", "3");
            circle.setAttribute("fill", colors[0]);
            g.appendChild(circle);
        });
    }
    areaChart(g, data, dataset, width, height) {
        if (!data || data.length === 0) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "10");
            text.setAttribute("y", "20");
            text.setAttribute("font-size", "12");
            text.textContent = "No data available";
            g.appendChild(text);
            return;
        }
        const margin = { top: 40, right: 20, bottom: 50, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        const maxVal = Math.max(...data);
        const minVal = Math.min(...data, 0);
        const range = maxVal - minVal || 1;
        const colors = ['#FF6384'];

        // Draw X-Axis
        const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        xAxis.setAttribute("x1", margin.left);
        xAxis.setAttribute("y1", height - margin.bottom);
        xAxis.setAttribute("x2", width - margin.right);
        xAxis.setAttribute("y2", height - margin.bottom);
        xAxis.setAttribute("stroke", "#000");
        g.appendChild(xAxis);
        // Draw Y-Axis
        const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        yAxis.setAttribute("x1", margin.left);
        yAxis.setAttribute("y1", margin.top);
        yAxis.setAttribute("x2", margin.left);
        yAxis.setAttribute("y2", height - margin.bottom);
        yAxis.setAttribute("stroke", "#000");
        g.appendChild(yAxis);
        // Draw X-Axis Name
        const xAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xAxisText.setAttribute("x", width / 2);
        xAxisText.setAttribute("y", height - 10);
        xAxisText.setAttribute("text-anchor", "middle");
        xAxisText.setAttribute("font-size", "12");
        xAxisText.textContent = dataset.xAxisName || 'X-Axis';
        g.appendChild(xAxisText);
        // Draw Y-Axis Name
        const yAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        yAxisText.setAttribute("transform", `translate(${margin.left - 40}, ${height / 2}) rotate(-90)`);
        yAxisText.setAttribute("text-anchor", "middle");
        yAxisText.setAttribute("font-size", "12");
        yAxisText.textContent = dataset.yAxisName || 'Value';
        g.appendChild(yAxisText);
        // Draw Chart Comment
        if (dataset.chartComment) {
            const chartComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
            chartComment.setAttribute("x", width / 2);
            chartComment.setAttribute("y", margin.top - 10);
            chartComment.setAttribute("text-anchor", "middle");
            chartComment.setAttribute("font-size", "10");
            chartComment.textContent = dataset.chartComment;
            g.appendChild(chartComment);
        }

        // Draw Area
        let pathData = `M ${margin.left} ${height - margin.bottom}`;
        data.forEach((val, i) => {
            const x = margin.left + (i / (data.length - 1)) * chartWidth;
            const y = height - margin.bottom - ((val - minVal) / range) * chartHeight;
            pathData += ` L ${x} ${y}`;
        });
        pathData += ` L ${width - margin.right} ${height - margin.bottom} Z`;
        const area = document.createElementNS("http://www.w3.org/2000/svg", "path");
        area.setAttribute("d", pathData);
        area.setAttribute("fill", colors[0]);
        area.setAttribute("fill-opacity", "0.3");
        g.appendChild(area);
    }
    histogramChart(g, data, dataset, width, height) {
        if (!data || data.length === 0) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "10");
            text.setAttribute("y", "20");
            text.setAttribute("font-size", "12");
            text.textContent = "No data available";
            g.appendChild(text);
            return;
        }
        const margin = { top: 40, right: 20, bottom: 50, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        const maxVal = Math.max(...data);
        const minVal = Math.min(...data, 0);
        const range = maxVal - minVal || 1;
        const binWidth = chartWidth / 10;
        const colors = ['#FF6384'];

        // Draw X-Axis
        const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        xAxis.setAttribute("x1", margin.left);
        xAxis.setAttribute("y1", height - margin.bottom);
        xAxis.setAttribute("x2", width - margin.right);
        xAxis.setAttribute("y2", height - margin.bottom);
        xAxis.setAttribute("stroke", "#000");
        g.appendChild(xAxis);
        // Draw Y-Axis
        const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
        yAxis.setAttribute("x1", margin.left);
        yAxis.setAttribute("y1", margin.top);
        yAxis.setAttribute("x2", margin.left);
        yAxis.setAttribute("y2", height - margin.bottom);
        yAxis.setAttribute("stroke", "#000");
        g.appendChild(yAxis);
        // Draw X-Axis Name
        const xAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xAxisText.setAttribute("x", width / 2);
        xAxisText.setAttribute("y", height - 10);
        xAxisText.setAttribute("text-anchor", "middle");
        xAxisText.setAttribute("font-size", "12");
        xAxisText.textContent = dataset.xAxisName || 'X-Axis';
        g.appendChild(xAxisText);
        // Draw Y-Axis Name
        const yAxisText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        yAxisText.setAttribute("transform", `translate(${margin.left - 40}, ${height / 2}) rotate(-90)`);
        yAxisText.setAttribute("text-anchor", "middle");
        yAxisText.setAttribute("font-size", "12");
        yAxisText.textContent = dataset.yAxisName || 'Frequency';
        g.appendChild(yAxisText);
        // Draw Chart Comment
        if (dataset.chartComment) {
            const chartComment = document.createElementNS("http://www.w3.org/2000/svg", "text");
            chartComment.setAttribute("x", width / 2);
            chartComment.setAttribute("y", margin.top - 10);
            chartComment.setAttribute("text-anchor", "middle");
            chartComment.setAttribute("font-size", "10");
            chartComment.textContent = dataset.chartComment;
            g.appendChild(chartComment);
        }

        // Simple histogram (binning logic)
        const bins = Array(10).fill(0);
        const binSize = range / 10;
        data.forEach(val => {
            const binIndex = Math.min(Math.floor((val - minVal) / binSize), 9);
            bins[binIndex]++;
        });

        bins.forEach((count, i) => {
            const x = margin.left + i * binWidth;
            const y = height - margin.bottom - (count / Math.max(...bins)) * chartHeight;
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", binWidth - 2);
            rect.setAttribute("height", (count / Math.max(...bins)) * chartHeight);
            rect.setAttribute("fill", colors[0]);
            g.appendChild(rect);
        });
    }
    getVarIdByName(name) {
        const nameElems = document.querySelectorAll("div[data-variable-section='name']");
        for (let elem of nameElems) {
            if (elem.dataset.contentSaved.trim() === name.trim()) {
                return elem.closest("div[data-editor-element='variable']").id;
            }
        }
        return '';
    }
    
    

    
    makeChartDraggable(wrapper) {
        wrapper.style.position = 'absolute';
        const dragHandle = document.createElement('div');
        dragHandle.className = 'drag-handle';
        dragHandle.style.width = '100%';
        dragHandle.style.height = '10px';
        dragHandle.style.background = '#ccc';
        dragHandle.style.cursor = 'move';
        wrapper.insertBefore(dragHandle, wrapper.firstChild);
        dragHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const startX = e.pageX;
            const startY = e.pageY;
            const startLeft = parseFloat(wrapper.style.left || '0');
            const startTop = parseFloat(wrapper.style.top || '0');
            const doDrag = (eMove) => {
                wrapper.style.left = `${startLeft + (eMove.pageX - startX)}px`;
                wrapper.style.top = `${startTop + (eMove.pageY - startY)}px`;
            };
            const stopDrag = () => {
                document.removeEventListener('mousemove', doDrag);
                document.removeEventListener('mouseup', stopDrag);
            };
            document.addEventListener('mousemove', doDrag);
            document.addEventListener('mouseup', stopDrag);
        });
    }
    
    makeElementResizable(svg) 
    {
        const handle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        handle.setAttribute("class", "resize-handle chart-resize");
        handle.setAttribute("x", "290");
        handle.setAttribute("y", "190");
        handle.setAttribute("width", "10");
        handle.setAttribute("height", "10");
        handle.setAttribute("fill", "#ccc");
        handle.setAttribute("cursor", "nwse-resize");
        handle.setAttribute("style", "z-index: 10");
        svg.appendChild(handle);
        try {
            handle.addEventListener("mousedown", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const startX = e.pageX;
                const startY = e.pageY;
                const startWidth = parseInt(svg.getAttribute("width"));
                const startHeight = parseInt(svg.getAttribute("height"));
                const doResize = (eMove) => {
                    const deltaX = eMove.pageX - startX;
                    const deltaY = eMove.pageY - startY;
                    const newWidth = Math.max(50, startWidth + deltaX);
                    const newHeight = Math.max(50, startHeight + deltaY);
                    if (newWidth > 50 && newHeight > 50) {
                        svg.setAttribute("width", newWidth);
                        svg.setAttribute("height", newHeight);
                        svg.setAttribute("viewBox", `0 0 ${newWidth} ${newHeight}`);
                        handle.setAttribute("x", newWidth - 10);
                        handle.setAttribute("y", newHeight - 10);
                        const wrapper = svg.closest('.chart-wrapper');
                        if (wrapper) {
                            const varId = wrapper.dataset.varId;
                            const varPanel = document.getElementById(varId);
                            if (varPanel) {
                                const elements = Array.from(varPanel.querySelectorAll('[data-variable-section="element"]'))
                                    .map(el => parseFloat(el.dataset.contentSaved?.trim() || 'NaN'))
                                    .filter(val => !isNaN(val));
                                this.drawChart(svg, elements, wrapper.dataset.chartType, wrapper.dataset);
                            }
                        }
                    }
                };
                const stopResize = () => {
                    document.removeEventListener("mousemove", doResize);
                    document.removeEventListener("mouseup", stopResize);
                };
                document.addEventListener("mousemove", doResize);
                document.addEventListener("mouseup", stopResize);
            });
        } catch (err) {
            console.error("Error Resizing a chart: ", err);
        }
    }
}
