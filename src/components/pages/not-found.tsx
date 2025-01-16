"use client"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center space-y-6 flex flex-col jusitfy-center items-center">
        <Image src={"/assets/svg/404.svg"} alt='404' width={200} height={200} />
        <h2 className="text-3xl font-semibold">Página no encontrada</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Button 
          variant="default" 
          size="lg" 
          onClick={() => router.back()}
        >
          Volver atrás
        </Button>
      </div>
    </div>
  )
}

