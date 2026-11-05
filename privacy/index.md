---
title: Privacy Policy for Podvo
---

# Privacy Policy for Podvo

**Last Updated:** November 5, 2026

Podvo ("we", "our", "us") is a podcast player for Android and iOS. This policy explains
exactly what the app stores, what it sends over the network, and to whom. It is written to
match the app's actual behaviour — if you find a discrepancy, treat it as a bug and tell us.

There are no Podvo accounts. You never register with us or give us your name or email to
use Podvo. If you choose to turn on **Sync with Google Drive** (Section 2a), you sign in
with your own Google account and your library is kept in your own Google Drive, not on our
servers.

---

## 1. Summary

| What | Where it goes |
|---|---|
| Subscriptions, queue, playback positions, history, settings, downloads, recommendation listening signals | Stay on your device, unless you turn on sync (next row) |
| **Only if you turn on Sync with Google Drive: subscriptions, playlists, queue, Listen Later, played episodes, resume positions, the episode in the player, playback settings, and this device's model name** | **Saved in your own Google Drive, in a hidden folder only Podvo can open. Never sent to us** |
| Podcast feeds, artwork, episode audio | Fetched directly from the publisher's servers (**except feeds in the web app** — see Section 4a) |
| **Ad-skip lookups (podcast name, episode title, episode audio URL, episode description, country, install ID)** | **Sent to our ad-analysis service, `api.dawncast.uk`** |
| **Podcast searches (search text and country code)** | **Sent to Apple Podcasts search** |
| **First-run interest questions, and Home's Popular and topic tabs (country code, chart categories, show IDs)** | **Sent to Apple Podcasts charts and lookup; your answers stay on your device** |
| Home's Popular list (nothing about you; the same request for everyone) | Downloaded from our server, `api.dawncast.uk` |
| **Podcast searches and discovery category lookups that Apple cannot answer (query text only)** | **Sent to our search service, `api.dawncast.uk`** |
| **Automatic searches for recently heard guests (guest name only)** | **Sent to Apple Podcasts search; if Apple has no results, the search service fallback may receive the name** |
| **Automatic topic enrichment (feed URL, podcast name, chapter titles, unresolved episode IDs, titles and descriptions)** | **Sent to our topic service, `api.dawncast.uk`** |
| Browsing by guest or topic in downloaded feeds | Stays on your device |
| **Finding a guest's episodes on other shows (guest name only)** | **Sent to Apple Podcasts search; if Apple has no results, the search service fallback may receive the name** |
| **Guest photos & bios (guest name/public person ID only)** | **Sent to Wikipedia and Wikidata (Wikimedia Foundation)** |
| Snips (the moments you save from an episode) | Stay on your device |
| **Channel and episode links you share (the channel's feed address and the episode's audio address, after the `#`)** | **Go only where you send them. Opening one loads a page from our website, `podvo.co.uk`, which never receives those addresses** |
| Crash reports | Written to your device only; sent nowhere unless you explicitly share one |
| Casting / DLNA discovery, and switching a TV on to cast to it | Stays on your local Wi-Fi network |

The bold rows highlight requests explained in more detail below. Section 2a covers
Google Drive sync, which is off unless you turn it on; Section 3
covers ad-skip in full (and you can turn it off); Section 4 covers the search fallback;
Section 4a covers the feed proxy, which **only affects the web app**; Section 4b covers
shared links; Section 5 covers
smart topics, which are **automatically enriched when the service is available**; Section 5a covers
guest discovery and photos, which are **always enabled**.

---

## 2. Data Stored on Your Device

The following is written to your device's private app storage and is not transmitted to us:

* **Subscriptions and playlists** — the podcasts you follow and any lists you create.
* **Playback state** — positions, play queue, listening history, completed episodes.
* **Downloaded audio** — episode files you have saved for offline listening.
* **Preferences** — playback speed, skip intervals, sleep timer, download rules, theme.
* **Listening statistics** — total time listened, ads skipped, episodes finished.
* **Recommendations** — up to 200 recent episode listening records (episode metadata,
  time spent listening and last listening time), plus up to 500 recommendation visibility
  or dismissal records. These help rank suggestions locally; they are not uploaded.
  Clearing listening history also clears these recommendation signals. A recommendation
  repeatedly seen without being opened, or explicitly hidden, is paused for two weeks.
