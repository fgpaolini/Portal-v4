import { Icon } from "#build/components";
import { TipoSubdomain } from "~/config/enums/TipoSubdomain";

// import IconLideraLight from '@/assets/img/logo_lidera.png';
// import IconLideraDark from '@/assets/img/logo_lidera.png';
import IconLideraLight from '@/assets/img/LideraCobrandingLogo.svg';
import IconLideraDark from '@/assets/img/LideraCobrandingLogo.svg';
// import LogoIdentidadLideraLight from '@/assets/img/lidera-dark-400x158.webp';
// import LogoIdentidadLideraDark from '@/assets/img/lidera-dark-400x158.webp';
import LogoIdentidadLideraLight from '@/assets/img/LideraCobrandingLogo.svg';
import LogoIdentidadLideraDark from '@/assets/img/LideraCobrandingLogo.svg';
import FaviconLidera from '@/assets/img/icLidera.ico';

import IconOptimusLight from '@/assets/img/optimus/optimus_clear_blue.png';
import IconOptimusDark from '@/assets/img/optimus/optimus_air_white.png';
import LogoOptimusIdentidadLight from '@/assets/img/optimus/optimus_positivo_400x200.png';
import LogoOptimusIdentidadDark from '@/assets/img/optimus/optimus_negativo_400x200.png';
import FaviconOptimus from '@/assets/img/optimus/favicon.ico';

import IconKleenEnergyLight from '@/assets/img/kleenenergy/kleen_energy.png';
import IconKleenEnergyDark from '@/assets/img/kleenenergy/kleen_energy_white.png';
import LogoIdentidadKleenEnergyLight from '@/assets/img/kleenenergy/kleen_energy_text_400x158.png';
import LogoIdentidadKleenEnergyDark from '@/assets/img/kleenenergy/kleen_energy_text_400x158.png';
import FaviconKleenEnergy from '@/assets/img/kleenenergy/favicon.ico';

export default defineNuxtPlugin((nuxtApp) => {
    const location = window.location.hostname;
    const subdomnain = location.split('.')[1] as TipoSubdomain;

    //console.log(location)

    const Lidera : CustomAppDefault = {
        Domain: TipoSubdomain.PORTAL_LIDERA,
        Name: 'Lidera Energia',
        Theme: 'aura-light-green',
        Icon:   {
            Light: IconLideraLight,
            Dark: IconLideraDark,
        },
        LogoIdentidad: {
            Light: LogoIdentidadLideraLight,
            Dark: LogoIdentidadLideraDark,
        },
        Favicon: FaviconLidera,
    }
    
    const Optimus : CustomAppDefault = {
        Domain: TipoSubdomain.PORTAL_OPTIMUS,
        Name: 'Grupo Optimus',
        Theme: 'aura-light-cyan',
        Icon:   {
            Light: IconOptimusLight,
            Dark: IconOptimusDark,
        },
        LogoIdentidad: {
            Light: LogoOptimusIdentidadLight,
            Dark: LogoOptimusIdentidadDark,
        },
        Favicon: FaviconOptimus,
    }
    
    const Kleenenergy : CustomAppDefault = {
        Domain: TipoSubdomain.PORTAL_KLEEN_ENERGY,
        Name: 'Kleen Energy',
        Theme: 'aura-light-teal',
        Icon:   {
            Light: IconKleenEnergyLight,
            Dark: IconKleenEnergyDark,
        },
        LogoIdentidad: {
            Light: LogoIdentidadKleenEnergyLight,
            Dark: LogoIdentidadKleenEnergyDark,
        },
        Favicon: FaviconKleenEnergy
    }

    let Appearence = null;
    
    switch(subdomnain) {
        case TipoSubdomain.PORTAL_LIDERA:
            Appearence = Lidera;
            break;
        case TipoSubdomain.PORTAL_OPTIMUS:
            Appearence = Optimus;
            break;
        case TipoSubdomain.PORTAL_KLEEN_ENERGY:
            Appearence = Kleenenergy;
            break; 
        default:
            Appearence = Lidera;
            break;
    }

    const setFavicon = () => {        
        useFavicon(Appearence.Favicon, {
            rel: 'icon',
        });
    }

    setFavicon();

    return {
        provide: {
            customApp: Appearence,
            pageTitle: 'Portal',
        }
    }
})