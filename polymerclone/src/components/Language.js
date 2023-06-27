import React from "react";

const Language = (languages, filterLanguage, setfilterLanguage) => {
  const onChange = ({ curretTarget: input }) => {
    if (input.checked) {
      const state = [...filterLanguage, input.value];
      setfilterLanguage(state);
    } else {
      const state = filterLanguage.filter((val) => val !== input.value);
      setfilterLanguage(state);
    }
  };
  return (
    <div className="container">
      <div className="row">
        {languages?.map((lang) => {
          <div className="list" key={lang}>
            <input
              className="input"
              type="checkbox"
              value={languages}
              onChange={onChange}
            />
            <p>{lang}</p>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Language;
