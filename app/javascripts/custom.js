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
				class: 'codebox-link copy-to-clipboard hide-on-print'
		}).text('Copy to clipboard').click(function(e){

			// Prevent click default and propagation
			e.preventDefault()
			e.stopPropagation()

			// Get text
			var texto = $codebox.text();

			// Copy to clipboard
			copyToClipboard(texto)

		}).appendTo($codeboxLinkWrapper);

		// // Create print links
		// $('<a>', { 
		// 		class: 'codebox-link print-code hide-on-print'
		// }).text('Print').click(function(e){

		// 	// Prevent click default and propagation
		// 	e.preventDefault()
		// 	e.stopPropagation()

		// 	// Get text
		// 	var texto = $codebox.text();

		// 	// Copy to clipboard
		// 	printElem($codebox);

		// }).appendTo($codeboxLinkWrapper);

		// Accordion
		if ($(this).outerHeight() > height) { // search for <p> in context of current element
			$(this).addClass('accordion close');
			$(this).unbind("click");
			$(this).click(function(){
				var sel = getSelection().toString();
				if(!sel){
					$(this).toggleClass('close open');
				}
			})
		}
	});

	// ScrollMagic controller
	var controller = new ScrollMagic.Controller();

	// Create anchor links
	$('nav a').each(function(){
		var anchor      = $(this).attr('href'),
			linkUrl     = window.location.href.split('#')[0] + anchor,
			$icon       = $('<i>').addClass('fa fa-link').attr('aria-hidden', 'true'),
			$anchorLink = $('<a>').attr('href', anchor).addClass('is-anchor-link'),
			$anchor     = $(anchor).addClass('is-anchor');

		// Create objects on DOM
		$anchorLink.append($icon);
		$anchor.append($anchorLink);

		// Create the scene
		new ScrollMagic.Scene({
			triggerElement: anchor,
			duration: 0,	// the scene should last for a scroll distance of 100px
			offset: 500		// start this scene after scrolling for 50px
		})
		.setClassToggle(anchor, 'active')
		.on('start', function(event){
			window.history.pushState("object or string", "Title", anchor);
			// window.location.hash = anchor;
		})
		.addTo(controller); // assign the scene to the controller
	})

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