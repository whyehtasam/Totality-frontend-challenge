import BlurIn from "@/components/magicui/blur-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>
            <BlurIn
              word={"Card Title"}
              duration={0.5}
              className=" text-red-500 m-2"
            />
          </CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
