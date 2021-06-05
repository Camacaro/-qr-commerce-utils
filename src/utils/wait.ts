export const wait = (time: number): any => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
