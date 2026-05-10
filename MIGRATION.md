# AIAgency Migration Log

This document records every phase and patch of the AIAgency governance system. It serves as a deployment guide, audit trail, and changelog for operators upgrading from one phase to the next.

---

## Migration Entry Template

```
### [Phase/Patch Name]

**Status:**     COMPLETE | IN PROGRESS | PLANNED
**Date:**       YYYY-MM-DD
**Branch:**     branch-name
**Commit:**     (sha)

#### New files
| File | Purpose |
|------|---------|

#### Modified files
| File | Change summary |
|------|---------------|

#### Load order changes
(Describe any changes to main.html script load order)

#### Breaking changes
(List any backward-incompatible changes and migration steps)

#### Verification
(Console commands or test groups to confirm the migration succeeded)
```

---

## Phase 1 — Core Utilities & Namespace Bootstrap

**Status:**     COMPLETE
**Date:**       2025 (pre-recorded)
**Branch:**     (initial upload)
**Commit:**     43dc827

#### New files
| File | Purpose |
|------|---------|
| `main.html` | Application entry point; bootstraps `window.AIAgency` and `window.aiagency` namespaces |
| Various `property_*.js`, `control_*.js` | Application UI and data management |

#### Modified files
None (initial upload)

#### Load order changes
Not applicable (initial upload)

#### Breaking changes
None

#### Verification
Open `main.html` in a browser. Confirm `window.AIAgency` and `window.aiagency` exist in the console.

---

## Phase 2 — Core Governance Engine

**Status:**     COMPLETE
**Date:**       2025
**Branch:**     claude/patch-governance-viewer-VZQ40
**Commit:**     (part of 502c70c)

#### New files
| File | Purpose |
|------|---------|
| `claudecode/governance_registry_v1.js` | Central governance registry; shared logger; VALID_LAYER_NAMES |
| `claudecode/provider_system_governance_policy_v1.js` | Layer 1 — frozen, HUMAN_ONLY |
| `claudecode/provider_environment_governance_policy_v1.js` | Layer 2 — browser API detection |

#### Modified files
None (all new)

#### Load order changes
Added Phase 2 governance scripts before application scripts in `main.html`.

#### Breaking changes
None

#### Verification
```js
window.AIAgency.governance.policies.providerSystem.authority // → 1
window.AIAgency.governance.policies.providerEnvironment.authority // → 2
```

---

## Phase 2 Patch B — Governance Viewer & Uniform Layer Shape

**Status:**     COMPLETE
**Date:**       2025
**Branch:**     claude/patch-governance-viewer-VZQ40
**Commit:**     502c70c

#### New files
| File | Purpose |
|------|---------|
| `claudecode/aiagency/governance/provider/policies/service_contract_policy_stub_v1.js` | Layer 3 stub |
| `claudecode/aiagency/governance/provider/policies/requester_policy_stub_v1.js` | Layer 4 stub |
| `claudecode/aiagency/governance/provider/policies/agent_definition_policy_stub_v1.js` | Layer 5 with frameworkRules |
| `claudecode/aiagency/governance/provider/policies/role_profile_policy_stub_v1.js` | Layer 6 stub |
| `claudecode/aiagency/governance/inspector/governance_inspector_v1.js` | `AIAgency.gov` console viewer |

#### Modified files
| File | Change summary |
|------|---------------|
| `claudecode/provider_system_governance_policy_v1.js` | Reshaped to uniform 11-field layer shape |
| `claudecode/provider_environment_governance_policy_v1.js` | Reshaped to uniform 11-field layer shape |
| `claudecode/governance_registry_v1.js` | Layer 5 + 6 added to VALID_LAYER_NAMES |
| `claudecode/phase2_governance_engine_test.js` | Test groups 12 (uniform shape) + 13 (inspector) added |

#### Load order changes
Layers 3–6 and inspector added to `main.html` after registry and Layer 1–2.

#### Breaking changes
None

#### Verification
```js
AIAgency.gov.inspect()         // all 6 layers present
AIAgency.gov.diff()            // 5-layer diff from Layer 1
AIAgency.gov.help()            // 8 commands
```
Test groups 12 and 13 must show all [PASS] in the browser console.

---

## Phase 3 — Contract Layer

**Status:**     COMPLETE
**Date:**       2025
**Branch:**     claude/patch-governance-viewer-VZQ40
**Commit:**     b2f784a

