# AIAgency Architectural Decisions

This document records the 12 key architectural decisions made during the design and build of the AIAgency governance system. Each entry explains the decision, the reasoning behind it, alternatives that were rejected, and downstream impact.

---

## D-01 — Plain `<script>` tags only (no module bundler)

**Date:** Phase 1
**Decision:** All JavaScript is delivered as plain `<script>` tags. No `import`, `export`, or `require()` is used. All code attaches to the `window.AIAgency` namespace.
**Why:** The application runs as a local HTML file without a build step or a Node.js server. Module bundlers (Webpack, Rollup) require a build pipeline and complicate offline-first deployment.
**Alternatives rejected:** ES modules (`type="module"`), CommonJS (`require`), AMD.
**Impact:** Load order in `main.html` is the dependency graph. New files must be added in the correct position. Every file must be an IIFE attaching to `window.AIAgency`.

---

## D-02 — `window.AIAgency` as the single operational namespace

**Date:** Phase 1
**Decision:** All runtime state, policies, contracts, and utilities are attached to `window.AIAgency`. A secondary `window.aiagency` (lowercase) exists for legacy Phase 1 references.
**Why:** A single top-level namespace prevents collisions with third-party libraries, makes state inspectable from the browser console, and enables the governance inspector pattern.
**Alternatives rejected:** Separate top-level objects per phase; closure-only state (not inspectable).
**Impact:** All files begin with `window.AIAgency = window.AIAgency || {}`. Inspectors (`AIAgency.gov`, `AIAgency.contract`) are naturally discoverable.

---

## D-03 — Default-allow principle for governance rules

**Date:** Phase 2
**Decision:** Any action NOT explicitly listed in a layer's `deniedActions` array is permitted. Governance layers specify what is *forbidden*, not what is *allowed*.
**Why:** An allowlist model requires every new capability to be explicitly granted, which creates friction in a fast-evolving development phase. A denylist model allows new features by default while hardcoding safety constraints.
**Alternatives rejected:** Pure allowlist (allowedActions only), hybrid with both required and non-empty.
**Impact:** `allowedActions` arrays in most layers are empty or informational. Enforcement logic checks `deniedActions.indexOf(action) !== -1`.

---

## D-04 — Paired external auditor model

**Date:** Pre-Phase 4 Patch
**Decision:** Layer 1 (`providerSystem`) holds a single `externalAuditor` hash slot. Only one external auditor can be registered at a time. Registration requires a new versioned policy file approved by a human admin.
**Why:** Multiple simultaneous auditors create conflicting authorities. A single registered hash is verifiable and unambiguous. Human-only change gate prevents automated takeover.
**Alternatives rejected:** Multi-auditor registry, runtime-mutable auditor slot, auditor registered via contract.
**Impact:** `externalAuditor.registeredHash` is null until Phase 4. Mutation throws `POLICY_CHANGE_REQUIRES_HUMAN_APPROVAL`. Phase 4 will replace stub with real ECDSA hash verification.

---

## D-05 — External plug-ins = skills only

**Date:** Phase 3
**Decision:** External code can only enter the system as a versioned skill object attached to a contract's `draft2.skills[]`. No other mechanism exists for loading external code.
**Why:** Skills have a defined schema, are validated on addition, are logged to the negotiation log, and are governed by Layer 5 `frameworkRules.skillRules`. An unrestricted plugin API would bypass all governance.
**Alternatives rejected:** Runtime script injection, plugin manifests outside contracts, npm-style dependency resolution.
**Impact:** External skills require `isExternal: true`, a `sourceUrl`, and pass `validateSkillObject()`. Phase 4 will add ECDSA package signing for external skills.

---

## D-06 — Two-draft contract negotiation protocol

**Date:** Phase 3
**Decision:** Contracts have a mandatory two-draft protocol: Draft 1 sets the legal and policy terms; Draft 2 assigns the agent and available skills. Neither party can skip a draft.
**Why:** Separating terms (Draft 1) from technical capability (Draft 2) mirrors real-world contract negotiation. It creates a natural audit checkpoint and prevents agent assignment without agreed terms.
**Alternatives rejected:** Single-draft contracts, inline skill selection in Draft 1.
**Impact:** State machine enforces DRAFT_1 → DRAFT_2 → PENDING_SIGNATURE → APPROVED → ACTIVE. `validateContractForActivation()` requires both `draft1.approvedAt` and `draft2.approvedAt`.

