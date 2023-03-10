import Head from "next/head";
import Image from "next/image";
import ClientCaptcha from "react-client-captcha";
import React, { useEffect, useState } from "react";
import logo from "../public/images/logo.png";
import Chapar from "plugins/Chapar";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import packageJson from "../package.json";
import moment from "jalali-moment";
import PersianNumber from "plugins/PersianNumber";
import PackageJson from "../package.json";

export default function Home() {
  const [capchaCode, setCapchaCode] = useState("");
  const [code, setCode] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const body = {
    userName,
    password,
  };

  const router = useRouter();
  const GoDashboard = async () => {
    if (code == capchaCode) {
      try {
        const { data } = await Chapar.post(
          `${process.env.NEXT_PUBLIC_API_URL}/Authorize/LoginAdmin`,
          JSON.stringify(body)
        );
        localStorage.setItem("token", data.access_token);

        toast.success("  به پنل ادمین آی مد خوش آمدید ", {
          position: "bottom-right",
          closeOnClick: true,
        });
        router.reload();
      } catch ({ error, status }) {
        toast.error("  اطلاعات را صحیح وارد کنید ", {
          position: "bottom-right",
          closeOnClick: true,
        });
      }
    } else {
      toast.error("  کپچا را صحیح وارد کنید ", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const item = localStorage.getItem("token");
      if (item) {
        // router.push('/dashboard')
        router.push("/dashboard");
      }
    }
  }, []);
  // const myStorage = window.localStorage.token
  //

  return (
    <>
      <Head>
        <title>لاگین ادمین آی مد</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="bg-login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 mx-auto lg:mt-[200px]">
              <div className="d-flex justify-between  rtl mx-5 bg-white border-r50 p-1 mb-2">
                <div className="bg-dark border-r50  p-2 ">
                  <p className="mb-0 text-[13px] px-4 white font-bold">ورود</p>
                </div>

                <div className="  p-2">
                  <p className="mb-0 text-[13px] font-bold px-4">
                    <PersianNumber
                      number={moment().locale("fa").format("YYYY/MM/DD")}
                    />
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl  p-2">
                <div className="row">
                  <div className="col-lg-5">
                    <div className="bg-login-in-login rounded-3xl pt-[130px]">
                      <div className="bg-white  w-[90px] h-[90px] rounded-full mx-auto shadow">
                        <div className=" mx-auto ">
                          <Image
                            src={logo}
                            alt="Picture of the author"
                            width={500}
                            height={500}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <h2 className="mb-0 text-sm font-bold text-center white w-100 mt-2">
                          پنل مدیریت آیــــ مد
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-7  rtl">
                    <div className="p-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control font-s13"
                          placeholder="نام کاربری"
                          name="userName"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control font-s13"
                          placeholder="پسورد"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group  ">
                        <div className="">
                          <ClientCaptcha
                            charsCount="5"
                            retryIconSize="18"
                            captchaCode={(code) => setCapchaCode(code)}
                          />
                          <div className="text-right">
                            <small className="text-info text-right w-40 font-s10 ">
                              به کوچک و بزرگ بود حروف دقت کنید
                            </small>
                          </div>
                        </div>

                        <input
                          type="text"
                          name="capcha"
                          // value={capcha}
                          className="form-control border-r5 font-s13 w-50  shadow-sm text-right mt-2"
                          placeholder="کد بالا را وارد کنید"
                          onChange={(e) => {
                            setCode(e.target.value);
                          }}
                        />
                      </div>
                      <button
                        className="btn btn-success w-100"
                        onClick={GoDashboard}
                      >
                        ورود
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-0 text-[13px] px-4  font-bold white mt-2 opacity-50 ">
                  {PackageJson.version}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
