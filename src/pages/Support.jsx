import React from "react";
import {
  faAddressBook,
  faComments,
  faPeopleLine,
} from "@fortawesome/free-solid-svg-icons";
import SupportBox from "../components/SupportBox";
import SupportDropDown from "../components/SupportDropDown";

const Support = () => {
  return (
    <div className="bg-[#121212] h-screen overflow-y-scroll no-scrollbar">
      <div className="top flex justify-center gap-20 pt-20">
        <SupportBox
          icon={faAddressBook}
          title="Guides"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, sequi?"
        />
        <SupportBox
          icon={faComments}
          title="FAQ"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, sequi?"
        />
        <SupportBox
          icon={faPeopleLine}
          title="Community"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, sequi?"
        />
      </div>
      <div className="middle mt-30">
        <h1 className="mt-4 mb-3 font-bold text-4xl text-neutral-50 text-center">
          Getting Started
        </h1>
        <p className="text-center text-gray-400 font-semibold mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quasi
          suscipit id nesciunt placeat aliquam.
        </p>
        <SupportDropDown
          title="General Description"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut numquam minus sequi adipisci molestias consequuntur facilis nulla in aperiam. Ipsum rem eveniet dicta natus rerum officiis totam officia atque itaque?"
        />
        <SupportDropDown
          title="Installation Guides"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut numquam minus sequi adipisci molestias consequuntur facilis nulla in aperiam. Ipsum rem eveniet dicta natus rerum officiis totam officia atque itaque?"
        />
        <SupportDropDown
          title="Additional Options and Services"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut numquam minus sequi adipisci molestias consequuntur facilis nulla in aperiam. Ipsum rem eveniet dicta natus rerum officiis totam officia atque itaque?"
        />
      </div>
      <div className="bottom mt-20">
        <h1 className="mt-4 mb-3 font-bold text-4xl text-neutral-50 text-center">
          Track Questions
        </h1>
        <p className="text-center text-gray-400 font-semibold mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quasi
          suscipit id nesciunt placeat aliquam.
        </p>
        <SupportDropDown
          title="How Its Track Your Activity"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut numquam minus sequi adipisci molestias consequuntur facilis nulla in aperiam. Ipsum rem eveniet dicta natus rerum officiis totam officia atque itaque?"
        />
        <SupportDropDown
          title="Track Process"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut numquam minus sequi adipisci molestias consequuntur facilis nulla in aperiam. Ipsum rem eveniet dicta natus rerum officiis totam officia atque itaque?"
        />
        <SupportDropDown
          title="How to Manage Your Activity Efficiently"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut numquam minus sequi adipisci molestias consequuntur facilis nulla in aperiam. Ipsum rem eveniet dicta natus rerum officiis totam officia atque itaque?"
        />
      </div>
    </div>
  );
};

export default Support;
