import { match } from 'assert'
import { DateTime, Interval } from 'luxon'

export enum ProjectStatus {
  Todo,
  Doing,
  Done
}

export class MileStone {
  date: DateTime
  value: number

  constructor (dateTime: DateTime, value: number) {
    this.date = dateTime
    this.value = value
  }
}

export class Project {
  title: string
  startDate: DateTime
  total: number
  step: number
  mileStones: MileStone[]

  constructor (title: string, startDate: DateTime, total: number, step: number) {
    this.title = title
    this.startDate = startDate
    this.total = total
    this.step = step
    this.mileStones = []
  }

  public get start (): string {
    return this.format(this.startDate)
  }

  public get estimated (): string {
    return this.format(this.estimatedDateTime)
  }

  public get estimatedDateTime (): DateTime {
    const remain = this.total - this.current
    const remainDays = remain / this.step

    const now = DateTime.now()
    const startDate = now < this.startDate ? this.startDate : now
    const estimated = startDate.plus({ days: remainDays })
    return estimated
  }

  public get doneDate (): string {
    return this.format(this.doneDateTime)
  }

  public get doneDateTime (): DateTime {
    if (this.mileStones.length === 0) {
      return this.estimatedDateTime
    }

    const mileston = this.mileStones[this.mileStones.length - 1]
    const remain = this.total - mileston.value
    const remainDays = remain / this.step

    const estimated = mileston.date.plus({ days: remainDays })
    return estimated
  }

  format (dateTime: DateTime): string {
    return dateTime.toLocaleString(DateTime.DATE_SHORT)
  }

  public get expectedProgress (): number {
    return this.percentage(this.expected, this.total)
  }

  public get expected (): number {
    const now = DateTime.now()
    const days = now < this.startDate ? 0 : this.daysOf(this.startDate, now)
    return Math.min(days * this.step, this.total)
  }

  public get currentProgress (): number {
    return this.percentage(this.current, this.total)
  }

  public get current (): number {
    if (this.mileStones.length === 0) {
      return this.expected
    }

    const lastMileStone = this.mileStones[this.mileStones.length - 1]
    const result = lastMileStone.value + this.daysOf(lastMileStone.date, DateTime.now()) * this.step
    return Math.min(result, this.total)
  }

  percentage (value: number, total: number): number {
    let result = value / total * 100
    result = Math.min(result, 100)
    return parseFloat(result.toFixed(2))
  }

  public get days (): number {
    switch (this.status) {
      case ProjectStatus.Doing:
        return this.daysOf(this.startDate, DateTime.now()) + 1
      case ProjectStatus.Done:
        return this.daysOf(this.startDate, this.doneDateTime) + 1
    }
    return 0
  }

  daysOf (startDate: DateTime, endDate: DateTime): number {
    const interval = Interval.fromDateTimes(startDate, endDate)
    return Math.floor(interval.length('day'))
  }

  public addMileStone (dateTime: DateTime, value: number): void {
    this.mileStones = [...this.mileStones, new MileStone(dateTime, value)].sort((a, b) => a.date > b.date ? 1 : -1)
  }

  public get status (): ProjectStatus {
    if (this.current >= this.total) {
      return ProjectStatus.Done
    }

    return DateTime.now() > this.startDate
      ? ProjectStatus.Doing
      : ProjectStatus.Todo
  }
}

export default {
}
