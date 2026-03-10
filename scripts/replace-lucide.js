const fs = require('fs');
const path = require('path');

const iconMapping = {
  // Common icons
  'Search': 'MagnifyingGlass as Search',
  'ChevronLeft': 'CaretLeft as ChevronLeft',
  'ChevronRight': 'CaretRight as ChevronRight',
  'ChevronDown': 'CaretDown as ChevronDown',
  'ChevronUp': 'CaretUp as ChevronUp',
  'ArrowLeft': 'ArrowLeft',
  'ArrowRight': 'ArrowRight',
  'ArrowUpRight': 'ArrowUpRight',
  'X': 'X',
  'Check': 'Check',
  'CircleCheck': 'CheckCircle as CircleCheck',
  'CheckCircle': 'CheckCircle',
  'AlertCircle': 'WarningCircle as AlertCircle',
  'AlertTriangle': 'Warning as AlertTriangle',
  'Info': 'Info',
  'Menu': 'List as Menu',
  'MapPin': 'MapPin',
  'Calendar': 'Calendar',
  'Users': 'Users',
  'User': 'User',
  'Mail': 'EnvelopeSimple as Mail',
  'Phone': 'Phone',
  'DollarSign': 'CurrencyDollar as DollarSign',
  'EuroSign': 'CurrencyEur as EuroSign',
  'PoundSterling': 'CurrencyGbp as PoundSterling',
  'Clock': 'Clock',
  'Star': 'Star',
  'StarHalf': 'StarHalf',
  'Heart': 'Heart',
  'Share2': 'ShareNetwork as Share2',
  'Download': 'Download',
  'Printer': 'Printer',
  'Copy': 'Copy',
  'Settings': 'Gear as Settings',
  'LogOut': 'SignOut as LogOut',
  'Edit': 'PencilSimple as Edit',
  'Trash2': 'Trash as Trash2',
  'CreditCard': 'CreditCard',
  'Shield': 'Shield',
  'ShieldCheck': 'ShieldCheck',
  'Lock': 'LockKey as Lock',
  'Unlock': 'LockKeyOpen as Unlock',
  'Eye': 'Eye',
  'EyeOff': 'EyeClosed as EyeOff',
  'Bell': 'Bell',
  'Award': 'Medal as Award',
  'Plane': 'AirplaneTilt as Plane',
  'Globe': 'Globe',
  'Compass': 'Compass',
  'Camera': 'Camera',
  'Image': 'Image',
  'Video': 'Video',
  'Music': 'MusicNotes as Music',
  'Play': 'Play',
  'Pause': 'Pause',
  'FileText': 'FileText',
  'FileCode': 'FileCode',
  'BookOpen': 'BookOpen',
  'LoaderCircle': 'Spinner as LoaderCircle',
  'TrendingUp': 'TrendUp as TrendingUp',
  'TrendingDown': 'TrendDown as TrendingDown',
  'Minus': 'Minus',
  'Plus': 'Plus',
  'Grid3x3': 'GridNine as Grid3x3',
  'Grid2x2': 'GridFour as Grid2x2',
  'List': 'List',
  'Filter': 'Faders as Filter',
  'SlidersHorizontal': 'SlidersHorizontal',
  'Palette': 'Palette',
  'Type': 'TextT as Type',
  'Ruler': 'Ruler',
  'Square': 'Square',
  'Circle': 'Circle',
  'Sun': 'Sun',
  'Moon': 'Moon',
  'HeadphonesIcon': 'Headphones as HeadphonesIcon',
  'Package': 'Package',
  'Layers': 'Layers',
  'Code': 'Code',
  'Smartphone': 'DeviceMobile as Smartphone',
  'Monitor': 'Monitor',
  'CloudSun': 'CloudSun',
  'CircleX': 'XCircle as CircleX',
  'ExternalLink': 'ArrowSquareOut as ExternalLink',
  'Building2': 'Buildings as Building2',
  'Hotel': 'Buildings as Hotel',
  'Briefcase': 'Briefcase',
  'Coffee': 'Coffee',
  'Wifi': 'WifiHigh as Wifi',
  'Tv': 'Television as Tv',
  'Wind': 'Wind',
  'Snowflake': 'Snowflake',
  'Thermometer': 'Thermometer',
  'Zap': 'Lightning as Zap',
  'MessageSquare': 'ChatCircle as MessageSquare',
  'ThumbsUp': 'ThumbsUp',
  'ThumbsDown': 'ThumbsDown',
  'Flag': 'Flag',
  'Tag': 'Tag',
  'Activity': 'Activity',
  'Home': 'House as Home',
  'Sparkles': 'Sparkle as Sparkles',
  'SearchIcon': 'MagnifyingGlass as SearchIcon',
  'UserRound': 'UserCircle as UserRound',
  'Baby': 'Baby',
  'StarOff': 'Star as StarOff', // Need context, Phosphor has Star with weight="fill"
  'Layout': 'Layout',
  'Box': 'Package as Box',
  'Link': 'Link',
  'Save': 'FloppyDisk as Save',
  'Key': 'Key',
  'MoreHorizontal': 'DotsThree as MoreHorizontal',
  'MoreVertical': 'DotsThreeVertical as MoreVertical',
  'PlayCircle': 'PlayCircle',
  'Instagram': 'InstagramLogo as Instagram',
  'Facebook': 'FacebookLogo as Facebook',
  'Twitter': 'TwitterLogo as Twitter',
  'Linkedin': 'LinkedinLogo as Linkedin',
  'Youtube': 'YoutubeLogo as Youtube',
  'Github': 'GithubLogo as Github',
  'Twitch': 'TwitchLogo as Twitch',
  'Map': 'Map',
  'Navigation': 'NavigationArrow as Navigation',
  'Bed': 'Bed',
  'Utensils': 'ForkKnife as Utensils',
  'Bus': 'Bus',
  'Car': 'Car',
  'Train': 'Train',
  'Ship': 'Train as Ship', // Approximate
  'Bike': 'Bicycle as Bike',
  'ArrowUp': 'ArrowUp',
  'ArrowDown': 'ArrowDown',
  'History': 'ClockCounterClockwise as History',
  'MenuIcon': 'List as MenuIcon',
  'ArrowRightIcon': 'ArrowRight as ArrowRightIcon',
  'CheckIcon': 'Check as CheckIcon',
  'XIcon': 'X as XIcon',
  'Upload': 'Upload',
  'Terminal': 'Terminal',
  'Gauge': 'Gauge',
  'PlaySquare': 'PlayCircle as PlaySquare',
  'Umbrella': 'Umbrella',
  'Mountain': 'Mountains as Mountain',
  'Waves': 'Waves',
  'Leaf': 'Leaf',
  'TreePine': 'TreePine',
  'AlignLeft': 'TextAlignLeft as AlignLeft',
  'MapIcon': 'Map as MapIcon',
  'Anchor': 'Anchor',
  'Footprints': 'Footprints',
  'LifeBuoy': 'Lifebuoy',
  'Palmtree': 'PalmTree as Palmtree',
  'Tent': 'Tent',
  'Flame': 'Flame',
  'Trees': 'Tree as Trees',
  'TentTree': 'Tent as TentTree',
  'MountainSnow': 'Mountains as MountainSnow',
  'CompassIcon': 'Compass as CompassIcon',
  'Luggage': 'Suitcase as Luggage',
  'Ticket': 'Ticket',
  'ShipWheel': 'SteeringWheel as ShipWheel',
  'PlaneTakeoff': 'AirplaneTakeoff as PlaneTakeoff',
  'PlaneLanding': 'AirplaneLanding as PlaneLanding',
  'CarFront': 'CarProfile as CarFront',
  'TrainFront': 'TrainRegional as TrainFront',
  'BusFront': 'Bus as BusFront',
  'TramFront': 'Train as TramFront',
  'Sailboat': 'Boat as Sailboat',
  'InfoIcon': 'Info as InfoIcon',
  'AlertCircleIcon': 'WarningCircle as AlertCircleIcon',
  'ChevronDownIcon': 'CaretDown as ChevronDownIcon',
  'ChevronUpIcon': 'CaretUp as ChevronUpIcon',
  'ChevronLeftIcon': 'CaretLeft as ChevronLeftIcon',
  'ChevronRightIcon': 'CaretRight as ChevronRightIcon',
  'HeartIcon': 'Heart as HeartIcon',
  'StarIcon': 'Star as StarIcon',
  'UserIcon': 'User as UserIcon',
  'UsersIcon': 'Users as UsersIcon',
  'MenuSquare': 'List as MenuSquare',
  'PanelLeftClose': 'SidebarSimple as PanelLeftClose',
  'PanelLeftOpen': 'SidebarSimple as PanelLeftOpen',
  'MessageCircle': 'ChatCircle as MessageCircle',
  'HelpCircle': 'Question as HelpCircle',
  'ShoppingBag': 'Tote as ShoppingBag',
  'ShoppingCart': 'ShoppingCart',
  'Store': 'Storefront as Store',
  'TagIcon': 'Tag as TagIcon',
  'SearchCheck': 'MagnifyingGlass as SearchCheck',
  'MailIcon': 'EnvelopeSimple as MailIcon',
  'PhoneIcon': 'Phone as PhoneIcon',
  'MapPinIcon': 'MapPin as MapPinIcon',
  'ClockIcon': 'Clock as ClockIcon',
  'CalendarIcon': 'Calendar as CalendarIcon',
  'Send': 'PaperPlaneRight as Send',
  'Repeat': 'Repeat',
  'RefreshCw': 'ArrowsClockwise as RefreshCw',
  'RefreshCcw': 'ArrowsCounterClockwise as RefreshCcw',
  'Maximize': 'CornersOut as Maximize',
  'Minimize': 'CornersIn as Minimize',
  'Maximize2': 'ArrowsOut as Maximize2',
  'Minimize2': 'ArrowsIn as Minimize2',
  'ZoomIn': 'MagnifyingGlassPlus as ZoomIn',
  'ZoomOut': 'MagnifyingGlassMinus as ZoomOut',
  'ArrowUpRightIcon': 'ArrowUpRight as ArrowUpRightIcon',
  'CameraIcon': 'Camera as CameraIcon',
  'ImageIcon': 'Image as ImageIcon',
  'VideoIcon': 'Video as VideoIcon',
  'Mic': 'Microphone as Mic',
  'MicOff': 'MicrophoneSlash as MicOff',
  'Volume': 'SpeakerHigh as Volume',
  'Volume1': 'SpeakerLow as Volume1',
  'Volume2': 'SpeakerHigh as Volume2',
  'VolumeX': 'SpeakerNone as VolumeX',
  'ListFilter': 'Faders as ListFilter',
  'Sliders': 'SlidersHorizontal as Sliders',
  'GripHorizontal': 'DotsSix as GripHorizontal',
  'GripVertical': 'DotsSixVertical as GripVertical',
  'SortAsc': 'SortAscending as SortAsc',
  'SortDesc': 'SortDescending as SortDesc',
  'MoveUp': 'ArrowUp as MoveUp',
  'MoveDown': 'ArrowDown as MoveDown',
  'MoveLeft': 'ArrowLeft as MoveLeft',
  'MoveRight': 'ArrowRight as MoveRight',
  'UnlockIcon': 'LockKeyOpen as UnlockIcon',
  'LockIcon': 'LockKey as LockIcon',
  'ShieldAlert': 'ShieldWarning as ShieldAlert',
  'Laptop': 'Laptop',
  'Tablet': 'DeviceTablet as Tablet',
  'Watch': 'Watch',
  'Keyboard': 'Keyboard',
  'Mouse': 'Mouse',
  'Headphones': 'Headphones',
  'Speaker': 'SpeakerHifi as Speaker',
  'WifiOff': 'WifiSlash as WifiOff',
  'Bluetooth': 'Bluetooth',
  'BluetoothOff': 'BluetoothSlash as BluetoothOff',
  'Battery': 'BatteryFull as Battery',
  'BatteryCharging': 'BatteryCharging',
  'BatteryWarning': 'BatteryWarning',
  'Power': 'Power',
  'PowerOff': 'Power',
  'Plug': 'Plug',
  'PenTool': 'PenNib as PenTool',
  'Pen': 'Pen',
  'Pencil': 'Pencil',
  'Highlighter': 'HighlighterCircle as Highlighter',
  'Brush': 'PaintBrush as Brush',
  'PaintBucket': 'PaintBucket',
  'Eraser': 'Eraser',
  'Scissors': 'Scissors',
  'File': 'File',
  'Folder': 'Folder',
  'FolderOpen': 'FolderOpen',
  'Archive': 'Archive',
  'HardDrive': 'HardDrives as HardDrive',
  'Server': 'HardDrives as Server',
  'Database': 'Database',
  'Cloud': 'Cloud',
  'CloudRain': 'CloudRain',
  'CloudSnow': 'CloudSnow',
  'CloudLightning': 'CloudLightning',
  'CloudDrizzle': 'CloudRain',
  'Droplet': 'Drop as Droplet',
  'Droplets': 'Drop as Droplets',
  'MoonStar': 'MoonStars as MoonStar',
  'Sunset': 'CloudSun as Sunset',
  'Sunrise': 'CloudSun as Sunrise',
  'Haze': 'CloudFog as Haze',
  'Tornado': 'Cloud as Tornado',
  'Hurricane': 'Cloud as Hurricane',
  'CloudFog': 'CloudFog',
  'EyeIcon': 'Eye as EyeIcon',
  'EyeOffIcon': 'EyeClosed as EyeOffIcon',
};

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('lucide-react')) return;

  console.log(`Processing ${filePath}`);

  // Regex to match imports from lucide-react, which might be multiline
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/g;

  let newContent = content.replace(importRegex, (match, importsStr) => {
    // Split by comma and clean up whitespace
    const imports = importsStr.split(',').map(i => i.trim()).filter(i => i.length > 0);
    
    const mappedImports = imports.map(imp => {
      // Handle aliases like: Search as SearchIcon
      let originalName = imp;
      let alias = null;
      
      if (imp.includes(' as ')) {
        const parts = imp.split(' as ');
        originalName = parts[0].trim();
        alias = parts[1].trim();
      }
      
      let newName = iconMapping[originalName];
      if (!newName) {
        console.warn(`WARNING: No mapping found for icon '${originalName}' in file ${filePath}`);
        // Fallback: just use the name and hope it exists or keep it as is
        newName = originalName;
      }
      
      // If there was an alias, and the newName already has an 'as', we need to adapt
      if (alias) {
        if (newName.includes(' as ')) {
          const parts = newName.split(' as ');
          return `${parts[0]} as ${alias}`;
        } else {
          return `${newName} as ${alias}`;
        }
      }
      
      return newName;
    });

    return `import { \n  ${mappedImports.join(', \n  ')}\n} from "@phosphor-icons/react";`;
  });

  fs.writeFileSync(filePath, newContent, 'utf8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir(path.resolve(__dirname, '../src/app/pages'));
walkDir(path.resolve(__dirname, '../src/app/components'));
walkDir(path.resolve(__dirname, '../src/app/utils'));
