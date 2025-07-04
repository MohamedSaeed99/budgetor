import PurchaseAPI from "./PurchaseAPI/usePurchaseQuery"
import SectionAPI from "./SectionAPI/useSectionQuery";
import TabsAPI from "./TabsAPI/useTabsQuery";
import UserAPI from "./UserAPI/useUserQuery";

const api = {
    Purchase: PurchaseAPI,
    User: UserAPI,
    Tabs: TabsAPI,
    Section: SectionAPI
}

export default api;
