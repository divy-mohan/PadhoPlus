import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const backendUrl = 'http://localhost:8000'
    const cookie = request.headers.get('cookie')
    
    const response = await fetch(`${backendUrl}/api/dashboard/student_dashboard/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(cookie && { 'Cookie': cookie })
      },
      credentials: 'include' as any,
    })

    if (response.status === 401) {
      return NextResponse.json(
        { error: 'Unauthorized', success: false },
        { status: 401 }
      )
    }

    if (!response.ok) {
      const text = await response.text()
      console.error('Backend error:', text)
      return NextResponse.json(
        { error: 'Dashboard error', success: false },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Transform backend data to match frontend expectations
    return NextResponse.json({
      success: true,
      user: {
        name: data.name || 'Student',
        email: data.email || '',
      },
      stats: {
        enrolledBatches: data.enrolled_batches || 0,
        watchTime: data.total_watch_time || 0,
        streak: data.streak?.current || 0,
        avgScore: data.avg_score || 0,
        totalTests: data.total_tests || 0,
        achievements: data.achievements?.length || 0,
      },
      enrollments: data.continue_watching || [],
      achievements: data.achievements_earned || [],
    }, { status: 200 })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { error: 'Unable to connect to server', success: false },
      { status: 500 }
    )
  }
}
