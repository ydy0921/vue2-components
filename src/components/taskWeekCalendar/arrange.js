function timeToNumber (time) {
  const a = time.split(':')
  return Number(a[0]) * 60 + Number(a[1])
}

function testTimeCollision (od, range) {
  return (range[0] <= od.s && od.s < range[1]) || (range[0] < od.e && od.e <= range[1]) || (range[0] <= od.s && range[1] >= od.e) || (range[0] >= od.s && range[1] <= od.e)
}

function testTimeCollisions (od, ranges) {
  for (const [index, range] of ranges.entries()) {
    if (testTimeCollision(od, range)) {
      return index
    }
  }
}

function arrangeColumn (data, od) {
  for (const [index, datum] of data.entries()) {
    if (!testTimeCollision(od, [datum[datum.length - 1].s, datum[datum.length - 1].e])) {
      if (datum.length >= 1) {
        for (let i = index + 1; i < data.length; i++) {
          if (testTimeCollision(data[i][data[i].length - 1], [od.s, od.e])) {
            break
          } else {
            od.w++
          }
        }
        if (index > 0) {
          const ood = data[index - 1][data[index - 1].length - 1]
          if (ood && testTimeCollision(ood, [od.s, od.e])) {
            ood.w = 1
          }
        }
      }
      datum.push(od)
      return
    }
  }
  data.push([od])
}

export const arrange = function (data) {
  if (data && data.length) {
    const originData = data.map(i => ({
      ...i,
      s: timeToNumber(i.startTime),
      e: timeToNumber(i.endTime)
    })).sort((a, b) => a.s - b.s)
    const resultData = []
    const timeZone = []
    originData.forEach(od => {
      od.d = od.e - od.s
      od.w = 1
      const index = testTimeCollisions(od, timeZone)
      if (index >= 0) {
        arrangeColumn(resultData[index], od)
        od.s < timeZone[index][0] && (timeZone[index][0] = od.s)
        od.e > timeZone[index][1] && (timeZone[index][1] = od.e)
      } else {
        resultData.push([])
        arrangeColumn(resultData[resultData.length - 1], od)
        timeZone.push([od.s, od.e])
      }
    })
    return resultData
  } else {
    return []
  }
}
