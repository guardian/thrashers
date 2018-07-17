;(function ( global ) {

  var politicize = (function() {

    var app = {

      googledoc: null,

      database: [],

      initialize: function(data) {

        app.googledoc = data

        for (var i = 0; i < app.googledoc.length; i++) {

          app.googledoc[i].columns = +app.googledoc[i].columns

        }

        app.googledoc.sort(function(a, b) {

            return b.columns - a.columns;

        });

        let count = 0

        app.googledoc.forEach(function(item, index) {

          if ( (count / 4 ) % 1 === 0) {

            // Start a new set

            let obj = {}
            obj.wrapper = index
            obj.one = [item]
            obj.two = []
            app.database.push(obj)
            count = count + item.columns

          } else {

            if (item.columns === 2) {

              app.database[ app.database.length -1 ].two.push(item)

            } else {

              if (app.database[ app.database.length -1 ].one[0].columns === 1 && app.database[ app.database.length -1 ].one.length === 1) {

                app.database[ app.database.length -1 ].one.push(item)

              } else {

                app.database[ app.database.length -1 ].two.push(item)

              }


            }

            count = count + item.columns

          }

        });

        app.render()

      },

      render: function() {

        let html = ''

        var template = app.template()

        var listicle = app.listicle();

        for (var i = 0; i < app.database.length; i++) {

          var ctx = {
            one: app.database[i].one,
            two: app.database[i].two,
            lambda: function (obj) {

              return (this[obj].length == 2) ? 2 : 1 ;

            },
            listicle1: function () {

              let inner = ''

              let distance = (this.one.length == 2) ? 1 : 2 ;
          
              for (let ii = 0; ii < this.one.length; ii++) {

                let ltx = {
                  distance: distance,
                  title: this.one[ii].title,
                  description: this.one[ii].description,
                  colour: this.one[ii].colour,
                  url: this.one[ii].url
                }

                inner += app.mustache(listicle, ltx)
              }

                return inner
            },
            listicle2: function () {

              let inner = ''

              let distance = (this.two.length == 2) ? 1 : 2 ;
          
              for (let ii = 0; ii < this.two.length; ii++) {

                let ltx = {
                  distance: distance,
                  title: this.two[ii].title,
                  description: this.two[ii].description,
                  colour: this.two[ii].colour,
                  url: this.two[ii].url
                }

                inner += app.mustache(listicle, ltx)
              }

                return inner
            },

          }

          html += app.mustache(template, ctx)

        }

        document.getElementById("wrappers").innerHTML = html

      },

      template: function() {

        return `<div class="political-wrapper">

          <ul class="l-row  l-row--cols-4">

            <li class="l-row__item l-row__item--span-2">

              <ul class="l-list l-list--columns-{{#lambda}}one{{/lambda}} l-list--rows-1">

                {{#listicle1}}{{/listicle1}}

              </ul>

            </li>

            <li class="l-row__item l-row__item--span-2">

              <ul class="l-list l-list--columns-{{#lambda}}two{{/lambda}} l-list--rows-1">
                
                {{#listicle2}}{{/listicle2}}

              </ul>

            </li>

          </ul>

        </div>`;

      },

      listicle: function() {    

        return `<li class="l-list__item l-row__item l-row__item--span-{{distance}}">

          <a href="{{url}}" target="_blank"><div class="political_square_container">

            <div class="political_square" style="background-color:{{colour}};">

              <div class="political_square_content">

                <div class="political_square_content_headline">{{title}}</div>

                <div class="political_square_content_desc">{{description}}</div>

              </div>
              
            </div>

          </div></a>

        </li>`;

      },

      mustache: function(l,a,m,c) {

        function h(a,b){b=b.pop?b:b.split(".");a=a[b.shift()]||"";return 0 in b?h(a,b):a}var k=app.mustache,e="";a=Array.isArray(a)?a:a?[a]:[];a=c?0 in a?[]:[1]:a;for(c=0;c<a.length;c++){var d="",f=0,n,b="object"==typeof a[c]?a[c]:{},b=Object.assign({},m,b);b[""]={"":a[c]};l.replace(/([\s\S]*?)({{((\/)|(\^)|#)(.*?)}}|$)/g,function(a,c,l,m,p,q,g){f?d+=f&&!p||1<f?a:c:(e+=c.replace(/{{{(.*?)}}}|{{(!?)(&?)(>?)(.*?)}}/g,function(a,c,e,f,g,d){return c?h(b,c):f?h(b,d):g?k(h(b,d),b):e?"":(new Option(h(b,d))).innerHTML}),n=q);p?--f||(g=h(b,g),e=/^f/.test(typeof g)?e+g.call(b,d,function(a){return k(a,b)}):e+k(d,g,b,n),d=""):++f})}return e
      
      }

    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

          var json = JSON.parse(this.responseText)

          app.initialize(json.sheets.data)

            // Typical action to be performed when the document is ready:
            // document.getElementById("demo").innerHTML = xhttp.responseText;
        }
    };

    xhttp.open("GET", "https://interactive.guim.co.uk/docsdata/1LpJQBtRBYSfzmJwWQSdr5khWoZHQEjYA-blSEzP9E3M.json", true);
    xhttp.send();

  }());

  // CommonJS module
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = politicize;
  }

  // AMD module
  else if ( typeof define !== 'undefined' && define.amd ) {
    define( function () { return politicize; });
  }

  // browser global
  else {
    global.politicize = politicize;
  }
}((typeof window !== 'undefined') ? window : this ));
