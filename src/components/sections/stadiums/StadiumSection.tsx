"use client"

import React from 'react'
import StadiumHeader from './StadiumHeader'
import StadiumCard from './StadiumCard'

export default function StadiumSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#131313]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <StadiumHeader />

        {/* Grid Layout: Main Large Card + Sidebar with Smaller Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-5">
          {/* Main Showcase */}
          <StadiumCard 
            variant="large"
            title="AZTECA STADIUM, MEXICO CITY"
            capacity="87,523"
            height="460px"
          />

          {/* Secondary Venues Column */}
          <div className="flex flex-col gap-5">
            <StadiumCard 
              title="SOFI STADIUM"
              location="LOS ANGELES"
              height="220px"
              bgColor="#1a1918"
            />
            <StadiumCard 
              title="BC PLACE"
              location="VANCOUVER"
              height="220px"
              bgColor="#161a19"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
