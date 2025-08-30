import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"
import { Link } from "react-router"

export default function Unauthorized() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-center px-6">
      <div className="flex flex-col items-center space-y-4 max-w-md">
        <ShieldAlert className="h-16 w-16 text-red-500" />
        <h1 className="text-3xl font-bold tracking-tight">Unauthorized Access</h1>
        <p className="text-muted-foreground text-sm">
          You don’t have permission to view this page. Please log in with the correct account or return to the homepage.
        </p>
        <div className="flex gap-3 mt-4">
          <Button asChild variant="default">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
