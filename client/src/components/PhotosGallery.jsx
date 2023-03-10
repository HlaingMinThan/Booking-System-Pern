import React, { useState } from 'react'

export default function PhotosGallery({ place }) {
    let [showPhotos, setShowPhotos] = useState(false);

    let showAllPhotos = () => {
        window.scrollTo(0, 0)
        setShowPhotos(true)
    }

    if (showPhotos) {
        return (
            <>
                <button className='mt-4' onClick={() => setShowPhotos(false)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                </button>
                <div className={`grid md:grid-cols-1 gap-3  min-h-screen mt-12`}>
                    <h2 className='text-2xl text-center'>{place.title}'s photos</h2>
                    {place.photos.map(p => (
                        <div>
                            <img src={p.url} className="object-cover aspect-square w-[50%] mx-auto" />
                        </div>
                    ))}
                </div>
            </>
        )
    }

    return (
        <>
            {/* images */}
            <div className={`grid md:grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 relative border  rounded-2xl overflow-hidden`}>
                <div>
                    <img src={place.photos[0]?.url} className="object-cover aspect-square" />
                </div>
                <div className='overflow-y-hidden' >
                    <img src={place.photos[1]?.url} alt="" />
                    <img src={place.photos[2]?.url} alt="" className='relative top-3' />
                </div>
                <button onClick={showAllPhotos} className='bg-white border absolute right-2 bottom-5 flex gap-2 px-3 py-2 rounded-2xl shadow-lg shadow-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Show all photos
                </button>
            </div>
        </>
    )
}
