import React, { PropsWithChildren } from "react";

function TailwindLayout(props: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-white text-black">
      {props?.children}
    </div>
  );
}

export default TailwindLayout; 