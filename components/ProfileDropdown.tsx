import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, LogOut, Link as LinkIcon } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { Link } from 'expo-router';

export default function ProfileDropdown() {
  const insets = useSafeAreaInsets();
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
          <DropdownMenuItem className="flex-row items-center py-3 focus:bg-accent">
            <Link href={'/profile'}>
            <User className="h-4 w-4 mr-3" color={isDarkColorScheme ? '#fff' : '#000'} />
            <Text className="text-sm font-medium">Profile</Text>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex-row items-center py-3 focus:bg-accent">
            <LogOut className="h-4 w-4 mr-3" color={isDarkColorScheme ? '#fff' : '#000'} />
            <Text className="text-sm font-medium">Logout</Text>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
