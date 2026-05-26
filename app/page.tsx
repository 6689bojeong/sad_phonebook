import dynamic from "next/dynamic";

const PhonebookPage = dynamic(() => import("./_phonebook"), { ssr: false });

export default function Page() {
  return <PhonebookPage />;
}
