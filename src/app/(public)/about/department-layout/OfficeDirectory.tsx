import { MapPin } from 'lucide-react';

type OfficeRow = { name: string; location: string };

const DEPARTMENT_OFFICES: OfficeRow[] = [
  { name: 'Office of the Head, Department of Electrical & Electronics Engineering', location: 'EEE Department Office' },
  { name: 'Office of the Coordinator, Department of Electrical & Electronics Engineering', location: 'EEE Department Office' },
  { name: 'Office of the Department of Electrical & Electronics Engineering', location: 'Academic Building, EEE Floor' },
  { name: 'EEE Faculty Members\' Rooms', location: 'Adjacent to EEE Department Office' },
  { name: 'Electrical Machines Laboratory', location: 'EEE Laboratory Block' },
  { name: 'Electronics Laboratory', location: 'EEE Laboratory Block' },
  { name: 'Digital Electronics Laboratory', location: 'EEE Laboratory Block' },
  { name: 'Power Systems Laboratory', location: 'EEE Laboratory Block' },
  { name: 'Electrical Circuit Laboratory', location: 'EEE Laboratory Block' },
  { name: 'Microprocessor & Microcontroller Laboratory', location: 'EEE Laboratory Block' },
  { name: 'Communication Engineering Laboratory', location: 'EEE Laboratory Block' },
  { name: 'Project & Research Laboratory', location: 'EEE Laboratory Block' },
  { name: 'Computer Laboratory', location: 'EEE Academic Building' },
  { name: 'Seminar Room', location: 'EEE Academic Building' },
  { name: 'Smart Classroom', location: 'EEE Academic Building' },
];

const UNIVERSITY_OFFICES: OfficeRow[] = [
  { name: 'Office of the Vice Chancellor', location: 'Administrative Building, Green Road Campus' },
  { name: 'Office of the Pro Vice Chancellor', location: 'Administrative Building, Green Road Campus' },
  { name: 'Office of the Treasurer', location: 'Administrative Building, Green Road Campus' },
  { name: 'Office of the Registrar', location: 'Administrative Building, Ground Floor' },
  { name: 'Office of the Controller of Examinations', location: 'Administrative Building, 2nd Floor' },
  { name: 'Office of Academic Affairs', location: 'Administrative Building, 2nd Floor' },
  { name: 'Office of Finance & Accounts', location: 'Administrative Building, Ground Floor' },
  { name: 'Office of Human Resource Management', location: 'Administrative Building' },
  { name: 'Office of Admission & Information', location: 'Admission Office, Ground Floor' },
  { name: 'Office of International Affairs & Public Relations', location: 'Administrative Building' },
  { name: 'Office of Student Welfare Division', location: 'Administrative Building' },
  { name: 'Office of Library & Information Services', location: 'Central Library, Library Floor' },
  { name: 'Office of IQAC', location: 'Administrative Building' },
  { name: 'Office of ICT/Information Technology', location: 'ICT Center' },
  { name: 'Office of Research, Training & Consultancy (CRTC)', location: 'Administrative Building' },
  { name: 'Office of the Dean, Faculty of Science & Engineering', location: 'Faculty Office' },
  { name: 'Examination Cell', location: 'Academic Building' },
  { name: 'Accounts Office (Student Fees)', location: 'Administrative Building, Ground Floor' },
  { name: 'Medical Center', location: 'Campus Medical Unit' },
  { name: 'Transport Office', location: 'Transport Section' },
  { name: 'Security Office', location: 'Main Entrance, Administrative Building' },
  { name: 'Student Common Room', location: 'Academic Building' },
  { name: 'Cafeteria', location: 'Campus Cafeteria' },
  { name: 'Career Development & Placement Cell', location: 'Administrative Building' },
  { name: 'Alumni Affairs Office', location: 'Administrative Building' },
];

function GroupHeader({ label }: { label: string }) {
  return (
    <tr className="bg-accent/5">
      <td colSpan={2} className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
        {label}
      </td>
    </tr>
  );
}

function OfficeRows({ rows }: { rows: OfficeRow[] }) {
  return (
    <>
      {rows.map((row) => (
        <tr key={row.name} className="border-b border-gray-50 last:border-0 hover:bg-accent/5 transition-colors">
          <td className="px-5 py-3.5 text-sm font-semibold text-primary">{row.name}</td>
          <td className="px-5 py-3.5 text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              <MapPin size={12} />
              {row.location}
            </span>
          </td>
        </tr>
      ))}
    </>
  );
}

export default function OfficeDirectory({ address }: { address: string }) {
  return (
    <section className="mb-14 md:mb-16">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary leading-tight">
          Where to Find Each Office
        </h2>
        <div className="mt-3 mx-auto h-1 w-16 bg-accent rounded-full" />
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          <MapPin size={15} className="text-accent shrink-0" />
          {address}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-left bg-gray-50/60">
              <th className="px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase text-gray-500">Office</th>
              <th className="px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase text-gray-500 text-right">Level</th>
            </tr>
          </thead>
          <tbody>
            <GroupHeader label="This Department" />
            <OfficeRows rows={DEPARTMENT_OFFICES} />
            <GroupHeader label="University Offices" />
            <OfficeRows rows={UNIVERSITY_OFFICES} />
          </tbody>
        </table>
      </div>
    </section>
  );
}
