import useSupport from "../hook/use_support";
import { Setting, Wallet } from "iconsax-react";
import "./support.css";
const Support = () => {
  const supports = useSupport();
  return (
    <div className="mt-4 max-w-1100 mx-auto px-2">
      <div className=" rounded p-2 d-flex align-items-center justify-content-center">
        <h4 className="ms-4 text-black-variant-1 text-center">
          How can we help you?
        </h4>
      </div>
      {/* links to help */}
      <div className="text-black-variant-1 mt-4">
        <div className="d-flex gap-3 mb-2">
          {" "}
          <Setting /> <h5> Account</h5>
        </div>
        <div className="d-flex flex-column gap-2 bg-white-v-4 border-card rounded mb-4">
          {supports.accountSupport.map((support, index) => (
            <SupportCard
              steps={support.steps}
              title={support.title}
              subtitle={support.subtitle}
              key={index}
            />
          ))}
        </div>
        <div className="d-flex gap-3 mb-2">
          {" "}
          <Wallet variant="Bold" /> <h5> Payment</h5>
        </div>
        <div className="d-flex flex-column gap-2 bg-white-v-4 border-card rounded mb-4">
          {supports.paymentSupport.map((support, index) => (
            <SupportCard
              steps={support.steps}
              title={support.title}
              subtitle={support.subtitle}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;

const SupportCard = ({
  title,
  subtitle,
  steps,
}: {
  title: string;
  subtitle: string;
  steps: string[];
}) => {
  return (
    <div className="p-2 border-light-bottom">
      <div className="support-wrapper position-relative">
        <div
          onClick={(e) => {
            const next = e.currentTarget.nextElementSibling as HTMLElement;
            if (next.style.maxHeight) next.style.maxHeight = "";
            else next.style.maxHeight = next.scrollHeight + 20 + "px";
          }}
        >
          <div className=" d-flex flex-column gap-2 p-1 mt-1 ">
            <h6 className="text-blue"> {title}</h6>
            <h6 className="text-sm font-weight-400 text-black-variant-2">
              {subtitle}
            </h6>
          </div>
        </div>
        <ul
          className="bg-white-variant-4  w-100 text-sm"
          style={{ overflow: "hidden" }}
        >
          {steps.map((step, index) => (
            <li className="" key={index}>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
