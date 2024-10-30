"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import TextAreaComment from "./components/TextAreaComment";
const socket = io("http://localhost:3000");
import Input from '@mui/joy/Input';

export default function Home() {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState([]);
  useEffect(() => {
    socket.on('comment', ({username,comment}) => {
      setMessage((prevmessage) => [...prevmessage, {username,comment}]);
    });
    return () => {
      socket.off('comment')
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios.post("http://localhost:3000/api/comment", {
    //   username,
    //   comment
    // });
    socket.emit('comment',{username,comment})
    setUsername(''); 
    setComment(''); 
  }
  return (
    <div className="flex flex-col pl-10 p-10 m-0 md:w-1/2">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          {/* <input value={username} placeholder="Enter Username" type="text" id="username" onChange={(e) => {
            setUsername(e.target.value);
          }} /> */}
          <Input value={username} placeholder="Enter Username" id="username" color="neutral" variant="outlined" 
          onChange={(e) => {
            setUsername(e.target.value);
          }}/>
          <br />

          <TextAreaComment comment={comment} setComment={setComment} handleSubmit={handleSubmit}/>

          <label htmlFor="TextAdded">Comment Length <b>{comment.length}</b></label>
          <br /> <br />
          <label htmlFor="comments"> {message.length} Comments </label>

          {/* <input className="" value={comment} onChange={(e) => {
            setComment(e.target.value)
          }} id="comment" type="text" placeholder="Enter Your Comment" />
          <br />
          <button type="submit">send</button> */}
        </div>
      </form>

      <div>
        {message.map((msg, index) => {
          return msg.username? 
            <p className="bg-gray-100 border rounded-md m-2 shadow-md" key={index}> @{msg.username} <br />{msg.comment}</p> : 
            <p className="bg-gray-100 border rounded-md m-2 shadow-md" key={index}> @Anonymous <br />{msg.comment}</p>
        })}
      </div>

    </div>
  );
}






// page.js
// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// export default function Home() {
//   const [username, setUsername] = useState("");
//   const [comment, setComment] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on('comment', (comment) => {
//       setMessages((prevMessages) => [...prevMessages, comment]);
//     });
    
//     return () => {
//       socket.off('comment');
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     try {
//       await axios.post("http://localhost:3000/api/comment", {
//         username,
//         comment,
//       });
//       socket.emit('comment', { username, comment }); // Emit the new comment
//       setUsername('');
//       setComment('');
//     } catch (error) {
//       console.error('Error submitting comment:', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             placeholder="Enter Username"
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <br />
//           <label htmlFor="comment">Comments</label>
//           <input
//             id="comment"
//             type="text"
//             placeholder="Enter Your Comment"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//           <br />
//           <button type="submit">Send</button>
//         </div>
//       </form>

//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             {msg.username}: {msg.comment}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }
