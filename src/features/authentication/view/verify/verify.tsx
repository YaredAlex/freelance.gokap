import { Link } from "react-router-dom";
import verifyImg from "../../../../assets/img/verify_user.png";
import verifiedImg from "../../../../assets/img/verified_user.png";
import useVerify from "../../hooks/verify/verify_hook";
import { ButtonPrimary } from "../../../../components/button/button";
import AuthLayout from "../../auth_layout";

const VerifyUser = () => {
  const verify = useVerify();
  return (
    <AuthLayout loading={verify.loading} signlayout={false}>
      <div
        style={{
          background: "var(--light-green)",
        }}
        className="d-flex 
      align-items-center justify-content-center
      "
      >
        <div className="text-black-variant-1 bg-white-v-4 rounded p-3">
          {verify.verified ? (
            <>
              <div
                style={{
                  maxWidth: "400px",
                  maxHeight: "400px",
                }}
                className="mb-4"
              >
                <img src={verifyImg} height={"100%"} width={"100%"} />
              </div>
              <div style={{ maxWidth: "300px" }} className="mx-auto">
                <h2 className="font-weight-400 text-center">
                  Verify Your Email
                </h2>
                <p className="text-center">
                  please check you mailbox we have sent a verification link to{" "}
                  <strong className="text-underline">{verify.email}</strong>
                </p>
                <Link
                  className="btn-custom 
              font-weight-400
              green-varient-2
              green-varient-2-hover
              height-xsm
              mb-2
              mt-3
              text-md
              text-capitalize
              "
                  to={"/signin"}
                >
                  Signin
                </Link>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  maxWidth: "400px",
                  maxHeight: "400px",
                }}
                className="mb-4"
              >
                <img src={verifiedImg} height={"100%"} width={"100%"} />
              </div>
              <div style={{ maxWidth: "300px" }} className="mx-auto">
                <h2 className="font-weight-400 text-center">
                  Verify Your Email
                </h2>
                <p className="text-center">
                  you are almost there to get started. Please enter you email
                  and click verify button
                </p>
              </div>
              <form
                onSubmit={verify.sendVerification}
                className="mx-auto mt-4"
                style={{
                  maxWidth: "300px",
                }}
              >
                <input
                  placeholder="email address"
                  className="custom-input border rounded"
                  defaultValue={verify.email}
                  onChange={(e) => verify.setEmail(e.target.value)}
                />

                <ButtonPrimary type="submit" title="Verify" className="mt-4" />
              </form>
            </>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyUser;
