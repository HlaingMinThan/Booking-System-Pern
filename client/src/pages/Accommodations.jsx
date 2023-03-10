import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Accommodations() {
    let [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then((res) => {
            setPlaces(res.data)
        })
    }, []);

    return (
        <>
            <div className='text-center'>
                <Link to="/account/accommodations/create" className='px-4 py-2 rounded-full  gap-1 bg-primary text-white'> + Add new place</Link>
            </div>
            <div className="max-w-3xl mx-auto mt-5">
                {!!places.length && places.map(place => (
                    <Link to={`/account/accommodations/edit/${place.id}`} className='flex gap-3 mt-4 bg-gray-50 p-3 rounded-2xl' key={place.id}>
                        <div className='bg-gray-100 w-32 h-32 shrink-0'>
                            <img src={place.photos[0]?.url} className="rounded-2xl" />
                        </div >
                        <div className='shrink grow-0'>
                            <h2 className='text-xl'>{place.title}</h2>
                            <p>{place.description}</p>
                        </div>
                    </Link >
                ))}
            </div >
        </>
    )
}
