class Editor 
{
    /**
     * What it does:
     * - Initializes the main editor instance and its core state.
     * How does it do it:
     * - Sets default references for editor identity, toolbar, container,
     *   config panel, selection state, mode status, and selected-data cache.
     * - Then loads all dependent handlers.
     * Where is it called from:
     * - Called automatically when a new `Editor` instance is created.
     */
    constructor() 
    {
        this.propertyID = null;
        this.toolbarMenu = null;
        this.container = null;
        this.configPanel = null;
        this.selectedElement = null;
        this.modeStatus = null;
        this.dataSelected = {};
        this.initializeHandlers();
    }


    /**
     * What it does:
     * - Dynamically loads a handler script file based on its name.
     * How does it do it:
     * - Creates a `<script>` element, maps the handler name to its file path,
     *   appends the script to `document.head`, and resolves/rejects a promise
     *   depending on whether the script loads successfully.
     * Where is it called from:
     * - Called from `initializeHandlers()`.
     */
    loadHandler(handlerName) 
    {
        return new Promise((resolve, reject) => 
        {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.defer = true;

            switch (handlerName) 
            {

                case 'TableHandler':
                    script.src = 'rte_table_panel_handler_v1.js';
                    break;
                case 'FlowchartHandler':
                    script.src = 'rte_flowchart_panel_handler_v1.js';
                    break;
                case 'DrawingPanelHandler':
                    script.src = 'rte_drawing_panel_handler_v1.js';
                    break;
                case 'DetailsHandler':
                    script.src = 'rte_details_panel_handler_v1.js';
                    break;
                case 'WriterPanelHandler':
                    script.src = 'rte_writer_panel_handler_v1.js';
                    break;
                case 'VariableHandler':
                    script.src = 'rte_variable_panel_handler_v1.js';
                    break;
                case 'AnalysisHandler':
                    script.src = 'rte_analysis_panel_handler_v1.js';
                    break;
                case 'AttachmentHandler':
                    script.src = 'rte_attachment_panel_handler_v1.js';
                    break;
                case 'AIPanelHandler':
                    script.src = 'rte_ai_panel_handler_v1.js';
                    break;
                default:
                    console.warn(`Unknown handler: ${handlerName}`);
                    reject(new Error(`Unknown handler: ${handlerName}`));
                    break;
            }
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load ${handlerName}`));
            document.head.appendChild(script);
        });
    }


    /**
     * What it does:
     * - Loads all handler classes and creates their instances.
     * How does it do it:
     * - Uses `Promise.all()` to load all handler scripts first.
     * - After all scripts are available, instantiates each handler and passes
     *   the current editor instance (`this`) into them.
     * Where is it called from:
     * - Called from the `constructor()`.
     */
    initializeHandlers() 
    {
        Promise.all([
            this.loadHandler('TableHandler'),
            this.loadHandler('FlowchartHandler'),
            this.loadHandler('DrawingPanelHandler'),
            this.loadHandler('DetailsHandler'),
            this.loadHandler('WriterPanelHandler'),
            this.loadHandler('VariableHandler'),
            this.loadHandler('AnalysisHandler'),
            this.loadHandler('AIPanelHandler'),
            this.loadHandler('AttachmentHandler')
        ]).then(() => 
        {
            this.tableHandler = new TableHandler(this);
            this.flowchartHandler = new FlowchartHandler(this);
            this.drawingHandler = new DrawingPanelHandler(this);
            this.detailsHandler = new DetailsHandler(this);
            this.writerHandler = new WriterPanelHandler(this);
            this.variableHandler = new VariableHandler(this);
            this.analysisHandler = new AnalysisHandler(this);
            this.attachmentHandler = new AttachmentHandler(this);
            this.aiHandler = new AIPanelHandler(this);
            
            this.handlerRegistry = 
            {
                flowchart: this.flowchartHandler,
                table: this.tableHandler,
                drawing: this.drawingHandler,
                details: this.detailsHandler,
                writer: this.writerHandler,
                variable: this.variableHandler,
                analysis: this.analysisHandler,
                attachment: this.attachmentHandler,
                ai: this.aiHandler
            };
        });
    }




    /**
     * What it does:
     * - Initializes pre-existing editor elements already present in the DOM.
     * How does it do it:
     * - Calls `initializeExisting()` on each handler if that handler exists.
     * Where is it called from:
     * - Called after editor containers are created in edit/display mode.
     */
    initializeExistingElements() 
    {
        if (this.tableHandler) this.tableHandler.initializeExisting();
        if (this.flowchartHandler) this.flowchartHandler.initializeExisting();
        if (this.drawingHandler) this.drawingHandler.initializeExisting();
        if (this.detailsHandler) this.detailsHandler.initializeExisting();
        if (this.writerHandler) this.writerHandler.initializeExisting();
        if (this.variableHandler) this.variableHandler.initializeExisting();
        if (this.analysisHandler) this.analysisHandler.initializeExisting();
        if (this.attachmentHandler) this.attachmentHandler.initializeExisting();
        if (this.aiHandler) this.aiHandler.initializeExisting();
    }


    /**
     * What it does:
     * - Builds and returns the editor in editable mode.
     * How does it do it:
     * - Parses the incoming ID structure.
     * - Creates the outer editor container, toolbar area, toolbar controls,
     *   edit space, and configuration panel.
     * - Applies event listeners for toolbar toggling and editor resizing
     *   (expand / retract / standard).
     * - Loads sanitized data into the editable area if data exists.
     * - Initializes handlers and makes the editor configurable.
     * Where is it called from:
     * - Called when a property must be opened in edit mode.
     */
    rteReturner_EditMode(data = '', id) 
    {
        if (!id) return;

        try 
        {
            const [mode, property, actionid, blockid, elementid, sblockid, selementid] = id.split("_");

            this.propertyID = (sblockid)
                ? `${property}_${actionid}_${blockid}_${elementid}_${sblockid}_${selementid}`
                : `${property}_${actionid}_${blockid}_${elementid}`;

            const container = document.createElement("div");
            container.id = `rteContainer_${this.propertyID}`;
            container.className = 'rteContainer';
            container.dataset.pseudoActionId = actionid;
            container.dataset.element = "rte";
            container.dataset.rteMode = mode;
            container.dataset.rteContainerId = this.propertyID;

            // Keep the current property ID synced when the container is clicked.
            container.addEventListener("click", (e) => 
            {
                this.propertyID = container.dataset.rteContainerId;
            });

            let toolbarSpace = document.createElement("div");
            toolbarSpace.className = "inouttoolbar";
            toolbarSpace.dataset.rteContainerId = this.propertyID;
            toolbarSpace.dataset.rteElement = "toolbar";

            let innerToolbar = document.createElement("div");
            innerToolbar.id = `toolbarSpace_${this.propertyID}`;
            innerToolbar.className = "toolbar";
            innerToolbar.dataset.rteContainerId = this.propertyID;
            innerToolbar.style.display = "none";
            innerToolbar.style.userSelect = 'none';
            innerToolbar = this.createToolbar(innerToolbar);

            let toolbarButton = document.createElement("div");
            toolbarButton.id = `toolbarButton_${this.propertyID}`;
            toolbarButton.className = "toolbarButton";
            toolbarButton.dataset.rteContainerId = this.propertyID;

            const editorController = document.createElement("div");
            editorController.dataset.rteElement = "toolbar-controller";
            editorController.style.width = "100%";

            const editorToolbarDisplayer = document.createElement("div");
            editorToolbarDisplayer.innerHTML = `<a href="#rteContainer_${this.propertyID}" class="skipToLink" data-rte-container-id=${this.propertyID}>::::::</a>`;
            editorToolbarDisplayer.style.display = "inline-block";
            editorToolbarDisplayer.dataset.rteContainerId = this.propertyID;
            editorToolbarDisplayer.dataset.rteElement = "toolbar-enabler";

            /**
             * Opens or closes the toolbar for this specific editor.
             */
            editorToolbarDisplayer.addEventListener("click", (e) => 
            {
                e.preventDefault();
                const thisToolBar = document.getElementById(`toolbarSpace_${e.target.dataset.rteContainerId}`);
                const isOpen = thisToolBar.style.display !== "none";

                if (isOpen) 
                {
                    thisToolBar.style.display = "none";
                } 
                else 
                {
                    thisToolBar.style.display = "flex";
                }
            });

            const editorExpRet = document.createElement("div");
            editorExpRet.style.display = "inline-block";
            editorExpRet.style.float = "right";
            editorExpRet.style.marginRight = "10px";
            editorExpRet.style.width = "30%";
            editorExpRet.dataset.rteContainerId = this.propertyID;
            editorExpRet.dataset.rteElement = "toolbar-expret";

            const expandEditor = document.createElement("span");
            expandEditor.name = "arrowUp";
            expandEditor.dataset.rteContainerId = this.propertyID;
            expandEditor.innerHTML = `<span id='controller_arrowUp_${this.propertyID}' href="" class="handPointer" style="color:black">\u25b2<span class="expandToolTip">Expand</span></span>`;

            /**
             * Expands the editor to a large viewport height.
             */
            expandEditor.addEventListener("click", (e) => 
            {
                e.preventDefault();
                this.updateThisEditor(e.target);

                const thisEditorSpace = document.getElementById(`editSpace_${this.propertyID}`);
                thisEditorSpace.style.height = "calc(100vh - 330px)";
                thisEditorSpace.style.display = "block";

                document.getElementById(`controller_arrowDown_${this.propertyID}`).style.color = 'black';
                document.getElementById(`controller_arrowUp_${this.propertyID}`).style.color = 'grey';
                document.getElementById(`controller_circle_${this.propertyID}`).style.color = 'black';
            });

            const retractEditor = document.createElement("span");
            retractEditor.name = "arrowDown";
            retractEditor.dataset.rteContainerId = this.propertyID;
            retractEditor.innerHTML = `<span id='controller_arrowDown_${this.propertyID}' href="" class="handPointer" style="color:${(aux_existence(data)) ? 'black' : 'grey'}">\u25bc<span class="retractToolTip">Retract</span></span>`;

            /**
             * Retracts the editor completely.
             */
            retractEditor.addEventListener("click", (e) => 
            {
                e.preventDefault();
                this.updateThisEditor(e.target);

                const thisEditorSpace = document.getElementById(`editSpace_${this.propertyID}`);
                thisEditorSpace.style.height = "0";
                thisEditorSpace.style.display = "none";

                document.getElementById(`controller_arrowDown_${this.propertyID}`).style.color = 'grey';
                document.getElementById(`controller_arrowUp_${this.propertyID}`).style.color = 'black';
                document.getElementById(`controller_circle_${this.propertyID}`).style.color = 'black';
            });

            const normalizedEditor = document.createElement("span");
            normalizedEditor.name = "circle";
            normalizedEditor.dataset.rteContainerId = this.propertyID;
            normalizedEditor.innerHTML = `<span style='color:lightgrey'> | </span><span id='controller_circle_${this.propertyID}' class="handPointer" style="color:${(aux_existence(data)) ? 'grey' : 'black'}">\u2b24<span class="standardToolTip">Standard</span></span><span style='color:lightgrey'> | </span>`;

            /**
             * Returns the editor to standard height.
             */
            normalizedEditor.addEventListener("click", (e) => 
            {
                e.preventDefault();
                this.updateThisEditor(e.target);

                const thisEditorSpace = document.getElementById(`editSpace_${this.propertyID}`);
                thisEditorSpace.style.height = "175px";
                thisEditorSpace.style.display = "block";

                document.getElementById(`controller_arrowDown_${this.propertyID}`).style.color = 'black';
                document.getElementById(`controller_arrowUp_${this.propertyID}`).style.color = 'black';
                document.getElementById(`controller_circle_${this.propertyID}`).style.color = 'grey';
            });

            editorExpRet.appendChild(expandEditor);
            editorExpRet.appendChild(normalizedEditor);
            editorExpRet.appendChild(retractEditor);

            editorController.appendChild(editorToolbarDisplayer);
            editorController.appendChild(editorExpRet);

            toolbarButton.appendChild(editorController);

            toolbarSpace.appendChild(innerToolbar);
            toolbarSpace.appendChild(toolbarButton);

            const editorSpace = document.createElement("div");
            editorSpace.id = `editSpace_${this.propertyID}`;
            editorSpace.dataset.rteElement = "editSpace";
            editorSpace.dataset.rteMode = "edit";
            editorSpace.dataset.rteContainerId = this.propertyID;
            editorSpace.contentEditable = "true";
            editorSpace.className = "editor";
            editorSpace.style.height = (data) ? "auto" : "0";
            editorSpace.style.display = (data) ? "block" : "none";
            editorSpace.style.position = "relative";
            editorSpace.style.overflow = "auto";
            editorSpace.style.wordWrap = "break-word";
            editorSpace.style.whiteSpace = "pre-wrap";

            // Load saved editor content if any meaningful data exists.
if (data)
{
    this.loadStoredEditorContent(editorSpace, data);
}

            const configpanel = document.createElement("div");
            configpanel.id = `configPanel_${this.propertyID}`;
            configpanel.className = "config-panel";
            configpanel.contentEditable = "false";
            configpanel.style.pointerEvents = "auto";

            const configBox = document.createElement('div');
            configBox.classList.add('configurationBox');
            configBox.contentEditable = "false";
            configBox.style.pointerEvents = "auto";
            configBox.appendChild(configpanel);

            container.appendChild(toolbarSpace);
            container.appendChild(editorSpace);
            container.appendChild(configBox);

            /**
             * Prevent editor click-default behavior when interacting with
             * config-panel controls and form elements.
             */
            container.addEventListener("click", (e) => 
            {
                if (
                    e.target.closest('.config-panel') ||
                    e.target.closest('input[type="file"]') ||
                    e.target.closest('button') ||
                    e.target.closest('input') ||
                    e.target.closest('select') ||
                    e.target.closest('textarea')
                ) 
                {
                    return;
                }

                e.preventDefault();
            });

            this.modeStatus = "edit";
            this.container = container;
            this.configPanel = configpanel;

            this.initializeExistingElements();
            this.makeElementConfigurable(editorSpace);

            return container;
        } 
        catch (err) 
        {
            console.error('Error in getEditMode:', err);
            return '';
        }
    }


    /**
     * What it does:
     * - Builds and returns the editor in display-only mode.
     * How does it do it:
     * - Creates a read-only preview container and loads sanitized content into it.
     * - Initializes handlers for any displayable existing elements.
     * Where is it called from:
     * - Called when the property must be shown without edit capability.
     */
    rteReturner_DisplayMode(data = '', id) 
    {
        try 
        {
            const container = document.createElement("div");
            container.id = `rteContainer_${id}`;
            container.className = 'preview editor-display';
            container.dataset.element = "rte";
            container.dataset.rteMode = "display";

            const displaySpace = document.createElement("div");
            displaySpace.id = `displaySpace_${id}`;
            displaySpace.className = "displayer";
            displaySpace.dataset.rteMode = "display";
            displaySpace.contentEditable = "false";
            
            //displaySpace.innerHTML = this.sanitizeText(data) || '<div><br></div>';
            
            displaySpace.dataset.rteElement = "displaySpace";

            container.appendChild(displaySpace);
            
            this.loadStoredEditorContent(displaySpace, data);

            this.modeStatus = "display";
            this.container = container;

            this.initializeExistingElements();

            return container;
        } 
        catch (err) 
        {
            console.error('Error in getDisplayMode:', err);
            return '';
        }
    }


    /**
     * What it does:
     * - Returns the current sanitized HTML content of the active editor.
     * How does it do it:
     * - Finds the current editor space and sanitizes its `innerHTML`.
     * Where is it called from:
     * - Called from `getDataToSave()` and anywhere the editor content must be saved.
     */
saveEditor() 
{
    const editorSpace = this.container?.querySelector(`#editSpace_${this.propertyID}`);
    if (!editorSpace) return '';

    const clonedEditor = editorSpace.cloneNode(true);

    this.serializeEditorObjects(clonedEditor);

    return this.sanitizeText(clonedEditor.innerHTML);
}

    /**
     * What it does:
     * - Extracts the correct editor instance from an outer wrapper and returns its data.
     * How does it do it:
     * - Locates the nested wrapper and editor, updates the current editor references,
     *   and delegates the final save operation to `saveEditor()`.
     * Where is it called from:
     * - Called when the application wants to save a specific editor block.
     */
    getDataToSave(outerElement = null)
    {
        if (!outerElement) return "";
        
        let outerWrapperElement = outerElement.querySelector("[data-rte-container-id]");
        if (!outerWrapperElement) return "";
        
        let innerWrapperElement = outerWrapperElement.querySelector(".editor");
        if (!innerWrapperElement) return "";
        
        this.propertyID = innerWrapperElement.dataset.rteContainerId;
        this.container  = outerElement.querySelector(`#rteContainer_${this.propertyID}`);  
        
        return (!this.propertyID) ? "" : this.saveEditor();
    }


    /**
     * What it does:
     * - Creates the toolbar structure and attaches all toolbar actions.
     * How does it do it:
     * - Builds a config-driven toolbar from `toolbarConfig`.
     * - Supports submenus, selects, color pickers, apply buttons, and handler panels.
     * - Each action restores selection, applies a command or opens a handler panel.
     * Where is it called from:
     * - Called from `rteReturner_EditMode()`.
     */
    createToolbar(toolbar)
    {
        if (!toolbar)
        {
            console.error("Toolbar element not found!");
            return;
        }
   
        this.toolbar = toolbar;
        this.toolbar.innerHTML = "";
   
        const openPoint = "\u25BC";   // ▼
        const closePoint = "\u25C0";  // ◀
   
        const toolbarConfig = [
            { label: "Font", pointer: closePoint, submenu: [
                { label: "Font Size", command: "fontSize", isSelect: true, options: [
                    { value: "1", label: "8pt" },
                    { value: "2", label: "10pt" },
                    { value: "3", label: "12pt" },
                    { value: "4", label: "14pt" },
                    { value: "5", label: "18pt" },
                    { value: "6", label: "24pt" },
                    { value: "7", label: "36pt" },
                ]},
                { label: "Font Family", command: "fontName", isSelect: true, options: [
                    { value: "Arial", label: "Arial" },
                    { value: "Times New Roman", label: "Times New Roman" },
                    { value: "Courier New", label: "Courier New" },
                    { value: "Georgia", label: "Georgia" },
                    { value: "Verdana", label: "Verdana" },
                    { value: "Helvetica", label: "Helvetica" },
                    { value: "Comic Sans MS", label: "Comic Sans MS" },
                ]},
                { label: "Text Color", command: "foreColor", hasColorPicker: true },
                { label: "Background Color", command: "hiliteColor", hasColorPicker: true },
                { label: "Apply", isApplyButton: true }
            ]},
            { label: "Format", pointer: closePoint, submenu: [
                { label: "Bold", command: "bold" },
                { label: "Italic", command: "italic" },
                { label: "Underline", command: "underline" },
            ]},
            { label: "Edit", pointer: closePoint, submenu: [
                { label: "Cut", command: "cut" },
                { label: "Copy", command: "copy" },
                { label: "Paste", command: "paste" },
            ]},
            { label: "Align", pointer: closePoint, submenu: [
                { label: "Left", command: "justifyLeft" },
                { label: "Center", command: "justifyCenter" },
                { label: "Right", command: "justifyRight" },
                { label: "Justify", command: "justifyFull" },
            ]},
            { label: "Indent", pointer: closePoint, submenu: [
                { label: "Indent", command: "indent" },
                { label: "Outdent", command: "outdent" },
                { label: "Quote", command: "formatBlock", value: "blockquote" },
            ]},
            { label: "Table Panel", id: "table", command: "Panel", panelobject: this.tableHandler },
            { label: "Flowchart Panel", id: "flowchart", command: "Panel", panelobject: this.flowchartHandler },
            { label: "Writer Panel", id: "writer", command: "Panel", panelobject: this.writerHandler },
            { label: "Drawing Panel", id: "drawing", command: "Panel", panelobject: this.drawingHandler },
            { label: "Details Panel", id: "details", command: "Panel", panelobject: this.detailsHandler },
            { label: "Variables Panel", id: "variables", command: "Panel", panelobject: this.variableHandler },
            { label: "Analysis Panel", id: "analysis", command: "Panel", panelobject: this.analysisHandler },
            { label: "AI Panel", id: "ai", command: "Panel", panelobject: this.aiHandler },
            { label: "Attachment Panel", id: "attachment", command: "Panel", panelobject: this.attachmentHandler }
        ];
   
        toolbarConfig.forEach((item) =>
        {
            const btn = document.createElement("div");
            btn.className = "_button";
            btn.innerHTML = `${item.label}${item.submenu ? '<span class="pointer">' + item.pointer + '</span>' : ""}`;
   
            if (item.submenu)
            {
                const submenuEl = document.createElement("div");
                submenuEl.className = "submenu";
   
                let fontSizeSelect = null;
                let fontFamilySelect = null;
                let textColorInput = null;
                let bgColorInput = null;
   
                item.submenu.forEach((subItem) =>
                {
                    // Font size selector.
                    if (subItem.isSelect && subItem.command === "fontSize")
                    {
                        const selectBtn = document.createElement("div");
                        selectBtn.className = "fontFramer";
                        selectBtn.textContent = subItem.label;

                        fontSizeSelect = document.createElement("select");
                        fontSizeSelect.disabled = !this.hasSelection();

                        subItem.options.forEach(option =>
                        {
                            const opt = document.createElement("option");
                            opt.value = option.value;
                            opt.textContent = option.label;
                            fontSizeSelect.appendChild(opt);
                        });

                        fontSizeSelect.addEventListener("click", (e) => e.stopPropagation());
                        fontSizeSelect.addEventListener("change", (e) => e.stopPropagation());

                        selectBtn.appendChild(fontSizeSelect);
                        submenuEl.appendChild(selectBtn);
                    }
                    // Font family selector.
                    else if (subItem.isSelect && subItem.command === "fontName")
                    {
                        const selectBtn = document.createElement("div");
                        selectBtn.className = "fontFramer";
                        selectBtn.textContent = subItem.label;

                        fontFamilySelect = document.createElement("select");
                        fontFamilySelect.disabled = !this.hasSelection();

                        subItem.options.forEach(option =>
                        {
                            const opt = document.createElement("option");
                            opt.value = option.value;
                            opt.textContent = option.label;
                            fontFamilySelect.appendChild(opt);
                        });

                        fontFamilySelect.addEventListener("click", (e) => e.stopPropagation());
                        fontFamilySelect.addEventListener("change", (e) => e.stopPropagation());

                        selectBtn.appendChild(fontFamilySelect);
                        submenuEl.appendChild(selectBtn);
                    }
                    // Text color picker.
                    else if (subItem.hasColorPicker && subItem.command === "foreColor")
                    {
                        const colorBtn = document.createElement("div");
                        colorBtn.className = "fontFramer";
                        colorBtn.textContent = subItem.label;
                   
                        const colorInput = document.createElement("input");
                        colorInput.type = "color";
                        colorInput.value = "#000000";
                   
                        const hexDisplay = document.createElement("span");
                        hexDisplay.textContent = " #000000";
                        hexDisplay.style.marginLeft = "8px";
                        hexDisplay.style.fontFamily = "monospace";
                        hexDisplay.style.fontSize = "12px";
                        hexDisplay.style.color = "#666";
                   
                        colorInput.addEventListener("input", (e) => 
                        {
                            e.stopPropagation();
                            hexDisplay.textContent = ` ${e.target.value.toUpperCase()}`;
                        });
                   
                        colorInput.addEventListener("click", (e) => e.stopPropagation());
                        colorInput.addEventListener("mousedown", (e) => e.stopPropagation());
                   
                        colorBtn.appendChild(colorInput);
                        colorBtn.appendChild(hexDisplay);
                        submenuEl.appendChild(colorBtn);
                   
                        textColorInput = colorInput;
                    }
                    // Background/highlight color picker.
                    else if (subItem.hasColorPicker && subItem.command === "hiliteColor")
                    {
                        const colorBtn = document.createElement("div");
                        colorBtn.className = "fontFramer";
                        colorBtn.textContent = subItem.label;
                   
                        const colorInput = document.createElement("input");
                        colorInput.type = "color";
                        colorInput.value = "#FFFF00";
                   
                        const hexDisplay = document.createElement("span");
                        hexDisplay.textContent = " #FFFF00";
                        hexDisplay.style.marginLeft = "8px";
                        hexDisplay.style.fontFamily = "monospace";
                        hexDisplay.style.fontSize = "12px";
                        hexDisplay.style.color = "#666";
                   
                        colorInput.addEventListener("input", (e) => 
                        {
                            e.stopPropagation();
                            hexDisplay.textContent = ` ${e.target.value.toUpperCase()}`;
                        });
                   
                        colorInput.addEventListener("click", (e) => e.stopPropagation());
                        colorInput.addEventListener("mousedown", (e) => e.stopPropagation());
                   
                        colorBtn.appendChild(colorInput);
                        colorBtn.appendChild(hexDisplay);
                        submenuEl.appendChild(colorBtn);
                   
                        bgColorInput = colorInput;
                    }
                    // Apply button for accumulated font/color settings.
                    else if (subItem.isApplyButton)
                    {
                        const applyBtn = document.createElement("div");
                        applyBtn.className = "_button apply-font-btn";
                        applyBtn.textContent = subItem.label;
                        applyBtn.style.marginTop = "8px";
                        applyBtn.style.fontWeight = "bold";

                        applyBtn.addEventListener("click", (e) =>
                        {
                            e.stopPropagation();
                            if (!this.hasSelection() && !this.savedRange) return;
                   
                            this.restoreSelection();
                   
                            if (fontSizeSelect && fontSizeSelect.value !== fontSizeSelect.options[0].value)
                            {
                                document.execCommand("fontSize", false, fontSizeSelect.value);
                            }
                            if (fontFamilySelect && fontFamilySelect.value !== fontFamilySelect.options[0].value)
                            {
                                document.execCommand("fontName", false, fontFamilySelect.value);
                            }
                            if (textColorInput)
                            {
                                document.execCommand("foreColor", false, textColorInput.value);
                            }
                            if (bgColorInput)
                            {
                                document.execCommand("hiliteColor", false, bgColorInput.value);
                            }
                   
                            this.saveSelection();
                   
                            btn.classList.remove("show-submenu");
                            btn.querySelector('.pointer').textContent = closePoint;
                        });

                        submenuEl.appendChild(applyBtn);
                    }
                    // General formatting commands such as bold, italic, underline, etc.
                    else
                    {
                        const generalBtn = document.createElement("div");
                        generalBtn.className = "_button apply-font-btn";
                        generalBtn.textContent = subItem.label;

                        generalBtn.addEventListener("click", (e) =>
                        {
                            e.stopPropagation();
                            this.restoreSelection();

                            if (subItem.command === "formatBlock" && subItem.value)
                            {
                                this.applyCommand(subItem.command, subItem.value);
                            }
                            else
                            {
                                this.applyCommand(subItem.command);
                            }

                            this.saveSelection();

                            this.toolbar?.querySelectorAll(".show-submenu").forEach(b =>
                            {
                                b.classList.remove("show-submenu");
                                b.querySelector('.pointer').textContent = closePoint;
                            });
                        });

                        submenuEl.appendChild(generalBtn);
                    }
                });
   
                btn.appendChild(submenuEl);

                /**
                 * Handles submenu open/close and restores the selection before acting.
                 */
                btn.addEventListener("click", (e) =>
                {
                    e.stopPropagation();
                    this.restoreSelection();
               
                    const containerid = toolbar.dataset.rteContainerId;
                    const container = document.getElementById(`rteContainer_${containerid}`);
                    this.container = container;
                    this.configPanel = container.querySelector(".config-panel");
               
                    const currentlyOpen = btn.classList.contains("show-submenu");
               
                    this.toolbar?.querySelectorAll(".show-submenu").forEach(bOpen =>
                    {
                        if (bOpen !== btn)
                        {
                            bOpen.classList.remove("show-submenu");
                            bOpen.querySelector('.pointer').textContent = closePoint;
                        }
                    });
               
                    if (!currentlyOpen)
                    {
                        btn.classList.add("show-submenu");
                        btn.querySelector('.pointer').textContent = openPoint;
               
                        if (fontSizeSelect) fontSizeSelect.selectedIndex = 0;
                        if (fontFamilySelect) fontFamilySelect.selectedIndex = 0;
                        if (textColorInput) textColorInput.value = "#000000";
                        if (bgColorInput) bgColorInput.value = "#FFFF00";
               
                        const submenuEl = btn.querySelector('.submenu');
                        submenuEl.querySelectorAll('input, select').forEach(el =>
                        {
                            el.disabled = !this.hasSelection();
                        });
                    }
                    else
                    {
                        if (e.target.getAttribute("class") !== "fontFramer")
                        {
                            btn.classList.remove("show-submenu");
                            btn.querySelector('.pointer').textContent = closePoint;
                        }
                    }
                });
            }
            // Handler panel buttons.
            else if (item.panelobject)
            {
                btn.addEventListener("click", (e) =>
                {
                    e.stopPropagation();

                    const containerid = toolbar.dataset.rteContainerId;
                    const container = document.getElementById(`rteContainer_${containerid}`);

                    this.container = container;
                    this.configPanel = container.querySelector(".config-panel");

                    item.panelobject.showConfigPanel("", true);
                });
            }
   
            this.toolbar.appendChild(btn);
        });
   
        return this.toolbar;
    }
   

    /**
     * What it does:
     * - Saves the current user selection and formatting state.
     * How does it do it:
     * - Stores a cloned range in `savedRange`.
     * - Also stores a collapsed insertion range for later insertion actions.
     * - Reads formatting states with `queryCommandValue` and `queryCommandState`.
     * Where is it called from:
     * - Called after text selection or formatting-related operations.
     */
    saveSelection()
    {
        const sel = window.getSelection();

        if (sel.rangeCount === 0)
        {
            this.savedRange = null;
            this.lastInsertionRange = null;
            return;
        }
   
        const range = sel.getRangeAt(0).cloneRange();
        this.savedRange = range;
   
        const insertRange = range.cloneRange();
        insertRange.collapse(true);
        this.lastInsertionRange = insertRange;
       
        if (!this.container || !this.container.contains(range.commonAncestorContainer))
        {
            this.savedRange = null;
            return null;
        }
   
        let parent = range.commonAncestorContainer;
        if (parent.nodeType !== Node.ELEMENT_NODE)
        {
            parent = parent.parentNode;
        }
   
        const state =
        {
            selectedText: range.toString(),
            type: "text",
   
            fontSize: document.queryCommandValue("fontSize") || "",
            fontFamily: document.queryCommandValue("fontName") || "",
   
            foreColor: document.queryCommandValue("foreColor") || "",
            hiliteColor: document.queryCommandValue("hiliteColor") || "",
   
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
   
            justifyLeft: document.queryCommandState("justifyLeft"),
            justifyCenter: document.queryCommandState("justifyCenter"),
            justifyRight: document.queryCommandState("justifyRight"),
            justifyFull: document.queryCommandState("justifyFull"),
   
            indent: document.queryCommandState("indent"),
            outdent: document.queryCommandState("outdent"),
            quote: document.queryCommandState("formatBlock") === "blockquote"
        };
   
        console.log('Selection saved with formatting:', state);
        this.dataSelected = state;
        
        return state;
    }
    
    
    /**
     * What it does:
     * - Restores the last saved selection range.
     * How does it do it:
     * - Clears the browser selection and re-applies `savedRange`.
     * - Resets `savedRange` if restoration fails.
     * Where is it called from:
     * - Called before applying commands or inserting content.
     */
    restoreSelection()
    {
        if (!this.savedRange) return;

        const sel = window.getSelection();
        sel.removeAllRanges();

        try 
        {
            sel.addRange(this.savedRange.cloneRange());
        } 
        catch (e) 
        {
            console.warn('Failed to restore selection:', e);
            this.savedRange = null;
        }
    }
    
    
    /**
     * What it does:
     * - Checks whether there is an active text or element selection.
     * How does it do it:
     * - Verifies a non-collapsed text selection inside the editor container,
     *   or falls back to an already selected non-text element.
     * Where is it called from:
     * - Used throughout formatting and toolbar logic.
     */
    hasSelection()
    {
        const sel = window.getSelection();
        const textSelection = sel.rangeCount > 0 && !sel.isCollapsed && this.container?.contains(sel.getRangeAt(0).commonAncestorContainer);
        return textSelection || this.selectedElement;
    }
   
   
    /**
     * What it does:
     * - Applies a formatting or editing command to the current selection.
     * How does it do it:
     * - Restores the saved selection first.
     * - Handles special cases for paste, cut, and copy.
     * - Uses `document.execCommand()` for standard formatting commands.
     * Where is it called from:
     * - Called by toolbar actions.
     */
    applyCommand(command, value = null)
    {
        this.restoreSelection();
   
        if (command === "paste") 
        {
            document.execCommand("paste", false, value);
            this.saveSelection();
            return;
        }
   
        if (command === "cut" || command === "copy") 
        {
            if (this.savedRange || this.hasSelection()) 
            {
                document.execCommand(command, false, value);
            }
            return;
        }
   
        if (!this.hasSelection()) 
        {
            console.warn(`No selection for command: ${command}`);
            return;
        }
   
        try 
        {
            document.execCommand(command, false, value);
            this.saveSelection();
        } 
        catch (e) 
        {
            console.warn(`execCommand failed for ${command}:`, e);

            if (command === "bold") 
            {
                document.execCommand("insertHTML", false, "<strong>" + window.getSelection().toString() + "</strong>");
            } 
            else if (command === "italic") 
            {
                document.execCommand("insertHTML", false, "<em>" + window.getSelection().toString() + "</em>");
            }
        }
    }
    
    
    /**
     * What it does:
     * - Removes unnecessary outer HTML structure and returns only meaningful content.
     * How does it do it:
     * - Strips doctype/html/body wrappers.
     * - Loads the result into a temporary container.
     * - Recursively checks whether the content contains real text or meaningful elements.
     * Where is it called from:
     * - Called when loading or saving editor content.
     */
    sanitizeText(txt)
    {
        let sanitized = txt.replace(/<!DOCTYPE\s+[a-zA-Z0-9\-]+\s*[^>]*>/gi, "")
                          .replace(/<html\s*[^>]*>/gi, "")
                          .replace(/<\/html\s*>/gi, "")
                          .replace(/<body\s*[^>]*>/gi, "")
                          .replace(/<\/body\s*>/gi, "")
                          .trim();
                          
        const co = document.createElement("div"); 
        co.innerHTML = sanitized;
                          
        function hasMeaningfulContent(node)
        {
            for (const child of node.childNodes)
            {
                if (child.nodeType === Node.TEXT_NODE)
                {
                    if (child.textContent.replace(/\s+/g, "") !== "") 
                    {
                        return true;
                    }
                }
    
                if (child.nodeType === Node.ELEMENT_NODE)
                {
                    const tag = child.tagName.toLowerCase();
    
                    if (["br"].includes(tag)) continue;
    
                    if (["img", "video", "iframe", "input"].includes(tag)) 
                    {
                        return true;
                    }
    
                    if (hasMeaningfulContent(child)) 
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        return hasMeaningfulContent(co) ? sanitized : "";
    }
    
    
    /**
     * What it does:
     * - Escapes HTML special characters in a string.
     * How does it do it:
     * - Replaces special characters with their safe HTML entity versions.
     * Where is it called from:
     * - Used when content must be safely rendered as plain text.
     */
    escapeHTML(str)
    {
        return str.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#39;");
    }
    
    
    /**
     * What it does:
     * - Converts an RGB color string into hexadecimal format.
     * How does it do it:
     * - Returns the original value if already hex.
     * - Otherwise extracts RGB numeric values and converts them to hex.
     * Where is it called from:
     * - Used when normalizing color values for UI controls.
     */
    rgbToHex(color)
    {
        if (!color || color === '') return '#000000';
        if (color.startsWith('#')) return color.toUpperCase();

        const match = color.match(/\d+/g);
        if (match && match.length >= 3) 
        {
            const [r, g, b] = match.slice(0, 3).map(Number);
            return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0').toUpperCase()).join('');
        }

        return '#000000';
    }
    
    
    /**
     * What it does:
     * - Updates the current editor references from an external object.
     * How does it do it:
     * - Locates the related editor wrapper using dataset IDs and stores
     *   the matching container and config-panel references.
     * Where is it called from:
     * - Called by handlers or toolbar actions when they need to point to the active editor.
     */
    updateEditor(obj)
    {
        const objElement = document.getElementById(obj.dataset.editorProperty)
                        || document.getElementById(`edit_${obj.dataset.editorProperty}`)
                        || document.getElementById(`edit_${obj.dataset.rteContainerId}`);
       
        this.container = objElement.querySelector(".rteContainer");
        this.configPanel = objElement.querySelector(".config-panel");
       
        return this;
    }
   
   
    /**
     * What it does:
     * - Updates the current editor using the clicked element's `rteContainerId`.
     * How does it do it:
     * - Extracts the correct active element and updates `propertyID` and `container`.
     * Where is it called from:
     * - Called by expand/retract/standard editor controls.
     */
    updateThisEditor(obj)
    {
        let activeElement;
        
        if (obj.dataset.rteContainerId)
        {
            activeElement = obj;
        }
        else if (obj.parentElement.dataset.rteContainerId)
        {
            activeElement = obj.parentElement;
        }

        if (activeElement)
        {
            this.propertyID = activeElement.dataset.rteContainerId;
            this.container = document.getElementById(`rteContainer_${this.propertyID}`);   
        }
    }
   
   
    /**
     * What it does:
     * - Clears all active selected configurations and hides handlers.
     * How does it do it:
     * - Resets selected element references, requests some handlers to clear selections,
     *   hides handler visuals, clears config-panel content, and removes saved text selection.
     * Where is it called from:
     * - Called when clicking outside active elements or when resetting state.
     */
    deselectAllConfigs()
    {
        this.selectedElement = null;
        this.container?.querySelectorAll("[data-element-type='handler']")?.forEach((e) =>{   e.style.display = "none";   });

        if (this.configPanel)
        {
            this.configPanel.style.display = 'none';
            this.configPanel.innerHTML = '';
            this.configPanel = null;
           
            this.noSelection();
        }

        this.savedRange = null;
    }
    
    
    /**
     * What it does:
     * - Clears the current browser text selection.
     * How does it do it:
     * - Removes all ranges, resets `savedRange`, and clears `dataSelected`.
     * Where is it called from:
     * - Called when the editor should have no active text selection.
     */
    noSelection()
    {
        if (this.savedRange)
        {
            const sel = window.getSelection();
            sel.removeAllRanges();
            this.savedRange = null;
            this.dataSelected = {};
        }
    }
    
    
    /**
     * What it does:
     * - Removes the currently selected editor element.
     * How does it do it:
     * - Revokes object URLs for attachment content if needed.
     * - Finds the outer/inner wrapper or direct element by pseudo-ID and removes it.
     * - Clears the config/selection state afterward.
     * Where is it called from:
     * - Called by remove buttons in handler config panels.
     */
    removeElement(obj)
    {
        if (!this.selectedElement) return;
        
        const fileContent = this.selectedElement.querySelector("[data-attachment-element='file']");
        if (fileContent && fileContent.src) URL.revokeObjectURL(fileContent.src);
        if (fileContent && fileContent.objectURL) URL.revokeObjectURL(fileContent.objectURL);
        
        let deleteElement = this.container?.querySelector(`[data-outer-pseudo-id='${obj.id}']`) || 
                            this.container?.querySelector(`[data-inner-pseudo-id='${obj.id}']`) || 
                            this.container?.querySelector(`#${obj.id}`);

        deleteElement?.remove();
        
        this.deselectAllConfigs();
        this.noSelection();
    }
    
    
    /**
     * What it does:
     * - Makes an element draggable by inserting a drag handle.
     * How does it do it:
     * - Adds visual drag classes, injects a drag bar at the top, and updates
     *   the element's `left` and `top` during mouse movement.
     * Where is it called from:
     * - Called by handlers for draggable elements such as tables, drawings, etc.
     */
    makeElementDraggable(element, obj, innerPosition = true)
    {
        element.classList.remove('attachmentDisplayMode');
        element.classList.add('positionEditMode');
        element.classList.add('draggable-wrapper');
       
        const dragHandle = document.createElement("div");
        dragHandle.className = "drag-handle";
        dragHandle.classList.add(`${innerPosition ? 'dragger-in' : 'dragger-out'}`);
        dragHandle.dataset.elementType = "handler";
        dragHandle.style.width = "100%";
        dragHandle.style.height = "10px";
        dragHandle.style.background = "#ccc";
        dragHandle.style.cursor = "move";

        element.insertBefore(dragHandle, element.firstChild);

        if (!element.style.left) element.style.left = "0px";
        if (!element.style.top) element.style.top = "0px";
       
        dragHandle.addEventListener("mousedown", (e) =>
        {
            e.preventDefault();
            e.stopPropagation();

            const startX = e.pageX;
            const startY = e.pageY;
            const startLeft = parseFloat(element.style.left || "0");
            const startTop = parseFloat(element.style.top || "0");

            const doDrag = (eMove) =>
            {
                element.style.left = `${startLeft + (eMove.pageX - startX)}px`;
                element.style.top = `${startTop + (eMove.pageY - startY)}px`;
            };

            const stopDrag = () =>
            {
                document.removeEventListener("mousemove", doDrag);
                document.removeEventListener("mouseup", stopDrag);
            };

            document.addEventListener("mousemove", doDrag);
            document.addEventListener("mouseup", stopDrag);
        });
    }
    
        
    /**
     * What it does:
     * - Makes an element resizable from its bottom-right corner.
     * How does it do it:
     * - Adds a resize handle and updates outer and optional inner element sizes
     *   while respecting box-sizing and minimum width/height.
     * Where is it called from:
     * - Called by handlers for resizable elements.
     */
    makeElementResizable(element) 
    {
        if (!element.hasAttribute('data-resize-element')) return;
    
        const subelement = element.querySelector('[data-resize-element="inner"]');
        const resizable = document.createElement('div');

        resizable.className = "resize-handle";
        resizable.dataset.elementType = "handler";
        resizable.style.cssText = `
            width: 14px; 
            height: 14px;
            background: rgba(60,120,220,0.85);
            border: 2px solid white;
            border-radius: 3px;
            position: absolute;
            bottom: -5px; 
            right: -5px;
            cursor: nwse-resize;
            z-index: 20;
            box-shadow: 0 1px 5px rgba(0,0,0,0.4)`;

        let startX, startY, startOuterWidth, startOuterHeight, startInnerWidth, startInnerHeight;  
    
        function getExtras(el) 
        {
            const computed = window.getComputedStyle(el);
            const paddingX = parseFloat(computed.paddingLeft) + parseFloat(computed.paddingRight);
            const borderX = parseFloat(computed.borderLeftWidth) + parseFloat(computed.borderRightWidth);
            const paddingY = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
            const borderY = parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);

            return {
                horizontal: paddingX + borderX,
                vertical: paddingY + borderY,
                boxSizing: computed.boxSizing
            };
        }
    
        resizable.addEventListener('mousedown', (e) => 
        {
            e.stopPropagation();
            e.preventDefault();

            startX = e.clientX;
            startY = e.clientY;
            startOuterWidth = element.offsetWidth;
            startOuterHeight = element.offsetHeight;

            if (subelement) 
            {
                startInnerWidth = subelement.offsetWidth;
                startInnerHeight = subelement.offsetHeight;
            }

            document.addEventListener('mousemove', onmousemove);
            document.addEventListener('mouseup', onmouseup);
        });
    
        const onmousemove = (e) => 
        {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
    
            const outerExtras = getExtras(element);

            let newOuterCssWidth = outerExtras.boxSizing === 'border-box'
                ? Math.max(120, startOuterWidth + deltaX)
                : Math.max(120, (startOuterWidth + deltaX) - outerExtras.horizontal);

            element.style.width = newOuterCssWidth + 'px';
    
            const newOuterCssHeight = outerExtras.boxSizing === 'border-box'
                ? Math.max(80, startOuterHeight + deltaY)
                : Math.max(80, (startOuterHeight + deltaY) - outerExtras.vertical);

            element.style.height = newOuterCssHeight + 'px';
    
            if (subelement) 
            {
                const innerExtras = getExtras(subelement);

                const newInnerCssWidth = innerExtras.boxSizing === 'border-box'
                    ? Math.max(120, startInnerWidth + deltaX)
                    : Math.max(120, (startInnerWidth + deltaX) - innerExtras.horizontal);

                subelement.style.width = newInnerCssWidth + 'px';
                subelement.removeAttribute("width");
    
                const newInnerCssHeight = innerExtras.boxSizing === 'border-box'
                    ? Math.max(80, startInnerHeight + deltaY)
                    : Math.max(80, (startInnerHeight + deltaY) - innerExtras.vertical);

                subelement.style.height = newInnerCssHeight + 'px';
                subelement.removeAttribute("height");
            }
        };
    
        const onmouseup = () => 
        {
            document.removeEventListener('mousemove', onmousemove);
            document.removeEventListener('mouseup', onmouseup);
        };
      
        element.appendChild(resizable);
    }

    
    
    /**
     * What it does:
     * - Redraws a chart after its wrapper has been resized.
     * How does it do it:
     * - Reads wrapper dimensions, updates SVG size/viewBox,
     *   extracts fresh data from the related variable panel,
     *   and calls `drawChart()`.
     * Where is it called from:
     * - Called after chart wrapper resize operations.
     */
    redrawChartOnResize(svg, wrapper) 
    {
        const cssWidth  = wrapper.clientWidth;
        const cssHeight = wrapper.clientHeight;
    
        svg.setAttribute('width',  cssWidth);
        svg.setAttribute('height', cssHeight);
        svg.setAttribute('viewBox', `0 0 ${cssWidth} ${cssHeight}`);
    
        const varId = wrapper.dataset.varId;
        const chartType = wrapper.dataset.chartType || 'horizontal-bar';
    
        let data = [];
        if (varId) 
        {
            const varPanel = document.getElementById(varId);
            if (varPanel) 
            {
                data = Array.from(varPanel.querySelectorAll('[data-variable-section="element"]'))
                    .map(el => parseFloat(el.dataset.contentSaved?.trim() || 'NaN'))
                    .filter(n => !isNaN(n));
            }
        }
    
        this.drawChart(svg, data, chartType, wrapper.dataset);
    }


    /**
     * What it does:
     * - Makes editor elements selectable/configurable through click and double-click.
     * How does it do it:
     * - On click: updates active editor references, clears previous configs,
     *   and optionally runs a custom click callback.
     * - On double-click: marks the element as selected, disables direct editing,
     *   and opens the related config panel callback.
     * - Also listens for Escape to close configuration panels.
     * Where is it called from:
     * - Called on editable spaces and handler-created elements.
     */
    makeElementConfigurable(data, clickFunc, dblclickFunc)
    {
        data.addEventListener("click", (e) =>
        {
            let activeElement;
            
            if (e.target.dataset.rteContainerId)
            {
                activeElement = e.target;
            }
            else if (e.target.parentElement.dataset.rteContainerId)
            {
                activeElement = e.target.parentElement;
            }
            else
            {
                return;
            }
            
            this.propertyID = activeElement.dataset.rteContainerId;
            this.container = document.getElementById(`rteContainer_${this.propertyID}`);   
            
            if (e.target.matches("summary")) return;
            if (e.target.parentElement.classList?.contains("table-wrapper") && e.target.closest("td")) return;    
            
            this.deselectAllConfigs();       
                
            // If the clicked element belongs to a family chain, show its handlers only.
            if (activeElement.dataset.familyChain)
            {
                let newElement;

                if (activeElement.dataset.familyChain === "grandchild")
                {
                    newElement = activeElement.parentElement.parentElement;
                }
                else if (activeElement.dataset.familyChain === "child")
                {
                    newElement = activeElement.parentElement;
                }
                else
                {
                    newElement = activeElement;
                }
                
                newElement.querySelectorAll("[data-element-type='handler']").forEach((e) =>
                {
                    e.style.display = "block";
                });

                return;
            }

            e.preventDefault();
            e.stopPropagation();
   
            if (clickFunc) clickFunc(data);
        });
   
        data.addEventListener("dblclick", (e) =>
        {
            // Special handling when double-clicking a table drag handle.
            if (e.target.classList.contains("drag-handle"))
            {
                const wrapper = e.target.parentElement;
                if (wrapper.dataset.wrapElement === 'table')
                {
                    data = wrapper;
                    dblclickFunc = this.tableHandler.showConfigPanel.bind(this.tableHandler);
                }
            }
           
            if (e.target.matches("[data-action-status='displayMode']")) return;
           
            this.propertyID = e.target?.dataset?.rteContainerId ?? e.target?.parentElement?.dataset?.rteContainerId;
            this.container = document.getElementById(`rteContainer_${this.propertyID}`);

            e.stopPropagation();
            e.preventDefault();
   
            // Disable typing while configuration panel is open.
            this.container.contentEditable = "false";
   
            this.selectedElement = data;
           
            if (dblclickFunc)
            {
                dblclickFunc(data);
            }
        });
       
        document.addEventListener("keydown", (e) =>
        {
            if (e.key === "Escape") this.closeConfigPanel();
        });
    }
    
    
    /**
     * What it does:
     * - Cleans up the editor instance and all related resources.
     * How does it do it:
     * - Removes event listeners, revokes attachment object URLs,
     *   removes toolbar/container/config panel, disconnects observer,
     *   and clears all handler references and selection state.
     * Where is it called from:
     * - Called when the editor instance is no longer needed.
     */
    destroy()
    {
        if (this.selectionChangeHandler) this.container?.removeEventListener("selectionchange", this.selectionChangeHandler);
        if (this.clickHandler) this.container?.removeEventListener("click", this.clickHandler);
        if (this.mousedownHandler) this.container?.removeEventListener("mousedown", this.mousedownHandler, true);

        if (this.container)
        {
            this.container.querySelectorAll("[data-attachment-element='file']").forEach(fileContent => 
            {
                if (fileContent.src) 
                {
                    URL.revokeObjectURL(fileContent.src);
                }
            });

            this.container.remove();
            this.container = null;
        }

        if (this.toolbar) 
        {
            this.toolbar.remove();
            this.toolbar = null;
        }

        if (this.configPanel) 
        {
            this.configPanel.remove();
            this.configPanel = null;
        }
       
        observer.disconnect();
       
        this.tableHandler = null;
        this.flowchartHandler = null;
        this.drawingHandler = null;
        this.detailsHandler = null;
        this.writerHandler = null;
        this.variableHandler = null;
        this.analysisHandler = null;
        this.attachmentHandler = null;
        this.aiHandler = null;
        this.selectedElement = null;
        this.savedRange = null;
    }
   
   
    /**
     * What it does:
     * - Wraps a handler panel in a standard editor panel structure.
     * How does it do it:
     * - Builds a wrapper containing header, body, footer, separators,
     *   and a close button that deselects configurations.
     * Where is it called from:
     * - Called by handlers when rendering config UI.
     */
    panelWrapper(obj)
    {
        const wrapper = document.createElement("div");
       
        const liner = document.createElement("hr");
        liner.className = "editorPanelLiner";
       
        const header = document.createElement("div");
        header.innerText = obj.head;
        header.className = "editorPanelWrapper_Head";
       
        wrapper.appendChild(header);

        if (aux_existence(obj.body.outerHTML))
        {
            wrapper.appendChild(document.createElement("hr"));
            wrapper.appendChild(obj.body);
        }

        wrapper.appendChild(document.createElement("hr"));
        
        const closePanel = document.createElement("button");
        closePanel.className = "btnPanel oPanel";
        closePanel.textContent = "Close Configuration";
        closePanel.addEventListener("click", () =>
        {
            this.deselectAllConfigs();
        });

        wrapper.appendChild(obj.foot);
        wrapper.appendChild(closePanel);
                       
        return wrapper;
    }



    /**
     * What it does:
     * - Closes the current configuration panel and restores editing.
     * How does it do it:
     * - Hides and clears the config panel, then re-enables content editing.
     * Where is it called from:
     * - Called when Escape is pressed or config panels are closed manually.
     */
    closeConfigPanel()
    {
        if (!this.configPanel) return;

        this.configPanel.style.display = "none";
        this.configPanel.innerHTML = "";

        if (this.container) this.container.contentEditable = "true";
    }



    /**
     * What it does:
     * - Inserts a new element into the editor.
     * How does it do it:
     * - If `addToTop` is true, wraps the element in outer/inner wrappers
     *   so it can visually float without pushing normal text flow.
     * - Otherwise appends directly into the editor.
     * - Restores the caret to the end afterward.
     * Where is it called from:
     * - Called by handlers when inserting objects into the editor.
     */
    insertIntoEditor(element, addToTop = true)
    {
        const editorSpace = this.container.querySelector('.editor');
        if (!editorSpace) return;
        
        if (addToTop) 
        {
            const outerWrapper = document.createElement('div');
            outerWrapper.dataset.outerPseudoId = element.id;
            outerWrapper.dataset.rteContainerId = element.dataset.rteContainerId;
            outerWrapper.dataset.familyChain = "root";
            outerWrapper.style.cssText = `
                position: relative;
                height: 0;
                margin: 0;
                padding: 0;
                overflow: visible;
                pointer-events: none;           
            `;
        
            const innerWrapper = document.createElement('div');
            innerWrapper.dataset.innerPseudoId = element.id;
            innerWrapper.style.cssText = `
                position: absolute;
                z-index: 10;
                pointer-events: auto;           
            `;
            
            innerWrapper.appendChild(element);
            outerWrapper.appendChild(innerWrapper);   
            
            editorSpace.prepend(outerWrapper);
        } 
        else 
        {
            editorSpace.appendChild(element);
        }
        
        this.restoreCaretToEnd(editorSpace);
    }
    
    
    /**
     * What it does:
     * - Places the text caret at the end of the editor content.
     * How does it do it:
     * - Finds the deepest last node and collapses a range at its end.
     * - Falls back to selecting the end of the editor contents.
     * - Focuses the editor afterward.
     * Where is it called from:
     * - Called after inserting elements into the editor.
     */
    restoreCaretToEnd(editorSpace) 
    {
        const range = document.createRange();
        const sel = window.getSelection();
    
        let lastNode = editorSpace.lastChild;
        while (lastNode && lastNode.nodeType === Node.ELEMENT_NODE && lastNode.lastChild) 
        {
            lastNode = lastNode.lastChild;
        }
    
        if (lastNode && lastNode.nodeType === Node.TEXT_NODE) 
        {
            range.setStart(lastNode, lastNode.length);
            range.setEnd(lastNode, lastNode.length);
        } 
        else 
        {
            range.selectNodeContents(editorSpace);
            range.collapse(false);
        }
    
        sel.removeAllRanges();
        sel.addRange(range);
    
        editorSpace.focus();
    }
    
    
    
serializeEditorObjects(root)
{
    if (!root) return root;

    const handlers = Object.values(this.handlerRegistry || {}).filter(Boolean);

    handlers.forEach(handler =>
    {
        if (typeof handler.serializeElementsForStorage === "function")
        {
            handler.serializeElementsForStorage(root);
        }
    });

    return root;
}



hydrateEditorObjects(root)
{
    if (!root) return root;

    const placeholders = root.querySelectorAll("[data-object-storage='json']");
    placeholders.forEach(placeholder =>
    {
        const objectType = placeholder.dataset.objectType;
        const handler = this.handlerRegistry?.[objectType];
        if (!handler || typeof handler.deserializeElementFromStorage !== "function") return;

        const jsonScript = placeholder.querySelector("script[type='application/json']");
        if (!jsonScript) return;

        try
        {
            const objData = JSON.parse(jsonScript.textContent);
            const rebuiltElement = handler.deserializeElementFromStorage(objData);

            if (rebuiltElement)
            {
                placeholder.replaceWith(rebuiltElement);
            }
        }
        catch (err)
        {
            console.error(`Failed to hydrate ${objectType}:`, err);
        }
    });

    return root;
}


loadStoredEditorContent(targetElement, data)
{
    if (!targetElement) return;

    targetElement.innerHTML = this.sanitizeText(data) || '<div><br></div>';
    this.hydrateEditorObjects(targetElement);
}

}

/*
[editor]
class Editor
{
    constructor()
    {...}
    
    loadHandler()
    {...}
    
    initializeHandlers()
    {...}

    initializeExistingElements()
    {...}

    rteReturner_EditMode()
    {...}

    rteReturner_DisplayMode()
    {...}

    saveEditor()
    {...}

    createToolbar()
    {...}
   
    saveSelection()
    {...}
    
    restoreSelection()
    {...}
    
    hasSelection()
    {...}
   
    applyCommand()
    {...}

    sanitizeText()
    {...}
    
    escapeHTML()
    {...}
    
    rgbToHex()
    {...}
    
    updateEditor()
    {...}
   
    deselectAllConfigs()
    {...}

    noSelection()
    {...}

    removeElement()
    {...}

    makeElementDraggable()
    {...}

    makeElementResizable()
    {...}

    redrawChartOnResize()
    {...}

    makeElementConfigurable()
    {...}

    destroy()
    {...}

    panelWrapper()
    {...}

    closeConfigPanel()
    {...}

    insertIntoEditor()
    {...}
}
[/editor]

*/
