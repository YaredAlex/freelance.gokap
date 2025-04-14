import DefaultModal from "../../../components/popup/modal";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../components/button/button";
import { useEffect, useState } from "react";
import { AgentProfileProp } from "../hooks/agent/use_agent_profile";
import SelectSearchOptions from "../../../components/select_options/select_option";
import { Languages } from "../../../util/constant/language_constant";
import { maxLanguage, minLanguage } from "../../../util/constant/constant";
import { languageRequired } from "../../../util/string_constants";

const ChangeLanguage = ({ profile }: { profile: AgentProfileProp }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [languages, setLanguages] = useState(profile.languages || []);
  useEffect(() => {
    setLanguages(profile.languages || []);
  }, [profile.languages]);

  useEffect(() => {
    isValid();
  }, [languages]);

  const isValid = () => {
    if (languages.length >= minLanguage) {
      setErrors("");
      return true;
    } else {
      setErrors(languageRequired);
    }
    return false;
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid()) return;
    setLoading(true);
    profile.singleUpdate({ languages });
    profile.setShowEditLanguage(false);
    setLoading(false);
  };

  const onSelectItem = (item: string) => {
    if (maxLanguage && languages.length >= maxLanguage) {
      return;
    }
    setLanguages([...languages, item]);
  };
  const onRemoveItem = (item: string) => {
    setLanguages(() => languages.filter((i) => i !== item));
  };
  const onCancel = () => {
    setLanguages(profile.languages || []);
    profile.setShowEditLanguage(false);
  };
  return (
    <DefaultModal
      loading={loading}
      showModal={profile.showEditLanguage}
      setShowModal={profile.setShowEditLanguage}
      modalId="language"
    >
      <div className={``}>
        <form onSubmit={onSubmit}>
          <h5>Update Your About</h5>
          <div
            className={`d-flex flex-column justify-content-between p-2 gap-2`}
          >
            <div className="language-select-wrapper">
              <SelectSearchOptions
                error={errors}
                showTitle={false}
                selectedOption={languages}
                setSelectOption={setLanguages}
                onSelectItem={onSelectItem}
                onRemoveItem={onRemoveItem}
                optionList={Languages.map((lang) => ({ name: lang.name }))}
                placeholder="Select Language"
              />
            </div>
            <div
              className="d-flex gap-4 ms-auto mt-4"
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <ButtonPrimaryOutline
                title="Cancel"
                type="button"
                onClick={onCancel}
                className="py-2 col"
              />
              <ButtonPrimary
                title="Change"
                type="submit"
                className="py-2 col"
              />
            </div>
          </div>
        </form>
      </div>
    </DefaultModal>
  );
};

export default ChangeLanguage;
