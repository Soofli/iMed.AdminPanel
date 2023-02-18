import AppContext from "@ctx/AppContext";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";

const AddVideoCourseModal = ({ dataVideo }) => {
  const [show, setShow] = useState(false);
  const [nameVideo, setNameVideo] = useState("");
  const [timeVideo, setTimeVideo] = useState("");
  const [activeVideo, setActiveVideo] = useState(-1);
  const [activeVideoName, setActiveVideoName] = useState("");
  const [activeVideoLocation, setActiveVideoLocation] = useState("");
  const [isFree, setIsFree] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const context = useContext(AppContext);

  const activeVideoSelect = (index, location, name) => {
    setActiveVideo(index);
    setActiveVideoName(name);
    setActiveVideoLocation(location);
  };

  const sendDataVideo = () => {
    context.setActiveVideoCourse([
      ...context.state.activeVideoCourse,
      {
        name: nameVideo,
        videoTime: timeVideo,
        fileLocation: activeVideoLocation,
        fileName: activeVideoName,
        row: context.state.activeVideoCourse.length + 1,
        isFree: isFree,
      },
    ]);
    setTimeout(() => {}, 1000);
  };

  return (
    <>
      <button
        className="btn btn-info my-3 font-s15"
        onClick={() => handleShow()}
      >
        اضافه کردن ویدئو
        <FontAwesomeIcon icon={faPlus} className="mx-2" />
      </button>

      <Modal show={show} onHide={handleClose} size="xl">
        <div className="text-center my-4">
          <h1 className="mb-0 font-s16 font-weight-bold ">
            .ویدئو مورد نظر خود برای افزودن به دوره را انتخاب و سپس پس از ثبت
            "نام ویدئو" و "زمان ویدئو" بر روی دکمه "ثبت ویدئو" کلیک نمایید
          </h1>
        </div>
        <div className="container my-3">
          <div className="row">
            {dataVideo.map((e, index) => (
              <>
                {" "}
                <div className="col-lg-3 my-3">
                  <div
                    className={` border text-center border-r10 shadow-sm overflow-hidden pointer cover-course tr03 ${
                      activeVideo == index ? "cover-course-active" : ""
                    }`}
                    onClick={() => activeVideoSelect(index, e.location, e.name)}
                  >
                    <p className="mb-0 p-2 font-s13 font-weight-bold ">
                      {e.name}
                    </p>
                  </div>

                  {activeVideo == index ? (
                    <>
                      {" "}
                      <div className="form-group text-right my-2">
                        <label className=" px-2 font-s11"> نام ویدئو </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          onChange={(e) => setNameVideo(e.target.value)}
                        />
                      </div>
                      <div className="form-group text-right my-2">
                        <label className=" px-2 font-s11">
                          {" "}
                          زمان ویدئو (به دقیقه)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="time"
                          onChange={(e) => setTimeVideo(e.target.value)}
                        />
                      </div>
                      <div className="text-right flex justify-center mt-3">
                        <label className=" px-2 font-s11">
                          {" "}
                          این ویدیو رایگان است{" "}
                        </label>{" "}
                        <div className="topping">
                          <input
                            type="checkbox"
                            id="topping"
                            name="topping"
                            value="Paneer"
                            onChange={(e) => setIsFree(e.target.checked)}
                            style={{ transform: "scale(1.3)" }}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="bg-light p-3 text-center">
          <div className="d-flex justify-content-end">
            <div className="mx-2">
              <button
                className="px-4 btn btn-danger"
                onClick={() => handleClose()}
              >
                لغو
              </button>
            </div>
            <div className="mx-2">
              <button
                className="px-4 btn btn-success"
                onClick={() => sendDataVideo() + handleClose()}
              >
                ثبت ویدئو
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddVideoCourseModal;
