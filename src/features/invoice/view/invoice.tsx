import { ArrowDown2 } from "iconsax-react";
import "./invoice.css";
import { useState } from "react";
import { ButtonPrimaryOutline } from "../../../components/button/button";
import TransactionDetail from "../components/transaction_detail";

export type TranscationType = {
  project: string;
  date: number;
  amount: number;
  status: string;
  transactionId: string;
};

const Invoice = () => {
  const transactionList = [
    {
      project: "GIT project",
      date: Date.now(),
      amount: 5000,
      status: "success",
      transactionId: "00021",
    },
  ];
  const [detail, setDetail] = useState(transactionList[0]);
  const [showDetail, setShowDetail] = useState(false);
  const transactionDetail = (detail: TranscationType) => {
    setShowDetail(!showDetail);
    setDetail(detail);
  };
  return (
    <div
      className={`text-black-variant-2 px-2 pt-4 px-md-1 mx-auto max-w-1100`}
    >
      <h4 className={`text-center mb-3 font-weight-300`}>Transactions</h4>
      <div>
        <div
          className={`d-flex justify-content-around mx-auto mb-4 gap-4`}
          style={{ maxWidth: "900px" }}
        >
          <div className="invoice-choice position-relative">
            <div
              onClick={(e) => {
                const next = e.currentTarget.nextElementSibling as HTMLElement;
                if (next !== null) {
                  if (next.style.maxHeight) next.style.maxHeight = "";
                  else next.style.maxHeight = next.scrollHeight + 20 + "px";
                }
              }}
            >
              <span className="text-end d-block"> Month</span>
              <div className="border-bottom d-flex justify-content-between p-1 mt-1">
                current <ArrowDown2 className="" />{" "}
              </div>
            </div>
            <ul
              className="bg-white-variant-4   position-absolute w-100 text-black-variant-1"
              style={{ overflow: "hidden" }}
            >
              <li>current</li>
              <li>last</li>
            </ul>
          </div>

          <div className="invoice-choice position-relative">
            <div
              onClick={(e) => {
                const next = e.currentTarget.nextElementSibling as HTMLElement;
                if (next.style.maxHeight) next.style.maxHeight = "";
                else next.style.maxHeight = next.scrollHeight + 20 + "px";
              }}
            >
              <span className="text-end d-block"> Type</span>
              <div className="border-bottom d-flex justify-content-between p-1 mt-1">
                Success <ArrowDown2 className="" />{" "}
              </div>
            </div>
            <ul
              className="bg-white-variant-4  position-absolute w-100"
              style={{ overflow: "hidden" }}
            >
              <li>Success</li>
              <li>Faild</li>
            </ul>
          </div>
        </div>
        {/* Invoice lists  */}
        <div
          className="text-black-variant-1 bg-white-v-4 rounded w-100 border-card"
          style={{ overflow: "auto" }}
        >
          {/* Wrapper for responsiveness */}
          <table className="w-100" style={{ minWidth: "500px" }}>
            <thead>
              <tr className="border-light-bottom">
                <th className="p-2 py-3">Date</th>
                <th className="p-2 py-3">Description</th>
                <th className="p-2 py-3">Status</th>
                <th className="p-2 py-3">Amount</th>
                <th className="p-2 py-3"> </th>
              </tr>
            </thead>
            <tbody>
              {transactionList.length > 0 ? (
                transactionList?.map((transaction, index) => (
                  <tr key={index} className="border-light-bottom">
                    <td className="p-2 py-3" style={{ width: "90px" }}>
                      {new Date(transaction.date).toDateString()} <br />
                      <span> </span>
                    </td>
                    <td className="p-2  py-3" style={{ maxWidth: "100px" }}>
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {transaction.project}
                      </span>
                      <br />
                      <span>payment for {transaction.project}</span>
                    </td>
                    <td className="p-2  py-3">{transaction.status}</td>
                    <td className="p-2  py-3">
                      <span style={{ fontWeight: "500" }}>
                        {"- "}
                        {transaction.amount}
                      </span>{" "}
                      <br /> <span>{"(NU)"}</span>
                    </td>
                    <td className="p-2  py-3">
                      <div style={{ maxWidth: "200px", height: "max-content" }}>
                        <ButtonPrimaryOutline
                          onClick={() => transactionDetail(transaction)}
                          type="button"
                          title="Detail"
                          className="py-2"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-light-bottom">
                  <td className="p-2 py-3"></td>
                  <td className="p-2 py-3">No recored found</td>
                  <td className="p-2 py-3"> </td>
                  <td className="p-2 py-3"> </td>
                </tr>
              )}
            </tbody>
          </table>
          {/*  */}
          <TransactionDetail
            showDetail={showDetail}
            setShowDetail={setShowDetail}
            detail={detail}
          />
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default Invoice;
