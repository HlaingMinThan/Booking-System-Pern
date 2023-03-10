import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Label from '../components/Label';
import FeaturesSelector from '../components/FeaturesSelector';
import PhotoUploader from '../components/PhotoUploader';
import { useNavigate, useParams } from 'react-router-dom';

export default function AccommodationForm() {

    let [title, setTitle] = useState('');
    let [price, setPrice] = useState('');
    let [address, setAddress] = useState('');
    let [description, setDescription] = useState('');
    let [extraInfo, setExtraInfo] = useState('');
    let [checkIn, setCheckIn] = useState('');
    let [checkOut, setCheckOut] = useState('');
    let [maxGuests, setMaxGuests] = useState('');
    let [photos, setPhotos] = useState([]);
    let [selectedFeatures, setSelectedFeatures] = useState([]);
    let { id } = useParams();
    useEffect(() => {
        axios.get(`/places/${id}`).then(res => {
            let { data } = res;
            setTitle(data.title);
            setAddress(data.address);
            setDescription(data.description);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setSelectedFeatures(data.features.map(f => f.name))
            setPhotos(data.photos.map(p => p.url))
            setPrice(data.price)
        })
    }, [id])

    const navigate = useNavigate()

    let savePlaceHandler = async (e) => {
        e.preventDefault();
        let place = {
            title, address, description, extraInfo, checkIn, checkOut, maxGuests, photos, features: selectedFeatures, price
        }
        if (id) {
            await axios.put(`/places/${id}`, place);
        } else {
            await axios.post('/user-places', place);
        }
        navigate('/account/accommodations')
    }

    return (
        <form action="" className='max-w-xl mx-auto' onSubmit={savePlaceHandler}>
            {/* Title */}
            <div className='mb-3'>
                <Label label="title" description='Title for your place.should be short and catchy as in advertisement' htmlFor='title' />
                <input type="text" placeholder='title for example - lovely house' id="title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            {/* Address */}
            <div className='mb-3'>
                <Label label="Address" description='Address to this place.' htmlFor='address' />
                <input type="text" placeholder='Address' id='address' value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            {/* photo */}
            <PhotoUploader photos={photos} setPhotos={setPhotos} />
            {/* Description */}
            <div className='mb-3'>
                <Label label="Description" description="Description of this place." htmlFor="Description" />
                <textarea rows="5" id='Description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            {/* Features */}
            <FeaturesSelector selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} />
            {/* Extra Info */}
            <div className='mb-3'>
                <Label label="Extra Info" description="House rules,etc." htmlFor="extra" />
                <textarea rows="5" id='extra' value={extraInfo} onChange={e => setExtraInfo(e.target.value)}></textarea>
            </div>
            {/* Check In & Out Times & guests number */}
            <div className='mb-3'>
                <Label label="Check In & Out Times" description="add check in and out times, remember to have some time window for cleaning the room between guests." />
                <div className="grid grid-cols-2 gap-2 mt-3">
                    <div>
                        <label htmlFor="">Check In time</label>
                        <input type="text" placeholder='12:00' value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Check Out time</label>
                        <input type="text" placeholder='12:00' value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div>
                    <label htmlFor="">Max Number of guests</label>
                    <input type="text" placeholder='5' value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                </div>
            </div>
            {/* Price */}
            <div className='mb-3'>
                <Label label="Price" description="Rental Price for per night" htmlFor='price' />
                <input type="text" id='price' onChange={e => setPrice(e.target.value)} value={price} />
            </div>
            {/* save btn */}
            <button className="primary">Save</button>
        </form>
    )
}
