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
            <div class="label"></div>
        </div>

        <div class="bar" id="bar-3" style="width: 71%">
            <div class="label"></div>
        </div>

        <div class="bar" id="bar-4" style="width: 65%">
            <div class="label"></div>
        </div>

        <div class="bar" id="bar-5" style="width: 65%">
            <div class="label"></div>
        </div>

        <div class="bar" id="bar-6" style="width: 59%">
            <div class="label"></div>
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
                console.log(this.shadowRoot);
                const geplaatste_meters = this.myDataBinding.data[0]["measures_0"].raw;
                const value_bar1 = this.CalculatePercentageDifferenceAndValue(geplaatste_meters,geplaatste_meters,geplaatste_meters);
                this.AppendText(`${geplaatste_meters} (${value_bar1.percentageDifferencePC}%)`, 'bar-1');
                this.ApplyWidth(value_bar1.percentageFC, 'bar-1');

                const meteradd_meters = this.myDataBinding.data[0]["measures_1"].raw;
                const value_bar2 = this.CalculatePercentageDifferenceAndValue(geplaatste_meters,meteradd_meters,geplaatste_meters);
                this.AppendText(`${meteradd_meters} (${value_bar2.percentageDifferencePC}%)`, 'bar-2');
                this.ApplyWidth(value_bar2.percentageFC, 'bar-2');

                const capability_meters = this.myDataBinding.data[0]["measures_2"].raw;
                const value_bar3 = this.CalculatePercentageDifferenceAndValue(meteradd_meters,capability_meters,geplaatste_meters);
                this.AppendText(`${capability_meters} (${value_bar3.percentageDifferencePC}%)`, 'bar-3');
                this.ApplyWidth(value_bar3.percentageFC, 'bar-3');

                const positivecapability_meters = this.myDataBinding.data[0]["measures_3"].raw;
                const value_bar4 = this.CalculatePercentageDifferenceAndValue(capability_meters,positivecapability_meters,geplaatste_meters);
                this.AppendText(`${positivecapability_meters} (${value_bar4.percentageDifferencePC}%)`, 'bar-4');
                this.ApplyWidth(value_bar4.percentageFC, 'bar-4');

                const meterstanden_hes = this.myDataBinding.data[0]["measures_4"].raw;
                const value_bar5 = this.CalculatePercentageDifferenceAndValue(positivecapability_meters,meterstanden_hes,geplaatste_meters);
                this.AppendText(`${meterstanden_hes} (${value_bar5.percentageDifferencePC}%)`, 'bar-5');
                this.ApplyWidth(value_bar5.percentageFC, 'bar-5');

                const meterstanden_c4e = this.myDataBinding.data[0]["measures_5"].raw;
                const value_bar6 = this.CalculatePercentageDifferenceAndValue(meterstanden_hes,meterstanden_c4e,geplaatste_meters);
                this.AppendText(`${meterstanden_c4e} (${value_bar6.percentageDifferencePC}%)`, 'bar-6');
                this.ApplyWidth(value_bar6.percentageFC, 'bar-6');
                console.log('test');
                console.log(`${meterstanden_c4e} (${value_bar6.percentageDifferencePC}%), ${meterstanden_hes},${meterstanden_c4e},${geplaatste_meters}`)

                this.myDataBinding.data.forEach(row => {
                    console.log("row")
                    console.log(row)
                  })
            }
            
            AppendText(text, elementId) {
                const targetElement = this.shadowRoot.getElementById(elementId);
            
                if (targetElement) {
                    targetElement.innerHTML = '<div class="label">'+ text +'</div>';
                } else {
                    console.error(`Element with ID "${elementId}" not found.`);
                }
            }

            CalculatePercentageDifferenceAndValue(previousvalue, currentvalue, firstvalue) {
                const percentageDifferencePC = (100 - (((previousvalue - currentvalue) / Math.abs(currentvalue)) * 100)).toFixed(2);;
                const percentageFC = (100 - (((firstvalue - currentvalue) / Math.abs(currentvalue)) * 100)).toFixed(2);;
              
                // Return both results in an object
                return {
                    percentageDifferencePC,
                    percentageFC,
                };
              }
              
              ApplyWidth(amount, elementId) {
                const targetElement = this.shadowRoot.getElementById(elementId);
                if (targetElement) {
                    targetElement.style.width = `${amount}%`;
                } else {
                    console.error(`Element with ID "${elementId}" not found.`);
                }
              }
    }

    customElements.define('pyramid-graph', PerformanceHelp);
})();