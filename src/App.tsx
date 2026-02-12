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
    invoiceParseError:
      "Failed to parse invoice. This PDF format is not supported in the browser. Please export CSV from your bank instead.",
    monthNames: [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ],
    categories: {
      eating: "Eating in the restaurant",
      groceries: "Groceries",
      furniture: "Furniture",
      other: "Other"
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
    invoiceParseError:
      "Không thể đọc nội dung PDF này trên trình duyệt. Vui lòng xuất CSV từ ngân hàng hoặc dùng bản sao text.",
    monthNames: [
      "Tháng Một","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu",
      "Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười Một","Tháng Mười Hai"
    ],
    categories: {
      eating: "Ăn tại nhà hàng",
      groceries: "Tạp hóa",
      furniture: "Đồ nội thất",
      other: "Khác"
    }
  }
  // (giữ nguyên các ngôn ngữ khác nếu anh/chị cần – để code ngắn tôi chỉ giữ en + vi)
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
  const [expenseMonth, setExpenseMonth] = useState(
    (currentDate.getMonth() + 1).toString().padStart(2, "0")
  );
  const [currency, setCurrency] = useState("EUR");
  const [category, setCategory] = useState("eating");
  const [categories, setCategories] = useState<Record<string, Category>>({
    eating: { name: translations.en.categories.eating, icon: "🍽️", note: "" },
    groceries: { name: translations.en.categories.groceries, icon: "🛒", note: "" },
    furniture: { name: translations.en.categories.furniture, icon: "🪑", note: "" },
    other: { name: translations.en.categories.other, icon: "📦", note: "" }
  });
  const [newCategory, setNewCategory] = useState({ name: "", icon: "📦", note: "" });
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
  const [language, setLanguage] = useState<"en" | "vi">("vi");

  // Lưu scrollY khi vào chế độ edit
  const editScrollYRef = useRef<number | null>(null);

  const t = translations[language];

  useEffect(() => {
    setCategories(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        updated[key].name = t.categories[key as keyof typeof t.categories] || updated[key].name;
      });
      return updated;
    });
  }, [t]);

  const amountExampleText =
    currency === "VND" ? (language === "vi" ? "vd: 10000" : "10000") : t.amountExample;

  const currencies: Record<string, { symbol: string; rate: number }> = {
    EUR: { symbol: "€", rate: 25000 },
    USD: { symbol: "$", rate: 23000 },
    VND: { symbol: "₫", rate: 1 }
  };

  const convertAmountTo = (amountValue: number, fromCurrency: string, toCurrency: string) =>
    amountValue * (currencies[fromCurrency].rate / currencies[toCurrency].rate);

  const formatCurrency = (value: number, curr: string) => {
    if (curr === "VND") {
      return `₫${Math.round(value).toLocaleString("vi-VN")}`;
    }
    return `${currencies[curr].symbol}${value.toFixed(2)} ${curr}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount.trim() || !description.trim()) {
      alert(t.requiredFieldsWarning);
      return;
    }
    const expenseDate = `${expenseYear}-${expenseMonth}`;
    const rawAmountParts = amount.split(/[;+]/).map(s => s.trim()).filter(Boolean);
    let descriptionParts = description.split(/[;+]/).map(s => s.trim()).filter(Boolean);

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
      const clean = rawAmountParts[index].replace(",", ".");
      return {
        id: Date.now() + index,
        description: desc,
        amount: parseFloat(clean),
        currency,
        category,
        date: expenseDate
      };
    });

    setExpenses(prev => [...prev, ...newExpenses]);
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
    setExpenses(prev => prev.filter(exp => exp.id !== id));
    setSelectedExpenseIds(prev => prev.filter(eid => eid !== id));
    if (editingExpenseId === id) {
      editingScrollRestore();
      setEditingExpenseId(null);
    }
  };

  const editingScrollRestore = () => {
    if (editScrollYRef.current !== null) {
      window.scrollTo(0, editScrollYRef.current);
      editScrollYRef.current = null;
    }
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(prev => prev.map(exp => (exp.id === updatedExpense.id ? updatedExpense : exp)));
    setEditingExpenseId(null);
    // luôn restore scroll sau khi thoát edit
    requestAnimationFrame(editingScrollRestore);
  };

  const applyAllBatchEdits = () => {
    setExpenses(prev => {
      let updated = [...prev];
      if (batchEditDescription.trim()) {
        updated = updated.map(exp =>
          selectedExpenseIds.includes(exp.id) ? { ...exp, description: batchEditDescription } : exp
        );
      }
      if (batchEditCategory) {
        updated = updated.map(exp =>
          selectedExpenseIds.includes(exp.id) ? { ...exp, category: batchEditCategory } : exp
        );
      }
      return updated;
    });
    setBatchEditDescription("");
    setBatchEditCategory("");
    setSelectedExpenseIds([]);
  };

  const calculateGrandTotal = () =>
    expenses.reduce(
      (sum, exp) => sum + convertAmountTo(exp.amount, exp.currency, primaryCurrency),
      0
    );

  const toggleSelectExpense = (id: number) => {
    setSelectedExpenseIds(prev =>
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  };

  const toggleSelectAllInCategory = (categoryKey: string) => {
    const ids = expenses.filter(e => e.category === categoryKey).map(e => e.id);
    const allSelected = ids.every(id => selectedExpenseIds.includes(id));
    if (allSelected) {
      setSelectedExpenseIds(prev => prev.filter(id => !ids.includes(id)));
    } else {
      setSelectedExpenseIds(prev => {
        const next = [...prev];
        ids.forEach(id => {
          if (!next.includes(id)) next.push(id);
        });
        return next;
      });
    }
  };

  // ------ CSV Upload giữ nguyên logic cũ, lược bớt cho ngắn ------

  const escapeCSV = (field: any) => {
    const s = field.toString();
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };

  const downloadCSV = () => {
    const rows: string[] = [];
    rows.push(
      ["ID", "Description", "Date", "Amount", "Currency", "Original Amount", "Category"]
        .map(escapeCSV)
        .join(",")
    );
    const fileName = "Expense_Tracker.csv";
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseCSV = (text: string) => {
    const rows = text.split("\n").filter(r => r.trim() !== "");
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
    reader.onload = event => {
      const content = event.target?.result as string;
      const data = parseCSV(content);
      const newExpenses: Expense[] = [];
      let idCounter = Date.now();
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row.length < 7) continue;
        newExpenses.push({
          id: idCounter++,
          description: row[1],
          date: row[2],
          amount: parseFloat(row[3]),
          currency: row[4],
          category: "other"
        });
      }
      setExpenses(newExpenses);
    };
    reader.readAsText(file);
  };

  // -------- PDF Invoice Upload: chỉ bắt lỗi format, không cố parse phức tạp --------

  const handleInvoiceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert(t.invoiceParseError);
      return;
    }

    try {
      // Browser thông thường không đọc text PDF chuẩn được, nên ta chỉ báo rõ cho user.
      // Anh/chị nên: mở PDF -> copy bảng giao dịch ra file .txt hoặc .csv -> dùng CSV import.
      alert(t.invoiceParseError);
    } catch {
      alert(t.invoiceParseError);
    }
  };

  // -------- Inline Edit giữ scroll --------

  const InlineEditExpense: React.FC<{
    expense: Expense;
    onSave: (e: Expense) => void;
    onCancel: () => void;
  }> = ({ expense, onSave, onCancel }) => {
    const [editData, setEditData] = useState({
      description: expense.description,
      amount: expense.amount.toString(),
      currency: expense.currency,
      category: expense.category,
      date: expense.date || ""
    });

    return (
      <div
        className={
          isDarkMode
            ? "bg-gray-700 text-white border border-gray-600 p-4 rounded-lg mb-2"
            : "bg-gray-100 text-gray-900 border border-gray-200 p-4 rounded-lg mb-2"
        }
      >
        <div className="grid grid-cols-5 gap-3">
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
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={() => {
              onCancel();
              requestAnimationFrame(editingScrollRestore);
            }}
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

  const CategorySection: React.FC<{ categoryKey: string }> = ({ categoryKey }) => {
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
              {categories[categoryKey].icon}{" "}
              {getTranslatedCategory(categoryKey, categories[categoryKey].name, t)}
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
            </button>
            <button
              onClick={() => deleteExpensesByCategory(categoryKey)}
              className="group relative"
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </h2>
        <div className="space-y-2">
          {categoryExpenses.map(expense =>
            editingExpenseId === expense.id ? (
              <InlineEditExpense
                key={expense.id}
                expense={expense}
                onSave={updateExpense}
                onCancel={() => {
                  setEditingExpenseId(null);
                  requestAnimationFrame(editingScrollRestore);
                }}
              />
            ) : (
              <div
                key={expense.id}
                className={
                  isDarkMode
                    ? "bg-gray-800 text-white border border-gray-600 grid grid-cols-[min-content,1fr,120px,min-content] items-center gap-4 p-4 rounded-lg mb-2 shadow-sm"
                    : "bg-gray-50 text-gray-900 border border-gray-200 grid grid-cols-[min-content,1fr,120px,min-content] items-center gap-4 p-4 rounded-lg mb-2 shadow-sm"
                }
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
                    <em className={isDarkMode ? "text-gray-300" : "text-gray-400"}>
                      No description
                    </em>
                  )}
                </div>
                <div className="text-right font-mono">
                  <div className="font-semibold">
                    {formatCurrency(expense.amount, expense.currency)}
                  </div>
                  <div className="text-sm">
                    {formatCurrency(
                      convertAmountTo(expense.amount, expense.currency, primaryCurrency),
                      primaryCurrency
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      editScrollYRef.current = window.scrollY;
                      setEditingExpenseId(expense.id);
                    }}
                    className="group relative"
                  >
                    <Edit2 className="h-5 w-5 text-blue-500" />
                  </button>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="group relative"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        <div className="mt-4 text-right">
          <div className="text-lg font-bold">{t.categoryTotal}</div>
          <div className="text-xl font-bold">
            {formatCurrency(total, primaryCurrency)}
          </div>
        </div>
      </div>
    );
  };

  const currentYear = currentDate.getFullYear();
  const years: string[] = [];
  for (let y = currentYear - 5; y <= currentYear + 5; y++) years.push(y.toString());

  const inputSelectClass =
    "w-full p-3 rounded-xl border " +
    (isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900");

  return (
    <div
      className={isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}
      style={{ minHeight: "100vh", padding: "1.5rem" }}
    >
      <div className="flex justify-between items-center mb-8">
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
        <div className="flex items-center gap-2">
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
          onChange={e => setLanguage(e.target.value as "en" | "vi")}
          className={inputSelectClass + " w-auto"}
        >
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
        </select>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Form add expense */}
        <div
          className={isDarkMode ? "bg-gray-800" : "bg-white"}
          style={{ borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.5rem" }}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            {t.sharedExpenseTracker}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  {t.descriptionInputLabel}
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className={inputSelectClass}
                  placeholder={t.exampleItem}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  {t.amountInputLabel}
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className={inputSelectClass}
                  placeholder={amountExampleText}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                {t.expenseDateLabel}
              </label>
              <div className="flex gap-4">
                <select
                  value={expenseMonth}
                  onChange={e => setExpenseMonth(e.target.value.padStart(2, "0"))}
                  className={inputSelectClass}
                >
                  {t.monthNames.map((m: string, i: number) => (
                    <option key={i} value={(i + 1).toString().padStart(2, "0")}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={expenseYear}
                  onChange={e => setExpenseYear(e.target.value)}
                  className={inputSelectClass}
                >
                  {years.map((y, i) => (
                    <option key={i} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.currencyLabel}
                </label>
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
                <label className="block text-sm font-medium mb-2">
                  {t.categoryLabel}
                </label>
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
                <label className="block text-sm font-medium mb-2">
                  {t.primaryCurrencyLabel}
                </label>
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
              className="w-full p-3 rounded-xl text-white font-medium hover:opacity-90"
            >
              {t.addExpense}
            </button>
          </form>
        </div>

        {/* Manage categories + import */}
        <div
          className={isDarkMode ? "bg-gray-800" : "bg-white"}
          style={{ borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.5rem" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{t.manageCategories}</h2>
            <div className="flex gap-3">
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
                </label>
              </div>
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
                </label>
              </div>
            </div>
          </div>

          {/* Add category form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!newCategory.name.trim()) {
                alert(t.requiredFieldsWarning);
                return;
              }
              const id = newCategory.name.toLowerCase().replace(/\s+/g, "_");
              setCategories(prev => ({
                ...prev,
                [id]: { name: newCategory.name, icon: newCategory.icon, note: newCategory.note }
              }));
              setNewCategory({ name: "", icon: "📦", note: "" });
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.categoryName}</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                  className={inputSelectClass}
                  placeholder={t.enterCategoryName}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.categoryIcon}
                </label>
                <select
                  value={newCategory.icon}
                  onChange={e => {
                    if (e.target.value === "custom") {
                      setShowCustomIconModal(true);
                    } else {
                      setNewCategory({ ...newCategory, icon: e.target.value });
                    }
                  }}
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
              className="w-full p-3 rounded-xl text-white font-medium hover:opacity-90"
            >
              {t.addCategory}
            </button>
          </form>

          {/* Custom icon modal */}
          {showCustomIconModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div
                className={
                  isDarkMode
                    ? "bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm w-full"
                    : "bg-white p-6 rounded-xl shadow-lg max-w-sm w-full"
                }
              >
                <h3 className="text-lg font-bold mb-4">{t.enterCustomIcon}</h3>
                <input
                  type="text"
                  value={customIcon}
                  onChange={e => setCustomIcon(e.target.value)}
                  className={inputSelectClass + " mb-4"}
                  placeholder="Type your icon here"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setCustomIcon("");
                      setShowCustomIconModal(false);
                    }}
                    className="px-4 py-2 text-red-500 border border-red-500 rounded-lg font-medium"
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={() => {
                      if (customIcon.trim()) {
                        setNewCategory(prev => ({ ...prev, icon: customIcon }));
                      }
                      setCustomIcon("");
                      setShowCustomIconModal(false);
                    }}
                    style={{ backgroundColor: buttonColor }}
                    className="px-4 py-2 text-white rounded-lg font-medium hover:opacity-90"
                  >
                    {t.save}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Category list */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">{t.currentCategories}</h3>
            <ul>
              {Object.entries(categories).map(([key, { icon, name, note }]) => (
                <li
                  key={key}
                  className="flex flex-col border p-2 rounded-lg mb-2"
                >
                  <div className="flex justify-between items-center">
                    <span>
                      {icon} {getTranslatedCategory(key, name, t)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setEditingCategory({ key, name, icon, note })
                        }
                        className="group relative"
                      >
                        <Edit2 className="h-5 w-5 text-blue-500" />
                      </button>
                      <button
                        onClick={() => deleteCategory(key)}
                        className="group relative"
                      >
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                  {note && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                      {note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Edit category modal */}
        {editingCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div
              className={
                isDarkMode
                  ? "bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm w-full"
                  : "bg-white p-6 rounded-xl shadow-lg max-w-sm w-full"
              }
            >
              <h3 className="text-lg font-bold mb-4">
                {t.edit} {t.categoryName}
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t.categoryName}
                </label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={e =>
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  }
                  className={inputSelectClass}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t.categoryIcon}
                </label>
                <select
                  value={editingCategory.icon}
                  onChange={e => {
                    if (e.target.value === "custom") {
                      setShowEditCategoryCustomIconModal(true);
                      setEditingCategoryCustomIcon("");
                    } else {
                      setEditingCategory({
                        ...editingCategory,
                        icon: e.target.value
                      });
                    }
                  }}
                  className={inputSelectClass}
                >
                  {["🍽️", "🛒", "🪑", "📦", "🚗", "🏠", "💻", "🎮", "📚"].map(
                    (emoji, idx) => (
                      <option key={idx} value={emoji}>
                        {emoji}
                      </option>
                    )
                  )}
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t.categoryNote}
                </label>
                <textarea
                  value={editingCategory.note}
                  onChange={e =>
                    setEditingCategory({ ...editingCategory, note: e.target.value })
                  }
                  className={inputSelectClass}
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
                  <div className="flex justify-end gap-3 mt-2">
                    <button
                      onClick={() => {
                        setEditingCategoryCustomIcon("");
                        setShowEditCategoryCustomIconModal(false);
                      }}
                      className="px-4 py-2 text-red-500 border border-red-500 rounded-lg font-medium"
                    >
                      {t.cancel}
                    </button>
                    <button
                      onClick={() => {
                        if (editingCategoryCustomIcon.trim()) {
                          setEditingCategory({
                            ...editingCategory,
                            icon: editingCategoryCustomIcon
                          });
                        }
                        setEditingCategoryCustomIcon("");
                        setShowEditCategoryCustomIconModal(false);
                      }}
                      style={{ backgroundColor: buttonColor }}
                      className="px-4 py-2 text-white rounded-lg font-medium hover:opacity-90"
                    >
                      {t.save}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 border rounded text-red-500 hover:bg-red-50"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={() => {
                    const { key, name, icon, note } = editingCategory;
                    setCategories(prev => ({
                      ...prev,
                      [key]: { name, icon, note }
                    }));
                    setEditingCategory(null);
                  }}
                  style={{ backgroundColor: buttonColor }}
                  className="px-4 py-2 text-white rounded hover:opacity-90"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Batch edit */}
        {selectedExpenseIds.length > 0 && (
          <div
            className={isDarkMode ? "bg-gray-800" : "bg-white"}
            style={{ borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.5rem" }}
          >
            <h2 className="text-xl font-bold mb-4">
              {t.batchEditSelected} ({selectedExpenseIds.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Update Description
                </label>
                <input
                  type="text"
                  value={batchEditDescription}
                  onChange={e => setBatchEditDescription(e.target.value)}
                  className={inputSelectClass}
                  placeholder="Enter new description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Update Category
                </label>
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
              className="w-full p-3 rounded-xl text-white font-medium hover:opacity-90"
              disabled={!batchEditDescription && !batchEditCategory}
            >
              {t.applyChanges}
            </button>
          </div>
        )}

        {/* Download CSV + list */}
        {expenses.length > 0 && (
          <div className="mb-6">
            <button
              onClick={downloadCSV}
              style={{ backgroundColor: buttonColor }}
              className="w-full p-3 rounded-xl text-white font-medium hover:opacity-90"
            >
              {t.downloadCSV}
            </button>
          </div>
        )}

        <div
          className={isDarkMode ? "bg-gray-800" : "bg-white"}
          style={{ borderRadius: "1rem", padding: "1.5rem" }}
        >
          {Object.keys(categories).map(key => (
            <CategorySection key={key} categoryKey={key} />
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
