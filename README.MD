# RunSpace // Developer Command Dashboard


<p align="center">
  <strong>Instant reference, copyable infrastructure commands, and container operation workflows.</strong>
</p>

<p align="center">
  <a href="https://github.com/yibeltal-gashaw/RunSpace"><img src="https://img.shields.io/badge/Waku-React%20Server%20Components-black?style=flat-square&logo=react" alt="Waku RSC"/></a>
  <a href="https://fumadocs.dev"><img src="https://img.shields.io/badge/Fumadocs-Docs%20Engine-blue?style=flat-square" alt="Fumadocs"/></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS v4"/></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-Ready-3178c6?style=flat-square&logo=typescript" alt="TypeScript"/></a>
  <a href="https://github.com/yibeltal-gashaw/RunSpace/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-emerald?style=flat-square" alt="License"/></a>
</p>

---

## ⚡ Overview

**RunSpace** is an ultra-fast developer command dashboard engineered for immediate access to daily operational workflows. It consolidates verified CLI snippets, Git disaster recovery steps, container orchestration patterns, API debugging recipes, and database triage procedures into one searchable interface.

Built on top of **React Server Components (RSC)** using **Waku** and **Fumadocs**, RunSpace serves static, zero-latency documentation optimized for keyboard-first navigation and mobile developers.

---

## 🔍 Omni-Search Router Syntax

The global search bar acts as an omni-router for developers. Prepend queries with search shortcuts to jump directly to target engines:

| Prefix | Destination | Example Query | Target Destination |
| :--- | :--- | :--- | :--- |
| `d:` | **Docker Hub** | `d: redis alpine` | [hub.docker.com](https://hub.docker.com) |
| `gh:` | **GitHub** | `gh: waku` | [github.com](https://github.com) |
| `so:` | **StackOverflow** | `so: docker socket permission` | [stackoverflow.com](https://stackoverflow.com) |
| *(none)* | **Google Search** | `tailscale exit node guide` | [google.com](https://google.com) |

---

## 📚 Knowledge Categories

### 🛠️ Developer Core & Toolchains
- **Git & GitHub CLI (`gh`)**: Reflog disaster recovery, interactive rebase, autosquash, worktrees, branch cleanup, and PR hygiene.
- **API & Data Wrangling**: Latency profiling with `curl`, JSON wrangling with `jq`, in-place YAML manipulation with `yq`, and modern HTTP testing with `httpie`.
- **Modern Unix CLI**: High-performance Rust & Go utilities: `ripgrep`, `fd`, `fzf`, `zoxide`, `bat`, `eza`, `dust`, and `bottom`.
- **Toolchains & Runners**: Polyglot runtime management via `mise` and `asdf`, automated directory environments with `direnv`, and task management via `just`.

### 🐳 Containers & Cloud
- **Docker**: Container lifecycle management, live log streaming, multi-container Compose stacks, daemon configuration, and garbage collection.
- **Portainer**: Docker host UI management, edge agents deployment, volume backups, and admin password reset procedures.
- **Kubernetes (`k8s`)**: Pod triage, CrashLoopBackOff & OOMKilled diagnostics, port forwarding, config management, `k9s` navigation, and Helm deployments.
- **WSO2 Carbon**: Enterprise middleware diagnostics, correlation ID request tracing, and real-time production log tailing.

### 🗄️ Databases, Network & Security
- **Databases & Caches**: Non-blocking `SCAN`/`MONITOR` in Redis, lock termination and query profiling in PostgreSQL, and CLI formatting with SQLite.
- **Network & Tailscale**: Mesh VPN topologies, subnet routers, exit node advertisement, and network path diagnostics (`mtr`, `tcpdump`, `nc`).
- **SSH & Tunneling**: Local, remote, and dynamic SOCKS5 forwarding, bastion `ProxyJump` configurations, and public tunnels via `cloudflared` & `ngrok`.
- **Security & Secrets**: Remote SSL/TLS certificate inspection with `openssl`, local wildcard certs with `mkcert`, secrets auditing with `gitleaks`, and vulnerability scanning with `trivy`.

### 💻 Operating Systems & Scripting
- **Linux Operations**: Process trees (`htop`, `ps`), disk utilization (`ncdu`), memory triage, systemd services, and journalctl filters.
- **PowerShell**: Port hunting (`Get-NetTCPConnection`), REST API requests (`Invoke-RestMethod`), environment variable debugging, and file management.
- **System / Windows**: WSL instance management and compaction, batch application upgrades via `winget`, and task kills.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `20.x` or later (LTS recommended)
- **npm** or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yibeltal-gashaw/RunSpace.git
   cd RunSpace
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   This generates pre-rendered static assets and server bundles inside the `dist/` directory.

5. **Preview production build:**
   ```bash
   npm run start
   ```

---

## 🗂️ Project Structure

```plaintext
RunSpace/
├── content/
│   └── docs/                     # Documentation MDX files and navigation structure
│       ├── api/                  # API testing & data manipulation guides
│       ├── databases/            # PostgreSQL, Redis, SQLite references
│       ├── docker/               # Docker & Compose commands
│       ├── git/                  # Git recovery and CLI workflows
│       ├── kubernetes/           # K8s triage & workload management
│       ├── linux/                # Linux commands & resource monitoring
│       ├── modern-cli/           # Modern CLI tools (ripgrep, fd, fzf, etc.)
│       ├── network/              # Tailscale & network troubleshooting
│       ├── portainer/            # Portainer deployment and maintenance
│       ├── powershell/           # PowerShell developer recipes
│       ├── security/             # SSL certs & security scanners
│       ├── ssh-tunneling/        # SSH forwarding & tunnel services
│       ├── system/               # WSL and OS utilities
│       ├── toolchains/           # mise, asdf, direnv, just
│       ├── wso2/                 # WSO2 Carbon logs & tracing
│       ├── index.mdx             # Main documentation homepage
│       └── meta.json             # Root navigation tree
├── src/
│   ├── components/               # Custom MDX & UI components
│   │   ├── mdx.tsx               # MDX component mappings
│   │   ├── provider.tsx          # Root provider setup
│   │   ├── redirect.tsx          # Client-side router redirects
│   │   └── ui-docs.tsx           # Command buttons & interactive badges
│   ├── lib/                      # Core configuration and helpers
│   │   ├── layout.shared.tsx     # Base layout configuration
│   │   ├── shared.ts             # Metadata & Git repository config
│   │   └── source.ts             # Fumadocs content source loader
│   ├── pages/                    # Waku RSC file-based routes
│   │   ├── docs/                 # Documentation route handlers
│   │   ├── index.tsx             # Root page redirect
│   │   └── _root.tsx             # Root HTML layout and font configurations
│   └── styles/
│       └── globals.css           # Tailwind CSS v4 and RunSpace theme overrides
├── package.json
└── tsconfig.json
```

---

## 🛠️ Built With

- **[Waku](https://waku.gg/)** – Minimal React Server Components framework.
- **[Fumadocs](https://fumadocs.dev/)** – Powerful documentation engine built for modern React.
- **[Tailwind CSS v4](https://tailwindcss.com/)** – High-speed CSS engine for streamlined design.
- **[Lucide Icons](https://lucide.dev/)** – Crisp, lightweight icons.
- **[TypeScript](https://www.typescriptlang.org/)** – Strict typing for reliable developer tools.

---

## 🤝 Contributing

Contributions, feedback, and command additions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewCommandGuide`)
3. Commit your Changes (`git commit -m 'feat(docs): add new command reference'`)
4. Push to the Branch (`git push origin feature/NewCommandGuide`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
