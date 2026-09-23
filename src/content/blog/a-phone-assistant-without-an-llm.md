---
title: "I built a phone assistant that files your sentences without an LLM"
description: "How Unutma turns one typed or spoken sentence into a task, expense, routine, memory or vault entry, on the device, with hand-written rules and a 41 KB classifier. With honest numbers."
pubDate: 2026-09-23
tags: ["Unutma", "engineering", "privacy", "on-device", "show-hn"]
image: "/launch/unutma-show-hn-poster.jpg"
imageAlt: "Unutma turning the sentence 'Dentist Thursday at 3pm' into a to-do with a 3 PM reminder"
featured: true
draft: false
---

<video src="/launch/unutma-show-hn-16x9.mp4" poster="/launch/unutma-show-hn-poster.jpg" controls playsinline preload="metadata" style="width:100%;border-radius:12px"></video>

I'm a solo developer. Unutma ("don't forget" in Turkish) is a to-do list, calendar, budget, journal, notes app and password vault on one phone. The interesting part is the box at the bottom of the screen. You type or say one sentence, and it decides where that sentence belongs:

| You say | It does |
|---|---|
| Dentist Thursday at 3pm | A to-do due Thursday, reminder at 3:00 PM |
| Spent 40 on gas | An expense of 40, and it asks you to confirm before saving |
| Water the plants every other day | A routine that repeats every 2 days |
| Mom's birthday is May 3rd | A remembered date that repeats every year |
| Wifi password is hunter22 | Straight into the encrypted vault, masked in the chat |
| What's on this week? / Open my budget / Switch to dark theme | An answer from your own records, a screen, a setting with undo |

These are real outputs of the engine for those exact sentences, not a script.

## Why not an LLM

I tried to find one that fits. A 0.5B–1B model is 200 MB to 1 GB after quantization, takes seconds per sentence on a mid-range phone, is weakest exactly in Turkish, and occasionally invents a field. For an app whose job is to put your dentist appointment in the right place, "occasionally invents" is the wrong failure mode. Cloud LLMs were never an option: the app has no server and no account, and I wanted to keep it that way.

## How it works

Everything below runs on the phone. Nothing you type is sent anywhere.

1. **Rules, in six languages** (Turkish, English, German, Spanish, French, Italian). A tokenizer, normalisation, Turkish suffix handling, and extractors for dates, times, amounts and repetition ("every other day", "on the 15th of every month"). The rules still do all the slot filling.
2. **A small embedding model.** A pruned multilingual-e5-small, int8, about 29 MB, running through ONNX Runtime.
3. **A 41 KB classifier.** Logistic regression over the sentence embedding, the language, and 29 features taken from the rules (which layer fired, how confident, how close the runner-up was). It outputs a calibrated probability over 18 destinations.

The classifier never writes content. It only picks a box, and the rules for that box must be able to build a concrete entry, or the choice is dropped. Then one of five things happens:

- **agree / act**: rules and model agree, or the model is confident. The entry is saved, with undo and a "wrong place?" chip.
- **keep or take**: the rules were very sure and the model disagrees. It asks instead of silently overriding.
- **suggest / ask**: not sure. It shows the top places the sentence could go, plus "save as a to-do".

When you pick a place, the phone stores that sentence's embedding (384 numbers, not the text) with your choice, and similar sentences go there next time. Vault entries are excluded, and so is the backup.

## Honest numbers

I measure on held-out sets that the rules and the model never saw during tuning. The last one has 1,595 sentences across the six languages, many of them deliberately messy or with two intents in one sentence. It was opened once, after the thresholds were frozen.

| | Rules only | Rules + model |
|---|---|---|
| Right place on the first try | 50.2% | 63.9% |
| Right place shown to you (incl. the suggestion) | – | 67.4% |
| Saved in the wrong place without asking | 49.8% | 19.9% |

It is not at 90%, and I don't think the current approach gets there. The number I care about most is the last row. A wrong guess you are asked about costs one tap. A wrong guess saved silently is how you miss the dentist.

One caveat: the test sentences were written for testing, independently of the rules. They are not real user sentences, because the app has no telemetry and I can't see what anyone types. If you try it and it gets something wrong, telling me is the only way I find out.

## Privacy details

- No account, no sign-up screen, no server that receives your data.
- The vault and the journal are encrypted at rest (AES-256, key kept in the phone's secure storage).
- Voice input uses the phone's own speech recognition. It runs on the device when the phone supports it; otherwise the OS may use its network service. The app tells you once when that happens.

## Try it

Unutma is on the [App Store](https://apps.apple.com/app/id6758889495) and [Google Play](https://play.google.com/store/apps/details?id=com.mehmet.unutma). The on-device model ships in the iPhone version today (3.16); the Android update with the same engine follows shortly. Every feature is free for 7 days, then it's a subscription; your records stay on your phone either way.

If it files something in the wrong place, I'd genuinely like to know the sentence. That's the whole point of this post.
