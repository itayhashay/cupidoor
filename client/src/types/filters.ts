export type Filter = {
    id: number, displayName: string, icon: string, props: SliderProps
  }
  
  export type SliderProps = {
    filterName: string,
    minDistance: number,
    minValue: number,
    maxValue: number,
    step: number,
    commitFilter?: Function
};
