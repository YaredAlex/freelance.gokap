import { useState } from "react";
import { ButtonPrimary } from "../../../components/button/button";
import RoundedText from "../../../components/rounded_text/rounded_text";
import { ClientProjectType } from "../../../context/projects/project_context";
import { ApplyProjectSkeleton } from "../../apply/components/apply_skeleton";
import useAssignProject, { AppliedAgentType } from "../hook/use_assign_project";
import { AssignModal } from "./admin/assign_modal";

const AssignProject = () => {
  const assignProject = useAssignProject();
  const [freelancer, setFreelancer] = useState<AppliedAgentType>();
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
        {assignProject.loadingFreelancers ? (
          <div></div>
        ) : (
          <>
            {assignProject?.agentList?.map((freelancer, index) => (
              <div
                key={index}
                className="border-card p-4 rounded  bg-white-v-4"
              >
                {/* Name of freelancer and title of freelancer */}
                <div>
                  <p>
                    {typeof freelancer.details.frelancer_id.user === "object"
                      ? `${freelancer.details.frelancer_id.user.firstname} ${freelancer.details.frelancer_id.user.lastname}`
                      : ""}
                  </p>
                </div>
                {/* proposal */}
                <div className="my-2">
                  <p className="text-black-variant-2 text-xsm mb-2">Proposal</p>
                  <p>{freelancer.details.proposal}</p>
                </div>
                {/* skills of freelancer */}
                <div className="my-4">
                  <p className="text-black-variant-2 text-xsm mb-2">Skills</p>
                  <div className="d-flex gap-4 flex-wrap">
                    {freelancer.details.frelancer_id?.skills.map(
                      (skill, index) => (
                        <RoundedText text={skill} key={index} />
                      )
                    )}
                  </div>
                </div>
                {/* completion rate */}
                <div className="my-2">
                  <p>Completion rate</p>
                </div>
                {/* button to assign to this */}

                <div className="ms-auto" style={{ maxWidth: "200px" }}>
                  <ButtonPrimary
                    title="Assign"
                    onClick={() => {
                      setFreelancer(freelancer);
                      assignProject.setShowModal(true);
                    }}
                    type="button"
                    className="py-2"
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <AssignModal assignProject={assignProject} freelancer={freelancer} />
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
