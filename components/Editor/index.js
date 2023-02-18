import AppContext from '@ctx/AppContext'
import dynamic from 'next/dynamic'
import React, { useContext, useEffect, useRef, useState } from 'react'
import 'suneditor/dist/css/suneditor.min.css'

function Editor({}) {
  const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false,
  })

  // const [data, setData] = useState('')

  // const context = useContext(AppContext)

  // const sendDataEditor = () => {
  //   context.setDataEditor(data)
  // }

  // const handleChange = (content) => {
  //   setData(content)
  // }
  return (
    <div>
      <SunEditor
        // setContents={data}
        // onChange={handleChange}
        // defaultValue="<p>dsds</p>"
        width="100%"
        height="300px"
        setDefaultStyle="font-family: iransans"
        setOptions={{
          buttonList: [
            // default
            ['lineHeight'],
            ['formatBlock'],
            ['textStyle'],
            ['fontColor'],
            ['fontSize'],
            ['paragraphStyle'],
            ['undo', 'redo'],
            ['bold', 'underline', 'italic', 'list'],
            ['table', 'link', 'image'],
            ['fullScreen'],
          ],
        }}
      />
      {/* <div>
        {' '}
        <botton className="btn btn-info mt-2" onClick={() => sendDataEditor()}>
          {' '}
          ثبت محتوا دوره
        </botton>
      </div>

      <small>محتوای دوره بعد از تایپ حتما ثبت کنید (این یک قسمت دمو است)</small> */}
    </div>
  )
}

export default Editor
