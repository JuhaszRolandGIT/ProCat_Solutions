import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { ProjectsSidebar } from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject.jsx";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  })

  function handleSelectProject(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      };
    });
  }

  function handleCancelProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  }

  function handleAddProject(projectData){
    setProjectsState(prevState => {
      const projectId = Math.random()
      const newProject = {
      ...projectData,
      id: projectId,
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  };

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} />;

  if(projectsState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject}/>
  } else if (projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
    <ProjectsSidebar onStartAddProject={handleStartAddProject} 
    projects={projectsState.projects}
    onSelectProject={handleSelectProject}/>
    {content}
    </main>
  );
}


export default App; 