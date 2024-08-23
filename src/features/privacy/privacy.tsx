import GITLogo from "../../components/logo/logo";

const PrivacyPage = () => {
  return (
    <div className="bg-white-v-3">
      <header
        className="px-2 bg-white-v-5 text-black-variant-1 py-2 border-light-bottom"
        style={{ height: "70px" }}
      >
        <div className="max-w-1200 mx-auto d-flex align-items-center d-flex align-items-center justify-content-between">
          <GITLogo />
          <div>{/* <User /> */}</div>
        </div>
      </header>
      <div
        className=" text-black-variant-2 max-w-1200 mx-auto pt-4 d-flex flex-column gap-3 mt-4
        border-card rounded p-3
        "
        style={{ maxWidth: "900px" }}
      >
        <div className="border-light-bottom pb-3 mb-3">
          <h4>Privacy Policy</h4>
          <p>Effective Date: August 12, 2024</p>
        </div>

        <div>
          <h5>1. Introduction</h5>
          <p>
            Welcome to GokapinnoTech. We value your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, and share information when you use our
            services.
          </p>
        </div>

        <div>
          <h5>2. Information We Collect</h5>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> This includes your name,
              email address, phone number, and other contact details when you
              create an account or use our services.
            </li>
            <li>
              <strong>Payment Information:</strong> Payment details such as
              credit card information or bank details when you make
              transactions.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              platform, including IP address, browser type, and pages visited.
            </li>
            <li>
              <strong>Communication Data:</strong> Any communication you have
              with us, such as emails or messages through our platform.
            </li>
          </ul>
        </div>

        <div>
          <h5>3. How We Use Your Information</h5>
          <p>Your information is used for the following purposes:</p>
          <ul>
            <li>To provide and improve our services to you.</li>
            <li>To process payments and manage transactions.</li>
            <li>
              To communicate with you about your account, orders, and any
              updates.
            </li>
            <li>To comply with legal obligations and protect our rights.</li>
          </ul>
        </div>

        <div>
          <h5>4. Sharing Your Information</h5>
          <p>We may share your information with:</p>
          <ul>
            <li>
              <strong>Clients and Freelancers:</strong> To facilitate the
              connection and collaboration on projects.
            </li>
            <li>
              <strong>Service Providers:</strong> Third-party companies that
              provide services such as payment processing and data analysis.
            </li>
            <li>
              <strong>Legal Authorities:</strong> When required by law or to
              protect our rights and interests.
            </li>
          </ul>
        </div>

        <div>
          <h5>5. Data Security</h5>
          <p>
            We take reasonable measures to protect your data from unauthorized
            access, loss, or misuse. However, no internet transmission is
            completely secure, so we cannot guarantee absolute security.
          </p>
        </div>
        <div>
          <h5>6. Your Rights</h5>
          <p>You have the following rights regarding your personal data:</p>
          <ul>
            <li>The right to access the information we hold about you.</li>
            <li>
              The right to request corrections to any inaccurate or incomplete
              information.
            </li>
            <li>The right to request deletion of your personal data.</li>
            <li>
              The right to object to or restrict the processing of your data.
            </li>
          </ul>
        </div>

        <div>
          <h5>7. Changes to This Privacy Policy</h5>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and we will notify you of significant
            changes via email or through our platform.
          </p>
        </div>

        <div>
          <h5>8. Contact Us</h5>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p>Email: GIT@gokapinnotech.com</p>
          <p>Phone: +97517570958</p>

          <p>Thank you for trusting GokapinnoTech with your privacy.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
