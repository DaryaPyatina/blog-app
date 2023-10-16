export const tagFormater = (arr) => {
  if (arr.length > 2) {
    return [arr[0], arr[1], `+${arr.length - 2}`]
  }

  return arr
}
export const truncate = (str, maxlength) => {
  if (str.length > maxlength) {
    str = str.substring(0, maxlength - 3)
    return str + '...'
  } else return str
}

export const validChecker = (error) => {
  if (typeof error === 'undefined') {
    return undefined
  }
  if (!error) {
    return 'success'
  }
  return 'error'
}
