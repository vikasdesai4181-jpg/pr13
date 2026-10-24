import { useState } from 'react'
import {
  HashRouter,
  MemoryRouter,
  NavLink,
  Route,
  Routes,
  StaticRouter,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import routerMark from './assets/router-mark.png'
import './App.css'

const hashPages = [
  { path: '/', label: 'Overview', icon: '⌂' },
  { path: '/products', label: 'Products', icon: '◇' },
  { path: '/cart', label: 'Cart', icon: '▱' },
]

const memoryPages = [
  { path: '/home', label: 'Home' },
  { path: '/discover', label: 'Discover' },
  { path: '/saved', label: 'Saved' },
]

const staticPages = [
  { path: '/', label: 'Home' },
  { path: '/guide', label: 'Guide' },
  { path: '/contact', label: 'Contact' },
]

function PathIndicator({ prefix = '' }) {
  const { pathname } = useLocation()

  return (
    <div className="path-indicator">
      <span className="live-dot" />
      <span>{prefix}{pathname}</span>
    </div>
  )
}

function HashPage({ title, description, icon }) {
  return (
    <div className="demo-page">
      <div className="demo-page-icon">{icon}</div>
      <div>
        <span className="demo-kicker">HASH ROUTER PAGE</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

function HashDemo() {
  return (
    <section className="router-card hash-card" id="hash-demo">
      <div className="card-topline">
        <div className="router-number hash-number">01</div>
        <span className="router-label">URL-BASED</span>
      </div>
      <div className="card-title-row">
        <div>
          <h2>HashRouter</h2>
          <p className="card-intro">Routes live after a # in the URL.</p>
        </div>
        <div className="hash-symbol" aria-hidden="true">#</div>
      </div>

      <HashRouter>
        <nav className="hash-nav" aria-label="Hash router demo">
          {hashPages.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              end={path === '/'}
              to={path}
              className={({ isActive }) => `hash-link${isActive ? ' active' : ''}`}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hash-content">
          <PathIndicator />
          <Routes>
            <Route
              path="/"
              element={<HashPage title="Your overview" description="A quick look at what’s new today." icon="✳" />}
            />
            <Route
              path="/products"
              element={<HashPage title="Explore products" description="Browse the latest things to love." icon="◇" />}
            />
            <Route
              path="/cart"
              element={<HashPage title="Your cart" description="The good things you’ve picked out." icon="▱" />}
            />
          </Routes>
        </div>
      </HashRouter>

      <div className="code-note">
        <span className="code-dot" />
        <code>example.com<span>/#/products</span></code>
        <span className="note-caption">URL hash updates</span>
      </div>

      <div className="use-case">
        <span className="use-case-icon">◎</span>
        <div>
          <strong>Best for</strong>
          <p>Static hosting, legacy servers, or when you can’t configure URL rewrites.</p>
        </div>
      </div>
    </section>
  )
}

function MemoryPage({ title, description, emoji }) {
  return (
    <div className="memory-page">
      <span className="memory-emoji" aria-hidden="true">{emoji}</span>
      <div>
        <span className="demo-kicker">IN-MEMORY SCREEN</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

function MemoryControls() {
  const navigate = useNavigate()

  return (
    <div className="history-controls">
      <button type="button" onClick={() => navigate(-1)}>← Back</button>
      <button type="button" onClick={() => navigate(1)}>Forward →</button>
    </div>
  )
}

function MemoryDemo() {
  return (
    <section className="router-card memory-card" id="memory-demo">
      <div className="card-topline">
        <div className="router-number memory-number">02</div>
        <span className="router-label">SESSION-ONLY</span>
      </div>
      <div className="card-title-row">
        <div>
          <h2>MemoryRouter</h2>
          <p className="card-intro">Navigation stored in memory, not the URL.</p>
        </div>
        <div className="memory-symbol" aria-hidden="true">↝</div>
      </div>

      <MemoryRouter initialEntries={['/home']}>
        <nav className="memory-nav" aria-label="Memory router demo">
          {memoryPages.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `memory-link${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="memory-content">
          <div className="memory-toolbar">
            <PathIndicator prefix="memory:" />
            <MemoryControls />
          </div>
          <Routes>
            <Route
              path="/home"
              element={<MemoryPage title="Welcome in" description="This route exists only in this demo’s memory." emoji="☀" />}
            />
            <Route
              path="/discover"
              element={<MemoryPage title="Find something new" description="Try Back and Forward to explore the session history." emoji="⌕" />}
            />
            <Route
              path="/saved"
              element={<MemoryPage title="Saved for later" description="Your short list, held in temporary navigation state." emoji="♡" />}
            />
          </Routes>
        </div>
      </MemoryRouter>

      <div className="code-note">
        <span className="code-dot memory-dot" />
        <code>window.location <span>→ stays unchanged</span></code>
        <span className="note-caption">History is internal</span>
      </div>

      <div className="use-case">
        <span className="use-case-icon memory-case-icon">◎</span>
        <div>
          <strong>Best for</strong>
          <p>Tests, Storybook, embedded flows, or apps where browser history should stay untouched.</p>
        </div>
      </div>
    </section>
  )
}

function StaticPage({ title, description, path }) {
  return (
    <div className="static-page">
      <div className="static-page-icon" aria-hidden="true">▤</div>
      <div>
        <span className="demo-kicker">RENDERED FOR THIS REQUEST</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className="static-path">{path}</span>
    </div>
  )
}

function StaticPreview({ location }) {
  return (
    <StaticRouter location={location}>
      <Routes>
        <Route
          path="/"
          element={<StaticPage title="A page, ready to serve" description="StaticRouter matches the requested path without changing browser history." path="/" />}
        />
        <Route
          path="/guide"
          element={<StaticPage title="A guide for the curious" description="The server can render the right route directly into the response HTML." path="/guide" />}
        />
        <Route
          path="/contact"
          element={<StaticPage title="A way to reach us" description="This content is selected by the request path, not client navigation." path="/contact" />}
        />
      </Routes>
    </StaticRouter>
  )
}

function StaticDemo() {
  const [location, setLocation] = useState('/guide')

  return (
    <section className="router-card static-card" id="static-demo">
      <div className="card-topline">
        <div className="router-number static-number">03</div>
        <span className="router-label">FIXED LOCATION</span>
      </div>
      <div className="card-title-row">
        <div>
          <h2>StaticRouter</h2>
          <p className="card-intro">Renders a route for a given location without navigation.</p>
        </div>
        <div className="static-symbol" aria-hidden="true">▣</div>
      </div>

      <div className="static-demo">
        <div className="static-toolbar">
          <div className="server-indicator"><span /> SERVER RENDER PREVIEW</div>
          <span className="static-host">request.url</span>
        </div>
        <div className="static-location-picker" aria-label="Choose a request path">
          {staticPages.map(({ path, label }) => (
            <button
              key={path}
              className={location === path ? 'active' : ''}
              type="button"
              onClick={() => setLocation(path)}
            >
              {label}
            </button>
          ))}
        </div>
        <StaticPreview location={location} />
      </div>

      <div className="code-note">
        <span className="code-dot static-dot" />
        <code>{'<StaticRouter location="/guide">'}</code>
        <span className="note-caption">Fixed request path</span>
      </div>

      <div className="use-case">
        <span className="use-case-icon static-case-icon">◎</span>
        <div>
          <strong>Best for</strong>
          <p>Server-side rendering: match a request URL and return HTML before the browser loads.</p>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark"><img src={routerMark} alt="" /></span>
          <span>route<span className="brand-dot">lab</span></span>
        </div>
        <div className="header-tag"><span /> REACT ROUTER FIELD GUIDE</div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span>THE ROUTER COLLECTION</span><i /></div>
            <h1>Three routers.<br /><span>Three different jobs.</span></h1>
            <p className="hero-description">
              React Router can read a URL, keep navigation private, or render a
              fixed request. Try each one below and see where it fits.
            </p>
            <div className="router-legend">
              <span><i className="legend-hash" /> HashRouter</span>
              <span><i className="legend-memory" /> MemoryRouter</span>
              <span><i className="legend-static" /> StaticRouter</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-glow" />
            <img src={routerMark} alt="" />
            <div className="art-caption"><span>ROUTING,</span><strong>BY DESIGN.</strong></div>
          </div>
        </section>

        <div className="section-heading">
          <div>
            <span className="section-index">01 / 03</span>
            <h2>Explore the routers</h2>
          </div>
          <p>Each panel is its own isolated router demo.</p>
        </div>

        <div className="router-grid">
          <HashDemo />
          <MemoryDemo />
          <StaticDemo />
        </div>

        <section className="decision-strip">
          <div className="decision-icon">✳</div>
          <div>
            <span>QUICK PICK</span>
            <p>Need shareable URLs? <strong>HashRouter.</strong> Need private session flow? <strong>MemoryRouter.</strong> Rendering on the server? <strong>StaticRouter.</strong></p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>route<span>lab</span> <i>·</i> A tiny guide to React Router</span>
        <span>Built to make routes make sense.</span>
      </footer>
    </div>
  )
}

export default App
