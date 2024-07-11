import UseForgetPass from "../../hooks/forget_pass/forget_pass_hook";
import AuthLayout from "../../auth_layout";
import { ButtonPrimary } from "../../../../components/button/button";

const ResetPassword = () => {
  const forgetPass = UseForgetPass();
  return (
    <AuthLayout loading={forgetPass.loading} signlayout={false}>
      <div
        className="d-flex 
      align-items-center justify-content-center
      "
      >
        {" "}
        <div className="text-black-variant-1 bg-white-v-4 rounded p-3 border-card">
          <>
            <div
              style={{
                maxWidth: "400px",
                maxHeight: "400px",
              }}
              className="mb-4"
            >
              {/* <img src="/assets/verify_user.png" height={"100%"} width={"100%"} /> */}
            </div>
            <div style={{ maxWidth: "300px" }} className="mx-auto">
              <h2 className="font-weight-400 text-center">
                Forgot Your Password
              </h2>
              {forgetPass.linkSent ? (
                ""
              ) : (
                <p className="text-center">
                  Please enter you email address. You will recieve a resetlink
                  to create new password
                </p>
              )}
            </div>
            <div>
              {forgetPass.linkSent ? (
                <p style={{ maxWidth: "300px", textAlign: "center" }}>
                  We have sent reset link to{" "}
                  <strong>{forgetPass.email} </strong>
                  please check you mailbox
                </p>
              ) : (
                <form
                  onSubmit={forgetPass.sendLink}
                  className="mx-auto mt-4"
                  style={{
                    maxWidth: "300px",
                  }}
                >
                  <input
                    placeholder="email address"
                    className="custom-input border rounded"
                    onChange={(e) => forgetPass.setEmail(e.target.value)}
                  />

                  <ButtonPrimary
                    type="submit"
                    title="Request reset link"
                    className="mt-4"
                  />
                </form>
              )}
            </div>
          </>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