* **Interests** — your answers to the optional "What do you like?" questions, and a
  country if you chose one there.
* **Snips** — the moments you save while listening. A snip stores the episode and a start
  and end time, not a copy of the audio. Sharing one creates an audio file on your device
  and hands it to your own share sheet; it is never uploaded to us.
* **Topic tags** — topics found locally and returned by the topic service (Section 5)
  are cached here.
* **TVs you've cast to** — if a TV offers it, its name, its address on your home network
  and the network address Podvo uses to switch it on from standby. Switching it on sends a
  "wake" signal on your home network only.
* **Crash reports** — see Section 7.

You can erase all of it at any time via your device settings (Android: **Settings > Apps >
Podvo > Storage > Clear Data**; iOS: delete the app). Uninstalling removes everything on
the device. A copy you chose to keep in Google Drive (Section 2a) is deleted separately.

---

## 2a. Sync with Google Drive (optional, Android)

Sync keeps your library the same on each Android device where you turn it on. It is off
until you turn it on under **Settings > Account & subscriptions > Sync with Google Drive**.
There is no Podvo server involved: your library goes from your device to your own Google
Drive, and from there to your other devices.

### Signing in

Turning sync on opens Google's own sign-in screen, where you choose an account, and then
Google's consent screen, where you allow Podvo to keep its own data in your Google Drive
(the `drive.appdata` permission). Podvo asks for nothing else. It cannot see, open or
change any other file in your Drive.

Google tells Podvo which account you chose: its email address, name and Google's ID for
the account. Podvo keeps these on your device, to show which account is syncing, and
does not send them anywhere. Podvo stores no password or long-lived sign-in token; Google
Play services supplies a short-lived access key each time Podvo syncs.

### What is synced

* the podcasts you follow
* your playlists (including smart playlist rules, when you added each episode, and the
  order you chose for each playlist) and Listen Later
* your Up Next queue
* which episodes you have played, and where you stopped in each one
* the episode in the player (the one the mini player shows), so another device can carry
  on with it
* playback and skipping settings: speeds, skip intervals, autoplay, trim silence, voice
  boost, ad and intro skipping, and per-podcast overrides of these
* a name for each device, such as "Pixel 8", and a random ID Podvo creates for it, so
  each device keeps its own file

Podvo syncs shortly after you change something, when you leave the app, and about once
a minute while the app is open, to pick up changes from your other devices.

Episode and podcast details are synced as published in the feed (title, show, audio and
artwork addresses, duration, date). Show notes and descriptions are not: each device reads
them from the feed itself.

**Not synced:** downloaded audio, listening history, listening statistics, recommendation
signals, snips, your answers to the interest questions, appearance settings, download and
data-saving settings, notifications, the ad-skip install ID, and anything about ad-skip
lookups.

### Where it is kept

