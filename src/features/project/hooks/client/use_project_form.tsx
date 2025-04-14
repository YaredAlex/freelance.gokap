import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export type ProjectInputType = {
  project_category: string;
  title: string;
  description: string;
  skills_required: string[];
  project_price: string;
  project_deadline: string;
  category?: string;
  subcategory?: string;
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
    category: undefined,
    subcategory: undefined,
  });
  const [errors, setErrors] = useState({
    project_category: "",
    title: "",
    description: "",
    skills_required: "",
    project_price: "",
    project_deadline: "",
    category: "",
    subcategory: "",
  });
  const projectError = {
    title: "Project title is required",
    submission: "Project date is required",
    description: "Project description is required",
    budget: "500 - 20,000 range",
    skill: "at least 2 skill is required",
    category: "category is required",
    subcategory: "subcategory is required",
  };
  const maxItems = 15;
  const navigator = useNavigate();
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
        category: "",
        subcategory: "",
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
    if (
      !projectInput.project_price ||
      parseInt(projectInput.project_price) < 500 ||
      parseInt(projectInput.project_price) > 20000
    ) {
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
    if (!projectInput.category) {
      isValid = false;
      setErrors((e) => {
        return { ...e, category: projectError.category };
      });
    }
    if (!projectInput.subcategory) {
      isValid = false;
      setErrors((e) => {
        return { ...e, subcategory: projectError.subcategory };
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
  const onSelectItem = (item: string) => {
    if (maxItems && personalSkills.length >= maxItems) {
      return;
    }

    setPersonalSkills([...personalSkills, item]);
  };

  const onRemoveItem = (item: string) => {
    setPersonalSkills(personalSkills.filter((i) => i !== item));
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
    navigator,
    onRemoveItem,
    onSelectItem,
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
    category: string;
    subcategory: string;
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
  navigator: NavigateFunction;
  onRemoveItem: (item: string) => void;
  onSelectItem: (item: string) => void;
};
