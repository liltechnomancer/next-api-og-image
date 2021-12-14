var e = require('react-dom/server'),
  r = require('deepmerge'),
  t = require('twemoji'),
  n = require('puppeteer-core'),
  o = require('chrome-aws-lambda')
function a(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var s = a(r),
  i = a(t),
  u = a(n),
  c = a(o)
function l() {
  return (
    (l =
      Object.assign ||
      function (e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = arguments[r]
          for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        }
        return e
      }),
    l.apply(this, arguments)
  )
}
var m = function (e) {
    try {
      var r = function (r) {
          return Promise.resolve(
            u.default.launch(a ? r : { args: s, executablePath: r, headless: c.default.headless }),
          ).then(function (r) {
            return Promise.resolve(r.newPage()).then(function (r) {
              return Promise.resolve(r.setViewport({ width: 1200, height: 630 })).then(function () {
                return l({}, e, { page: r })
              })
            })
          })
        },
        t = e.page,
        n = e.envMode,
        o = e.executable
      if (t) return Promise.resolve(l({}, e, { page: t }))
      var a = !h(n),
        s = a || c.default.args
      return Promise.resolve(
        a
          ? r({ args: [], executablePath: o, headless: !0 })
          : Promise.resolve(c.default.executablePath).then(r),
      )
    } catch (e) {
      return Promise.reject(e)
    }
  },
  p = ['body', 'query']
function h(e) {
  return 'production' === e || 'staging' === e
}
function v(e) {
  return l({}, e, {
    executable:
      'win32' === process.platform
        ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        : 'linux' === process.platform
        ? '/usr/bin/google-chrome'
        : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })
}
exports.withOGImage = function (r) {
  var t = (r = s.default(
      {
        contentType: 'image/png',
        strategy: 'query',
        cacheControl: 'max-age 3600, must-revalidate',
        dev: { inspectHtml: !0, errorsInResponse: !0 },
      },
      r,
    )).template,
    n = t.html,
    o = t.react,
    a = r.cacheControl,
    u = r.strategy,
    c = r.contentType,
    d = r.dev,
    f = d.inspectHtml,
    g = d.errorsInResponse
  if (n && o)
    throw new Error('Ambigious template provided. You must provide either `html` or `react` template.')
  if (!n && !o) throw new Error('No template was provided.')
  var y = process.env.NODE_ENV,
    P = (function () {
      var e = [].slice.call(arguments)
      return function () {
        try {
          return Promise.resolve(
            e.reduce(function (e, r) {
              try {
                return Promise.resolve(e).then(function (e) {
                  return Promise.resolve(r(e))
                })
              } catch (e) {
                return Promise.reject(e)
              }
            }, Promise.resolve({ envMode: process.env.NODE_ENV })),
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }
    })(
      v,
      m,
      (function (e) {
        return function (r) {
          var t = r.page,
            n = r.envMode
          return l({}, r, {
            createImage: function (r) {
              try {
                return Promise.resolve(t.setContent(r)).then(function () {
                  return Promise.resolve(
                    !h(n) && e ? t.content() : t.screenshot({ type: 'png', encoding: 'binary' }),
                  )
                })
              } catch (e) {
                return Promise.reject(e)
              }
            },
          })
        }
      })(f),
    )
  return function (r, t) {
    try {
      !(function (e, r, t, n) {
        var o = {
            body: function () {
              var e = t.method,
                o = t.headers['content-type']
              if ('POST' !== e && 'application/json' !== o) {
                var a =
                  'Strategy is set to `body` so parameters must be passed by POST request and JSON payload. Current method: ' +
                  e +
                  ' and current content type: ' +
                  o
                throw (r && n.json({ message: a }), new Error(a))
              }
            },
            query: function () {
              var e = t.method
              if ('GET' !== e) {
                var o =
                  'Strategy is set to `query` so parameters must be passed by GET request and query params. Current method: ' +
                  e
                throw (r && n.json({ message: o }), new Error(o))
              }
            },
          },
          a = o[e]
        if (!a) throw new Error('Unknown strategy provided. Possible values: ' + p)
        a()
      })(u, !h(y) && g, r, t)
      var s = JSON.parse(
        JSON.stringify('query' === u ? r.query : r.body, function (e, r) {
          return r && 'object' == typeof r ? r : '' + r
        }),
      )
      return Promise.resolve(P()).then(function (r) {
        function u(u) {
          function m(s) {
            var u = n && !o ? s : e.renderToStaticMarkup(s)
            t.setHeader('Content-Type', !h(y) && f ? 'text/html' : c), t.setHeader('Cache-Control', a)
            var l = t.write
            return Promise.resolve(
              r.createImage(
                (function (e) {
                  return (
                    '<style>\n    .emoji {\n      height: 1em;\n      width: 1em;\n      margin: 0 .05em 0 .1em;\n      vertical-align: -0.1em;\n    }\n  </style>' +
                    i.default.parse(e, { folder: 'svg', ext: '.svg' })
                  )
                })(u),
              ),
            ).then(function (e) {
              l.call(t, e), t.end()
            })
          }
          return n && !o ? m(n && !o ? u : o(l({}, s))) : Promise.resolve(n && !o ? u : o(l({}, s))).then(m)
        }
        return n && !o ? Promise.resolve(n && !o ? n(l({}, s)) : 0).then(u) : u(n && !o ? n(l({}, s)) : 0)
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
//# sourceMappingURL=next-api-og-image.js.map
