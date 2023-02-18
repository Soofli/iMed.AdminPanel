import AppContext from '@ctx/AppContext'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import AddHandoutCourseModal from 'plugins/Modals/AddHandoutCourseModal'
import AddVideoCourseModal from 'plugins/Modals/AddVideoCourseModal'
import DeleteHandoutInCourse from 'plugins/Modals/DeleteHandoutInCourse'
import DeleteVideoInCourse from 'plugins/Modals/DeleteVideoInCourse'
import React, { useContext, useEffect } from 'react'
import test from '../../../../../public/images/1.jpg'

const ChooseHandout = () => {
  useEffect(() => {
    context.GetHandOut()
  }, [])

  const context = useContext(AppContext)
  const dataHandOut = context.state.dataHandOut
  const activeHandOutCourse = context.state.activeHandOutCourse
  return (
    <div className="col-lg-12 mt-5 ">
      {' '}
      {activeHandOutCourse.length <= 0 ? (
        <div className="table-responsive-sm">
          <AddHandoutCourseModal dataHandOut={dataHandOut} />
          <table className="table">
            <thead>
              <tr className="table-active">
                <th className="w-0 text-center">جزوه ای وجود ندارد</th>
              </tr>
            </thead>
          </table>
        </div>
      ) : (
        <div className="table-responsive-sm">
          <AddHandoutCourseModal dataHandOut={dataHandOut} />
          <table className="table">
            <thead>
              <tr className="table-active">
                <th className="w-0 text-center">#</th>
                <th className="w-80 text-center font-s15">لیست جزوات</th>

                <th className="w-fit text-center font-s15">وضعیت</th>
              </tr>
            </thead>
            {activeHandOutCourse.map((e, index) => (
              <>
                {' '}
                <tbody className="text-center">
                  <tr className="">
                    <th scope="row">{index + 1}</th>
                    <td className="font-s14 ">{e.name}</td>

                    <td className="d-flex">
                      <DeleteHandoutInCourse name={e.name} />
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      )}
    </div>
  )
}

export default ChooseHandout