#### New files
| File | Purpose |
|------|---------|
| `claudecode/aiagency/contracts/contract_schema_v1.js` | Contract shape schema, `validateContractShape()`, `generateId()` |
| `claudecode/aiagency/contracts/contract_states_v1.js` | 8-state machine, `CONTRACT_STATUS`, `VALID_TRANSITIONS`, `isValidTransition()` |
| `claudecode/aiagency/contracts/contract_validator_v1.js` | Draft and activation validators |
| `claudecode/aiagency/contracts/contract_storage_v1.js` | IndexedDB adapter — save, load, loadAll, delete, restoreOnLoad |
| `claudecode/aiagency/contracts/contract_builder_v1.js` | `buildDraft1()`, `buildDraft2()`, `addSkillToDraft2()`, `selectSkills()` |
| `claudecode/aiagency/contracts/contract_lifecycle_v1.js` | `submitForApproval()`, `approveContract()`, `activateContract()`, `revokeContract()`, `checkExpiry()`, `rejectContract()` |
| `claudecode/aiagency/contracts/contract_report_v1.js` | `buildContractReport()` with `auditFlags[]` |
| `claudecode/aiagency/contracts/contract_inspector_v1.js` | `AIAgency.contract.*` console commands |
| `claudecode/tests/aiagency/phase3_contract_layer_test.js` | Test suite groups 1–8 |

#### Modified files
None

#### Load order changes
Phase 3 contract scripts added to `main.html` after Phase 2 governance engine scripts.

#### Breaking changes
None

#### Verification
```js
AIAgency.contract.help()       // 7 commands
AIAgency.contract.list()       // [] initially
```
Test groups 1–8 must show all [PASS] (group 8 async, appears after sync summary).

---

## Pre-Phase 4 Patch — Foundation Hardening

**Status:**     COMPLETE
**Date:**       2026-03-21
**Branch:**     claude/patch-governance-viewer-VZQ40
**Commit:**     (pending)

#### New files
| File | Purpose |
|------|---------|
| `claudecode/aiagency/shared/utils/id_generator_v1.js` | Shared `window.AIAgency.generateId(prefix)` with 17 registered prefixes |
| `claudecode/tests/aiagency/phase1_utility_test.js` | Test group 11: all 9 new prefixes + counter independence |
| `version_1a/DECISIONS.md` | 12 architectural decisions |
| `version_1a/MIGRATION.md` | This file |

#### Modified files
| File | Change summary |
|------|---------------|
| `claudecode/provider_system_governance_policy_v1.js` | Added `externalAuditor` hash slot; Proxy upgraded to throw `POLICY_CHANGE_REQUIRES_HUMAN_APPROVAL` |
| `claudecode/aiagency/contracts/contract_schema_v1.js` | Comments added for `tenantId` and `quotas` fields (no validation change) |
| `claudecode/aiagency/contracts/contract_builder_v1.js` | First param renamed `tenantId`; `contract.tenantId` set; `contract.requesterId` kept as alias; optional `quotas` 6th param added |
| `claudecode/aiagency/contracts/contract_validator_v1.js` | Quota validation in `validateDraft1Rules()`; `tenantId` check in `validateContractForActivation()` |
| `claudecode/phase2_governance_engine_test.js` | Test group 14 (externalAuditor) appended |
| `claudecode/tests/aiagency/phase3_contract_layer_test.js` | Test groups 9 (quotas) + 10 (tenantId) appended |
| `version_1a/main.html` | SHA-384 SRI hashes added to all local `<script>` tags; `id_generator_v1.js` added before `governance_registry_v1.js`; `phase1_utility_test.js` added after `phase3_contract_layer_test.js` |
| `version_1a/README.md` | Pre-Phase 4 Patch section appended |

#### Load order changes
`id_generator_v1.js` inserted BEFORE `governance_registry_v1.js` (it must be available to all subsequent scripts).
`phase1_utility_test.js` inserted AFTER `phase3_contract_layer_test.js`.

#### Breaking changes
- `buildDraft1()` first parameter is now named `tenantId`. Callers passing a string continue to work. Callers passing `null` or a non-string now receive `CTR_TENANT_MISSING`.
- Layer 1 Proxy `set` trap now **throws** instead of returning `false`. Code that previously caught `false` return values must now catch the thrown `Error` with `e.code === 'POLICY_CHANGE_REQUIRES_HUMAN_APPROVAL'`.

#### Verification
```js
// Shared ID generator
AIAgency.generateId('mkr')     // → 'mkr_0001'
AIAgency.generateId('ten')     // → 'ten_0001'

// External auditor slot
AIAgency.governance.policies.providerSystem.externalAuditor.registeredHash  // → null

// Mutation throws
try { AIAgency.governance.policies.providerSystem.externalAuditor.registeredHash = 'x'; }
catch(e) { console.log(e.code); }  // → 'POLICY_CHANGE_REQUIRES_HUMAN_APPROVAL'

// Quotas
var r = AIAgency.contracts.builder.buildDraft1(
  'focusonxyz',
  { deniedActions: ['export_without_contract'], safetyRules: ['always_log_denials'],
    exportPolicy: 'CONTRACT_REQUIRED', auditPolicy: 'ALWAYS' },
  { dataScope: ['tasks'], exportPolicy: 'REQUESTER_APPROVAL_REQUIRED',
    auditRequirements: [], customRules: [] },
  Date.now(), Date.now() + 86400000,
  { dailyAICalls: 100, tier: 'PRO' }
);
r.contract.draft1.quotas   // → { dailyAICalls: 100, tier: 'PRO', ... }
r.contract.tenantId        // → 'focusonxyz'
```
Test groups 9, 10, 11, 14 must show all [PASS] in the browser console.

