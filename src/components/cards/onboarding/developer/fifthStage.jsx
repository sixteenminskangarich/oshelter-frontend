import { useRef, useState } from "react";

export default function FifthStage() {
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);

    function selectFiles() {
        fileInputRef.current.click();
    }

    function onFileSelect(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            if(files[i].type.split('/')[0] !== 'image') continue;
            if(!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages) => [
                    ...prevImages, {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    }
                ])
            }
        }
        if(files.length < 4) {
            setError("Property photos must be 4 or more")
            return
        }
    }

    function deleteImage(index) {
        setImages((prevImages) => 
            prevImages.filter((_, i) => i !== index)
        )
    }

    return(
        <>
			<div className="flex w-full flex-col pb-8 -mt-10">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Company Portfolio</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <div className="-mt-10">
                                <div className='block mt-5 p-6 bg-white border border-gray-200 rounded-lg'>
                                    <span className="text-gray-700 text-xl mt-12">Upload photos for your latest projects</span> 
                                    <br />
                                    <div className="container-1 flex mb-4 mt-4">
                                        {images.map((images, index) => (
                                            <div className="image" key={index}>
                                                <span className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 delete" onClick={() => deleteImage(index)}>&times;</span>
                                                <img src={images.url} alt={images.name} />
                                            </div>
                                        ))}
                                    </div>
                                    <span>
                                        <label className="block text-sm mt-6">
                                            <div className="mb-5 mt-5">
                                                <div className="">
                                                    <button onClick={selectFiles} type="button" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                            Upload photos
                                                        </span>
                                                    </button>
                                                    <input type="file" className="file" name="photos" multiple ref={fileInputRef} onChange={onFileSelect} style={{ display: 'none' }} />
                                                </div>
                                            </div>
                                        </label>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full -mt-5">
                            <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                Description about portfolio
                            </label>
                            <div className="mt-2">
                                <textarea className="w-full px-4 py-2 rounded-md font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">

                                </textarea>
                            </div>
                        </div>

                        <div className="sm:col-span-full">
                            <button className="flex items-center justify-center rounded-md bg-bg-color px-8 py-2 font-medium text-white">
                                Continue
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
			</div>
        </>
    )
}