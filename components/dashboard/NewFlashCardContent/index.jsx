import AppContext from '@ctx/AppContext'
import React, { useContext, useState, useEffect } from 'react'

import FlashCardCategoryCreateContent from './component/Category/index'
import FlashCardCreateContent from './component/FlashCard'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Chapar from 'plugins/Chapar'

const NewFlashCardContent = () => {
  const [dataCategory, setSataCategory] = useState([])
  const context = useContext(AppContext)
  const router = useRouter()
  const idQuery = router.query.id

  useEffect(() => {
    if (idQuery) {
      context.GetFlashCardCategory(idQuery)
    }
  }, [router])

  return (
    <div className="col-lg-9 mt-[100px] mb-5">
      <FlashCardCategoryCreateContent />
      <hr />
      <FlashCardCreateContent />
    </div>
  )
}

export default NewFlashCardContent
