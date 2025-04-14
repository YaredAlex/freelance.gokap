import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/auth/auth_context";
import UserProfessionAndSkill from "../../components/onboard/user_profession_skill";
import WhyAndWhere from "../../components/onboard/why_where";
import ResumeAndLanguage from "../../components/onboard/resume_language";
import { useNavigate } from "react-router-dom";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useAxios } from "../../../../hooks/useAxios";
import {
  deleteUserInfo,
  readUserInfo,
  saveUserInfo,
} from "../../../../util/storage";
import UserBio from "../../components/onboard/user_bio";

type UserInfo = {
  profession: string;
  reason: string;
  where: string;
  bio: string;
  skills: string[];
  language: string[];
  resume?: File;
};
const defaultUserInfo: UserInfo = {
  profession: "",
  reason: "",
  where: "",
  bio: "",
  skills: [],
  language: [],
  resume: undefined,
};
export type BoardingPropTypes = {
  setGotoNext: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  userInfo: UserInfo;
  setErrorMessage: (message: string) => void;
  setOnNextValidator: (nextValidator: () => boolean) => void;
};
export const STATUS = {
  DEFAULT: "DEFAULT",
  CHECKED: "CHECKED",
  PENDING: "PENDING",
};
const useOnBoard = () => {
  const authContext = useAuthContext();
  useEffect(() => {
    setPageHistory(() => []);
    const getValidPage = (page: number, info: UserInfo): number => {
      const validators = [
        () => info.reason && info.where,
        () => info.profession && info.skills.length > 0,
        () => info.language.length > 0,
        () => true,
      ];

      for (let i = 0; i < page; i++) {
        if (validators[i]()) {
          setPageHistory((prev) => [...prev, pages[i].Page]);
        } else return i;
      }
      return validators.length - 1;
    };

    const savedInfo = readUserInfo<UserInfo>();
    if (savedInfo) {
      setUserInfo(savedInfo);
      console.log("saved info is ", savedInfo);
    }
    const page = getValidPage(pages.length, savedInfo || defaultUserInfo);
    setCurrentPage(page);
  }, []);

  const [progresState, setProgresState] = useState([
    {
      status: STATUS.PENDING,
      label: "About",
    },
    {
      status: STATUS.DEFAULT,
      label: "Why",
    },
    {
      status: STATUS.DEFAULT,
      label: "Resume",
    },
    {
      status: STATUS.DEFAULT,
      label: "Finish",
    },
  ]);
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const [currentPage, setCurrentPage] = useState(0);
  const [gotoNext, setGotoNext] = useState(false);
  const [error, setError] = useState("");
  const [nextValidator, setNextValidator] = useState<(() => boolean) | null>(
    null
  );
  const [pageHistory, setPageHistory] = useState<JSX.Element[]>([]);
  const headerSubtitles = [
    "let's know more about you",
    "Your skill and profession",
    "Your resume help us to know more",
    "Starting your new journey",
  ];
  const setErrorMessage = (message: string) => {
    setError(message);
  };
  const setOnNextValidator = (nextValidator: () => boolean) => {
    setNextValidator(() => nextValidator);
  };

  const pages = [
    // {
    //   page: (setGotoNext, setUserInfo) => (
    //     <UserPreference setGotoNext={setGotoNext} setUserInfo={setUserInfo} />
    //   ),
    // },

    {
      Page: (
        <WhyAndWhere
          setGotoNext={setGotoNext}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          setErrorMessage={setErrorMessage}
          setOnNextValidator={setOnNextValidator}
        />
      ),
    },

    {
      Page: (
        <UserProfessionAndSkill
          setGotoNext={setGotoNext}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          setErrorMessage={setErrorMessage}
          setOnNextValidator={setOnNextValidator}
        />
      ),
    },

    {
      Page: (
        <ResumeAndLanguage
          setGotoNext={setGotoNext}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          setErrorMessage={setErrorMessage}
          setOnNextValidator={setOnNextValidator}
        />
      ),
    },
    {
      Page: (
        <UserBio
          setGotoNext={setGotoNext}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          setErrorMessage={setErrorMessage}
          setOnNextValidator={setOnNextValidator}
        />
      ),
    },
    // {
    //   Page: (
    //     <UserSummary
    //       setGotoNext={setGotoNext}
    //       setUserInfo={setUserInfo}
    //       userInfo={userInfo}
    //       setErrorMessage={setErrorMessage}
    //       setOnNextValidator={setOnNextValidator}
    //     />
    //   ),
    // },
  ];

  const { sendRequest, loading } = useAxios({
    url: "/api/freelancer/create/",
    method: "POST",
    headers: true,
  });
  const createFreelancer = async () => {
    console.log(userInfo);
    sendRequest(
      {
        user: authContext.user?.id,
        profession: userInfo.profession,
        reason_to_join: userInfo.reason,
        where_did_you_heard: userInfo.where.slice(0, 1),
        bio: userInfo.bio,
        skills: userInfo.skills,
        languages: userInfo.language,
      },
      () => {
        deleteUserInfo();
        customToast({ message: "success", type: "success" });
        navigator(`/agent/dashboard`);
      },
      (error) => {
        console.log(error.response);
        customToast({
          message:
            error.response?.statusText.toString() || "unknown error occured!",
          type: "error",
        });
      }
    );
  };
  const onNextPage = () => {
    if (nextValidator == null) {
      customToast({
        message: "You need to implement nextValidator",
        type: "error",
      });
      return;
    }
    if (!nextValidator()) {
      customToast({ message: error || "Please complete all", type: "error" });
      return;
    }
    if (currentPage === pages.length - 1) {
      saveUserInfo(userInfo);
      createFreelancer();
    } else if (currentPage != pages.length - 1) {
      saveUserInfo(userInfo);
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigator(`?page=${newPage}`, { replace: true });
      const progress = progresState;
      setError("");
      progress[currentPage].status = STATUS.CHECKED;
      if (currentPage + 1 < pages.length)
        progress[currentPage + 1].status = STATUS.PENDING;
      setProgresState(progress);
      pageHistory.push(pages[currentPage].Page);
    }
    setGotoNext(false);
  };
  const onPreviousPage = () => {
    pageHistory.pop();
    const newPage = currentPage - 1;
    navigator(`?page=${newPage}`, { replace: true });
    setCurrentPage(newPage);

    const progress = progresState;
    progress[currentPage - 1].status = STATUS.PENDING;
  };

  return {
    onPreviousPage,
    onNextPage,
    headerSubtitles,
    loading,
    setUserInfo,
    pages,
    currentPage,
    setCurrentPage,
    setGotoNext,
    gotoNext,
    progresState,
    pageHistory,
    setPageHistory,
  };
};

export default useOnBoard;
