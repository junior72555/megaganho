import CarouselBanner from "@/components/ui/Carousel/Banner";
import CarouselItems from "@/components/ui/Carousel/Items";
import CarouselItemsPg from "@/components/ui/Carousel/Items-pg";
import BreadcrumbInvitationToRegister from "@/components/ui/PromoBanners/BreadcrumbInvitationToRegister";
import { cookies } from "next/headers";


export default async function Home() {
  const isAuthenticated = cookies().has('bet.token')

  return (
    <>
      <div className="w-full z-10">
        <CarouselBanner />
      </div>

      {isAuthenticated ? '' : <BreadcrumbInvitationToRegister />}

      <div className="w-full z-10">
        <CarouselItems />
      </div>

      <div className="w-full z-10">
        <CarouselItemsPg />
      </div>
    </>
  )
}
