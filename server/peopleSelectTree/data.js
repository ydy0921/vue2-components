const departments = [{
  name: '顶级部门1',
  pCode: '0',
  code: '0001'
}, {
  name: '顶级部门2',
  pCode: '0',
  code: '0002'
}]
for (let i = 1; i <= 5; i++) {
  departments.push({
    name: '一级部门' + i,
    pCode: '0001',
    code: '0001-000' + i
  })
}
for (let i = 1; i <= 5; i++) {
  departments.push({
    name: '一级部门' + i,
    pCode: '0002',
    code: '0002-000' + i
  })
}
for (let i = 1; i <= 4; i++) {
  for (let j = 1; j <= 5; j++) {
    departments.push({
      name: '二级部门' + i + j,
      pCode: '0001-000' + i,
      code: '0001-000' + i + '-000' + j
    })
  }
}
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 4; j++) {
    for (let k = 1; k <= 5; k++) {
      departments.push(
        {
          name: '三级部门' + i + j + k,
          pCode: '0001-000' + i + '-000' + j,
          code: '0001-000' + i + '-000' + j + '-000' + k
        }
      )
    }
  }
}

const people = []
for (let i = 1; i <= 5; i++) {
  people.push({
    personName: '用户' + i,
    deptCode: '0001',
    id: 'person' + i
  })
}
for (let i = 1; i <= 5; i++) {
  people.push({
    personName: '用户' + i,
    deptCode: '0002',
    id: 'person' + i
  })
}
for (let i = 1; i <= 4; i++) {
  for (let j = 1; j <= 5; j++) {
    people.push({
      personName: '用户' + i + j,
      deptCode: '0001-000' + i,
      id: 'person' + i + j
    })
  }
}
for (let i = 1; i <= 4; i++) {
  for (let j = 1; j <= 5; j++) {
    people.push({
      personName: '用户' + i + j,
      deptCode: '0002-000' + i,
      id: 'person' + i + j
    })
  }
}
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 4; j++) {
    for (let k = 1; k <= 5; k++) {
      people.push(
        {
          personName: '用户' + i + j + k,
          deptCode: '0001-000' + i + '-000' + j,
          id: 'person' + i + j + k
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
            personName: '用户' + i + j + k + l,
            deptCode: '0001-000' + i + '-000' + j + '-000' + l,
            id: 'person' + i + j + k + l
          }
        )
      }
    }
  }
}

module.exports = {
  departments,
  people
}