---

### Phase 4 — Contract-Bound Signed Agent Deployment System

**Status:**     COMPLETE
**Date:**       2026-03-22
**Branch:**     claude/patch-governance-viewer-VZQ40
**Commit:**     (pending)

#### New files
| File | Purpose |
|------|---------|
| `aiagency/deployment/package_manifest/manifest_hash_map_v1.js` | SHA-256 hashObject + verifyObjectHash; bootstraps `window.AIAgency.deployment` |
| `aiagency/deployment/payloads/agent_payload_schema_v1.js` | `validateAgentPayload` → `{ ok, errors[] }` |
| `aiagency/deployment/payloads/auditor_payload_schema_v1.js` | `validateAuditorPayload` → `{ ok, errors[] }` |
| `aiagency/deployment/payloads/skill_payload_schema_v1.js` | `validateSkillPayload` → `{ ok, errors[] }` |
| `aiagency/deployment/payloads/skill_auditor_payload_schema_v1.js` | `validateSkillAuditorPayload` → `{ ok, errors[] }` |
| `aiagency/deployment/payloads/external_auditor_payload_schema_v1.js` | Layer 1 registeredHash check; Phase A (null) → warns, does not fail |
| `aiagency/deployment/package_manifest/package_manifest_builder_v1.js` | `buildManifest(...)` → `Promise<{ ok, manifest }>` |
| `aiagency/deployment/trusted_keys/provider_public_key_registry_v1.js` | `registerPublicKey` / `getPublicKey`; public keys only |
| `aiagency/deployment/package_signing/package_signer_v1.js` | ECDSA P-256 STUB; `generateTestKeyPair` + `signManifest` → base64 |
| `aiagency/deployment/package_signing/package_verifier_v1.js` | `verifySignature` + `verifyAllHashes` |
| `aiagency/deployment/package_cache/package_cache_manager_v1.js` | IDB `aiagency_packages`; lazy-load (manifest-only at gate) |
| `aiagency/deployment/package_revocation/revocation_registry_v1.js` | IDB `aiagency_revocation`; in-memory fast check |
| `aiagency/platform_adapters/adapter_interface_v1.js` | `validateAdapterConformance` checks buildRequest/parseResponse/handleError |
| `aiagency/deployment/package_builder/contract_bound_signed_agent_package_builder_v1.js` | Full pipeline: validate → hash → sign → assemble → cache → register |
| `tests/aiagency/phase4_deployment_system_test.js` | 8 async groups; 29 assertions; Promise chain |

#### Modified files
| File | Change summary |
|------|---------------|
| `main.html` | 15 new `<script>` tags with SHA-384 SRI hashes added after Phase 4 packages block |
| `README.md` | Phase 4 section appended |

#### Load order changes
New Phase 4 Deployment block added after existing Phase 4 Package System block:
1. `manifest_hash_map_v1.js`
2. payload schemas (5 files)
3. `package_manifest_builder_v1.js`
4. `provider_public_key_registry_v1.js`
5. `package_signer_v1.js`
6. `package_verifier_v1.js`
7. `package_cache_manager_v1.js`
8. `revocation_registry_v1.js`
9. `adapter_interface_v1.js`
10. `contract_bound_signed_agent_package_builder_v1.js`
11. `phase4_deployment_system_test.js`

#### Breaking changes
None. The `window.AIAgency.deployment` namespace is new. Existing `window.AIAgency.packages` operational state is preserved and extended by this phase.

#### Verification
```js
// Deployment namespace populated
AIAgency.deployment
// → { schemas, hashUtils, manifestBuilder, keyRegistry, signer, verifier,
//     cache, revocation, adapterInterface, packageBuilder }

// Build a test package
AIAgency.deployment.packageBuilder.buildPackage({
  contractId: 'ctr_0001',
  agentPayload: {
    systemPrompt: 'You are a test agent.',
    instructions: 'Run test only.',
    constraints: ['no external calls'],
    fewShots: [], contextSchema: {}, platformHint: 'any'
  },
  auditorPayload: {
    auditorId: 'aud_0001', auditorVersion: '1.0.0',
    instructions: 'Audit test agent.',
    thresholds: {}, anomalyRules: [], reportSchema: {},
    externalAuditorHash: null
  },
  skillPayloads: [], skillAuditorPayloads: [],
  externalAuditorHash: null,
  expiry: Date.now() + (30 * 24 * 60 * 60 * 1000)
}).then(r => console.log(r))
// → { ok: true, package: { packageId: 'pkg_...', ... } }

// Revocation check
AIAgency.deployment.revocation.isRevoked('pkg_0001')
// → { ok: true, revoked: false, reason: null }
```
Test suite `phase4_deployment_system_test.js` must show all 29 [PASS] in browser console.


