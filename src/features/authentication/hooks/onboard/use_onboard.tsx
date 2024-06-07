import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/auth/auth_context";
import UserProfessionAndSkill from "../../components/onboard/user_profession_skill";
import WhyAndWhere from "../../components/onboard/why_where";
import ResumeAndLanguage from "../../components/onboard/resume_language";
import UserSummary from "../../components/onboard/user_bio";
import { useNavigate } from "react-router-dom";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useAxios } from "../../../../hooks/useAxios";

type UserInfo = {
  profession: string;
  reason: string;
  where: string;
  bio: string;
  skills: string[];
  language: string[];
};

export type BoardingPropTypes = {
  setGotoNext: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};
export const STATUS = {
  DEFAULT: "DEFAULT",
  CHECKED: "CHECKED",
  PENDING: "PENDING",
};
const useOnBoard = () => {
  const authContext = useAuthContext();
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
  const [userInfo, setUserInfo] = useState<UserInfo>({
    profession: "",
    reason: "",
    where: "",
    bio: "",
    skills: [],
    language: [],
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [gotoNext, setGotoNext] = useState(false);
  const headerSubtitles = [
    // "let's know more about you",
    "Your skill and profession",
    "Your legacy",
    "Your resume help us to know more",
    "Starting your new journey",
  ];
  const pages = [
    // {
    //   page: (setGotoNext, setUserInfo) => (
    //     <UserPreference setGotoNext={setGotoNext} setUserInfo={setUserInfo} />
    //   ),
    // },
    {
      Page: UserProfessionAndSkill,
    },
    {
      Page: WhyAndWhere,
    },
    {
      Page: ResumeAndLanguage,
    },
    {
      Page: UserSummary,
    },
  ];

  useEffect(() => {
    console.log(authContext.user);
    console.log(pages[currentPage]);
  }, []);

  const { sendRequest, loading } = useAxios({
    url: "/api/user/freelancer/",
    method: "POST",
    headers: true,
  });
  const createFreelancer = async () => {
    sendRequest(
      {
        user: authContext.user.id,
        profession: userInfo.profession,
        reason_to_join: userInfo.reason,
        where_did_you_heard: userInfo.where.slice(0, 1),
        bio: userInfo.bio,
        skills: userInfo.skills,
        languages: Object.keys(userInfo.language[0]),
      },
      (res) => {
        console.log(res);
        customToast({ message: "success", type: "success" });
        setTimeout(() => {
          navigator(`/agent/dashboard`);
        }, 1000);
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
    console.log("user info ==> ", userInfo);
    if (!gotoNext) {
      customToast({ message: "please compelet all", type: "error" });
    }
    if (gotoNext && currentPage == pages.length - 1) {
      createFreelancer();
    } else if (gotoNext && currentPage != pages.length - 1) {
      setCurrentPage((c) => c + 1);
      const progress = progresState;
      progress[currentPage].status = STATUS.CHECKED;
      if (currentPage + 1 < pages.length)
        progress[currentPage + 1].status = STATUS.PENDING;
      setProgresState(progress);
    }
    setGotoNext(false);
  };
  const onPreviousPage = () => {
    setCurrentPage((c) => c - 1);
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
  };
};

export default useOnBoard;
