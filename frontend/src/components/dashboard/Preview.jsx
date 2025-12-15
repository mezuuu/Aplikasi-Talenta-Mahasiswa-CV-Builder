import React, { useRef } from "react";

const CVDocument = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <div className="grid grid-cols-12 min-h-[1120px]">

      <div className="col-span-4 bg-blue-800 text-white p-8">
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-4xl">
            👤
          </div>
        </div>

        <h3 className="font-bold border-b mb-2">ABOUT ME</h3>
        <p className="text-sm">Tentang saya</p>
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
