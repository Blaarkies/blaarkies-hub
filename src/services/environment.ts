type Environment = { env: { MODE: string } }

const buildTypes = {development: '', production: ''}
type BuildType = keyof typeof buildTypes

let envMode = (import.meta as unknown as Environment).env.MODE
if (!Object.keys(buildTypes).includes(envMode)) {
  throw new Error(`ENV mode [${envMode}] is not a valid build type`)
}
let buildType = envMode as BuildType

if (buildType === 'development') {
  console.info('Blaarkies Hub started in%c development mode', 'color: #9ff')
}

export const environmentService = {
  buildType,
}
