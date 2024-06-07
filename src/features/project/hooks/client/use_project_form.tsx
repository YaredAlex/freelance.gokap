import { useState } from "react";

export type ProjectInputType = {
  project_category: string;
  title: string;
  description: string;
  skills_required: string[];
  project_price: string;
  project_deadline: string;
};

const useProjectForm = () => {
  const [personalSkills, setPersonalSkills] = useState<string[]>([]);
  const [projectInput, setProjectInput] = useState<ProjectInputType>({
    project_category: "D",
    title: "",
    description: "",
    skills_required: [],
    project_price: "",
    project_deadline: "",
  });
  const [errors, setErrors] = useState({
    project_category: "",
    title: "",
    description: "",
    skills_required: "",
    project_price: "",
    project_deadline: "",
  });
  const projectError = {
    title: "Project title is required",
    submission: "Project date is required",
    description: "Project description is required",
    budget: "budget is required field",
    skill: "at least 2 skill is required",
  };
  const validateProjectInput = () => {
    let isValid = true;
    setErrors(() => {
      return {
        description: "",
        project_category: "",
        project_deadline: "",
        project_price: "",
        skills_required: "",
        title: "",
      };
    });
    if (!projectInput.description) {
      isValid = false;
      setErrors((e) => {
        return { ...e, description: projectError.description };
      });
    }
    if (!projectInput.title) {
      isValid = false;
      setErrors((e) => {
        return { ...e, title: projectError.title };
      });
    }
    if (!projectInput.project_price) {
      isValid = false;
      setErrors((e) => {
        return { ...e, project_price: projectError.budget };
      });
    }
    if (!projectInput.project_deadline) {
      isValid = false;
      setErrors((e) => {
        return { ...e, project_deadline: projectError.submission };
      });
    }
    if (personalSkills.length < 2) {
      isValid = false;
      setErrors((e) => {
        return { ...e, skills_required: projectError.skill };
      });
    }

    return isValid;
  };
  //RestInput
  const resetInput = () => {
    setProjectInput((project) => {
      return {
        ...project,
        description: "",
        project_deadline: "",
        skills_required: [],
        title: "",
        project_price: "",
      };
    });
  };

  return {
    resetInput,
    errors,
    setProjectInput,
    personalSkills,
    setPersonalSkills,
    projectError,
    projectInput,
    validateProjectInput,
  };
};

export default useProjectForm;
export type ProjectFormType = {
  resetInput: () => void;
  errors: {
    project_category: string;
    title: string;
    description: string;
    skills_required: string;
    project_price: string;
    project_deadline: string;
  };
  setProjectInput: React.Dispatch<React.SetStateAction<ProjectInputType>>;
  personalSkills: string[];
  setPersonalSkills: React.Dispatch<React.SetStateAction<string[]>>;
  projectError: {
    title: string;
    submission: string;
    description: string;
    budget: string;
    skill: string;
  };
  projectInput: ProjectInputType;
  validateProjectInput: () => boolean;
};
