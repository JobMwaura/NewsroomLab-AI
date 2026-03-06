// ─── NewsroomLab AI — Verification Gate Logic ──────────
// Server-side function: canFinalSubmit(submission, rules)
// Returns { allowed: bool, failures: [] }

/**
 * Default verification rules (can be overridden per assignment).
 * These are the minimum requirements for a submission to pass
 * through the verification gate and be eligible for final submit.
 */
export const DEFAULT_VERIFICATION_RULES = {
  // Plan must exist and have at least these fields
  planRequired: true,
  planMinFields: ["angle", "sources"], // at minimum angle + sources planned

  // Verification table
  verificationMinRows: 2, // minimum number of verified claims
  verificationMinSourcesPerClaim: 1, // each claim needs at least 1 source
  highRiskMinSources: 2, // high-risk claims need 2+ sources

  // Sources
  requireSourceLinks: true, // at least one source must have a URL/document ref
  requireNamedSources: true, // at least one source must be named (not anonymous)

  // Ethics
  requireEthicsMitigation: false, // if ethics flag raised, mitigation must be provided
  requireRightOfReply: false, // if story criticises someone, right of reply must be documented

  // AI disclosure
  requireAIDisclosure: true, // student must declare how AI was used

  // Reflection
  requireReflection: true, // reflection must be filled in
  reflectionMinLength: 100, // minimum characters for reflection text

  // Word count
  enforceWordCount: true, // submission must be within word count range

  // Sections
  requireAllSections: true, // all required sections for the template must be present
}


/**
 * Per-course gate presets. Each preset overrides specific defaults.
 * Referenced by gatePreset in course-templates.js.
 */
export const GATE_PRESETS = {
  // HCC109 — Standard gates (default)
  standard: {
    ...DEFAULT_VERIFICATION_RULES,
  },

  // HCC205 — Stronger gates: higher verification thresholds
  stronger: {
    ...DEFAULT_VERIFICATION_RULES,
    verificationMinRows: 4,
    verificationMinSourcesPerClaim: 1,
    highRiskMinSources: 2,
    requireSourceLinks: true,
    requireNamedSources: true,
    requireEthicsMitigation: true,
    requireRightOfReply: true,
    reflectionMinLength: 200,
  },

  // HCC312 — Proof pack: all media kit components must be compiled
  proof_pack: {
    ...DEFAULT_VERIFICATION_RULES,
    requireAllSections: true,
    requireProofPack: true, // custom flag: all PR documents must exist
    requireAudiencePanel: true, // custom flag: audience targeting panel must be completed
    verificationMinRows: 2,
    requireSourceLinks: true,
    reflectionMinLength: 150,
  },

  // HCC314 — Two-source rule for high-risk claims
  two_source_high_risk: {
    ...DEFAULT_VERIFICATION_RULES,
    verificationMinRows: 4,
    highRiskMinSources: 2,
    requireSourceLinks: true,
    requireNamedSources: true,
    requireEthicsMitigation: true,
    requireRightOfReply: true,
    reflectionMinLength: 200,
    // Stricter: block if more than 30% of claims are low-confidence
    blockIfLowConfidenceRatio: 0.3,
  },

  // HCC316 — Photo and source permissions required
  photo_source_permissions: {
    ...DEFAULT_VERIFICATION_RULES,
    requirePhotoPermissions: true, // custom flag: photo usage permissions documented
    requireSourcePermissions: true, // custom flag: source consent for feature use
    requireEthicsMitigation: true,
    reflectionMinLength: 200,
  },

  // HCC420 — Opinion/fact labelling required
  opinion_fact_labelling: {
    ...DEFAULT_VERIFICATION_RULES,
    requireOpinionFactLabels: true, // custom flag: all claims labelled as FACT/OPINION/ANALYSIS
    verificationMinRows: 3,
    requireSourceLinks: true,
    reflectionMinLength: 200,
  },
}

/**
 * Get the verification rules for a specific gate preset.
 */
export function getGatePresetRules(presetName) {
  return GATE_PRESETS[presetName] || GATE_PRESETS.standard
}

