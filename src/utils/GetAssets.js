import { AdjustmentsHorizontalIcon, CreditCardIcon, QueueListIcon, RectangleStackIcon, WalletIcon } from "@heroicons/react/24/outline"
import { 
    RectangleStackIcon as RectangleStackIconSolid,
    QueueListIcon as QueueListIconSolid,
    CreditCardIcon as CreditCardIconSolid,
    WalletIcon as WalletIconSolid,
    AdjustmentsHorizontalIcon as AdjustmentsHorizontalIconSolid
} from "@heroicons/react/24/solid"

export const ASSETS = {
    logo: "../src/assets/logo.png",
    icon: "../src/assets/icon.png",
    iconNoBg: "../src/assets/icon_no_bg.png",
    background: "../src/assets/bg_img.png",
    backgroundLight: "../src/assets/bg_img_light_ex.png"
}

// Set the currency as Dollar
export const CURRENCY = "$";

export const NAV_LINK_DETAILS = [
    { navOption: "Dashboard", navLink: "/dashboard",
        notSelected: RectangleStackIcon, 
        selected: RectangleStackIconSolid,
    },
    { navOption: "Category", navLink: "/category", 
        notSelected: QueueListIcon,
        selected: QueueListIconSolid,
    },
    { navOption: "Expense", navLink: "/expense", 
        notSelected: CreditCardIcon,
        selected: CreditCardIconSolid,
    },
    { navOption: "Income", navLink: "/income", 
        notSelected: WalletIcon,
        selected: WalletIconSolid,
    },
    { navOption: "Filter", navLink: "/filter", 
        notSelected: AdjustmentsHorizontalIcon,
        selected: AdjustmentsHorizontalIconSolid,
    },
];

export const CATEGORY_TYPE_AND_LABEL = [
    { type: "expense", label: "Expense", 
        iconNotSelected: CreditCardIcon, 
        iconSelected: CreditCardIconSolid 
    },
    { type: "income", label: "Income", 
        iconNotSelected: WalletIcon, 
        iconSelected: WalletIconSolid 
    }
];