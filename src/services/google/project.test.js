// Copyright Carrefour(2021)
//

/* eslint-disable no-console */

const Project = require("./project")
const projectId = '11044440778'

test('getDetails', async () => {
  let project = new Project(projectId)
  let infos = await project.getDetails()
  console.log(infos)
  expect(infos).toBeDefined()

  infos = await project.getDetails()
  console.log(infos)
  expect(infos).toBeDefined()

  project = new Project('xxxxxxxxx')
  infos = await project.getDetails()
  console.log(infos)
  expect(infos).toBeNull()
})

test('listAllProjects', async () => {
  const projects = await Project.listAllProjects()
  console.log(projects)
  expect(projects).toBeDefined()
})
