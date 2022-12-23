export function partition(array: any[], isValid: (elem: any) => boolean) {
  return array.reduce(([pass, fail], elem) => {
    return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]]
  }, [[], []])
}