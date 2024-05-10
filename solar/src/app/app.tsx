import SpaceExplorer from '@/components/SpaceExplorer/SpaceExplorer';
import OverlayLanding from '@/components/OverlayLandingComponent';
import OverlayPlanets from "@/components/OverlayPlanets";
import OverlaySign from '@/components/OverleySign';
import OverlayLog from '@/components/OverlayLog';

export default function App () {
    return(
      <>
        <SpaceExplorer />
        <OverlayLanding />
        <OverlayPlanets />
        <OverlaySign/>
        <OverlayLog/>
      </>
    );
}