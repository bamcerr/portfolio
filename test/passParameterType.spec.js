import passParameterType from '@/utils/passParameterType'

describe('passParameterType', () => {
  test('string', () => {
    const parameterString = passParameterType('string')('hello')
    expect(parameterString).toEqual('hello')
  })

  test('string throw error', () => {
    try {
      passParameterType('string')([])
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        'message',
        `argument '': Not string parameter`
      )
    }
  })

  test('array', () => {
    const parameterString = passParameterType('array')(['a', 'b'])
    expect(parameterString).toEqual(['a', 'b'])
  })

  test('array throw error', () => {
    try {
      passParameterType('array')(true)
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        'message',
        `argument 'true': Not array parameter`
      )
    }
  })

  test('boolean', () => {
    const parameterString = passParameterType('boolean')(true)
    expect(parameterString).toEqual(true)
  })

  test('boolean throw error', () => {
    try {
      passParameterType('boolean')('hello')
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        'message',
        `argument 'hello': Not boolean parameter`
      )
    }
  })
})
