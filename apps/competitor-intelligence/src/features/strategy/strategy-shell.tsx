"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronRight, Menu, Presentation, X } from "lucide-react";
import React, { useState, type ReactNode } from "react";
import { strategyNavigation } from "./content";
import { PrdProvider } from "../prd/prd-provider";
import styles from "./strategy.module.css";

export function StrategyShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === "/strategy/presentation") return <PrdProvider><div className={styles.strategyRoot}>{children}</div></PrdProvider>;

  return <PrdProvider><div className={styles.strategyRoot}>
    <a className={styles.skipLink} href="#strategy-content">Skip to strategy content</a>
    <header className={styles.mobileHeader}>
      <button type="button" className={styles.iconButton} aria-label="Open strategy navigation" onClick={() => setMenuOpen(true)}><Menu aria-hidden="true" size={20} /></button>
      <Link href="/strategy" className={styles.mobileBrand}>HireNudge <span>PRD</span></Link>
      <Link className={styles.iconButton} href="/strategy/presentation" aria-label="Presentation mode"><Presentation aria-hidden="true" size={19} /></Link>
    </header>
    {menuOpen ? <button type="button" className={styles.navScrim} aria-label="Dismiss navigation backdrop" onClick={() => setMenuOpen(false)} /> : null}
    <aside className={`${styles.strategyNav} ${menuOpen ? styles.strategyNavOpen : ""}`}>
      <div className={styles.navBrand}>
        <Link href="/strategy"><span className={styles.brandMark}>H</span><span><strong>HireNudge</strong><small>Product Command Center</small></span></Link>
        {menuOpen ? <button type="button" className={styles.navClose} aria-label="Close strategy navigation" onClick={() => setMenuOpen(false)}><X aria-hidden="true" size={19} /></button> : null}
      </div>
      <div className={styles.navLabel}>PRD OPERATING SYSTEM</div>
      <nav aria-label="Strategy sections" className={styles.navLinks}>
        {strategyNavigation.map((item, index) => {
          const active = item.href === "/strategy" ? pathname === "/strategy" : pathname.startsWith(item.href);
          return <Link key={item.slug} href={item.href} onClick={() => setMenuOpen(false)} className={active ? styles.navActive : undefined} aria-current={active ? "page" : undefined}>
            <span className={styles.navIndex}>{String(index + 1).padStart(2, "0")}</span>
            <span><strong>{item.shortLabel}</strong><small>{item.description}</small></span>
            <ChevronRight className={styles.navChevron} aria-hidden="true" size={15} />
          </Link>;
        })}
      </nav>
      <div className={styles.navFooter}>
        <Link href="/strategy/presentation" className={styles.presentationLink}><Presentation aria-hidden="true" size={17} /><span><strong>Presentation mode</strong><small>15-part founder walkthrough</small></span></Link>
        <a href="https://github.com/priyanshbajpai/Hirenudge-Startegy/tree/main/docs/research" target="_blank" rel="noreferrer"><BookOpen aria-hidden="true" size={16} />Research archive</a>
        <p>Edits save only in this browser</p>
      </div>
    </aside>
    <main id="strategy-content" className={styles.strategyMain} tabIndex={-1}>
      <div className={styles.utilityBar}>
        <span>Research cut-off · 6 Aug 2026</span>
        <span className={styles.utilityStatus}><i aria-hidden="true" /> Local editable draft · no approvals inferred</span>
        <Link href="/strategy/presentation"><Presentation aria-hidden="true" size={16} /> Presentation mode</Link>
      </div>
      <div className={styles.strategyCanvas}>{children}</div>
    </main>
  </div></PrdProvider>;
}
