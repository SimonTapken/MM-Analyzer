import * as XLSX from "xlsx";

export default function ExcelReader({ onDataParsed }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = "Form2"; // As per user requirement
      const ws = wb.Sheets[wsname];

      if (!ws) {
        console.error(`Sheet "${wsname}" not found in the workbook.`);
        onDataParsed([]);
        return;
      }

      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      onDataParsed(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
    </div>
  );
}
