console.log('on load');

if (window.XMLHttpRequest) {
   xhttp = new XMLHttpRequest();
} else {
   xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xhttp.overrideMimeType('text/xml');
// xhttp.open("GET", 'https://www.theguardian.com/us-news/series/the-campaign-minute-2016', false);
xhttp.open("GET", 'https://localhost:8000/embeds/the-minute-snap/hashed/rss.349b8b71.xml', false);
xhttp.send(null);
xmlDoc = xhttp.responseXML;

var item = xmlDoc.getElementsByTagName("item")[0];

document.getElementsByClassName('the-minute-snap__wrapper')[0].innerHTML = document.getElementsByClassName('the-minute-snap__wrapper')[0].innerHTML.replace('__HEADLINE__', item.getElementsByTagName("title")[0].childNodes[0]).replace('__IMAGE__', item.getElementsByTagName('media:content')[1].getAttribute('url'));
