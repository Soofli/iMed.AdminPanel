import AppContext from "@ctx/AppContext";
import axios from "axios";
import LoadingSmall from "plugins/Loading/LoadingSmall";
import DeleteVideoFromUpload from "plugins/Modals/DeleteVideoFromUpload";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UploadVideo = () => {
  const [StringBaseFile, setStringBaseFile] = useState("");
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const context = useContext(AppContext);
  const dataVideo = context.state.dataVideo;

  const uploadVideo = (e) => {
    const file = e.target.files[0];
    setStringBaseFile(file);
  };

  const SendVideoUload = async () => {
    setLoadingSmall(true);
    const formData = new FormData();
    formData.append("file", StringBaseFile);
    for (var pair of formData.entries()) {
    }

    const header = {
      headers: {
        " Content-Type": "multipart/form-data",
        Authorization: "Bearer" + " " + localStorage.getItem("token"),
      },
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/file/uploadvideo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },

        onUploadProgress: (e) => {
          const percentCompleted = Math.round((e.loaded * 100) / e.total);

          setLoaded(percentCompleted);
        },
      })
      .then(function () {
        setLoadingSmall(false);

        context.GetVideos();
        toast.success("  ویدئو با موفقیت آپلود شد ", {
          position: "bottom-right",
          closeOnClick: true,
        });
      })
      .catch(function () {
        setLoadingSmall(false);
        toast.error("  مشکلی وجود داره ", {
          position: "bottom-right",
          closeOnClick: true,
        });
      });
  };

  useEffect(() => {
    context.GetVideos();
  }, []);

  return (
    <div className="col-lg-12">
      <div className="row">
        <div className="col-lg-4 mt-4">
          <div className="bg-white border    border-r30 shadow-sm w-100 over-hidden">
            <div className="position-relative">
              <div className="w-100">
                <p className="mb-0 white p-3 font-weight-bold text-center bg-dark">
                  آپلود ویدئو
                </p>

                <div className="p-3">
                  <div className="form-group my-3 text-right  ">
                    <label className=" px-2 font-s14">آپلود فایل : </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        uploadVideo(e);
                      }}
                      accept="video/*"
                    />

                    <button
                      className="btn btn-success w-100 mb-2 mt-5"
                      onClick={() => SendVideoUload()}
                    >
                      {" "}
                      {loadingSmall ? <div>{loaded}%</div> : "    ارسال"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 mb-5">
          <div className="w-fit border-b-2 d-flex pb-2 mt-5 mb-3 ">
            <h1 className="mb-0 font-s16">لیست فایل ها</h1>
          </div>

          {dataVideo && dataVideo.length <= 0 ? (
            <table className="table">
              <thead>
                <tr className="table-active">
                  <th className="w-0 text-center"> ویدئویی وجود ندارد</th>
                </tr>
              </thead>
            </table>
          ) : (
            <div className="table-responsive-sm">
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th className="w-0 text-center">#</th>
                    <th className="w-90 text-center font-s15"> لیست ویدئوها</th>

                    <th className="w-10 text-center font-s15">وضعیت</th>
                  </tr>
                </thead>
                {dataVideo.map((e, index) => (
                  <>
                    {" "}
                    <tbody className="text-center" key={index}>
                      <tr className="">
                        <th scope="row">{index + 1}</th>
                        <td className="font-s14 ">{e.name}</td>

                        <td className="font-s14">
                          <DeleteVideoFromUpload name={e.name} />
                        </td>
                      </tr>
                    </tbody>
                  </>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
