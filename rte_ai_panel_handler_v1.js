class AIPanelHandler 
{
    constructor(editor) 
    {
        this.title = "AiAssistant";
        this.editor = editor;
        this.aiCounter = 0;
        this.selectedElement = null;
        this.conversationHistory = [];
        this.remainingRequests = 5;
        this.currentSupplier = null;
    }

    initializeExisting() 
    {
        this.aiCounter = 0;
        this.editor.container.querySelectorAll('.ai-menu-panel.inserted-ai-conversation').forEach(panel => 
        {
            const numMatch = panel.id.match(/_(\d+)$/);
            if (numMatch) this.aiCounter = Math.max(this.aiCounter, parseInt(numMatch[1]) + 1);
            
            this.editor.makeElementDraggable(panel);
            this.editor.makeElementConfigurable(panel,
                () => 
                {
                    document.querySelectorAll('.inserted-ai-conversation.selected').forEach(el => el.classList.remove('selected'));
                    panel.classList.add('selected');
                    this.selectedElement = panel;
                },
                () => { this.showConfigPanel(panel, false); }
            );
            this.makePanelInteractive(panel);
        });
    }

    showConfigPanel(wrapper, callFromToolbar) 
    {
        if (!this.editor.configPanel) this.editor = this.editor.updateEditor(wrapper);
        this.editor.configPanel.innerHTML = '';
        this.editor.configPanel.appendChild(this.updateObjPanel(wrapper));
        this.editor.configPanel.style.display = 'block';
    }

    updateObjPanel(element = null) 
    {
        const saved = element?.dataset?.history;
        this.conversationHistory = saved ? JSON.parse(saved) : [];
        return this.aiPanel(element);
    }

    aiPanel(existingElement = null) 
    {
        // Populate models dynamically
        function updateModels() 
        {
            modelSelect.innerHTML = "";
            const selectedSupplier = suppliers.find(s => s.supplier === supplierSelect.value);
            if (!selectedSupplier) return;
        
            selectedSupplier.models.forEach(model => 
            {
                const opt = document.createElement("option");
                opt.value = model;
                opt.textContent = model;
                modelSelect.appendChild(opt);
            });
        }
        
        const bodyWrapper = document.createElement("div");
        bodyWrapper.className = "aiassistant-item";
        
        const chatContainer = document.createElement("div");
        chatContainer.className = "ai-chat-history aibody";
        chatContainer.innerHTML = '';
        this.conversationHistory.forEach((msg, i) => 
        {
            this.addMessage(chatContainer, msg.prompt, "user", true, i);
            this.addMessage(chatContainer, msg.response, "ai", true, i);
        });

        const inputArea = document.createElement("div");
        inputArea.className = "aiquestioner";
        const textarea = document.createElement("textarea");
        textarea.placeholder = "Ask AI...";
        textarea.className = "airesponses";
        inputArea.appendChild(textarea);

        const footWrapper = document.createElement("div");
        footWrapper.className = "aifooter";
        
        const divtokens = document.createElement('div')
        divtokens.textContent = "Usage:";
        const spantout = document.createElement("div");
        spantout.id = `${this.editor.propertyID}_${this.aiCounter}_ai-token-out`;
        spantout.classList.add('ai-foot-displayer');
        spantout.textContent = "Tokens-Out:";
        const spantin = document.createElement("div");
        spantin.id = `${this.editor.propertyID}_${this.aiCounter}_ai-token-in`;
        spantin.classList.add('ai-foot-displayer');
        spantin.textContent = "Tokens-In:";        
        divtokens.appendChild(spantout);
        divtokens.appendChild(spantin);
        
        const counterDisplay = document.createElement("div");
        counterDisplay.classList.add('ai-foot-displayer');
        //counterDisplay.style.cssText = "font-size: 11px; color: #64748b; width: 100%; text-align: right; margin-bottom: 5px;";
        counterDisplay.textContent = `Daily Requests: ${this.remainingRequests} remaining`;
        
        const sendBtn = document.createElement("button");
        sendBtn.className = "btnPanel oPanel";
        sendBtn.textContent = "Send";

        const sendMessage = async () => 
        {
            const prompt = textarea.value.trim();
            if (!prompt || this.remainingRequests <= 0) return;

            this.addMessage(chatContainer, prompt, "user");
            textarea.value = "";
            sendBtn.disabled = true;
            sendBtn.textContent = "Processing...";

            // Token Management: Only send last 4 messages for context
            const contextHistory = this.conversationHistory.slice(-4);
            /*
{
  "userID": "123",
  "supplier": "google",
  "model": "gemini-3.1-flash-image-preview",
  "outputType": "mixed",
  "history": [],
  "promptPackage": 
  {
    "mode": "six_part",
    "context": "I need an image and a short explanation for a landing page.",
    "objective": "Create a visual showing focus and organization.",
    "style": "Modern SaaS illustration",
    "tone": "Helpful and professional",
    "audience": "Business users",
    "responseFormat": "Image plus short explanation",
    "constraints": "No text inside image",
    "examples": "",
    "rawPrompt": "Show a person organizing work with floating digital cards"
  },
  "imageOptions": {
    "aspectRatio": "16:9"
  }
}
*/
            const payload = 
            {
                userID: apps.uniqueData.uid,
                supplier:document.getElementById(`${this.editor.propertyID}_ai-prompt-element-o10`).value,
                outputType:document.getElementById(`${this.editor.propertyID}_ai-prompt-element-o11`).value,  
                history: contextHistory,    
                promptPackage:
                {
                    rawPrompt: prompt,
                }, 
                imageOptions:
                {
                    aspectRation:""
                }

                //supplier: supplierSelect.value,
                //model: modelSelect.value,

            };
            document.querySelectorAll("[data-element-type='ai-prompt']").forEach(elem=>
            {
                payload["promptPackage"][elem.dataset.elementName] = elem.value;
            });
            console.log(payload);
            const data = await this.callAIService(payload);
            
            if(data.isDefault)
            {
                if (typeof data.remaining !== 'undefined') 
                {
                    this.remainingRequests = data.remaining;
                    counterDisplay.textContent = `Daily Requests: ${this.remainingRequests} remaining`;
                }
    

                
                sendBtn.disabled = (this.remainingRequests <= 0);
            }
            else
            {
                counterDisplay.style.display = `none`;
            }
            
            if (data.error) 
            {
                this.addMessage(chatContainer, data.error, "ai");
            } 
            else 
            {
                this.addMessage(chatContainer, data.response, "ai");
                this.conversationHistory.push({ prompt, response: data.response });
            }
            
            if (data.usage)
            {
                console.log(`Usage: ${data.usage.input} in / ${data.usage.output} out`); 
                document.getElementById(`${this.editor.propertyID}_${this.aiCounter}_ai-token-in`).innerText  = `Tokens-In: ${data.usage.input}`;
                document.getElementById(`${this.editor.propertyID}_${this.aiCounter}_ai-token-out`).innerText = `Tokens-Out: ${data.usage.output}`;
            }
            sendBtn.textContent = "Send";
        };

        sendBtn.onclick = sendMessage;

        const applyBtn = document.createElement("button");
        applyBtn.className = "btnPanel oPanel";
        applyBtn.textContent = "Load To Editor";
        applyBtn.onclick = () => 
        {
            if(!existingElement) this.aiCounter++;
            this.createObjElement(bodyWrapper);
            this.editor.container.contentEditable = "true";
        };


        bodyWrapper.appendChild(chatContainer);
        bodyWrapper.appendChild(inputArea);
        bodyWrapper.appendChild(this.promptSettings());
        
        footWrapper.appendChild(divtokens);        
        footWrapper.appendChild(counterDisplay);
        footWrapper.appendChild(document.createElement("hr"));
        
        footWrapper.appendChild(sendBtn);
        footWrapper.appendChild(applyBtn);

        return this.editor.panelWrapper({head:this.title, body:bodyWrapper, foot:footWrapper});
    }



    promptSettings()
    {
        // Settings: Supplier and Model
        const settings = document.createElement("div");
        settings.classList.add("configPanel_settings");
        settings.style.cssText = "display: flex; gap: 8px; margin-bottom: 12px; padding: 10px; background: #f1f5f9; border-radius: 8px; width:100%";
        
        const settingsFrame = document.createElement("details");
        settingsFrame.classList.add("aiPanelFooter_promptSettings");
        
        const innerSettingsFrame = document.createElement("summary");
        innerSettingsFrame.textContent = "Prompt Settings";
        
        settingsFrame.appendChild(innerSettingsFrame);
        
/*
                'mode'           => strtolower(trim((string)($pkg['mode'] ?? 'raw'))),
    (no need)   'rawPrompt'      => trim((string)($pkg['rawPrompt'] ?? ($pkg['prompt'] ?? ''))),
                'context'        => trim((string)($pkg['context'] ?? '')),
                'objective'      => trim((string)($pkg['objective'] ?? '')),
                'style'          => trim((string)($pkg['style'] ?? '')),
                'tone'           => trim((string)($pkg['tone'] ?? '')),
                'audience'       => trim((string)($pkg['audience'] ?? '')),
                'responseFormat' => trim((string)($pkg['responseFormat'] ?? '')),
                'constraints'    => trim((string)($pkg['constraints'] ?? '')),
                'examples'       => trim((string)($pkg['examples'] ?? ''))
*/
        

        const divo10 = document.createElement("div");
        
        const elemento10_label = document.createElement("label");
        elemento10_label.textContent = "AI Provider:";
        const elemento10_input = document.createElement("input");
        elemento10_input.id = `${this.editor.propertyID}_ai-prompt-element-o10`;  
        elemento10_input.dataset.elementType = "ai-head-prompt";
        elemento10_input.dataset.elementName = "supplier";
        
        elemento10_input.setAttribute("list",`${this.editor.propertyID}_ai-prompt-element-o10a`);  
        elemento10_input.className = "";
        elemento10_input.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";
        //elemento10_input.innerHTML = "<option>Select or Enter ai Mode</option>";
        const elemento10_datalist = document.createElement("datalist");   
        elemento10_datalist.id = `${this.editor.propertyID}_ai-prompt-element-o10a`; 
        apps.uniqueData.aiModels.forEach(s => 
        {
            const elemento10_options = document.createElement("option");
            elemento10_options.value = s.supplier;
            elemento10_options.textContent = s.supplier.charAt(0).toUpperCase() + s.supplier.slice(1);
            elemento10_datalist.appendChild(elemento10_options);
        });        
        
        divo10.appendChild(elemento10_label);
        divo10.appendChild(elemento10_input);
        divo10.appendChild(elemento10_datalist);

        settingsFrame.appendChild(divo10);
        
        
        const divo11 = document.createElement("div");
        
        const elemento11_label = document.createElement("label");
        elemento11_label.textContent = "Output Type:";
        const elemento11_input = document.createElement("input");
        elemento11_input.id = `${this.editor.propertyID}_ai-prompt-element-o11`;  
        elemento11_input.dataset.elementType = "ai-head-prompt";
        elemento11_input.dataset.elementName = "supplier";
        
        elemento11_input.setAttribute("list",`${this.editor.propertyID}_ai-prompt-element-o11a`);  
        elemento11_input.className = "";
        elemento11_input.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";
        elemento11_input.innerHTML = "<option>Select or Enter ai Mode</option>";
        const elemento11_datalist = document.createElement("datalist");      
        elemento11_datalist.id = `${this.editor.propertyID}_ai-prompt-element-o11a`;  
        const elemento11_options1 = document.createElement("option");
        elemento11_options1.value = "text";
        elemento11_options1.textContent = "Text";
        const elemento11_options2 = document.createElement("option");
        elemento11_options2.value = "image";
        elemento11_options2.textContent = "Image";
        const elemento11_options3 = document.createElement("option");
        elemento11_options3.value = "mixed";
        elemento11_options3.textContent = "mixed";
        const elemento11_options4 = document.createElement("option");
        elemento11_options4.value = "json";
        elemento11_options4.textContent = "JSON";
        const elemento11_options5 = document.createElement("option");
        elemento11_options5.value = "markdown";
        elemento11_options5.textContent = "markdown";
        const elemento11_options6 = document.createElement("option");
        elemento11_options6.value = "html";
        elemento11_options6.textContent = "html";
        const elemento11_options7 = document.createElement("option");
        elemento11_options7.value = "code";
        elemento11_options7.textContent = "code";
        
        elemento11_datalist.appendChild(elemento11_options1);
        elemento11_datalist.appendChild(elemento11_options2);
        elemento11_datalist.appendChild(elemento11_options3);
        elemento11_datalist.appendChild(elemento11_options4);
        elemento11_datalist.appendChild(elemento11_options5);
        elemento11_datalist.appendChild(elemento11_options6);
        elemento11_datalist.appendChild(elemento11_options7);
        //elemen11_datalist.appendChild(element11_options8);
        
        divo11.appendChild(elemento11_label);
        divo11.appendChild(elemento11_input);
        divo11.appendChild(elemento11_datalist);

        settingsFrame.appendChild(divo11);
        
        
                
        
        settingsFrame.appendChild(document.createElement("hr"));
        
        
//---  new element ---//    
        const div2 = document.createElement("div");
        const element2_label = document.createElement("label");
        element2_label.textContent = "Mode:";
        const element2_input = document.createElement("input");
        element2_input.id = `${this.editor.propertyID}_ai-prompt-element-2`;  
        //element2_input.list = `${this.editor.propertyID}_ai-prompt-element-2a`;  
        element2_input.dataset.elementType = "ai-prompt";
        element2_input.dataset.elementName = "mode";
        element2_input.setAttribute("list",`${this.editor.propertyID}_ai-prompt-element-2a`);  
        element2_input.className = "";
        element2_input.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";
        element2_input.innerHTML = "<option>Select or Enter ai Mode</option>";
        const element2_datalist = document.createElement("datalist");
        element2_datalist.id = `${this.editor.propertyID}_ai-prompt-element-2a`;  
        const element2_options1 = document.createElement("option");
        element2_options1.value = "raw";
        element2_options1.textContent = "raw";
        const element2_options2 = document.createElement("option");
        element2_options2.value = "structured";
        element2_options2.textContent = "structured";
        const element2_options3 = document.createElement("option");
        element2_options3.value = "chat";
        element2_options3.textContent = "chat";
        const element2_options4 = document.createElement("option");
        element2_options4.value = "few-shot";
        element2_options4.textContent = "few-shot";
        const element2_options5 = document.createElement("option");
        element2_options5.value = "markdown";
        element2_options5.textContent = "markdown";
        
        element2_datalist.appendChild(element2_options1);
        element2_datalist.appendChild(element2_options2);
        element2_datalist.appendChild(element2_options3);
        element2_datalist.appendChild(element2_options4);
        element2_datalist.appendChild(element2_options5);
        div2.appendChild(element2_label);
        div2.appendChild(element2_input);
        div2.appendChild(element2_datalist);
        
        settingsFrame.appendChild(div2);
         
         
        //---  new element ---//
        const div3 = document.createElement("div");
        const element3_label = document.createElement("label");
        element3_label.textContent = "Context:";
        const element3_text = document.createElement("textarea");
        element3_text.id = `${this.editor.propertyID}_ai-prompt-element-3`;  
        element3_text.dataset.elementType = "ai-prompt";
        element3_text.dataset.elementName = "context";
        element3_text.placeholder = `Enter in bullet points`;  
        element3_text.placeholder ="Background information, facts, documents, conversation history, or world knowledge the model should keep in mind. Prevents hallucination and gives relevance."
        element3_text.className = "";
        element3_text.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";

        div3.appendChild(element3_label);
        div3.appendChild(element3_text);
        
        settingsFrame.appendChild(div3);
    
    
    
        //---  new element ---//
        const div4 = document.createElement("div");
        const element4_label = document.createElement("label");
        element4_label.textContent = "Objectives:";
        const element4_text = document.createElement("textarea");
        element4_text.id = `${this.editor.propertyID}_ai-prompt-element-4`;  
        element4_text.dataset.elementType = "ai-prompt";
        element4_text.dataset.elementName = "supplier";
        element4_text.placeholder = "(Enter in bullet points) The main goal or desired outcome of the response. Makes the model focus."
        element4_text.className = "";
        element4_text.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";

        div4.appendChild(element4_label);
        div4.appendChild(element4_text);
        
        settingsFrame.appendChild(div4);
        
        
        
        //---  new element ---//
        const div5 = document.createElement("div");
        const element5_label = document.createElement("label");
        element5_label.textContent = "Style:";
        const element5_input = document.createElement("input");
        element5_input.id = `${this.editor.propertyID}_ai-prompt-element-5`; 
        element5_input.dataset.elementType = "ai-prompt";
        element5_input.dataset.elementName = "style";
        //element5_input.list = `${this.editor.propertyID}_ai-prompt-element-5a`;  
        element5_input.setAttribute("list",`${this.editor.propertyID}_ai-prompt-element-5a`);  
        element5_input.className = "";
        element5_input.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";
        element5_input.innerHTML = "<option>Select or Enter ai Mode</option>";
        const element5_datalist = document.createElement("datalist");
        element5_datalist.id = `${this.editor.propertyID}_ai-prompt-element-5a`;  
        const element5_options1 = document.createElement("option");
        element5_options1.value = "bulletpoints";
        element5_options1.textContent = "Bullet Points";
        const element5_options2 = document.createElement("option");
        element5_options2.value = "structured";
        element5_options2.textContent = "structured";
        const element5_options3 = document.createElement("option");
        element5_options3.value = "narrative";
        element5_options3.textContent = "Narrative";
        const element5_options4 = document.createElement("option");
        element5_options4.value = "technical";
        element5_options4.textContent = "Technical";
        /*
        const element2_options5 = document.createElement("option");
        element2_options5.value = "markdown";
        element2_options5.textContent = "markdown";
        */
        
        element5_datalist.appendChild(element5_options1);
        element5_datalist.appendChild(element5_options2);
        element5_datalist.appendChild(element5_options3);
        element5_datalist.appendChild(element5_options4);
        //element2_datalist.appendChild(element2_options5);
        

        div5.appendChild(element2_label);
        div5.appendChild(element2_input);
        div5.appendChild(element2_datalist);
    
        settingsFrame.appendChild(div5);
        
        
        //---  new element ---//
        const div6 = document.createElement("div");
        const element6_label = document.createElement("label");
        element6_label.textContent = "Tone:";
        const element6_input = document.createElement("input");
        element6_input.id = `${this.editor.propertyID}_ai-prompt-element-6`;  
        //element6_input.list = `${this.editor.propertyID}_ai-prompt-element-6a`;  
        element6_input.dataset.elementType = "ai-prompt";
        element6_input.dataset.elementName = "tone";
        element6_input.setAttribute("list",`${this.editor.propertyID}_ai-prompt-element-6a`);  
        element6_input.className = "";
        element6_input.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";
        element6_input.innerHTML = "<option>Select or Enter ai Mode</option>";
        const element6_datalist = document.createElement("datalist");
        element6_datalist.id = `${this.editor.propertyID}_ai-prompt-element-6a`;  
        const element6_options1 = document.createElement("option");
        element6_options1.value = "friendly";
        element6_options1.textContent = "Friendly";
        const element6_options2 = document.createElement("option");
        element6_options2.value = "professional";
        element6_options2.textContent = "professional";
        const element6_options3 = document.createElement("option");
        element6_options3.value = "sarcastic";
        element6_options3.textContent = "Sarcastic";
        const element6_options4 = document.createElement("option");
        element6_options4.value = "encouraging";
        element6_options4.textContent = "Encouraging";
        /*
        const element2_options5 = document.createElement("option");
        element2_options5.value = "markdown";
        element2_options5.textContent = "markdown";
        */
        
        element6_datalist.appendChild(element6_options1);
        element6_datalist.appendChild(element6_options2);
        element6_datalist.appendChild(element6_options3);
        element6_datalist.appendChild(element6_options4);
        //element6_datalist.appendChild(element6_options5);
        
        div6.appendChild(element6_label);
        div6.appendChild(element6_input);
        div6.appendChild(element6_datalist);
    
        settingsFrame.appendChild(div6);
        
        
        
        //---  new element ---//
        const div7 = document.createElement("div");
        const element7_label = document.createElement("label");
        element7_label.textContent = "Audience:";
        const element7_input = document.createElement("input");
        element7_input.id = `${this.editor.propertyID}_ai-prompt-element-7`;  
        element7_input.dataset.elementType = "ai-prompt";
        element7_input.dataset.elementName = "audience";
        //element7_input.list = `${this.editor.propertyID}_ai-prompt-element-7a`;  
        element7_input.setAttribute("list",`${this.editor.propertyID}_ai-prompt-element-7a`);  
        element7_input.className = "";
        element7_input.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";
        element7_input.innerHTML = "<option>Select or Enter ai Mode</option>";
        const element7_datalist = document.createElement("datalist");
        element7_datalist.id = `${this.editor.propertyID}_ai-prompt-element-7a`;  
        const element7_options1 = document.createElement("option");
         element7_options1.value = "nontechnical";
        element7_options1.textContent = "Non-Technical";
        const element7_options2 = document.createElement("option");
        element7_options2.value = "professionals";
        element7_options2.textContent = "Professionals";
        const element7_options3 = document.createElement("option");
        element7_options3.value = "highschoolers";
        element7_options3.textContent = "High-Schoolers";
         /*
        const element7_options4 = document.createElement("option");
        element7_options4.value = "encouraging";
        element7_options4.textContent = "Encouraging";
       
        const element2_options5 = document.createElement("option");
        element2_options5.value = "markdown";
        element2_options5.textContent = "markdown";
        */
        
        element7_datalist.appendChild(element7_options1);
        element7_datalist.appendChild(element7_options2);
        element7_datalist.appendChild(element7_options3);
        //element7_datalist.appendChild(element7_options);
        div7.appendChild(element7_label);
        div7.appendChild(element7_input);
        div7.appendChild(element7_datalist);
    
        settingsFrame.appendChild(div7);
        
        
        //---  new element ---//
        const div8 = document.createElement("div");
        const element8_label = document.createElement("label");
        element8_label.textContent = "Response Format:";
        const element8_input = document.createElement("input");
        element8_input.id = `${this.editor.propertyID}_ai-prompt-element-8`;  
        element8_input.dataset.elementType = "ai-prompt";
        element8_input.dataset.elementName = "responseFormat";
        //element8_input.list = `${this.editor.propertyID}_ai-prompt-element-8a`;  
        element8_input.setAttribute("list",`${this.editor.propertyID}_ai-prompt-element-8a`);  
        element8_input.className = "";
        element8_input.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";
        element8_input.innerHTML = "<option>Select or Enter ai Mode</option>";
        const element8_datalist = document.createElement("datalist");
        element8_datalist.id = `${this.editor.propertyID}_ai-prompt-element-8a`;  
        const element8_options1 = document.createElement("option");
         element8_options1.value = "json";
        element8_options1.textContent = "JSON";
        const element8_options2 = document.createElement("option");
        element8_options2.value = "markdowntable";
        element8_options2.textContent = "Markdown Table";
        const element8_options3 = document.createElement("option");
        element8_options3.value = "onesentence";
        element8_options3.textContent = "One Sentence";

        

        element8_datalist.appendChild(element8_options1);
        element8_datalist.appendChild(element8_options2);
        element8_datalist.appendChild(element8_options3);
        div8.appendChild(element8_label);
        div8.appendChild(element8_input);
        div8.appendChild(element8_datalist);
    
        settingsFrame.appendChild(div8);
        
        
        
        
    //---  new element ---//
        const div9 = document.createElement("div");
        const element9_label = document.createElement("label");
        element9_label.textContent = "Constraints:";
        const element9_text = document.createElement("textarea");
        element9_text.id = `${this.editor.propertyID}_ai-prompt-element-9`;  
        element9_text.dataset.elementType = "ai-prompt";
        element9_text.dataset.elementName = "constraints";
        element9_text.placeholder = "(Enter in bullet points) Hard rules, things to avoid, length limits, forbidden topics, safety rails."
        element9_text.className = "";
        element9_text.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";

        div9.appendChild(element9_label);
        div9.appendChild(element9_text);
        
        settingsFrame.appendChild(div9);
        
        
    //---  new element ---//
        const div10 = document.createElement("div");
        const element10_label = document.createElement("label");
        element10_label.textContent = "Examples:";
        const element10_text = document.createElement("textarea");
        element10_text.id = `${this.editor.propertyID}_ai-prompt-element-10`;  
        element10_text.dataset.elementType = "ai-prompt";
        element10_text.dataset.elementName = "examples";
        element10_text.placeholder = "1. Input: 'calm down' → Output: 'Take a deep breath — everything is going to be okay.'\n2. Two complete Q&A pairs showing step-by-step reasoning\n3. Bad example → Good rewritten version (to teach style correction)";
        element10_text.className = "";
        element10_text.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";

        div10.appendChild(element10_label);
        div10.appendChild(element10_text);
        
        settingsFrame.appendChild(div10);
        
        
/*       
        //---  new element ---//
        const div2 = document.createElement("div");
        const element2_label = document.createElement("label");
        element2_label.textContent = "Mode:";
        const element2_input = document.createElement("input");
        element2_input.id = `${this.editor.propertyID}_ai-prompt-mode1`;  
        element2_input.list = `${this.editor.propertyID}_ai-prompt-mode2`;  
        element2_input.className = "";
        element2_input.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";
        element2_input.innerHTML = "<option>Select or Enter ai Mode</option>";
        const element2_datalist = document.createElement("datalist");
        element2_datalist.id = `${this.editor.propertyID}_ai-prompt-mode2`;  
        const element2_options = document.createElement("option");
        

        element2_datalist.appendChild(element2_options);
        div2.appendChild(element2_label);
        div2.appendChild(element2_input);
        div2.appendChild(element2_datalist);
    
        settingsFrame.appendChild(div1);
        
        
        //---  new element ---//
        const div2 = document.createElement("div");
        const element2_label = document.createElement("label");
        element2_label.textContent = "Mode:";
        const element2_input = document.createElement("input");
        element2_input.id = `${this.editor.propertyID}_ai-prompt-mode1`;  
        element2_input.list = `${this.editor.propertyID}_ai-prompt-mode2`;  
        element2_input.className = "";
        element2_input.style.cssText = "flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;";
        element2_input.innerHTML = "<option>Select or Enter ai Mode</option>";
        const element2_datalist = document.createElement("datalist");
        element2_datalist.id = `${this.editor.propertyID}_ai-prompt-mode2`;  
        const element2_options = document.createElement("option");
        

        element2_datalist.appendChild(element2_options);
        div2.appendChild(element2_label);
        div2.appendChild(element2_input);
        div2.appendChild(element2_datalist);
    
        settingsFrame.appendChild(div1);
*/

        settings.appendChild(settingsFrame);
            //settings.appendChild(modelSelect);
            //settings.appendChild(modelInput);
    
        return settings;
    }

    createObjElement(dataObj) 
    {
        const newAIBlock = document.createElement("div");
        newAIBlock.className = "ai-menu-panel inserted-ai-conversation ai-display-panel";
        newAIBlock.id = this.selectedElement ? this.selectedElement.id : `aiassistant_${this.editor.propertyID}_${this.aiCounter}`;
        newAIBlock.dataset.history = JSON.stringify(this.conversationHistory);
        newAIBlock.dataset.editorElement = "aiassistant";

        const header = document.createElement("div");
        header.textContent = "AI Conversation";
        header.className = "headHandler";
        newAIBlock.appendChild(header);

        const chatView = document.createElement("div");
        chatView.style.cssText = "display: flex; flex-direction: column; gap: 8px;";
        this.conversationHistory.forEach(msg => 
        {
            const u = document.createElement("div");
            u.style.cssText = "align-self: flex-end; background: #6366f1; color: white; padding: 8px; border-radius: 8px; font-size: 13px;";
            u.textContent = msg.prompt;
            const a = document.createElement("div");
            a.style.cssText = "align-self: flex-start; background: #e2e8f0; padding: 8px; border-radius: 8px; font-size: 13px;";
            a.textContent = msg.response;
            chatView.appendChild(u);
            chatView.appendChild(a);
        });
        newAIBlock.appendChild(chatView);

        this.editor.makeElementDraggable(newAIBlock);
        this.editor.makeElementConfigurable(newAIBlock,
            () => { this.selectedElement = newAIBlock; },
            () => this.showConfigPanel(newAIBlock, false)
        );

        const editorArea = this.editor.container.querySelector(".editor");
        if(this.selectedElement) 
        {
            editorArea.replaceChild(newAIBlock, this.selectedElement);
            this.selectedElement = null;
        } 
        else 
        {
            editorArea.appendChild(newAIBlock);
        }
        this.editor.deselectAllConfigs();
    }

    async callAIService(payload) 
    {
        try 
        {   let aifile = function(id)
                        {   
                            /*
                            let s = document.getElementById(`${id}_ai-Selector`)?.value;
                            switch(s)
                            {
                                case "gemini":
                                    return "ai_service_v-Gemini.php";
                                case "grok":
                                    return "ai_service_v-Grok.php";
                                case "openai":
                                    return "ai_service_v-chatGPT.php";
                                default:
                                    return;
                            }
                            */
                            return "ai_service_v3-image.php";
                        };
                
        
            const url = `/focus/development/version_${apps.uniqueData.uVersion}/php/AI/${aifile(this.editor.propertyID)}`;
            
/*            
            const response = await fetch(url, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            
            const raw = await response.text();
console.log("AI raw response:", raw);   // <--- this will reveal the junk
//return JSON.parse(raw);  
            
            
if (!response.ok) 
{
  return { error: `HTTP ${response.status}`, debug: raw.slice(0, 500) };
}

if (!ct.includes("application/json")) 
{
  return { error: "Non-JSON response from server", debug: raw.slice(0, 500) };
}

try 
{
  return JSON.parse(raw);
} 
catch (e) 
{
  return { error: "Invalid JSON from server", debug: raw.slice(0, 500) };
}
*/
const res = await fetch(url, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
const ct = res.headers.get("content-type") || "";
const raw = await res.text();

if (!res.ok) {
  return { error: `HTTP ${res.status}`, debug: raw.slice(0, 500) };
}

if (!ct.includes("application/json")) {
  return { error: "Non-JSON response from server", debug: raw.slice(0, 500) };
}

try {
  return JSON.parse(raw);
} catch (e) {
  return { error: "Invalid JSON from server", debug: raw.slice(0, 500) };
}
            
            
            
            
        } 
        catch (err) 
        {
            return { error: `Server Connection Failed: ${err.message}` };
        }
    }

    counterMessage()
    {}
    
    addMessage(container, text, sender, fromConfig = false, index = null) 
    {
        const bubble = document.createElement("div");
        bubble.style.cssText = `max-width: 85%; padding: 10px; border-radius: 12px; margin: 4px 0; position: relative; align-self: ${sender === "user" ? "flex-end" : "flex-start"}; background: ${sender === "user" ? "#4f46e5" : "#f1f5f9"}; color: ${sender === "user" ? "white" : "#1e293b"}; font-size: 14px;`;
        bubble.textContent = text;

        if (fromConfig && sender === "user") 
        {
            const del = document.createElement("button");
            del.textContent = "×";
            del.style.cssText = "position: absolute; top: -5px; right: -5px; background: red; color: white; border: none; border-radius: 50%; width: 18px; height: 18px; cursor: pointer; font-size: 12px;";
            del.onclick = (e) => 
            {
                e.stopPropagation();
                this.conversationHistory.splice(index, 1);
                container.innerHTML = '';
                this.conversationHistory.forEach((m, i) => 
                {
                    this.addMessage(container, m.prompt, "user", true, i);
                    this.addMessage(container, m.response, "ai", true, i);
                });
            };
            bubble.appendChild(del);
        }
        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;
    }

    makePanelInteractive(panel) 
    {
        panel.ondblclick = (e) => 
        {
            e.stopPropagation();
            this.showConfigPanel(panel, false);
        };
    }
}