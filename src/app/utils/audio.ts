export type CreateAudioReturn = {
  ctx: AudioContext;
  source: AudioBufferSourceNode;
  gain: GainNode;
  data: Uint8Array;
  update: () => UpdateAudioReturn;
};

export type UpdateAudioReturn = {
  avg: number;
  subs: number;
  mids: number;
  highs: number;
};

const unlockMobileAudio = (ctx: AudioContext): void => {
  if (ctx.state === "suspended") {
    const resumeCtx = (): void => {
      ctx.resume();

      console.log("RESUME RAN, state is -->", ctx.state);

      setTimeout(() => {
        if (ctx.state === "running") {
          document.body.removeEventListener("touchend", resumeCtx, false);
        }
      }, 0);
    };

    document.body.addEventListener("touchend", resumeCtx, false);
  }
};

export const createAudio = async (url: string): Promise<CreateAudioReturn> => {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();

  const ctx = new window.AudioContext();

  const source = ctx.createBufferSource();

  source.buffer = await new Promise((res) => ctx.decodeAudioData(buffer, res));

  source.loop = true;

  source.start(0);
  unlockMobileAudio(ctx);

  const gain = ctx.createGain();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 64;

  source.connect(analyser);
  analyser.connect(gain);

  const data = new Uint8Array(analyser.frequencyBinCount);

  const getFrequencyRangeAverage = (start: number, end: number): number => {
    const sampleRate = ctx.sampleRate;
    const binSize = sampleRate / analyser.fftSize;

    let count = 0;
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
      const freq = i * binSize;

      if (freq >= start && freq <= end) {
        sum += data[i];
        count++;
      }
    }

    return count ? sum / count : 0;
  };

  return {
    ctx,
    source,
    gain,
    data,
    update: () => {
      analyser.getByteFrequencyData(data);

      const subs = getFrequencyRangeAverage(20, 250);
      const mids = getFrequencyRangeAverage(250, 2000);
      const highs = getFrequencyRangeAverage(2000, 8000);

      const overallFreqAvg = data.reduce(
        (prev, curr) => prev + curr / data.length,
        0
      );
      return { avg: overallFreqAvg, subs, mids, highs };
    },
  };
};
