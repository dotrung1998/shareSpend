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
    importInvoice: "Import Invoice (PDF)",
    exampleItem: "e.g., Coffee",
    amountExample: "e.g., 10",
    requiredFieldsWarning: "Please fill out this field.",
    categoryTotal: "Category Total:",
    invoiceParseSuccess: "Invoice parsed successfully!",
    invoiceParseError: "Error parsing invoice. Please check the format.",
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
    importInvoice: "Importer une facture (PDF)",
    exampleItem: "ex. Café",
    amountExample: "ex. 10",
    requiredFieldsWarning: "Veuillez remplir ce champ.",
    categoryTotal: "Total de la catégorie:",
    invoiceParseSuccess: "Facture analysée avec succès!",
    invoiceParseError: "Erreur lors de l'analyse de la facture.",
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
    importInvoice: "Rechnung importieren (PDF)",
    exampleItem: "z.B. Kaffee",
    amountExample: "z.B. 10",
    requiredFieldsWarning: "Bitte füllen Sie dieses Feld aus.",
    categoryTotal: "Kategorien Gesamt:",
    invoiceParseSuccess: "Rechnung erfolgreich analysiert!",
    invoiceParseError: "Fehler beim Analysieren der Rechnung.",
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
    importInvoice: "Nhập hóa đơn (PDF)",
    exampleItem: "vd: Cà phê",
    amountExample: "vd: 10000",
    requiredFieldsWarning: "Vui lòng điền vào mục này.",
    categoryTotal: "Tổng danh mục:",
    invoiceParseSuccess: "Phân tích hóa đơn thành công!",
    invoiceParseError: "Lỗi khi phân tích hóa đơn.",
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
    importInvoice: "导入发票 (PDF)",
    exampleItem: "例如：咖啡",
    amountExample: "例如：10",
    requiredFieldsWarning: "请填写此字段。",
    categoryTotal: "类别总计:",
    invoiceParseSuccess: "发票解析成功！",
    invoiceParseError: "解析发票时出错。",
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
    importInvoice: "請求書をインポート (PDF)",
    exampleItem: "例：コーヒー",
    amountExample: "例：10",
    requiredFieldsWarning: "このフィールドに入力してください。",
    categoryTotal: "カテゴリ合計:",
    invoiceParseSuccess: "請求書の解析が成功しました！",
    invoiceParseError: "請求書の解析エラー。",
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

