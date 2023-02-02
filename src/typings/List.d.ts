interface List {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  spots: Spot[];
  public: boolean;
  ownerId: string;
}
