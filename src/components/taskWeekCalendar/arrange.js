function timeToMinutes (time) {
  // convert time to minutes, for example, '01:30' to 90
  const a = time.split(':')
  return Number(a[0]) * 60 + Number(a[1])
}

function testTimeOverlap (task, range) {
  // test if the task and the range have a time overlap
  return !((task.e <= range[0]) || (task.s >= range[1]))
  // return (range[0] <= task.s && task.s < range[1]) || (range[0] < task.e && task.e <= range[1]) || (range[0] <= task.s && range[1] >= task.e) || (range[0] >= task.s && range[1] <= task.e)
}

function testTimeOverlaps (task, ranges) {
  // test if the task and the range array have a time overlap
  // if ture, return the first index
  for (const [index, range] of ranges.entries()) {
    if (testTimeOverlap(task, range)) {
      return index
    }
  }
}

function arrangeColumn (group, task) {
  // push the task into the correct column of the group
  // iterate the group
  for (const [index, column] of group.entries()) {
    // test if the task and the last task of each column have a time overlap
    if (!testTimeOverlap(task, [column[column.length - 1].s, column[column.length - 1].e])) {
      // calculate the weight of the task
      for (let i = index + 1; i < group.length; i++) {
        // test if the task and the last task of each latter column have a overlap
        if (testTimeOverlap(group[i][group[i].length - 1], [task.s, task.e])) {
          break
        } else {
          task.w++
        }
      }
      // change the weight of the last task of the previous column if need
      if (index > 0) {
        const oldTask = group[index - 1][group[index - 1].length - 1]
        if (oldTask && testTimeOverlap(oldTask, [task.s, task.e])) {
          oldTask.w = 1
        }
      }
      column.push(task)
      return
    }
  }
  // if the task and the last task of each existed column all have a time overlap
  // push a new column with the task into the group
  group.push([task])
}

export const arrange = function (data, showHidden = true) {
  if (data && data.length) {
    // convert time to minutes and sort by start time
    const taskArray = data.map(i => ({
      ...i,
      s: timeToMinutes(i.startTime),
      e: timeToMinutes(i.endTime)
    })).sort((a, b) => a.s - b.s)
    // a three-dimensional array which the first dimension stands for group, the second dimension stands for column and the third dimension stores tasks
    const resultData = []
    // a two-dimensional array which the first dimension stands for group, the second dimension stores the start time and the end time of each group
    const timeRanges = []
    // iterate the task array
    taskArray.forEach(task => {
      // duration for calculating the task box's height
      task.d = task.e - task.s
      // weight for calculating the task box's width
      task.w = 1
      // test if the task can be pushed into the existed group
      const index = testTimeOverlaps(task, timeRanges)
      if (index >= 0) {
        // push the task into the correct group of the result data
        arrangeColumn(resultData[index], task)
        // expand the start time and end time of the group in the time ranges
        task.s < timeRanges[index][0] && (timeRanges[index][0] = task.s)
        task.e > timeRanges[index][1] && (timeRanges[index][1] = task.e)
      } else {
        // push a new group into the result data
        resultData.push([])
        // push the task into the new group of the result data
        arrangeColumn(resultData[resultData.length - 1], task)
        // push the start time and end time of the new group into the time ranges
        timeRanges.push([task.s, task.e])
      }
    })
    if (showHidden) {
      // iterate the result data
      for (const group of resultData) {
        // hidden the extra tasks if the number of columns is greater than 5
        // these tasks will show in the only task box in fifth column
        if (group.length > 5) {
          // array for the extra tasks
          const hiddenData = []
          // end time of the only task in fifth column
          let e = 0
          const i = group.length - 1
          for (let j = 4; j <= i; j++) {
            for (const task of group[j]) {
              // push the extra tasks into the hidden data
              hiddenData.push(task)
              // change the end time of the only task in fifth column
              task.e > e && (e = task.e)
            }
          }
          // sort the hidden data by start time
          hiddenData.sort((a, b) => a.s - b.s)
          // delete the extra columns
          group.length = 4
          // change the weight of the tasks of the first four columns if need
          for (let l = 3; l >= 0; l--) {
            for (const task of group[l]) {
              if (task.w > 1 && task.w + l - 1 > 3) {
                task.w = 4 - l
              }
            }
          }
          // push the only task into fifth column
          group.push([{
            s: hiddenData[0].s,
            e: e,
            d: e - hiddenData[0].s,
            w: 1,
            hiddenData: hiddenData
          }])
        }
      }
    }
    return resultData
  } else {
    return []
  }
}