Each device keeps one small file in your Google Drive's **app data folder**. This is a
hidden folder that only Podvo can open; it does not appear among your Drive files, and
it counts towards your Google storage (usually well under a megabyte). Files are sent over
an encrypted connection and stored by Google under the
[Google Privacy Policy](https://policies.google.com/privacy). They are not end-to-end
encrypted. **We never receive, see or store any of it.**

### Turning it off and deleting it

* **Settings > Sync with Google Drive > Turn off sync** stops sync on that device. Your
  library stays on the device, and the copy in Drive stays for your other devices.
* Choosing **Also delete it from Google Drive** there deletes every device's copy from
  your Drive and withdraws Podvo's access to your Drive, which stops sync on all your
  devices.
* You can also delete the copy yourself in Google Drive on the web: **Settings > Manage
  apps > Podvo > Options > Delete hidden app data**. You can withdraw Podvo's access to
  your Google account at [myaccount.google.com/permissions](https://myaccount.google.com/permissions).

---

## 3. The Ad-Skip Service

Podvo can automatically skip advertising inside episodes. Doing this requires analysis
that cannot run on your phone, so the app asks our ad-analysis service about the episode
you are about to play. To make queue transitions seamless, it also asks about the episode
at the front of Up Next while the current episode is still playing. The Clips feed uses the
same analysis to find short moments; to make Clips useful for new listeners, it can also ask
about a small, fixed selection of current episodes from popular channels that you have not
followed or played. If you answered the optional "What do you like?" questions, it can also
ask about recent episodes from shows those answers suggested.

### What is sent

When ad-skip is enabled and you play, download, place an episode at the front of Up Next, or
Podvo prepares an episode for the Clips discovery feed, the app sends the following to
`https://api.dawncast.uk/ads`:

* the **podcast name** and **episode title**
* the **episode's audio URL** (the public link from the podcast's RSS feed)
* the **episode description** as published in the feed
* a **country code** (used to select the right regional ad data)
* an **install ID** — see below
* an **entitlement level** — currently always `early_access`
* a **read-only flag**, only when the app is browsing (Clips, Snips) and wants an analysis
  that already exists. It tells the service not to start a new one.
* a **fingerprint format** (`envelope_v1`), which says which form of audio fingerprint this
  version of the app can read. It is the same fixed value from every install and says
  nothing about you or what you listen to.

The service replies with the positions of ads in that episode, chapter markers, and, where
one exists, the matching YouTube video ID for the episode.

Audiobooks are never sent. Chapters of an audiobook (including every LibriVox book) carry no
ads, so Podvo makes no ad-skip lookup for them, and they are also left out of the show
analysis described in Section 5 (Smart Topics).

**What this means in practice:** the service can infer which episodes you play, except that
requests for the fixed popular-channel Clips pool do not mean you followed or listened to
those episodes. Requests for shows your answers suggested are linked to your install ID like
any other, so the service could infer the kinds of shows you said you like. It does not receive your name, email, phone number, contacts, location,
IP-based profile, advertising ID, or any device identifier.

### The install ID

The install ID is a random number generated on your device the first time ad-skip runs. It
is **not** derived from your hardware, your Google/Apple account, or any advertising
identifier. It is sent so the service can tell one installation from another, for rate
limiting and, when ad-skip becomes a paid feature, to recognise a valid subscription.
Today the service does not store it.

You can view it and generate a fresh one at any time under **Settings > Ad skipping >
Install ID**. Resetting it severs the link between your earlier and later lookups. Clearing app
data or reinstalling also produces a new one.

### Turning it off

**Settings > Ad skipping > Skip ads** disables the feature. When it is off, Podvo makes no
requests to the ad-analysis service at all. Everything else in the app continues to work.

### Retention

Ad analysis is cached per episode, not per listener, so that the next person to play the
same episode gets an instant answer. The cache holds the episode's public details (podcast
name, episode title, audio URL) and its ad positions, with nothing about who asked.

Like any web server, ours keeps technical logs so we can run, secure and fix the service.
They can include the time, your IP address and the address requested, and for ad-skip the
podcast name, episode title and country. They do not include your install ID. We use them
only to operate the service and keep them only as long as that needs.

