export type Filter = {
    id: number, displayName: string, icon: string, props: SliderProps
  }

  export type CheckBoxFilter = {
    displayName:string;
    filterName:string;
    filterValue:boolean;
  }
  
  export type SliderProps = {
    displayName:string,
    filterName:string,
    minDistance: number,
    minValue: number,
    maxValue: number,
    step: number,
    commitFilter?: Function,
    filterValue?: number[] | undefined,
    icon?: string
  };

  export type FilterMenu = {
    filterName:string;

  }