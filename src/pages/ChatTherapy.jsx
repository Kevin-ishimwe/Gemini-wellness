import { useState, useRef } from "react";
import logo from "../assets/logo.png";
import { VscSend } from "react-icons/vsc";
import { updateChatHistory } from "../components/AudioMeter";
function Logo_max({ orientation }) {
  return (
    <div
      className="flex items-center "
      style={{
        display: orientation ? "grid" : "flex",
        justifyContent: orientation ? "center" : "flex",
      }}
    >
      <img
        src={logo}
        alt=""
        className="rounded-full h-[3em] w-[3em] lg:w-[5em]  lg:h-[5em]  shadow-[0px_30px_20px_#00000021] mx-auto my-12"
      />
      <h1 className="text-2xl lg:text-4xl font-bold linear_text_1 w-fit">
        Gemini Wellness
      </h1>
    </div>
  );
}

const demo = ["", "", ""];

function ChatTherapy() {
  const [prompt, setprompt] = useState("");
  const [messages, setmessages] = useState([]);

  const handleChat = async () => {
    try {
      setmessages((prev) => [...prev, { user: prompt }]);
      await fetch("http://localhost:2020/conversation/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          history: localStorage.getItem("ChatHistory")
            ? localStorage.getItem("ChatHistory")
            : [],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setprompt("");
          console.log(data);
          updateChatHistory(prompt, data.response);
          setmessages((prev) => [...prev, { model: data.response }]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#F9F9F9] ">
      <div className="py-4">
        <Logo_max orientation={true} />
      </div>
      <div className="w-full bg-indigo-100 h-[100vh] px-4 ">
        {messages.map((item, index) =>
          item.model ? (
            <div
              key={index}
              className="bg-white my-2 px-4 py-4 max-w-[60vw] rounded-lg"
            >
              {item.model}
            </div>
          ) : (
            <div key={index} className="flex justify-end w-full ">
              <div className="bg-indigo-600 px-4 py-4 max-w-[60vw] text-white rounded-lg min-w-[20vw]">
                {item.user}
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex md:w-[80vw] justify-center mx-auto my-12">
        {demo.map((item, index) => (
          <div
            key={index}
            className="w-[30vw] mx-auto md:w-[12em] bg-white h-[12em] md:mx-12 rounded-[2em] p-12 shadow-[1px_10px_30px_#1C0AE51C]"
          ></div>
        ))}
      </div>
      <div className="">
        <div className="w-[95vw] mx-auto bg-white rounded-full md:w-[70vw] fixed bottom-12 left-[50%] translate-x-[-50%] shadow-[1px_10px_30px_#1C0AE51C] flex items-center">
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setprompt(e.target.value);
            }}
            onKeyDown={(e) => (e.keyCode == 13 ? handleChat() : "")}
            value={prompt}
            className=" px-12 py-[1.2em] w-full focus:outline-none rounded-full"
          />
          <VscSend
            className="text-[3em] mr-4 text-indigo-500 hover:bg-indigo-100 py-2 px-3 rounded-full"
            onClick={() => handleChat}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatTherapy;
