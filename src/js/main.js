onload = function() {
  starAction();
  bgBlurPosition();
}

onresize = function() {
  bgBlurPosition();
}


var starAction = function() {
  var stars = document.getElementsByClassName('item-action');

  for(var i = 0; i < stars.length; i++) {
    stars[i].addEventListener('click', function() {
      this.classList.toggle('active');
    }, false);
  }
}

var bgBlurPosition = function() {
  var bluredBg = document.getElementById('blured-bg'); 

  var style = document.createElement("style");
  document.head.appendChild(style);
  sheet = style.sheet

  sheet.addRule('#blured-bg::after','top: -'+ bluredBg.offsetTop +'px');
  sheet.addRule('#blured-bg::after','left: -'+ bluredBg.offsetLeft +'px');
  sheet.addRule('#blured-bg::after','height: '+ document.body.scrollHeight +'px');
  sheet.addRule('#blured-bg::after','width: '+ document.body.offsetWidth +'px');
}
