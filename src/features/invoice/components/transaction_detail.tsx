import CircularAvatar from "../../../components/circularAvatar/circular_avatar";
import { useAuthContext } from "../../../context/auth/auth_context";
import { TranscationType } from "../view/invoice";
import DefaultModal from "../../../components/popup/modal";
import RoundedText from "../../../components/rounded_text/rounded_text";

const TransactionDetail = ({
  detail,
  showDetail,
  setShowDetail,
}: {
  detail: TranscationType;
  showDetail: boolean;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const authContext = useAuthContext();
  return (
    <DefaultModal
      loading={false}
      showModal={showDetail}
      setShowModal={setShowDetail}
      modalId="address"
    >
      <div className="border-green-variant-3 rounded col-5 d-none flex-column align-items-center p-1 pb-3 d-md-flex w-100">
        <CircularAvatar
          size={60}
          bgcolor={"#00bc5a"}
          className={"mt-2"}
          text={authContext?.user?.firstname.slice(0, 2)}
        />
        <p className="m-0 my-2">
          Paid for <span className="font-weight-500">{detail.project}</span>
        </p>
        <h2 className="font-weight-300">{detail.amount}</h2>
        <p className="m-0">{new Date(detail.date).toDateString()}</p>
        <div className="w-100 px-4 mt-3">
          <div className="d-flex justify-content-between mb-3">
            <p className="">Amount Paid</p> <p>{detail.amount}</p>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <p>Transaction Id</p> <p>{detail.transactionId}</p>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <p>Status</p> <RoundedText text={detail.status} />
          </div>
        </div>
      </div>
    </DefaultModal>
  );
};

export default TransactionDetail;
