import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative  bg-gradient-to-br ">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] -z-10" />
      <div className="relative max-w-screen-xl mx-auto  py-0 mb-5 sm:mb-0   lg:py-12">
        <Card className="overflow-hidden shado">
          <CardContent className="p-8 md:p-12 lg:flex lg:items-center lg:gap-12">
            <div className="lg:flex-1 space-y-6 ">
              <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                New Listings
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                Find Your Perfect Rental Home
              </h1>
              <p className="text-xl text-gray-500 dark:text-slate-300">
                Discover a wide range of properties from cozy apartments to spacious houses. Your dream rental is just a click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Input 
                    type="text" 
                    placeholder="Enter city, neighborhood, or ZIP" 
                    className="pl-10 pr-4 py-2 w-full"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <Button size="lg">
                  Search Properties
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Popular searches: Apartments, Houses, Studios, Pet-friendly
              </p>
            </div>
            <div className="mt-10 lg:mt-0 lg:flex-1">
              <img
                className="w-full rounded-lg shadow-2xl"
                src="https://plus.unsplash.com/premium_photo-1661906854568-8964f58ed859?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXBwYXJ0bWVudHN8ZW58MHx8MHx8fDA%3"
              />
            </div>
          </CardContent>
        </Card>
       
      </div>
    </div>
  )
}