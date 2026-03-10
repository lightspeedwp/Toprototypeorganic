/**
 * Icon Library - Developer Tool
 * 
 * Comprehensive reference for all Lucide React icons used in the prototype.
 * Includes search, categories, and copy-to-clipboard functionality.
 * 
 * **Purpose:**
 * - Icon reference and discovery
 * - Search icons by name
 * - Browse by category
 * - Copy import code
 * - Verify icon exists before use
 * 
 * **Categories:**
 * - Travel (destinations, activities, transportation)
 * - Interface (navigation, actions, status)
 * - Communication (social, contact)
 * - Content (media, files, text)
 * - Commerce (shopping, payment)
 * 
 * @module IconLibrary
 * @category pages
 * @development-tool
 */

import { useState } from 'react';
import { Container } from '../components/common/Container';
import { DevToolsBreadcrumbs } from "../components/common/DevToolsBreadcrumbs";
import { Input } from '../components/blocks/ui/input';
import { Button } from '../components/blocks/design/Button';
import {
  // Travel Icons
  MapPin,
  MapTrifold as Map,
  AirplaneTilt as Plane,
  Boat as Ship,
  CarProfile as Car,
  Train,
  Compass,
  Globe,
  Mountains as Mountain,
  TreePalm as Palmtree,
  Tent,
  Buildings as Hotel,
  Binoculars,
  Camera,
  Backpack,
  Ticket,
  Suitcase as Luggage,
  // Interface Icons
  MagnifyingGlass as Search,
  Faders as Filter,
  List as Menu,
  X,
  CaretRight as ChevronRight,
  CaretLeft as ChevronLeft,
  CaretUp as ChevronUp,
  CaretDown as ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  Check,
  WarningCircle as AlertCircle,
  Info,
  Question as HelpCircle,
  Gear as Settings,
  // Communication Icons
  EnvelopeSimple as Mail,
  Phone,
  ChatText as MessageSquare,
  ChatCircle as MessageCircle,
  PaperPlaneRight as Send,
  ShareNetwork as Share2,
  Heart,
  Star,
  ThumbsUp,
  // Content Icons
  Image,
  VideoCamera as Video,
  File,
  FileText,
  DownloadSimple as Download,
  UploadSimple as Upload,
  Eye,
  EyeSlash as EyeOff,
  Copy,
  ArrowSquareOut as ExternalLink,
  // Commerce Icons
  ShoppingCart,
  CreditCard,
  CurrencyDollar as DollarSign,
  Tag,
  Gift,
  Percent,
  // User & Account Icons
  User,
  Users,
  UserPlus,
  UserCheck,
  LockKey as Lock,
  LockKeyOpen as Unlock,
  SignIn as LogIn,
  SignOut as LogOut,
  Shield,
  // Time & Calendar Icons
  Calendar,
  Clock,
  Timer,
  CalendarBlank as CalendarDays,
  // Navigation & Layout Icons
  House as Home,
  Layout,
  GridNine as Grid3X3,
  Stack as Layers,
  SidebarSimple as Sidebar,
  Columns,
  Rows,
  // Media & Editing Icons
  Play,
  Pause,
  SkipForward,
  SkipBack,
  SpeakerHigh as Volume2,
  SpeakerX as VolumeX,
  ArrowsOut as Maximize,
  ArrowsIn as Minimize,
  PencilSimple as Edit,
  Trash as Trash2,
  FloppyDisk as Save,
  ArrowUUpLeft as Undo,
  ArrowUUpRight as Redo,
  // Status Icons
  CheckCircle as CircleCheck,
  XCircle as CircleX,
  Warning as AlertTriangle,
  Spinner as LoaderCircle,
  Lightning as Zap,
  TrendUp as TrendingUp,
  TrendDown as TrendingDown,
} from '@phosphor-icons/react';

interface IconData {
  name: string;
  component: React.ElementType;
  category: 'Travel' | 'Interface' | 'Communication' | 'Content' | 'Commerce' | 'User & Account' | 'Time & Calendar' | 'Navigation & Layout' | 'Media & Editing' | 'Status';
  keywords: string[];
}

