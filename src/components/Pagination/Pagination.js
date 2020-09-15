import React, { useContext } from "react";
import { MealsContext } from "../../config";
import "./Pagination.css";

const Pagination = () => {
  const { isHidden, error, loading, handlePagination } = useContext(
    MealsContext
  );
  return (
    <>
      {isHidden && !loading && !error && (
        <div className="pagination">
          <button className="btn" onClick={() => handlePagination("previous")}>
            Prev
          </button>
          <button className="btn" onClick={() => handlePagination("next")}>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
