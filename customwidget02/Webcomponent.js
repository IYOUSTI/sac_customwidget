(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `
    <head>
    <title>Horizontal Bar Chart</title>
    <style>
    /* CSS styles here */
    .horizontal-barchart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .label {
      background-color: #5A5A5A;
      height: 100%;
      width: 10%;
      text-align: center;
      margin: auto;
      padding: 2px 6px;
      color: white;
      border-radius: 4px;
      height: 30%;
    }

    .horizontal-barchart .bar {
      background: #0DA58E;
      height: 80px;
      margin: 10px;
    }
    </style>
    </head>
    <body>
    <div class="widget-container">
        <h2>Overzicht datameterketting</h2>

        <br />

        <div class="horizontal-barchart">

        <div class="bar" id="bar-1" style="width: 100%">
            <div class="label"></div>
        </div>

        <div class="bar" id="bar-2" style="width: 75%">
            <div class="label">68652</div>
        </div>

        <div class="bar" id="bar-3" style="width: 71%">
            <div class="label">68626</div>
        </div>

        <div class="bar" id="bar-4" style="width: 65%">
            <div class="label">68174</div>
        </div>

        <div class="bar" id="bar-5" style="width: 65%">
            <div class="label">68174</div>
        </div>

        <div class="bar" id="bar-6" style="width: 59%">
            <div class="label">62266</div>
        </div>

        </div>
    </div>
    </body>
    ` ;   
   
    class PerformanceHelp extends HTMLElement {
        constructor() {
            super();
            this.init();           
        }

        init() {               
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.fireChanged();           
                this.dispatchEvent(event);
                });           
            }
            
    
            fireChanged() {
                console.log("OnClick Triggered");
                const geplaatste_meters = this.myDataBinding.data[0]["measures_0"].raw;
                this.AppendText(geplaatste_meters, 'bar-1');
                const meteradd_meters = this.myDataBinding.data[0]["measures_1"].raw;
                const capability_meters = this.myDataBinding.data[0]["measures_2"].raw;
                const positivecapability_meters = this.myDataBinding.data[0]["measures_3"].raw;
                const meterstanden_hes = this.myDataBinding.data[0]["measures_4"].raw;
                const meterstanden_c4e = this.myDataBinding.data[0]["measures_5"].raw;
                this.myDataBinding.data.forEach(row => {
                    console.log("row")
                    console.log(row)
                  })
            }
            
            AppendText(text, elementId) {
                const targetElement = this._shadowRoot.getElementById(elementId);
            
                if (targetElement) {
                    const textNode = this._shadowRoot.createTextNode(text);
                    targetElement.appendChild(textNode);
                } else {
                    console.error(`Element with ID "${elementId}" not found.`);
                }
            }
        
        
    }

    customElements.define('pyramid-graph', PerformanceHelp);
})();