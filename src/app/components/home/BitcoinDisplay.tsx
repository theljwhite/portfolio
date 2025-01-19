import { useState } from "react";
import { Text, useGLTF, useCursor } from "@react-three/drei";
import { useSceneStore } from "@/app/store/scene";
import { useScreenSize } from "./ScreenSize";
import useAnimateCamera from "@/app/utils/useAnimateCamera";
import { LocationMarkers } from "@/app/store/camera";
import type { BitcoinPriceReturn } from "@/app/api/btc-price/route";
import useSWR from "swr";

const BTC_INTERACT_POS = [1.3, 0, 1.5];
const BTC_INTERACT_TARGET = [1.5, 0, 1.1];
const BTC_LOCATION_MARKER_POS = [1.8, 1, 1.1];

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const BitcoinPrice = ({ isMobile }: { isMobile: boolean | null }) => {
  const { isBitcoinDisplayOpen } = useSceneStore((state) => state);

  const { data, error } = useSWR<BitcoinPriceReturn>(
    "/api/btc-price",
    fetcher,
    {
      refreshInterval: isBitcoinDisplayOpen ? 5000 : undefined,
      revalidateOnFocus: false,
      dedupingInterval: 0,
    }
  );

  const formattedPrice = data?.price?.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return (
    <>
      {error || !formattedPrice ? (
        <Text
          position={isMobile ? [1.7, 1.6, 1.2] : [1.8, 1.5, 1.3]}
          rotation={[0, -1, 0]}
          fontSize={isMobile ? 0.15 : 0.2}
          letterSpacing={-0.2}
        >
          🚀🚀🚀🚀🚀
        </Text>
      ) : (
        <Text
          position={isMobile ? [1.7, 1.6, 1.2] : [1.8, 1.5, 1.4]}
          rotation={[0, -1, 0]}
          fontSize={isMobile ? 0.15 : 0.2}
          letterSpacing={-0.02}
          color={data?.isBitcoinUp ? 0x00cc00 : 0xff0000}
        >
          {"$" + formattedPrice} {data?.isBitcoinUp ? "▲" : "▼"}
        </Text>
      )}
    </>
  );
};

export default function BitcoinDisplay() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { isBitcoinDisplayOpen, setIsBitcoinDisplayOpen } = useSceneStore(
    (state) => state
  );

  const { scene } = useGLTF("./3D/bitcoin_atm.glb");

  const { camGoTo, camReset, isLocationDisabled } = useAnimateCamera();
  const { isMobile } = useScreenSize();

  useCursor(isHover);

  const startBitcoinDisplay = (): void => {
    if (isLocationDisabled(LocationMarkers.BitcoinDisplay)) return;

    setIsBitcoinDisplayOpen(true);

    if (isMobile) {
      camGoTo(
        {
          pos: BTC_INTERACT_POS,
          target: BTC_INTERACT_TARGET,
          orbitEnabled: true,
          activeMarker: LocationMarkers.BitcoinDisplay,
        },
        {
          title: "Leave ATM",
          position: BTC_LOCATION_MARKER_POS,
          camPos: BTC_INTERACT_POS,
          camTarget: BTC_INTERACT_TARGET,
          clickHandler: () => {
            setIsBitcoinDisplayOpen(false);
          },
        }
      );
    }
  };

  const endBitcoinDisplay = (): void => {
    setIsBitcoinDisplayOpen(false);
    if (isMobile) camReset(BTC_INTERACT_POS, BTC_INTERACT_TARGET);
  };

  return (
    <>
      <primitive
        onClick={isBitcoinDisplayOpen ? endBitcoinDisplay : startBitcoinDisplay}
        onPointerOver={() => setIsHover(true)}
        onPointerOut={() => setIsHover(false)}
        position={[1.5, 0, 1.1]}
        rotation={[0, -1, 0]}
        scale={1}
        object={scene}
      />
      <group visible={isBitcoinDisplayOpen}>
        <BitcoinPrice isMobile={isMobile} />
      </group>
    </>
  );
}
