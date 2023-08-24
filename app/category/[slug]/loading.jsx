import Hero from '@/app/components/Hero/Hero'
import React from 'react'

function loading() {
  return (
    <Hero isHome={false} title={"Loading..."} />
  )
}

export default loading