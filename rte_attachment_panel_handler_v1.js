
class AttachmentHandler 
{
    constructor(editor) 
    {
        this.title = "Attachments";
        this.editor = editor;
        this.elementCounter = 0;
        this.attachCounter = 0;
        this.attachFolders;
        /*
        this.attachFolders = Map.groupBy(apps.att, item => item.folder);      
            excellent option but it only works for modern versions
        */
    }


    initializeExisting() 
    {
        this.editor.container.querySelectorAll(".attachment-item").forEach((wrapper) => 
        {
            const wrapperExtension = wrapper.querySelector("[data-attachment-element='file']")?.src;
            if (wrapperExtension && !wrapperExtension.includes("null"))
            {
                const numMatch = wrapper.id?.match(/_(\d+)$/);
                const num = numMatch ? parseInt(numMatch[1], 10) : 0;
                this.elementCounter = Math.max(this.elementCounter, num + 1);

                // Ensure back-mode images are moved to the start
                if (wrapper.dataset.layer === "back") 
                {
                    this.editor.insertIntoEditor(wrapper);
                }
            }
        });
    }



    showConfigPanel(wrapper, callFromToolbar) 
    {
        if(!this.editor.configPanel) 
            this.editor = this.editor.updateEditor(wrapper);   
        this.editor.configPanel.innerHTML = '';
        
        this.editor.configPanel.appendChild(callFromToolbar ? this.initialObjPanel() : this.updateObjPanel(wrapper));
        this.editor.configPanel.style.display = "block";
    }



