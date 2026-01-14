import { useNavigate } from "react-router-dom";
import { Lock, Crown, CheckCircle, Download, Zap } from "lucide-react";
import demoImg from "../../assets/demoTemplate.JPG";
import modernImg from "../../assets/modernTemplate.JPG";
import classicImg from "../../assets/classicTemplate.JPG";

const templates = [
  {
    id: "classic",
    name: "Classic Professional",
    description: "Clean and traditional layout",
    isFree: true,
    isSelected: true,
    image: classicImg,
  },
  {
    id: "modern",
    name: "Modern Minimalist",
    description: "Sleek and contemporary design",
    isFree: false,
    image: modernImg,
  },
  {
    id: "creative",
    name: "Creative Bold",
    description: "Stand out with vibrant colors",
    isFree: false,
    image: demoImg, 
  },
  {
    id: "executive",
    name: "Executive Elite",
    description: "Perfect for senior positions",
    isFree: false,
    image: modernImg, 
  },
  {
    id: "tech",
    name: "Tech Innovator",
    description: "Designed for IT professionals",
    isFree: false,
    image: demoImg, 
  },
  {
    id: "academic",
    name: "Academic Scholar",
    description: "Ideal for research and education",
    isFree: false,
    image: modernImg, 
  },
];

const TemplateSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Template</h1>
          <p className="text-gray-600">Select a template to download your resume</p>
        </div>

        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-[#22A7F0] to-[#1fa1e7] rounded-xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between shadow-lg text-white">
          <div>
            <h2 className="text-xl font-bold mb-1">Upgrade to Premium</h2>
            <p className="opacity-90">Unlock 5 additional professional templates</p>
          </div>
          <button className="mt-4 md:mt-0 bg-white text-[#22A7F0] px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-md cursor-pointer">
            Upgrade Now
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative rounded-xl overflow-hidden border-2 transition-all group cursor-pointer ${
                template.isSelected
                  ? "border-[#22A7F0] ring-4 ring-[#22A7F0]/10 shadow-xl"
                  : "border-transparent bg-white shadow-sm hover:shadow-lg hover:border-gray-200"
              }`}
            >
              {/* Template Preview */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${!template.isFree ? "blur-sm grayscale-[0.5]" : ""}`}
                />
                
                {/* Overlay for Locked/Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  {!template.isFree && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-0">
                       <div className="bg-white/90 p-3 rounded-full shadow-lg">
                        <Lock className="w-8 h-8 text-gray-800" />
                      </div>
                    </div>
                  )}

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {template.isFree ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(-1);
                        }}
                        className="bg-[#22A7F0] text-white px-6 py-2 rounded-lg font-bold shadow-xl hover:bg-[#1fa1e7] transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Use This Template
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // will Handle upgrade logic or show modal
                        }}
                        className="bg-[#22A7F0] text-white px-8 py-2 rounded-lg font-bold shadow-xl hover:bg-[#1fa1e7] transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Zap className="w-4 h-4 fill-current" />
                        Upgrade
                      </button>
                    )}
                  </div>
                </div>
                
                {template.isSelected && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-[#22A7F0] rounded-full p-1 border-2 border-white shadow-sm">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4 bg-white">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">{template.name}</h3>
                  {template.isFree && (
                    <span className="text-[10px] font-bold bg-[#22A7F0]/10 text-[#22A7F0] px-2 py-0.5 rounded border border-[#22A7F0]/20 uppercase tracking-tighter">
                      Free
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{template.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs text-gray-500">Your resume will be AI-enhanced by Gemini and downloaded as PDF</p>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
