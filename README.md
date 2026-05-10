
## Phase 2 — Core Governance Engine

Baseline governance system: 6-layer policy stack, registry, and merge engine.

### Phase 2 Patch B — Governance Viewer & Uniform Layer Shape

| File | Change |
|------|--------|
| `service_contract_policy_stub_v1.js`    | NEW — Layer 3 stub |
| `requester_policy_stub_v1.js`           | NEW — Layer 4 stub |
| `agent_definition_policy_stub_v1.js`    | NEW — Layer 5 with frameworkRules |
| `role_profile_policy_stub_v1.js`        | NEW — Layer 6 stub |
| `governance_inspector_v1.js`            | NEW — AIAgency.gov console viewer |
| `provider_system_governance_policy_v1`  | PATCHED — uniform shape |
| `provider_environment_governance_policy_v1` | PATCHED — uniform shape |
| `governance_registry_v1.js`             | PATCHED — Layer 5+6 added |
| `phase2_governance_engine_test.js`      | PATCHED — test groups 12+13 |

---

## Phase 3 — Contract Layer

Full service contract lifecycle system: two-draft negotiation protocol,
lifecycle state machine, IndexedDB persistence, governance Layer 3
registration, and console inspection via `AIAgency.contract.*`.

### Files

| File | Purpose |
|------|---------|
| `aiagency/contracts/contract_schema_v1.js`     | Contract object shape schema, `validateContractShape()`, `generateId()` |
| `aiagency/contracts/contract_states_v1.js`     | `CONTRACT_STATUS` enum (8 states), `VALID_TRANSITIONS` map, `isValidTransition()` |
| `aiagency/contracts/contract_validator_v1.js`  | `validateDraft1Rules()`, `validateDraft2Skills()`, `validateContractForActivation()` |
| `aiagency/contracts/contract_storage_v1.js`    | IndexedDB adapter — save, load, loadAll, delete, restore on page load |
| `aiagency/contracts/contract_builder_v1.js`    | `buildDraft1()`, `buildDraft2()`, `addSkillToDraft2()`, `selectSkills()` |
| `aiagency/contracts/contract_lifecycle_v1.js`  | `submitForApproval()`, `approveContract()`, `activateContract()`, `revokeContract()`, `checkExpiry()`, `rejectContract()` |
| `aiagency/contracts/contract_report_v1.js`     | `buildContractReport()` — audit-ready reports with auditFlags[] |
| `aiagency/contracts/contract_inspector_v1.js`  | `AIAgency.contract.*` console commands: list, inspect, log, report, active, status, help |
| `tests/aiagency/phase3_contract_layer_test.js` | Test suite — 8 groups covering all Phase 3 components |

### window.AIAgency.contracts shape after load

```
window.AIAgency.contracts = {
  store:   {},    // all known contracts keyed by contractId
  active:  null,  // currently ACTIVE contract (one at a time)
  pending: [],    // DRAFT_1 | DRAFT_2 | PENDING_SIGNATURE | APPROVED
  revoked: [],    // revoked contract records
  expired: []     // expired contract records
}
```

### Contract lifecycle state machine

```
DRAFT_1 → DRAFT_2 → PENDING_SIGNATURE → APPROVED → ACTIVE
                                                       ↓
                                              REVOKED / EXPIRED
Any pre-ACTIVE state → REJECTED → DRAFT_1 (restart)
```

Every transition is logged to `negotiationLog[]`.
`ACTIVE` status registers contract into governance Layer 3.
`REVOKED` / `EXPIRED` clear Layer 3 immediately.

### Deferred items

| Item | Phase |
|------|-------|
| Real ECDSA package signing | Phase 4 |
| Activation gate checks | Phase 5 |
| Agent instantiation against contract | Phase 6 |
| Full IndexedDB requester policy persistence | Phase 7 |

### What Phase 4 builds on top of this

Phase 4 (Package Signing) will replace `signature.stub: true` with
a real ECDSA signature envelope, verified against provider public keys.
`validateContractForActivation()` already checks `signature.stub` as
an acceptable stand-in, so Phase 4 can wire in real key verification
without breaking existing callers.

---

## Pre-Phase 4 Patch — Foundation Hardening

Six hardening items applied before Phase 4 can run.

### Files

