"use server"
import { createClient } from "@/server/server"
import { redirect } from "next/navigation"

export async function login(values: any) {
    const supabase = await createClient()
  
    // type-casting here for convenience
    // in practice, you should validate your inputs
  

    const { data,error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })
    console.log("🚀 ~ login ~ data:", data, error)
    if (error) {
      return error.message
      //redirect('/error')
    }
    redirect('/dashboard')
  
  }

  export async function sign_out() {
    const supabase = await createClient()
    const { error } =  await supabase.auth.signOut()
    console.log("🚀 ~ sign_out ~ error:", error)
    
  }