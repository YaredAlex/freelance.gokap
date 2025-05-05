import { ArrowLeft } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import RoundedText from "../../../../components/rounded_text/rounded_text";
import { useEffect } from "react";
import useAgentProjectStatus from "../../hooks/agent/use_agent_project_status";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";

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
      {projectStatus.loading ? (
        <>
          <div className="position-relative" style={{ height: "80vh" }}>
            <CustomLoadingSecondary title="Loading" />
          </div>
        </>
      ) : (
        <>
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
                {projectStatus.propasalData?.project.title}
              </h5>
              <p className="text-capitalize mt-2 text-black-variant-2">
                {projectStatus.propasalData?.project.description}
              </p>
              {/* budget */}
              <div className={`pt-4 d-flex gap-2`}>
                {" "}
                <h6>Budget:</h6>
                <h6 className=" text-black-variant-2">
                  {projectStatus.propasalData?.project.project_price}
                </h6>
              </div>
              {/* Skill */}
              <div className={`pt-4`}>
                <h6>Skill required</h6>
                <div className="d-flex gap-4 mt-3 flex-wrap align-items-center">
                  {projectStatus.propasalData?.project.skills_required.map(
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
                      projectStatus.propasalData?.project.project_deadline || ""
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
              <div className="d-flex justify-content-between gap-4 align-items-center mb-2">
                <h5
                  className="font-weight-400 text-capitalize mb-0"
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
        </>
      )}
    </div>
  );
};

export default AgentProjectStatus;
