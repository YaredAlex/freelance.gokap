import { ArrowLeft } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import RoundedText from "../../../../components/rounded_text/rounded_text";
import { useEffect } from "react";
import useAgentProjectStatus from "../../hooks/agent/use_agent_project_status";

const AgentProjectStatus = () => {
  const navigate = useNavigate();
  const projectStatus = useAgentProjectStatus();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <div className={`text-black-variant-1 px-2 max-w-1100 mx-auto`}>
      {/* Goback to previous  */}
      <button
        className=" transparent w-auto btn-custom-secondary ms-0 p-1 text-black-variant-1"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeft />
      </button>
      {/*  */}
      <div
        className={`bg-white-v-4 mb-4 
      justify-content-between
      p-4 border-card rounded`}
      >
        <div className="w-100">
          <h5
            className="font-weight-400 text-capitalize"
            style={{ maxWidth: "600px" }}
          >
            {projectStatus.propasalData?.project_id.title}
          </h5>
          <p className="text-capitalize mt-2 text-black-variant-2">
            {projectStatus.propasalData?.project_id.description}
          </p>
          {/* budget */}
          <div className={`pt-4`}>
            {" "}
            <h6>Budget</h6>
            <div className="h-100 w-100 mt-3">
              <h5 className="font-weight-400 text-black-variant-2">
                {projectStatus.propasalData?.project_id.project_price}
              </h5>
            </div>
          </div>
          {/* Skill */}
          <div className={`pt-4`}>
            <h6>Skill required</h6>
            <div className="d-flex gap-4 mt-4 flex-wrap align-items-center">
              {projectStatus.propasalData?.project_id.skills_required.map(
                (sk, index) => (
                  <RoundedText key={index} text={sk} />
                )
              )}
            </div>
          </div>
          {/* submission */}
          <div className={`pt-4`}>
            {" "}
            <h6>Submission date</h6>
            <div className="h-100 w-100 mt-3">
              <p className="text-black-variant-2">
                {new Date(
                  projectStatus.propasalData?.project_id.project_deadline || ""
                ).toDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div
        className={`bg-white-v-4 mb-4 
      justify-content-between
      p-4 border-card rounded d-flex`}
      >
        <div className="w-100">
          <div className="d-flex justify-content-between gap-4 ">
            <h5
              className="font-weight-400 text-capitalize"
              style={{ maxWidth: "600px" }}
            >
              Proposal
            </h5>
            <div>
              <RoundedText text={"Pending"} error={true} />
            </div>
          </div>
          <p className="text-capitalize  text-black-variant-2">
            {projectStatus.propasalData?.proposal}
          </p>
          {/*  */}
        </div>
      </div>
      {/*  */}

      {/* <div className={`bg-white-v-4 p-4 mb-3 border-card rounded`}>
        <h6>Project Progress</h6>
        <p>Screenshoot</p>
      </div> */}
    </div>
  );
};

export default AgentProjectStatus;
