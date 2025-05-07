import { ArrowLeft, Medal, Money, WalletMinus } from "iconsax-react";
import {
  ButtonFlexOutline,
  ButtonPrimary,
} from "../../../components/button/button";
import { useNavigate } from "react-router-dom";
import { ProjectDetailSkeleton } from "../../apply/components/detail_skeleton";
import useProjectStatus from "../hook/use_status";
import { ClientProjectType } from "../../../context/projects/project_context";
import RoundedText from "../../../components/rounded_text/rounded_text";
import { toLocalDate } from "../../../util/common_methods";

const ProjectAssignedStatus = () => {
  const navigate = useNavigate();
  const projectStatus = useProjectStatus();
  return (
    <div className="max-w-1100 mx-auto mt-2 text-black-variant-1">
      <div
        style={{ maxWidth: "max-content" }}
        className="d-flex gap-4 align-items-center mb-2"
      >
        <ButtonFlexOutline
          className="p-1 bg-white-v-4 text-black-variant-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </ButtonFlexOutline>
        <p>Status</p>
      </div>

      {projectStatus.loading ? (
        <div>
          <ProjectDetailSkeleton />
          <div className="mb-4"></div>
          <ProjectDetailSkeleton showSkill={false} />
        </div>
      ) : (
        <ProjectDetail
          project={projectStatus.currentProject as ClientProjectType}
        />
      )}
      {/* display if any one have applied freelancer skills and there proposal */}
      <div className="mt-4 d-flex flex-column gap-4 text-black-variant-1 ">
        <h5>Progress Freelancers</h5>
        {projectStatus.loading ? (
          <div>Wait loading</div>
        ) : (
          <>
            {projectStatus?.agentList?.map((freelancer, index) => (
              <div
                key={index}
                className="border-card p-4 rounded  bg-white-v-4"
              >
                {/* Name of freelancer and title of freelancer */}
                <div>
                  <p>
                    {typeof freelancer.details.freelancer.user === "object"
                      ? `${freelancer.details.freelancer.user.firstname} ${freelancer.details.freelancer.user.lastname}`
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
                    {freelancer.details.freelancer?.skills.map(
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
                    title="unassign"
                    onClick={() => {
                      //   setFreelancer(freelancer);
                      //   assignProject.setShowModal(true);
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
      {/*  */}
    </div>
  );
};

export default ProjectAssignedStatus;

const ProjectDetail = ({ project }: { project: ClientProjectType }) => {
  const netPayment = (price: string) => {
    const payment = parseInt(price);
    const net = payment - 0.1 * payment;
    return Number(net).toFixed(2);
  };
  return (
    <div>
      <div
        className="text-black-variant-1 d-flex flex-column gap-3
        bg-white-v-4 rounded p-4 border-card"
      >
        <h5 className="mb-3">Job detail</h5>
        <div className="d-flex flex gap-3">
          <div className="col-9 border-right-light">
            <h6 className="">{project.title}</h6>
            <div className="d-flex gap-4 align-items-center my-3">
              <RoundedText
                text={"Category"}
                showIcon={false}
                bgColor={"gray"}
              />{" "}
              <p className="font-weight-300 ">
                Posted {toLocalDate(project.created_at)}
              </p>
            </div>
            <p
              className="project-description my-3 text-black-variant-2 font-weight-400"
              style={{
                lineHeight: 1.45,
                letterSpacing: 0.2,
              }}
            >
              {project.description}
            </p>
          </div>
          {/* right side  */}
          <div className="col-3 d-flex flex-column gap-3">
            {/* Experiance level */}
            <ProjectDetailTile
              icon={<Medal />}
              title={"Intermediate"}
              subtitle="Experiance Level"
            />
            <ProjectDetailTile
              icon={<WalletMinus />}
              title={"10%"}
              subtitle="Platform Fee"
            />
            <ProjectDetailTile
              icon={<Money />}
              title={netPayment(project.project_price)}
              subtitle="Payment"
            />
          </div>
        </div>
        <hr />
        <div className="d-flex flex-column gap-2">
          <h6 className="project-title text-capitalize">Skill and Experties</h6>
          <div className="d-flex gap-3 flex-wrap mt-3">
            {project.skills_required?.map((skill, index) => (
              <RoundedText text={skill} key={index} />
            ))}
          </div>
        </div>
      </div>
      {/* Assign */}
    </div>
  );
};

const ProjectDetailTile = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="d-flex gap-4 align-items-start">
      {icon}
      <div>
        <p>{title}</p>
        <p className="text-black-variant-2 font-weight-300">{subtitle}</p>
      </div>
    </div>
  );
};
