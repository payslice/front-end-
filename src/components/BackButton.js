import React from "react";
import { useHistory } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

export const BackButton = () => {
  const history = useHistory();
  return (
    <>
      <div className="flex my-4" onClick={() => history.goBack()}>
        <BsChevronLeft size="16px" className="my-auto mr-2" />
        <div className="text-normal">Go back</div>
      </div>
    </>
  );
};
