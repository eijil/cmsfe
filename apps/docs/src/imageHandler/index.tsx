import React, { useState } from 'react';
import ReactCompareImage from 'react-compare-image';
// const uploadApi = 'http://127.0.0.1:7001/api/upload_v2'
const uploadApi = 'https://dkup9p1xzimab.cloudfront.net/api/upload_v2'
export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [quality, setQuality] = useState(80)
  const [res, setRes] = useState(null)
  const [origin, setOrigin] = useState('')
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrigin(reader.result);

      };
      reader.readAsDataURL(file);

      upload(file)
    }
  }

  const qualityChange = (e) => {
    setQuality(e.target.value)
  }

  const upload = (file) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('quality', quality)
    formData.append('compress', '0')
    fetch(uploadApi, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(res => {
        console.log('Success:', res);
        setRes(res.data)
        setIsLoading(false)
      })
  }
  function downloadImage(url, filename) {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  const download = () => {
    downloadImage(res.url, res.name)
  }


  return (<div>
    <h1></h1>
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col'>
        <label htmlFor="file" className='font-semibold text-lg'>File</label>
        <input type="file" accept="image/*" className="file-input file-input-bordered w-full max-w-xs" onChange={onFileChange} />
      </div>
      <div className='flex flex-col'>
        <label htmlFor="Quality" className='font-semibold text-lg'>Quality {quality}%</label>
        <input type="range" min={0} max="100" className="range range-xs" defaultValue={quality} onChange={qualityChange} />
      </div>

      <div className='flex flex-col'>

        {isLoading &&
          <div className='w-full h-96 flex justify-center items-center'>
            <div className='loading loading-spinner'></div>
          </div>
        }
        {(res && !isLoading) &&
          <div className='relative'>

            <ReactCompareImage
              leftImageLabel={`origin: ${res.extraInfo.input}`}
              rightImageLabel={`compress:${res.extraInfo.output}`}
              skeleton={
                <div className='skeleton w-full h-full '>

                </div>
              }
              leftImage={origin}
              rightImage={res.url} />

            <div className='flex space-x-2 justify-end mt-3'>
              <code>{res.url}</code>
              <button className='btn btn-primary' onClick={download}>Download</button>
            </div>

          </div>
        }
      </div>


    </div>




  </div >)
};
