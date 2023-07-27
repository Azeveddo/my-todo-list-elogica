import { tasks_v1 } from "googleapis";
import { toString } from "@fleker/standard-feeds";


export function exportAll(tasks: tasks_v1.Schema$Task[]) {
  const vtodos = tasks.map(task => {
    const categories = []
    if (task.notes) {
      const hashtags = task.notes.split('#')
      for (let i = 1; i < hashtags.length; i++) {
        categories.push(hashtags[i].trim())
      }
    }
    return {
      dtstamp: new Date(task.updated!),
      uid: task.id!,
      summary: task.title ?? 'Untitled',
      description: task.notes ?? '',
      completed: task.completed ? new Date(task.completed) : undefined,
      url: task.links?.length ? task.links[0].link : '',
      status: task.status === 'needsAction' ? 'PEDING' : 'COMPLETED',
      categories,
    }
  })
  return toString('GTasks', {
    todo: vtodos,
  })
}