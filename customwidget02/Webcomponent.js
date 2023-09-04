(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `<button type="button" id="myBtn">Helper Button</button>` ;   
   
    class PerformanceHelp extends HTMLElement {
        constructor() {
            super();
            this.init();           
        }

        init() {            
              
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(tmpl.content.cloneNode(true));          
        }
        
    }

    customElements.define('pyramid-graph', PerformanceHelp);
})();