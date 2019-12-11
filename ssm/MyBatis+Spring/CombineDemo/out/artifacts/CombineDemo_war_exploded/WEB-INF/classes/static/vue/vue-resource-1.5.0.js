/*!
 * vue-resource v1.5.0
 * https://github.com/pagekit/vue-resource
 * Released under the MIT License.
 */

!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.VueResource = e()
}(this, function () {
    "use strict";
    var t = 2;

    function e(e) {
        this.state = t, this.value = void 0, this.deferred = [];
        var n = this;
        try {
            e(function (t) {
                n.resolve(t)
            }, function (t) {
                n.reject(t)
            })
        } catch (t) {
            n.reject(t)
        }
    }

    e.reject = function (t) {
        return new e(function (e, n) {
            n(t)
        })
    }, e.resolve = function (t) {
        return new e(function (e, n) {
            e(t)
        })
    }, e.all = function (t) {
        return new e(function (n, o) {
            var r = 0, i = [];

            function s(e) {
                return function (o) {
                    i[e] = o, (r += 1) === t.length && n(i)
                }
            }

            0 === t.length && n(i);
            for (var u = 0; u < t.length; u += 1) e.resolve(t[u]).then(s(u), o)
        })
    }, e.race = function (t) {
        return new e(function (n, o) {
            for (var r = 0; r < t.length; r += 1) e.resolve(t[r]).then(n, o)
        })
    };
    var n = e.prototype;

    function o(t, e) {
        t instanceof Promise ? this.promise = t : this.promise = new Promise(t.bind(e)), this.context = e
    }

    n.resolve = function (e) {
        var n = this;
        if (n.state === t) {
            if (e === n) throw new TypeError("Promise settled with itself.");
            var o = !1;
            try {
                var r = e && e.then;
                if (null !== e && "object" == typeof e && "function" == typeof r) return void r.call(e, function (t) {
                    o || n.resolve(t), o = !0
                }, function (t) {
                    o || n.reject(t), o = !0
                })
            } catch (t) {
                return void (o || n.reject(t))
            }
            n.state = 0, n.value = e, n.notify()
        }
    }, n.reject = function (e) {
        var n = this;
        if (n.state === t) {
            if (e === n) throw new TypeError("Promise settled with itself.");
            n.state = 1, n.value = e, n.notify()
        }
    }, n.notify = function () {
        var e, n = this;
        i(function () {
            if (n.state !== t) for (; n.deferred.length;) {
                var e = n.deferred.shift(), o = e[0], r = e[1], i = e[2], s = e[3];
                try {
                    0 === n.state ? i("function" == typeof o ? o.call(void 0, n.value) : n.value) : 1 === n.state && ("function" == typeof r ? i(r.call(void 0, n.value)) : s(n.value))
                } catch (t) {
                    s(t)
                }
            }
        }, e)
    }, n.then = function (t, n) {
        var o = this;
        return new e(function (e, r) {
            o.deferred.push([t, n, e, r]), o.notify()
        })
    }, n.catch = function (t) {
        return this.then(void 0, t)
    }, "undefined" == typeof Promise && (window.Promise = e), o.all = function (t, e) {
        return new o(Promise.all(t), e)
    }, o.resolve = function (t, e) {
        return new o(Promise.resolve(t), e)
    }, o.reject = function (t, e) {
        return new o(Promise.reject(t), e)
    }, o.race = function (t, e) {
        return new o(Promise.race(t), e)
    };
    var r = o.prototype;
    r.bind = function (t) {
        return this.context = t, this
    }, r.then = function (t, e) {
        return t && t.bind && this.context && (t = t.bind(this.context)), e && e.bind && this.context && (e = e.bind(this.context)), new o(this.promise.then(t, e), this.context)
    }, r.catch = function (t) {
        return t && t.bind && this.context && (t = t.bind(this.context)), new o(this.promise.catch(t), this.context)
    }, r.finally = function (t) {
        return this.then(function (e) {
            return t.call(this), e
        }, function (e) {
            return t.call(this), Promise.reject(e)
        })
    };
    var i, s = {}.hasOwnProperty, u = [].slice, a = !1, c = "undefined" != typeof window;

    function f(t) {
        return t ? t.replace(/^\s*|\s*$/g, "") : ""
    }

    function p(t) {
        return t ? t.toLowerCase() : ""
    }

    var h = Array.isArray;

    function d(t) {
        return "string" == typeof t
    }

    function l(t) {
        return "function" == typeof t
    }

    function m(t) {
        return null !== t && "object" == typeof t
    }

    function y(t) {
        return m(t) && Object.getPrototypeOf(t) == Object.prototype
    }

    function v(t, e, n) {
        var r = o.resolve(t);
        return arguments.length < 2 ? r : r.then(e, n)
    }

    function b(t, e, n) {
        return l(n = n || {}) && (n = n.call(e)), T(t.bind({$vm: e, $options: n}), t, {$options: n})
    }

    function g(t, e) {
        var n, o;
        if (h(t)) for (n = 0; n < t.length; n++) e.call(t[n], t[n], n); else if (m(t)) for (o in t) s.call(t, o) && e.call(t[o], t[o], o);
        return t
    }

    var w = Object.assign || function (t) {
        return u.call(arguments, 1).forEach(function (e) {
            x(t, e)
        }), t
    };

    function T(t) {
        return u.call(arguments, 1).forEach(function (e) {
            x(t, e, !0)
        }), t
    }

    function x(t, e, n) {
        for (var o in e) n && (y(e[o]) || h(e[o])) ? (y(e[o]) && !y(t[o]) && (t[o] = {}), h(e[o]) && !h(t[o]) && (t[o] = []), x(t[o], e[o], n)) : void 0 !== e[o] && (t[o] = e[o])
    }

    function j(t, e, n) {
        var o, r, i, s = (o = t, r = ["+", "#", ".", "/", ";", "?", "&"], {
            vars: i = [], expand: function (t) {
                return o.replace(/\{([^{}]+)\}|([^{}]+)/g, function (e, n, o) {
                    if (n) {
                        var s = null, u = [];
                        if (-1 !== r.indexOf(n.charAt(0)) && (s = n.charAt(0), n = n.substr(1)), n.split(/,/g).forEach(function (e) {
                            var n = /([^:*]*)(?::(\d+)|(\*))?/.exec(e);
                            u.push.apply(u, function (t, e, n, o) {
                                var r = t[n], i = [];
                                if (E(r) && "" !== r) if ("string" == typeof r || "number" == typeof r || "boolean" == typeof r) r = r.toString(), o && "*" !== o && (r = r.substring(0, parseInt(o, 10))), i.push(O(e, r, P(e) ? n : null)); else if ("*" === o) Array.isArray(r) ? r.filter(E).forEach(function (t) {
                                    i.push(O(e, t, P(e) ? n : null))
                                }) : Object.keys(r).forEach(function (t) {
                                    E(r[t]) && i.push(O(e, r[t], t))
                                }); else {
                                    var s = [];
                                    Array.isArray(r) ? r.filter(E).forEach(function (t) {
                                        s.push(O(e, t))
                                    }) : Object.keys(r).forEach(function (t) {
                                        E(r[t]) && (s.push(encodeURIComponent(t)), s.push(O(e, r[t].toString())))
                                    }), P(e) ? i.push(encodeURIComponent(n) + "=" + s.join(",")) : 0 !== s.length && i.push(s.join(","))
                                } else ";" === e ? i.push(encodeURIComponent(n)) : "" !== r || "&" !== e && "?" !== e ? "" === r && i.push("") : i.push(encodeURIComponent(n) + "=");
                                return i
                            }(t, s, n[1], n[2] || n[3])), i.push(n[1])
                        }), s && "+" !== s) {
                            var a = ",";
                            return "?" === s ? a = "&" : "#" !== s && (a = s), (0 !== u.length ? s : "") + u.join(a)
                        }
                        return u.join(",")
                    }
                    return C(o)
                })
            }
        }), u = s.expand(e);
        return n && n.push.apply(n, s.vars), u
    }

    function E(t) {
        return null != t
    }

    function P(t) {
        return ";" === t || "&" === t || "?" === t
    }

    function O(t, e, n) {
        return e = "+" === t || "#" === t ? C(e) : encodeURIComponent(e), n ? encodeURIComponent(n) + "=" + e : e
    }

    function C(t) {
        return t.split(/(%[0-9A-Fa-f]{2})/g).map(function (t) {
            return /%[0-9A-Fa-f]/.test(t) || (t = encodeURI(t)), t
        }).join("")
    }

    function $(t, e) {
        var n, o = this || {}, r = t;
        return d(t) && (r = {
            url: t,
            params: e
        }), r = T({}, $.options, o.$options, r), $.transforms.forEach(function (t) {
            var e, r, i;
            d(t) && (t = $.transform[t]), l(t) && (e = t, r = n, i = o.$vm, n = function (t) {
                return e.call(i, t, r)
            })
        }), n(r)
    }

    function U(t) {
        return new o(function (e) {
            var n = new XDomainRequest, o = function (o) {
                var r = o.type, i = 0;
                "load" === r ? i = 200 : "error" === r && (i = 500), e(t.respondWith(n.responseText, {status: i}))
            };
            t.abort = function () {
                return n.abort()
            }, n.open(t.method, t.getUrl()), t.timeout && (n.timeout = t.timeout), n.onload = o, n.onabort = o, n.onerror = o, n.ontimeout = o, n.onprogress = function () {
            }, n.send(t.getBody())
        })
    }

    $.options = {url: "", root: null, params: {}}, $.transform = {
        template: function (t) {
            var e = [], n = j(t.url, t.params, e);
            return e.forEach(function (e) {
                delete t.params[e]
            }), n
        }, query: function (t, e) {
            var n = Object.keys($.options.params), o = {}, r = e(t);
            return g(t.params, function (t, e) {
                -1 === n.indexOf(e) && (o[e] = t)
            }), (o = $.params(o)) && (r += (-1 == r.indexOf("?") ? "?" : "&") + o), r
        }, root: function (t, e) {
            var n, o, r = e(t);
            return d(t.root) && !/^(https?:)?\//.test(r) && (n = t.root, o = "/", r = (n && void 0 === o ? n.replace(/\s+$/, "") : n && o ? n.replace(new RegExp("[" + o + "]+$"), "") : n) + "/" + r), r
        }
    }, $.transforms = ["template", "query", "root"], $.params = function (t) {
        var e = [], n = encodeURIComponent;
        return e.add = function (t, e) {
            l(e) && (e = e()), null === e && (e = ""), this.push(n(t) + "=" + n(e))
        }, function t(e, n, o) {
            var r, i = h(n), s = y(n);
            g(n, function (n, u) {
                r = m(n) || h(n), o && (u = o + "[" + (s || r ? u : "") + "]"), !o && i ? e.add(n.name, n.value) : r ? t(e, n, u) : e.add(u, n)
            })
        }(e, t), e.join("&").replace(/%20/g, "+")
    }, $.parse = function (t) {
        var e = document.createElement("a");
        return document.documentMode && (e.href = t, t = e.href), e.href = t, {
            href: e.href,
            protocol: e.protocol ? e.protocol.replace(/:$/, "") : "",
            port: e.port,
            host: e.host,
            hostname: e.hostname,
            pathname: "/" === e.pathname.charAt(0) ? e.pathname : "/" + e.pathname,
            search: e.search ? e.search.replace(/^\?/, "") : "",
            hash: e.hash ? e.hash.replace(/^#/, "") : ""
        }
    };
    var R = c && "withCredentials" in new XMLHttpRequest;

    function A(t) {
        return new o(function (e) {
            var n, o, r = t.jsonp || "callback", i = t.jsonpCallback || "_jsonp" + Math.random().toString(36).substr(2),
                s = null;
            n = function (n) {
                var r = n.type, u = 0;
                "load" === r && null !== s ? u = 200 : "error" === r && (u = 500), u && window[i] && (delete window[i], document.body.removeChild(o)), e(t.respondWith(s, {status: u}))
            }, window[i] = function (t) {
                s = JSON.stringify(t)
            }, t.abort = function () {
                n({type: "abort"})
            }, t.params[r] = i, t.timeout && setTimeout(t.abort, t.timeout), (o = document.createElement("script")).src = t.getUrl(), o.type = "text/javascript", o.async = !0, o.onload = n, o.onerror = n, document.body.appendChild(o)
        })
    }

    function S(t) {
        return new o(function (e) {
            var n = new XMLHttpRequest, o = function (o) {
                var r = t.respondWith("response" in n ? n.response : n.responseText, {
                    status: 1223 === n.status ? 204 : n.status,
                    statusText: 1223 === n.status ? "No Content" : f(n.statusText)
                });
                g(f(n.getAllResponseHeaders()).split("\n"), function (t) {
                    r.headers.append(t.slice(0, t.indexOf(":")), t.slice(t.indexOf(":") + 1))
                }), e(r)
            };
            t.abort = function () {
                return n.abort()
            }, n.open(t.method, t.getUrl(), !0), t.timeout && (n.timeout = t.timeout), t.responseType && "responseType" in n && (n.responseType = t.responseType), (t.withCredentials || t.credentials) && (n.withCredentials = !0), t.crossOrigin || t.headers.set("X-Requested-With", "XMLHttpRequest"), l(t.progress) && "GET" === t.method && n.addEventListener("progress", t.progress), l(t.downloadProgress) && n.addEventListener("progress", t.downloadProgress), l(t.progress) && /^(POST|PUT)$/i.test(t.method) && n.upload.addEventListener("progress", t.progress), l(t.uploadProgress) && n.upload && n.upload.addEventListener("progress", t.uploadProgress), t.headers.forEach(function (t, e) {
                n.setRequestHeader(e, t)
            }), n.onload = o, n.onabort = o, n.onerror = o, n.ontimeout = o, n.send(t.getBody())
        })
    }

    function k(t) {
        var e = require("got");
        return new o(function (n) {
            var o, r = t.getUrl(), i = t.getBody(), s = t.method, u = {};
            t.headers.forEach(function (t, e) {
                u[e] = t
            }), e(r, {body: i, method: s, headers: u}).then(o = function (e) {
                var o = t.respondWith(e.body, {status: e.statusCode, statusText: f(e.statusMessage)});
                g(e.headers, function (t, e) {
                    o.headers.set(e, t)
                }), n(o)
            }, function (t) {
                return o(t.response)
            })
        })
    }

    function I(t) {
        return (t.client || (c ? S : k))(t)
    }

    var L = function (t) {
        var e = this;
        this.map = {}, g(t, function (t, n) {
            return e.append(n, t)
        })
    };

    function q(t, e) {
        return Object.keys(t).reduce(function (t, n) {
            return p(e) === p(n) ? n : t
        }, null)
    }

    L.prototype.has = function (t) {
        return null !== q(this.map, t)
    }, L.prototype.get = function (t) {
        var e = this.map[q(this.map, t)];
        return e ? e.join() : null
    }, L.prototype.getAll = function (t) {
        return this.map[q(this.map, t)] || []
    }, L.prototype.set = function (t, e) {
        this.map[function (t) {
            if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
            return f(t)
        }(q(this.map, t) || t)] = [f(e)]
    }, L.prototype.append = function (t, e) {
        var n = this.map[q(this.map, t)];
        n ? n.push(f(e)) : this.set(t, e)
    }, L.prototype.delete = function (t) {
        delete this.map[q(this.map, t)]
    }, L.prototype.deleteAll = function () {
        this.map = {}
    }, L.prototype.forEach = function (t, e) {
        var n = this;
        g(this.map, function (o, r) {
            g(o, function (o) {
                return t.call(e, o, r, n)
            })
        })
    };
    var H = function (t, e) {
        var n, r, i, s = e.url, u = e.headers, a = e.status, c = e.statusText;
        this.url = s, this.ok = a >= 200 && a < 300, this.status = a || 0, this.statusText = c || "", this.headers = new L(u), this.body = t, d(t) ? this.bodyText = t : (i = t, "undefined" != typeof Blob && i instanceof Blob && (this.bodyBlob = t, (0 === (r = t).type.indexOf("text") || -1 !== r.type.indexOf("json")) && (this.bodyText = (n = t, new o(function (t) {
            var e = new FileReader;
            e.readAsText(n), e.onload = function () {
                t(e.result)
            }
        })))))
    };
    H.prototype.blob = function () {
        return v(this.bodyBlob)
    }, H.prototype.text = function () {
        return v(this.bodyText)
    }, H.prototype.json = function () {
        return v(this.text(), function (t) {
            return JSON.parse(t)
        })
    }, Object.defineProperty(H.prototype, "data", {
        get: function () {
            return this.body
        }, set: function (t) {
            this.body = t
        }
    });
    var B = function (t) {
        var e;
        this.body = null, this.params = {}, w(this, t, {method: (e = t.method || "GET", e ? e.toUpperCase() : "")}), this.headers instanceof L || (this.headers = new L(this.headers))
    };
    B.prototype.getUrl = function () {
        return $(this)
    }, B.prototype.getBody = function () {
        return this.body
    }, B.prototype.respondWith = function (t, e) {
        return new H(t, w(e || {}, {url: this.getUrl()}))
    };
    var M = {"Content-Type": "application/json;charset=utf-8"};

    function N(t) {
        var e = this || {}, n = function (t) {
            var e = [I], n = [];

            function r(r) {
                for (; e.length;) {
                    var i = e.pop();
                    if (l(i)) {
                        var s = void 0, u = void 0;
                        if (m(s = i.call(t, r, function (t) {
                            return u = t
                        }) || u)) return new o(function (e, o) {
                            n.forEach(function (e) {
                                s = v(s, function (n) {
                                    return e.call(t, n) || n
                                }, o)
                            }), v(s, e, o)
                        }, t);
                        l(s) && n.unshift(s)
                    } else c = "Invalid interceptor of type " + typeof i + ", must be a function", "undefined" != typeof console && a && console.warn("[VueResource warn]: " + c)
                }
                var c
            }

            return m(t) || (t = null), r.use = function (t) {
                e.push(t)
            }, r
        }(e.$vm);
        return function (t) {
            u.call(arguments, 1).forEach(function (e) {
                for (var n in e) void 0 === t[n] && (t[n] = e[n])
            })
        }(t || {}, e.$options, N.options), N.interceptors.forEach(function (t) {
            d(t) && (t = N.interceptor[t]), l(t) && n.use(t)
        }), n(new B(t)).then(function (t) {
            return t.ok ? t : o.reject(t)
        }, function (t) {
            var e;
            return t instanceof Error && (e = t, "undefined" != typeof console && console.error(e)), o.reject(t)
        })
    }

    function D(t, e, n, o) {
        var r = this || {}, i = {};
        return g(n = w({}, D.actions, n), function (n, s) {
            n = T({url: t, params: w({}, e)}, o, n), i[s] = function () {
                return (r.$http || N)(function (t, e) {
                    var n, o = w({}, t), r = {};
                    switch (e.length) {
                        case 2:
                            r = e[0], n = e[1];
                            break;
                        case 1:
                            /^(POST|PUT|PATCH)$/i.test(o.method) ? n = e[0] : r = e[0];
                            break;
                        case 0:
                            break;
                        default:
                            throw"Expected up to 2 arguments [params, body], got " + e.length + " arguments"
                    }
                    return o.body = n, o.params = w({}, o.params, r), o
                }(n, arguments))
            }
        }), i
    }

    function J(t) {
        var e, n, r;
        J.installed || (n = (e = t).config, r = e.nextTick, i = r, a = n.debug || !n.silent, t.url = $, t.http = N, t.resource = D, t.Promise = o, Object.defineProperties(t.prototype, {
            $url: {
                get: function () {
                    return b(t.url, this, this.$options.url)
                }
            }, $http: {
                get: function () {
                    return b(t.http, this, this.$options.http)
                }
            }, $resource: {
                get: function () {
                    return t.resource.bind(this)
                }
            }, $promise: {
                get: function () {
                    var e = this;
                    return function (n) {
                        return new t.Promise(n, e)
                    }
                }
            }
        }))
    }

    return N.options = {}, N.headers = {
        put: M,
        post: M,
        patch: M,
        delete: M,
        common: {Accept: "application/json, text/plain, */*"},
        custom: {}
    }, N.interceptor = {
        before: function (t) {
            l(t.before) && t.before.call(this, t)
        }, method: function (t) {
            t.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(t.method) && (t.headers.set("X-HTTP-Method-Override", t.method), t.method = "POST")
        }, jsonp: function (t) {
            "JSONP" == t.method && (t.client = A)
        }, json: function (t) {
            var e = t.headers.get("Content-Type") || "";
            return m(t.body) && 0 === e.indexOf("application/json") && (t.body = JSON.stringify(t.body)), function (t) {
                return t.bodyText ? v(t.text(), function (e) {
                    var n, o;
                    if (0 === (t.headers.get("Content-Type") || "").indexOf("application/json") || (o = (n = e).match(/^\s*(\[|\{)/)) && {
                        "[": /]\s*$/,
                        "{": /}\s*$/
                    }[o[1]].test(n)) try {
                        t.body = JSON.parse(e)
                    } catch (e) {
                        t.body = null
                    } else t.body = e;
                    return t
                }) : t
            }
        }, form: function (t) {
            var e;
            e = t.body, "undefined" != typeof FormData && e instanceof FormData ? t.headers.delete("Content-Type") : m(t.body) && t.emulateJSON && (t.body = $.params(t.body), t.headers.set("Content-Type", "application/x-www-form-urlencoded"))
        }, header: function (t) {
            g(w({}, N.headers.common, t.crossOrigin ? {} : N.headers.custom, N.headers[p(t.method)]), function (e, n) {
                t.headers.has(n) || t.headers.set(n, e)
            })
        }, cors: function (t) {
            if (c) {
                var e = $.parse(location.href), n = $.parse(t.getUrl());
                n.protocol === e.protocol && n.host === e.host || (t.crossOrigin = !0, t.emulateHTTP = !1, R || (t.client = U))
            }
        }
    }, N.interceptors = ["before", "method", "jsonp", "json", "form", "header", "cors"], ["get", "delete", "head", "jsonp"].forEach(function (t) {
        N[t] = function (e, n) {
            return this(w(n || {}, {url: e, method: t}))
        }
    }), ["post", "put", "patch"].forEach(function (t) {
        N[t] = function (e, n, o) {
            return this(w(o || {}, {url: e, method: t, body: n}))
        }
    }), D.actions = {
        get: {method: "GET"},
        save: {method: "POST"},
        query: {method: "GET"},
        update: {method: "PUT"},
        remove: {method: "DELETE"},
        delete: {method: "DELETE"}
    }, "undefined" != typeof window && window.Vue && window.Vue.use(J), J
});