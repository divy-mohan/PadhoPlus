import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const backendUrl = 'http://localhost:8000'
    
    // Get cookies from the browser request
    const cookies = request.headers.get('cookie') || ''
    
    const backendFormData = new FormData()
    
    // Get the file from the request
    const file = formData.get('avatar') as File
    if (file) {
      backendFormData.append('profile_image', file)
    }

    const response = await fetch(`${backendUrl}/api/users/upload-avatar/`, {
      method: 'POST',
      headers: {
        'Cookie': cookies,
      },
      body: backendFormData,
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data, { status: 200 })
    } else {
      const error = await response.json()
      return NextResponse.json(error, { status: response.status })
    }
  } catch (error) {
    console.error('Avatar upload error:', error)
    return NextResponse.json(
      { message: 'Unable to upload avatar' },
      { status: 500 }
    )
  }
}
