export function Sidebar({ setStyle, setSubStyle }) {
    return (
      <div className="absolute left-0 top-0 w-64 h-full bg-gray-200 shadow-lg p-4">
        <h2 className="text-lg font-bold mb-4">Choose a Style</h2>
        {["Photorealistic", "Webtoon/Anime", "Logo/Design", "Fantasy/Concept Art"].map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className="block w-full py-2 px-4 bg-white rounded mb-2 hover:bg-gray-300"
          >
            {s}
          </button>
        ))}
        <h3 className="text-lg font-bold mt-4">Sub-Style</h3>
        {["Detailed", "Minimalist", "Futuristic", "Vintage"].map((sub) => (
          <button
            key={sub}
            onClick={() => setSubStyle(sub)}
            className="block w-full py-2 px-4 bg-white rounded mb-2 hover:bg-gray-300"
          >
            {sub}
          </button>
        ))}
      </div>
    );
  }
  