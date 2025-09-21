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
    backgroundLight: "../src/assets/bg_img_light.png",
    cityBackground: "../src/assets/city_background.png",
    screenshotPc: "../src/assets/screenshot_pc.png",
    screenshotMobile: "../src/assets/screenshot_mobile.png",
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

export const DASH_TIPS = {
    heading: "Tips to get started",
    tipsHead1: "Welcome ",
    tipsHead2: "Here are some tips you can follow to get started",
    tips1: "Start by creating new categories for income or expense in",
    tipsButton1: "category section",
    tips2: "Then, add new income source in the",
    tipsButton2: "income section",
    tips3: "And/or, add new expense source in the",
    tipsButton3: "expense section",
    note: "Atleast one category of each type(income,expense) is required before adding income and/or expense source."
};

export const LANDING_TEXT = {
    heading: "Guidance for Your Financial ",
    heading2: "Spendings",
    para: "Organize your incomes and expenditures to stay on track.",
    para2: "Get seamless and secure way to manage your finances, providing valuable insights and helping you stay on top of your budget.",
    imageText: "Get insights of your spending and incomes to achieve your goal across all devices",
    buttonText: "Get going for Free",
    aboutMainHead: "Why to choose ",
    aboutMainHead2: "Spend",
    aboutMainHead3: " Guide?",
    aboutHead1: "Easy Logging & Categorizing",
    aboutPara1: "Log your income/expense details and categorize them with the most friendly interface.",
    aboutHead2: "Insightful Reports",
    aboutPara2: "Filter your transactions or visualize your spending pattern with graphs and charts.",
    aboutHead3: "Private and Secure Logging",
    aboutPara3: "Your transaction data is end-to-end encrypted and only visible to you.",
    endHead: "Ready to take control of your ",
    endHead2: "spendings?",
    endPara: "Sign up for free today to get started with ease."
};