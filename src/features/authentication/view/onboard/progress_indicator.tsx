import CircularCheck from "../../../../components/check/circular_check";

type ProgressIndicatorProp = {
  numberOfProgress: number;
  progress: {
    status: string;
    label: string;
  }[];
};
const ProgressIndicator = ({
  numberOfProgress,
  progress,
}: ProgressIndicatorProp) => {
  return (
    <>
      <div className="d-flex gap-1 gap-md-3 align-items-center">
        {progress.map((item, index) => (
          <div key={index} className="d-flex gap-1 gap-md-3 align-items-center">
            <CircularCheck
              key={item.label}
              status={item.status}
              label={item.label}
              checkColor={"white"}
            />

            {index !== numberOfProgress - 1 && (
              <span className="bg-green-primary dash-line" key={index} />
            )}
          </div>
        ))}
      </div>
    </>
  );
  //   return (
  //     <div className="d-flex gap-1 gap-md-3 align-items-center">
  //       <CircularCheck
  //         status={STATUS.PENDING}
  //         label={"First step"}
  //         checkColor={"white"}
  //       />
  //       <span className="bg-green-primary dash-line" />
  //       <CircularCheck
  //         status={STATUS.DEFAULT}
  //         label={"About"}
  //         checkColor={"white"}
  //       />
  //       <span className="bg-green-primary dash-line" />
  //       <CircularCheck
  //         status={STATUS.DEFAULT}
  //         label={"finish"}
  //         checkColor={"white"}
  //       />
  //     </div>
  //   );
};

export default ProgressIndicator;
