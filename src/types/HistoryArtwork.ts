export type HistoryArtwork = {
  id: number;
  reference: string;
  begin_Date: string;
  end_Date: string;
  field: string;
  artwork_id: number;
  establishment_id: number;
  contract_type_id: number;
  establishment: {
    id: number;
    name: string;
    address: string;
    city: string;
    zip_Code: string;
    quality: string;
  };
  contract_type: {
    id: number;
    libelle: string;
  };
};
