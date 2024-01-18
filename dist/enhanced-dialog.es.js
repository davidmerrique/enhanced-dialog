/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var oe = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], K = /* @__PURE__ */ oe.join(","), ue = typeof Element > "u", D = ue ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, j = !ue && Element.prototype.getRootNode ? function(o) {
  var e;
  return o == null || (e = o.getRootNode) === null || e === void 0 ? void 0 : e.call(o);
} : function(o) {
  return o == null ? void 0 : o.ownerDocument;
}, M = function o(e, t) {
  var a;
  t === void 0 && (t = !0);
  var u = e == null || (a = e.getAttribute) === null || a === void 0 ? void 0 : a.call(e, "inert"), c = u === "" || u === "true", r = c || t && e && o(e.parentNode);
  return r;
}, be = function(e) {
  var t, a = e == null || (t = e.getAttribute) === null || t === void 0 ? void 0 : t.call(e, "contenteditable");
  return a === "" || a === "true";
}, se = function(e, t, a) {
  if (M(e))
    return [];
  var u = Array.prototype.slice.apply(e.querySelectorAll(K));
  return t && D.call(e, K) && u.unshift(e), u = u.filter(a), u;
}, ce = function o(e, t, a) {
  for (var u = [], c = Array.from(e); c.length; ) {
    var r = c.shift();
    if (!M(r, !1))
      if (r.tagName === "SLOT") {
        var v = r.assignedElements(), f = v.length ? v : r.children, g = o(f, !0, a);
        a.flatten ? u.push.apply(u, g) : u.push({
          scopeParent: r,
          candidates: g
        });
      } else {
        var N = D.call(r, K);
        N && a.filter(r) && (t || !e.includes(r)) && u.push(r);
        var w = r.shadowRoot || // check for an undisclosed shadow
        typeof a.getShadowRoot == "function" && a.getShadowRoot(r), E = !M(w, !1) && (!a.shadowRootFilter || a.shadowRootFilter(r));
        if (w && E) {
          var x = o(w === !0 ? r.children : w.children, !0, a);
          a.flatten ? u.push.apply(u, x) : u.push({
            scopeParent: r,
            candidates: x
          });
        } else
          c.unshift.apply(c, r.children);
      }
  }
  return u;
}, le = function(e) {
  return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, k = function(e) {
  if (!e)
    throw new Error("No node provided");
  return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || be(e)) && !le(e) ? 0 : e.tabIndex;
}, he = function(e, t) {
  var a = k(e);
  return a < 0 && t && !le(e) ? 0 : a;
}, ge = function(e, t) {
  return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, de = function(e) {
  return e.tagName === "INPUT";
}, pe = function(e) {
  return de(e) && e.type === "hidden";
}, me = function(e) {
  var t = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(a) {
    return a.tagName === "SUMMARY";
  });
  return t;
}, ye = function(e, t) {
  for (var a = 0; a < e.length; a++)
    if (e[a].checked && e[a].form === t)
      return e[a];
}, we = function(e) {
  if (!e.name)
    return !0;
  var t = e.form || j(e), a = function(v) {
    return t.querySelectorAll('input[type="radio"][name="' + v + '"]');
  }, u;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    u = a(window.CSS.escape(e.name));
  else
    try {
      u = a(e.name);
    } catch (r) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", r.message), !1;
    }
  var c = ye(u, e.form);
  return !c || c === e;
}, Ne = function(e) {
  return de(e) && e.type === "radio";
}, Te = function(e) {
  return Ne(e) && !we(e);
}, Ee = function(e) {
  var t, a = e && j(e), u = (t = a) === null || t === void 0 ? void 0 : t.host, c = !1;
  if (a && a !== e) {
    var r, v, f;
    for (c = !!((r = u) !== null && r !== void 0 && (v = r.ownerDocument) !== null && v !== void 0 && v.contains(u) || e != null && (f = e.ownerDocument) !== null && f !== void 0 && f.contains(e)); !c && u; ) {
      var g, N, w;
      a = j(u), u = (g = a) === null || g === void 0 ? void 0 : g.host, c = !!((N = u) !== null && N !== void 0 && (w = N.ownerDocument) !== null && w !== void 0 && w.contains(u));
    }
  }
  return c;
}, ee = function(e) {
  var t = e.getBoundingClientRect(), a = t.width, u = t.height;
  return a === 0 && u === 0;
}, Fe = function(e, t) {
  var a = t.displayCheck, u = t.getShadowRoot;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  var c = D.call(e, "details>summary:first-of-type"), r = c ? e.parentElement : e;
  if (D.call(r, "details:not([open]) *"))
    return !0;
  if (!a || a === "full" || a === "legacy-full") {
    if (typeof u == "function") {
      for (var v = e; e; ) {
        var f = e.parentElement, g = j(e);
        if (f && !f.shadowRoot && u(f) === !0)
          return ee(e);
        e.assignedSlot ? e = e.assignedSlot : !f && g !== e.ownerDocument ? e = g.host : e = f;
      }
      e = v;
    }
    if (Ee(e))
      return !e.getClientRects().length;
    if (a !== "legacy-full")
      return !0;
  } else if (a === "non-zero-area")
    return ee(e);
  return !1;
}, Se = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var t = e.parentElement; t; ) {
      if (t.tagName === "FIELDSET" && t.disabled) {
        for (var a = 0; a < t.children.length; a++) {
          var u = t.children.item(a);
          if (u.tagName === "LEGEND")
            return D.call(t, "fieldset[disabled] *") ? !0 : !u.contains(e);
        }
        return !0;
      }
      t = t.parentElement;
    }
  return !1;
}, q = function(e, t) {
  return !(t.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  M(t) || pe(t) || Fe(t, e) || // For a details element with a summary, the summary element gets the focus
  me(t) || Se(t));
}, X = function(e, t) {
  return !(Te(t) || k(t) < 0 || !q(e, t));
}, ke = function(e) {
  var t = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, De = function o(e) {
  var t = [], a = [];
  return e.forEach(function(u, c) {
    var r = !!u.scopeParent, v = r ? u.scopeParent : u, f = he(v, r), g = r ? o(u.candidates) : v;
    f === 0 ? r ? t.push.apply(t, g) : t.push(v) : a.push({
      documentOrder: c,
      tabIndex: f,
      item: u,
      isScope: r,
      content: g
    });
  }), a.sort(ge).reduce(function(u, c) {
    return c.isScope ? u.push.apply(u, c.content) : u.push(c.content), u;
  }, []).concat(t);
}, Re = function(e, t) {
  t = t || {};
  var a;
  return t.getShadowRoot ? a = ce([e], t.includeContainer, {
    filter: X.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: ke
  }) : a = se(e, t.includeContainer, X.bind(null, t)), De(a);
}, Ce = function(e, t) {
  t = t || {};
  var a;
  return t.getShadowRoot ? a = ce([e], t.includeContainer, {
    filter: q.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : a = se(e, t.includeContainer, q.bind(null, t)), a;
}, R = function(e, t) {
  if (t = t || {}, !e)
    throw new Error("No node provided");
  return D.call(e, K) === !1 ? !1 : X(t, e);
}, Oe = /* @__PURE__ */ oe.concat("iframe").join(","), V = function(e, t) {
  if (t = t || {}, !e)
    throw new Error("No node provided");
  return D.call(e, Oe) === !1 ? !1 : q(t, e);
};
/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function te(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(o);
    e && (a = a.filter(function(u) {
      return Object.getOwnPropertyDescriptor(o, u).enumerable;
    })), t.push.apply(t, a);
  }
  return t;
}
function ae(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? te(Object(t), !0).forEach(function(a) {
      Pe(o, a, t[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : te(Object(t)).forEach(function(a) {
      Object.defineProperty(o, a, Object.getOwnPropertyDescriptor(t, a));
    });
  }
  return o;
}
function Pe(o, e, t) {
  return e = Ae(e), e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Ie(o, e) {
  if (typeof o != "object" || o === null)
    return o;
  var t = o[Symbol.toPrimitive];
  if (t !== void 0) {
    var a = t.call(o, e || "default");
    if (typeof a != "object")
      return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(o);
}
function Ae(o) {
  var e = Ie(o, "string");
  return typeof e == "symbol" ? e : String(e);
}
var re = {
  activateTrap: function(e, t) {
    if (e.length > 0) {
      var a = e[e.length - 1];
      a !== t && a.pause();
    }
    var u = e.indexOf(t);
    u === -1 || e.splice(u, 1), e.push(t);
  },
  deactivateTrap: function(e, t) {
    var a = e.indexOf(t);
    a !== -1 && e.splice(a, 1), e.length > 0 && e[e.length - 1].unpause();
  }
}, xe = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, Le = function(e) {
  return (e == null ? void 0 : e.key) === "Escape" || (e == null ? void 0 : e.key) === "Esc" || (e == null ? void 0 : e.keyCode) === 27;
}, A = function(e) {
  return (e == null ? void 0 : e.key) === "Tab" || (e == null ? void 0 : e.keyCode) === 9;
}, Be = function(e) {
  return A(e) && !e.shiftKey;
}, Ke = function(e) {
  return A(e) && e.shiftKey;
}, ie = function(e) {
  return setTimeout(e, 0);
}, ne = function(e, t) {
  var a = -1;
  return e.every(function(u, c) {
    return t(u) ? (a = c, !1) : !0;
  }), a;
}, I = function(e) {
  for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), u = 1; u < t; u++)
    a[u - 1] = arguments[u];
  return typeof e == "function" ? e.apply(void 0, a) : e;
}, B = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, je = [], Me = function(e, t) {
  var a = (t == null ? void 0 : t.document) || document, u = (t == null ? void 0 : t.trapStack) || je, c = ae({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Be,
    isKeyBackward: Ke
  }, t), r = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: !1,
    paused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, v, f = function(n, i, s) {
    return n && n[i] !== void 0 ? n[i] : c[s || i];
  }, g = function(n, i) {
    var s = typeof (i == null ? void 0 : i.composedPath) == "function" ? i.composedPath() : void 0;
    return r.containerGroups.findIndex(function(l) {
      var d = l.container, h = l.tabbableNodes;
      return d.contains(n) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (s == null ? void 0 : s.includes(d)) || h.find(function(p) {
        return p === n;
      });
    });
  }, N = function(n) {
    var i = c[n];
    if (typeof i == "function") {
      for (var s = arguments.length, l = new Array(s > 1 ? s - 1 : 0), d = 1; d < s; d++)
        l[d - 1] = arguments[d];
      i = i.apply(void 0, l);
    }
    if (i === !0 && (i = void 0), !i) {
      if (i === void 0 || i === !1)
        return i;
      throw new Error("`".concat(n, "` was specified but was not a node, or did not return a node"));
    }
    var h = i;
    if (typeof i == "string" && (h = a.querySelector(i), !h))
      throw new Error("`".concat(n, "` as selector refers to no known node"));
    return h;
  }, w = function() {
    var n = N("initialFocus");
    if (n === !1)
      return !1;
    if (n === void 0 || !V(n, c.tabbableOptions))
      if (g(a.activeElement) >= 0)
        n = a.activeElement;
      else {
        var i = r.tabbableGroups[0], s = i && i.firstTabbableNode;
        n = s || N("fallbackFocus");
      }
    if (!n)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return n;
  }, E = function() {
    if (r.containerGroups = r.containers.map(function(n) {
      var i = Re(n, c.tabbableOptions), s = Ce(n, c.tabbableOptions), l = i.length > 0 ? i[0] : void 0, d = i.length > 0 ? i[i.length - 1] : void 0, h = s.find(function(m) {
        return R(m);
      }), p = s.slice().reverse().find(function(m) {
        return R(m);
      }), y = !!i.find(function(m) {
        return k(m) > 0;
      });
      return {
        container: n,
        tabbableNodes: i,
        focusableNodes: s,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: y,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: l,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: d,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: h,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: p,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(S) {
          var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, T = i.indexOf(S);
          return T < 0 ? O ? s.slice(s.indexOf(S) + 1).find(function(P) {
            return R(P);
          }) : s.slice(0, s.indexOf(S)).reverse().find(function(P) {
            return R(P);
          }) : i[T + (O ? 1 : -1)];
        }
      };
    }), r.tabbableGroups = r.containerGroups.filter(function(n) {
      return n.tabbableNodes.length > 0;
    }), r.tabbableGroups.length <= 0 && !N("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (r.containerGroups.find(function(n) {
      return n.posTabIndexesFound;
    }) && r.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, x = function b(n) {
    var i = n.activeElement;
    if (i)
      return i.shadowRoot && i.shadowRoot.activeElement !== null ? b(i.shadowRoot) : i;
  }, F = function b(n) {
    if (n !== !1 && n !== x(document)) {
      if (!n || !n.focus) {
        b(w());
        return;
      }
      n.focus({
        preventScroll: !!c.preventScroll
      }), r.mostRecentlyFocusedNode = n, xe(n) && n.select();
    }
  }, W = function(n) {
    var i = N("setReturnFocus", n);
    return i || (i === !1 ? !1 : n);
  }, Z = function(n) {
    var i = n.target, s = n.event, l = n.isBackward, d = l === void 0 ? !1 : l;
    i = i || B(s), E();
    var h = null;
    if (r.tabbableGroups.length > 0) {
      var p = g(i, s), y = p >= 0 ? r.containerGroups[p] : void 0;
      if (p < 0)
        d ? h = r.tabbableGroups[r.tabbableGroups.length - 1].lastTabbableNode : h = r.tabbableGroups[0].firstTabbableNode;
      else if (d) {
        var m = ne(r.tabbableGroups, function(U) {
          var Y = U.firstTabbableNode;
          return i === Y;
        });
        if (m < 0 && (y.container === i || V(i, c.tabbableOptions) && !R(i, c.tabbableOptions) && !y.nextTabbableNode(i, !1)) && (m = p), m >= 0) {
          var S = m === 0 ? r.tabbableGroups.length - 1 : m - 1, O = r.tabbableGroups[S];
          h = k(i) >= 0 ? O.lastTabbableNode : O.lastDomTabbableNode;
        } else
          A(s) || (h = y.nextTabbableNode(i, !1));
      } else {
        var T = ne(r.tabbableGroups, function(U) {
          var Y = U.lastTabbableNode;
          return i === Y;
        });
        if (T < 0 && (y.container === i || V(i, c.tabbableOptions) && !R(i, c.tabbableOptions) && !y.nextTabbableNode(i)) && (T = p), T >= 0) {
          var P = T === r.tabbableGroups.length - 1 ? 0 : T + 1, _ = r.tabbableGroups[P];
          h = k(i) >= 0 ? _.firstTabbableNode : _.firstDomTabbableNode;
        } else
          A(s) || (h = y.nextTabbableNode(i));
      }
    } else
      h = N("fallbackFocus");
    return h;
  }, L = function(n) {
    var i = B(n);
    if (!(g(i, n) >= 0)) {
      if (I(c.clickOutsideDeactivates, n)) {
        v.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: c.returnFocusOnDeactivate
        });
        return;
      }
      I(c.allowOutsideClick, n) || n.preventDefault();
    }
  }, z = function(n) {
    var i = B(n), s = g(i, n) >= 0;
    if (s || i instanceof Document)
      s && (r.mostRecentlyFocusedNode = i);
    else {
      n.stopImmediatePropagation();
      var l, d = !0;
      if (r.mostRecentlyFocusedNode)
        if (k(r.mostRecentlyFocusedNode) > 0) {
          var h = g(r.mostRecentlyFocusedNode), p = r.containerGroups[h].tabbableNodes;
          if (p.length > 0) {
            var y = p.findIndex(function(m) {
              return m === r.mostRecentlyFocusedNode;
            });
            y >= 0 && (c.isKeyForward(r.recentNavEvent) ? y + 1 < p.length && (l = p[y + 1], d = !1) : y - 1 >= 0 && (l = p[y - 1], d = !1));
          }
        } else
          r.containerGroups.some(function(m) {
            return m.tabbableNodes.some(function(S) {
              return k(S) > 0;
            });
          }) || (d = !1);
      else
        d = !1;
      d && (l = Z({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: r.mostRecentlyFocusedNode,
        isBackward: c.isKeyBackward(r.recentNavEvent)
      })), F(l || r.mostRecentlyFocusedNode || w());
    }
    r.recentNavEvent = void 0;
  }, fe = function(n) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    r.recentNavEvent = n;
    var s = Z({
      event: n,
      isBackward: i
    });
    s && (A(n) && n.preventDefault(), F(s));
  }, $ = function(n) {
    if (Le(n) && I(c.escapeDeactivates, n) !== !1) {
      n.preventDefault(), v.deactivate();
      return;
    }
    (c.isKeyForward(n) || c.isKeyBackward(n)) && fe(n, c.isKeyBackward(n));
  }, H = function(n) {
    var i = B(n);
    g(i, n) >= 0 || I(c.clickOutsideDeactivates, n) || I(c.allowOutsideClick, n) || (n.preventDefault(), n.stopImmediatePropagation());
  }, J = function() {
    if (r.active)
      return re.activateTrap(u, v), r.delayInitialFocusTimer = c.delayInitialFocus ? ie(function() {
        F(w());
      }) : F(w()), a.addEventListener("focusin", z, !0), a.addEventListener("mousedown", L, {
        capture: !0,
        passive: !1
      }), a.addEventListener("touchstart", L, {
        capture: !0,
        passive: !1
      }), a.addEventListener("click", H, {
        capture: !0,
        passive: !1
      }), a.addEventListener("keydown", $, {
        capture: !0,
        passive: !1
      }), v;
  }, Q = function() {
    if (r.active)
      return a.removeEventListener("focusin", z, !0), a.removeEventListener("mousedown", L, !0), a.removeEventListener("touchstart", L, !0), a.removeEventListener("click", H, !0), a.removeEventListener("keydown", $, !0), v;
  }, ve = function(n) {
    var i = n.some(function(s) {
      var l = Array.from(s.removedNodes);
      return l.some(function(d) {
        return d === r.mostRecentlyFocusedNode;
      });
    });
    i && F(w());
  }, G = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(ve) : void 0, C = function() {
    G && (G.disconnect(), r.active && !r.paused && r.containers.map(function(n) {
      G.observe(n, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return v = {
    get active() {
      return r.active;
    },
    get paused() {
      return r.paused;
    },
    activate: function(n) {
      if (r.active)
        return this;
      var i = f(n, "onActivate"), s = f(n, "onPostActivate"), l = f(n, "checkCanFocusTrap");
      l || E(), r.active = !0, r.paused = !1, r.nodeFocusedBeforeActivation = a.activeElement, i == null || i();
      var d = function() {
        l && E(), J(), C(), s == null || s();
      };
      return l ? (l(r.containers.concat()).then(d, d), this) : (d(), this);
    },
    deactivate: function(n) {
      if (!r.active)
        return this;
      var i = ae({
        onDeactivate: c.onDeactivate,
        onPostDeactivate: c.onPostDeactivate,
        checkCanReturnFocus: c.checkCanReturnFocus
      }, n);
      clearTimeout(r.delayInitialFocusTimer), r.delayInitialFocusTimer = void 0, Q(), r.active = !1, r.paused = !1, C(), re.deactivateTrap(u, v);
      var s = f(i, "onDeactivate"), l = f(i, "onPostDeactivate"), d = f(i, "checkCanReturnFocus"), h = f(i, "returnFocus", "returnFocusOnDeactivate");
      s == null || s();
      var p = function() {
        ie(function() {
          h && F(W(r.nodeFocusedBeforeActivation)), l == null || l();
        });
      };
      return h && d ? (d(W(r.nodeFocusedBeforeActivation)).then(p, p), this) : (p(), this);
    },
    pause: function(n) {
      if (r.paused || !r.active)
        return this;
      var i = f(n, "onPause"), s = f(n, "onPostPause");
      return r.paused = !0, i == null || i(), Q(), C(), s == null || s(), this;
    },
    unpause: function(n) {
      if (!r.paused || !r.active)
        return this;
      var i = f(n, "onUnpause"), s = f(n, "onPostUnpause");
      return r.paused = !1, i == null || i(), E(), J(), C(), s == null || s(), this;
    },
    updateContainerElements: function(n) {
      var i = [].concat(n).filter(Boolean);
      return r.containers = i.map(function(s) {
        return typeof s == "string" ? a.querySelector(s) : s;
      }), r.active && E(), C(), this;
    }
  }, v.updateContainerElements(e), v;
};
class qe extends HTMLElement {
  constructor() {
    super(), this.trap = null, this.close = this.close.bind(this), this.handleClick = this.handleClick.bind(this), this.dialogObserver = new MutationObserver((e) => {
      var t;
      for (const a of e)
        if (a.attributeName === "open") {
          if (!a.target.hasAttribute("open"))
            return;
          (t = this.trap) == null || t.activate();
        }
    });
  }
  get dialog() {
    return this.querySelector(":scope dialog");
  }
  get closeButton() {
    return this.querySelector(":scope .dialog-close");
  }
  connectedCallback() {
    var e, t;
    (e = this.dialog) == null || e.addEventListener("click", this.handleClick), (t = this.closeButton) == null || t.addEventListener("click", this.close), this.dialogObserver.observe(this.dialog, {
      attributes: !0
    }), this.trap = Me(this.dialog, {
      clickOutsideDeactivates: !0
    });
  }
  disconnectedCallback() {
    var e, t;
    (e = this.dialog) == null || e.removeEventListener("click", this.handleClick), (t = this.closeButton) == null || t.removeEventListener("click", this.close);
  }
  async close() {
    var e;
    (e = this.trap) == null || e.deactivate(), this.dialog.classList.add("dialog-closing"), await this.animationsComplete(), this.dialog.classList.remove("dialog-closing"), this.dialog.close();
  }
  handleClick(e) {
    if (e.clientX === 0 && e.clientY === 0)
      return;
    const t = this.dialog.getBoundingClientRect();
    (e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && this.close();
  }
  animationsComplete() {
    return Promise.allSettled(
      this.dialog.getAnimations().map((e) => e.finished)
    );
  }
}
customElements.get("enhanced-dialog") || customElements.define("enhanced-dialog", qe);
export {
  qe as EnhancedDialog
};
