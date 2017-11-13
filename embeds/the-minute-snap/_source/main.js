if (window.XMLHttpRequest) {
   xhttp = new XMLHttpRequest();
} else {
   xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xhttp.overrideMimeType('text/xml');
xhttp.open("GET", 'https://www.theguardian.com/us-news/series/the-campaign-minute-2016/rss', false);
// xhttp.open("GET", 'https://localhost:8000/embeds/the-minute-snap/hashed/rss.349b8b71.xml', false);
xhttp.send(null);
xmlDoc = xhttp.responseXML;

console.log(xmlDoc);

var item = xmlDoc.getElementsByTagName("item")[0];

document.getElementsByClassName('the-minute-snap__wrapper')[0].innerHTML = document.getElementsByClassName('the-minute-snap__wrapper')[0].innerHTML.replace('<!-- HEADLINE -->', item.getElementsByTagName("title")[0].childNodes[0].textContent.replace(' | The minute', '')).replace('cool-src', 'src=\'' + item.getElementsByTagName('media:content')[1].getAttribute('url') + '\'');