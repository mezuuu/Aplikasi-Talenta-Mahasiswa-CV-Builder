import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print"; 

const CVDocument = React.forwardRef(({ profile }, ref) => (
  <div
    ref={ref}
    className="p-8 bg-white text-black font-sans max-w-3xl mx-auto border shadow-none print:border-none print:shadow-none"
  >
    <div className="border-b-2 border-gray-800 pb-4 mb-4 flex gap-4 items-center">
      {profile.photo && (
        <img
          src={profile.photo}
          className="w-24 h-24 object-cover rounded-full border"
        />
      )}
      <div>
        <h1 className="text-3xl font-bold uppercase">{profile.full_name}</h1>
        <p className="text-lg text-gray-600">
          {profile.prodi} - {profile.nim}
        </p>
        <p className="text-sm mt-1">
          {profile.email} | {profile.linkedin_link}
        </p>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="font-bold text-xl border-b mb-2">Tentang Saya</h3>
      <p>{profile.bio}</p>
    </div>

    <div className="mb-6">
      <h3 className="font-bold text-xl border-b mb-2">Skill</h3>
      <ul className="list-disc ml-5">
        {profile.skills?.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>

  </div>
));

export default function Preview({ profile }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `CV-${profile?.full_name || "Mahasiswa"}`,
  });

  if (!profile) return <p>Isi biodata dulu.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Preview Profil & CV</h2>
        <div className="space-x-2">
          <button
            onClick={handlePrint}
            className="bg-blue-900 text-white px-4 py-2 rounded shadow hover:bg-blue-800"
          >
            Download PDF / Print CV
          </button>
          <a
            href={`/`}
            target="_blank"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Lihat Tampilan Publik
          </a>
        </div>
      </div>

      <div className="border rounded bg-gray-50 p-4">
        <CVDocument ref={componentRef} profile={profile} />
      </div>
    </div>
  );
}
