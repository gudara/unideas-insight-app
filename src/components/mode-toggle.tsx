'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cx } from 'class-variance-authority'

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <span className="w-full flex items-stretch px-0" onClick={toggleTheme} >
            <Moon className={cx("h-[1.2rem] w-[1.2rem] hover:rotate-45", theme === 'light' ? 'block' : 'hidden')} />
            <Sun className={cx("h-[1.2rem] w-[1.2rem] hover:rotate-45", theme !== 'light' ? 'block' : 'hidden')} />
            <span className='pl-2'>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </span>
    )
}

