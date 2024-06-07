import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../../components/button/button";
import TextField from "../../../../components/inputField/text_field";
import DefaultModal from "../../../../components/popup/modal";
import { useDeleteProject } from "../../hooks/client/use_project_staus";

const ProjectDelete = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const deleteProject = useDeleteProject();
  return (
    <DefaultModal
      loading={deleteProject.loading}
      showModal={showModal}
      setShowModal={setShowModal}
      modalId="delete"
    >
      <div className={``}>
        <form
          onSubmit={deleteProject.handleSubmit(deleteProject.deleteProject)}
        >
          <h5>Delete project</h5>
          <div
            className={`d-flex flex-column justify-content-between p-2 gap-2`}
          >
            <TextField
              error={deleteProject.errors.title?.message}
              register={deleteProject.register("title", {
                required: "project title is required",
                pattern: {
                  value: new RegExp(deleteProject.currentProject.title),
                  message: "project title doesn't match",
                },
              })}
              type="text"
              placeholder={deleteProject.currentProject.title}
              name=""
            />

            <div
              className="d-flex gap-4 ms-auto mt-4"
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <ButtonPrimaryOutline
                title="Cancel"
                type="button"
                onClick={() => {
                  setShowModal(false);
                  // changePhone.reset();
                }}
                className="py-2 col"
              />
              <ButtonPrimary
                title="Delete"
                type="submit"
                className="py-2 col bg-danger"
              />
            </div>
          </div>
        </form>
      </div>
    </DefaultModal>
  );
};

export default ProjectDelete;
