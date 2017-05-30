$(function() {

	// Accordion minimal height
	var height = 400;

	// Launch functionality on hljs elements
	$('.hljs').each(function(){ // do this for each matched item

		// Set items
		var $item = $(this),
			$codebox = $item.find('code');
		
		// Create codebox links wrapper
		var $codeboxLinkWrapper = $('<div>', {
			class: 'codebox-links'
		}).appendTo($item)

		// Create copy to clipboard links
		$('<a>', { 
				class: 'codebox-link copy-to-clipboard'
		}).text('Copy to clipboard').click(function(e){

			// Prevent click default and propagation
			e.preventDefault()
			e.stopPropagation()

			// Get text
			var texto = $codebox.text();

			// Copy to clipboard
			copyToClipboard(texto)

		}).appendTo($codeboxLinkWrapper);

		// Create print links
		$('<a>', { 
				class: 'codebox-link print-code'
		}).text('Print').click(function(e){

			// Prevent click default and propagation
			e.preventDefault()
			e.stopPropagation()

			// Get text
			var texto = $codebox.text();

			// Copy to clipboard
			printElem($codebox);

		}).appendTo($codeboxLinkWrapper);

		// Accordion
		if ($(this).outerHeight() > height) { // search for <p> in context of current element
			$(this).addClass('accordion close');
			$(this).unbind("click");
			$(this).click(function(){
				var sel = getSelection().toString();
				if(!sel){
					$(this).toggleClass('close');
					console.log('click')
				}
			})
		}
	});


	// Copy text to clipboard
	function copyToClipboard(val) {

		var aux = document.createElement("input");
		aux.setAttribute("value", val);
		document.body.appendChild(aux);
		aux.select();
		document.execCommand("copy");

		document.body.removeChild(aux);
	}

	// Print
	function printElem(elem){
		var mywindow = window.open('', 'PRINT', 'height=800,width=800'),
			content = elem.text();

		mywindow.document.write('<html><head><title>' + document.title  + '</title>');
		mywindow.document.write('</head><body >');
		mywindow.document.write('<h1>' + document.title  + '</h1>');
		mywindow.document.write(content);
		mywindow.document.write('</body></html>');

		mywindow.document.close(); // necessary for IE >= 10
		mywindow.focus(); // necessary for IE >= 10*/

		mywindow.print();
		mywindow.close();

		return true;
	}
	
});