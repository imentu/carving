import { beforeAll, describe, expect, it, vi } from 'vitest'
import { DateTime } from 'luxon'
import { Project, ProjectStatus } from '../core'

describe('project model tests', () => {
  describe(('calculated properties'), () => {
    describe('days', () => {
      it('days should be 31 when project is being done', () => {
        const date = new Date('2022-10-31')
        vi.setSystemTime(date)

        const project = new Project('essential grammar in use', DateTime.local(2022, 10, 1), 115, 1)

        expect(project.days).eq(31)
      })

      it('days should be 3 when project has been done', () => {
        const date = new Date('2022-10-31')
        vi.setSystemTime(date)

        const project = new Project('essential grammar in use', DateTime.local(2022, 10, 1), 115, 1)
        project.addMileStone(DateTime.local(2022, 10, 2), 114)

        expect(project.days).eq(3)
      })
    })

    describe('current', () => {
      it('current should equal to total when days exceeds estimated', () => {
        const date = new Date('2022-10-15')
        vi.setSystemTime(date)

        const project = new Project('essential grammar in use', DateTime.local(2022, 10, 10), 3, 1)

        expect(project.current).eq(3)
      })

      it('current should equal to total when have milestone and its value exceed total', () => {
        const date = new Date('2022-10-20')
        vi.setSystemTime(date)

        const project = new Project('essential grammar in use', DateTime.local(2022, 10, 10), 3, 1)
        project.addMileStone(DateTime.local(2022, 10, 15), 2)

        expect(project.current).eq(3)
      })
    })

    describe('status', () => {
      it('status should be done when current progress equals to total', () => {
        const date = new Date('2022-10-15')
        vi.setSystemTime(date)

        const project = new Project('essential grammar in use', DateTime.local(2022, 10, 10), 3, 1)

        expect(project.status).eq(ProjectStatus.Done)
      })

      it('status should be done when get the end milestone', () => {
        const date = new Date('2022-10-15')
        vi.setSystemTime(date)

        const project = new Project('essential grammar in use', DateTime.local(2022, 10, 10), 100, 1)
        project.addMileStone(DateTime.local(2022, 10, 14), 100)

        expect(project.status).eq(ProjectStatus.Done)
      })

      it('status should be todo when startDate is in the future', () => {
        const date = new Date('2022-10-15')
        vi.setSystemTime(date)

        const project = new Project('essential grammar in use', DateTime.local(2023, 10, 10), 3, 1)

        expect(project.status).eq(ProjectStatus.Todo)
      })

      it('status should be doing when startDate is in the future', () => {
        const project = new Project('essential grammar in use', DateTime.local(2023, 10, 10), 3, 1)

        expect(project.status).eq(ProjectStatus.Todo)
      })
    })

    describe('doneDate', () => {
      it('without milestone', () => {
        const project = new Project('essential grammar in use', DateTime.local(2023, 10, 10), 3, 1)

        expect(project.doneDate).eq('2023/10/13')
      })

      it('with milestone', () => {
        const project = new Project('essential grammar in use', DateTime.local(2023, 10, 10), 3, 1)
        project.addMileStone(DateTime.local(2023, 10, 12), 1)

        expect(project.doneDate).eq('2023/10/14')
      })
    })
  })

  describe('mileston', () => {
    it('should calculate current progress correctly when have multiple milestones', () => {
      const date = new Date('2022-11-26')
      vi.setSystemTime(date)

      const project = new Project('essential grammar in use', DateTime.local(2022, 10, 16), 115, 1)
      project.addMileStone(DateTime.local(2022, 11, 17), 45)
      project.addMileStone(DateTime.local(2022, 11, 26), 56)

      expect(project.current).eq(56)
    })
  })

  describe('when startDate is in the future', () => {
    let project: Project
    beforeAll(() => {
      const date = new Date('2022-10-1')
      vi.setSystemTime(date)

      project = new Project('essential grammar in use', DateTime.local(2022, 10, 15), 10, 1)
    })

    it('days should be zero', () => {
      expect(project.days).eq(0)
    })

    it('current should be zero', () => {
      expect(project.current).eq(0)
    })

    it('calculate estimated date', () => {
      expect(project.estimated).eq('2022/10/25')
    })
  })
})
