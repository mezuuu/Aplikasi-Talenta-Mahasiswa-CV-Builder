import React, { useRef } from "react";

const CVDocument = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <div className="grid grid-cols-12 min-h-[1120px]">

      <div className="col-span-4 bg-blue-800 text-white p-8">
        <h3 className="font-bold border-b mb-2">ABOUT ME</h3>
      </div>

      <div className="col-span-8 p-10">
        <h1 className="text-3xl font-bold">Nama Lengkap</h1>

        <section className="mt-8">
          <h2 className="font-bold border-b">WORK EXPERIENCE</h2>
        </section>

        <section className="mt-8">
          <h2 className="font-bold border-b">EDUCATION</h2>
        </section>

        <section className="mt-8">
          <h2 className="font-bold border-b">SKILLS</h2>
        </section>
      </div>
    </div>
  </div>
));

export default function Preview() {
  const componentRef = useRef();
  return <CVDocument ref={componentRef} />;
}
