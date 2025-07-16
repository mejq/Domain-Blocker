import { $ as R, $a as Ue, $b as Rt, A as M, Ab as ct, B as J, Ba as de, Bb as lt, C as K, Ca as ve, Cb as xt, D as G, Da as he, Db as dt, E as H, Ea as be, Eb as vt, F as l, Fa as ge, Fb as ht, G as P, Ga as Ae, Gb as bt, H as _, Ha as ye, Hb as gt, I as X, Ia as we, Ib as At, J as Wr, Ja as Fe, Jb as yt, K as S, Ka as Ee, Kb as wt, L as Pr, La as Ie, Lb as Ft, M as _r, Ma as Se, Mb as Et, N as jr, Na as Oe, Nb as It, O as Rr, Oa as Te, Ob as St, P as O, Pa as ke, Pb as Ot, Q as Nr, Qa as qe, Qb as Tt, R as Ur, Ra as Me, Rb as kt, S as zr, Sa as Le, Sb as qt, T as Qr, Ta as Ve, Tb as Mt, U as Dr, Ua as Ce, Ub as Lt, V as Yr, Va as We, Vb as Vt, W as g, Wa as Pe, Wb as Ct, X as Z, Xa as _e, Xb as Wt, Y as $, Ya as je, Yb as Pt, Z as Br, Za as Re, Zb as _t, _ as j, _a as Ne, _b as jt, a as c, aa as Jr, ab as ze, ac as Nt, b as yr, ba as Kr, bb as Qe, bc as Ut, c as I, ca as Gr, cb as De, cc as zt, d as wr, da as Hr, db as Ye, e as V, eb as Be, ec as Qt, f as Fr, fa as Xr, fb as Je, g as Y, ga as rr, gb as Ke, h as Er, ha as L, hb as Ge, i as q, ia as Zr, ib as He, j as Ir, ja as $r, k as a, ka as re, kb as Xe, l as B, la as ee, lb as Ze, m as Sr, ma as te, mb as $e, n as Or, na as oe, nb as rt, o as Tr, oa as ne, p as C, pa as ie, pb as et, q as kr, qa as me, qb as tt, r as qr, ra as fe, rb as ot, s as W, sa as ae, sb as nt, t as h, ta as ue, tb as it, u as Mr, ua as pe, ub as mt, v as b, va as se, vb as ft, w as Lr, wb as at, x as Vr, xa as ce, xb as ut, y, ya as le, yb as pt, z as Cr, za as xe, zb as st } from "@nf-internal/chunk-TTBQUPVX";
import "@nf-internal/chunk-4CLCTAJ7";
var N = { now: function () { return (N.delegate || performance).now(); }, delegate: void 0 };
import { __read as er, __spreadArray as tr } from "tslib";
var v = { schedule: function (e) { var t = requestAnimationFrame, r = cancelAnimationFrame, n = v.delegate; n && (t = n.requestAnimationFrame, r = n.cancelAnimationFrame); var o = t(function (i) { r = void 0, e(i); }); return new I(function () { return r?.(o); }); }, requestAnimationFrame: function () { for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t]; var r = v.delegate; return (r?.requestAnimationFrame || requestAnimationFrame).apply(void 0, tr([], er(e))); }, cancelAnimationFrame: function () { for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t]; var r = v.delegate; return (r?.cancelAnimationFrame || cancelAnimationFrame).apply(void 0, tr([], er(e))); }, delegate: void 0 };
function Dt(e) { return e ? or(e) : Yt; }
function or(e) { return new a(function (t) { var r = e || N, n = r.now(), o = 0, i = function () { t.closed || (o = v.requestAnimationFrame(function (m) { o = 0; var f = r.now(); t.next({ timestamp: e ? f : m, elapsed: f - n }), i(); })); }; return i(), function () { o && v.cancelAnimationFrame(o); }; }); }
var Yt = or();
import { __extends as Xt } from "tslib";
import { __read as Jt, __spreadArray as Kt } from "tslib";
var Bt = 1, U, z = {};
function nr(e) { return e in z ? (delete z[e], !0) : !1; }
var Q = { setImmediate: function (e) { var t = Bt++; return z[t] = !0, U || (U = Promise.resolve()), U.then(function () { return nr(t) && e(); }), t; }, clearImmediate: function (e) { nr(e); } };
var Gt = Q.setImmediate, Ht = Q.clearImmediate, T = { setImmediate: function () { for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t]; var r = T.delegate; return (r?.setImmediate || Gt).apply(void 0, Kt([], Jt(e))); }, clearImmediate: function (e) { var t = T.delegate; return (t?.clearImmediate || Ht)(e); }, delegate: void 0 };
var ir = function (e) { Xt(t, e); function t(r, n) { var o = e.call(this, r, n) || this; return o.scheduler = r, o.work = n, o; } return t.prototype.requestAsyncId = function (r, n, o) { return o === void 0 && (o = 0), o !== null && o > 0 ? e.prototype.requestAsyncId.call(this, r, n, o) : (r.actions.push(this), r._scheduled || (r._scheduled = T.setImmediate(r.flush.bind(r, void 0)))); }, t.prototype.recycleAsyncId = function (r, n, o) { var i; if (o === void 0 && (o = 0), o != null ? o > 0 : this.delay > 0)
    return e.prototype.recycleAsyncId.call(this, r, n, o); var m = r.actions; n != null && ((i = m[m.length - 1]) === null || i === void 0 ? void 0 : i.id) !== n && (T.clearImmediate(n), r._scheduled === n && (r._scheduled = void 0)); }, t; }(h);
