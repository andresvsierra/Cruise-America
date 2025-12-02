import nextConfig from 'eslint-config-next'

const customIgnores = {
  ignores: ['pnpm-lock.yaml', 'pnpm-workspace.yaml'],
}

const config = [...nextConfig, customIgnores]

export default config

