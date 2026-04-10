import Image from "next/image"

export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/generic-company-logo.png" alt="Company Logo" width={80} height={80} className="mb-2" />
      <h2 className="text-2xl font-bold text-gray-900">Account Recovery</h2>
    </div>
  )
}
