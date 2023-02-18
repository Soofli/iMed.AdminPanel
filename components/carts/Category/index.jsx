import {
  faPen,
  faPlus,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chapar from 'plugins/Chapar'
import DeleteCategoryModal from 'plugins/Modals/DeleteCategoryModal'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import AppContext from '@ctx/AppContext'

const CategoryCart = ({ name, id }) => {
  const [editCategory, setEditCategory] = useState(false)
  const [value, setValue] = useState(name)

  const body = {
    CourseCategoryId: id,
    Name: value,
  }
  const context = useContext(AppContext)

  const putCategory = async () => {
    try {
      const data = await Chapar.put(
        `${process.env.NEXT_PUBLIC_API_URL}/coursecategory`,
        JSON.stringify(body),
      )

      toast.success('  ویرایش با موفقیت انجام شد', {
        position: 'bottom-right',
        closeOnClick: true,
      })

      context.GetCategories()
      setEditCategory(false)
    } catch ({ error, status }) {
      toast.error('  مشکلی وجود داره ', {
        position: 'bottom-right',
        closeOnClick: true,
      })
    }
  }
  return (
    <div className="col-lg-4">
      <div className="  rounded-lg overflow-hidden mt-5">
        <div className="">
          {editCategory ? (
            <>
              <div className="flex justify-end">
                <div
                  className="absolute mt-[-20px] ml-[-10px] pointer"
                  onClick={() => {
                    setEditCategory(false), setValue(name)
                  }}
                >
                  <div className="w-40-px h-40-px border-r50 bg-dark text-center ">
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="white font-s25 mt-2"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <input
                  type="text"
                  className="form-control h-70-px text-center font-s13"
                  placeholder=" دسته بندی  جدید را وارد کنید .... "
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </>
          ) : (
            <h2 className="mb-0 font-s13 py-4 text-center bg-cyan-700 white">
              {name}
            </h2>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        {' '}
        {editCategory ? (
          <div className="w-90">
            <div
              className="shadow  rounded-b-xl d-flex justify-between overflow-hidden "
              onClick={() => putCategory()}
            >
              <div className="w-100 text-center pointer bg-green-900  p-2  text-white tr03 ">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-90">
            <div className="bg-white shadow  rounded-b-xl d-flex justify-between overflow-hidden ">
              <DeleteCategoryModal id={id} />
              <div
                className="w-100 text-center border-r-2 pointer p-2  hover:bg-sky-700 hover:text-white tr03"
                onClick={() => setEditCategory(true)}
              >
                <FontAwesomeIcon icon={faPen} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryCart
