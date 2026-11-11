// podvo.co.uk's home page: the little motion it has. The logo talks the way the app's does,
// the waveforms breathe, the ad-skip bar plays through a break, and screens settle in once as
// they scroll into view. Everything reads without it, and prefers-reduced-motion stops it.
// Read index.html's opening comment first.
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var still = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function all(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function one(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  // A repeatable "random" number for bar i, so the waveforms keep their shape between loads.
  function noise(i, salt) {
    var x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
    return x - Math.floor(x);
  }

  // ---- Waveforms -----------------------------------------------------------------------

  // A band of bars. The hero's is tallest in the middle, behind the phone; the finale's is
  // even along the bottom. Each bar breathes on its own tempo (site.css), so the band ripples.
  function buildBand(wave) {
    var flat = wave.getAttribute("data-wave") === "finale";
    wave.textContent = "";
    var width = wave.clientWidth || window.innerWidth;
    var height = wave.clientHeight || 300;
    var count = Math.max(24, Math.floor(width / 10));
    for (var i = 0; i < count; i++) {
      var x = i / (count - 1) - 0.5;
      var envelope = flat ? 0.55 + 0.45 * Math.abs(Math.sin(i * 0.21)) :
        Math.exp(-(x * x) / 0.12);
      var texture = 0.35 + 0.65 * noise(i, flat ? 2 : 1);
      var bar = document.createElement("span");
      bar.style.height = Math.round(10 + (height - 10) * envelope * texture) + "px";
      bar.style.animationDuration = (1.1 + ((i * 37) % 10) / 10) + "s";
      bar.style.animationDelay = -(((i * 53) % 17) / 10) + "s";
      wave.appendChild(bar);
    }
  }

  // A cover's glyph: five still bars.
  function buildGlyph(wave) {
    [0.45, 0.85, 1, 0.7, 0.4].forEach(function (h) {
      var bar = document.createElement("span");
      bar.style.height = Math.round(h * 100) + "%";
      wave.appendChild(bar);
    });
  }

  all("[data-wave]").forEach(function (wave) {
    if (wave.getAttribute("data-wave") === "cover") buildGlyph(wave);
    else buildBand(wave);
  });

  var lastWidth = window.innerWidth;
  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    if (window.innerWidth === lastWidth) return; // a phone's toolbar, not a real resize
    lastWidth = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      all('[data-wave="hero"], [data-wave="finale"]').forEach(buildBand);
    }, 200);
  });

  // ---- The talking logo ----------------------------------------------------------------
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

  var talkers = all(".talker").map(function (svg) {
    var talker = {
      left: one(".eye-left", svg),
      right: one(".eye-right", svg),
      mouth: one(".mouth", svg),
      visible: false
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        talker.visible = entries[0].isIntersecting;
      }).observe(svg);
    } else {
      talker.visible = true;
    }
    return talker;
  });

  function talk(ms) {
    talkers.forEach(function (t) {
      if (!t.visible) return;
      var blink = blinkAt(ms);
      var meter = (ms % 900) / 900;
      drawEye(t.left, meter, blink);
      drawEye(t.right, meter + 0.5, blink);
      drawMouth(t.mouth, (ms % 1700) / 1700);
    });
    window.requestAnimationFrame(talk);
  }

  if (!still && talkers.length) window.requestAnimationFrame(talk);

  // ---- Settling in -----------------------------------------------------------------------

  var reveals = all(".reveal");
  if ("IntersectionObserver" in window && !still) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        revealer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { revealer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  function clock(seconds) {
    seconds = Math.max(0, Math.floor(seconds));
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = seconds % 60;
    var mm = h > 0 && m < 10 ? "0" + m : String(m);
    return (h > 0 ? h + ":" : "") + mm + ":" + (s < 10 ? "0" : "") + s;
  }

  // Run frame(ms, dt) every frame while el is on screen, unless motion is reduced.
  function whileVisible(el, frame) {
    var visible = false;
    var last = 0;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        last = 0;
      }).observe(el);
    } else {
      visible = true;
    }
    function tick(ms) {
      if (visible) {
        var dt = last ? Math.min(0.05, (ms - last) / 1000) : 0;
        last = ms;
        frame(ms, dt);
      }
      window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }

  // ---- Ad skip demo ------------------------------------------------------------------------
  // This Past Weekend #692 (Sophie Cunningham), 1:36:54, with its real chapters and the two
  // ad breaks Podvo marks on its bar. The first break is skipped with "Skip ad"; the second
  // automatically, and the pill offers "Undo skip", as the player does. Then round again.

  var demo = one("[data-adskip]");
  if (demo) {
    var TOTAL = 5814;
    var CHAPTERS = [
      [0, "Intro"],
      [105, "WNBA Drama and the Aces Loss"],
      [544, "Cunningham’s Missouri Sports Roots"],
      [1339, "The WNBA’s Growing Platform"],
      [1694, "Brittney Griner Airport Incident"],
      [1875, "Indiana Fever Crowds and Security"],
      [2066, "WNBA Athleticism and Leadership"],
      [3073, "WNBA Coverage and Rivalries"],
      [3614, "Cunningham’s Signature Point"],
      [3823, "WNBA Pay and Offseason Opportunities"],
      [4202, "WNBA Players, UFC and the Anthem"],
      [4773, "Cunningham’s Life Beyond Basketball"],
      [5289, "Pregnancy and WNBA Careers"],
      [5602, "Dating and Offseason Plans"],
      [5779, "Outro"]
    ];
    var ADS = [
      { from: 1158, to: 1336, auto: false },
      { from: 2408, to: 2474, auto: true }
    ];

    var bar = one("[data-bar]", demo);
    var head = one("[data-head]", demo);
    var nowLabel = one("[data-now]", demo);
    var chapterLabel = one("[data-chapter]", demo);
    var pill = one("[data-skip-pill]", demo);
    var pillText = one("[data-pill-text]", demo);

    // The bar's pieces: chapters, split where an ad starts and ends, each with a gap.
    var cuts = [0, TOTAL];
    CHAPTERS.forEach(function (c) { cuts.push(c[0]); });
    ADS.forEach(function (ad) { cuts.push(ad.from, ad.to); });
    cuts = cuts.filter(function (v, i, list) { return list.indexOf(v) === i; })
      .sort(function (x, y) { return x - y; });
    var pieces = [];
    for (var c = 0; c < cuts.length - 1; c++) {
      var from = cuts[c];
      var to = cuts[c + 1];
      var ad = null;
      ADS.forEach(function (a) { if (from >= a.from && to <= a.to) ad = a; });
      var seg = document.createElement("span");
      seg.className = "demo-seg" + (ad ? " is-ad" : "");
      seg.style.left = "calc(" + (from / TOTAL * 100).toFixed(3) + "% + 1.5px)";
      seg.style.width = "calc(" + ((to - from) / TOTAL * 100).toFixed(3) + "% - 3px)";
      var fill = document.createElement("i");
      seg.appendChild(fill);
      bar.insertBefore(seg, head);
      pieces.push({ from: from, to: to, ad: ad, seg: seg, fill: fill });
      if (ad) ad.seg = seg;
    }

    function chapterAt(t) {
      var name = CHAPTERS[0][1];
      CHAPTERS.forEach(function (ch) { if (t >= ch[0]) name = ch[1]; });
      return name;
    }

    function adAt(t) {
      for (var i = 0; i < ADS.length; i++) {
        if (t >= ADS[i].from && t < ADS[i].to) return ADS[i];
      }
      return null;
    }

    function paint(t) {
      head.style.left = (t / TOTAL * 100) + "%";
      pieces.forEach(function (piece) {
        if (piece.ad) return;
        var f = Math.min(1, Math.max(0, (t - piece.from) / (piece.to - piece.from)));
        piece.fill.style.transform = "scaleX(" + f.toFixed(4) + ")";
      });
      nowLabel.textContent = clock(t);
      chapterLabel.textContent = adAt(t) ? "Advertisement" : chapterAt(t);
    }

    function showPill(text) {
      pillText.textContent = text;
      pill.classList.toggle("is-undo", text !== "Skip ad");
      pill.classList.add("show");
    }

    var START = 930;   // 15:30, in "Missouri Sports Roots"
    var LOOP_END = 3000;
    var PLAY = 210;    // episode seconds per second on screen
    var t = START;
    var state = "play";
    var until = 0;
    var current = null;

    function reset() {
      t = START;
      state = "play";
      ADS.forEach(function (ad) { ad.seg.classList.remove("is-skipped"); });
    }

    if (!still) {
      paint(t);
      whileVisible(demo, function (ms, dt) {
        if (state === "play") {
          t += PLAY * dt;
          var ad = adAt(t);
          if (ad && !ad.seg.classList.contains("is-skipped")) {
            current = ad;
            if (ad.auto) {
              state = "skip";
              until = ms;
            } else {
              state = "inAd";
              showPill("Skip ad");
              until = ms + 1500;
            }
          } else if (t >= LOOP_END) {
            reset();
          }
        } else if (state === "inAd") {
          t += 8 * dt; // playing at 1x inside the break
          if (ms >= until) {
            pill.classList.add("press");
            state = "skip";
            until = ms + 160;
          }
        } else if (state === "skip" && ms >= until) {
          pill.classList.remove("press");
          current.seg.classList.add("is-skipped");
          head.classList.add("jump");
          t = current.to;
          if (current.auto) {
            showPill("Undo skip");
          } else {
            pill.classList.remove("show");
          }
          state = "landed";
          until = ms + 2600;
        } else if (state === "landed") {
          t += PLAY * 0.5 * dt;
          if (ms >= until - 2200) head.classList.remove("jump");
          if (ms >= until) {
            pill.classList.remove("show");
            state = "play";
          }
        }
        paint(t);
      });
    } else {
      // Held still: inside the second break with Skip ad showing, as in the hero's screenshot.
      ADS[0].seg.classList.add("is-skipped");
      paint(2409);
      showPill("Skip ad");
    }
  }

  // ---- Clips: a feed of clips, the caption popping word by word ----------------------------
  // WordByWordCaption.kt: the word being said is white and grows by 10% on a bouncy spring,
  // said words stay at 78%, words still to come at 50%. A new line slides up into place. Each
  // card's lines are in its data-lines, "|" between lines. When a clip's lines are done the
  // next card slides up, as a swipe in the feed does. Silent.

  var clipScreen = one("[data-clip]");
  if (clipScreen) {
    var cards = all(".clip-card", clipScreen).map(function (card) {
      var lines = (card.getAttribute("data-lines") || "").split("|");
      var script = [];
      var at = 0.5;
      lines.forEach(function (line, li) {
        line.split(" ").forEach(function (word, wi) {
          script.push({ line: li, index: wi, word: word, at: at, end: at + 0.2 + 0.045 * word.length });
          at += 0.22 + 0.045 * word.length;
        });
        at += 0.75;
      });
      var bars = [];
      var row = one("[data-clip-wave]", card);
      for (var w = 0; w < 54; w++) {
        var bar = document.createElement("span");
        row.appendChild(bar);
        bars.push(bar);
      }
      return {
        el: card,
        lines: lines,
        script: script,
        length: at + 0.5,
        caption: one("[data-caption]", card),
        bars: bars,
        shownLine: -1,
        words: []
      };
    });

    var showLine = function (card, li) {
      card.shownLine = li;
      card.caption.textContent = "";
      var row = document.createElement("div");
      row.className = "cap-line";
      card.words = card.lines[li].split(" ").map(function (word) {
        var el = document.createElement("span");
        el.className = "cap-word";
        el.textContent = word;
        row.appendChild(el);
        return el;
      });
      card.caption.appendChild(row);
    };

    var drawWave = function (card, time, progress, talking) {
      for (var i = 0; i < card.bars.length; i++) {
        var level = 0.25 + 0.75 * Math.abs(Math.sin(i * 0.7 + time * 3.1) * Math.cos(i * 0.23 - time * 1.7));
        card.bars[i].style.height = (3 + (talking ? 15 : 4) * level).toFixed(1) + "px";
        card.bars[i].classList.toggle("played", i / card.bars.length < progress);
      }
    };

    var drawCard = function (card, t, ms) {
      var active = card.script[0];
      for (var k = 0; k < card.script.length; k++) {
        if (t >= card.script[k].at) active = card.script[k];
      }
      if (active.line !== card.shownLine) showLine(card, active.line);
      var talking = t >= active.at && t < active.end + 0.1;
      card.words.forEach(function (el, i) {
        el.classList.toggle("now", talking && i === active.index);
        el.classList.toggle("said", i < active.index || (!talking && i === active.index && t >= active.at));
      });
      drawWave(card, ms / 1000, 0.06 + 0.5 * Math.min(1, t / card.length), talking);
    };

    if (!still) {
      var currentCard = 0;
      var clipT = 0;
      cards.forEach(function (card) { drawCard(card, 0, 0); });
      whileVisible(clipScreen, function (ms, dt) {
        var card = cards[currentCard];
        clipT += dt;
        if (clipT >= card.length) {
          // Swipe: this card leaves upwards and the next one rises into its place.
          var leaving = card.el;
          leaving.classList.remove("is-on");
          leaving.classList.add("is-leaving");
          setTimeout(function () { leaving.classList.remove("is-leaving"); }, 600);
          currentCard = (currentCard + 1) % cards.length;
          clipT = 0;
          card = cards[currentCard];
          card.shownLine = -1;
          drawCard(card, 0, ms);
          card.el.classList.add("is-on");
          return;
        }
        drawCard(card, clipT, ms);
      });
    } else {
      // Held still: the first clip, part-way through its first line.
      var first = cards[0];
      showLine(first, 0);
      first.words.forEach(function (el, i) {
        el.classList.toggle("said", i < 3);
        el.classList.toggle("now", i === 3);
      });
      drawWave(first, 0, 0.3, true);
    }
  }

  // ---- Switchers: chips and dots that swap a phone's screen --------------------------------
  // Channel header art, and the themes with Charcoal's accents. Every screen is a real
  // screenshot of that setting; nothing is tinted here.

  var NOTES = {
    dots: "Bold dots in both artwork colours.",
    fade: "Artwork colours blend softly into the page.",
    gradient: "Two artwork colour glows fade into the page.",
    long: "One artwork colour fading far down the page.",
    amber: "Charcoal with Amber, the one Podvo starts with.",
    mint: "Charcoal with Mint. Every button, chip and active control takes the colour.",
    "sky-blue": "Charcoal with Sky Blue. Every button, chip and active control takes the colour.",
    lavender: "Charcoal with Lavender. Every button, chip and active control takes the colour.",
    coral: "Charcoal with Coral. Every button, chip and active control takes the colour.",
    silver: "Charcoal with Silver. Every button, chip and active control takes the colour.",
    amoled: "True black, which saves battery on an OLED screen, with white for the things you tap.",
    light: "Podvo Light: a bright page with Podvo blue. Adaptive switches to it by day."
  };

  all(".switcher").forEach(function (section) {
    var buttons = all("[data-pick]", section);
    var screens = all("[data-screen]", section);
    var note = one("[data-note]", section);
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var key = button.getAttribute("data-pick");
        screens.forEach(function (img) {
          img.classList.toggle("is-on", img.getAttribute("data-screen") === key);
        });
        buttons.forEach(function (b) {
          var also = (b.getAttribute("data-also") || "").split(" ");
          var on = b.getAttribute("data-pick") === key || also.indexOf(key) >= 0;
          b.classList.toggle("is-on", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
        if (note) note.textContent = NOTES[key] || "";
      });
    });
  });

  // ---- Tour shelf: drag sideways with a mouse (touch scrolls it already) ------------------

  var shelf = one("[data-shelf]");
  if (shelf) {
    var dragging = false;
    var startX = 0;
    var startLeft = 0;
    shelf.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      dragging = true;
      startX = e.clientX;
      startLeft = shelf.scrollLeft;
      shelf.classList.add("is-dragging");
      shelf.setPointerCapture(e.pointerId);
    });
    shelf.addEventListener("pointermove", function (e) {
      if (dragging) shelf.scrollLeft = startLeft - (e.clientX - startX);
    });
    ["pointerup", "pointercancel"].forEach(function (type) {
      shelf.addEventListener(type, function () {
        dragging = false;
        shelf.classList.remove("is-dragging");
      });
    });
  }
})();
