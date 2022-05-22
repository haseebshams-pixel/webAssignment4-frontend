import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../shared/components/common/header";
import CreateCard from "../../shared/components/common/createCard";
import BlogCard from "../../shared/components/common/blogCard";
import Pagination from "../../shared/components/common/pagination";
import { Spinner } from "react-bootstrap";
const Feed = () => {
  const { user } = useSelector((state) => state.root);
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const hideModal = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const fetchPosts = async () => {
    setLoading(true);
    axios
      .get("blogs/")
      .then((res) => {
        if (res.statusText === "OK") {
          setPosts(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div className="container " data-aos="fade-up" data-aos-duration="350">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 justify-content-center d-flex flex-column align-items-center">
            {user?.isLoggedIn && (
              <>
                <CreateCard
                  openModal={openModal}
                  hideModal={hideModal}
                  open={open}
                  txt="start a blog"
                />
                <hr className="w-100" />
              </>
            )}
            {loading ? (
              <Spinner animation="grow" size="xl" />
            ) : (
              currentPosts?.map((item, index) => {
                return <BlogCard item={item} key={index} />;
              })
            )}
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>

      <div className="space" />
    </>
  );
};

export default Feed;
