/**
 * UI Components Index
 * 
 * WordPress-aligned UI component library.
 * All components use CSS variables from theme.css for design system compliance.
 * 
 * **Typography:**
 * - Lora (serif) for headings
 * - Noto Sans (sans-serif) for body text
 * 
 * **Design System:**
 * - Colors: Semantic tokens (primary, background, foreground, border, muted)
 * - Spacing: CSS variables from theme.css
 * - Dark mode: Automatic via CSS custom properties
 * - WCAG AA compliance
 * 
 * @module blocks/ui
 */

// Accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

// Alert Dialog
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";

// Alert
export { Alert, AlertTitle, AlertDescription } from "./alert";

// Aspect Ratio
export { AspectRatio } from "./aspect-ratio";

// Avatar
export { Avatar, AvatarImage, AvatarFallback } from "./avatar";

// Badge
export { Badge, badgeVariants } from "./badge";

// Breadcrumb
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb";

// Calendar
export { Calendar } from "./calendar";

// Card
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";

// Chart
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "./chart";

// Checkbox
export { Checkbox } from "./checkbox";

// Collapsible
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";

// Command
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./command";

// Dialog
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog";

// Drawer
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./drawer";

// Form
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "./form";

// Hover Card
export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "./hover-card";

// Input
export { Input } from "./input";

// Input OTP
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./input-otp";

// Label
export { Label } from "./label";

// Pagination
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

// Popover
export { Popover, PopoverTrigger, PopoverContent } from "./popover";

// Progress
export { Progress } from "./progress";

// Radio Group
export { RadioGroup, RadioGroupItem } from "./radio-group";

// Resizable
export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./resizable";

// Scroll Area
export { ScrollArea, ScrollBar } from "./scroll-area";

// Select
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./select";

// Separator
export { Separator } from "./separator";

// Sheet
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./sheet";

// Skeleton
export { Skeleton } from "./skeleton";

// Slider
export { Slider } from "./slider";

// Sonner
export { Toaster } from "./sonner";

// Switch
export { Switch } from "./switch";

// Table
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table";

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

// Textarea
export { Textarea } from "./textarea";

// Toggle
export { Toggle, toggleVariants } from "./toggle";

// Toggle Group
export {
  ToggleGroup,
  ToggleGroupItem,
} from "./toggle-group";

// Tooltip
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";
