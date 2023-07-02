import { useState } from 'react'
import CubicGallery from './CubicGallery'
import SearchInput from './SearchInput'

function App() {

  const [data, setData] = useState<{imageData:string[]}>({imageData:[]})

  const setImageData = (data:string[]) => {
    setData({imageData:data})
  }

  return (
    <div className="w-screen h-screen p-2 flex flex-col items-center overflow-hidden">
      <h1 className='text-center font-bold text-2xl m-2'>React Cubic Gallery</h1>
      <SearchInput setImageData={setImageData}/>
      <CubicGallery imageData={data.imageData}/>
    </div>
  )
}

export default App
