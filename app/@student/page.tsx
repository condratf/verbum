import Link from "next/link";
import { Button } from "@/components/common";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Button>
        <Link href="/profile">Profile</Link>
      </Button>
    </div>
  );
}
