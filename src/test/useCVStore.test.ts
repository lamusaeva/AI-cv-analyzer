import { describe, it, expect, beforeEach } from 'vitest'
import { useCVStore } from '../store/useCVStore'

describe('useCVStore', () => {
  beforeEach(() => {
    useCVStore.setState({
      fileName: '',
      cvText: '',
      file: null,
      user: null,
      analysisResult: null,
    })
  })

  it('setFileName işləməlidir', () => {
    useCVStore.getState().setFileName('test.pdf')
    expect(useCVStore.getState().fileName).toBe('test.pdf')
  })

  it('setCvText işləməlidir', () => {
    useCVStore.getState().setCvText('CV mətni')
    expect(useCVStore.getState().cvText).toBe('CV mətni')
  })

  it('setFile işləməlidir', () => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' })
    useCVStore.getState().setFile(file)
    expect(useCVStore.getState().file).toBe(file)
  })
})