| File | Change |
|------|--------|
| `aiagency/shared/utils/id_generator_v1.js` | NEW — `window.AIAgency.generateId(prefix)` with 17 prefixes |
| `tests/aiagency/phase1_utility_test.js` | NEW — Test group 11: new prefixes + counter independence |
| `provider_system_governance_policy_v1.js` | PATCHED — `externalAuditor` hash slot; Proxy throws `POLICY_CHANGE_REQUIRES_HUMAN_APPROVAL` |
| `aiagency/contracts/contract_schema_v1.js` | PATCHED — comments for `tenantId` + `quotas` (no validation change) |
| `aiagency/contracts/contract_builder_v1.js` | PATCHED — first param is `tenantId`; `contract.tenantId` set; optional `quotas` 6th param |
| `aiagency/contracts/contract_validator_v1.js` | PATCHED — quota validation in `validateDraft1Rules()`; `tenantId` check in `validateContractForActivation()` |
| `phase2_governance_engine_test.js` | PATCHED — group 14 (externalAuditor) appended |
| `tests/aiagency/phase3_contract_layer_test.js` | PATCHED — groups 9 (quotas) + 10 (tenantId) appended |
| `main.html` | PATCHED — SHA-384 SRI hashes on all local scripts; new script tags added |
| `DECISIONS.md` | NEW — 12 architectural decisions |
| `MIGRATION.md` | NEW — migration log template + entries for all phases |

### New ID prefixes (id_generator_v1)

| Prefix | Entity |
|--------|--------|
| `mkr` | workflow marker |
| `ses` | agent session |
| `log` | negotiation log entry |
| `ten` | tenant |
| `key` | key reference |
| `que` | offline queue entry |
| `pau` | pause record |
| `ext` | external audit record |
| `ivp` | input verification pass record |

### Breaking changes

- `buildDraft1()` first param is now `tenantId`. Callers passing `null` or non-string receive `CTR_TENANT_MISSING`.
- Layer 1 Proxy `set` trap now **throws** `POLICY_CHANGE_REQUIRES_HUMAN_APPROVAL` instead of returning `false`.

### Deferred items

| Item | Phase |
|------|-------|
| Real ECDSA package signing | Phase 4 |
| `externalAuditor.registeredHash` populated | Phase 4 |
| Activation gate checks (IVP) | Phase 5 |
| Agent instantiation against contract | Phase 6 |
| Full IndexedDB + MySQL sync | Phase 7 |
| Telemetry skill (PRO tier) | Phase 9 |

---

## Phase 4 — Contract-Bound Signed Agent Deployment System

Introduces `window.AIAgency.deployment` — the complete package assembly, signing, caching, and verification system for contract-bound agents.

### New namespace: `window.AIAgency.deployment`

| Key | Description |
|-----|-------------|
| `schemas.agentPayload` | Validates agent payload objects |
| `schemas.auditorPayload` | Validates auditor payload objects |
| `schemas.skillPayload` | Validates skill payload objects |
| `schemas.skillAuditorPayload` | Validates skill auditor payload objects |
| `schemas.externalAuditorPayload` | Validates external auditor payloads (Layer 1 hash check) |
| `hashUtils` | SHA-256 `hashObject` + `verifyObjectHash` via Web Crypto |
| `manifestBuilder` | Builds manifest with hash map for all payloads |
| `keyRegistry` | In-memory public key store for signature verification |
| `signer` | ECDSA P-256 test key pair generation + manifest signing (STUB) |
| `verifier` | Signature + payload hash verification |
| `cache` | IndexedDB lazy-loading cache (manifest-only gate, skill on demand) |
| `revocation` | In-memory + IDB revocation registry |
| `adapterInterface` | Platform adapter conformance validator |
| `packageBuilder` | End-to-end: validate → hash → sign → assemble → cache → register |

### New files

| File | Purpose |
|------|---------|
| `aiagency/deployment/package_manifest/manifest_hash_map_v1.js` | SHA-256 hash utilities; bootstraps deployment namespace |
| `aiagency/deployment/payloads/agent_payload_schema_v1.js` | Agent payload validator |
| `aiagency/deployment/payloads/auditor_payload_schema_v1.js` | Auditor payload validator |
| `aiagency/deployment/payloads/skill_payload_schema_v1.js` | Skill payload validator |
| `aiagency/deployment/payloads/skill_auditor_payload_schema_v1.js` | Skill auditor payload validator |
| `aiagency/deployment/payloads/external_auditor_payload_schema_v1.js` | External auditor validator + Layer 1 hash check |
| `aiagency/deployment/package_manifest/package_manifest_builder_v1.js` | Manifest builder (SHA-256 hashMap) |
| `aiagency/deployment/trusted_keys/provider_public_key_registry_v1.js` | Public key registry |
| `aiagency/deployment/package_signing/package_signer_v1.js` | ECDSA P-256 signer (STUB) |
| `aiagency/deployment/package_signing/package_verifier_v1.js` | Signature + hash verifier |
| `aiagency/deployment/package_cache/package_cache_manager_v1.js` | IndexedDB lazy-loading cache |
| `aiagency/deployment/package_revocation/revocation_registry_v1.js` | Revocation registry (IDB + in-memory) |
| `aiagency/platform_adapters/adapter_interface_v1.js` | Platform adapter conformance check |
| `aiagency/deployment/package_builder/contract_bound_signed_agent_package_builder_v1.js` | Full package builder |
| `tests/aiagency/phase4_deployment_system_test.js` | 8-group async test suite |

