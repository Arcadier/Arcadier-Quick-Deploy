String.prototype.replaceAll = function (search, replacement) {
   var target = this;
   return target.split(search).join(replacement);
};

$.getMultiScripts = function (arr, path) {
   var _arr = $.map(arr, function (scr) {
       return $.getScript((path || "") + scr);
   });

   _arr.push($.Deferred(function (deferred) {
       $(deferred.resolve);
   }));

   return $.when.apply($, _arr);
}

var baseUrl = document.currentScript.src;

baseUrl = baseUrl.replace("server-files/renderer.js", "");

// file to be rendered in
var renderFile = "admin/html/index.html";

var url = baseUrl + renderFile;
url = url.replace("https://", "https://arcadier-cors.herokuapp.com/")
var settings = {
   "url": url,
   "method": "GET",
   "async": false
};

$.ajax(settings).done(function (Response) {

   htmlString = Response.replaceAll("http://", "https://");
});

// removing all comment lines before rendering the html page
var commentRegEx = /<!--([\s\S]*?)-->/g;
htmlString = htmlString.replace(commentRegEx, "");

var linkReg = /<link([\s\S]*?)>/g;
var links = htmlString.match(linkReg);
if (!links)
{
  links = [];
}
htmlString = htmlString.replace(linkReg, '');
for (i = 0; i < links.length; i++) {
   if (/rel=["']stylesheet["']/g.exec(links[i])) {
       if (/href=["']css\//g.exec(links[i])) {
           links[i] = links[i].replace("css/", baseUrl + "admin/css/")
       }
   };
}

// image tags being changed
var imageReg = /<img([^>]*?) src=["'](\.\/)?images([\s\S]*?)>/g;
var imgTag = htmlString.match(imageReg);
if (!imgTag)
{
  imgTag = [];
}
for (i = 0; i < imgTag.length; i++) {
   var currProcess = imgTag[i].replace(/src=["']/, "src=\"" + baseUrl + "admin/").replace("'", "\"");

   htmlString = htmlString.replace(imgTag[i], currProcess);
}
var htmlNodes = $.parseHTML(htmlString);
for (i = 0; i < links.length; i++) {
   htmlNodes.push($.parseHTML(links[i])[0]);
}

var scriptRegEx = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
var script = htmlString.match(scriptRegEx);

if (!script) script = [];
var scripts = [];
var http = [];
var nonHttp = [];
for (var i = 0; i < script.length; i++) {
   var currStr = script[i];
   currStr = currStr.replace(/<script[\s\S]*?>/, "");
   currStr = currStr.replace("</script>", "");

   if (currStr.replaceAll("\n","")!="") {
       scripts.push(currStr);
   }
   else {
       var extScript = script[i];
       var urlReg = /src=["']([\s\S]*?)["']/g;
       extScript = extScript.match(urlReg)[0].replace(/src=["']/, "").replace(/["']/, "");

       if (extScript.startsWith("https://") || extScript.startsWith("http://")) {
           http.push(extScript);
       } else {
           nonHttp.push(extScript);
       }

   }
}

for (i = 0; i < nonHttp.length; i++) {
   nonHttp[i] = baseUrl + "admin/" + nonHttp[i];
}

// var urls = http.concat(nonHttp);


$.getMultiScripts(http, '').done(function () {
   // all scripts loaded
   var front = document.getElementById("allFrontEnd");
   for (var i = 0; i < htmlNodes.length; i++) {
       front.appendChild(htmlNodes[i]);
   }
   if (scripts.length) {
       for (var i = 0; i < scripts.length; i++) {
           var newScript = document.createElement("script");
           newScript.type = 'text/javascript';
           var code = document.createTextNode(scripts[i]);
           newScript.appendChild(code);
           front.appendChild(newScript);
       }
   }
});

$.getMultiScripts(nonHttp).done(function(){
    console.log("Done");
  });
