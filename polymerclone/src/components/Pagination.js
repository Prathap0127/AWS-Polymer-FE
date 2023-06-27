import React from "react";

const Pagination = ({ page, total, limit, setpage }) => {
  const totalPages = Math.ceil(total / limit);
  const onClick = (newPage) => {
    setpage(newPage + 1);
  };
  return (
    <div className="pagenation">
      {totalPages > 0 &&
        [...Array(totalPages)].map((val, index) => (
          <button
            className={
              page === index + 1 ? "page_button active" : "page_button"
            }
            key={index}
            onClick={() => onClick(index)}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
