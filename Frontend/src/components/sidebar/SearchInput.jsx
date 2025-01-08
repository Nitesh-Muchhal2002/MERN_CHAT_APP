import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";



function SearchInput() {
  const [serach, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const {conversations} = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!serach) return ;
    if(serach.length <3){
     return toast.error("Search term must be at least 3 characters long");
    }
    const conversation = conversations.find((eachConversation) => 
      eachConversation.fullName.toLowerCase().includes(serach.toLowerCase()))
    if(conversation){
      setSelectedConversation(conversation)
      setSearch("")
    }
    else {
      toast.error("No such user found!")
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search........"
        className="input input-bordered rounded-full"
        value={serach}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-teal-400 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput;
