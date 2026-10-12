import {
  type CertFilterType,
  type CertDataType,
  CertTypeFilters,
  certData,
} from "./certData";

type FilteredCertData = {
  selectedTypes: CertFilterType[];
  filteredData: CertDataType[];
  isAllSelected: boolean;
};

export function reducerFilter(
  state: FilteredCertData,
  action: {
    type: "ADD_TYPE" | "REMOVE_TYPE" | "RESET";
    payload: CertFilterType;
  },
): FilteredCertData {
  window.scrollTo(0, 0);
  switch (action.type) {
    case "ADD_TYPE": {
      const selectedTypes = [...state.selectedTypes, action.payload];
      const isAllSelected = CertTypeFilters.every((type) =>
        selectedTypes.includes(type),
      );
      return {
        selectedTypes: isAllSelected ? CertTypeFilters : selectedTypes,
        filteredData: isAllSelected
          ? certData
          : certData.filter((item) => selectedTypes.includes(item.type)),
        isAllSelected,
      };
    }
    case "REMOVE_TYPE": {
      if (state.isAllSelected) {
        return {
          selectedTypes: [action.payload],
          filteredData: certData.filter((item) => item.type === action.payload),
          isAllSelected: false,
        };
      }
      const selectedTypes = state.selectedTypes.filter(
        (type) => type !== action.payload,
      );
      if (selectedTypes.length === 0) {
        return {
          selectedTypes: CertTypeFilters,
          filteredData: certData,
          isAllSelected: true,
        };
      }
      return {
        selectedTypes,
        filteredData: certData.filter((item) =>
          selectedTypes.includes(item.type),
        ),
        isAllSelected: false,
      };
    }
    case "RESET":
      return {
        selectedTypes: CertTypeFilters,
        filteredData: certData,
        isAllSelected: true,
      };
    default:
      return state;
  }
}
