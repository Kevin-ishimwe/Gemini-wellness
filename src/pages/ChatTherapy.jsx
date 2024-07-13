import { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { VscSend } from "react-icons/vsc";
import { IoTrashSharp } from "react-icons/io5";
import { updateChatHistory } from "../components/AudioMeter";
import TherapyMenu from "../components/TherapyMenu";
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

const demo = [
  "I feel anxious lately. Can you help me understand why?",
  "😔 I had a tough day at work. How can I de-stress? ",
  "Can you give me some tips on improving my sleep habits?",
];

const PopUpClear = ({ message, onClose, onConfirm }) => (
  <div className="fixed top-0 w-[100vw] bg-[#00000032] h-[100vh] z-50 backdrop-blur-[2px] flex items-center justify-center">
    <div className="bg-white min-w-[30em] text-center min-h-24 p-12 rounded-lg relative">
      <p>{message}</p>
      <button
        className="absolute top-2 right-2 text-gray-300 hover:text-gray-700"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="mt-4">
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

function ChatTherapy() {
  const [prompt, setprompt] = useState("");
  const [messages, setmessages] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

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
            ? JSON.parse(localStorage.getItem("ChatHistory"))
            : [],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setprompt("");
          if (data.response) {
            updateChatHistory(prompt, data.response);
            setmessages((prev) => [...prev, { model: data.response }]);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const prev_messsages = JSON.parse(localStorage.getItem("ChatHistory"))?.map(
      (item) =>
        item.role == "model"
          ? { model: item.parts[0].text }
          : { user: item.parts[0].text }
    );
    setmessages(prev_messsages);
  }, []);
  return (
    <>
      {popupVisible && (
        <PopUpClear
          message={
            "Are you sure you want to delete this entire therapy session? This action cannot be undone."
          }
          onClose={() => setPopupVisible(!popupVisible)}
          onConfirm={() => {
            localStorage.removeItem("ChatHistory");
            setmessages([]);
            setPopupVisible(!popupVisible);
          }}
        />
      )}
      <div className="bg-[#F9F9F9] relative">
        <div className="w-[full] z-[12] top-0 relative">
          <Logo_max orientation={true} />
          <TherapyMenu fixed={true} />
          {messages?.length > 0 ? (
            ""
          ) : (
            <div className="flex md:w-[80vw] justify-center mx-auto my-12 ">
              {demo.map((item, index) => (
                <div
                  key={index}
                  className="mx-4 w-fit md:w-[16em] min-h-[12em] bg-white md:mx-12 rounded-[20px] p-8 py-12 shadow-[1px_10px_40px_#e9e9e93d] hover:shadow-[1px_10px_30px_#1C0AE51C] hover:scale-105 text-indigo-500 flex items-center"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="md:w-[80vw] mx-auto px-4 pb-[10em] mt-12">
          {messages?.map((item, index) =>
            item.model ? (
              <div
                key={index}
                className="bg-white my-4 px-4 py-4 md:max-w-[40vw] rounded-lg text-gray-600"
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
            <div className="flex">
              <IoTrashSharp
                className="text-[3em] text-indigo-500 hover:bg-indigo-100 py-2 px-3 rounded-full"
                onClick={() => {
                  setPopupVisible(!popupVisible);
                }}
              />
              <VscSend
                className="text-[3em] mr-4 text-indigo-500 hover:bg-indigo-100 py-2 px-3 rounded-full"
                onClick={() => handleChat}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatTherapy;
