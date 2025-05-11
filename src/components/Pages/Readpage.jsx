import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Readpage = () => {
  const { id } = useParams();
  const [novels, setNovels] = useState([]);
  const [bookName, setBookName] = useState("Selected Book");
  const [bookImage, setBookImage] = useState("Selected Image");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [charPerPage, setCharPerPage] = useState(3200); // Characters per page

  const fetchNovels = async () => {
    try {
      const res = await axios.get(`https://novelwebfrontend.onrender.com/api/novels/read/${id}`);
      const fetchdata = res.data.data;
      setNovels(fetchdata);

      if (fetchdata.length > 0 && fetchdata[0].Book) {
        setBookName(fetchdata[0].Book.title);
        setBookImage(fetchdata[0].Book.image);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNovels();
    window.scrollTo(0, 0);
  }, [id]);

  const cleanMessageText = (message) => {
    const noHtml = message.replace(/<[^>]*>/g, '');
    const cleaned = noHtml.replace(/Chapter:\s*\d+/gi, '');
    return cleaned;
  };

  const paginateMessage = (message) => {
    const clean = cleanMessageText(message);
    const indexOfLastChar = currentPage * charPerPage;
    const indexOfFirstChar = indexOfLastChar - charPerPage;
    return clean.slice(indexOfFirstChar, indexOfLastChar);
  };

  const isNextDisabled = (message) => {
    const clean = cleanMessageText(message);
    const indexOfLastChar = currentPage * charPerPage;
    return indexOfLastChar >= clean.length;
  };

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handleBack = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const novel = novels[0];

  return (
    <div className="container mt-5">
      <Link to={`/books`} className="btn btn-secondary mb-3">
        ← Back to Books
      </Link>
      <h2 className="text-center fw-bold mb-4">{bookName}</h2>

      {novel ? (
        <div className="card h-100 text-center p-3 border-0 shadow-sm">
          <div className="d-flex justify-content-center">
            <img
              src={bookImage}
              alt={bookName}
              className="img-fluid rounded"
              style={{
                maxHeight: "300px",
                width: "auto",
                objectFit: "cover",
                marginBottom: "20px",
              }}
            />
          </div>
          <div className="card-body px-0">
            <h6 className="fw-bold">{bookName}</h6>
            <p className="text-muted mb-2">
              <i className="fw-bold">Page:</i> {currentPage}
            </p>
            <div className="message text-start px-2">
              <p
                className="text-muted mb-3"
                style={{
                  height: "500px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {paginateMessage(novel.message)}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  onClick={handleBack}
                  className="btn btn-sm btn-outline-primary"
                  disabled={currentPage === 1}
                >
                  Back
                </button>
                <span className="text-muted">
                  {currentPage} of{" "}
                  {Math.ceil(cleanMessageText(novel.message).length / charPerPage)}
                </span>
                <button
                  onClick={handleNext}
                  className="btn btn-sm btn-outline-primary"
                  disabled={isNextDisabled(novel.message)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted">No chapters found.</p>
      )}
    </div>
  );
};

export default Readpage;
