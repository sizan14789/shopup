import { create } from "zustand";

interface SearchFunction {
  search: string;
  setSearch: (search: string) => void;
  handleSearchFormSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    router: { push: (address: string) => void; refresh: () => void },
    setSearchBar?: (b: boolean) => void
  ) => void;
}

export const useGlobalSearchStore = create<SearchFunction>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search: search }),
  handleSearchFormSubmit: async (
    e: React.FormEvent<HTMLFormElement>,
    router,
    setSearchBar
  ) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const search = formdata.get("search");

    if (typeof search === "string") {
      set({ search: search });
      router.push("/shop?search=" + search);
      router.refresh();
    }
    if (setSearchBar) setSearchBar(false);
  },
}));
