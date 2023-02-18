import AppContext from "@ctx/AppContext";
import { useRouter } from "next/router";
import Chapar from "plugins/Chapar";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import Editor from "../../Editor";
import AddFileCourse from "./Component";
import SimpleReactValidator from "simple-react-validator";

const NewCourseContent = () => {
  const [submited, setSubmited] = useState(false);

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی میباشد",
      },
      element: (message) => (
        <>
          <div className="text-right px-1">
            <small className="text-danger t-ig-small ">{message}</small>
          </div>
        </>
      ),
    })
  );

  const router = useRouter();
  const idQuery = router.query.id;

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [Name, setName] = useState("");
  const [Detail, setDetail] = useState("");
  const [Teacher, setTeacher] = useState("");
  const [Reference, setReference] = useState("");
  const [IsSuggested, setIsSuggested] = useState(false);
  const [IsFree, setIsFree] = useState(false);
  const [Price, setPrice] = useState("0");
  const [CourseCategoryId, setCourseCategoryId] = useState(null);
  const [editTime, setEditTime] = useState(false);
  const [disablePrice, setDisablePrice] = useState(true);
  const [, forceUpdate] = useState();

  const context = useContext(AppContext);
  const dataCategory = context.state.dataCategory;
  const activeCoverCourseEditTime = context.state.activeCoverCourseEditTime;
  const activeHandOutCourse = context.state.activeHandOutCourse;
  const activeVideoCourse = context.state.activeVideoCourse;
  const activeCoverCourse = context.state.activeCoverCourse;

  const body = {
    Name,
    Detail,
    Teacher,
    Reference,
    IsSuggested,
    IsFree,
    Price,
    CourseCategoryId,
    image: activeCoverCourse,
    videos: activeVideoCourse,
    handouts: activeHandOutCourse,
  };

  const bodyPut = {
    Name,
    Detail,
    Teacher,
    Reference,
    IsSuggested,
    IsFree,
    Price,
    courseId: idQuery,
    CourseCategoryId,
    image: activeCoverCourseEditTime,
    videos: activeVideoCourse,
    handouts: activeHandOutCourse,
  };

  const createCours = async () => {
    if (validator.current.allValid()) {
      try {
        const data = await Chapar.post(
          `${process.env.NEXT_PUBLIC_API_URL}/course`,
          JSON.stringify(body)
        );

        setSubmited(true);

        toast.success("  دوره ساخته شد", {
          position: "bottom-right",
          closeOnClick: true,
        });
        window.location.href = "/dashboard/courses";
      } catch ({ error, status }) {
        toast.error("  مشکلی وجود دارد ", {
          position: "bottom-right",
          closeOnClick: true,
        });
      }
    } else {
      toast.error("پرکردن همه ی فیلد ها واجب است", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const editCourse = async () => {
    if (validator.current.allValid()) {
      try {
        const data = await Chapar.put(
          `${process.env.NEXT_PUBLIC_API_URL}/course`,
          JSON.stringify(bodyPut)
        );

        setSubmited(true);

        toast.success("ویرایش با موفقیت انجام شد", {
          position: "bottom-right",
          closeOnClick: true,
        });
        window.location.href = "/dashboard/courses";
      } catch ({ error, status }) {
        toast.error("  مشکلی وجود دارد ", {
          position: "bottom-right",
          closeOnClick: true,
        });
      }
    } else {
      toast.error("پرکردن همه ی فیلد ها واجب است", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const getCourse = async (idQuery) => {
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/course/${idQuery}`
      );

      context.setImageIdCourse(data.data.image.imageId);
      setName(data.data.name);
      setTeacher(data.data.teacher);
      setDetail(data.data.detail);
      setReference(data.data.reference);
      setIsSuggested(data.data.isSuggested);
      setIsFree(data.data.isFree);
      setPrice(data.data.price);
      setCourseCategoryId(data.data.courseCategoryId);
      context.setActiveHandOutCourse(data.data.handouts);
      context.setCoverCourse(data.data.imageFileName);
      context.setActiveVideoCourse(data.data.videos);
    } catch (error) {
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  useEffect(() => {
    if (idQuery) {
      getCourse(idQuery);
      setEditTime(true);
    } else {
      context.setActiveHandOutCourse([]);
      context.setCoverCourse([]);
      context.setActiveVideoCourse([]);
    }
    context.GetCategories();
  }, [router]);

  useEffect(() => {
    setDisablePrice(!disablePrice);
    if (IsFree) {
      setPrice("0");
    }
    console.log("Sdasda");
  }, [IsFree]);

  return (
    <div className="col-lg-9 mt-[100px] mb-5">
      <div className="w-fit border-b-2 d-flex pb-2 mb-3 ">
        <h1 className="mb-0 font-s16">ساخت دوره جدید</h1>{" "}
      </div>{" "}
      <div className="alert alert-info text-right font-s14" role="alert">
        نکته مهم : قبل از ثبت کامل و نهایی دوره ، از بروز رسانی صفحه (رفرش کردن)
        خودداری نمایید.{" "}
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group text-right my-2">
            <label className=" px-2 font-s14"> عنوان دوره :</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
                validator.current.showMessageFor("name");
              }}
            />
            {!submited ? (
              <>{validator.current.message("name", Name, "required")}</>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group text-right my-2">
            <label className=" px-2 font-s14"> نام مدرس :</label>
            <input
              type="text"
              className="form-control"
              name="teacher"
              value={Teacher}
              onChange={(e) => {
                setTeacher(e.target.value);
                validator.current.showMessageFor("teacher");
              }}
            />
            {!submited ? (
              <>{validator.current.message("teacher", Teacher, "required")}</>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group text-right my-2">
            <label className=" px-2 font-s14">پیشنهاد ویژه : </label>
            <select
              className="form-control"
              value={IsSuggested}
              name="suggested"
              onChange={(e) => {
                setIsSuggested(e.target.value);
                validator.current.showMessageFor("teacher");
              }}
            >
              <option value={true}>هست</option>
              <option value={false}>نیست</option>
            </select>
            {!submited ? (
              <>
                {validator.current.message(
                  "suggested",
                  IsSuggested,
                  "required"
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group text-right my-2">
            <label className=" px-2 font-s14">وضعیت مالی : </label>
            <select
              value={IsFree}
              name="isFree"
              className="form-control"
              onChange={(e) => {
                setIsFree(e.target.value);
                validator.current.showMessageFor("isFree");
              }}
            >
              <option value={true}>رایگان</option>
              <option value={false}>نقدی</option>
            </select>
            {!submited ? (
              <>{validator.current.message("isFree", IsFree, "required")}</>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group text-right my-2">
            <label className=" px-2 font-s14 "> قیمت دوره :(تومان)</label>
            <input
              type="number"
              className={`form-control`}
              name="price"
              value={Price}
              onChange={(e) => {
                setPrice(e.target.value);
                validator.current.showMessageFor("price");
              }}
              disabled={disablePrice ? true : false}
            />
            {!submited ? (
              <>{validator.current.message("price", Price, "required")}</>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group text-right my-2">
            <label className=" px-2 font-s14">دسته بندی : </label>
            <select
              className="form-control"
              name="categoryId"
              value={CourseCategoryId}
              onChange={(e) => {
                setCourseCategoryId(e.target.value);
                validator.current.showMessageFor("categoryId");
              }}
            >
              {dataCategory.map((e) => (
                <>
                  <option value={e.courseCategoryId}>{e.name}</option>
                </>
              ))}
            </select>
            {!submited ? (
              <>
                {validator.current.message(
                  "categoryId",
                  CourseCategoryId,
                  "required"
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group text-right my-2">
            <label className=" px-2 font-s14"> منابع دوره :</label>
            <input
              type="text"
              className="form-control"
              name="reference"
              value={Reference}
              onChange={(e) => {
                setReference(e.target.value);
                validator.current.showMessageFor("reference");
              }}
            />
            {!submited ? (
              <>
                {validator.current.message("reference", Reference, "required")}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group text-right ">
            <label className=" px-2 font-s14">محتوای دوره</label>

            <textarea
              type="text"
              className="form-control h-200-px"
              name="detail"
              value={Detail}
              onChange={(e) => {
                setDetail(e.target.value);
                validator.current.showMessageFor("detail");
              }}
            />
            {!submited ? (
              <>{validator.current.message("detail", Detail, "required")}</>
            ) : (
              ""
            )}
            {/* <Editor
              name="description"
              setEditorLoaded={editorLoaded}
              onChange={(data) => {
                setData(data)
              }}
              editorLoaded={editorLoaded}
            /> */}
          </div>
        </div>{" "}
        <AddFileCourse />
      </div>
      <hr />
      <div className="my-3">
        {editTime ? (
          <button className="btn btn-success" onClick={() => editCourse()}>
            ویرایش دوره
          </button>
        ) : (
          <button className="btn btn-success" onClick={() => createCours()}>
            ساخت دوره
          </button>
        )}
      </div>
    </div>
  );
};

export default NewCourseContent;
