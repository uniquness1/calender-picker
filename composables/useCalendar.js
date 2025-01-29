import { ref, computed } from "vue";

export function useCalendar() {
  const currentDate = ref(new Date());
  const displayDate = ref(new Date());
  const selectedStartDate = ref(null);
  const selectedEndDate = ref(null);

  const currentDisplayMonth = computed(() => {
    return new Date(
      displayDate.value.getFullYear(),
      displayDate.value.getMonth(),
      1
    );
  });

  const nextDisplayMonth = computed(() => {
    return new Date(
      displayDate.value.getFullYear(),
      displayDate.value.getMonth() + 1,
      1
    );
  });

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB");
  };

  const navigateMonths = (direction) => {
    const newDate = new Date(displayDate.value);
    newDate.setMonth(newDate.getMonth() + direction);
    displayDate.value = newDate;
  };

  const selectDateRange = (days) => {
    selectedStartDate.value = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);
    selectedEndDate.value = endDate;
  };

  return {
    currentDate,
    displayDate,
    selectedStartDate,
    selectedEndDate,
    currentDisplayMonth,
    nextDisplayMonth,
    formatDate,
    navigateMonths,
    selectDateRange,
  };
}
