import React, { FC, PropsWithChildren } from "react";
import MalaysiaFlag from "@/app/assets/my_flag.svg";
import EnglishFlag from "@/app/assets/uk_flag.svg";
import Image from "next/image";
import classNames from "classnames";

interface Props {
  active: boolean;
  typeCountry: "my" | "en";
  onClick: () => void;
}

const LanguangeBar: FC<PropsWithChildren<Props>> = ({
  active,
  typeCountry,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "border-gray-300 rounded-xl border-2 mb-4 cursor-pointer h-16 flex",
        {
          "border !border-[#62c6f9] bg-blue-100": active,
        }
      )}
      onClick={() => onClick()}
    >
      <div className="flex items-center gap-2 p-2">
        <Image
          src={typeCountry === "my" ? MalaysiaFlag : EnglishFlag}
          alt={typeCountry === "my" ? "Malaysia Flag" : "English Flag"}
        />
        <h1>{typeCountry === "my" ? "Bahasa Malaysia" : "English"}</h1>
      </div>
    </div>
  );
};

export default LanguangeBar;
