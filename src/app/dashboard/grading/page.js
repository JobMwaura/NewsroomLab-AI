"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function GradingPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/dashboard/submissions")
  }, [router])
  return null
}