import { __extends as Zt } from "tslib";
var mr = function (e) { Zt(t, e); function t() { return e !== null && e.apply(this, arguments) || this; } return t.prototype.flush = function (r) { this._active = !0; var n = this._scheduled; this._scheduled = void 0; var o = this.actions, i; r = r || o.shift(); do
    if (i = r.execute(r.state, r.delay))
        break;
while ((r = o[0]) && r.id === n && o.shift()); if (this._active = !1, i) {
    for (; (r = o[0]) && r.id === n && o.shift();)
        r.unsubscribe();
    throw i;
} }, t; }(b);
var fr = new mr(ir), $t = fr;
import { __extends as ro } from "tslib";
var ar = function (e) { ro(t, e); function t(r, n) { var o = e.call(this, r, n) || this; return o.scheduler = r, o.work = n, o; } return t.prototype.schedule = function (r, n) { return n === void 0 && (n = 0), n > 0 ? e.prototype.schedule.call(this, r, n) : (this.delay = n, this.state = r, this.scheduler.flush(this), this); }, t.prototype.execute = function (r, n) { return n > 0 || this.closed ? e.prototype.execute.call(this, r, n) : this._execute(r, n); }, t.prototype.requestAsyncId = function (r, n, o) { return o === void 0 && (o = 0), o != null && o > 0 || o == null && this.delay > 0 ? e.prototype.requestAsyncId.call(this, r, n, o) : (r.flush(this), 0); }, t; }(h);
import { __extends as eo } from "tslib";
var ur = function (e) { eo(t, e); function t() { return e !== null && e.apply(this, arguments) || this; } return t; }(b);
var pr = new ur(ar), to = pr;
import { __extends as oo } from "tslib";
var sr = function (e) { oo(t, e); function t(r, n) { var o = e.call(this, r, n) || this; return o.scheduler = r, o.work = n, o; } return t.prototype.requestAsyncId = function (r, n, o) { return o === void 0 && (o = 0), o !== null && o > 0 ? e.prototype.requestAsyncId.call(this, r, n, o) : (r.actions.push(this), r._scheduled || (r._scheduled = v.requestAnimationFrame(function () { return r.flush(void 0); }))); }, t.prototype.recycleAsyncId = function (r, n, o) { var i; if (o === void 0 && (o = 0), o != null ? o > 0 : this.delay > 0)
    return e.prototype.recycleAsyncId.call(this, r, n, o); var m = r.actions; n != null && n === r._scheduled && ((i = m[m.length - 1]) === null || i === void 0 ? void 0 : i.id) !== n && (v.cancelAnimationFrame(n), r._scheduled = void 0); }, t; }(h);
