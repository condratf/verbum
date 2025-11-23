import { Student } from "@/app/models";
import { SearchInput, Table } from "@/components/common";
import { Button } from "@/components/ui/button";

export default async function Students() {
  const students = await getStudents();

  const headers = [
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
    { title: "Platform", key: "platform" },
    { title: "Language", key: "language" },
    { title: "Start Date", key: "startDate" },
    { title: "Profile", key: "profile" },
    { title: "Business Name", key: "businessName" },
    { title: "Chat", key: "chat" },
  ];

  const data = students.map((student) => [
    student.name,
    student.email,
    student.platform,
    student.language,
    student.startDate,
    student.profile,
    student.businessName,
    <Button key="chat" size="sm" variant="outline">Chat</Button>,
  ]);

  return (
    <div className="p-4">
      <SearchInput className="max-w-[320px]"/>

      <div className="my-4" />

      <Table headers={headers} data={data} />
    </div>
  );
}

async function getStudents(): Promise<Student[]> {
  return [
    {
      name: "John Doe",
      email: "john.doe@valeo.com",
      platform: "",
      language: "SPANISH",
      startDate: "07/10/25",
      profile: "BUSINESS",
      businessName: "BiLLG",
    },
    {
      name: "Sean Connary",
      email: "sean.connary@valeo.com",
      platform: "Meet",
      language: "SPANISH",
      startDate: "30/01/25",
      profile: "BUSINESS",
      businessName: "BillG",
    },
    {
      name: "Maximus Brusele",
      email: "maximus.brusele@alviccenter.fr",
      platform: "",
      language: "SPANISH",
      startDate: "09/09/25",
      profile: "BUSINESS",
      businessName: "BillG",
    },
    {
      name: "Hair Salmon",
      email: "hair.salmon@ravenpack.com",
      platform: "",
      language: "SPANISH",
      startDate: "02/10/25",
      profile: "BUSINESS",
      businessName: "BillG",
    },
    {
      name: "Antony Katsaros",
      email: "antony.katsaros@hayward.com",
      platform: "",
      language: "SPANISH",
      startDate: "19/07/24",
      profile: "BUSINESS",
      businessName: "BillG",
    },
    {
      name: "Rude Hucher",
      email: "rude.hucher@alviccenter.fr",
      platform: "",
      language: "SPANISH",
      startDate: "09/09/25",
      profile: "BUSINESS",
      businessName: "BillG",
    },
    {
      name: "Laura Gill",
      email: "laura.gill@britishschoolmalaga.com",
      platform: "",
      language: "SPANISH",
      startDate: "07/11/24",
      profile: "BUSINESS",
      businessName: "BillG",
    },
  ];
}