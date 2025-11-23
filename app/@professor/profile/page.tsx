import { Globe, Calendar, Phone, Mail, Video, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const personalInfo = getPersonalInformation();
  const info = getInformation();
  const languages = getLanguages();
  const personalAccounts = getPersonalAccounts();

  return (
    <div className="min-h-screen bg-gray-50 p-8 no-scrollbar">
      <div className="max-w-7xl mx-auto space-y- ">
        {/* Top Row - Three Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-500">
                  <Globe className="w-5 h-5" />
                  <span>Time zone</span>
                </div>
                <span className="text-gray-900 font-medium">{personalInfo.timeZone}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-500">
                  <Calendar className="w-5 h-5" />
                  <span>Enrollment date</span>
                </div>
                <span className="text-gray-900 font-medium">{personalInfo.enrollmentDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-500">
                  <Phone className="w-5 h-5" />
                  <span>Phone number</span>
                </div>
                <span className="text-gray-900 font-medium">{personalInfo.phoneNumber}</span>
              </div>
            </CardContent>
          </Card>

          {/* Class Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">
                Class Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-500">
                  <User className="w-5 h-5" />
                  <span>Nickname</span>
                </div>
                <span className="text-gray-900 font-medium">{info.nickname}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-500">
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </div>
                <span className="text-gray-900 font-medium">{info.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-500">
                  <Lock className="w-5 h-5" />
                  <span>Password</span>
                </div>
                <span className="text-gray-900 font-medium">Password</span>
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-500">
                  <Video className="w-5 h-5" />
                  <span>Skype Account</span>
                </div>
                <span className="text-gray-900 font-medium">elts.0858@gmail.com</span>
              </div> */}
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {languages?.map((language, index) => (
                <div key={language.name} className="border p-4 rounded-lg">
                  <div className="text-gray-900 font-medium">{language.name}</div>

                  <div className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Video lessons</span>
                      <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-100">
                        AUDIO_AND_VIDEO
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-semibold">Comments</span>
                      <Button variant="link" className="text-blue-600 p-0 h-auto">
                        Go to comments
                      </Button>
                    </div>
                    <p className="text-gray-500">-</p>
                  </div>

                </div>
              ))}

            </CardContent>
          </Card>
        </div>

        {/* Personal Accounts */}
        <Card className='mb-10'>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Personal accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-500">
                <Mail className="w-5 h-5" />
                <span>{personalAccounts.email}</span>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Absences */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Absences
            </CardTitle>
            <Button variant="link" className="text-blue-600 p-0 h-auto">
              <span className="mr-1">⊕</span> Add Absence
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">There are no absences</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getPersonalInformation() {
  return {
    timeZone: 'Europe / Madrid',
    enrollmentDate: '28/05/2025',
    phoneNumber: '+34 603 83 95 20',
  }
}

function getInformation() {
  return {
    nickname: 'John Doe',
    email: 'joen@gmail.com',
    password: 'Password',
  }
}

function getLanguages() {
  return [
    {
      name: 'Spanish',
      videoLessons: 'AUDIO_AND_VIDEO',
      comments: '-',
    },
  ]
}

function getPersonalAccounts() {
  return {
    email: 'joen@gmail.com',
  }
}