import { __extends as no } from "tslib";
var cr = function (e) { no(t, e); function t() { return e !== null && e.apply(this, arguments) || this; } return t.prototype.flush = function (r) { this._active = !0; var n; r ? n = r.id : (n = this._scheduled, this._scheduled = void 0); var o = this.actions, i; r = r || o.shift(); do
    if (i = r.execute(r.state, r.delay))
        break;
while ((r = o[0]) && r.id === n && o.shift()); if (this._active = !1, i) {
    for (; (r = o[0]) && r.id === n && o.shift();)
        r.unsubscribe();
    throw i;
} }, t; }(b);
var lr = new cr(sr), io = lr;
import { __extends as xr } from "tslib";
var mo = function (e) { xr(t, e); function t(r, n) { r === void 0 && (r = dr), n === void 0 && (n = 1 / 0); var o = e.call(this, r, function () { return o.frame; }) || this; return o.maxFrames = n, o.frame = 0, o.index = -1, o; } return t.prototype.flush = function () { for (var r = this, n = r.actions, o = r.maxFrames, i, m; (m = n[0]) && m.delay <= o && (n.shift(), this.frame = m.delay, !(i = m.execute(m.state, m.delay)));)
    ; if (i) {
    for (; m = n.shift();)
        m.unsubscribe();
    throw i;
} }, t.frameTimeFactor = 10, t; }(b);
var dr = function (e) { xr(t, e); function t(r, n, o) { o === void 0 && (o = r.index += 1); var i = e.call(this, r, n) || this; return i.scheduler = r, i.work = n, i.index = o, i.active = !0, i.index = r.index = o, i; } return t.prototype.schedule = function (r, n) { if (n === void 0 && (n = 0), Number.isFinite(n)) {
    if (!this.id)
        return e.prototype.schedule.call(this, r, n);
    this.active = !1;
    var o = new t(this.scheduler, this.work);
    return this.add(o), o.schedule(r, n);
}
else
    return I.EMPTY; }, t.prototype.requestAsyncId = function (r, n, o) { o === void 0 && (o = 0), this.delay = r.frame + o; var i = r.actions; return i.push(this), i.sort(t.sortActions), 1; }, t.prototype.recycleAsyncId = function (r, n, o) { o === void 0 && (o = 0); }, t.prototype._execute = function (r, n) { if (this.active === !0)
    return e.prototype._execute.call(this, r, n); }, t.sortActions = function (r, n) { return r.delay === n.delay ? r.index === n.index ? 0 : r.index > n.index ? 1 : -1 : r.delay > n.delay ? 1 : -1; }, t; }(h);
function fo(e) { return !!e && (e instanceof a || c(e.lift) && c(e.subscribe)); }
function ao(e, t) { var r = typeof t == "object"; return new Promise(function (n, o) { var i = !1, m; e.subscribe({ next: function (f) { m = f, i = !0; }, error: o, complete: function () { i ? n(m) : r ? n(t.defaultValue) : o(new O); } }); }); }
function uo(e, t) { var r = typeof t == "object"; return new Promise(function (n, o) { var i = new Y({ next: function (m) { n(m), i.unsubscribe(); }, error: o, complete: function () { r ? n(t.defaultValue) : o(new O); } }); e.subscribe(i); }); }
import { __read as po, __spreadArray as vr } from "tslib";
function E(e, t, r, n) { if (r)
    if (M(r))
        n = r;
    else
        return function () { for (var o = [], i = 0; i < arguments.length; i++)
            o[i] = arguments[i]; return E(e, t, n).apply(this, o).pipe(g(r)); }; return n ? function () { for (var o = [], i = 0; i < arguments.length; i++)
    o[i] = arguments[i]; return E(e, t).apply(this, o).pipe(_(n), P(n)); } : function () { for (var o = this, i = [], m = 0; m < arguments.length; m++)
    i[m] = arguments[m]; var f = new W, u = !0; return new a(function (s) { var p = f.subscribe(s); if (u) {
    u = !1;
    var x = !1, k = !1;
    t.apply(o, vr(vr([], po(i)), [function () { for (var d = [], A = 0; A < arguments.length; A++)
            d[A] = arguments[A]; if (e) {
            var F = d.shift();
            if (F != null) {
                f.error(F);
                return;
            }
        } f.next(1 < d.length ? d : d[0]), k = !0, x && f.complete(); }])), k && f.complete(), x = !0;
} return p; }); }; }
function so(e, t, r) { return E(!1, e, t, r); }
function co(e, t, r) { return E(!0, e, t, r); }
function w(e) { return new a(function (t) { l(e()).subscribe(t); }); }
var lo = { connector: function () { return new C; }, resetOnDisconnect: !0 };
function xo(e, t) { t === void 0 && (t = lo); var r = null, n = t.connector, o = t.resetOnDisconnect, i = o === void 0 ? !0 : o, m = n(), f = new a(function (u) { return m.subscribe(u); }); return f.connect = function () { return (!r || r.closed) && (r = w(function () { return e; }).subscribe(m), i && r.add(function () { return m = n(); })), r; }, f; }
function vo() { for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t]; var r = J(e), n = Z(e), o = n.args, i = n.keys, m = new a(function (f) { var u = o.length; if (!u) {
    f.complete();
    return;
} for (var s = new Array(u), p = u, x = u, k = function (A) { var F = !1; l(o[A]).subscribe(B(f, function (Ar) { F || (F = !0, x--), s[A] = Ar; }, function () { return p--; }, void 0, function () { (!p || !F) && (x || f.next(i ? $(i, s) : s), f.complete()); })); }, d = 0; d < u; d++)
    k(d); }); return r ? m.pipe(g(r)) : m; }