const ICONS: IconData[] = [
  // Travel Icons
  { name: 'MapPin', component: MapPin, category: 'Travel', keywords: ['location', 'place', 'marker', 'destination'] },
  { name: 'Map', component: Map, category: 'Travel', keywords: ['location', 'navigation', 'route'] },
  { name: 'Plane', component: Plane, category: 'Travel', keywords: ['flight', 'airplane', 'aviation', 'travel'] },
  { name: 'Ship', component: Ship, category: 'Travel', keywords: ['boat', 'cruise', 'maritime', 'sailing'] },
  { name: 'Car', component: Car, category: 'Travel', keywords: ['vehicle', 'drive', 'automobile', 'transportation'] },
  { name: 'Train', component: Train, category: 'Travel', keywords: ['railway', 'locomotive', 'transportation'] },
  { name: 'Compass', component: Compass, category: 'Travel', keywords: ['navigation', 'direction', 'explore'] },
  { name: 'Globe', component: Globe, category: 'Travel', keywords: ['world', 'earth', 'international', 'global'] },
  { name: 'Mountain', component: Mountain, category: 'Travel', keywords: ['hiking', 'nature', 'outdoor', 'adventure'] },
  { name: 'Palmtree', component: Palmtree, category: 'Travel', keywords: ['tropical', 'beach', 'vacation', 'paradise'] },
  { name: 'Tent', component: Tent, category: 'Travel', keywords: ['camping', 'outdoor', 'shelter'] },
  { name: 'Hotel', component: Hotel, category: 'Travel', keywords: ['accommodation', 'lodging', 'stay', 'building'] },
  { name: 'Binoculars', component: Binoculars, category: 'Travel', keywords: ['view', 'watch', 'observe', 'safari'] },
  { name: 'Camera', component: Camera, category: 'Travel', keywords: ['photo', 'photography', 'picture', 'memories'] },
  { name: 'Backpack', component: Backpack, category: 'Travel', keywords: ['bag', 'luggage', 'hiking', 'adventure'] },
  { name: 'Ticket', component: Ticket, category: 'Travel', keywords: ['booking', 'reservation', 'pass', 'admission'] },
  { name: 'Luggage', component: Luggage, category: 'Travel', keywords: ['suitcase', 'baggage', 'travel', 'packing'] },
  
  // Interface Icons
  { name: 'Search', component: Search, category: 'Interface', keywords: ['find', 'lookup', 'magnify', 'query'] },
  { name: 'Filter', component: Filter, category: 'Interface', keywords: ['sort', 'refine', 'options'] },
  { name: 'Menu', component: Menu, category: 'Interface', keywords: ['hamburger', 'navigation', 'nav', 'bars'] },
  { name: 'X', component: X, category: 'Interface', keywords: ['close', 'cancel', 'exit', 'dismiss'] },
  { name: 'ChevronRight', component: ChevronRight, category: 'Interface', keywords: ['arrow', 'next', 'forward'] },
  { name: 'ChevronLeft', component: ChevronLeft, category: 'Interface', keywords: ['arrow', 'back', 'previous'] },
  { name: 'ChevronUp', component: ChevronUp, category: 'Interface', keywords: ['arrow', 'expand', 'up'] },
  { name: 'ChevronDown', component: ChevronDown, category: 'Interface', keywords: ['arrow', 'collapse', 'down'] },
  { name: 'ArrowRight', component: ArrowRight, category: 'Interface', keywords: ['forward', 'next', 'continue'] },
  { name: 'ArrowLeft', component: ArrowLeft, category: 'Interface', keywords: ['back', 'previous', 'return'] },
  { name: 'ArrowUp', component: ArrowUp, category: 'Interface', keywords: ['scroll', 'top', 'up'] },
  { name: 'ArrowDown', component: ArrowDown, category: 'Interface', keywords: ['scroll', 'bottom', 'down'] },
  { name: 'Plus', component: Plus, category: 'Interface', keywords: ['add', 'new', 'create', 'expand'] },
  { name: 'Minus', component: Minus, category: 'Interface', keywords: ['remove', 'delete', 'subtract', 'collapse'] },
  { name: 'Check', component: Check, category: 'Interface', keywords: ['confirm', 'done', 'success', 'tick'] },
  { name: 'AlertCircle', component: AlertCircle, category: 'Interface', keywords: ['warning', 'caution', 'info'] },
  { name: 'Info', component: Info, category: 'Interface', keywords: ['information', 'help', 'about'] },
  { name: 'HelpCircle', component: HelpCircle, category: 'Interface', keywords: ['question', 'support', 'faq'] },
  { name: 'Settings', component: Settings, category: 'Interface', keywords: ['config', 'options', 'preferences', 'gear'] },
  
  // Communication Icons
  { name: 'Mail', component: Mail, category: 'Communication', keywords: ['email', 'message', 'envelope', 'contact'] },
  { name: 'Phone', component: Phone, category: 'Communication', keywords: ['call', 'telephone', 'contact'] },
  { name: 'MessageSquare', component: MessageSquare, category: 'Communication', keywords: ['chat', 'comment', 'conversation'] },
  { name: 'MessageCircle', component: MessageCircle, category: 'Communication', keywords: ['chat', 'bubble', 'conversation'] },
  { name: 'Send', component: Send, category: 'Communication', keywords: ['submit', 'share', 'forward'] },
  { name: 'Share2', component: Share2, category: 'Communication', keywords: ['social', 'distribute', 'network'] },
  { name: 'Heart', component: Heart, category: 'Communication', keywords: ['like', 'favorite', 'love', 'wishlist'] },
  { name: 'Star', component: Star, category: 'Communication', keywords: ['rating', 'favorite', 'bookmark'] },
  { name: 'ThumbsUp', component: ThumbsUp, category: 'Communication', keywords: ['like', 'approve', 'good'] },
  
  // Content Icons
  { name: 'Image', component: Image, category: 'Content', keywords: ['photo', 'picture', 'media', 'gallery'] },
  { name: 'Video', component: Video, category: 'Content', keywords: ['film', 'movie', 'media', 'play'] },
  { name: 'File', component: File, category: 'Content', keywords: ['document', 'attachment', 'download'] },
  { name: 'FileText', component: FileText, category: 'Content', keywords: ['document', 'text', 'page', 'article'] },
  { name: 'Download', component: Download, category: 'Content', keywords: ['save', 'export', 'get'] },
  { name: 'Upload', component: Upload, category: 'Content', keywords: ['import', 'attach', 'send'] },
  { name: 'Eye', component: Eye, category: 'Content', keywords: ['view', 'show', 'visible', 'preview'] },
  { name: 'EyeOff', component: EyeOff, category: 'Content', keywords: ['hide', 'hidden', 'invisible'] },
  { name: 'Copy', component: Copy, category: 'Content', keywords: ['duplicate', 'clone', 'clipboard'] },
  { name: 'ExternalLink', component: ExternalLink, category: 'Content', keywords: ['open', 'new', 'link', 'external'] },
  
  // Commerce Icons
  { name: 'ShoppingCart', component: ShoppingCart, category: 'Commerce', keywords: ['cart', 'basket', 'buy', 'purchase'] },
  { name: 'CreditCard', component: CreditCard, category: 'Commerce', keywords: ['payment', 'billing', 'checkout'] },
  { name: 'DollarSign', component: DollarSign, category: 'Commerce', keywords: ['price', 'cost', 'money', 'currency'] },
  { name: 'Tag', component: Tag, category: 'Commerce', keywords: ['label', 'price', 'category', 'discount'] },
  { name: 'Gift', component: Gift, category: 'Commerce', keywords: ['present', 'reward', 'bonus', 'offer'] },
  { name: 'Percent', component: Percent, category: 'Commerce', keywords: ['discount', 'sale', 'offer', 'deal'] },
  
  // User & Account Icons
  { name: 'User', component: User, category: 'User & Account', keywords: ['profile', 'account', 'person', 'avatar'] },
  { name: 'Users', component: Users, category: 'User & Account', keywords: ['group', 'team', 'people', 'community'] },
  { name: 'UserPlus', component: UserPlus, category: 'User & Account', keywords: ['add', 'invite', 'register', 'signup'] },
  { name: 'UserCheck', component: UserCheck, category: 'User & Account', keywords: ['verified', 'approved', 'active'] },
  { name: 'Lock', component: Lock, category: 'User & Account', keywords: ['secure', 'private', 'protected', 'password'] },
  { name: 'Unlock', component: Unlock, category: 'User & Account', keywords: ['open', 'access', 'public'] },
  { name: 'LogIn', component: LogIn, category: 'User & Account', keywords: ['signin', 'login', 'enter', 'access'] },
  { name: 'LogOut', component: LogOut, category: 'User & Account', keywords: ['signout', 'logout', 'exit', 'leave'] },
  { name: 'Shield', component: Shield, category: 'User & Account', keywords: ['security', 'protection', 'safe', 'verified'] },
  
  // Time & Calendar Icons
  { name: 'Calendar', component: Calendar, category: 'Time & Calendar', keywords: ['date', 'schedule', 'event', 'booking'] },
  { name: 'Clock', component: Clock, category: 'Time & Calendar', keywords: ['time', 'hour', 'duration'] },
  { name: 'Timer', component: Timer, category: 'Time & Calendar', keywords: ['countdown', 'stopwatch', 'duration'] },
  { name: 'CalendarDays', component: CalendarDays, category: 'Time & Calendar', keywords: ['dates', 'schedule', 'planning'] },
  
  // Navigation & Layout Icons
  { name: 'Home', component: Home, category: 'Navigation & Layout', keywords: ['house', 'main', 'start', 'homepage'] },
  { name: 'Layout', component: Layout, category: 'Navigation & Layout', keywords: ['design', 'structure', 'grid'] },
  { name: 'Grid3X3', component: Grid3X3, category: 'Navigation & Layout', keywords: ['grid', 'tiles', 'gallery'] },
  { name: 'Layers', component: Layers, category: 'Navigation & Layout', keywords: ['stack', 'group', 'organize'] },
  { name: 'Sidebar', component: Sidebar, category: 'Navigation & Layout', keywords: ['panel', 'menu', 'navigation'] },
  { name: 'Columns', component: Columns, category: 'Navigation & Layout', keywords: ['layout', 'grid', 'structure'] },
  { name: 'Rows', component: Rows, category: 'Navigation & Layout', keywords: ['layout', 'list', 'structure'] },
  
  // Media & Editing Icons
  { name: 'Play', component: Play, category: 'Media & Editing', keywords: ['video', 'audio', 'start'] },
  { name: 'Pause', component: Pause, category: 'Media & Editing', keywords: ['video', 'audio', 'stop'] },
  { name: 'SkipForward', component: SkipForward, category: 'Media & Editing', keywords: ['next', 'forward', 'media'] },
  { name: 'SkipBack', component: SkipBack, category: 'Media & Editing', keywords: ['previous', 'back', 'media'] },
  { name: 'Volume2', component: Volume2, category: 'Media & Editing', keywords: ['sound', 'audio', 'speaker'] },
  { name: 'VolumeX', component: VolumeX, category: 'Media & Editing', keywords: ['mute', 'silent', 'audio'] },
  { name: 'Maximize', component: Maximize, category: 'Media & Editing', keywords: ['fullscreen', 'expand', 'enlarge'] },
  { name: 'Minimize', component: Minimize, category: 'Media & Editing', keywords: ['reduce', 'shrink', 'collapse'] },
  { name: 'Edit', component: Edit, category: 'Media & Editing', keywords: ['modify', 'change', 'update', 'pencil'] },
  { name: 'Trash2', component: Trash2, category: 'Media & Editing', keywords: ['delete', 'remove', 'bin'] },
  { name: 'Save', component: Save, category: 'Media & Editing', keywords: ['store', 'keep', 'disk'] },
  { name: 'Undo', component: Undo, category: 'Media & Editing', keywords: ['revert', 'back', 'cancel'] },
  { name: 'Redo', component: Redo, category: 'Media & Editing', keywords: ['forward', 'repeat', 'restore'] },
  
  // Status Icons
  { name: 'CircleCheck', component: CircleCheck, category: 'Status', keywords: ['success', 'done', 'complete', 'verified'] },
  { name: 'CircleX', component: CircleX, category: 'Status', keywords: ['error', 'fail', 'cancel', 'wrong'] },
  { name: 'AlertTriangle', component: AlertTriangle, category: 'Status', keywords: ['warning', 'caution', 'alert'] },
  { name: 'LoaderCircle', component: LoaderCircle, category: 'Status', keywords: ['loading', 'spinner', 'progress', 'waiting'] },
  { name: 'Zap', component: Zap, category: 'Status', keywords: ['fast', 'quick', 'energy', 'power'] },
  { name: 'TrendingUp', component: TrendingUp, category: 'Status', keywords: ['growth', 'increase', 'chart'] },
  { name: 'TrendingDown', component: TrendingDown, category: 'Status', keywords: ['decline', 'decrease', 'chart'] },
];

