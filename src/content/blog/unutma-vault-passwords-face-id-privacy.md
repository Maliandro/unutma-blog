---
title: "The Unutma Vault: Passwords, PINs, and Calm Behind Face ID"
seoTitle: "Offline Password Vault App: How Unutma's Works"
description: "An offline password vault app on your phone: how Unutma's Vault encrypts entries, what it does not protect, and a lost-phone checklist with backup steps."
pubDate: 2026-04-04
updatedDate: 2026-10-16
keyword: "offline password vault app"
tags: ["Unutma", "privacy", "security", "organization"]
draft: false
image: "/blog/covers/ai/unutma-vault-passwords-face-id-privacy.png"
imageAlt: "Padlock and laptop on a wooden desk, security and privacy mood"
---

Looking for an offline password vault app that keeps a handful of important logins on your phone, with no account and no cloud? This page explains how Unutma's Vault does that, what it protects, and where it stops.

The worst password manager is the one you **stopped using** because it felt like another job — so you went back to **reusing three passwords** and hoping for the best. **Unutma’s Vault** is designed for a narrower promise: **sensitive items live in one place**, gated by **Face ID, Touch ID, or your device PIN**, with categories that match real life — not a spreadsheet fantasy.

This guide covers **what belongs in Vault**, **how to avoid dumping everything on day one**, **how Vault fits Unutma’s offline-first privacy story**, and **what Vault is not** (it is not a replacement for a dedicated team enterprise password system — it is **your** pocket vault). For the full app overview, read the [complete feature guide](/blog/unutma-app-complete-feature-guide/).

## What the Vault is for

Think in **categories**, not “everything sensitive ever”:

- **Banking and money portals** — fewer “which login was this?” moments.
- **Government IDs and reference numbers** — the things you panic-search in PDFs at midnight.
- **Internet accounts that truly matter** — primary email, password manager recovery, cloud storage.

**Nice-to-have, not day-one:** old loyalty numbers you use once a year — add when the pain appears, not before.

## Biometrics: friction in the right direction

Biometric gating is not theater — it is **context switching**. When Vault requires Face ID, you are less likely to casually show a screen full of secrets to a friend who asked to see a photo. It also reduces **shoulder surfing** risk in cafes and airports.

**If biometrics fail** (injury, gloves, sensor issues), your device PIN remains the backstop — keep that PIN **strong and private**, not your birthday.

## Field hygiene: copy, hide, rotate

**Copy fields** when you need to paste into a browser — but **clear clipboard** afterward on shared devices.

**Hide values on screen** when someone might glance — paranoia is proportional to context.

**Rotate passwords** when a service tells you there was a breach — Unutma does not replace **good security hygiene**; it makes hygiene **easier to execute**.

## How much to store (without hoarding)

A vault with **500 entries** sounds impressive — until none of them are maintained. Better:

- **Phase 1 (week one):** 5–10 **critical** entries you touch monthly.
- **Phase 2:** Add entries **when you struggle** to find them elsewhere.
- **Phase 3:** Quarterly **delete** duplicates and dead accounts.

If you migrate from another manager, **do not import blindly** — treat migration as **spring cleaning**.

## Vault + Economy: keep mental models separate

**Vault** holds **credentials**. **Economy** holds **money flows**. They relate — you log into banking through Vault, you categorize spending in Economy — but **do not store card PINs in plain text in shopping lists** out of convenience. If you must note a PIN temporarily, Vault is the right room.

## Vault + Lists: never mix “buy milk” with “bank token”

Keep **Shopping lists** human and boring. Keep **Vault** for secrets. The cognitive cost of mixing them is not just security — it is **attention bleed** every time you open Lists in a store.

## Threat model (honest)

Unutma’s pitch is **on-device storage** and **no mandatory cloud login for your private content** in ordinary use. That does not mean your phone is invincible:

- **Physical theft** matters — use device encryption + strong PIN + remote wipe options from the OS.
- **Malware** on a compromised device can still scrape screens — Vault raises the bar; it does not repeal physics.

## Backup without surrendering philosophy

When you export or back up, **you choose the destination** — external drive, encrypted archive, your own cloud — instead of silently mirroring everything to a vendor by default. Read your app’s current backup screens carefully; policies evolve, and **you** should know where a file lands.

## When Vault is the wrong tool

If you need **team sharing**, **role-based access**, or **enterprise audit logs**, you may still use a dedicated team vault for work — and keep Unutma for **personal** secrets. That is not failure; it is **appropriate scope**.

## Checklist: Vault sanity (10 minutes)

1. Delete **three** entries you no longer recognize.
2. Confirm **biometric lock** still works after an OS update.
3. Add **one** entry you have been looking up in screenshots — stop the screenshot habit.

