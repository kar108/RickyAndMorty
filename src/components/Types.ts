export type DrawerOption = {
  id?:number;
    label: string;
    icon?: string;
    onPress: (o: DrawerOption) => void;
  };