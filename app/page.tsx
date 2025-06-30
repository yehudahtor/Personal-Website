"use client"

import { useEffect, useRef } from "react"
import { Github, Linkedin, ExternalLink, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PersonalCV() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Create particles to match Jack Wang's density
    for (let i = 0; i < 250; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 0.7 + 0.5,
        opacity: Math.random() * 0.4 + 0.6,
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      // Clear with very dark background
      ctx.fillStyle = "rgba(18, 18, 16, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add glowing center effect
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      // Increased radius from 0.6 to 0.9 to make the glow much larger
      const radius = Math.min(canvas.width, canvas.height) * 0.9

      // Create radial gradient with slightly reduced center brightness
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, "rgba(255, 215, 0, 0.28)") // Reduced from 0.35 to 0.28
      gradient.addColorStop(0.4, "rgba(255, 215, 0, 0.12)") // Reduced from 0.15 to 0.12
      gradient.addColorStop(0.7, "rgba(255, 215, 0, 0.04)") // Reduced from 0.05 to 0.04
      gradient.addColorStop(1, "rgba(255, 215, 0, 0)")

      // Draw the glowing center
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles and connections exactly like Jack Wang's site
      particles.forEach((particle, i) => {
        // Update particle position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle with bright yellow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`
        ctx.fill()

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x
          const dy = particles[j].y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only connect particles within a certain distance
          if (distance < 120) {
            // Calculate opacity based on distance
            const opacity = 0.2 * (1 - distance / 120)
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden font-serif">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-tight">
            <div>Yehudah</div>
            <div>Tor</div>
          </h1>
          <div className="flex items-center justify-center text-lg md:text-xl text-slate-300 mb-8 italic">
            <span>Student at Harvard</span>
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mx-4"></div>
            <span>Computer Science and Physics</span>
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mx-4"></div>
            <span>Ex Special Forces Captain</span>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/yehudah-tor-555538314"
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-medium mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative">
                <div className="w-full mx-auto">
                  <div className="aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-lg border-4 border-slate-500 shadow-lg">
                    <img
                      src="/images/yehudah-portrait.jpeg"
                      alt="Yehudah Tor"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                I'm currently studying Computer Science and Physics at Harvard University (Class of 2028), driven by a
                passion for AI, cybersecurity, and technology. As a former Captain in an elite IDF Special Forces unit,
                I've developed strong leadership, resilience, and strategic decision-making skills under pressure.
              </p>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                My goal is to develop innovative solutions that address critical challenges and create meaningful
                societal impact. I bring a unique combination of technical expertise and military leadership experience
                to every project I undertake.
              </p>
              <div className="flex items-center text-slate-400">
                <MapPin size={16} className="mr-2" />
                <span>Cambridge, MA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-medium mb-12 text-center">Work Experience</h2>

          {/* Professional Experience */}
          <div className="mb-16">
            <h3 className="text-2xl font-medium mb-8 text-center text-yellow-500">Professional Experience</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Doti.ai */}
              <Card className="bg-slate-800 border-slate-700 hover:border-yellow-500 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-48 h-24 mx-auto mb-4 bg-white rounded-lg p-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img src="/images/doti-logo.png" alt="Doti.ai" className="w-full h-full object-contain" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Go to Market</h4>
                  <p className="text-yellow-500 mb-3">Doti.ai</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Joined an early-stage startup as GTM lead, focusing on customer acquisition and go-to-market
                    strategy to drive business growth and market penetration.
                  </p>
                </CardContent>
              </Card>

              {/* Garnett Station Partners */}
              <Card className="bg-slate-800 border-slate-700 hover:border-yellow-500 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-48 h-24 mx-auto mb-4 bg-white rounded-lg p-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img
                      src="/images/gsp-logo-new.png"
                      alt="Garnett Station Partners"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Summer Analyst</h4>
                  <p className="text-yellow-500 mb-3">Garnett Station Partners</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Worked in the investment team of a private equity firm, analyzing deals and M&As, handling financial
                    models and conducting deep financial and business analysis.
                  </p>
                </CardContent>
              </Card>

              {/* Armo */}
              <Card className="bg-slate-800 border-slate-700 hover:border-yellow-500 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-48 h-24 mx-auto mb-4 bg-white rounded-lg p-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img
                      src="/images/armo-logo.png"
                      alt="Armo Cybersecurity"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Technical Intern</h4>
                  <p className="text-yellow-500 mb-3">Armo Cybersecurity</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Handled code contributions from the open source community of Kubescape, a CNCF incubated project,
                    managing community engagement and code reviews.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Military Experience */}
          <div>
            <h3 className="text-2xl font-medium mb-8 text-center text-yellow-500">Military Leadership</h3>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-medium text-white">Officer & Captain</h4>
                      <p className="text-yellow-500">IDF Intelligence Corps - Special Operations</p>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Served 7 years in elite IDF Special Forces, progressing through rigorous selection process with
                    <strong className="text-yellow-500"> less than 1% acceptance rate</strong>. Completed intensive
                    2-year training program with
                    <strong className="text-yellow-500"> only 30% completion rate</strong>, enduring extreme physical,
                    mental, and psychological tests.
                  </p>
                  <p className="text-slate-300 mb-4">
                    As Captain, led high-stakes strategic missions and oversaw training and selection of Special
                    Operations Officers. Developed expertise in operational planning, risk management, and tactical
                    decision-making under extreme pressure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-medium mb-12 text-center">Featured Projects</h2>
          <div className="flex justify-center">
            <Card className="bg-slate-800 border-slate-700 hover:border-yellow-500 transition-colors max-w-4xl w-full">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-medium text-white">Camel Hack</h3>
                      <ExternalLink size={20} className="text-yellow-500" />
                    </div>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      Founded and directed a premier hackathon bringing together innovative minds to solve real-world
                      challenges.
                      <strong className="text-yellow-500"> Raised $100K+ in funding</strong> and selected the top 50
                      teams from
                      <strong className="text-yellow-500"> 500+ participants</strong>. Managed a team of 16 Harvard and
                      MIT students to execute this large-scale event.
                    </p>
                    <p className="text-slate-300 mb-4 text-sm">
                      Collaborated with leading VCs and tech companies including Tomorrow.io, SquarePeg, Spark Capital,
                      Founders Collective, General Catalyst, Founders Fund, and more to make this vision a reality.
                    </p>
                    <div className="flex flex-col space-y-3 mt-6">
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black w-full">
                        <a href="https://camelhack.com" target="_blank" rel="noopener noreferrer" className="w-full">
                          Visit Main Website
                        </a>
                      </Button>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black w-full">
                        <a
                          href="https://camelhack.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          View All Teams
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-slate-600">
                    <img
                      src="/images/camelhack-website.jpg"
                      alt="Camel Hack Website"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-medium mb-12 text-center">Skills</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-medium mb-6 text-yellow-500">Technical Skills</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium mb-2">Coding Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-slate-600 text-white border-slate-600">Python</Badge>
                    <Badge className="bg-slate-600 text-white border-slate-600">Go</Badge>
                    <Badge className="bg-slate-600 text-white border-slate-600">C</Badge>
                    <Badge className="bg-slate-600 text-white border-slate-600">SQL</Badge>
                    <Badge className="bg-slate-600 text-white border-slate-600">JavaScript</Badge>
                    <Badge className="bg-slate-600 text-white border-slate-600">HTML</Badge>
                    <Badge className="bg-slate-600 text-white border-slate-600">CSS</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-400">
          <p>&copy; 2024 Yehudah Tor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
