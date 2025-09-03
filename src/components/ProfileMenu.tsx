import { LogOutIcon, UserPenIcon, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import type { IUser } from "@/types";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link, useNavigate } from "react-router";


type ChildProps = {
  userInfo: IUser
}

export default function ProfileMenu({ userInfo }: ChildProps) {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-sm sm:text-lg">
          Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {userInfo.name} | {userInfo.role}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {userInfo.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <Link to='/profile'>Edit Information</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span onClick={handleLogout}>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
