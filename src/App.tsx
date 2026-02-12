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
    invoiceParseSuccess: "Invoice imported successfully!",
    invoiceParseError: "Failed to parse invoice. Please check the file format.",
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
    invoiceParseSuccess: "Facture importée avec succès !",
    invoiceParseError: "Échec de l'analyse de la facture. Veuillez vérifier le format du fichier.",
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
    invoiceParseSuccess: "Rechnung erfolgreich importiert!",
    invoiceParseError: "Fehler beim Parsen der Rechnung. Bitte überprüfen Sie das Dateiformat.",
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
    importInvoice: "Nhập Hóa Đơn (PDF)",
    exampleItem: "vd: Cà phê",
    amountExample: "vd: 10000",
    requiredFieldsWarning: "Vui lòng điền vào mục này.",
    categoryTotal: "Tổng danh mục:",
    invoiceParseSuccess: "Nhập hóa đơn thành công!",
    invoiceParseError: "Không thể phân tích hóa đơn. Vui lòng kiểm tra định dạng tệp.",
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
    invoiceParseSuccess: "发票导入成功！",
    invoiceParseError: "无法解析发票。请检查文件格式。",
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
    invoiceParseSuccess: "請求書のインポートに成功しました！",
    invoiceParseError: "請求書の解析に失敗しました。ファイル形式を確認してください。",
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

