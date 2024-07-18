import { ArrowLeft } from "iconsax-react";
import useApplyProject, { ApplyProjectType } from "../../hooks/use_apply";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";
import { ButtonPrimary } from "../../../../components/button/button";
import { TextEditArea } from "../../../../components/inputField/text_field";
import RoundedText from "../../../../components/rounded_text/rounded_text";
import { ApplyProjectSkeleton } from "../../components/apply_skeleton";

const ApplyProject = () => {
  const applyProject = useApplyProject();
  return (
    <div className="max-w-1100 mx-auto">
      {/* Goback to previous  */}
      <button
        className="transparent w-auto btn-custom-secondary ms-0 p-1 text-black-variant-1"
        onClick={() => {
          applyProject.navigate(-1);
        }}
      >
        <ArrowLeft />
      </button>

      {applyProject.loading && (
        <>
          <div className="text-black-variant-2 position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
            <CustomLoadingSecondary title="loading" />
          </div>
        </>
      )}

      {applyProject.getProjectLoading ? (
        <div>
          <ApplyProjectSkeleton />
          <div className="mb-4"></div>
          <ApplyProjectSkeleton showSkill={false} />
        </div>
      ) : (
        <ApplyProjectDetail applyProject={applyProject} />
      )}
    </div>
  );
};

export default ApplyProject;

const ApplyProjectDetail = ({
  applyProject,
}: {
  applyProject: ApplyProjectType;
}) => {
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
              {applyProject.currentProject.title}
            </h5>
            {/* Description */}
            <p
              className="project-description my-3 text-black-variant-2 font-weight-400"
              style={{
                lineHeight: 1.45,
                letterSpacing: 0.2,
              }}
            >
              {applyProject.currentProject.description}
            </p>
            {/* Budget */}
            <h6 className="project-title my-3 text-capitalize">Budget</h6>
            <h6 className="font-weight-400">
              {applyProject.currentProject?.project_price}
            </h6>
            {/* Fee */}
            <h6 className="my-3 text-capitalize">Platform fee 10%</h6>
            <p className="text-black-variant-2">
              {formatNumber(applyProject.currentProject?.project_price)}
            </p>
            {/* skills */}
            <h6 className="project-title my-3  text-capitalize">
              Skill and Experties
            </h6>
            <div className="d-flex gap-3 flex-wrap my-3">
              {applyProject.currentProject?.skills_required?.map(
                (skill, index) => (
                  <RoundedText text={skill} key={index} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Apply */}
      <div className="bg-white-v-4 border-card rounded mt-4 p-4 text-black-variant-1">
        <div className="">
          {/* heading for posting project */}
          <h5 className={`mb-3`}>Apply</h5>
          <div
            className={`d-flex flex-column 
            justify-content-start gap-3`}
          >
            {/* Project submition data line */}

            {/* Description */}
            <div className={``} style={{ maxWidth: "100%" }}>
              <TextEditArea
                name="description"
                error={applyProject.proposalError}
                onChange={(e) => {
                  applyProject.setproposal(e.target.value);
                }}
                placeholder="Your proposal"
                title="Proposal"
                subtitle="Detail explanation of how you are going work on the project"
                type=""
                value={applyProject.proposal}
              />

              {/* {!projectDetail.description && showError && (
              <span className="text-error text-xsm d-block ps-3">
                {projectError.descrition}
              </span>
            )} */}
            </div>

            {/* Attachment */}
            <div className={`p-2 col-md-6 col`} style={{ maxWidth: "400px" }}>
              <div className="mb-2">
                <h6 className={"font-weight-400"}>Attachment</h6>
                <p className="text-black-variant-2">
                  work samples you have done (if any)
                </p>
              </div>
              <input
                type="file"
                className={`custom-input border-card rounded`}
                name="attachment"
                // onChange={(e) =>
                //   setProjectDetail({
                //     ...projectDetail,
                //     [e.target.name]: e.target.files[0],
                //   })
                // }
              />
            </div>
          </div>
          <div className="mt-3" style={{ maxWidth: "200px" }}>
            <ButtonPrimary
              type="button"
              title="apply"
              className="py-2"
              onClick={() => applyProject.applyProject()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
