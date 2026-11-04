// The page for a shared Podvo link, https://podvo.co.uk/show#feed=<feed address>, with
// &episode=<the episode's audio address> for an episode. Read show.html's comment first.
// This script never sends either anywhere: it only hands them to Podvo on the same phone,
// or copies the feed address for another podcast app.
(function () {
  "use strict";

  var APP = "com.podplay.app";
  var PLAY = "https://play.google.com/store/apps/details?id=" + APP;

  function byId(id) {
    return document.getElementById(id);
  }

  // "a=1&b=2" into { a: "1", b: "2" }, the way Podvo's own parser reads it.
  function readPairs(text) {
    var out = {};
    text.split("&").forEach(function (pair) {
      var cut = pair.indexOf("=");
      if (cut <= 0) return;
      try {
        var name = decodeURIComponent(pair.slice(0, cut));
        out[name] = decodeURIComponent(pair.slice(cut + 1).replace(/\+/g, " "));
      } catch (e) {
        // A broken escape: skip the pair, as the app does.
      }
    });
    return out;
  }

  // The shared channel (and episode), or null when the link names none. The app shares
  // them in the fragment; a hand-made link with ?feed= works too.
  function sharedChannel() {
    var fragment = readPairs(location.hash.replace(/^#/, ""));
    var query = readPairs(location.search.replace(/^\?/, ""));
    var source = fragment.feed ? fragment : query;
    var feed = (source.feed || "").trim();
    if (!/^https?:\/\/\S+$/i.test(feed)) return null;
    var episode = (source.episode || "").trim();
    return { feed: feed, episode: episode, appMissing: fragment.app === "missing" };
  }

  function linkPairs(channel) {
    return "feed=" + encodeURIComponent(channel.feed) +
      (channel.episode ? "&episode=" + encodeURIComponent(channel.episode) : "");
  }

  // An Android intent: link to podplay://show?feed=...&episode=..., which every Podvo
  // version opens (2.0.0 opens the episode's channel). Without Podvo, Chrome follows the
  // fallback: this page again, marked app=missing.
  function handover(channel) {
    var back = location.origin + location.pathname + "#" + linkPairs(channel) + "&app=missing";
    return "intent://show?" + linkPairs(channel) +
      "#Intent;scheme=podplay;package=" + APP +
      ";S.browser_fallback_url=" + encodeURIComponent(back) + ";end";
  }

  var android = /Android/i.test(navigator.userAgent);
  var handedOver = false;

  function render() {
    var channel = sharedChannel();
    var open = byId("open");
    var play = byId("play");
    var title = byId("title");
    var lede = byId("lede");
    var canOpen = Boolean(channel && android && !channel.appMissing);

    // Google Play hands the referrer to the app it installs, so a fresh install opens what was
    // shared (the app's InstallReferral.kt) instead of starting from nothing.
    play.href = channel ? PLAY + "&referrer=" + encodeURIComponent(linkPairs(channel)) : PLAY;

    open.hidden = !canOpen;
    open.classList.toggle("primary", canOpen);
    play.classList.toggle("primary", !canOpen);
    byId("after").hidden = !(channel && android && channel.appMissing);
    byId("other").hidden = !(channel && !android);

    var thing = channel && channel.episode ? "episode" : "channel";
    var shared = thing === "episode" ? "Someone shared an episode with you" :
      "Someone shared a podcast channel with you";
    if (!channel) {
      title.textContent = "Podvo";
      lede.textContent = "A simple podcast player for Android.";
    } else if (canOpen) {
      title.textContent = shared;
      lede.textContent = "Open it in Podvo, the podcast app for Android.";
      open.href = handover(channel);
    } else if (android) {
      title.textContent = "Get Podvo to hear this " + thing;
      lede.textContent = "Podvo is a podcast app for Android.";
      byId("after").textContent = "Once Podvo is installed, tap the link again and the " +
        thing + " opens in the app.";
    } else {
      title.textContent = shared;
      lede.textContent = "It opens in Podvo, a podcast app for Android phones.";
    }

    // Open Podvo straight away, once. A browser that refuses an app hand-over without a tap
    // leaves this page as it is, with the button to press.
    if (canOpen && !handedOver) {
      handedOver = true;
      location.replace(open.href);
    }
  }

  byId("copy").addEventListener("click", function () {
    var channel = sharedChannel();
    if (!channel) return;
    var button = byId("copy");
    var showAddress = function () {
      byId("other").textContent = channel.feed;
    };
    if (!navigator.clipboard) {
      showAddress();
      return;
    }
    navigator.clipboard.writeText(channel.feed).then(function () {
      button.textContent = "Feed address copied";
    }, showAddress);
  });

  window.addEventListener("hashchange", render);
  render();

  // ---- The hero: a waveform behind the logo, and the logo's own face moving ------------

  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Bars tallest in the middle, behind the logo, and tapering out to the sides. Each one
  // breathes on its own tempo (show.css), so the band ripples instead of pumping as one.
  function buildWave() {
    var wave = byId("wave");
    var count = Math.max(24, Math.floor(wave.clientWidth / 10));
    // Bars stop short of the logo, so none sticks out from behind its corners.
    var clear = (byId("logo").getBoundingClientRect().width / 2 + 14) / wave.clientWidth;
    for (var i = 0; i < count; i++) {
      var x = i / (count - 1) - 0.5;
      var envelope = Math.exp(-(x * x) / 0.14);
      var texture = 0.45 + 0.55 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.63 + 0.4));
      var bar = document.createElement("span");
      if (Math.abs(x) < clear) bar.className = "gap";
      bar.style.height = Math.round(12 + 160 * envelope * texture) + "px";
      bar.style.animationDuration = (1.1 + ((i * 37) % 10) / 10) + "s";
      bar.style.animationDelay = -(((i * 53) % 17) / 10) + "s";
      wave.appendChild(bar);
    }
  }

  // The same motion as the app's PodPlayLogo.kt: the eyes are three-bar level meters that
  // bounce and blink, and the mouth is a waveform whose four peaks breathe.
  var TWO_PI = Math.PI * 2;
  var EYE_CY = 213.75;
  var EYE_REST = [15, 32, 15];
  var MOUTH_X = [171, 185, 197, 205, 222, 236, 245, 259];
  var MOUTH_DEV = [0, 0, 25, -25, 35, -17, 0, 0];

  function blinkAt(ms) {
    var t = ms % 2900;
    if (t < 1500 || t >= 1770) return 1;
    if (t < 1610) return 1 - 0.94 * (t - 1500) / 110;
    if (t < 1660) return 0.06;
    return 0.06 + 0.94 * (t - 1660) / 110;
  }

  function drawEye(eye, phase, blink) {
    eye.setAttribute("transform",
      "translate(0 " + EYE_CY + ") scale(1 " + blink + ") translate(0 " + -EYE_CY + ")");
    var bars = eye.querySelectorAll(".bar");
    for (var i = 0; i < bars.length; i++) {
      var swing = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin((phase + i * 0.31) * TWO_PI));
      var h = EYE_REST[i] * swing;
      bars[i].setAttribute("y", (EYE_CY - h / 2).toFixed(2));
      bars[i].setAttribute("height", h.toFixed(2));
    }
  }

  function drawMouth(mouth, phase) {
    var d = "";
    for (var i = 0; i < MOUTH_X.length; i++) {
      var swing = MOUTH_DEV[i] === 0 ? 1 :
        0.45 + 0.55 * (0.5 + 0.5 * Math.sin((phase + i * 0.17) * TWO_PI));
      d += (i === 0 ? "M" : " L") + MOUTH_X[i] + "," + (258 + MOUTH_DEV[i] * swing).toFixed(2);
    }
    mouth.setAttribute("d", d);
  }

  function animateLogo() {
    var left = byId("eye-left");
    var right = byId("eye-right");
    var mouth = byId("mouth");
    function frame(ms) {
      var meter = (ms % 900) / 900;
      var blink = blinkAt(ms);
      drawEye(left, meter, blink);
      drawEye(right, meter + 0.5, blink);
      drawMouth(mouth, (ms % 1700) / 1700);
      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  buildWave();
  if (!still) animateLogo();
})();
