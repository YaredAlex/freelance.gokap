import { useEffect } from "react";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../../components/button/button";
import TextField, {
  TextArea,
} from "../../../../components/inputField/text_field";
import DefaultModal from "../../../../components/popup/modal";
import { UseManageUserProps } from "../../hooks/use_manage_user";
import { useSendEmail } from "../../hooks/use_send_email";

const SendEmailModal = ({ manageUser }: { manageUser: UseManageUserProps }) => {
  const sendEmail = useSendEmail();
  useEffect(() => {
    sendEmail.setUserEmail(manageUser.user.email);
  }, [manageUser.user.email]);
  return (
    <DefaultModal
      loading={sendEmail.loading}
      showModal={manageUser.showSendEmail}
      setShowModal={manageUser.setShowSendEmail}
      modalId="_send_email"
    >
      <div className={``}>
        <h5>Send Email</h5>
        <form onSubmit={sendEmail.handleSubmit(sendEmail.sendEmail)}>
          <div
            className={`d-flex flex-column justify-content-between p-2 gap-2`}
          >
            <TextField
              error={sendEmail.errors.subject?.message}
              register={sendEmail.register("subject", {
                required: "subject is required",
                minLength: {
                  value: 10,
                  message: "minimum length should be 10",
                },
              })}
              type="text"
              placeholder="Subject"
            />
            <TextArea
              error={sendEmail.errors.body?.message}
              register={sendEmail.register("body", {
                required: "body is required",
                minLength: {
                  value: 10,
                  message: "minimum length should be 10",
                },
              })}
              type="text"
              placeholder="Body"
            />

            <div
              className="d-flex gap-4 ms-auto mt-4"
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <ButtonPrimaryOutline
                title="Cancel"
                type="button"
                onClick={() => {
                  manageUser.setShowSendEmail(false);
                  sendEmail.reset();
                }}
                className="py-2 col"
              />
              <ButtonPrimary
                title="Send"
                type="submit"
                className="py-2 col button-success"
              />
            </div>
          </div>
        </form>
      </div>
    </DefaultModal>
  );
};

export default SendEmailModal;
