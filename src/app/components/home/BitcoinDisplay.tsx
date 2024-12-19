import { useState } from "react";
import { Text, useGLTF, useBounds, useCursor } from "@react-three/drei";
import { useSceneStore } from "@/app/store/scene";
import type { CoinApiTimeReturn } from "@/app/api/btc-price/route";
import useClientMediaQuery from "@/app/utils/useClientMediaQuery";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const BitcoinPrice = ({ isMobile }: { isMobile: boolean | null }) => {
  const { isBitcoinDisplayOpen } = useSceneStore((state) => state);

  const { data, error } = useSWR<CoinApiTimeReturn>("/api/btc-price", fetcher, {
    refreshInterval: isBitcoinDisplayOpen ? 5000 : undefined,
  });
  const bitcoinIsUp = data && data.rate_close >= data.rate_open;

  const formattedPrice = data?.rate_close.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return (
    <>
      {error ? (
        <Text
          position={isMobile ? [1.7, 1.6, 1.2] : [1.8, 1.5, 1.3]}
          rotation={[0, -1, 0]}
          fontSize={isMobile ? 0.15 : 4}
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
          color={bitcoinIsUp ? 0x00cc00 : 0xff0000}
        >
          {"$" + formattedPrice} {bitcoinIsUp ? "▲" : "▼"}
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
  const bounds = useBounds();
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  useCursor(isHover);

  const onBitcoinAtmClick = (): void => {
    setIsBitcoinDisplayOpen(!isBitcoinDisplayOpen);
    if (isMobile) {
      bounds.moveTo([0, 0, 0]).lookAt({ target: [1.5, 0, 1.1] });
    }
  };

  return (
    <>
      <primitive
        onClick={onBitcoinAtmClick}
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
