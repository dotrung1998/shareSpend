import React, { useState, useEffect, useRef } from "react";
import { Upload, Edit2, Trash2, Sun, Moon, FileText, Settings, Plus, X, Users, Search } from "lucide-react";

const translations = {
  en: {
    sharedExpenseTracker: "Shared Expense Tracker",
    manageCategories: "Manage Categories",
    manageCategoryRules: "Manage Auto-Categorization Rules",
    currentCategories: "Current Categories",
    addCategory: "Add Category",
    addNewCategory: "Add New Category",
    categoryName: "Category Name",
    enterCategoryName: "Enter category name",
    categoryIcon: "Category Icon",
    selectIcon: "Select Icon",
    categoryNote: "Category Description/Note",
    categoryNotePlaceholder: "Add a note for the category",
    categoryRules: "Auto-categorization Keywords",
    categoryRulesPlaceholder: "e.g., rewe, kaufland, aldi (comma separated)",
    delete: "Delete",
    edit: "Edit",
    cancel: "Cancel",
    save: "Save",
    enterCustomIcon: "Enter Custom Icon",
    addExpense: "Add Expense(s)",
    descriptionInputLabel: "Description (separate multiple entries with ';' or '+')",
    amountInputLabel: "Amount (separate multiple entries with ';' or '+')",
    expenseDateLabel: "Expense Date (Month and Year)",
    currencyLabel: "Currency",
    categoryLabel: "Category",
    primaryCurrencyLabel: "Primary Currency",
    numberOfPeople: "Number of People",
    perPerson: "Per Person",
    total: "Total",
    people: "people",
    person: "person",
    searchExpenses: "Search expenses...",
    searchResults: "results found",
    clearSearch: "Clear",
    batchEditSelected: "Batch Edit Selected Expenses",
    applyChanges: "Apply Changes to Selected Expenses",
    noExpensesYet: "No expenses added yet. Start by adding your first expense!",
    totalExpenses: "Total Expenses:",
    downloadCSV: "Download CSV",
    importFile: "Import file",
    uploadInvoice: "Upload Invoice (txt)",
    exampleItem: "e.g., Coffee",
    amountExample: "e.g., 10",
    requiredFieldsWarning: "Please fill out this field.",
    categoryTotal: "Category Total:",
    addKeyword: "Add Keyword",
    deleteCategory: "Delete Category",
    deleteCategoryWarning: "Are you sure? This will delete all expenses in this category.",
    monthNames: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    categories: {
      groceries: "Groceries",
      supermarkt: "Supermarkt",
      eating_out: "Eating Out",
      other: "Other"
    }
  },
  de: {
    sharedExpenseTracker: "Gemeinsamer Ausgaben-Tracker",
    manageCategories: "Kategorien verwalten",
    manageCategoryRules: "Auto-Kategorisierungsregeln verwalten",
    currentCategories: "Aktuelle Kategorien",
    addCategory: "Kategorie hinzufügen",
    addNewCategory: "Neue Kategorie hinzufügen",
    categoryName: "Kategoriename",
    enterCategoryName: "Kategoriename eingeben",
    categoryIcon: "Kategorensymbol",
    selectIcon: "Symbol auswählen",
    categoryNote: "Kategoriebeschreibung/Notiz",
    categoryNotePlaceholder: "Fügen Sie der Kategorie eine Notiz hinzu",
    categoryRules: "Auto-Kategorisierung Schlüsselwörter",
    categoryRulesPlaceholder: "z.B. rewe, kaufland, aldi (durch Komma getrennt)",
    delete: "Löschen",
    edit: "Bearbeiten",
    cancel: "Abbrechen",
    save: "Speichern",
    enterCustomIcon: "Benutzerdefiniertes Symbol eingeben",
    addExpense: "Ausgabe(n) hinzufügen",
    descriptionInputLabel: "Beschreibung (mehrere Einträge mit ';' oder '+' trennen)",
    amountInputLabel: "Betrag (mehrere Einträge mit ';' oder '+' trennen)",
    expenseDateLabel: "Ausgabedatum (Monat und Jahr)",
    currencyLabel: "Währung",
    categoryLabel: "Kategorie",
    primaryCurrencyLabel: "Hauptwährung",
    numberOfPeople: "Anzahl Personen",
    perPerson: "Pro Person",
    total: "Gesamt",
    people: "Personen",
    person: "Person",
    searchExpenses: "Ausgaben durchsuchen...",
    searchResults: "Ergebnisse gefunden",
    clearSearch: "Löschen",
    batchEditSelected: "Ausgewählte Ausgaben Stapelbearbeitung",
    applyChanges: "Änderungen auf ausgewählte Ausgaben anwenden",
    noExpensesYet: "Noch keine Ausgaben hinzugefügt. Beginnen Sie mit der ersten Ausgabe!",
    totalExpenses: "Gesamtausgaben:",
    downloadCSV: "CSV herunterladen",
    importFile: "Datei importieren",
    uploadInvoice: "Rechnung hochladen (txt)",
    exampleItem: "z.B. Kaffee",
    amountExample: "z.B. 10",
    requiredFieldsWarning: "Bitte füllen Sie dieses Feld aus.",
    categoryTotal: "Kategorien Gesamt:",
    addKeyword: "Schlüsselwort hinzufügen",
    deleteCategory: "Kategorie löschen",
    deleteCategoryWarning: "Sind Sie sicher? Dies löscht alle Ausgaben in dieser Kategorie.",
    monthNames: [
      "Januar", "Februar", "März", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Dezember"
    ],
    categories: {
      groceries: "Drogerie",
      supermarkt: "Supermarkt",
      eating_out: "Restaurants",
      other: "Andere"
    }
  },
  vi: {
    sharedExpenseTracker: "Trình Theo Dõi Chi Phí Chung",
    manageCategories: "Quản Lý Danh Mục",
    manageCategoryRules: "Quản Lý Quy Tắc Tự Động Phân Loại",
    currentCategories: "Danh Mục Hiện Tại",
    addCategory: "Thêm Danh Mục",
    addNewCategory: "Thêm Danh Mục Mới",
    categoryName: "Tên danh mục",
    enterCategoryName: "Nhập tên danh mục",
    categoryIcon: "Biểu tượng danh mục",
    selectIcon: "Chọn biểu tượng",
    categoryNote: "Mô tả/Ghi chú danh mục",
    categoryNotePlaceholder: "Thêm ghi chú cho danh mục",
    categoryRules: "Từ khóa tự động phân loại",
    categoryRulesPlaceholder: "vd: rewe, kaufland, aldi (phân cách bằng dấu phẩy)",
    delete: "Xóa",
    edit: "Sửa",
    cancel: "Hủy",
    save: "Lưu",
    enterCustomIcon: "Nhập biểu tượng tùy chỉnh",
    addExpense: "Thêm Chi Phí",
    descriptionInputLabel: "Mô tả (phân cách nhiều mục với ';' hoặc '+')",
    amountInputLabel: "Số tiền (phân cách nhiều mục với ';' hoặc '+')",
    expenseDateLabel: "Ngày chi phí (Tháng và Năm)",
    currencyLabel: "Tiền tệ",
    categoryLabel: "Danh mục",
    primaryCurrencyLabel: "Tiền tệ chính",
    numberOfPeople: "Số người",
    perPerson: "Mỗi người",
    total: "Tổng",
    people: "người",
    person: "người",
    searchExpenses: "Tìm kiếm chi phí...",
    searchResults: "kết quả",
    clearSearch: "Xóa",
    batchEditSelected: "Chỉnh Sửa Hàng Loạt Các Chi Phí Được Chọn",
    applyChanges: "Áp dụng thay đổi cho các chi phí được chọn",
    noExpensesYet: "Chưa có chi phí nào. Hãy bắt đầu bằng cách thêm chi phí đầu tiên!",
    totalExpenses: "Tổng Chi Phí:",
    downloadCSV: "Tải xuống CSV",
    importFile: "Nhập tệp",
    uploadInvoice: "Tải lên Hóa đơn (txt)",
    exampleItem: "vd: Cà phê",
    amountExample: "vd: 10000",
    requiredFieldsWarning: "Vui lòng điền vào mục này.",
    categoryTotal: "Tổng danh mục:",
    addKeyword: "Thêm từ khóa",
    deleteCategory: "Xóa danh mục",
    deleteCategoryWarning: "Bạn có chắc? Điều này sẽ xóa tất cả chi phí trong danh mục này.",
    monthNames: [
      "Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu",
      "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"
    ],
    categories: {
      groceries: "Tạp hóa nhỏ",
      supermarkt: "Siêu thị",
      eating_out: "Ăn ngoài",
      other: "Khác"
    }
  }
};

