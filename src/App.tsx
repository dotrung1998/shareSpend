import React, { useState, useEffect, useRef } from "react";
import { Upload, Edit2, Trash2, Sun, Moon, FileText } from "lucide-react";

const translations = {
  en: {
    sharedExpenseTracker: "Shared Expense Tracker",
    manageCategories: "Manage Categories",
    currentCategories: "Current Categories",
    addCategory: "Add Category",
    categoryName: "Category Name",
    enterCategoryName: "Enter category name",
    categoryIcon: "Category Icon",
    categoryNote: "Category Description/Note",
    categoryNotePlaceholder: "Add a note for the category",
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
    batchEditSelected: "Batch Edit Selected Expenses",
    applyChanges: "Apply Changes to Selected Expenses",
    noExpensesYet: "No expenses added yet. Start by adding your first expense!",
    totalExpenses: "Total Expenses:",
    downloadCSV: "Download CSV",
    importFile: "Import file",
    uploadInvoice: "Upload Invoice (PDF/Image)",
    exampleItem: "e.g., Coffee",
    amountExample: "e.g., 10",
    requiredFieldsWarning: "Please fill out this field.",
    categoryTotal: "Category Total:",
    monthNames: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    categories: {
      eating: "Eating in the restaurant",
      groceries: "Groceries",
      furniture: "Furniture",
      other: "Other"
    }
  },
  fr: {
    sharedExpenseTracker: "Gestionnaire de dépenses partagées",
    manageCategories: "Gérer les catégories",
    currentCategories: "Catégories actuelles",
    addCategory: "Ajouter une catégorie",
    categoryName: "Nom de la catégorie",
    enterCategoryName: "Entrez le nom de la catégorie",
    categoryIcon: "Icône de catégorie",
    categoryNote: "Description/Note de la catégorie",
    categoryNotePlaceholder: "Ajouter une note pour la catégorie",
    delete: "Supprimer",
    edit: "Éditer",
    cancel: "Annuler",
    save: "Enregistrer",
    enterCustomIcon: "Entrez une icône personnalisée",
    addExpense: "Ajouter une dépense(s)",
    descriptionInputLabel: "Description (séparez plusieurs entrées avec ';' ou '+')",
    amountInputLabel: "Montant (séparez plusieurs entrées avec ';' ou '+')",
    expenseDateLabel: "Date de dépense (mois et année)",
    currencyLabel: "Devise",
    categoryLabel: "Catégorie",
    primaryCurrencyLabel: "Devise principale",
    batchEditSelected: "Modifier en lot les dépenses sélectionnées",
    applyChanges: "Appliquer les modifications aux dépenses sélectionnées",
    noExpensesYet: "Aucune dépense ajoutée. Commencez par ajouter votre première dépense !",
    totalExpenses: "Total des dépenses :",
    downloadCSV: "Télécharger CSV",
    importFile: "Importer un fichier",
    uploadInvoice: "Télécharger Facture (PDF/Image)",
    exampleItem: "ex. Café",
    amountExample: "ex. 10",
    requiredFieldsWarning: "Veuillez remplir ce champ.",
    categoryTotal: "Total de la catégorie:",
    monthNames: [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ],
    categories: {
      eating: "Restaurant",
      groceries: "Épicerie",
      furniture: "Mobilier",
      other: "Autre"
    }
  },
  de: {
    sharedExpenseTracker: "Gemeinsamer Ausgaben-Tracker",
    manageCategories: "Kategorien verwalten",
    currentCategories: "Aktuelle Kategorien",
    addCategory: "Kategorie hinzufügen",
    categoryName: "Kategoriename",
    enterCategoryName: "Kategoriename eingeben",
    categoryIcon: "Kategorensymbol",
    categoryNote: "Kategoriebeschreibung/Notiz",
    categoryNotePlaceholder: "Fügen Sie der Kategorie eine Notiz hinzu",
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
    batchEditSelected: "Ausgewählte Ausgaben Stapelbearbeitung",
    applyChanges: "Änderungen auf ausgewählte Ausgaben anwenden",
    noExpensesYet: "Noch keine Ausgaben hinzugefügt. Beginnen Sie mit der ersten Ausgabe!",
    totalExpenses: "Gesamtausgaben:",
    downloadCSV: "CSV herunterladen",
    importFile: "Datei importieren",
    uploadInvoice: "Rechnung hochladen (PDF/Bild)",
    exampleItem: "z.B. Kaffee",
    amountExample: "z.B. 10",
    requiredFieldsWarning: "Bitte füllen Sie dieses Feld aus.",
    categoryTotal: "Kategorien Gesamt:",
    monthNames: [
      "Januar", "Februar", "März", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Dezember"
    ],
    categories: {
      eating: "Restaurant",
      groceries: "Lebensmittel",
      furniture: "Möbel",
      other: "Andere"
    }
  },
  vi: {
    sharedExpenseTracker: "Trình Theo Dõi Chi Phí Chung",
    manageCategories: "Quản Lý Danh Mục",
    currentCategories: "Danh Mục Hiện Tại",
    addCategory: "Thêm Danh Mục",
    categoryName: "Tên danh mục",
    enterCategoryName: "Nhập tên danh mục",
    categoryIcon: "Biểu tượng danh mục",
    categoryNote: "Mô tả/Ghi chú danh mục",
    categoryNotePlaceholder: "Thêm ghi chú cho danh mục",
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
    batchEditSelected: "Chỉnh Sửa Hàng Loạt Các Chi Phí Được Chọn",
    applyChanges: "Áp dụng thay đổi cho các chi phí được chọn",
    noExpensesYet: "Chưa có chi phí nào. Hãy bắt đầu bằng cách thêm chi phí đầu tiên!",
    totalExpenses: "Tổng Chi Phí:",
    downloadCSV: "Tải xuống CSV",
    importFile: "Nhập tệp",
    uploadInvoice: "Tải lên Hóa đơn (PDF/Hình)",
    exampleItem: "vd: Cà phê",
    amountExample: "vd: 10000",
    requiredFieldsWarning: "Vui lòng điền vào mục này.",
    categoryTotal: "Tổng danh mục:",
    monthNames: [
      "Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu",
      "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"
    ],
    categories: {
      eating: "Ăn tại nhà hàng",
      groceries: "Tạp hóa",
      furniture: "Đồ nội thất",
      other: "Khác"
    }
  },
  zh: {
    sharedExpenseTracker: "共享支出跟踪器",
    manageCategories: "管理类别",
    currentCategories: "当前类别",
    addCategory: "添加类别",
    categoryName: "类别名称",
    enterCategoryName: "输入类别名称",
    categoryIcon: "类别图标",
    categoryNote: "类别描述/备注",
    categoryNotePlaceholder: "为类别添加备注",
    delete: "删除",
    edit: "编辑",
    cancel: "取消",
    save: "保存",
    enterCustomIcon: "输入自定义图标",
    addExpense: "添加支出",
    descriptionInputLabel: "描述（使用';'或'+'分隔多个条目）",
    amountInputLabel: "金额（使用';'或'+'分隔多个条目）",
    expenseDateLabel: "支出日期（月和年）",
    currencyLabel: "货币",
    categoryLabel: "类别",
    primaryCurrencyLabel: "主要货币",
    batchEditSelected: "批量编辑所选支出",
    applyChanges: "应用更改到所选支出",
    noExpensesYet: "尚未添加任何支出。开始添加您的第一个支出！",
    totalExpenses: "总支出：",
    downloadCSV: "下载 CSV",
    importFile: "导入文件",
    uploadInvoice: "上传发票 (PDF/图片)",
    exampleItem: "例如：咖啡",
    amountExample: "例如：10",
    requiredFieldsWarning: "请填写此字段。",
    categoryTotal: "类别总计:",
    monthNames: [
      "一月", "二月", "三月", "四月", "五月", "六月",
      "七月", "八月", "九月", "十月", "十一月", "十二月"
    ],
    categories: {
      eating: "餐饮",
      groceries: "杂货",
      furniture: "家具",
      other: "其他"
    }
  },
  ja: {
    sharedExpenseTracker: "共通経費トラッカー",
    manageCategories: "カテゴリ管理",
    currentCategories: "現在のカテゴリ",
    addCategory: "カテゴリを追加",
    categoryName: "カテゴリ名",
    enterCategoryName: "カテゴリ名を入力",
    categoryIcon: "カテゴリアイコン",
    categoryNote: "カテゴリ説明/メモ",
    categoryNotePlaceholder: "カテゴリーにメモを追加",
    delete: "削除",
    edit: "編集",
    cancel: "キャンセル",
    save: "保存",
    enterCustomIcon: "カスタムアイコンを入力",
    addExpense: "経費を追加",
    descriptionInputLabel: "説明（';' または '+' で複数エントリを区切る）",
    amountInputLabel: "金額（';' または '+' で複数エントリを区切る）",
    expenseDateLabel: "経費日付（月と年）",
    currencyLabel: "通貨",
    categoryLabel: "カテゴリ",
    primaryCurrencyLabel: "主要通貨",
    batchEditSelected: "選択した経費を一括編集",
    applyChanges: "選択した経費に変更を適用",
    noExpensesYet: "まだ経費が追加されていません。最初の経費を追加してください！",
    totalExpenses: "総経費：",
    downloadCSV: "CSVをダウンロード",
    importFile: "ファイルをインポート",
    uploadInvoice: "請求書をアップロード (PDF/画像)",
    exampleItem: "例：コーヒー",
    amountExample: "例：10",
    requiredFieldsWarning: "このフィールドに入力してください。",
    categoryTotal: "カテゴリ合計:",
    monthNames: [
      "1月", "2月", "3月", "4月", "5月", "6月",
      "7月", "8月", "9月", "10月", "11月", "12月"
    ],
    categories: {
      eating: "レストランでの食事",
      groceries: "食料品",
      furniture: "家具",
      other: "その他"
    }
  }
};

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

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const currentDate = new Date();
  const [expenseYear, setExpenseYear] = useState(currentDate.getFullYear().toString());
  const [expenseMonth, setExpenseMonth] = useState((currentDate.getMonth() + 1).toString().padStart(2, "0"));
  const [currency, setCurrency] = useState("EUR");
  const [category, setCategory] = useState("eating");
  const [categories, setCategories] = useState<Record<string, Category>>({
    eating: { name: translations.en.categories.eating, icon: "🍽️", note: "" },
    groceries: { name: translations.en.categories.groceries, icon: "🛒", note: "" },
    furniture: { name: translations.en.categories.furniture, icon: "🪑", note: "" },
    other: { name: translations.en.categories.other, icon: "📦", note: "" }
  });
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

  const deleteExpensesByCategory = (categoryKey: string) => {
    setExpenses(prev => prev.filter(exp => exp.category !== categoryKey));
  };

  const deleteCategory = (categoryKey: string) => {
    setCategories(prev => {
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

  const calculateGrandTotal = () => {
    return expenses.reduce(
      (sum, exp) => sum + convertAmountTo(exp.amount, exp.currency, primaryCurrency),
      0
    );
  };

  const calculateCategoryTotal = (categoryKey: string) => {
    return expenses
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
    const categoryExpenseIds = expenses.filter(exp => exp.category === categoryKey).map(exp => exp.id);
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
    csvRows.push(
      ["ID", "Description", "Date", "Amount", "Currency", "Original Amount", "Category"]
        .map(escapeCSV).join(",")
    );
    rowIndex++;

    const categoryTotalCellRefs: string[] = [];
    Object.keys(categories).forEach(categoryKey => {
      const categoryExpenses = expenses.filter(exp => exp.category === categoryKey);
      if (categoryExpenses.length === 0) return;

      csvRows.push(["", "", "", "", "", "", ""].join(","));
      rowIndex++;
      csvRows.push(
        [`CATEGORY: ${getTranslatedCategory(categoryKey, categories[categoryKey].name, t)}`, "", "", "", "", "", ""]
          .map(escapeCSV).join(",")
      );
      rowIndex++;
      csvRows.push(["", "", "", "", "", "", ""].join(","));
      rowIndex++;

      const expenseStart = rowIndex;
      categoryExpenses.forEach((exp, index) => {
        const convertedAmount = convertAmountTo(exp.amount, exp.currency, primaryCurrency);
        csvRows.push([
          index + 1,
          exp.description || "No description",
          exp.date || "",
          formatCurrencyForCSV(convertedAmount, primaryCurrency),
          primaryCurrency,
          formatCurrencyForCSV(exp.amount, exp.currency) + " " + exp.currency,
          getTranslatedCategory(exp.category, categories[exp.category]?.name || exp.category, t)
        ].map(escapeCSV).join(","));
        rowIndex++;
      });

      const expenseEnd = rowIndex - 1;
      csvRows.push(["", "", "", "", "", "", ""].join(","));
      rowIndex++;
      const categoryTotalFormula = `=SUM(D${expenseStart}:D${expenseEnd})`;
      csvRows.push(
        ["", t.categoryTotal, "", categoryTotalFormula, primaryCurrency, "", ""]
          .map(escapeCSV).join(",")
      );
      categoryTotalCellRefs.push(`D${rowIndex}`);
      rowIndex++;
      csvRows.push(["", "", "", "", "", "", ""].join(","));
      rowIndex++;
    });

    csvRows.push(["", "", "", "", "", "", ""].join(","));
    rowIndex++;
    const grandTotalFormula = `=SUM(${categoryTotalCellRefs.join(",")})`;
    csvRows.push(
      ["", "GRAND TOTAL:", "", grandTotalFormula, primaryCurrency, "", ""]
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
      
      // Skip empty rows
      if (row.every(cell => cell.trim() === "")) continue;

      // Skip category header rows
      if (row[0].startsWith("CATEGORY:")) {
        currentCategoryName = row[0].split("CATEGORY:")[1].trim();
        const catKey = currentCategoryName.toLowerCase().replace(/\s+/g, "_");
        if (!newCategories[catKey]) {
          newCategories[catKey] = { name: currentCategoryName, icon: "🔖", note: "" };
        }
        continue;
      }

      // Skip total rows - check all possible columns and patterns
      const rowText = row.join(" ").toLowerCase();
      if (rowText.includes("total") || 
          rowText.includes("gesamt") ||
          row[1]?.toLowerCase().includes("total") ||
          row[1]?.toLowerCase().includes("gesamt") ||
          row[0]?.toLowerCase().includes("total") ||
          row[0]?.toLowerCase().includes("grand")) {
        continue;
      }

      // Skip rows that start with formulas
      if (row[3]?.startsWith("=")) continue;

      // Must have exactly 7 columns for valid expense
      if (row.length !== 7) continue;

      // Skip if description is empty or just whitespace
      if (!row[1] || row[1].trim() === "") continue;

      // Skip if amount is not a valid number
      const amount = parseFloat(row[3]);
      if (isNaN(amount) || amount === 0) continue;

      // Use the category from the row if available, else fall back to current category
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
    
    if (desc.includes("rewe") || desc.includes("kaufland") || desc.includes("dm-drogerie") || 
        desc.includes("dm-markt") || desc.includes("rossmann") || desc.includes("depot") || 
        desc.includes("penny") || desc.includes("aldi") || desc.includes("lidl")) {
      return "groceries";
    }
    
    if (desc.includes("restaurant") || desc.includes("kfc") || desc.includes("backwerk") || 
        desc.includes("grill") || desc.includes("asia") || desc.includes("chiking") || 
        desc.includes("burger") || desc.includes("pizza") || desc.includes("mcdonalds") ||
        desc.includes("gourmet") || desc.includes("sumup")) {
      return "eating";
    }
    
    if (desc.includes("fressnapf") || desc.includes("pet")) {
      return "other";
    }
    
    if (desc.includes("tjxeurope") || desc.includes("furniture") || desc.includes("möbel") ||
        desc.includes("ikea")) {
      return "furniture";
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
        const transactionRegex = /^(\d{2}\.\d{2}\.\d{4})\s+(.+?)\s+([A-Za-zÄÖÜäöüß\s]+?)\s+([\d,]+)$/;

        for (let line of lines) {
          line = line.trim();
          if (!line) continue;
          
          if (line.includes('ALTER SALDO') || line.includes('NEUER SALDO') || 
              line.includes('EINZAHLUNG') || line.includes('SOLLZINSEN') ||
              line.includes('Mindestbetrag')) {
            continue;
          }

          const match = line.match(transactionRegex);
          if (match) {
            const [, date, description, location, amountStr] = match;
            const amount = parseAmount(amountStr);

            if (amount > 0 && description.trim()) {
              const categoryKey = categorizeExpense(description);
              
              newExpenses.push({
                id: uniqueIdCounter++,
                description: description.trim(),
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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t.sharedExpenseTracker}</h1>
          <div className="flex gap-2 items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
              <option value="vi">Tiếng Việt</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
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

        {selectedExpenseIds.length > 0 && (
          <div className={`p-4 rounded mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
            <h3 className="font-bold mb-2">{t.batchEditSelected} ({selectedExpenseIds.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={batchEditDescription}
                onChange={(e) => setBatchEditDescription(e.target.value)}
                placeholder="New description"
                className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
              />
              <select
                value={batchEditCategory}
                onChange={(e) => setBatchEditCategory(e.target.value)}
                className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
              >
                <option value="">Select category</option>
                {Object.keys(categories).map(catKey => (
                  <option key={catKey} value={catKey}>
                    {categories[catKey].icon} {getTranslatedCategory(catKey, categories[catKey].name, t)}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={applyAllBatchEdits}
              className="w-full p-2 rounded text-white"
              style={{ backgroundColor: buttonColor }}
            >
              {t.applyChanges}
            </button>
          </div>
        )}

        <div>
          {Object.keys(categories).map(categoryKey => {
            const categoryExpenses = expenses.filter(exp => exp.category === categoryKey);
            if (categoryExpenses.length === 0) return null;

            const categoryTotal = calculateCategoryTotal(categoryKey);

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
                    <span className="font-bold">
                      {t.categoryTotal} {formatCurrency(categoryTotal, primaryCurrency)}
                    </span>
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
                            <div className="font-semibold">{expense.description}</div>
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
            <div className="text-3xl font-bold">
              {formatCurrency(calculateGrandTotal(), primaryCurrency)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
