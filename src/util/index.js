export function cutArr(arr, len, newArr) {
  if (arr.length <= len) {
    newArr.push(arr)
  } else {
    newArr.push(arr.splice(0, len))
    cutArr(arr, len, newArr)
  }
}

export function checkPhone(phone) {
  return /^1\d{10}$/.test(phone)
}
