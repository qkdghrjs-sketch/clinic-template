import SubPageHeader from "@/components/SubPageHeader";
import DoctorProfile from "@/components/DoctorProfile";
import { doctors } from "@/lib/clinic";

export default function DoctorsPage() {
  return (
    <>
      <SubPageHeader category="병원소개" title="의료진 소개" />
      {doctors.map((doctor, index) => <DoctorProfile key={doctor.name} doctor={doctor} index={index} />)}
    </>
  );
}