    initialObjPanel() 
    {
        this.attachFolders = this.handleAttachmentFolder();
        
        const bodyWrapper = document.createElement("div");
        bodyWrapper.id = `attachment-wrapper_${(this.attachCounter + 1)}`;
        bodyWrapper.className = "attachment-wrapper";

        const newFileInput = document.createElement("input");
        newFileInput.type = "file";
        newFileInput.style.display = "none"; // Hide input for better UX
        
        
        const NameDisplay = document.createElement("div");
        
const fileNameContent = document.createElement("span");
fileNameContent.textContent = "Original File Name: ";

        const fileNameDisplay = document.createElement("span");
        fileNameDisplay.textContent = "No file chosen";
        
        //fileNameDisplay.style.marginLeft = "10px";
        
        NameDisplay.appendChild(fileNameContent);
        NameDisplay.appendChild(fileNameDisplay);
        
        
        const footWrapper = document.createElement("div");
        
        const chooseBtn = document.createElement("button");
        
        chooseBtn.textContent = "Get File to Attach";
        chooseBtn.type = "button";
        chooseBtn.className = "btnPanel choose-file-btn";
        chooseBtn.addEventListener("click", (e) => 
        {
            newFileInput.click();            
            //e.preventDefault();            


        });
        
        const fileSelector = document.createElement("div");
        const selectorElem = document.createElement("select");
        selectorElem.className = "attachSelector";
        selectorElem.id = `${bodyWrapper.id}_selector`;
        const firstOption = document.createElement("option");
        firstOption.textContent = "---[Select Existing File]---";
        selectorElem.appendChild(firstOption);
        
        this.attachFolders.forEach((value, key) => 
        {
            const optgr = document.createElement("optgroup");
            optgr.label = key;
            selectorElem.appendChild(optgr);   
            
            for(let optArr of value)
            {
                const {original_name:oname, title} = optArr;
                const opt = document.createElement("option");
                opt.textContent = title||oname;
                opt.value = title||oname;
                opt.dataset.objContent = JSON.stringify(optArr);
                
                selectorElem.appendChild(opt);
            }
        });
        
        selectorElem.addEventListener("change", (e)=>
        {
            const selected = e.target;
            const selectedindex = selected.selectedIndex;
            const selectedContent = selected.options[selectedindex];
            const selectedObject = selectedContent.dataset.objContent;
            const obj = JSON.parse(selectedObject);

            const aliasInput = document.createElement("input");
            aliasInput.type = obj.title? "hidden": "text";
            aliasInput.id = `attachment_${(this.attachCounter + 1)}_aliasname`;
            aliasInput.value = obj.title;
            aliasInput.placeholder = "Enter File Title";

            bodyWrapper.appendChild(aliasInput);
            
            const folder = document.createElement("div");
            const folderLabel =  document.createElement("label");
            folderLabel.textContent = "Folder Name (Use '@' to separate folders )";
            const folderInput =  document.createElement("input");
            folderInput.id = `attachment_${(this.attachCounter + 1)}_folderinput`;
            folderInput.value = obj.folder;
            folderInput.placeholder = "Enter storage folders";
            
            bodyWrapper.appendChild(folderLabel);
            bodyWrapper.appendChild(folderInput);            
            

            const commentLabel = document.createElement("label");
            commentLabel.textContent = "Comments:";
            const commentInput = document.createElement("textarea");
            //commentInput.rows = 3;
            commentInput.placeholder = "Enter attachment comments";
            commentInput.id = `attachment_${(this.attachCounter + 1)}_comments`;
            commentInput.value = obj.comments;

            bodyWrapper.appendChild(commentLabel);
            bodyWrapper.appendChild(commentInput);

            const uploadBtn = document.createElement("button");
            uploadBtn.className = "btnPanel oPanel";
            uploadBtn.textContent = "Load To Editor";
            //uploadBtn.type = "button";
            uploadBtn.dataset.content = JSON.stringify(obj);
            uploadBtn.addEventListener("click", () => 
            {
                const obj = JSON.parse(uploadBtn.dataset.content);
                const objURL = `/focus_Storage/${apps.uniqueData.uDB}/${obj.original_name}`;
            
                fetch(objURL)
                    .then(res =>
                    {
                        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch attachment`);
                        return res.blob();
                    })
                    .then(blob => 
                    {
                        // Create fakeFile with blob attached
                        const fakeFile = 
                        {
                            name: obj.original_name || obj.title || "unknown",
                            type: blob.type || obj.mime_type || "application/octet-stream",
                            size: blob.size,
                            title: obj.title || "",
                            folder: obj.folder || "",
                            comments: obj.comments || "",
                            blob: blob  // ← critical: attach the real blob
                        };
            
                        this.createObjElement(fakeFile, obj);

                    })
                    .catch(err =>
                    {
                        console.error("Failed to load existing attachment:", err);
                        alert("Could not load the selected file. It may be missing or inaccessible.");
                    });
            });



            footWrapper.appendChild(uploadBtn);
        });
        fileSelector.appendChild(selectorElem);



        newFileInput.addEventListener("change", (e) => 
        {
            fileNameDisplay.textContent = e.target.files[0]?.name || "No file chosen";

            const aliasLabel = document.createElement("label");
            aliasLabel.textContent = "File Title";
            const aliasInput = document.createElement("input");
            aliasInput.id = `attachment_${(this.attachCounter + 1)}_aliasname`;

            bodyWrapper.appendChild(aliasLabel);
            bodyWrapper.appendChild(aliasInput);
            
            
            const fileOrientation = document.createElement("div");
            const orientationLabel =  document.createElement("label");
            orientationLabel.textContent = "Orientation Selector";
            const orientationSelector =  document.createElement("select");
            orientationSelector.id = `attachment_${(this.attachCounter + 1)}_orientationselector`;
            orientationSelector.innerHTML = "<option value='portrait'>Portrait</option><option value='landscape'>Landscape</option>";
            
            fileOrientation.appendChild(orientationLabel);
            fileOrientation.appendChild(orientationSelector);
            bodyWrapper.appendChild(fileOrientation);  
                        
            
            const folder = document.createElement("div");
            const folderLabel =  document.createElement("label");
            folderLabel.textContent = "Folder Name (Note: Use '@' to separate folders )";
            const folderInput =  document.createElement("input");
            folderInput.id = `attachment_${(this.attachCounter + 1)}_folderinput`;
            
            bodyWrapper.appendChild(folderLabel);
            bodyWrapper.appendChild(folderInput);            
            
            
            const commentLabel = document.createElement("label");
            commentLabel.textContent = "Comments:";
            const commentInput = document.createElement("textarea");
            commentInput.rows = 3;
            commentInput.placeholder = "Enter attachment comments";
            commentInput.id = `attachment_${(this.attachCounter + 1)}_comments`;

            bodyWrapper.appendChild(commentLabel);
            bodyWrapper.appendChild(commentInput);

            const uploadBtn = document.createElement("button");
            uploadBtn.textContent = "Load To Editor";
            uploadBtn.type = "button";
            uploadBtn.addEventListener("click", (ee) => 
            {
                if (!newFileInput.files[0]) 
                {
                    alert("Please select a file to upload.");
                    return;
                }
                newFileInput.dataset.elementAlias = document.getElementById(`attachment_${(this.attachCounter + 1)}_aliasname`).value.trim();
                newFileInput.dataset.elementFolder = document.getElementById(`attachment_${(this.attachCounter + 1)}_folderinput`).value.trim();
                newFileInput.dataset.elementOrientation = document.getElementById(`attachment_${(this.attachCounter + 1)}_orientationselector`).value.trim();
                newFileInput.dataset.elementComments = document.getElementById(`attachment_${(this.attachCounter + 1)}_comments`).value.trim();
                
                this.handleFileUpload(newFileInput);
            });


            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Cancel";
            cancelBtn.type = "button";
            cancelBtn.addEventListener("click", () => 
            {
                this.editor.deselectAllConfigs();
                this.editor.noSelection();
            });
            

            bodyWrapper.appendChild(uploadBtn);
            bodyWrapper.appendChild(cancelBtn);
        });



        bodyWrapper.appendChild(chooseBtn);
        bodyWrapper.appendChild(NameDisplay);
        bodyWrapper.appendChild(fileSelector);       
        bodyWrapper.appendChild(newFileInput);


		return this.editor.panelWrapper({head:this.title, body:bodyWrapper, foot:footWrapper});
    }



    updateObjPanel(wrapper) 
    {
        const bodyWrapper = document.createElement("div");
        bodyWrapper.className = "attachment-config";

        if (wrapper) 
        {   this.editor.selectedElement = wrapper; }
        else
        {   return; }

        const aliasLabel = document.createElement("label");
        aliasLabel.textContent = "File Titled: ";
        const aliasInput = document.createElement("input");
        aliasInput.type = "text";
        aliasInput.dataset.element = "title";
        aliasInput.value = wrapper?.querySelector("[data-element='title']")?.dataset.contentSaved?.trim() || "";

        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Original File Name: ";
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.disabled = true;
        nameInput.value = wrapper?.dataset.attachmentName || "";

        const typeLabel = document.createElement("label");
        typeLabel.textContent = "File Type:";
        const typeInput = document.createElement("input");
        typeInput.type = "text";
        typeInput.disabled = true;
        typeInput.value = wrapper?.dataset.attachmentType || "";

        const sizeLabel = document.createElement("label");
        sizeLabel.textContent = "File Size:";
        const sizeInput = document.createElement("input");
        sizeInput.type = "text";
        sizeInput.disabled = true;
        sizeInput.value = wrapper ? `${(parseInt(wrapper.dataset.attachmentSize) / 1024).toFixed(2)} KB` : "Unknown";

        const commentLabel = document.createElement("label");
        commentLabel.textContent = "Comments:";
        const commentInput = document.createElement("textarea");
        commentInput.rows = 3;
        commentInput.dataset.element = "comments";
        commentInput.placeholder = "Enter attachment comments";
        commentInput.value = wrapper?.querySelector("[data-element='comments']")?.dataset.contentSaved?.trim() || "";


   const layerLabel = document.createElement("label");
        layerLabel.textContent = "Layering:";
        const layerSelect = document.createElement("select");
        layerSelect.dataset.element = "layer";
        const layerOptions = 
        [
            { value: "inline", label: "In Between Text" },
            { value: "front", label: "In Front of Text" },
            { value: "back", label: "Behind Text" }
        ];
        layerOptions.forEach(option => 
        {
            const opt = document.createElement("option");
            opt.value = option.value;
            opt.textContent = option.label;
            if (wrapper?.dataset.layer === option.value) 
            {
                opt.selected = true;
            }
            layerSelect.appendChild(opt);
        });
        



        bodyWrapper.appendChild(aliasLabel);
        bodyWrapper.appendChild(aliasInput);
        bodyWrapper.appendChild(nameLabel);
        bodyWrapper.appendChild(nameInput);
        bodyWrapper.appendChild(typeLabel);
        bodyWrapper.appendChild(typeInput);
        bodyWrapper.appendChild(sizeLabel);
        bodyWrapper.appendChild(sizeInput);
        bodyWrapper.appendChild(commentLabel);
        bodyWrapper.appendChild(commentInput);
        
        bodyWrapper.appendChild(layerLabel);
        bodyWrapper.appendChild(layerSelect);        
        
        
        this.nameInput = nameInput;
        this.typeInput = typeInput;
        this.sizeInput = sizeInput;
        this.commentInput = commentInput;


        const footWrapper = document.createElement("div");
        const applyButton = document.createElement("button");
        applyButton.className = "btnPanel oPanel";
        applyButton.textContent = "Update";
        applyButton.addEventListener("click", () => this.applyAttachmentConfig(bodyWrapper));

        const removeButton = document.createElement("button");
        removeButton.className = "btnPanel oPanel";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => this.editor.removeElement(wrapper));
        
        footWrapper.appendChild(applyButton);
        footWrapper.appendChild(removeButton);


        //return newWrapper;
        return this.editor.panelWrapper({head:this.title, body:bodyWrapper, foot:footWrapper});
    }



    createObjElement(fileOrFake, obj=null)
    {
        const element = document.createElement("div");
        element.id = `attachment_${this.editor.propertyID}_${this.elementCounter++}`;        


        // Use real File/Blob if available, otherwise fake one
        const actualBlob = fileOrFake.blob || fileOrFake; // fileOrFake is either File or our fake object with .blob
        
        element.dataset.editorElement = "attachment";    
		element.dataset.wrapElement = "attachment";  
		
        // Extract metadata safely
        element.dataset.attachmentName = fileOrFake.name || "unknown";
        element.dataset.attachmentType = fileOrFake.type || "application/octet-stream";
        element.dataset.attachmentSize = fileOrFake.size || fileOrFake.blob?.size || 0;

        element.dataset.layer = "inline";
        element.dataset.resizeElement = "outer";
        element.dataset.elementLayer = "outer";
        element.dataset.familyChain = "parent";
        
        
        

		element.dataset.rteContainerId = this.editor.propertyID;
        element.dataset.editorProperty = this.editor.propertyID; 
        
        element.className = "element-outer-layer";      
    
        // This is the key: always create object URL from the actual Blob/File
        const objectURL = URL.createObjectURL(actualBlob);
    
        let fileContent;
        const mimeType = fileOrFake.type || fileOrFake.blob?.type || "";
    
        if (mimeType.startsWith("image/"))
        {
            fileContent = document.createElement("img");
            fileContent.src = objectURL;
            fileContent.addEventListener("click", (e)=>
            {
                const element = e.target;
    			const dHandler = element.querySelector(".drag-handle") || element.parentElement.querySelector(".drag-handle") || "";
    			const rHandler = element.querySelector(".resize-handle") || element.parentElement.querySelector(".resize-handle") || "";
    			
    			if(dHandler) dHandler.style.display = "block";
    			if(rHandler) rHandler.style.display = "block";                
            });
        } 
/*
Only attach images/attach only images
        else if (mimeType === "application/pdf") 
        {
            fileContent = document.createElement("iframe");
            fileContent.src = objectURL;

            
            fileContent.addEventListener("click", (e)=>
            {
                const element = e.target;
    			const dHandler = element.querySelector(".drag-handle") || element.parentElement.querySelector(".drag-handle") || "";
    			const rHandler = element.querySelector(".resize-handle") || element.parentElement.querySelector(".resize-handle") || "";
    			
    			if(dHandler) dHandler.style.display = "block";
    			if(rHandler) rHandler.style.display = "block";                
            });
        } 
        else
        {
            fileContent = document.createElement("a");
            fileContent.href = objectURL;
            fileContent.textContent = fileOrFake.name || "Download File";
            fileContent.download = fileOrFake.name || "file";
        }
*/
        fileContent.className = "element-inner-layer";
        fileContent.dataset.attachmentElement = "file";
        fileContent.dataset.resizeElement = "inner";
        fileContent.dataset.elementLayer = "inner";
        fileContent.dataset.familyChain = "child";
        element.appendChild(fileContent);
    
        // Optional: store for cleanup
        element.objectURL = objectURL;
    
        //return element;
        
        
                                // Add metadata
        const alias = document.createElement("div");
        const title = fileOrFake?.title || this.editor.configPanel.querySelector(`#attachment_${this.elementCounter}_aliasname`)?.value?.trim() || "";
        alias.dataset.element = "title";
        alias.dataset.contentSaved = title;
        //alias.dataset.resizeElement = "inner";
        alias.innerText = title;
        //alias.style.position = "absolute";
        alias.contenteditable = "false";
        alias.style.width = "100%";
        alias.style.fontWeight = "bold";
        

        const folderDiv = document.createElement("div");
        const folder = fileOrFake?.folder || this.editor.configPanel.querySelector(`#attachment_${this.elementCounter}_folder`)?.value?.trim() || "";
        folderDiv.dataset.element = "folder";
        folderDiv.dataset.contentSaved = folder;
        folderDiv.innerText = folder;
        folderDiv.style.display = "none";
        //folderDiv.style.position = "absolute";

        const comments = document.createElement("div");
        const comm = fileOrFake?.comments || this.editor.configPanel.querySelector(`#attachment_${this.elementCounter}_comments`)?.value?.trim() || "";
        comments.dataset.element = "comments";
        comments.dataset.contentSaved = comm;
        //comments.dataset.resizeElement = "inner";
        comments.id = `comments_${element.id}`;
        comments.innerText = comm;
        comments.contenteditable = "false";
        comments.style = "font-size:12px; font-style:italic";
        comments.style.width = "100%";
        

        element.prepend(alias);
        element.appendChild(folderDiv);
        element.appendChild(comments);
        
        //this.elementCounter++;


        this.editor.makeElementDraggable(element, null, false);
        this.editor.makeElementResizable(element);
        //this.makeConfigurable(element);
        this.editor.makeElementConfigurable(element, null, this.showConfigPanel.bind(this));    
        
         this.editor.insertIntoEditor(element);     
        
        this.editor.deselectAllConfigs();
    }


    handleFileUpload(fileInput) 
    {
        const files = fileInput.files;
        if (files.length === 0) return;

        const editorSpace = this.editor.container.querySelector(".editor");

        for (let file of files) 
        {
            this.createObjElement(file);
/*
            const fileElement = this.createObjElement(file);

            const alias = document.createElement("div");
            alias.dataset.element = "alias";
            alias.dataset.parentId = fileElement.id;
            alias.dataset.elementFileName = file.name;
            alias.dataset.contentSection = "element";
            alias.dataset.contentSaved = fileInput.dataset.elementAlias || "";
            alias.innerHTML = fileInput.dataset.elementAlias ? `<span data-display='alias'><b>${fileInput.dataset.elementAlias}</b></span>` : "";

            const folder = document.createElement("div");
            folder.dataset.element = "folder";
            folder.dataset.parentId = fileElement.id;
            folder.dataset.contentSection = "element";
            folder.dataset.contentSaved = fileInput.dataset.elementFolder || "";
            folder.innerHTML = fileInput.dataset.elementFolder ? `<span data-display='folder'>${fileInput.dataset.elementFolder}</span>` : "";
            folder.id = `folder_${fileElement.id}`;
    
            const comments = document.createElement("div");
            comments.dataset.element = "comments";
            comments.dataset.parentId = fileElement.id;
            comments.dataset.contentSection = "element";
            comments.dataset.contentSaved = fileInput.dataset.elementComments || "";
            comments.innerHTML = fileInput.dataset.elementComments ? `<span data-display='comments'>${fileInput.dataset.elementComments}</span>` : "";
            comments.id = `comments_${fileElement.id}`;
            
            
            file.title      = fileInput.dataset.elementAlias;
            file.orientation= fileInput.dataset.elementOrientation;            
            file.folder     = fileInput.dataset.elementFolder;
            file.comments   = fileInput.dataset.elementComments;


            fileElement.prepend(alias);
            fileElement.appendChild(folder);
            fileElement.appendChild(comments);

            //editorSpace.appendChild(fileElement);
            this.editor.insertIntoEditor(fileElement);  //this must call createObjElement(fileOrFake, obj=null) instead
*/
        }
    }


    handleExistingFiles(inputElement) 
    {
        if (!inputElement) return;
    
        // Ensure it has the list attribute
        inputElement.setAttribute('list', 'existing-attachments-datalist');
        inputElement.placeholder = "Type to search existing files or click 'Select File'...";
    
        // Create/update the datalist
        this.createExistingFilesDatalist();
    
        // Optional: Add change listener to auto-load selected existing file
        inputElement.addEventListener('change', (e) => 
        {
            const selectedValue = e.target.value.trim();
            if (!selectedValue) return;
    
            const datalist = document.getElementById('existing-attachments-datalist');
            const option = Array.from(datalist.options)
                                .find(opt => opt.value === selectedValue && opt.dataset.url);
    
            if (option) 
            {
                // Found existing file → load it directly into editor
                //const url = option.dataset.url;
                const mime = option.dataset.mimeType;
                const storedName = option.dataset.storedName || selectedValue;
    
                // Create a fake File-like object for consistency
                const fakeFile =
                {
                    name: storedName,
                    type: mime,
                    title: selectedValue,
                    folder: '', // You could enhance grouping to store this
                    comments: '',
                };
    
                // Fetch the file and convert to object URL for display
                fetch(url)
                    .then(res => res.blob())
                    .then(blob => 
                    {
                        fakeFile.blob = blob;
                        fakeFile.objectURL = URL.createObjectURL(blob);
    
                        const fileElement = this.createObjElement(fakeFile);
    
                        // Add metadata display
                        const alias = document.createElement("div");
                        alias.dataset.element = "alias";
                        alias.innerText = selectedValue;
                        fileElement.prepend(alias);
    
                        const editorSpace = this.editor.container.querySelector(".editor");
                        editorSpace.appendChild(fileElement);
                        
                        // Clear input
                        inputElement.value = '';
                    })
                    .catch(err => 
                    {
                        console.error("Failed to load existing attachment:", err);
                        alert("Could not load the selected file.");
                    });
            }
            // If no match → user probably wants to upload new (do nothing here)
        });
    
        return inputElement;
    }

    
    handleAttachmentFolder()
    {
        const folderMap = new Map();
        
        return (arr => 
        {
            arr.forEach((a)=>
            {
                const folder = a.folder || "...";
                const map = folderMap.get(folder) || [];
                folderMap.set(folder, [...map, a]);
            });
            
            return folderMap;
        })(apps.att);
    }


    requestToRemoveAllSelection()
    {
        this.editor.container.querySelectorAll("div[data-editor-element='attachment']").forEach((shape)=>
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
    

    applyAttachmentConfig(wrapper) 
    {
        if (!this.editor.selectedElement) return;

        const fileElement = this.editor.selectedElement;
        const editorSpace = this.editor.container.querySelector(".editor");
        
        const aliasValue    = wrapper.querySelector("[data-element='title']").value.trim();
        const commentValue  = wrapper.querySelector("[data-element='comments']").value.trim();
        const layerValue    = wrapper.querySelector("[data-element='layer']").value;
 
        const aliasElement  = fileElement.querySelector("[data-element='title']");
        aliasElement.dataset.contentSaved = aliasValue;
        aliasElement.innerText = aliasValue;
        
        
        const commentElement = fileElement.querySelector("[data-element='comments']");
        commentElement.dataset.contentSaved = commentValue;
        commentElement.innerText = commentValue;
        
        
        // Apply layering
        fileElement.dataset.layer = layerValue;
        fileElement.className = `attachment-item ${layerValue}`;
        const content = fileElement.querySelector("[data-attachment-element='file']");
        if (layerValue === "back") 
        {
            fileElement.style.width = "100%"; // Span editor for background
            fileElement.style.top = "0";
            fileElement.style.left = "0";
            
            const content = fileElement.querySelector("[data-attachment-element='file']");
            if (content) 
            {
                content.style.maxWidth  = 'none';
                content.style.maxHeight = 'none';
                content.style.width     = '100%';
                content.style.height    = 'auto';
            }
            
            // Move to start of editor to ensure it's behind text
            //editorSpace.prepend(fileElement);
        } 
        else if (layerValue === "front") 
        {
            fileElement.style.top = fileElement.style.top || "";
            fileElement.style.left = fileElement.style.left || "";
            if (content) 
            {
                //content.style.maxWidth  = '';   // or '90%' / '400px' etc.
                content.style.width     = '';   // let natural size or saved dataset.width win
            }
            // Move back to original position (or append to end)
            //editorSpace.appendChild(fileElement);
        } 
        else 
        {
            fileElement.style.width = "";
            fileElement.style.top = "";
            fileElement.style.left = "";
            if (content) 
            {
                content.style.width = "";
                //content.style.maxWidth = "200px";
            }
            // Move back to original position (or append to end)
            //editorSpace.appendChild(fileElement);
        }
        
        

        this.editor.insertIntoEditor(fileElement);
        this.editor.deselectAllConfigs();	
    }


    makeConfigurable(element) 
    {
        this.editor.makeElementConfigurable(element, null, () => this.showConfigPanel(element, false));
    }
}