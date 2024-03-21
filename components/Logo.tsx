import Image from 'next/image'

export default function Logo() {
  return (
    <Image src={`/${process.env.NEXT_PUBLIC_SITE_NAME}/logo2.png`} alt="logo" width={120} height={60} /> 
  )
}