// Category detection patterns
const categorizeTransaction = (description: string): string => {
  const desc = description.toLowerCase();
  
  // Groceries patterns
  if (desc.includes("rewe") || desc.includes("kaufland") || desc.includes("penny") || 
      desc.includes("aldi") || desc.includes("lidl") || desc.includes("edeka") ||
      desc.includes("rossmann") || desc.includes("dm-drogerie") || desc.includes("depot")) {
    return "groceries";
  }
  
  // Restaurant/Eating patterns
  if (desc.includes("restaurant") || desc.includes("grill") || desc.includes("kfc") ||
      desc.includes("mcdonald") || desc.includes("burger") || desc.includes("pizza") ||
      desc.includes("asia") || desc.includes("backwerk") || desc.includes("chiking") ||
      desc.includes("sumup")) {
    return "eating";
  }
  
  // Pet supplies
  if (desc.includes("fressnapf") || desc.includes("zoo")) {
    return "other";
  }
  
  // Furniture/Home
  if (desc.includes("ikea") || desc.includes("möbel") || desc.includes("tjxeurope")) {
    return "furniture";
  }
  
  return "other";
};

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const currentDate = new Date();
  const [expenseYear, setExpenseYear] = useState(currentDate.getFullYear().toString());
  const [expenseMonth, setExpenseMonth] = useState((currentDate.getMonth() + 1).toString().padStart(2, "0"));
  const [currency, setCurrency] = useState("EUR");
  const [category, setCategory] = useState("eating");
  const [categories, setCategories] = useState({
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

  // Ref to store expense row positions
  const expenseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const t = translations[language as keyof typeof translations];

  // Update default categories names based on language selection
  useEffect(() => {
    setCategories((prev: any) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key].name = (t.categories as any)[key] || updated[key].name;
      });
      return updated;
    });
  }, [t]);

  const amountExampleText =
    currency === "VND" ? (language === "vi" ? "vd: 10000" : "10000") : t.amountExample;

  const currencies: any = {
    EUR: { symbol: "€", rate: 25000 },
    USD: { symbol: "$", rate: 23000 },
    VND: { symbol: "₫", rate: 1 }
  };

  const convertAmountTo = (amountValue: number, fromCurrency: string, toCurrency: string) => {
    return amountValue * (currencies[fromCurrency].rate / currencies[toCurrency].rate);
  };

  const formatCurrency = (value: number, curr: string) => {
    if (curr === "VND") {
      return `₫${Math.round(value).toLocaleString("vi-VN")}`;
    }
    return `${currencies[curr].symbol}${value.toFixed(2)} ${curr}`;
  };

  const formatCurrencyForCSV = (value: number, curr: string) => {
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
    setExpenses((prev: any[]) => prev.filter((exp) => exp.category !== categoryKey));
  };

  const deleteCategory = (categoryKey: string) => {
    setCategories((prev: any) => {
      const updated = { ...prev };
      delete updated[categoryKey];
      return updated;
    });
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
    setSelectedExpenseIds((ids) => ids.filter((expId) => expId !== id));
    if (editingExpenseId === id) {
      setEditingExpenseId(null);
    }
  };

  const updateExpense = (updatedExpense: any) => {
    setExpenses(expenses.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp)));
    setEditingExpenseId(null);
  };

  const applyAllBatchEdits = () => {
    let updatedExpenses = [...expenses];

    if (batchEditDescription.trim() !== "") {
      updatedExpenses = updatedExpenses.map((exp) =>
        selectedExpenseIds.includes(exp.id) ? { ...exp, description: batchEditDescription } : exp
      );
    }

    if (batchEditCategory) {
      updatedExpenses = updatedExpenses.map((exp) =>
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

  const toggleSelectExpense = (id: number) => {
    setSelectedExpenseIds((prev) =>
      prev.includes(id) ? prev.filter((expId) => expId !== id) : [...prev, id]
    );
  };

  const toggleSelectAllInCategory = (categoryKey: string) => {
    const categoryExpenseIds = expenses
      .filter((exp) => exp.category === categoryKey)
      .map((exp) => exp.id);
    const allSelected = categoryExpenseIds.every((id) => selectedExpenseIds.includes(id));

    if (allSelected) {
      setSelectedExpenseIds((prev) => prev.filter((id) => !categoryExpenseIds.includes(id)));
    } else {
      setSelectedExpenseIds((prev) => {
        const newSelected = [...prev];
        categoryExpenseIds.forEach((id) => {
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

    Object.keys(categories).forEach((categoryKey) => {
      const categoryExpenses = expenses.filter((exp) => exp.category === categoryKey);
      if (categoryExpenses.length === 0) return;

      csvRows.push(["", "", "", "", "", "", ""].join(","));
      rowIndex++;

      csvRows.push(
        [`CATEGORY: ${getTranslatedCategory(categoryKey, (categories as any)[categoryKey].name, t)}`, "", "", "", "", "", ""]
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
          getTranslatedCategory(exp.category, (categories as any)[exp.category]?.name || exp.category, t)
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
    const rows = text.split("\n").filter((row) => row.trim() !== "");
    return rows.map((row) =>
      row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((cell) => {
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

      const newExpenses: any[] = [];
      const newCategories: any = { ...categories };
      let currentCategoryName = "";
      let uniqueIdCounter = Date.now();
      let startRow = 0;

      if (data[0] && data[0][0] === "ID") {
        startRow = 1;
      }

      for (let i = startRow; i < data.length; i++) {
        const row = data[i];
        if (row.every((cell) => cell.trim() === "")) continue;

        if (row[0].startsWith("CATEGORY:")) {
          currentCategoryName = row[0].split("CATEGORY:")[1].trim();
          const catKey = currentCategoryName.toLowerCase().replace(/\s+/g, "_");
          if (!newCategories[catKey]) {
            newCategories[catKey] = { name: currentCategoryName, icon: "🔖", note: "" };
          }
          continue;
        }

        if (row[1] && (row[1].includes("CATEGORY TOTAL:") || row[1].includes("GRAND TOTAL:"))) continue;

        if (row.length !== 7) continue;

        const expenseCategoryName = row[6] ? row[6].trim() : currentCategoryName;
        const catKey = expenseCategoryName.toLowerCase().replace(/\s+/g, "_");

        if (!newCategories[catKey]) {
          newCategories[catKey] = { name: expenseCategoryName, icon: "🔖", note: "" };
        }

        newExpenses.push({
          id: uniqueIdCounter++,
          description: row[1],
          date: row[2],
          amount: parseFloat(row[3]),
          currency: row[4],
          category: catKey
        });
      }

      setExpenses(newExpenses);
      setCategories(newCategories);
    };
    reader.readAsText(file);
  };

  // NEW: Handle PDF invoice upload
  const handleInvoiceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        
        // Parse PDF text (simplified - in production use pdf.js or similar)
        const lines = content.split('\n');
        const newExpenses: any[] = [];
        let uniqueIdCounter = Date.now();
        let defaultDate = `${expenseYear}-${expenseMonth}`;
      
        // Find transaction lines
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          
          // Match pattern: DD.MM.YYYY Description Location Amount
          const match = line.match(/^(\d{2}\.\d{2}\.\d{4})\s+(.+?)\s+([A-Za-z\s]+?)\s+([\d,\.]+)$/);
          
          if (match) {
            const [, dateStr, desc, location, amountStr] = match;
            
            // Parse date
            const [day, month, year] = dateStr.split('.');
            const transactionDate = `${year}-${month}`;
            
            // Parse amount
            const amount = parseFloat(amountStr.replace(',', '.'));
            
            // Skip certain transactions
            if (desc.includes('EINZAHLUNG') || desc.includes('SOLLZINSEN') || 
                desc.includes('ALTER SALDO') || desc.includes('NEUER SALDO')) {
              continue;
            }
            
            // Auto-categorize based on description
            const detectedCategory = categorizeTransaction(desc + ' ' + location);
            
            newExpenses.push({
              id: uniqueIdCounter++,
              description: `${desc} - ${location}`,
              date: transactionDate,
              amount: amount,
              currency: 'EUR',
              category: detectedCategory
            });
          }
        }
        
        if (newExpenses.length > 0) {
          setExpenses([...expenses, ...newExpenses]);
          alert(`${t.invoiceParseSuccess} ${newExpenses.length} transactions imported.`);
        } else {
          alert(t.invoiceParseError);
        }
      } catch (error) {
        console.error('Error parsing invoice:', error);
        alert(t.invoiceParseError);
      }
    };
    
    reader.readAsText(file);
  };

  const InlineEditExpense: React.FC<any> = ({ expense, onSave, onCancel }) => {
    const [editData, setEditData] = useState({
      description: expense.description,
      amount: expense.amount.toString(),
      currency: expense.currency,
      category: expense.category,
      date: expense.date || ""
    });

    return (
      <div
        ref={(el) => (expenseRefs.current[expense.id] = el)}
        className={`${
          isDarkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-gray-100 text-gray-900 border-gray-200"
        } p-4 rounded-lg mb-2 border`}
      >
        <div className="grid grid-cols-5 gap-3">
          <input
            type="text"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className={`w-full p-2 rounded border ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-white"
            }`}
            placeholder="Description"
          />
          <input
            type="text"
            value={editData.amount}
            onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
            className={`w-full p-2 rounded border ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-white"
            }`}
            placeholder="Amount"
          />
          <select
            value={editData.currency}
            onChange={(e) => setEditData({ ...editData, currency: e.target.value })}
            className={`w-full p-2 rounded border ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-white"
            }`}
          >
            {Object.entries(currencies).map(([code, { symbol }]: [string, any]) => (
              <option key={code} value={code}>
                {code} ({symbol})
              </option>
            ))}
          </select>
          <select
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            className={`w-full p-2 rounded border ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-white"
            }`}
          >
            {Object.entries(categories).map(([key, { icon, name }]: [string, any]) => (
              <option key={key} value={key}>
                {icon} {getTranslatedCategory(key, name, t)}
              </option>
            ))}
          </select>
          <input
            type="month"
            value={editData.date}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            className={`w-full p-2 rounded border ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-white"
            }`}
          />
        </div>
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 border rounded text-red-500 hover:bg-red-50"
          >
            {t.cancel}
          </button>
          <button
            onClick={() => onSave({ ...expense, ...editData, amount: parseFloat(editData.amount) })}
            style={{ backgroundColor: buttonColor }}
            className="px-3 py-1 text-white rounded hover:opacity-90"
          >
            {t.save}
          </button>
        </div>
      </div>
    );
  };

  const CategorySection: React.FC<any> = ({ categoryKey }) => {
    const categoryExpenses = expenses.filter((exp) => exp.category === categoryKey);

    if (categoryExpenses.length === 0) return null;

    const allSelected = categoryExpenses.every((exp) => selectedExpenseIds.includes(exp.id));
    const total = categoryExpenses.reduce(
      (sum, exp) => sum + convertAmountTo(exp.amount, exp.currency, primaryCurrency),
      0
    );

    return (
      <div className="mb-8 relative">
        <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => toggleSelectAllInCategory(categoryKey)}
              className="h-5 w-5"
            />
            <span>
              {(categories as any)[categoryKey].icon}{" "}
              {getTranslatedCategory(categoryKey, (categories as any)[categoryKey].name, t)}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setEditingCategory({
                  key: categoryKey,
                  name: (categories as any)[categoryKey].name,
                  icon: (categories as any)[categoryKey].icon,
                  note: (categories as any)[categoryKey].note
                })
              }
              className="group relative"
            >
              <Edit2 className="h-5 w-5 text-blue-500" />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs text-blue-500 opacity-0 group-hover:opacity-100 z-50">
                {t.edit}
              </span>
            </button>
            <button onClick={() => deleteExpensesByCategory(categoryKey)} className="group relative">
              <Trash2 className="h-5 w-5 text-red-500" />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs text-red-500 opacity-0 group-hover:opacity-100 z-50">
                {t.delete}
              </span>
            </button>
          </div>
        </h2>

        <div className="space-y-2">
          {categoryExpenses.map((expense) => {
            if (editingExpenseId === expense.id) {
              return (
                <InlineEditExpense
                  key={expense.id}
                  expense={expense}
                  onSave={(updated: any) => {
                    // Store current scroll position
                    const currentRef = expenseRefs.current[expense.id];
                    const scrollY = window.scrollY;
                    
                    updateExpense(updated);
                    
                    // Restore scroll position after update
                    setTimeout(() => {
                      if (currentRef) {
                        const rect = currentRef.getBoundingClientRect();
                        const elementTop = scrollY + rect.top;
                        window.scrollTo({ top: elementTop - 100, behavior: 'smooth' });
                      }
                    }, 0);
                  }}
                  onCancel={() => setEditingExpenseId(null)}
                />
              );
            }

            return (
              <div
                key={expense.id}
                ref={(el) => (expenseRefs.current[expense.id] = el)}
                className={`${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-gray-50 text-gray-900 border-gray-200"
                } grid grid-cols-[min-content,1fr,120px,min-content] items-center gap-4 p-4 rounded-lg mb-2 shadow-sm border`}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={selectedExpenseIds.includes(expense.id)}
                    onChange={() => toggleSelectExpense(expense.id)}
                    className="h-5 w-5"
                  />
                </div>
                <div>
                  <span className="text-lg">
                    {expense.description || (
                      <em className={isDarkMode ? "text-gray-300" : "text-gray-400"}>
                        No description
                      </em>
                    )}
                  </span>
                </div>
                <div className="text-right font-mono">
                  <div className="font-semibold">{formatCurrency(expense.amount, expense.currency)}</div>
                  <div className="text-sm">
                    {formatCurrency(
                      convertAmountTo(expense.amount, expense.currency, primaryCurrency),
                      primaryCurrency
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingExpenseId(expense.id)}
                    className="group relative"
                  >
                    <Edit2 className="h-5 w-5 text-blue-500" />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs text-blue-500 opacity-0 group-hover:opacity-100 z-50">
                      {t.edit}
                    </span>
                  </button>
                  <button onClick={() => deleteExpense(expense.id)} className="group relative">
                    <Trash2 className="h-5 w-5 text-red-500" />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs text-red-500 opacity-0 group-hover:opacity-100 z-50">
                      {t.delete}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-right">
          <div className={`${isDarkMode ? "text-white" : "text-gray-900"} font-bold text-lg`}>
            {t.categoryTotal}
          </div>
          <div className={`${isDarkMode ? "text-white" : "text-gray-900"} text-xl font-bold`}>
            {formatCurrency(total, primaryCurrency)}
          </div>
        </div>
      </div>
    );
  };

  const handleCategoryIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "custom") {
      setShowCustomIconModal(true);
      setNewCategory({ ...newCategory, icon: "" });
    } else {
      setNewCategory({ ...newCategory, icon: value });
    }
  };

  const handleCustomIconOk = () => {
    if (customIcon.trim()) {
      setNewCategory({ ...newCategory, icon: customIcon });
    }
    setCustomIcon("");
    setShowCustomIconModal(false);
  };

  const handleCustomIconCancel = () => {
    setCustomIcon("");
    setShowCustomIconModal(false);
  };

  const handleEditCategoryIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "custom") {
      setShowEditCategoryCustomIconModal(true);
      setEditingCategoryCustomIcon("");
    } else {
      setEditingCategory({ ...editingCategory, icon: value });
    }
  };

  const handleEditCategoryCustomIconOk = () => {
    if (editingCategoryCustomIcon.trim()) {
      setEditingCategory({ ...editingCategory, icon: editingCategoryCustomIcon });
    }
    setEditingCategoryCustomIcon("");
    setShowEditCategoryCustomIconModal(false);
  };

  const handleEditCategoryCustomIconCancel = () => {
    setEditingCategoryCustomIcon("");
    setShowEditCategoryCustomIconModal(false);
  };

  const saveEditedCategory = () => {
    const { key, name, icon, note } = editingCategory;
    setCategories((prev: any) => ({ ...prev, [key]: { name, icon, note } }));
    setEditingCategory(null);
  };

  const descriptionAmountContainerClass = "flex gap-4 items-end";
  const fixedFieldClass = "flex-1";
  const inputSelectClass = `w-full p-3 rounded-xl border ${
    isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"
  }`;

  const currentYear = currentDate.getFullYear();
  const years: string[] = [];
  for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    years.push(y.toString());
  }

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen p-6 transition-colors duration-500`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="relative w-16 h-8 bg-gray-200 dark:bg-gray-600 rounded-full cursor-pointer"
        >
          <div
            className={`absolute top-1 transition-all duration-300 w-6 h-6 bg-white rounded-full ${
              isDarkMode ? "left-1" : "right-1"
            }`}
          />
          <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
            <Moon className="w-4 h-4 text-gray-700" />
            <Sun className="w-4 h-4 text-yellow-500" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="buttonColorPicker" className="text-sm font-medium">
            Button Color
          </label>
          <input
            id="buttonColorPicker"
            type="color"
            value={buttonColor}
            onChange={(e) => setButtonColor(e.target.value)}
            className="w-8 h-8 rounded border p-0 cursor-pointer"
          />
        </div>

        <div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={inputSelectClass}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="vi">Tiếng Việt</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Add Expense Form */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl shadow-lg p-6 mb-6 transition-colors`}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">{t.sharedExpenseTracker}</h1>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className={descriptionAmountContainerClass}>
              <div className={fixedFieldClass}>
                <label className="block text-sm font-medium mb-2">{t.descriptionInputLabel}</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={inputSelectClass}
                  placeholder={t.exampleItem}
                  required
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity(t.requiredFieldsWarning)}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                />
              </div>
              <div className={fixedFieldClass}>
                <label className="block text-sm font-medium mb-2">{t.amountInputLabel}</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={inputSelectClass}
                  placeholder={amountExampleText}
                  required
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity(t.requiredFieldsWarning)}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">{t.expenseDateLabel}</label>
              <div className="flex gap-4">
                <select
                  value={expenseMonth}
                  onChange={(e) => setExpenseMonth(e.target.value.padStart(2, "0"))}
                  className={inputSelectClass}
                >
                  {t.monthNames.map((month: string, index: number) => (
                    <option key={index} value={(index + 1).toString().padStart(2, "0")}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={expenseYear}
                  onChange={(e) => setExpenseYear(e.target.value)}
                  className={inputSelectClass}
                >
                  {years.map((yr, index) => (
                    <option key={index} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.currencyLabel}</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={inputSelectClass}
                >
                  {Object.entries(currencies).map(([code, { symbol }]: [string, any]) => (
                    <option key={code} value={code}>
                      {code} ({symbol})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.categoryLabel}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputSelectClass}
                >
                  {Object.entries(categories).map(([key, { icon, name }]: [string, any]) => (
                    <option key={key} value={key}>
                      {icon} {getTranslatedCategory(key, name, t)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.primaryCurrencyLabel}</label>
                <select
                  value={primaryCurrency}
                  onChange={(e) => setPrimaryCurrency(e.target.value)}
                  className={inputSelectClass}
                >
                  {Object.entries(currencies).map(([code, { symbol }]: [string, any]) => (
                    <option key={code} value={code}>
                      {code} ({symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              style={{ backgroundColor: buttonColor }}
              className="w-full p-3 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90"
            >
              {t.addExpense}
            </button>
          </form>
        </div>

        {/* Category Management */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl shadow-lg p-6 mb-6 transition-colors`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{t.manageCategories}</h2>
            <div className="flex gap-2">
              <div className="group relative">
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-6 w-6 text-gray-500 dark:text-gray-300" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs text-gray-500 dark:text-gray-200 opacity-0 group-hover:opacity-100 z-50">
                    {t.importFile}
                  </span>
                </label>
              </div>
              
              {/* NEW: Invoice Upload Button */}
              <div className="group relative">
                <input
                  id="invoice-upload"
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleInvoiceUpload}
                  className="hidden"
                />
                <label htmlFor="invoice-upload" className="cursor-pointer">
                  <FileText className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs text-blue-500 dark:text-blue-200 opacity-0 group-hover:opacity-100 z-50 whitespace-nowrap">
                    {t.importInvoice}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newCategory.name.trim()) {
                alert(t.requiredFieldsWarning);
                return;
              }
              const id = newCategory.name.toLowerCase().replace(/\s+/g, "_");
              setCategories({ ...categories, [id]: { name: newCategory.name, icon: newCategory.icon || "🔖", note: newCategory.note } });
              setNewCategory({ name: "", icon: "", note: "" });
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.categoryName}</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className={inputSelectClass}
                  placeholder={t.enterCategoryName}
                  required
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity(t.requiredFieldsWarning)}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.categoryIcon}</label>
                <select
                  value={newCategory.icon}
                  onChange={handleCategoryIconChange}
                  className={inputSelectClass}
                >
                  {["🍽️", "🛒", "🪑", "📦", "🎬", "🚗", "💊", "✈️", "🎓"].map((emoji, idx) => (
                    <option key={idx} value={emoji}>
                      {emoji}
                    </option>
                  ))}
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">{t.categoryNote}</label>
              <textarea
                value={newCategory.note}
                onChange={(e) => setNewCategory({ ...newCategory, note: e.target.value })}
                className={inputSelectClass}
                placeholder={t.categoryNotePlaceholder}
                rows={2}
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: buttonColor }}
              className="w-full p-3 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90"
            >
              {t.addCategory}
            </button>
          </form>

          {/* Custom Icon Modal */}
          {showCustomIconModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } p-6 rounded-xl shadow-lg max-w-sm w-full transition-colors`}
              >
                <h3 className="text-lg font-bold mb-4">{t.enterCustomIcon}</h3>
                <input
                  type="text"
                  value={customIcon}
                  onChange={(e) => setCustomIcon(e.target.value)}
                  className={`${inputSelectClass} mb-4`}
                  placeholder="Type your icon here"
                />
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCustomIconCancel}
                    className="px-4 py-2 text-red-500 border border-red-500 rounded-lg font-medium"
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={handleCustomIconOk}
                    style={{ backgroundColor: buttonColor }}
                    className="px-4 py-2 text-white rounded-lg font-medium hover:opacity-90"
                  >
                    {t.save}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Current Categories List */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">{t.currentCategories}</h3>
            <ul>
              {Object.entries(categories).map(([key, { icon, name, note }]: [string, any]) => (
                <li key={key} className="flex flex-col border p-2 rounded-lg mb-2">
                  <div className="flex justify-between items-center">
                    <span>
                      {icon} {getTranslatedCategory(key, name, t)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingCategory({ key, name, icon, note })}
                        className="group relative"
                      >
                        <Edit2 className="h-5 w-5 text-blue-500" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs text-blue-500 opacity-0 group-hover:opacity-100 z-50">
                          {t.edit}
                        </span>
                      </button>
                      <button onClick={() => deleteCategory(key)} className="group relative">
                        <Trash2 className="h-5 w-5 text-red-500" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs text-red-500 opacity-0 group-hover:opacity-100 z-50">
                          {t.delete}
                        </span>
                      </button>
                    </div>
                  </div>
                  {note && <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{note}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Edit Category Modal */}
        {editingCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } p-6 rounded-xl shadow-lg max-w-sm w-full transition-colors`}
            >
              <h3 className="text-lg font-bold mb-4">
                {t.edit} {t.categoryName}
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.categoryName}</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className={inputSelectClass}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.categoryIcon}</label>
                <select
                  value={editingCategory.icon}
                  onChange={handleEditCategoryIconChange}
                  className={inputSelectClass}
                >
                  {["🍽️", "🛒", "🪑", "📦", "🎬", "🚗", "💊", "✈️", "🎓"].map((emoji, idx) => (
                    <option key={idx} value={emoji}>
                      {emoji}
                    </option>
                  ))}
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.categoryNote}</label>
                <textarea
                  value={editingCategory.note}
                  onChange={(e) => setEditingCategory({ ...editingCategory, note: e.target.value })}
                  className={inputSelectClass}
                  placeholder={t.categoryNotePlaceholder}
                  rows={2}
                />
              </div>
              {showEditCategoryCustomIconModal && (
                <div className="mb-4">
                  <input
                    type="text"
                    value={editingCategoryCustomIcon}
                    onChange={(e) => setEditingCategoryCustomIcon(e.target.value)}
                    className={inputSelectClass}
                    placeholder="Type your icon here"
                  />
                  <div className="flex justify-end space-x-3 mt-2">
                    <button
                      onClick={handleEditCategoryCustomIconCancel}
                      className="px-4 py-2 text-red-500 border border-red-500 rounded-lg font-medium"
                    >
                      {t.cancel}
                    </button>
                    <button
                      onClick={handleEditCategoryCustomIconOk}
                      style={{ backgroundColor: buttonColor }}
                      className="px-4 py-2 text-white rounded-lg font-medium hover:opacity-90"
                    >
                      {t.save}
                    </button>
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 border rounded text-red-500 hover:bg-red-50"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={saveEditedCategory}
                  style={{ backgroundColor: buttonColor }}
                  className="px-4 py-2 text-white rounded hover:opacity-90"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Batch Edit Section */}
        {selectedExpenseIds.length > 0 && (
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl shadow-lg p-6 mb-6 transition-colors`}
          >
            <h2 className="text-xl font-bold mb-4">
              {t.batchEditSelected} ({selectedExpenseIds.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Update Description</label>
                <input
                  type="text"
                  value={batchEditDescription}
                  onChange={(e) => setBatchEditDescription(e.target.value)}
                  className={inputSelectClass}
                  placeholder="Enter new description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Update Category</label>
                <select
                  value={batchEditCategory}
                  onChange={(e) => setBatchEditCategory(e.target.value)}
                  className={inputSelectClass}
                >
                  <option value="">-- Select new category --</option>
                  {Object.entries(categories).map(([key, { icon, name }]: [string, any]) => (
                    <option key={key} value={key}>
                      {icon} {getTranslatedCategory(key, name, t)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={applyAllBatchEdits}
              style={{ backgroundColor: buttonColor }}
              className="w-full p-3 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90"
              disabled={!batchEditDescription && !batchEditCategory}
            >
              {t.applyChanges}
            </button>
          </div>
        )}

        {/* Download CSV Button */}
        {expenses.length > 0 && (
          <div className="mb-6">
            <button
              onClick={downloadCSV}
              style={{ backgroundColor: buttonColor }}
              className="w-full p-3 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90"
            >
              {t.downloadCSV}
            </button>
          </div>
        )}

        {/* Expense List */}
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl shadow-lg p-6 transition-colors`}
        >
          {Object.keys(categories).map((categoryKey) => (
            <CategorySection key={categoryKey} categoryKey={categoryKey} />
          ))}

          {expenses.length > 0 && (
            <div className="mt-8 pt-8 border-t-2">
              <div className="text-right">
                <h2 className="text-3xl font-bold mb-2">{t.totalExpenses}</h2>
                <div className="text-2xl font-bold">
                  {formatCurrency(calculateGrandTotal(), primaryCurrency)}
                </div>
              </div>
            </div>
          )}

          {expenses.length === 0 && (
            <div className="text-center py-8 text-gray-500">{t.noExpensesYet}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;