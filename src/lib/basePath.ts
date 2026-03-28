export function withBase(path: string): string {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalizedPath}`
}

export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL
  if (base === '/') {
    return pathname || '/'
  }

  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  if (pathname === normalizedBase) {
    return '/'
  }

  if (pathname.startsWith(`${normalizedBase}/`)) {
    return pathname.slice(normalizedBase.length) || '/'
  }

  return pathname || '/'
}
