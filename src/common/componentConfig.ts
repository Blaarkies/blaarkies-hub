import {
  blaarkies,
  buildingAngularControls,
  buyMeACoffee,
  github,
  kspVisualCalculator,
  limblessLizard,
  twitter,
  wormsGame,
} from './indexImages';

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
      label: 'KSP Visual Calculator',
      source: kspVisualCalculator,
      color: '#78909C',
      url: 'https://ksp-visual-calculator.blaarkies.com',
    },
    {
      label: 'Building Angular Controls',
      source: buildingAngularControls,
      color: '#29B6F6',
      url: 'https://control-value-accessor.blaarkies.com/',
    },
    {
      label: 'Github',
      source: github,
      color: '#66BB6A',
      url: 'https://github.com/Blaarkies/Presentable-Angular',
      options: {
        shape: 'circle',
        background: '#000',
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
      url: 'https://reactjs-games.blaarkies.com/limbless-lizard',
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
      label: 'Worms Game',
      source: wormsGame,
      color: '#AB47BC',
      url: 'https://ec-2019-prototype.blaarkies.com/',
      options: {
        shape: 'circle',
      },
    },
  ],
}
