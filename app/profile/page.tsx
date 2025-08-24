import { Header } from "@/components/header"
import { ProfileClient } from "@/components/profile/profile-client"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProfileClient />
    </div>
  )
}