/**
 * Check whether a submission passes all verification gates.
 *
 * @param {Object} submission - The student's submission object
 * @param {Object} submission.plan - The story plan (angle, sources, etc.)
 * @param {Object[]} submission.verificationTable - Array of verification entries
 * @param {Object[]} submission.sources - Array of source objects
 * @param {string} submission.draftText - The full draft text
 * @param {Object} submission.reflection - Reflection answers
 * @param {Object} submission.aiDisclosure - AI usage disclosure
 * @param {Object} submission.ethicsReview - Ethics considerations
 * @param {Object} submission.sections - Completed sections { [sectionId]: text }
 * @param {Object} rules - Override rules (merged with defaults)
 * @param {Object} templateConfig - Story template config (wordCountRange, requiredSections, etc.)
 * @returns {{ allowed: boolean, failures: GateFailure[], warnings: GateWarning[] }}
 */
export function canFinalSubmit(submission, rules = {}, templateConfig = {}) {
  const config = { ...DEFAULT_VERIFICATION_RULES, ...rules }
  const failures = []
  const warnings = []

  // ─── 1. PLAN CHECK ──────────────────────────────────
  if (config.planRequired) {
    if (!submission.plan || typeof submission.plan !== "object") {
      failures.push({
        gate: "plan",
        code: "PLAN_MISSING",
        message: "Story plan is required before submission.",
        severity: "error",
      })
    } else {
      for (const field of config.planMinFields) {
        const value = submission.plan[field]
        if (!value || (typeof value === "string" && value.trim() === "") || (Array.isArray(value) && value.length === 0)) {
          failures.push({
            gate: "plan",
            code: "PLAN_FIELD_MISSING",
            message: `Story plan must include: ${field}`,
            severity: "error",
            field,
          })
        }
      }
    }
  }

  // ─── 2. VERIFICATION TABLE ──────────────────────────
  const verTable = submission.verificationTable || []

  if (verTable.length < config.verificationMinRows) {
    failures.push({
      gate: "verification",
      code: "VERIFICATION_TOO_FEW",
      message: `At least ${config.verificationMinRows} claims must be verified. You have ${verTable.length}.`,
      severity: "error",
      required: config.verificationMinRows,
      actual: verTable.length,
    })
  }

  // Check each claim has enough sources
  for (const entry of verTable) {
    const sourceCount = (entry.sources || []).length
    const isHighRisk = entry.riskLevel === "high" || entry.riskLevel === "HIGH"

    if (sourceCount < config.verificationMinSourcesPerClaim) {
      failures.push({
        gate: "verification",
        code: "CLAIM_INSUFFICIENT_SOURCES",
        message: `Claim "${truncate(entry.claim, 60)}" needs at least ${config.verificationMinSourcesPerClaim} source(s). Found ${sourceCount}.`,
        severity: "error",
        claimId: entry.id,
      })
    }

    if (isHighRisk && sourceCount < config.highRiskMinSources) {
      failures.push({
        gate: "verification",
        code: "HIGH_RISK_INSUFFICIENT_SOURCES",
        message: `High-risk claim "${truncate(entry.claim, 60)}" requires at least ${config.highRiskMinSources} sources. Found ${sourceCount}.`,
        severity: "error",
        claimId: entry.id,
      })
    }

    // Warn on unverified claims
    if (entry.status === "unverified" || entry.status === "disputed") {
      warnings.push({
        gate: "verification",
        code: "CLAIM_NOT_VERIFIED",
        message: `Claim "${truncate(entry.claim, 60)}" is marked as ${entry.status}.`,
        severity: "warning",
        claimId: entry.id,
      })
    }
  }

  // ─── 3. SOURCE QUALITY ─────────────────────────────
  const sources = submission.sources || []

  if (config.requireSourceLinks) {
    const hasLink = sources.some((s) => s.url || s.documentRef || s.link)
    if (!hasLink && sources.length > 0) {
      warnings.push({
        gate: "sources",
        code: "NO_SOURCE_LINKS",
        message: "At least one source should have a verifiable link or document reference.",
        severity: "warning",
      })
    }
  }

  if (config.requireNamedSources) {
    const hasNamed = sources.some((s) => s.name && s.name.trim() !== "" && !s.anonymous)
    if (!hasNamed && sources.length > 0) {
      warnings.push({
        gate: "sources",
        code: "NO_NAMED_SOURCES",
        message: "At least one source should be named (not anonymous).",
        severity: "warning",
      })
    }
  }

  // ─── 4. ETHICS ──────────────────────────────────────
  if (config.requireEthicsMitigation) {
    const ethics = submission.ethicsReview || {}
    if (ethics.flagsRaised && (!ethics.mitigation || ethics.mitigation.trim() === "")) {
      failures.push({
        gate: "ethics",
        code: "ETHICS_NO_MITIGATION",
        message: "Ethics concerns were flagged but no mitigation strategy was provided.",
        severity: "error",
      })
    }
  }

  if (config.requireRightOfReply) {
    const ethics = submission.ethicsReview || {}
    if (ethics.criticisesIndividual && !ethics.rightOfReplySought) {
      failures.push({
        gate: "ethics",
        code: "RIGHT_OF_REPLY_MISSING",
        message: "Your story criticises an individual. You must document that right of reply was sought.",
        severity: "error",
      })
    }
  }

  // ─── 5. AI DISCLOSURE ──────────────────────────────
  if (config.requireAIDisclosure) {
    const disclosure = submission.aiDisclosure
    if (!disclosure || (typeof disclosure === "string" && disclosure.trim() === "") || (typeof disclosure === "object" && !disclosure.declared)) {
      failures.push({
        gate: "ai_disclosure",
        code: "AI_DISCLOSURE_MISSING",
        message: "You must declare how AI tools were used in this assignment (even if not used at all).",
        severity: "error",
      })
    }
  }

  // ─── 6. REFLECTION ─────────────────────────────────
  if (config.requireReflection) {
    const reflection = submission.reflection
    if (!reflection) {
      failures.push({
        gate: "reflection",
        code: "REFLECTION_MISSING",
        message: "Reflection is required before final submission.",
        severity: "error",
      })
    } else {
      // Check if reflection has enough content
      const reflectionText = typeof reflection === "string" ? reflection : Object.values(reflection).filter((v) => typeof v === "string").join(" ")

      if (reflectionText.trim().length < config.reflectionMinLength) {
        failures.push({
          gate: "reflection",
          code: "REFLECTION_TOO_SHORT",
          message: `Reflection must be at least ${config.reflectionMinLength} characters. Current: ${reflectionText.trim().length}.`,
          severity: "error",
          required: config.reflectionMinLength,
          actual: reflectionText.trim().length,
        })
      }
    }
  }

  // ─── 7. WORD COUNT ─────────────────────────────────
  if (config.enforceWordCount && templateConfig.wordCountRange) {
    const text = submission.draftText || ""
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length
    const [min, max] = templateConfig.wordCountRange

    if (wordCount < min) {
      failures.push({
        gate: "word_count",
        code: "UNDER_WORD_COUNT",
        message: `Story is under the minimum word count. Required: ${min}. Current: ${wordCount}.`,
        severity: "error",
        required: min,
        actual: wordCount,
      })
    }

    if (wordCount > max) {
      warnings.push({
        gate: "word_count",
        code: "OVER_WORD_COUNT",
        message: `Story exceeds the maximum word count. Maximum: ${max}. Current: ${wordCount}.`,
        severity: "warning",
        required: max,
        actual: wordCount,
      })
    }
  }

  // ─── 8. REQUIRED SECTIONS ──────────────────────────
  if (config.requireAllSections && templateConfig.requiredSections) {
    const completedSections = submission.sections || {}
    for (const sectionId of templateConfig.requiredSections) {
      const sectionContent = completedSections[sectionId]
      if (!sectionContent || (typeof sectionContent === "string" && sectionContent.trim() === "")) {
        failures.push({
          gate: "sections",
          code: "SECTION_MISSING",
          message: `Required section "${formatSectionName(sectionId)}" is empty or missing.`,
          severity: "error",
          sectionId,
        })
      }
    }
  }

  // ─── 9. PROOF PACK (HCC312) ────────────────────────
  if (config.requireProofPack) {
    const proofPack = submission.proofPack || {}
    const requiredDocs = ["pitch_letter", "press_release", "backgrounder", "fact_sheet", "newsletter"]
    for (const doc of requiredDocs) {
      if (!proofPack[doc]) {
        warnings.push({
          gate: "proof_pack",
          code: "PROOF_PACK_INCOMPLETE",
          message: `Media kit proof pack is missing: ${formatSectionName(doc)}. All PR documents should be compiled.`,
          severity: "warning",
          document: doc,
        })
      }
    }
  }

  // ─── 10. AUDIENCE PANEL (HCC312) ───────────────────
  if (config.requireAudiencePanel) {
    const panel = submission.audiencePanel || {}
    if (!panel.targetAudience || !panel.keyMessage || !panel.channel) {
      warnings.push({
        gate: "audience_panel",
        code: "AUDIENCE_PANEL_INCOMPLETE",
        message: "Audience targeting panel should include: target audience, key message, and distribution channel.",
        severity: "warning",
      })
    }
  }

  // ─── 11. PHOTO/SOURCE PERMISSIONS (HCC316) ────────
  if (config.requirePhotoPermissions) {
    const permissions = submission.photoPermissions || []
    if (permissions.length === 0) {
      warnings.push({
        gate: "permissions",
        code: "PHOTO_PERMISSIONS_MISSING",
        message: "Photo usage permissions must be documented for all images used in the feature/layout.",
        severity: "warning",
      })
    }
  }

  if (config.requireSourcePermissions) {
    const permissions = submission.sourcePermissions || []
    if (permissions.length === 0) {
      warnings.push({
        gate: "permissions",
        code: "SOURCE_PERMISSIONS_MISSING",
        message: "Source consent for feature use must be documented (especially for vulnerable subjects).",
        severity: "warning",
      })
    }
  }

  // ─── 12. OPINION/FACT LABELS (HCC420) ─────────────
  if (config.requireOpinionFactLabels) {
    const labels = submission.opinionFactLabels || {}
    if (!labels.declared || (labels.items && labels.items.length === 0)) {
      warnings.push({
        gate: "opinion_fact",
        code: "OPINION_FACT_LABELS_MISSING",
        message: "All claims in your editorial must be labelled as [FACT], [OPINION], or [ANALYSIS].",
        severity: "warning",
      })
    }
  }

  return {
    allowed: failures.length === 0,
    failures,
    warnings,
    summary: buildSummary(failures, warnings),
  }
}

