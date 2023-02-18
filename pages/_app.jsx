import "tailwindcss/tailwind.css";
import "../styles/globals.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/bootstrap.min.css";
import "../styles/mpn.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "@ctx/AppContext";
import { useState } from "react";
import Chapar from "plugins/Chapar";
import ModalLoading from "plugins/Loading/ModalLoading";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [dataCategory, setDataCategory] = useState([]);
  const [dataFlashCardCategory, setDataFlashCardCategory] = useState([]);
  const [DataFlashCardSingleCategory, setDataFlashCardSingleCategory] =
    useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataAdmin, setDataAdmin] = useState([]);
  const [dataSale, setDataSale] = useState([]);
  const [dataSaleFlashCards, setDataSaleFlashCards] = useState([]);
  const [dataCommentCourse, setDataCommentCourse] = useState([]);
  const [dataCommentFlashCard, setDataCommentFlashCard] = useState([]);
  const [dataImage, setDataImage] = useState([]);
  const [activeCoverCourse, setActiveCoverCourse] = useState(null);
  const [activeCoverCourseEditTime, setActiveCoverCourseEditTime] =
    useState(null);
  const [CoverCourse, setCoverCourse] = useState("");
  const [dataVideo, setDataVideo] = useState([]);
  const [activeVideoCourse, setActiveVideoCourse] = useState([]);
  const [dataHandOut, setDataHandOut] = useState([]);
  const [activeHandOutCourse, setActiveHandOutCourse] = useState([]);
  const [dataCourses, setDataCourses] = useState([]);
  const [dataCourse, setDataCourse] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [dataEditor, setDataEditor] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [imageIdCourse, setImageIdCourse] = useState(0);
  const [ModalFlashCard, setModalFlashCard] = useState(false);
  const [activeFlashCard, setActiveFlashCard] = useState([]);
  const [editFlashCardTime, setEditFlashCardTime] = useState(false);
  const [flashCardId, setFlashCardId] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [paginationPerches, setPaginationPerches] = useState(0);
  const [paginationCommentCourse, setPaginationCommentCourse] = useState(0);
  const [paginationUser, setpaginationUser] = useState(0);
  const [paginationCommentFlashCard, setPaginationCommentFlashCard] =
    useState(0);
  const [paginationPerchesFlashCards, setPaginationPerchesFlashCards] =
    useState(0);

  const [moreButton, setMoreButton] = useState(true);
  const [moreButtonFlashCards, setMoreButtonFlashCards] = useState(true);
  const [moreButtonCommentCourse, setMoreButtonCommentCourse] = useState(true);
  const [moreButtonUser, setMoreButtonUser] = useState(true);
  const [moreButtonCommentFlashCard, setMoreButtonCommentFlashCard] =
    useState(true);
  const [reverseDateCourse, setReverseDateCourse] = useState(false);
  const [reverseDateFlashCard, setReverseDateFlashCard] = useState(false);

  const [reverseDateCommentCourse, setReverseDateCommentCourse] =
    useState(false);
  const [reverseDateCommentFlashCard, setReverseDateCommentFlashCard] =
    useState(false);

  const router = useRouter();

  const GetCategories = async () => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/coursecategory`
      );

      setDataCategory(data.data);
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetFlashCardCategories = async () => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/flashcardcategory`
      );

      setDataFlashCardCategory(data.data);
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetFlashCardCategory = async (id) => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/flashcardcategory/${id}`
      );

      setDataFlashCardSingleCategory(data.data);
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };
  const GetImages = async () => {
    setLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/file/image`
      );

      setDataImage(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetImage = async (name) => {
    setCoverCourse(name);
  };

  const GetVideos = async () => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/file/video`
      );

      setDataVideo(data.data);
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetHandOut = async () => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/file/handout`
      );

      setDataHandOut(data.data);
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetCourses = async () => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/course`
      );

      setDataCourses(data.data);
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetCourse = async (id) => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/course/${id}`
      );

      setDataCourse(data.data);
      setActiveHandOutCourse(data.data.handouts);
      setCoverCourse(data.data.imageFileName);
      setActiveVideoCourse(data.data.videos);
      setImageIdCourse(data.data.image.imageId);
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetUsers = async (num, more) => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/user?page=${
          num == -1 ? 0 : num
        }`
      );

      if (num == -1) {
        setDataUser(data.data);
        setMoreButtonUser(true);
        setpaginationUser(0);
      } else {
        setDataUser([...dataUser, ...data.data]);
      }

      if (data.data.length <= 0) {
        setMoreButtonUser(false);
      } else if (more) {
        setpaginationUser(paginationUser + 1);
        router.push(`/dashboard/members?page=${paginationUser + 1}`);
      }

      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };
  const GetUsersFilter = async (search) => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/searchuser?phoneOrName=${search}`
      );

      console.log("----------------------------------------", data.data);
      setDataUser(data.data);
      setModalLoading(false);
      setMoreButtonUser(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetAdmins = async () => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/admin`
      );

      setDataAdmin(data.data);
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetSaleFlashCards = async (num, more) => {
    setIsFilter(false);
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/purchase/FlashCardCategory?page=${num}`
      );

      if (reverseDateFlashCard) {
        setDataSaleFlashCards([
          ...dataSaleFlashCards.slice().reverse(),
          ...data.data,
        ]);
        setReverseDateFlashCard(false);
      } else {
        setDataSaleFlashCards([...dataSaleFlashCards, ...data.data]);
      }

      if (data.data.length <= 0) {
        setMoreButtonFlashCards(false);
      } else if (more) {
        setPaginationPerchesFlashCards(paginationPerchesFlashCards + 1);
        router.push(`/dashboard/sales?page=${paginationPerchesFlashCards + 1}`);
      }

      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetSaleCourses = async (num, more) => {
    setIsFilter(false);
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/purchase/course?page=${num}`
      );
      if (reverseDateCourse) {
        setDataSale([...dataSale.slice().reverse(), ...data.data]);
        setReverseDateCourse(false);
      } else {
        setDataSale([...dataSale, ...data.data]);
      }
      if (data.data.length <= 0) {
        setMoreButton(false);
      } else if (more) {
        setPaginationPerches(paginationPerches + 1);
        router.push(`/dashboard/sales?page=${paginationPerches + 1}`);
      }

      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetSaleCoursesFilter = async (name, course, time) => {
    setIsFilter(true);
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/purchase/course/filter?${
          !!name && !!course && !!time
            ? "userFullName=" +
              name +
              "&" +
              "courseName=" +
              course +
              "&" +
              "dateTime=" +
              time
            : !!name && !!course && !!!time
            ? "userFullName=" + name + "&" + "courseName=" + course
            : !!name && !!!course && !!time
            ? "userFullName=" + name + "&" + "dateTime=" + time
            : !!!name && !!course && !!time
            ? "courseName=" + course + "&" + "dateTime=" + time
            : !!!name && !!course && !!!time
            ? "courseName=" + course
            : !!!name && !!!course && !!time
            ? "dateTime=" + time
            : !!name && !!!course && !!!time
            ? "userFullName=" + name
            : ""
        }`
      );

      setDataSale(data.data);
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetCommentCourse = async (num, more) => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/rate/CourseRate?page=${
          num == -1 ? 0 : num
        }`
      );

      if (reverseDateCommentCourse) {
        setDataCommentCourse([
          ...dataCommentCourse.slice().reverse(),
          ...data.data,
        ]);
        setReverseDateCommentCourse(false);
      } else if (num == -1) {
        setDataCommentCourse(data.data);

        setMoreButtonCommentCourse(true);
      } else {
        setDataCommentCourse([...dataCommentCourse, ...data.data]);
      }

      if (data.data.length <= 0) {
        setMoreButtonCommentCourse(false);
      } else if (more) {
        setPaginationCommentCourse(paginationCommentCourse + 1);
        router.push(`/dashboard/comments?page=${paginationCommentCourse + 1}`);
      }

      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const GetCommentFlashCard = async (num, more) => {
    setModalLoading(true);
    try {
      const data = await Chapar.get(
        `${process.env.NEXT_PUBLIC_API_URL}/rate/FlashCardCategoryRate?page=${
          num == -1 ? 0 : num
        }`
      );

      if (reverseDateCommentFlashCard) {
        setDataCommentFlashCard([
          ...dataCommentFlashCard.slice().reverse(),
          ...data.data,
        ]);
        setReverseDateCommentFlashCard(false);
      } else if (num == -1) {
        setDataCommentFlashCard(data.data);

        setMoreButtonCommentFlashCard(true);
        setPaginationCommentFlashCard(0);
      } else {
        setDataCommentFlashCard([...dataCommentFlashCard, ...data.data]);
      }
      if (data.data.length <= 0) {
        setMoreButtonCommentFlashCard(false);
      } else if (more) {
        setPaginationCommentFlashCard(paginationCommentFlashCard + 1);
        router.push(
          `/dashboard/comments?page=${paginationCommentFlashCard + 1}`
        );
      }

      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      toast.error("  مشکلی وجود دارد", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  const HandleModalFlashCard = (ans, data, time) => {
    if (ans && time === "edit") {
      setActiveFlashCard(data);

      setFlashCardId(data.flashCardId);
      setEditFlashCardTime(true);
    } else {
      setActiveFlashCard(null);
      setEditFlashCardTime(false);
      setFlashCardId(0);
    }

    if (!!!ans) {
      GetFlashCardCategory(data);
    }

    setModalFlashCard(ans);
  };

  const HandleModalLoading = (ans) => {
    setModalLoading(ans);
  };
  return (
    <>
      <AppContext.Provider
        value={{
          state: {
            dataCategory,
            Loading,
            dataImage,
            dataVideo,
            dataHandOut,
            dataCourses,
            activeCoverCourse,
            CoverCourse,
            activeVideoCourse,
            activeHandOutCourse,
            dataEditor,
            dataUser,
            dataSale,
            dataCommentCourse,
            dataAdmin,
            dataCourse,
            isFilter,
            imageIdCourse,
            activeCoverCourseEditTime,
            dataFlashCardCategory,
            DataFlashCardSingleCategory,
            ModalFlashCard,
            activeFlashCard,
            editFlashCardTime,
            flashCardId,
            modalLoading,
            paginationPerches,
            moreButton,
            dataSaleFlashCards,
            moreButtonFlashCards,
            paginationPerchesFlashCards,
            reverseDateCourse,
            reverseDateFlashCard,
            reverseDateCommentCourse,
            moreButtonCommentCourse,
            paginationCommentCourse,
            reverseDateCommentFlashCard,
            paginationCommentFlashCard,
            dataCommentFlashCard,
            moreButtonCommentFlashCard,
            moreButtonUser,
            paginationUser,
          },
          setDataEditor,
          setDataFlashCardCategory,
          setDataFlashCardSingleCategory,
          setFlashCardId,
          setModalFlashCard,
          setEditFlashCardTime,
          setActiveFlashCard,
          setDataCategory,
          setDataUser,
          setIsFilter,
          setDataImage,
          setActiveCoverCourse,
          setCoverCourse,
          setActiveVideoCourse,
          setDataCommentCourse,
          setDataAdmin,
          setLoading,
          setDataVideo,
          setDataHandOut,
          setActiveHandOutCourse,
          setDataCourses,
          setDataCourse,
          setDataSale,
          setImageIdCourse,
          setModalLoading,
          GetCategories,
          GetImages,
          GetVideos,
          GetHandOut,
          GetCourses,
          GetImage,
          GetUsers,
          GetSaleCourses,
          GetCommentCourse,
          GetAdmins,
          GetCourse,
          GetSaleCoursesFilter,
          setActiveCoverCourseEditTime,
          GetFlashCardCategories,
          GetFlashCardCategory,
          HandleModalFlashCard,
          HandleModalLoading,
          setPaginationPerches,
          setMoreButton,
          setDataSaleFlashCards,
          setMoreButtonFlashCards,
          setPaginationPerchesFlashCards,
          GetSaleFlashCards,
          setReverseDateCourse,
          setReverseDateFlashCard,
          setReverseDateCommentCourse,
          setMoreButtonCommentCourse,
          setPaginationCommentCourse,
          GetCommentFlashCard,
          setReverseDateCommentFlashCard,
          setMoreButtonCommentFlashCard,
          setPaginationCommentFlashCard,
          setDataCommentFlashCard,
          setMoreButtonUser,
          setpaginationUser,
          GetUsersFilter,
        }}
      >
        <Component {...pageProps} /> <ModalLoading />
        <ToastContainer position="bottom-right" closeOnClick={true} rtl />
      </AppContext.Provider>
    </>
  );
}

export default MyApp;
