const COLORS = {
    RED: "rgb(255, 0, 0)", // 0 - 24
    ORANGE: "rgb(255, 140, 0)", // 25 - 49
    YELLOW: "rgb(246, 190, 0)", // 50 - 69
    LIME: "rgb(183, 217, 18)", // 70 - 84
    GREEN: "rgb(55, 214, 8)", // 85 - 99
    BLUE: "rgb(33, 145, 255)" // 100
}

type RangeToColor = { range: number[]; color: string; };

const PRECENT_TO_COLOR: RangeToColor[] = [
    {
        range: [0, 24],
        color: COLORS.RED
    },
    {
        range: [25, 49],
        color: COLORS.ORANGE
    },
    {
        range: [50, 69],
        color: COLORS.YELLOW
    },
    {
        range: [70, 84],
        color: COLORS.LIME
    },
    {
        range: [85, 99],
        color: COLORS.GREEN
    },
    {
        range: [100, 100],
        color: COLORS.BLUE
    }
]


export const precentToColor = (matchPrecent: number): string => {
    const relevantRtC: RangeToColor | undefined = PRECENT_TO_COLOR.find((rtc: RangeToColor) => matchPrecent >= rtc.range[0] && matchPrecent <= rtc.range[1]);
    return relevantRtC ? relevantRtC.color : "black";
  };
  