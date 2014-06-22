var postAceInit = function(hook, context){
  if(draw){
    if(draw.onByDefault){ // Setup testing else poop out
      if(draw.onByDefault === 'true'){
        enabledraw(draw.key);
        showdraw();
      }
    }
    else{
      $("#draw").hide();
      // we don't draw it by default
    }

    $('.toggle_draw').click(function() {
        if ($('#draw').is(':visible')) {
            $('#draw').hide();
        } else {
            enabledraw(draw.key);
            showdraw();
        }
    });
  }
}

function enabledraw(key){

  var authorName = 'Testing';
  var authorColor = $('#myswatch').css('background-color');

  var padID = window.location.href.substr((location.protocol+"//"+window.location.hostname+"/p/").length);

  if (padID.indexOf("?")!= -1) { 
    padID = padID.substr(0,padID.indexOf("?"));
  }
  
  if($("#draw").length === 0){ // If it's not available already tehn draw it
    $("#editorcontainer").prepend("<div id=draw><iframe id='drawEmbed' src='http://draw.etherpad.org/d/"+padID+"?authorName="+authorName+"&authorColor="+authorColor+"' width='100%' height='100%' style='border:none' frameborder='0' scrolling='no'></iframe></div>");
  }
}

function showdraw(){
  enabledraw(draw.key);
  $("#draw").css({"z-index":"999999", "position":"absolute", "top":"0px", "right":"0px", "height":"200px", "width":"200px", "border":"1px solid #ccc"});
  $("#drawEmbed").show().css({"overflow":"hidden"});
  $("#draw").hover(function(){
    clearTimeout($(this).data('timeout'));
    $("#draw").animate({"width":"400px", "height": "400px"});;
  }, function(){
    var t = setTimeout(function() { // Dont zoom out right away, wait a while
      $("#draw").animate({"width":"200px", "height": "200px"});;
    }, 500);
    $(this).data('timeout', t);
  });
}

function hidedraw(){
  $("#draw").hide();
}

function toggledraw(){
  if($("#drawEmbed").is(":visible")){
    hidedraw();
  }else{
    showdraw();
  }
}

$(".drawButton").click(function(){ /* On click listener for draw button */
  toggledraw();
});

exports.postAceInit = postAceInit;
exports.enabledraw = enabledraw;
exports.showdraw = showdraw;
exports.hidedraw = hidedraw;