// ─── Helpers ──────────────────────────────────────────

function truncate(str, len) {
  if (!str) return "(empty)"
  return str.length > len ? str.slice(0, len) + "…" : str
}

function formatSectionName(id) {
  return id
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function buildSummary(failures, warnings) {
  if (failures.length === 0 && warnings.length === 0) {
    return "✅ All verification gates passed. Ready for final submission."
  }

  const parts = []
  if (failures.length > 0) {
    parts.push(`❌ ${failures.length} gate failure${failures.length > 1 ? "s" : ""} must be resolved before submission.`)
  }
  if (warnings.length > 0) {
    parts.push(`⚠️ ${warnings.length} warning${warnings.length > 1 ? "s" : ""} — review recommended but not blocking.`)
  }
  return parts.join(" ")
}

/**
 * Get gate status as a simple progress indicator for UI.
 * Returns an object with gate names as keys and status as values.
 */
export function getGateProgress(submission, rules = {}, templateConfig = {}) {
  const result = canFinalSubmit(submission, rules, templateConfig)
  const gates = {
    plan: "pass",
    verification: "pass",
    sources: "pass",
    ethics: "pass",
    ai_disclosure: "pass",
    reflection: "pass",
    word_count: "pass",
    sections: "pass",
    proof_pack: "pass",
    audience_panel: "pass",
    permissions: "pass",
    opinion_fact: "pass",
  }

  for (const failure of result.failures) {
    gates[failure.gate] = "fail"
  }
  for (const warning of result.warnings) {
    if (gates[warning.gate] !== "fail") {
      gates[warning.gate] = "warn"
    }
  }

  return {
    gates,
    overallAllowed: result.allowed,
    failCount: result.failures.length,
    warnCount: result.warnings.length,
  }
}
