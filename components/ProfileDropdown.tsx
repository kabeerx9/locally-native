import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, LogOut, Link as LinkIcon } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '~/context/auth-context';

export default function ProfileDropdown() {
    const router = useRouter()
  const insets = useSafeAreaInsets();
const {logOut} =  useAuth()
  const { isDarkColorScheme } = useColorScheme();

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 w-9 p-0 hover:bg-accent active:bg-accent rounded-full"
        >
          <User
            className="h-5 w-5"
            color={isDarkColorScheme ? '#fff' : '#000'}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        insets={contentInsets}
        className="w-48 bg-background border border-border"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex-row items-center py-3 focus:bg-accent" onPress={() => router.push('/profile')}>

            <User className="h-4 w-4 mr-3" color={isDarkColorScheme ? '#fff' : '#000'} />
            <Text className="text-sm font-medium">Profile</Text>

          </DropdownMenuItem>
          <DropdownMenuItem className="flex-row items-center py-3 focus:bg-accent" onPress={logOut}>
            <LogOut className="h-4 w-4 mr-3" color={isDarkColorScheme ? '#fff' : '#000'} />
            <Text className="text-sm font-medium">Logout</Text>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
