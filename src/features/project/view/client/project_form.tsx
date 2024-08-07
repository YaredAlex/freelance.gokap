import { useEffect, useState } from "react";
import {
  TextEdit,
  TextEditArea,
} from "../../../../components/inputField/text_field";
import SelectSkill from "../../../../components/select_skill/select_skill";
import { ProjectFormType } from "../../hooks/client/use_project_form";

const ProjectForm = ({ projectFrom }: { projectFrom: ProjectFormType }) => {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const today = new Date();

    const minDate = new Date();
    minDate.setDate(today.getDate() + 3);
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 4);
    setMinDate(formatDate(minDate));
    setMaxDate(formatDate(maxDate));
  }, []);

  return (
    <>
      <div className="rounded  ">
        {/* heading for posting project */}

        <div className={`cr-form-wrapper  `}>
          {/* Project title */}
          <TextEdit
            placeholder="Project Title"
            type="text"
            subtitle="Project title that tells the project"
            name="title"
            onChange={(e) => {
              projectFrom.setProjectInput((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
            value={projectFrom.projectInput.title}
            title="Title *"
            error={projectFrom.errors.title}
          />

          {/* Project submition data line */}
          <TextEdit
            placeholder="Submition"
            type="date"
            subtitle="Last date for project submition"
            name="project_deadline"
            title="Submition Date *"
            onChange={(e) => {
              projectFrom.setProjectInput((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
            value={
              projectFrom.projectInput.project_deadline
                ? new Date(projectFrom.projectInput.project_deadline)
                    ?.toISOString()
                    ?.substring(0, 10)
                : projectFrom.projectInput.project_deadline
            }
            error={projectFrom.errors.project_deadline}
            max={maxDate}
            min={minDate}
          />

          {/* Description */}

          <TextEditArea
            type=""
            placeholder="Project Description"
            subtitle=" Detail explanation of project that explain what is the project
            about"
            name="description"
            title="Description *"
            onChange={(e) => {
              projectFrom.setProjectInput((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
            value={projectFrom.projectInput.description}
            error={projectFrom.errors.description}
          />
          {/* Skill section  */}
          <SelectSkill
            error={projectFrom.errors.skills_required}
            selectedSkill={projectFrom.personalSkills}
            setSelectedSkill={projectFrom.setPersonalSkills}
          />
          {/* Budget */}
          <TextEdit
            placeholder="Budget"
            type="number"
            subtitle="Budget required for the project"
            name="project_price"
            title="Budget *"
            onChange={(e) => {
              projectFrom.setProjectInput((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
            error={projectFrom.errors.project_price}
            value={projectFrom.projectInput.project_price}
          />
          {/* Attachment */}
          <div className={`p-2`}>
            <div style={{ maxWidth: "400px" }}>
              <h6 className={"font-weight-400 text-black-variant-1"}>
                Attachment
              </h6>
              <p className="text-black-variant-2 my-2">
                Attachment if any {"(optional)"}
              </p>
            </div>
            <input
              type="file"
              className={`custom-input bg-white-smoke border-card rounded`}
              style={{ maxWidth: "400px" }}
              name="attachment"
              // onChange={(e) =>
              //   projectFrom.setProjectDetail({
              //     ...projectDetail,
              //     [e.target.name]: e.target.files[0],
              //   })
              // }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectForm;
