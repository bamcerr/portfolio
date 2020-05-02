export default function passParameterType(type) {
  return (target) => {
    try {
      switch (type) {
        case 'string':
          if (typeof target !== 'string') {
            throw new TypeError('Not string parameter')
          } else {
            return target
          }

        case 'boolean':
          if (typeof target !== 'boolean')
            throw new Error('Not boolean parameter')
          else return target

        case 'array':
          if (!Array.isArray(target)) throw new Error('Not array parameter')
          else return target
      }
    } catch (error) {
      // eslint-disable-next-line
      console.warn(error)
    }
  }
}
