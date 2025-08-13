"use client"

import type React from "react"
import Image from "next/image"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SignupPage() {
  const router = useRouter();
  // State for form data
  interface FormDataShape {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    confirmPassword: string
    userType: string
  }

  type ErrorKey = keyof FormDataShape | "avatar" | "terms" | "general"
  type FormErrors = Partial<Record<ErrorKey, string>>

  const [formData, setFormData] = useState<FormDataShape>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
  })
  
  // State for profile picture
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // State for terms agreement
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  
  // State for loading and errors
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Handle changes to form inputs
  const handleInputChange = (field: keyof FormDataShape, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear the specific error for the field being edited
    if (errors[field as ErrorKey]) {
      setErrors((prev) => ({ ...prev, [field as ErrorKey]: "" }))
    }
  }

  // Handle avatar file selection and size validation
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5 MB limit
        setErrors((prev) => ({ ...prev, avatar: "Image size must be less than 5 MB" }))
        setAvatarFile(null)
        setAvatarPreview(null)
      } else {
        setAvatarFile(file)
        setAvatarPreview(URL.createObjectURL(file))
        if (errors.avatar) {
          setErrors((prev) => ({ ...prev, avatar: "" }))
        }
      }
    }
  }

  // Validate the entire form
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}
    
    if (!avatarFile) newErrors.avatar = "Profile picture is required"
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#]).{8,20}$/
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be 8-20 chars, with 1 uppercase, 1 digit, and 1 '@' or '#'"
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.userType) {
      newErrors.userType = "Please select an account type"
    }
    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions"
    }

    return newErrors
  }

  // Handle form submission
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('password', formData.password);
    data.append('userType', formData.userType);
    if (avatarFile) {
      data.append('avatar', avatarFile);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      console.log('Signup successful', result);
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    } catch (error: any) {
        if (error.message.includes('E11000 duplicate key error')) {
            setErrors({ email: "This email is already registered" });
        } else {
            setErrors({ general: error.message || "Something went wrong. Please try again." });
        }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate password strength for the indicator
  const passwordStrength = (): number => {
    const password = formData.password
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[@#]/.test(password)) strength++
    return strength
  }

  const getStrengthColor = (strength: number): string => {
    if (strength <= 2) return "bg-red-500"
    if (strength <= 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number): string => {
    if (strength <= 2) return "Weak"
    if (strength <= 4) return "Medium"
    return "Strong"
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">Q</span>
            </div>
            <span className="text-2xl font-bold text-white">QuickCourt</span>
          </Link>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-slate-900">Create your account</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Join QuickCourt and start booking your favorite sports venues
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center gap-2">
                <Label htmlFor="avatar" className="text-sm font-medium text-slate-700">
                  Profile Picture
                </Label>
                <div className="relative w-24 h-24 rounded-full border-2 border-gray-200 overflow-hidden group">
                  {avatarPreview ? (
                    <Image src={avatarPreview} alt="Profile Preview" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      <User className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm">Upload</span>
                  </div>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                {errors.avatar && <p className="text-red-500 text-sm text-center">{errors.avatar}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 ${
                        errors.firstName ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={`h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 ${
                      errors.lastName ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 ${
                      errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 12345 67890"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 ${
                      errors.phone ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType" className="text-sm font-medium text-slate-700">
                  Account Type
                </Label>
                <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                  <SelectTrigger
                    className={`h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 ${
                      errors.userType ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer - Book sports venues</SelectItem>
                    <SelectItem value="owner">Facility Owner - List your venues</SelectItem>
                    <SelectItem value="admin">Admin - Manage the platform</SelectItem>
                  </SelectContent>
                </Select>
                {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 ${
                      errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength())}`}
                          style={{ width: `${(passwordStrength() / 5) * 100}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength() <= 2
                            ? "text-red-500"
                            : passwordStrength() <= 4
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {getStrengthText(passwordStrength())}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Check
                          className={`w-3 h-3 ${formData.password.length >= 8 ? "text-green-500" : "text-gray-300"}`}
                        />
                        <span>At least 8 characters</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check
                          className={`w-3 h-3 ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? "text-green-500" : "text-gray-300"}`}
                        />
                        <span>Upper & lowercase letters</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check
                          className={`w-3 h-3 ${/\d/.test(formData.password) ? "text-green-500" : "text-gray-300"}`}
                        />
                        <span>At least one number</span>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Check
                          className={`w-3 h-3 ${/[@#]/.test(formData.password) ? "text-green-500" : "text-gray-300"}`}
                        />
                        <span>At least one special character (@ or #)</span>
                      </div>
                    </div>
                  </div>
                )}
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 ${
                      errors.confirmPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
