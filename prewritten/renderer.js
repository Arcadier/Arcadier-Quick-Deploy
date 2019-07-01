var baseUrl = document.currentScript.src;

baseUrl = baseUrl.replace("renderer.js", "");

// file to be rendered in
var renderFile = "../render.html";

var url = baseUrl + renderFile;
url = url.replace("https://", "https://cors-anywhere.herokuapp.com/")
var settings = {
    "url": url,
    "method": "GET",
    "async": false
};

$.ajax(settings).done(function (Response) {
    htmlString = Response;
});

// console.log(htmlString);

var h = $.parseHTML(htmlString);
// console.log(h);

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


var re = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
var l = htmlString.match(re);
var scripts = [];
if (l)
{

  var urls = [];
  for (var i = 0; i < l.length; i++) {
      var currStr = l[i];
      currStr = currStr.replace(/<script[\s\S]*?>/gi, "");
      currStr = currStr.replace("</script>", "");
      if (currStr != "") {
          scripts.push(currStr);
      }
      else {
          var extScript = l[i];
          extScript = extScript.replace('<script type="text/javascript" src="', "");
          extScript = extScript.replace('"></script>', "");
          urls.push(extScript);
      }

      // console.log(l[i]);
  }
}



// for (var i = 0; i < urls.length; i++) {
//     var newScript = document.createElement("script");
//     newScript.type = 'text/javascript';
//     newScript.src = urls[i];
//     document.head.appendChild(newScript);
// }

// console.log(urls);

function callAtStart() {

    var l = document.getElementById("allFrontEnd");
    for (var i = 0; i < h.length; i++) {
        // console.log(h[i]);
        l.appendChild(h[i]);
    }



    for (var i = 0; i < scripts.length; i++) {
        var newScript = document.createElement("script");
        newScript.type = 'text/javascript';
        var code = document.createTextNode(scripts[i]);
        newScript.appendChild(code);
        l.appendChild(newScript);
    }
}

callAtStart();
