import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../../hooks/useGetConversation'

function Conversations() {
    const{loading,conversations} = useGetConversation();
    console.log("Conversations:",conversations)
  return (
    <div className='flex py-2 flex-col overflow-auto'>
    {
      conversations.map((conversation,idx)=>(
        <Conversation 
        key={conversation._id}
        conversation ={conversation}
        lastIdx = {idx === conversation.lenght - 1}
        />
      ))
    }
    {loading ? <span className='lading loading-spinner mx-auto'></span>:null}
    </div>
  )
}

export default Conversations