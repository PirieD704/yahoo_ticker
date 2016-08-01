var storedItems = localStorage.getItem('theSymbols');
console.log(storedItems);


$(document).ready(function(){
	$('#symbol').attr('placeholder', storedItems);

	$('.yahoo-form').submit(function(){
		event.preventDefault();
		var symbol = $('#symbol').val();
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + symbol + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		console.log(url);
		$.getJSON(url, function(theDataJSFound){
			console.log(theDataJSFound);
			buildNewTable(theDataJSFound.query.results.quote);
			var stockInfo = theDataJSFound.query.results.quote
			var stockCount = theDataJSFound.query.count;
			if(stockCount > 1){
				var newHTML = '';
				for(var i = 0; i<stockInfo.length; i++){
				newHTML += buildNewTable(stockInfo[i]);
				}
			}else{
				newHTML += buildNewTable(stockInfo);
			}
			$('.yahoo-body').html(newHTML);
			$('.table').DataTable();
		});
	});
	$('.save-form').click(function(){
		getMyLocalStorage();
	});
});



function buildNewTable(stockInfo){

	if(stockInfo.Change > 0){
		var upDown = "success";
	}else if(stockInfo.Change < 0){
		var upDown = "danger";
	}

	var newHTML = '';
	newHTML = '<tr><td>' + stockInfo.Symbol + '</td>';
	newHTML += '<td>' + stockInfo.Name + '</td>';
	newHTML += '<td>' + stockInfo.Ask + '</td>';
	newHTML += '<td>' + stockInfo.Bid + '</td>';
	newHTML += '<td class="'+upDown+'">' + stockInfo.Change + '</td></tr>';
	return newHTML;
};




function getMyLocalStorage(){
	var theTable = $('.yahoo-body tr');
	var stockSymbolSave = '';
	for (var i = 0; i < theTable.length; i++){
		console.log(theTable[i].children[0].innerHTML);
		stockSymbolSave += theTable[i].children[0].innerHTML +', ';
	}
	console.log(stockSymbolSave)
	localStorage.setItem('theSymbols', stockSymbolSave)
}









































