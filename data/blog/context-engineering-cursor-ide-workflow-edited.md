---
title: 'Context Engineering - My System for Getting Consistent Output from Cursor'
date: '2026-02-25'
tags: ['cursor', 'ai', 'productivity', 'context-engineering', 'dev-tools']
draft: false
summary: 'A practical system for pre-loading AI with the right information to eliminate guessing and get consistent, architecture-aligned code from Cursor IDE.'
---

# Context Engineering: My System for Getting Consistent Output from Cursor

I spent months getting inconsistent results from AI coding assistants. The AI would ignore our existing utilities, use patterns we'd banned, and produce code that didn't fit our architecture.

The fix wasn't better prompts. It was giving the AI the right information *before* I asked anything.

---

## The Core Idea

**Prompt** = what you ask  
**Context** = what the AI already knows when you ask

If the AI doesn't know about your internal services, your coding standards, or your architectural constraints, it will guess. And guessing produces generic, unusable code.

My system eliminates guessing by pre-loading the AI with three types of information.

---

## The Three Parts

### 1. Specs — Define the Data Structures

Before asking the AI to build anything, I define the exact shape of the data.

**What I do:**
- Create JSON schemas, TypeScript interfaces, or OpenAPI specs for new features
- Store them in a `specs/` folder
- Reference them explicitly: "Implement the handler for `specs/notification-payload.ts`"

**What this prevents:**  
The AI inventing fields, returning wrong types, or producing data structures that don't match what the rest of the system expects.

**Example:**
```
specs/
├── user-profile.ts
├── notification-payload.json
└── content-bundle.schema.json
```

---

### 2. Skills — Document Internal Tools

I write short markdown files describing the internal services, utilities, and APIs the AI should use.

**What I do:**
- Create files in `skills/` for each major internal service
- Include: what it does, method signatures, usage examples, constraints
- Reference in prompts: "Use the image service documented in `skills/image-service.md`"

**What this prevents:**  
The AI reaching for generic external libraries when I have existing, tested solutions. No more "why didn't you use our service?" in code review.

**Example skill file:**

```markdown
# ImageService

Generates images through our CDN pipeline.

## Methods
- `generate(prompt: string, style: Style): Promise<Image>`

## Constraints
- Always use `Style.Brand` for marketing content
- Never call external image APIs directly
```

---

### 3. Hierarchical Rules — Scope Constraints to Folders

Instead of one giant rules file, I place small, focused rule files in relevant directories.

**Structure:**

```
.cursorrules                    # Global: tech stack, security, logging
src/
├── ContentGenerator/
│   └── AGENTS.md               # Voice, tone, content-specific rules
├── Scraper/
│   └── AGENTS.md               # Rate limiting, retry logic rules
├── Legacy/
│   └── AGENTS.md               # "Don't use static methods, refactor to DI"
```

**What goes where:**

| Level | What to Include |
|-------|-----------------|
| Root (`.cursorrules`) | Tech stack, security rules, logging standards |
| Module (`src/X/AGENTS.md`) | Domain-specific patterns, style rules |
| Temporary | Tech debt rules—delete when fixed |

**What this prevents:**  
The AI getting irrelevant context. When working in `src/Scraper/`, it sees scraping rules—not UI guidelines. Less noise = more accurate output.

---

## My Daily Workflow

### Before Starting a Feature

- [ ] Spec exists for any new data structures
- [ ] Internal services are documented in `skills/`
- [ ] Module rules exist if this area has specific constraints

### When Prompting

**Step 1: Plan first**

Ask the AI to draft an implementation plan before writing code:

> "Review `specs/notification-payload.ts` and `skills/notification-service.md`. Draft an implementation plan. List which existing services you'll use."

This catches misunderstandings before code is written.

**Step 2: Constrain execution**

Set explicit boundaries when prompting for code:

> "Implement following the plan. Use only services in `skills/`. Follow error handling in `src/Shared/ErrorHandler.ts`. Don't modify files outside `src/Notifications/`."

**Step 3: Test against specs**

Have the AI generate tests that validate against your specs:

> "Write tests for the handler. Validate responses against `specs/notification-payload.ts`."

---

## What Changed

| Before | After |
|--------|-------|
| Generic code needing heavy edits | Code that fits our architecture |
| AI used random packages | AI uses our internal services |
| Inconsistent patterns | Same patterns across features |
| Multiple re-prompts | Usually correct first try |
| AI forgot constraints mid-task | Constraints enforced by context |

---

## Minimum Setup to Start

Three files:

1. **`.cursorrules`** — Global tech stack and hard rules
2. **One `skills/*.md`** — Your most-used internal service
3. **One `AGENTS.md`** — In whichever folder you're working in

That's enough to see the difference.

---

## Example: Global Rules File

Here's what a minimal `.cursorrules` file looks like:

```markdown
# Tech Stack
- .NET 8, C# 12
- TypeScript 5.x with strict mode
- PostgreSQL for persistence

# Architecture
- Clean Architecture with vertical slices
- All services registered via DI
- No static helper classes

# Logging
- Use structured logging with Serilog
- Include correlation IDs in all log entries
- Never log PII or secrets

# Error Handling
- Use Result<T> pattern, not exceptions for business logic
- All API errors return ProblemDetails format
```

---

## Example: Module-Level Rules

Here's a module-specific `AGENTS.md` for a content generation service:

```markdown
# Content Generator Rules

## Voice
- Professional but approachable
- Use technical analogies when explaining concepts
- Avoid passive voice

## Structure
- All posts must include a call-to-action
- LinkedIn posts: max 1300 characters
- Twitter threads: max 280 chars per tweet

## Code
- Use the ContentService for all content operations
- Images must go through ImageService, never external APIs
```

---

## The Point

The AI will guess if you don't tell it. Guessing produces generic, wrong, or inconsistent code.

Pre-load the context:
- **Specs** so it knows the data shapes
- **Skills** so it knows your tools
- **Rules** so it knows your constraints

When the AI has the right information, it produces code that actually fits your system.

---

*This is my workflow. Adapt it to your stack.*
