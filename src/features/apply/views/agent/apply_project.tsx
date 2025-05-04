import React from "react";
import { ArrowLeft, Medal, Money, WalletMinus } from "iconsax-react";
import useApplyProject, { ApplyProjectType } from "../../hooks/use_apply";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";
import { ButtonPrimary } from "../../../../components/button/button";
import { TextEditArea } from "../../../../components/inputField/text_field";
import RoundedText from "../../../../components/rounded_text/rounded_text";
import { ApplyProjectSkeleton } from "../../components/apply_skeleton";
import { toLocalDate } from "../../../../util/project_data_parser";

const ApplyProject = () => {
  const applyProject = useApplyProject();
  return (
    <div className="max-w-1100 mx-auto position-relative">
      {/* Goback to previous  */}
      <button
        className="transparent w-auto btn-custom-secondary ms-0 p-1 text-black-variant-1"
        onClick={() => {
          applyProject.navigate(-1);
        }}
      >
        <ArrowLeft />
      </button>
      {/* loading when applying project */}
      {applyProject.loading && (
        <>
          <div
            className="text-black-variant-2 max-w-1100 mx-auto w-100 position-fixed d-flex justify-content-center align-items-center"
            style={{ height: "100vh", top: "0" }}
          >
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
            <h6 className="">{applyProject.currentProject.title}</h6>
            <div className="d-flex gap-4 align-items-center my-3">
              <RoundedText
                text={"Category"}
                showIcon={false}
                bgColor={"gray"}
              />{" "}
              <p className="font-weight-300 ">
                Posted {toLocalDate(applyProject.currentProject.created_at)}
              </p>
            </div>
            <p
              className="project-description my-3 text-black-variant-2 font-weight-400"
              style={{
                lineHeight: 1.45,
                letterSpacing: 0.2,
              }}
            >
              {applyProject.currentProject.description}
            </p>
          </div>
          {/* right side  */}
          <div className="col-3 d-flex flex-column gap-3">
            {/* Experiance level */}
            <ApplyListTile
              icon={<Medal />}
              title={"Intermediate"}
              subtitle="Experiance Level"
            />
            <ApplyListTile
              icon={<WalletMinus />}
              title={"10%"}
              subtitle="Platform Fee"
            />
            <ApplyListTile
              icon={<Money />}
              title={netPayment(applyProject.currentProject.project_price)}
              subtitle="Payment"
            />
          </div>
        </div>
        <hr />
        <div className="d-flex flex-column gap-2">
          <h6 className="project-title text-capitalize">Skill and Experties</h6>
          <div className="d-flex gap-3 flex-wrap mt-3">
            {applyProject.currentProject?.skills_required?.map(
              (skill, index) => (
                <RoundedText text={skill} key={index} />
              )
            )}
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

const ApplyListTile = ({
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
