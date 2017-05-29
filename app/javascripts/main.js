$(function() {
  // $(document).foundation();

  var $sidebar = $('#sidebar');
  if ($sidebar.length) {
    var $docs = $('#docs');
    var $nav = $sidebar.find('nav');

    //
    // Setup sidebar navigation
    var traverse = new Traverse($nav, {
      threshold: 10,
      barOffset: $sidebar.position().top
    });

    $nav.on('update.traverse', function(event, element) {
      $nav.find('section').removeClass('expand');
      var $section = element.parents('section:first');
      if ($section.length) {
        $section.addClass('expand');
      }
    });

    //
    // Bind the drawer layout
    var $drawerLayout = $('.drawer-layout'),
      $drawer = $drawerLayout.find('.drawer'),
      closeDrawer = function() {
        $drawer.removeClass('slide-right slide-left');
        $drawer.find('.drawer-overlay').remove();
        $drawerLayout.removeClass('drawer-open drawer-slide-left-large drawer-slide-right-large');
        return false;
      };

    // Drawer open buttons
    $drawerLayout.find('[data-drawer-slide]').click(function(e) {
      var $this = $(this),
        direction = $this.data('drawer-slide');
      $drawerLayout.addClass('drawer-open');
      $drawer.addClass('slide-' + direction);

      var $overlay = $('<a href="#" class="drawer-overlay"></a>')
      $drawer.append($overlay);
      $overlay.click(closeDrawer);

      return false;
    });

    // Drawer close buttons
    $drawerLayout.find('[data-drawer-close]').click(closeDrawer);
  }

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
