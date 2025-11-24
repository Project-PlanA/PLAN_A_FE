import React from "react";
import SearchIcon from "../../assets/SearchIcon.png";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "지역, 기관명 검색",
}: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="flex h-[45px] w-[350px] items-center rounded-[10px] border-none bg-[#c4c4c4]/20 px-4">
        <img src={SearchIcon} alt="검색" className="mr-2 h-4 w-4" />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="
            w-full text-sm
            placeholder:text-[#969696]
            outline-none border-none appearance-none
          "
        />
      </div>
    </div>
  );
}
