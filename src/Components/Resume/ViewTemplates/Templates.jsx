import { Lock } from "lucide-react";
import { useNavigate } from "react-router";

const templates = [
  {
    id: "classic",
    name: "Classic (ATS)",
    unlocked: true,
  },
  {
    id: "modern",
    name: "Modern",
    unlocked: false,
  },
  {
    id: "creative",
    name: "Creative",
    unlocked: false,
  },
  {
    id: "minimal",
    name: "Minimal",
    unlocked: false,
  },
];

const Templates = () => {
  const navigate = useNavigate();

  const handleClick = (tpl) => {
    if (tpl.unlocked) {
      navigate("/preview");
    } else {
      navigate("/upgrade");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Choose a Template</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => handleClick(tpl)}
            className={`relative cursor-pointer border rounded-lg p-4 h-56 flex items-center justify-center
              ${tpl.unlocked ? "hover:shadow-lg" : "opacity-60 blur-[1px]"}`}
          >
            <span className="font-semibold">{tpl.name}</span>

            {!tpl.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/70 text-white px-3 py-2 rounded flex items-center gap-2">
                  <Lock size={16} />
                  Locked
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
