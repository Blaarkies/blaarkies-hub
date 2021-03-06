import {
  blaarkies,
  buildingAngularControls,
  buyMeACoffee,
  github,
  kspVisualCalculator,
  limblessLizard,
  twitter,
  wormsGame,
} from './images'

interface SectorOptions {
  shape?: 'circle'
  background?: string
}

interface Sector {
  label: string
  source: string
  color: string
  url: string
  options?: SectorOptions
}

interface RadialContainerConfig {
  sourceMain: string
  sectors: Sector[]
}

export const MainRadialContainerConfig: RadialContainerConfig = {
  sourceMain: blaarkies,
  sectors: [
    {
      label: 'Github',
      source: github,
      color: '#66BB6A',
      url: 'https://github.com/Blaarkies',
      options: {
        shape: 'circle',
        background: '#000',
      },
    },
    {
      label: 'Angular Controls',
      source: buildingAngularControls,
      color: '#29B6F6',
      url: 'https://control-value-accessor.netlify.app',
    },
    {
      label: 'Worms Game',
      source: wormsGame,
      color: '#AB47BC',
      url: 'https://ec-2019-prototype.netlify.app',
      options: {
        shape: 'circle',
      },
    },
    {
      label: 'Twitter',
      source: twitter,
      color: '#BDBDBD',
      url: 'https://twitter.com/Blaarkies',
      options: {
        shape: 'circle',
        background: '#fff',
      },
    },
    {
      label: 'Limbless Lizard',
      source: limblessLizard,
      color: '#FF7043',
      url: 'https://reactjs-games-blaarkies.netlify.app/limbless-lizard',
      options: {
        shape: 'circle',
      },
    },
    {
      label: 'Buy Me a Coffee',
      source: buyMeACoffee,
      color: '#FFEE58',
      url: 'https://www.buymeacoffee.com/Blaarkies',
      options: {
        shape: 'circle',
        background: '#fff',
      },
    },
    {
      label: 'KSP Visual Calculator',
      source: kspVisualCalculator,
      color: '#78909C',
      url: 'https://ksp-visual-calculator.blaarkies.com',
    },
  ],
}
