;(function ( global ) {

  var app = {

    mustache: function(l, a, m, c) {

        function h(a, b) {
            b = b.pop ? b : b.split(".");
            a = a[b.shift()] || "";
            return 0 in b ? h(a, b) : a
        }
        var k = app.mustache,
            e = "";
        a = Array.isArray(a) ? a : a ? [a] : [];
        a = c ? 0 in a ? [] : [1] : a;
        for (c = 0; c < a.length; c++) {
            var d = "",
                f = 0,
                n, b = "object" == typeof a[c] ? a[c] : {},
                b = Object.assign({}, m, b);
            b[""] = {
                "": a[c]
            };
            l.replace(/([\s\S]*?)({{((\/)|(\^)|#)(.*?)}}|$)/g, function(a, c, l, m, p, q, g) {
                f ? d += f && !p || 1 < f ? a : c : (e += c.replace(/{{{(.*?)}}}|{{(!?)(&?)(>?)(.*?)}}/g, function(a, c, e, f, g, d) {
                    return c ? h(b, c) : f ? h(b, d) : g ? k(h(b, d), b) : e ? "" : (new Option(h(b, d))).innerHTML
                }), n = q);
                p ? --f || (g = h(b, g), e = /^f/.test(typeof g) ? e + g.call(b, d, function(a) {
                    return k(a, b)
                }) : e + k(d, g, b, n), d = "") : ++f
            })
        }
        return e
    },

    loader: function() {

        var xhr = new XMLHttpRequest();
        var url = "https://interactive.guim.co.uk/docsdata/1NU_hQ2yJ1C4U26hBlH8XJrN4ei9M8_z6FypKzwx4TII.json";
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () { 
            if (xhr.readyState == 4 && xhr.status == 200) {

                var json = JSON.parse(xhr.responseText);

                if (json.sheets.Sheet1.length > 3) {
                  app.database = app.chunkArrayInGroups(json.sheets.Sheet1, 2)
                  app.render()
                } else {
                  console.log("Nothing to report")
                }
               
            }
        }
        xhr.send();
    },

    render: function() {

      var html = ''

      for (var i = 0; i < app.googledoc.length; i++) {

        let url = (app.googledoc[i].url!="") ? true : false ;

        let listicle = app.listicle(url);

        let ltx = {

          electorate: app.googledoc[i].electorate,

          url: app.googledoc[i].url,

          image: app.googledoc[i].image

        }

        html += app.mustache(listicle, ltx)

      }

      document.getElementById("app_electorate").innerHTML = html


    }

    listicle: function(url) {   

      var murl = `<li class="special_card_holder spotlight-row__item spotlight-row__item--span-1">
            <div class="facia-snap spotlight-item">
              <a class="doc-card-link" target="_blank" href="{{url}}">
                <div class="doc-card">
                  <div class="doc-card__poster dropped" style="background-image: url(http://interactive.guim.co.uk/2019/02/election-selection/{{image}});"></div>
                  <div class="doc-card__meta">
                    {{{electorate}}}
                  </div>
                </div>
              </a>
            </div>
          </li>`;

      var nurl = `<li class="special_card_holder spotlight-row__item spotlight-row__item--span-1">
            <div class="facia-snap spotlight-item">
              <div class="doc-card">
                <div class="doc-card__poster grayed" style="background-image: url(http://interactive.guim.co.uk/2019/02/election-selection/inner_city.jpg);"></div>
                <div class="doc-card__meta faded">
                  {{{electorate}}}
                </div>
              </div>
            </div>
          </li>`;

        return (url) ? murl : nurl ;
    }

  }

  var spotlight = (function() {

    app.loader()

  }());

  // CommonJS module
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = spotlight;
  }

  // AMD module
  else if ( typeof define !== 'undefined' && define.amd ) {
    define( function () { return spotlight; });
  }

  // browser global
  else {
    global.spotlight = spotlight;
  }
}((typeof window !== 'undefined') ? window : this ));
