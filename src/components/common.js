

function common () {
    
    return {

add: function (variableName, name, oWpbp) {

    var obj = [];

    obj = {
        variableName: variableName,
        value: name
    };
    oWpbp.push(obj);

},

addWt: function (pay, desc, oWpbp) {

// var lang = sap.ui.getCore().getConfiguration().getLanguage();
var lang = 'pl';
    if (lang === "pl") {
        var ln = desc.pl;
    } else if (lang === "en") {
        ln = desc.en;
    }
    for (var property in ln) {
        if (ln.hasOwnProperty(property)) {
            var variableName = ln[property];
            var value = pay[property];
            this.add(variableName, value, oWpbp);
        }
    }
},

wyliczKup: function (vGross, sklSpoleczne, oParam) {
    var kup,
        kupproc,
        kupproc20 = this.getProp("/pR11Sel", oParam),
        kupproc50 = this.getProp("/pR12Sel", oParam);
        
    if (kupproc20) {
        kupproc = 20;
    } else {
        kupproc = 50;
    }
    kup = (vGross - sklSpoleczne) * kupproc / 100;
    return kup;
},

getProp: function (feature, oParam) {
    var value;

    for (var j = 0; j < oParam.length; j++) {
        if (oParam[j].property === feature) {
            value = oParam[j].value;
        }
    }
    return value;
},

fnRound: function (vValue) {
    
    var factor = Math.pow(10, 3);
    vValue = Math.round(Math.round(vValue*factor)/10);
    return vValue/(factor/10);

    }
};

}
export default  common() ;