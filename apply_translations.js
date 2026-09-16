const fs = require('fs');

let pageContent = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add import
pageContent = pageContent.replace(
  "import ReceiptCapture from '@/components/ReceiptCapture';",
  "import ReceiptCapture from '@/components/ReceiptCapture';\nimport { useTranslation } from '@/i18n/useTranslation';"
);

// Add hook
pageContent = pageContent.replace(
  "const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);",
  "const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);\n  const { t } = useTranslation(language);"
);

// We need to map the English strings to their JSON keys
const mapping = {
  "Sign in to track your milk records": "auth.login_prompt",
  "Farmer Name": "auth.farmer_name",
  "e.g. Ramulu": "auth.farmer_name_placeholder",
  "Mobile Number": "auth.mobile_number",
  "10-digit mobile number": "auth.mobile_number_placeholder",
  "Sign In": "auth.sign_in",
  "Switch to Telugu (తెలుగు)": "auth.switch_lang",
  "Please enter a valid Name and Mobile Number.": "auth.invalid_input",
  
  "Home": "nav.home",
  "Records": "nav.records",
  "No Society Scanned": "nav.no_society",
  
  "Receipt processed and ready to be saved!": "receipts.saved",
  
  "Collection Cycle: Oct 2026 (15 Days)": "home.collection_cycle",
  "First Half": "home.first_half",
  "Second Half": "home.second_half",
  "Recent Receipts": "home.recent_receipts",
  "Buffalo": "home.buffalo",
  "Liters": "home.liters",
  "Fat": "home.fat",
  "SNF": "home.snf",
  "Amount": "home.amount",
  
  "Milk Records": "records.title",
  "Bill Records & Milk Collection History": "records.subtitle",
  "Collection Summary": "records.summary",
  "Cycles": "records.cycles",
  "Quantity": "records.quantity",
  "Total Bill": "records.total_bill",
  "Average Fat: 7.5% FAT": "records.avg_fat",
  "Cumulative": "records.cumulative",
  "Billing Cycles": "records.billing_cycles",
  "Every 15 Days": "records.every_15_days",
  "All": "records.filter_all",
  "Completed": "records.filter_completed",
  "Current": "records.filter_current",
  "Cycle": "records.cycle",
  "CALCULATED BILL": "records.calculated_bill",
  "Poured Milk": "records.poured_milk",
  "Avg Fat": "records.avg_fat_card", // Wait, this doesn't exist in dict. I'll handle manually or add. Let's just do regex
  "Avg Rate": "records.avg_rate",
  "View Receipts": "records.view_receipts",
  "No cycles found": "records.no_cycles",
  "Back to Billing Cycles": "records.back",
  "Receipts": "records.receipts_title",
  
  "Farmer Profile": "profile.title",
  "Mobile": "profile.mobile",
  "Society Name": "profile.society_name",
  "No Society Set": "profile.no_society_set",
  "Sign Out": "profile.sign_out"
};

// Generic replacer for {language === 'EN' ? 'Eng' : 'Tel'}
pageContent = pageContent.replace(/\{language === 'EN' \? '([^']+)' : '([^']+)'\}/g, (match, en) => {
  if (mapping[en]) {
    return `{t('${mapping[en]}')}`;
  }
  return match;
});

// Also replace the inline alert strings
pageContent = pageContent.replace(/language === 'EN' \? "([^"]+)" : "([^"]+)"/g, (match, en) => {
  if (mapping[en]) {
    return `t('${mapping[en]}')`;
  }
  return match;
});
pageContent = pageContent.replace(/language === 'EN' \? \`Society \$\{data\.center_name\} saved to your profile!\` : \`సొసైటీ \$\{data\.center_name\} మీ ప్రొఫైల్‌లో సేవ్ చేయబడింది!\`/g, 
  "`${t('receipts.society_saved').replace('{0}', data.center_name)}`");


fs.writeFileSync('src/app/page.tsx', pageContent);

// Also do FarmerStats
let statsContent = fs.readFileSync('src/components/FarmerStats.tsx', 'utf8');

statsContent = statsContent.replace(
  "export default function FarmerStats({ stats, cycle, onCycleChange, onClickBill, language }: FarmerStatsProps) {",
  "import { useTranslation } from '@/i18n/useTranslation';\n\nexport default function FarmerStats({ stats, cycle, onCycleChange, onClickBill, language }: FarmerStatsProps) {\n  const { t } = useTranslation(language);"
);

const statsMapping = {
  "Estimated Bill Value": "stats.estimated_bill",
  "Avg": "stats.avg",
  "15 Days Complete": "stats.days_complete",
  "Calculated: 15 Oct": "stats.calculated",
  "Total Pour:": "stats.total_pour",
  "Liters": "stats.liters",
  "15-Day Cycle": "stats.cycle_15_day",
  "Avg Rate": "stats.avg_rate",
  "Cycle Closed": "stats.cycle_closed",
  "Collection Metrics": "stats.collection_metrics",
  "Total Milk": "stats.total_milk",
  "Great yield": "stats.great_yield",
  "with FAT Bonus": "stats.with_bonus",
  "Quality": "stats.quality",
  "Grade A": "stats.grade_a",
  "Shifts Attended": "stats.shifts_attended",
  "Total shifts": "stats.total_shifts",
  "Morning (AM)": "stats.morning",
  "Evening (PM)": "stats.evening"
};

statsContent = statsContent.replace(/\{language === 'EN' \? '([^']+)' : '([^']+)'\}/g, (match, en) => {
  if (statsMapping[en]) {
    return `{t('${statsMapping[en]}')}`;
  }
  return match;
});

fs.writeFileSync('src/components/FarmerStats.tsx', statsContent);
