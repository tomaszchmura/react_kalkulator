import payroll from './payroll'

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector("#inputSelections").addEventListener("input", (event) => {
        var bruttoEl = document.querySelector("#brutto");
        var nettoEl = document.querySelector("#netto");
        var brutto = bruttoEl.value;

        if (brutto > 2600) {

            var oParam = [];
            var oWpbp = [];
            var obj = [];

            obj = readParam(oParam, "#pracNam");
            oParam.push(obj);
            obj = readParam(oParam, "#do26l");
            oParam.push(obj);
            obj = readParam(oParam, "#ppkOn");
            oParam.push(obj);

            var netto = payroll.wNetto(brutto, netto, oParam, oWpbp);
            nettoEl.value = netto;

            var podatekEl = document.querySelector("#Podatek");
            podatekEl.value = exportValues(oWpbp, "Podatek");

            var sklSpolEl = document.querySelector("#sklSpoleczne");
            sklSpolEl.value = exportValues(oWpbp, "Składki społeczne");

            var zdrowotnaEl = document.querySelector("#sklZdr");
            zdrowotnaEl.value = exportValues(oWpbp, "Składka zdrowotna");

        }

    });
})


function exportValues(oWpbp, variableName) {
    
    const indexTab = oWpbp.findIndex(num => {
        return num.variableName === variableName;
    });
    return oWpbp[indexTab].value;
}

function readParam(oParam, paramName) {
    
    var paramEl = document.querySelector(paramName);
    
    if (typeof(paramEl.checked) === "boolean") {
        
    var obj = {
            property: paramName,
            value: paramEl.checked
        };
    }
    return obj;
}