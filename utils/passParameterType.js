/* eslint-disable valid-typeof */
export default function passParameterType(type) {
  const _string_ = 'string'
  const _boolean_ = 'boolean'
  const _array_ = 'array'

  const TYPE = {
    [_string_]: {
      condition: (target) => {
        return typeof target === _string_
      },
      error: {
        message: `Not ${_string_} parameter`
      }
    },
    [_boolean_]: {
      condition: (target) => {
        return typeof target === _boolean_
      },
      error: {
        message: `Not ${_boolean_} parameter`
      }
    },
    [_array_]: {
      condition: (target) => {
        return Array.isArray(target)
      },
      error: {
        message: `Not ${_array_} parameter`
      }
    }
  }

  return (target) => {
    if (TYPE[type].condition(target)) {
      return target
    } else {
      throw new TypeError(`argument '${target}': ${TYPE[type].error.message}`)
    }
  }
}
