'use client'

import { useEffect } from 'react'

export function PageEffects() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    const navbar = document.getElementById('navbar')

    const onMove = (e: MouseEvent) => {
      if (!cursor || !ring) return
      cursor.style.left = `${e.clientX}px`
      cursor.style.top  = `${e.clientY}px`
      ring.style.left   = `${e.clientX}px`
      ring.style.top    = `${e.clientY}px`
    }

    const onScroll = () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 60)
    }

    document.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll)

    const interactive = document.querySelectorAll('a, button, article')
    const onEnter = () => { cursor?.classList.add('expanded'); ring?.classList.add('expanded') }
    const onLeave = () => { cursor?.classList.remove('expanded'); ring?.classList.remove('expanded') }
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    const petalTimers: ReturnType<typeof setTimeout>[] = []
    const createPetal = () => {
      const p = document.createElement('div')
      p.className = 'petal'
      p.style.left             = `${Math.random() * 100}vw`
      p.style.width            = `${4  + Math.random() * 6}px`
      p.style.height           = `${10 + Math.random() * 12}px`
      p.style.setProperty('--op', String(0.2 + Math.random() * 0.3))
      p.style.animationDuration = `${10 + Math.random() * 10}s`
      p.style.animationDelay   = `${Math.random() * 2}s`
      p.style.animationName    = 'petalFall'
      p.style.animationTimingFunction = 'ease-in'
      p.style.animationFillMode = 'forwards'
      p.style.background       = Math.random() > 0.5
        ? 'var(--color-mint-light)'
        : 'var(--color-olive-light)'
      document.body.appendChild(p)
      const id = setTimeout(() => p.remove(), 22000)
      petalTimers.push(id)
    }
    const petalInterval = setInterval(createPetal, 2500)

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      observer.disconnect()
      clearInterval(petalInterval)
      petalTimers.forEach(clearTimeout)
      document.querySelectorAll('.petal').forEach((el) => el.remove())
    }
  }, [])

  return (
    <>
      <div id="cursor"      className="cursor" />
      <div id="cursor-ring" className="cursor-ring" />
    </>
  )
}
