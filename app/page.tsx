"use client"
import React, { useState, useRef, useEffect } from "react"
import L from "leaflet"
import { UnnatKhetiLogo } from "@/components/logo-unnatkheti"
import Map from "@/components/Map"

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm font-medium text-slate-300 hover:text-[#2e7d32] transition-colors">
      {children}
    </a>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-center text-3xl md:text-4xl font-semibold tracking-tight text-balance">{children}</h2>
}

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const mapRef = useRef<L.Map | null>(null)
  const [eeData, setEeData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [])
  

  useEffect(() => {
    // @ts-ignore
    import("leaflet/dist/leaflet.css")
  }, [])
  const districts: Record<string, [number, number]> = {
  "delhi": [28.6139, 77.2090],
  "mumbai": [19.0760, 72.8777],
  "kolkata": [22.5726, 88.3639],
  "chennai": [13.0827, 80.2707],
  "bengaluru": [12.9716, 77.5946],
  // Add more as needed
};

  const fetchEarthEngineData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/earthengine")
      const data = await response.json()
      if (data.success) {
        setEeData(data.data)
      } else {
        setError(data.error || "An unknown error occurred")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <UnnatKhetiLogo className="h-9 w-9 md:h-10 md:w-10 shrink-0" />
              <span className="text-xl md:text-2xl font-semibold tracking-tight whitespace-nowrap">UNNATKHETI</span>
            </div>
            <nav aria-label="Primary" className="hidden md:flex items-center justify-center gap-6 min-w-0">
              <NavLink href="#what-it-does">What It Does</NavLink>
              <NavLink href="#demo">Demo</NavLink>
              <NavLink href="#how-we-built-it">How We Built It</NavLink>
              <NavLink href="#challenges">Challenges</NavLink>
              <NavLink href="#accomplishments">Accomplishments</NavLink>
              <NavLink href="#whats-next">What’s Next</NavLink>
            </nav>
            <a
              href="#demo"
              className="justify-self-end flex h-10 items-center justify-center rounded-md bg-[#2e7d32] px-4 text-sm font-semibold text-white text-center self-center hover:bg-[#276a2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32]/60"
            >
              Try Demo
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate" aria-labelledby="hero-title">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/crop-fields.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-black/60" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
          <div className="flex flex-col items-center text-center gap-4">
            <UnnatKhetiLogo className="h-16 w-16" />
            <h1 id="hero-title" className="text-4xl md:text-6xl font-semibold tracking-tight text-balance">
              UNNATKHETI
            </h1>
            <p className="max-w-2xl text-slate-300 md:text-lg leading-relaxed">
              AI + Satellite data for smarter, greener farming. Plan, monitor, and grow sustainably with actionable
              insights tailored to your fields.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-md bg-[#2e7d32] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#276a2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32]/60"
              >
                Try Demo
              </a>
              <a
                href="#what-it-does"
                className="inline-flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What It Does */}
      <section id="what-it-does" className="px-4 md:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle>What It Does</SectionTitle>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 text-[#2e7d32]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M213.54,37.54a8,8,0,0,0-11.08,0L89,151l-42.54-42.53a8,8,0,0,0-11.32,11.31l48,48a8,8,0,0,0,11.32,0l120-120A8,8,0,0,0,213.54,37.54Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Crop Identification</h3>
              <p className="mt-2 text-slate-400">
                Identify crop types with high accuracy using satellite imagery and AI.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 text-[#2e7d32]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Smart Planning</h3>
              <p className="mt-2 text-slate-400">Optimize from seeding to harvest with actionable recommendations.</p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 text-[#2e7d32]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8.47-24.16a8,8,0,0,1-13.62-7.13c5.44-32.5,23.36-44,46.28-56.45,18-10,21.81-19.14,13.25-27.7S140.23,89,122.18,99c-14.88,8.21-29.35,16.2-46.7,5.55a8,8,0,0,1-1.63-14.54c29.13-18,61.43-16.7,78.27-1.16s22.84,40.16-5.46,58.33c-23.77,15.22-38.21,26.43-32.7,56.55A8,8,0,0,1,119.53,191.84Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Eco Harmony</h3>
              <p className="mt-2 text-slate-400">
                Support sustainable practices for farmers, citizens, and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="px-4 md:px-8 py-16 bg-zinc-900/50">
        <div className="mx-auto max-w-7xl">
      <SectionTitle>Demo Map</SectionTitle>
     <div className="mt-10 relative h-[520px] w-full rounded-lg border border-zinc-800 overflow-hidden">
    {mounted && (
      <Map
        key="main-map"
        center={[20.5937, 78.9629]} // Center on India
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        mapRef={mapRef}
      />
    )}
        <div className="absolute inset-0 rounded-lg bg-black/40" />

            <div className="absolute top-6 left-6">
              <div className="relative w-72">
                <input
  value={searchValue}
  onChange={e => setSearchValue(e.target.value)}
  onKeyDown={e => {
    if (e.key === "Enter") {
      const key = searchValue.trim().toLowerCase();
      if (districts[key] && mapRef.current) {
        mapRef.current.setView(districts[key], 10);
      }
    }
  }}
  placeholder="Search districts..."
  className="w-full rounded-md border border-transparent bg-zinc-800/90 py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-[#2e7d32]/50"
/>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
  <button
    className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-800/90 text-white hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600"
    aria-label="Zoom in"
    onClick={() => {
      if (mapRef.current) {
        mapRef.current.setZoom(mapRef.current.getZoom() + 1)
      }
    }}
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
    </svg>
  </button>
  <button
    className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-800/90 text-white hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600"
    aria-label="Zoom out"
    onClick={() => {
      if (mapRef.current) {
        mapRef.current.setZoom(mapRef.current.getZoom() - 1)
      }
    }}
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" />
    </svg>
  </button>
</div>
          </div>
        </div>
      </section>

      {/* Fetch Earth Engine Data */}
      <section id="fetch-data" className="px-4 md:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle>Fetch Earth Engine Data</SectionTitle>
          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              onClick={fetchEarthEngineData}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md bg-[#2e7d32] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#276a2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32]/60 disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Fetch Data"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {eeData && (
              <div className="mt-4 w-full max-w-4xl rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="text-lg font-semibold text-white">Earth Engine API Response</h3>
                <pre className="mt-2 text-sm text-slate-300 overflow-auto whitespace-pre-wrap">
                  {JSON.stringify(eeData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How we built it */}
      <section id="how-we-built-it" className="px-4 md:px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <SectionTitle>How We Built It</SectionTitle>
          <div className="mt-10 space-y-6">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-lg font-semibold text-[#2e7d32]">Inspiration</h3>
              <p className="mt-2 text-slate-400">
                Inspired by the need for accessible, data-driven tools that empower sustainable farming.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-lg font-semibold text-[#2e7d32]">Technology Stack</h3>
              <p className="mt-2 text-slate-400">
                Python for AI, Google Earth Engine for satellite data, modern web UI.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-lg font-semibold text-[#2e7d32]">Development</h3>
              <p className="mt-2 text-slate-400">
                Iteratively designed for usability, performance, and clear insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section id="challenges" className="px-4 md:px-8 py-16 bg-zinc-900/50">
        <div className="mx-auto max-w-7xl">
          <SectionTitle>Challenges We Faced</SectionTitle>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Data Acquisition",
                body: "Sourcing and processing high-resolution, cloud-free satellite imagery was challenging.",
              },
              {
                title: "Model Training",
                body: "Training accurate models with limited ground-truth data required creative augmentation.",
              },
              { title: "UI/UX Design", body: "Designing an intuitive interface for varying tech literacy levels." },
              { title: "Scalability", body: "Architecting for large-scale data processing and user traffic." },
            ].map((c) => (
              <div key={c.title} className="rounded-lg bg-amber-200 p-5 text-zinc-900">
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accomplishments */}
      <section id="accomplishments" className="px-4 md:px-8 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionTitle>Accomplishments</SectionTitle>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["Functional Prototype", "Positive Early Feedback", "Scalable Architecture"].map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <span className="text-[#2e7d32]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M229.66,77.66l-128,128a8,8,0,0,0-11.32,0l-56-56a8,8,0,0,0,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,0,11.32,11.32Z" />
                  </svg>
                </span>
                <h3 className="text-base font-semibold">{t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's next */}
      <section id="whats-next" className="px-4 md:px-8 py-16 bg-zinc-900/50">
        <div className="mx-auto max-w-5xl">
          <SectionTitle>What’s Next</SectionTitle>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["Expand Coverage", "Intensive User Testing", "Aim for Global Reach"].map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <span className="text-slate-300">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M128,16a88.1,88.1,0,1,0,88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,120a32,32,0,1,1,32-32A32,32,0,0,1,128,136Z" />
                  </svg>
                </span>
                <h3 className="text-base font-semibold">{t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-4 flex justify-center gap-6">
            {["twitter", "facebook", "instagram"].map((k) => (
              <a key={k} href="#" className="text-slate-400 hover:text-[#2e7d32]" aria-label={k}>
                <svg className="h-6 w-6" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="128" cy="128" r="96" opacity="0" />
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Z" />
                </svg>
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-[#2e7d32]">
            UNNATKHETI — Towards peaceful growth for farmers, citizens, and the planet
          </p>
        </div>
      </footer>
    </main>
  )
}
