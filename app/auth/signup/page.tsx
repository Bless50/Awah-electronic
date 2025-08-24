import { Header } from "@/components/header"
import { SignUpForm } from "@/components/auth/signup-form"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-sans font-bold text-3xl mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join Awah Electronics for the best deals</p>
          </div>

          <SignUpForm />

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
