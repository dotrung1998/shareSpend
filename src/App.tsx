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
    uploadInvoice: "Upload Invoice (PDF)",
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
    uploadInvoice: "Rechnung hochladen (PDF)",
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
    uploadInvoice: "Tải lên hóa đơn (PDF)",
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
    uploadInvoice: "Télécharger facture (PDF)",
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
    uploadInvoice: "上传发票 (PDF)",
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
    uploadInvoice: "請求書をアップロード (PDF)",
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

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const currentDate = new Date();
  const [expenseYear, setExpenseYear] = useState(currentDate.getFullYear().toString());
  const [expenseMonth, setExpenseMonth] = useState((currentDate.getMonth() + 1).toString().padStart(2, "0"));
  const [currency, setCurrency] = useState("EUR");
  const [category, setCategory] = useState("eating");
  const [categories, setCategories] = useState<any>({
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

  // Ref to store scroll position when editing
  const scrollPositionRef = useRef<number>(0);

  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    setCategories((prev: any) => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        updated[key].name = (t.categories as any)[key] || updated[key].name;
      });
      return updated;
    });
  }, [t]);

  const amountExampleText = currency === "VND" ? (language === "vi" ? "vd: 10000" : "10000") : t.amountExample;

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
    setExpenses(prev => prev.filter(exp => exp.category !== categoryKey));
  };

  const deleteCategory = (categoryKey: string) => {
    setCategories((prev: any) => {
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

  // Modified updateExpense to preserve scroll position
  const updateExpense = (updatedExpense: any) => {
    // Save current scroll position before update
    scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
    
    setExpenses(expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp));
    setEditingExpenseId(null);
    
    // Restore scroll position after update
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
      const newExpenses: any[] = [];
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

  // NEW: PDF Invoice parsing functionality
  const categorizeExpense = (description: string): string => {
    const desc = description.toLowerCase();
    
    // Groceries/Supermarkets
    if (desc.includes('rewe') || desc.includes('kaufland') || desc.includes('edeka') || 
        desc.includes('aldi') || desc.includes('lidl') || desc.includes('penny')) {
      return 'groceries';
    }
    
    // Drugstores (can be groceries or other)
    if (desc.includes('dm-drogerie') || desc.includes('rossmann') || desc.includes('müller')) {
      return 'groceries';
    }
    
    // Restaurants/Fast Food/Cafes
    if (desc.includes('restaurant') || desc.includes('grill') || desc.includes('kfc') || 
        desc.includes('mcdon') || desc.includes('burger') || desc.includes('pizza') || 
        desc.includes('asia') || desc.includes('sushi') || desc.includes('backwerk') ||
        desc.includes('cafe') || desc.includes('chiking') || desc.includes('gourmet') ||
        desc.includes('sumup')) {
      return 'eating';
    }
    
    // Clothing/Fashion stores
    if (desc.includes('tjx') || desc.includes('tkmaxx') || desc.includes('h&m') || 
        desc.includes('zara') || desc.includes('fashion')) {
      return 'other';
    }
    
    // Pet supplies
    if (desc.includes('fressnapf') || desc.includes('zoo')) {
      return 'other';
    }
    
    // Depot (home decoration)
    if (desc.includes('depot')) {
      return 'furniture';
    }
    
    return 'other';
  };

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Import pdf.js
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const reader = new FileReader();
      reader.onload = async (event) => {
        const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }

        // Parse the invoice text
        const lines = fullText.split('\n').map(line => line.trim()).filter(line => line);
        const newExpenses: any[] = [];
        let invoiceDate = '';
        let invoiceCurrency = 'EUR';
        
        // Extract date from invoice (looking for pattern like "04.01.2026 bis 03.02.2026")
        for (const line of lines) {
          const dateMatch = line.match(/(\d{2})\.(\d{2})\.(\d{4})\s+bis\s+(\d{2})\.(\d{2})\.(\d{4})/);
          if (dateMatch) {
            // Use the end date
            const year = dateMatch[6];
            const month = dateMatch[5];
            invoiceDate = `${year}-${month}`;
            break;
          }
        }

        // Parse expense lines (pattern: date, description, location, amount)
        let uniqueId = Date.now();
        let isInTransactionSection = false;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          // Check if we're in the transaction section
          if (line.includes('Datum') && line.includes('Beschreibung') && line.includes('Betrag')) {
            isInTransactionSection = true;
            continue;
          }
          
          // Skip header rows and special rows
          if (line.includes('ALTER SALDO') || line.includes('NEUER SALDO') || 
              line.includes('EINZAHLUNG') || line.includes('SOLLZINSEN') || 
              line.includes('Mindestbetrag')) {
            continue;
          }
          
          // Match transaction line pattern: DD.MM.YYYY followed by description and amount
          const transactionMatch = line.match(/^(\d{2}\.\d{2}\.\d{4})\s+(.+?)\s+([A-Za-z\s]+?)\s+(\d+[,.]?\d*)\s*$/);
          if (transactionMatch && isInTransactionSection) {
            const [, date, desc, location, amountStr] = transactionMatch;
            const amount = parseFloat(amountStr.replace(',', '.'));
            
            if (!isNaN(amount) && amount > 0) {
              const description = `${desc.trim()} - ${location.trim()}`;
              const autoCategory = categorizeExpense(description);
              
              newExpenses.push({
                id: uniqueId++,
                description: description,
                amount: amount,
                currency: invoiceCurrency,
                category: autoCategory,
                date: invoiceDate || `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`
              });
            }
          }
        }

        if (newExpenses.length > 0) {
          setExpenses([...expenses, ...newExpenses]);
          alert(`${newExpenses.length} expenses imported from PDF invoice!`);
        } else {
          alert('No expenses found in the PDF. Please check the file format.');
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error parsing PDF:', error);
      alert('Error reading PDF file. Please try again or use CSV import instead.');
    }

    // Reset file input
    e.target.value = '';
  };

  const InlineEditExpense = ({ expense, onSave, onCancel }: any) => {
    const [editData, setEditData] = useState({
      description: expense.description,
      amount: expense.amount.toString(),
      currency: expense.currency,
      category: expense.category,
      date: expense.date || ""
    });

    const handleSave = () => {
      const cleanAmountStr = editData.amount.replace(",", ".");
      onSave({
        ...expense,
        description: editData.description,
        amount: parseFloat(cleanAmountStr),
        currency: editData.currency,
        category: editData.category,
        date: editData.date
      });
    };

    return (
      <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className={`w-full px-2 py-1 border rounded ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
            placeholder="Description"
          />
          <input
            type="text"
            value={editData.amount}
            onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
            className={`w-full px-2 py-1 border rounded ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
            placeholder="Amount"
          />
          <select
            value={editData.currency}
            onChange={(e) => setEditData({ ...editData, currency: e.target.value })}
            className={`w-full px-2 py-1 border rounded ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
          >
            {Object.keys(currencies).map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
          <select
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            className={`w-full px-2 py-1 border rounded ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
          >
            {Object.entries(categories).map(([key, cat]: any) => (
              <option key={key} value={key}>
                {cat.icon} {getTranslatedCategory(key, cat.name, t)}
              </option>
            ))}
          </select>
          <input
            type="month"
            value={editData.date}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            className={`w-full px-2 py-1 border rounded ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            style={{ backgroundColor: buttonColor }}
            className="px-3 py-1 rounded hover:opacity-80 text-sm"
          >
            {t.save}
          </button>
          <button
            onClick={onCancel}
            className={`px-3 py-1 rounded text-sm ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            {t.cancel}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t.sharedExpenseTracker}</h1>
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`px-3 py-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="vi">Tiếng Việt</option>
              <option value="fr">Français</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-200'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Add Expense Form */}
        <div className={`p-6 rounded-lg shadow-md mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">{t.addExpense}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">{t.descriptionInputLabel}</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t.exampleItem}
                  className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">{t.amountInputLabel}</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={amountExampleText}
                  className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">{t.expenseDateLabel}</label>
                <input
                  type="month"
                  value={`${expenseYear}-${expenseMonth}`}
                  onChange={(e) => {
                    const [year, month] = e.target.value.split("-");
                    setExpenseYear(year);
                    setExpenseMonth(month);
                  }}
                  className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">{t.currencyLabel}</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                >
                  {Object.keys(currencies).map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">{t.categoryLabel}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                >
                  {Object.entries(categories).map(([key, cat]: any) => (
                    <option key={key} value={key}>
                      {cat.icon} {getTranslatedCategory(key, cat.name, t)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              style={{ backgroundColor: buttonColor }}
              className="w-full py-2 rounded hover:opacity-80 font-medium"
            >
              {t.addExpense}
            </button>
          </form>
        </div>

        {/* Import/Export Section */}
        <div className={`p-6 rounded-lg shadow-md mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">{t.primaryCurrencyLabel}</label>
              <select
                value={primaryCurrency}
                onChange={(e) => setPrimaryCurrency(e.target.value)}
                className={`px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                {Object.keys(currencies).map(curr => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 items-end">
              <button
                onClick={downloadCSV}
                style={{ backgroundColor: buttonColor }}
                className="px-4 py-2 rounded hover:opacity-80 flex items-center gap-2"
              >
                <Upload size={18} />
                {t.downloadCSV}
              </button>
              <label className={`px-4 py-2 rounded cursor-pointer flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                <Upload size={18} />
                {t.importFile}
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                />
              </label>
              <label className={`px-4 py-2 rounded cursor-pointer flex items-center gap-2 ${isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                <FileText size={18} />
                {t.uploadInvoice}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePDFUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Category Management */}
        <details className={`p-6 rounded-lg shadow-md mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <summary className="text-xl font-semibold cursor-pointer">{t.manageCategories}</summary>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium mb-2">{t.currentCategories}</h3>
              <div className="space-y-2">
                {Object.entries(categories).map(([key, cat]: any) => (
                  <div key={key} className={`flex items-center justify-between p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <span>{cat.icon} {getTranslatedCategory(key, cat.name, t)}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingCategory({ key, ...cat })}
                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete category "${getTranslatedCategory(key, cat.name, t)}" and all its expenses?`)) {
                            deleteExpensesByCategory(key);
                            deleteCategory(key);
                          }
                        }}
                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">{t.addCategory}</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder={t.enterCategoryName}
                  className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
                <button
                  onClick={() => setShowCustomIconModal(true)}
                  className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                >
                  {newCategory.icon || t.categoryIcon}
                </button>
                <textarea
                  value={newCategory.note}
                  onChange={(e) => setNewCategory({ ...newCategory, note: e.target.value })}
                  placeholder={t.categoryNotePlaceholder}
                  className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  rows={2}
                />
                <button
                  onClick={() => {
                    if (newCategory.name && newCategory.icon) {
                      const key = newCategory.name.toLowerCase().replace(/\s+/g, "_");
                      setCategories({ ...categories, [key]: newCategory });
                      setNewCategory({ name: "", icon: "", note: "" });
                    }
                  }}
                  style={{ backgroundColor: buttonColor }}
                  className="w-full py-2 rounded hover:opacity-80"
                >
                  {t.addCategory}
                </button>
              </div>
            </div>
          </div>
        </details>

        {/* Batch Edit Section */}
        {selectedExpenseIds.length > 0 && (
          <div className={`p-6 rounded-lg shadow-md mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-semibold mb-3">{t.batchEditSelected} ({selectedExpenseIds.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={batchEditDescription}
                onChange={(e) => setBatchEditDescription(e.target.value)}
                placeholder="New description"
                className={`px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
              <select
                value={batchEditCategory}
                onChange={(e) => setBatchEditCategory(e.target.value)}
                className={`px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                <option value="">Select new category</option>
                {Object.entries(categories).map(([key, cat]: any) => (
                  <option key={key} value={key}>
                    {cat.icon} {getTranslatedCategory(key, cat.name, t)}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={applyAllBatchEdits}
              style={{ backgroundColor: buttonColor }}
              className="w-full mt-4 py-2 rounded hover:opacity-80"
            >
              {t.applyChanges}
            </button>
          </div>
        )}

        {/* Expenses List */}
        {expenses.length === 0 ? (
          <div className={`p-6 rounded-lg shadow-md text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p>{t.noExpensesYet}</p>
          </div>
        ) : (
          <>
            {Object.entries(categories).map(([categoryKey, cat]: any) => {
              const categoryExpenses = expenses.filter(exp => exp.category === categoryKey);
              if (categoryExpenses.length === 0) return null;

              const categoryTotal = categoryExpenses.reduce(
                (sum, exp) => sum + convertAmountTo(exp.amount, exp.currency, primaryCurrency),
                0
              );

              return (
                <div key={categoryKey} className={`p-6 rounded-lg shadow-md mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                      {cat.icon} {getTranslatedCategory(categoryKey, cat.name, t)}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleSelectAllInCategory(categoryKey)}
                        className={`px-3 py-1 rounded text-sm ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        Select All
                      </button>
                      <span className="font-medium">
                        {t.categoryTotal} {formatCurrency(categoryTotal, primaryCurrency)}
                      </span>
                    </div>
                  </div>
                  
                  {cat.note && (
                    <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {cat.note}
                    </p>
                  )}

                  <div className="space-y-2">
                    {categoryExpenses.map((exp: any) => (
                      <div key={exp.id}>
                        {editingExpenseId === exp.id ? (
                          <InlineEditExpense
                            expense={exp}
                            onSave={updateExpense}
                            onCancel={() => setEditingExpenseId(null)}
                          />
                        ) : (
                          <div className={`flex items-center justify-between p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex items-center gap-3 flex-1">
                              <input
                                type="checkbox"
                                checked={selectedExpenseIds.includes(exp.id)}
                                onChange={() => toggleSelectExpense(exp.id)}
                                className="w-4 h-4"
                              />
                              <div className="flex-1">
                                <div className="font-medium">{exp.description}</div>
                                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {exp.date && convertDateToFileString(exp.date)} • {formatCurrency(exp.amount, exp.currency)}
                                  {exp.currency !== primaryCurrency && (
                                    <span className="ml-2">
                                      (≈ {formatCurrency(convertAmountTo(exp.amount, exp.currency, primaryCurrency), primaryCurrency)})
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
                                  setEditingExpenseId(exp.id);
                                }}
                                className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => deleteExpense(exp.id)}
                                className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Grand Total */}
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center text-xl font-bold">
                <span>{t.totalExpenses}</span>
                <span>{formatCurrency(calculateGrandTotal(), primaryCurrency)}</span>
              </div>
            </div>
          </>
        )}

        {/* Custom Icon Modal */}
        {showCustomIconModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`p-6 rounded-lg max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold mb-4">{t.enterCustomIcon}</h3>
              <input
                type="text"
                value={customIcon}
                onChange={(e) => setCustomIcon(e.target.value)}
                placeholder="Enter emoji or icon"
                className={`w-full px-3 py-2 border rounded mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setNewCategory({ ...newCategory, icon: customIcon });
                    setCustomIcon("");
                    setShowCustomIconModal(false);
                  }}
                  style={{ backgroundColor: buttonColor }}
                  className="flex-1 py-2 rounded hover:opacity-80"
                >
                  {t.save}
                </button>
                <button
                  onClick={() => {
                    setCustomIcon("");
                    setShowCustomIconModal(false);
                  }}
                  className={`flex-1 py-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Category Modal */}
        {editingCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`p-6 rounded-lg max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold mb-4">{t.edit} {t.categoryName}</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
                <button
                  onClick={() => setShowEditCategoryCustomIconModal(true)}
                  className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                >
                  {editingCategory.icon}
                </button>
                <textarea
                  value={editingCategory.note}
                  onChange={(e) => setEditingCategory({ ...editingCategory, note: e.target.value })}
                  className={`w-full px-3 py-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  rows={2}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    const { key, ...catData } = editingCategory;
                    setCategories({ ...categories, [key]: catData });
                    setEditingCategory(null);
                  }}
                  style={{ backgroundColor: buttonColor }}
                  className="flex-1 py-2 rounded hover:opacity-80"
                >
                  {t.save}
                </button>
                <button
                  onClick={() => setEditingCategory(null)}
                  className={`flex-1 py-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Category Icon Modal */}
        {showEditCategoryCustomIconModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`p-6 rounded-lg max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold mb-4">{t.enterCustomIcon}</h3>
              <input
                type="text"
                value={editingCategoryCustomIcon}
                onChange={(e) => setEditingCategoryCustomIcon(e.target.value)}
                placeholder="Enter emoji or icon"
                className={`w-full px-3 py-2 border rounded mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingCategory({ ...editingCategory, icon: editingCategoryCustomIcon });
                    setEditingCategoryCustomIcon("");
                    setShowEditCategoryCustomIconModal(false);
                  }}
                  style={{ backgroundColor: buttonColor }}
                  className="flex-1 py-2 rounded hover:opacity-80"
                >
                  {t.save}
                </button>
                <button
                  onClick={() => {
                    setEditingCategoryCustomIcon("");
                    setShowEditCategoryCustomIconModal(false);
                  }}
                  className={`flex-1 py-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
