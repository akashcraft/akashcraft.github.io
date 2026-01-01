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
    classSharing?: boolean;
    examSharing?: boolean;
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
  exams: {
    courseName?: string;
    date?: string;
    time?: string;
    uid?: string;
  }[];
  events?: {
    title: string;
    startTime: string;
    endTime: string;
    daysOfWeek: number[];
    uid: string;
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
    classSharing?: boolean;
    examSharing?: boolean;
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
  exams?: {
    courseName?: string;
    date?: string;
    time?: string;
    uid?: string;
  }[];
  events?: {
    title: string;
    startTime: string;
    endTime: string;
    daysOfWeek: number[];
    uid: string;
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
    case "updateExams":
      return {
        ...state,
        exams: action.exams!,
      };
    case "updateEvents":
      return {
        ...state,
        events: action.events!,
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
