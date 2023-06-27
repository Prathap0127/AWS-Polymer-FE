import React from "react";

const Sort = ({ sort, setSort }) => {
  const onSelectChange = ({ currentTarget: input }) => {
    setSort({ sort: input.value, order: sort.order });
  };
  const onArrowChange = () => {
    if (sort.order === "asc") {
      setSort({ sort: sort.sort, order: "desc" });
    } else {
      setSort({ sort: sort.sort, order: "asc" });
    }
  };
  return (
    <div className="sorting">
      <p className="sort_by">Sort By:</p>
      <select
        className="select"
        defaultValue={sort.sort}
        onChange={onSelectChange}
      >
        <option value="created_at">created at</option>
      </select>
      <button className="arrow_btn" onClick={onArrowChange}>
        <p className="up_arrow">&uarr;</p>
        <p className="down_arrow">&darr;</p>
      </button>
    </div>
  );
};

export default Sort;
