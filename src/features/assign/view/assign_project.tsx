import { ButtonPrimary } from "../../../components/button/button";
import RoundedText from "../../../components/rounded_text/rounded_text";
import { ClientProjectType } from "../../../context/projects/project_context";
import { ApplyProjectSkeleton } from "../../apply/components/apply_skeleton";
import useAssignProject from "../hook/use_assign_project";

const AssignProject = () => {
  const assignProject = useAssignProject();
  const appliedFreelancersList = [
    {
      first_name: "John",
      skills: ["React", "Management", "Marketing"],
      proposal:
        "I have worked on differernt project from and have experiance on delvelopment of medias",
      date: "10-04-2024",
      completed_project: "0",
      level: "Junior",
    },
    {
      first_name: "Brown",
      skills: ["Figma", "Java", "Management"],
      proposal:
        "This project is what i was waiting for, i would like to participate in this project until it is finished. i have great skill that can be inuse for this project",
      date: "10-04-2024",
      completed_project: "0",
      level: "Junior",
    },
  ];
  return (
    <div className="max-w-1100 mx-auto mt-4">
      {/* Fetch project by id */}

      {assignProject.getProjectLoading ? (
        <div>
          <ApplyProjectSkeleton />
          <div className="mb-4"></div>
          <ApplyProjectSkeleton showSkill={false} />
        </div>
      ) : (
        <ProjectDetail
          project={assignProject.currentProject as ClientProjectType}
        />
      )}
      {/* display if any one have applied freelancer skills and there proposal */}
      <div className="mt-4 d-flex flex-column gap-4 text-black-variant-1 ">
        <h5>Applied Freelancers</h5>
        {appliedFreelancersList.map((freelancer, index) => (
          <div key={index} className="border-card p-4 rounded  bg-white-v-4">
            {/* Name of freelancer and title of freelancer */}
            <div>
              <p>{freelancer.first_name}</p>
            </div>
            {/* proposal */}
            <div className="my-2">
              <h6>Proposal</h6>
              <p>{freelancer.proposal}</p>
            </div>
            {/* skills of freelancer */}
            <div className="d-flex gap-4 flex-wrap my-4">
              {freelancer.skills.map((skill, index) => (
                <RoundedText text={skill} key={index} />
              ))}
            </div>
            {/* completion rate */}
            <div className="my-2">
              <p>Completion rate</p>
            </div>
            {/* button to assign to this */}
            <div className="ms-auto" style={{ maxWidth: "200px" }}>
              <ButtonPrimary
                title="Assign"
                onClick={() => {}}
                type="button"
                className="py-2"
              />
            </div>
          </div>
        ))}
      </div>

      {/*  */}
    </div>
  );
};

export default AssignProject;
const ProjectDetail = ({ project }: { project: ClientProjectType }) => {
  const formatNumber = (num: string) => {
    const res = parseInt(num) * 0.1;
    return Number(res).toFixed(2);
  };
  return (
    <div>
      <div
        className="text-black-variant-1 
          bg-white-v-4 rounded p-2 border-card"
      >
        <div className="d-flex gap-4">
          <div className="ms-4" style={{ maxWidth: "700px", width: "100%" }}>
            {/* title */}
            <h5 className="project-title my-3 font-weight-400 text-capitalize">
              {project.title}
            </h5>
            {/* Description */}
            <p
              className="project-description my-3 text-black-variant-2 font-weight-400"
              style={{
                lineHeight: 1.45,
                letterSpacing: 0.2,
              }}
            >
              {project.description}
            </p>
            {/* Budget */}
            <h6 className="project-title my-3 text-capitalize">Budget</h6>
            <h6 className="font-weight-400">{project.project_price}</h6>
            {/* Fee */}
            <h6 className="my-3 text-capitalize">Platform fee 10%</h6>
            <p className="text-black-variant-2">
              {formatNumber(project?.project_price)}
            </p>
            {/* skills */}
            <h6 className="project-title my-3  text-capitalize">
              Skill and Experties
            </h6>
            <div className="d-flex gap-3 flex-wrap my-3">
              {project?.skills_required?.map((skill, index) => (
                <RoundedText text={skill} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Assign */}
    </div>
  );
};
