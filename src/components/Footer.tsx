import { LuCopyright } from "react-icons/lu";

const Footer = () => {
  return (
    <div className="w-full flex justify-between py-4 pb-6 border-t-[1px] border-slate-300">
      <div className="flex text-[14px] items-center text-slate-800 gap-2">
        <LuCopyright size={18} />
        Yevheniia Simaka
      </div>
      <div className="text-slate-400  text-[14px]">
        All rights are protected
      </div>
    </div>
  );
};

export default Footer;