## Under the hood: how the Vault protects entries

Here is exactly what the Vault does, checked against the app's code in October 2026. We would rather give you the dull technical version than a shield icon.

| Layer | What it does | What it does not do |
|---|---|---|
| Encryption | Each entry is encrypted with AES-256-CBC and a random 128-bit IV | It does not protect entries while the Vault is open on screen |
| The key | A random key is created on your phone and kept in the phone's secure storage (Keychain or Keystore), available only when the phone is unlocked | There is no copy of the key on any server, so nobody can recover it for you |
| Vault PIN | Your 4 to 6 digit PIN is salted and hashed with key stretching (10,000 rounds of SHA-256), so the PIN itself is never stored | A short PIN is still guessable by someone with your unlocked phone and time; repeated wrong attempts trigger a waiting period |
| Face ID or fingerprint | Opens the Vault without typing the PIN | It is only as strong as the phone's own biometric setup |
| Screenshots | Blocked while the Vault is unlocked | It cannot stop someone photographing the screen with another phone |
| Copying a password | The clipboard clears 30 seconds after you copy an entry | Other apps can still read the clipboard during those 30 seconds |
| Network | The Vault never sends anything; the app has no server | Malware already on the phone is outside what any app can stop |

The Vault even says this about itself: for critical financial information, a dedicated password manager is the safer tool. We agree. The Vault is for the small set of things you look up on your phone and would otherwise keep in a note or a screenshot. On the free plan it holds 3 entries.

Official guidance points the same way. The US NIST's [digital identity guidelines (SP 800-63B)](https://pages.nist.gov/800-63-3/sp800-63b.html) favour long, unique passwords over complicated rules. CISA's guide to [strong passwords](https://www.cisa.gov/secure-our-world/use-strong-passwords) recommends a password manager so you do not reuse passwords. The UK NCSC's [password advice](https://www.ncsc.gov.uk/collection/passwords/updating-your-approach) also suggests storing passwords rather than trying to remember them all.

## Lost phone: a checklist

With no account and no cloud, nobody can restore your Vault if you lose your phone. That includes us. So do this now, not after the phone is gone:

- [ ] **Make a Vault backup.** On the Vault screen, tap "Back Up", set a backup password (at least 4 characters) and save the file somewhere off the phone.
- [ ] **Write the backup password down** and keep it away from the phone. It is the only way to open the backup.
- [ ] **Remember that the Vault is not in the main backup.** The app's general backup file deliberately leaves it out, so you need both files.
- [ ] **Turn on your phone's find-and-erase feature**, so a lost phone can be wiped remotely.
- [ ] **Keep a list of which accounts are in the Vault**, without the passwords, so you know what to change if the phone is stolen.

If the phone is lost or stolen:

1. Erase it remotely through the phone maker's find-my-device service.
2. Change the passwords for the most important accounts in the Vault, starting with email and banking.
3. On the new phone, install Unutma, open the Vault screen, tap "Back Up" and then "Restore from file", and enter the backup password.

Our guide on [moving Unutma to a new phone](/blog/move-unutma-to-a-new-phone/) covers the main backup, and [how to keep personal data on your phone](/blog/keep-your-data-safe-on-your-phone/) has the wider device checklist. If you are still deciding whether a phone-only tool suits you, start with our test for [apps that work offline](/blog/why-you-should-use-offline-apps/).

## Frequently asked questions

### Is Unutma's Vault an offline password vault app?

Yes. Entries are encrypted and stored only on your phone, and the Vault works in airplane mode. There is no account and no sync.

### What encryption does the Vault use?

AES-256-CBC with a random IV per entry. The key lives in the phone's secure storage. Your Vault PIN is protected with key stretching (10,000 rounds of SHA-256) and a random salt.

### Can you recover my Vault if I forget the PIN or lose the phone?

No. We have no server and no copy of your key. A Vault backup file and its password are the only way back.

### Is the Vault included in the normal backup?

No. It has its own "Back Up" button on the Vault screen, so you choose when that file is created and where it goes.

### Should I use it instead of a dedicated password manager?

For a few personal entries, it works well. For dozens of accounts, browser autofill or shared family logins, a dedicated password manager is the better tool.

Why no mandatory login at all? Our guide to a [to-do list app with no account](/blog/todo-list-app-no-account-offline/) explains the trade-off, including what you give up.


## What to read next

- [Unutma quick actions and statistics](/blog/unutma-quick-actions-streaks-heatmap-statistics/) — habits around *showing up*.
- [Economy deep dive](/blog/unutma-economy-expenses-budgets-assets/) — where money clarity lives.

**Bottom line:** the Vault works when it is **small, current, and respected** — a door you actually close, not a warehouse you fear opening.
