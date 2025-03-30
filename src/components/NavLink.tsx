'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";
import {ReactNode} from "react";

type NavLinkType = {
    href: string
    children: ReactNode
    compareMethod: 'equals' | 'startWith'
}
export const NavLink = ({href, children, compareMethod}: NavLinkType) => {

    const path = usePathname()  // This requires 'use client'

    let c: string | undefined = undefined

    if (
        compareMethod == 'equals' && path == href ||
        compareMethod == 'startWith' && path.startsWith(href)
    ) {
        c = 'active'
    }

    return (
        <Link href={href} className={c}>{children}</Link>
    )

}
