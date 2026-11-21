---
title: "Offline Personal Assistant App: No Cloud, No Account"
description: "An offline personal assistant app that works in airplane mode: tell it once, ask it later, with no cloud and no account. Includes a 6-question test for any app."
seoTitle: "Offline Personal Assistant App, No Account"
pubDate: 2026-11-24
keyword: "offline personal assistant app"
tags: ["Unutma", "assistant", "privacy", "offline", "on-device"]
image: /blog/covers/v3/a-phone-assistant-without-an-llm.jpg
imageAlt: "Unutma assistant splitting one sentence into a calendar entry, a shopping item and a budget expense"
draft: true
---

An offline personal assistant app should do one thing well: you tell it something once, and it answers when you ask later, with no signal, no cloud and no account. Unutma works that way. You type or say a sentence like "dentist Thursday at 3pm", it saves it in the right place on your phone, and you can ask "what's on this week?" in airplane mode.

Many apps that call themselves offline assistants are chatbots that first download a large model. Others are cloud apps with a cached copy. This guide explains the difference, gives you a test to run on any app, and lists what Unutma does and does not do offline.

## What should an offline personal assistant app do?

When we looked at the search results for this phrase in November 2026, the first page was mostly App Store listings. Two kinds of apps showed up: offline chatbots built on downloaded language models, and a few organizers for notes and tasks. Few pages compared them, and none explained what happens to your data.

A useful offline assistant needs three things:

- **It remembers for you.** You say it once. It files the sentence as a to-do, a calendar entry, an expense, a routine or a note.
- **It answers from your own records.** Later you ask "what's on this week?" or "how much did I spend this month?" and it replies from what is on the phone.
- **It asks for nothing first.** No account, no sign-in, no server that has to be reachable.

## Tell it once, ask it later: how Unutma works

You type or say one sentence. The assistant decides where it belongs and saves it.

| You say | It does |
|---|---|
| Dentist Thursday at 3pm | A calendar entry for Thursday, with a reminder |
| Buy milk and bread | Two items on the shopping list |
| Water the plants every other day | A routine that repeats every 2 days |
| Mom's birthday is May 3rd | A remembered date that returns every year |
| Wifi password is hunter22 | The encrypted vault, masked in the chat |
| What's on this week? | An answer from your own records |

The assistant understands six languages: English, Turkish, German, Spanish, French and Italian. It does not hold a free conversation, so if you ask for a poem, it will not write one. That limit keeps it small and predictable.

## How can it work with no internet?

Everything below runs on the phone. Hand-written rules in six languages pull out dates, times, amounts and repeats. A small embedding model, about 29 MB, and a 41 KB classifier pick the destination. The classifier never writes content; it only chooses a place, and the rules for that place must be able to build a real entry. When it is not sure, it asks you or shows the likely places instead of guessing silently. The technical write-up is in [how we built a phone assistant without an LLM](/blog/a-phone-assistant-without-an-llm/).

There is no server in the loop, so there is nothing to be offline from. Reminders are scheduled on the phone and fire in airplane mode.

## A 6-question test for any offline assistant

Run this before you trust an app with real information. It takes about ten minutes.

1. **Does it need an account to open?** Delete and reinstall, then see what the first screen asks for.
2. **Does it work in airplane mode after a restart?** Add a reminder, turn on airplane mode, restart the phone, then type something new. Our [5-step offline test](/blog/why-you-should-use-offline-apps/) walks through it.
3. **Does it need a download first?** A multi-gigabyte model download means a chatbot, and the first run needs internet.
4. **Does it rewrite what you typed?** Save a sentence with a typo and a name. A rules-based assistant keeps your words.
5. **What does the privacy label say?** Apple lists what developers must declare in its [App Store privacy details](https://developer.apple.com/app-store/app-privacy-details/). The labels are self-reported, so treat them as a starting point.
6. **What about voice?** Check whether speech recognition stays on the device.

## Does voice work offline?

This is the exception, and we state it plainly. Unutma uses your phone's own speech recognition for voice input. On iPhone, Apple lets an app check [whether the recognizer can run without network access](https://developer.apple.com/documentation/speech/sfspeechrecognizer/supportsondevicerecognition). On Android, the default [speech recognizer may stream audio to remote servers](https://developer.android.com/reference/android/speech/SpeechRecognizer), while newer versions also offer an on-device one. Typed sentences never leave the phone. More on dictation is in our guide to [voice commands and hands-free organizing](/blog/unutma-voice-commands-hands-free-organizing/).

## Cloud assistant or offline assistant?

| | Cloud-based assistant | Unutma |
|---|---|---|
| Account | Usually required | None |
| Where records live | On the provider's servers | On your phone only |
| No signal | Often limited to a cached copy | Works in airplane mode |
| Other devices | Sync | Not available; backup file instead |
| Computer version | Often | None |

If you need sync or a shared family list, a cloud app is the better tool. Our [notes app with no account](/blog/notes-app-no-account-offline/) comparison keeps those rows in the table on purpose.

## What you give up

- **No sync and no computer version.** Your records are on one phone. Move them to a new phone with a backup file, as described in [moving Unutma to a new phone](/blog/move-unutma-to-a-new-phone/).
- **No live sharing.** You can send a one-off copy of a list, not a list that updates.
- **No open conversation.** It files things and answers questions about your own records.
- **No recovery from us.** With no account, nobody can restore your data if you lose the phone. Keep a backup file.
- **It is paid after a trial.** Everything is free for 7 days. After that, adding and editing needs a subscription, while your existing records stay visible.

## Where it fits

Unutma covers the daily "where does this go?" problem: to-dos, shopping, calendar, budget, journal and a [password vault](/blog/unutma-vault-passwords-face-id-privacy/). The [complete feature guide](/blog/unutma-app-complete-feature-guide/) maps every screen, and the [offline to-do app](/blog/best-offline-todo-app/) comparison covers lists alone.

## Frequently asked questions

### Is there an offline personal assistant app with no account?

Yes. Unutma has no sign-up screen and no server that receives your records. You type or say a sentence, it is saved on the phone, and you can ask about it later in airplane mode.

### Does the assistant work in airplane mode?

Typed sentences and questions work, because the rules, the embedding model and the classifier run on the phone. Voice input depends on your phone's speech recognition, which may need a connection.

### Is it a chatbot like ChatGPT?

No. It files sentences and answers questions about your own records. It does not write free text, and nothing you type is sent to a language model.

### Which languages does the assistant understand?

Six: English, Turkish, German, Spanish, French and Italian. The app interface has 8 languages, but the assistant is not available in the other two.

### Does it work on Android and iPhone?

Yes, on iPhone, iPad and Android. There is no desktop version.

### What happens if I lose my phone?

With no account, nobody can restore your data for you. Create a backup file and keep it somewhere you control.

## Bottom line

If you want an offline personal assistant app that you tell once and ask later, with no cloud and no account, run the 6-question test on any candidate, ours included. Unutma is on the [App Store](https://apps.apple.com/app/id6758889495) and [Google Play](https://play.google.com/store/apps/details?id=com.mehmet.unutma).
