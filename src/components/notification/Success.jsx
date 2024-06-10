function Success({ notification }) {
  return (
    <div
      id="noti1"
      className="fixed right-2 top-[5em] bg-[#3df0643a] z-10 py-3 text-md px-4 border-[3px] border-[#04b504] text-[#04b504] rounded-full min-w-[40%] hover:bg-green-400 hover:text-white hover:scale-105 "
    >
      {notification}
    </div>
  );
}

export default Success;
