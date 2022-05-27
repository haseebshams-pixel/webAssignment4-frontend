import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import FeatherIcon from "feather-icons-react";
import moment from "moment";
import "./style.css";
import PhotoBaseURL from "../../../utils/photoBaseURL";
import { toastMessage } from "../toast";
import EditBlogModal from "../../modals/editBlog";

function BlogCard({ item, fetchPosts }) {
  const { user } = useSelector((state) => state.root);
  const [postUser, setUser] = useState();
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const getUser = async () => {
    axios
      .get(`users/${item?.postedBy}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setUser(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onDelete = async () => {
    axios
      .delete(`blogs/${item?._id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          toastMessage("Deleted Successfuly", "success");
          fetchPosts();
        }
      })
      .catch((error) => {
        toastMessage("Delete unSuccessfull", "error");
        console.log(error);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className="card-container w-100"
      data-aos="fade-up"
      data-aos-duration="650"
    >
      <Card className="card-main-container">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <Card.Title className="d-flex align-items-center m-0">
                <span className="mb-1">
                  {postUser?.firstname} {postUser?.lastname}
                </span>
              </Card.Title>
              <Card.Subtitle className="text-muted">
                {moment(item?.date).fromNow()}
              </Card.Subtitle>
            </div>
            {user?.user?.id === postUser?.id && (
              <div className="d-flex">
                <FeatherIcon
                  icon="edit-2"
                  size="20"
                  role="button"
                  onClick={openModal}
                />
                <FeatherIcon
                  icon="trash"
                  size="20"
                  className="ms-2"
                  role="button"
                  onClick={onDelete}
                />
              </div>
            )}
          </div>
          <Card.Text>{item?.text}</Card.Text>
          {item?.images.length > 0 && (
            <Carousel className="carosal">
              {item?.images?.map((picture, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      className="carosal-image"
                      src={`${PhotoBaseURL}${picture}`}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          )}
        </Card.Body>
      </Card>
      <EditBlogModal
        show={open}
        hide={closeModal}
        item={item}
        fetchPosts={fetchPosts}
      />
    </div>
  );
}

export default BlogCard;
