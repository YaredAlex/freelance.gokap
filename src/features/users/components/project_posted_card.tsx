import TimeAgo from "javascript-time-ago";
import { PostedProjectType } from "../../../context/projects/project_context";
import { TickCircle } from "iconsax-react";
import RoundedText from "../../../components/rounded_text/rounded_text";

export const ProjectPostedCard = ({
  project,
  isAssigned,
}: {
  project: PostedProjectType;
  isAssigned: boolean;
}) => {
  const timeAgo = new TimeAgo("en");
  return (
    <div
      className="border-light-bottom project-card-wrapper bg-white-v-4  px-3 py-3 cursor-pointer"
      style={{
        maxWidth: "900px",
        width: "100%",
      }}
      // onClick={() => adminBoard.checkOutProject(project)}
    >
      <div className="d-flex justify-content-between">
        <p className="m-0 text-black-variant-3" style={{ fontSize: "14px" }}>
          {timeAgo.format(new Date(project.created_at || Date.now.toString()))}
        </p>
        {isAssigned && (
          <div className="d-flex gap-1">
            <TickCircle variant="Bold" color="green" size={20} />
            <p className="text-sm">Applied</p>
          </div>
        )}
      </div>
      {/* title */}
      <h6 className="project-title my-2 text-capitalize">{project.title}</h6>
      {/* Description */}
      <p className="project-description my-3 text-sm text-black-variant-3">
        {project.description}
      </p>
      <div className="d-flex gap-3 flex-wrap my-3 text-sm">
        {project.skills_required.map((skill, index) => (
          <RoundedText text={skill} key={index} />
        ))}
      </div>
      <div className="card-bottom d-flex justify-content-between">
        <div className="d-flex gap-4">
          <p
            className="d-flex gap-1 flex-sm-row flex-column"
            style={{ fontSize: "14px" }}
          >
            <span className="text-black-variant-2">Est Submission </span>
            <span className="text-black-variant-3">
              {new Date(project.project_deadline).toDateString()}
            </span>
          </p>
          <p className="text-black-variant-3 font-weight-300">
            Proposals: {project.applied_count}
          </p>
        </div>
        <p>
          Budget <br />
          {project.project_price}
          {" Nu"}
        </p>
      </div>
    </div>
  );
};
