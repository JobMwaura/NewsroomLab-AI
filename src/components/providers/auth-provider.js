"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { demoUsers } from "@/lib/demo-data"

const AuthContext = createContext(undefined)

const STORAGE_KEY = "newsroomlab_user"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      }
    } catch (e) {
      console.error("Failed to restore session:", e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = useCallback(async (email, _password) => {
    // Demo mode: match by email
    const found = demoUsers.find((u) => u.email === email)
    if (found) {
      setUser(found)
      return true
    }
    // In demo mode, allow any login and default to student
    const defaultUser = {
      id: "user-demo",
      name: email.split("@")[0],
      email,
      role: "STUDENT",
    }
    setUser(defaultUser)
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const switchRole = useCallback((role) => {
    const roleUser = demoUsers.find((u) => u.role === role)
    if (roleUser) {
      setUser(roleUser)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