export default function IconLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(ICONS.map(icon => icon.category)))];

  const filteredIcons = ICONS.filter(icon => {
    const matchesSearch = 
      icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icon.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCopyImport = (iconName: string) => {
    const importCode = `import { ${iconName} } from '@phosphor-icons/react';`;
    navigator.clipboard.writeText(importCode);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <>
      <DevToolsBreadcrumbs currentPage="Icon Library" />
      <div className="min-h-screen bg-background py-section-sm">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4">Icon Library</h1>
            <p className="text-muted-foreground">
              Reference for all {ICONS.length} Lucide React icons used in the prototype.
              Search by name or keyword, browse by category, and copy import code.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search icons by name or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                  >
                    {category === 'all' ? 'All' : category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground">
              Showing {filteredIcons.length} of {ICONS.length} icons
            </p>
          </div>

          {/* Icon Grid */}
          <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-6">
            {filteredIcons.map((icon) => {
              const IconComponent = icon.component;
              return (
                <button
                  key={icon.name}
                  onClick={() => handleCopyImport(icon.name)}
                  className="group relative p-6 border border-border rounded-lg bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex flex-col items-center gap-3">
                    <IconComponent className="w-8 h-8 text-foreground" />
                    <span 
                      className="text-center break-all font-sans text-xs font-medium"
                    >
                      {icon.name}
                    </span>
                  </div>
                  
                  {/* Copy Feedback */}
                  {copiedIcon === icon.name && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-lg">
                      <span className="text-sm text-primary font-medium">
                        <Check className="w-4 h-4 inline mr-1" />
                        Copied!
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredIcons.length === 0 && (
            <div className="text-center py-section-md">
              <p className="text-muted-foreground mb-4">
                No icons found matching your search.
              </p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Usage Guide */}
          <div className="mt-16 p-6 border border-border rounded-lg bg-muted">
            <h2 className="mb-4">Usage Guide</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="mb-2">How to Use</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Search or browse to find the icon you need</li>
                  <li>Click the icon card to copy the import statement</li>
                  <li>Paste the import at the top of your component file</li>
                  <li>Use the icon component in your JSX</li>
                </ol>
              </div>
              <div>
                <h3 className="mb-2">Example</h3>
                <pre className="p-4 bg-background rounded border border-border overflow-x-auto">
                  <code className="text-xs">
{`import { MapPin } from '@phosphor-icons/react';

<MapPin className="w-6 h-6 text-primary" />`}
                  </code>
                </pre>
              </div>
              <div>
                <h3 className="mb-2">Important Notes</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Always verify icons exist in @phosphor-icons/react before importing</li>
                  <li>Use semantic icon names (e.g., MapPin not Mappin)</li>
                  <li>Check icon guidelines in /guidelines/icons/</li>
                  <li>Use appropriate sizing (w-4 h-4, w-6 h-6, etc.)</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}