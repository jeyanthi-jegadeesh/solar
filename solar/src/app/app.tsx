import SpaceExplorer from '@/components/SpaceExplorer/SpaceExplorer';
import OverlayLanding from '@/components/OverlayLandingComponent';
import OverlayPlanets from "@/components/OverlayPlanets";


export default function App () {
    return(
      <>
        <SpaceExplorer />
        <OverlayLanding />
        <OverlayPlanets />
      </>
    );
}
