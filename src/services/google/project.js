// Copyright Carrefour(2021)
//

const { ProjectsClient } = require('@google-cloud/resource-manager')

/** Class representing a Project. */
class Project {
  /**
   * Create a Project.
   * 
   * @param {string} projectId - The GCP project identifier.
   */
  constructor(projectId) {
    this.projectId = projectId
    this.cache = null
  }

  /**
   * Get the GCP project identifier.
   * 
   * @return {string} The GCP project identifier.
   */
  get id () {
    return this.projectId
  }

  /**
   * Retrieve project details.
   * 
   * @async
   * @returns {Promise<google.cloud.resourcemanager.v3.IProject>}
   */
  async getDetails () {
    if (this.cache) {
      return this.cache
    }
    const client = new ProjectsClient()
    const projects = client.searchProjectsAsync()
    for await (const project of projects) {
      if (project.name == `projects/${this.projectId}`) {
        this.cache = project
        return project
      }
    }
    return null
  }

  /**
   * list all projects.
   * 
   * @async
   * @static
   * @returns {Promise<google.cloud.resourcemanager.v3.IProject[]>}
   */
  static async listAllProjects () {
    let founds = []
    const client = new ProjectsClient()
    const projects = client.searchProjectsAsync()
    for await (const project of projects) {
      founds.push(project)
    }
    return founds
  }
}

module.exports = Project
