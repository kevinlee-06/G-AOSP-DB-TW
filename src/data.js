const appModules = import.meta.glob('../apps/*.json', {
  eager: true,
  import: 'default',
})

export const apps = Object.values(appModules).sort((a, b) =>
  a.name.localeCompare(b.name, 'zh-Hant'),
)

export function getApp(packageName) {
  return apps.find((app) => app.packageName === packageName)
}

export function getAppIcon(packageName) {
  const iconModules = import.meta.glob('../public/icons/*', {
    eager: true,
    query: '?url',
    import: 'default',
  })
  const icon = Object.entries(iconModules).find(([path]) =>
    path.includes(`/${packageName}.`),
  )

  return icon?.[1] ?? '/icons/default.svg'
}
