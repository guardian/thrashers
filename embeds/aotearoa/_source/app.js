;(function ( global ) {

  var app = {

    database: null,

    template: `<li class="special_card_holder spotlight-row__item spotlight-row__item--span-1">
        <div class="facia-snap spotlight-item">
          <div class="doc-card">
    <div class="fc-item__media-wrapper">
      <div class="fc-item__image-container u-responsive-ratio">
        <picture><!--[if IE 9]><video style="display: none;"><![endif]-->
        <img alt="" class="responsive-img" src="{{image}}"></picture>
      </div>
    </div>
    <div class="fc-item__content {{class}}">
      <div class="fc-item__header">
        <h3 class="fc-item__title"><a class="fc-item__link" data-link-name="article" href="{{url}}"><span class="fc-item__kicker">{{kicker}}</span> <span class="u-faux-block-link__cta fc-item__headline"><span class="js-headline-text">{{headline}}</span></span></a></h3>
      </div>
      <div class="fc-item__standfirst-wrapper">
        <div class="fc-item__standfirst">
          {{headline}}
        </div>
        <div class="fc-item__meta js-item__meta"></div>
      </div>
    </div><a aria-hidden="true" class="u-faux-block-link__overlay js-headline-text" data-link-name="article" href="{{url}}" tabindex="-1">{{headline}}</a>
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

    interval: null,

    exists: function() {

      if (document.getElementById("new-zealand-/-aotearoa")===null) {
          app.interval = setInterval(function(){ app.flighcheck(); }, 500);
      }

    },

    flighcheck: function() {

      console.log("Bee bee beep")

      if (window.guardian) {

        try {

          if (window.guardian.config.page.pageAdTargeting.cc==='NZ') {

            clearInterval(app.interval);

            app.interval = null

            app.loader()

          }

        }
        catch(err) {
          console.log(err)
        }

      }

    },

    loader: function() {

        var xhr = new XMLHttpRequest();
        var url = "https://interactive.guim.co.uk/docsdata/1EimatdatzPlJw5oYlrypJ3DOnsKJPDIhh_C2Ro5Naf0.json";
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () { 
            if (xhr.readyState == 4 && xhr.status == 200) {

                var json = JSON.parse(xhr.responseText);

                app.database = json.sheets.container
                  
                app.render()
               
            }
        }
        xhr.send();
    },

    render: function() {

      var target = document.getElementById("app"); 

      var html = ''

      for (var i = 0; i < app.database.length; i++) {

        html += app.mustache(app.template, app.database[i])

      }

      target.innerHTML = html

      var fin = document.querySelector('.aotearoa__wrapper');

      fin.style.display = 'block'

    }

  }

  var aotearoa = (function() {

    app.exists()

  }());

  // CommonJS module
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = aotearoa;
  }

  // AMD module
  else if ( typeof define !== 'undefined' && define.amd ) {
    define( function () { return aotearoa; });
  }

  // browser global
  else {
    global.aotearoa = aotearoa;
  }
}((typeof window !== 'undefined') ? window : this ));
