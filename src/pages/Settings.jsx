import React, { useState } from 'react'
import SettingsButton from '../components/SettingsButton'
import { faWandMagicSparkles, faPerson, faLock } from '@fortawesome/free-solid-svg-icons'

const Settings = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

  return (
    // <div className='bg-[#121212] min-h-screen flex'>
    <div className='min-h-screen flex'>
        {/* <div className="left-side pl-7 w-3/7 border-r border-[#323444]"> */}
        <div className="left-side pl-7 w-3/7 border-r border-gray-600">
            <p className='pt-9 font-semibold text-xl'>Settings</p>
            <div className="box-profile mt-8 bg-green-500 max-w-123 p-3 rounded-xl text-white mr-5">
                <div className="top-box flex p-2 justify-between items-center">
                    <div className="relative w-20 h-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            {/* Background Circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="8"
                                fill="none"
                            />
                            {/* Progress Circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="white"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray="251.2" /* Keliling lingkaran */
                                strokeDashoffset="62.8" /* 75% progress */
                                strokeLinecap="round"
                                className="transition-all duration-500 ease-in-out"
                            />
                        </svg>
                        <p className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                            75%
                        </p>
                    </div>
                    <div className="right ml-4">
                        <h1 className='text-xl font-semibold mb-2'>Profile Information</h1>
                        <p >Complete your profile to unlock all features. Lorem, ipsum.</p>
                    </div>
                </div>
                <button className='min-w-full mt-3 py-2 font-semibold bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer'>Complete My Profile</button>
            </div>
            <div className="settings-button mt-8 mr-5">
                <SettingsButton
                    icon={faWandMagicSparkles}
                    title={'Appearances'}
                    description={'Dark and Light Mode, Font Size'}
                />
                <SettingsButton
                    icon={faPerson}
                    title={'Account Settings'}
                    description={'Personal Informations, Email'}
                />
                <SettingsButton
                    icon={faLock}
                    title={'Security'}
                    description={'Change Password, 2 Factor Authorization'}
                />
            </div>
        </div>
        <div className="right-side w-4/7 pl-7">
            <p className='py-9 font-semibold text-xl'>
                Account Settings
                <span className="block w-full mt-8 border-b-2 border-[#323444] opacity-50"></span>
            </p>
            <p className='font-semibold text-xl mb-3'>Personal Informations</p>
            <p className='text-gray-500 mb-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

            {/* Form */}
            <form>
                <div className="inline-name flex gap-4 mb-4">
                    <div className="w-80">
                        <label htmlFor="FirstName" className="block font-semibold mb-2">First Name</label>
                        <input 
                            type="text" 
                            id="FirstName" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border border-gray-400 p-2 rounded-md w-full focus:ring focus:border-blue-500" 
                            required
                        />
                    </div>
                    <div className="w-80">
                        <label htmlFor="LastName" className="block font-semibold mb-2">Last Name</label>
                        <input 
                            type="text" 
                            id="LastName" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border border-gray-400 p-2 rounded-md w-full focus:ring focus:border-blue-500" 
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="Email" className="block font-semibold mb-2">Email</label>
                    <input 
                        type="email" 
                        id="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-400 p-2 rounded-md w-164 focus:ring focus:border-blue-500" 
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="PhoneNumber" className="block font-semibold mb-2">Phone Number</label>
                    <input 
                        type="text" 
                        id="PhoneNumber" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="border border-gray-400 p-2 rounded-md w-164 focus:ring focus:border-blue-500" 
                        required
                    />
                </div>
                <div className="button-form w-164 flex justify-between mt-6">
                    <button 
                        onClick={(e) => {
                            e.preventDefault()
                            setFirstName('')
                            setLastName('')
                            setEmail('')
                            setPhoneNumber('')
                        }} 
                        className='bg-green-600 hover:bg-green-700 text-white p-3 font-semibold text-lg w-80 cursor-pointer rounded-2xl'>
                        Discard Changes
                    </button>
                    <button className='bg-green-600 hover:bg-green-700 text-white p-3 font-semibold text-lg w-80 cursor-pointer rounded-2xl'>Save Changes</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Settings