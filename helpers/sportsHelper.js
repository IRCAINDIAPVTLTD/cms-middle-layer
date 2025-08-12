// helpers/sportsHelper.js
const sportsHelper = (data) => {
  const ledgerID = data.metadata_tax.LedgerID;
  const cgstLedgerId = data.metadata_tax.taxes[0].TaxLedgerID;
  const sgstLedgerId = data.metadata_tax.taxes[1].TaxLedgerID;
  const cgstValue = data.metadata_tax.taxes[0].TaxValue;
  const sgstValue = data.metadata_tax.taxes[1].TaxValue;

  const totalTax = (data.slot_fee * (parseInt(cgstValue) + parseInt(sgstValue))) / 100;
  const taxAmount = totalTax / 2;

  return JSON.stringify({
    MemAccno: data.membership_no,
    MemberName: data.memberName,
    Transactiondate: new Date(data.booking_date),
    Remarks: "Sports Booking",
    paymode: data.payment_mode,
    refNo: "",
    LedgerDet: [
      {
        DepartmentName: data.department_name,
        Amount: data.slot_fee - totalTax,
        Cgst: taxAmount,
        Sgst: taxAmount,
        CgstLedgerID: cgstLedgerId,
        SgstLedgerID: sgstLedgerId,
        LedgerID: ledgerID,
      },
    ],
  });
};

export default sportsHelper;
