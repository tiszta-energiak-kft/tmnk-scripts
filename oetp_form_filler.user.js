// ==UserScript==
// @name         OETP űrlap kitöltő gomb
// @namespace    https://www.tisztaenergiak.hu/
// @version      1.0.0
// @description  OETP pályázathoz NFFKU form kitöltő
// @match        https://www.odoo.sh/*
// @grant        GM_getValue
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    async function getApiToken(){
        const password = await GM_getValue("apiPassword");
        if (!password) {
            alert("Please set your API password via the Tampermonkey menu first.");
            return;
        }
        return password
    }

    console.log('TAMPERMONKEY RUNNING')
    getApiToken().then(pw => console.log(pw))

})();