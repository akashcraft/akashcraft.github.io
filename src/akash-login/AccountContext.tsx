import { createContext, type Reducer } from "react";

export type AccountState = {
  userDetails: {
    name?: string;
    email?: string;
    uid?: string;
    photo?: string;
    provider?: string;
    dateOfBirth?: string;
    university?: string;
    semester?: string;
    accentColour?: string;
    wallpaper?: string;
    game?: string;
  };
  general: {
    publicAnnouncement?: string;
    privateAnnouncement?: string;
    aboutMe?: string;
  };
  links: {
    header?: string;
    description?: string;
    url?: string;
    uid?: string;
  }[];
};

export type AccountAction = {
  type: string;
  userDetails?: {
    name?: string;
    email?: string;
    uid?: string;
    photo?: string;
    provider?: string;
    dateOfBirth?: string;
    university?: string;
    semester?: string;
    accentColour?: string;
    wallpaper?: string;
    game?: string;
  };
  general?: {
    publicAnnouncement?: string;
    privateAnnouncement?: string;
    aboutMe?: string;
  };
  links?: {
    header?: string;
    description?: string;
    url?: string;
    uid?: string;
  }[];
};

export const reducerAccount: Reducer<AccountState, AccountAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case "updateUserDetails":
      return {
        ...state,
        userDetails: action.userDetails!,
      };
    case "updateGeneral":
      return {
        ...state,
        general: action.general!,
      };
    case "updateLinks":
      return {
        ...state,
        links: action.links!,
      };
    default:
      return state;
  }
};

interface AccountContextType {
  accountState: AccountState;
  dispatch: React.ActionDispatch<[action: AccountAction]>;
}

export const AccountContext = createContext<AccountContextType>({
  accountState: {} as AccountState,
  dispatch: () => {},
});
