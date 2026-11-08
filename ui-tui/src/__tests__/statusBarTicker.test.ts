import { describe, expect, it } from 'vitest'

import { contextBarColor, padVerb, VERB_PAD_LEN } from '../components/appChrome.js'
import { VERBS } from '../content/verbs.js'
import type { Theme } from '../theme.js'

const theme = {
  color: {
    muted: 'muted',
    statusBad: 'bad',
    statusCritical: 'critical',
    statusGood: 'good',
    statusWarn: 'warn'
  }
} as Theme

describe('FaceTicker verb padding', () => {
  it('pads every verb to the same width', () => {
    for (const verb of VERBS) {
      expect(padVerb(verb)).toHaveLength(VERB_PAD_LEN)
    }
  })

  it('keeps trailing ellipsis attached', () => {
    for (const verb of VERBS) {
      expect(padVerb(verb).startsWith(`${verb}…`)).toBe(true)
    }
  })
})

describe('contextBarColor', () => {
  it('uses whole-context thresholds when no compression threshold is known', () => {
    expect(contextBarColor(undefined, theme)).toBe('muted')
    expect(contextBarColor(10, theme)).toBe('good')
    expect(contextBarColor(50, theme)).toBe('warn')
    expect(contextBarColor(81, theme)).toBe('bad')
    expect(contextBarColor(95, theme)).toBe('critical')
  })

  it('escalates relative to the compression threshold danger zone', () => {
    expect(contextBarColor(37, theme, 50)).toBe('good')
    expect(contextBarColor(38, theme, 50)).toBe('warn')
    expect(contextBarColor(45, theme, 50)).toBe('bad')
    expect(contextBarColor(50, theme, 50)).toBe('critical')
  })
})
