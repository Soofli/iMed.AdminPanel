import CategoryCart from '@comp/carts/Category'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chapar from 'plugins/Chapar'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import AppContext from '@ctx/AppContext'

const CategoriesContent = ({ dataCategory }) => {
  const [newCategoryValue, setNewCategoryValue] = useState('')
  const body = {
    Name: newCategoryValue,
  }

  const context = useContext(AppContext)

  const createNewCategory = async () => {
    try {
      const data = await Chapar.post(
        `${process.env.NEXT_PUBLIC_API_URL}/coursecategory`,
        JSON.stringify(body),
      )

      toast.success('  دسته بندی با موفقیت اضافه شد ', {
        position: 'bottom-right',
        closeOnClick: true,
      })
      context.GetCategories()
      setNewCategoryValue('')
    } catch ({ error, status }) {
      toast.error('  مشکلی وجود داره ', {
        position: 'bottom-right',
        closeOnClick: true,
      })
    }
  }

  return (
    <div className="col-lg-10 mt-[100px]">
      <div className="w-fit border-b-2 d-flex pb-2 ">
        <h1 className="mb-0 font-s16"> دسته بندی های آی مد</h1>
      </div>
      <div className="row">
        {dataCategory.map((e) => (
          <>
            <CategoryCart id={e.courseCategoryId} name={e.name} />
          </>
        ))}

        <div className="col-lg-4">
          <div className="  rounded-lg overflow-hidden mt-5  ">
            <div className="">
              <input
                type="text"
                className="form-control h-70-px text-center font-s13"
                placeholder=" دسته بندی  جدید را وارد کنید .... "
                name="category-name"
                onChange={(e) => setNewCategoryValue(e.target.value)}
                value={newCategoryValue}
              />
            </div>
          </div>
          <div className="flex justify-center">
            {' '}
            <div className="w-90">
              <div
                className=" shadow  rounded-b-xl d-flex justify-between overflow-hidden "
                onClick={() => createNewCategory()}
              >
                <div className="w-100 text-center pointer bg-green-900  p-2  text-white tr03 ">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesContent
