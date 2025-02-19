import React from 'react'
import SettingsButton from '../components/SettingsButton'
import { faWandMagicSparkles, faPerson, faLock } from '@fortawesome/free-solid-svg-icons'

const Settings = () => {
  return (
    // <div className='bg-[#121212] min-h-screen flex'>
    <div className='min-h-screen flex'>
        {/* <div className="left-side pl-7 w-3/7 border-r border-[#323444]"> */}
        <div className="left-side pl-7 w-3/7 border-r border-gray-600">
            <p className='pt-9 font-semibold text-xl'>Settings</p>
            <div className="box-profile mt-8 bg-green-500 max-w-123 p-3 rounded-xl text-white">
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
            <div className="settings-button mt-8">
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
        <div className="right-side w-4/7">
            <p className='pt-9'>tes</p>
        </div>
    </div>
  )
}

export default Settings