---

## D-07 — IndexedDB for contract persistence + MySQL for long-term storage

**Date:** Phase 3
**Decision:** Contracts are persisted to IndexedDB in the browser for offline-first access. A future MySQL database (via PHP backend) will serve as the authoritative long-term store.
**Why:** IndexedDB allows the app to function without a server. MySQL provides multi-user access, audit trails, and backup. The two stores sync when a network connection is available.
**Alternatives rejected:** localStorage only (size limits, no structured queries), server-only storage (breaks offline use).
**Impact:** `contract_storage_v1.js` is the IndexedDB adapter. MySQL/PHP integration is deferred to Phase 7. `restoreContractsOnLoad()` re-hydrates state from IndexedDB on every page load.

---

## D-08 — ECDSA over HMAC for package signing

**Date:** Phase 3 (deferred to Phase 4)
**Decision:** Contract and package signatures will use ECDSA (P-256 or P-384) via the Web Crypto API. HMAC is rejected.
**Why:** ECDSA produces asymmetric signatures: the provider signs, any party verifies with the public key. HMAC requires shared secrets, making verification by a third-party auditor impossible.
**Alternatives rejected:** HMAC-SHA256, RSA-PSS, no signing (stub-only).
**Impact:** Phase 3 uses `signature.stub: true` as an acceptable stand-in. `validateContractForActivation()` accepts `stub: true`. Phase 4 will replace this with real ECDSA verification against provider public keys.

---

## D-09 — Input Verification Pass (IVP) as hardcoded gate

**Date:** Pre-Phase 4 Patch (prefix reserved)
**Decision:** Every agent action that processes user-supplied input must pass through an Input Verification Pass record (`ivp_NNNN`). IVP is a hardcoded gate, not a configurable rule.
**Why:** Input validation is a critical security control that must not be bypassable through governance configuration. Hardcoding the gate prevents a policy author from accidentally removing input sanitisation.
**Alternatives rejected:** IVP as a Layer 1 rule (too easy to override via layer stacking), optional IVP flag per skill.
**Impact:** `ivp` prefix registered in `id_generator_v1.js`. IVP record structure and enforcement are deferred to Phase 5.

---

## D-10 — External auditor hash stored in Layer 1 policy

**Date:** Pre-Phase 4 Patch
**Decision:** The external auditor's registration hash is stored directly in the Layer 1 (`providerSystem`) policy object, not in a separate registry or database table.
**Why:** Layer 1 is the highest authority and the only layer with HUMAN_ONLY mutability. Storing the auditor hash here ensures it can only be changed by a human admin via a new versioned file, co-located with the policy it constrains.
**Alternatives rejected:** Auditor hash in a separate `auditor_registry_v1.js`, stored in IndexedDB, managed via contract.
**Impact:** `policy.externalAuditor.registeredHash` is null until Phase 4. A nested `Proxy` throws `POLICY_CHANGE_REQUIRES_HUMAN_APPROVAL` on any mutation attempt.

---

## D-11 — MySQL + PHP backend, no framework

**Date:** Phase 1
**Decision:** The server-side backend (when built) will use PHP with direct PDO database access. No PHP or JavaScript framework is used.
**Why:** The application is designed for independent, offline-capable deployment without npm, Composer, or framework dependencies. Raw PHP and SQL are portable and have minimal hosting requirements.
**Alternatives rejected:** Node.js/Express, Laravel, Django, Next.js.
**Impact:** All server-side code must be plain PHP. SQL queries use parameterised PDO statements. No ORM. Backend deferred to Phase 7 (contract persistence) and Phase 9 (telemetry).

---

## D-12 — Phase 9 telemetry as a paid skill tier

**Date:** Phase 1
**Decision:** Advanced usage telemetry (per-agent call counts, token usage, skill invocation metrics) will be delivered as a paid skill available only to contracts with `quotas.tier = PRO` or higher.
**Why:** Telemetry has a real infrastructure cost. Gating it behind a paid tier aligns incentives and prevents free-tier abuse of metric collection endpoints.
**Alternatives rejected:** Free telemetry for all tiers, telemetry as a built-in governance layer, opt-out telemetry.
**Impact:** `quotas.tier` field added to `draft1` in Pre-Phase 4 Patch. Valid tier values: `FREE | BASIC | PRO | ENTERPRISE`. Telemetry skill implementation deferred to Phase 9.
