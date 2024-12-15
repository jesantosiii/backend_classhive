import LogoL from "../../assets/Logo/Classhive L.png";

  
  export function ClassHeader() {
    return (
      <div className="w-full h-[200px] rounded-xl bg-gradient-to-r from-[#0a192f] to-[#1a3a4a] flex items-center justify-center">
        <div className="w-[200px] relative flex flex-col gap-1.5 justify-center items-center">
        <img src={LogoL} alt="Logo" className="mb-2" />
        </div>
      </div>
    )
  }
  
  