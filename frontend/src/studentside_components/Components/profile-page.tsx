import React, { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { DeleteAccountDialog } from './delete-account-dialog'

interface UserProfile {
  firstName: string
  lastName: string
  middleName: string
  email: string
  username: string
  gender: string
}

export const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Lorraine',
    lastName: 'Esteban',
    middleName: 'Pingol',
    email: 'Lorraine@gmail.com',
    username: 'LorraineP123',
    gender: 'Female',
  })

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const handleProfileChange = (key: keyof UserProfile) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handlePasswordChange = (key: keyof typeof passwords) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswords((prev) => ({ ...prev, [key]: e.target.value }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardContent className="p-0 bg-blue-200 rounded-xl ">
          <div className="relative"> 
            <div className="h-48 bg-blue-200 rounded-2xl"></div>
              <div 
                  className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#0a192f] to-[#1a3a4a] h-28 rounded-2xl flex items-center px-8"
                  style={{ width: '90%' }}
              >
                <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white absolute bottom-[1px] left-0">
                    <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                    <AvatarFallback>LE</AvatarFallback>
                </Avatar>
                </div>
                <div className="ml-36 text-white">
                <h1 className="text-2xl font-bold">
                    {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-sm text-gray-300">User ID: {profile.username}</p>
                </div>
            </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 mt-10 bg-gradient-to-r from-[#0a192f] to-[#1a3a4a]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">About Me</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 rounded-xl"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'First Name', key: 'firstName' },
                { label: 'Last Name', key: 'lastName' },
                { label: 'Middle Name', key: 'middleName' },
                { label: 'Gender', key: 'gender' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Username', key: 'username' },
              ].map(({ label, key, type = 'text' }) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="text-sm font-medium">
                    {label}
                  </Label>
                  <Input
                    id={key}
                    type={type}
                    value={profile[key as keyof UserProfile]}
                    onChange={handleProfileChange(key as keyof UserProfile)}
                    disabled={!isEditing}
                    className="rounded-xl" 
                  />
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" className="rounded-xl"  onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button className="rounded-xl" >Save Changes</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Change Password Section */}
        <Card className="mt-10 bg-gradient-to-r from-[#0a192f] to-[#1a3a4a]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Change your password</CardTitle>
          </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {[
                { label: 'Enter your password', key: 'current' },
                { label: 'Enter New password', key: 'new' },
                { label: 'Confirm your password', key: 'confirm' },
                ].map(({ label, key }) => (
                <div key={key} className="space-y-2">
                    <Label htmlFor={`password-${key}`} className="text-sm font-medium">
                    {label}
                    </Label>
                    <Input
                    id={`password-${key}`}
                    type="password"
                    value={passwords[key as keyof typeof passwords]}
                    onChange={handlePasswordChange(key as keyof typeof passwords)}
                    className="bg-white text-black rounded-xl" 
                    />
                </div>
                ))}
                <Button className="w-full rounded-xl">Confirm</Button>
            </div>
        </CardContent>  
        </Card>

        {/* Delete Account Button */}
        <div className="md:col-span-3">
        <Button 
          variant="destructive" 
          className="w-48 rounded-xl"
          onClick={() => setDeleteDialogOpen(true)}
        >
          Delete Account
        </Button>
        <DeleteAccountDialog 
          open={deleteDialogOpen} 
          onOpenChange={setDeleteDialogOpen}
        />
        </div>
      </div>
    </div>
  )
}
