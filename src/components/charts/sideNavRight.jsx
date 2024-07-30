import { VscSend } from "react-icons/vsc";
import { IoTrashSharp } from "react-icons/io5";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
function SideNavRight({ title, prompt_data = null, main = null }) {
  const [healthAnalysis, setHealthAnalysis] = useState(null);
  useEffect(() => {
    if (prompt_data && main == null) {
      try {
        const response = fetch(
          "http://localhost:2020/health/analysis/specific",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userData: prompt_data }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const clean = JSON.parse(
              data.data.replace("```json", "").replace("```", "")
            );
            console.log(clean);
            setHealthAnalysis(clean);
          });
      } catch (error) {
        console.log(error);
      }
    } else if (main) {
      console.log(main);
      setHealthAnalysis(main);
    }
  }, [prompt_data]);
  return (
    <div className="min-w-[25em] p-4 h-[90vh] rounded-lg shadow-sm overflow-y-auto overflow-x-auto mr-4 bg-white max-w-[30em]">
      <h2 className="text-xl font-bold mb-4 text-primary-200 text-center p-4 rounded-lg">
        {title}
      </h2>
      {healthAnalysis == null ? (
        <>
          <div className="w-full h-[90vh] flex items-center ">
            <div className=" w-full h-[20em] flex items-center flex-col">
              <img
                src={logo}
                className="w-[6em] border-[3px] border-b-[#189fe3] border-r-[#189fe3] border-t-[#9d79c6] border-l-[#9d79c6] rounded-full mb-4 animate-spin"
                alt=""
              />
              <h1 className="text-center w-full text-2xl font-black text-primary-100 animate-pulse">
                Analysing Data
              </h1>
            </div>
          </div>
        </>
      ) : (
        <div className="">
          <div className="mb-4 bg-indigo-100 px-4 py-2 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p>{healthAnalysis.summary}</p>
          </div>

          {main ? (
            <div className="mb-4 bg-green-100 px-4 py-2 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
              {Object.entries(healthAnalysis.recommendations).map(
                ([key, value]) => (
                  <div key={key} className="mb-2">
                    <h4 className="font-medium capitalize">{key}</h4>
                    <p>{value}</p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="mb-4 bg-purple-100 px-4 py-2 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Correlations</h3>
              <ul className="list-disc pl-5">
                {healthAnalysis.recommendations.map((correlation, index) => (
                  <li key={index}>{correlation}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-4 bg-yellow-100 px-4 py-2 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">New Goals</h3>
            <ul className="list-disc pl-5">
              {healthAnalysis.newGoals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4 bg-green-100 px-4 py-2 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
            {Object.entries(healthAnalysis.recommendations).map(
              ([key, value]) => (
                <div key={key} className="mb-2">
                  <h4 className="font-medium capitalize">{key}</h4>
                  <p>{value}</p>
                </div>
              )
            )}
          </div>

          <div className="mb-4 bg-red-100 px-4 py-2 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Risks</h3>
            <ul className="list-disc pl-5">
              {healthAnalysis.risks.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="bottom-0 sticky flex ">
        <input
          type="text"
          className=" px-12 py-[1.2em] w-full focus:outline-none rounded-full   bg-[#fcfcfc] shadow-[0px_2px_10px_#2121]"
        />
        <div className="flex absolute right-0 items-center mt-2">
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
  );
}

export default SideNavRight;