const ExpenseTracker = () => {
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

  // NEW: Store scroll positions for expense rows
  const editingScrollPositionRef = useRef<number | null>(null);
  const expenseRowRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const t = translations[language as keyof typeof translations];

  // Update default categories names based on language selection
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

  // FIXED: updateExpense with scroll position preservation
  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp));
    setEditingExpenseId(null);
    
    // Restore scroll position after state update
    requestAnimationFrame(() => {
      if (editingScrollPositionRef.current !== null) {
        window.scrollTo(0, editingScrollPositionRef.current);
        editingScrollPositionRef.current = null;
      }
    });
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
        if (row.every(cell => cell.trim() === "")) continue;

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

  // NEW: Parse PDF Invoice (Mastercard format)
  const parsePDFInvoice = async (file: File) => {
    try {
      const text = await file.text();
      
      // Parse invoice date
      let invoiceMonth = expenseMonth;
      let invoiceYear = expenseYear;
      const dateMatch = text.match(/(\w+)\s+(\d{1,2}),?\s+(\d{4})/i);
      if (dateMatch) {
        const monthName = dateMatch[1];
        const monthIndex = t.monthNames.findIndex(m => m.toLowerCase().startsWith(monthName.toLowerCase()));
        if (monthIndex >= 0) {
          invoiceMonth = (monthIndex + 1).toString().padStart(2, "0");
        }
        invoiceYear = dateMatch[3];
      }

      const invoiceDate = `${invoiceYear}-${invoiceMonth}`;

      // Parse transactions
      const transactions: Expense[] = [];
      const lines = text.split("\n");
      
      let uniqueIdCounter = Date.now();

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Pattern: Date Merchant Name Amount EUR
        // Example: "03 Feb Amazon.de 45.99 EUR"
        const transactionMatch = line.match(/(\d{1,2})\s+(\w{3})\s+(.+?)\s+([\d,]+\.?\d*)\s*(EUR|USD|VND)/i);
        
        if (transactionMatch) {
          const day = transactionMatch[1];
          const monthAbbr = transactionMatch[2];
          const merchant = transactionMatch[3].trim();
          const amountStr = transactionMatch[4].replace(/,/g, "");
          const curr = transactionMatch[5].toUpperCase();
          
          const amount = parseFloat(amountStr);
          
          // Auto-categorize based on merchant name
          let cat = "other";
          const merchantLower = merchant.toLowerCase();
          
          if (merchantLower.includes("restaurant") || merchantLower.includes("cafe") || 
              merchantLower.includes("pizza") || merchantLower.includes("burger") ||
              merchantLower.includes("bistro") || merchantLower.includes("diner")) {
            cat = "eating";
          } else if (merchantLower.includes("supermarket") || merchantLower.includes("grocery") ||
                     merchantLower.includes("edeka") || merchantLower.includes("rewe") ||
                     merchantLower.includes("aldi") || merchantLower.includes("lidl")) {
            cat = "groceries";
          } else if (merchantLower.includes("ikea") || merchantLower.includes("furniture") ||
                     merchantLower.includes("möbel") || merchantLower.includes("home")) {
            cat = "furniture";
          }
          
          transactions.push({
            id: uniqueIdCounter++,
            description: merchant,
            amount: amount,
            currency: curr as string,
            category: cat,
            date: invoiceDate
          });
        }
      }

      if (transactions.length > 0) {
        setExpenses([...expenses, ...transactions]);
        alert(t.invoiceParseSuccess);
      } else {
        alert(t.invoiceParseError);
      }
    } catch (error) {
      console.error("Error parsing PDF:", error);
      alert(t.invoiceParseError);
    }
  };

  const handleInvoiceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      await parsePDFInvoice(file);
    } else {
      alert(t.invoiceParseError);
    }
  };

  // FIXED: InlineEditExpense with scroll position capture
  const InlineEditExpense = ({ expense, onSave, onCancel }: { expense: Expense; onSave: (exp: Expense) => void; onCancel: () => void }) => {
    const [editData, setEditData] = useState({
      description: expense.description,
      amount: expense.amount.toString(),
      currency: expense.currency,
      category: expense.category,
      date: expense.date || ""
    });

    // Capture scroll position before entering edit mode
    useEffect(() => {
      editingScrollPositionRef.current = window.scrollY;
    }, []);

    return (
      <div
        className={
          isDarkMode
            ? "bg-gray-700 text-white border border-gray-600"
            : "bg-gray-100 text-gray-900 border border-gray-200"
        }
        style={{ padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.5rem" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.75rem" }}>
          <input
            type="text"
            value={editData.description}
            onChange={e => setEditData({ ...editData, description: e.target.value })}
            className="w-full p-2 rounded border bg-white dark:bg-gray-600 dark:text-white"
            placeholder="Description"
          />
          <input
            type="text"
            value={editData.amount}
            onChange={e => setEditData({ ...editData, amount: e.target.value })}
            className="w-full p-2 rounded border bg-white dark:bg-gray-600 dark:text-white"
            placeholder="Amount"
          />
          <select
            value={editData.currency}
            onChange={e => setEditData({ ...editData, currency: e.target.value })}
            className="w-full p-2 rounded border bg-white dark:bg-gray-600 dark:text-white"
          >
            {Object.entries(currencies).map(([code, { symbol }]) => (
              <option key={code} value={code}>
                {code} {symbol}
              </option>
            ))}
          </select>
          <select
            value={editData.category}
            onChange={e => setEditData({ ...editData, category: e.target.value })}
            className="w-full p-2 rounded border bg-white dark:bg-gray-600 dark:text-white"
          >
            {Object.entries(categories).map(([key, { icon, name }]) => (
              <option key={key} value={key}>
                {icon} {getTranslatedCategory(key, name, t)}
              </option>
            ))}
          </select>
          <input
            type="month"
            value={editData.date}
            onChange={e => setEditData({ ...editData, date: e.target.value })}
            className="w-full p-2 rounded border bg-white dark:bg-gray-600 dark:text-white"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
          <button
            onClick={onCancel}
            className="px-3 py-1 border rounded text-red-500 hover:bg-red-50"
          >
            {t.cancel}
          </button>
          <button
            onClick={() =>
              onSave({
                ...expense,
                ...editData,
                amount: parseFloat(editData.amount)
              })
            }
            style={{ backgroundColor: buttonColor }}
            className="px-3 py-1 text-white rounded hover:opacity-90"
          >
            {t.save}
          </button>
        </div>
      </div>
    );
  };

  const CategorySection = ({ categoryKey }: { categoryKey: string }) => {
    const categoryExpenses = expenses.filter(exp => exp.category === categoryKey);
    if (categoryExpenses.length === 0) return null;

    const allSelected = categoryExpenses.every(exp => selectedExpenseIds.includes(exp.id));
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
              {categories[categoryKey].icon} {getTranslatedCategory(categoryKey, categories[categoryKey].name, t)}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setEditingCategory({
                  key: categoryKey,
                  name: categories[categoryKey].name,
                  icon: categories[categoryKey].icon,
                  note: categories[categoryKey].note
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
          {categoryExpenses.map(expense => {
            if (editingExpenseId === expense.id) {
              return (
                <InlineEditExpense
                  key={expense.id}
                  expense={expense}
                  onSave={updateExpense}
                  onCancel={() => setEditingExpenseId(null)}
                />
              );
            }

            return (
              <div
                key={expense.id}
                ref={el => (expenseRowRefs.current[expense.id] = el)}
                className={
                  isDarkMode
                    ? "bg-gray-800 text-white border border-gray-600"
                    : "bg-gray-50 text-gray-900 border border-gray-200"
                }
                style={{
                  display: "grid",
                  gridTemplateColumns: "min-content 1fr 120px min-content",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  marginBottom: "0.5rem",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}
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
                  <span className="text-lg">{expense.description}</span>
                  {!expense.description && (
                    <em className={isDarkMode ? "text-gray-300" : "text-gray-400"}>No description</em>
                  )}
                </div>
                <div className="text-right font-mono">
                  <div className="font-semibold">{formatCurrency(expense.amount, expense.currency)}</div>
                  <div className="text-sm">
                    {formatCurrency(convertAmountTo(expense.amount, expense.currency, primaryCurrency), primaryCurrency)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      editingScrollPositionRef.current = window.scrollY;
                      setEditingExpenseId(expense.id);
                    }}
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
          <div className={isDarkMode ? "text-white" : "text-gray-900"} style={{ fontWeight: "bold", fontSize: "1.125rem" }}>
            {t.categoryTotal}
          </div>
          <div className={isDarkMode ? "text-white" : "text-gray-900"} style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
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
    setCategories(prev => ({ ...prev, [key]: { name, icon, note } }));
    setEditingCategory(null);
  };

  const descriptionAmountContainerClass = "flex gap-4 items-end";
  const fixedFieldClass = "flex-1";
  const inputSelectClass =
    "w-full p-3 rounded-xl border " +
    (isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900");

  const currentYear = currentDate.getFullYear();
  const years: string[] = [];
  for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    years.push(y.toString());
  }

  return (
    <div
      className={
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }
      style={{ minHeight: "100vh", padding: "1.5rem", transition: "colors 500ms" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="relative w-16 h-8 bg-gray-200 dark:bg-gray-600 rounded-full cursor-pointer"
        >
          <div
            className="absolute top-1 transition-all duration-300 w-6 h-6 bg-white rounded-full"
            style={{ left: isDarkMode ? "calc(100% - 1.75rem)" : "0.25rem" }}
          />
          <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
            <Moon className="w-4 h-4 text-gray-700" />
            <Sun className="w-4 h-4 text-yellow-500" />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label htmlFor="buttonColorPicker" className="text-sm font-medium">
            Button Color
          </label>
          <input
            id="buttonColorPicker"
            type="color"
            value={buttonColor}
            onChange={e => setButtonColor(e.target.value)}
            className="w-8 h-8 rounded border p-0 cursor-pointer"
          />
        </div>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className={inputSelectClass}
          style={{ width: "auto" }}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="vi">Tiếng Việt</option>
          <option value="zh">中文</option>
          <option value="ja">日本語</option>
        </select>
      </div>

      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
        <div
          className={isDarkMode ? "bg-gray-800" : "bg-white"}
          style={{ borderRadius: "1rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", padding: "1.5rem", marginBottom: "1.5rem", transition: "colors" }}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">{t.sharedExpenseTracker}</h1>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className={descriptionAmountContainerClass}>
              <div className={fixedFieldClass}>
                <label className="block text-sm font-medium mb-2">{t.descriptionInputLabel}</label>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className={inputSelectClass}
                  placeholder={t.exampleItem}
                  required
                  onInvalid={e => (e.target as HTMLInputElement).setCustomValidity(t.requiredFieldsWarning)}
                  onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
                />
              </div>
              <div className={fixedFieldClass}>
                <label className="block text-sm font-medium mb-2">{t.amountInputLabel}</label>
                <input
                  type="text"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className={inputSelectClass}
                  placeholder={amountExampleText}
                  required
                  onInvalid={e => (e.target as HTMLInputElement).setCustomValidity(t.requiredFieldsWarning)}
                  onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">{t.expenseDateLabel}</label>
              <div className="flex gap-4">
                <select
                  value={expenseMonth}
                  onChange={e => setExpenseMonth(e.target.value.padStart(2, "0"))}
                  className={inputSelectClass}
                >
                  {t.monthNames.map((month, index) => (
                    <option key={index} value={(index + 1).toString().padStart(2, "0")}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={expenseYear}
                  onChange={e => setExpenseYear(e.target.value)}
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              <div>
                <label className="block text-sm font-medium mb-2">{t.currencyLabel}</label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  className={inputSelectClass}
                >
                  {Object.entries(currencies).map(([code, { symbol }]) => (
                    <option key={code} value={code}>
                      {code} {symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.categoryLabel}</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className={inputSelectClass}
                >
                  {Object.entries(categories).map(([key, { icon, name }]) => (
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
                  onChange={e => setPrimaryCurrency(e.target.value)}
                  className={inputSelectClass}
                >
                  {Object.entries(currencies).map(([code, { symbol }]) => (
                    <option key={code} value={code}>
                      {code} {symbol}
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

        <div
          className={isDarkMode ? "bg-gray-800" : "bg-white"}
          style={{ borderRadius: "1rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", padding: "1.5rem", marginBottom: "1.5rem", transition: "colors" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 className="text-xl font-bold">{t.manageCategories}</h2>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {/* CSV Upload */}
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

              {/* NEW: Invoice Upload */}
              <div className="group relative">
                <input
                  id="invoice-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleInvoiceUpload}
                  className="hidden"
                />
                <label htmlFor="invoice-upload" className="cursor-pointer">
                  <FileText className="h-6 w-6 text-green-500 dark:text-green-400" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs text-green-500 dark:text-green-400 opacity-0 group-hover:opacity-100 z-50 whitespace-nowrap">
                    {t.importInvoice}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              if (!newCategory.name.trim()) {
                alert(t.requiredFieldsWarning);
                return;
              }
              const id = newCategory.name.toLowerCase().replace(/\s+/g, "_");
              setCategories({ ...categories, [id]: { name: newCategory.name, icon: newCategory.icon || "📦", note: newCategory.note } });
              setNewCategory({ name: "", icon: "", note: "" });
            }}
            className="space-y-4"
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="block text-sm font-medium mb-2">{t.categoryName}</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                  className={inputSelectClass}
                  placeholder={t.enterCategoryName}
                  required
                  onInvalid={e => (e.target as HTMLInputElement).setCustomValidity(t.requiredFieldsWarning)}
                  onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.categoryIcon}</label>
                <select
                  value={newCategory.icon}
                  onChange={handleCategoryIconChange}
                  className={inputSelectClass}
                >
                  {["🍽️", "🛒", "🪑", "📦", "🚗", "🏠", "💻", "🎮", "📚"].map((emoji, idx) => (
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
                onChange={e => setNewCategory({ ...newCategory, note: e.target.value })}
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

          {showCustomIconModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div
                className={isDarkMode ? "bg-gray-800" : "bg-white"}
                style={{ padding: "1.5rem", borderRadius: "0.75rem", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", maxWidth: "24rem", width: "100%", transition: "colors" }}
              >
                <h3 className="text-lg font-bold mb-4">{t.enterCustomIcon}</h3>
                <input
                  type="text"
                  value={customIcon}
                  onChange={e => setCustomIcon(e.target.value)}
                  className={inputSelectClass + " mb-4"}
                  placeholder="Type your icon here"
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
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

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">{t.currentCategories}</h3>
            <ul>
              {Object.entries(categories).map(([key, { icon, name, note }]) => (
                <li key={key} style={{ display: "flex", flexDirection: "column", border: "1px solid", padding: "0.5rem", borderRadius: "0.5rem", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>
                      {icon} {getTranslatedCategory(key, name, t)}
                    </span>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
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

        {editingCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div
              className={isDarkMode ? "bg-gray-800" : "bg-white"}
              style={{ padding: "1.5rem", borderRadius: "0.75rem", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", maxWidth: "24rem", width: "100%", transition: "colors" }}
            >
              <h3 className="text-lg font-bold mb-4">
                {t.edit} {t.categoryName}
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.categoryName}</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
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
                  {["🍽️", "🛒", "🪑", "📦", "🚗", "🏠", "💻", "🎮", "📚"].map((emoji, idx) => (
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
                  onChange={e => setEditingCategory({ ...editingCategory, note: e.target.value })}
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
                    onChange={e => setEditingCategoryCustomIcon(e.target.value)}
                    className={inputSelectClass}
                    placeholder="Type your icon here"
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
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
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
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

        {selectedExpenseIds.length > 0 && (
          <div
            className={isDarkMode ? "bg-gray-800" : "bg-white"}
            style={{ borderRadius: "1rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", padding: "1.5rem", marginBottom: "1.5rem", transition: "colors" }}
          >
            <h2 className="text-xl font-bold mb-4">
              {t.batchEditSelected} ({selectedExpenseIds.length})
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label className="block text-sm font-medium mb-2">Update Description</label>
                <input
                  type="text"
                  value={batchEditDescription}
                  onChange={e => setBatchEditDescription(e.target.value)}
                  className={inputSelectClass}
                  placeholder="Enter new description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Update Category</label>
                <select
                  value={batchEditCategory}
                  onChange={e => setBatchEditCategory(e.target.value)}
                  className={inputSelectClass}
                >
                  <option value="">-- Select new category --</option>
                  {Object.entries(categories).map(([key, { icon, name }]) => (
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

        <div
          className={isDarkMode ? "bg-gray-800" : "bg-white"}
          style={{ borderRadius: "1rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", padding: "1.5rem", transition: "colors" }}
        >
          {Object.keys(categories).map(categoryKey => (
            <CategorySection key={categoryKey} categoryKey={categoryKey} />
          ))}

          {expenses.length > 0 && (
            <div className="mt-8 pt-8 border-t-2">
              <div className="text-right">
                <h2 className="text-3xl font-bold mb-2">{t.totalExpenses}</h2>
                <div className="text-2xl font-bold">{formatCurrency(calculateGrandTotal(), primaryCurrency)}</div>
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