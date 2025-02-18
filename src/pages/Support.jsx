import React from 'react';
import { faAddressBook, faComments, faPeopleLine } from '@fortawesome/free-solid-svg-icons';
import SupportBox from '../components/SupportBox';

const Support = () => {
  return (
    <div className='bg-[#121212] h-screen'>
        <div className='top flex justify-center gap-20 pt-20'>
            <SupportBox
                icon={faAddressBook}
                title='Guide'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, sequi?'
            />
            <SupportBox
                icon={faComments}
                title='FAQ'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, sequi?'
            />
            <SupportBox
                icon={faPeopleLine}
                title='Community'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, sequi?'
            />
        </div>
    </div>
  );
};

export default Support;