import { __read as ho } from "tslib";
var bo = ["addListener", "removeListener"], go = ["addEventListener", "removeEventListener"], Ao = ["on", "off"];
function D(e, t, r, n) { if (c(r) && (n = r, r = void 0), n)
    return D(e, t, r).pipe(g(n)); var o = ho(Fo(e) ? go.map(function (f) { return function (u) { return e[f](t, u, r); }; }) : yo(e) ? bo.map(hr(e, t)) : wo(e) ? Ao.map(hr(e, t)) : [], 2), i = o[0], m = o[1]; if (!i && H(e))
    return j(function (f) { return D(f, t, r); })(l(e)); if (!i)
    throw new TypeError("Invalid event target"); return new a(function (f) { var u = function () { for (var s = [], p = 0; p < arguments.length; p++)
    s[p] = arguments[p]; return f.next(1 < s.length ? s : s[0]); }; return i(u), function () { return m(u); }; }); }
function hr(e, t) { return function (r) { return function (n) { return e[r](t, n); }; }; }
function yo(e) { return c(e.addListener) && c(e.removeListener); }
function wo(e) { return c(e.on) && c(e.off); }
function Fo(e) { return c(e.addEventListener) && c(e.removeEventListener); }
function br(e, t, r) { return r ? br(e, t).pipe(g(r)) : new a(function (n) { var o = function () { for (var m = [], f = 0; f < arguments.length; f++)
    m[f] = arguments[f]; return n.next(m.length === 1 ? m[0] : m); }, i = e(o); return c(t) ? function () { return t(o, i); } : void 0; }); }
import { __generator as Eo } from "tslib";
function Io(e, t, r, n, o) { var i, m, f, u; arguments.length === 1 ? (i = e, u = i.initialState, t = i.condition, r = i.iterate, m = i.resultSelector, f = m === void 0 ? q : m, o = i.scheduler) : (u = e, !n || M(n) ? (f = q, o = n) : f = n); function s() { var p; return Eo(this, function (x) { switch (x.label) {
    case 0: p = u, x.label = 1;
    case 1: return !t || t(p) ? [4, f(p)] : [3, 4];
    case 2: x.sent(), x.label = 3;
    case 3: return p = r(p), [3, 1];
    case 4: return [2];
} }); } return w(o ? function () { return X(s(), o); } : s); }
function So(e, t, r) { return w(function () { return e() ? t : r; }); }
function Oo() { for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t]; var r = K(e), n = G(e, 1 / 0), o = e; return o.length ? o.length === 1 ? l(o[0]) : R(n)(S(o, r)) : y; }
var gr = new a(V);
function To() { return gr; }
function ko(e, t) { return S(Object.entries(e), t); }
function qo(e, t, r) { return [L(t, r)(l(e)), L(rr(t, r))(l(e))]; }
function Mo(e, t, r) { if (t == null && (t = e, e = 0), t <= 0)
    return y; var n = t + e; return new a(r ? function (o) { var i = e; return r.schedule(function () { i < n ? (o.next(i++), this.schedule()) : o.complete(); }); } : function (o) { for (var i = e; i < n && !o.closed;)
    o.next(i++); o.complete(); }); }
