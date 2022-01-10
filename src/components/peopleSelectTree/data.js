const departments = [{
  name: '顶级部门',
  pCode: '0',
  code: '0000'
}]
for (let i = 1; i <= 5; i++) {
  departments.push({
    name: '一级部门' + i,
    pCode: '0000',
    code: '0000-000' + i
  })
}
for (let i = 1; i <= 4; i++) {
  for (let j = 1; j <= 5; j++) {
    departments.push({
      name: '二级部门' + i + j,
      pCode: '0000-000' + i,
      code: '0000-000' + i + '-000' + j
    })
  }
}
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 4; j++) {
    for (let k = 1; k <= 5; k++) {
      departments.push(
        {
          name: '三级部门' + i + j + k,
          pCode: '0000-000' + i + '-000' + j,
          code: '0000-000' + i + '-000' + j + '-000' + k
        }
      )
    }
  }
}

const people = []
for (let i = 1; i <= 5; i++) {
  people.push({
    userName: '用户' + i,
    deptCode: '0000',
    id: 'yonghu' + i
  })
}
for (let i = 1; i <= 4; i++) {
  for (let j = 1; j <= 5; j++) {
    people.push({
      userName: '用户' + i + j,
      deptCode: '0000-000' + i,
      id: 'yonghu' + i + j
    })
  }
}
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 4; j++) {
    for (let k = 1; k <= 5; k++) {
      people.push(
        {
          userName: '用户' + i + j + k,
          deptCode: '0000-000' + i + '-000' + j,
          id: 'yonghu' + i + j + k
        }
      )
    }
  }
}
for (let i = 1; i <= 1; i++) {
  for (let j = 1; j <= 1; j++) {
    for (let k = 1; k <= 2; k++) {
      for (let l = 1; l <= 5; l++) {
        people.push(
          {
            userName: '用户' + i + j + k + l,
            deptCode: '0000-000' + i + '-000' + j + '-000' + l,
            id: 'yonghu' + i + j + k + l
          }
        )
      }
    }
  }
}

export {
  departments,
  people
}