// Popular emoji icons for categories
const ICON_OPTIONS = [
  "🛒", "🏪", "🍽️", "🍔", "🍕", "☕", "🍺", "🥗", "🍜", "🍱",
  "🚗", "⛽", "🚕", "🚌", "✈️", "🏠", "🔑", "🛋️", "🪑", "🛏️",
  "💊", "🏥", "⚕️", "💉", "🩺", "👕", "👗", "👔", "👟", "👜",
  "📱", "💻", "🖥️", "⌚", "📷", "🎮", "🎧", "📚", "✏️", "📝",
  "🎬", "🎵", "🎨", "🎭", "⚽", "🏋️", "🎾", "🏊", "💰", "💳",
  "💵", "💶", "💷", "📦", "🎁", "🔧", "🔨", "🪛", "🌱", "🌸",
  "🐕", "🐈", "🐾", "🧸", "🎂", "🍰", "🧁", "🍫", "🍬", "🍭"
];

const getTranslatedCategory = (key: string, defaultName: string, t: any) => {
  return t.categories && t.categories[key] ? t.categories[key] : defaultName;
};

interface Expense {
  id: number;
  description: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
}

interface Category {
  name: string;
  icon: string;
  note: string;
}

interface CategoryRule {
  [categoryKey: string]: string[];
}

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const currentDate = new Date();
  const [expenseYear, setExpenseYear] = useState(currentDate.getFullYear().toString());
  const [expenseMonth, setExpenseMonth] = useState((currentDate.getMonth() + 1).toString().padStart(2, "0"));
  const [currency, setCurrency] = useState("EUR");
  const [category, setCategory] = useState("supermarkt");
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [categories, setCategories] = useState<Record<string, Category>>({
    groceries: { name: translations.en.categories.groceries, icon: "🛒", note: "" },
    supermarkt: { name: translations.en.categories.supermarkt, icon: "🏪", note: "" },
    eating_out: { name: translations.en.categories.eating_out, icon: "🍽️", note: "" },
    other: { name: translations.en.categories.other, icon: "📦", note: "" }
  });
  
  const [categoryRules, setCategoryRules] = useState<CategoryRule>({
    groceries: ["dm-drogerie", "dm-markt", "rossmann"],
    supermarkt: ["rewe", "kaufland", "penny", "go asia", "aldi", "lidl", "netto"],
    eating_out: ["kfc", "backwerk", "sumup", "grill", "asiagourmet", "asia", "chiking", "restaurant", "burger", "pizza", "mcdonalds"],
    other: ["paypal", "depot", "karroum", "tjxeurope", "fressnapf", "pet"]
  });
  
  const [showRulesManager, setShowRulesManager] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", icon: "", note: "" });
  const [showCustomIconModal, setShowCustomIconModal] = useState(false);
  const [customIcon, setCustomIcon] = useState("");
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingCategoryCustomIcon, setEditingCategoryCustomIcon] = useState("");
  const [showEditCategoryCustomIconModal, setShowEditCategoryCustomIconModal] = useState(false);
  const [primaryCurrency, setPrimaryCurrency] = useState("EUR");
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [selectedExpenseIds, setSelectedExpenseIds] = useState<number[]>([]);
  const [batchEditDescription, setBatchEditDescription] = useState("");
  const [batchEditCategory, setBatchEditCategory] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [buttonColor, setButtonColor] = useState("#F1C4D9");
  const [language, setLanguage] = useState("en");
  
  const scrollPositionRef = useRef<number>(0);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    setCategories(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        updated[key].name = t.categories[key as keyof typeof t.categories] || updated[key].name;
      });
      return updated;
    });
  }, [t]);

  const amountExampleText = currency === "VND" ? (language === "vi" ? "vd: 10000" : "10000") : t.amountExample;

  const currencies: Record<string, { symbol: string; rate: number }> = {
    EUR: { symbol: "€", rate: 25000 },
    USD: { symbol: "$", rate: 23000 },
    VND: { symbol: "₫", rate: 1 }
  };

  const convertAmountTo = (amountValue: number, fromCurrency: string, toCurrency: string) => {
    if (!amountValue || isNaN(amountValue)) return 0;
    if (!currencies[fromCurrency] || !currencies[toCurrency]) return amountValue;
    return amountValue * (currencies[fromCurrency].rate / currencies[toCurrency].rate);
  };

  const formatCurrency = (value: number, curr: string) => {
    if (isNaN(value) || value === null || value === undefined) return "€0.00";
    if (curr === "VND") {
      return `₫${Math.round(value).toLocaleString("vi-VN")}`;
    }
    return `${currencies[curr]?.symbol || "€"}${value.toFixed(2)} ${curr}`;
  };

  const formatCurrencyForCSV = (value: number, curr: string) => {
    if (isNaN(value)) return "0";
    if (curr === "VND") {
      return `${Math.round(value)}`;
    }
    return `${value.toFixed(2)}`;
  };

  const convertDateToFileString = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const monthNames = t.monthNames || [];
    return monthNames[parseInt(month, 10) - 1] + " " + year;
  };

  const getFilteredExpenses = () => {
    if (!searchTerm.trim()) {
      return expenses;
    }
    
    const term = searchTerm.toLowerCase();
    return expenses.filter(exp => {
      const description = exp.description.toLowerCase();
      const amount = exp.amount.toString();
      const categoryName = getTranslatedCategory(exp.category, categories[exp.category]?.name || exp.category, t).toLowerCase();
      const date = convertDateToFileString(exp.date).toLowerCase();
      
      return description.includes(term) || 
             amount.includes(term) || 
             categoryName.includes(term) ||
             date.includes(term);
    });
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className={`${isDarkMode ? 'bg-yellow-600' : 'bg-yellow-300'}`}>{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount.trim() || !description.trim()) {
      alert(t.requiredFieldsWarning);
      return;
    }
    const expenseDate = `${expenseYear}-${expenseMonth}`;
    const rawAmountParts = amount.split(/[;+]/).map(s => s.trim()).filter(s => s !== "");
    let descriptionParts = description.split(/[;+]/).map(s => s.trim()).filter(s => s !== "");

    if (descriptionParts.length === 0) {
      descriptionParts = Array(rawAmountParts.length).fill("");
    }
    if (descriptionParts.length === 1 && rawAmountParts.length > 1) {
      descriptionParts = Array(rawAmountParts.length).fill(descriptionParts[0]);
    }
    if (descriptionParts.length !== rawAmountParts.length) {
      alert(t.requiredFieldsWarning);
      return;
    }

    const newExpenses = descriptionParts.map((desc, index) => {
      const cleanAmountStr = rawAmountParts[index].replace(",", ".");
      return {
        id: Date.now() + index,
        description: desc,
        amount: parseFloat(cleanAmountStr),
        currency,
        category,
        date: expenseDate
      };
    });

    setExpenses([...expenses, ...newExpenses]);
    setAmount("");
    setDescription("");
  };

  const addNewCategory = (name: string, icon: string) => {
    if (!name.trim()) return;
    const catKey = name.toLowerCase().replace(/\s+/g, "_");
    if (categories[catKey]) {
      alert("Category already exists!");
      return;
    }
    setCategories(prev => ({
      ...prev,
      [catKey]: { name: name.trim(), icon: icon || "📁", note: "" }
    }));
    setCategoryRules(prev => ({
      ...prev,
      [catKey]: []
    }));
  };

  const deleteCategory = (categoryKey: string) => {
    const categoryExpenses = expenses.filter(exp => exp.category === categoryKey);
    if (categoryExpenses.length > 0) {
      if (!window.confirm(`${t.deleteCategoryWarning}\n\n${categoryExpenses.length} expenses will be deleted.`)) {
        return;
      }
      setExpenses(prev => prev.filter(exp => exp.category !== categoryKey));
    }
    
    setCategories(prev => {
      const updated = { ...prev };
      delete updated[categoryKey];
      return updated;
    });
    
    setCategoryRules(prev => {
      const updated = { ...prev };
      delete updated[categoryKey];
      return updated;
    });
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
    setSelectedExpenseIds(ids => ids.filter(expId => expId !== id));
    if (editingExpenseId === id) {
      setEditingExpenseId(null);
    }
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp));
    setEditingExpenseId(null);
    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  };

  const applyAllBatchEdits = () => {
    let updatedExpenses = [...expenses];
    if (batchEditDescription.trim() !== "") {
      updatedExpenses = updatedExpenses.map(exp =>
        selectedExpenseIds.includes(exp.id) ? { ...exp, description: batchEditDescription } : exp
      );
    }
    if (batchEditCategory) {
      updatedExpenses = updatedExpenses.map(exp =>
        selectedExpenseIds.includes(exp.id) ? { ...exp, category: batchEditCategory } : exp
      );
    }
    setExpenses(updatedExpenses);
    setBatchEditDescription("");
    setBatchEditCategory("");
    setSelectedExpenseIds([]);
  };

  const calculateGrandTotal = (useFiltered: boolean = false) => {
    const expenseList = useFiltered ? getFilteredExpenses() : expenses;
    return expenseList.reduce(
      (sum, exp) => sum + convertAmountTo(exp.amount, exp.currency, primaryCurrency),
      0
    );
  };

  const calculateCategoryTotal = (categoryKey: string, useFiltered: boolean = false) => {
    const expenseList = useFiltered ? getFilteredExpenses() : expenses;
    return expenseList
      .filter(exp => exp.category === categoryKey)
      .reduce(
        (sum, exp) => sum + convertAmountTo(exp.amount, exp.currency, primaryCurrency),
        0
      );
  };

  const toggleSelectExpense = (id: number) => {
    setSelectedExpenseIds(prev =>
      prev.includes(id) ? prev.filter(expId => expId !== id) : [...prev, id]
    );
  };

  const toggleSelectAllInCategory = (categoryKey: string) => {
    const filteredExpenses = getFilteredExpenses();
    const categoryExpenseIds = filteredExpenses.filter(exp => exp.category === categoryKey).map(exp => exp.id);
    const allSelected = categoryExpenseIds.every(id => selectedExpenseIds.includes(id));
    if (allSelected) {
      setSelectedExpenseIds(prev => prev.filter(id => !categoryExpenseIds.includes(id)));
    } else {
      setSelectedExpenseIds(prev => {
        const newSelected = [...prev];
        categoryExpenseIds.forEach(id => {
          if (!newSelected.includes(id)) newSelected.push(id);
        });
        return newSelected;
      });
    }
  };

  const escapeCSV = (field: any) => {
    const strField = field.toString();
    if (strField.includes(",") || strField.includes('"') || strField.includes("\n")) {
      return '"' + strField.replace(/"/g, '""') + '"';
    }
    return strField;
  };

  const downloadCSV = () => {
    const csvRows: string[] = [];
    let rowIndex = 1;
    
    // Header with Per Person column
    csvRows.push(
      ["ID", "Description", "Date", "Amount", "Currency", "Original Amount", "Category", `Per Person (${numberOfPeople} ${numberOfPeople === 1 ? t.person : t.people})`]
        .map(escapeCSV).join(",")
    );
    rowIndex++;

    const categoryTotalCellRefs: string[] = [];
    const categoryPerPersonCellRefs: string[] = [];
    
    Object.keys(categories).forEach(categoryKey => {
      const categoryExpenses = expenses.filter(exp => exp.category === categoryKey);
      if (categoryExpenses.length === 0) return;

      csvRows.push(["", "", "", "", "", "", "", ""].join(","));
      rowIndex++;
      csvRows.push(
        [`CATEGORY: ${getTranslatedCategory(categoryKey, categories[categoryKey].name, t)}`, "", "", "", "", "", "", ""]
          .map(escapeCSV).join(",")
      );
      rowIndex++;
      csvRows.push(["", "", "", "", "", "", "", ""].join(","));
      rowIndex++;

      const expenseStart = rowIndex;
      categoryExpenses.forEach((exp, index) => {
        const convertedAmount = convertAmountTo(exp.amount, exp.currency, primaryCurrency);
        const perPersonAmount = numberOfPeople > 0 ? convertedAmount / numberOfPeople : 0;
        
        csvRows.push([
          index + 1,
          exp.description || "No description",
          exp.date || "",
          formatCurrencyForCSV(convertedAmount, primaryCurrency),
          primaryCurrency,
          formatCurrencyForCSV(exp.amount, exp.currency) + " " + exp.currency,
          getTranslatedCategory(exp.category, categories[exp.category]?.name || exp.category, t),
          formatCurrencyForCSV(perPersonAmount, primaryCurrency)
        ].map(escapeCSV).join(","));
        rowIndex++;
      });

      const expenseEnd = rowIndex - 1;
      csvRows.push(["", "", "", "", "", "", "", ""].join(","));
      rowIndex++;
      
      const categoryTotalFormula = `=SUM(D${expenseStart}:D${expenseEnd})`;
      const categoryPerPersonFormula = `=D${rowIndex}/${numberOfPeople}`;
      
      csvRows.push(
        ["", t.categoryTotal, "", categoryTotalFormula, primaryCurrency, "", "", categoryPerPersonFormula]
          .map(escapeCSV).join(",")
      );
      categoryTotalCellRefs.push(`D${rowIndex}`);
      categoryPerPersonCellRefs.push(`H${rowIndex}`);
      rowIndex++;
      csvRows.push(["", "", "", "", "", "", "", ""].join(","));
      rowIndex++;
    });

    csvRows.push(["", "", "", "", "", "", "", ""].join(","));
    rowIndex++;
    
    const grandTotalFormula = `=SUM(${categoryTotalCellRefs.join(",")})`;
    const grandPerPersonFormula = `=SUM(${categoryPerPersonCellRefs.join(",")})`;
    
    csvRows.push(
      ["", `GRAND ${t.total.toUpperCase()}:`, "", grandTotalFormula, primaryCurrency, "", "", grandPerPersonFormula]
        .map(escapeCSV).join(",")
    );

    const fileDate = expenseYear && expenseMonth
      ? convertDateToFileString(`${expenseYear}-${expenseMonth}`)
      : convertDateToFileString(new Date().toISOString().slice(0, 7));
    const fileName = `Expense_Tracker_${fileDate}.csv`;
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseCSV = (text: string) => {
    const rows = text.split("\n").filter(row => row.trim() !== "");
    return rows.map(row =>
      row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(cell => {
        let c = cell.trim();
        if (c.startsWith('"') && c.endsWith('"')) {
          c = c.slice(1, -1).replace(/""/g, '"');
        }
        return c;
      })
    );
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const data = parseCSV(content);
      const newExpenses: Expense[] = [];
      const newCategories = { ...categories };
      let currentCategoryName = "";
      let uniqueIdCounter = Date.now();
      let startRow = 0;

      if (data[0] && data[0][0] === "ID") {
        startRow = 1;
      }

      for (let i = startRow; i < data.length; i++) {
        const row = data[i];
        
        if (row.every(cell => cell.trim() === "")) continue;

        if (row[0].startsWith("CATEGORY:")) {
          currentCategoryName = row[0].split("CATEGORY:")[1].trim();
          const catKey = currentCategoryName.toLowerCase().replace(/\s+/g, "_");
          if (!newCategories[catKey]) {
            newCategories[catKey] = { name: currentCategoryName, icon: "🔖", note: "" };
          }
          continue;
        }

        const rowText = row.join(" ").toLowerCase();
        if (rowText.includes("total") || 
            rowText.includes("gesamt") ||
            row[1]?.toLowerCase().includes("total") ||
            row[1]?.toLowerCase().includes("gesamt") ||
            row[0]?.toLowerCase().includes("total") ||
            row[0]?.toLowerCase().includes("grand")) {
          continue;
        }

        if (row[3]?.startsWith("=")) continue;

        if (row.length < 7) continue;

        if (!row[1] || row[1].trim() === "") continue;

        const amount = parseFloat(row[3]);
        if (isNaN(amount) || amount === 0) continue;

        const expenseCategoryName = row[6] ? row[6].trim() : currentCategoryName;
        const catKey = expenseCategoryName.toLowerCase().replace(/\s+/g, "_");
        
        if (!newCategories[catKey]) {
          newCategories[catKey] = { name: expenseCategoryName, icon: "🔖", note: "" };
        }

        newExpenses.push({
          id: uniqueIdCounter++,
          description: row[1],
          date: row[2],
          amount: amount,
          currency: row[4],
          category: catKey
        });
      }

      setExpenses(newExpenses);
      setCategories(newCategories);
    };
    reader.readAsText(file);
  };

  const categorizeExpense = (description: string): string => {
    const desc = description.toLowerCase();
    
    for (const [categoryKey, keywords] of Object.entries(categoryRules)) {
      for (const keyword of keywords) {
        if (desc.includes(keyword.toLowerCase())) {
          return categoryKey;
        }
      }
    }
    
    return "other";
  };

  const parseAmount = (amountStr: string): number => {
    const cleaned = amountStr.replace(/[^\d,.-]/g, '').replace(',', '.');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : Math.abs(parsed);
  };

  const handleInvoiceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      
      try {
        const newExpenses: Expense[] = [];
        let uniqueIdCounter = Date.now();
        let invoiceDate = `${expenseYear}-${expenseMonth}`;

        const dateRangeMatch = content.match(/Abrechnung vom (\d{2})\.(\d{2})\.(\d{4}) bis (\d{2})\.(\d{2})\.(\d{4})/);
        if (dateRangeMatch) {
          const [, , , , , month, year] = dateRangeMatch;
          invoiceDate = `${year}-${month}`;
        }

        const lines = content.split('\n');
        
        for (let line of lines) {
          line = line.trim();
          if (!line) continue;
          
          // Skip header/footer lines
          if (line.includes('ALTER SALDO') || line.includes('NEUER SALDO') || 
              line.includes('EINZAHLUNG') || line.includes('SOLLZINSEN') ||
              line.includes('Mindestbetrag') || line.includes('Abrechnung vom') ||
              line.includes('Karteninhaber') || line.includes('Kartennummer') ||
              line.includes('Mastercard') || line.startsWith('Seite ')) {
            continue;
          }

          // Match transaction lines: Date, Description (including location), Amount
          // Pattern: DD.MM.YYYY followed by text and ending with amount
          const match = line.match(/^(\d{2}\.\d{2}\.\d{4})\s+(.+?)\s+([\d.,]+)$/);
          
          if (match) {
            const [, date, fullDescription, amountStr] = match;
            const amount = parseAmount(amountStr);

            if (amount > 0 && fullDescription.trim()) {
              const categoryKey = categorizeExpense(fullDescription);
              
              newExpenses.push({
                id: uniqueIdCounter++,
                description: fullDescription.trim(),
                date: invoiceDate,
                amount: amount,
                currency: "EUR",
                category: categoryKey
              });
            }
          }
        }

        if (newExpenses.length > 0) {
          setExpenses(prev => [...prev, ...newExpenses]);
          alert(`Successfully imported ${newExpenses.length} transactions from invoice!`);
        } else {
          alert("No transactions found. Please ensure this is a valid Mastercard invoice.");
        }
      } catch (error) {
        console.error("Error parsing invoice:", error);
        alert("Error parsing invoice. Please check the file format.");
      }
    };

    if (file.name.endsWith('.pdf')) {
      alert("Please convert PDF to text first, or copy-paste the invoice content into a .txt file.");
    } else {
      reader.readAsText(file);
    }
  };

  const addKeywordToCategory = (categoryKey: string, keyword: string) => {
    if (!keyword.trim()) return;
    
    // Save scroll position before state update
    const scrollPos = modalScrollRef.current?.scrollTop || 0;
    
    setCategoryRules(prev => ({
      ...prev,
      [categoryKey]: [...(prev[categoryKey] || []), keyword.trim().toLowerCase()]
    }));
    
    // Restore scroll position after state update
    setTimeout(() => {
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTop = scrollPos;
      }
    }, 0);
  };

  const removeKeywordFromCategory = (categoryKey: string, keyword: string) => {
    // Save scroll position before state update
    const scrollPos = modalScrollRef.current?.scrollTop || 0;
    
    setCategoryRules(prev => ({
      ...prev,
      [categoryKey]: (prev[categoryKey] || []).filter(k => k !== keyword)
    }));
    
    // Restore scroll position after state update
    setTimeout(() => {
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTop = scrollPos;
      }
    }, 0);
  };

  const InlineEditExpense: React.FC<{
    expense: Expense;
    onSave: (expense: Expense) => void;
    onCancel: () => void;
  }> = ({ expense, onSave, onCancel }) => {
    const [editData, setEditData] = useState({
      description: expense.description,
      amount: expense.amount.toString(),
      currency: expense.currency,
      category: expense.category,
      date: expense.date || ""
    });

    const handleSave = (e: React.MouseEvent) => {
      e.preventDefault();
      scrollPositionRef.current = window.pageYOffset;
      onSave({
        ...expense,
        description: editData.description,
        amount: parseFloat(editData.amount.replace(",", ".")),
        currency: editData.currency,
        category: editData.category,
        date: editData.date
      });
    };

    const handleCancel = (e: React.MouseEvent) => {
      e.preventDefault();
      scrollPositionRef.current = window.pageYOffset;
      onCancel();
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
    };

    return (
      <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <input
          type="text"
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          className={`w-full p-2 mb-2 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
          placeholder="Description"
        />
        <input
          type="text"
          value={editData.amount}
          onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
          className={`w-full p-2 mb-2 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
          placeholder="Amount"
        />
        <select
          value={editData.currency}
          onChange={(e) => setEditData({ ...editData, currency: e.target.value })}
          className={`w-full p-2 mb-2 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="VND">VND</option>
        </select>
        <select
          value={editData.category}
          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
          className={`w-full p-2 mb-2 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
        >
          {Object.keys(categories).map(catKey => (
            <option key={catKey} value={catKey}>
              {categories[catKey].icon} {getTranslatedCategory(catKey, categories[catKey].name, t)}
            </option>
          ))}
        </select>
        <input
          type="month"
          value={editData.date}
          onChange={(e) => setEditData({ ...editData, date: e.target.value })}
          className={`w-full p-2 mb-2 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 p-2 rounded"
            style={{ backgroundColor: buttonColor }}
            type="button"
          >
            {t.save}
          </button>
          <button
            onClick={handleCancel}
            className={`flex-1 p-2 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
            type="button"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    );
  };

  const IconPicker: React.FC<{
    selectedIcon: string;
    onSelectIcon: (icon: string) => void;
  }> = ({ selectedIcon, onSelectIcon }) => {
    return (
      <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'} max-h-48 overflow-y-auto`}>
        <div className="grid grid-cols-10 gap-2">
          {ICON_OPTIONS.map((icon, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectIcon(icon)}
              className={`text-2xl p-2 rounded hover:bg-opacity-70 transition ${
                selectedIcon === icon 
                  ? (isDarkMode ? 'bg-gray-500 ring-2 ring-white' : 'bg-gray-300 ring-2 ring-blue-500')
                  : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-200')
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const CategoryRulesManager = () => {
    const [newKeywords, setNewKeywords] = useState<Record<string, string>>({});
    const [newCategoryForm, setNewCategoryForm] = useState({ name: "", icon: "📁" });
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showIconPicker, setShowIconPicker] = useState(false);

    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-3xl w-full max-h-[85vh] flex flex-col`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{t.manageCategoryRules}</h2>
            <button
              onClick={() => setShowRulesManager(false)}
              className={`p-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable content */}
          <div ref={modalScrollRef} className="overflow-y-auto flex-1">
            {/* Add New Category Section */}
            <div className={`p-4 rounded mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              {!showAddCategory ? (
                <button
                  onClick={() => setShowAddCategory(true)}
                  className="w-full p-3 rounded flex items-center justify-center gap-2"
                  style={{ backgroundColor: buttonColor }}
                >
                  <Plus size={20} />
                  {t.addNewCategory}
                </button>
              ) : (
                <div>
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder={t.enterCategoryName}
                      value={newCategoryForm.name}
                      onChange={(e) => setNewCategoryForm({ ...newCategoryForm, name: e.target.value })}
                      className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                  
                  <div className="mb-2 flex items-center gap-2">
                    <div 
                      className={`text-4xl p-2 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-white'} cursor-pointer`}
                      onClick={() => setShowIconPicker(!showIconPicker)}
                    >
                      {newCategoryForm.icon}
                    </div>
                    <button
                      onClick={() => setShowIconPicker(!showIconPicker)}
                      className={`flex-1 p-2 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}
                    >
                      {t.selectIcon}
                    </button>
                  </div>

                  {showIconPicker && (
                    <div className="mb-2">
                      <IconPicker 
                        selectedIcon={newCategoryForm.icon}
                        onSelectIcon={(icon) => {
                          setNewCategoryForm({ ...newCategoryForm, icon });
                          setShowIconPicker(false);
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        addNewCategory(newCategoryForm.name, newCategoryForm.icon);
                        setNewCategoryForm({ name: "", icon: "📁" });
                        setShowAddCategory(false);
                        setShowIconPicker(false);
                      }}
                      className="flex-1 p-2 rounded"
                      style={{ backgroundColor: buttonColor }}
                    >
                      {t.save}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddCategory(false);
                        setShowIconPicker(false);
                        setNewCategoryForm({ name: "", icon: "📁" });
                      }}
                      className={`flex-1 p-2 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                    >
                      {t.cancel}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Existing Categories */}
            <div className="space-y-6">
              {Object.keys(categories).map(catKey => (
                <div key={catKey} className={`p-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{categories[catKey].icon}</span>
                      <h3 className="text-lg font-bold">
                        {getTranslatedCategory(catKey, categories[catKey].name, t)}
                      </h3>
                    </div>
                    <button
                      onClick={() => deleteCategory(catKey)}
                      className="p-2 rounded text-red-500 hover:bg-red-100"
                      title={t.deleteCategory}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="mb-2">
                    <label className="text-sm opacity-75 mb-1 block">{t.categoryRules}</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(categoryRules[catKey] || []).map((keyword, idx) => (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                            isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                          }`}
                        >
                          {keyword}
                          <button
                            onClick={() => removeKeywordFromCategory(catKey, keyword)}
                            className="hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newKeywords[catKey] || ""}
                        onChange={(e) => setNewKeywords({ ...newKeywords, [catKey]: e.target.value })}
                        placeholder={t.categoryRulesPlaceholder}
                        className={`flex-1 p-2 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addKeywordToCategory(catKey, newKeywords[catKey] || "");
                            setNewKeywords({ ...newKeywords, [catKey]: "" });
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          addKeywordToCategory(catKey, newKeywords[catKey] || "");
                          setNewKeywords({ ...newKeywords, [catKey]: "" });
                        }}
                        className="p-2 rounded"
                        style={{ backgroundColor: buttonColor }}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowRulesManager(false)}
            className="w-full mt-4 p-3 rounded"
            style={{ backgroundColor: buttonColor }}
          >
            {t.save}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t.sharedExpenseTracker}</h1>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowRulesManager(true)}
              className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
              title={t.manageCategoryRules}
            >
              <Settings size={20} />
            </button>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="vi">Tiếng Việt</option>
            </select>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">{t.descriptionInputLabel}</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                placeholder={t.exampleItem}
              />
            </div>
            <div>
              <label className="block mb-2">{t.amountInputLabel}</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                placeholder={amountExampleText}
              />
            </div>
            <div>
              <label className="block mb-2">{t.currencyLabel}</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="VND">VND (₫)</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">{t.categoryLabel}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                {Object.keys(categories).map(catKey => (
                  <option key={catKey} value={catKey}>
                    {categories[catKey].icon} {getTranslatedCategory(catKey, categories[catKey].name, t)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">{t.expenseDateLabel}</label>
              <div className="flex gap-2">
                <select
                  value={expenseMonth}
                  onChange={(e) => setExpenseMonth(e.target.value)}
                  className={`flex-1 p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  {t.monthNames.map((month, idx) => (
                    <option key={idx} value={(idx + 1).toString().padStart(2, "0")}>
                      {month}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={expenseYear}
                  onChange={(e) => setExpenseYear(e.target.value)}
                  className={`w-24 p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  placeholder="Year"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded text-white font-bold"
            style={{ backgroundColor: buttonColor }}
          >
            {t.addExpense}
          </button>
        </form>

        {/* Search Bar */}
        <div className={`mb-4 p-3 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2">
            <Search size={20} className="opacity-50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchExpenses}
              className={`flex-1 p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
            />
            {searchTerm && (
              <>
                <span className="text-sm opacity-75">
                  {getFilteredExpenses().length} {t.searchResults}
                </span>
                <button
                  onClick={() => setSearchTerm("")}
                  className={`px-3 py-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {t.clearSearch}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <label className="flex-1 cursor-pointer">
            <div className={`p-3 rounded text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <Upload className="inline mr-2" size={20} />
              {t.importFile}
            </div>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </label>
          <label className="flex-1 cursor-pointer">
            <div className={`p-3 rounded text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <FileText className="inline mr-2" size={20} />
              {t.uploadInvoice}
            </div>
            <input
              type="file"
              accept=".txt,.pdf"
              onChange={handleInvoiceUpload}
              className="hidden"
            />
          </label>
          <button
            onClick={downloadCSV}
            className={`flex-1 p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          >
            {t.downloadCSV}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <label className="flex-1 cursor-pointer">
            <div className={`p-3 rounded text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <Upload className="inline mr-2" size={20} />
              {t.importFile}
            </div>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </label>
          <label className="flex-1 cursor-pointer">
            <div className={`p-3 rounded text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <FileText className="inline mr-2" size={20} />
              {t.uploadInvoice}
            </div>
            <input
              type="file"
              accept=".txt,.pdf"
              onChange={handleInvoiceUpload}
              className="hidden"
            />
          </label>
          <button
            onClick={downloadCSV}
            className={`flex-1 p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          >
            {t.downloadCSV}
          </button>
        </div>

        {/* Sticky Batch Edit - shows when expenses are selected */}
        {selectedExpenseIds.length > 0 && (
          <div className={`sticky top-4 z-40 p-4 rounded mb-4 shadow-lg border-2 ${isDarkMode ? 'bg-gray-800 border-blue-500' : 'bg-blue-50 border-blue-400'}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                  {selectedExpenseIds.length}
                </span>
                {t.batchEditSelected}
              </h3>
              <button
                onClick={() => setSelectedExpenseIds([])}
                className={`p-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                title="Deselect all"
              >
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                value={batchEditDescription}
                onChange={(e) => setBatchEditDescription(e.target.value)}
                placeholder="New description"
                className={`p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <select
                value={batchEditCategory}
                onChange={(e) => setBatchEditCategory(e.target.value)}
                className={`p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              >
                <option value="">Change category...</option>
                {Object.keys(categories).map(catKey => (
                  <option key={catKey} value={catKey}>
                    {categories[catKey].icon} {getTranslatedCategory(catKey, categories[catKey].name, t)}
                  </option>
                ))}
              </select>
              <button
                onClick={applyAllBatchEdits}
                className="p-2 rounded text-white font-bold"
                style={{ backgroundColor: buttonColor }}
              >
                {t.applyChanges}
              </button>
            </div>
          </div>
        )}

        <div>

          {Object.keys(categories).map(categoryKey => {
            const filteredExpenses = getFilteredExpenses();
            const categoryExpenses = filteredExpenses.filter(exp => exp.category === categoryKey);
            if (categoryExpenses.length === 0) return null;

            const categoryTotal = calculateCategoryTotal(categoryKey, !!searchTerm);
            const perPersonAmount = numberOfPeople > 0 ? categoryTotal / numberOfPeople : 0;

            return (
              <div key={categoryKey} className={`mb-6 p-4 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {categories[categoryKey].icon} {getTranslatedCategory(categoryKey, categories[categoryKey].name, t)}
                  </h2>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={categoryExpenses.every(exp => selectedExpenseIds.includes(exp.id))}
                      onChange={() => toggleSelectAllInCategory(categoryKey)}
                      className="w-5 h-5"
                    />
                    <div className="text-right">
                      <div className="font-bold">
                        {t.categoryTotal} {formatCurrency(categoryTotal, primaryCurrency)}
                      </div>
                      {numberOfPeople > 1 && (
                        <div className="text-sm opacity-75">
                          {t.perPerson}: {formatCurrency(perPersonAmount, primaryCurrency)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {categoryExpenses.map((expense) => (
                  <div key={expense.id} className="mb-2">
                    {editingExpenseId === expense.id ? (
                      <InlineEditExpense
                        expense={expense}
                        onSave={updateExpense}
                        onCancel={() => {
                          setEditingExpenseId(null);
                          setTimeout(() => {
                            window.scrollTo(0, scrollPositionRef.current);
                          }, 0);
                        }}
                      />
                    ) : (
                      <div className={`p-3 rounded flex justify-between items-center ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedExpenseIds.includes(expense.id)}
                            onChange={() => toggleSelectExpense(expense.id)}
                            className="w-5 h-5"
                          />
                          <div className="flex-1">
                            <div className="font-semibold">
                              {searchTerm ? highlightText(expense.description, searchTerm) : expense.description}
                            </div>
                            <div className="text-sm opacity-75">
                              {formatCurrency(expense.amount, expense.currency)}
                              {expense.date && ` • ${convertDateToFileString(expense.date)}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              scrollPositionRef.current = window.pageYOffset;
                              setEditingExpenseId(expense.id);
                            }}
                            className={`p-2 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteExpense(expense.id)}
                            className={`p-2 rounded ${isDarkMode ? 'bg-red-600' : 'bg-red-200'}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {expenses.length === 0 && (
          <div className="text-center py-12 opacity-50">
            {t.noExpensesYet}
          </div>
        )}

        {expenses.length > 0 && (
          <div className={`p-4 rounded mt-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{t.totalExpenses}</h2>
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                    className={`w-16 p-2 rounded text-center ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                    title={t.numberOfPeople}
                  />
                </div>
                <select
                  value={primaryCurrency}
                  onChange={(e) => setPrimaryCurrency(e.target.value)}
                  className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="VND">VND (₫)</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg">{t.total}:</span>
                <span className="text-3xl font-bold">
                  {formatCurrency(calculateGrandTotal(!!searchTerm), primaryCurrency)}
                </span>
              </div>
              {numberOfPeople > 1 && (
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-lg">
                    {t.perPerson} ({numberOfPeople} {numberOfPeople === 1 ? t.person : t.people}):
                  </span>
                  <span className="text-2xl font-bold text-blue-500">
                    {formatCurrency(calculateGrandTotal(!!searchTerm) / numberOfPeople, primaryCurrency)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showRulesManager && <CategoryRulesManager />}
    </div>
  );
};

export default ExpenseTracker;