---

### Phase 5 — Activation Gate

**Status:**     COMPLETE
**Date:**       2026-03-22
**Branch:**     claude/patch-governance-viewer-VZQ40
**Commit:**     (pending)

#### New files
| File | Purpose |
|------|---------|
| `aiagency/runtime/activation_gate/gate_check_schema_v1.js` | Check 1: validates envelope + payload schemas |
| `aiagency/runtime/activation_gate/gate_check_signature_v1.js` | Check 2: ECDSA P-256 signature vs keyRegistry |
| `aiagency/runtime/activation_gate/gate_check_hashes_v1.js` | Check 3: verifyAllHashes against manifest.hashMap |
| `aiagency/runtime/activation_gate/gate_check_expiry_v1.js` | Check 4: packageExpiry > Date.now() |
| `aiagency/runtime/activation_gate/gate_check_revocation_v1.js` | Check 5: isRevoked() from revocation registry |
| `aiagency/runtime/activation_gate/gate_check_contract_v1.js` | Check 6: contractId + ACTIVE status + validUntil |
| `aiagency/runtime/activation_gate/gate_check_policy_v1.js` | Check 7: constraints vs governance deniedActions |
| `aiagency/runtime/activation_gate/gate_check_auditors_v1.js` | Check 8: 8a auditor hash / 8b external (Phase A: null→pass) / 8c skills |
| `aiagency/runtime/activation_gate/gate_check_apikey_v1.js` | Check 9: Tier 2 stub null → Tier 1 proxy stub available |
| `aiagency/runtime/activation_gate/gate_check_online_v1.js` | Check 10: navigator.onLine — never fails |
| `aiagency/runtime/activation_refusal_logger_v1.js` | Writes to runtime.refusals[], dispatches CustomEvent |
| `aiagency/runtime/activation_gate_manager_v1.js` | Sequential orchestrator; sets pkg.status='ACTIVATED' on pass |
| `tests/aiagency/phase5_activation_gate_test.js` | 11 groups, full success path + 9 failure paths |

#### Modified files
| File | Change summary |
|------|---------------|
| `main.html` | 13 new `<script>` tags (Phase 5 block) with SHA-384 SRI hashes |
| `README.md` | Phase 5 section appended |

#### Load order changes
Phase 5 block added after Phase 4 deployment block:
checks 1–10 → activation_refusal_logger → activation_gate_manager → test

#### Breaking changes
None. New `window.AIAgency.runtime` namespace is additive.

#### Phase A deferred items
| Item | Phase |
|------|-------|
| Tier 2 user API key from IndexedDB | Phase 7 |
| Real revocation server sync | Phase 9b |
| Real governance decision resolution | Phase 6 |
| Tier 1 proxy real endpoint `/api/v1/proxy/ai-call` | Phase 7 |

#### Verification
```js
// Gate namespace exists
AIAgency.runtime.gate
// → { runActivationGate: f, lastResult: null, history: [] }

// Run gate on a built package
AIAgency.deployment.packageBuilder.buildPackage({
  contractId: AIAgency.contracts.active
    ? AIAgency.contracts.active.contractId : 'ctr_0001',
  agentPayload: { systemPrompt:'Test', instructions:'Test',
                  constraints:[], fewShots:[], contextSchema:{}, platformHint:'any' },
  auditorPayload: { auditorId:'aud_0001', auditorVersion:'1.0.0',
                    instructions:'Audit', thresholds:{}, anomalyRules:[],
                    reportSchema:{}, externalAuditorHash:null },
  skillPayloads:[], skillAuditorPayloads:[],
  externalAuditorHash:null, expiry: Date.now()+(30*86400000)
}).then(r => AIAgency.runtime.gate.runActivationGate(r.package))
  .then(result => console.log('Gate result:', result));
// Phase A: Check 2 will fail (PKG_SIGNATURE_INVALID) unless you:
//   1. deployment.signer.generateTestKeyPair()
//   2. deployment.keyRegistry.registerPublicKey('provider_default', publicKey)
//   3. Re-sign manifest with privateKey
//   4. Set AIAgency.contracts.active = { contractId:'ctr_0001', status:'ACTIVE', ... }
```
Phase 5 test must show all [PASS] in browser console.

