$(function() {

  // Accordion minimal height
  var height = 400;

  // Launch functionality on hljs elements
  $('.hljs').each(function(){ // do this for each matched item

    // Set items
    var $item = $(this),
      $codebox = $item.find('code');

    // Create copy to clipboard links
    $('<a>', { 
        class: 'copy-to-clipboard'
    }).text('Copy to clipboard').click(function(e){

      // Prevent click default and propagation
      e.preventDefault()
      e.stopPropagation()

      // Get text
      var texto = $codebox.text();

      // Copy to clipboard
      copyToClipboard(texto)

    }).appendTo($item);

    // Copy text to clipboard
    function copyToClipboard(val) {

      var aux = document.createElement("input");
      aux.setAttribute("value", val);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");

      document.body.removeChild(aux);
    }

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
});