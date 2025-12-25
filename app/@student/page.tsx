import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/common";
import { getUserMe, isUserOnboarded } from "@/lib/userme";

export default async function Home() {
  const onboarded = await isUserOnboarded();

  if (!onboarded) {
    redirect("/onboarding");
  }

  const userMe = await getUserMe();

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="max-w-md w-full rounded-lg border p-6 shadow-sm space-y-4">
        <h1 className="text-2xl font-semibold">Welcome back{userMe?.full_name ? `, ${userMe.full_name}` : ""}</h1>
        <p className="text-sm text-muted-foreground">
          Profile
        </p>

        <div className="mt-4 space-y-2 text-sm">
          {userMe?.country && (
            <div className="flex justify-between">
              <span className="font-medium">Country</span>
              <span>{userMe.country}</span>
            </div>
          )}
          {userMe?.language && (
            <div className="flex justify-between">
              <span className="font-medium">Native language</span>
              <span>{userMe.language}</span>
            </div>
          )}
          {userMe?.learn_language && (
            <div className="flex justify-between">
              <span className="font-medium">Learning</span>
              <span>{userMe.learn_language}</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary">
            <Link href="/onboarding?step=1">Edit onboarding</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
