import { DayPicker } from "react-day-picker";

const RangePickerModal = ({
  tempRange,
  chartRange,
  setTempRange,
  setChartRange,
  setShowRangePicker,
}) => {
  const handleApply = () => {
    if (tempRange?.from && tempRange?.to) {
      const diffDays = Math.ceil(
        (tempRange.to - tempRange.from) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === 6) {
        setChartRange(tempRange);
        setShowRangePicker(false);
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <DayPicker
          mode="range"
          selected={tempRange || chartRange}
          onSelect={setTempRange}
          numberOfMonths={2}
          className="mb-4"
        />
        <div className="flex gap-4 justify-end">
          <button
            onClick={() => {
              setTempRange(null);
              setShowRangePicker(false);
            }}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default RangePickerModal;
