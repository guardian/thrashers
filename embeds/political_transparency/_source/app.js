;(function ( global ) {

  var app = {

    x: 0,

    y: 0,

    database: [],

    template: `<div style="background-color: {{colour}}; {{background}}" class="political_block" data-url="{{url}}"><div class="political_expander"><span style="color:white">{{{title}}}</span><p>{{description}}</p></div></div>`,

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
        var url = "https://interactive.guim.co.uk/docsdata/1LpJQBtRBYSfzmJwWQSdr5khWoZHQEjYA-blSEzP9E3M.json";
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () { 
            if (xhr.readyState == 4 && xhr.status == 200) {

                var json = JSON.parse(xhr.responseText);

                app.googledoc = json.sheets.data

                app.initialize()
               
            }
        }
        xhr.send();
    },

    initialize: function() {


      var tiled = (document.body.clientWidth > 739) ? true : false ;

      for (var i = 0; i < app.googledoc.length; i++) {

        app.googledoc[i].columns = +app.googledoc[i].columns;

        app.googledoc[i].background = (app.googledoc[i].image!="" && tiled) ? `background-image:url(${app.googledoc[i].image});background-position:bottom right;background-size:${app.googledoc[i].position};` : "" ;

      }

      app.y = app.googledoc.length

      app.render()

    },

    render: function(orientation) {

      var ul = document.getElementById("app");

      var li = document.createElement("li");

      li.setAttribute("class", "political__" + app.googledoc[app.x].class + "__block__" + app.googledoc[app.x].columns)
        
      var html = app.mustache(app.template, app.googledoc[app.x])
      
      li.innerHTML = html
        
      ul.appendChild(li)

      app.nextify()

    },

    nextify: function() {

      app.x = app.x + 1

      if (app.x < app.y) {

        app.render()

      } else {

        var blocks = document.getElementsByClassName("political_block");

        var control = function() {

          var url = this.getAttribute('data-url');

          window.location.href = url ;

        };

        for (var i = 0; i < blocks.length; i++) {

            blocks[i].addEventListener('click', control, false);

        }

        var fin = document.querySelector('.political_transparency__wrapper');

        fin.style.display = 'block'

      }

    }
    
  }

  var politico = (function() {

    app.loader()

  }());

  // CommonJS module
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = politico;
  }

  // AMD module
  else if ( typeof define !== 'undefined' && define.amd ) {
    define( function () { return politico; });
  }

  // browser global
  else {
    global.politico = politico;
  }
}((typeof window !== 'undefined') ? window : this ));
