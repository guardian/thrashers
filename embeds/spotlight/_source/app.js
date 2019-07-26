;(function ( global ) {

  var app = {

    database: null,

    template: `<li class="special_card_holder spotlight-row__item spotlight-row__item--span-1">
        <div class="facia-snap spotlight-item">
          <div class="doc-card">
            <div class="doc-card__poster" style="background-image: url({{image}});"><div style="{{position}}:10px;" class="text_box"><span style="background-color:{{background_colour}};color:{{text_colour}}">{{{project}}}</span></div></div>
            <div class="doc-card__meta">
              <p>{{{headline}}}</p><a class="doc-card__link" href="{{url}}"></a>
            </div>
          </div>
        </div>
      </li>`,

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

    chunkArrayInGroups: function(arr, size) {
        var result =  arr.reduce((all,one,i) => {
               const ch = Math.floor(i/size); 
               all[ch] = [].concat((all[ch]||[]),one); 
               return all
            }, [])

        return result
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

      var target = document.getElementById("app"); 

    for (var i = 0; i < app.database.length; i++) {

      var div = document.createElement('div');
          div.className = "elastic_band";
      var elastic_band = app.database[i]
      var html = ''
      for (var ii = 0; ii < elastic_band.length; ii++) {
        html += app.mustache(app.template, elastic_band[ii])
      }
      div.innerHTML = html
      target.appendChild(div)

    }

    var fin = document.querySelector('.spotlight__wrapper');

    fin.style.display = 'block'

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
