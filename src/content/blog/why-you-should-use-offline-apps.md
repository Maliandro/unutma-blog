---
title: "Apps That Work Offline: A 5-Step Phone Test"
description: "Many apps that work offline only do so until they need to sync. Run this 5-step airplane mode and restart test, and see which features truly work offline."
pubDate: 2026-08-16
updatedDate: 2026-10-16
keyword: "apps that work offline"
tags: ["unutma", "offline", "privacy"]
image: /blog/covers/cover-2.svg
imageAlt: "Abstract cover illustration for a guide to testing apps that work offline"
draft: false
---

You open your shopping list in a basement supermarket and get a spinner. Or a reminder fails to load on a plane. Most people only learn how "offline" an app really is at the moment they need it. Plenty of apps that work offline are honest about it. Others work offline only until they decide to sync, check a login, or fetch a setting from a server.

This guide gives you a test you can run in five minutes on any app, ours included. Then it shows, row by row, what works offline in Unutma and what does not. Unutma is our app, so we are not neutral. That is why the table keeps the rows where a connection still matters.

## Why "works offline" is a slippery claim

There are roughly three kinds of apps that say they work offline:

- **Cloud apps with a local copy.** Your data lives on a server. The phone keeps a cached copy so you can read it, and changes queue up until you reconnect. This works well most of the time, but the app may still ask you to sign in again, or refuse to open a part it never cached.
- **Apps that need a login to start.** Some open fine offline once you are signed in, but a fresh install or an expired session needs the internet.
- **Local-first apps.** The data is stored on the phone and the app has no server to wait for. Offline is not a mode here. It is just how the app runs.

None of these is wrong. The problem is that store pages rarely tell you which one you are installing. Both Apple and Google ask developers to declare what data an app collects, in the [App Store privacy details](https://developer.apple.com/app-store/app-privacy-details/) and the [Google Play Data safety section](https://support.google.com/googleplay/android-developer/answer/10787469). Those labels are a good start, but they are self-reported, and they say little about what happens with no signal. So test it yourself.

## The 5-step offline test

Do this with the app you rely on most. It takes about five minutes.

1. **Add something first.** While still online, create a note, a to-do and a reminder for 10 minutes from now. This gives you real data to look for.
2. **Turn on airplane mode.** Also turn off Wi-Fi if your phone keeps it on in airplane mode.
3. **Force-close and reopen the app.** Swipe it away completely, then open it again. Cached screens often survive a quick switch but not a cold start.
4. **Restart the phone, still offline.** Open the app again. Check that your note is there, that you can add a new item, and that the reminder still fires on time.
5. **Try the edge features.** Search, voice input, export, any assistant or smart sorting. These are the parts most likely to quietly call a server.

If the app asks you to sign in, shows an empty list, or delays the reminder until you reconnect, it is a cloud app with an offline cache. That may be fine for you. Now you know.

## What works offline in Unutma (and what does not)

We ran the same test on Unutma. The app has no account and no server for your records, so most rows are simple. The few that are not are listed honestly.

| Feature | Works in airplane mode? | Note |
|---|---|---|
| Quick actions ("Locked the door") | Yes | Logged on the phone with a timestamp |
| To-do, shopping list, wishlist, notes | Yes | Stored only on the phone |
| Routines and reminders | Yes | Notifications are scheduled on the device |
| Calendar | Yes | |
| Budget (Economy tab) | Yes | Manual entry, no bank connection |
| Journal | Yes | Stored encrypted on the phone |
| Vault | Yes | Encrypted, behind Face ID or your PIN |
| The assistant (typed sentences) | Yes | Runs on the phone; it is rule-based plus a small on-device model |
| Voice input | Depends on your phone | Uses your phone's own dictation, which may need a connection |
| Sending a backup file to a new phone | Needs a way to move the file | Creating the file works offline; email or cloud transfer does not |
| Starting or restoring a Premium purchase | No | The app store needs a connection |

The assistant row is the one people doubt most. In Unutma, it cannot make a network call at all. The Settings screen called "Where is your data?" spells that out, along with how many records are stored on the phone.

## What you give up with a local-first app

Being offline by design has real costs, and you should weigh them:

- **No sync.** Your records are on one phone. There is no web or desktop version.
- **No live sharing.** You can send a one-off copy of a list, but it does not update for the other person.
- **No automatic recovery.** With no account, nobody can restore your data if you lose your phone. That includes us. A backup file is the one habit that matters.

If you need a laptop or a shared family list, a cloud app is the better tool. Our [notes app with no account](/blog/notes-app-no-account-offline/) comparison keeps those rows in the table on purpose.

## Who offline-first suits

It suits people who keep private things on their phone and would rather not create another account. It also suits people who shop, commute or travel through dead zones. And it suits anyone who wants their reminders to fire whether or not a server is up.

If that is you, a few guides go further: how to [keep personal data on your phone](/blog/keep-your-data-safe-on-your-phone/) without making it fragile, and how a [reminders app that works offline](/blog/unutma-routines-calendar-widgets-time/) schedules its notifications. For the specific worry of "did I switch the stove off?", see [how to stop forgetting things](/blog/how-to-stop-forgetting-things/). Passwords are a separate case, covered in our [offline password vault app](/blog/unutma-vault-passwords-face-id-privacy/) guide. A broader checklist for your device is in the UK NCSC's [device security guidance](https://www.ncsc.gov.uk/collection/device-security-guidance).

## Frequently asked questions

### How can I tell if an app works offline before installing it?

You usually cannot, from the store page alone. Install it, add real data, then run the 5-step test above. The restart step catches most cached-only apps.

### Do offline apps still send data somewhere?

Some do, for analytics or crash reports, once you reconnect. Check the privacy label and the app's settings. In Unutma, usage statistics are off unless you switch them on.

### Will my reminders fire in airplane mode?

In Unutma, yes, because they are scheduled on the phone. Battery saving modes can still delay notifications on some Android phones, which is a phone setting rather than a network issue.

### Is an offline app safer than a cloud app?

It removes one risk, a breach of an online account, and adds another, losing the phone. Keep a backup file somewhere you control.

### Can I use Unutma offline on a tablet or computer?

It runs on iPhone, iPad and Android. There is no desktop version.

## Bottom line

"Works offline" can mean three different things, and the store page will rarely tell you which. Five minutes in airplane mode will. If an app passes the restart test with your real data, it is one of the apps that work offline in the way that matters: when you have no signal and need the list.
