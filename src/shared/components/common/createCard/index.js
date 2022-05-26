import React from "react";
import CreateBlogModal from "../../modals/createBlog";
import "./style.css";
const CreateCard = ({ openModal, hideModal, open, txt }) => {
  return (
    <>
      <div
        className="card flex-row px-3 py-4 align-items-center rounded login-card-container w-100"
        data-aos="fade-up"
        data-aos-duration="550"
      >
        <div
          className="w-100 ms-2 p-2 post-create-input-field ps-3 d-flex align-items-center"
          role="button"
          disabled
          onClick={openModal}
        >
          <span className="create-card-span">{txt}</span>
        </div>
      </div>
      <CreateBlogModal show={open} hide={hideModal} />
    </>
  );
};

export default CreateCard;
