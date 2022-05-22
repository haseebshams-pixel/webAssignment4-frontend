import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import moment from "moment";
import "./style.css";
import PhotoBaseURL from "../../../utils/photoBaseURL";

function BlogCard({ item }) {
  const [user, setUser] = useState();
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
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="card-container" data-aos="fade-up" data-aos-duration="650">
      <Card className="card-main-container">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <Card.Title className="d-flex align-items-center m-0">
              <img
                src={require("../../../../assets/images/profilePlaceholder.png")}
                className="profile-pic"
                alt="profile-pic"
              />
              <span className="ms-2">
                {user?.firstname} {user?.lastname}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted">
              {moment(item?.date).fromNow()}
            </Card.Subtitle>
          </div>
          <Card.Text>{item?.text}</Card.Text>
          <Carousel className="carosal">
            {item?.images?.map((picture, index) => {
              return (
                <Carousel.Item>
                  <img
                    className="carosal-image"
                    src={`${PhotoBaseURL}${picture}`}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BlogCard;
