export const timeStringToNumber = (value: string) => {
  const [hours, minutes] = value.split(':')

  return +hours * 60 + +minutes
}

export const prefixTime = (time: number) => (time >= 10 ? time : '0' + time)

export const numberToTimeString = (value: number) => {
  const hours = Math.floor(value / 60)
  const minutes = value % 60

  return prefixTime(hours) + ':' + prefixTime(minutes)
}
