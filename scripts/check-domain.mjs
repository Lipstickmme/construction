/**
 * Fails the build if the site's email domain is spelled more than one way.
 *
 * The address lives in two places by necessity. `src/data/site.ts` is what
 * the browser displays and is baked in at build time, `api/_shared.ts` is what
 * the server sends from and must match the domain verified in Resend. When
 * those drifted apart, Resend answered 403 "Domain not verified" and the site
 * showed visitors an address that bounced. Neither failure announced itself.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const files = ['src/data/site.ts', 'api/_shared.ts', 'api/health.ts']
const pattern = /[A-Za-z0-9._-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})/g

const found = new Map()

for (const file of files) {
  const text = readFileSync(join(root, file), 'utf8')
  for (const match of text.matchAll(pattern)) {
    const domain = match[1].toLowerCase()
    // Placeholders in comments and examples are not the site's own address.
    if (domain.endsWith('.example') || domain === 'example.com') continue
    if (!found.has(domain)) found.set(domain, new Set())
    found.get(domain).add(file)
  }
}

// The API also derives everything from one DOMAIN constant; check it agrees.
const shared = readFileSync(join(root, 'api/_shared.ts'), 'utf8')
const declared = shared.match(/MAIL_DOMAIN.*?\?\?\s*'([^']+)'/)?.[1]
if (declared) {
  if (!found.has(declared)) found.set(declared, new Set())
  found.get(declared).add('api/_shared.ts (DOMAIN)')
}

const domains = [...found.keys()]

if (domains.length > 1) {
  console.error('\n✗ The email domain is spelled inconsistently:\n')
  for (const [domain, where] of found) {
    console.error(`    ${domain}`)
    for (const file of where) console.error(`      ${file}`)
  }
  console.error(
    '\n  All of these must be the domain verified in Resend, or sending\n' +
      '  returns 403 and the site shows an address that bounces.\n',
  )
  process.exit(1)
}

console.log(`✓ email domain consistent: ${domains[0] ?? '(none found)'}`)
