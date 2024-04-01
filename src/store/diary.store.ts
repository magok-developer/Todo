import create from "zustand";
import { diaryData } from "../../public/data/dummyData";

export type DiaryType = {
  id: number;
  title: string;
  content: string;
  date: string;
  icon: string;
};

type DiaryStore = {
  diaries: DiaryType[];
  filter: string;
  nextId: React.MutableRefObject<number>;
  detailVisible: number | null;
  createVisible: boolean;
  editVisible: boolean;
  inputValue: string;
  textareaValue: string;
  setDiaries: (diaries: DiaryType[]) => void;
  setFilter: (filter: string) => void;
  setDetailVisible: (detailVisible: number | null) => void;
  setCreateVisible: (createVisible: boolean) => void;
  setEditVisible: (editVisible: boolean) => void;
  setInputValue: (inputValue: string) => void;
  setTextareaValue: (textareaValue: string) => void;
  handleClickDelete: (id: number) => void;
  handleClickCreate: (
    title: string,
    content: string,
    date: string,
    icon: string
  ) => void;
};

export const useDiaryStore = create<DiaryStore>((set) => ({
  diaries: diaryData,
  filter: "",
  nextId: { current: 10 },
  detailVisible: null,
  createVisible: false,
  editVisible: false,
  inputValue: "",
  textareaValue: "",
  setDiaries: (diaries) => set({ diaries }),
  setFilter: (filter) => set({ filter }),
  setDetailVisible: (detailVisible) => set({ detailVisible }),
  setCreateVisible: (createVisible) => set({ createVisible }),
  setEditVisible: (editVisible) => set({ editVisible }),
  setInputValue: (value) => set({ inputValue: value }),
  setTextareaValue: (value) => set({ textareaValue: value }),
  handleClickDelete: (id) =>
    set((state) => ({
      diaries: state.diaries.filter((item) => item.id !== id),
    })),
  handleClickCreate: (title, content, date, icon) =>
    set((state) => ({
      diaries: [
        ...state.diaries,
        {
          id: state.nextId.current++,
          title: title,
          content: content,
          date,
          icon: icon,
        },
      ],
    })),
}));
