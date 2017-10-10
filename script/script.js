var currencyRateModule = (function() {
	var DATE = "01.01.2003";

	$(document).ready(function() {
		_getCurrencyRates();
	})

	class currencyRate {
		constructor(date, rate, currId) {
			this.date = date,
			this.rate = rate,
			this.currencyId = currId
		}
	}

	var _conversionService = function(value, currencyFrom, currencyTo, date) {
		var currFrom, currTo;
		var currFromFound = false, currToFound = false;

		for(var i = 0; i < rates.length; i++) {

			if(!currFromFound && rates[i].currencyId == currencyFrom) {
				if(currFrom == undefined)
					currFrom = rates[i];
				if(rates[i].date == date) {
					currFromFound = true;
					currFrom = rates[i];
				}
				if(new Date(currFrom.date) < new Date(rates[i].date) && 
					new Date(date) > new Date(rates[i].date)) {
					currFrom = rates[i];
				}
			}

			if(!currToFound && rates[i].currencyId == currencyTo) {
				if(currTo == undefined)
					currTo = rates[i];
				if(rates[i].date == date) { 
					currToFound = true;
					currTo = rates[i];
				}
				if(new Date(currTo.date) < new Date(rates[i].date) && 
					new Date(date) > new Date(rates[i].date)) {
					currTo = rates[i];
				}
			}

		}

		return value / currFrom.rate * currTo.rate;
	}

	var rates = [
		new currencyRate("01.01.2000",1,1), 
		new currencyRate("01.01.2000",10,2), 
		new currencyRate("01.01.2001",100,2), 
		new currencyRate("01.01.2000",50,3), 
		new currencyRate("01.01.2002",5,3), 
		new currencyRate("01.01.2001",25,4), 
		new currencyRate("01.01.2005",20,4), 
		new currencyRate("01.01.2000",50,5), 
		new currencyRate("01.01.2000",80,6) 
	];
	
	var currencies = {1:"USD", 2:"RUB", 3:"BYN", 4:"EUR", 5:"GBP", 6:"PLN"};
	var indexCurrencies = 1;

	var timer;
	
	var _getCurrencyRates = function() {
		$("#currencies").append("<table></table>");
		$("table").append("<tr></tr>");
		$("tr").append("<td></td>");
		for(var i = 1; i <= Object.keys(currencies).length; i++) {
			$("tr").append("<td style='background: grey'>" + currencies[i] + "</td>");
		}
		$("td").css("width", "60px");
		$("tr").css("text-align", "center");
		
		_getCurrencyRatesRecursion();
	}

	var _getCurrencyRatesRecursion = function() {
		$("tbody").append("<tr class=" + indexCurrencies + "><td>" + currencies[indexCurrencies] + "</td></tr>");
		for(var i = 1; i <= Object.keys(currencies).length; i++) {
			$("."+indexCurrencies).append("<td>" + _conversionService(1,indexCurrencies,i,DATE) + "</td>");
		}
		
		indexCurrencies++;
		if(indexCurrencies > Object.keys(currencies).length) {
			clearTimeout(timer);
		}
		else {
			timer = setTimeout(_getCurrencyRatesRecursion, 100);
		}	
	}
}());