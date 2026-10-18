export type Course = {
  id: number
  title: string
  category: string
  lessons: number
  duration: string
  progress: number
  nextLesson: string
  mentor: string
}

export const courses: Course[] = [
  {
    id: 1,
    title: 'Test 1',
    category: 'A',
    lessons: 12,
    duration: '4h 20m',
    progress: 76,
    nextLesson: 'Visualizing KPI trends in dashboards',
    mentor: 'Mila Oakes',
  },
  {
    id: 2,
    title: 'Test 2',
    category: 'B',
    lessons: 9,
    duration: '3h 15m',
    progress: 52,
    nextLesson: 'Prioritization frameworks',
    mentor: 'Daniel Ford',
  },
  {
    id: 3,
    title: 'Test 3',
    category: 'C',
    lessons: 15,
    duration: '5h 05m',
    progress: 64,
    nextLesson: 'Component architecture & tokens',
    mentor: 'Ava Reed',
  },
]

export const stats = [
  { label: 'Active courses', value: '08', change: '+2 this week' },
  { label: 'Completed lessons', value: '144', change: '+18%' },
  { label: 'Study streak', value: '12 days', change: 'Consistent' },
  { label: 'Certificates', value: '03', change: '+1 today' },
]
