import SpaceExplorer from '@/components/SpaceExplorer/SpaceExplorer';
import OverlayLanding from '@/components/OverlayLandingComponent';
import OverlayPlanets from "@/components/OverlayPlanets";
import OverlaySign from '@/components/OverleySign';


export default function App () {
    return(
      <>
        <SpaceExplorer />
        <OverlayLanding />
        <OverlayPlanets />
        <OverlaySign/>
      </>
    );
}
