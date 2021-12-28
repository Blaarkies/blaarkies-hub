export class Common {

  static coerceAtLeast(value: number, threshold: number = 0): number {
    return value < threshold ? threshold : value
  }

  static coerceAtMost(value: number, threshold: number = 0): number {
    return value > threshold ? threshold : value
  }

  static coerceIn(value: number, lower: number = 0, upper: number = 1): number {
    if (lower > upper) {
      console.error(`lower "${lower}" must be less than or equal to upper "${upper}"`)
    }
    let lowLimitedValue = this.coerceAtLeast(value, lower)
    return this.coerceAtMost(lowLimitedValue, upper)
  }

  static lerp(value: number, other: number, ratio: number = .5): number {
    if (!this.between(ratio, 0, 1)) {
      console.error(`ratio "${ratio}" must be between 0 and 1`)
    }
    return value * ratio + other * (1 - ratio)
  }

  static between(value: number, lower: number, upper: number, exclusive: boolean = false): boolean {
    return exclusive
      ? (value > lower && value < upper)
      : !(value < lower || value > upper)
  }

  static findBreak<T>(list: T[], matchCallback: (item: T) => boolean): T {
    for (const item of list) {
      if (matchCallback(item)) {
        return item
      }
    }
  }

}
