(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `
    <head>
    <style>
    @import url("https://fonts.googleapis.com/css2? family=Montserrat&display=swap");
      
      * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
      
      .widget-container {
        border: 1px red solid;
        width: 100vw;
        height:100vh;
      }
  
      h2 {
        text-decoration: underline;
  margin-bottom:1vh;
  text-align: center;
  height: 10vh;
  width: 100vw;
  transform: translateY(5vh);
        color: #5A5A5A;
}
      
      .container-barchart {
        display:flex;
        flex-direction: row;
      }
      
      .measures-label{
        width:20vw;
        display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 84vh;
      }
      
      .measures-label li {
        list-style: none;
        color: #5A5A5A;
        height: 10vh;
        margin: 1vh;
        width: 80%;
        text-align: right;
      }
      
    .horizontal-barchart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 84vh;
      width: 75vw;
      padding-left: 2.5vw;
      padding-right: 2.5vw;
    }

    .horizontal-barchart .bar {
      background: #0DA58E;
      height: 10vh;
      margin: 1vh;
      border-radius: 40px;
    }
      
        .label {
      background-color: #5A5A5A;
          margin-top: 1vh;
          margin-bottom: 1vh;
      height: 8vh;
      width: 20%;
      text-align: center;
      padding: 2vh 1vw;
      color: #ccc;
      border-radius: 20px;
          margin:auto;
    }
    </style>
    </head>
    <body>
    <div class="widget-container">
        <h2>Overzicht datameterketting</h2>

        <br />
        
        <div class="container-barchart">
        <div class="measures-label">
      <li> Geplaatste meters
          </li>
          <li> MeterAdd meters
          </li>
          <li> Capability meters
          </li>
          <li> Positive capability meters
          </li>
          <li> Meterstanden dagelijks in HES
          </li>
          <li> Meterstanden dagelijks in C4E
          </li>
      </div>
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
            if (this._ready) {
                this.RenderChart(); 
            } else {
                console.log('not ready');
            }
            }
            
    
            RenderChart() {
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
                const percentageDifferencePC = 100 - (((previousvalue - currentvalue) / Math.abs(currentvalue)) * 100).toFixed(2);
                const percentageFC = 100 - (((firstvalue - currentvalue) / Math.abs(currentvalue)) * 100).toFixed(2);
              
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