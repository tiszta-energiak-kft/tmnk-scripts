// ==UserScript==
// @name         OETP űrlap kitöltő gomb
// @namespace    https://www.tisztaenergiak.hu/
// @version      1.0.0
// @description  OETP pályázathoz NFFKU form kitöltő
// @match        https://www.otthonienergiatarolo.neuzrt.hu/palyazatok/OETP-2026-*
// @grant        GM_getValue
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function getPostParams(){
        let params = {}
        document.querySelectorAll('div.panel-footer div.row div[class^="col-sm-"]').forEach(el => {
            if (el.textContent.includes('Pályázó egyedi azonosítója:')){
                const id = el?.innerText.split('\n')[1].trim();
                params.palyazati_azonosito = id
            }
        });

        return params
    }

    async function fetchOdoo(postParams){
        console.log(postParams)

        return {
            'megvalositasi_iranyitoszam': 1139,
            'megvalositasi_hrsz': '26128/1',
            'megvalositas_termeszetbenicim': '1',
            'megvalositasi_kozterulet_neve': 'Röppentyű',
            'megvalositasi_kozterulet_tipusa': 'utca',
            'megvalositasi_hazszam_emelet_ajto': '62',
            'tarsashaz': '0',
            'palyazo_szuletesi_datum': '1992.03.21.',
            'palyazo_iranyitoszam': 1139
        }
    }

    function actionLoadData(){
        const postParams = getPostParams()

        fetchOdoo(postParams).then(odooData => {
            console.log(odooData)
            for(const [key, value] of Object.entries(odooData)){
                const inputEl = document.querySelector(`#${key}`)
                if (!inputEl) return;
                inputEl.focus()
                inputEl.value = value
                triggerInputEvents(inputEl)
            }
        })
    }

    function createButton(){
        const container = document.querySelector(".container .row .col-md-3")
        if (!container) return;

        const buttonContainer = document.createElement('p')
        const button = document.createElement('button')

        button.textContent = 'Odoo lekérdezés'
        button.className = 'btn btn-info btn-block'

        button.addEventListener('click', actionLoadData)

        buttonContainer.appendChild(button)
        container.append(buttonContainer)
    }

    function triggerInputEvents(el) {
        const events = [
            'keydown',
            'keypress',
            'input',
            'keyup',
            'change',
            'blur'
        ];

        events.forEach(type => {
            el.dispatchEvent(new Event(type, { bubbles: true }));
        });
    }

    createButton()
})();