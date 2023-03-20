export function partition(array: any[], isValid: (elem: any) => boolean) {
  return array.reduce(([pass, fail], elem) => {
    return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]]
  }, [[], []])
}


export function makeid(length: number) {
  let result           = ''
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength))
  }
  return result
}

export function removeProperty(obj: any, propertyName: string) {
  const { [propertyName]: _, ...result } = obj
  return result
}
