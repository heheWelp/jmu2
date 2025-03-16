"use client"

import { useState } from "react"
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define the form schema based on the profiles table
const profileFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  preferred_name: z.string().optional(),
  profile_picture: z.string().optional(),
  pronouns: z.string().optional(),
  gender: z.string().optional(),
  month_of_birth: z.number().min(1).max(12).optional(),
  race_ethnicity: z.string().optional(),
  education_level: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileFormProps {
  userId: string
  initialData?: any
  userRole: string
  educationLevels: { id: string; level_name: string }[]
  themeColor: string
}

export function ProfileForm({
  userId,
  initialData,
  userRole,
  educationLevels,
  themeColor,
}: ProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Create Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Initialize form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData || {
      first_name: "",
      last_name: "",
      email: "",
      preferred_name: "",
      profile_picture: "",
      pronouns: "",
      gender: "",
      month_of_birth: undefined,
      race_ethnicity: "",
      education_level: "",
    },
  })

  // Handle form submission
  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsLoading(true)

      // Get the current profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single()

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError
      }

      // If profile exists, update it
      if (profileData) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            preferred_name: data.preferred_name,
            profile_picture: data.profile_picture,
            pronouns: data.pronouns,
            gender: data.gender,
            month_of_birth: data.month_of_birth,
            race_ethnicity: data.race_ethnicity,
            education_level: data.education_level,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId)

        if (updateError) throw updateError
      } else {
        // If profile doesn't exist, create it
        const { error: insertError } = await supabase.from("profiles").insert({
          user_id: userId,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          preferred_name: data.preferred_name,
          profile_picture: data.profile_picture,
          pronouns: data.pronouns,
          gender: data.gender,
          month_of_birth: data.month_of_birth,
          race_ethnicity: data.race_ethnicity,
          education_level: data.education_level,
        })

        if (insertError) throw insertError
      }

      // Refresh the page
      router.reload()
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getThemeColorClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'green':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'purple':
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      case 'amber':
        return 'bg-amber-600 hover:bg-amber-700 text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-medium text-${themeColor}-600`}>Profile</h3>
        <p className="text-sm text-gray-500">
          Update your personal information and preferences
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-x-3">
              <Avatar className="h-20 w-20">
                <AvatarImage src={form.watch("profile_picture") || ""} alt="Profile" />
                <AvatarFallback>
                  {form.watch("first_name")?.[0]?.toUpperCase() || ""}
                  {form.watch("last_name")?.[0]?.toUpperCase() || ""}
                </AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="profile_picture"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Profile Picture URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/your-image.jpg" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormDescription>
                      Enter a URL for your profile picture
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* First Name */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preferred Name */}
              <FormField
                control={form.control}
                name="preferred_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Johnny" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormDescription>
                      How you prefer to be addressed
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pronouns */}
              <FormField
                control={form.control}
                name="pronouns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pronouns</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your pronouns" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="he/him">He/Him</SelectItem>
                        <SelectItem value="she/her">She/Her</SelectItem>
                        <SelectItem value="they/them">They/Them</SelectItem>
                        <SelectItem value="prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Month of Birth */}
              <FormField
                control={form.control}
                name="month_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Month</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value?.toString() || ""}
                      value={field.value?.toString() || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your birth month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">January</SelectItem>
                        <SelectItem value="2">February</SelectItem>
                        <SelectItem value="3">March</SelectItem>
                        <SelectItem value="4">April</SelectItem>
                        <SelectItem value="5">May</SelectItem>
                        <SelectItem value="6">June</SelectItem>
                        <SelectItem value="7">July</SelectItem>
                        <SelectItem value="8">August</SelectItem>
                        <SelectItem value="9">September</SelectItem>
                        <SelectItem value="10">October</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">December</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Race/Ethnicity */}
              <FormField
                control={form.control}
                name="race_ethnicity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race/Ethnicity</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your race/ethnicity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="american_indian_alaska_native">American Indian or Alaska Native</SelectItem>
                        <SelectItem value="asian">Asian</SelectItem>
                        <SelectItem value="black_african_american">Black or African American</SelectItem>
                        <SelectItem value="hispanic_latino">Hispanic or Latino</SelectItem>
                        <SelectItem value="native_hawaiian_pacific_islander">Native Hawaiian or Other Pacific Islander</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="two_or_more">Two or More Races</SelectItem>
                        <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Education Level */}
              <FormField
                control={form.control}
                name="education_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your education level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>
                            {level.level_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className={getThemeColorClass(themeColor)}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  )
} 