import { PropsWithChildren } from "react";

export interface HeaderSectionProps extends PropsWithChildren {
  title: string;
  first?: boolean;
}

export function HeaderSection({ title, children, first }: HeaderSectionProps) {
  return (
    <div
      className={`${
        first ? "border-transparent" : "border-gray-100"
      } border-l-2 flex flex-col py-2 px-4 items-center justify-between space-y-2 h-full`}
    >
      <div className="flex-grow flex items-center justify-center">
        {children}
      </div>

      <h2 className="text-center text-xs p-0 m-0">{title}</h2>
    </div>
  );
}
