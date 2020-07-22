import common from './common';


function payroll () {
    
return {
		pay: {
			sklZdr: 0,
			sklSpoleczne: 0,
			sklZdrDoOpodatkowania: 0,
			podatek: 0,
			podsZdrowotna: 0,
			podsOpodatkowania: 0,
			pracNam: false,
			do26l: false,
			ppkOn: false,
			kwotaWolna: 0,
			kup: 0,
			sklEme: 0,
			sklRen: 0,
			sklCho: 0,
			ppk: 0,
			netto: 0,
			tax: 0
		},

		wNetto: function (vGross, netto, oParam, oWpbp) {
			// debugger
            // Object.entries(this);
            debugger
			this.pay.pracNam = common.getProp("#pracNam", oParam);
			this.pay.do26l = common.getProp("#do26l", oParam);
			this.pay.ppkOn = common.getProp("#ppkOn", oParam);
			
			if (this.pay.pracNam) {
				this.pay.kup = 250;
			} else {
				this.pay.kup = 300;
			}
			this.wyliczSkladki(vGross);
			this.wyliczZdrowotna(vGross);
			this.wyliczPodstawaOpodatkowania();
			this.wyliczPodatek();
			this.wyliczPPK(vGross);
			this.wNet(vGross);
			common.addWt(this.pay, this.descriptions, oWpbp);
			return this.pay.netto;
		},

		wyliczSkladki: function (vGross) {

			this.pay.sklEme = vGross * 0.0976;
			this.pay.sklRen = vGross * 0.015;
			this.pay.sklCho = vGross * 0.0245;
			this.pay.sklEme = common.fnRound(this.pay.sklEme);
			this.pay.sklRen = common.fnRound(this.pay.sklRen);
			this.pay.sklCho = common.fnRound(this.pay.sklCho);
			
			this.pay.sklSpoleczne = this.pay.sklEme + this.pay.sklRen + this.pay.sklCho;
			this.pay.sklSpoleczne = common.fnRound(this.pay.sklSpoleczne);
		},

		wyliczZdrowotna: function (vGross) {

			this.pay.podsZdrowotna = vGross - this.pay.sklSpoleczne;
			this.pay.sklZdr = this.pay.podsZdrowotna * 0.09;
			this.pay.sklZdrDoOpodatkowania = this.pay.podsZdrowotna * 0.0775;
			this.pay.sklZdrDoOpodatkowania = common.fnRound(this.pay.sklZdrDoOpodatkowania);
			this.pay.sklZdr = common.fnRound(this.pay.sklZdr);
		},

		wyliczPodstawaOpodatkowania: function () {
			this.pay.podsOpodatkowania = this.pay.podsZdrowotna - this.pay.kup;
			this.pay.podsOpodatkowania = common.fnRound(this.pay.podsOpodatkowania);
		},

		wyliczPodatek: function () {
			this.whichTax();
			this.whichTaxFreeAmount();			
			debugger
			if (this.pay.do26l) {
				this.pay.podatek = this.pay.podsOpodatkowania * this.pay.tax;
				this.pay.podatek -= this.pay.kwotaWolna;
				this.pay.podatek -= this.pay.sklZdrDoOpodatkowania;
				this.pay.podatek = common.fnRound(this.pay.podatek);
			} else {
				this.pay.podatek = 0;
			}
			this.pay.podatek = common.fnRound(this.pay.podatek);
			return this.pay.podatek;

		},

		wyliczPPK: function (vGross) {
			if (this.pay.ppkOn) {
				this.pay.ppk = vGross * 0.02;
				this.pay.ppk = common.fnRound(this.pay.ppk);
			}
		},

		wNet: function (vGross) {
			this.pay.netto = vGross - this.pay.sklSpoleczne - this.pay.sklZdr - this.pay.podatek - this.pay.ppk;
			this.pay.netto = common.fnRound(this.pay.netto);
		},

		whichTax: function () {
			
			if (this.pay.podsOpodatkowania <= 85528) {
				this.pay.tax = 0.17;
			} else if (this.pay.podsOpodatkowania > 85528) {
				this.pay.tax = 0.32;
			}
		},

		whichTaxFreeAmount: function () {
			debugger
			if (this.pay.podsOpodatkowania <= 8000.00) {
				this.pay.kwotaWolna = 1360 / 12;
			} else if (this.pay.podsOpodatkowania > 8000 && this.pay.podsOpodatkowania <= 13000) {
				this.pay.kwotaWolna = ( ( 1360 - (834.88 * (this.pay.podsOpodatkowania - 8000) / 5000) ) / 12 );
			} else if (this.pay.podsOpodatkowania > 13000 && this.pay.podsOpodatkowania <= 85528) {
				this.pay.kwotaWolna = 556.02 / 12;
			} else if (this.pay.podsOpodatkowania > 85528 && this.pay.podsOpodatkowania <= 12700) {
				this.pay.kwotaWolna = ( 556.02 / 12 ) - (525.12 * (this.pay.podsOpodatkowania - 85528) / 41472);
			}
			this.pay.kwotaWolna = common.fnRound(this.pay.kwotaWolna);
			this.pay.kwotaWolna = 43,76;
		},

		descriptions: {
			pl: {
				netto: "Netto",
				sklZdr: "Składka zdrowotna",
				sklSpoleczne: "Składki społeczne",
				sklZdrDoOpodatkowania: "Składka zdrowotna do opodatkowania",
				podatek: "Podatek",
				podsZdrowotna: "Podstawa zdrowotna",
				podsOpodatkowania: "Podstawa opodatkowania",
				kup: "Koszty uzyskania przychodów",
				sklEme: "Składka emerytalna",
				sklRen: "Składka rentowa",
				sklCho: "Składka chorobowa",
				ppk: "Pracownicze plany kapitałowe"
			},
			en: {
				netto: "Net",
				sklZdr: "Health care contribution",
				sklSpoleczne: "Social contributions",
				sklZdrDoOpodatkowania: "Taxable health contribution",
				podatek: "Tax",
				podsZdrowotna: "Health basis",
				podsOpodatkowania: "The tax base",
				kup: "Tax deductible costs",
				sklEme: "Pension contribution",
				sklRen: "Disability contribution",
				sklCho: "Sickness contribution",
				ppk: "Employee capital plans"
			}
		}

}
}

export default  payroll() ;