function Lo(e, t) { return new a(function (r) { var n = e(), o = t(n), i = o ? l(o) : y; return i.subscribe(r), function () { n && n.unsubscribe(); }; }); }
export { Nr as ArgumentOutOfRangeError, W as AsyncSubject, kr as BehaviorSubject, Or as ConnectableObservable, y as EMPTY, O as EmptyError, gr as NEVER, Ur as NotFoundError, Rr as Notification, jr as NotificationKind, Tr as ObjectUnsubscribedError, a as Observable, qr as ReplaySubject, Mr as Scheduler, zr as SequenceError, C as Subject, Fr as Subscriber, I as Subscription, Qr as TimeoutError, yr as UnsubscriptionError, dr as VirtualAction, mo as VirtualTimeScheduler, io as animationFrame, lr as animationFrameScheduler, Dt as animationFrames, $t as asap, fr as asapScheduler, Vr as async, Lr as asyncScheduler, re as audit, ee as auditTime, so as bindCallback, co as bindNodeCallback, te as buffer, oe as bufferCount, ne as bufferTime, ie as bufferToggle, me as bufferWhen, fe as catchError, se as combineAll, Br as combineLatest, pe as combineLatestAll, ce as combineLatestWith, Kr as concat, Jr as concatAll, le as concatMap, xe as concatMapTo, de as concatWith, wr as config, ve as connect, xo as connectable, he as count, be as debounce, ge as debounceTime, Ae as defaultIfEmpty, w as defer, Ie as delay, Ee as delayWhen, Se as dematerialize, Oe as distinct, Te as distinctUntilChanged, ke as distinctUntilKeyChanged, Me as elementAt, Cr as empty, Le as endWith, Ve as every, Pe as exhaust, We as exhaustAll, Ce as exhaustMap, _e as expand, L as filter, je as finalize, Re as find, Ne as findIndex, Ue as first, uo as firstValueFrom, Ke as flatMap, vo as forkJoin, S as from, D as fromEvent, br as fromEventPattern, Io as generate, ze as groupBy, q as identity, we as ignoreElements, So as iif, Hr as interval, Qe as isEmpty, fo as isObservable, Ye as last, ao as lastValueFrom, Yr as map, Fe as mapTo, Be as materialize, Je as max, Oo as merge, R as mergeAll, j as mergeMap, Ge as mergeMapTo, He as mergeScan, Xe as mergeWith, Ze as min, $e as multicast, To as never, V as noop, Er as observable, P as observeOn, Pr as of, Xr as onErrorResumeNext, rt as onErrorResumeNextWith, ko as pairs, et as pairwise, qo as partition, Ir as pipe, tt as pluck, ot as publish, nt as publishBehavior, it as publishLast, mt as publishReplay, to as queue, pr as queueScheduler, Zr as race, ft as raceWith, Mo as range, ae as reduce, Sr as refCount, at as repeat, ut as repeatWhen, pt as retry, st as retryWhen, ct as sample, lt as sampleTime, xt as scan, Wr as scheduled, dt as sequenceEqual, vt as share, ht as shareReplay, bt as single, gt as skip, At as skipLast, yt as skipUntil, wt as skipWhile, Ft as startWith, _ as subscribeOn, It as switchAll, Et as switchMap, St as switchMapTo, Ot as switchScan, ye as take, De as takeLast, Tt as takeUntil, kt as takeWhile, qt as tap, Mt as throttle, Lt as throttleTime, _r as throwError, qe as throwIfEmpty, Vt as timeInterval, Dr as timeout, Ct as timeoutWith, Gr as timer, Wt as timestamp, ue as toArray, Lo as using, Pt as window, _t as windowCount, jt as windowTime, Rt as windowToggle, Nt as windowWhen, Ut as withLatestFrom, $r as zip, zt as zipAll, Qt as zipWith };
