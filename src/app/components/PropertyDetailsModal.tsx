import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, DollarSign, Calendar, MapPin, BedDouble, Bath, Users, Home, Info } from "lucide-react"
import Image from "next/image"

interface PropertyItem {
  id: number
  title: string
  description: string
  image: string
  price: number
  bookingDate?: string
  location: string
  bedrooms?: number
  bathrooms?: number
  maxGuests?: number
  propertyType?: string
  [key: string]: any // Allow for additional properties
}

interface PropertyDetailsDialogProps {
  item: PropertyItem
  onClose: () => void
}

export default function PropertyDetailsDialog({ item, onClose }: PropertyDetailsDialogProps) {
  const iconMap: { [key: string]: React.ReactNode } = {
    price: <DollarSign className="w-4 h-4 text-green-500" />,
    bookingDate: <Calendar className="w-4 h-4 text-blue-500" />,
    location: <MapPin className="w-4 h-4 text-red-500" />,
    bedrooms: <BedDouble className="w-4 h-4 text-purple-500" />,
    bathrooms: <Bath className="w-4 h-4 text-cyan-500" />,
    maxGuests: <Users className="w-4 h-4 text-yellow-500" />,
    propertyType: <Home className="w-4 h-4 text-indigo-500" />,
  }

  const formatValue = (key: string, value: any) => {
    if (key === 'price') return `$${value} / night`
    if (key === 'bookingDate') return new Date(value).toLocaleDateString()
    return value
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription>{item.location}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="relative w-full h-48 mb-4">
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <p className="text-sm text-gray-500 mb-4">{item.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Object.entries(item).map(([key, value]) => {
              if (['id', 'title', 'description', 'image'].includes(key)) return null
              return (
                <div key={key} className="flex items-center">
                  {iconMap[key] || <Info className="w-4 h-4 text-gray-500" />}
                  <span className="ml-2 text-sm">
                    <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                    {formatValue(key, value)}
                  </span>
                </div>
              )
            })}
          </div>
        </ScrollArea>
        <DialogFooter>
        <DialogClose asChild>
            <Button type="button" >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}