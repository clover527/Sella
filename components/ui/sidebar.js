export function Sidebar({ setStyle, setSubStyle }) {
    return (
      <div className="p-4 bg-gray-200 w-48 h-full fixed left-0 top-0">
        <h2 className="text-lg font-semibold">Select Style</h2>
        <button className="w-full p-2 my-2 bg-blue-500 text-white" onClick={() => setStyle("Photorealistic")}>
          Photorealistic
        </button>
        <button className="w-full p-2 my-2 bg-blue-500 text-white" onClick={() => setStyle("Fantasy/Concept Art")}>
          Fantasy/Concept Art
        </button>
      </div>
    );
  }
  