### Deferred items

| Item | Phase |
|------|-------|
| Private key server-side migration | Phase B |
| HSM/KMS key storage | Phase C |
| Real revocation server sync endpoint | Phase 9b |
| externalAuditor.registeredHash populated | Phase B |


---

## Phase 5 — Activation Gate

The 10-check trust checkpoint that must pass fully before any agent package can execute. No partial activation. No silent failure. No bypass.

### Gate checks (in exact order)

| # | Check | Failure code |
|---|-------|-------------|
| 1 | Schema validation — envelope fields + payload schemas | `PKG_SCHEMA_INVALID` |
| 2 | ECDSA signature — manifest vs `keyRegistry` public key | `PKG_SIGNATURE_INVALID` |
| 3 | Hash verification — every payload vs `manifest.hashMap` | `PKG_HASH_MISMATCH` |
| 4 | Expiry — `packageExpiry > Date.now()` | `PKG_EXPIRED` |
| 5 | Revocation — local registry check | `PKG_REVOKED` |
| 6 | Contract match — contractId + status ACTIVE + validUntil | `PKG_CONTRACT_MISMATCH` |
| 7 | Policy — agent constraints vs governance `deniedActions` | `ACTIVATION_POLICY_INCOMPATIBLE` |
| 8 | Auditor hashes — 8a internal, 8b external (Phase A null → pass), 8c skill auditors | `PKG_AUDITOR_HASH_MISMATCH` |
| 9 | API key tier — Tier 2 user key → fallback Tier 1 proxy stub | `ACTIVATION_NO_API_KEY` |
| 10 | Online/offline state — NEVER fails, records state only | — |

### New namespace: `window.AIAgency.runtime`

| Key | Description |
|-----|-------------|
| `runtime.gate` | `runActivationGate(pkg)`, `lastResult`, `history[]` |
| `runtime.gate.checks` | 10 individual check modules |
| `runtime.refusalLogger` | `logRefusal(pkg, checkNum, code, msg)` → writes to refusals[] + CustomEvent |
| `runtime.refusals[]` | All logged activation refusals |
| `runtime.activations[]` | All successful activations |

### New files

| File | Purpose |
|------|---------|
| `aiagency/runtime/activation_gate/gate_check_schema_v1.js` | Check 1 — payload schema validation |
| `aiagency/runtime/activation_gate/gate_check_signature_v1.js` | Check 2 — ECDSA signature |
| `aiagency/runtime/activation_gate/gate_check_hashes_v1.js` | Check 3 — SHA-256 hash map |
| `aiagency/runtime/activation_gate/gate_check_expiry_v1.js` | Check 4 — package expiry |
| `aiagency/runtime/activation_gate/gate_check_revocation_v1.js` | Check 5 — revocation registry |
| `aiagency/runtime/activation_gate/gate_check_contract_v1.js` | Check 6 — active contract match |
| `aiagency/runtime/activation_gate/gate_check_policy_v1.js` | Check 7 — governance policy compatibility |
| `aiagency/runtime/activation_gate/gate_check_auditors_v1.js` | Check 8 — auditor hash sub-checks 8a/8b/8c |
| `aiagency/runtime/activation_gate/gate_check_apikey_v1.js` | Check 9 — API key tier resolution |
| `aiagency/runtime/activation_gate/gate_check_online_v1.js` | Check 10 — online/offline state (never fails) |
| `aiagency/runtime/activation_refusal_logger_v1.js` | Refusal logger + CustomEvent emitter |
| `aiagency/runtime/activation_gate_manager_v1.js` | Orchestrator — runs all 10 checks in order |
| `tests/aiagency/phase5_activation_gate_test.js` | 11 test groups, ~26 assertions |

