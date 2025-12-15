import React, { useRef } from "react";

const CVDocument = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <div className="grid grid-cols-12 min-h-[1120px]">
      <div className="col-span-4 bg-blue-800 text-white p-8">
        SIDEBAR
      </div>
      <div className="col-span-8 p-10">
        CONTENT
      </div>
    </div>
  </div>
));

export default function Preview() {
  const componentRef = useRef();
  return <CVDocument ref={componentRef} />;
}
