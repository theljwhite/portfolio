"use client";

import { useState, useEffect } from "react";
import { useSceneStore } from "@/app/store/scene";
import { EthIcon } from "../UI/Icons";
import StyledInput from "../UI/StyledInput";

//TODO this isnt implemented yet
//TODO get rid of the useEffect here tbh for the transitions prob a better way

export default function DonateEthModal() {
  const [show, setShow] = useState<boolean>(false);

  const { isDonateOpen, donateAmount, setDonateAmount, setIsDonateOpen } =
    useSceneStore((state) => state);

  useEffect(() => {
    if (isDonateOpen) setShow(true);
    else setTimeout(() => setShow(false), 300);
  }, [isDonateOpen]);

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDonateAmount(e.target.value);
  };

  return (
    <div
      style={{ zIndex: 8388639 }}
      className={`${isDonateOpen ? "block" : "hidden"} relative`}
    >
      <div
        className={`${
          show ? "opacity-100" : "opacity-0"
        } transition-all duration-300 fixed left-0 top-0 z-[50] !m-0 h-dvh w-screen bg-black/[0.40] backdrop-blur`}
      />
      <div
        className={`${
          show ? "scale-100 opacity-100" : "scale-75 opacity-0"
        } transform transition-all duration-300 fixed left-0 top-0 z-[50] flex h-dvh w-screen items-start justify-center overflow-auto overscroll-y-none`}
      >
        <section className="bg-zinc-800 relative z-[50] my-16 flex w-full max-w-lg flex-col rounded-2xl py-8 outline-none [box-shadow:0_10px_15px_-3px_rgba(0,_0,_0,_0.1),0_4px_6px_-2px_rgba(0,_0,_0,_0.05)]">
          <div className="px-6 w-full rounded-2xl relative">
            <div className="overflow-y-auto">
              <h1 className="text-white font-semibold text-lg">
                Donate me Ethereum
              </h1>
              <p className="mt-4 text-white text-sm opacity-70">
                I figured I would leave this here, because why not. Would my
                portfolio page be complete without some crypto stuff? I
                haven&apos;t got around to this yet though, so it wont work yet.
              </p>
              <div className="my-4">
                <div>
                  <div className="text-neutral-22 text-sm">
                    For now, send direct to:{" "}
                    <span className="text-teal-500 font-semibold">
                      ljwhite.eth
                    </span>
                  </div>
                  <div className="my-8">
                    <StyledInput
                      id="eth-donate"
                      onChange={(e) => onAmountChange(e)}
                      stateVar={donateAmount}
                      placeholder="0.00"
                      icon={<EthIcon color="#FFF" size={18} />}
                      type="text"
                      isDark={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <button
                onClick={() => setIsDonateOpen(false)}
                className="flex items-center text-zinc-900 justify-center bg-zinc-400 px-8 py-2 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => console.log("TODO")}
                disabled={true}
                className="flex items-center text-white justify-center bg-indigo-600 px-8 py-2 rounded-lg cursor-pointer disabled:bg-stone-400 disabled:text-stone-500 disabled:cursor-not-allowed"
              >
                Donate amount
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