The service also keeps limited operational statistics in its private control booth.
For successful signed app requests, it converts the install header already sent by
the app into a keyed hash that changes each UTC day, to count active installations.
General service requests use a separate daily keyed hash of the network address.
These metrics store endpoint templates, request and error counts, and heuristic
signals of automated traffic; they do not store raw install IDs, raw IP addresses,
user-agent strings, request bodies, query strings, or episode URLs. Daily activity
records expire after 30 days and the daily hashes are not joined across days.
Installation counts are not a count of people or user accounts. Model-cost records
contain public episode/feed identifiers and token usage, without listener identifiers,
prompts, or transcripts. See the [service operations disclosure](https://api.dawncast.uk/privacy/operations).

### Pricing

Ad-skip is currently **free during early access: each install gets three months of ad-skip
at no cost**. We intend to make it a paid subscription feature in future, and when the free
period ends Podvo stops sending ad-skip lookups. That change will not alter what is described above; if
it ever does, this policy will be updated first.

---

## 4. Podcast Search

When you search for a podcast, Podvo sends your search text to **Apple's public podcast
search API** to get results. This is the primary source and handles almost every search.
The request also carries a two-letter **country code** (for example `GB`) so Apple answers
from that country's directory — otherwise "football" means the NFL everywhere. The code
is the country you pick in the app or, if you haven't picked one, the country your phone
reports for its mobile network or SIM card (on Android), falling back to your device's
region setting. Podvo reads this on the device and does not use location services, GPS
or a location permission. The search fallback described
below does not receive the country code.

Apple's index does not list every podcast — independent and niche shows are frequently
missing, and some searches come back empty even when results plainly exist. **Only when
Apple returns no results at all**, Podvo retries the same search text against
[Podcast Index](https://podcastindex.org), an open, community-funded podcast directory.

That retry goes through our server at `api.dawncast.uk/podcasts/search`, because the
Podcast Index API requires credentials that cannot safely be stored inside an app. The
request contains **your search text and nothing else** — no install ID, no account, no
device information. Search text is not stored against an install ID or account, though it
can appear in the server's technical logs described in Section 3.

If Podcast Index is unavailable, the same request falls back once more to
[fyyd.de](https://fyyd.de), another public podcast directory.

The server fallback happens only on a directory lookup that Apple could not answer.

Home and “More like this” can also perform a small number of automatic directory
lookups using public podcast categories, such as Comedy or Science, from shows in your
library or the show you are browsing. The category text is sent through the same Apple
search and, if needed, server fallback described above. Providers also receive the normal
IP address and request headers associated with an internet request. Listening records,
completion history, personalised scores and recommendation visibility are not included.
Suggestions fetch a bounded selection of public RSS feeds directly from publishers
(through the feed proxy on web), and cache metadata on the device. Maximum data-saving
mode skips these optional discovery requests on a metered connection.

Daily Mix also uses listening signals stored on your device to recommend new episodes
from shows you have heard without following them. It can read a short RSS page from
up to six such shows (two in Reduced data-saving mode), sharing the device's discovery
cache with Home. While you follow no shows, the page for the two you have heard most is
longer (twenty episodes, not four), for Home's "More from" shelves. Publishers receive the usual feed request and IP address; we do not
send your listening time, completion history or personalised scores with that request.
Maximum data-saving mode skips these optional requests on a metered connection.

On Android, channels whose new-episode bell you switch on are checked for new releases
about every 30 minutes. Each check asks the publisher's server whether the feed has changed
(a request for its headers only) and reads the newest few episodes only when it has. These
requests go straight to the publisher, like any feed request, with the usual IP address and
request headers, and nothing is sent to us. Channels without a bell are checked only by the
ordinary background refresh, every six hours.

To suggest other episodes featuring guests from your recent listening, Home can search for
up to five guest names in Apple's public podcast directory. If Apple has no results,
the existing directory fallback may receive the same name. The request contains the
guest name, not the episode you heard, the show, your listening time, or a user ID.
Podvo checks returned titles and descriptions on your device to discard episodes
that merely discuss the person. Successful results are cached for twelve hours;
data-saving mode limits or skips these optional searches. Clearing listening history
also removes this guest-search cache.

The optional **"What do you like?" questions**, offered on first launch and from Settings,
run on your device. For your answers Podvo downloads Apple's public top-podcast charts
for the matching categories in your country (for example the UK Football chart), and
looks up those shows and a small hand-picked list in Apple's directory. To balance your
country's picks, it also reads the same charts for the United States. Apple receives the
country code, the chart categories and the show IDs (from which the topics you picked can
be inferred, as with a search), plus your IP address. It receives no install ID or
listening data. The questions themselves send nothing to our servers. Your answers and the
suggested shows are stored on your device. Home then uses them for "Because you like…"
suggestions, fetching a few recent episodes from at most six suggested shows directly from
their publishers. Clips may analyse those episodes as described in Section 3.

Home's **Popular** tab and its **topic tabs** (Comedy, Sport, Football and so on) use the
same public Apple charts and lookup. At most once a day, Popular downloads one list of
popular shows for every country from our server, `api.dawncast.uk`. The request is the
same for everyone and sends nothing about you, not even your country; your device picks
your country's list out of it, and our server sees only the IP address any internet request
carries. The **Trending** tab reads Apple's overall top-podcasts chart for your country, and
both look their shows up in Apple's directory. A topic tab reads that topic's
chart for your country and the United States and looks up the shows on it, plus a small
hand-picked list. Apple receives the country code, the chart category of the tab you opened
and the show IDs, plus your IP address; no search text, install ID or listening data. Each
tab then fetches the newest episode of its first few shows directly from their publishers
(fifteen at most, five in Reduced data-saving mode, none in Maximum data-saving mode on a
metered connection).

Recommendations currently use local listening signals and public show metadata, with
an editorial starter catalogue. We do not collect audience-wide recommendation analytics
or use YouTube viewing statistics to rank podcasts.

---

## 4a. Podcast Feeds in the Web App

**This section applies only to Podvo in a web browser.** The Android and iOS apps fetch
feeds directly from the publisher and are unaffected by anything here.

A web browser will not let a page read a podcast feed from another website unless that
website explicitly allows it, and most podcast hosts do not. Without a way around this the
web app cannot load any show at all. So when you open a podcast in the browser, Podvo
asks our server at `api.dawncast.uk/web/feed` to fetch that feed and pass it back.

**What is sent:** the feed's web address, and nothing else. No install ID, no account, no
device information, and nothing identifying you. Our server fetches the feed as an
ordinary podcast app would; the publisher sees a request from our server rather than from
you, which means **your IP address is not disclosed to the podcast host**.

**What is stored:** nothing about you. The fetched feed may be held briefly in a shared
cache (about 15 minutes) so that opening the same popular show twice does not fetch it
twice. That cache is keyed on the feed address alone and is not associated with any
person, request or identifier.

**Why it is not optional in the browser:** unlike ad-skip, this is not a feature that can
be switched off and leave the app working — it is how the web app loads a podcast at all.
If you would rather your feed choices never reach our server, use the Android or iOS app,
which fetches feeds directly from the publisher.

---

## 4b. Shared Channel and Episode Links

When you share a channel, Podvo gives you a link to our website,
`https://podvo.co.uk/show#feed=…`, which carries the channel's feed address. A shared
episode's link also carries the address of the episode's audio file
(`#feed=…&episode=…`), which is how the app finds it in the feed. Sharing sends nothing
anywhere by itself: the link goes only where you send it, through the app you choose.

A phone with Podvo opens the link in the app, which loads the channel or episode from its
publisher as usual. Anywhere else the link opens a page on podvo.co.uk that says what it is
and links to Google Play. On Android that page also hands the link to Podvo when it is
installed.

**What is sent:** both addresses sit after the `#` in the link, a part that web browsers
keep to themselves and never send to a website. Opening the link in a browser sends
podvo.co.uk only a request for the page, with what any web page receives: the browser's IP
address and user agent. GitHub Pages hosts podvo.co.uk and keeps its own technical logs of
those requests (Section 6). The page does not fetch the feed, set cookies or use analytics.
Its "Copy the feed address" button copies the address on your own device.

**Installing from the link:** the page's Google Play button passes the same addresses to
Google Play, inside the Play Store link, so Podvo can open the channel or episode once it is
installed. Google Play receives them as part of that link and hands them to Podvo on the
phone (Play's "install referrer"). Podvo reads them once, on its first start, and sends them
nowhere. A Podvo installed any other way finds nothing there.

**What is stored:** nothing, by us.

Anyone you send a link to can read the addresses in it. A private feed from a paid
membership can carry your personal key in its addresses, so share those with care.

---

## 5. Smart Topics

Smart playlists and podcast pages can filter a show by subject — "only the science episodes
of this podcast". Podvo first works this out on your device from public feed text. The
automatic server pass fills gaps and reuses topic chapters already generated for an episode.

**Topic enrichment is automatic for everyone when the service is configured and reachable.**
There is no individual on/off setting. Local topics remain available offline or when the
service cannot provide a result.

### What is sent

When you open a podcast's full catalogue, select shows in a smart-playlist editor, or the
app refreshes shows used by a topic-filtered playlist, the app can send the following to
`https://api.dawncast.uk/library/analyse` for cached chapter information and
`https://api.dawncast.uk/library/topics` for shared catalogue topics:

* the **podcast's feed URL** and **name**
* batches of up to 40 **titles** with temporary batch identifiers, and up to 5,000 characters
  of each public description, to classify episodes
* a sample of up to 300 episodes covering recurring multipart series and the span of the
  catalogue, with titles and up to 500 description characters, to establish a show-specific
  topic structure

The catalogue pass can include the whole available back catalogue in successive batches.
It runs within a shared service budget; local processing remains the fallback. Cached
chapter requests do not trigger transcription or audio analysis.

While a channel is open, the app checks for corrected server topics at most once every
five minutes. This check sends only the feed URL and show name, forbids AI processing,
and returns a cache revision. When it changes, cached assignments are downloaded again
and replace obsolete server topics on the device; unchanged cached results are reused.

All of it is already public information from the podcast's RSS feed. These requests carry
no install ID, account or listening history. They identify the show being categorised.

### What comes back

A show-specific topic structure and episode assignments. Interview domains can be based
on an explicitly stated guest profession. The service and device cache retain whether an
assignment comes from a guest biography or an episode subject; the topic browser combines
both under the same short label. Explicit multipart series can be grouped from their titles
without an AI call.
The response can also include chapter titles already generated and cached when that
podcast's episodes were analysed previously. Results are cached on the backend for reuse
across listeners and stored on your device.

Public metadata may be sent to OpenAI for this classification; no audio is sent by this
feature. Changed titles or descriptions, or a deliberate topic-quality upgrade, may be
classified again within the shared processing budget.

### Retention

Topic classification is cached per episode, not per listener, so the next person to filter
the same show gets an instant answer without us re-analysing it. These requests are not
associated with an install ID. The service also keeps the public titles and descriptions
it receives, so that a broad topic can later be split into more specific ones (for example
Science into Space and Mathematics) without the app sending the catalogue again. This is
the same public feed text described above, never anything about you.

### Local storage and repeat requests

Results are stored on your device. An already refined index is reused until the catalogue
changes or the index is rebuilt. Failed or incomplete requests may be tried again on a
later visit or refresh, with a minimum 15-minute interval per show on that device. The
service records model-attempt token usage and monthly spending reservations, without
listener identifiers, to enforce a shared processing budget. The app does not submit every subscription for topic
analysis during an ordinary background refresh; background enrichment is limited to shows
used by topic-filtered playlists.

## 5a. Browsing by Guest and Topic

Episode lists can be filtered by who is on the episode and what it is about. The initial
answer is worked out on your device from feed data and works offline. Automatic enrichment
in Section 5 can improve it when the service is available. The cross-show feature first
matches episodes in shows already on your device. Opening a guest profile or the player's
“More with” section also searches the wider podcast directory for the guest's name, including podcasts they host. The name alone is sent to
Apple Podcasts search, with the search service fallback described in Section 4 if Apple
has no results. Podvo checks the returned episodes on your device and shows the matches
alongside the local results. It
does not send the episode you are playing, its show, or your listening history with this
search. While the guest profile or player recommendations are open, Podvo reads
shortlisted publishers' RSS channel headers to display their actual show names and covers
and distinguish hosts from guests. Episode notes and the guest's cached or resolved
biography are checked locally to distinguish people who share a name; those contextual
details are not sent to podcast search or feed publishers. Hosted podcasts appear as
channel links rather than guest episode counts. Each publisher receives a normal feed
request, including your IP address, as described in Section 6.

### Guest photos and bios

Guest profiles are always enabled. Podvo asks Wikipedia for a photo and a one-line
description of a guest. If that short biography cannot confirm a podcast they host,
Podvo may also fetch the introductory paragraphs of the same resolved Wikipedia
article. Only its public page title is sent; the podcast candidates and episode notes
are checked locally. This additional evidence is cached on your device for up to 30 days
before refreshing.

**What is sent:** the guest's name or matching page title goes to Wikipedia
(`en.wikipedia.org`). The public Wikidata item ID linked from that page goes to Wikidata
(`www.wikidata.org`) to verify that the page describes a human, independently of the
wording of its description. Both are operated by the Wikimedia Foundation — not by us.
No episode, podcast, account, device or install identifier is sent. Wikimedia sees your
IP address and can infer which public person was looked up; its privacy policy governs
those requests.

**How often:** cached by guest name across episodes and shows. When requested again,
complete profiles refresh after thirty days, profiles missing a photo or biography after
seven days, and unmatched names after one day. An unmatched name can be retried sooner
when another episode provides different context; that context stays on your device.
Existing photos and bios remain available if a refresh fails.

## 6. Connections to Third Parties

* **Google (Sign in with Google and Google Drive).** Only if you turn on sync (Section 2a).
  Google signs you in and stores your synced library in your own Drive. Google's privacy
  policy governs that data. Nothing about it reaches us.
* **Wikimedia Foundation (Wikipedia and Wikidata).** Guest photos & bios are always
  enabled (Section 5a). Receives a guest name/page title, its linked
  public Wikidata item ID and your IP address; no episode, podcast or listening history
  is sent.
* **Podcast publishers and hosts.** Searching, refreshing feeds, streaming and downloading
  connect your device directly to the publisher's servers. Those servers see your IP
  address and request headers, as they would with any podcast app. Their privacy policies
  govern that data; we are not involved in the connection.
* **Apple Podcasts search directory.** Podcast search queries, with a country code, are
  sent to Apple's public podcast search API to return results. The first-run interest
  questions and Home's Popular and topic tabs read Apple's public charts and directory
  lookup (Section 4).
* **Podcast Index and fyyd.de.** Used as backup directories when Apple returns nothing —
  see Section 4. Your search text reaches them via our server; nothing identifying you does.
* **YouTube.** Video podcast playback uses YouTube's official embedded player. Your
  interaction with it is governed by [YouTube's Terms of Service](https://www.youtube.com/t/terms)
  and the [Google Privacy Policy](https://policies.google.com/privacy).
* **Google Play (install referrer).** On its first start Podvo asks the Play Store app on
  your phone how it was installed. Only an install from a shared link's page answers with
  anything: that link's addresses (Section 4b). Podvo uses them to open what was shared and
  sends them nowhere.
* **GitHub (GitHub Pages).** Hosts our website, podvo.co.uk, including the page a shared
  link opens (Section 4b). Like any web host it sees the IP address and browser details of
  whoever opens the site, and GitHub's privacy statement governs that data. It never
  receives the addresses in a shared link.
* **Google Cast, DLNA and AirPlay.** Discovering and controlling speakers or TVs happens
  entirely over your local Wi-Fi network. Nothing about it reaches us.

We do not include any third-party advertising SDK, analytics SDK, attribution SDK, or
tracking library in Podvo.

---

## 7. Crash Reports

If Podvo crashes, a technical report (the error, the app version, your Android/iOS
version, and your device model) is written to the app's private storage on your device.

**These are never transmitted automatically.** No crash-reporting service is built into the
app. If you want to help us fix a crash, **Settings > About > Send crash report** hands the
file to your device's share sheet so you can choose to email it to us. Only the ten most
recent reports are kept.

---

## 8. Permissions

Android permissions Podvo requests, and why:

| Permission | Purpose |
|---|---|
| `INTERNET` | Fetch feeds, stream and download episodes, ad-skip lookups |
| `ACCESS_NETWORK_STATE`, `ACCESS_WIFI_STATE` | Detect Wi-Fi vs mobile data for the "download on Wi-Fi only" rule |
| `CHANGE_WIFI_MULTICAST_STATE` | Discover Cast and DLNA devices on your local network (SSDP multicast) |
| `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MEDIA_PLAYBACK` | Keep audio playing when the app is in the background |
| `POST_NOTIFICATIONS` | Show the playback notification and its controls, and alerts for new episodes from channels you choose (Android 13+) |
| `WAKE_LOCK` | Prevent the device sleeping mid-episode |
| `RECEIVE_BOOT_COMPLETED` | Re-register the background feed refresh after a restart |
| `BIND_GET_INSTALL_REFERRER_SERVICE` | Ask the Play Store app once, on the first start, whether Podvo was installed from a shared link (Section 4b) |

Podvo requests no access to contacts, location, camera, microphone, or your files.

---

## 9. Children's Privacy

Podvo is not directed at children under 13, and we do not knowingly collect personal
information from them.

---

## 10. Your Rights

Podvo has no accounts, so there is no account to access, export, or delete. Listening
history and preferences remain on your device: clear the app's data or uninstall it
to remove them. The service keeps the technical logs and limited daily pseudonymous
operational statistics described in Section 3; it does not store the raw install ID
in its metrics system.
If you turned on sync, your library is also in your own Google Drive, where you can
delete it at any time (Section 2a).

If you are in the UK/EU and want to exercise a right regarding our server's technical logs
(Section 3), contact us and we will help.

---

## 11. Changes

We may update this policy. Material changes — particularly any change to what leaves your
device — will be reflected here with a new "Last Updated" date before the behaviour ships.

---

## 12. Contact

* **Email:** cassian.d123@gmail.com
